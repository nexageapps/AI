"""@tool: turn a typed Python function into an Anthropic tool schema + a safe executor."""
from __future__ import annotations
import inspect, json, re, time, typing
from dataclasses import dataclass
from typing import Callable

_JSON = {str: "string", int: "integer", float: "number", bool: "boolean", list: "array", dict: "object"}


def _type_schema(t) -> dict:
    origin = typing.get_origin(t)
    if origin is typing.Literal:
        return {"type": "string", "enum": list(typing.get_args(t))}
    if origin in (list, typing.List):
        args = typing.get_args(t)
        return {"type": "array", "items": _type_schema(args[0]) if args else {}}
    if origin is typing.Union:  # Optional[X]
        args = [a for a in typing.get_args(t) if a is not type(None)]
        return _type_schema(args[0]) if args else {}
    return {"type": _JSON.get(t, "string")}


def _parse_doc(doc: str) -> tuple[str, dict[str, str]]:
    doc = inspect.cleandoc(doc or "")
    head, _, rest = doc.partition("Args:")
    args = {m.group(1): m.group(2).strip() for m in re.finditer(r"^\s*(\w+)\s*(?:\([^)]*\))?:\s*(.+)$", rest, re.M)}
    return head.strip(), args


@dataclass
class Tool:
    fn: Callable
    name: str
    description: str
    schema: dict

    def __call__(self, *a, **k):
        return self.fn(*a, **k)


def tool(fn: Callable | None = None, *, name: str | None = None):
    """Decorator. The docstring (first paragraph + `Args:` section) becomes the tool description - write it for the model."""
    def wrap(f):
        desc, arg_docs = _parse_doc(f.__doc__ or "")
        hints = typing.get_type_hints(f)
        sig = inspect.signature(f)
        props, required = {}, []
        for p in sig.parameters.values():
            s = _type_schema(hints.get(p.name, str))
            if p.name in arg_docs:
                s["description"] = arg_docs[p.name]
            props[p.name] = s
            if p.default is inspect.Parameter.empty:
                required.append(p.name)
        schema = {"name": name or f.__name__, "description": desc,
                  "input_schema": {"type": "object", "properties": props, "required": required, "additionalProperties": False}}
        return Tool(f, name or f.__name__, desc, schema)
    return wrap(fn) if fn else wrap


class ToolBox:
    """A set of tools: gives you schemas for the API and a safe `run` that never raises into the agent loop."""

    def __init__(self, *tools: Tool, max_result_chars: int = 8000):
        self.tools = {t.name: t for t in tools}
        self.max_result_chars = max_result_chars

    def schemas(self) -> list[dict]:
        return [t.schema for t in self.tools.values()]

    def run(self, name: str, tool_input: dict) -> tuple[str, bool]:
        """Returns (content, is_error). Errors are returned as text so the model can recover - that is the point."""
        if name not in self.tools:
            return f"Unknown tool '{name}'. Available: {sorted(self.tools)}", True
        try:
            out = self.tools[name].fn(**tool_input)
        except TypeError as e:
            return f"Bad arguments for {name}: {e}", True
        except Exception as e:  # noqa: BLE001 - deliberate: surface every failure to the model
            return f"{type(e).__name__}: {e}", True
        text = out if isinstance(out, str) else json.dumps(out, default=str)
        if len(text) > self.max_result_chars:
            text = text[: self.max_result_chars] + f"\n...[truncated {len(text) - self.max_result_chars} chars]"
        return text, False

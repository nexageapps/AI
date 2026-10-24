"""Minimal tracing: every LLM call and tool call becomes an event you can print, diff and assert on."""
from __future__ import annotations
import json, time
from dataclasses import dataclass, field, asdict

# $/1M tokens (input, output). Offline mode costs 0. Check the pricing page for current numbers.
PRICES = {"claude-opus-5-5": (4.0, 20.0), "claude-sonnet-5-5": (2.0, 10.0), "claude-haiku-5-5": (0.10, 0.50)}


@dataclass
class Event:
    kind: str            # "llm" | "tool" | "note"
    name: str
    detail: dict = field(default_factory=dict)
    t: float = field(default_factory=time.time)


class Tracer:
    def __init__(self, model: str = ""):
        self.model = model
        self.events: list[Event] = []
        self.input_tokens = 0
        self.output_tokens = 0

    def llm(self, reply, turn: int):
        self.input_tokens += reply.usage.get("input_tokens", 0)
        self.output_tokens += reply.usage.get("output_tokens", 0)
        self.events.append(Event("llm", f"turn {turn}", {"stop": reply.stop_reason, "text": reply.text[:200],
                                                         "tools": [c["name"] for c in reply.tool_calls],
                                                         "usage": reply.usage}))

    def tool(self, name: str, tool_input: dict, result: str, is_error: bool, dt: float):
        self.events.append(Event("tool", name, {"input": tool_input, "result": result[:300], "error": is_error, "s": round(dt, 4)}))

    def note(self, msg: str, **kw):
        self.events.append(Event("note", msg, kw))

    @property
    def cost_usd(self) -> float:
        pin, pout = PRICES.get(self.model, (0.0, 0.0))
        return (self.input_tokens * pin + self.output_tokens * pout) / 1e6

    def n_tool_calls(self, name: str | None = None) -> int:
        return sum(1 for e in self.events if e.kind == "tool" and (name is None or e.name == name))

    def show(self):
        for e in self.events:
            if e.kind == "llm":
                d = e.detail
                print(f"🧠 {e.name:<8} stop={d['stop']:<9} tools={d['tools']}  {d['text']!r}")
            elif e.kind == "tool":
                flag = "❌" if e.detail["error"] else "🔧"
                print(f"{flag} {e.name}({json.dumps(e.detail['input'])[:80]}) -> {e.detail['result'][:90]!r}")
            else:
                print(f"📝 {e.name} {e.detail or ''}")
        print(f"— tokens in/out: {self.input_tokens}/{self.output_tokens} | est. cost ${self.cost_usd:.4f}")

    def to_json(self) -> str:
        return json.dumps([asdict(e) for e in self.events], default=str, indent=2)

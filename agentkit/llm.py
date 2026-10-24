"""LLM adapters with one interface: llm.chat(messages, system=, tools=, max_tokens=) -> Reply."""
from __future__ import annotations
import os, time, itertools
from dataclasses import dataclass, field
from typing import Callable, Any

DEFAULT_MODEL = "claude-opus-5-5"   # override with AGENTKIT_MODEL, e.g. claude-haiku-5-5 to spend less
_ids = itertools.count(1)


@dataclass
class Reply:
    """One assistant turn. `content` is a list of Anthropic-style blocks (dicts)."""
    content: list[dict]
    stop_reason: str = "end_turn"
    usage: dict = field(default_factory=lambda: {"input_tokens": 0, "output_tokens": 0})
    latency_s: float = 0.0

    @property
    def text(self) -> str:
        return "".join(b.get("text", "") for b in self.content if b.get("type") == "text")

    @property
    def tool_calls(self) -> list[dict]:
        return [b for b in self.content if b.get("type") == "tool_use"]


def say(text: str) -> Reply:
    """Scripted assistant turn that just talks."""
    return Reply([{"type": "text", "text": text}], "end_turn")


def call(name: str, _say: str = "", **tool_input) -> Reply:
    """Scripted assistant turn that calls one tool (optionally with a sentence first)."""
    blocks = [{"type": "text", "text": _say}] if _say else []
    blocks.append({"type": "tool_use", "id": f"toolu_offline_{next(_ids):03d}", "name": name, "input": tool_input})
    return Reply(blocks, "tool_use")


def calls(*pairs: tuple[str, dict], _say: str = "") -> Reply:
    """Scripted turn with several (parallel) tool calls: calls(("a", {...}), ("b", {...}))."""
    blocks = [{"type": "text", "text": _say}] if _say else []
    for name, inp in pairs:
        blocks.append({"type": "tool_use", "id": f"toolu_offline_{next(_ids):03d}", "name": name, "input": inp})
    return Reply(blocks, "tool_use")


def is_live() -> bool:
    return bool(os.getenv("ANTHROPIC_API_KEY")) and os.getenv("AGENTKIT_OFFLINE") != "1"


class LiveLLM:
    """Thin wrapper over anthropic.Anthropic().messages.create returning `Reply`."""
    mode = "live"

    def __init__(self, model: str | None = None, client: Any = None):
        self.model = model or os.getenv("AGENTKIT_MODEL", DEFAULT_MODEL)
        if client is None:
            import anthropic
            client = anthropic.Anthropic()
        self.client = client

    def chat(self, messages, system: str = "", tools=None, max_tokens: int = 4096, **kw) -> Reply:
        params = dict(model=self.model, max_tokens=max_tokens, messages=messages, **kw)
        if system:
            params["system"] = system
        if tools:
            params["tools"] = tools
        t0 = time.time()
        r = self.client.messages.create(**params)
        blocks = [b.model_dump(exclude_none=True) for b in r.content]  # keep thinking blocks intact when replaying history
        return Reply(blocks, r.stop_reason, {"input_tokens": r.usage.input_tokens, "output_tokens": r.usage.output_tokens},
                     time.time() - t0)


class ReplayLLM:
    """Offline: returns scripted Replies in order. Raises if the agent asks for more turns than recorded."""
    mode = "offline"
    model = "offline-replay"

    def __init__(self, script: list[Reply]):
        self.script = list(script)
        self.calls: list[dict] = []   # records what the agent sent, so you can assert on it

    def chat(self, messages, system: str = "", tools=None, max_tokens: int = 4096, **kw) -> Reply:
        self.calls.append({"messages": list(messages), "system": system, "tools": tools})
        if not self.script:
            raise RuntimeError("ReplayLLM script exhausted - the agent made more calls than the recorded trace. "
                               "Set ANTHROPIC_API_KEY to run live, or extend the script.")
        r = self.script.pop(0)
        r.usage = r.usage if r.usage["output_tokens"] else {"input_tokens": 0, "output_tokens": 0}
        return r


class PolicyLLM:
    """Offline: a Python function plays the model. policy(messages, system, tools) -> Reply. Useful for routers/judges."""
    mode = "offline"
    model = "offline-policy"

    def __init__(self, policy: Callable[..., Reply]):
        self.policy = policy
        self.calls: list[dict] = []

    def chat(self, messages, system: str = "", tools=None, max_tokens: int = 4096, **kw) -> Reply:
        self.calls.append({"messages": list(messages), "system": system, "tools": tools})
        return self.policy(messages, system, tools)


def get_llm(script: list[Reply] | None = None, policy: Callable[..., Reply] | None = None, model: str | None = None):
    """LIVE Claude when ANTHROPIC_API_KEY is set (and AGENTKIT_OFFLINE != 1), else the offline script/policy."""
    if is_live():
        llm = LiveLLM(model)
        print(f"[agentkit] LIVE mode - model={llm.model}")
        return llm
    if policy is not None:
        print("[agentkit] OFFLINE mode - scripted policy (set ANTHROPIC_API_KEY to go live)")
        return PolicyLLM(policy)
    if script is None:
        raise RuntimeError("OFFLINE mode needs a script= or policy=. Set ANTHROPIC_API_KEY to run live.")
    print("[agentkit] OFFLINE mode - replaying a recorded trace (set ANTHROPIC_API_KEY to go live)")
    return ReplayLLM(script)

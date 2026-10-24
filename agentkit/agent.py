"""Reference agent loop (you build this yourself in AG02; later lessons import it)."""
from __future__ import annotations
import time
from dataclasses import dataclass, field
from typing import Callable
from .tools import ToolBox
from .trace import Tracer


@dataclass
class AgentResult:
    final_text: str
    messages: list
    turns: int
    stop: str                 # "end_turn" | "max_turns" | "denied" | "refusal" | "max_tokens"
    tracer: Tracer = field(default=None)


def run_agent(llm, toolbox: ToolBox | None, task: str | list, system: str = "", max_turns: int = 10,
              tracer: Tracer | None = None, approve: Callable[[str, dict], bool] | None = None,
              max_tokens: int = 4096, messages: list | None = None) -> AgentResult:
    """while the model wants tools: run them, feed results back. Stops on end_turn / max_turns.

    approve(name, input) -> bool is an optional human-in-the-loop gate; a denial is reported to the model as an error result.
    """
    tracer = tracer or Tracer(getattr(llm, "model", ""))
    messages = list(messages or [])
    messages.append({"role": "user", "content": task})
    tools = toolbox.schemas() if toolbox else None
    for turn in range(1, max_turns + 1):
        reply = llm.chat(messages, system=system, tools=tools, max_tokens=max_tokens)
        tracer.llm(reply, turn)
        messages.append({"role": "assistant", "content": reply.content})
        if reply.stop_reason == "refusal":
            return AgentResult(reply.text, messages, turn, "refusal", tracer)
        if reply.stop_reason == "max_tokens":
            return AgentResult(reply.text, messages, turn, "max_tokens", tracer)
        if not reply.tool_calls:
            return AgentResult(reply.text, messages, turn, reply.stop_reason, tracer)
        results = []
        for c in reply.tool_calls:           # all results go back in ONE user message
            t0 = time.time()
            if approve and not approve(c["name"], c["input"]):
                out, err = "Denied by human reviewer. Do not retry this action; propose an alternative.", True
            else:
                out, err = toolbox.run(c["name"], c["input"])
            tracer.tool(c["name"], c["input"], out, err, time.time() - t0)
            results.append({"type": "tool_result", "tool_use_id": c["id"], "content": out, **({"is_error": True} if err else {})})
        messages.append({"role": "user", "content": results})
    return AgentResult("(stopped: max_turns reached)", messages, max_turns, "max_turns", tracer)

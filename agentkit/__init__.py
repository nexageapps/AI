"""agentkit - tiny teaching library for the Agents track.

Every lesson runs in two modes:
  * LIVE    - ANTHROPIC_API_KEY is set: real Claude calls.
  * OFFLINE - no key: a scripted replay of a recorded trace, so the loop,
              tools and state handling can be run (and tested) for free.

The block format mirrors the Anthropic Messages API on purpose, so code you
write here transfers 1:1 to production.
"""
from .llm import Reply, say, call, calls, get_llm, LiveLLM, ReplayLLM, PolicyLLM, is_live
from .tools import tool, ToolBox
from .trace import Tracer
from .agent import run_agent, AgentResult
from .bootstrap import setup

__all__ = ["Reply", "say", "call", "calls", "get_llm", "LiveLLM", "ReplayLLM", "PolicyLLM", "is_live",
           "tool", "ToolBox", "Tracer", "run_agent", "AgentResult", "setup"]

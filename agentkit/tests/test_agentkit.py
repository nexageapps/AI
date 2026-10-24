from agentkit import *
from agentkit.llm import LiveLLM


@tool
def add(a: int, b: int = 1) -> int:
    """Add two integers.

    Args:
        a: first number
        b: second number
    """
    return a + b


@tool
def boom(x: str) -> str:
    """Always fails."""
    raise ValueError("nope")


def test_schema():
    s = add.schema
    assert s["name"] == "add" and s["description"] == "Add two integers."
    assert s["input_schema"]["required"] == ["a"]
    assert s["input_schema"]["properties"]["a"] == {"type": "integer", "description": "first number"}


def test_toolbox_errors_are_returned_not_raised():
    tb = ToolBox(add, boom)
    assert tb.run("add", {"a": 2, "b": 3}) == ("5", False)
    out, err = tb.run("boom", {"x": "1"}); assert err and "ValueError" in out
    out, err = tb.run("add", {"zzz": 1}); assert err
    out, err = tb.run("missing", {}); assert err and "Unknown tool" in out


def test_loop_two_turns_and_trace():
    llm = ReplayLLM([call("add", a=2, b=3), say("The answer is 5.")])
    r = run_agent(llm, ToolBox(add), "2+3?", max_turns=5)
    assert r.final_text == "The answer is 5." and r.turns == 2 and r.stop == "end_turn"
    assert r.tracer.n_tool_calls("add") == 1
    # tool results are returned in a single user message with the matching id
    last_user = r.messages[2]
    assert last_user["role"] == "user" and last_user["content"][0]["type"] == "tool_result"


def test_max_turns_guard():
    llm = ReplayLLM([call("add", a=1)] * 10)
    r = run_agent(llm, ToolBox(add), "loop", max_turns=3)
    assert r.stop == "max_turns" and r.turns == 3


def test_approval_denial():
    llm = ReplayLLM([call("add", a=1), say("ok, skipped")])
    r = run_agent(llm, ToolBox(add), "x", approve=lambda n, i: False)
    assert r.tracer.events[1].detail["error"] is True


def test_parallel_calls_one_user_message():
    llm = ReplayLLM([calls(("add", {"a": 1}), ("add", {"a": 2})), say("done")])
    r = run_agent(llm, ToolBox(add), "x")
    assert len(r.messages[2]["content"]) == 2


def test_live_llm_with_fake_client():
    class B:  # mimics an SDK block
        def __init__(s, d): s.d = d
        def model_dump(s, exclude_none=True): return s.d
    class R:
        content = [B({"type": "text", "text": "hi"})]; stop_reason = "end_turn"
        class usage: input_tokens = 3; output_tokens = 2
    class C:
        class messages:
            @staticmethod
            def create(**kw): assert kw["model"] and kw["messages"]; return R
    r = LiveLLM(client=C).chat([{"role": "user", "content": "x"}])
    assert r.text == "hi" and r.usage["output_tokens"] == 2

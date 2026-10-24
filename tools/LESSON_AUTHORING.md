# Lesson Authoring Guide

How to write (or revise) a lesson so the whole curriculum feels like one course. Read [CURRICULUM.md](../CURRICULUM.md) first: it defines the template (§2) and the spec for each lesson (§3–4).

## Workflow

1. Write the lesson as a **percent-format Python file** (`# %%` code cells, `# %% [markdown]` text cells, `# %% [setup]` = the standard setup cell for LLM/agent lessons). See `tools/nbbuild.py` docstring. Keep sources outside the repo (scratch dir) or commit them under `tools/src/` if you want reviewable diffs.
2. Build: `python tools/nbbuild.py my_lesson.py "Agents/AG03-tools-done-right.ipynb"`
3. Test offline: `python tools/nbtest.py "Agents/AG03*.ipynb"` (executes every cell with `AGENTKIT_OFFLINE=1`; must PASS).
4. Re-read the rendered notebook top to bottom as a student: is each step motivated? Does a markdown cell precede each code cell explaining *why*?

## Hard rules

- **Runs offline, free, on CPU, in < 3 min** with only the Python standard library, `numpy`, `scikit-learn`, `matplotlib`, `pydantic`, `anthropic` (import only) and `agentkit`. Anything else (torch, langgraph, mcp, fastapi, sentence-transformers…) is **optional**: wrap in `try/except ImportError` and print a one-line "skipped, install X to run this cell"; the lesson's core must work without it. Never download data at run time. Generate synthetic data with a **fixed seed** or embed small corpora in the notebook.
- **LLM calls go through `agentkit`** (`get_llm(script=[...])` / `get_llm(policy=fn)`), so the same cell runs LIVE with a key. In OFFLINE mode the script is a recorded/plausible trace of what Claude does; make it realistic, and make the *tools* and *assertions* do the real work. Never call `anthropic` directly in a way that would fail without a key (showing it in a markdown code block, or a guarded cell, is fine).
- **No hard-coded model prices or claims about benchmark numbers.** Use `agentkit.trace.PRICES` for cost illustrations. Model IDs only via `agentkit.llm.DEFAULT_MODEL`.
- **Accuracy over breadth.** Cite only papers/docs you are certain exist (authors, year, title, arXiv id if you are sure). If unsure, omit the citation. Do not invent API signatures: for third-party libraries show a *minimal* snippet and label it "reference: check current docs". Do not state version numbers.
- **Live-compatibility:** the default model rejects forced `tool_choice` (`any`/`tool`), assistant prefill and `temperature`/`top_p`/`top_k`; steer with prompts, `strict` schemas or structured outputs instead.
- **Every lab has `assert`s** that would fail if the lab were done wrong, and exercise stubs may be left unfinished only inside commented blocks or `NotImplementedError` functions that are never called by the main flow.
- **Realistic scenarios**: a named business problem, realistic field names and data, a metric. No `foo/bar`, no toy-only.
- **Never read or print secrets** (`.env`, env vars). Never modify files outside your assigned outputs. Never delete anything.
- Notebook size target: 25–45 cells, ~15–40 KB, ≈ 2–3 h of student work. Prefer fewer, deeper cells over many trivial ones.

## Voice & pedagogy ("Stanford professor")

Precise, motivating, no hype. Intuition → formalism → code → failure. Pose a question before revealing an answer. Use small diagrams (ASCII/Markdown tables/matplotlib) where they replace a paragraph. Connect to the previous and next lesson. Every section answers "why am I doing this?" Prefer *measured* statements ("accuracy rose from 0.62 to 0.81 on 200 held-out tickets") over adjectives.

## agentkit cheat-sheet

```python
# %% [setup]                                   # standard setup cell (finds repo root, prints LIVE/OFFLINE)
from agentkit import (tool, ToolBox, get_llm, say, call, calls, ReplayLLM, PolicyLLM, Reply,
                      run_agent, Tracer, is_live)

@tool                                         # docstring (+ "Args:" section) -> JSON schema for the model
def search(query: str, k: int = 3) -> list:
    """Search the knowledge base.

    Args:
        query: Natural-language question.
        k: Number of passages.
    """

tb = ToolBox(search)                          # tb.schemas() -> API tools; tb.run(name, input) -> (text, is_error), never raises
llm = get_llm(script=[call("search", query="refund policy"), say("Refunds are allowed within 30 days.")])
res = run_agent(llm, tb, "What is the refund policy?", system="...", max_turns=8, approve=None)
res.final_text, res.messages, res.turns, res.stop       # stop in {"end_turn","max_turns","refusal","max_tokens"}
res.tracer.show(); res.tracer.n_tool_calls("search"); res.tracer.cost_usd

llm.chat(messages, system="", tools=None, max_tokens=4096) -> Reply     # Reply.text, .tool_calls, .stop_reason, .usage
get_llm(policy=lambda messages, system, tools: say("..."))              # Python function plays the model (routers, judges, planners)
call("tool", _say="optional text first", **input)   calls(("a", {...}), ("b", {...}))   # scripted tool-call turns
```
Offline scripts are consumed in order, so write them to match the control flow; use `PolicyLLM` when the number of calls varies (judges, graders, per-item classification) and look at `messages` to decide.

## Lesson skeleton

```python
# %% [markdown]
# # AGxx · Title
# **Track** … · **Time** … · **Mode** … · **Prereqs** … · **You will build** …
# ## 🎯 Why this matters   (+ real scenario)
# ## 🧭 Learning objectives
# %% [setup]
# %% [markdown]
# ## 1 · Concept            ## 2 · Build it            ## 3 · Use it (realistic use case)
# ## 4 · Break it           ## 5 · Exercises (Practice / Stretch / Challenge)
# ## ✅ Checkpoint (4 Qs, answers in <details>)      ## 📌 Takeaways · 📚 Further reading · Next →
```
Reference exemplar: `Agents/AG02-the-agent-loop-from-scratch.ipynb`.

## Naming (enforced by `tools/check_names.py`)

File: `<ID>-<kebab-title>.ipynb`, e.g. `AG03-tools-done-right.ipynb`. The title comes from `tools/curriculum.json`; do not invent a different one. Full rules: [CURRICULUM.md §6](../CURRICULUM.md#6-naming-conventions).

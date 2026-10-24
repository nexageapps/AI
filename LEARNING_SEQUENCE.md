# Learning Sequence

How to move through the 65 core lessons. The tiers are cumulative, but the **agentic path** has a shortcut. Time estimates assume ~8 h/week (two 3-hour lesson sessions + one 2-hour review/project block). Per-lesson specs: [CURRICULUM.md](./CURRICULUM.md).

## Prerequisites
Python (functions, classes, `pip`, notebooks), high-school algebra, basic probability. Everything else is taught.

## Path A: Full journey (≈ 27 weeks)

| Weeks | Tier | Lessons | Milestone |
|---|---|---|---|
| 1–4 | Basic | B01–B10 | Capstone: an end-to-end ML project with a metrics write-up |
| 5–8 | Intermediate | I01–I10 | Capstone: text classifier + semantic search app |
| 9–12 | Advanced | A01–A10 | Capstone: RAG app with an eval gate and guardrails |
| 13–19 | **Agents** | AG01–AG15 | Capstone: a shipped agent with API, traces and evals |
| 20–24 | Applied | AP01–AP10 | Two projects written up as case studies |
| 25–27+ | Expert | E01–E10 | Research write-up |

## Path B: Agentic fast track (≈ 11 weeks), for people who already know ML

| Weeks | Do | Why |
|---|---|---|
| 1–2 | A01 → A04 | LLM APIs, structured output, context engineering, RAG, **evals** (the habit that separates demos from products) |
| 3–9 | AG01 → AG15 | the full agent track; AG02 is the keystone: do not skip it |
| 10–11 | AP01 + two more Applied projects | portfolio |
Backfill later as needed: I04–I07 (attention, tokenization, embeddings), A05–A07 (tuning, reasoning), E09 (agent security).

## Path C: Research track (≈ 16 weeks)
Basic (skim B01–B04, do B05–B09) → Intermediate I01–I08 → Advanced A05–A07 → Expert E01–E10. Electives: `Deep-Learning/`, `Research/`.

## Dependencies you must respect

```
B05–B06 (data, metrics) ─▶ A04 (evals)         I04–I07 (attention, tokens, embeddings) ─▶ A03 (RAG) ─▶ AG06
A01–A02 (APIs, context) ─▶ AG02 ─▶ AG03 ─▶ AG04…AG15      AG09 (guardrails) ─▶ AP05, AP06, E09
AG14 (evals) ─▶ every Applied project and AG15
```

## Weekly rhythm that works
1. **Session 1:** read + run the lesson; change one thing per cell.
2. **Session 2:** *Break it* + Practice exercises; write down one failure you caused on purpose.
3. **Review block:** Checkpoint from memory; Stretch/Challenge; add a line to your project journal ("what I built, what broke, what I measured").

## Self-assessment before moving up a tier
Use the *exit test* in each tier README. If you cannot do it without looking at the solution, redo the capstone with a different dataset.

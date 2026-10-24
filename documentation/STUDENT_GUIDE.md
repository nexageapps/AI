# Student Guide

**How to get the most out of this open study material, whether you are teaching yourself, running a study group, or using it alongside a university course.**

> This is personal learning material shared openly. It is independent of any institution and contains no official course content. Follow your own institution's academic-integrity rules: see [ACADEMIC_INTEGRITY.md](./ACADEMIC_INTEGRITY.md).

## Contents
1. [What you are working with](#1-what-you-are-working-with)
2. [Pick your path](#2-pick-your-path)
3. [The study routine (per lesson)](#3-the-study-routine-per-lesson)
4. [Weekly and semester plans](#4-weekly-and-semester-plans)
5. [Using this next to a university course](#5-using-this-next-to-a-university-course)
6. [Building a portfolio](#6-building-a-portfolio)
7. [Revision and exam preparation](#7-revision-and-exam-preparation)
8. [Common problems and fixes](#8-common-problems-and-fixes)
9. [FAQ](#9-faq)

---

## 1. What you are working with

Six tiers, one template, one capstone per tier (details: [CURRICULUM.md](../CURRICULUM.md)).

| Tier | Folder | Lessons | You learn to… |
|---|---|---|---|
| Basic | [`Basic/`](../Basic) | B01–B10 | train, evaluate and debug classical ML and a small neural net |
| Intermediate | [`Intermediate/`](../Intermediate) | I01–I10 | build CNNs, sequence models, a tokenizer, a mini-GPT, embedding search |
| Advanced | [`Advanced/`](../Advanced) | A01–A10 | engineer with LLMs: structured output, context, RAG, evals, tuning, serving |
| **Agents** | [`Agents/`](../Agents) | AG01–AG15 | build, guard, trace and ship tool-using agents |
| Applied | [`Applied/`](../Applied) | AP01–AP10 | solve realistic briefs with metrics |
| Expert | [`Expert/`](../Expert) | E01–E10 | read, reproduce and extend research |

Every lesson has the same ten parts: *why it matters → objectives → concept → build it → use it → break it → exercises → checkpoint → takeaways → next*. Agent, Advanced and Applied lessons run **offline for free** (a scripted replay stands in for the model) and **live** with an `ANTHROPIC_API_KEY`. Check each tier README for which lessons are ready, retained or planned.

## 2. Pick your path

| If you are… | Do | ≈ Time |
|---|---|---|
| New to ML | Basic → Intermediate → Advanced → Agents | 215 h |
| Comfortable with ML, want agents (**fast track**) | A01–A04 → AG01–AG15 → AP01–AP06 | 90 h |
| Already calling LLM APIs | AG02–AG15 → Applied | 75 h |
| Aiming at research | Basic (skim) → Intermediate → A05–A07 → Expert | 130 h |

Gate each tier with its **exit test** (top of each tier README). If you can't do it without looking at solutions, redo the capstone on a different dataset before moving on.

## 3. The study routine (per lesson)

1. **Predict (5 min).** Read *Why it matters* and the objectives. Write down what you expect each major cell to print.
2. **Run and perturb (60–90 min).** Run top to bottom. In every code cell change one thing (a parameter, a prompt, a tool description) and note what happens. Understanding comes from the changes, not from the first run.
3. **Break it (30 min).** Do the *Break it* section yourself before reading the explanation. Keep a **failure log**: what broke, why, how you'd detect it in production.
4. **Exercises (45–120 min).** *Practice* always; *Stretch* if you want depth; *Challenge* if you want to stand out.
5. **Checkpoint from memory (10 min).** Answer without scrolling up, then open the answers. Wrong answers go on a revision list.
6. **Journal (5 min).** Three lines: what I built, what surprised me, what I measured.

**Spaced revision:** re-answer a lesson's checkpoint after 2 days, 1 week and 1 month.

## 4. Weekly and semester plans

**8 hours a week** (the default pace): two 3-hour lesson sessions + one 2-hour block for review, exercises and your project. About one lesson per session, so a 10-lesson tier takes ~5 weeks including its capstone.

**15 hours a week** (intensive): one extra lesson per week; spend the saved time on the *Challenge* exercises.

**A 12-week semester block (≈ 100 h)**

| Weeks | Focus | Output |
|---|---|---|
| 1–2 | A01–A04 (LLM APIs, context, RAG, evals) | an eval harness for a small RAG app |
| 3–4 | AG01–AG05 (loop, tools, planning, memory) | your own agent loop and tool linter |
| 5–6 | AG06–AG10 (agentic RAG, workflows, graphs, guardrails, MCP) | a durable, guarded workflow |
| 7–8 | AG11–AG14 (multi-agent, coding, computer use, evals) | an eval gate that catches a regression |
| 9–10 | AG15 capstone | a shipped agent: API, traces, eval report, threat model |
| 11–12 | one Applied project (AP01–AP06) | a written case study |

## 5. Using this next to a university course

Map the course *topics* to lessons rather than course codes (course content differs between institutions):

| Course topic | Lessons |
|---|---|
| Linear/logistic regression, optimisation, evaluation | B02–B07 |
| Trees, ensembles, tabular ML | B08, B05 |
| Neural nets, backprop, training | B09, Electives/Course-Companions |
| CNNs, transfer learning | I01–I02, Electives/Deep-Learning |
| Sequence models, attention, transformers | I03–I06 |
| Embeddings, retrieval, NLP applications | I07, A03 |
| Reinforcement learning, planning, search | I08, E03, Electives/Classical-AI |
| LLMs, prompting, fine-tuning, alignment | A01–A07, E04 |
| Agents and tool use | AG01–AG15 |
| Knowledge graphs and symbolic AI | Electives/Classical-AI |
| Research methods, dissertation | E01–E02, E10 |

**Good habits when studying alongside a course:** read your own lecture notes first and use these lessons to *practise*; reproduce results in your own words and code; cite any outside material you use; never submit repository code as your own work.

## 6. Building a portfolio

Aim for **three finished, written-up projects**:

1. One tier capstone (B10, A10 or AG15): shows end-to-end ownership.
2. One Applied project in your target area (support, documents, data, research, code review, ops).
3. One *original* project: change the data, the model or the evaluation, and say what you learned.

For each, publish a README with: **problem and users → success metric → design diagram → results table (with baselines) → failure analysis → cost/latency → what I'd do next**. Reviewers care far more about the measured failure analysis than about the architecture diagram.

## 7. Revision and exam preparation

- Keep a one-page **formula and concept sheet per tier** (loss functions, metrics, attention, LoRA, DPO, agent loop, eval metrics).
- Re-derive, don't re-read: gradient of logistic loss, softmax + cross-entropy, scaled dot-product attention, bias-variance, Bellman update, DPO loss.
- Use [EXAM_PREPARATION_GUIDE.md](./EXAM_PREPARATION_GUIDE.md) for strategies and practice formats, and the *Checkpoint* sections for retrieval practice.
- Explain each lesson aloud in five minutes without notes: where you stall is where to revise.

## 8. Common problems and fixes

| Problem | Fix |
|---|---|
| "My notebook fails on import" | `pip install -r requirements.txt`; extras per lesson in `requirements-extras.txt`; Python 3.10+ |
| "I don't have an API key / budget" | Everything core runs OFFLINE. For LIVE runs use a small model via `AGENTKIT_MODEL`, keep `max_turns` low, watch `tracer.cost_usd` |
| "The agent works once, fails next time" | That is normal: build an eval set (A04, AG14) and measure pass rates, not single runs |
| "Math feels heavy" | Do the numeric examples first, derive second; B01–B02 build the intuition for the rest |
| "I'm stuck on a lesson" | Reduce to the smallest failing cell, print intermediate values, then open an issue with the lesson ID and the cell |
| "Too many frameworks" | Learn the loop (AG02) and graphs (AG08) once; frameworks are conveniences over the same ideas |

## 9. FAQ

**Do I need a GPU?** No. Core lessons run on CPU; optional extras note when a GPU helps.
**Do I need an API key?** No. Agent/LLM lessons replay a recorded trace offline; add a key to run live.
**Can I use this to teach a class or study group?** Yes, it's MIT-licensed open study material. Credit the project ([CITATION.cff](../CITATION.cff)) and consider contributing improvements.
**Is this official course material?** No. It is independent personal learning material.
**How do I contribute?** See [CONTRIBUTING.md](../CONTRIBUTING.md).

# Curriculum: From Zero to Agentic AI Engineer

> **Audience:** Master's-level students who want to go from ML fundamentals to *building, evaluating and shipping* agentic systems.
> **Design rule:** every tier has the **same shape**, every lesson has the **same template**, and every lesson ends in something you can **run**.

## 1. The standard pattern

| Tier | Folder | Lessons | Question it answers | Exit test (you can…) |
|---|---|---|---|---|
| **Basic** | `Basic/` | **10** (B01–B10) | How does a machine *learn* from data? | …train, evaluate and debug a classical ML + small neural model end-to-end |
| **Intermediate** | `Intermediate/` | **10** (I01–I10) | How do deep nets handle images, sequences and language? | …build a tokenizer → mini-GPT → embedding search from scratch |
| **Advanced** | `Advanced/` | **10** (A01–A10) | How do I engineer with LLMs reliably? | …ship a RAG app with structured outputs, evals and guardrails |
| **Agents** | `Agents/` | **15** (AG01–AG15) | How do I build systems where the model *decides and acts*? | …build, test, trace and deploy a tool-using multi-step agent |
| **Applied** | `Applied/` | **10** (AP01–AP10) | How does this look on a real business problem? | …deliver a working solution to a realistic brief, with metrics |
| **Expert** | `Expert/` | **10** (E01–E10) | What is at the frontier, and how do I contribute? | …reproduce a paper, run a clean ablation, write it up |
| *Electives* | `Electives/` | — | Classical AI, university-course extras, legacy frameworks | (optional depth; not on the main path) |

**The last lesson of every tier is a capstone** (B10, I10, A10, AG15, AP10, E10): no new theory, you integrate the tier and ship something.
**Total: 65 core lessons ≈ 215 hours** (~27 weeks at 8 h/week, or ~5–6 weeks full-time).

```
Basic ─▶ Intermediate ─▶ Advanced ─▶ Agents ─▶ Applied ─▶ Expert
 (learn)    (represent)     (engineer)  (act)     (deliver)  (advance)
   └────────── ML/DL core ───────────┘└─── agentic path ───┘
```

**Fast track to agentic development (if you already know ML):** `A01 → A02 → A03 → A04 → AG01 → AG15 → AP01–AP06`  (≈ 90 h).

## 2. The standard lesson template

Every notebook has these sections, in this order, so you always know where you are:

| # | Section | Purpose |
|---|---|---|
| 0 | **Header** (tier · lesson n of N · time · mode · prereqs · what you build) | set expectations |
| 1 | **🎯 Why this matters** + a **real scenario** | motivation tied to a job-shaped problem |
| 2 | **🧭 Learning objectives** (3–5, measurable, verb-first) | what "done" means |
| 3 | **Concept** (intuition first, then formalism / math where it helps) | understand before coding |
| 4 | **Build it** (from scratch, small, guided) | own the mechanism |
| 5 | **Use it** (the library / API version on a realistic use case) | transfer to practice |
| 6 | **Break it** (failure modes, debugging, adversarial input) | engineering judgment |
| 7 | **Exercises**: Practice (30 min) · Stretch (60 min) · Challenge (2 h) with self-check `assert`s | deliberate practice |
| 8 | **✅ Checkpoint** (4 questions + collapsible answers) | retrieval practice |
| 9 | **📌 Takeaways + 📚 Further reading + Next lesson** | consolidate and connect |

**Hands-on guarantees**
1. Runs top-to-bottom with **no API key and no GPU** (agent/LLM lessons use a *scripted replay* offline; set `ANTHROPIC_API_KEY` to run **live** against Claude, same code).
2. Uses **realistic data** (synthetic generators or tiny bundled datasets), never `foo`/`bar`.
3. Has **assertions** that fail if the lab is wrong. Notebooks are executed in CI-style by `tools/nbtest.py`.
4. One **trace / metric** to look at, so you build the habit of measuring.

## 3. Lesson map

Status legend: ✅ ready · 🆕 new in this revision · ♻️ retained from the old repo (moved/renumbered).

### Basic: *Learn from data* (10 lessons, ~27 h)
| ID | Lesson | Real use case / lab | Status |
|---|---|---|---|
| B01 | Tensors & Linear Algebra for ML | vectors/matrices as data; similarity of customers | ♻️ |
| B02 | Linear Regression & Gradient Descent | predict house prices; watch GD converge | ♻️ |
| B03 | Binary Classification | spam / churn with logistic regression | ♻️ |
| B04 | Multi-Class Classification | digit / product-category classification, softmax | ♻️ |
| B05 | Data Preprocessing & Feature Engineering | clean a messy customer table, leak-free pipelines | ♻️ |
| B06 | Model Evaluation & Metrics | precision/recall trade-offs for fraud; ROC/PR | ♻️ |
| B07 | Regularization & Overfitting | bias-variance, validation curves | ♻️ |
| B08 | Decision Trees & Gradient Boosting | credit-risk model; why trees win on tables | ♻️ |
| B09 | Neural Networks from Scratch | backprop in NumPy, then compare to a framework | ♻️ |
| B10 | **Capstone: End-to-End ML Project** | problem → data → model → metrics → write-up | ♻️ |

### Intermediate: *Representations: vision, sequences, language* (10 lessons, ~31 h)
| ID | Lesson | Real use case / lab | Status |
|---|---|---|---|
| I01 | Convolutional Neural Networks | image classifier for product photos | ♻️ |
| I02 | Transfer Learning & Fine-tuning | adapt a pretrained net with 200 images | ♻️ |
| I03 | Recurrent Networks (RNN/LSTM) | sequence forecasting; why RNNs struggle | ♻️ |
| I04 | Attention & Transformers | implement self-attention; read the heads | ♻️ |
| I05 | Tokenization & Byte-Pair Encoding | build a BPE tokenizer; token costs & quirks | ♻️ |
| I06 | Building a Mini Language Model | tiny GPT that learns to write | ♻️ |
| I07 | Embeddings & Semantic Search | meaning as vectors; search a FAQ corpus (the base of RAG) | 🆕 |
| I08 | Reinforcement Learning: Q-Learning & DQN | reward, policy, exploration: the *agent* idea in its simplest form | ♻️ |
| I09 | Generative Models: VAEs, GANs, Diffusion (intuition + code) | generate & interpolate; how images/audio models work | 🆕 |
| I10 | **Capstone: Text Classifier + Semantic Search App** | ship an app combining I04–I07 | 🆕 |

### Advanced: *LLM engineering* (10 lessons, ~32 h)
| ID | Lesson | Real use case / lab | Status |
|---|---|---|---|
| A01 | LLM APIs, Structured Output & Cost | extract invoice fields to a validated schema; token/cost accounting | 🆕 |
| A02 | Prompting & Context Engineering | system prompts, few-shot, context budgets, prompt-injection basics | 🆕 |
| A03 | Retrieval-Augmented Generation | chunk → embed → retrieve → rerank → cite; handbook Q&A | 🆕 |
| A04 | Evaluating LLM Systems | golden sets, LLM-as-judge, regression tests, eval-driven dev | 🆕 |
| A05 | Fine-tuning: SFT, LoRA & QLoRA | implement LoRA from scratch in NumPy; when *not* to fine-tune | 🆕 |
| A06 | Preference Tuning & RL for LLMs | RLHF → DPO → GRPO / verifiable rewards, from scratch on a toy | 🆕 |
| A07 | Reasoning Models & Test-Time Compute | best-of-N, self-consistency, verifiers; cost vs accuracy | 🆕 |
| A08 | Multimodal: Vision, Documents & Audio | PDF/receipt understanding; image Q&A | 🆕 |
| A09 | Serving, Inference Optimization & Cost | batching, KV-cache, quantization, prompt caching, routing | 🆕 |
| A10 | **Capstone: Production RAG App with Evals & Guardrails** | internal knowledge assistant with a measured quality bar | 🆕 |

### Agents: *Systems that decide and act* (15 lessons, ~47 h): the heart of this repo
| ID | Lesson | Real use case / lab | Status |
|---|---|---|---|
| AG01 | What Is an Agent? Workflows vs Agents | decide agent vs workflow for 6 real tickets; autonomy ladder | 🆕 |
| AG02 | The Agent Loop from Scratch | order-support agent with no framework | ✅ |
| AG03 | Tools Done Right | design tool schemas/errors/idempotency; a tool-design linter | 🆕 |
| AG04 | Planning & Reasoning Patterns | ReAct, plan-and-execute, reflection on a trip-planner | 🆕 |
| AG05 | Memory & Context Engineering | scratchpad, summaries, long-term memory, compaction for a long-running assistant | 🆕 |
| AG06 | Agentic RAG | retrieval as a tool, query rewriting, grading, citations | 🆕 |
| AG07 | Workflow Patterns | chaining, routing, parallelization, orchestrator-workers, evaluator-optimizer on a content pipeline | 🆕 |
| AG08 | LangGraph: State, Graphs & Durable Execution | rebuild AG07 as a graph with checkpoints & resume | 🆕 |
| AG09 | Human-in-the-Loop, Permissions & Guardrails | approval gates, sandboxing, allow/deny policies | 🆕 |
| AG10 | MCP: Model Context Protocol | write an MCP server + client; expose a company DB as tools | 🆕 |
| AG11 | Multi-Agent Systems | supervisor, handoffs, subagents with isolated context (and when *not* to) | 🆕 |
| AG12 | Coding Agents | mini coding agent: read/edit/run tests; Agent SDK, skills & hooks overview | 🆕 |
| AG13 | Computer-Use & Browser Agents | observe→act loops on a simulated UI; safety | 🆕 |
| AG14 | Evaluation, Observability & Reliability | trace → dataset → eval → regression; cost/latency SLOs | 🆕 |
| AG15 | **Capstone: Ship a Production Agent** | API + UI + tracing + evals for one of four briefs | 🆕 |

### Applied: *Real briefs, real metrics* (10 lessons, ~40 h)
| ID | Lesson (project) | Deliverable | Status |
|---|---|---|---|
| AP01 | Customer-Support Copilot | RAG + tools + escalation; measured deflection | 🆕 |
| AP02 | Document Intelligence | invoices → validated JSON → exceptions queue | 🆕 |
| AP03 | Data-Analyst Agent | text-to-SQL + charts with read-only guardrails | 🆕 |
| AP04 | Deep-Research Assistant | multi-source research with citations & fact-check pass | 🆕 |
| AP05 | Code-Review / PR Agent | review diffs, flag risks, propose fixes, eval on seeded bugs | 🆕 |
| AP06 | Ops Automation via MCP | triage inbox/tickets, call internal tools, audit log | 🆕 |
| AP07 | Multimodal & Voice Agent | inspection photos / call transcripts → actions | 🆕 |
| AP08 | Optimizing LLM Pipelines with DSPy | metric-driven prompt optimization | ♻️ |
| AP09 | Serving AI Apps with FastAPI | streaming, auth, rate-limits, cost control | ♻️ |
| AP10 | **Capstone: Portfolio Project** (+ Vector Search in Production) | choose a brief, deploy, write the case study | ♻️ 🆕 |

### Expert: *Frontier & research* (10 lessons, ~38 h)
| ID | Lesson | Lab | Status |
|---|---|---|---|
| E01 | Reading & Reproducing Papers | reproduce a small result; paper-reading protocol | 🆕 |
| E02 | Experimental Design, Ablations & Statistics | seeds, confidence intervals, honest comparisons | 🆕 |
| E03 | Deep Reinforcement Learning | policy gradients / PPO on a toy env | 🆕 |
| E04 | RLHF, DPO & GRPO in Depth | derive & implement the losses; reward hacking | 🆕 |
| E05 | Efficient Architectures: MoE, SSMs, Attention Variants | implement top-k routing; compare costs | 🆕 |
| E06 | Self-Supervised & Continual Learning | contrastive loss; forgetting & replay | 🆕 |
| E07 | Interpretability Basics | probes, attention maps, sparse-autoencoder intuition | 🆕 |
| E08 | Frontier Agent Research & Benchmarks | long-horizon agents, benchmark pitfalls, contamination | 🆕 |
| E09 | Agent Safety, Security & Red-Teaming | prompt injection, tool abuse, sandboxing, threat model | 🆕 |
| E10 | **Capstone: Research Project & Write-up** | proposal → experiments → 4-page paper | 🆕 |

### Electives (kept, off the main path)
`Electives/Classical-AI` (logic, expert systems, search, genetic algorithms, fuzzy/Bayesian) ·
`Electives/Deep-Learning` (advanced optimizers, normalization, detection, GNNs, advanced transformers) ·
`Electives/University-Courses` (COMPSCI 713/714 companions) · `Electives/Research` (continual learning) ·
`Electives/Frameworks` (LlamaIndex, earlier agent notes; **written against older APIs: read as history, use AG06/AG08 for current practice**).

## 4. Detailed specs for lessons marked 🆕

> Used as the authoring brief. Each bullet list is the *minimum* content. See [tools/LESSON_AUTHORING.md](./tools/LESSON_AUTHORING.md).

### Intermediate
- **I07 Embeddings & Semantic Search.** Objectives: explain embeddings as learned geometry; compute cosine/dot similarity; build TF-IDF → dense-embedding search; evaluate with recall@k/MRR; understand ANN (HNSW intuition). Lab: 200-doc FAQ corpus; offline uses TF-IDF+SVD "embeddings" and an optional `sentence-transformers` cell guarded by try/except. Break it: synonyms, negation, long documents. Real use: help-center search.
- **I09 Generative Models.** VAE (ELBO, reparameterization) in NumPy/PyTorch-guarded on 2-D toy data; GAN training instability demo; diffusion = learn to denoise (1-D/2-D toy forward/reverse process); text-to-image pipeline overview. Real use: synthetic data / augmentation.
- **I10 Capstone.** Build a support-ticket classifier (I04–I06 ideas, sklearn/NumPy baseline vs small net) + semantic search over past tickets, evaluate both, package as a tiny CLI/Streamlit-ready module.

### Advanced
- **A01 LLM APIs, Structured Output & Cost.** Messages API anatomy, system prompts, streaming concept, tokens & pricing, retries/timeouts, **structured outputs** with Pydantic validation + repair loop. Offline: replay. Lab: invoice extraction with schema validation; cost calculator.
- **A02 Prompting & Context Engineering.** Role/instructions/examples/format; few-shot selection; chain-of-thought vs. reasoning models; context budgeting; **prompt injection** 101; prompt versioning. Lab: A/B two prompts on a labelled set (offline judge).
- **A03 RAG.** Chunking strategies (fixed/semantic/structure-aware), embeddings, hybrid BM25+dense, reranking, citations, "I don't know" behavior, failure taxonomy. Lab: handbook Q&A with recall@k and answer-faithfulness checks.
- **A04 Evaluating LLM Systems.** Golden datasets, unit-test-style checks, LLM-as-judge pitfalls (bias, position), calibration against humans, regression gates, cost/latency. Lab: build an eval harness and catch a seeded regression.
- **A05 Fine-tuning.** When to fine-tune vs prompt vs RAG; SFT data quality; **LoRA from scratch in NumPy** (low-rank update, parameter count, merge); QLoRA idea; eval for forgetting. Lab: LoRA on a toy regression/classification to show rank vs. quality.
- **A06 Preference Tuning & RL for LLMs.** Bradley-Terry reward model, RLHF/PPO overview, **DPO loss derivation + implementation on a toy policy**, GRPO/verifiable rewards, reward hacking. Lab: toy bandit-"LLM" over 4 answer styles trained with DPO.
- **A07 Reasoning & Test-Time Compute.** Self-consistency, best-of-N with verifier, search over reasoning, budgets/effort settings, when thinking helps. Lab: simulate N-sample voting accuracy vs cost curves; math-problem verifier.
- **A08 Multimodal.** Vision-language inputs, document parsing (PDF/images), OCR vs native vision, audio (ASR/TTS) overview, chart/table extraction. Lab: receipt extraction pipeline with schema and confidence routing (offline synthetic receipts).
- **A09 Serving & Cost.** Latency anatomy (TTFT, tokens/s), batching, KV-cache, quantization trade-offs, **prompt caching**, model routing/cascades, batch APIs. Lab: cost/latency simulator + router that sends easy queries to a cheap model (measure quality loss).
- **A10 Capstone.** Production RAG app: ingestion, retrieval, generation w/ citations, guardrails (PII, injection, refusal), eval gate, tracing. Deliver README with measured metrics.

### Agents (full spec; the most important track)
- **AG01 What Is an Agent?** Definitions (workflow vs agent), the autonomy ladder (L0 single call → L4 open-ended), the 4-question test (complexity, value, viability, cost of error), anatomy (model, tools, memory, loop, guardrails), failure modes tour. Lab: classify 8 real-world tasks with a scoring rubric; build a decision helper function with tests.
- **AG03 Tools Done Right.** Naming/description craft, input schemas & enums, strict schemas, error messages that guide recovery, idempotency & dry-run, pagination/truncation, tool-count vs accuracy, "agent-computer interface" mindset. Lab: write a tool *linter* that scores schemas; fix 5 bad tools; measure offline selection accuracy with a policy model.
- **AG04 Planning & Reasoning.** ReAct, plan-and-execute, reflection/self-critique, verification steps, when thinking models replace scaffolding. Lab: trip/itinerary planner with constraints; compare single-shot vs plan-execute vs reflect on a scored task.
- **AG05 Memory & Context Engineering.** Context as a scarce budget; scratchpad/notes files; conversation summarization & **compaction**; long-term memory store (key-value + semantic) with write/read policies; context rot; prompt caching implications. Lab: a long-running assistant that survives 50 turns within a token budget.
- **AG06 Agentic RAG.** Retrieval as a tool, query decomposition/rewriting, relevance grading + retry, multi-hop, citations, when classic RAG suffices. Lab: policy-handbook agent; measure answer correctness and tool calls.
- **AG07 Workflow Patterns.** Prompt chaining, routing, parallelization (sectioning/voting), orchestrator-workers, evaluator-optimizer: each with code + when to use. Lab: content pipeline using all five on one task.
- **AG08 LangGraph.** State schema/reducers, nodes/edges/conditional edges, checkpointing & time-travel, streaming, resume after failure, subgraphs. Lab: port AG07 to a graph; kill & resume. (Graceful offline path: implement a mini graph engine first, then show LangGraph code guarded by try/except ImportError.)
- **AG09 HITL, Permissions & Guardrails.** Approval gates, interrupt/resume, allow/deny policies, sandboxing, input/output guardrails, rate/budget limits, audit logs. Lab: policy engine wrapped around `run_agent`; red-team it.
- **AG10 MCP.** Protocol concepts (host/client/server; tools, resources, prompts; stdio/HTTP), writing a server with the official Python SDK (guarded import) *and* a from-scratch JSON-RPC mini-server to see the wire format; security (tool poisoning, auth). Lab: expose a SQLite "CRM" as MCP tools; connect an agent.
- **AG11 Multi-Agent Systems.** Why/why not; supervisor, handoff, subagent with context isolation, shared state, cost multipliers, failure cascades; A2A overview. Lab: research team (lead + 2 workers) with token accounting vs single agent.
- **AG12 Coding Agents.** Tool surface (read/grep/edit/bash), sandboxing, test-driven loops, diff-based edits, SWE-bench-style evaluation, repo context; Claude Agent SDK, skills, hooks & subagents overview. Lab: mini coding agent that fixes seeded bugs in a temp repo, verified by pytest.
- **AG13 Computer-Use & Browser Agents.** Screenshot→action loop, coordinate vs DOM/accessibility actions, latency/cost, safety (injection from web content, confirmation). Lab: simulated GUI environment (grid UI) with an observe-act loop and success metric.
- **AG14 Evaluation, Observability & Reliability.** Traces (spans, OTel concepts), trajectory vs outcome evals, LLM judges, regression suites, flaky-test handling (pass@k), cost/latency budgets, canaries; failure taxonomy. Lab: eval harness over AG02/AG06 agents with a seeded regression caught by CI-style gate.
- **AG15 Capstone.** Pick one brief (support, research, data, coding). Deliver: agent + API (FastAPI) + simple UI + traces + eval report + cost table + threat model.

### Applied (each = brief → design doc → build → eval → write-up; offline synthetic data, live optional)
- AP01 support copilot · AP02 doc intelligence · AP03 data analyst (SQLite, read-only guard, chart via matplotlib) · AP04 deep research (offline mini web corpus) · AP05 PR review agent (seeded-bug diffs; precision/recall of findings) · AP06 ops automation via MCP (tickets/email/calendar mocks; audit log) · AP07 multimodal & voice (synthetic images/transcripts) · AP08 DSPy (♻️ update to current API) · AP09 FastAPI (♻️ update) · AP10 capstone portfolio + vector search in production (♻️ update).

### Expert
- **E01** paper-reading protocol (3-pass), reproduce a small result (e.g., label smoothing or LoRA rank effect) with seeds. **E02** variance across seeds, bootstrap CIs, paired tests, ablation tables, p-hacking traps. **E03** REINFORCE→PPO on a gridworld/cartpole-like env in NumPy. **E04** derive/implement RLHF-style KL-regularized objective, DPO, GRPO advantage on toy; reward hacking demo. **E05** MoE router + load-balancing loss; SSM/linear attention vs softmax attention cost; FlashAttention idea. **E06** SimCLR/InfoNCE loss; catastrophic forgetting + replay/EWC on split tasks. **E07** linear probes, activation patching idea, SAE toy. **E08** long-horizon agent benchmarks, contamination, eval validity, reading SWE-bench/agent-eval papers critically; reproduce a mini-benchmark. **E09** threat model (STRIDE for agents), direct/indirect prompt injection, tool-abuse, exfiltration, defenses & residual risk; red-team harness. **E10** research capstone with proposal template, experiment log, 4-page write-up template.

## 5. Quality bar & maintenance
- A lesson is **✅ only if** `python tools/nbtest.py "<path>"` passes offline and it follows the template.
- API/model facts live in **one place per track** (`agentkit/llm.py` for the model ID; lesson text points to docs, not hard-coded prices, except in the `agentkit.trace.PRICES` table).
- Re-verify framework versions each term; remove or banner anything that targets a deprecated API.
- Never commit secrets: `.env` is git-ignored; use `Applied/.env.example` as the template.

## 6. Naming conventions

One rule set, enforced by `python tools/check_names.py` and applied by `python tools/rename_notebooks.py`.

| Thing | Convention | Example |
|---|---|---|
| **Lesson notebook** | `<ID>-<kebab-title>.ipynb`: lowercase ASCII, hyphens only, **no spaces, parentheses or underscores** | `AG03-tools-done-right.ipynb` |
| **Lesson ID** | tier prefix + two digits: `B` Basic · `I` Intermediate · `A` Advanced · `AG` Agents · `AP` Applied · `E` Expert | `A04`, `AG12`, `AP03` |
| **Capstone** | last lesson of the tier; slug starts with `capstone-` | `AG15-capstone-ship-a-production-agent.ipynb` |
| **Elective** | legacy ID kept (letter suffix allowed) inside a themed folder | `Electives/Classical-AI/I01a-search-algorithms-bfs-dfs-a-star-mcts.ipynb` |
| **Tier folder** | `TitleCase`, singular tier name (stable, so published links never move) | `Agents/` |
| **Elective folders** | `Title-Case-With-Hyphens` | `Electives/Deep-Learning/` |
| **Helper package / tools** | `snake_case` Python modules; scripts are verbs | `agentkit/trace.py`, `tools/nbtest.py` |
| **Docs** | `README.md` per folder; other guides `UPPER_SNAKE.md` | `SETUP.md`, `CURRICULUM.md` |
| **Data / assets** | `data/` and `assets/` next to the notebook, kebab-case files, each small (< 5 MB) | `Basic/data/housing-sample.csv` |
| **Secrets** | `.env` (git-ignored) and `.env.example` (committed, no values) | |

**Why this shape.** URLs and Colab links never need `%20` escaping; IDs sort in learning order; the ID alone is a stable handle used everywhere (`AG06`), while the slug is just a human hint; titles live in exactly one place (`tools/curriculum.json`) and the filename is *derived* from it, so renaming a lesson is a one-line change plus `rename_notebooks.py --apply`.

**Titles** (shown in READMEs) are written in Title Case and are 2–8 words; filenames are the slug of the title (`&` → `and`).

**Inside a notebook:** the first cell is `# <ID> · <Title>`; sections use the ten template headings in §2; variables `snake_case`; offline replays are named `script`/`policy`; no emojis in code, only in headings.

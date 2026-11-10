<div align="center">

<img src="./logo/logo_v1.png" width="160" height="160" alt="AI Engineering logo"/>

# AI Engineering: From Foundations to Production Agents

Open AI engineering curriculum, from ML fundamentals to RAG, agents, and deployment. Jupyter notebooks and supporting docs (MIT).

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)
[![Python 3.10+](https://img.shields.io/badge/Python-3.10%2B-3776AB?logo=python&logoColor=white)](./requirements.txt)

[Start here](#start-here) · [Curriculum](#curriculum) · [Live demos](https://nexageapps.github.io/AI/) · [Full curriculum spec](./documentation/CURRICULUM.md)

</div>

---

## What this is

A self-paced course in Jupyter notebooks. It goes from classical machine learning to LLM apps, RAG, and tool-using agents. Lessons on the standard template start from a realistic problem, build the idea from scratch, then use a standard library.

- Lessons are written to run on a laptop CPU. No GPU is needed.
- LLM lessons run **offline by default** using recorded replies, so they are free. Add an Anthropic API key to run them live.

## Who this is for

- Software engineers moving into AI engineering.
- Students who want hands-on notebooks next to their coursework.
- Data scientists who want to learn LLM apps and agents.

You should be comfortable with basic Python. The Basic tier covers the maths you need as you go.

## Start here

**1. Get the code**

```bash
git clone https://github.com/nexageapps/AI.git
cd AI
```

**2. Set up Python (3.10 or newer)**

```bash
python -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate
pip install -r requirements.txt
jupyter lab
```

**3. Open your first notebook**

| If you are... | Start with |
|---|---|
| New to machine learning | [B01 Tensors and Linear Algebra for ML](./Basic/B01-tensors-and-linear-algebra-for-ml.ipynb) |
| Comfortable with ML, new to LLMs | [A01 LLM APIs, Structured Output and Cost](./Advanced/A01-llm-apis-structured-output-and-cost.ipynb) |
| Already building with LLMs | [AG01 What Is an Agent: Workflows vs Agents](./Agents/AG01-what-is-an-agent-workflows-vs-agents.ipynb) |

The first cell of each LLM lesson prints `OFFLINE` or `LIVE` so you know which mode you are in.

## Curriculum

Six tiers, taken in order. Each tier folder has its own README with the full lesson table.

| # | Tier | Question it answers | Lessons | Approx. time | Status |
|---|---|---|---|---|---|
| 1 | [Basic](./Basic/) | How does a machine learn from data? | B01 to B10 | 26.5 h | All 10 available, being moved to the new lesson template |
| 2 | [Intermediate](./Intermediate/) | How do deep nets handle images, sequences and language? | I01 to I10 | 31 h | 7 available, 3 planned (I07, I09, I10) |
| 3 | [Advanced](./Advanced/) | How do I engineer with LLMs reliably? | A01 to A10 | 32 h | All 10 ready |
| 4 | [Agents](./Agents/) | How do I build systems where the model decides and acts? | AG01 to AG15 | 47 h | All 15 ready |
| 5 | [Applied](./Applied/) | How does this look on a real business problem? | AP01 to AP10 | 40 h | 7 ready, 3 being updated |
| 6 | [Expert](./Expert/) | What is at the frontier, and how do I contribute? | E01 to E10 | 37.5 h | Planned. Only early outlines exist |

"Ready" means the lesson follows the standard template and passes `tools/nbtest.py`. Status is generated from the files by `tools/gen_readmes.py`, so the tier READMEs are the source of truth.

### What each tier covers

- **Basic:** linear algebra, regression, classification, preprocessing, metrics, regularisation, trees and boosting, a neural network from scratch, and a capstone.
- **Intermediate:** CNNs, transfer learning, RNNs, attention and transformers, BPE tokenisation, a mini language model, and Q-learning.
- **Advanced:** LLM APIs and structured output, prompting and context engineering, RAG, evaluation, fine-tuning (SFT, LoRA, QLoRA), preference tuning, reasoning models, multimodal input, serving and cost. Capstone: a production RAG app with evals and guardrails.
- **Agents:** the agent loop from scratch, tool design, planning, memory, agentic RAG, workflow patterns, LangGraph, human-in-the-loop, MCP, multi-agent systems, coding and browser agents, evaluation and observability. Capstone: ship a production agent.
- **Applied:** realistic briefs such as a support copilot, document intelligence, a data-analyst agent, a research assistant, code review, ops automation via MCP, DSPy, FastAPI serving and vector search.
- **Expert:** planned topics include reproducing papers, ablations, deep RL, RLHF and DPO, efficient architectures, interpretability and agent safety.

### Electives

[Electives](./Electives/) holds optional notebooks outside the main path:

| Folder | Topics |
|---|---|
| [Classical-AI](./Electives/Classical-AI/) | Symbolic logic, expert systems, Bayesian and fuzzy logic, search (BFS, DFS, A*, MCTS), genetic algorithms |
| [Deep-Learning](./Electives/Deep-Learning/) | Optimisers, regularisation, normalisation, CNN architectures, detection and segmentation, GNNs |
| [Frameworks](./Electives/Frameworks/) | LLM-based agents, LlamaIndex, indexing strategies |
| [Course-Companions](./Electives/Course-Companions/) | Neural network theory, training, transfer learning, RNNs, practice projects |
| [Research](./Electives/Research/) | Continual and lifelong learning |

> **Note on file names.** Some tier folders still contain older files named like `A01 - Fine-tuning Large Language Models.ipynb`. These are legacy stubs from an earlier version and are due for removal. Use the lowercase, hyphenated files (for example `A01-llm-apis-structured-output-and-cost.ipynb`), which are the ones linked from each tier README.

## Interactive demos

Small browser apps that show a concept visually. They live in [`application/`](./application/) and deploy to GitHub Pages. The index is at **[nexageapps.github.io/AI](https://nexageapps.github.io/AI/)**.

| Demo | Concept |
|---|---|
| [Wumpus World](https://nexageapps.github.io/AI/wumpus/) | Knowledge-based agents and logical reasoning |
| [Symbolic Logic](https://nexageapps.github.io/AI/symbolic-logic/) | Symbolic logic and reasoning |
| [Neural Network](https://nexageapps.github.io/AI/neural-network/) | Neural network basics |
| [NN Trainer](https://nexageapps.github.io/AI/nn-trainer/) | Forward pass, backprop and weight updates |
| [Mountain Explorer](https://nexageapps.github.io/AI/gradient-descent/) | Gradient descent and learning rates |
| [Model Evaluation](https://nexageapps.github.io/AI/ai-fundamentals/week3/model-evaluation/) | Model evaluation metrics |
| [CNN Explorer](https://nexageapps.github.io/AI/neural-networks/week3/cnn-explorer/) | Filters, feature maps and pooling |
| [Transformer Explorer](https://nexageapps.github.io/AI/neural-networks/week4/transformer-explorer/) | Self-attention |
| [BPE Explorer](https://nexageapps.github.io/AI/neural-networks/week4/bpe-explorer/) | Byte pair encoding |

A few other apps in `application/` (RNN Explorer, Knowledge Graph Playground, Data Preprocessing Studio, Blindfold Hill) are in the repo but not live right now.

## Repository layout

```
AI/
├── Basic/ Intermediate/ Advanced/   Core tiers 1 to 3 (notebooks + generated README)
├── Agents/ Applied/ Expert/         Core tiers 4 to 6
├── Electives/                       Optional notebooks
├── agentkit/                        Small helper library: LLM client, offline replay, tools, tracing
├── application/                     Interactive browser demos (deployed to GitHub Pages)
├── documentation/                   Curriculum spec, student guide, learning paths
├── tools/                           Notebook tests, README generator, naming checks
├── requirements.txt                 Core dependencies
└── requirements-extras.txt          Optional per-lesson extras (PyTorch, LangGraph, MCP, FastAPI...)
```

## Running locally

Core setup is in [Start here](#start-here). A few lessons need extra packages:

```bash
# Only install what a lesson asks for, e.g. PyTorch for deep-learning cells
pip install -r requirements-extras.txt

# Applied tier (FastAPI, DSPy, Chroma, Pinecone)
pip install -r Applied/requirements.txt
```

**Live LLM mode (optional).** Set `ANTHROPIC_API_KEY` in your shell, or in a `.env` file at the repo root. Without a key, lessons replay recorded responses. See [`Applied/.env.example`](./Applied/.env.example) for the other optional variables (`AGENTKIT_MODEL`, `AGENTKIT_OFFLINE`, `PINECONE_API_KEY`). Live mode calls a paid API, so check your usage.

**Check a notebook runs end to end:**

```bash
python tools/nbtest.py "Agents/AG03*.ipynb"
python -m pytest -q agentkit/tests
```

## Contributing

Contributions are welcome: typo fixes, clearer explanations, better exercises, bug reports and new lessons.

1. Fork the repo and create a branch.
2. Make your change. New lessons follow the template in [CURRICULUM.md](./documentation/CURRICULUM.md) and [tools/LESSON_AUTHORING.md](./tools/LESSON_AUTHORING.md).
3. Run the checks listed in [CONTRIBUTING.md](./CONTRIBUTING.md).
4. Open a pull request from your fork.

`main` is protected. Every change goes through a pull request and is reviewed by the maintainer before merge. For a new lesson, please open a lesson proposal issue first.

Please follow the [Code of Conduct](./CODE_OF_CONDUCT.md).

## Security

If you find a security issue, such as a leaked secret or an unsafe code pattern, please do not open a public issue. See [SECURITY.md](./SECURITY.md) for how to report it privately.

## Community and support

- Chat with other learners on [Discord](https://discord.com/channels/1482175575488598109/1482175576168206590).
- If the course helps you, you can support it here: [![Buy Me A Book](https://img.shields.io/badge/Buy%20Me%20A%20Book-Support-yellow.svg)](https://buymeacoffee.com/fcc4sbsx5f6)
- Sponsored by [nexageapps](https://nexageapps.com).

## License

[MIT](./LICENSE). Copyright (c) 2026 Karthik Arjun. You can use, adapt and teach with this material. Please keep the licence notice. To cite it, use [CITATION.cff](./CITATION.cff).

## Disclaimer

This is independent study material. It is not official course material from any university and is not endorsed by one. Code and examples are for learning and are not production guarantees. If you are a student, follow your institution's academic integrity rules. See [ACADEMIC_INTEGRITY.md](./documentation/ACADEMIC_INTEGRITY.md).

---

Maintained by [Karthik Arjun](https://github.com/nexageapps).

<div align="center">

<img src="./logo/logo_v1.png" width="220" height="220" alt="AI & ML Roadmap Logo" style="border-radius: 50%; object-fit: cover; box-shadow: 0 4px 12px rgba(0,0,0,0.15);"/>

# AI Engineering: From Foundations to Production Agents

### Master AI, LLMs, Agents & Modern Frameworks

**Open-source AI engineering curriculum for building intelligent systems.**

From ML Fundamentals → LLMs & RAG → AI Agents → Production Deployment. Hands-on lessons with PyTorch, LangChain, LlamaIndex, DSPy, FastAPI & more.

[Curriculum](./documentation/CURRICULUM.md) • [Quick Start](#quick-start) • [Student Guide](./documentation/STUDENT_GUIDE.md) • [Exam Prep](./documentation/EXAM_PREPARATION_GUIDE.md) • [LinkedIn](https://www.linkedin.com/in/karthik-arjun-a5b4a258/) • [Support Project](https://buymeacoffee.com/fcc4sbsx5f6)

[![Python](https://img.shields.io/badge/Python-3.10+-orange.svg)](https://www.python.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![Lessons](https://img.shields.io/badge/Lessons-177-brightgreen.svg)](./documentation/CURRICULUM.md)
[![AI Agents](https://img.shields.io/badge/AI_Agents-LangChain_+_LlamaIndex-blue.svg)](#)
[![Production Ready](https://img.shields.io/badge/Production-FastAPI_+_Docker-green.svg)](#)
[![Sponsored by nexageapps](https://img.shields.io/badge/Sponsored%20by-nexageapps-blue.svg)](https://nexageapps.com)
[![Buy me a book](https://img.shields.io/badge/Buy%20Me%20A%20Book-Support-yellow.svg)](https://buymeacoffee.com/fcc4sbsx5f6)

</div>

---

## Open-Source Study Material

This repository is **free, open-source educational material** (MIT). Use it to teach yourself, run a study group or a course; fork it, translate it, send improvements. See [CONTRIBUTING.md](./CONTRIBUTING.md) and the [Code of Conduct](./CODE_OF_CONDUCT.md). If it helps you, please cite it ([CITATION.cff](./CITATION.cff)) and star the repo.

---

## Important Disclaimer

This is an **independent learning project**, shared openly as educational material. Use responsibly and follow your institution's academic integrity policies. See [Academic Integrity Policy](./documentation/ACADEMIC_INTEGRITY.md) for details.

---

## What Is This?

A **comprehensive AI engineering curriculum** from ML fundamentals to production AI agents and intelligent systems.

### What You'll Build

- **AI Agents** with LangChain, LangGraph, and LlamaIndex
- **RAG Systems** with vector databases (Pinecone, Weaviate, Chroma)
- **Production APIs** with FastAPI and modern deployment
- **LLM Applications** with prompt engineering and DSPy
- **Real Projects** from notebooks to deployed systems

### Learning Path

Basic ML → Deep Learning → LLMs & RAG → AI Agents → Production Systems → Advanced Research

### Pattern

| | |
|---|---|
| **Structure** | Basic **18** · Intermediate **26** · Advanced **15** · Agents **18** · Applied **35** · Expert **26** · Electives **39** = **177 lessons** (≈ 500+ h) |
| **Every Lesson** | real scenario → objectives → concept → build from scratch → use the real tool → **break it** → exercises (Practice/Stretch/Challenge) → checkpoint |
| **Hands-On** | runs **offline, free, no GPU**; agent lessons also run **live against Claude** with one environment variable |
| **Honest** | the table below is generated from the files on disk, so it can never promise lessons that don't exist |

### Status (auto-generated)

<!-- STATUS:START -->
| Tier | Lessons | Hours | Ready | Retained | Planned | Folder |
|---|---|---|---|---|---|---|
| **Basic**: Learn from data | 18 | 48 | 0 | 18 | 0 | [`Basic/`](./Basic) |
| **Intermediate**: Vision, sequences, language | 26 | 78 | 0 | 26 | 0 | [`Intermediate/`](./Intermediate) |
| **Advanced**: LLM engineering | 15 | 48 | 15 | 0 | 0 | [`Advanced/`](./Advanced) |
| **Agents**: AI agent systems | 18 | 56 | 18 | 0 | 0 | [`Agents/`](./Agents) |
| **Applied**: Production frameworks | 35 | 140 | 10 | 5 | 20 | [`Applied/`](./Applied) |
| **Expert**: Research frontiers | 26 | 92 | 0 | 0 | 26 | [`Expert/`](./Expert) |
| **Electives**: Specialized topics | 39 | 117 | 0 | 39 | 0 | [`Electives/`](./Electives) |
| **Total** | **177** | **579** | **43** | **88** | **46** | |
<!-- STATUS:END -->

### Tech Stack Covered

```
▸ Foundations          ▸ AI Agents              ▸ Production
├─ PyTorch              ├─ LangChain              ├─ FastAPI
├─ TensorFlow           ├─ LangGraph              ├─ Docker
├─ scikit-learn         ├─ LlamaIndex             ├─ Kubernetes
├─ NumPy/Pandas         ├─ DSPy                   ├─ CI/CD
└─ Transformers         └─ CrewAI                 └─ Monitoring

▸ Vector DBs           ▸ LLMs                   ▸ Frameworks
├─ Pinecone             ├─ OpenAI                 ├─ Haystack  
├─ Weaviate             ├─ Anthropic Claude       ├─ Semantic Kernel
├─ Qdrant               ├─ Open Source LLMs       └─ Guardrails AI
└─ Chroma               └─ Fine-tuning            
```

---

## Quick Start

```bash
git clone https://github.com/nexageapps/AI.git && cd AI
python -m venv .venv && source .venv/bin/activate      # Windows: .venv\Scripts\activate
pip install -r requirements.txt
jupyter lab
```

**Optional, for LIVE agent runs:** `export ANTHROPIC_API_KEY=sk-ant-...` (or put it in a git-ignored `.env`). Without a key, every agent notebook replays a recorded trace so you can still run and break everything for free. **Never commit keys.**

### Naming Convention

Lessons are named **`<ID>-<kebab-title>.ipynb`**, e.g. `AG03-tools-done-right.ipynb`: the ID is a tier letter plus two digits (`B` Basic, `I` Intermediate, `A` Advanced, `AG` Agents, `AP` Applied, `E` Expert), the title is lowercase-hyphenated with no spaces. The last lesson in each tier is the capstone. Full rules in [CURRICULUM.md §6](./documentation/CURRICULUM.md#6-naming-conventions); checked by `python tools/check_names.py`.

### Choose Your Path

| You are… | Do this | Time |
|---|---|---|
| New to ML | Basic → Intermediate → Advanced → Agents | ~220 h |
| Know ML, want to build agents (**fast track**) | A01 → A04, then **AG01 → AG18**, then AP01–AP10 | ~110 h |
| Know LLM APIs already | AG02 → AG18 → Applied | ~90 h |
| Want research | Basic (skim) → Intermediate → Advanced A05–A07 → Expert | ~150 h |

### Recommended Weekly Rhythm (8 h/week)

Two 3-hour lesson sessions + one 2-hour review/project block. One lesson = one session; the capstone of each tier gets a full week.

---

## Curriculum Tiers

| Tier | Folder | Lessons |
|---|---|---|
| Basic · Learn from data | [`Basic/`](./Basic) | B01–B18 |
| Intermediate · Vision, sequences, language | [`Intermediate/`](./Intermediate) | I01–I26 |
| Advanced · LLM engineering | [`Advanced/`](./Advanced) | A01–A15 |
| **Agents · AI agent systems** | [`Agents/`](./Agents) | AG01–AG18 |
| **Applied · Production frameworks** | [`Applied/`](./Applied) | AP01–AP35 |
| Expert · Research frontiers | [`Expert/`](./Expert) | E01–E26 |
| Electives · Specialized topics | [`Electives/`](./Electives) | Optional |

### Project Structure

```
AI/
├── Basic/ Intermediate/ Advanced/           # 59 lessons: ML fundamentals to LLMs
├── Agents/ Applied/                         # 53 lessons: AI agents and production
├── Expert/                                  # 26 lessons: Research frontiers
├── Electives/                               # 39 lessons: Specialized topics
│
├── agentkit/                                # Shared library for agent lessons
├── tools/                                   # Build, test, and curriculum tools
├── application/                             # Interactive demos and visualizations
├── documentation/                           # Guides, curriculum, and policies
└── README.md  LICENSE  requirements.txt
```

---

## Live Demos & Interactive Applications

Interactive demonstrations of AI concepts through hands-on web applications. All demos are playable in your browser.

<div align="center">
  <a href="https://nexageapps.github.io/AI/">
    <img src="./landingpage/game_landingPage.png" alt="AI Interactive Demos Landing Page" width="100%" style="border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);"/>
  </a>
  <p><em>Interactive AI demos — playable in your browser</em></p>
</div>

### Symbolic AI & Logic

| Demo | Concept | Notebook | Link |
|------|---------|----------|------|
| **Wumpus World** | Symbolic logic, knowledge representation | [B01 - Symbolic Logic](./Electives/Classical-AI/) | [Play](https://nexageapps.github.io/AI/wumpus) |

### Optimization & Neural Networks

| Demo | Concept | Notebook | Link |
|------|---------|----------|------|
| **Mountain Explorer** | Gradient descent, optimization | [B02 - Linear Regression](./Basic/) | [Play](https://nexageapps.github.io/AI/gradient-descent) |
| **Blindfold Hill** | Learning rate, convergence | [B02 - Linear Regression](./Basic/) | [Play](https://nexageapps.github.io/AI/neural-networks/week2/blindfold-hill) |
| **Neural Network Trainer** | Forward/backward propagation | [B05 - Neural Networks](./Basic/) | [Play](https://nexageapps.github.io/AI/nn-trainer/) |
| **CNN Explorer** | Convolution, pooling, feature maps | [I01 - CNNs](./Intermediate/) | [Play](https://nexageapps.github.io/AI/neural-networks/week3/cnn-explorer/) |

### Data & Preprocessing

| Demo | Concept | Notebook | Link |
|------|---------|----------|------|
| **Data Preprocessing Studio** | Missing values, scaling, encoding | [B06 - Data Preprocessing](./Basic/) | [Play](https://nexageapps.github.io/AI/neural-networks/week3/data-preprocessing-studio) |
| **Model Evaluation Dashboard** | Metrics, confusion matrix, ROC/AUC | [B07 - Model Evaluation](./Basic/) | TBD |

### Knowledge & Language Models

| Demo | Concept | Notebook | Link |
|------|---------|----------|------|
| **Knowledge Graph Playground** | RDF triples, knowledge graphs, RAG | [A03 - RAG](./Advanced/) | [Play](https://nexageapps.github.io/AI/ai-fundamentals/week3/kg-playground/) |
| **RNN Explorer** | RNN, LSTM, GRU, sequence modeling | [I03 - RNNs](./Intermediate/) | [Play](https://nexageapps.github.io/AI/ai-fundamentals/week4/rnn-explorer/) |
| **Transformer Explorer** | Self-attention, multi-head attention | [I04 - Transformers](./Intermediate/) | [Play](https://nexageapps.github.io/AI/neural-networks/week4/transformer-explorer/) |
| **BPE Explorer** | Tokenization, byte pair encoding | [I05 - BPE](./Intermediate/) | [Play](https://nexageapps.github.io/AI/neural-networks/week4/bpe-explorer/) |

**[View All Demos](https://nexageapps.github.io/AI/)** • Explore [`application/`](./application/) for source code and deployment guides.

---

## Contributing & Quality Bar

A lesson is **ready** only if it follows the template and `python tools/nbtest.py "<path>"` passes offline. See [tools/LESSON_AUTHORING.md](./tools/LESSON_AUTHORING.md). After adding or changing lessons run `python tools/gen_readmes.py` to refresh the status tables. See also [CONTRIBUTING](./CONTRIBUTING.md) and [SECURITY](./documentation/SECURITY.md).

---

## Academic Integrity

### Appropriate Use

- Learning concepts and understanding implementations
- Preparing for lectures and exams
- Using as inspiration for original projects
- Understanding different approaches

### Inappropriate Use

- Copying code for assignments without understanding
- Submitting repository code as your own work
- Using during closed-book assessments
- Violating your institution's policies

**[Full Academic Integrity Policy](./documentation/ACADEMIC_INTEGRITY.md)**

---

## Support & Community

Open-source AI education built for learners worldwide.

[LinkedIn](https://www.linkedin.com/in/karthik-arjun-a5b4a258/) • [Discord](https://discord.com/channels/1482175575488598109/1482175576168206590) • [Buy me a book](https://buymeacoffee.com/fcc4sbsx5f6)

MIT License: see [LICENSE](./LICENSE).

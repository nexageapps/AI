<div align="center">

<img src="./logo/logo_v1.png" width="220" height="220" alt="AI Engineering Logo"/>

# AI Engineering: From Foundations to Production Agents

### Master AI, LLMs, Agents & Modern Frameworks

**Open-source AI engineering curriculum for building intelligent systems.**

From ML Fundamentals → LLMs & RAG → AI Agents → Production Deployment

[**Get Started**](#quick-start) • [Curriculum](./documentation/CURRICULUM.md) • [Live Demos](https://nexageapps.github.io/AI/) • [Student Guide](./documentation/STUDENT_GUIDE.md)

[![Python](https://img.shields.io/badge/Python-3.10+-3776AB?logo=python&logoColor=white)](https://www.python.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)
[![Lessons](https://img.shields.io/badge/Lessons-177-brightgreen.svg)](./documentation/CURRICULUM.md)
[![Stars](https://img.shields.io/github/stars/nexageapps/AI?style=social)](https://github.com/nexageapps/AI/stargazers)

</div>

---

## 🎯 What You'll Learn

```
┌─────────────────────────────────────────────────────────────────┐
│                    YOUR LEARNING JOURNEY                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  BASIC (18 lessons)          →  Build ML fundamentals          │
│  ├─ Linear Regression            Train your first model        │
│  ├─ Neural Networks              Understand backpropagation    │
│  └─ CNNs & Transformers          Master deep learning          │
│                                                                 │
│  INTERMEDIATE (26 lessons)   →  Advanced architectures         │
│  ├─ Computer Vision              Object detection & more       │
│  ├─ NLP & Embeddings             Text understanding            │
│  └─ Sequence Models              Time series & RNNs            │
│                                                                 │
│  ADVANCED (15 lessons)       →  LLMs & Production             │
│  ├─ Fine-tuning LLMs             Adapt models to your needs    │
│  ├─ RAG Systems                  Knowledge-augmented AI        │
│  └─ Prompt Engineering           Optimize LLM outputs          │
│                                                                 │
│  AGENTS (18 lessons)         →  AI that takes action          │
│  ├─ LangChain Fundamentals       Build your first agent       │
│  ├─ LangGraph Workflows          Multi-step reasoning         │
│  └─ Production Agents            Deploy to the real world     │
│                                                                 │
│  APPLIED (35 lessons)        →  Modern frameworks             │
│  ├─ LlamaIndex                   Data framework for LLMs      │
│  ├─ DSPy                         Programming with LLMs        │
│  ├─ Vector Databases             Pinecone, Weaviate, Qdrant   │
│  └─ FastAPI Deployment           Production-ready APIs        │
│                                                                 │
│  EXPERT (26 lessons)         →  Research frontiers           │
│  └─ Cutting-edge techniques      Stay ahead of the curve      │
│                                                                 │
│  📊 Total: 177 lessons • 579 hours • 7 modules                │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/nexageapps/AI.git && cd AI

# Setup virtual environment
python -m venv .venv && source .venv/bin/activate  # Windows: .venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Launch Jupyter
jupyter lab
```

**For live agent lessons:** Set `ANTHROPIC_API_KEY` environment variable. Without it, lessons replay recorded traces—you can still learn and experiment for free.

---

## 📚 Learning Paths

Choose your path based on your background:

```
┌─────────────────────────────────────────────────────────────────────────┐
│ PATH 1: Complete Beginner (579 hours)                                  │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━│
│                                                                         │
│  Start ──→ Basic ──→ Intermediate ──→ Advanced ──→ Agents ──→ Applied │
│                                                                         │
│  Learn everything from scratch to production deployment                │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│ PATH 2: ML Engineer → AI Agents (110 hours) ⚡ FAST TRACK             │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━│
│                                                                         │
│  Start ──→ Advanced (A01-A04) ──→ Agents (AG01-AG18) ──→ Applied      │
│                                                                         │
│  Skip basics, focus on LLMs and agent systems                          │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│ PATH 3: LLM Developer → Production (90 hours) 🎯 PRACTICAL            │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━│
│                                                                         │
│  Start ──→ Agents (AG02-AG18) ──→ Applied (AP01-AP35)                 │
│                                                                         │
│  You know LLM APIs, learn production frameworks                        │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│ PATH 4: Research Track (150 hours) 🔬 ACADEMIC                        │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━│
│                                                                         │
│  Start ──→ Basic (skim) ──→ Intermediate ──→ Advanced ──→ Expert      │
│                                                                         │
│  Deep dive into theory and cutting-edge research                       │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

### The Complete AI Engineering Toolkit

```
┌─────────────────────┬─────────────────────┬─────────────────────┐
│   FOUNDATIONS       │    AI AGENTS        │    PRODUCTION       │
├─────────────────────┼─────────────────────┼─────────────────────┤
│                     │                     │                     │
│  PyTorch            │  LangChain          │  FastAPI            │
│  TensorFlow         │  LangGraph          │  Docker             │
│  scikit-learn       │  LlamaIndex         │  Kubernetes         │
│  NumPy/Pandas       │  DSPy               │  GitHub Actions     │
│  Transformers       │  CrewAI             │  Prometheus         │
│  Jupyter            │  Semantic Kernel    │  Grafana            │
│                     │  Haystack           │  Redis              │
│                     │                     │                     │
├─────────────────────┼─────────────────────┼─────────────────────┤
│   VECTOR STORES     │    LLM PROVIDERS    │    FRAMEWORKS       │
├─────────────────────┼─────────────────────┼─────────────────────┤
│                     │                     │                     │
│  Pinecone           │  OpenAI GPT-4       │  Guardrails AI      │
│  Weaviate           │  Anthropic Claude   │  LangSmith          │
│  Qdrant             │  Google Gemini      │  LangFuse           │
│  Chroma             │  Cohere             │  Weights & Biases   │
│  FAISS              │  Open-source LLMs   │  MLflow             │
│                     │                     │                     │
└─────────────────────┴─────────────────────┴─────────────────────┘
```

---

## 📊 Curriculum Overview

```
╔══════════════════════════════════════════════════════════════════╗
║                    CURRICULUM STATUS                             ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║  Module          │ Lessons │ Hours │ Status                     ║
║ ════════════════════════════════════════════════════════════════║
║                                                                  ║
║  Basic           │   18    │  48   │ ████████████████░░ 90%     ║
║  Intermediate    │   26    │  78   │ ████████████████░░ 85%     ║
║  Advanced        │   15    │  48   │ ████████████████████ 100%  ║
║  Agents          │   18    │  56   │ ████████████████████ 100%  ║
║  Applied         │   35    │ 140   │ ████████░░░░░░░░░░ 40%     ║
║  Expert          │   26    │  92   │ ░░░░░░░░░░░░░░░░░░ 0%      ║
║  Electives       │   39    │ 117   │ ████████████████████ 100%  ║
║                                                                  ║
║ ────────────────────────────────────────────────────────────────║
║  TOTAL           │  177    │ 579   │ ████████████░░░░░░ 62%     ║
║                                                                  ║
╚══════════════════════════════════════════════════════════════════╝
```

### Module Details

| Tier | Focus | Key Topics | Folder |
|------|-------|------------|--------|
| **Basic** | ML Fundamentals | Regression, Neural Networks, CNNs, Transformers | [`Basic/`](./Basic) |
| **Intermediate** | Deep Learning | Computer Vision, NLP, Sequence Models, GANs | [`Intermediate/`](./Intermediate) |
| **Advanced** | LLM Engineering | Fine-tuning, RAG, Prompt Engineering, Evaluation | [`Advanced/`](./Advanced) |
| **Agents** | AI Agent Systems | LangChain, LangGraph, Tools, Memory, Multi-agent | [`Agents/`](./Agents) |
| **Applied** | Production | LlamaIndex, DSPy, Vector DBs, FastAPI, Deployment | [`Applied/`](./Applied) |
| **Expert** | Research | Frontier models, RLHF, Alignment, Interpretability | [`Expert/`](./Expert) |
| **Electives** | Specialized | Classical AI, Domain-specific applications | [`Electives/`](./Electives) |

---

## 🎮 Interactive Demos

**Play with AI concepts in your browser** → [**Launch All Demos**](https://nexageapps.github.io/AI/)

### Visual Learning Tools

```
┌──────────────────────────────────────────────────────────────────┐
│                    INTERACTIVE DEMOS                             │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  🎯 Symbolic AI                                                  │
│  └─ Wumpus World                    Logic & reasoning           │
│                                                                  │
│  📈 Optimization                                                 │
│  ├─ Mountain Explorer               Gradient descent            │
│  └─ Blindfold Hill                  Learning rate tuning        │
│                                                                  │
│  🧠 Neural Networks                                              │
│  ├─ Neural Network Trainer          Backpropagation             │
│  ├─ CNN Explorer                    Convolution visualization   │
│  └─ Data Preprocessing Studio       Feature engineering         │
│                                                                  │
│  💬 Language Models                                              │
│  ├─ Knowledge Graph Playground      RDF & semantic search       │
│  ├─ RNN Explorer                    Sequence modeling           │
│  ├─ Transformer Explorer            Self-attention mechanism    │
│  └─ BPE Explorer                    Tokenization                │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

### Demo Gallery

<table>
<tr>
<td width="33%">
<h4>🎯 Wumpus World</h4>
<img src="https://via.placeholder.com/300x200/00467F/ffffff?text=Wumpus+World" alt="Wumpus World" width="100%"/>
<p><strong>Learn:</strong> Symbolic logic, knowledge representation</p>
<p><a href="https://nexageapps.github.io/AI/wumpus">▶ Play Demo</a></p>
</td>
<td width="33%">
<h4>📈 Gradient Descent</h4>
<img src="https://via.placeholder.com/300x200/0066CC/ffffff?text=Mountain+Explorer" alt="Mountain Explorer" width="100%"/>
<p><strong>Learn:</strong> Optimization, learning rates</p>
<p><a href="https://nexageapps.github.io/AI/gradient-descent">▶ Play Demo</a></p>
</td>
<td width="33%">
<h4>🧠 CNN Explorer</h4>
<img src="https://via.placeholder.com/300x200/4CAF50/ffffff?text=CNN+Explorer" alt="CNN Explorer" width="100%"/>
<p><strong>Learn:</strong> Convolution, pooling, feature maps</p>
<p><a href="https://nexageapps.github.io/AI/neural-networks/week3/cnn-explorer/">▶ Play Demo</a></p>
</td>
</tr>
<tr>
<td width="33%">
<h4>💡 Knowledge Graphs</h4>
<img src="https://via.placeholder.com/300x200/FF9800/ffffff?text=KG+Playground" alt="KG Playground" width="100%"/>
<p><strong>Learn:</strong> RDF triples, semantic reasoning</p>
<p><a href="https://nexageapps.github.io/AI/ai-fundamentals/week3/kg-playground/">▶ Play Demo</a></p>
</td>
<td width="33%">
<h4>🔄 Transformer</h4>
<img src="https://via.placeholder.com/300x200/9C27B0/ffffff?text=Transformer" alt="Transformer" width="100%"/>
<p><strong>Learn:</strong> Self-attention, Q/K/V matrices</p>
<p><a href="https://nexageapps.github.io/AI/neural-networks/week4/transformer-explorer/">▶ Play Demo</a></p>
</td>
<td width="33%">
<h4>✂️ BPE Tokenization</h4>
<img src="https://via.placeholder.com/300x200/F44336/ffffff?text=BPE+Explorer" alt="BPE Explorer" width="100%"/>
<p><strong>Learn:</strong> Byte pair encoding, subwords</p>
<p><a href="https://nexageapps.github.io/AI/neural-networks/week4/bpe-explorer/">▶ Play Demo</a></p>
</td>
</tr>
</table>

[**View All 14+ Demos →**](https://nexageapps.github.io/AI/)

---

## 💡 Why This Curriculum?

### Every Lesson Follows a Proven Pattern

```
┌─────────────────────────────────────────────────────────────┐
│                   LESSON STRUCTURE                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. Real Scenario                                           │
│     "You're building a chatbot that needs to remember..."   │
│                                                             │
│  2. Learning Objectives                                     │
│     Clear, measurable goals for the lesson                  │
│                                                             │
│  3. Concept Explanation                                     │
│     Theory with visualizations and examples                 │
│                                                             │
│  4. Build From Scratch                                      │
│     Implement the concept yourself in Python                │
│                                                             │
│  5. Use Real Tools                                          │
│     Apply industry-standard libraries                       │
│                                                             │
│  6. Break It                                                │
│     Understand limitations and edge cases                   │
│                                                             │
│  7. Three-Tier Exercises                                    │
│     ├─ Practice: Solidify understanding                     │
│     ├─ Stretch: Apply to new problems                       │
│     └─ Challenge: Push your limits                          │
│                                                             │
│  8. Checkpoint                                              │
│     Self-assessment questions                               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Key Features

```
✓  Runs offline, free, no GPU required
✓  Production-ready code examples
✓  Industry-standard tools and frameworks
✓  Hands-on exercises at every step
✓  Progressive difficulty curve
✓  Clear learning objectives
✓  Self-paced with checkpoints
✓  Open-source and free forever
```

---

## 🗂️ Project Structure

```
AI/
│
├─── Basic/                      # 18 lessons: ML fundamentals
│    ├─ B01-symbolic-logic.ipynb
│    ├─ B02-linear-regression.ipynb
│    ├─ B05-neural-networks.ipynb
│    └─ ... (B01-B18)
│
├─── Intermediate/               # 26 lessons: Deep learning
│    ├─ I01-cnns.ipynb
│    ├─ I03-rnns.ipynb
│    └─ ... (I01-I26)
│
├─── Advanced/                   # 15 lessons: LLMs & RAG
│    ├─ A01-fine-tuning-llms.ipynb
│    ├─ A03-rag.ipynb
│    └─ ... (A01-A15)
│
├─── Agents/                     # 18 lessons: AI agents
│    ├─ AG01-intro-to-agents.ipynb
│    ├─ AG08-langgraph.ipynb
│    └─ ... (AG01-AG18)
│
├─── Applied/                    # 35 lessons: Production
│    ├─ AP01-llamaindex.ipynb
│    ├─ AP07-dspy.ipynb
│    └─ ... (AP01-AP35)
│
├─── Expert/                     # 26 lessons: Research
│    └─ ... (E01-E26)
│
├─── Electives/                  # 39 lessons: Specialized
│    ├─ Classical-AI/
│    └─ Domain-Specific/
│
├─── agentkit/                   # Shared agent library
├─── tools/                      # Testing & build tools
├─── application/                # Interactive demos
├─── documentation/              # All guides
│    ├─ CURRICULUM.md
│    ├─ LEARNING_SEQUENCE.md
│    ├─ QUICK_REFERENCE.md
│    └─ STUDENT_GUIDE.md
│
└─── README.md                   # You are here
```

---

## 📖 Documentation Hub

```
┌──────────────────────────────────────────────────────────┐
│              ESSENTIAL DOCUMENTATION                     │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  📚 Core Documents                                       │
│  ├─ CURRICULUM.md            Complete lesson catalog    │
│  ├─ LEARNING_SEQUENCE.md     Week-by-week plans        │
│  ├─ QUICK_REFERENCE.md       Fast command lookup       │
│  └─ STUDENT_GUIDE.md         Study strategies          │
│                                                          │
│  🚀 Getting Started                                      │
│  ├─ Applied/SETUP.md         Environment setup         │
│  ├─ Applied/GETTING_STARTED  Your first agent          │
│  └─ CONTRIBUTING.md          How to contribute         │
│                                                          │
│  🎯 Specialized Guides                                   │
│  ├─ PROJECT_IDEAS.md         Practice projects         │
│  ├─ EXAM_PREPARATION.md      Study for assessments     │
│  └─ PROGRESS_TRACKER.md      Track your journey        │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

[**Browse All Documentation →**](./documentation/)

---

## 🤝 Contributing

We welcome contributions from the community!

### Ways to Contribute

```
┌─────────────────────────────────────────────────────────┐
│  How to Help                                            │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  🐛 Report Issues                                       │
│     Found a bug? Open an issue                          │
│                                                         │
│  📝 Fix Typos                                           │
│     Edit the file and submit a PR                       │
│                                                         │
│  💡 Suggest Lessons                                     │
│     Propose new topics via issues                       │
│                                                         │
│  🔧 Improve Code                                        │
│     Better examples, clearer explanations               │
│                                                         │
│  🌍 Translate                                           │
│     Help make this accessible worldwide                 │
│                                                         │
│  ⭐ Star the Repo                                       │
│     Show your support!                                  │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Read the full guide:** [CONTRIBUTING.md](./CONTRIBUTING.md)

### Quality Standards

All lessons must:
- Follow the template in [CURRICULUM.md](./documentation/CURRICULUM.md)
- Pass automated tests: `python tools/nbtest.py`
- Run offline without API keys (traces for LLM lessons)
- Include Practice/Stretch/Challenge exercises

---

## 📜 License & Academic Integrity

### MIT License - Use Freely

This repository is **free, open-source educational material**. You can:
- ✓ Learn from it
- ✓ Teach from it
- ✓ Fork and modify it
- ✓ Use it in your courses
- ✓ Build upon it

### Academic Integrity Guidelines

```
✓ APPROPRIATE USE                     ✗ INAPPROPRIATE USE
────────────────────────────────────────────────────────
Learning concepts                     Copying for assignments
Understanding implementations         Submitting as your own work
Preparing for exams                   Using in closed-book tests
Getting inspiration                   Violating academic policies
Building original projects            Direct plagiarism
```

**Read full policy:** [ACADEMIC_INTEGRITY.md](./documentation/ACADEMIC_INTEGRITY.md)

---

## 🌟 Support This Project

If this curriculum helps you, consider:

```
┌────────────────────────────────────────────┐
│   WAYS TO SUPPORT                          │
├────────────────────────────────────────────┤
│                                            │
│  ⭐ Star the repository on GitHub          │
│  🔗 Share with your network                │
│  💡 Contribute lessons or fixes            │
│  📣 Write about your learning journey      │
│  ☕ Buy me a book                           │
│                                            │
└────────────────────────────────────────────┘
```

<div align="center">

[![Star on GitHub](https://img.shields.io/github/stars/nexageapps/AI?style=social)](https://github.com/nexageapps/AI/stargazers)
[![Buy Me A Book](https://img.shields.io/badge/Buy%20Me%20A%20Book-Support-yellow.svg)](https://buymeacoffee.com/fcc4sbsx5f6)

**Connect:** [LinkedIn](https://www.linkedin.com/in/karthik-arjun-a5b4a258/) • [Discord](https://discord.com/channels/1482175575488598109/1482175576168206590) • [GitHub](https://github.com/nexageapps/AI)

**Sponsored by** [nexageapps](https://nexageapps.com)

</div>

---

## 🎓 Who Is This For?

```
┌───────────────────────────────────────────────────────────────┐
│                     TARGET AUDIENCE                           │
├───────────────────────────────────────────────────────────────┤
│                                                               │
│  🎓 Computer Science Students                                │
│     Supplement your coursework with practical projects        │
│                                                               │
│  💼 Software Engineers                                        │
│     Transition into AI/ML engineering roles                   │
│                                                               │
│  🔬 Data Scientists                                           │
│     Expand into deep learning and LLMs                        │
│                                                               │
│  🚀 Founders & Product Managers                               │
│     Understand AI capabilities and limitations                │
│                                                               │
│  👨‍🏫 Educators                                                 │
│     Use as curriculum for your courses                        │
│                                                               │
│  🌍 Self-Learners                                             │
│     Master AI at your own pace                                │
│                                                               │
└───────────────────────────────────────────────────────────────┘
```

---

## 🗺️ Roadmap

### Current Status
- ✅ 43 production-ready lessons
- ✅ 88 retained lessons from previous versions
- ✅ 14+ interactive demos
- ✅ Complete LangChain & LangGraph curriculum
- ✅ Full Advanced (LLMs) track

### Coming Soon
- 🔄 Complete Applied module (LlamaIndex, DSPy, Haystack)
- 🔄 Expert module (Research frontiers)
- 🔄 More interactive visualizations
- 🔄 Video tutorials for complex topics
- 🔄 Multi-language support

[**View Detailed Roadmap →**](./documentation/VIRAL_CURRICULUM_UPDATE_2025.md)

---

## 📞 Get Help

```
┌──────────────────────────────────────────┐
│          COMMUNITY & SUPPORT             │
├──────────────────────────────────────────┤
│                                          │
│  💬 Questions?                           │
│     Open a GitHub issue                  │
│                                          │
│  🐛 Found a bug?                         │
│     Report via issues                    │
│                                          │
│  💡 Have an idea?                        │
│     Start a discussion                   │
│                                          │
│  🤝 Want to chat?                        │
│     Join our Discord                     │
│                                          │
└──────────────────────────────────────────┘
```

---

<div align="center">

## 🚀 Ready to Start?

**Choose your path and begin your AI engineering journey today!**

[**📚 Browse Curriculum**](./documentation/CURRICULUM.md) • [**🎮 Try Demos**](https://nexageapps.github.io/AI/) • [**⚡ Quick Start**](#quick-start)

---

**Made with ❤️ for the AI community** • **177 lessons • 579 hours • Forever free**

⭐ **Star this repo to support the project!** ⭐

</div>

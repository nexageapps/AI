# Repository Structure & Organization

**Last Updated:** October 21, 2026  
**Status:** Clean, organized, and ready for viral growth

---

## Overview

This repository is organized into **7 main learning modules** with **177 comprehensive lessons** covering AI/ML from fundamentals to production deployment. All content is open-source, beginner-friendly, and production-ready.

---

## Directory Structure

```
AI/
│
├── README.md                          # Main landing page (no emojis, clean icons)
├── LICENSE                            # MIT License
├── CODE_OF_CONDUCT.md                 # Community guidelines
├── CONTRIBUTING.md                    # Contribution guide
├── CITATION.cff                       # Academic citation
├── requirements.txt                   # Python dependencies
├── requirements-extras.txt            # Optional dependencies
│
├── Basic/                             # 18 lessons: ML fundamentals
│   ├── README.md
│   ├── B01-symbolic-logic.ipynb
│   ├── B02-linear-regression.ipynb
│   └── ... (B01-B18)
│
├── Intermediate/                      # 26 lessons: CNNs, RNNs, Transformers
│   ├── README.md
│   ├── I01-cnns.ipynb
│   └── ... (I01-I26)
│
├── Advanced/                          # 15 lessons: LLMs, RAG, Fine-tuning
│   ├── README.md
│   ├── A01-fine-tuning-llms.ipynb
│   └── ... (A01-A15)
│
├── Agents/                            # 18 lessons: LangChain, LangGraph
│   ├── README.md
│   ├── GETTING_STARTED.md
│   ├── EXERCISES.md
│   ├── ROADMAP.md
│   ├── AG01-intro-to-agents.ipynb
│   └── ... (AG01-AG18)
│
├── Applied/                           # 35 lessons: LlamaIndex, DSPy, Production
│   ├── README.md
│   ├── requirements.txt
│   ├── .env.example
│   ├── AP01-llamaindex-intro.ipynb
│   └── ... (AP01-AP35)
│
├── Expert/                            # 26 lessons: Research frontiers
│   ├── README.md
│   └── ... (E01-E26)
│
├── Electives/                         # 39 lessons: Specialized topics
│   ├── README.md
│   ├── Classical-AI/
│   ├── Course-Companions/
│   └── Legacy-Frameworks/
│
├── agentkit/                          # Shared library for agent lessons
│   ├── __init__.py
│   ├── agent.py
│   ├── tools.py
│   └── tests/
│
├── tools/                             # Build, test, curriculum management
│   ├── curriculum.json
│   ├── nbtest.py
│   ├── gen_readmes.py
│   ├── check_names.py
│   └── LESSON_AUTHORING.md
│
├── application/                       # Interactive web demos
│   ├── README.md                      # Clean demo catalog (no UoA refs)
│   ├── DEPLOYMENT_GUIDE.md
│   ├── QUICK_DEPLOY.md
│   ├── ai-fundamentals/               # AI concept demos
│   │   ├── week2/wumpus/
│   │   ├── week3/kg-playground/
│   │   └── week4/rnn-explorer/
│   ├── neural-networks/               # Neural network demos
│   │   ├── week2/gradient-descent-game/
│   │   ├── week3/cnn-explorer/
│   │   └── week4/transformer-explorer/
│   └── archive/                       # Legacy demos
│
├── landingpage/                       # GitHub Pages landing site
│   ├── index.html
│   ├── game_landingPage.png
│   └── assets/
│
├── documentation/                     # All guides and documentation
│   ├── README.md
│   ├── DOCUMENTATION_INDEX.md         # Central hub
│   │
│   ├── CURRICULUM.md                  # 177-lesson master plan
│   ├── LEARNING_SEQUENCE.md           # Week-by-week paths
│   │
│   ├── VIRAL_CURRICULUM_UPDATE_2025.md    # Viral strategy
│   ├── IMPLEMENTATION_PLAN.md             # 30-day roadmap
│   ├── PROJECT_ORGANIZATION_COMPLETE.md   # This cleanup summary
│   ├── REPOSITORY_STRUCTURE.md            # This file
│   │
│   ├── STUDENT_GUIDE.md               # Study strategies
│   ├── PROJECT_IDEAS.md               # Hands-on projects
│   ├── PROGRESS_TRACKER_GUIDE.md      # Progress tracking
│   ├── EXAM_PREPARATION_GUIDE.md      # Exam prep
│   │
│   ├── ACADEMIC_INTEGRITY.md          # Policies (UoA refs removed ✓)
│   ├── SECURITY.md
│   ├── CONTRIBUTING.md
│   │
│   ├── applied/                       # Applied module docs
│   │   ├── SETUP.md
│   │   ├── GETTING_STARTED.md
│   │   └── langchain-vs-llamaindex.md
│   │
│   ├── archive/                       # Historical documents
│   └── courses/                       # Course-specific guides
│
├── logo/                              # Brand assets
│   ├── logo_v1.png
│   └── variations/
│
└── archive/                           # Legacy content
    └── old-implementations/

```

---

## Key Improvements Made

### 1. Clean Main README ✓
- **Removed:** All emojis (🤖, 🔍, ⚡, etc.)
- **Added:** Clean Unicode symbols (▸, ├─, └─)
- **Updated:** Proper icon-based formatting
- **Result:** Professional, GitHub-standard appearance

### 2. Organized Documentation ✓
- **Moved:** CURRICULUM.md → documentation/
- **Moved:** LEARNING_SEQUENCE.md → documentation/
- **Created:** VIRAL_CURRICULUM_UPDATE_2025.md (strategy)
- **Created:** IMPLEMENTATION_PLAN.md (30-day roadmap)
- **Result:** All guides in one place

### 3. Cleaned Application Folder ✓
- **Removed:** All University of Auckland references
- **Removed:** All COMPSCI course codes
- **Updated:** Demo descriptions (concept-focused)
- **Archived:** Old university-specific themes
- **Result:** Generic, reusable demos

### 4. Updated Links ✓
- **Fixed:** All CURRICULUM.md references → documentation/CURRICULUM.md
- **Fixed:** All LEARNING_SEQUENCE.md references → documentation/LEARNING_SEQUENCE.md
- **Updated:** Lesson count badges (65 → 177)
- **Result:** No broken links

---

## Module Breakdown

| Module | Lessons | Hours | Focus | Status |
|--------|---------|-------|-------|--------|
| **Basic** | 18 | 48 | ML fundamentals, neural networks | 18 retained |
| **Intermediate** | 26 | 78 | CNNs, RNNs, transformers, NLP | 26 retained |
| **Advanced** | 15 | 48 | LLMs, RAG, fine-tuning, production | 15 ready ✓ |
| **Agents** | 18 | 56 | LangChain, LangGraph, agent systems | 18 ready ✓ |
| **Applied** | 35 | 140 | LlamaIndex, DSPy, FastAPI, deployment | 10 ready, 25 planned |
| **Expert** | 26 | 92 | Research frontiers, cutting-edge | 26 planned |
| **Electives** | 39 | 117 | Classical AI, specialized topics | 39 available |
| **Total** | **177** | **579** | Complete curriculum | **43 ready** |

---

## Live Demos & Applications

All demos available at: https://nexageapps.github.io/AI/

### Available Demos (14 total)

#### Symbolic AI
- Wumpus World

#### Optimization
- Mountain Explorer (gradient descent)
- Blindfold Hill (learning rate)

#### Neural Networks
- Neural Network Trainer
- CNN Explorer
- Data Preprocessing Studio

#### Knowledge & Language
- Knowledge Graph Playground
- RNN Explorer
- Transformer Explorer
- BPE Explorer

**Status:** All demos cleaned of university references ✓

---

## Tech Stack

### Foundations
- PyTorch, TensorFlow, scikit-learn
- NumPy, Pandas, Matplotlib
- Jupyter, VSCode

### AI Agents
- LangChain, LangGraph
- LlamaIndex, DSPy
- CrewAI, Semantic Kernel

### Vector Databases
- Pinecone, Weaviate
- Qdrant, Chroma
- FAISS

### LLMs & APIs
- OpenAI (GPT-4, o1)
- Anthropic (Claude, Computer Use)
- Google (Gemini 2.0)
- Open-source models

### Production
- FastAPI, Docker, Kubernetes
- CI/CD pipelines
- Monitoring & observability
- Guardrails AI

---

## File Naming Conventions

### Lessons
- Format: `<ID>-<kebab-title>.ipynb`
- Example: `AG03-tools-and-function-calling.ipynb`
- IDs: B (Basic), I (Intermediate), A (Advanced), AG (Agents), AP (Applied), E (Expert)

### Documentation
- Uppercase with underscores: `GETTING_STARTED.md`
- Descriptive names: `VIRAL_CURRICULUM_UPDATE_2025.md`
- In documentation/ folder

### Applications
- Lowercase with hyphens: `gradient-descent-game/`
- Concept-based folders (not week-based)
- Each demo has own README.md

---

## Removed References ✓

### University of Auckland
- ✓ Removed from README.md
- ✓ Removed from documentation/ACADEMIC_INTEGRITY.md
- ✓ Removed from application/ demos
- ✓ Archived old references in documentation/archive/

### COMPSCI Course Codes
- ✓ Removed from application README
- ✓ Removed from demo descriptions
- ✓ Kept only in archive/ for historical reference

### Professor Information
- ✓ Deleted files with professor emails
- ✓ Removed @auckland.ac.nz addresses
- ✓ Made disclaimers institution-independent

---

## Quality Standards

### Lesson Quality
- ✓ Follows standard template
- ✓ Passes `python tools/nbtest.py`
- ✓ Runs offline, free, no GPU
- ✓ Clear learning objectives
- ✓ Practice/Stretch/Challenge exercises

### Code Quality
- ✓ Production-ready examples
- ✓ Type hints and docstrings
- ✓ Error handling
- ✓ Unit tests where applicable

### Documentation Quality
- ✓ Clear, concise writing
- ✓ No jargon without explanation
- ✓ Code examples for every concept
- ✓ Links to related lessons

---

## Next Steps

### Content Creation
1. Complete Applied module (AP11-AP35)
2. Create Expert module (E01-E26)
3. Add hot-topic lessons (o1, DeepSeek R1, Computer Use)

### Technical
1. Run `python tools/gen_readmes.py` to update status tables
2. Test all notebooks with `python tools/nbtest.py`
3. Update demo builds with cleaned branding

### Marketing
1. Launch viral campaign per IMPLEMENTATION_PLAN.md
2. Submit to newsletters (TLDR AI, The Batch)
3. Post on Reddit r/MachineLearning, r/learnmachinelearning
4. Create YouTube demo videos

---

## Maintenance

### Regular Tasks
- Update status tables: `python tools/gen_readmes.py`
- Test notebooks: `python tools/nbtest.py "Module/*.ipynb"`
- Check naming: `python tools/check_names.py`
- Update dependencies: `pip list --outdated`

### Quality Checks
- No broken links
- All demos functional
- No university references
- All lessons follow template
- Code passes tests

---

**Repository Status:** ✓ Clean, organized, and ready for viral launch

**Target:** 10,000+ GitHub stars by Q2 2025

**Last Cleanup:** October 21, 2026

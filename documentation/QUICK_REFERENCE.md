# Quick Reference Guide

Fast lookup for repository structure, commands, and standards.

---

## Repository at a Glance

```
177 lessons | 579 hours | 7 modules | 14+ demos | MIT License
```

---

## Essential Commands

### Setup
```bash
# Clone and setup
git clone https://github.com/nexageapps/AI.git && cd AI
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
jupyter lab
```

### Testing
```bash
# Test a lesson
python tools/nbtest.py "Agents/AG03*.ipynb"

# Test a module
python tools/nbtest.py "Agents/*.ipynb"

# Check naming conventions
python tools/check_names.py

# Update status tables
python tools/gen_readmes.py
```

### Demo Development
```bash
# Run a demo locally
cd application/ai-fundamentals/week2/wumpus
npm install
npm start

# Build for production
npm run build
```

---

## File Locations

### Essential Docs
- Curriculum: `documentation/CURRICULUM.md`
- Learning paths: `documentation/LEARNING_SEQUENCE.md`
- Student guide: `documentation/STUDENT_GUIDE.md`
- Contributing: `CONTRIBUTING.md` (root)

### Viral Strategy
- Strategy doc: `documentation/VIRAL_CURRICULUM_UPDATE_2025.md`
- 30-day plan: `documentation/IMPLEMENTATION_PLAN.md`
- Structure: `documentation/REPOSITORY_STRUCTURE.md`

### Applied Module
- Setup: `documentation/applied/SETUP.md`
- Getting started: `documentation/applied/GETTING_STARTED.md`
- Comparison: `documentation/applied/langchain-vs-llamaindex.md`

---

## Module Structure

| ID | Module | Lessons | Hours | Path |
|---|---|---|---|---|
| B | Basic | 18 | 48 | `Basic/` |
| I | Intermediate | 26 | 78 | `Intermediate/` |
| A | Advanced | 15 | 48 | `Advanced/` |
| AG | Agents | 18 | 56 | `Agents/` |
| AP | Applied | 35 | 140 | `Applied/` |
| E | Expert | 26 | 92 | `Expert/` |
| - | Electives | 39 | 117 | `Electives/` |

---

## Naming Conventions

### Lessons
```
Format: <ID>-<kebab-title>.ipynb
Example: AG03-tools-and-function-calling.ipynb

IDs:
- B01-B18: Basic
- I01-I26: Intermediate  
- A01-A15: Advanced
- AG01-AG18: Agents
- AP01-AP35: Applied
- E01-E26: Expert
```

### Documentation
```
Format: UPPERCASE_WITH_UNDERSCORES.md
Example: GETTING_STARTED.md, VIRAL_CURRICULUM_UPDATE_2025.md
Location: documentation/
```

### Applications
```
Format: lowercase-with-hyphens/
Example: gradient-descent-game/, kg-playground/
Location: application/ai-fundamentals/ or application/neural-networks/
```

---

## Tech Stack Quick Reference

### Python Core
```python
# ML Basics
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split

# Deep Learning
import torch
import torch.nn as nn
from transformers import AutoModel, AutoTokenizer

# Agents
from langchain import LLMChain
from langgraph.graph import StateGraph
from llama_index import VectorStoreIndex
```

### Agent Frameworks
- **LangChain**: General-purpose agent framework
- **LangGraph**: State-based agent workflows
- **LlamaIndex**: Data framework for LLM apps
- **DSPy**: Programming framework for LLMs
- **CrewAI**: Multi-agent collaboration

### Vector Databases
- **Pinecone**: Managed vector DB
- **Weaviate**: Open-source vector DB
- **Qdrant**: High-performance vector search
- **Chroma**: Embedded vector DB

### Production
- **FastAPI**: Modern Python API framework
- **Docker**: Containerization
- **Kubernetes**: Orchestration
- **Guardrails AI**: LLM output validation

---

## Learning Paths

### Fast Track to Agents (90h)
```
A01-A04 (LLM basics) 
→ AG01-AG18 (All agent lessons)
→ AP01-AP10 (Production skills)
```

### Complete Curriculum (579h)
```
Basic → Intermediate → Advanced → Agents → Applied → Expert
```

### Research Track (150h)
```
Basic (skim) → Intermediate → A05-A07 → Expert
```

---

## Demo Catalog

### Live at: https://nexageapps.github.io/AI/

#### Symbolic AI
- Wumpus World

#### Optimization
- Mountain Explorer
- Blindfold Hill

#### Neural Networks
- Neural Network Trainer
- CNN Explorer
- Data Preprocessing Studio

#### Knowledge & Language
- Knowledge Graph Playground
- RNN Explorer
- Transformer Explorer
- BPE Explorer

---

## Quality Standards

### Lesson Checklist
- [ ] Follows template in CURRICULUM.md
- [ ] Has clear learning objectives
- [ ] Runs offline, free, no GPU
- [ ] Includes Practice/Stretch/Challenge exercises
- [ ] Passes `python tools/nbtest.py`
- [ ] Has checkpoint questions
- [ ] Code is well-commented

### Documentation Checklist
- [ ] Clear, concise writing
- [ ] No jargon without explanation
- [ ] Code examples included
- [ ] Links to related lessons
- [ ] Proper formatting

### Demo Checklist
- [ ] Runs locally: `npm install && npm start`
- [ ] Builds cleanly: `npm run build`
- [ ] Responsive design
- [ ] Clear instructions in README
- [ ] No university-specific branding

---

## Common Tasks

### Add a New Lesson
```bash
# 1. Create notebook following naming convention
# 2. Follow template in documentation/CURRICULUM.md
# 3. Test it
python tools/nbtest.py "Module/NewLesson*.ipynb"

# 4. Update status tables
python tools/gen_readmes.py

# 5. Commit
git add Module/NewLesson*.ipynb
git commit -m "Add NewLesson to Module"
```

### Add a New Demo
```bash
# 1. Create React app in application/
cd application/demos/
npx create-react-app new-demo

# 2. Develop and test
cd new-demo
npm start

# 3. Add to application/README.md
# 4. Build for production
npm run build

# 5. Deploy per DEPLOYMENT_GUIDE.md
```

### Update Documentation
```bash
# 1. Edit .md file in documentation/
# 2. Check links work
# 3. Update DOCUMENTATION_INDEX.md if new file
# 4. Commit
git add documentation/*.md
git commit -m "Update documentation"
```

---

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/new-lesson

# Make changes and test
python tools/nbtest.py "path/to/lesson.ipynb"

# Stage specific files (not git add .)
git add path/to/lesson.ipynb

# Commit with clear message
git commit -m "Add AG19: Advanced tool use patterns"

# Push to new branch
git push -u origin feature/new-lesson

# Create PR on GitHub
```

---

## Environment Variables

```bash
# For LLM lessons (optional)
export ANTHROPIC_API_KEY=sk-ant-...
export OPENAI_API_KEY=sk-...

# For Applied module
export PINECONE_API_KEY=...
export PINECONE_ENVIRONMENT=...

# Put in .env (gitignored)
echo "ANTHROPIC_API_KEY=sk-ant-..." > .env
```

---

## Links

### Documentation
- [Main README](../README.md)
- [Full Curriculum](./CURRICULUM.md)
- [Learning Sequence](./LEARNING_SEQUENCE.md)
- [Student Guide](./STUDENT_GUIDE.md)
- [Viral Strategy](./VIRAL_CURRICULUM_UPDATE_2025.md)

### Community
- [GitHub Repo](https://github.com/nexageapps/AI)
- [Live Demos](https://nexageapps.github.io/AI/)
- [LinkedIn](https://www.linkedin.com/in/karthik-arjun-a5b4a258/)
- [Support](https://buymeacoffee.com/fcc4sbsx5f6)

---

**Quick Reference v1.0** | Last Updated: October 21, 2026

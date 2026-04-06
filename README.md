<div align="center">

<img src="./logo/logo_v1.png" width="220" height="220" alt="AI & ML Roadmap Logo" style="border-radius: 50%; object-fit: cover; box-shadow: 0 4px 12px rgba(0,0,0,0.15);"/>

# AI & Machine Learning Roadmap: From Basics to LLMs

### Learn by doing. Build by understanding. Master by creating.

**Open-source AI education built by a student, for students and learners worldwide.**

Basic to Expert. Zero to Language Models. 64 lessons. 100% hands-on.

[Quick Start](#quick-start) • [Student Guide](./documentation/MAI_STUDENT_GUIDE.md) • [Exam Prep](./documentation/EXAM_PREPARATION_GUIDE.md) • [LinkedIn](https://www.linkedin.com/in/karthik-arjun-a5b4a258/) • [Support Project](https://buymeacoffee.com/fcc4sbsx5f6)

[![Python](https://img.shields.io/badge/Python-3.8+-orange.svg)](https://www.python.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![Lessons](https://img.shields.io/badge/Lessons-64-brightgreen.svg)](./Basic/)
[![Sponsored by nexageapps](https://img.shields.io/badge/Sponsored%20by-nexageapps-blue.svg)](https://nexageapps.com)
[![Buy me a book](https://img.shields.io/badge/Buy%20Me%20A%20Book-Support-yellow.svg)](https://buymeacoffee.com/fcc4sbsx5f6)

</div>

---

## ⚠️ Important Disclaimer

This is an **independent learning project**, NOT official University of Auckland, material. Use responsibly and follow your institution's academic integrity policies. See [Academic Integrity Policy](./documentation/ACADEMIC_INTEGRITY.md) for details.

---

## What Is This?

A structured, hands-on learning path from basic arithmetic to complete language models. **64 lessons** with runnable code, visualizations, and practical projects.

**Perfect for:**
- University students learning AI/ML
- Self-learners building AI skills
- Professionals upskilling in deep learning
- Anyone wanting to understand AI from first principles

---

## Quick Start

### 1. Choose Your Path

| Level | Lessons | Duration | Best For |
|-------|---------|----------|----------|
| **Basic (B01-B15)** | 19 | 2-3 weeks | Foundations & core concepts |
| **Intermediate (I01-I15)** | 15 | 4-6 weeks | Advanced techniques |
| **Advanced (A01-A15)** | 15 | 6-8 weeks | Production systems |
| **Expert (E01-E15)** | 15 | 8-10 weeks | Research & innovation |

### 2. Set Up

```bash
# Create virtual environment
python -m venv .venv
source .venv/bin/activate  # macOS/Linux
.venv\Scripts\activate     # Windows

# Install dependencies
pip install tensorflow torch numpy matplotlib jupyter
```

### 3. Start Learning

```bash
jupyter lab
# Open any notebook from Basic/ folder
```

**Or use Google Colab** (no setup needed) - Click "Open in Colab" badge in any notebook.

---

## Repository Structure

```
AI/
├── Basic/              # 20 Lessons (B01-B15 + B01a, B05a, B05b, B05c, B10a) ✅
├── Intermediate/       # 15 Lessons (I01-I15) ✅
├── Advanced/           # 15 Lessons (A01-A15) ✅
├── Expert/             # 15 Lessons (E01-E15) ✅
├── application/        # Live demos & practical implementations
├── documentation/      # Guides & resources
└── landingpage/        # Landing page assets
```

---

## Live Demos & Practical Applications

Interactive demonstrations of AI concepts in action:

<div align="center">
  <a href="https://nexageapps.github.io/AI/">
    <img src="./landingpage/game_landingPage.png" alt="AI Games Landing Page" width="100%" style="border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);"/>
  </a>
  <p><em>Interactive AI demos — playable in your browser</em></p>
</div>

| Demo | Concept | Course | Course Page | Notebook | Link |
|------|---------|--------|-------------|----------|------|
| **Wumpus World** | Symbolic Logic & Knowledge Representation | UoA-COMPSCI 713 | [COMPSCI 713 – AI Fundamentals](#compsci-713) | — | [Play Online](https://nexageapps.github.io/AI/wumpus) |
| **Mountain Explorer** | Gradient Descent & Optimization | UoA-COMPSCI 714 | [COMPSCI 714 – Neural Networks](./documentation/courses/COMPSCI_714_COMPLETE_GUIDE.md) | [B02 - Linear Regression](https://github.com/nexageapps/AI/blob/main/Basic/B02%20-%20Linear%20Regression.ipynb) · [B05b - Training & Optimization](https://github.com/nexageapps/AI/blob/main/Basic/B05b%20-%20Training%20and%20Optimization%20(COMPSCI%20714).ipynb) | [Play Online](https://nexageapps.github.io/AI/gradient-descent) |
| **Neural Network Trainer** | Forward Propagation, Backpropagation & Gradient Descent | UoA-COMPSCI 714 | [COMPSCI 714 – Neural Networks](./documentation/courses/COMPSCI_714_COMPLETE_GUIDE.md) | [B05 - Neural Network Fundamentals](https://github.com/nexageapps/AI/blob/main/Basic/B05%20-%20Neural%20Network%20Fundamentals.ipynb) · [B05a - Neural Networks Theory](https://github.com/nexageapps/AI/blob/main/Basic/B05a%20-%20Neural%20Networks%20Theory%20(COMPSCI%20714).ipynb) | [Play Online](https://nexageapps.github.io/AI/nn-trainer/) |
| **Data Preprocessing Studio** | Missing Values, Feature Scaling, Encoding & Feature Engineering | UoA-COMPSCI 714 | [COMPSCI 714 – Neural Networks](./documentation/courses/COMPSCI_714_COMPLETE_GUIDE.md) | [B06 - Data Preprocessing and Feature Engineering](https://github.com/nexageapps/AI/blob/main/Basic/B06%20-%20Data%20Preprocessing%20and%20Feature%20Engineering.ipynb) | [Play Online](https://nexageapps.github.io/AI/compsci714/week3/data-preprocessing-studio) |
| **PyTorch Assignment Practice** | Tabular MLP, BCEWithLogitsLoss, Optuna, FashionMNIST CNN, Saliency Maps | UoA-COMPSCI 714 | [COMPSCI 714 – Neural Networks](./documentation/courses/COMPSCI_714_COMPLETE_GUIDE.md) | [B05c - MLP on Tabular Data with PyTorch](https://github.com/nexageapps/AI/blob/main/Basic/B05c%20-%20MLP%20on%20Tabular%20Data%20with%20PyTorch%20(COMPSCI%20714).ipynb) | — |
| **KG Playground** | RDF Triples, Knowledge Graphs, RAG & Conflict Detection | UoA-COMPSCI 713 | [COMPSCI 713 – AI Fundamentals](#compsci-713) | [A03 - Retrieval-Augmented Generation](https://github.com/nexageapps/AI/blob/main/Advanced/A03%20-%20Retrieval-Augmented%20Generation%20(RAG).ipynb) | [Play Online](https://nexageapps.github.io/AI/compsci713/week3/kg-playground/) |
| **CNN Explorer** | Convolution, Pooling, Feature Maps, Architecture & Playground | UoA-COMPSCI 714 | [COMPSCI 714 – Neural Networks](./documentation/courses/COMPSCI_714_COMPLETE_GUIDE.md) | [B09 - CNNs](https://github.com/nexageapps/AI/blob/main/Basic/B09%20-%20Convolutional%20Neural%20Networks.ipynb) | [Play Online](https://nexageapps.github.io/AI/compsci714/week3/cnn-explorer/) |
| **Transformer Explorer** | Self-Attention, Multi-Head Attention, Q/K/V & Architecture | UoA-COMPSCI 714 | [COMPSCI 714 – Neural Networks](./documentation/courses/COMPSCI_714_COMPLETE_GUIDE.md) | [B11 - Attention & Transformers](https://github.com/nexageapps/AI/blob/main/Basic/B11%20-%20Attention%20and%20Transformers.ipynb) | [Play Online](https://nexageapps.github.io/AI/compsci714/week4/transformer-explorer/) |
| **BPE Explorer** | Byte Pair Encoding, Tokenization, Subwords & Vocabulary | UoA-COMPSCI 714 | [COMPSCI 714 – Neural Networks](./documentation/courses/COMPSCI_714_COMPLETE_GUIDE.md) | [B12 - BPE](https://github.com/nexageapps/AI/blob/main/Basic/B12%20-%20Byte%20Pair%20Encoding%20(BPE).ipynb) | [Play Online](https://nexageapps.github.io/AI/compsci714/week4/bpe-explorer/) |

**[View All Games](https://nexageapps.github.io/AI/)** • Explore the `application/` folder for source code and deployment guides.

---

## For University Students

### University of Auckland Courses

| Course | Focus | Examples |
|--------|-------|----------|
| **COMPSCI 713** | AI Fundamentals | Agents, Knowledge, Game AI |
| **COMPSCI 714** | Neural Networks | [Networks, Gradient Descent, CNNs, Attention](./documentation/courses/COMPSCI_714_COMPLETE_GUIDE.md) |
| **COMPSCI 762** | ML Foundations | Regression, Classification, Tuning |
| **COMPSCI 703** | Generalising AI | Transfer Learning, Domain Adaptation |
| **COMPSYS 721** | Deep Learning | Detection, Time Series, NLP, GANs |

**[COMPSCI 714 Complete Guide](./documentation/courses/COMPSCI_714_COMPLETE_GUIDE.md)**

### Study Tips

- **Before lectures:** Review relevant Basic lessons
- **During semester:** Build practical projects from examples
- **For assignments:** Use as reference, implement your own
- **For exams:** Review all concepts in relevant lessons

**[Complete Student Guide](./documentation/MAI_STUDENT_GUIDE.md)**

---

## Documentation

| Document | Purpose |
|----------|---------|
| [Student Guide](./documentation/MAI_STUDENT_GUIDE.md) | Course mapping, semester planning, study strategies |
| [Exam Prep Guide](./documentation/EXAM_PREPARATION_GUIDE.md) | Exam strategies, practice problems, concept review |
| [COMPSCI 714 Complete Guide](./documentation/courses/COMPSCI_714_COMPLETE_GUIDE.md) | Neural network course guide with lecture alignment |
| [Documentation Index](./documentation/DOCUMENTATION_INDEX.md) | Complete guide to all documentation |
| [Academic Integrity](./documentation/ACADEMIC_INTEGRITY.md) | Responsible use guidelines |

---

## What You'll Learn

### Basic Level (B01-B15)
- Symbolic logic & first-order logic
- Tensors & linear algebra
- Linear regression & gradient descent
- Binary & multi-class classification
- Neural networks from scratch
- Training & optimization theory (COMPSCI 714)
- Data preprocessing & evaluation
- Regularization & overfitting
- CNNs, RNNs, Transformers
- Tokenization & language models

### Intermediate Level (I01-I15)
- Advanced optimization & regularization
- Transfer learning & domain adaptation
- Object detection & segmentation
- Seq2seq & advanced transformers
- Hyperparameter tuning & AutoML
- Generative models (VAEs, GANs)
- MLOps & deployment

### Advanced Level (A01-A15)
- Fine-tuning LLMs
- Prompt engineering & RAG
- Vision-language models
- Distributed training
- Mixed precision & inference optimization
- ML pipelines & monitoring
- Responsible AI

### Expert Level (E01-E15)
- Reading & implementing research papers
- Neural architecture search
- Meta-learning & few-shot learning
- Deep reinforcement learning
- RLHF & alignment
- Federated learning
- Cutting-edge research

---

## Project Ideas

**Beginner:** Sentiment analysis, image classifier, text generator, spam detector, digit recognition

**Intermediate:** Medical image analysis, chatbot, stock predictor, document summarizer, multi-label classification

**Advanced:** RAG system, domain-specific LLM, multi-modal search, code reviewer, real-time detection

**Research:** Novel architecture, paper reproduction, bias detection, model compression, federated learning

---

## Academic Integrity

✅ **Appropriate Use:**
- Learning concepts and understanding implementations
- Preparing for lectures and exams
- Using as inspiration for original projects
- Understanding different approaches

❌ **Inappropriate Use:**
- Copying code for assignments without understanding
- Submitting repository code as your own work
- Using during closed-book assessments
- Violating your institution's policies

**[Full Academic Integrity Policy](./documentation/ACADEMIC_INTEGRITY.md)**

---

## Contributing

Contributions welcome! See [Contributing Guide](./documentation/CONTRIBUTING.md) for details.

---



## Community & Support

- **Questions?** Check [Documentation Index](./documentation/DOCUMENTATION_INDEX.md)
- **Issues?** Open a GitHub issue
- **Suggestions?** Submit a pull request
- **Connect:** [LinkedIn](https://www.linkedin.com/in/karthik-arjun-a5b4a258/)
- **Discord:** [Join the discussion](https://discord.com/channels/1482175575488598109/1482175576168206590)

---

## Support This Project

<div align="center">

### Buy Me a Book

This repository represents hundreds of hours of work to make AI education accessible to everyone. If you find it helpful, consider supporting its continued development!

[![Buy me a book](https://img.shields.io/badge/Buy%20Me%20A%20Book-Support%20This%20Project-yellow.svg?style=for-the-badge&logo=buy-me-a-coffee&logoColor=white)](https://buymeacoffee.com/fcc4sbsx5f6)

*Every contribution, no matter how small, makes a difference!*

</div>

---

## Author

Created by a student pursuing a Master of Artificial Intelligence at the University of Auckland.

**Why this exists:** To make quality AI education accessible to everyone, combining theory with practical implementations.

---

## License

MIT License - See [LICENSE](./LICENSE) for details.

---

<div align="center">

---

### ⭐ If you find this helpful, please star the repository! ⭐
*Made by a student, for students*
**Happy Learning!**

### Ready for the Next Level?
[![Continue to Production LLMs](https://img.shields.io/badge/Continue%20to%20Production%20LLMs-Next%20Step-2ECC71.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/nexageapps/llm)

### Support This Project
[![Buy me a book](https://img.shields.io/badge/Buy%20Me%20A%20Book-Support%20This%20Project-FFDD00.svg?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/fcc4sbsx5f6)

*Every contribution helps create more free educational content!*

---

</div>

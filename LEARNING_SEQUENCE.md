# Complete Learning Sequence: Prerequisites to Expert (2026 Stanford-Level Update)

## Overview

This document outlines the complete **Stanford graduate-level** learning sequence across all levels, showing how lessons build upon each other and providing recommended learning paths based on your goals.

**Total Lessons:** 142 across 7 sectors (was 82)
**Total Time:** 500-700 hours for complete mastery
**Recommended Pace:** 12-18 months for full completion
**Quality Level:** Stanford CS229/CS230/CS231n/CS224n/CS25/CS224V equivalent

**🎓 NEW in 2026:**
- Prerequisites sector with math foundations
- Diffusion models (Stable Diffusion, DALL-E, video generation)
- Vector databases and RAG infrastructure
- Expanded Agents (31 lessons with LangChain, LangGraph, computer-use)
- Production Applications sector (18 real-world projects)
- Modern RL techniques (DPO, GRPO, test-time compute)
- Multimodal AI expansion
- Observability and monitoring tools

---

## Learning Level Progression (Updated 2026)

```
PREREQUISITES (P01-P05)     MATH & PYTHON FOUNDATIONS
    ↓
BASIC (B01-B21)             ML/DL FUNDAMENTALS (CS229/CS230)
    ↓
INTERMEDIATE (I01-I22)      ADVANCED TECHNIQUES (CS231n/CS224n/CS236)
    ↓                ↓
ADVANCED (A01-A24)    AGENTS (AG01-AG31)    PRODUCTION & APPLICATIONS (CS224V)
    ↓                ↓
EXPERT (E01-E21)      APPLICATIONS (APP01-APP18)    RESEARCH & REAL-WORLD
```

---

## Phase 0: Prerequisites (Weeks 0-2) [NEW]

### Mathematical & Programming Foundations

**For Complete Beginners or Refresher**

**Week 0-1: Mathematical Foundations**
- P01 - Linear Algebra for ML
- P02 - Calculus and Optimization
- P03 - Probability and Statistics
- **Builds To:** All ML/AI work
- **Key Concepts:** Vectors, matrices, gradients, distributions
- **Stanford Level:** CS229 prerequisites

**Week 1-2: Programming Setup**
- P04 - Python for ML (NumPy, Pandas, PyTorch)
- P05 - Development Environment Setup
- **Builds To:** Practical implementation
- **Key Concepts:** Data manipulation, PyTorch basics, Jupyter
- **Stanford Level:** CS230 prerequisites

**Learning Checkpoint:** Can you manipulate matrices and write Python code for ML?

**⚠️ Skip Prerequisites if:**
- You're comfortable with linear algebra and calculus
- You already know Python, NumPy, and pandas
- You have ML programming experience

---

## Phase 1: Foundation (Weeks 1-4)

### Basic Level Core Sequence (CS229/CS230 Level)

**Prerequisites:** P01-P05 complete OR existing ML knowledge

**Week 1: Symbolic Logic & Tensor Fundamentals**
- B01 - Symbolic Logic Fundamentals
- B01a - Arithmetic and Tensors
- **Builds To:** All subsequent ML/AI work
- **Key Concepts:** Logical reasoning, tensor operations, computational graphs

**Week 2: Regression & Classification Basics**
- B02 - Linear Regression
- B03 - Binary Classification
- B04 - Multi-Class Classification
- **Builds To:** Neural networks, all supervised learning
- **Key Concepts:** Gradient descent, loss functions, optimization

**Week 3: Neural Network Foundations**
- B05 - Neural Network Fundamentals
- B05a - Neural Networks Theory (COMPSCI 714)
- B05b - Training and Optimization (COMPSCI 714)
- B05c - MLP on Tabular Data with PyTorch (COMPSCI 714)
- **Builds To:** All deep learning topics
- **Key Concepts:** Backpropagation, activation functions, universal approximation

**Week 4: Data & Evaluation**
- B06 - Data Preprocessing and Feature Engineering
- B07 - Model Evaluation and Performance Metrics
- B08 - Regularization and Overfitting
- **Builds To:** Production ML, proper model evaluation
- **Key Concepts:** Data cleaning, metrics, overfitting prevention

**Learning Checkpoint:** Can you build and train a neural network on tabular data?

---

## Phase 2: Deep Learning Specialization (Weeks 5-8)

### Computer Vision Track

**Week 5: Convolutional Neural Networks**
- B09 - Convolutional Neural Networks
- B09a - Transfer Learning Fundamentals (COMPSCI 714)
- **Builds To:** Advanced CV (I04-I06), Vision-Language Models (A04)
- **Key Concepts:** Convolutions, pooling, feature hierarchies

### Sequence Modeling Track

**Week 6: Recurrent Neural Networks**
- B10 - Recurrent Neural Networks
- B10a - RNNs (COMPSCI 714)
- **Builds To:** Advanced NLP (I08-I10), Transformers
- **Key Concepts:** Sequential processing, LSTM/GRU, vanishing gradients

### Modern Architecture

**Week 7: Attention & Transformers**
- B11 - Attention and Transformers
- **Builds To:** LLMs (A01-A03), Multi-Modal (A04-A06), Agents (AG01-AG18)
- **Key Concepts:** Self-attention, positional encoding, encoder-decoder

**Week 8: Language Models**
- B12 - Byte Pair Encoding (BPE)
- B13 - Building a Mini Language Model
- B09b - Graph Neural Networks (COMPSCI 713) [Optional]
- **Builds To:** Fine-tuning LLMs (A01), Prompt Engineering (A02)
- **Key Concepts:** Tokenization, causal attention, text generation

**Learning Checkpoint:** Can you implement a transformer from scratch?

---

## Phase 3: Intermediate Mastery (Weeks 9-16) [EXPANDED]

**Prerequisites:** Basic level complete (B01-B21)

### Optimization & Architecture (Weeks 9-10)

**Week 9: Advanced Training**
- I01 - Advanced Optimization Algorithms
- I02 - Regularization Techniques
- I03 - Batch and Layer Normalization
- **Builds From:** B02 (gradient descent), B05 (neural networks), B08 (regularization)
- **Builds To:** Efficient training (A07-A08), Research (E02)

**Week 10: Modern Architectures**
- I04 - Advanced CNN Architectures
- I04a - Pretrained Foundation Models in CV (COMPSCI 714)
- I05 - Transfer Learning and Fine-tuning
- **Builds From:** B09 (CNNs), B09a (transfer learning basics)
- **Builds To:** Vision-Language Models (A04), Production deployment (A09-A11)

### Vision & Detection (Week 11)

**Week 11: Advanced Computer Vision**
- I06 - Object Detection and Segmentation
- I07 - Generative Models (GANs, VAEs)
- **Builds From:** B09 (CNNs), I04 (architectures)
- **Builds To:** Diffusion models (I07b-d), Multi-Modal (A06)
- **Stanford Level:** CS231n, CS236

### Diffusion Models (Weeks 11-12) [NEW]

**Week 11-12: Image Generation with Diffusion**
- I07b - Diffusion Models and Image Generation
- I07c - Latent Diffusion and Stable Diffusion
- I07d - Image Generation with DALL-E and FLUX
- **Builds From:** I07 (VAEs), B09 (CNNs)
- **Builds To:** Video/audio diffusion (A06b), Diffusion apps (APP16-18)
- **Key Concepts:** DDPM, DDIM, latent diffusion, text conditioning
- **Stanford Level:** CS236 (Deep Generative Models)

### NLP & Transformers (Weeks 13-14)

**Week 13: Sequence-to-Sequence**
- I08 - Sequence-to-Sequence Models
- I09 - BERT and Transformer Models
- **Builds From:** B10 (RNNs), B11 (Transformers)
- **Builds To:** LLM fine-tuning (A01), Prompt engineering (A02)

**Week 14: Advanced NLP**
- I10 - Named Entity Recognition and Information Extraction
- I11 - Sentiment Analysis and Text Classification
- **Builds From:** B11 (Transformers), I09 (BERT)
- **Builds To:** RAG systems (A03), NLP agents (AG14)

### RAG Infrastructure (Weeks 15-16) [NEW]

**Week 15: Vector Databases**
- I16 - Vector Databases (Pinecone, Weaviate, Chroma)
- I17 - Embeddings and Semantic Search
- **Builds From:** B11 (Transformers), I09 (BERT)
- **Builds To:** RAG systems (I18, A03), RAG agents (AG07-09)
- **Key Concepts:** Vector similarity, HNSW indexing, semantic search
- **Stanford Level:** CS224V infrastructure

**Week 16: Building RAG Systems**
- I18 - Building Your First RAG System
- **Builds From:** I16-I17 (vector DBs)
- **Builds To:** Advanced RAG (A03), RAG agents (AG07-09)
- **Key Concepts:** Document loading, chunking, retrieval pipeline
- **Stanford Level:** CS224V foundations

### Production Basics (Week 17) [RENUMBERED]

**Week 17: Deployment Fundamentals**
- I12 - Hyperparameter Tuning and AutoML
- I13 - Multi-Task and Meta-Learning
- I14 - Model Compression and Quantization
- I15 - MLOps Fundamentals
- **Builds From:** All previous optimization work
- **Builds To:** Production deployment (A09-A13)

**Learning Checkpoint:** Can you fine-tune a pre-trained model, build a RAG system, and generate images with diffusion?

---

## Phase 4A: Production Track (Weeks 18-25) - Advanced [EXPANDED]

**Prerequisites:** Intermediate level complete (I01-I22)

### LLM Mastery (Weeks 15-16)

**Week 15: Fine-tuning & Prompting**
- A01 - Fine-tuning Large Language Models
- A02 - Prompt Engineering and In-Context Learning
- A02a - LLM-based Agents
- **Builds From:** B11-B13 (Transformers, LLMs), I09 (BERT)
- **Builds To:** Agents (AG01-AG18)
- **Key Concepts:** LoRA, PEFT, few-shot learning, agent architecture

**Week 16: Knowledge Systems**
- A03 - Retrieval-Augmented Generation (RAG)
- **Builds From:** B11 (Transformers), I09 (BERT), A02 (prompting)
- **Builds To:** RAG agents (AG06), Knowledge agents (AG14)
- **Key Concepts:** Vector databases, embeddings, hybrid search

### Multi-Modal AI (Weeks 17-18)

**Week 17: Vision-Language**
- A04 - Vision-Language Models
- **Builds From:** B09 (CNNs), B11 (Transformers), I04 (architectures)
- **Builds To:** Multi-modal agents, Research (E13)

**Week 18: Audio & Multi-Modal Fusion**
- A05 - Audio and Speech Processing
- A06 - Multi-Modal Fusion and Integration
- **Builds From:** B10 (RNNs), B11 (Transformers), A04 (VLMs)
- **Builds To:** Multi-modal systems, Research (E13)

### Scale & Optimization (Weeks 19-20)

**Week 19: Distributed Training**
- A07 - Distributed Training Strategies
- A08 - Mixed Precision and Optimization
- A09 - Model Serving and Inference Optimization
- **Builds From:** I01 (optimization), I14 (compression)
- **Builds To:** Production scale, Efficient AI (E14)

**Week 20: MLOps & Deployment**
- A10 - ML Pipeline Architecture
- A11 - Containerization and Deployment
- A12 - Monitoring and Observability
- A13 - CI/CD for Machine Learning
- **Builds From:** I15 (MLOps fundamentals)
- **Builds To:** Agent deployment (AG15-AG17)

**Week 21: Responsible AI & Case Studies**
- A14 - Responsible AI and Governance
- A15 - Production Case Studies and Capstone
- **Builds From:** All advanced topics
- **Capstone:** Complete production system

**Learning Checkpoint:** Can you deploy a production LLM system with monitoring?

---

## Phase 4B: Agents Track (Weeks 15-26) - Agents [RECOMMENDED FOR APPLICATIONS]

**Prerequisites:** Basic complete, Intermediate recommended, A01-A03 recommended

### Foundation (Weeks 15-16)

**Week 15: Agent Fundamentals**
- AG01 - Introduction to AI Agents
- AG02 - LangChain Basics
- AG03 - Memory Systems
- **Builds From:** B11 (Transformers), A02 (prompting), A03 (RAG)
- **Key Concepts:** ReAct pattern, chains, memory systems

**Week 16: Core Development**
- AG04 - Tools and Function Calling [IN DEVELOPMENT]
- AG05 - Building Your First Agent [IN DEVELOPMENT]
- **Builds From:** AG01-AG03
- **Key Concepts:** Custom tools, agent executors

### Knowledge Agents (Weeks 17-18)

**Week 17: RAG Agents**
- AG06 - RAG Agents [IN DEVELOPMENT]
- AG07 - Agent Evaluation and Testing [IN DEVELOPMENT]
- **Builds From:** A03 (RAG), AG04-AG05
- **Key Concepts:** Document loading, vector stores, testing

**Week 18: Advanced Orchestration**
- AG08 - Introduction to LangGraph [IN DEVELOPMENT]
- AG09 - Multi-Step Agent Workflows [IN DEVELOPMENT]
- **Builds From:** AG05 (agents)
- **Key Concepts:** State machines, planning

### Complex Systems (Weeks 19-20)

**Week 19: Human-Agent Interaction**
- AG10 - Human-in-the-Loop Patterns [IN DEVELOPMENT]
- AG11 - Multi-Agent Systems [IN DEVELOPMENT]
- **Builds From:** AG08-AG09
- **Key Concepts:** Breakpoints, agent teams

**Week 20: Specialized Applications**
- AG12 - Code Generation and Analysis Agents [IN DEVELOPMENT]
- AG13 - Data Analysis and Visualization Agents [IN DEVELOPMENT]
- AG14 - Research and Content Creation Agents [IN DEVELOPMENT]
- **Builds From:** AG11
- **Key Concepts:** Domain-specific agents

### Production Agents (Weeks 21-22)

**Week 21: Deployment**
- AG15 - Agent APIs and Backends [IN DEVELOPMENT]
- AG16 - Agent UIs and Frontends [IN DEVELOPMENT]
- **Builds From:** AG12-AG14, A11-A12 (deployment basics)
- **Key Concepts:** FastAPI, Streamlit, WebSockets

**Week 22: Monitoring & Capstone**
- AG17 - Monitoring and Production [IN DEVELOPMENT]
- AG18 - Capstone Agent Projects [IN DEVELOPMENT]
- **Builds From:** AG15-AG16, A12 (monitoring)
- **Capstone:** 5 production agent systems

**Learning Checkpoint:** Can you build and deploy a multi-agent system?

---

## Phase 5: Research & Innovation (Weeks 23-34) - Expert

**Prerequisites:** Advanced level complete (A01-A15) OR Agents complete (AG01-AG18)

### Research Foundations (Weeks 23-25)

**Week 23: Paper Implementation**
- E01 - Reading and Implementing Research Papers
- E02 - Experimental Design and Ablation Studies
- **Builds From:** All previous levels
- **Key Concepts:** Paper reading, reproducibility

**Week 24: Research Communication**
- E03 - Writing and Publishing Research
- **Builds From:** E01-E02
- **Key Concepts:** Paper writing, peer review

**Week 25: Architecture Search**
- E04 - Neural Architecture Search (NAS)
- **Builds From:** B05 (neural nets), I04 (architectures)
- **Key Concepts:** AutoML, search spaces

### Novel Architectures (Weeks 26-27)

**Week 26: Custom Design**
- E05 - Custom Layer and Operation Design
- E06 - Attention Mechanism Innovations
- **Builds From:** B05 (backprop), B11 (attention)
- **Key Concepts:** CUDA kernels, novel attention

### Advanced Learning Paradigms (Weeks 27-30)

**Week 27: Meta-Learning**
- E07 - Meta-Learning and Few-Shot Learning
- **Builds From:** I13 (meta-learning intro)
- **Key Concepts:** MAML, prototypical networks

**Week 28: Continual Learning**
- E08 - Continual and Lifelong Learning
- E08a - Data Streams and Continual Learning
- **Builds From:** B08 (regularization), I02 (advanced regularization)
- **Key Concepts:** Catastrophic forgetting, memory replay

**Week 29: Self-Supervised Learning**
- E09 - Self-Supervised and Contrastive Learning
- **Builds From:** I07 (generative models), I04a (SSL intro)
- **Key Concepts:** Contrastive loss, SimCLR, MoCo

**Week 30: Reinforcement Learning**
- E10 - Deep Reinforcement Learning
- E10a - Q-Learning and Deep Q-Networks
- **Builds From:** B05 (neural nets), I01 (optimization)
- **Key Concepts:** Q-learning, policy gradients, Actor-Critic

### Emerging Topics (Weeks 31-34)

**Week 31: RLHF**
- E11 - Reinforcement Learning from Human Feedback (RLHF)
- **Builds From:** E10 (deep RL), A01 (LLM fine-tuning)
- **Key Concepts:** Reward modeling, PPO, alignment

**Week 32: Privacy & Federation**
- E12 - Federated and Privacy-Preserving Learning
- **Builds From:** A07 (distributed training)
- **Key Concepts:** Differential privacy, federated averaging

**Week 33: Multimodal Foundation**
- E13 - Multimodal Foundation Models
- **Builds From:** A04-A06 (multi-modal), B11 (Transformers)
- **Key Concepts:** GPT-4, Gemini, unified encoders

**Week 34: Efficient AI**
- E14 - Efficient and Green AI
- **Builds From:** I14 (compression), A08 (mixed precision)
- **Key Concepts:** Carbon footprint, efficient architectures

**Week 35+: Research Project**
- E15 - Research Project and Contribution
- **Capstone:** Original research contribution

**Learning Checkpoint:** Can you reproduce a paper and propose improvements?

---

## Recommended Learning Paths

### Path 1: Full Stack AI Engineer (Most Popular)

**Timeline:** 9-12 months

```
Basic (Weeks 1-8)
    ↓
Intermediate (Weeks 9-14)
    ↓
Advanced A01-A03 (Weeks 15-16) ← LLMs
    ↓
Agents AG01-AG18 (Weeks 17-22) ← Applications
    ↓
Advanced A07-A15 (Weeks 23-25) ← Production
```

**Why:** Fastest path to building production AI applications
**Best For:** Software engineers, product builders, startups
**Outcome:** Can build and deploy complete AI systems

---

### Path 2: ML Research Scientist

**Timeline:** 10-14 months

```
Basic (Weeks 1-8)
    ↓
Intermediate (Weeks 9-14)
    ↓
Advanced (Weeks 15-21)
    ↓
Expert (Weeks 22-35+)
```

**Why:** Deep theoretical understanding and research skills
**Best For:** PhD students, research scientists, academics
**Outcome:** Can contribute to research and publish papers

---

### Path 3: Agent Specialist (NEW)

**Timeline:** 6-8 months

```
Basic B01-B11 (Weeks 1-7) ← Core ML + Transformers
    ↓
Advanced A01-A03 (Weeks 8-9) ← LLMs + RAG
    ↓
Agents AG01-AG18 (Weeks 10-15) ← Full Agent Development
    ↓
Advanced A10-A15 (Weeks 16-18) ← Production Deployment
```

**Why:** Fastest path to agent development mastery
**Best For:** LLM application developers, agent builders
**Outcome:** Can build production multi-agent systems

---

### Path 4: Computer Vision Engineer

**Timeline:** 8-10 months

```
Basic B01-B09 (Weeks 1-5)
    ↓
Intermediate I04-I07 (Weeks 6-9)
    ↓
Advanced A04, A06-A15 (Weeks 10-16)
    ↓
Expert E04-E06, E09, E13-E14 (Weeks 17-22)
```

**Why:** Specialized CV pipeline from basics to cutting edge
**Best For:** Computer vision engineers, robotics
**Outcome:** Can build production CV systems

---

### Path 5: NLP Engineer

**Timeline:** 8-10 months

```
Basic B01-B04, B10-B13 (Weeks 1-6)
    ↓
Intermediate I08-I11 (Weeks 7-10)
    ↓
Advanced A01-A03 (Weeks 11-13)
    ↓
Agents AG01-AG18 OR Expert E07, E09, E11 (Weeks 14-22)
```

**Why:** Complete NLP pipeline from basics to agents/research
**Best For:** NLP engineers, chatbot developers
**Outcome:** Can build production NLP systems or conduct research

---

## Lesson Dependencies Map

### Critical Dependencies (Must Complete First)

| Lesson | Requires | Enables |
|--------|----------|---------|
| **B05** - Neural Networks | B01-B04 | All deep learning |
| **B11** - Transformers | B05, B09, B10 | All modern NLP/Agents |
| **I09** - BERT | B11 | LLM fine-tuning, Agents |
| **A01** - Fine-tuning LLMs | B11, I09 | Advanced LLM work |
| **A03** - RAG | B11, A02 | Knowledge agents |
| **AG05** - First Agent | AG01-AG04 | All agent work |
| **AG08** - LangGraph | AG05-AG07 | Complex agents |

### Recommended Dependencies (Strongly Suggested)

| Lesson | Benefits From | Enhances |
|--------|---------------|----------|
| **Agents (AG01-AG18)** | A01-A03 | Production readiness |
| **A07** - Distributed Training | I01, I14 | Scale efficiency |
| **E10** - Deep RL | B05, I01 | E11 (RLHF) |
| **E13** - Multimodal Foundation | A04-A06 | Cutting-edge systems |

---

## Prerequisites Summary

### For Intermediate Level
**Required:**
- B01-B15 complete
- Strong Python programming
- Understanding of calculus and linear algebra

**Recommended:**
- Experience with PyTorch or TensorFlow
- GPU access (Colab free tier sufficient)

### For Advanced Level
**Required:**
- I01-I15 complete
- Experience training deep learning models
- Understanding of optimization

**Recommended:**
- Cloud platform experience (AWS/GCP/Azure)
- Docker basics
- API development knowledge

### For Agents Level
**Required:**
- B01-B13 complete (especially B11 Transformers)
- Strong Python programming
- API/web development basics

**Recommended:**
- A01-A03 complete (LLMs + RAG)
- I09 complete (BERT)
- FastAPI or Flask experience

### For Expert Level
**Required:**
- A01-A15 complete
- Research paper reading experience
- Strong mathematical foundation
- GPU/TPU access for experiments

**Recommended:**
- Published paper or research project
- Open source contribution experience
- LaTeX knowledge

---

## Study Strategies by Phase

### Phase 1-2 (Basic & Start Intermediate)
- **Focus:** Understanding fundamentals deeply
- **Pace:** Don't rush, build strong foundation
- **Practice:** Implement everything from scratch once
- **Time:** 2-3 months minimum

### Phase 3 (Complete Intermediate)
- **Focus:** Practical implementation and optimization
- **Pace:** Accelerate with pre-trained models
- **Practice:** Focus on transfer learning and fine-tuning
- **Time:** 1.5-2 months

### Phase 4 (Advanced/Agents)
- **Focus:** Production deployment and applications
- **Pace:** Project-based learning
- **Practice:** Build complete systems end-to-end
- **Time:** 2-3 months

### Phase 5 (Expert)
- **Focus:** Research and innovation
- **Pace:** Deep dive, reproduce papers
- **Practice:** Original contributions
- **Time:** 3-4 months minimum

---

## Update Schedule

**This document is updated:**
- When new lessons are added
- When dependencies change
- When learning paths are optimized
- Based on student feedback

**Current Version:** 2.0
**Last Updated:** December 2024
**Next Review:** After AG04-AG07 completion

---

## Getting Started

1. **Choose your path** based on your goals
2. **Start with Basic B01** regardless of path
3. **Complete prerequisites** before advancing
4. **Build projects** at each phase
5. **Join community** for support and feedback

**Ready to begin? Start with [Basic/B01](./Basic/B01%20-%20Symbolic%20Logic%20Fundamentals.ipynb)**

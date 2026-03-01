<div align="center">

# AI & Machine Learning Roadmap: From Basics to LLMs

**Open-source AI education built by a Master's in AI student, for everyone.**

*Basic → Expert. Zero → Language Models. 60+ lessons. 100% hands-on.*

[MAI Student Guide](./MAI_STUDENT_GUIDE.md) • [Quick Start](#getting-started) • [LinkedIn](https://www.linkedin.com/in/karthik-arjun-a5b4a258/)

[![Python](https://img.shields.io/badge/Python-3.8+-orange.svg)](https://www.python.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![Lessons](https://img.shields.io/badge/Lessons-60+-brightgreen.svg)](./Basic/)
[![Sponsored by nexageapps](https://img.shields.io/badge/Sponsored%20by-nexageapps-blue.svg)](https://nexageapps.com)

</div>

---

**DISCLAIMER:** This is an independent student project, not officially affiliated with the University of Auckland. Created by a current MAI student to share learning materials. Course references (COMPSCI 713, 714, 761, 762, 703, COMPSYS 721) are for educational context only. Content and opinions are solely those of the author.

---

## About This Project

I'm a Master of Artificial Intelligence (MAI) student at the University of Auckland, and this is my open-source learning journey. This repository documents everything I'm learning to help fellow students, researchers, and AI enthusiasts.

**Why this exists:**
- Student perspective on AI concepts from scratch
- Practical implementations, not just theory
- Quality AI education accessible to everyone
- Every concept comes with runnable code
- Complements university coursework with hands-on practice

**This is a learning companion.** Whether you're a master's student, self-learner, or professional upskilling, you're welcome here.

### For MAI Students

Every lesson provides:
- Practical implementations of lecture concepts
- Hands-on practice before assignments and exams
- Reference code for projects and dissertations
- Portfolio projects to showcase your skills

**[MAI Student Guide](./MAI_STUDENT_GUIDE.md)** includes:
- Course mapping (COMPSCI 713, 714, 761, 762, 703, COMPSYS 721)
- Week-by-week study strategies
- Assignment preparation tips
- Research project ideas
- Exam preparation strategies

**How this helps:**
- Before lectures: Build intuition with examples
- During semester: Reinforce concepts with code
- For assignments: Reference implementations
- For exams: Review all concepts
- For dissertation: Capstone project starting points

**Not a UoA student?** Content is valuable for any AI/ML learner.

## Mission

Provide a structured, hands-on learning path from basic arithmetic to complete language models. Each lesson builds progressively with clear explanations, visualizations, and runnable implementations.

Designed to help MAI students at the University of Auckland succeed by complementing theoretical lectures with practical code. Content aligns with core courses: COMPSCI 713, 714, 761, 762, 703, and COMPSYS 721.

## Table of Contents

- [About This Project](#about-this-project)
- [What Makes This Different](#what-makes-this-different)
- [Learning Path Diagram](#learning-path-diagram)
- [Repository Structure](#repository-structure)
- [Getting Started](#getting-started)
- [Usage & Learning Tips](#usage--learning-tips)
- [Academic Integrity](#academic-integrity)
- [Project Ideas for Students](#project-ideas-for-students)
- [For MAI Students](#for-mai-students)
- [Contributing](#contributing)
- [Community & Support](#community--support)
- [Author](#author)
- [License](#license)

## What Makes This Different

- Student perspective: Written by someone currently learning
- Progressive structure: From fundamentals to advanced, no gaps
- 100% hands-on: Every concept with runnable code
- Visual learning: Comprehensive visualizations
- Real-world focus: Practical applications, not toy examples
- Academic rigor: Meets top university standards
- Completely free: Quality education for everyone
- Active development: Regular updates

**What You'll Build:**
Linear regression • Binary/multi-class classifiers • Deep neural networks • CNNs for images • RNNs/LSTMs for sequences • Transformers with attention • BPE tokenizer • Mini GPT-style language model • Portfolio capstone projects

## Learning Path Diagram

```mermaid
graph TB
    Start([START YOUR AI JOURNEY]):::startNode
    
    subgraph Foundation["FOUNDATION (B01-B03)"]
        B01["B01: Arithmetic Operations<br/>Master tensor operations & TensorFlow basics"]:::basic
        B02["B02: Linear Regression<br/>Learn gradient descent & loss functions"]:::basic
        B03["B03: Binary Classification<br/>Understand decision boundaries & sigmoid"]:::basic
        
        B01 --> B02 --> B03
    end
    
    subgraph CoreML["CORE MACHINE LEARNING (B04-B08)"]
        B04["B04: Multi-Class Classification<br/>Softmax & categorical cross-entropy"]:::basic
        B05["B05: Neural Network Fundamentals<br/>MLPs, activation functions, backpropagation"]:::basic
        B06["B06: Data Preprocessing<br/>Feature engineering, scaling, encoding"]:::basic
        B07["B07: Model Evaluation<br/>Metrics, cross-validation, imbalanced data"]:::basic
        B08["B08: Regularization & Overfitting<br/>L1/L2, dropout, early stopping"]:::basic
        
        B04 --> B05 --> B06 --> B07 --> B08
    end
    
    subgraph DeepLearning["DEEP LEARNING (B09-B11)"]
        B09["B09: Convolutional Neural Networks<br/>CNNs for computer vision & image processing"]:::basic
        B10["B10: Recurrent Neural Networks<br/>RNNs, LSTMs, GRUs for sequential data"]:::basic
        B11["B11: Attention & Transformers<br/>Self-attention mechanism & modern NLP"]:::basic
        
        B09 --> B11
        B10 --> B11
    end
    
    subgraph NLP["NLP SPECIALIZATION (B12-B13)"]
        B12["B12: Byte Pair Encoding<br/>Tokenization techniques for language models"]:::basic
        B13["B13: Build Mini Language Model<br/>Create your own GPT-style model from scratch"]:::basic
        
        B12 --> B13
    end
    
    subgraph IntermediateOpt["INTERMEDIATE: OPTIMIZATION (I01-I03)"]
        I01["I01: Advanced Optimization<br/>Adam, RMSprop, learning rate scheduling"]:::intermediate
        I02["I02: Regularization<br/>L1/L2, dropout, data augmentation"]:::intermediate
        I03["I03: Normalization<br/>Batch & layer normalization"]:::intermediate
        
        I01 --> I02 --> I03
    end
    
    subgraph IntermediateCV["INTERMEDIATE: COMPUTER VISION (I04-I06)"]
        I04["I04: Advanced CNNs<br/>ResNet, VGG, EfficientNet"]:::intermediate
        I05["I05: Transfer Learning<br/>Pre-trained models & fine-tuning"]:::intermediate
        I06["I06: Detection & Segmentation<br/>YOLO, R-CNN, U-Net"]:::intermediate
        
        I04 --> I05 --> I06
    end
    
    subgraph IntermediateNLP["INTERMEDIATE: NLP (I07-I09)"]
        I07["I07: Advanced RNNs<br/>Bidirectional & stacked LSTMs"]:::intermediate
        I08["I08: Seq2Seq Models<br/>Encoder-decoder architecture"]:::intermediate
        I09["I09: Advanced Transformers<br/>BERT, GPT variants, T5"]:::intermediate
        
        I07 --> I08 --> I09
    end
    
    subgraph IntermediateProd["INTERMEDIATE: PRODUCTION (I10-I15)"]
        I10["I10: Hyperparameter Tuning<br/>Bayesian optimization, AutoML"]:::intermediate
        I11["I11: Model Compression<br/>Pruning, quantization"]:::intermediate
        I12["I12: Generative Models<br/>VAEs, GANs, diffusion"]:::intermediate
        I13["I13: Meta-Learning<br/>Few-shot, MAML"]:::intermediate
        I14["I14: Explainable AI<br/>SHAP, LIME, fairness"]:::intermediate
        I15["I15: MLOps<br/>Deployment & monitoring"]:::intermediate
        
        I10 --> I11
        I12 --> I13
        I11 --> I14
        I13 --> I14
        I14 --> I15
    end
    
    subgraph AdvancedLLM["ADVANCED: LLMs (A01-A03)"]
        A01["A01: Fine-tuning LLMs<br/>LoRA, QLoRA, PEFT"]:::advanced
        A02["A02: Prompt Engineering<br/>Chain-of-Thought, ReAct"]:::advanced
        A03["A03: RAG Systems<br/>Vector DBs, embeddings"]:::advanced
        
        A01 --> A02 --> A03
    end
    
    subgraph AdvancedMulti["ADVANCED: MULTI-MODAL (A04-A06)"]
        A04["A04: Vision-Language<br/>CLIP, BLIP, Stable Diffusion"]:::advanced
        A05["A05: Audio & Speech<br/>Whisper, TTS"]:::advanced
        A06["A06: Multi-Modal Fusion<br/>Unified systems"]:::advanced
        
        A04 --> A05 --> A06
    end
    
    subgraph AdvancedScale["ADVANCED: SCALING (A07-A09)"]
        A07["A07: Distributed Training<br/>Data/model parallelism"]:::advanced
        A08["A08: Mixed Precision<br/>FP16, BF16 training"]:::advanced
        A09["A09: Inference Optimization<br/>TensorRT, ONNX"]:::advanced
        
        A07 --> A08 --> A09
    end
    
    subgraph AdvancedOps["ADVANCED: MLOps (A10-A15)"]
        A10["A10: ML Pipelines<br/>Feature stores, orchestration"]:::advanced
        A11["A11: Deployment<br/>Docker, Kubernetes"]:::advanced
        A12["A12: Monitoring<br/>Drift detection, A/B testing"]:::advanced
        A13["A13: CI/CD for ML<br/>Automated testing"]:::advanced
        A14["A14: Responsible AI<br/>Bias, privacy, compliance"]:::advanced
        A15["A15: Production Capstone<br/>Real-world systems"]:::advanced
        
        A10 --> A11 --> A12
        A12 --> A13 --> A14 --> A15
    end
    
    subgraph ExpertResearch["EXPERT: RESEARCH (E01-E03)"]
        E01["E01: Reading Papers<br/>Implementation & reproduction"]:::expert
        E02["E02: Experimental Design<br/>Ablation studies"]:::expert
        E03["E03: Writing & Publishing<br/>Research papers"]:::expert
        
        E01 --> E02 --> E03
    end
    
    subgraph ExpertArch["EXPERT: ARCHITECTURES (E04-E06)"]
        E04["E04: Neural Architecture Search<br/>DARTS, ENAS"]:::expert
        E05["E05: Custom Layers<br/>CUDA kernels"]:::expert
        E06["E06: Attention Innovations<br/>Flash Attention"]:::expert
        
        E04 --> E05 --> E06
    end
    
    subgraph ExpertLearn["EXPERT: LEARNING (E07-E09)"]
        E07["E07: Meta-Learning<br/>MAML, few-shot"]:::expert
        E08["E08: Continual Learning<br/>Lifelong learning"]:::expert
        E09["E09: Self-Supervised<br/>SimCLR, MoCo"]:::expert
        
        E07 --> E08 --> E09
    end
    
    subgraph ExpertRL["EXPERT: RL & PRIVACY (E10-E12)"]
        E10["E10: Deep RL<br/>DQN, PPO, SAC"]:::expert
        E11["E11: RLHF<br/>Alignment & safety"]:::expert
        E12["E12: Federated Learning<br/>Privacy-preserving"]:::expert
        
        E10 --> E11 --> E12
    end
    
    subgraph ExpertEdge["EXPERT: CUTTING-EDGE (E13-E15)"]
        E13["E13: Multimodal Foundation<br/>Unified models"]:::expert
        E14["E14: Efficient AI<br/>Green & sustainable"]:::expert
        E15["E15: Research Project<br/>Original contribution"]:::expert
        
        E13 --> E14 --> E15
    end
    
    Start --> B01
    B03 --> B04
    B08 --> B09
    B08 --> B10
    B11 --> B12
    B13 --> I01
    
    I03 --> I04
    I03 --> I07
    I06 --> I10
    I09 --> I10
    I09 --> I12
    
    I15 --> A01
    A03 --> A04
    A06 --> A07
    A09 --> A10
    
    A15 --> E01
    E03 --> E04
    E03 --> E07
    E03 --> E10
    E06 --> E13
    E09 --> E13
    E12 --> E13
    
    classDef startNode fill:#4A90E2,stroke:#2E5C8A,stroke-width:4px,color:#fff,font-size:16px
    classDef basic fill:#FFE5B4,stroke:#D4A574,stroke-width:3px,color:#000,font-size:14px
    classDef intermediate fill:#B4E5FF,stroke:#74A5D4,stroke-width:3px,color:#000,font-size:14px
    classDef advanced fill:#D4B4FF,stroke:#9474D4,stroke-width:3px,color:#000,font-size:14px
    classDef expert fill:#FFD700,stroke:#B8860B,stroke-width:4px,color:#000,font-size:14px
```

### Learning Path Explanation

**How to Navigate:**

The diagram flows from top to bottom, organized into clear stages. Each stage builds upon the previous one, ensuring you have the necessary foundation before advancing.

**Stage Breakdown:**

**1. Foundation (B01-B03)** - Start Here
- Master the absolute basics: tensors, linear models, and binary classification
- Duration: ~2-3 hours
- Prerequisites: Basic Python knowledge

**2. Core Machine Learning (B04-B08)** - Essential Skills
- Build strong ML fundamentals with multi-class problems, neural networks, data preprocessing, evaluation, and regularization
- Duration: ~8-10 hours
- Prerequisites: Complete Foundation stage

**3. Deep Learning (B09-B11)** - Advanced Neural Networks
- Dive into CNNs for images, RNNs for sequences, and Transformers for modern AI
- Note: B09 and B10 can be learned in parallel, both converge at B11
- Duration: ~8-10 hours
- Prerequisites: Complete Core ML stage

**4. NLP Specialization (B12-B13)** - Build Language Models
- Learn tokenization techniques and build your own GPT-style language model
- Duration: ~4-6 hours
- Prerequisites: Complete Deep Learning stage

**5. Practice & Portfolio (B14-B15)** - Apply Your Skills
- Complete practical assignments and build capstone projects
- Create portfolio-worthy projects for job applications
- Duration: ~2-6 weeks (depending on project scope)
- Prerequisites: Complete all previous stages

**6. Intermediate Level (I01-I15)** - Advanced Techniques
- **Optimization (I01-I03)**: Master advanced training techniques
- **Computer Vision (I04-I06)**: State-of-the-art CV architectures
- **NLP (I07-I09)**: Advanced sequential models and transformers
- **Production ML (I10-I15)**: Tuning, compression, generative models, and deployment
- Duration: ~60-80 hours
- Prerequisites: Complete all Basic level lessons

**7. Advanced Level (A01-A15)** - Production Systems
- **LLMs (A01-A03)**: Fine-tuning, prompt engineering, RAG systems
- **Multi-Modal (A04-A06)**: Vision-language, audio, multi-modal fusion
- **Scaling (A07-A09)**: Distributed training, mixed precision, inference optimization
- **MLOps (A10-A15)**: Pipelines, deployment, monitoring, CI/CD, responsible AI
- Duration: ~80-100 hours
- Prerequisites: Complete Intermediate level

**8. Expert Level (E01-E15)** - Research & Innovation
- **Research (E01-E03)**: Reading papers, experimental design, publishing
- **Architectures (E04-E06)**: NAS, custom layers, attention innovations
- **Learning (E07-E09)**: Meta-learning, continual learning, self-supervised
- **RL & Privacy (E10-E12)**: Deep RL, RLHF, federated learning
- **Cutting-Edge (E13-E15)**: Multimodal foundations, efficient AI, research projects
- Duration: ~100-120 hours
- Prerequisites: Complete Advanced level

**Color Guide:**
- Blue: Your starting point
- Peach: Basic Level - Foundation concepts (B01-B15)
- Light Blue: Intermediate Level - Advanced techniques (I01-I15)
- Purple: Advanced Level - Production systems (A01-A15)
- Gold: Expert Level - Research and innovation (E01-E15)

**Learning Flow:**
- **Basic → Intermediate**: Focus on mastering fundamentals before advancing
- **Intermediate → Advanced**: Build production-ready skills after mastering techniques
- **Advanced → Expert**: Transition to research after production experience
- **Parallel Tracks**: Within each level, some tracks can be studied in parallel based on interests

**Total Journey:**
- Complete path: ~280-380 hours (6-9 months at 10-15 hours/week)
- Basic to Intermediate: ~100-140 hours (2-3 months)
- Intermediate to Advanced: ~140-180 hours (3-4 months)
- Advanced to Expert: ~180-220 hours (4-5 months)

## Repository Structure

Progressive learning path organized into four levels:

```
AI/
├── Basic/              # 15 Lessons (B01-B15) - COMPLETE
├── Intermediate/       # 15 Lessons (I01-I15) - Detailed roadmap
├── Advanced/           # 15 Lessons (A01-A15) - Detailed roadmap
├── Expert/             # 15 Lessons (E01-E15) - Detailed roadmap
└── MAI_STUDENT_GUIDE.md # Guide for UoA MAI Students
```

### Basic Level (15 Lessons - Available Now)

Foundation lessons covering fundamental AI/ML concepts. **[View all Basic lessons →](./Basic/)**

**Foundation (B01-B03)** - Start Here
1. B01 - Arithmetic: TensorFlow basics and tensor operations
2. B02 - Linear Regression: Linear regression fundamentals  
3. B03 - Binary Classification: Two-class classification problems

**Core Machine Learning (B04-B08)** - Essential Skills
4. B04 - Multi-Class Classification: Multiple category classification
5. B05 - Neural Network Fundamentals: Deep dive into NN architecture
6. B06 - Data Preprocessing: Data preparation techniques
7. B07 - Model Evaluation: Measuring model performance
8. B08 - Regularization: Preventing overfitting

**Deep Learning (B09-B11)** - Advanced Neural Networks
9. B09 - CNNs: Convolutional networks for image processing
10. B10 - RNNs: Recurrent networks for sequential data
11. B11 - Attention & Transformers: Modern attention mechanisms

**NLP Specialization (B12-B13)** - Build Language Models
12. B12 - Byte Pair Encoding: Tokenization for NLP
13. B13 - Mini Language Model: Create your own GPT-style model

**Practice & Portfolio (B14-B15)** - Apply Your Skills
14. B14 - Practical Projects: 10 hands-on assignments
15. B15 - Capstone Projects: 5 portfolio-worthy projects

**Learning Time:** ~40-60 hours for complete mastery

---

### Intermediate Level (15 Lessons - Detailed Roadmap)

Advanced topics building on basic concepts. **[View complete syllabus →](./Intermediate/)**

**Advanced Optimization (I01-I03)**
1. I01 - Advanced Optimization: Adam, RMSprop, learning rate scheduling
2. I02 - Regularization: L1/L2, dropout, data augmentation
3. I03 - Normalization: Batch norm, layer norm, group norm

**Advanced Computer Vision (I04-I06)**
4. I04 - Advanced CNNs: ResNet, VGG, Inception, EfficientNet
5. I05 - Transfer Learning: Pre-trained models, domain adaptation
6. I06 - Detection & Segmentation: YOLO, R-CNN, U-Net, Mask R-CNN

**Advanced NLP (I07-I09)**
7. I07 - Advanced RNNs: Bidirectional, stacked LSTMs, GRU vs LSTM
8. I08 - Seq2Seq Models: Encoder-decoder, attention in seq2seq
9. I09 - Advanced Transformers: BERT, GPT variants, T5, BART

**Production ML (I10-I15)**
10. I10 - Hyperparameter Tuning: Grid search, Bayesian optimization, AutoML
11. I11 - Model Compression: Pruning, quantization, knowledge distillation
12. I12 - Generative Models: VAEs, GANs, diffusion models
13. I13 - Multi-Task Learning: Multi-task frameworks, MAML, few-shot
14. I14 - Explainable AI: SHAP, LIME, attention visualization, fairness
15. I15 - MLOps: Model versioning, CI/CD, monitoring, drift detection

**Learning Time:** ~60-80 hours

---

### Advanced Level (15 Lessons - Detailed Roadmap)

Production-ready AI systems. **[View complete syllabus →](./Advanced/)**

**Large Language Models (A01-A03)**
1. A01 - Fine-tuning LLMs: LoRA, QLoRA, PEFT, instruction tuning
2. A02 - Prompt Engineering: Chain-of-Thought, ReAct, LangChain
3. A03 - RAG Systems: Vector databases, embeddings, hybrid search

**Multi-Modal AI (A04-A06)**
4. A04 - Vision-Language Models: CLIP, BLIP, image captioning
5. A05 - Audio & Speech: Whisper, TTS, audio classification
6. A06 - Multi-Modal Fusion: Fusion strategies, unified systems

**Distributed Training (A07-A09)**
7. A07 - Distributed Training: Data/model parallelism, DeepSpeed
8. A08 - Mixed Precision: FP16, BF16, gradient accumulation
9. A09 - Inference Optimization: TensorRT, ONNX, batching

**Production MLOps (A10-A15)**
10. A10 - ML Pipelines: Feature stores, model registry, orchestration
11. A11 - Deployment: Docker, Kubernetes, cloud deployment
12. A12 - Monitoring: Performance monitoring, drift detection, A/B testing
13. A13 - CI/CD for ML: Automated testing, continuous training
14. A14 - Responsible AI: Bias mitigation, privacy, compliance
15. A15 - Production Capstone: Real-world architectures, scaling

**Learning Time:** ~80-100 hours

---

### Expert Level (15 Lessons - Detailed Roadmap)

Research-oriented topics and cutting-edge techniques. **[View complete syllabus →](./Expert/)**

**Research Foundations (E01-E03)**
1. E01 - Reading Papers: Paper analysis, reproduction, benchmarking
2. E02 - Experimental Design: Rigorous experiments, statistical testing
3. E03 - Writing & Publishing: Paper structure, peer review

**Novel Architectures (E04-E06)**
4. E04 - Neural Architecture Search: DARTS, ENAS, hardware-aware NAS
5. E05 - Custom Layers: Novel layers, CUDA kernels, gradients
6. E06 - Attention Innovations: Sparse attention, Flash Attention

**Advanced Learning (E07-E09)**
7. E07 - Meta-Learning: MAML, Reptile, Prototypical Networks
8. E08 - Continual Learning: Catastrophic forgetting, EWC
9. E09 - Self-Supervised Learning: SimCLR, MoCo, BYOL

**RL & Advanced Topics (E10-E12)**
10. E10 - Deep RL: DQN, A3C, PPO, SAC, multi-agent RL
11. E11 - RLHF: Reward modeling, alignment, safety
12. E12 - Federated Learning: Privacy-preserving, differential privacy

**Cutting-Edge Research (E13-E15)**
13. E13 - Multimodal Foundation Models: Unified models, cross-modal alignment
14. E14 - Efficient AI: Carbon footprint, lottery tickets, sustainable AI
15. E15 - Research Project: Original research, open-source contribution

**Learning Time:** ~100-120 hours

## Getting Started

### Requirements

- Python 3.8+
- Jupyter / JupyterLab
- pip or conda

### Setup

Create a virtual environment:

```bash
# Using venv
python -m venv .venv
source .venv/bin/activate   # macOS/Linux
.venv\Scripts\activate      # Windows

# Or using conda
conda create -n ai-notebooks python=3.10
conda activate ai-notebooks
```

Install dependencies:

```bash
# Core packages
pip install tensorflow torch numpy matplotlib

# For BPE notebooks
pip install tiktoken
```

### Run Notebooks

**Option 1: Google Colab (Recommended)**
- Click "Open in Colab" badge at the top of any notebook
- All dependencies pre-installed

**Option 2: Local Jupyter**
```bash
jupyter lab
# or
jupyter notebook
```

Open the desired notebook and run cells sequentially. All notebooks are self-contained with sample data.

## Usage & Learning Tips

### Learning Paths

**Complete Beginners:**
- Start with B01, progress sequentially
- Don't skip lessons - each builds on previous concepts
- Complete B14 assignments after every 3-4 lessons
- Aim for 2-3 lessons per week (3-5 hours/week)

**Students with ML Background:**
- Skim B01-B04 for review
- Focus on B05-B13 for deep learning
- Jump to B14-B15 for projects

**NLP Enthusiasts:**
- Complete B01-B07 for foundations
- Deep dive into B10-B13 (RNNs, Transformers, LLMs)
- Build language model projects in B15

**Computer Vision Enthusiasts:**
- Complete B01-B07 for foundations
- Deep dive into B09 (CNNs)
- Explore B11 for Vision Transformers
- Build image recognition projects from B15

### Study Tips

**Before Starting:**
- Read lesson overview
- Check prerequisites
- Set aside 1-2 hours focused time

**While Learning:**
- Run every code cell and observe outputs
- Modify parameters to see changes
- Add your own comments
- Try to predict outputs before running
- Type code yourself, don't copy-paste

**After Completing:**
- Summarize key concepts in your own words
- Complete related B14 assignments
- Explain concept to someone else
- Connect to real-world applications

### Best Practices

- Consistency > Intensity: 1 hour daily beats 7 hours on Sunday
- Active Learning: Implement variations, don't just run code
- Document Everything: Keep a learning journal
- Build Projects: Apply concepts to personal projects
- Join Communities: Discuss with other learners

### Each Notebook Includes

- Clear learning objectives
- Step-by-step explanations
- Visualizations and plots
- Detailed code comments
- Practice exercises (in B14)

## For MAI Students at University of Auckland

### How This Repository Helps Your MAI Journey

This repository is **specifically designed to help MAI students at the University of Auckland succeed** in their coursework and beyond. As a fellow MAI student, I created this to address the exact challenges we face in the program.

**[Complete MAI Student Guide](./MAI_STUDENT_GUIDE.md)** - Your essential companion for success

**What's Inside the Guide:**
- Direct course mappings (COMPSCI 713, 714, 761, 762, 703, COMPSYS 721)
- Semester-by-semester study strategies
- Assignment preparation tips and templates
- Research project ideas for your dissertation
- Exam preparation strategies
- Study group formation tips
- Career preparation advice

**Quick Course Alignment:**

| Your Course | Relevant Lessons | Focus Area |
|-------------|-----------------|------------|
| COMPSCI 713 | B01-B05 | AI Fundamentals |
| COMPSCI 714 | B09-B15 | AI Architecture & Design |
| COMPSCI 761 | B06, B12, B14 | Advanced AI Topics |
| COMPSCI 762 | B02-B07 | ML Foundations |
| COMPSCI 703 | B11-B13, B15 | Generalising AI |
| COMPSYS 721 | B09-B13 | Deep Learning |

**Study Schedule Recommendation for MAI Students:**
- **Before Semester 1**: Complete B01-B07 (build strong foundations)
- **During Semester 1**: B09-B13 + Course assignments (complement lectures)
- **Semester Break**: B14 practice assignments (reinforce learning)
- **Semester 2**: B15 capstone + Dissertation work (build portfolio)

**Benefits for University of Auckland MAI Students:**
- **Better Understanding**: Practical implementations clarify theoretical concepts
- **Higher Grades**: Practice before assignments leads to better performance
- **Time Savings**: Reference implementations save hours of debugging
- **Exam Preparation**: Complete review of all concepts with working code
- **Career Ready**: Portfolio projects impress employers
- **Research Foundation**: Capstone projects can evolve into dissertation topics

**Not a University of Auckland MAI student?** The content is still valuable for any AI/ML program at any university!

## Structure

```
AI/
├── Basic/
│   ├── B01 - Arithmetic.ipynb
│   ├── B02 - Linear Regression.ipynb
│   ├── B03 - Binary Classification.ipynb
│   ├── B04 - Multi-Class Classification.ipynb
│   ├── B05 - Neural Network Fundamentals.ipynb
│   ├── B06 - Data Preprocessing and Feature Engineering.ipynb
│   ├── B07 - Model Evaluation and Performance Metrics.ipynb
│   ├── B08 - Regularization and Overfitting.ipynb
│   ├── B09 - Convolutional Neural Networks.ipynb
│   ├── B10 - Recurrent Neural Networks.ipynb
│   ├── B11 - Attention and Transformers.ipynb
│   ├── B12 - Byte Pair Encoding (BPE).ipynb
│   ├── B13 - Building a Mini Language Model.ipynb
│   ├── B14 - Practical Projects and Assignments.ipynb
│   ├── B15 - Capstone Projects and Portfolio Building.ipynb
│   └── README.md
├── Intermediate/
│   └── README.md (Coming Soon)
├── Advanced/
│   └── README.md (Coming Soon)
├── Expert/
│   └── README.md (Coming Soon)
├── MAI_STUDENT_GUIDE.md
└── README.md
```

All notebooks are designed to run in Google Colab and include Colab badges for easy access.

## Academic Integrity

**IMPORTANT: This repository is a learning resource, not a solution manual.**

### Using This Repository Responsibly

This repository is designed to help you **learn and understand** AI/ML concepts, not to provide ready-made solutions for your assignments. We are committed to supporting education while maintaining the highest standards of academic integrity.

**✅ Appropriate Use:**
- Learning concepts and understanding implementations
- Preparing for lectures and reinforcing class material
- Practicing before exams and building foundational skills
- Using as inspiration for your own original projects
- Understanding different approaches and coding patterns

**❌ Inappropriate Use:**
- Copying code for assignments without understanding
- Submitting repository code as your own work
- Using during exams or closed-book assessments
- Violating your institution's academic integrity policies
- Sharing solutions inappropriately with classmates

### Guidelines for Students

1. **Learn First, Code Second**
   - Understand the concepts in the notebooks
   - Close the repository before starting your assignment
   - Implement your own solution from scratch
   - Only refer back if stuck on a specific concept

2. **Cite Appropriately**
   - If you use ideas from this repository, cite it properly
   - Follow your institution's citation guidelines
   - Example citation:
     ```
     Karthik Arjun. (2024). AI & Machine Learning Roadmap. 
     GitHub repository. https://github.com/nexageapps/AI
     ```

3. **Check Your Institution's Policies**
   - Understand what resources you're allowed to use
   - Know your institution's collaboration policies
   - Ask your instructor if you're unsure
   - When in doubt, ask first

4. **Transform, Don't Transfer**
   - Use the repository to understand approaches
   - Implement your own version with your own style
   - Add your own improvements or variations
   - Make it genuinely your work

### For University of Auckland MAI Students

**⚠️ IMPORTANT:** This is a **personal project by a fellow MAI student**, NOT official university material. It's not created by faculty, not endorsed by the university, and not part of any official curriculum. Think of it as a classmate's study notes being shared publicly.

**You are responsible for following the [University of Auckland Academic Integrity Policy](https://www.auckland.ac.nz/en/students/academic-information/academic-integrity.html).**

Your assignments test YOUR understanding. Use this repository to learn concepts, not to find answers. Submitting code from this repository as your own work is plagiarism.

**Academic misconduct at UoA has serious consequences:**
- Failing the assignment or course
- Academic probation or suspension
- Permanent record on your transcript
- Potential expulsion

**It's never worth it.** Learn with integrity, succeed with honor.

### Full Policy

For complete details on academic integrity expectations, appropriate use, and guidelines for both students and contributors, please read our comprehensive **[Academic Integrity Policy](./ACADEMIC_INTEGRITY.md)**.

---

## Project Ideas for Students

Ready to apply what you've learned? Here are hands-on project ideas perfect for master's students and portfolio building:

### Beginner Projects (After completing Basic Level)
1. **Sentiment Analysis Dashboard** - Build a web app that analyzes Twitter/Reddit sentiment on trending topics
2. **Image Classifier for Your Domain** - Create a CNN to classify images in your field of interest (medical, fashion, wildlife)
3. **Text Generator** - Build a character-level or word-level text generator using RNNs
4. **Spam Email Detector** - Implement a binary classifier with feature engineering
5. **Handwritten Digit Recognition** - Classic MNIST with your own twist (try different architectures)

### Intermediate Projects (After Intermediate Level)
6. **Transfer Learning for Medical Images** - Fine-tune pre-trained models for disease detection
7. **Chatbot with Context** - Build a conversational AI using transformers
8. **Stock Price Predictor** - Time series forecasting with LSTM/GRU networks
9. **Document Summarizer** - Extractive and abstractive summarization using transformers
10. **Multi-label Image Classification** - Detect multiple objects/attributes in images

### Advanced Projects (After Advanced Level)
11. **RAG-based Q&A System** - Build a retrieval-augmented generation system for your university's documentation
12. **Fine-tuned Domain LLM** - Fine-tune an open-source LLM for a specific domain (legal, medical, finance)
13. **Multi-Modal Search Engine** - Search using both text and images
14. **AI Code Review Assistant** - Build a tool that reviews code and suggests improvements
15. **Real-time Object Detection** - Deploy a YOLO-based system for real-time detection

### Research-Level Projects (Expert Level)
16. **Novel Architecture Experiment** - Design and test a new neural network architecture
17. **Reproduce a Recent Paper** - Implement a cutting-edge paper from NeurIPS/ICML/ICLR
18. **Bias Detection in LLMs** - Research and mitigate biases in language models
19. **Efficient Model Compression** - Develop techniques for model pruning and quantization
20. **Federated Learning System** - Build a privacy-preserving distributed learning system

**Pro Tips for Projects:**
- Start small, iterate fast
- Document your process (great for your portfolio!)
- Share your work on GitHub and LinkedIn
- Collaborate with classmates - team projects are more fun
- Present your projects at university seminars or local meetups

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-tutorial`
3. Add your notebook to the appropriate level folder (Basic, Intermediate, Advanced, or Expert)
4. Follow the naming convention: `BXX - Topic.ipynb` (for Basic level, use zero-padded numbers like B01, B02)
5. Include:
   - Author information and LinkedIn profile
   - Clear comments and explanations
   - Colab badge for easy access
   - Creation and update dates
6. Clear all outputs before committing (to keep the repo clean)
7. Submit a pull request with a clear description

**Notebook Guidelines:**
- Keep code beginner-friendly with detailed comments
- Include visualization where applicable
- Use self-contained examples (no external data dependencies)
- Follow the existing code style

## Why Star This Repository?

- **Stay Updated**: Get notified when new lessons and projects are added
- **Support a Fellow Student**: Help me reach more learners
- **Bookmark for Later**: Easy access to quality AI learning resources
- **Join the Community**: Be part of a growing learning community
- **Motivation**: Your star motivates me to create more content

## Community & Support

### Join the Learning Community

This is a collaborative learning space! Here's how you can participate:

**Get Help:**
- **Found a bug?** [Open an issue](https://github.com/nexageapps/AI/issues)
- **Have an idea?** [Start a discussion](https://github.com/nexageapps/AI/discussions)
- **Have questions?** Connect with me on [LinkedIn](https://www.linkedin.com/in/karthik-arjun-a5b4a258/)
- **Email**: For collaboration inquiries

**Contribute:**
- **Want to contribute?** Submit a pull request
- **Improve documentation**: Fix typos, add examples
- **Add visualizations**: Make concepts clearer
- **Share projects**: Add your capstone projects

**Share:**
- **Enjoying the content?** Star the repo
- **Share on LinkedIn**: Tag me in your posts
- **Tweet about it**: Use #AILearningPath
- **Tell your classmates**: Learn together

### Repository Stats

- 15 comprehensive lessons (B01-B15)
- 100% hands-on with runnable code
- Aligned with top university curriculum
- Used by students worldwide
- Actively maintained and updated

### Why Star This Repository?

- **Stay Updated**: Get notified when new lessons and projects are added
- **Support a Fellow Student**: Help me reach more learners
- **Bookmark for Later**: Easy access to quality AI learning resources
- **Join the Community**: Be part of a growing learning community
- **Motivation**: Your star motivates me to create more content
- **Show Appreciation**: Free way to say "thank you"

### Connect & Collaborate

**Let's learn together.** The best way to learn is to teach, and the best way to grow is to help others grow.

- **Study Groups**: Form groups with fellow learners
- **Code Reviews**: Help each other improve
- **Project Collaboration**: Work on B15 projects together
- **Research Partnerships**: Collaborate on papers
- **Mentorship**: I'm happy to help where I can

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

You are free to:
- Use this project for personal or commercial purposes
- Modify and distribute the code
- Use it in your own projects

Attribution is appreciated but not required.

## Author

**Karthik Arjun**
- Master of Artificial Intelligence (MAI) Student
- University of Auckland, New Zealand
- LinkedIn: [karthik-arjun-a5b4a258](https://www.linkedin.com/in/karthik-arjun-a5b4a258/)
- Hugging Face: [nexageapps](https://huggingface.co/spaces/nexageapps)
- GitHub: [nexageapps](https://github.com/nexageapps)

*"Learning AI one notebook at a time, and sharing the journey with the world."*

**Note:** This is a personal learning project and is not officially affiliated with the University of Auckland.

## References & Acknowledgments

This repository builds upon excellent resources from the AI community:

- **Book**: "Build a Large Language Model from Scratch" by Sebastian Raschka
- **OpenAI tiktoken**: https://github.com/openai/tiktoken
- **TensorFlow Documentation**: https://www.tensorflow.org/
- **PyTorch Documentation**: https://pytorch.org/
- **University of Auckland**: For providing an excellent learning environment

Special thanks to all contributors and the open-source AI community!

## Sponsor

This project is proudly sponsored by **[nexageapps](https://nexageapps.com)** - Supporting open-source education and innovation in AI.

nexageapps is committed to advancing technology education and making quality learning resources accessible to students worldwide.

## Contact & Collaboration

I'm always excited to connect with fellow learners and researchers!

- **Questions?** Open an issue on GitHub
- **Collaboration?** Connect on LinkedIn
- **Research Opportunities?** Reach out via LinkedIn
- **Speaking/Workshop Invitations?** I'd love to share and learn

---

<div align="center">

**If you find this helpful, please star the repository!**

[![Buy me a book](https://img.shields.io/badge/Buy%20Me%20A%20Book-Support%20This%20Project-yellow?style=for-the-badge&logo=buy-me-a-book)](https://buymeacoffee.com/fcc4sbsx5f6)

*Made by a student, for students*

**Happy Learning!**

</div>

---

**Note**: All notebooks are designed for educational purposes and include references to source materials where applicable. This is an active learning project - expect regular updates as I progress through my master's program!

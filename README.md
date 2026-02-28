# AI Learning Path - From Basics to Building Language Models

**A Comprehensive Open-Source Tutorial Series for Master's Students in AI**

[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Mission

This repository provides a **structured, hands-on learning path** for Master's students in AI to deeply understand Artificial Intelligence concepts - from basic arithmetic operations to building complete language models. Each lesson builds progressively on previous concepts with clear explanations, visualizations, and practical implementations.

## Table of Contents

- [About](#about)
- [Learning Path Diagram](#learning-path-diagram)
- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [How to Use](#how-to-use)
- [Contributing](#contributing)
- [Author](#author)
- [License](#license)

## About

This is not just another AI tutorial collection - it's a **carefully designed curriculum** that:

- **Builds progressively** from fundamentals to advanced concepts
- **Includes hands-on code** with detailed explanations
- **Provides visualizations** to understand complex concepts
- **Covers real-world applications** at each level
- **Culminates in building** a mini language model (GPT-style)

**Target Audience:** Master's students in AI, self-learners, and anyone wanting to deeply understand AI/ML concepts.

**Language:** Jupyter Notebooks (100%) - All runnable in Google Colab!

## Learning Path Diagram

```mermaid
graph TB
    Start([START YOUR AI JOURNEY]):::startNode
    
    subgraph Basic["BASIC LEVEL"]
        L1["L1: Arithmetic<br/>Tensor Operations"]:::basic
        L2["L2: Linear Patterns<br/>Regression & Graphs"]:::basic
        L3["L3: Binary Classification<br/>Two-Class Problems"]:::basic
        L5["L5: Multi-Class<br/>Multiple Categories"]:::basic
        L6["L6: Neural Networks<br/>Architecture Deep Dive"]:::basic
        L7["L7: CNNs<br/>Image Processing"]:::basic
        L8["L8: RNNs<br/>Sequential Data"]:::basic
        L9["L9: Transformers<br/>Attention Mechanism"]:::basic
        L4["L4: Tokenization<br/>Byte Pair Encoding"]:::basic
        L10["L10: Build Mini LLM<br/>GPT-Style Model"]:::basic
        L11["L11: Data Engineering<br/>Preprocessing & Features"]:::basic
        L12["L12: Model Evaluation<br/>Performance Metrics"]:::basic
    end
    
    subgraph Intermediate["INTERMEDIATE LEVEL"]
        I1["Transfer Learning"]:::intermediate
        I2["Advanced Optimization"]:::intermediate
        I3["Advanced Architectures"]:::intermediate
        I4["Hyperparameter Tuning"]:::intermediate
    end
    
    subgraph Advanced["ADVANCED LEVEL"]
        A1["Fine-tuning LLMs"]:::advanced
        A2["RAG Systems"]:::advanced
        A3["Multi-Modal AI"]:::advanced
        A4["Production MLOps"]:::advanced
    end
    
    subgraph Expert["EXPERT LEVEL"]
        E1["Research & Papers"]:::expert
        E2["Novel Architectures"]:::expert
        E3["Open Source Contribution"]:::expert
    end
    
    Start --> L1
    L1 --> L2
    L2 --> L3
    L2 --> L5
    L3 --> L6
    L5 --> L6
    L6 --> L7
    L6 --> L8
    L7 --> L9
    L8 --> L9
    L9 --> L4
    L4 --> L10
    L10 --> L11
    L11 --> L12
    
    L12 --> I1
    L12 --> I2
    I1 --> I3
    I2 --> I3
    I3 --> I4
    
    I4 --> A1
    I4 --> A2
    A1 --> A3
    A2 --> A3
    A3 --> A4
    
    A4 --> E1
    A4 --> E2
    E1 --> E3
    E2 --> E3
    
    classDef startNode fill:#4A90E2,stroke:#2E5C8A,stroke-width:3px,color:#fff
    classDef basic fill:#FFE5B4,stroke:#D4A574,stroke-width:2px,color:#000
    classDef intermediate fill:#B4E5FF,stroke:#74A5D4,stroke-width:2px,color:#000
    classDef advanced fill:#D4B4FF,stroke:#9474D4,stroke-width:2px,color:#000
    classDef expert fill:#FFD700,stroke:#B8860B,stroke-width:3px,color:#000
```

### Learning Path Explanation

**Color Guide:**
- Blue: Your entry point into AI
- Peach: Basic Level - Foundation concepts (L1-L12)
- Light Blue: Intermediate Level - Advanced techniques
- Purple: Advanced Level - Production systems
- Gold: Expert Level - Research and innovation

**Progression Path:**

1. **Basic Level (Start Here)** - Complete all 12 lessons sequentially
   - Foundation: Tensors, linear models, classification
   - Neural Networks: Architecture, CNNs, RNNs, Transformers
   - Language Models: Tokenization, building mini LLM
   - Data Science: Preprocessing, feature engineering, evaluation

2. **Intermediate Level** - Build on fundamentals
   - Transfer learning and fine-tuning techniques
   - Advanced optimization and regularization
   - Complex architectures and hyperparameter tuning

3. **Advanced Level** - Production-ready systems
   - Fine-tuning large language models
   - RAG systems and multi-modal AI
   - MLOps, deployment, and monitoring

4. **Expert Level** - Contribute to the field
   - Research paper implementation
   - Novel architecture design
   - Open-source contributions

## Repository Structure

This repository is organized into four progressive levels:

```
AI/
├── Basic/           # Foundation lessons (L1-L12)
├── Intermediate/    # Advanced topics (Coming Soon)
├── Advanced/        # Production-ready systems (Coming Soon)
├── Expert/          # Research-oriented topics (Coming Soon)
└── archive/         # Historical documentation
```

### Basic Level (Available Now)

Foundation lessons covering fundamental AI/ML concepts. [View all Basic lessons →](./Basic/)

1. **L1 - Arithmetic** - TensorFlow basics and tensor operations
2. **L2 - Straight Line Pattern with Graph** - Linear regression fundamentals
3. **L3 - Binary Classification** - Two-class classification problems
4. **L4 - Byte Pair Encoding (BPE)** - Tokenization for NLP
5. **L5 - Multi-Class Classification** - Multiple category classification
6. **L6 - Neural Network Fundamentals** - Deep dive into NN architecture
7. **L7 - Convolutional Neural Networks** - CNNs for image processing
8. **L8 - Recurrent Neural Networks** - RNNs for sequential data
9. **L9 - Attention and Transformers** - Modern attention mechanisms
10. **L10 - Building a Mini Language Model** - Create your own GPT-style model
11. **L11 - Data Preprocessing and Feature Engineering** - Data preparation techniques
12. **L12 - Model Evaluation and Performance Metrics** - Measuring model performance

### Intermediate Level (Coming Soon)

Advanced topics building on basic concepts:
- Transfer Learning and Fine-tuning
- Advanced Optimization Techniques
- Advanced CNN/RNN Architectures
- Encoder-Decoder Models
- Hyperparameter Tuning

[View Intermediate roadmap →](./Intermediate/)

### Advanced Level (Coming Soon)

Production-ready AI systems:
- Fine-tuning Large Language Models
- Retrieval-Augmented Generation (RAG)
- Multi-Modal AI
- Model Deployment and MLOps
- Ethical AI and Bias Mitigation

[View Advanced roadmap →](./Advanced/)

### Expert Level (Coming Soon)

Research-oriented topics:
- Novel Architecture Design
- Research Paper Implementation
- Neural Architecture Search
- Meta-Learning
- Contributing to Open-Source AI

[View Expert roadmap →](./Expert/)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and learning purposes.

### Requirements

- Python 3.8+ (recommended)
- Jupyter / JupyterLab
- pip or conda

### Create a virtual environment

Using venv:

```bash
python -m venv .venv
source .venv/bin/activate   # macOS / Linux
.venv\Scripts\activate     # Windows
```

Or using conda:

```bash
conda create -n ai-notebooks python=3.10
conda activate ai-notebooks
```

### Install dependencies

The notebooks primarily use TensorFlow and PyTorch. Install the required packages:

```bash
pip install tensorflow torch numpy matplotlib
```

For the BPE notebooks, you'll also need:

```bash
pip install tiktoken
```

Alternatively, run the notebooks directly in Google Colab where most dependencies are pre-installed.

### Run notebooks

**Option 1: Google Colab (Recommended)**
- Click the "Open in Colab" badge at the top of any notebook
- All dependencies are pre-installed in Colab

**Option 2: Local Jupyter**
```bash
jupyter lab
# or
jupyter notebook
```

Open the desired notebook and run the cells sequentially. All notebooks are self-contained and include sample data.

## Usage

These notebooks are designed for learning and experimentation:

- **For Beginners**: Start with Basic/L1 and progress sequentially through all Basic lessons
- **For NLP Enthusiasts**: Complete L1-L3 first, then jump to Basic/L4 for tokenization
- **For Experimentation**: Modify the code, adjust parameters, and observe the results

Each notebook includes:
- Author information and LinkedIn profile
- Creation and update dates
- References to source materials
- Detailed comments explaining the code

## Quick Start

1. Clone the repository
2. Navigate to the `Basic/` folder
3. Open `L1 - Arithmetic.ipynb` in Jupyter or Google Colab
4. Follow the lessons sequentially

## Structure

```
AI/
├── Basic/
│   ├── L1 - Arithmetic.ipynb
│   ├── L2 - Straight Line Pattern with Graph.ipynb
│   ├── L3 - Binary Classification.ipynb
│   ├── L4 - Byte Pair Encoding (BPE).ipynb
│   ├── L5 - Multi-Class Classification.ipynb
│   ├── L6 - Neural Network Fundamentals.ipynb
│   ├── L7 - Convolutional Neural Networks.ipynb
│   ├── L8 - Recurrent Neural Networks.ipynb
│   ├── L9 - Attention and Transformers.ipynb
│   ├── L10 - Building a Mini Language Model.ipynb
│   ├── L11 - Data Preprocessing and Feature Engineering.ipynb
│   ├── L12 - Model Evaluation and Performance Metrics.ipynb
│   └── README.md
├── Intermediate/
│   └── README.md (Coming Soon)
├── Advanced/
│   └── README.md (Coming Soon)
├── Expert/
│   └── README.md (Coming Soon)
├── archive/
│   └── PROGRESS_SUMMARY.md
└── README.md
```

All notebooks are designed to run in Google Colab and include Colab badges for easy access.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-tutorial`
3. Add your notebook to the appropriate level folder (Basic, Intermediate, Advanced, or Expert)
4. Follow the naming convention: `LX - Topic.ipynb`
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

## License

If you have a preferred license, add a LICENSE file to the repository. If none is present, consider using a permissive license such as MIT.

## Author

**Karthik Arjun**
- LinkedIn: [karthik-arjun-a5b4a258](https://www.linkedin.com/in/karthik-arjun-a5b4a258/)
- GitHub: [nexageapps](https://github.com/nexageapps)

## References

- **Book**: "Build a Large Language Model from Scratch" by Sebastian Raschka
- **OpenAI tiktoken**: https://github.com/openai/tiktoken
- **TensorFlow Documentation**: https://www.tensorflow.org/
- **PyTorch Documentation**: https://pytorch.org/

## Contact

For questions, suggestions, or collaboration opportunities:
- Open an issue on GitHub
- Connect on LinkedIn

---

**Note**: All notebooks are designed for educational purposes and include references to source materials where applicable.
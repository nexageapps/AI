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
graph TD
    Start([Start Your AI Journey]) --> L1[L1: Arithmetic<br/>Tensor Operations & TensorFlow Basics]
    
    L1 --> L2[L2: Linear Patterns<br/>Straight Line with Graphs]
    
    L2 --> Classification{Classification<br/>Branch}
    
    Classification --> L3[L3: Binary Classification<br/>Two-Class Problems]
    Classification --> L5[L5: Multi-Class Classification<br/>Multiple Categories]
    
    L3 --> L6[L6: Neural Network Fundamentals<br/>Deep Dive into Architecture]
    L5 --> L6
    
    L6 --> Advanced{Advanced<br/>Architectures}
    
    Advanced --> L7[L7: CNNs<br/>Convolutional Neural Networks<br/>Image Processing]
    Advanced --> L8[L8: RNNs<br/>Recurrent Neural Networks<br/>Sequential Data]
    
    L7 --> L9[L9: Attention & Transformers<br/>Self-Attention Mechanism]
    L8 --> L9
    
    L9 --> L4[L4: Byte Pair Encoding<br/>Tokenization for NLP]
    
    L4 --> L10[L10: Mini Language Model<br/>Build Your Own GPT]
    
    L10 --> L11[L11: Data Preprocessing<br/>Feature Engineering]
    
    L11 --> NextLevel{Ready for<br/>Next Level?}
    
    NextLevel -->|Yes| Advanced_Path[Advanced Topics]
    NextLevel -->|Review| L1
    
    Advanced_Path --> AP1[Fine-tuning LLMs]
    Advanced_Path --> AP2[RAG Systems]
    Advanced_Path --> AP3[Multi-Modal Models]
    Advanced_Path --> AP4[Production Deployment]
    
    AP1 --> Expert[Expert Level]
    AP2 --> Expert
    AP3 --> Expert
    AP4 --> Expert
    
    Expert --> Research[Research & Innovation]
    
    style Start fill:#e1f5ff
    style L1 fill:#fff4e1
    style L2 fill:#fff4e1
    style L3 fill:#ffe1f5
    style L5 fill:#ffe1f5
    style L6 fill:#f5e1ff
    style L7 fill:#e1ffe1
    style L8 fill:#e1ffe1
    style L9 fill:#ffe1e1
    style L4 fill:#fff4e1
    style L10 fill:#ffd700
    style L11 fill:#ffd700
    style Advanced_Path fill:#87ceeb
    style Expert fill:#90ee90
    style Research fill:#ff69b4
```

### Learning Path Explanation

**Foundation Level (L1-L2):**
- Start with basic tensor operations and linear patterns
- Build intuition for how neural networks learn

**Classification Level (L3, L5-L6):**
- Master binary and multi-class classification
- Deep dive into neural network architecture and training

**Advanced Architectures (L7-L9):**
- Learn specialized architectures: CNNs for images, RNNs for sequences
- Understand the revolutionary Attention mechanism and Transformers

**Language Models (L4, L10-L11):**
- Master tokenization with Byte Pair Encoding
- Build a complete mini language model (GPT-style)
- Learn data preprocessing and feature engineering

**Next Level (Advanced Topics):**
- Fine-tuning large language models
- Retrieval-Augmented Generation (RAG) systems
- Multi-modal models (text, image, audio)
- Production deployment and MLOps

**Expert Level:**
- Research and innovation in AI
- Contributing to open-source AI projects
- Publishing papers and building novel architectures

## Contents

This repository contains beginner-level notebooks covering fundamental AI/ML concepts:

### Basic Tutorials

1. **L1 - Arithmetic** (`Basic | L1 - Arithmetic.ipynb`)
   - Introduction to TensorFlow basics
   - Basic tensor operations (addition, multiplication)

2. **L2 - Straight Line Pattern with Graph** (`Basic | L2 - Straight_line_Pattern_with_graph.ipynb`)
   - Linear regression fundamentals
   - Training a simple neural network to learn linear patterns
   - Visualization of model predictions

3. **L3 - Binary Classification** (`Basic | L3 - Binary Classification.ipynb`)
   - Binary classification using neural networks
   - Training and evaluation metrics
   - Decision boundary visualization

4. **L4 - Byte Pair Encoding (BPE) - Complete Guide** (`Basic | L4 - Byte Pair Encoding [BPE].ipynb`)
   - **Part 1**: Manual implementation of BPE algorithm from scratch
   - **Part 2**: Using OpenAI's tiktoken library for GPT-2 tokenization
   - **Part 3**: Data sampling with sliding window for sequence prediction
   - Understanding tokenization in NLP
   - Comparison of character-level vs subword tokenization
   - Handling special tokens
   - Creating training datasets for language models

5. **L5 - Multi-Class Classification** (`Basic | L5 - Multi-Class Classification.ipynb`)
   - Multi-class classification problems
   - Softmax activation and categorical cross-entropy
   - Model evaluation for multiple classes

6. **L6 - Neural Network Fundamentals** (`Basic | L6 - Neural Network Fundamentals.ipynb`)
   - Deep dive into neural network architecture
   - Activation functions and backpropagation
   - Training optimization techniques

7. **L7 - Convolutional Neural Networks** (`Basic | L7 - Convolutional Neural Networks.ipynb`)
   - CNN architecture and convolution operations
   - Pooling layers and feature extraction
   - Image classification applications

8. **L8 - Recurrent Neural Networks** (`Basic | L8 - Recurrent Neural Networks.ipynb`)
   - RNN architecture for sequential data
   - LSTM and GRU cells
   - Time series and sequence modeling

9. **L9 - Attention and Transformers** (`Basic | L9 - Attention and Transformers.ipynb`)
   - Attention mechanism fundamentals
   - Self-attention and multi-head attention
   - Transformer architecture basics

10. **L10 - Building a Mini Language Model** (`Basic | L10 - Building a Mini Language Model.ipynb`)
    - Putting it all together: building a GPT-style model
    - Training and inference pipeline
    - Text generation and model evaluation

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and learning purposes.

### Requirements

- Python 3.8+ (recommended)
- Jupyter / JupyterLab
- pip or conda

### Create a virtual environment

Using venv:

python -m venv .venv
source .venv/bin/activate   # macOS / Linux
.venv\Scripts\activate     # Windows

Or using conda:

conda create -n ai-notebooks python=3.10
conda activate ai-notebooks

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

- **For Beginners**: Start with L1 (Arithmetic) and progress sequentially through the lessons
- **For NLP Enthusiasts**: Jump to the L4 series to understand tokenization fundamentals
- **For Experimentation**: Modify the code, adjust parameters, and observe the results

Each notebook includes:
- Author information and LinkedIn profile
- Creation and update dates
- References to source materials
- Detailed comments explaining the code

## Structure

```
AI/
├── Basic | L1 - Arithmetic.ipynb
├── Basic | L2 - Straight_line_Pattern_with_graph.ipynb
├── Basic | L3 - Binary Classification.ipynb
├── Basic | L4 - Byte Pair Encoding [BPE].ipynb
├── Basic | L5 - Multi-Class Classification.ipynb
├── Basic | L6 - Neural Network Fundamentals.ipynb
├── Basic | L7 - Convolutional Neural Networks.ipynb
├── Basic | L8 - Recurrent Neural Networks.ipynb
├── Basic | L9 - Attention and Transformers.ipynb
├── Basic | L10 - Building a Mini Language Model.ipynb
└── README.md
```

All notebooks are designed to run in Google Colab and include Colab badges for easy access.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-tutorial`
3. Add your notebook following the naming convention: `Basic | LX - Topic.ipynb`
4. Include:
   - Author information and LinkedIn profile
   - Clear comments and explanations
   - Colab badge for easy access
   - Creation and update dates
5. Clear all outputs before committing (to keep the repo clean)
6. Submit a pull request with a clear description

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
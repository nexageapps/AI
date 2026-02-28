# AI Learning Path - Complete Journey from Basics to Production

**A Comprehensive 15-Lesson Curriculum for Master's Students in AI**

[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Mission Statement

This repository provides a **complete, production-ready learning path** for Master's students in AI - from basic tensor operations to deploying models in production. All 15 lessons build progressively with detailed explanations, visualizations, and real-world applications.

## Why This Curriculum?

- **Complete Coverage**: 15 comprehensive lessons covering theory to practice
- **Graduate Level**: Detailed explanations suitable for Master's students
- **Hands-On**: Every concept backed by runnable code
- **Industry Ready**: Includes preprocessing, evaluation, and deployment
- **Zero Setup**: All notebooks run in Google Colab

## Table of Contents

- [Complete Learning Path](#complete-learning-path)
- [Lesson Descriptions](#lesson-descriptions)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [Author](#author)

## Complete Learning Path

### Stage 1: Foundation (B1-B3)
**Goal**: Master basics of ML and understand data representation

| Lesson | Topic | Key Concepts | Duration |
|--------|-------|--------------|----------|
| B1 | Arithmetic Operations | TensorFlow basics, tensor operations | 30 min |
| B2 | Linear Regression | Gradient descent, loss functions | 45 min |
| B3 | Binary Classification | Sigmoid, cross-entropy, decision boundaries | 1 hour |

### Stage 2: Core Machine Learning (B4-B8)
**Goal**: Build strong ML fundamentals and practical skills

| Lesson | Topic | Key Concepts | Duration |
|--------|-------|--------------|----------|
| B4 | Multi-Class Classification | Softmax, categorical cross-entropy | 1 hour |
| B5 | Neural Network Fundamentals | MLPs, activation functions, backpropagation | 1.5 hours |
| B6 | Data Preprocessing | Feature engineering, scaling, encoding | 2 hours |
| B7 | Model Evaluation | Metrics, cross-validation, imbalanced data | 2 hours |
| B8 | Regularization | Overfitting, L1/L2, ensemble methods | 2 hours |

### Stage 3: Deep Learning (B9-B11)
**Goal**: Master modern deep learning architectures

| Lesson | Topic | Key Concepts | Duration |
|--------|-------|--------------|----------|
| B9 | Convolutional Neural Networks | Convolution, pooling, image classification | 2 hours |
| B10 | Recurrent Neural Networks | RNN, LSTM, GRU, sequence modeling | 2 hours |
| B11 | Attention & Transformers | Self-attention, multi-head, positional encoding | 2.5 hours |

### Stage 4: NLP Specialization (B12-B13)
**Goal**: Build language models from scratch

| Lesson | Topic | Key Concepts | Duration |
|--------|-------|--------------|----------|
| B12 | Byte Pair Encoding | Tokenization, subword units, BPE algorithm | 1 hour |
| B13 | Mini Language Model | GPT architecture, causal attention, text generation | 3 hours |

### Stage 5: Advanced Topics (B14-B15)
**Goal**: Optimize and deploy models to production

| Lesson | Topic | Key Concepts | Duration |
|--------|-------|--------------|----------|
| B14 | Optimization Algorithms | SGD, Adam, learning rate scheduling | 1.5 hours |
| B15 | Model Deployment | Serialization, APIs, cloud deployment, monitoring | 2.5 hours |

**Total Learning Time**: Approximately 25-30 hours

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

## 💡 Project Ideas for Students

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

## 🌟 Why Star This Repository?

- ⭐ **Stay Updated**: Get notified when new lessons and projects are added
- 🎓 **Support a Fellow Student**: Help me reach more learners
- 📖 **Bookmark for Later**: Easy access to quality AI learning resources
- 🤝 **Join the Community**: Be part of a growing learning community
- 💪 **Motivation**: Your star motivates me to create more content!

## 🤝 Join the Learning Community

This is a collaborative learning space! Here's how you can participate:

- 🐛 **Found a bug?** Open an issue
- 💡 **Have an idea?** Start a discussion
- 📝 **Want to contribute?** Submit a pull request
- 🤔 **Have questions?** Connect with me on LinkedIn
- 🌟 **Enjoying the content?** Star the repo and share with friends!

**Let's learn together!** The best way to learn is to teach, and the best way to grow is to help others grow.

## 👨‍🎓 Author

**Karthik Arjun**
- 🎓 Master of Artificial Intelligence (MAI) Student
- 🏛️ University of Auckland, New Zealand
- 💼 LinkedIn: [karthik-arjun-a5b4a258](https://www.linkedin.com/in/karthik-arjun-a5b4a258/)
- 💻 GitHub: [nexageapps](https://github.com/nexageapps)

*"Learning AI one notebook at a time, and sharing the journey with the world."*

## 📚 References & Acknowledgments

This repository builds upon excellent resources from the AI community:

- **Book**: "Build a Large Language Model from Scratch" by Sebastian Raschka
- **OpenAI tiktoken**: https://github.com/openai/tiktoken
- **TensorFlow Documentation**: https://www.tensorflow.org/
- **PyTorch Documentation**: https://pytorch.org/
- **University of Auckland**: For providing an excellent learning environment

Special thanks to all contributors and the open-source AI community!

## 📬 Contact & Collaboration

I'm always excited to connect with fellow learners and researchers!

- 💬 **Questions?** Open an issue on GitHub
- 🤝 **Collaboration?** Connect on LinkedIn
- 📧 **Research Opportunities?** Reach out via LinkedIn
- 🎤 **Speaking/Workshop Invitations?** I'd love to share and learn!

---

<div align="center">

**⭐ If you find this helpful, please star the repository! ⭐**

*Made with ❤️ by a student, for students*

**Happy Learning! 🚀**

</div>

---

**Note**: All notebooks are designed for educational purposes and include references to source materials where applicable. This is an active learning project - expect regular updates as I progress through my master's program!
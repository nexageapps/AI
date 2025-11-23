# AI

Artificial Intelligence - GenAI, ML, DL, and NLP

## Table of Contents

- [About](#about)
- [Contents](#contents)
- [Getting Started](#getting-started)
  - [Requirements](#requirements)
  - [Create a virtual environment](#create-a-virtual-environment)
  - [Install dependencies](#install-dependencies)
  - [Run notebooks](#run-notebooks)
- [Usage](#usage)
- [Structure](#structure)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## About

This repository collects Jupyter notebooks and supporting materials related to Artificial Intelligence, including Generative AI, Machine Learning, Deep Learning, and Natural Language Processing. The notebooks are intended for exploration, learning, and reference.

Language composition: Jupyter Notebook (100%).

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

4. **L4 - Byte Pair Encoding (BPE)** (`Basic | L4 - Byte Pair Encoding [BPE].ipynb`)
   - Understanding tokenization in NLP
   - Manual implementation of BPE algorithm
   - Comparison of character-level vs subword tokenization

5. **L4A - BPE with tiktoken** (`Basic | L4A - BPE with tiktoken.ipynb`)
   - Using OpenAI's tiktoken library
   - GPT-2 tokenization examples
   - Handling special tokens

6. **L4B - BPE with Data Sample and Sliding Window** (`Basic | L4B - BPE with datasample SW.ipynb`)
   - Implementing sliding window for sequence prediction
   - Creating training datasets for language models
   - Next-word prediction fundamentals

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
├── Basic | L4A - BPE with tiktoken.ipynb
├── Basic | L4B - BPE with datasample SW.ipynb
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
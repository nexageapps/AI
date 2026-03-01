#!/usr/bin/env python3
"""
Script to add progress tracking section to all lesson notebooks.
"""

import json
import os
from pathlib import Path

def create_progress_tracker_cell(lesson_code, lesson_title, key_concepts):
    """Create a progress tracker markdown cell."""
    return {
        "cell_type": "markdown",
        "metadata": {},
        "source": [
            "---\n",
            "\n",
            "## 📝 Learning Progress Tracker\n",
            "\n",
            "Use this section to track your learning progress for this lesson.\n",
            "\n",
            "### Completion Status\n",
            "- [ ] Lesson completed\n",
            "- [ ] All code cells executed successfully\n",
            "- [ ] Understood all key concepts\n",
            "- [ ] Completed practice exercises (if any)\n",
            "\n",
            "### Dates\n",
            "- **First Completed:** ____/____/____\n",
            "- **Last Reviewed:** ____/____/____\n",
            "- **Next Review:** ____/____/____ (Recommended: 1 week, 1 month, 3 months)\n",
            "\n",
            "### Understanding Level\n",
            "Rate your understanding (1-5): _____ / 5\n",
            "\n",
            "- 1 = Need to review completely\n",
            "- 2 = Understood basics, need more practice\n",
            "- 3 = Good understanding, minor gaps\n",
            "- 4 = Strong understanding, can explain to others\n",
            "- 5 = Mastered, can apply in projects\n",
            "\n",
            "### Notes & Reflections\n",
            "```\n",
            "Write your notes here:\n",
            "- What concepts were challenging?\n",
            "- What was interesting or surprising?\n",
            "- How can you apply this in projects?\n",
            "- Questions to explore further?\n",
            "\n",
            "\n",
            "\n",
            "\n",
            "```\n",
            "\n",
            f"### Key Concepts to Remember ({lesson_code})\n"
        ] + [f"- [ ] {concept}\n" for concept in key_concepts] + [
            "\n",
            "---"
        ]
    }

def add_progress_tracker_to_notebook(notebook_path, lesson_code, lesson_title, key_concepts):
    """Add progress tracker to a notebook if it doesn't already exist."""
    try:
        with open(notebook_path, 'r', encoding='utf-8') as f:
            notebook = json.load(f)
        
        # Check if progress tracker already exists
        for cell in notebook.get('cells', []):
            if cell.get('cell_type') == 'markdown':
                source = ''.join(cell.get('source', []))
                if '📝 Learning Progress Tracker' in source:
                    print(f"  ⏭️  Progress tracker already exists in {notebook_path.name}")
                    return False
        
        # Add progress tracker before the last cell (metadata)
        progress_cell = create_progress_tracker_cell(lesson_code, lesson_title, key_concepts)
        notebook['cells'].append(progress_cell)
        
        # Write back to file
        with open(notebook_path, 'w', encoding='utf-8') as f:
            json.dump(notebook, f, indent=1, ensure_ascii=False)
        
        print(f"  ✅ Added progress tracker to {notebook_path.name}")
        return True
    
    except Exception as e:
        print(f"  ❌ Error processing {notebook_path.name}: {e}")
        return False

# Define key concepts for each lesson
lesson_configs = {
    # Basic Level
    "B02": {
        "title": "Linear Regression",
        "concepts": [
            "Linear regression fundamentals",
            "Gradient descent optimization",
            "Loss functions (MSE)",
            "Model training and evaluation"
        ]
    },
    "B03": {
        "title": "Binary Classification",
        "concepts": [
            "Binary classification problems",
            "Sigmoid activation function",
            "Binary cross-entropy loss",
            "Decision boundaries"
        ]
    },
    "B04": {
        "title": "Multi-Class Classification",
        "concepts": [
            "Multi-class classification",
            "Softmax activation function",
            "Categorical cross-entropy",
            "One-hot encoding"
        ]
    },
    "B05": {
        "title": "Neural Network Fundamentals",
        "concepts": [
            "Multi-layer perceptrons (MLPs)",
            "Activation functions (ReLU, sigmoid, tanh)",
            "Backpropagation algorithm",
            "Forward and backward passes"
        ]
    },
    "B06": {
        "title": "Data Preprocessing",
        "concepts": [
            "Feature scaling and normalization",
            "Handling missing data",
            "Feature engineering techniques",
            "Data augmentation"
        ]
    },
    "B07": {
        "title": "Model Evaluation",
        "concepts": [
            "Performance metrics (accuracy, precision, recall, F1)",
            "Cross-validation techniques",
            "Confusion matrix",
            "ROC curves and AUC"
        ]
    },
    "B08": {
        "title": "Regularization",
        "concepts": [
            "Overfitting and underfitting",
            "L1 and L2 regularization",
            "Dropout technique",
            "Early stopping"
        ]
    },
    "B09": {
        "title": "CNNs",
        "concepts": [
            "Convolutional layers",
            "Pooling operations",
            "CNN architectures",
            "Image feature extraction"
        ]
    },
    "B10": {
        "title": "RNNs",
        "concepts": [
            "Recurrent neural networks",
            "LSTM and GRU cells",
            "Sequential data processing",
            "Vanishing gradient problem"
        ]
    },
    "B11": {
        "title": "Attention & Transformers",
        "concepts": [
            "Self-attention mechanism",
            "Multi-head attention",
            "Transformer architecture",
            "Positional encoding"
        ]
    },
    "B12": {
        "title": "Byte Pair Encoding",
        "concepts": [
            "Tokenization techniques",
            "BPE algorithm",
            "Vocabulary building",
            "Subword tokenization"
        ]
    },
    "B13": {
        "title": "Mini Language Model",
        "concepts": [
            "Language model architecture",
            "GPT-style models",
            "Text generation",
            "Model training from scratch"
        ]
    },
    "B14": {
        "title": "Practical Projects",
        "concepts": [
            "Project implementation",
            "Problem-solving approach",
            "Code organization",
            "Testing and debugging"
        ]
    },
    "B15": {
        "title": "Capstone Projects",
        "concepts": [
            "End-to-end project development",
            "Portfolio building",
            "Best practices",
            "Project documentation"
        ]
    }
}

def main():
    """Main function to process all notebooks."""
    print("🚀 Adding progress trackers to all lesson notebooks...\n")
    
    # Process Basic level notebooks
    basic_dir = Path("Basic")
    if basic_dir.exists():
        print("📚 Processing Basic Level notebooks:")
        for lesson_code, config in lesson_configs.items():
            if lesson_code.startswith("B"):
                notebook_files = list(basic_dir.glob(f"{lesson_code} - *.ipynb"))
                for notebook_path in notebook_files:
                    add_progress_tracker_to_notebook(
                        notebook_path,
                        lesson_code,
                        config["title"],
                        config["concepts"]
                    )
    
    print("\n✨ Progress tracker addition complete!")

if __name__ == "__main__":
    main()

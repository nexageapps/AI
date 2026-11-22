#!/usr/bin/env python3
"""
Create Advanced level lessons (A01-A15) with exam prep sections.
Follows the pattern from Intermediate and Expert levels.
"""

import json
from pathlib import Path

# All 15 Advanced lesson configurations
LESSON_CONFIGS = {
    "A01": {
        "title": "Fine-tuning LLMs",
        "courses": ["COMPSCI 714", "COMPSCI 703"],
        "description": "LoRA, QLoRA, and PEFT techniques for efficient fine-tuning"
    },
    "A02": {
        "title": "Prompt Engineering",
        "courses": ["COMPSCI 703", "COMPSCI 714"],
        "description": "Chain-of-Thought, ReAct, and advanced prompting strategies"
    },
    "A03": {
        "title": "RAG Systems",
        "courses": ["COMPSCI 714", "COMPSCI 703"],
        "description": "Vector databases and retrieval-augmented generation"
    },
    "A04": {
        "title": "Vision-Language Models",
        "courses": ["COMPSCI 703", "COMPSYS 721"],
        "description": "CLIP, BLIP, and multimodal understanding"
    },
    "A05": {
        "title": "Audio Processing",
        "courses": ["COMPSCI 703"],
        "description": "Whisper, TTS, and audio AI systems"
    },
    "A06": {
        "title": "Multi-Modal Fusion",
        "courses": ["COMPSCI 703", "COMPSYS 721"],
        "description": "Combining vision, language, and audio modalities"
    },
    "A07": {
        "title": "Distributed Training",
        "courses": ["COMPSYS 721", "COMPSCI 714"],
        "description": "Data and model parallelism for large-scale training"
    },
    "A08": {
        "title": "Mixed Precision Training",
        "courses": ["COMPSYS 721"],
        "description": "FP16, BF16, and memory optimization"
    },
    "A09": {
        "title": "Model Serving",
        "courses": ["COMPSCI 714"],
        "description": "TensorRT, ONNX, and inference optimization"
    },
    "A10": {
        "title": "ML Pipeline Architecture",
        "courses": ["COMPSCI 714"],
        "description": "Feature stores, model registry, and orchestration"
    },
    "A11": {
        "title": "Containerization",
        "courses": ["COMPSCI 714"],
        "description": "Docker, Kubernetes, and cloud deployment"
    },
    "A12": {
        "title": "Monitoring",
        "courses": ["COMPSCI 714"],
        "description": "Model monitoring, drift detection, and A/B testing"
    },
    "A13": {
        "title": "CI/CD for ML",
        "courses": ["COMPSCI 714"],
        "description": "Automated testing and continuous training"
    },
    "A14": {
        "title": "Responsible AI",
        "courses": ["COMPSCI 703", "COMPSCI 714"],
        "description": "Bias detection, privacy, and governance"
    },
    "A15": {
        "title": "Production Capstone",
        "courses": ["COMPSCI 714", "Dissertation"],
        "description": "End-to-end production ML system"
    }
}

def create_notebook_skeleton(lesson_code, config):
    """Create a minimal notebook skeleton."""
    title = f"{lesson_code} - {config['title']}"
    
    notebook = {
        "cells": [
            {
                "cell_type": "markdown",
                "metadata": {},
                "source": [
                    f"# {title}\n",
                    "\n",
                    "**Author:** Karthik Arjun  \n",
                    "**LinkedIn:** [karthik-arjun-a5b4a258](https://www.linkedin.com/in/karthik-arjun-a5b4a258/)  \n",
                    "**Created:** March 2026  \n",
                    "**Level:** Advanced\n",
                    "\n",
                    "---\n",
                    "\n",
                    "## Learning Objectives\n",
                    "\n",
                    f"By the end of this lesson, you will understand {config['description']}.\n",
                    "\n",
                    "---\n",
                    "\n",
                    "## Prerequisites\n",
                    "\n",
                    "- Completed Basic and Intermediate levels\n",
                    "- Strong understanding of deep learning\n",
                    "- Experience with production systems (for MLOps lessons)\n",
                    "\n",
                    "---\n"
                ]
            },
            {
                "cell_type": "code",
                "execution_count": None,
                "metadata": {},
                "outputs": [],
                "source": [
                    "# Import required libraries\n",
                    "import numpy as np\n",
                    "import tensorflow as tf\n",
                    "import torch\n",
                    "import matplotlib.pyplot as plt\n",
                    "\n",
                    "print(f\"TensorFlow: {tf.__version__}\")\n",
                    "print(f\"PyTorch: {torch.__version__}\")\n"
                ]
            },
            {
                "cell_type": "markdown",
                "metadata": {},
                "source": [
                    "## 1. Introduction\n",
                    "\n",
                    f"This lesson covers {config['description']}.\n",
                    "\n",
                    "**TODO:** Add comprehensive content following the pattern from Intermediate lessons.\n"
                ]
            },
            {
                "cell_type": "markdown",
                "metadata": {},
                "source": [
                    "---\n",
                    "\n",
                    "## Key Takeaways\n",
                    "\n",
                    f"**Relevant UoA Courses:** {', '.join(config['courses'])}\n",
                    "\n",
                    "1. **TODO:** Add key takeaway 1\n",
                    "2. **TODO:** Add key takeaway 2\n",
                    "3. **TODO:** Add key takeaway 3\n",
                    "4. **TODO:** Add key takeaway 4\n",
                    "5. **TODO:** Add key takeaway 5\n",
                    "\n",
                    "---\n",
                    "\n",
                    "## Exam Preparation Guide\n",
                    "\n",
                    "### Essential Concepts for Exams\n",
                    "\n",
                    "- **TODO:** Add exam tip 1\n",
                    "- **TODO:** Add exam tip 2\n",
                    "- **TODO:** Add exam tip 3\n",
                    "\n",
                    "### Common Mistakes to Avoid\n",
                    "\n",
                    "- ❌ **TODO:** Add common mistake 1\n",
                    "- ❌ **TODO:** Add common mistake 2\n",
                    "\n",
                    "### Practice Problems\n",
                    "\n",
                    "1. **TODO:** Add practice problem 1\n",
                    "2. **TODO:** Add practice problem 2\n",
                    "3. **TODO:** Add practice problem 3\n",
                    "\n",
                    f"### How This Helps Your UoA Courses\n",
                    "\n",
                    f"**{', '.join(config['courses'])}:**\n",
                    "- Provides hands-on implementation of production concepts\n",
                    "- Practice problems similar to exam questions\n",
                    "- Reinforces lecture material with real-world examples\n",
                    "- Helps build intuition for complex systems\n",
                    "\n",
                    "### Study Tips for Production Topics\n",
                    "\n",
                    "1. **Build End-to-End**: Deploy every model to production\n",
                    "2. **Monitor Everything**: Track metrics and performance\n",
                    "3. **Automate**: Use CI/CD for all workflows\n",
                    "4. **Document**: Architecture decisions and trade-offs\n",
                    "5. **Scale Gradually**: Start small, then scale up\n",
                    "\n",
                    "### Exam Question Types\n",
                    "\n",
                    "- **System Design**: Design production ML system for requirements\n",
                    "- **Trade-offs**: Compare approaches and justify choices\n",
                    "- **Troubleshooting**: Diagnose and fix production issues\n",
                    "- **Optimization**: Improve latency, throughput, or cost\n",
                    "- **Best Practices**: Apply MLOps principles to scenarios\n",
                    "\n",
                    "---\n"
                ]
            },
            {
                "cell_type": "markdown",
                "metadata": {},
                "source": [
                    "## Learning Progress Tracker\n",
                    "\n",
                    "Track your progress through this lesson:\n",
                    "\n",
                    "- [ ] Understood core concepts\n",
                    "- [ ] Completed all code examples\n",
                    "- [ ] Implemented from scratch\n",
                    "- [ ] Deployed to production (if applicable)\n",
                    "- [ ] Can explain to others\n",
                    "\n",
                    "---\n",
                    "\n",
                    "**Next Lesson:** Continue to the next Advanced lesson\n",
                    "\n",
                    "**Questions?** Connect on [LinkedIn](https://www.linkedin.com/in/karthik-arjun-a5b4a258/)\n"
                ]
            }
        ],
        "metadata": {
            "kernelspec": {
                "display_name": "Python 3",
                "language": "python",
                "name": "python3"
            },
            "language_info": {
                "codemirror_mode": {
                    "name": "ipython",
                    "version": 3
                },
                "file_extension": ".py",
                "mimetype": "text/x-python",
                "name": "python",
                "nbconvert_exporter": "python",
                "pygments_lexer": "ipython3",
                "version": "3.9.0"
            }
        },
        "nbformat": 4,
        "nbformat_minor": 4
    }
    
    return notebook

def main():
    """Create all Advanced level notebooks."""
    print("🚀 Creating Advanced level lessons (A01-A15)...\n")
    
    advanced_dir = Path("Advanced")
    advanced_dir.mkdir(exist_ok=True)
    
    created_count = 0
    skipped_count = 0
    
    for lesson_code in sorted(LESSON_CONFIGS.keys()):
        config = LESSON_CONFIGS[lesson_code]
        filename = f"{lesson_code} - {config['title']}.ipynb"
        filepath = advanced_dir / filename
        
        if filepath.exists():
            print(f"  ⏭️  {filename} already exists")
            skipped_count += 1
            continue
        
        notebook = create_notebook_skeleton(lesson_code, config)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(notebook, f, indent=1, ensure_ascii=False)
        
        print(f"  ✅ Created {filename}")
        created_count += 1
    
    print(f"\n✨ Complete!")
    print(f"   Created: {created_count} notebooks")
    print(f"   Skipped: {skipped_count} notebooks (already exist)")
    print(f"\n📝 Next steps:")
    print(f"   1. Fill in comprehensive content for each lesson")
    print(f"   2. Add detailed exam preparation sections")
    print(f"   3. Include code examples and visualizations")
    print(f"   4. Test all notebooks in Colab")

if __name__ == "__main__":
    main()

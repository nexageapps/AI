#!/usr/bin/env python3
"""
Add exam prep sections to Intermediate and Expert level notebooks.
"""

import json
from pathlib import Path

# Intermediate and Expert configurations
LESSON_CONFIGS = {
    # INTERMEDIATE LEVEL
    "I01": {
        "title": "Advanced Optimization",
        "courses": ["COMPSCI 762", "COMPSCI 713"],
        "key_takeaways": [
            "Adam combines momentum and RMSprop: adaptive learning rates per parameter",
            "Learning rate scheduling: reduce LR when plateau (ReduceLROnPlateau, CosineAnnealing)",
            "Momentum accelerates convergence: v_t = βv_{t-1} + ∇L",
            "RMSprop adapts learning rate using moving average of squared gradients",
            "Warmup: gradually increase LR at start to stabilize training"
        ],
        "exam_tips": [
            "Compare optimizers: SGD vs Momentum vs Adam (convergence speed, memory)",
            "Understand Adam parameters: β1 (momentum), β2 (RMSprop), ε (numerical stability)",
            "Know when to use which optimizer: Adam (default), SGD+momentum (better generalization)",
            "Calculate learning rate with scheduling: given initial LR and decay",
            "Common question: Explain why adaptive learning rates help convergence"
        ],
        "common_mistakes": [
            "Using same learning rate for all optimizers",
            "Not tuning β1, β2 in Adam (defaults usually work)",
            "Forgetting warmup for large batch training"
        ],
        "practice_problems": [
            "Compare convergence: SGD vs Adam on same problem",
            "Given LR=0.001, decay=0.1 every 10 epochs, what's LR at epoch 25?",
            "Why does Adam work better than SGD for sparse gradients?"
        ]
    },
    
    "I02": {
        "title": "Regularization Techniques",
        "courses": ["COMPSCI 762", "COMPSCI 713"],
        "key_takeaways": [
            "L1 regularization encourages sparsity: many weights become exactly zero",
            "L2 regularization (weight decay) prevents large weights: w = w(1-λ)",
            "Dropout randomly drops neurons: prevents co-adaptation",
            "Data augmentation: rotation, flip, crop, color jitter for images",
            "Early stopping: monitor validation loss, stop when it stops improving"
        ],
        "exam_tips": [
            "Know L1 vs L2: L1→sparse, L2→small weights",
            "Calculate regularized loss: Loss + λ·Σw² (L2) or Loss + λ·Σ|w| (L1)",
            "Understand dropout: p=0.5 means 50% neurons dropped during training",
            "Explain why data augmentation helps: increases effective dataset size",
            "Common question: Given overfitting, which regularization techniques to apply?"
        ],
        "common_mistakes": [
            "Using dropout during inference (should be disabled)",
            "Applying data augmentation to validation/test sets",
            "Setting regularization strength too high (underfitting)"
        ],
        "practice_problems": [
            "Model overfits: train acc 99%, val acc 75%. Suggest 3 solutions",
            "Calculate L2 loss: MSE=5, weights=[1,2,3], λ=0.01",
            "Why does dropout prevent overfitting?"
        ]
    },
    
    "I03": {
        "title": "Normalization Techniques",
        "courses": ["COMPSCI 762", "COMPSYS 721"],
        "key_takeaways": [
            "Batch Norm: normalize across batch dimension, learn scale/shift",
            "Layer Norm: normalize across feature dimension (used in transformers)",
            "Group Norm: divide channels into groups, normalize within groups",
            "Instance Norm: normalize each sample independently (style transfer)",
            "Normalization stabilizes training and allows higher learning rates"
        ],
        "exam_tips": [
            "Know which norm for which task: BatchNorm (CNNs), LayerNorm (Transformers)",
            "Understand BatchNorm: μ_B = mean(batch), σ_B = std(batch), normalize then scale/shift",
            "Calculate normalized value: (x - μ) / √(σ² + ε)",
            "Explain why normalization helps: reduces internal covariate shift",
            "Common question: Compare BatchNorm vs LayerNorm, when to use each?"
        ],
        "common_mistakes": [
            "Using BatchNorm with small batch sizes (unstable statistics)",
            "Forgetting to switch BatchNorm to eval mode during inference",
            "Not understanding learnable parameters (γ, β) in normalization"
        ],
        "practice_problems": [
            "Given batch [1,2,3,4], calculate BatchNorm output (γ=1, β=0)",
            "Why use LayerNorm instead of BatchNorm in transformers?",
            "Compare BatchNorm, LayerNorm, GroupNorm: dimensions normalized"
        ]
    },
    
    # Continue with more intermediate lessons...
    "I09": {
        "title": "Advanced Transformers",
        "courses": ["COMPSCI 703", "COMPSYS 721"],
        "key_takeaways": [
            "BERT: bidirectional encoder, masked language modeling (MLM)",
            "GPT: unidirectional decoder, causal language modeling",
            "T5: encoder-decoder, text-to-text framework",
            "BART: denoising autoencoder, combines BERT and GPT ideas",
            "Positional encoding: sinusoidal or learned embeddings"
        ],
        "exam_tips": [
            "Compare architectures: BERT (encoder), GPT (decoder), T5 (encoder-decoder)",
            "Understand training objectives: MLM (BERT), CLM (GPT), span corruption (T5)",
            "Know use cases: BERT (classification), GPT (generation), T5 (seq2seq)",
            "Explain masked attention vs causal attention",
            "Common question: Design transformer for specific task (classification vs generation)"
        ],
        "common_mistakes": [
            "Confusing BERT and GPT architectures",
            "Not understanding bidirectional vs unidirectional attention",
            "Forgetting that BERT can't generate text autoregressively"
        ],
        "practice_problems": [
            "Compare BERT vs GPT: architecture, training, use cases",
            "Why can't BERT generate text like GPT?",
            "Design transformer for machine translation: encoder-decoder or decoder-only?"
        ]
    },
    
    # EXPERT LEVEL
    "E01": {
        "title": "Reading Research Papers",
        "courses": ["COMPSCI 761", "COMPSCI 703"],
        "key_takeaways": [
            "Paper structure: Abstract → Intro → Related Work → Method → Experiments → Conclusion",
            "Critical reading: question assumptions, check experimental design",
            "Reproduction: implement from paper description, compare results",
            "Benchmarking: compare against baselines on standard datasets",
            "Take notes: summarize key ideas, novelty, limitations"
        ],
        "exam_tips": [
            "Know how to analyze papers: novelty, experimental rigor, reproducibility",
            "Understand common experimental flaws: cherry-picking, unfair comparisons",
            "Be able to critique methodology and results",
            "Explain how to reproduce paper results",
            "Common question: Given paper abstract, identify key contribution"
        ],
        "common_mistakes": [
            "Accepting results without checking experimental setup",
            "Not reading related work to understand context",
            "Focusing only on results, ignoring methodology"
        ],
        "practice_problems": [
            "Read paper abstract, identify: problem, method, key result",
            "What makes a good baseline in ML experiments?",
            "How would you verify paper's claims?"
        ]
    },
    
    "E10": {
        "title": "Deep Reinforcement Learning",
        "courses": ["COMPSCI 761"],
        "key_takeaways": [
            "RL framework: agent, environment, state, action, reward",
            "Q-learning: learn Q(s,a) = expected return from state s, action a",
            "DQN: Q-learning with deep neural network and experience replay",
            "Policy gradient: directly optimize policy π(a|s)",
            "PPO: stable policy gradient with clipped objective"
        ],
        "exam_tips": [
            "Understand Bellman equation: Q(s,a) = r + γ·max Q(s',a')",
            "Know DQN components: replay buffer, target network, ε-greedy",
            "Compare value-based (DQN) vs policy-based (PPO) methods",
            "Calculate Q-value updates given rewards and transitions",
            "Common question: Explain exploration-exploitation trade-off"
        ],
        "common_mistakes": [
            "Confusing Q-learning with policy gradient",
            "Not understanding importance of experience replay",
            "Forgetting discount factor γ in return calculation"
        ],
        "practice_problems": [
            "Given Q(s,a)=5, r=10, γ=0.9, max Q(s',a')=8, calculate updated Q",
            "Why does DQN use experience replay?",
            "Compare DQN vs PPO: when to use each?"
        ]
    },
    
    "E11": {
        "title": "RLHF",
        "courses": ["COMPSCI 703", "COMPSCI 761"],
        "key_takeaways": [
            "RLHF: align LLMs with human preferences using RL",
            "Reward model: trained on human preference comparisons",
            "PPO fine-tuning: optimize policy to maximize reward",
            "KL penalty: prevent model from deviating too far from base model",
            "Used in ChatGPT, Claude, and other aligned LLMs"
        ],
        "exam_tips": [
            "Understand RLHF pipeline: SFT → Reward Model → PPO",
            "Know why RLHF is needed: base LLMs don't follow instructions well",
            "Explain reward model training: pairwise preference data",
            "Understand KL penalty: balance reward and staying close to base model",
            "Common question: Describe RLHF process for aligning LLMs"
        ],
        "common_mistakes": [
            "Confusing supervised fine-tuning with RLHF",
            "Not understanding role of KL penalty",
            "Thinking RLHF is only for safety (also for helpfulness)"
        ],
        "practice_problems": [
            "Outline RLHF pipeline for training ChatGPT-like model",
            "Why use PPO instead of supervised learning for alignment?",
            "What is reward hacking and how to prevent it?"
        ]
    },
}

def create_exam_prep_cell(lesson_code, config):
    """Create exam preparation markdown cell."""
    courses_str = ", ".join(config["courses"])
    
    source = [
        "---\n",
        "\n",
        "## Key Takeaways\n",
        "\n",
        f"**Relevant UoA Courses:** {courses_str}\n",
        "\n"
    ]
    
    for i, takeaway in enumerate(config["key_takeaways"], 1):
        source.append(f"{i}. {takeaway}\n")
    
    source.extend([
        "\n",
        "---\n",
        "\n",
        "## Exam Preparation Guide\n",
        "\n",
        "### Essential Concepts for Exams\n",
        "\n"
    ])
    
    for tip in config["exam_tips"]:
        source.append(f"- {tip}\n")
    
    source.extend([
        "\n",
        "### Common Mistakes to Avoid\n",
        "\n"
    ])
    
    for mistake in config["common_mistakes"]:
        source.append(f"- ❌ {mistake}\n")
    
    source.extend([
        "\n",
        "### Practice Problems\n",
        "\n"
    ])
    
    for i, problem in enumerate(config["practice_problems"], 1):
        source.append(f"{i}. {problem}\n")
    
    source.extend([
        "\n",
        "### How This Helps Your UoA Courses\n",
        "\n",
        f"**{courses_str}:**\n",
        "- Provides hands-on implementation of theoretical concepts\n",
        "- Practice problems similar to exam questions\n",
        "- Reinforces lecture material with code examples\n",
        "- Helps build intuition for complex topics\n",
        "\n",
        "### Study Tips for Advanced Topics\n",
        "\n",
        "1. **Connect to Fundamentals**: Link advanced concepts to basics\n",
        "2. **Read Papers**: Understand state-of-the-art approaches\n",
        "3. **Implement from Scratch**: Deepens understanding\n",
        "4. **Compare Approaches**: Know trade-offs between methods\n",
        "5. **Real-World Applications**: Understand practical use cases\n",
        "\n",
        "### Exam Question Types\n",
        "\n",
        "- **Conceptual**: Explain advanced mechanisms and why they work\n",
        "- **Comparison**: Compare multiple approaches, trade-offs\n",
        "- **Design**: Design system for specific requirements\n",
        "- **Analysis**: Analyze experimental results, identify issues\n",
        "- **Application**: Apply techniques to novel problems\n",
        "\n",
        "---\n"
    ])
    
    return {
        "cell_type": "markdown",
        "metadata": {},
        "source": source
    }

def add_exam_prep_to_notebook(notebook_path, lesson_code):
    """Add exam prep section to notebook."""
    if lesson_code not in LESSON_CONFIGS:
        return False
    
    try:
        with open(notebook_path, 'r', encoding='utf-8') as f:
            notebook = json.load(f)
        
        # Check if exam prep already exists
        for cell in notebook.get('cells', []):
            if cell.get('cell_type') == 'markdown':
                source = ''.join(cell.get('source', []))
                if 'Key Takeaways' in source or 'Exam Preparation Guide' in source:
                    print(f"  ⏭️  Exam prep already exists in {notebook_path.name}")
                    return False
        
        # Find position to insert
        insert_pos = len(notebook['cells'])
        for i, cell in enumerate(notebook['cells']):
            if cell.get('cell_type') == 'markdown':
                source = ''.join(cell.get('source', []))
                if 'Learning Progress Tracker' in source:
                    insert_pos = i
                    break
        
        # Insert exam prep cell
        exam_cell = create_exam_prep_cell(lesson_code, LESSON_CONFIGS[lesson_code])
        notebook['cells'].insert(insert_pos, exam_cell)
        
        # Write back
        with open(notebook_path, 'w', encoding='utf-8') as f:
            json.dump(notebook, f, indent=1, ensure_ascii=False)
        
        print(f"  ✅ Added exam prep to {notebook_path.name}")
        return True
    
    except Exception as e:
        print(f"  ❌ Error processing {notebook_path.name}: {e}")
        return False

def main():
    """Process Intermediate and Expert notebooks."""
    print("🚀 Adding exam prep to Intermediate and Expert notebooks...\n")
    
    # Intermediate
    inter_dir = Path("Intermediate")
    if inter_dir.exists():
        print("📚 Processing Intermediate Level:")
        for lesson_code in LESSON_CONFIGS.keys():
            if lesson_code.startswith("I"):
                notebook_files = list(inter_dir.glob(f"{lesson_code} - *.ipynb"))
                for notebook_path in notebook_files:
                    add_exam_prep_to_notebook(notebook_path, lesson_code)
        print()
    
    # Expert
    expert_dir = Path("Expert")
    if expert_dir.exists():
        print("📚 Processing Expert Level:")
        for lesson_code in LESSON_CONFIGS.keys():
            if lesson_code.startswith("E"):
                notebook_files = list(expert_dir.glob(f"{lesson_code} - *.ipynb"))
                for notebook_path in notebook_files:
                    add_exam_prep_to_notebook(notebook_path, lesson_code)
        print()
    
    print("✨ Exam preparation sections added!")

if __name__ == "__main__":
    main()

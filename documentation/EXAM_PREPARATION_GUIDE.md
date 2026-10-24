# Exam Preparation Guide

## Overview

Every lesson notebook now includes comprehensive exam preparation sections specifically designed to help university students succeed in their university courses. These sections bridge the gap between theoretical lectures and practical implementation.

## What's Included in Each Notebook

### Key Takeaways Section

Each lesson includes 5 essential takeaways that summarize the most important concepts. These are:
- Concise and exam-focused
- Include mathematical formulations where relevant
- Highlight connections between concepts
- Emphasize practical understanding

Example from B02 (Linear Regression):
1. Linear regression finds the best-fit line: y = wx + b
2. Loss function (MSE) measures prediction error: L = (y_pred - y_true)²
3. Gradient descent iteratively updates weights: w = w - α∇L
4. Learning rate (α) controls step size
5. Convergence occurs when loss stops decreasing

### Exam Preparation Guide

Each notebook includes a comprehensive exam prep section with:

#### 1. Essential Concepts for Exams
- Key topics that frequently appear in exams
- Calculation skills you need to master
- Conceptual understanding required
- Common exam question patterns

#### 2. Common Mistakes to Avoid
- Typical errors students make
- Misconceptions to watch out for
- Implementation pitfalls
- Conceptual confusions

#### 3. Practice Problems
- Exam-style questions
- Calculation exercises
- Conceptual questions
- Application problems

#### 4. Course Mapping
Shows which university courses each lesson supports:
- AI Fundamentals: AI Fundamentals
- Neural Networks: AI Architecture & Design
- Machine Learning: Advanced AI Topics
- ML Foundations: ML Foundations
- Generalising AI: Generalising AI
- Deep Learning: Deep Learning

#### 5. Study Tips
- How to approach the material
- Effective learning strategies
- Connection to theory
- Retention techniques

#### 6. Exam Question Types
- Conceptual questions
- Calculation problems
- Comparison questions
- Design problems
- Debugging scenarios

## Topic-Based Revision Map

Course structures differ between institutions, so revise by **topic**. Use your own syllabus to decide what to prioritise, and these lessons to practise it.

| Topic | Lessons | Practise by… |
|---|---|---|
| Regression, classification, evaluation | B02–B07 | deriving the loss and gradient by hand; reading a confusion matrix and ROC/PR curve |
| Trees, ensembles, boosting | B08 | computing information gain / Gini on a small table |
| Neural nets and backprop | B09, Electives/Course-Companions | forward and backward pass on a 2-layer net with numbers |
| CNNs and transfer learning | I01–I02 | output-shape and parameter-count calculations |
| Sequence models, attention, transformers | I03–I06 | tracing scaled dot-product attention on a toy sequence |
| Embeddings and retrieval | I07, A03 | cosine similarity by hand; recall@k and MRR |
| Reinforcement learning, search, planning | I08, E03, Electives/Classical-AI | Q-learning update steps; drawing A*/minimax trees |
| LLM engineering, tuning and alignment | A01–A07, E04 | LoRA parameter counts; the DPO loss; why best-of-N saturates |
| Agents | AG01–AG15 | drawing the loop; stating where each guardrail lives; explaining a failed trace |
| Knowledge graphs, logic, expert systems | Electives/Classical-AI | writing triples; proving a simple inference |

**Generic exam tips**
- Practise *by hand* the calculations your course expects (search trees, backprop, shapes, probabilities).
- Learn the difference between look-alike concepts (precision vs recall, bias vs variance, workflow vs agent, RAG vs fine-tuning).
- Know your assessment rules (allowed materials, calculators) from your own course page.
- Turn each lesson's *Checkpoint* into flash-cards; re-answer after 2 days, 1 week and 1 month.

## How to Use This Guide

### Before Exams

1. Review Key Takeaways: Start with the 5 key points in each lesson
2. Work Through Practice Problems: Do them without looking at solutions
3. Check Common Mistakes: Make sure you understand why they're wrong
4. Test Yourself: Can you explain concepts to someone else?

### During Study Sessions

1. Active Learning: Don't just read, implement and experiment
2. Connect Concepts: Link lessons to lecture material
3. Practice Calculations: Work through math by hand
4. Build Intuition: Understand why, not just what

### Week Before Exam

1. Focus on Essential Concepts: Review exam tips section
2. Practice Problems: Work through all practice problems
3. Review Mistakes: Go through common mistakes list
4. Quick Review: Skim key takeaways for all relevant lessons

## Study Strategies

### For Conceptual Questions

- Understand the "why" behind each concept
- Be able to explain in your own words
- Connect to real-world applications
- Know advantages and disadvantages

### For Calculation Questions

- Practice by hand first
- Understand each step
- Check your work
- Know common formulas

### For Comparison Questions

- Create comparison tables
- Understand trade-offs
- Know use cases for each approach
- Practice explaining differences

### For Design Questions

- Start with requirements
- Consider constraints
- Justify your choices
- Think about trade-offs

## Exam Question Examples

### Conceptual
- "Explain why ReLU is preferred over sigmoid in hidden layers"
- "Describe how attention mechanism works in transformers"
- "Why does batch normalization help training?"

### Calculation
- "Given input shape (32, 784) and weight matrix (784, 128), calculate output shape"
- "Calculate softmax probabilities for logits [2.0, 1.0, 0.1]"
- "Derive gradient of MSE loss with respect to weights"

### Comparison
- "Compare Adam vs SGD: convergence speed, memory, generalization"
- "BERT vs GPT: architecture, training objective, use cases"
- "L1 vs L2 regularization: effect on weights, use cases"

### Design
- "Design a CNN for image classification with 10 classes"
- "Propose architecture for machine translation"
- "Design experiment to compare two models fairly"

### Debugging
- "Loss becomes NaN during training. What could be wrong?"
- "Model overfits: train acc 99%, val acc 70%. Solutions?"
- "Gradient vanishing in deep network. How to fix?"

## Tips for Success

### Before the Exam

1. Complete All Practice Problems: Don't skip any
2. Review Common Mistakes: Learn from others' errors
3. Test Your Understanding: Explain concepts out loud
4. Connect Theory to Code: Link math to implementation
5. Get Enough Sleep: Your brain needs rest to perform

### During the Exam

1. Read Questions Carefully: Understand what's being asked
2. Start with Easy Questions: Build confidence
3. Show Your Work: Partial credit for correct process
4. Check Your Answers: Verify calculations
5. Manage Your Time: Don't spend too long on one question

### After the Exam

1. Review Your Performance: What went well? What didn't?
2. Update Your Notes: Add insights from exam
3. Help Others: Teaching reinforces learning
4. Keep Practicing: Skills improve with use

## Additional Resources

### In This Repository

- README.md: Overall progress tracker
- PROGRESS_TRACKER_GUIDE.md: How to track your learning
- STUDENT_GUIDE.md: Comprehensive guide for students
- Individual Notebooks: Detailed implementations with exam prep

### External Resources

- Course Lectures: Primary source of theoretical knowledge
- Office Hours: Ask TAs and professors for clarification
- Study Groups: Learn with peers
- Past Exams: Practice with real exam questions (if available)
- Online Resources: Supplement with videos and tutorials

## Success Stories

Students who use these exam preparation sections report:

- Better Understanding: Concepts click when connected to code
- Higher Grades: Practice problems prepare for exam questions
- More Confidence: Knowing common mistakes helps avoid them
- Faster Learning: Focused study on essential concepts
- Better Retention: Active practice improves memory

## Final Thoughts

Success in AI/ML courses requires:

1. Understanding Fundamentals: Master the basics first
2. Hands-On Practice: Implement concepts yourself
3. Regular Review: Spaced repetition improves retention
4. Active Learning: Don't just read, do
5. Persistence: Some concepts take time to click

Remember: These notebooks are learning tools, not solution manuals. Use them to understand concepts, then apply that understanding to your assignments and exams.

Good luck with your exams! You've got this! 

---

## Quick Reference: Lesson to Course Mapping

| Lesson | Title | Courses | Key Exam Topics |
|--------|-------|---------|-----------------|
| B01 | Arithmetic | 713, 762 | Tensor shapes, matrix multiplication |
| B02 | Linear Regression | 762, 713 | Gradient descent, loss functions |
| B03 | Binary Classification | 762, 713 | Sigmoid, BCE loss |
| B04 | Multi-Class | 762, 713, 761 | Softmax, categorical CE |
| B05 | Neural Networks | 713, 762, 721 | MLPs, backpropagation, ReLU |
| B06 | Preprocessing | 761, 762 | Normalization, feature engineering |
| B07 | Evaluation | 762, 761 | Metrics, confusion matrix |
| B08 | Regularization | 762, 713 | L1/L2, dropout, overfitting |
| B09 | CNNs | 721, 714 | Convolution, pooling, architectures |
| B10 | RNNs | 721, 703 | LSTM, vanishing gradient |
| B11 | Transformers | 703, 721, 714 | Attention, self-attention |
| B12 | BPE | 703, 761 | Tokenization, subwords |
| B13 | Language Models | 703, 714 | GPT, autoregressive generation |
| B14 | Projects | All | Problem-solving, debugging |
| B15 | Capstone | All | End-to-end ML pipeline |

---

Remember: Understanding > Memorization. Focus on why things work, not just what they do.

## Related Documentation

- [README.md](./README.md) - Main repository overview and learning paths
- [Progress Tracker Guide](./PROGRESS_TRACKER_GUIDE.md) - How to track your learning progress
- [Student Guide](./STUDENT_GUIDE.md) - Complete guide for Master's-level students
- [Updates Summary](./UPDATES_SUMMARY.md) - Recent repository enhancements

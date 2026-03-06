# Intermediate Level - Advanced AI/ML Techniques

[![language: Python](https://img.shields.io/badge/language-Python-orange.svg)](https://www.python.org/)
[![license: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Sponsored by: nexageapps](https://img.shields.io/badge/Sponsored%20by-nexageapps-blue.svg)](https://nexageapps.com)
[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-Support-yellow.svg)](https://buymeacoffee.com/fcc4sbsx5f6)

**Advanced techniques building on basic concepts**

This folder contains 15 comprehensive lessons covering intermediate AI/ML topics. Each lesson builds on the Basic level (B01-B15) and prepares you for Advanced topics.

Designed for university students and AI learners worldwide. The author is currently pursuing a Master of Artificial Intelligence at the University of Auckland.

---

## Complete Lesson List

### Advanced Optimization & Training (I01-I03)

**I01 - Advanced Optimization Algorithms** ✅
- Adam, RMSprop, AdaGrad optimizers
- Learning rate scheduling strategies
- Momentum and adaptive learning rates
- Comparing optimizer performance
- **Duration:** 2-3 hours

**I02 - Regularization Techniques** ✅
- L1 and L2 regularization
- Dropout and its variants
- Data augmentation techniques
- Early stopping strategies
- **Duration:** 2-3 hours

**I03 - Batch and Layer Normalization**
- Batch normalization theory and practice
- Layer normalization
- Group and instance normalization
- When to use each technique
- **Duration:** 2-3 hours

### Advanced Computer Vision (I04-I06)

**I04 - Advanced CNN Architectures**
- ResNet and skip connections
- VGG, Inception, EfficientNet
- Architecture design principles
- Transfer learning basics
- **Duration:** 3-4 hours

**I05 - Transfer Learning and Fine-tuning**
- Pre-trained models (ImageNet)
- Feature extraction vs fine-tuning
- Domain adaptation techniques
- Few-shot learning
- **Duration:** 3-4 hours

**I06 - Object Detection and Segmentation**
- YOLO architecture
- R-CNN family (Fast R-CNN, Faster R-CNN)
- U-Net for segmentation
- Mask R-CNN
- **Duration:** 4-5 hours

### Advanced NLP & Sequences (I07-I09)

**I07 - Advanced RNN Architectures**
- Bidirectional RNNs
- Stacked LSTMs
- GRU vs LSTM comparison
- Sequence-to-sequence basics
- **Duration:** 3-4 hours

**I08 - Encoder-Decoder and Seq2Seq Models**
- Encoder-decoder architecture
- Attention in seq2seq
- Machine translation
- Text summarization
- **Duration:** 3-4 hours

**I09 - Advanced Transformer Architectures**
- BERT architecture and pre-training
- GPT variants (GPT-2, GPT-3)
- T5 and BART models
- Positional encoding deep dive
- **Duration:** 4-5 hours

### Production ML & Advanced Topics (I10-I15)

**I10 - Hyperparameter Tuning and AutoML**
- Grid search and random search
- Bayesian optimization
- Neural Architecture Search (NAS)
- Optuna and Keras Tuner
- **Duration:** 3-4 hours

**I11 - Model Compression and Optimization**
- Pruning techniques
- Quantization (INT8, FP16)
- Knowledge distillation
- Mobile deployment (TFLite)
- **Duration:** 3-4 hours

**I12 - Generative Models**
- Variational Autoencoders (VAEs)
- Generative Adversarial Networks (GANs)
- Diffusion models introduction
- Applications and use cases
- **Duration:** 4-5 hours

**I13 - Multi-Task and Meta-Learning**
- Multi-task learning frameworks
- Model-Agnostic Meta-Learning (MAML)
- Few-shot learning techniques
- Zero-shot learning
- **Duration:** 3-4 hours

**I14 - Explainable AI and Interpretability**
- SHAP (SHapley Additive exPlanations)
- LIME (Local Interpretable Model-agnostic Explanations)
- Attention visualization
- Fairness and bias detection
- **Duration:** 3-4 hours

**I15 - MLOps and Production Deployment**
- Model versioning (MLflow, DVC)
- CI/CD for ML pipelines
- Model monitoring and drift detection
- Serving models (TensorFlow Serving, FastAPI)
- **Duration:** 4-5 hours

---

## Learning Paths

### Path 1: Computer Vision Specialist
```
I01 → I02 → I03 → I04 → I05 → I06 → I11 → I15
Focus: Optimization, regularization, advanced CNNs, deployment
Duration: 8-10 weeks
```

### Path 2: NLP Specialist
```
I01 → I02 → I03 → I07 → I08 → I09 → I14 → I15
Focus: Optimization, advanced RNNs, transformers, explainability
Duration: 8-10 weeks
```

### Path 3: ML Engineer
```
I01 → I02 → I10 → I11 → I14 → I15
Focus: Optimization, tuning, compression, production
Duration: 6-8 weeks
```

### Path 4: Complete Intermediate (Recommended)
```
I01 → I02 → I03 → I04 → I05 → I06 → I07 → I08 → I09 → I10 → I11 → I12 → I13 → I14 → I15
All topics covered systematically
Duration: 15-20 weeks
```

---

## Prerequisites

Before starting Intermediate level:
- ✅ Complete all Basic lessons (B01-B15)
- ✅ Comfortable with Python and TensorFlow/PyTorch
- ✅ Understanding of neural networks
- ✅ Familiarity with training and evaluation

---

## Getting Started

### Option 1: Google Colab (Recommended)
- Click "Open in Colab" badge in any notebook
- All dependencies pre-installed
- Free GPU access

### Option 2: Local Setup
```bash
# Create virtual environment
python -m venv .venv
source .venv/bin/activate  # macOS/Linux
.venv\Scripts\activate     # Windows

# Install dependencies
pip install tensorflow torch numpy pandas matplotlib seaborn scikit-learn

# Start Jupyter
jupyter lab
```

---

## Study Tips

### Weekly Schedule
- **Week 1-3**: Optimization & Regularization (I01-I03)
- **Week 4-6**: Computer Vision (I04-I06)
- **Week 7-9**: NLP & Sequences (I07-I09)
- **Week 10-12**: Production ML (I10-I12)
- **Week 13-15**: Advanced Topics (I13-I15)

### Best Practices
1. **Complete in order** - Each lesson builds on previous ones
2. **Code along** - Don't just read, implement everything
3. **Experiment** - Modify parameters and observe changes
4. **Take notes** - Document your learnings
5. **Build projects** - Apply concepts to real problems

---

## Progress Tracking

Track your progress as you complete each lesson:
- [ ] I01 - Advanced Optimization Algorithms ✅
- [ ] I02 - Regularization Techniques ✅
- [ ] I03 - Batch and Layer Normalization ✅
- [ ] I04 - Advanced CNN Architectures ✅
- [ ] I05 - Transfer Learning and Fine-tuning ✅
- [ ] I06 - Object Detection and Segmentation ✅
- [ ] I07 - Advanced RNN Architectures ✅
- [ ] I08 - Encoder-Decoder and Seq2Seq Models ✅
- [ ] I09 - Advanced Transformer Architectures ✅
- [ ] I10 - Hyperparameter Tuning and AutoML ✅
- [ ] I11 - Model Compression and Optimization ✅
- [ ] I12 - Generative Models ✅
- [ ] I13 - Multi-Task and Meta-Learning ✅
- [ ] I14 - Explainable AI and Interpretability ✅
- [ ] I15 - MLOps and Production Deployment ✅

---

## Resources

### Books
- "Deep Learning" by Goodfellow, Bengio, Courville
- "Hands-On Machine Learning" by Aurélien Géron
- "Deep Learning with Python" by François Chollet

### Papers
- ResNet: "Deep Residual Learning for Image Recognition"
- BERT: "BERT: Pre-training of Deep Bidirectional Transformers"
- Adam: "Adam: A Method for Stochastic Optimization"

### Online Resources
- TensorFlow Documentation
- PyTorch Tutorials
- Papers with Code
- Distill.pub

---

## Next Steps

After completing Intermediate level:
1. **Advanced Level** - Production AI systems (A01-A15)
2. **Build Projects** - Apply to real-world problems
3. **Contribute** - Share your implementations
4. **Specialize** - Deep dive into your area of interest

---

## Contributing

Found an error? Have a suggestion?
- Open an issue on GitHub
- Submit a pull request
- Connect on LinkedIn

---

**Author:** Karthik Arjun  
**Currently:** Master of Artificial Intelligence Student at the University of Auckland  
**LinkedIn:** [karthik-arjun-a5b4a258](https://www.linkedin.com/in/karthik-arjun-a5b4a258/)  
**Hugging Face:** [nexageapps](https://huggingface.co/spaces/nexageapps)

*"Master intermediate techniques to build production-ready AI systems"*

---

**Last Updated:** March 2026  
**Status:** Complete (15/15 lessons)

## Current Status

✅ **All Notebooks Complete!**

**Optimization & Training (I01-I03):**
- I01 - Advanced Optimization Algorithms
- I02 - Regularization Techniques
- I03 - Batch and Layer Normalization

**Computer Vision (I04-I06):**
- I04 - Advanced CNN Architectures
- I05 - Transfer Learning and Fine-tuning
- I06 - Object Detection and Segmentation

**NLP & Sequences (I07-I09):**
- I07 - Advanced RNN Architectures
- I08 - Encoder-Decoder and Seq2Seq Models
- I09 - Advanced Transformer Architectures

**Production ML (I10-I15):**
- I10 - Hyperparameter Tuning and AutoML
- I11 - Model Compression and Optimization
- I12 - Generative Models
- I13 - Multi-Task and Meta-Learning
- I14 - Explainable AI and Interpretability
- I15 - MLOps and Production Deployment

🎉 **All tracks complete! Ready for Advanced level.**

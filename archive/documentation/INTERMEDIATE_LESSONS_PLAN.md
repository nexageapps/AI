# Intermediate Level Lessons (I1-I10)

## Overview

These 10 intermediate lessons bridge the gap between basic understanding and expert-level AI development. They focus on advanced architectures, practical techniques, and specialized domains.

**Target Audience**: Students who have completed Basic lessons (L1-L15)  
**Prerequisites**: Strong understanding of neural networks, CNNs, RNNs, and Transformers  
**Total Duration**: 40-50 hours

---

## Intermediate Lesson Structure

### I1: Advanced CNN Architectures
**File**: `Intermediate | I1 - Advanced CNN Architectures.ipynb`  
**Duration**: 4 hours

**Learning Objectives**:
- Understand evolution of CNN architectures
- Implement ResNet, VGG, Inception
- Learn skip connections and residual learning
- Master batch normalization in depth
- Understand architecture design principles

**Topics Covered**:
1. **VGGNet**
   - Deep networks with small filters
   - Stacking 3x3 convolutions
   - Architecture patterns

2. **ResNet (Residual Networks)**
   - Vanishing gradient problem
   - Skip connections and residual blocks
   - Identity mappings
   - ResNet-50, ResNet-101 implementation

3. **Inception Networks**
   - Multi-scale feature extraction
   - 1x1 convolutions for dimensionality reduction
   - Inception modules
   - Auxiliary classifiers

4. **DenseNet**
   - Dense connections
   - Feature reuse
   - Reduced parameters

5. **EfficientNet**
   - Compound scaling
   - Neural architecture search
   - Efficiency vs accuracy trade-offs

**Practical Project**:
- Implement ResNet-18 from scratch
- Compare architectures on CIFAR-100
- Transfer learning with pre-trained models

**Real-World Applications**:
- Image classification at scale
- Medical image analysis
- Autonomous vehicle perception

---

### I2: Object Detection and Segmentation
**File**: `Intermediate | I2 - Object Detection and Segmentation.ipynb`  
**Duration**: 5 hours

**Learning Objectives**:
- Understand object detection pipeline
- Implement YOLO and R-CNN variants
- Master semantic and instance segmentation
- Learn evaluation metrics (mAP, IoU)

**Topics Covered**:
1. **Object Detection Fundamentals**
   - Bounding boxes and anchors
   - Region proposals
   - Non-maximum suppression (NMS)
   - Intersection over Union (IoU)

2. **Two-Stage Detectors**
   - R-CNN architecture
   - Fast R-CNN improvements
   - Faster R-CNN with RPN
   - Mask R-CNN for segmentation

3. **One-Stage Detectors**
   - YOLO (You Only Look Once)
   - SSD (Single Shot Detector)
   - RetinaNet and Focal Loss

4. **Semantic Segmentation**
   - Fully Convolutional Networks (FCN)
   - U-Net architecture
   - DeepLab and atrous convolution
   - Encoder-decoder architectures

5. **Instance Segmentation**
   - Mask R-CNN deep dive
   - Panoptic segmentation
   - Point-based methods

**Practical Project**:
- Build YOLO-style detector
- Implement U-Net for medical image segmentation
- Evaluate on COCO dataset

**Real-World Applications**:
- Autonomous driving
- Medical image analysis
- Retail analytics
- Surveillance systems

---

### I3: Advanced NLP - Word Embeddings and Language Models
**File**: `Intermediate | I3 - Advanced NLP.ipynb`  
**Duration**: 4 hours

**Learning Objectives**:
- Master word embedding techniques
- Understand pre-training strategies
- Implement ELMo and contextual embeddings
- Learn language model evaluation

**Topics Covered**:
1. **Word Embeddings**
   - Word2Vec (Skip-gram, CBOW)
   - GloVe (Global Vectors)
   - FastText and subword embeddings
   - Embedding visualization (t-SNE, PCA)

2. **Contextual Embeddings**
   - ELMo (Embeddings from Language Models)
   - Context-dependent representations
   - Bidirectional language models

3. **Language Model Pre-training**
   - Masked language modeling
   - Next sentence prediction
   - Causal language modeling
   - Pre-training objectives

4. **Evaluation Metrics**
   - Perplexity
   - BLEU score
   - ROUGE metrics
   - Human evaluation

5. **Fine-tuning Strategies**
   - Task-specific heads
   - Learning rate scheduling
   - Gradual unfreezing
   - Discriminative fine-tuning

**Practical Project**:
- Train Word2Vec on custom corpus
- Implement ELMo-style contextual embeddings
- Fine-tune language model for classification

**Real-World Applications**:
- Sentiment analysis
- Named entity recognition
- Text classification
- Information retrieval

---

### I4: BERT and Transformer-Based Models
**File**: `Intermediate | I4 - BERT and Transformer Models.ipynb`  
**Duration**: 5 hours

**Learning Objectives**:
- Understand BERT architecture in depth
- Implement masked language modeling
- Master fine-tuning for downstream tasks
- Learn about BERT variants (RoBERTa, ALBERT, DistilBERT)

**Topics Covered**:
1. **BERT Architecture**
   - Bidirectional transformers
   - Masked language modeling (MLM)
   - Next sentence prediction (NSP)
   - WordPiece tokenization
   - Positional embeddings

2. **BERT Pre-training**
   - Pre-training objectives
   - Training data preparation
   - Masking strategies
   - Training at scale

3. **Fine-tuning BERT**
   - Classification tasks
   - Question answering
   - Named entity recognition
   - Sequence labeling

4. **BERT Variants**
   - RoBERTa (optimized training)
   - ALBERT (parameter sharing)
   - DistilBERT (knowledge distillation)
   - ELECTRA (replaced token detection)

5. **Practical Considerations**
   - Model size vs performance
   - Inference optimization
   - Handling long sequences
   - Domain adaptation

**Practical Project**:
- Fine-tune BERT for sentiment analysis
- Implement question answering system
- Compare BERT variants on benchmark

**Real-World Applications**:
- Search engines
- Chatbots and virtual assistants
- Document classification
- Information extraction

---

### I5: Generative Adversarial Networks (GANs)
**File**: `Intermediate | I5 - Generative Adversarial Networks.ipynb`  
**Duration**: 5 hours

**Learning Objectives**:
- Understand GAN training dynamics
- Implement various GAN architectures
- Master training stabilization techniques
- Generate realistic images

**Topics Covered**:
1. **GAN Fundamentals**
   - Generator and discriminator
   - Adversarial training
   - Nash equilibrium
   - Mode collapse problem

2. **GAN Architectures**
   - Vanilla GAN
   - DCGAN (Deep Convolutional GAN)
   - Conditional GAN (cGAN)
   - Wasserstein GAN (WGAN)
   - StyleGAN basics

3. **Training Techniques**
   - Loss functions (BCE, Wasserstein)
   - Training stabilization
   - Gradient penalty
   - Spectral normalization
   - Progressive growing

4. **Evaluation Metrics**
   - Inception Score (IS)
   - Fréchet Inception Distance (FID)
   - Precision and Recall
   - Visual quality assessment

5. **Applications**
   - Image generation
   - Image-to-image translation
   - Super-resolution
   - Data augmentation

**Practical Project**:
- Implement DCGAN for MNIST
- Train conditional GAN for controlled generation
- Build image-to-image translation system

**Real-World Applications**:
- Art generation
- Photo editing
- Medical image synthesis
- Game asset creation

---

### I6: Variational Autoencoders (VAEs)
**File**: `Intermediate | I6 - Variational Autoencoders.ipynb`  
**Duration**: 4 hours

**Learning Objectives**:
- Understand probabilistic generative models
- Implement VAE architecture
- Master reparameterization trick
- Learn latent space manipulation

**Topics Covered**:
1. **Autoencoder Basics**
   - Encoder-decoder architecture
   - Bottleneck representation
   - Reconstruction loss
   - Denoising autoencoders

2. **Variational Autoencoders**
   - Probabilistic framework
   - Evidence Lower Bound (ELBO)
   - KL divergence
   - Reparameterization trick

3. **VAE Variants**
   - Beta-VAE (disentanglement)
   - Conditional VAE
   - Vector Quantized VAE (VQ-VAE)
   - Hierarchical VAE

4. **Latent Space Analysis**
   - Latent space interpolation
   - Attribute manipulation
   - Disentanglement metrics
   - Latent space arithmetic

5. **Applications**
   - Image generation
   - Anomaly detection
   - Data compression
   - Feature learning

**Practical Project**:
- Build VAE for MNIST
- Implement beta-VAE for disentanglement
- Create latent space explorer

**Real-World Applications**:
- Drug discovery
- Anomaly detection
- Recommendation systems
- Creative tools

---

### I7: Sequence-to-Sequence Models and Neural Machine Translation
**File**: `Intermediate | I7 - Seq2Seq and Neural Machine Translation.ipynb`  
**Duration**: 4 hours

**Learning Objectives**:
- Master encoder-decoder architectures
- Implement attention mechanisms
- Build neural machine translation system
- Learn beam search and decoding strategies

**Topics Covered**:
1. **Seq2Seq Fundamentals**
   - Encoder-decoder architecture
   - Teacher forcing
   - Inference strategies
   - Handling variable-length sequences

2. **Attention Mechanisms**
   - Bahdanau attention
   - Luong attention
   - Attention visualization
   - Attention weights interpretation

3. **Neural Machine Translation**
   - Parallel corpus preparation
   - Subword tokenization
   - Training strategies
   - Evaluation (BLEU, METEOR)

4. **Decoding Strategies**
   - Greedy decoding
   - Beam search
   - Top-k and nucleus sampling
   - Length normalization

5. **Advanced Techniques**
   - Back-translation
   - Multi-task learning
   - Low-resource translation
   - Zero-shot translation

**Practical Project**:
- Build English-French translator
- Implement attention visualization
- Compare decoding strategies

**Real-World Applications**:
- Machine translation
- Text summarization
- Dialogue systems
- Code generation

---

### I8: Graph Neural Networks (GNNs)
**File**: `Intermediate | I8 - Graph Neural Networks.ipynb`  
**Duration**: 4 hours

**Learning Objectives**:
- Understand graph representation learning
- Implement GNN architectures
- Master message passing
- Apply GNNs to real-world problems

**Topics Covered**:
1. **Graph Fundamentals**
   - Graph representation
   - Adjacency matrices
   - Node features and edge features
   - Graph properties

2. **Graph Convolutional Networks**
   - Spectral graph convolution
   - Spatial graph convolution
   - Message passing framework
   - Aggregation functions

3. **GNN Architectures**
   - GCN (Graph Convolutional Network)
   - GraphSAGE
   - GAT (Graph Attention Network)
   - GIN (Graph Isomorphism Network)

4. **Graph-Level Tasks**
   - Node classification
   - Link prediction
   - Graph classification
   - Graph generation

5. **Applications**
   - Social network analysis
   - Molecular property prediction
   - Recommendation systems
   - Knowledge graphs

**Practical Project**:
- Implement GCN for node classification
- Build molecular property predictor
- Create recommendation system with GNN

**Real-World Applications**:
- Drug discovery
- Social network analysis
- Traffic prediction
- Fraud detection

---

### I9: Reinforcement Learning Fundamentals
**File**: `Intermediate | I9 - Reinforcement Learning Fundamentals.ipynb`  
**Duration**: 5 hours

**Learning Objectives**:
- Understand RL framework (MDP)
- Implement Q-learning and DQN
- Master policy gradient methods
- Train agents in environments

**Topics Covered**:
1. **RL Fundamentals**
   - Markov Decision Process (MDP)
   - States, actions, rewards
   - Value functions
   - Bellman equations
   - Exploration vs exploitation

2. **Value-Based Methods**
   - Q-learning
   - Deep Q-Network (DQN)
   - Experience replay
   - Target networks
   - Double DQN

3. **Policy-Based Methods**
   - Policy gradient theorem
   - REINFORCE algorithm
   - Actor-Critic methods
   - Advantage estimation

4. **Advanced Algorithms**
   - Proximal Policy Optimization (PPO)
   - Deep Deterministic Policy Gradient (DDPG)
   - Soft Actor-Critic (SAC)

5. **Environments**
   - OpenAI Gym
   - Custom environments
   - Reward shaping
   - Environment wrappers

**Practical Project**:
- Implement DQN for CartPole
- Train agent for Atari games
- Build custom RL environment

**Real-World Applications**:
- Game AI
- Robotics control
- Resource optimization
- Trading strategies

---

### I10: Model Interpretability and Explainable AI
**File**: `Intermediate | I10 - Model Interpretability and Explainable AI.ipynb`  
**Duration**: 4 hours

**Learning Objectives**:
- Understand importance of interpretability
- Implement various explanation methods
- Master feature importance techniques
- Visualize model decisions

**Topics Covered**:
1. **Interpretability Fundamentals**
   - Why interpretability matters
   - Global vs local explanations
   - Model-agnostic vs model-specific
   - Trade-offs: accuracy vs interpretability

2. **Feature Importance**
   - Permutation importance
   - SHAP (SHapley Additive exPlanations)
   - LIME (Local Interpretable Model-agnostic Explanations)
   - Integrated gradients

3. **Visualization Techniques**
   - Saliency maps
   - Grad-CAM (Gradient-weighted Class Activation Mapping)
   - Attention visualization
   - Layer-wise relevance propagation

4. **Model-Specific Methods**
   - Decision tree visualization
   - Linear model coefficients
   - Neural network activation analysis
   - Embedding visualization

5. **Practical Considerations**
   - Debugging models
   - Building trust
   - Regulatory compliance
   - Bias detection

**Practical Project**:
- Implement SHAP for model explanation
- Create Grad-CAM visualizations
- Build interpretability dashboard

**Real-World Applications**:
- Healthcare diagnostics
- Financial services
- Legal applications
- Autonomous systems

---

## Learning Path Recommendations

### Recommended Order:
1. **Computer Vision Track**: I1 → I2 → I5 → I6 → I10
2. **NLP Track**: I3 → I4 → I7 → I10
3. **General ML Track**: I1 → I3 → I8 → I9 → I10
4. **Complete Track**: I1 → I2 → I3 → I4 → I5 → I6 → I7 → I8 → I9 → I10

### Prerequisites Check:
Before starting intermediate lessons, ensure mastery of:
- Neural network fundamentals (L6)
- CNNs (L7)
- RNNs (L8)
- Transformers (L9)
- Data preprocessing (L11)
- Model evaluation (L12)

---

## Key Learning Outcomes

After completing all 10 intermediate lessons, students will:

**Technical Skills**:
- Implement state-of-the-art architectures
- Build production-quality models
- Handle complex data types (images, text, graphs)
- Train generative models
- Develop RL agents
- Explain model decisions

**Conceptual Understanding**:
- Advanced architecture design principles
- Training stabilization techniques
- Transfer learning strategies
- Generative modeling
- Reinforcement learning framework
- Model interpretability

**Career Advancement**:
- Research paper implementation
- Kaggle competition expertise
- Industry ML engineering
- AI research positions
- Specialized domain expertise

---

## Assessment and Projects

### Mini-Projects (1-2 hours each):
- Implement architecture from paper
- Fine-tune pre-trained model
- Build custom dataset pipeline
- Create visualization tool

### Major Projects (5-10 hours each):
- End-to-end computer vision system
- Production NLP application
- Generative art project
- RL game agent
- Interpretability framework

### Capstone Project (20-30 hours):
Combine multiple intermediate concepts:
- Multi-modal learning system
- Production ML pipeline
- Research paper reproduction
- Novel architecture design

---

## Resources and References

### Essential Papers:
- ResNet: "Deep Residual Learning for Image Recognition"
- YOLO: "You Only Look Once: Unified, Real-Time Object Detection"
- BERT: "BERT: Pre-training of Deep Bidirectional Transformers"
- GAN: "Generative Adversarial Networks"
- VAE: "Auto-Encoding Variational Bayes"
- GNN: "Semi-Supervised Classification with Graph Convolutional Networks"
- DQN: "Playing Atari with Deep Reinforcement Learning"

### Recommended Books:
- "Deep Learning" by Goodfellow, Bengio, Courville
- "Hands-On Machine Learning" by Aurélien Géron
- "Reinforcement Learning" by Sutton and Barto
- "Natural Language Processing with Transformers" by Tunstall et al.

### Online Resources:
- Papers with Code
- Hugging Face documentation
- PyTorch tutorials
- TensorFlow advanced guides

---

## Next Steps

After completing intermediate lessons:
1. Move to Expert lessons (E1-E10)
2. Contribute to open-source projects
3. Participate in research
4. Publish papers or blog posts
5. Build production systems

---

**Total Intermediate Curriculum**: 44 hours of focused learning
**Skill Level After Completion**: Advanced ML practitioner ready for expert topics

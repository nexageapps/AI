# COMPSCI 714 Lecture 2: Neural Networks - Supplementary Guide

**Course:** COMPSCI 714 - AI Architecture and Design  
**Institution:** University of Auckland  
**Lecture:** 2 - Neural Networks Fundamentals  
**Repository Alignment:** Basic Level (B01-B05)

---

## ⚠️ Important Disclaimer

This supplementary document is an **independent educational resource** created to help students understand neural network concepts covered in COMPSCI 714 Lecture 2. This is **NOT official course material** and is not affiliated with or endorsed by the University of Auckland.

**Use Responsibly:**
- This is a learning companion, not a substitute for lectures
- Understand concepts first, then implement independently
- Follow the University of Auckland's Academic Integrity Policy
- Use for learning and understanding, not for copying solutions

---

## Table of Contents

1. [Lecture 2 Topics Overview](#lecture-2-topics-overview)
2. [Artificial Neuron Anatomy](#artificial-neuron-anatomy)
3. [Linear Algebra Representation](#linear-algebra-representation)
4. [The Perceptron (Rosenblatt, 1958)](#the-perceptron-rosenblatt-1958)
5. [Multilayer Perceptron (MLP)](#multilayer-perceptron-mlp)
6. [Deep Neural Networks (DNN)](#deep-neural-networks-dnn)
7. [Hierarchical Feature Learning](#hierarchical-feature-learning)
8. [Universal Function Approximation Theorem](#universal-function-approximation-theorem)
9. [Gradient Descent and Steepest Descent](#gradient-descent-and-steepest-descent)
10. [Repository Mapping](#repository-mapping)
11. [Practical Implementation Guide](#practical-implementation-guide)

---

## Lecture 2 Topics Overview

COMPSCI 714 Lecture 2 covers the following key concepts:

1. **Artificial Neuron** — inputs, weights, bias, pre-activation value (z), activation function g(z), output
2. **Linear Algebra Representation** — vector notation: y = g(wᵀx + b)
3. **The Perceptron (Rosenblatt, 1958)** — binary decision neuron, step activation function
4. **Multilayer Perceptron (MLP)** — fully connected, feedforward, nonlinear activation functions
5. **Deep Neural Network (DNN)** — at least 2 hidden layers, softmax output, activation value formula
6. **Intuition about Deep Feature Representation** — hierarchical feature learning across layers
7. **Neural Networks Properties** — Universal Function Approximation theorem (informal)
8. **Universal Function Approximation Theorem** — Hornik theorems 1 & 2 (formal statements)
9. **Intuition for the Theorem** — how two neurons combine to form a bump function
10. **Gradient Descent** — update rule using partial derivatives, vector notation with gradient ∇g(w)
11. **Steepest Descent** — iterative stepping in the direction of steepest descent

---

## Artificial Neuron Anatomy

### Components of an Artificial Neuron

An artificial neuron is the fundamental building block of neural networks, inspired by biological neurons.

```
Input Layer          Computation          Output
    x₁ ──────w₁────┐
    x₂ ──────w₂────┤
    x₃ ──────w₃────┼──→ z = Σ(wᵢxᵢ) + b ──→ a = g(z) ──→ output
    ...             │
    xₙ ──────wₙ────┘
         +b (bias)
```

### Mathematical Components

1. **Inputs (x)**: x = [x₁, x₂, ..., xₙ]
   - Features from the dataset or previous layer
   - Example: pixel values, word embeddings, sensor readings

2. **Weights (w)**: w = [w₁, w₂, ..., wₙ]
   - Learnable parameters that determine input importance
   - Adjusted during training via backpropagation

3. **Bias (b)**: scalar value
   - Learnable parameter that shifts the activation function
   - Allows the neuron to activate even when all inputs are zero

4. **Pre-activation Value (z)**:
   ```
   z = w₁x₁ + w₂x₂ + ... + wₙxₙ + b
   z = Σᵢ wᵢxᵢ + b
   ```
   - Linear combination of inputs
   - Also called "weighted sum" or "logit"

5. **Activation Function g(z)**:
   - Introduces non-linearity
   - Common functions: sigmoid, tanh, ReLU, softmax

6. **Output (a or y)**:
   ```
   a = g(z)
   y = g(wᵀx + b)
   ```
   - Final output of the neuron
   - Passed to next layer or used as prediction

### Visual Representation

```
┌─────────────────────────────────────────────────────────┐
│                    Single Neuron                         │
│                                                          │
│  Inputs    Weights    Pre-activation    Activation      │
│    x    ×    w     →      z = wᵀx+b  →  a = g(z)       │
│                                                          │
│  [x₁]     [w₁]                                          │
│  [x₂]  ×  [w₂]  →  z = w₁x₁+w₂x₂+b  →  a = σ(z)       │
│  [x₃]     [w₃]                                          │
│           + b                                            │
└─────────────────────────────────────────────────────────┘
```

### Repository Reference

- **B01 - Arithmetic**: Tensor operations (w, x, b)
- **B02 - Linear Regression**: Linear combination (wᵀx + b)
- **B03 - Binary Classification**: Sigmoid activation g(z)
- **B05 - Neural Network Fundamentals**: Complete neuron implementation

---

## Linear Algebra Representation

### Vector Notation

The neuron computation can be elegantly expressed using linear algebra:

**Scalar Form:**
```
z = w₁x₁ + w₂x₂ + ... + wₙxₙ + b
a = g(z)
```

**Vector Form:**
```
y = g(wᵀx + b)
```

Where:
- **w** ∈ ℝⁿ: weight vector
- **x** ∈ ℝⁿ: input vector
- **b** ∈ ℝ: bias scalar
- **wᵀx**: dot product (inner product)
- **g**: activation function
- **y**: output

### Matrix Notation for Multiple Neurons

For a layer with m neurons and n inputs:

```
Z = WX + b
A = g(Z)
```

Where:
- **W** ∈ ℝᵐˣⁿ: weight matrix
- **X** ∈ ℝⁿˣᵇ: input matrix (b = batch size)
- **b** ∈ ℝᵐ: bias vector
- **Z** ∈ ℝᵐˣᵇ: pre-activation matrix
- **A** ∈ ℝᵐˣᵇ: activation matrix

### Example: Single Neuron Computation

```python
import numpy as np

# Input vector (3 features)
x = np.array([1.0, 2.0, 3.0])

# Weight vector
w = np.array([0.5, -0.3, 0.8])

# Bias
b = 0.1

# Pre-activation (dot product)
z = np.dot(w, x) + b  # or w.T @ x + b
print(f"z = {z}")  # z = 2.5

# Activation (sigmoid)
def sigmoid(z):
    return 1 / (1 + np.exp(-z))

a = sigmoid(z)
print(f"a = {a}")  # a ≈ 0.924
```

### Repository Reference

- **B01 - Arithmetic**: Vector operations, dot products
- **B02 - Linear Regression**: Matrix multiplication WX + b
- **B05 - Neural Network Fundamentals**: Layer-wise computations

---

## The Perceptron (Rosenblatt, 1958)

### Historical Context

The **Perceptron** was invented by Frank Rosenblatt in 1958 and is considered the first artificial neural network algorithm. It laid the foundation for modern deep learning.

### Perceptron Definition

A perceptron is a **binary classifier** that makes decisions using a step activation function:

```
y = step(wᵀx + b)

where step(z) = {
    1  if z ≥ 0
    0  if z < 0
}
```

### Perceptron Architecture

```
    x₁ ──w₁──┐
    x₂ ──w₂──┤
    x₃ ──w₃──┼──→ z = wᵀx + b ──→ y = step(z) ──→ {0, 1}
    ...      │
    xₙ ──wₙ──┘
         +b
```

### Step Activation Function

```
step(z) = {
    1  if z ≥ 0
    0  if z < 0
}
```

**Properties:**
- Binary output: {0, 1}
- Creates a linear decision boundary
- Not differentiable at z = 0 (problem for gradient descent)

### Perceptron Learning Rule

The perceptron updates weights based on misclassifications:

```
wᵢ ← wᵢ + η(y_true - y_pred)xᵢ
b ← b + η(y_true - y_pred)
```

Where:
- **η**: learning rate
- **y_true**: actual label
- **y_pred**: predicted label

### Limitations of the Perceptron

1. **Linear Separability**: Can only solve linearly separable problems
2. **XOR Problem**: Cannot learn XOR function (famous limitation discovered by Minsky & Papert, 1969)
3. **No Hidden Layers**: Single-layer architecture limits expressiveness

### XOR Problem Illustration

```
XOR Truth Table:
x₁  x₂  | y
----|----
0   0   | 0
0   1   | 1
1   0   | 1
1   1   | 0

No single line can separate the classes!
```

### Python Implementation

```python
import numpy as np

class Perceptron:
    def __init__(self, n_features, learning_rate=0.01):
        self.w = np.zeros(n_features)
        self.b = 0
        self.lr = learning_rate
    
    def step(self, z):
        return 1 if z >= 0 else 0
    
    def predict(self, x):
        z = np.dot(self.w, x) + self.b
        return self.step(z)
    
    def train(self, X, y, epochs=100):
        for epoch in range(epochs):
            for xi, yi in zip(X, y):
                y_pred = self.predict(xi)
                error = yi - y_pred
                self.w += self.lr * error * xi
                self.b += self.lr * error
```

### Repository Reference

- **B03 - Binary Classification**: Binary classification concepts
- **B05 - Neural Network Fundamentals**: Evolution from perceptron to MLP

---

## Multilayer Perceptron (MLP)

### Definition

A **Multilayer Perceptron (MLP)** is a feedforward neural network with:
- **Input layer**: Receives features
- **Hidden layer(s)**: One or more layers between input and output
- **Output layer**: Produces predictions
- **Nonlinear activation functions**: Enables learning complex patterns
- **Fully connected**: Every neuron connects to all neurons in the next layer

### Architecture

```
Input Layer    Hidden Layer    Output Layer
    x₁ ────────●────────●────────y₁
    x₂ ────────●────────●────────y₂
    x₃ ────────●────────●────────y₃
    ...        ...      ...
    xₙ ────────●────────●────────yₘ
```

### Key Differences from Perceptron

| Feature | Perceptron | MLP |
|---------|-----------|-----|
| Layers | 1 (input → output) | 2+ (input → hidden → output) |
| Activation | Step function | Nonlinear (ReLU, sigmoid, tanh) |
| Learning | Perceptron rule | Backpropagation |
| Capability | Linear problems | Nonlinear problems |
| XOR Problem | ❌ Cannot solve | ✅ Can solve |

### Forward Propagation in MLP

**Layer 1 (Input → Hidden):**
```
Z⁽¹⁾ = W⁽¹⁾X + b⁽¹⁾
A⁽¹⁾ = g⁽¹⁾(Z⁽¹⁾)
```

**Layer 2 (Hidden → Output):**
```
Z⁽²⁾ = W⁽²⁾A⁽¹⁾ + b⁽²⁾
A⁽²⁾ = g⁽²⁾(Z⁽²⁾)
```

Where:
- **W⁽ˡ⁾**: weight matrix for layer l
- **b⁽ˡ⁾**: bias vector for layer l
- **Z⁽ˡ⁾**: pre-activation for layer l
- **A⁽ˡ⁾**: activation for layer l
- **g⁽ˡ⁾**: activation function for layer l

### Common Activation Functions in MLPs

**Hidden Layers:**
- **ReLU**: f(z) = max(0, z) — Most popular
- **Leaky ReLU**: f(z) = max(0.01z, z)
- **Tanh**: f(z) = (eᶻ - e⁻ᶻ)/(eᶻ + e⁻ᶻ)

**Output Layer:**
- **Sigmoid**: Binary classification
- **Softmax**: Multi-class classification
- **Linear**: Regression

### Solving XOR with MLP

```python
import numpy as np

# XOR dataset
X = np.array([[0, 0], [0, 1], [1, 0], [1, 1]])
y = np.array([[0], [1], [1], [0]])

# MLP with 1 hidden layer (2 neurons)
# Input (2) → Hidden (2) → Output (1)

# This simple MLP can solve XOR!
# The hidden layer learns to separate the space
```

### Repository Reference

- **B05 - Neural Network Fundamentals**: Complete MLP implementation
- **B04 - Multi-Class Classification**: Softmax output layer

---

## Deep Neural Networks (DNN)

### Definition

A **Deep Neural Network (DNN)** is an MLP with:
- **At least 2 hidden layers** (input → hidden₁ → hidden₂ → ... → output)
- **Multiple levels of abstraction**
- **Hierarchical feature learning**

### Formal Definition

A DNN with L layers computes:

```
For layer l = 1, 2, ..., L:
    Z⁽ˡ⁾ = W⁽ˡ⁾A⁽ˡ⁻¹⁾ + b⁽ˡ⁾
    A⁽ˡ⁾ = g⁽ˡ⁾(Z⁽ˡ⁾)

Where:
    A⁽⁰⁾ = X (input)
    A⁽ᴸ⁾ = ŷ (output)
```

### Architecture Comparison

```
Perceptron (1 layer):
Input → Output

MLP (2 layers):
Input → Hidden → Output

DNN (3+ layers):
Input → Hidden₁ → Hidden₂ → ... → Hiddenₙ → Output
```

### Why "Deep"?

The term "deep" refers to the number of layers:
- **Shallow**: 1-2 layers
- **Deep**: 3+ layers
- **Very Deep**: 10+ layers (e.g., ResNet-50, ResNet-152)

### Activation Value Formula in DNNs

For neuron j in layer l:

```
z_j⁽ˡ⁾ = Σᵢ w_ji⁽ˡ⁾ a_i⁽ˡ⁻¹⁾ + b_j⁽ˡ⁾

a_j⁽ˡ⁾ = g⁽ˡ⁾(z_j⁽ˡ⁾)
```

Where:
- **z_j⁽ˡ⁾**: pre-activation of neuron j in layer l
- **w_ji⁽ˡ⁾**: weight from neuron i (layer l-1) to neuron j (layer l)
- **a_i⁽ˡ⁻¹⁾**: activation of neuron i in previous layer
- **b_j⁽ˡ⁾**: bias of neuron j in layer l
- **g⁽ˡ⁾**: activation function for layer l

### Softmax Output Layer

For multi-class classification, the output layer uses softmax:

```
ŷᵢ = softmax(zᵢ) = exp(zᵢ) / Σⱼ exp(zⱼ)
```

**Properties:**
- Outputs sum to 1: Σᵢ ŷᵢ = 1
- Interpretable as probabilities
- Used with categorical cross-entropy loss

### Example DNN Architecture

```
MNIST Digit Classification:

Input Layer:     784 neurons (28×28 pixels)
Hidden Layer 1:  128 neurons (ReLU)
Hidden Layer 2:  64 neurons (ReLU)
Output Layer:    10 neurons (Softmax)

Total: 4 layers (2 hidden layers → DNN)
```

### Repository Reference

- **B05 - Neural Network Fundamentals**: DNN implementation
- **B09 - CNNs**: Deep convolutional networks
- **B11 - Transformers**: Very deep architectures

---

## Hierarchical Feature Learning

### Intuition

DNNs learn **hierarchical representations** where:
- **Early layers**: Learn simple, low-level features
- **Middle layers**: Combine low-level features into mid-level patterns
- **Deep layers**: Learn high-level, abstract concepts

### Example: Image Recognition

```
Layer 1 (Low-level):
    Edges, corners, colors
    
Layer 2 (Mid-level):
    Textures, simple shapes
    
Layer 3 (High-level):
    Object parts (eyes, wheels, windows)
    
Layer 4 (Abstract):
    Complete objects (faces, cars, buildings)
```

### Visual Representation

```
Input Image (Cat)
       ↓
[Layer 1: Edge Detection]
  /  |  \  (vertical, horizontal, diagonal edges)
       ↓
[Layer 2: Texture & Patterns]
  /  |  \  (fur texture, whiskers, patterns)
       ↓
[Layer 3: Object Parts]
  /  |  \  (ears, eyes, nose, paws)
       ↓
[Layer 4: Complete Object]
       🐱 (Cat!)
```

### Why Hierarchical Learning Works

1. **Compositionality**: Complex concepts built from simpler ones
2. **Reusability**: Low-level features reused across different high-level concepts
3. **Efficiency**: Fewer parameters needed than flat representations
4. **Biological Inspiration**: Similar to visual cortex in human brain

### Repository Reference

- **B09 - CNNs**: Visualizing learned features in convolutional layers
- **B11 - Transformers**: Attention-based hierarchical learning

---

## Universal Function Approximation Theorem

### Informal Statement

**Neural Networks Properties:**
> A neural network with at least one hidden layer and a sufficient number of neurons can approximate any continuous function to arbitrary accuracy.

This means neural networks are **universal function approximators**.

### Formal Statement (Hornik et al., 1989)

**Theorem 1 (Existence):**
> Let φ: ℝ → ℝ be a non-constant, bounded, and continuous activation function. Let Iₘ denote the m-dimensional unit hypercube [0,1]ᵐ. The space of continuous functions on Iₘ is denoted by C(Iₘ). Then, given any ε > 0 and any function f ∈ C(Iₘ), there exists an integer N and real constants vᵢ, bᵢ, wᵢⱼ such that:
>
> F(x) = Σᵢ₌₁ᴺ vᵢ φ(Σⱼ₌₁ᵐ wᵢⱼxⱼ + bᵢ)
>
> satisfies |F(x) - f(x)| < ε for all x ∈ Iₘ

**Theorem 2 (Density):**
> The set of functions representable by a single hidden layer feedforward network is dense in C(Iₘ).

### What This Means in Plain English

1. **Any continuous function** can be approximated by a neural network
2. **One hidden layer** is theoretically sufficient
3. **Enough neurons** in that layer can achieve arbitrary accuracy
4. **Practical caveat**: "Enough neurons" might be astronomically large

### Key Insights

✅ **What the theorem guarantees:**
- Neural networks can represent any function
- Theoretical foundation for deep learning

❌ **What the theorem does NOT guarantee:**
- How to find the right weights (training)
- How many neurons are needed
- Whether the network will generalize
- Computational efficiency

### Intuition: Two Neurons Form a Bump Function

This is the key insight for understanding the theorem!

**Step 1: Single ReLU Neuron**
```
f₁(x) = ReLU(x - a) = max(0, x - a)

Creates a "ramp" starting at x = a
```

**Step 2: Second ReLU Neuron**
```
f₂(x) = ReLU(x - b) = max(0, x - b)

Creates another "ramp" starting at x = b
```

**Step 3: Combine with Weights**
```
bump(x) = w₁·ReLU(x - a) + w₂·ReLU(x - b)

With w₁ = 1 and w₂ = -1:
bump(x) = ReLU(x - a) - ReLU(x - b)

This creates a "bump" between a and b!
```

### Visual Representation

```
ReLU(x - a):          ReLU(x - b):         Bump = f₁ - f₂:
    |                     |                     |    /‾‾\
    |    /                |       /             |   /    \
    |   /                 |      /              |  /      \
    |  /                  |     /               | /        \
    | /                   |    /                |/          \
────┴────────         ────┴────────         ────┴────────────
    a                     b                   a    b
```

### Building Any Function

By combining many bump functions:
1. **Approximate any curve** with enough bumps
2. **Each bump** = 2 neurons
3. **More bumps** = better approximation
4. **Limit** → perfect approximation

### Mathematical Formulation

```
f(x) ≈ Σᵢ₌₁ᴺ cᵢ · bump_i(x)

where each bump_i uses 2 neurons

Total neurons needed: 2N
```

### Repository Reference

- **B05 - Neural Network Fundamentals**: Activation functions and approximation
- **B02 - Linear Regression**: Function approximation basics

---

## Gradient Descent and Steepest Descent

### Gradient Descent Overview

**Goal**: Minimize a loss function L(w) by iteratively updating weights

**Core Idea**: Move in the direction that decreases the loss most rapidly

### Mathematical Formulation

**Update Rule:**
```
w ← w - η∇L(w)
```

Where:
- **w**: weight vector (parameters)
- **η**: learning rate (step size)
- **∇L(w)**: gradient of loss with respect to weights
- **∇**: nabla operator (gradient)

### Gradient Vector Notation

The gradient ∇L(w) is a vector of partial derivatives:

```
∇L(w) = [∂L/∂w₁, ∂L/∂w₂, ..., ∂L/∂wₙ]ᵀ
```

For a neural network with weights W and biases b:

```
∇L = {∂L/∂W, ∂L/∂b}
```

### Partial Derivatives

For each weight wᵢ:

```
∂L/∂wᵢ = lim[h→0] (L(w + heᵢ) - L(w)) / h
```

Where eᵢ is the unit vector in direction i.

### Steepest Descent

**Definition**: Gradient descent is also called **steepest descent** because:
- The gradient ∇L(w) points in the direction of **steepest ascent**
- The negative gradient -∇L(w) points in the direction of **steepest descent**
- We move in the direction that decreases loss most rapidly

### Geometric Intuition

```
Loss Surface (2D):

        High Loss
           ↑
           |    ╱╲
           |   ╱  ╲
           |  ╱    ╲
           | ╱  ●   ╲  ← Current position
           |╱   ↓    ╲
           ╱  ∇L(w)   ╲
          ╱      ↓     ╲
         ╱        ●     ╲ ← After update
        ╱          ↓     ╲
       ╱            ★     ╲ ← Minimum
      ────────────────────────→
           Low Loss
```

### Gradient Descent Algorithm

```python
# Initialize weights
w = initialize_weights()

# Training loop
for epoch in range(num_epochs):
    # Forward pass
    predictions = forward(X, w)
    
    # Compute loss
    loss = compute_loss(predictions, y)
    
    # Compute gradient
    grad = compute_gradient(X, y, w)
    
    # Update weights (steepest descent)
    w = w - learning_rate * grad
```

### Vector Notation Example

```python
import numpy as np

# Loss function: L(w) = (w₁² + w₂²)
def loss(w):
    return np.sum(w ** 2)

# Gradient: ∇L(w) = [2w₁, 2w₂]
def gradient(w):
    return 2 * w

# Gradient descent
w = np.array([5.0, 3.0])  # Initial weights
learning_rate = 0.1

for step in range(10):
    grad = gradient(w)
    w = w - learning_rate * grad
    print(f"Step {step}: w = {w}, L(w) = {loss(w):.4f}")
```

### Learning Rate Importance

```
η too small:  Slow convergence
η optimal:    Fast convergence
η too large:  Divergence (overshooting)
```

### Variants of Gradient Descent

1. **Batch Gradient Descent**: Use all training data
   ```
   ∇L(w) = (1/N) Σᵢ₌₁ᴺ ∇L(w; xᵢ, yᵢ)
   ```

2. **Stochastic Gradient Descent (SGD)**: Use one sample
   ```
   ∇L(w) ≈ ∇L(w; xᵢ, yᵢ)
   ```

3. **Mini-batch Gradient Descent**: Use small batch
   ```
   ∇L(w) ≈ (1/B) Σᵢ∈batch ∇L(w; xᵢ, yᵢ)
   ```

### Repository Reference

- **B02 - Linear Regression**: Gradient descent implementation
- **B05 - Neural Network Fundamentals**: Backpropagation and gradient computation
- **I01 - Advanced Optimization**: Adam, RMSprop, momentum

---

## Repository Mapping

### How COMPSCI 714 Lecture 2 Maps to Repository Lessons

| Lecture 2 Topic | Repository Lesson | Section |
|----------------|-------------------|---------|
| Artificial Neuron | B05 - Neural Network Fundamentals | Section 1-2 |
| Linear Algebra Representation | B01 - Arithmetic | Tensor operations |
| The Perceptron (1958) | B03 - Binary Classification | Historical context |
| Multilayer Perceptron | B05 - Neural Network Fundamentals | Section 3-4 |
| Deep Neural Networks | B05 - Neural Network Fundamentals | Section 5 |
| Hierarchical Features | B09 - CNNs | Feature visualization |
| Universal Approximation | B05 - Neural Network Fundamentals | Theory section |
| Gradient Descent | B02 - Linear Regression | Optimization |
| Steepest Descent | B02 - Linear Regression | Gradient computation |

### Recommended Learning Path

**Before Lecture 2:**
1. Complete B01 - Arithmetic (tensor operations)
2. Complete B02 - Linear Regression (gradient descent)
3. Complete B03 - Binary Classification (perceptron basics)

**During Lecture 2:**
1. Follow lecture with this supplement
2. Reference B05 for practical implementations
3. Run code examples in notebooks

**After Lecture 2:**
1. Complete B05 - Neural Network Fundamentals (full implementation)
2. Practice with B14 assignments
3. Explore B09 for hierarchical feature learning

---

## Practical Implementation Guide

### Quick Start: Implementing Lecture 2 Concepts

**1. Artificial Neuron (5 minutes)**
```python
# See: B05 - Neural Network Fundamentals, Section 1
import numpy as np

x = np.array([1.0, 2.0, 3.0])  # inputs
w = np.array([0.5, -0.3, 0.8])  # weights
b = 0.1  # bias

z = np.dot(w, x) + b  # pre-activation
a = 1 / (1 + np.exp(-z))  # activation (sigmoid)
```

**2. Perceptron (10 minutes)**
```python
# See: B03 - Binary Classification
# Implement step function and perceptron learning rule
```

**3. MLP (20 minutes)**
```python
# See: B05 - Neural Network Fundamentals, Section 3
# Build 2-layer network with TensorFlow/Keras
```

**4. Gradient Descent (15 minutes)**
```python
# See: B02 - Linear Regression
# Implement gradient descent from scratch
```

### Hands-On Exercises

**Exercise 1: Build a Perceptron**
- Implement Rosenblatt's perceptron from scratch
- Train on linearly separable data
- Visualize decision boundary

**Exercise 2: Solve XOR with MLP**
- Build 2-layer MLP
- Train on XOR dataset
- Verify it solves the problem

**Exercise 3: Visualize Gradient Descent**
- Plot loss surface
- Show gradient vectors
- Animate optimization path

**Exercise 4: Universal Approximation**
- Approximate sin(x) with neural network
- Vary number of neurons
- Plot approximation quality

### Assessment Preparation

**Key Concepts to Master:**
1. ✅ Neuron components (x, w, b, z, g(z), a)
2. ✅ Vector notation (y = g(wᵀx + b))
3. ✅ Perceptron vs MLP vs DNN
4. ✅ Activation functions and their properties
5. ✅ Universal approximation theorem
6. ✅ Gradient descent mathematics
7. ✅ Backpropagation (chain rule)

**Practice Problems:**
- Compute forward pass by hand
- Calculate gradients manually
- Explain why perceptron can't solve XOR
- Prove bump function construction
- Derive gradient descent update rule

---

## Additional Resources

### Repository Notebooks
- **B01 - Arithmetic**: Tensor operations foundation
- **B02 - Linear Regression**: Gradient descent basics
- **B03 - Binary Classification**: Perceptron and sigmoid
- **B04 - Multi-Class Classification**: Softmax and DNNs
- **B05 - Neural Network Fundamentals**: Complete MLP/DNN implementation

### External Resources
- Hornik et al. (1989): "Multilayer feedforward networks are universal approximators"
- Rosenblatt (1958): "The Perceptron: A Probabilistic Model"
- Nielsen, M.: "Neural Networks and Deep Learning" (Chapter 4)
- Goodfellow et al.: "Deep Learning" (Chapter 6)

### University of Auckland Resources
- COMPSCI 714 Lecture Slides
- Canvas course materials
- Office hours with instructors
- Study groups and tutorials

---

## Summary

This supplement bridges COMPSCI 714 Lecture 2 theory with practical implementations in this repository:

✅ **Artificial Neuron**: Understand all components (x, w, b, z, g(z), a)  
✅ **Linear Algebra**: Master vector notation (y = g(wᵀx + b))  
✅ **Perceptron**: Historical context and limitations  
✅ **MLP**: Solve nonlinear problems with hidden layers  
✅ **DNN**: Deep architectures with hierarchical learning  
✅ **Universal Approximation**: Theoretical foundation  
✅ **Gradient Descent**: Optimization mathematics  

**Next Steps:**
1. Complete B05 - Neural Network Fundamentals
2. Practice with B14 assignments
3. Build projects from B15
4. Prepare for exams with this guide

---

**Author:** Karthik Arjun  
**LinkedIn:** [karthik-arjun-a5b4a258](https://www.linkedin.com/in/karthik-arjun-a5b4a258/)  
**Repository:** [AI & ML Roadmap](https://github.com/nexageapps/AI)  
**Last Updated:** March 2026

---

**Disclaimer:** This is an independent educational resource created by a student for students. Not affiliated with or endorsed by the University of Auckland. Use responsibly and follow your institution's academic integrity policies.

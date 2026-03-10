# COMPSCI 714 – AI Architecture and Design: Detailed Practical Examples

**Course Focus:** Neural network architectures, deep learning design patterns, and system-level AI design.

**📚 Complete Course Guide:** [COMPSCI 714 Complete Guide](./courses/COMPSCI_714_COMPLETE_GUIDE.md)

**Lecture Coverage:**
- **Lecture 2:** Neural Networks - Artificial neurons, perceptron, MLP, DNN, Universal Function Approximation → [Details](./courses/COMPSCI_714_LECTURE_2.md)
- **Lecture 3:** Training & Optimization - Gradient descent, backpropagation, learning rates, batch variants → [Details](./courses/COMPSCI_714_LECTURE_3.md)

---

## Example 1: Neural Network from Scratch with Visualization

**What You'll Build:** A multi-layer perceptron (MLP) implementation from scratch that solves the XOR problem with real-time decision boundary visualization showing how the network learns.

**Learning Outcomes:**
- Understand how individual neurons compute weighted sums and apply activation functions
- Implement forward propagation through multiple layers
- Code backpropagation algorithm and gradient computation from first principles
- Visualize how decision boundaries evolve during training
- Understand the relationship between network architecture and learning capacity

**Technologies:**
- Python 3.8+
- NumPy for numerical computation
- Matplotlib for visualization
- Jupyter Notebook or Google Colab for interactive development

**Implementation Steps:**
1. **Set up environment:** Create a Python notebook with NumPy and Matplotlib. Define helper functions for activation functions (sigmoid, ReLU, tanh) and their derivatives.
2. **Implement neuron class:** Create a Neuron class that stores weights and biases, computes weighted sum, applies activation function, and stores intermediate values for backprop.
3. **Build MLP architecture:** Implement a Network class that chains neurons into layers. Support variable layer sizes and activation functions. Implement forward pass through all layers.
4. **Code backpropagation:** Implement backward pass using chain rule. Compute gradients for weights and biases. Update parameters using gradient descent with configurable learning rate.
5. **Train on XOR:** Create XOR dataset (4 samples). Train network to learn XOR function. Track loss over epochs and verify convergence.
6. **Visualize decision boundary:** Create 2D grid of points, predict class for each point, plot decision boundary. Animate boundary changes during training to show learning progression.
7. **Experiment and extend:** Try different layer sizes, activation functions, and learning rates. Observe how these affect learning speed and decision boundary shape.

**Common Challenges & Tips**:
- **Challenge:** Gradients become very small (vanishing gradients) with sigmoid activation
  - **Solution:** Use ReLU activation for hidden layers, sigmoid only for output. Start with small networks to debug before scaling up.
- **Challenge:** Network doesn't converge or loss oscillates wildly
  - **Solution:** Reduce learning rate, check gradient computation against numerical gradient checking, verify weight initialization is not too large.
- **Challenge:** Visualization is slow or unclear
  - **Solution:** Reduce grid resolution for faster plotting, use contour plots instead of scatter plots for cleaner visualization, save frames and create animation.

**Repository Resources:** [B05 - Neural Networks](../Basic/B05%20-%20Neural%20Network%20Fundamentals.ipynb), [B05a - Neural Networks Theory](../Basic/B05a%20-%20Neural%20Networks%20Theory.ipynb), [Lecture 2 Guide](./courses/COMPSCI_714_LECTURE_2.md)

**Extension Ideas:**
- Add more activation functions (Leaky ReLU, ELU) and compare their learning dynamics
- Implement batch normalization to stabilize training
- Create interactive Jupyter widgets to adjust hyperparameters in real-time
- Extend to multi-class classification on MNIST digits
- Implement momentum or adaptive learning rates (simple versions)

---

## Example 2: Gradient Descent Variants Comparison

**What You'll Build:** Implementations of batch gradient descent, stochastic gradient descent (SGD), and mini-batch gradient descent with side-by-side convergence comparison on test functions.

**Learning Outcomes:**
- Understand the mathematical differences between GD variants
- Implement each variant from scratch without ML frameworks
- Analyze how batch size affects convergence speed and stability
- Visualize convergence behavior and learning curves
- Understand trade-offs between computation and convergence quality

**Technologies:**
- Python 3.8+
- NumPy for numerical computation
- Matplotlib for convergence plots
- Pandas for organizing and comparing results
- Jupyter Notebook for interactive experimentation

**Implementation Steps:**
1. **Set up test functions:** Define simple optimization problems (e.g., quadratic function, Rosenbrock function, 2D Gaussian). These should be easy to visualize and understand.
2. **Implement batch GD:** Code batch gradient descent that uses all samples to compute gradient. Track loss at each epoch. Implement with configurable learning rate.
3. **Implement SGD:** Code stochastic GD that updates after each sample. Shuffle data each epoch. Track loss and observe noisier convergence compared to batch GD.
4. **Implement mini-batch GD:** Code mini-batch variant with configurable batch size. Implement efficient batching using NumPy. Track loss per batch and per epoch.
5. **Create test harness:** Write code to run all three variants on same problem with same learning rate. Collect convergence data (loss vs. iteration, loss vs. time).
6. **Visualize results:** Create plots showing convergence curves for all three methods. Show loss vs. iterations and loss vs. wall-clock time. Create 2D contour plots showing optimization path.
7. **Analyze and compare:** Measure convergence speed, final loss, stability. Create summary table comparing methods. Experiment with different learning rates and batch sizes.

**Common Challenges & Tips**:
- **Challenge:** SGD is too noisy and doesn't converge smoothly
  - **Solution:** This is expected! Use learning rate decay or momentum to smooth convergence. Explain why noise is actually beneficial for escaping local minima.
- **Challenge:** Batch size selection is unclear
  - **Solution:** Try batch sizes: 1 (SGD), 32, 64, 128, full dataset. Plot convergence for each. Observe trade-off between noise and computation.
- **Challenge:** Learning rate tuning is tedious
  - **Solution:** Implement simple learning rate schedule (e.g., decay by 0.1 every N epochs). Show how this improves convergence.

**Repository Resources:** [B02 - Gradient Descent](../Basic/B02%20-%20Gradient%20Descent.ipynb), [B05 - Neural Networks](../Basic/B05%20-%20Neural%20Network%20Fundamentals.ipynb), [Lecture 3 Guide](./courses/COMPSCI_714_LECTURE_3.md), [I01 - Advanced Optimizers](../Intermediate/I01%20-%20Advanced%20Optimizers.ipynb)

**Extension Ideas:**
- Implement momentum and Nesterov momentum variants
- Add adaptive learning rate methods (AdaGrad, RMSprop, Adam)
- Test on actual neural network training (not just test functions)
- Implement learning rate scheduling strategies
- Create interactive visualization showing optimization path in real-time

---

## Example 3: CNN Filter Visualization Tool

**What You'll Build:** A convolutional neural network trained on MNIST with interactive tools to visualize learned filters, activation maps, and how the network processes images through layers.

**Learning Outcomes:**
- Understand how convolution operations extract features from images
- Visualize what different filters learn to detect
- Understand how features become increasingly abstract through layers
- Interpret CNN behavior and learned representations
- Build intuition about why CNNs work well for vision tasks

**Technologies:**
- PyTorch or TensorFlow (choose one)
- Matplotlib for static visualizations
- Torchvision or TensorFlow Datasets for MNIST
- Jupyter Widgets for interactive controls
- Jupyter Notebook or Google Colab

**Implementation Steps:**
1. **Set up environment:** Install PyTorch/TensorFlow and required libraries. Load MNIST dataset. Split into train/validation/test sets.
2. **Build CNN architecture:** Implement simple CNN with 2-3 convolutional layers, pooling, and fully connected layers. Keep architecture small for fast training and easy visualization.
3. **Train on MNIST:** Train CNN for 5-10 epochs. Track training and validation accuracy. Save trained model. Aim for >95% accuracy.
4. **Extract and visualize filters:** Extract weight matrices from first convolutional layer. Visualize as image grids. Observe that early filters detect edges and simple patterns.
5. **Visualize activation maps:** For a test image, compute activations at each layer. Visualize activation maps showing what each filter responds to. Create grid of activation visualizations.
6. **Create interactive dashboard:** Build Jupyter widget interface allowing users to: select test image, choose layer to visualize, see activation maps and filter responses, compare different images.
7. **Analyze learned features:** Visualize filters from different layers. Explain how early layers detect simple features while deeper layers detect complex patterns.

**Common Challenges & Tips**:
- **Challenge:** Visualizing high-dimensional activation maps is confusing
  - **Solution:** Use heatmaps with color intensity showing activation strength. Normalize activations for better visibility. Show only top-k most activated filters.
- **Challenge:** Interactive widgets are slow or unresponsive
  - **Solution:** Pre-compute activations for all test images before creating widgets. Use efficient NumPy operations. Reduce image resolution if needed.
- **Challenge:** Interpreting what filters learn is difficult
  - **Solution:** Compare filters across layers to see progression from simple to complex. Visualize images that maximally activate each filter. Read papers on CNN visualization.

**Repository Resources:** [B09 - Convolutional Neural Networks](../Basic/B09%20-%20Convolutional%20Neural%20Networks.ipynb), [B14 - Projects](../Basic/B14%20-%20Projects.ipynb)

**Extension Ideas:**
- Implement Grad-CAM to visualize which image regions are important for predictions
- Create style transfer using learned filters from different layers
- Implement feature inversion to generate images that activate specific filters
- Build adversarial examples and visualize how small perturbations fool the network
- Create comparison visualizations showing how different architectures learn different features

---

## Example 4: Attention Mechanism Visualizer

**What You'll Build:** A simple attention layer implementation with visualization of attention weights for a sequence-to-sequence task, showing which input elements the model focuses on when generating output.

**Learning Outcomes:**
- Understand query-key-value mechanism in attention
- Implement attention computation from scratch
- Understand how attention weights are computed and normalized
- Visualize attention patterns as heatmaps
- Build intuition about why attention is powerful for sequence tasks

**Technologies:**
- PyTorch or TensorFlow
- Matplotlib or Seaborn for attention heatmaps
- Simple text dataset (e.g., character-level sequences or small vocabulary)
- Jupyter Notebook or Google Colab

**Implementation Steps:**
1. **Set up environment:** Install PyTorch/TensorFlow. Create simple sequence-to-sequence task (e.g., reverse sequences, copy sequences, simple translation).
2. **Implement attention layer:** Code query, key, value projections. Implement scaled dot-product attention: compute scores, apply softmax, compute weighted sum. Handle numerical stability.
3. **Build seq2seq model:** Create encoder-decoder architecture with attention. Encoder processes input sequence, decoder generates output with attention over encoder outputs.
4. **Create toy dataset:** Generate simple sequences for training (e.g., reverse task: input "abc" → output "cba"). Create 1000-5000 training examples.
5. **Train model:** Train seq2seq model with attention. Track loss and accuracy. Aim for >90% accuracy on toy task.
6. **Extract attention weights:** For test examples, extract attention weight matrices from attention layer. These show which input positions the decoder attends to at each output step.
7. **Visualize attention:** Create heatmaps showing attention weights. Rows = output positions, columns = input positions, color intensity = attention weight. Create multiple visualizations for different examples.
8. **Analyze patterns:** Examine attention patterns. For reverse task, observe that output position i attends to input position n-i. Explain what attention patterns reveal about model behavior.

**Common Challenges & Tips**:
- **Challenge:** Attention scores become very large, causing softmax to output near one-hot vectors
  - **Solution:** Use scaled dot-product attention (divide by sqrt(d_k)). This is standard practice. Verify softmax produces reasonable probability distributions.
- **Challenge:** Model doesn't learn or attention is random
  - **Solution:** Start with very simple task (copy task is easier than reverse). Verify gradient flow. Check that attention layer is actually being used (not ignored by model).
- **Challenge:** Attention heatmaps are hard to interpret
  - **Solution:** Use clear color schemes (white=high attention, dark=low). Add labels showing input/output tokens. Normalize heatmaps for consistent color scale across examples.

**Repository Resources:** [B11 - Attention and Transformers](../Basic/B11%20-%20Attention%20and%20Transformers.ipynb), [B13 - Mini Language Model](../Basic/B13%20-%20Mini%20Language%20Model.ipynb)

**Extension Ideas:**
- Implement multi-head attention and visualize different attention heads
- Add positional encoding to handle sequence order
- Extend to actual machine translation task with real language pairs
- Implement self-attention (attention over same sequence)
- Create interactive visualization showing attention patterns as you type input

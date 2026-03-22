#!/usr/bin/env python3
"""Add exercise sections to Basic lesson notebooks."""
import json
import sys

# Define exercises for each notebook
EXERCISES = {
    "Basic/B02 - Linear Regression.ipynb": {
        "section_title": "## Exercises",
        "exercises": [
            {
                "title": "### Exercise 1: Multi-Feature Linear Regression",
                "description": "Extend the single-feature model to predict house prices using **two features**: square footage and number of bedrooms. Create synthetic data, train the model, and compare the loss with the single-feature version.\n",
                "hint": "# Hint: Use a Dense layer with input_shape=(2,) for two features\n# Create data: X = np.column_stack([sq_footage, num_bedrooms])\n# y = 100 * sq_footage + 5000 * num_bedrooms + noise\n\n# Your code here\n"
            },
            {
                "title": "### Exercise 2: Manual Gradient Descent",
                "description": "Implement gradient descent from scratch (without using `model.fit`). For the study hours → exam score dataset:\n1. Initialize weight and bias randomly\n2. Compute predictions: ŷ = w*x + b\n3. Compute MSE loss\n4. Compute gradients ∂L/∂w and ∂L/∂b\n5. Update parameters and plot the loss curve\n",
                "hint": "# Manual gradient descent\nimport numpy as np\nimport matplotlib.pyplot as plt\n\n# Data\nX = np.array([1, 2, 3, 4, 5, 6, 7, 8], dtype=np.float32)\ny = np.array([45, 50, 55, 60, 65, 70, 75, 80], dtype=np.float32)\n\nw = np.random.randn()\nb = np.random.randn()\nlr = 0.01\nlosses = []\n\nfor epoch in range(100):\n    # Your code here: forward pass, loss, gradients, update\n    pass\n\n# Plot losses\n# plt.plot(losses)\n"
            }
        ]
    },
    "Basic/B03 - Binary Classification.ipynb": {
        "section_title": "## Exercises",
        "exercises": [
            {
                "title": "### Exercise 1: Sigmoid from Scratch",
                "description": "Implement the sigmoid function manually using NumPy (without using `tf.keras`). Plot the sigmoid curve for values from -10 to 10. Then compute the sigmoid for the values [-5, -1, 0, 1, 5] and verify they match the expected outputs.\n",
                "hint": "import numpy as np\nimport matplotlib.pyplot as plt\n\ndef sigmoid(z):\n    \"\"\"Implement sigmoid: σ(z) = 1 / (1 + e^(-z))\"\"\"\n    # Your code here\n    pass\n\n# Plot sigmoid curve\n# z = np.linspace(-10, 10, 200)\n# plt.plot(z, sigmoid(z))\n\n# Test values\n# test_vals = [-5, -1, 0, 1, 5]\n# for v in test_vals:\n#     print(f\"sigmoid({v}) = {sigmoid(v):.4f}\")\n"
            },
            {
                "title": "### Exercise 2: Decision Boundary Visualization",
                "description": "Using the pass/fail dataset from the lesson, train a binary classifier and then plot the **decision boundary**. The decision boundary is the line where the model's predicted probability equals 0.5.\n\n*Hint: For a single-feature model y = σ(wx + b), the boundary is at x = -b/w*\n",
                "hint": "# After training your model, extract weights:\n# w, b = model.layers[0].get_weights()\n# boundary = -b[0] / w[0][0]\n# print(f\"Decision boundary at x = {boundary:.2f}\")\n\n# Plot the data points and the decision boundary line\n# Your code here\n"
            }
        ]
    },
    "Basic/B04 - Multi-Class Classification.ipynb": {
        "section_title": "## Exercises",
        "exercises": [
            {
                "title": "### Exercise 1: Softmax by Hand",
                "description": "Implement the softmax function from scratch using NumPy. Given the logits `[2.0, 1.0, 0.1]`, compute the softmax probabilities manually and verify they sum to 1.0. Then compare your result with `tf.nn.softmax`.\n",
                "hint": "import numpy as np\n\ndef softmax(logits):\n    \"\"\"Compute softmax: softmax(z_i) = e^(z_i) / Σ e^(z_j)\"\"\"\n    # Your code here\n    pass\n\n# Test\nlogits = [2.0, 1.0, 0.1]\n# probs = softmax(logits)\n# print(f\"Probabilities: {probs}\")\n# print(f\"Sum: {sum(probs):.4f}\")  # Should be 1.0\n"
            },
            {
                "title": "### Exercise 2: Fashion MNIST Classifier",
                "description": "Replace the MNIST digit dataset with **Fashion MNIST** (`tf.keras.datasets.fashion_mnist`). Build and train a multi-class classifier to recognize clothing items (T-shirt, trouser, pullover, etc.). Compare the accuracy with the digit classifier.\n",
                "hint": "# Fashion MNIST has the same shape as MNIST (28x28 grayscale)\n# but classifies 10 clothing categories instead of digits\n\n# (X_train, y_train), (X_test, y_test) = tf.keras.datasets.fashion_mnist.load_data()\n# class_names = ['T-shirt', 'Trouser', 'Pullover', 'Dress', 'Coat',\n#                'Sandal', 'Shirt', 'Sneaker', 'Bag', 'Ankle boot']\n\n# Your code here: normalize, build model, train, evaluate\n"
            }
        ]
    },
    "Basic/B05 - Neural Network Fundamentals.ipynb": {
        "section_title": "## Exercises",
        "exercises": [
            {
                "title": "### Exercise 1: Activation Function Comparison",
                "description": "Build two identical neural networks for the XOR problem — one using **ReLU** activation and one using **sigmoid** activation in the hidden layers. Train both for the same number of epochs and compare:\n1. Training loss curves\n2. Final accuracy\n3. Number of epochs to converge\n",
                "hint": "import tensorflow as tf\nimport numpy as np\n\n# XOR data\nX = np.array([[0,0], [0,1], [1,0], [1,1]], dtype=np.float32)\ny = np.array([[0], [1], [1], [0]], dtype=np.float32)\n\n# Model 1: ReLU hidden layers\n# model_relu = tf.keras.Sequential([...])\n\n# Model 2: Sigmoid hidden layers\n# model_sigmoid = tf.keras.Sequential([...])\n\n# Train both and compare\n# Your code here\n"
            },
            {
                "title": "### Exercise 2: Network Depth Experiment",
                "description": "Using the MNIST dataset, build three models with different depths:\n- Shallow: 1 hidden layer (128 units)\n- Medium: 2 hidden layers (128, 64 units)\n- Deep: 4 hidden layers (256, 128, 64, 32 units)\n\nTrain each for 10 epochs and compare test accuracy. Does deeper always mean better?\n",
                "hint": "# Load MNIST\n# (X_train, y_train), (X_test, y_test) = tf.keras.datasets.mnist.load_data()\n# X_train, X_test = X_train / 255.0, X_test / 255.0\n\n# Build three models with different depths\n# Train and compare test accuracy\n# Your code here\n"
            }
        ]
    },
    "Basic/B05a - Neural Networks Theory (COMPSCI 714).ipynb": {
        "section_title": "## Exercises",
        "exercises": [
            {
                "title": "### Exercise 1: Backpropagation by Hand",
                "description": "For a simple 2-layer network with one hidden unit, compute the forward pass and backward pass manually:\n- Input: x = 0.5\n- Weights: w1 = 0.3, w2 = 0.7\n- Biases: b1 = 0.1, b2 = 0.2\n- Activation: sigmoid\n- Target: y = 1.0\n- Loss: MSE\n\nCompute all gradients (∂L/∂w2, ∂L/∂b2, ∂L/∂w1, ∂L/∂b1) step by step.\n",
                "hint": "import numpy as np\n\ndef sigmoid(z):\n    return 1 / (1 + np.exp(-z))\n\ndef sigmoid_derivative(z):\n    s = sigmoid(z)\n    return s * (1 - s)\n\nx, w1, b1, w2, b2, y_true = 0.5, 0.3, 0.1, 0.7, 0.2, 1.0\n\n# Forward pass\n# z1 = w1 * x + b1\n# a1 = sigmoid(z1)\n# z2 = w2 * a1 + b2\n# y_pred = sigmoid(z2)\n# loss = (y_pred - y_true) ** 2\n\n# Backward pass — compute all gradients\n# Your code here\n"
            },
            {
                "title": "### Exercise 2: Vanishing Gradient Demonstration",
                "description": "Create a deep network (10+ layers) using sigmoid activations and observe the vanishing gradient problem. Print the mean absolute gradient for each layer after one training step. Then repeat with ReLU and compare.\n",
                "hint": "import tensorflow as tf\nimport numpy as np\n\n# Create a deep sigmoid network\n# Use tf.GradientTape() to compute gradients\n# Print gradient magnitudes per layer\n\n# Your code here\n"
            }
        ]
    },
    "Basic/B05b - Training and Optimization (COMPSCI 714).ipynb": {
        "section_title": "## Exercises",
        "exercises": [
            {
                "title": "### Exercise 1: Learning Rate Finder",
                "description": "Implement a simple learning rate finder: train a model on MNIST while exponentially increasing the learning rate from 1e-6 to 1.0 over one epoch. Plot loss vs learning rate and identify the optimal range.\n",
                "hint": "# Start with lr = 1e-6, multiply by 1.1 each batch\n# Record the loss at each step\n# Plot loss vs lr (log scale on x-axis)\n# The optimal lr is just before the loss starts increasing sharply\n\n# Your code here\n"
            },
            {
                "title": "### Exercise 2: Optimizer Comparison",
                "description": "Train the same model architecture on MNIST using three different optimizers: SGD, SGD with Momentum (0.9), and Adam. Plot the training loss curves on the same graph and compare convergence speed.\n",
                "hint": "# optimizers = [\n#     tf.keras.optimizers.SGD(learning_rate=0.01),\n#     tf.keras.optimizers.SGD(learning_rate=0.01, momentum=0.9),\n#     tf.keras.optimizers.Adam(learning_rate=0.001),\n# ]\n\n# Train each and collect history.history['loss']\n# Plot all three on the same graph\n# Your code here\n"
            }
        ]
    },
    "Basic/B06 - Data Preprocessing and Feature Engineering.ipynb": {
        "section_title": "## Exercises",
        "exercises": [
            {
                "title": "### Exercise 1: Handle a Messy Dataset",
                "description": "Create a synthetic dataset with intentional issues: missing values (NaN), outliers, mixed data types, and different scales. Apply a complete preprocessing pipeline:\n1. Detect and handle missing values (try both mean imputation and median imputation)\n2. Identify and cap outliers using the IQR method\n3. Normalize numerical features using StandardScaler\n4. One-hot encode categorical features\n",
                "hint": "import numpy as np\nimport pandas as pd\nfrom sklearn.preprocessing import StandardScaler\n\n# Create messy data\n# data = pd.DataFrame({\n#     'age': [25, 30, np.nan, 35, 200, 28, 32, np.nan, 40, 33],\n#     'salary': [30000, 45000, 50000, np.nan, 60000, 35000, 70000, 55000, np.nan, 48000],\n#     'city': ['Auckland', 'Wellington', 'Auckland', 'Christchurch', None, 'Auckland', 'Wellington', 'Christchurch', 'Auckland', 'Wellington']\n# })\n\n# Your preprocessing pipeline here\n"
            },
            {
                "title": "### Exercise 2: Feature Engineering for House Prices",
                "description": "Given a house dataset with features `[sq_footage, num_rooms, year_built, lot_size]`, create at least 3 new engineered features (e.g., price_per_sqft, house_age, rooms_per_sqft). Train a model with and without the engineered features and compare performance.\n",
                "hint": "import numpy as np\nimport tensorflow as tf\n\n# Create synthetic house data\n# sq_footage = np.random.uniform(800, 3000, 200)\n# num_rooms = np.random.randint(2, 7, 200)\n# year_built = np.random.randint(1960, 2024, 200)\n# lot_size = np.random.uniform(2000, 10000, 200)\n\n# Engineer new features:\n# house_age = 2026 - year_built\n# rooms_per_sqft = num_rooms / sq_footage\n# lot_to_house_ratio = lot_size / sq_footage\n\n# Compare model performance with/without engineered features\n# Your code here\n"
            }
        ]
    },
    "Basic/B07 - Model Evaluation and Performance Metrics.ipynb": {
        "section_title": "## Exercises",
        "exercises": [
            {
                "title": "### Exercise 1: Confusion Matrix Analysis",
                "description": "Given the following predictions from a medical diagnosis model, compute the confusion matrix, then calculate precision, recall, F1-score, and accuracy **by hand** (using Python but not sklearn).\n\n```\ny_true = [1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1]\ny_pred = [1, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0]\n```\n\nThen verify your results using `sklearn.metrics`.\n",
                "hint": "import numpy as np\n\ny_true = [1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1]\ny_pred = [1, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0]\n\n# Compute TP, FP, TN, FN manually\n# TP = sum(1 for t, p in zip(y_true, y_pred) if t == 1 and p == 1)\n# ... compute FP, TN, FN\n\n# Calculate metrics\n# precision = TP / (TP + FP)\n# recall = TP / (TP + FN)\n# f1 = 2 * precision * recall / (precision + recall)\n\n# Your code here\n"
            },
            {
                "title": "### Exercise 2: ROC Curve and Threshold Selection",
                "description": "Train a binary classifier on a synthetic imbalanced dataset (90% class 0, 10% class 1). Plot the ROC curve and find the optimal threshold that maximizes the F1-score (not just accuracy). Show how different thresholds affect precision and recall.\n",
                "hint": "import numpy as np\nfrom sklearn.metrics import roc_curve, auc\nimport matplotlib.pyplot as plt\n\n# Create imbalanced dataset\n# np.random.seed(42)\n# X = np.random.randn(1000, 5)\n# y = (np.random.rand(1000) < 0.1).astype(int)  # 10% positive\n\n# Train model, get prediction probabilities\n# Try different thresholds: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9]\n# For each threshold, compute precision, recall, F1\n\n# Your code here\n"
            }
        ]
    },
    "Basic/B08 - Regularization and Overfitting.ipynb": {
        "section_title": "## Exercises",
        "exercises": [
            {
                "title": "### Exercise 1: Overfitting Demonstration",
                "description": "Create a small dataset (50 samples) and train two models:\n1. A large model (3 hidden layers, 256 units each) **without** regularization\n2. The same model **with** L2 regularization and dropout\n\nPlot training vs validation loss for both. Identify which one overfits and explain why.\n",
                "hint": "import tensorflow as tf\nimport numpy as np\n\n# Small dataset — easy to overfit\n# X = np.random.randn(50, 10).astype(np.float32)\n# y = (np.sum(X[:, :3], axis=1) > 0).astype(np.float32)\n\n# Model 1: No regularization\n# Model 2: L2 + Dropout\n# Train both with validation_split=0.3\n# Plot training vs validation loss\n\n# Your code here\n"
            },
            {
                "title": "### Exercise 2: Early Stopping Implementation",
                "description": "Train a neural network on MNIST and implement early stopping with `patience=3`. Record:\n1. At which epoch training stopped\n2. The best validation loss\n3. Compare final test accuracy with and without early stopping (train for 50 epochs without it)\n",
                "hint": "import tensorflow as tf\n\n# Load MNIST\n# early_stop = tf.keras.callbacks.EarlyStopping(\n#     monitor='val_loss', patience=3, restore_best_weights=True\n# )\n\n# model.fit(X_train, y_train, epochs=50, validation_split=0.2,\n#           callbacks=[early_stop])\n\n# Your code here\n"
            }
        ]
    },
    "Basic/B09 - Convolutional Neural Networks.ipynb": {
        "section_title": "## Exercises",
        "exercises": [
            {
                "title": "### Exercise 1: Visualize Convolutional Filters",
                "description": "Train a CNN on MNIST, then extract and visualize the learned filters from the first convolutional layer. Display them as a grid of small images. What patterns do you notice? Do any filters look like edge detectors?\n",
                "hint": "import tensorflow as tf\nimport matplotlib.pyplot as plt\nimport numpy as np\n\n# Train a simple CNN on MNIST\n# After training, extract first conv layer weights:\n# filters = model.layers[0].get_weights()[0]  # shape: (3, 3, 1, num_filters)\n\n# Plot each filter as a small image\n# fig, axes = plt.subplots(4, 8, figsize=(12, 6))\n# for i, ax in enumerate(axes.flat):\n#     if i < filters.shape[-1]:\n#         ax.imshow(filters[:, :, 0, i], cmap='gray')\n#     ax.axis('off')\n\n# Your code here\n"
            },
            {
                "title": "### Exercise 2: CNN vs Dense Network",
                "description": "Build two models for CIFAR-10 image classification:\n1. A fully-connected (Dense) network with similar parameter count\n2. A CNN with Conv2D and MaxPooling layers\n\nTrain both for 10 epochs and compare test accuracy. Why does the CNN perform better on image data?\n",
                "hint": "import tensorflow as tf\n\n# Load CIFAR-10\n# (X_train, y_train), (X_test, y_test) = tf.keras.datasets.cifar10.load_data()\n# X_train, X_test = X_train / 255.0, X_test / 255.0\n\n# Model 1: Dense only (Flatten + Dense layers)\n# Model 2: CNN (Conv2D + MaxPooling + Dense)\n\n# Compare parameter counts: model.summary()\n# Compare test accuracy after 10 epochs\n\n# Your code here\n"
            }
        ]
    },
    "Basic/B10 - Recurrent Neural Networks.ipynb": {
        "section_title": "## Exercises",
        "exercises": [
            {
                "title": "### Exercise 1: Sequence Prediction",
                "description": "Create a simple time series: `sin(x)` sampled at regular intervals. Build an RNN (SimpleRNN or LSTM) that takes the last 10 values and predicts the next value. Plot the predicted vs actual values.\n",
                "hint": "import numpy as np\nimport tensorflow as tf\nimport matplotlib.pyplot as plt\n\n# Generate sine wave data\n# x = np.linspace(0, 100, 1000)\n# y = np.sin(x)\n\n# Create sequences: input = 10 consecutive values, target = next value\n# seq_length = 10\n# X, Y = [], []\n# for i in range(len(y) - seq_length):\n#     X.append(y[i:i+seq_length])\n#     Y.append(y[i+seq_length])\n\n# Build LSTM model and train\n# Your code here\n"
            },
            {
                "title": "### Exercise 2: LSTM vs GRU Comparison",
                "description": "Using the IMDB sentiment analysis dataset (`tf.keras.datasets.imdb`), build two models:\n1. One using LSTM layers\n2. One using GRU layers\n\nCompare training time, parameter count, and test accuracy. Which one is more efficient?\n",
                "hint": "import tensorflow as tf\nimport time\n\n# Load IMDB dataset\n# vocab_size = 10000\n# max_length = 200\n# (X_train, y_train), (X_test, y_test) = tf.keras.datasets.imdb.load_data(num_words=vocab_size)\n# X_train = tf.keras.preprocessing.sequence.pad_sequences(X_train, maxlen=max_length)\n# X_test = tf.keras.preprocessing.sequence.pad_sequences(X_test, maxlen=max_length)\n\n# Model 1: Embedding + LSTM + Dense\n# Model 2: Embedding + GRU + Dense\n# Compare training time, params, and accuracy\n\n# Your code here\n"
            }
        ]
    },
    "Basic/B11 - Attention and Transformers.ipynb": {
        "section_title": "## Exercises",
        "exercises": [
            {
                "title": "### Exercise 1: Attention Weights Visualization",
                "description": "Implement scaled dot-product attention from scratch using NumPy. Given a simple sentence represented as random embeddings, compute the attention weights matrix and visualize it as a heatmap using `matplotlib` or `seaborn`.\n",
                "hint": "import numpy as np\nimport matplotlib.pyplot as plt\nimport seaborn as sns\n\ndef scaled_dot_product_attention(Q, K, V):\n    \"\"\"Compute attention: softmax(QK^T / sqrt(d_k)) * V\"\"\"\n    d_k = Q.shape[-1]\n    # scores = Q @ K.T / np.sqrt(d_k)\n    # weights = softmax(scores)  # implement softmax\n    # output = weights @ V\n    # return output, weights\n    pass\n\n# Create random Q, K, V for a 5-word sentence with embedding dim 8\n# Q = K = V = np.random.randn(5, 8)\n# output, weights = scaled_dot_product_attention(Q, K, V)\n\n# Visualize attention weights as heatmap\n# sns.heatmap(weights, annot=True, fmt='.2f',\n#             xticklabels=['word1','word2','word3','word4','word5'],\n#             yticklabels=['word1','word2','word3','word4','word5'])\n\n# Your code here\n"
            },
            {
                "title": "### Exercise 2: Positional Encoding",
                "description": "Implement sinusoidal positional encoding as described in \"Attention Is All You Need\". Generate positional encodings for a sequence of length 50 with embedding dimension 64. Visualize the encoding matrix as a heatmap and explain the patterns you see.\n",
                "hint": "import numpy as np\nimport matplotlib.pyplot as plt\n\ndef positional_encoding(max_len, d_model):\n    \"\"\"Generate sinusoidal positional encoding.\"\"\"\n    # PE(pos, 2i) = sin(pos / 10000^(2i/d_model))\n    # PE(pos, 2i+1) = cos(pos / 10000^(2i/d_model))\n    # Your code here\n    pass\n\n# pe = positional_encoding(50, 64)\n# plt.figure(figsize=(12, 6))\n# plt.imshow(pe, cmap='RdBu', aspect='auto')\n# plt.xlabel('Embedding Dimension')\n# plt.ylabel('Position')\n# plt.colorbar()\n# plt.title('Sinusoidal Positional Encoding')\n\n# Your code here\n"
            }
        ]
    },
    "Basic/B12 - Byte Pair Encoding (BPE).ipynb": {
        "section_title": "## Exercises",
        "exercises": [
            {
                "title": "### Exercise 1: BPE from Scratch",
                "description": "Implement the BPE algorithm from scratch. Starting with a character-level vocabulary, iteratively merge the most frequent pair of tokens. Apply it to the corpus: `[\"low\", \"lower\", \"newest\", \"widest\"]` with 10 merge operations. Print the vocabulary after each merge step.\n",
                "hint": "from collections import Counter, defaultdict\n\ndef get_vocab(corpus):\n    \"\"\"Convert words to character sequences with end-of-word marker.\"\"\"\n    vocab = Counter()\n    for word in corpus:\n        # Split into characters, add </w> marker\n        # vocab[tuple(list(word) + ['</w>'])] += 1\n        pass\n    return vocab\n\ndef get_pairs(vocab):\n    \"\"\"Get frequency of adjacent pairs.\"\"\"\n    pairs = defaultdict(int)\n    # For each word, count adjacent character pairs\n    # Your code here\n    return pairs\n\ndef merge_pair(pair, vocab):\n    \"\"\"Merge the most frequent pair in the vocabulary.\"\"\"\n    # Your code here\n    pass\n\n# corpus = ['low', 'lower', 'newest', 'widest']\n# Run 10 merge operations\n# Your code here\n"
            },
            {
                "title": "### Exercise 2: Tokenization Comparison",
                "description": "Take the sentence: `\"The transformer model uses self-attention mechanisms effectively\"`\n\nTokenize it three ways:\n1. Character-level (split into individual characters)\n2. Word-level (split on spaces)\n3. Subword-level (use the `tiktoken` or a simple BPE tokenizer)\n\nCompare the number of tokens produced by each method and discuss the trade-offs.\n",
                "hint": "sentence = \"The transformer model uses self-attention mechanisms effectively\"\n\n# Character-level\n# char_tokens = list(sentence)\n# print(f\"Character tokens ({len(char_tokens)}): {char_tokens}\")\n\n# Word-level\n# word_tokens = sentence.split()\n# print(f\"Word tokens ({len(word_tokens)}): {word_tokens}\")\n\n# Subword-level (simple simulation)\n# Think about how BPE would handle 'self-attention' and 'mechanisms'\n\n# Your code here\n"
            }
        ]
    },
    "Basic/B13 - Building a Mini Language Model.ipynb": {
        "section_title": "## Exercises",
        "exercises": [
            {
                "title": "### Exercise 1: Temperature Sampling",
                "description": "Using a trained language model (or simulated logits), implement temperature-based sampling. Generate text with temperatures 0.2, 0.7, 1.0, and 1.5. Observe how temperature affects the diversity and coherence of generated text.\n",
                "hint": "import numpy as np\n\ndef sample_with_temperature(logits, temperature=1.0):\n    \"\"\"Sample from logits with temperature scaling.\"\"\"\n    # scaled_logits = logits / temperature\n    # probs = softmax(scaled_logits)\n    # return np.random.choice(len(probs), p=probs)\n    pass\n\n# Simulated logits for next token prediction\n# logits = np.array([2.0, 1.5, 0.5, 0.1, -0.5, -1.0])\n# vocab = ['the', 'a', 'cat', 'dog', 'runs', 'sleeps']\n\n# For each temperature, sample 20 tokens and observe the distribution\n# Your code here\n"
            },
            {
                "title": "### Exercise 2: Causal Attention Mask",
                "description": "Implement a causal (autoregressive) attention mask that prevents tokens from attending to future positions. Create the mask for a sequence of length 6, apply it to random attention scores, and verify that future positions are properly masked (set to -infinity before softmax).\n",
                "hint": "import numpy as np\n\ndef create_causal_mask(seq_len):\n    \"\"\"Create lower-triangular causal mask.\"\"\"\n    # mask[i][j] = 0 if j <= i, else -inf\n    # Your code here\n    pass\n\n# seq_len = 6\n# mask = create_causal_mask(seq_len)\n# print(\"Causal mask:\")\n# print(mask)\n\n# Apply to random attention scores\n# scores = np.random.randn(seq_len, seq_len)\n# masked_scores = scores + mask\n# print(\"\\nMasked scores (future = -inf):\")\n# print(masked_scores)\n\n# Your code here\n"
            }
        ]
    },
    "Basic/B14 - Practical Projects and Assignments.ipynb": {
        "section_title": "## Exercises",
        "exercises": [
            {
                "title": "### Exercise 1: End-to-End Pipeline",
                "description": "Build a complete ML pipeline for the Iris dataset that includes:\n1. Data loading and exploration\n2. Train/test split (80/20)\n3. Feature scaling\n4. Model training (neural network)\n5. Evaluation with classification report\n6. Saving the model to disk\n\nWrite it as clean, reusable functions.\n",
                "hint": "import tensorflow as tf\nimport numpy as np\nfrom sklearn.datasets import load_iris\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.preprocessing import StandardScaler\n\ndef load_and_preprocess():\n    \"\"\"Load Iris data and preprocess.\"\"\"\n    # Your code here\n    pass\n\ndef build_model(input_dim, num_classes):\n    \"\"\"Build and compile the model.\"\"\"\n    # Your code here\n    pass\n\ndef train_and_evaluate(model, X_train, y_train, X_test, y_test):\n    \"\"\"Train the model and print evaluation metrics.\"\"\"\n    # Your code here\n    pass\n\n# Run the full pipeline\n# Your code here\n"
            },
            {
                "title": "### Exercise 2: Model Comparison Report",
                "description": "Using any dataset of your choice, train at least 3 different model architectures (e.g., simple Dense, deeper Dense, CNN if image data). Create a comparison table showing:\n- Model name\n- Number of parameters\n- Training time\n- Test accuracy\n- Test loss\n\nWhich model gives the best accuracy-to-complexity ratio?\n",
                "hint": "import tensorflow as tf\nimport time\n\nresults = []\n\n# For each model architecture:\n# 1. Build model\n# 2. Count params: model.count_params()\n# 3. Time the training: start = time.time()\n# 4. Evaluate on test set\n# 5. Append to results\n\n# Print comparison table\n# print(f\"{'Model':<20} {'Params':>10} {'Time (s)':>10} {'Accuracy':>10}\")\n# for r in results:\n#     print(f\"{r['name']:<20} {r['params']:>10} {r['time']:>10.1f} {r['acc']:>10.4f}\")\n\n# Your code here\n"
            }
        ]
    },
    "Basic/B15 - Capstone Projects and Portfolio Building.ipynb": {
        "section_title": "## Exercises",
        "exercises": [
            {
                "title": "### Exercise 1: Project Proposal",
                "description": "Write a structured project proposal for an AI/ML capstone project of your choice. Include:\n1. **Problem Statement**: What problem are you solving?\n2. **Dataset**: What data will you use? (public dataset or synthetic)\n3. **Approach**: What model architecture and techniques will you use?\n4. **Evaluation**: How will you measure success?\n5. **Timeline**: Break the project into weekly milestones\n\nWrite your proposal in the cell below as markdown (change cell type to Markdown).\n",
                "hint": "# Write your project proposal here\n# Consider topics like:\n# - Image classification for a specific domain\n# - Sentiment analysis on product reviews\n# - Time series forecasting (weather, stocks, energy)\n# - Text generation for a specific style/domain\n# - Anomaly detection in sensor data\n\n# Your proposal here (switch cell to Markdown)\n"
            },
            {
                "title": "### Exercise 2: Reproduce a Result",
                "description": "Pick one of the models built in lessons B02-B13 and reproduce the result from scratch in a clean notebook. Document every step with comments explaining **why** each decision was made (not just what). This is a key portfolio skill — showing you understand the reasoning, not just the code.\n",
                "hint": "# Choose a lesson (e.g., B09 CNN on MNIST, B10 LSTM sentiment, B11 Transformer)\n# Rebuild it step by step with detailed comments:\n\n# Step 1: Data loading — WHY this dataset?\n# Step 2: Preprocessing — WHY normalize? WHY this split ratio?\n# Step 3: Architecture — WHY these layers? WHY this activation?\n# Step 4: Training — WHY this optimizer? WHY this learning rate?\n# Step 5: Evaluation — WHY these metrics?\n\n# Your code here\n"
            }
        ]
    },
}


def make_exercise_cells(exercises_config):
    """Create notebook cells for exercises section."""
    cells = []
    
    # Section header markdown cell
    header_lines = [
        "---\n",
        "\n",
        f"{exercises_config['section_title']}\n",
        "\n",
        "Test your understanding with these hands-on exercises. Try to solve them before looking at the hints.\n"
    ]
    cells.append({
        "cell_type": "markdown",
        "metadata": {},
        "source": header_lines
    })
    
    for ex in exercises_config["exercises"]:
        # Exercise description markdown cell
        desc_lines = [f"{ex['title']}\n", "\n"]
        for line in ex["description"].split("\n"):
            desc_lines.append(line + "\n")
        cells.append({
            "cell_type": "markdown",
            "metadata": {},
            "source": desc_lines
        })
        
        # Exercise code cell with hints
        code_lines = []
        for line in ex["hint"].split("\n"):
            code_lines.append(line + "\n")
        # Remove trailing newline from last line
        if code_lines and code_lines[-1] == "\n":
            code_lines = code_lines[:-1]
        cells.append({
            "cell_type": "code",
            "execution_count": None,
            "metadata": {},
            "outputs": [],
            "source": code_lines
        })
    
    return cells


def find_insert_position(cells):
    """Find the position to insert exercises — before Learning Progress Tracker."""
    for i, cell in enumerate(cells):
        if cell.get("cell_type") == "markdown":
            source = "".join(cell.get("source", []))
            if "Learning Progress Tracker" in source:
                return i
            if "## Key Takeaways" in source and "Relevant UoA" in source:
                return i
    # Fallback: insert before last 3 cells
    return max(0, len(cells) - 3)


def process_notebook(filepath, exercises_config):
    """Add exercises to a notebook."""
    with open(filepath, 'r', encoding='utf-8') as f:
        nb = json.load(f)
    
    cells = nb["cells"]
    insert_pos = find_insert_position(cells)
    
    exercise_cells = make_exercise_cells(exercises_config)
    
    # Insert exercise cells
    for i, cell in enumerate(exercise_cells):
        cells.insert(insert_pos + i, cell)
    
    nb["cells"] = cells
    
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(nb, f, indent=1, ensure_ascii=False)
        f.write("\n")
    
    print(f"✅ Added {len(exercises_config['exercises'])} exercises to {filepath}")


def main():
    for filepath, config in EXERCISES.items():
        try:
            process_notebook(filepath, config)
        except Exception as e:
            print(f"❌ Error processing {filepath}: {e}")
    print("\nDone!")


if __name__ == "__main__":
    main()

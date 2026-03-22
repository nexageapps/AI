// ── Activation functions ──
export const ACTIVATIONS = {
  relu: {
    name: 'ReLU',
    formula: 'f(x) = max(0, x)',
    fn: (x) => Math.max(0, x),
    derivative: (x) => (x > 0 ? 1 : 0),
    color: '#2563eb',
    description:
      'Rectified Linear Unit — outputs x when positive, 0 otherwise. Most popular for hidden layers because it avoids the vanishing gradient problem.',
  },
  sigmoid: {
    name: 'Sigmoid',
    formula: 'f(x) = 1 / (1 + e⁻ˣ)',
    fn: (x) => 1 / (1 + Math.exp(-x)),
    derivative: (x) => {
      const s = 1 / (1 + Math.exp(-x));
      return s * (1 - s);
    },
    color: '#16a34a',
    description:
      'Squashes values between 0 and 1. Useful for binary classification output but can cause vanishing gradients in deep networks.',
  },
  tanh: {
    name: 'Tanh',
    formula: 'f(x) = (eˣ − e⁻ˣ) / (eˣ + e⁻ˣ)',
    fn: (x) => Math.tanh(x),
    derivative: (x) => 1 - Math.tanh(x) ** 2,
    color: '#dc2626',
    description:
      'Squashes values between −1 and 1. Zero-centred, which helps training, but still suffers from vanishing gradients at extremes.',
  },
  leakyRelu: {
    name: 'Leaky ReLU',
    formula: 'f(x) = x > 0 ? x : 0.01x',
    fn: (x) => (x > 0 ? x : 0.01 * x),
    derivative: (x) => (x > 0 ? 1 : 0.01),
    color: '#9333ea',
    description:
      'Like ReLU but allows a small gradient when x < 0, preventing "dead neurons" that never activate.',
  },
};

import React, { useState } from 'react';
import {
  FaChevronRight, FaCheckCircle, FaLightbulb, FaExclamationTriangle,
  FaQuestion, FaCubes, FaLock, FaBolt, FaExchangeAlt, FaRocket,
  FaFont, FaChartLine, FaMusic, FaFilm, FaCheck, FaTimes,
  FaCommentDots, FaSmile, FaGlobe, FaMicrophone, FaChartBar, FaLayerGroup,
  FaClock, FaProjectDiagram, FaSuperscript, FaEye, FaCrosshairs,
  FaBook,
} from 'react-icons/fa';
import './LearnPanel.css';

/*
  Content adapted from and inspired by:
  - Stanford CS230 Deep Learning (stanford.edu/~shervine/teaching/cs-230/)
  - Stanford CS231n 2017 (cs231n.stanford.edu)
  Content was rephrased for compliance with licensing restrictions.
*/

const LESSONS = [
  {
    id: 'why-rnn',
    title: 'Why RNNs?',
    icon: FaQuestion,
    content: [
      { type: 'text', value: 'Standard feed-forward networks map a fixed-size input to a fixed-size output. They have no notion of sequence or temporal order. RNNs were designed to handle sequential data where the order of inputs carries meaning.' },
      { type: 'examples', items: [
        { icon: FaFont, label: 'Text / NLP', detail: '"The cat sat on the ___" -- next word depends on all previous words in the sequence' },
        { icon: FaChartLine, label: 'Time Series', detail: 'Stock prices, sensor readings, weather -- future values depend on historical trends' },
        { icon: FaMusic, label: 'Audio / Speech', detail: 'Speech signals are temporal sequences; understanding requires processing frames in order' },
        { icon: FaFilm, label: 'Video', detail: 'Sequences of frames where temporal context determines the action or scene' },
      ]},
      { type: 'problem', title: 'Limitations of Feed-Forward Networks (CS231n)', items: [
        'Fixed input size -- cannot handle variable-length sequences',
        'No memory -- each input is processed independently with no state',
        'No parameter sharing across time -- would need separate weights for each position',
      ]},
      { type: 'solution', value: 'RNNs introduce a hidden state (internal memory) that is updated at each time step. The same function and the same set of parameters are used at every time step -- this is called weight sharing across time (CS231n, Lecture 10).' },
    ],
  },
  {
    id: 'rnn-arch',
    title: 'RNN Architecture',
    icon: FaCubes,
    content: [
      { type: 'text', value: 'An RNN has a recurrent core cell that takes an input and maintains an internal hidden state updated at each step. The key property: the same function with the same parameters is applied at every time step (CS231n).' },
      { type: 'equation', label: 'Activation (CS230 notation)', formula: 'a^<t> = g1(W_aa * a^<t-1> + W_ax * x^<t> + b_a)' },
      { type: 'equation', label: 'Output', formula: 'y^<t> = g2(W_ya * a^<t> + b_y)' },
      { type: 'text', value: 'Where W_ax, W_aa, W_ya, b_a, b_y are coefficients shared temporally, and g1, g2 are activation functions (typically tanh and softmax). The hidden state a^<t> serves as the network\'s memory.' },
      { type: 'diagram', value: `  x^<1>    x^<2>    x^<3>    x^<4>
    |         |         |         |
  [RNN] --> [RNN] --> [RNN] --> [RNN]
    |         |         |         |
  y^<1>    y^<2>    y^<3>    y^<4>

  Same weights W_aa, W_ax, W_ya at every step
  h_0 is initialized to zero` },
      { type: 'comparison', title: 'Advantages vs Drawbacks (CS230)', items: [
        { aspect: 'Variable length', lstm: 'Can process input of any length', gru: '--' },
        { aspect: 'Model size', lstm: 'Does not increase with input size', gru: '--' },
        { aspect: 'Historical info', lstm: 'Computation uses past context', gru: '--' },
        { aspect: 'Speed', lstm: '--', gru: 'Computation is sequential (slow)' },
        { aspect: 'Long-range', lstm: '--', gru: 'Hard to access info from long ago' },
        { aspect: 'Future context', lstm: '--', gru: 'Cannot use future input for current state' },
      ]},
      { type: 'keypoint', value: 'The loss function across all time steps is the sum of individual losses: L(y_hat, y) = sum over t of L(y_hat^<t>, y^<t>). Gradients of W are accumulated across all time steps (CS230).' },
      { type: 'warning', value: 'Vanishing/Exploding Gradient: Multiplicative gradients through many time steps can shrink or grow exponentially. This makes it difficult to capture long-term dependencies (CS230, CS231n).' },
    ],
  },
  {
    id: 'rnn-types',
    title: 'RNN Architectures',
    icon: FaProjectDiagram,
    content: [
      { type: 'text', value: 'RNNs offer great flexibility in how they map inputs to outputs. CS231n identifies five key patterns that cover most sequence tasks:' },
      { type: 'examples', items: [
        { icon: FaCrosshairs, label: 'One-to-One', detail: 'Vanilla neural network. Fixed input to fixed output. Standard classification.' },
        { icon: FaSuperscript, label: 'One-to-Many', detail: 'Single input generates a sequence. Example: Image Captioning (image to sequence of words).' },
        { icon: FaLayerGroup, label: 'Many-to-One', detail: 'Sequence input produces single output. Example: Sentiment Classification (words to sentiment).' },
        { icon: FaProjectDiagram, label: 'Many-to-Many (equal)', detail: 'Input and output sequences of same length. Example: Video classification on frame level, POS tagging.' },
        { icon: FaExchangeAlt, label: 'Many-to-Many (Seq2Seq)', detail: 'Encoder-decoder: input sequence to different-length output. Example: Machine Translation.' },
      ]},
      { type: 'diagram', value: `One-to-One:    [x] --> [h] --> [y]

One-to-Many:   [x] --> [h1] --> [h2] --> [h3]
                         |        |        |
                        y1       y2       y3

Many-to-One:   x1    x2    x3
                |      |      |
              [h1]-->[h2]-->[h3] --> [y]

Seq2Seq:       x1    x2         y1    y2    y3
                |      |          |      |      |
              [h1]-->[h2] --> [d1]-->[d2]-->[d3]
              (encoder)        (decoder)` },
      { type: 'text', value: 'Stacking multiple RNN layers creates deep RNNs. Lower layers capture local patterns while higher layers learn abstract features. Dropout is applied between layers (not within time steps) for regularization.' },
      { type: 'keypoint', value: 'RNNs can also work on non-sequence data. For example, taking a series of "glimpses" at different image regions for classification (CS231n). The flexibility of RNN architectures is one of their greatest strengths.' },
    ],
  },
  {
    id: 'bptt',
    title: 'BPTT & Gradients',
    icon: FaClock,
    content: [
      { type: 'text', value: 'Backpropagation Through Time (BPTT) is how RNNs learn. The network is unrolled across time steps, and gradients flow backward from the loss through each step. At timestep T, the derivative of loss L with respect to weight W is the sum of contributions from all time steps (CS230):' },
      { type: 'equation', label: 'BPTT Gradient (CS230)', formula: 'dL^(T)/dW = sum_{t=1}^{T} (dL^(T)/dW)|_(t)' },
      { type: 'text', value: 'The gradient at each step depends on the product of weight matrices through time. After T steps, this involves W_h raised to the power T, causing vanishing or exploding gradients.' },
      { type: 'warning', value: 'If the whole sequence is used, BPTT is very slow and memory-intensive. In practice, Truncated BPTT is used: run forward and backward through chunks of the sequence, carrying hidden states forward but only backpropagating for a limited number of steps (CS231n).' },
      { type: 'text', value: 'Gradient Clipping is used to handle exploding gradients: cap the maximum gradient norm to a threshold. This is standard practice for training any RNN (CS230, CS231n).' },
      { type: 'equation', label: 'Gradient Clipping', formula: 'if ||g|| > threshold: g = threshold * g / ||g||' },
      { type: 'keypoint', value: 'The vanishing gradient problem is fundamental: multiplicative gradients decrease exponentially with sequence length. This motivated the development of gated architectures (LSTM, GRU) that provide additive gradient paths (CS231n).' },
    ],
  },
  {
    id: 'gates',
    title: 'Types of Gates',
    icon: FaEye,
    content: [
      { type: 'text', value: 'To remedy the vanishing gradient problem, specific gates control information flow in RNNs. Gates use sigmoid activation to produce values between 0 and 1, acting as soft switches (CS230):' },
      { type: 'equation', label: 'General Gate Form (CS230)', formula: 'Gamma = sigmoid(W * x^<t> + U * a^<t-1> + b)' },
      { type: 'comparison', title: 'Gate Types and Their Roles (CS230)', items: [
        { aspect: 'Update Gate (Gamma_u)', lstm: 'How much past should matter now?', gru: 'GRU, LSTM' },
        { aspect: 'Relevance Gate (Gamma_r)', lstm: 'Drop previous information?', gru: 'GRU, LSTM' },
        { aspect: 'Forget Gate (Gamma_f)', lstm: 'Erase a cell or not?', gru: 'LSTM only' },
        { aspect: 'Output Gate (Gamma_o)', lstm: 'How much to reveal of a cell?', gru: 'LSTM only' },
      ]},
      { type: 'text', value: 'The sigmoid function outputs values in [0,1]. A gate value of 0 means "block everything" and 1 means "let everything through". This gives the network fine-grained control over what information to keep, update, or discard.' },
      { type: 'keypoint', value: 'Gates are the key innovation that allows LSTM and GRU to learn long-range dependencies. They create additive paths for gradient flow, similar to skip connections in ResNets (CS231n).' },
    ],
  },
  {
    id: 'lstm',
    title: 'LSTM',
    icon: FaLock,
    content: [
      { type: 'text', value: 'Long Short-Term Memory (LSTM) was designed to solve the vanishing gradient problem. It maintains a separate cell state (long-term memory) alongside the hidden state, controlled by three gates (CS230, CS231n).' },
      { type: 'gates', items: [
        { name: 'Forget Gate', symbol: 'f_t', color: '#ef4444', desc: 'Whether to erase the cell. Decides what to discard from cell state. f_t = sigmoid(W_f * [h_{t-1}, x_t] + b_f)', formula: 'f_t = sigmoid(W_f * [h_{t-1}, x_t] + b_f)' },
        { name: 'Input Gate', symbol: 'i_t', color: '#22c55e', desc: 'Whether to write to cell. Controls what new information to store. i_t = sigmoid(W_i * [h_{t-1}, x_t] + b_i)', formula: 'i_t = sigmoid(W_i * [h_{t-1}, x_t] + b_i)' },
        { name: 'Gate Gate', symbol: 'g_t', color: '#f59e0b', desc: 'How much to write to cell. Candidate values to potentially add. g_t = tanh(W_g * [h_{t-1}, x_t] + b_g)', formula: 'g_t = tanh(W_g * [h_{t-1}, x_t] + b_g)' },
        { name: 'Output Gate', symbol: 'o_t', color: '#3b82f6', desc: 'How much to reveal of cell. Controls what the hidden state exposes. o_t = sigmoid(W_o * [h_{t-1}, x_t] + b_o)', formula: 'o_t = sigmoid(W_o * [h_{t-1}, x_t] + b_o)' },
      ]},
      { type: 'equation', label: 'Cell State Update', formula: 'C_t = f_t * C_{t-1} + i_t * g_t' },
      { type: 'equation', label: 'Hidden State', formula: 'h_t = o_t * tanh(C_t)' },
      { type: 'keypoint', value: 'The cell state gradient flows through the forget gate: dC_t/dC_{t-1} = f_t. When f_t is close to 1, gradients pass through almost unchanged -- this is the "gradient highway" that solves vanishing gradients (CS231n). Similar principle to ResNet skip connections.' },
      { type: 'text', value: 'Parameter count: 4 x (hidden_size x (input_size + hidden_size) + hidden_size). The factor of 4 comes from the 3 gates plus the candidate computation. Each has its own weight matrices.' },
    ],
  },
  {
    id: 'gru',
    title: 'GRU',
    icon: FaBolt,
    content: [
      { type: 'text', value: 'The Gated Recurrent Unit (GRU) simplifies LSTM by combining the forget and input gates into a single update gate, and merging cell state with hidden state. LSTM is a generalization of GRU (CS230).' },
      { type: 'gates', items: [
        { name: 'Update Gate', symbol: 'z_t', color: '#f59e0b', desc: 'How much past should matter now? z=0 keeps old state, z=1 replaces with new.', formula: 'z_t = sigmoid(W_z * [h_{t-1}, x_t] + b_z)' },
        { name: 'Reset Gate', symbol: 'r_t', color: '#8b5cf6', desc: 'Drop previous information? r=0 ignores past, r=1 uses full past context.', formula: 'r_t = sigmoid(W_r * [h_{t-1}, x_t] + b_r)' },
      ]},
      { type: 'equation', label: 'Candidate', formula: 'h_tilde = tanh(W * [r_t * h_{t-1}, x_t])' },
      { type: 'equation', label: 'Hidden State', formula: 'h_t = (1 - z_t) * h_{t-1} + z_t * h_tilde' },
      { type: 'comparison', title: 'LSTM vs GRU Comparison', items: [
        { aspect: 'Gates', lstm: '3 gates + candidate (4 computations)', gru: '2 gates + candidate (3 computations)' },
        { aspect: 'States', lstm: 'Hidden state h_t + Cell state C_t', gru: 'Hidden state h_t only' },
        { aspect: 'Parameters', lstm: '4 x h x (h + x + 1)', gru: '3 x h x (h + x + 1)' },
        { aspect: 'Training Speed', lstm: 'Slower (more parameters)', gru: 'Faster (fewer parameters)' },
        { aspect: 'Long Dependencies', lstm: 'Generally better for complex tasks', gru: 'Comparable on many tasks' },
        { aspect: 'When to Use', lstm: 'Default choice, complex sequences', gru: 'Smaller data, speed matters' },
      ]},
    ],
  },
  {
    id: 'bidirectional',
    title: 'Bidirectional RNNs',
    icon: FaExchangeAlt,
    content: [
      { type: 'text', value: 'Standard RNNs only use past context. Bidirectional RNNs process the sequence in both directions, capturing both past and future context at each position. The forward and backward hidden states are concatenated.' },
      { type: 'diagram', value: `Forward:   x1 --> x2 --> x3 --> x4
                |       |       |       |
Backward:  x1 <-- x2 <-- x3 <-- x4
                |       |       |       |
Concat:   [hf1;hb1] [hf2;hb2] [hf3;hb3] [hf4;hb4]

Output dimension: 2 x hidden_size` },
      { type: 'examples', items: [
        { icon: FaCheck, label: 'Good for', detail: 'Classification with full sequence available: sentiment analysis, NER, POS tagging, speech recognition' },
        { icon: FaTimes, label: 'Not suitable for', detail: 'Autoregressive generation (text generation, language modeling) where future tokens are unavailable' },
      ]},
      { type: 'keypoint', value: 'Bidirectional LSTMs are the standard for many NLP classification tasks. They can also be stacked into multiple layers for deeper representations.' },
    ],
  },
  {
    id: 'attention',
    title: 'Attention Mechanism',
    icon: FaEye,
    content: [
      { type: 'text', value: 'The attention mechanism allows an RNN to focus on specific parts of the input that are most relevant for each output step, rather than compressing the entire input into a single fixed-size vector (CS230). As Raschka explains, attention has its roots in the effort to improve RNNs for handling longer sequences.' },
      { type: 'equation', label: 'Context Vector (CS230)', formula: 'c^<t> = sum over t\' of alpha^<t,t\'> * a^<t\'>' },
      { type: 'text', value: 'Where alpha^<t,t\'> represents how much attention output y^<t> should pay to activation a^<t\'>. The attention weights sum to 1 across all input positions.' },
      { type: 'equation', label: 'Attention Weight (CS230)', formula: 'alpha^<t,t\'> = exp(e^<t,t\'>) / sum over t\'\' of exp(e^<t,t\'\'>)' },
      { type: 'text', value: 'The energy scores e^<t,t\'> are computed by a small neural network that takes the decoder hidden state and encoder activation as inputs. This is sometimes called Bahdanau attention. The key insight: be selective and determine which words are most important in a specific context (Raschka, 2023).' },
      { type: 'examples', items: [
        { icon: FaGlobe, label: 'Machine Translation', detail: 'Attention allows the decoder to look back at relevant source words for each target word' },
        { icon: FaFilm, label: 'Image Captioning', detail: 'When generating captions, the RNN attends to specific image regions for each word (CS231n)' },
        { icon: FaCommentDots, label: 'Question Answering', detail: 'Attention highlights relevant parts of the passage for answering each question' },
      ]},
      { type: 'keypoint', value: 'Attention was a breakthrough that led directly to the Transformer architecture (Vaswani et al., 2017). The Transformer uses self-attention exclusively, removing recurrence entirely. Understanding RNN attention is essential for understanding modern architectures.' },
    ],
  },
  {
    id: 'self-attention',
    title: 'Self-Attention & Transformers',
    icon: FaCrosshairs,
    content: [
      { type: 'text', value: 'In 2017, the Transformer architecture introduced standalone self-attention, eliminating the need for RNNs. Self-attention enhances input embeddings by including information about the input\'s context, allowing the model to weigh the importance of different elements dynamically (Raschka, 2023).' },
      { type: 'text', value: 'Self-attention uses three weight matrices -- W_q (query), W_k (key), and W_v (value) -- that are learned during training. These project each input into query, key, and value vectors (Raschka, 2023):' },
      { type: 'equation', label: 'Query', formula: 'q^(i) = W_q * x^(i)  for i in [1, T]' },
      { type: 'equation', label: 'Key', formula: 'k^(i) = W_k * x^(i)  for i in [1, T]' },
      { type: 'equation', label: 'Value', formula: 'v^(i) = W_v * x^(i)  for i in [1, T]' },
      { type: 'text', value: 'The unnormalized attention weight between positions i and j is the dot product of query and key: omega_ij = q^(i)^T * k^(j). This measures how relevant position j is to position i.' },
      { type: 'equation', label: 'Scaled Dot-Product Attention', formula: 'alpha_ij = softmax(omega_ij / sqrt(d_k))' },
      { type: 'text', value: 'Scaling by sqrt(d_k) is critical: the dot product variance grows linearly with d_k (since it sums d_k independent terms). Dividing by sqrt(d_k) brings variance back to ~1, preventing softmax saturation (Raschka, 2023).' },
      { type: 'equation', label: 'Context Vector', formula: 'z^(i) = sum_j alpha_ij * v^(j)' },
      { type: 'text', value: 'The context vector z^(i) is an attention-weighted combination of all value vectors, enriched with contextual information from the entire sequence.' },
      { type: 'keypoint', value: 'Multi-head attention runs multiple attention heads in parallel, each with its own W_q, W_k, W_v matrices. This is analogous to multiple kernels in CNNs -- each head can learn to attend to different types of relationships (Raschka, 2023).' },
      { type: 'text', value: 'Cross-attention is a variant where queries come from one sequence (e.g., decoder) and keys/values come from another (e.g., encoder). When both sequences are the same, it reduces to self-attention. Cross-attention is used in machine translation and in models like Stable Diffusion (Raschka, 2023).' },
      { type: 'warning', value: 'Important dimension constraints: d_q must equal d_k (for the dot product), but d_v can be arbitrary. W_q and W_k have shape d_k x d, while W_v has shape d_v x d, where d is the embedding dimension (Raschka, 2023).' },
    ],
  },
  {
    id: 'applications',
    title: 'Applications',
    icon: FaRocket,
    content: [
      { type: 'text', value: 'RNNs and their variants have powered many breakthroughs across domains. The CS230 cheatsheet categorizes applications by their input-output pattern:' },
      { type: 'examples', items: [
        { icon: FaCommentDots, label: 'Language Modeling', detail: 'Predict next character/word. Uses many-to-many pattern. Perplexity measures quality (CS230). Character-level RNNs can generate surprisingly coherent text (CS231n).' },
        { icon: FaSmile, label: 'Sentiment Analysis', detail: 'Many-to-one: read full review, output sentiment. Bidirectional LSTM is standard approach.' },
        { icon: FaGlobe, label: 'Machine Translation', detail: 'Seq2Seq with attention. Beam search finds likely translations. BLEU score evaluates quality (CS230).' },
        { icon: FaMicrophone, label: 'Speech Recognition', detail: 'Bidirectional LSTMs with CTC loss. Processes audio frames sequentially.' },
        { icon: FaChartBar, label: 'Time Series', detail: 'LSTMs capture long-term trends and seasonal patterns for forecasting.' },
        { icon: FaFilm, label: 'Image Captioning', detail: 'One-to-many: CNN encodes image, RNN generates caption word by word. Attention improves quality (CS231n).' },
      ]},
      { type: 'keypoint', value: 'While Transformers have largely replaced RNNs for NLP since 2017, understanding RNNs is essential: they introduced key concepts (hidden states, gating, attention, seq2seq) that underpin all modern architectures.' },
      { type: 'text', value: 'References: Stanford CS230 (stanford.edu/~shervine/teaching/cs-230/), Stanford CS231n 2017 (cs231n.stanford.edu), Sebastian Raschka (sebastianraschka.com/blog/2023/self-attention-from-scratch.html). Content was rephrased for compliance with licensing restrictions.' },
    ],
  },
];

function LearnPanel() {
  const [activeLesson, setActiveLesson] = useState(0);
  const [completed, setCompleted] = useState(new Set());

  const lesson = LESSONS[activeLesson];
  const LessonIcon = lesson.icon;

  const markComplete = () => {
    setCompleted(prev => new Set([...prev, activeLesson]));
    if (activeLesson < LESSONS.length - 1) setActiveLesson(activeLesson + 1);
  };

  return (
    <div className="learn-panel">
      <div className="lesson-sidebar">
        <div className="sidebar-title"><FaBook style={{ marginRight: 4 }} /> Lessons</div>
        {LESSONS.map((l, i) => {
          const NavIcon = l.icon;
          return (
            <button key={l.id}
              className={`lesson-nav-btn ${activeLesson === i ? 'active' : ''} ${completed.has(i) ? 'completed' : ''}`}
              onClick={() => setActiveLesson(i)}>
              <NavIcon className="lesson-nav-icon" />
              <span className="lesson-nav-text">{l.title}</span>
              {completed.has(i) && <FaCheckCircle className="lesson-check" />}
              {activeLesson === i && !completed.has(i) && <FaChevronRight className="lesson-arrow" />}
            </button>
          );
        })}
        <div className="lesson-progress">{completed.size}/{LESSONS.length} completed</div>
      </div>

      <div className="lesson-content">
        <div className="lesson-header">
          <LessonIcon className="lesson-icon-big" />
          <h2 className="lesson-title">{lesson.title}</h2>
        </div>

        <div className="lesson-body">
          {lesson.content.map((block, i) => (
            <div key={i} className={`content-block block-${block.type}`}>
              {block.type === 'text' && <p>{block.value}</p>}

              {block.type === 'examples' && (
                <div className="examples-grid">
                  {block.items.map((ex, j) => {
                    const ExIcon = ex.icon;
                    return (
                      <div key={j} className="example-card">
                        <ExIcon className="example-icon" />
                        <div>
                          <strong>{ex.label}</strong>
                          <p>{ex.detail}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {block.type === 'problem' && (
                <div className="problem-box">
                  <h4><FaExclamationTriangle style={{ marginRight: 6, color: '#f59e0b' }} />{block.title}</h4>
                  <ul>{block.items.map((item, j) => <li key={j}>{item}</li>)}</ul>
                </div>
              )}

              {block.type === 'solution' && (
                <div className="solution-box">
                  <FaLightbulb style={{ marginRight: 6, color: '#22c55e', flexShrink: 0 }} />
                  <span>{block.value}</span>
                </div>
              )}

              {block.type === 'equation' && (
                <div className="equation-box">
                  <span className="eq-label">{block.label}:</span>
                  <code className="eq-formula">{block.formula}</code>
                </div>
              )}

              {block.type === 'diagram' && <pre className="diagram-box">{block.value}</pre>}

              {block.type === 'keypoint' && (
                <div className="keypoint-box">
                  <FaLightbulb style={{ color: '#f59e0b', flexShrink: 0 }} />
                  <span>{block.value}</span>
                </div>
              )}

              {block.type === 'warning' && (
                <div className="warning-box">
                  <FaExclamationTriangle style={{ color: '#ef4444', flexShrink: 0 }} />
                  <span>{block.value}</span>
                </div>
              )}

              {block.type === 'gates' && (
                <div className="gates-list">
                  {block.items.map((gate, j) => (
                    <div key={j} className="gate-card" style={{ borderLeftColor: gate.color }}>
                      <div className="gate-header">
                        <span className="gate-name" style={{ color: gate.color }}>{gate.name}</span>
                        <code className="gate-symbol">{gate.symbol}</code>
                      </div>
                      <p className="gate-desc">{gate.desc}</p>
                      <code className="gate-formula">{gate.formula}</code>
                    </div>
                  ))}
                </div>
              )}

              {block.type === 'comparison' && (
                <div className="comparison-table-wrap">
                  <h4>{block.title}</h4>
                  <table className="comparison-table">
                    <thead><tr><th>Aspect</th><th>{block.items[0]?.lstm !== undefined && block.items[0]?.gru !== undefined ? 'LSTM' : 'Detail'}</th><th>{block.items[0]?.gru !== undefined ? 'GRU' : 'Used In'}</th></tr></thead>
                    <tbody>
                      {block.items.map((row, j) => (
                        <tr key={j}>
                          <td className="aspect-cell">{row.aspect}</td>
                          <td>{row.lstm}</td>
                          <td>{row.gru}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))}
        </div>

        <button className="mark-complete-btn" onClick={markComplete}>
          {completed.has(activeLesson) ? <><FaCheckCircle /> Completed</> : 'Mark as Complete'}
        </button>
      </div>
    </div>
  );
}

export default LearnPanel;

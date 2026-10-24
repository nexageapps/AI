import React, { useState } from 'react';
import { FaCheckCircle, FaTimesCircle, FaTrophy, FaRedo, FaLightbulb } from 'react-icons/fa';
import './QuizPanel.css';

/*
  Quiz questions adapted from concepts in Stanford CS230 and CS231n.
  Content was rephrased for compliance with licensing restrictions.
*/

const QUESTIONS = [
  {
    q: 'In the CS230 RNN notation, what does the activation a^<t> represent?',
    options: [
      'The input at time step t',
      'The hidden state (memory) at time step t',
      'The output prediction at time step t',
      'The loss at time step t',
    ],
    correct: 1,
    explanation: 'In CS230 notation, a^<t> is the hidden state (activation) at time t. It encodes information from all previous inputs and is computed as a^<t> = g(W_aa * a^<t-1> + W_ax * x^<t> + b_a). This is the network\'s memory.',
  },
  {
    q: 'According to CS231n, what is the key property of RNNs that allows them to handle variable-length sequences?',
    options: [
      'They use different weights at each time step',
      'They have more parameters than feed-forward networks',
      'The same function and same parameters are used at every time step (weight sharing)',
      'They use convolutional layers internally',
    ],
    correct: 2,
    explanation: 'Weight sharing across time is the fundamental property. The same function with the same set of parameters is applied at every time step (CS231n, Lecture 10). This allows the network to process sequences of any length.',
  },
  {
    q: 'Which RNN architecture pattern would you use for Machine Translation (CS231n)?',
    options: [
      'One-to-One',
      'One-to-Many',
      'Many-to-One',
      'Many-to-Many (Encoder-Decoder / Seq2Seq)',
    ],
    correct: 3,
    explanation: 'Machine Translation uses the Seq2Seq (encoder-decoder) pattern: the encoder reads the source sentence into a fixed representation, then the decoder generates the target sentence. Input and output sequences can have different lengths.',
  },
  {
    q: 'How is the total loss computed across time steps in an RNN (CS230)?',
    options: [
      'Only the loss at the final time step is used',
      'The maximum loss across all time steps',
      'The sum of losses at every time step: L = sum_t L(y_hat^<t>, y^<t>)',
      'The average of the first and last time step losses',
    ],
    correct: 2,
    explanation: 'The total loss is the sum of individual losses at each time step: L(y_hat, y) = sum_{t=1}^{T_y} L(y_hat^<t>, y^<t>). This is stated directly in the CS230 RNN cheatsheet. Gradients are then backpropagated through all time steps.',
  },
  {
    q: 'What is the purpose of Truncated BPTT (CS231n)?',
    options: [
      'To make the model more accurate',
      'To add more layers to the network',
      'To limit how far back gradients flow, trading long-range learning for computational efficiency',
      'To increase the learning rate over time',
    ],
    correct: 2,
    explanation: 'Full BPTT through entire sequences is too slow and memory-intensive. Truncated BPTT runs forward and backward through chunks of the sequence, carrying hidden states forward but only backpropagating for a limited number of steps (CS231n).',
  },
  {
    q: 'According to CS230, what are the four types of gates used in LSTM/GRU?',
    options: [
      'Add, Remove, Scale, Shift',
      'Update, Relevance, Forget, Output',
      'Input, Hidden, Cell, Bias',
      'Forward, Backward, Skip, Residual',
    ],
    correct: 1,
    explanation: 'CS230 identifies four gate types: Update gate (how much past matters), Relevance/Reset gate (drop previous info), Forget gate (erase cell, LSTM only), and Output gate (how much to reveal, LSTM only). GRU uses Update and Relevance; LSTM uses all four.',
  },
  {
    q: 'In LSTM, what is the role of the cell state C_t (CS231n)?',
    options: [
      'It stores the current input only',
      'It acts as a gradient highway allowing information to flow through time with minimal modification',
      'It computes the output prediction',
      'It stores the learning rate',
    ],
    correct: 1,
    explanation: 'The cell state acts as a "gradient highway" (CS231n). The gradient through the cell state only involves multiplication by the forget gate: dC_t/dC_{t-1} = f_t. When f_t is near 1, gradients flow almost unchanged, solving the vanishing gradient problem. This is analogous to skip connections in ResNets.',
  },
  {
    q: 'What technique is used to handle exploding gradients in RNNs (CS230)?',
    options: [
      'Dropout',
      'Batch normalization',
      'Gradient clipping -- capping the maximum gradient norm',
      'Weight decay',
    ],
    correct: 2,
    explanation: 'Gradient clipping caps the maximum value for the gradient, preventing the exploding gradient problem. If the gradient norm exceeds a threshold, it is scaled down: g = threshold * g / ||g||. This is standard practice for training RNNs (CS230).',
  },
  {
    q: 'In the attention mechanism (CS230), what does alpha^<t,t\'> represent?',
    options: [
      'The learning rate at time t',
      'The amount of attention output y^<t> should pay to activation a^<t\'>',
      'The forget gate value',
      'The dropout probability',
    ],
    correct: 1,
    explanation: 'alpha^<t,t\'> represents how much attention the output at time t should pay to the encoder activation at time t\'. The context vector is c^<t> = sum of alpha^<t,t\'> * a^<t\'>, with attention weights summing to 1 (CS230).',
  },
  {
    q: 'Why does GRU have fewer parameters than LSTM (CS230)?',
    options: [
      'GRU uses larger weight matrices',
      'GRU combines forget and input gates into one update gate and merges cell/hidden state',
      'GRU does not use any gates',
      'GRU uses a different activation function',
    ],
    correct: 1,
    explanation: 'GRU simplifies LSTM by combining the forget and input gates into a single update gate, and merging the cell state and hidden state. This gives 3 weight computations instead of 4, resulting in ~25% fewer parameters while often achieving similar performance (CS230).',
  },
  {
    q: 'For an LSTM with input_size=10 and hidden_size=20, how many parameters are in the recurrent weights?',
    options: [
      '600',
      '1,200',
      '2,480',
      '4,800',
    ],
    correct: 2,
    explanation: 'LSTM has 4 weight computations (forget, input, gate, output), each with weights for input and hidden state plus bias: 4 x (hidden x (input + hidden) + hidden) = 4 x (20 x 30 + 20) = 4 x 620 = 2,480.',
  },
  {
    q: 'In scaled dot-product self-attention, why do we divide by sqrt(d_k) before softmax (Raschka, 2023)?',
    options: [
      'To make the computation faster',
      'To reduce the number of parameters',
      'Because the dot product variance grows linearly with d_k, and dividing by sqrt(d_k) brings variance back to ~1',
      'To convert the scores to probabilities',
    ],
    correct: 2,
    explanation: 'The dot product between q and k sums d_k independent terms, each with variance ~1. So the total variance grows linearly with d_k. Dividing by sqrt(d_k) cancels this growth, preventing softmax from saturating into extreme values (Raschka, 2023).',
  },
  {
    q: 'In self-attention, what are the three learned weight matrices and what do they produce (Raschka, 2023)?',
    options: [
      'W_f, W_i, W_o producing forget, input, output gates',
      'W_q, W_k, W_v producing query, key, value vectors',
      'W_h, W_x, W_y producing hidden, input, output vectors',
      'W_z, W_r, W_h producing update, reset, hidden vectors',
    ],
    correct: 1,
    explanation: 'Self-attention uses three weight matrices: W_q (query), W_k (key), and W_v (value). Each input x^(i) is projected into q^(i) = W_q * x^(i), k^(i) = W_k * x^(i), v^(i) = W_v * x^(i). The query-key dot product determines attention weights, and values are weighted-summed to produce context vectors (Raschka, 2023).',
  },
  {
    q: 'What is the key difference between self-attention and cross-attention (Raschka, 2023)?',
    options: [
      'Self-attention uses more parameters',
      'Cross-attention is faster',
      'In self-attention, Q/K/V come from the same sequence; in cross-attention, Q comes from one sequence and K/V from another',
      'Cross-attention does not use softmax',
    ],
    correct: 2,
    explanation: 'In self-attention, queries, keys, and values all come from the same input sequence. In cross-attention, queries come from one sequence (e.g., decoder) while keys and values come from a different sequence (e.g., encoder). Setting both sequences equal reduces cross-attention to self-attention (Raschka, 2023).',
  },
  {
    q: 'In multi-head attention, what is the purpose of having multiple heads (Raschka, 2023)?',
    options: [
      'To process the sequence faster',
      'Each head has its own W_q, W_k, W_v and can learn to attend to different types of relationships',
      'To reduce the total number of parameters',
      'To avoid the vanishing gradient problem',
    ],
    correct: 1,
    explanation: 'Multi-head attention runs multiple attention heads in parallel, each with its own set of W_q, W_k, W_v matrices. This is analogous to multiple kernels in CNNs -- each head can learn different attention patterns (e.g., one head for syntactic relationships, another for semantic ones). The outputs are concatenated and projected (Raschka, 2023).',
  },
  {
    q: 'Which evaluation metric is used for machine translation quality (CS230)?',
    options: [
      'Accuracy',
      'F1 Score',
      'BLEU score -- n-gram precision based similarity',
      'Perplexity',
    ],
    correct: 2,
    explanation: 'The BLEU (Bilingual Evaluation Understudy) score measures translation quality by computing n-gram precision between the predicted and reference translations. Perplexity is used for language models. Both are covered in the CS230 RNN cheatsheet.',
  },
];

function QuizPanel() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(new Set());
  const [finished, setFinished] = useState(false);

  const question = QUESTIONS[currentQ];

  const handleAnswer = (idx) => {
    if (answered.has(currentQ)) return;
    setSelected(idx);
    setShowExplanation(true);
    setAnswered(new Set([...answered, currentQ]));
    if (idx === question.correct) setScore(s => s + 1);
  };

  const nextQuestion = () => {
    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelected(null);
      setShowExplanation(false);
    } else {
      setFinished(true);
    }
  };

  const restart = () => {
    setCurrentQ(0);
    setSelected(null);
    setShowExplanation(false);
    setScore(0);
    setAnswered(new Set());
    setFinished(false);
  };

  if (finished) {
    const pct = Math.round((score / QUESTIONS.length) * 100);
    return (
      <div className="quiz-panel">
        <div className="quiz-result">
          <FaTrophy className="quiz-trophy" style={{ color: pct >= 70 ? '#f59e0b' : '#94a3b8' }} />
          <h2 className="quiz-result-title">
            {pct >= 90 ? 'Outstanding!' : pct >= 70 ? 'Great job!' : pct >= 50 ? 'Good effort!' : 'Keep learning!'}
          </h2>
          <div className="quiz-score-big">{score}/{QUESTIONS.length}</div>
          <div className="quiz-pct">{pct}% correct</div>
          <div className="quiz-score-bar">
            <div className="quiz-score-fill" style={{ width: `${pct}%`, background: pct >= 70 ? '#22c55e' : pct >= 50 ? '#f59e0b' : '#ef4444' }} />
          </div>
          <button className="quiz-restart-btn" onClick={restart}><FaRedo /> Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-panel">
      <div className="quiz-header">
        <span className="quiz-progress">Question {currentQ + 1} of {QUESTIONS.length}</span>
        <span className="quiz-score">Score: {score}/{answered.size}</span>
      </div>
      <div className="quiz-progress-bar">
        <div className="quiz-progress-fill" style={{ width: `${((currentQ + 1) / QUESTIONS.length) * 100}%` }} />
      </div>
      <div className="quiz-question">{question.q}</div>
      <div className="quiz-options">
        {question.options.map((opt, i) => {
          let cls = 'quiz-option';
          if (showExplanation) {
            if (i === question.correct) cls += ' correct';
            else if (i === selected && i !== question.correct) cls += ' wrong';
          } else if (selected === i) cls += ' selected';
          return (
            <button key={i} className={cls} onClick={() => handleAnswer(i)} disabled={answered.has(currentQ)}>
              <span className="qo-letter">{String.fromCharCode(65 + i)}</span>
              <span className="qo-text">{opt}</span>
              {showExplanation && i === question.correct && <FaCheckCircle className="qo-icon correct" />}
              {showExplanation && i === selected && i !== question.correct && <FaTimesCircle className="qo-icon wrong" />}
            </button>
          );
        })}
      </div>
      {showExplanation && (
        <div className={`quiz-explanation ${selected === question.correct ? 'correct' : 'wrong'}`}>
          <FaLightbulb style={{ flexShrink: 0, color: selected === question.correct ? '#22c55e' : '#f59e0b' }} />
          <div>
            <strong>{selected === question.correct ? 'Correct!' : 'Not quite.'}</strong>
            <p>{question.explanation}</p>
          </div>
        </div>
      )}
      {showExplanation && (
        <button className="quiz-next-btn" onClick={nextQuestion}>
          {currentQ < QUESTIONS.length - 1 ? 'Next Question' : 'See Results'}
        </button>
      )}
    </div>
  );
}

export default QuizPanel;

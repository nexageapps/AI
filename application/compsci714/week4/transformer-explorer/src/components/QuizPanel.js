import React, { useState } from 'react';
import { FiAward, FiCheckCircle, FiXCircle, FiArrowRight, FiRotateCcw, FiStar, FiThumbsUp, FiBookOpen } from 'react-icons/fi';

const QUESTIONS = [
  { q: 'What are the three components of the attention mechanism?',
    opts: ['Input, Output, Hidden', 'Query, Key, Value', 'Encoder, Decoder, Attention', 'Weight, Bias, Activation'],
    answer: 1, explain: 'Attention uses Query (what am I looking for?), Key (what do I represent?), and Value (what info do I carry?).' },
  { q: 'Why do we scale the dot product by sqrt(d_k)?',
    opts: ['To make it faster', 'To prevent dot products from growing too large, which would push softmax into saturated regions',
      'To normalize the output to 0-1', 'To reduce the number of parameters'],
    answer: 1, explain: 'Large dot products push softmax into regions with tiny gradients. Scaling by sqrt(d_k) keeps values in a good range.' },
  { q: 'What is the main advantage of self-attention over RNNs?',
    opts: ['Uses fewer parameters', 'Can process all positions in parallel instead of sequentially',
      'Works only with images', 'Requires less training data'],
    answer: 1, explain: 'Self-attention computes all pairwise relationships simultaneously, enabling massive parallelization. RNNs must process tokens one by one.' },
  { q: 'What does the causal mask in the decoder do?',
    opts: ['Removes padding tokens', 'Prevents each position from attending to future positions',
      'Increases the attention scores', 'Connects encoder to decoder'],
    answer: 1, explain: 'The causal mask ensures that when generating token t, the model can only see tokens 1..t-1. This prevents "cheating" by looking ahead.' },
  { q: 'Why use multiple attention heads instead of one?',
    opts: ['To use more memory', 'Each head can learn different types of relationships (syntax, semantics, position)',
      'To make the model slower', 'Multiple heads are required by the math'],
    answer: 1, explain: 'Different heads specialize in different patterns. One might track syntax, another semantics, another local context.' },
  { q: 'What is positional encoding used for?',
    opts: ['To encode the meaning of words', 'To inject word order information since transformers have no built-in notion of sequence position',
      'To reduce the sequence length', 'To normalize attention weights'],
    answer: 1, explain: 'Without positional encoding, a transformer would treat "dog bites man" and "man bites dog" identically.' },
  { q: 'In cross-attention, where do Q, K, V come from?',
    opts: ['All from the encoder', 'All from the decoder', 'Q from decoder, K and V from encoder', 'Q from encoder, K and V from decoder'],
    answer: 2, explain: 'In cross-attention, the decoder generates Queries ("what do I need?") and looks up Keys/Values from the encoder output.' },
  { q: 'Which model type is GPT?',
    opts: ['Encoder-only', 'Encoder-Decoder', 'Decoder-only', 'Attention-only'],
    answer: 2, explain: 'GPT is decoder-only — it uses causal (masked) self-attention to generate text left-to-right.' },
];

export default function QuizPanel() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const q = QUESTIONS[current];
  const handleSelect = (idx) => { if (selected !== null) return; setSelected(idx); if (idx === q.answer) setScore(s => s + 1); };
  const next = () => { if (current + 1 >= QUESTIONS.length) setFinished(true); else { setCurrent(c => c + 1); setSelected(null); } };
  const restart = () => { setCurrent(0); setSelected(null); setScore(0); setFinished(false); };

  if (finished) {
    const pct = Math.round((score / QUESTIONS.length) * 100);
    const Icon = pct >= 80 ? FiStar : pct >= 50 ? FiThumbsUp : FiBookOpen;
    return (
      <div className="panel" style={{ textAlign: 'center' }}>
        <h2><FiAward /> Quiz Complete</h2>
        <p style={{ fontSize: '1.2rem', margin: '20px 0' }}>You scored <strong>{score}/{QUESTIONS.length}</strong> ({pct}%)</p>
        <div className="info-box" style={{ display: 'inline-flex', justifyContent: 'center' }}>
          <Icon className="info-icon" />
          <div>{pct >= 80 ? 'Excellent! You understand transformers well.' : pct >= 50 ? 'Good effort! Review the tabs to strengthen your knowledge.' : 'Keep learning! Go through Self-Attention and Multi-Head tabs again.'}</div>
        </div>
        <div style={{ marginTop: 20 }}><button className="btn btn-primary" onClick={restart}><FiRotateCcw /> Try Again</button></div>
      </div>
    );
  }
  return (
    <div><div className="panel">
      <h2><FiAward /> Transformer Quiz</h2>
      <div className="quiz-progress"><div className="quiz-progress-bar" style={{ width: `${(current / QUESTIONS.length) * 100}%` }}></div></div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <span className="quiz-score">Question {current + 1} / {QUESTIONS.length}</span>
        <span className="quiz-score">Score: {score}</span>
      </div>
      <h3 style={{ marginBottom: 16 }}>{q.q}</h3>
      {q.opts.map((opt, i) => {
        let cls = 'quiz-option';
        if (selected !== null) { cls += ' disabled'; if (i === q.answer) cls += ' correct'; else if (i === selected) cls += ' wrong'; }
        return <button key={i} className={cls} onClick={() => handleSelect(i)}>{String.fromCharCode(65+i)}. {opt}</button>;
      })}
      {selected !== null && (
        <>
          <div className={`info-box${selected === q.answer ? ' success' : ' warning'}`}>
            {selected === q.answer ? <FiCheckCircle className="info-icon" /> : <FiXCircle className="info-icon" />}
            <div>{selected === q.answer ? 'Correct! ' : 'Not quite. '}{q.explain}</div>
          </div>
          <div style={{ marginTop: 12 }}><button className="btn btn-primary" onClick={next}>
            {current + 1 >= QUESTIONS.length ? 'See Results' : <><FiArrowRight /> Next</>}
          </button></div>
        </>
      )}
    </div></div>
  );
}

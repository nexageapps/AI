import React from 'react';
import { FiBookOpen, FiEye, FiLayers, FiCpu, FiAward, FiArrowRight, FiInfo, FiZap, FiTarget } from 'react-icons/fi';

const SECTIONS = [
  { id: 'attn', icon: FiEye, title: 'Self-Attention', level: 'Beginner', levelColor: '#22c55e', levelBg: '#dcfce7',
    desc: 'Type a sentence and see how each word attends to every other word. Watch the attention heatmap update live.' },
  { id: 'multi', icon: FiLayers, title: 'Multi-Head Attention', level: 'Intermediate', levelColor: '#f59e0b', levelBg: '#fef3c7',
    desc: 'See how multiple attention heads capture different relationships — syntax, semantics, position — simultaneously.' },
  { id: 'arch', icon: FiCpu, title: 'Transformer Architecture', level: 'Advanced', levelColor: '#ef4444', levelBg: '#fee2e2',
    desc: 'Explore the full encoder-decoder architecture. Understand how all the pieces fit together.' },
  { id: 'quiz', icon: FiAward, title: 'Quiz', level: 'All Levels', levelColor: '#8b5cf6', levelBg: '#ede9fe',
    desc: 'Test your understanding of attention, transformers, Q/K/V, positional encoding, and more.' },
];

export default function LearnPanel({ onNavigate }) {
  return (
    <div>
      <div className="panel">
        <h2><FiBookOpen /> What are Transformers?</h2>
        <p>
          The <strong>Transformer</strong> is the architecture behind GPT, BERT, and virtually every modern
          language model. Its key innovation is the <strong>attention mechanism</strong> — instead of processing
          words one at a time (like RNNs), it lets every word look at every other word simultaneously.
        </p>
        <div className="info-box">
          <FiInfo className="info-icon" />
          <div>
            <strong>The paper that started it all:</strong> "Attention Is All You Need" (Vaswani et al., 2017)
            replaced recurrence entirely with attention, enabling massive parallelization and better long-range understanding.
          </div>
        </div>
      </div>
      <div className="panel">
        <h2><FiZap /> Three Key Ideas</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, margin: '16px 0' }}>
          <div className="info-box success" style={{ flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <FiEye style={{ fontSize: '1.5rem' }} />
            <strong>Self-Attention</strong>
            <span>Every word computes how relevant every other word is to it using Query, Key, Value.</span>
          </div>
          <div className="info-box" style={{ flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <FiLayers style={{ fontSize: '1.5rem' }} />
            <strong>Multi-Head</strong>
            <span>Multiple attention heads run in parallel, each learning different types of relationships.</span>
          </div>
          <div className="info-box warning" style={{ flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <FiTarget style={{ fontSize: '1.5rem' }} />
            <strong>Positional Encoding</strong>
            <span>Since there is no recurrence, position info is injected via sine/cosine functions.</span>
          </div>
        </div>
      </div>

      <div className="panel">
        <h2><FiArrowRight /> Learning Path</h2>
        <p>Work through these sections in order:</p>
        <div className="learn-grid">
          {SECTIONS.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={s.id} className="learn-card" onClick={() => onNavigate(s.id)}>
                <span className="card-level" style={{ background: s.levelBg, color: s.levelColor }}>{s.level}</span>
                <h4><Icon /> {i + 1}. {s.title}</h4>
                <p>{s.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

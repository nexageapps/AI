import React from 'react';
import { FiBookOpen, FiScissors, FiType, FiBarChart2, FiGlobe, FiAward, FiArrowRight, FiInfo, FiZap, FiTarget, FiAlertTriangle, FiCheckCircle } from 'react-icons/fi';

const SECTIONS = [
  { id: 'bpe', icon: FiScissors, title: 'BPE Algorithm', level: 'Beginner', levelColor: '#22c55e', levelBg: '#dcfce7',
    desc: 'Step through BPE merge-by-merge on your own text. See pairs counted, merged, and the vocabulary grow in real time.' },
  { id: 'tokenizer', icon: FiType, title: 'Live Tokenizer', level: 'Intermediate', levelColor: '#f59e0b', levelBg: '#fef3c7',
    desc: 'Type any text and instantly see how it gets split into subword tokens. Watch how rare words decompose into known pieces.' },
  { id: 'compare', icon: FiBarChart2, title: 'Compare Methods', level: 'Intermediate', levelColor: '#f59e0b', levelBg: '#fef3c7',
    desc: 'See character, word, and BPE tokenization side by side. Understand the trade-offs in token count, vocab size, and OOV handling.' },
  { id: 'realworld', icon: FiGlobe, title: 'Real World', level: 'Advanced', levelColor: '#ef4444', levelBg: '#fee2e2',
    desc: 'Explore how GPT, BERT, and LLaMA tokenize text differently. See vocabulary sizes, special tokens, and edge cases.' },
  { id: 'quiz', icon: FiAward, title: 'Quiz', level: 'All Levels', levelColor: '#8b5cf6', levelBg: '#ede9fe',
    desc: 'Test your understanding with 10 questions on tokenization, BPE merges, vocabulary design, and real-world usage.' },
];

export default function LearnPanel({ onNavigate }) {
  return (
    <div>
      <div className="panel">
        <h2><FiBookOpen /> What is Tokenization?</h2>
        <p>
          Before any language model can process text, it must be broken into <strong>tokens</strong> — the
          atomic units the model works with. Tokenization is the very first step in the NLP pipeline, and
          it fundamentally affects how well a model understands language.
        </p>
        <p>
          <strong>Byte Pair Encoding (BPE)</strong> is the tokenization algorithm behind GPT-2, GPT-3, GPT-4,
          LLaMA, and most modern language models. It was originally a data compression technique, adapted
          brilliantly for NLP by Sennrich et al. (2016).
        </p>
      </div>

      <div className="panel">
        <h2><FiZap /> The Tokenization Problem</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, margin: '16px 0' }}>
          <div className="info-box warning" style={{ flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <FiAlertTriangle style={{ fontSize: '1.5rem' }} />
            <strong>Character-Level</strong>
            <span style={{ fontFamily: 'monospace', fontSize: '0.78rem' }}>"hello" → [h, e, l, l, o]</span>
            <span>Tiny vocab (~256) but sequences are 5x longer. Model must learn spelling from scratch.</span>
          </div>
          <div className="info-box" style={{ flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <FiAlertTriangle style={{ fontSize: '1.5rem' }} />
            <strong>Word-Level</strong>
            <span style={{ fontFamily: 'monospace', fontSize: '0.78rem' }}>"hello" → [hello]</span>
            <span>Short sequences but vocab is 100K+. Cannot handle new words like "ChatGPT" or "COVID-19".</span>
          </div>
          <div className="info-box success" style={{ flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <FiCheckCircle style={{ fontSize: '1.5rem' }} />
            <strong>BPE (Subword)</strong>
            <span style={{ fontFamily: 'monospace', fontSize: '0.78rem' }}>"unhappiness" → [un, happi, ness]</span>
            <span>Medium vocab (30-50K). Handles any word by decomposing into known subwords. Best of both worlds.</span>
          </div>
        </div>
      </div>

      <div className="panel">
        <h2><FiTarget /> How BPE Works (In 30 Seconds)</h2>
        <div className="algo-steps">
          <div className="algo-step"><span className="algo-num">1</span><div><strong>Start with characters.</strong> Split every word into individual characters plus an end-of-word marker.</div></div>
          <div className="algo-step"><span className="algo-num">2</span><div><strong>Count all adjacent pairs.</strong> Find which two neighbouring tokens appear together most often.</div></div>
          <div className="algo-step"><span className="algo-num">3</span><div><strong>Merge the top pair.</strong> Replace every occurrence of that pair with a single new token.</div></div>
          <div className="algo-step"><span className="algo-num">4</span><div><strong>Repeat.</strong> Go back to step 2. Each merge adds one token to the vocabulary.</div></div>
          <div className="algo-step"><span className="algo-num">5</span><div><strong>Stop</strong> when you reach the desired vocabulary size (e.g., 50,000 tokens).</div></div>
        </div>
        <div className="info-box">
          <FiInfo className="info-icon" />
          <div>The key insight: <strong>common words</strong> like "the" become single tokens early. <strong>Rare words</strong> like "pneumonoultramicroscopicsilicovolcanoconiosis" get split into known subwords. The model never sees an "unknown" token.</div>
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

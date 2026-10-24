import React, { useState, useMemo } from 'react';
import { FiLayers, FiInfo, FiArrowRight } from 'react-icons/fi';

function pseudoEmbed(word, dim, seed) {
  const vec = [];
  let h = seed;
  for (let i = 0; i < word.length; i++) h = ((h << 5) - h + word.charCodeAt(i)) | 0;
  for (let i = 0; i < dim; i++) {
    h = ((h * 1103515245 + 12345) & 0x7fffffff);
    vec.push((h % 1000) / 500 - 1);
  }
  return vec;
}
function dot(a, b) { return a.reduce((s, v, i) => s + v * b[i], 0); }
function softmax(arr) {
  const max = Math.max(...arr);
  const exps = arr.map(v => Math.exp(v - max));
  const sum = exps.reduce((a, b) => a + b, 0);
  return exps.map(v => v / sum);
}

const HEAD_NAMES = [
  { name: 'Syntactic', desc: 'Focuses on grammatical structure (subject-verb, adjective-noun)', color: '#3b82f6', bg: '#dbeafe' },
  { name: 'Semantic', desc: 'Captures meaning relationships (synonyms, related concepts)', color: '#22c55e', bg: '#dcfce7' },
  { name: 'Positional', desc: 'Attends to nearby words (local context window)', color: '#f59e0b', bg: '#fef3c7' },
  { name: 'Long-Range', desc: 'Connects distant but related words (coreference)', color: '#ef4444', bg: '#fee2e2' },
];

function computeHeads(words) {
  const dim = 8;
  return HEAD_NAMES.map((_, hi) => {
    const embs = words.map(w => pseudoEmbed(w.toLowerCase(), dim, hi * 7919 + 31));
    const scale = Math.sqrt(dim);
    return embs.map(q => softmax(embs.map(k => dot(q, k) / scale)));
  });
}

export default function MultiHeadPanel() {
  const [sentence, setSentence] = useState('The cat sat on the mat');
  const [activeHead, setActiveHead] = useState(0);

  const words = sentence.trim().split(/\s+/).filter(Boolean);
  const heads = useMemo(() => words.length > 1 ? computeHeads(words) : [], [words]);
  const weights = heads[activeHead] || [];
  const head = HEAD_NAMES[activeHead];

  const heatColor = (v) => `rgb(${Math.round(255-v*200)},${Math.round(255-v*150)},${Math.round(100+v*155)})`;

  return (
    <div>
      <div className="panel">
        <h2><FiLayers /> Multi-Head Attention</h2>
        <p>
          Instead of one attention function, transformers run <strong>multiple attention heads in parallel</strong>.
          Each head uses different learned projections of Q, K, V, so each head can focus on different
          types of relationships. The outputs are concatenated and projected back.
        </p>
        <div className="info-box">
          <FiInfo className="info-icon" />
          <div><strong>MultiHead(Q,K,V)</strong> = Concat(head<sub>1</sub>, ..., head<sub>h</sub>) W<sup>O</sup><br/>
          where head<sub>i</sub> = Attention(QW<sub>i</sub><sup>Q</sup>, KW<sub>i</sub><sup>K</sup>, VW<sub>i</sub><sup>V</sup>)</div>
        </div>
      </div>

      <div className="panel">
        <input className="sentence-input" value={sentence} onChange={e => setSentence(e.target.value)}
          placeholder="Type a sentence..." />
        <div className="controls" style={{ marginTop: 12 }}>
          {HEAD_NAMES.map((h, i) => (
            <button key={i} className={`btn${activeHead === i ? ' btn-primary' : ''}`}
              style={activeHead !== i ? { borderColor: h.color, color: h.color } : {}}
              onClick={() => setActiveHead(i)}>
              {h.name} Head
            </button>
          ))}
        </div>

        {words.length > 1 && (
          <>
            <div className="info-box" style={{ background: head.bg, borderColor: head.color, color: '#1a2332', marginTop: 12 }}>
              <FiInfo className="info-icon" style={{ color: head.color }} />
              <div><strong>{head.name} Head:</strong> {head.desc}</div>
            </div>
            <div style={{ overflowX: 'auto', marginTop: 12 }}>
              <div style={{ display: 'inline-block' }}>
                <div style={{ display: 'flex', marginLeft: 60 }}>
                  {words.map((w, i) => (
                    <div key={i} className="heatmap-label" style={{ width: 56 }}>{w.length > 6 ? w.slice(0,5)+'..' : w}</div>
                  ))}
                </div>
                {weights.map((row, ri) => (
                  <div key={ri} style={{ display: 'flex', alignItems: 'center' }}>
                    <div className="heatmap-label" style={{ width: 60, justifyContent: 'flex-end', paddingRight: 8 }}>
                      {words[ri].length > 6 ? words[ri].slice(0,5)+'..' : words[ri]}
                    </div>
                    <div className="heatmap" style={{ gridTemplateColumns: `repeat(${words.length}, 56px)`, display: 'inline-grid' }}>
                      {row.map((v, ci) => (
                        <div key={ci} className="heatmap-cell"
                          style={{ background: heatColor(v), color: v > 0.3 ? '#fff' : '#1a2332' }}>
                          {v.toFixed(2)}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      <div className="panel">
        <h3>How Multi-Head Works</h3>
        <div className="arch-flow" style={{ gap: 8 }}>
          <div className="arch-block" style={{ background: '#e0f2fe', borderColor: '#0ea5e9' }}>Input<span className="block-label">Embeddings</span></div>
          <span className="arch-arrow"><FiArrowRight /></span>
          {HEAD_NAMES.map((h, i) => (
            <React.Fragment key={i}>
              <div className="arch-block" style={{ background: h.bg, borderColor: h.color, minWidth: 70 }}>
                Head {i+1}<span className="block-label">{h.name}</span>
              </div>
              {i < HEAD_NAMES.length - 1 && <span style={{ color: '#dde3ea' }}>|</span>}
            </React.Fragment>
          ))}
          <span className="arch-arrow"><FiArrowRight /></span>
          <div className="arch-block" style={{ background: '#ede9fe', borderColor: '#8b5cf6' }}>Concat<span className="block-label">All heads</span></div>
          <span className="arch-arrow"><FiArrowRight /></span>
          <div className="arch-block" style={{ background: '#dcfce7', borderColor: '#22c55e' }}>Linear<span className="block-label">W<sup>O</sup></span></div>
        </div>
        <div className="info-box success">
          <FiInfo className="info-icon" />
          <div>
            <strong>Why multiple heads?</strong> One head might learn syntax, another semantics, another positional patterns.
            Together they give the model a richer understanding than any single attention function could.
            GPT-3 uses 96 heads; BERT-base uses 12.
          </div>
        </div>
      </div>
    </div>
  );
}

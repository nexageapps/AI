import React, { useState, useMemo } from 'react';
import { FiEye, FiInfo, FiCheckCircle } from 'react-icons/fi';

// Simple hash-based pseudo-embedding for demo purposes
function pseudoEmbed(word, dim) {
  const vec = [];
  let h = 0;
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

function computeAttention(words) {
  const dim = 8;
  const embeddings = words.map(w => pseudoEmbed(w.toLowerCase(), dim));
  const scale = Math.sqrt(dim);
  const weights = embeddings.map(q =>
    softmax(embeddings.map(k => dot(q, k) / scale))
  );
  return weights;
}

const EXAMPLES = [
  'The cat sat on the mat',
  'The animal did not cross the street because it was too tired',
  'I love machine learning and deep neural networks',
  'Attention is all you need',
];

export default function AttentionPanel() {
  const [sentence, setSentence] = useState(EXAMPLES[0]);
  const [hovered, setHovered] = useState(null);

  const words = sentence.trim().split(/\s+/).filter(Boolean);
  const weights = useMemo(() => words.length > 1 ? computeAttention(words) : [], [words]);

  const heatColor = (v) => {
    const r = Math.round(255 - v * 200);
    const g = Math.round(255 - v * 150);
    const b = Math.round(100 + v * 155);
    return `rgb(${r},${g},${b})`;
  };

  return (
    <div>
      <div className="panel">
        <h2><FiEye /> Self-Attention Visualizer</h2>
        <p>
          In self-attention, each word computes a <strong>Query</strong> ("what am I looking for?"),
          a <strong>Key</strong> ("what do I represent?"), and a <strong>Value</strong> ("what info do I carry?").
          The attention score between two words is the dot product of Query and Key, scaled and softmaxed.
        </p>
        <div className="info-box">
          <FiInfo className="info-icon" />
          <div><strong>Formula:</strong> Attention(Q, K, V) = softmax(QK<sup>T</sup> / sqrt(d<sub>k</sub>)) V</div>
        </div>
      </div>

      <div className="panel">
        <h3>Type a sentence or pick an example</h3>
        <input className="sentence-input" value={sentence}
          onChange={e => setSentence(e.target.value)}
          placeholder="Type a sentence here..." />
        <div className="controls" style={{ marginTop: 8 }}>
          {EXAMPLES.map((ex, i) => (
            <button key={i} className={`btn${sentence === ex ? ' btn-primary' : ''}`}
              onClick={() => setSentence(ex)}>{ex.length > 30 ? ex.slice(0, 28) + '...' : ex}</button>
          ))}
        </div>
      </div>

      {words.length > 1 && (
        <div className="panel">
          <h3>Attention Heatmap</h3>
          <p>Each row shows how much attention a word (Query) pays to every other word (Key). Brighter = stronger attention. Hover over cells to inspect.</p>
          <div style={{ overflowX: 'auto' }}>
            <div style={{ display: 'inline-block' }}>
              {/* Column headers */}
              <div style={{ display: 'flex', marginLeft: 60 }}>
                {words.map((w, i) => (
                  <div key={i} className="heatmap-label" style={{ width: 56 }}>{w.length > 6 ? w.slice(0,5) + '..' : w}</div>
                ))}
              </div>
              {/* Rows */}
              {weights.map((row, ri) => (
                <div key={ri} style={{ display: 'flex', alignItems: 'center' }}>
                  <div className="heatmap-label" style={{ width: 60, justifyContent: 'flex-end', paddingRight: 8 }}>
                    {words[ri].length > 6 ? words[ri].slice(0,5) + '..' : words[ri]}
                  </div>
                  <div className="heatmap" style={{ gridTemplateColumns: `repeat(${words.length}, 56px)`, display: 'inline-grid' }}>
                    {row.map((v, ci) => (
                      <div key={ci} className="heatmap-cell"
                        style={{ background: heatColor(v), color: v > 0.3 ? '#fff' : '#1a2332' }}
                        onMouseEnter={() => setHovered({ r: ri, c: ci, v })}
                        onMouseLeave={() => setHovered(null)}>
                        {v.toFixed(2)}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {hovered && (
            <div className="info-box" style={{ marginTop: 12 }}>
              <FiInfo className="info-icon" />
              <div>
                <strong>"{words[hovered.r]}"</strong> pays <strong>{(hovered.v * 100).toFixed(1)}%</strong> attention
                to <strong>"{words[hovered.c]}"</strong>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Token highlight view */}
      {words.length > 1 && (
        <div className="panel">
          <h3>Token Focus View</h3>
          <p>Click a word to see what it attends to most. Thicker borders = stronger attention.</p>
          <div className="token-row">
            {words.map((w, i) => {
              const isSource = hovered?.r === i;
              const attnFromHovered = hovered ? weights[hovered.r][i] : 0;
              const borderW = hovered ? Math.max(1, Math.round(attnFromHovered * 8)) : 1;
              return (
                <div key={i} className={`token-chip${isSource ? ' active' : ''}`}
                  style={hovered ? { borderWidth: borderW, borderColor: isSource ? '#00467F' : heatColor(attnFromHovered) } : {}}
                  onMouseEnter={() => setHovered({ r: i, c: i, v: weights[i][i] })}
                  onMouseLeave={() => setHovered(null)}>
                  {w}
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="panel">
        <h3>Key Concepts</h3>
        <div className="info-box success">
          <FiCheckCircle className="info-icon" />
          <div>
            <strong>Query (Q):</strong> "What am I looking for?" — generated from the current word.<br/>
            <strong>Key (K):</strong> "What do I represent?" — generated from each candidate word.<br/>
            <strong>Value (V):</strong> "What info do I carry?" — the actual content to aggregate.<br/>
            <strong>Scaling:</strong> Divide by sqrt(d<sub>k</sub>) to prevent dot products from getting too large.
          </div>
        </div>
      </div>
    </div>
  );
}

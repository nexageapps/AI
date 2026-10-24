import React, { useState, useMemo } from 'react';
import {
  FaInfoCircle, FaLightbulb, FaRedo, FaKey, FaSearch, FaDatabase,
} from 'react-icons/fa';
import './SelfAttentionViz.css';

/*
  Interactive self-attention visualizer inspired by:
  Sebastian Raschka, "Understanding and Coding the Self-Attention Mechanism
  of Large Language Models From Scratch" (2023)
  https://sebastianraschka.com/blog/2023/self-attention-from-scratch.html
  Content was rephrased for compliance with licensing restrictions.
*/

const SENTENCES = [
  { words: ['The', 'cat', 'sat', 'on', 'the', 'mat'], label: 'Simple sentence' },
  { words: ['Life', 'is', 'short', 'eat', 'dessert', 'first'], label: 'Raschka example' },
  { words: ['I', 'love', 'deep', 'learning', 'models'], label: 'ML sentence' },
  { words: ['Bank', 'of', 'the', 'river', 'was', 'steep'], label: 'Ambiguous word' },
];

function softmax(arr) {
  const max = Math.max(...arr);
  const exps = arr.map(x => Math.exp(x - max));
  const sum = exps.reduce((a, b) => a + b, 0);
  return exps.map(x => x / sum);
}

function dot(a, b) {
  return a.reduce((s, v, i) => s + v * b[i], 0);
}

function generateEmbeddings(words, seed) {
  const dim = 8;
  const embeddings = [];
  for (let w = 0; w < words.length; w++) {
    const vec = [];
    let s = seed + w * 17;
    for (let d = 0; d < dim; d++) {
      s = (s * 1103515245 + 12345) & 0x7fffffff;
      vec.push((s / 0x7fffffff) * 2 - 1);
    }
    embeddings.push(vec);
  }
  return embeddings;
}

function generateWeightMatrix(rows, cols, seed) {
  const mat = [];
  let s = seed;
  for (let r = 0; r < rows; r++) {
    const row = [];
    for (let c = 0; c < cols; c++) {
      s = (s * 1103515245 + 12345) & 0x7fffffff;
      row.push(((s / 0x7fffffff) * 2 - 1) * 0.5);
    }
    mat.push(row);
  }
  return mat;
}

function matVecMul(mat, vec) {
  return mat.map(row => dot(row, vec));
}

function SelfAttentionViz() {
  const [sentIdx, setSentIdx] = useState(0);
  const [queryIdx, setQueryIdx] = useState(1);
  const [dkSize, setDkSize] = useState(4);
  const [seed, setSeed] = useState(42);
  const [showScaling, setShowScaling] = useState(true);
  const [numHeads, setNumHeads] = useState(1);

  const words = SENTENCES[sentIdx].words;
  const T = words.length;

  const { queries, keys, values, attentionWeights, contextVector, rawScores } = useMemo(() => {
    const emb = generateEmbeddings(words, seed);
    const dim = emb[0].length;
    const Wq = generateWeightMatrix(dkSize, dim, seed + 100);
    const Wk = generateWeightMatrix(dkSize, dim, seed + 200);
    const Wv = generateWeightMatrix(dkSize, dim, seed + 300);

    const q = emb.map(e => matVecMul(Wq, e));
    const k = emb.map(e => matVecMul(Wk, e));
    const v = emb.map(e => matVecMul(Wv, e));

    const qVec = q[queryIdx] || q[0];
    const raw = k.map(ki => dot(qVec, ki));
    const scaled = showScaling ? raw.map(r => r / Math.sqrt(dkSize)) : raw;
    const attn = softmax(scaled);

    const ctx = new Array(dkSize).fill(0);
    for (let j = 0; j < T; j++) {
      for (let d = 0; d < dkSize; d++) {
        ctx[d] += attn[j] * v[j][d];
      }
    }

    return { embeddings: emb, queries: q, keys: k, values: v, attentionWeights: attn, contextVector: ctx, rawScores: raw };
  }, [words, queryIdx, dkSize, seed, showScaling, T]);

  const maxAttn = Math.max(...attentionWeights);

  return (
    <div className="sa-viz">
      <div className="sa-intro">
        <FaInfoCircle style={{ color: '#00467F', flexShrink: 0 }} />
        <span>
          Interactive scaled dot-product self-attention. Select a query word to see how it attends to all other words.
          Based on concepts from <a href="https://sebastianraschka.com/blog/2023/self-attention-from-scratch.html" target="_blank" rel="noopener noreferrer">Raschka (2023)</a>.
        </span>
      </div>

      <div className="sa-controls">
        <div className="sa-sent-selector">
          {SENTENCES.map((s, i) => (
            <button key={i} className={`sa-sent-btn ${sentIdx === i ? 'active' : ''}`}
              onClick={() => { setSentIdx(i); setQueryIdx(Math.min(queryIdx, s.words.length - 1)); }}>
              {s.label}
            </button>
          ))}
        </div>
        <div className="sa-params">
          <label className="sa-param">
            d_k: {dkSize}
            <input type="range" min={2} max={8} value={dkSize}
              onChange={e => setDkSize(Number(e.target.value))} aria-label="Key dimension" />
          </label>
          <label className="sa-param">
            <input type="checkbox" checked={showScaling} onChange={e => setShowScaling(e.target.checked)} />
            Scale by 1/sqrt(d_k)
          </label>
          <label className="sa-param">
            Heads: {numHeads}
            <input type="range" min={1} max={4} value={numHeads}
              onChange={e => setNumHeads(Number(e.target.value))} aria-label="Number of heads" />
          </label>
          <button className="sa-reseed-btn" onClick={() => setSeed(s => s + 1)} title="Randomize weights">
            <FaRedo /> New Weights
          </button>
        </div>
      </div>

      <div className="sa-query-selector">
        <span className="sa-qs-label"><FaSearch style={{ marginRight: 4 }} /> Query word (click to change):</span>
        <div className="sa-word-row">
          {words.map((w, i) => (
            <button key={i} className={`sa-word-btn ${queryIdx === i ? 'query-active' : ''}`}
              onClick={() => setQueryIdx(i)}>
              {w}
            </button>
          ))}
        </div>
      </div>

      <div className="sa-main-layout">
        <div className="sa-qkv-panel">
          <div className="sa-qkv-section">
            <div className="sa-qkv-header"><FaSearch className="sa-qkv-icon query-color" /> Query (q)</div>
            <div className="sa-vec">{queries[queryIdx]?.map((v, i) => <span key={i} className="sa-vec-val">{v.toFixed(2)}</span>)}</div>
          </div>
          <div className="sa-qkv-section">
            <div className="sa-qkv-header"><FaKey className="sa-qkv-icon key-color" /> Keys (k)</div>
            {words.map((w, j) => (
              <div key={j} className="sa-key-row">
                <span className="sa-key-word">{w}</span>
                <div className="sa-vec-mini">{keys[j]?.map((v, i) => <span key={i} className="sa-vec-val-sm">{v.toFixed(1)}</span>)}</div>
              </div>
            ))}
          </div>
          <div className="sa-qkv-section">
            <div className="sa-qkv-header"><FaDatabase className="sa-qkv-icon value-color" /> Values (v)</div>
            {words.map((w, j) => (
              <div key={j} className="sa-key-row">
                <span className="sa-key-word">{w}</span>
                <div className="sa-vec-mini">{values[j]?.map((v, i) => <span key={i} className="sa-vec-val-sm">{v.toFixed(1)}</span>)}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="sa-attention-panel">
          <div className="sa-attn-title">
            Attention weights for "{words[queryIdx]}"
            {showScaling && <span className="sa-scale-badge">scaled by 1/sqrt({dkSize})</span>}
          </div>

          <div className="sa-attn-bars">
            {words.map((w, j) => {
              const weight = attentionWeights[j];
              const isMax = weight === maxAttn;
              return (
                <div key={j} className={`sa-attn-row ${isMax ? 'max-attn' : ''}`}>
                  <span className="sa-attn-word">{w}</span>
                  <div className="sa-attn-bar-track">
                    <div className="sa-attn-bar-fill"
                      style={{
                        width: `${weight * 100}%`,
                        background: isMax ? '#00467F' : '#93c5fd',
                        opacity: 0.4 + weight * 0.6,
                      }} />
                  </div>
                  <span className="sa-attn-pct">{(weight * 100).toFixed(1)}%</span>
                  <span className="sa-attn-raw" title="Raw score (before softmax)">
                    raw: {rawScores[j]?.toFixed(2)}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="sa-context-section">
            <div className="sa-ctx-header">Context vector z for "{words[queryIdx]}"</div>
            <div className="sa-vec">{contextVector.map((v, i) => <span key={i} className="sa-vec-val ctx-val">{v.toFixed(3)}</span>)}</div>
            <p className="sa-ctx-desc">This vector is the attention-weighted sum of all value vectors. It encodes "{words[queryIdx]}" enriched with context from the entire sequence.</p>
          </div>

          {numHeads > 1 && (
            <div className="sa-multihead-note">
              <FaLightbulb style={{ color: '#f59e0b', flexShrink: 0 }} />
              <span>With {numHeads} attention heads, there would be {numHeads} separate sets of W_q, W_k, W_v matrices, each producing its own context vector. These are concatenated and projected to form the final output. Each head can learn different attention patterns (Raschka, 2023).</span>
            </div>
          )}
        </div>
      </div>

      <div className="sa-formula-panel">
        <div className="sa-formula-title"><FaInfoCircle style={{ color: '#00467F' }} /> Computation Steps (Raschka, 2023)</div>
        <div className="sa-formula-steps">
          <div className="sa-step">
            <span className="sa-step-num">1</span>
            <span>Project input x into Q, K, V using learned weight matrices W_q, W_k, W_v</span>
          </div>
          <div className="sa-step">
            <span className="sa-step-num">2</span>
            <span>Compute raw attention scores: omega_ij = q^(i) dot k^(j)</span>
          </div>
          <div className="sa-step">
            <span className="sa-step-num">3</span>
            <span>Scale by 1/sqrt(d_k) to prevent softmax saturation (variance of dot product grows with d_k)</span>
          </div>
          <div className="sa-step">
            <span className="sa-step-num">4</span>
            <span>Apply softmax to get normalized attention weights alpha_ij</span>
          </div>
          <div className="sa-step">
            <span className="sa-step-num">5</span>
            <span>Compute context vector: z^(i) = sum_j alpha_ij * v^(j)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelfAttentionViz;

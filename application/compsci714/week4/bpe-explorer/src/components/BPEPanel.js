import React, { useState, useMemo, useCallback } from 'react';
import { FiScissors, FiPlay, FiSkipForward, FiRotateCcw, FiCheckCircle, FiArrowRight, FiFastForward } from 'react-icons/fi';

function initVocab(text) {
  const words = text.toLowerCase().split(/\s+/).filter(Boolean);
  const freq = {};
  words.forEach(w => {
    const key = w.split('').join(' ') + ' _';
    freq[key] = (freq[key] || 0) + 1;
  });
  return freq;
}

function getPairs(vocab) {
  const pairs = {};
  Object.entries(vocab).forEach(([word, f]) => {
    const syms = word.split(' ');
    for (let i = 0; i < syms.length - 1; i++) {
      const pair = syms[i] + ',' + syms[i + 1];
      pairs[pair] = (pairs[pair] || 0) + f;
    }
  });
  return pairs;
}

function mergeVocab(pair, vocab) {
  const [a, b] = pair.split(',');
  const merged = a + b;
  const re = new RegExp(
    a.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ' ' +
    b.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'
  );
  const newVocab = {};
  Object.entries(vocab).forEach(([word, f]) => { newVocab[word.replace(re, merged)] = f; });
  return newVocab;
}

function getTokens(vocab) {
  const tokens = new Set();
  Object.keys(vocab).forEach(word => word.split(' ').forEach(t => tokens.add(t)));
  return [...tokens].sort();
}

const PRESETS = [
  { label: 'Classic (low/lower/lowest)', text: 'low low low low low lower lower newest newest newest widest widest' },
  { label: 'Morphology', text: 'unhappy unhappiness happy happiness happily' },
  { label: 'Repetition', text: 'the cat sat on the mat the cat ate the rat' },
  { label: 'Code-like', text: 'getData getData setData setData getValue setValue' },
];

export default function BPEPanel() {
  const [text, setText] = useState(PRESETS[0].text);
  const [vocab, setVocab] = useState(() => initVocab(PRESETS[0].text));
  const [merges, setMerges] = useState([]);
  const [maxMerges] = useState(20);

  const pairs = useMemo(() => getPairs(vocab), [vocab]);
  const tokens = useMemo(() => getTokens(vocab), [vocab]);
  const sortedPairs = useMemo(() => Object.entries(pairs).sort((a, b) => b[1] - a[1]), [pairs]);
  const bestPair = sortedPairs[0];
  const canStep = bestPair && merges.length < maxMerges;

  const doStep = useCallback(() => {
    if (!canStep) return;
    const [pair, freq] = bestPair;
    const [a, b] = pair.split(',');
    setVocab(prev => mergeVocab(pair, prev));
    setMerges(prev => [...prev, { a, b, merged: a + b, freq, step: prev.length + 1 }]);
  }, [bestPair, canStep]);

  const runAll = () => {
    let v = vocab;
    let m = [...merges];
    for (let i = m.length; i < maxMerges; i++) {
      const p = getPairs(v);
      const sorted = Object.entries(p).sort((a, b) => b[1] - a[1]);
      if (!sorted[0]) break;
      const [pair, freq] = sorted[0];
      const [a, b] = pair.split(',');
      v = mergeVocab(pair, v);
      m.push({ a, b, merged: a + b, freq, step: i + 1 });
    }
    setVocab(v);
    setMerges(m);
  };

  const reset = () => { setVocab(initVocab(text)); setMerges([]); };
  const applyPreset = (preset) => { setText(preset.text); setVocab(initVocab(preset.text)); setMerges([]); };

  const baseChars = new Set();
  text.toLowerCase().split('').forEach(c => { if (c !== ' ') baseChars.add(c); });
  baseChars.add('_');

  return (
    <div>
      <div className="panel">
        <h2><FiScissors /> BPE Algorithm — Step by Step</h2>
        <p>
          Watch the BPE algorithm build a vocabulary from scratch. Start with individual characters,
          then merge the most frequent pair at each step. Notice how common patterns like "lo", "low",
          "est" emerge naturally.
        </p>
      </div>

      <div className="panel">
        <h3>Input Corpus</h3>
        <div style={{ display: 'flex', gap: 10 }}>
          <input className="sentence-input" value={text} onChange={e => setText(e.target.value)}
            placeholder="Type words (repeat common ones for better merges)..." style={{ flex: 1 }} />
          <button className="btn btn-primary" onClick={() => { setVocab(initVocab(text)); setMerges([]); }}><FiPlay /> Start</button>
        </div>
        <div className="controls" style={{ marginTop: 8 }}>
          {PRESETS.map((p, i) => (
            <button key={i} className={`btn${text === p.text ? ' btn-primary' : ''}`} onClick={() => applyPreset(p)}>{p.label}</button>
          ))}
        </div>
      </div>

      <div className="panel">
        <div className="controls">
          <button className="btn btn-primary" onClick={doStep} disabled={!canStep}><FiSkipForward /> Merge Step</button>
          <button className="btn btn-amber" onClick={runAll} disabled={!canStep}><FiFastForward /> Run All</button>
          <button className="btn" onClick={reset}><FiRotateCcw /> Reset</button>
          <span className="quiz-score">Step {merges.length} / {maxMerges}</span>
        </div>

        {/* Current word representations */}
        <h3>Word Representations</h3>
        <p style={{ fontSize: '0.8rem', color: '#8a9ab0', marginBottom: 8 }}>
          Each word is shown as its current token sequence. Merged tokens are highlighted.
        </p>
        {Object.entries(vocab).map(([word, freq]) => (
          <div key={word} className="word-repr">
            <div className="token-row" style={{ flex: 1 }}>
              {word.split(' ').map((t, i) => {
                const isMerged = !baseChars.has(t);
                return (
                  <React.Fragment key={i}>
                    {i > 0 && <span className="token-join">+</span>}
                    <span className={`token-chip${isMerged ? ' merged' : ''}`}>{t === '_' ? '</w>' : t}</span>
                  </React.Fragment>
                );
              })}
            </div>
            <span className="word-freq">x{freq}</span>
          </div>
        ))}

        {/* Next merge preview */}
        {bestPair && canStep && (
          <div className="info-box" style={{ marginTop: 16 }}>
            <FiArrowRight className="info-icon" />
            <div>
              <strong>Next merge:</strong>{' '}
              <span style={{ fontFamily: 'monospace', fontWeight: 700 }}>
                "{bestPair[0].split(',')[0]}" + "{bestPair[0].split(',')[1]}" → "{bestPair[0].split(',').join('')}"
              </span>
              {' '}(frequency: {bestPair[1]})
            </div>
          </div>
        )}
      </div>

      {/* Vocabulary */}
      <div className="panel">
        <h3>Vocabulary ({tokens.length} tokens)</h3>
        <p style={{ fontSize: '0.8rem', color: '#8a9ab0' }}>
          Green tokens were created by merges. Grey tokens are the original characters.
        </p>
        <div className="vocab-grid">
          {tokens.map((t, i) => {
            const isNew = !baseChars.has(t);
            return <span key={i} className={`vocab-item${isNew ? ' new' : ''}`}>{t === '_' ? '</w>' : t}</span>;
          })}
        </div>
      </div>

      {/* Merge history + pair candidates side by side */}
      <div className="split-panels">
        {sortedPairs.length > 0 && (
          <div className="panel" style={{ margin: 0 }}>
            <h3>Top Pair Candidates</h3>
            {sortedPairs.slice(0, 6).map(([pair, freq], i) => {
              const [a, b] = pair.split(',');
              return (
                <div key={pair} className={`merge-step${i === 0 ? ' active' : ''}`}>
                  <span className="step-num">{i === 0 ? <FiArrowRight /> : i + 1}</span>
                  <span className="step-pair">{a} + {b} → {a}{b}</span>
                  <span className="step-freq">freq: {freq}</span>
                </div>
              );
            })}
          </div>
        )}

        {merges.length > 0 && (
          <div className="panel" style={{ margin: 0 }}>
            <h3>Merge History</h3>
            {merges.map((m, i) => (
              <div key={i} className="merge-step">
                <span className="step-num">{m.step}</span>
                <span className="step-pair">{m.a} + {m.b} → {m.merged}</span>
                <span className="step-freq">freq: {m.freq}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {merges.length > 0 && (
        <div className="panel">
          <div className="info-box success">
            <FiCheckCircle className="info-icon" />
            <div>
              After <strong>{merges.length} merges</strong>, vocabulary grew from{' '}
              <strong>{baseChars.size} base characters</strong> to{' '}
              <strong>{tokens.length} tokens</strong>.
              The most common patterns have been compressed into single tokens.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

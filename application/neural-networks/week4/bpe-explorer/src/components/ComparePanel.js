import React, { useState } from 'react';
import { FiBarChart2, FiInfo, FiAlertTriangle, FiCheckCircle } from 'react-icons/fi';

function charTokenize(text) { return text.split('').filter(c => c !== ' '); }
function wordTokenize(text) { return text.split(/\s+/).filter(Boolean); }

const COMMON_SUBS = [
  'tion','ing','the','and','ent','ion','tio','for','ate','ous','ment','ness','able','ful',
  'less','ive','ity','ence','ance','er','ed','ly','al','en','es','re','un','in','dis','pre',
  'th','he','an','or','te','of','is','it','ar','st','to','nt','ng','se','ha','as','ou','le',
  'ch','sh','wh','ck','ll','ss','tt','nn','pp','low','new','est','hap','py','happy',
  'trans','form','atten','model','train','learn','deep','neural','net','work',
  'cat','dog','sat','mat','rat','hat','run','walk','talk','eat',
];

function bpeTokenize(text) {
  const words = text.toLowerCase().split(/\s+/).filter(Boolean);
  const sorted = [...COMMON_SUBS].sort((a, b) => b.length - a.length);
  const result = [];
  words.forEach(word => {
    let rem = word;
    while (rem.length > 0) {
      let matched = false;
      for (const sub of sorted) {
        if (rem.startsWith(sub)) { result.push(sub); rem = rem.slice(sub.length); matched = true; break; }
      }
      if (!matched) { result.push(rem[0]); rem = rem.slice(1); }
    }
  });
  return result;
}

const EXAMPLES = [
  { label: 'Simple', text: 'The cat sat on the mat' },
  { label: 'Morphology', text: 'unhappiness is not the opposite of happiness' },
  { label: 'Technical', text: 'tokenization is fundamental to natural language processing' },
  { label: 'Rare words', text: 'pneumonoultramicroscopicsilicovolcanoconiosis is a lung disease' },
  { label: 'Code', text: 'getData setValue transformerModel deepLearning' },
];

export default function ComparePanel() {
  const [text, setText] = useState(EXAMPLES[0].text);
  const charToks = charTokenize(text);
  const wordToks = wordTokenize(text);
  const bpeToks = bpeTokenize(text);

  const ratio = charToks.length > 0 ? (bpeToks.length / charToks.length * 100).toFixed(0) : 0;

  return (
    <div>
      <div className="panel">
        <h2><FiBarChart2 /> Compare Tokenization Methods</h2>
        <p>See how the same text is split differently. Notice the trade-off between token count and vocabulary size.</p>
      </div>
      <div className="panel">
        <input className="sentence-input" value={text} onChange={e => setText(e.target.value)} placeholder="Type text to compare..." />
        <div className="controls" style={{ marginTop: 8 }}>
          {EXAMPLES.map((ex, i) => (
            <button key={i} className={`btn${text === ex.text ? ' btn-primary' : ''}`} onClick={() => setText(ex.text)}>{ex.label}</button>
          ))}
        </div>
      </div>

      <div className="compare-grid">
        <div className="compare-card" style={{ borderColor: '#ef4444' }}>
          <h4 style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: 6 }}><FiAlertTriangle /> Character-Level</h4>
          <div className="token-row">
            {charToks.slice(0, 40).map((t, i) => <span key={i} className="token-chip" style={{ borderColor: '#fecaca', background: '#fee2e2', fontSize: '0.78rem' }}>{t}</span>)}
            {charToks.length > 40 && <span className="token-chip">+{charToks.length - 40} more</span>}
          </div>
          <div className="compare-stats">
            <div><span className="stat">{charToks.length}</span><span className="stat-label"> tokens</span></div>
            <div><span className="stat">~256</span><span className="stat-label"> vocab size</span></div>
          </div>
        </div>

        <div className="compare-card" style={{ borderColor: '#f59e0b' }}>
          <h4 style={{ color: '#f59e0b', display: 'flex', alignItems: 'center', gap: 6 }}><FiAlertTriangle /> Word-Level</h4>
          <div className="token-row">
            {wordToks.map((t, i) => <span key={i} className="token-chip" style={{ borderColor: '#fde68a', background: '#fef3c7' }}>{t}</span>)}
          </div>
          <div className="compare-stats">
            <div><span className="stat">{wordToks.length}</span><span className="stat-label"> tokens</span></div>
            <div><span className="stat">100K+</span><span className="stat-label"> vocab size</span></div>
          </div>
        </div>

        <div className="compare-card" style={{ borderColor: '#22c55e' }}>
          <h4 style={{ color: '#22c55e', display: 'flex', alignItems: 'center', gap: 6 }}><FiCheckCircle /> BPE (Subword)</h4>
          <div className="token-row">
            {bpeToks.map((t, i) => <span key={i} className="token-chip" style={{ borderColor: '#bbf7d0', background: '#dcfce7' }}>{t}</span>)}
          </div>
          <div className="compare-stats">
            <div><span className="stat">{bpeToks.length}</span><span className="stat-label"> tokens</span></div>
            <div><span className="stat">~50K</span><span className="stat-label"> vocab size</span></div>
          </div>
        </div>
      </div>

      <div className="panel">
        <h3>Compression Ratio</h3>
        <div className="ratio-bar-wrap">
          <div className="ratio-bar">
            <div className="ratio-fill" style={{ width: `${Math.min(100, charToks.length / Math.max(1, charToks.length) * 100)}%`, background: '#ef4444' }}></div>
          </div>
          <span className="ratio-label">Character: {charToks.length} tokens (100%)</span>
        </div>
        <div className="ratio-bar-wrap">
          <div className="ratio-bar">
            <div className="ratio-fill" style={{ width: `${Math.min(100, bpeToks.length / Math.max(1, charToks.length) * 100)}%`, background: '#22c55e' }}></div>
          </div>
          <span className="ratio-label">BPE: {bpeToks.length} tokens ({ratio}% of char)</span>
        </div>
        <div className="ratio-bar-wrap">
          <div className="ratio-bar">
            <div className="ratio-fill" style={{ width: `${Math.min(100, wordToks.length / Math.max(1, charToks.length) * 100)}%`, background: '#f59e0b' }}></div>
          </div>
          <span className="ratio-label">Word: {wordToks.length} tokens ({charToks.length > 0 ? (wordToks.length / charToks.length * 100).toFixed(0) : 0}% of char)</span>
        </div>
        <div className="info-box" style={{ marginTop: 12 }}>
          <FiInfo className="info-icon" />
          <div>
            Shorter sequences mean faster processing (attention is O(n<sup>2</sup>)), but larger vocabularies
            mean bigger embedding matrices. BPE finds the sweet spot — try the "Rare words" example to see
            how BPE handles words that word-level tokenization would mark as unknown.
          </div>
        </div>
      </div>
    </div>
  );
}

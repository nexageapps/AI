import React, { useState, useMemo } from 'react';
import { FiType, FiInfo, FiCheckCircle, FiHash } from 'react-icons/fi';

// Pre-trained BPE-like vocabulary (common English subwords)
const VOCAB = [
  'the','ing','tion','and','ent','ion','tio','for','ate','ous','ment','ness','able','ful',
  'less','ive','ity','ence','ance','er','ed','ly','al','en','es','re','un','in','dis','pre',
  'over','out','mis','sub','inter','trans','super','anti','auto','bi','co','de','ex','multi',
  'non','post','semi','tri','under','up','self','cross','well','all','any','every','some',
  'th','he','an','or','te','of','is','it','ar','st','to','nt','ng','se','ha','as','ou','le',
  'ch','sh','wh','qu','ck','ll','ss','tt','nn','pp','rr','ff','gg','mm','dd','bb','cc',
  'low','new','est','wid','hap','py','ness','happy','sad','good','bad','big','small',
  'cat','dog','sat','mat','rat','hat','bat','run','walk','talk','eat','sleep',
  'data','set','get','put','value','key','code','test','func','class','var','int',
  'trans','form','atten','model','train','learn','deep','neural','net','work',
];

const COLORS = [
  '#dbeafe','#dcfce7','#fef3c7','#ede9fe','#fce7f3','#e0f2fe','#fee2e2',
  '#f1f5f9','#d1fae5','#fef9c3','#e0e7ff','#ffe4e6','#ecfdf5','#fff7ed',
];

function tokenize(text) {
  if (!text.trim()) return [];
  const words = text.toLowerCase().split(/(\s+)/);
  const result = [];
  const sorted = [...VOCAB].sort((a, b) => b.length - a.length);

  words.forEach(word => {
    if (/^\s+$/.test(word)) { result.push({ token: word, type: 'space' }); return; }
    let remaining = word;
    while (remaining.length > 0) {
      let matched = false;
      for (const sub of sorted) {
        if (remaining.startsWith(sub)) {
          result.push({ token: sub, type: 'subword' });
          remaining = remaining.slice(sub.length);
          matched = true;
          break;
        }
      }
      if (!matched) {
        result.push({ token: remaining[0], type: 'char' });
        remaining = remaining.slice(1);
      }
    }
  });
  return result;
}

export default function TokenizerPanel() {
  const [text, setText] = useState('The unhappiest transformer model learned deep attention mechanisms');
  const tokens = useMemo(() => tokenize(text), [text]);
  const nonSpace = tokens.filter(t => t.type !== 'space');
  const subwords = nonSpace.filter(t => t.type === 'subword');
  const chars = nonSpace.filter(t => t.type === 'char');

  return (
    <div>
      <div className="panel">
        <h2><FiType /> Live Tokenizer</h2>
        <p>
          Type any text below and watch it get split into subword tokens in real time.
          This simulates how a BPE tokenizer breaks text into pieces the model understands.
          Coloured chunks are known subwords; grey single characters are fallbacks.
        </p>
      </div>

      <div className="panel">
        <textarea className="sentence-input" value={text} onChange={e => setText(e.target.value)}
          placeholder="Type anything here..." rows={3}
          style={{ resize: 'vertical', fontFamily: 'inherit', lineHeight: 1.6 }} />

        <div className="pg-stats" style={{ marginTop: 16 }}>
          <div className="pg-stat">
            <div className="pg-stat-num">{nonSpace.length}</div>
            <div className="pg-stat-label">Total Tokens</div>
          </div>
          <div className="pg-stat">
            <div className="pg-stat-num" style={{ color: '#22c55e' }}>{subwords.length}</div>
            <div className="pg-stat-label">Subword Tokens</div>
          </div>
          <div className="pg-stat">
            <div className="pg-stat-num" style={{ color: '#8a9ab0' }}>{chars.length}</div>
            <div className="pg-stat-label">Character Fallbacks</div>
          </div>
        </div>
      </div>

      <div className="panel">
        <h3>Tokenized Output</h3>
        <div className="token-visual">
          {tokens.map((t, i) => {
            if (t.type === 'space') return <span key={i} className="token-space"> </span>;
            const bg = t.type === 'subword' ? COLORS[i % COLORS.length] : '#f1f5f9';
            const border = t.type === 'subword' ? '#94a3b8' : '#dde3ea';
            return (
              <span key={i} className="token-vis-chip" style={{ background: bg, borderColor: border }}>
                <FiHash style={{ fontSize: '0.6rem', opacity: 0.4 }} />
                {t.token}
              </span>
            );
          })}
        </div>
      </div>

      <div className="panel">
        <h3>Token List (as model sees it)</h3>
        <div style={{ fontFamily: 'monospace', fontSize: '0.84rem', background: '#1a2332', color: '#e2e8f0',
          padding: 16, borderRadius: 10, overflowX: 'auto', lineHeight: 1.8 }}>
          [{nonSpace.map((t, i) => (
            <span key={i}>
              <span style={{ color: t.type === 'subword' ? '#4ade80' : '#94a3b8' }}>"{t.token}"</span>
              {i < nonSpace.length - 1 ? ', ' : ''}
            </span>
          ))}]
        </div>
        <div className="info-box" style={{ marginTop: 12 }}>
          <FiInfo className="info-icon" />
          <div>
            This is what the model actually receives — a sequence of token IDs (here shown as strings).
            Each token maps to a row in the embedding matrix. The model never sees raw text.
          </div>
        </div>
      </div>

      <div className="panel">
        <h3>Try These Examples</h3>
        <div className="controls">
          {[
            'The cat sat on the mat',
            'unhappiness is not the opposite of happiness',
            'pneumonoultramicroscopicsilicovolcanoconiosis',
            'getData setValue transformerModel deepLearning',
            'I love natural language processing and deep learning',
          ].map((ex, i) => (
            <button key={i} className="btn" onClick={() => setText(ex)}>{ex.length > 35 ? ex.slice(0,33) + '...' : ex}</button>
          ))}
        </div>
        <div className="info-box success" style={{ marginTop: 12 }}>
          <FiCheckCircle className="info-icon" />
          <div>
            Notice how common words like "the" stay as single tokens, while rare words get split.
            Try typing a made-up word — BPE will decompose it into known subword pieces.
          </div>
        </div>
      </div>
    </div>
  );
}

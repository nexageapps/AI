import React, { useState } from 'react';
import { FiGlobe, FiInfo, FiCheckCircle, FiAlertTriangle } from 'react-icons/fi';

const MODELS = [
  { name: 'GPT-2', method: 'BPE', vocab: '50,257', special: ['<|endoftext|>'], lib: 'tiktoken (cl100k_base)',
    notes: 'The original BPE tokenizer for GPT. Byte-level BPE — works on raw bytes, so it can handle any Unicode text without unknown tokens.',
    example: { text: 'Hello world!', tokens: ['Hello', ' world', '!'] } },
  { name: 'GPT-4', method: 'BPE', vocab: '100,277', special: ['<|endoftext|>', '<|fim_prefix|>', '<|fim_middle|>', '<|fim_suffix|>'], lib: 'tiktoken (cl100k_base)',
    notes: 'Larger vocabulary than GPT-2 for better compression. Handles code, multilingual text, and special fill-in-the-middle tokens for code completion.',
    example: { text: 'Hello world!', tokens: ['Hello', ' world', '!'] } },
  { name: 'BERT', method: 'WordPiece', vocab: '30,522', special: ['[CLS]', '[SEP]', '[MASK]', '[PAD]', '[UNK]'], lib: 'HuggingFace tokenizers',
    notes: 'WordPiece is similar to BPE but uses likelihood instead of frequency to choose merges. Uses "##" prefix for continuation subwords.',
    example: { text: 'Hello world!', tokens: ['hello', 'world', '!'] } },
  { name: 'LLaMA', method: 'SentencePiece BPE', vocab: '32,000', special: ['<s>', '</s>', '<unk>'], lib: 'SentencePiece',
    notes: 'Uses SentencePiece which treats the input as a raw byte stream. Smaller vocab than GPT but still effective. Spaces are encoded as "▁".',
    example: { text: 'Hello world!', tokens: ['▁Hello', '▁world', '!'] } },
];

const EDGE_CASES = [
  { input: 'ChatGPT', explain: 'New compound word → split into known subwords: "Chat" + "G" + "PT" or similar' },
  { input: 'COVID-19', explain: 'Novel term → "CO" + "VID" + "-" + "19" — BPE handles it via subwords' },
  { input: '🎉🚀', explain: 'Emojis → encoded as byte sequences. GPT-4 handles them; older models may use multiple tokens per emoji' },
  { input: 'café résumé', explain: 'Accented characters → byte-level BPE handles them natively. Some tokenizers need special handling' },
  { input: '    lots   of   spaces', explain: 'Multiple spaces → each space may be a separate token, or grouped. This affects code tokenization significantly' },
  { input: 'def getData():', explain: 'Code → camelCase splits into subwords: "def" + " get" + "Data" + "():" — tokenizers trained on code handle this better' },
];

export default function RealWorldPanel() {
  const [activeModel, setActiveModel] = useState(0);
  const model = MODELS[activeModel];

  return (
    <div>
      <div className="panel">
        <h2><FiGlobe /> Real-World Tokenizers</h2>
        <p>
          Different models use different tokenization strategies. Explore how GPT, BERT, and LLaMA
          handle text, their vocabulary sizes, special tokens, and edge cases.
        </p>
      </div>

      <div className="panel">
        <div className="controls">
          {MODELS.map((m, i) => (
            <button key={i} className={`btn${activeModel === i ? ' btn-primary' : ''}`} onClick={() => setActiveModel(i)}>{m.name}</button>
          ))}
        </div>

        <div className="model-detail">
          <div className="pg-stats">
            <div className="pg-stat"><div className="pg-stat-num">{model.vocab}</div><div className="pg-stat-label">Vocab Size</div></div>
            <div className="pg-stat"><div className="pg-stat-num" style={{ fontSize: '1rem' }}>{model.method}</div><div className="pg-stat-label">Method</div></div>
            <div className="pg-stat"><div className="pg-stat-num" style={{ fontSize: '0.8rem' }}>{model.lib}</div><div className="pg-stat-label">Library</div></div>
          </div>

          <h3>Special Tokens</h3>
          <div className="token-row">
            {model.special.map((t, i) => (
              <span key={i} className="token-chip" style={{ background: '#ede9fe', borderColor: '#8b5cf6', color: '#6d28d9', fontFamily: 'monospace' }}>{t}</span>
            ))}
          </div>

          <h3>Example: "{model.example.text}"</h3>
          <div className="token-row">
            {model.example.tokens.map((t, i) => (
              <span key={i} className="token-chip merged">{t}</span>
            ))}
          </div>

          <div className="info-box" style={{ marginTop: 12 }}>
            <FiInfo className="info-icon" />
            <div>{model.notes}</div>
          </div>
        </div>
      </div>

      <div className="panel">
        <h3>Edge Cases and Gotchas</h3>
        <p>Tokenization is not always straightforward. Here are tricky cases that real tokenizers must handle:</p>
        {EDGE_CASES.map((ec, i) => (
          <div key={i} className="merge-step" style={{ alignItems: 'flex-start' }}>
            <span className="step-num" style={{ background: '#f59e0b' }}><FiAlertTriangle /></span>
            <div>
              <span className="step-pair" style={{ fontFamily: 'monospace' }}>{ec.input}</span>
              <p style={{ margin: '4px 0 0', fontSize: '0.8rem', color: '#4a5568' }}>{ec.explain}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="panel">
        <h3>BPE vs WordPiece vs SentencePiece</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #dde3ea', textAlign: 'left' }}>
                {['Feature', 'BPE (GPT)', 'WordPiece (BERT)', 'SentencePiece (LLaMA)'].map(h => (
                  <th key={h} style={{ padding: '10px 12px', color: '#4a5568', fontWeight: 700 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['Merge criterion', 'Most frequent pair', 'Highest likelihood gain', 'Most frequent pair'],
                ['Subword prefix', 'None (space in token)', '## for continuation', 'Underscore for word start'],
                ['Handles unknown?', 'Yes (byte-level)', 'Falls back to [UNK]', 'Yes (byte-level)'],
                ['Pre-tokenization', 'Regex split', 'Whitespace + punctuation', 'None (raw bytes)'],
                ['Used by', 'GPT-2/3/4, RoBERTa', 'BERT, DistilBERT', 'LLaMA, T5, ALBERT'],
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #dde3ea' }}>
                  {row.map((cell, j) => (
                    <td key={j} style={{ padding: '10px 12px', fontWeight: j === 0 ? 600 : 400, color: j === 0 ? '#00467F' : '#4a5568' }}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="info-box success" style={{ marginTop: 12 }}>
          <FiCheckCircle className="info-icon" />
          <div>All three methods produce subword vocabularies. The differences are in how they choose merges and handle edge cases. In practice, they perform similarly.</div>
        </div>
      </div>
    </div>
  );
}

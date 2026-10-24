import React, { useState } from 'react';
import { FiCpu, FiInfo, FiArrowRight, FiArrowDown } from 'react-icons/fi';

const ENCODER_LAYERS = [
  { label: 'Input Embedding', sub: 'Word → Vector', color: '#e0f2fe', border: '#0ea5e9',
    info: 'Each token is mapped to a dense vector (e.g., 512 dimensions). This is a learned lookup table.' },
  { label: '+ Positional Encoding', sub: 'sin/cos', color: '#fef3c7', border: '#f59e0b',
    info: 'Since transformers have no recurrence, position info is added via sine and cosine functions of different frequencies.' },
  { label: 'Multi-Head Attention', sub: 'Self-Attention', color: '#dbeafe', border: '#3b82f6',
    info: 'Each token attends to all other tokens. Multiple heads capture different relationship types in parallel.' },
  { label: 'Add & Norm', sub: 'Residual + LayerNorm', color: '#f1f5f9', border: '#94a3b8',
    info: 'Residual connection (skip connection) adds the input back, then Layer Normalization stabilizes training.' },
  { label: 'Feed-Forward', sub: '2-layer MLP', color: '#dcfce7', border: '#22c55e',
    info: 'Two linear layers with ReLU in between. Applied independently to each position. Expands then contracts dimensions.' },
  { label: 'Add & Norm', sub: 'Residual + LayerNorm', color: '#f1f5f9', border: '#94a3b8',
    info: 'Another residual connection and normalization. This pattern repeats for each encoder layer.' },
];

const DECODER_LAYERS = [
  { label: 'Output Embedding', sub: 'Shifted right', color: '#e0f2fe', border: '#0ea5e9',
    info: 'The target sequence is embedded, shifted right by one position so the model predicts the next token.' },
  { label: '+ Positional Encoding', sub: 'sin/cos', color: '#fef3c7', border: '#f59e0b',
    info: 'Same positional encoding scheme as the encoder.' },
  { label: 'Masked Multi-Head Attn', sub: 'Causal mask', color: '#fee2e2', border: '#ef4444',
    info: 'Self-attention with a causal mask — each position can only attend to earlier positions. Prevents "cheating" during generation.' },
  { label: 'Add & Norm', sub: 'Residual', color: '#f1f5f9', border: '#94a3b8',
    info: 'Residual connection and layer normalization.' },
  { label: 'Cross-Attention', sub: 'Encoder → Decoder', color: '#ede9fe', border: '#8b5cf6',
    info: 'Queries come from the decoder, but Keys and Values come from the encoder output. This is how the decoder "reads" the input.' },
  { label: 'Add & Norm', sub: 'Residual', color: '#f1f5f9', border: '#94a3b8',
    info: 'Residual connection and layer normalization.' },
  { label: 'Feed-Forward', sub: '2-layer MLP', color: '#dcfce7', border: '#22c55e',
    info: 'Same feed-forward structure as the encoder.' },
  { label: 'Linear + Softmax', sub: 'Output probs', color: '#fce7f3', border: '#ec4899',
    info: 'Projects to vocabulary size and applies softmax to get next-token probabilities.' },
];

const MODELS = [
  { name: 'BERT', type: 'Encoder-only', layers: 12, heads: 12, dim: 768, params: '110M', use: 'Classification, NER, QA' },
  { name: 'GPT-2', type: 'Decoder-only', layers: 12, heads: 12, dim: 768, params: '117M', use: 'Text generation' },
  { name: 'GPT-3', type: 'Decoder-only', layers: 96, heads: 96, dim: 12288, params: '175B', use: 'Few-shot learning' },
  { name: 'T5', type: 'Encoder-Decoder', layers: 12, heads: 12, dim: 768, params: '220M', use: 'Text-to-text tasks' },
];

export default function ArchitecturePanel() {
  const [side, setSide] = useState('encoder');
  const [hovered, setHovered] = useState(null);
  const layers = side === 'encoder' ? ENCODER_LAYERS : DECODER_LAYERS;

  return (
    <div>
      <div className="panel">
        <h2><FiCpu /> Transformer Architecture</h2>
        <p>
          The original Transformer has an <strong>Encoder</strong> (processes the input) and a <strong>Decoder</strong> (generates the output).
          Each side is a stack of identical layers. Modern models often use only one side: BERT = encoder-only, GPT = decoder-only.
        </p>
      </div>

      <div className="panel">
        <div className="controls">
          <button className={`btn${side === 'encoder' ? ' btn-primary' : ''}`} onClick={() => { setSide('encoder'); setHovered(null); }}>Encoder</button>
          <button className={`btn${side === 'decoder' ? ' btn-primary' : ''}`} onClick={() => { setSide('decoder'); setHovered(null); }}>Decoder</button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, margin: '16px 0' }}>
          {layers.map((l, i) => (
            <React.Fragment key={i}>
              {i > 0 && <FiArrowDown style={{ color: '#8a9ab0', fontSize: '1.2rem' }} />}
              <div className="arch-block" style={{
                background: l.color, borderColor: l.border, minWidth: 240,
                transform: hovered === i ? 'scale(1.05)' : 'scale(1)',
              }}
                onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}>
                {l.label}<span className="block-label">{l.sub}</span>
              </div>
            </React.Fragment>
          ))}
        </div>

        {hovered !== null && (
          <div className="info-box">
            <FiInfo className="info-icon" />
            <div><strong>{layers[hovered].label}:</strong> {layers[hovered].info}</div>
          </div>
        )}
      </div>

      <div className="panel">
        <h3>Real-World Transformer Models</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #dde3ea', textAlign: 'left' }}>
                {['Model', 'Type', 'Layers', 'Heads', 'Dim', 'Params', 'Use Case'].map(h => (
                  <th key={h} style={{ padding: '10px 12px', color: '#4a5568', fontWeight: 700 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MODELS.map((m, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #dde3ea' }}>
                  <td style={{ padding: '10px 12px', fontWeight: 700, color: '#00467F' }}>{m.name}</td>
                  <td style={{ padding: '10px 12px' }}>{m.type}</td>
                  <td style={{ padding: '10px 12px' }}>{m.layers}</td>
                  <td style={{ padding: '10px 12px' }}>{m.heads}</td>
                  <td style={{ padding: '10px 12px' }}>{m.dim}</td>
                  <td style={{ padding: '10px 12px', fontWeight: 600 }}>{m.params}</td>
                  <td style={{ padding: '10px 12px' }}>{m.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="panel">
        <h3>Encoder vs Decoder vs Both</h3>
        <div className="arch-flow" style={{ gap: 12 }}>
          <div className="arch-block" style={{ background: '#dbeafe', borderColor: '#3b82f6' }}>
            Encoder-Only<span className="block-label">BERT, RoBERTa</span>
          </div>
          <span className="arch-arrow"><FiArrowRight /></span>
          <div className="arch-block" style={{ background: '#ede9fe', borderColor: '#8b5cf6' }}>
            Encoder-Decoder<span className="block-label">T5, BART, Original</span>
          </div>
          <span className="arch-arrow"><FiArrowRight /></span>
          <div className="arch-block" style={{ background: '#fee2e2', borderColor: '#ef4444' }}>
            Decoder-Only<span className="block-label">GPT, LLaMA, Claude</span>
          </div>
        </div>
        <div className="info-box">
          <FiInfo className="info-icon" />
          <div>
            <strong>Encoder-only:</strong> Good for understanding (classification, NER). Sees all tokens at once.<br/>
            <strong>Decoder-only:</strong> Good for generation. Uses causal masking — can only see past tokens.<br/>
            <strong>Encoder-Decoder:</strong> Good for sequence-to-sequence (translation, summarization).
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { FiPlay, FiPlus, FiTrash2, FiInfo, FiArrowRight, FiGrid, FiLayers, FiZap, FiMaximize, FiMinimize } from 'react-icons/fi';

const LAYER_TYPES = [
  { type: 'conv', label: 'Conv2D', icon: FiGrid, color: '#3b82f6', bg: '#dbeafe',
    config: { filters: 32, kernel: 3 }, desc: 'Convolution layer' },
  { type: 'relu', label: 'ReLU', icon: FiZap, color: '#f59e0b', bg: '#fef3c7',
    config: {}, desc: 'Activation function' },
  { type: 'maxpool', label: 'MaxPool', icon: FiMinimize, color: '#8b5cf6', bg: '#ede9fe',
    config: { size: 2 }, desc: 'Max pooling 2x2' },
  { type: 'batchnorm', label: 'BatchNorm', icon: FiLayers, color: '#ec4899', bg: '#fce7f3',
    config: {}, desc: 'Batch normalization' },
  { type: 'flatten', label: 'Flatten', icon: FiMaximize, color: '#94a3b8', bg: '#f1f5f9',
    config: {}, desc: 'Flatten to 1D' },
  { type: 'dense', label: 'Dense', icon: FiLayers, color: '#22c55e', bg: '#dcfce7',
    config: { units: 128 }, desc: 'Fully connected layer' },
];

function computeShape(layers, inputSize) {
  let h = inputSize, w = inputSize, ch = 1;
  let params = 0;
  let flattened = false;
  const shapes = [{ h, w, ch, params: 0, flat: false }];

  for (const layer of layers) {
    if (layer.type === 'conv') {
      const k = layer.config.kernel;
      const f = layer.config.filters;
      h = h - k + 1; w = w - k + 1;
      params += k * k * ch * f + f;
      ch = f; flattened = false;
    } else if (layer.type === 'maxpool') {
      h = Math.floor(h / 2); w = Math.floor(w / 2);
    } else if (layer.type === 'flatten') {
      flattened = true;
    } else if (layer.type === 'dense') {
      const inSize = flattened ? h * w * ch : h * w * ch;
      params += inSize * layer.config.units + layer.config.units;
      h = 1; w = 1; ch = layer.config.units;
    }
    shapes.push({ h, w, ch, params, flat: flattened });
  }
  return { shapes, totalParams: params };
}

export default function PlaygroundPanel() {
  const [layers, setLayers] = useState([
    { type: 'conv', label: 'Conv2D', config: { filters: 32, kernel: 3 }, color: '#3b82f6', bg: '#dbeafe' },
    { type: 'relu', label: 'ReLU', config: {}, color: '#f59e0b', bg: '#fef3c7' },
    { type: 'maxpool', label: 'MaxPool', config: { size: 2 }, color: '#8b5cf6', bg: '#ede9fe' },
  ]);
  const [inputSize, setInputSize] = useState(28);

  const addLayer = (lt) => {
    setLayers(prev => [...prev, { type: lt.type, label: lt.label, config: { ...lt.config }, color: lt.color, bg: lt.bg }]);
  };
  const removeLayer = (idx) => setLayers(prev => prev.filter((_, i) => i !== idx));
  const clearAll = () => setLayers([]);

  const { shapes, totalParams } = computeShape(layers, inputSize);
  const lastShape = shapes[shapes.length - 1];
  const isValid = lastShape.h > 0 && lastShape.w > 0;

  return (
    <div>
      <div className="panel">
        <h2><FiPlay /> CNN Playground</h2>
        <p>
          Build your own CNN layer by layer. Add convolutions, pooling, and dense layers to see
          how the data shape and parameter count change. This is how real architectures are designed.
        </p>
      </div>

      <div className="panel">
        <div className="controls">
          <div className="select-wrap">
            <label>Input Size:</label>
            <select value={inputSize} onChange={e => setInputSize(Number(e.target.value))}>
              <option value={28}>28x28 (MNIST)</option>
              <option value={32}>32x32 (CIFAR-10)</option>
              <option value={64}>64x64</option>
              <option value={128}>128x128</option>
            </select>
          </div>
          <button className="btn btn-red" onClick={clearAll}><FiTrash2 /> Clear All</button>
        </div>

        <h3>Add Layers</h3>
        <div className="controls">
          {LAYER_TYPES.map(lt => {
            const Icon = lt.icon;
            return (
              <button key={lt.type} className="btn" onClick={() => addLayer(lt)}
                style={{ borderColor: lt.color, color: lt.color }}>
                <FiPlus /> <Icon /> {lt.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="playground-grid">
        <div className="panel" style={{ margin: 0 }}>
          <h3>Your Network ({layers.length} layers)</h3>
          <div className="pg-layer" style={{ background: '#e0f2fe', borderColor: '#0ea5e9' }}>
            <FiGrid className="pg-icon" />
            <span>Input ({inputSize}x{inputSize}x1)</span>
          </div>
          {layers.map((l, i) => (
            <div key={i} className="pg-layer" style={{ background: l.bg, borderColor: l.color, marginTop: 6 }}>
              <FiArrowRight className="pg-icon" style={{ color: l.color }} />
              <span style={{ color: l.color }}>{l.label}</span>
              {l.config.filters && <span style={{ fontSize: '0.72rem', color: '#666' }}>{l.config.filters} filters</span>}
              {l.config.units && <span style={{ fontSize: '0.72rem', color: '#666' }}>{l.config.units} units</span>}
              <button className="pg-remove" onClick={() => removeLayer(i)} aria-label="Remove layer"><FiTrash2 /></button>
            </div>
          ))}
        </div>

        <div>
          <div className="pg-stats">
            <div className="pg-stat">
              <div className="pg-stat-num">{totalParams.toLocaleString()}</div>
              <div className="pg-stat-label">Parameters</div>
            </div>
            <div className="pg-stat">
              <div className="pg-stat-num">{layers.length}</div>
              <div className="pg-stat-label">Layers</div>
            </div>
            <div className="pg-stat">
              <div className="pg-stat-num" style={{ color: isValid ? '#22c55e' : '#ef4444' }}>
                {isValid ? `${lastShape.h}x${lastShape.w}` : 'Invalid'}
              </div>
              <div className="pg-stat-label">Output Shape</div>
            </div>
          </div>

          {!isValid && (
            <div className="info-box error">
              <FiInfo className="info-icon" />
              <div>The spatial dimensions have become zero or negative. Too many convolutions or pooling layers
              for this input size. Try a larger input or fewer layers.</div>
            </div>
          )}

          <div className="info-box">
            <FiInfo className="info-icon" />
            <div>
              <strong>Shape flow:</strong> {inputSize}x{inputSize}x1
              {shapes.slice(1).map((s, i) => (
                <span key={i}> → {s.flat ? `${s.h * s.w * s.ch}` : `${s.h}x${s.w}x${s.ch}`}</span>
              ))}
            </div>
          </div>

          <div className="info-box success">
            <FiInfo className="info-icon" />
            <div>
              <strong>Tips:</strong> A typical CNN pattern is Conv → ReLU → Conv → ReLU → MaxPool, repeated.
              Add Flatten before Dense layers. BatchNorm goes after Conv, before ReLU.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

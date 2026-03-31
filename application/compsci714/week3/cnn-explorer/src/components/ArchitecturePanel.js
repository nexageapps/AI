import React, { useState } from 'react';
import { FiCpu, FiInfo, FiArrowRight } from 'react-icons/fi';

const ARCHITECTURES = {
  simple: {
    name: 'Simple CNN (LeNet-style)',
    desc: 'A basic CNN for small images like handwritten digits (MNIST). Great starting point.',
    layers: [
      { label: 'Input', sub: '28x28x1', color: '#e0f2fe', border: '#0ea5e9' },
      { label: 'Conv2D', sub: '32 filters 3x3', color: '#dbeafe', border: '#3b82f6' },
      { label: 'ReLU', sub: 'activation', color: '#fef3c7', border: '#f59e0b' },
      { label: 'MaxPool', sub: '2x2', color: '#ede9fe', border: '#8b5cf6' },
      { label: 'Conv2D', sub: '64 filters 3x3', color: '#dbeafe', border: '#3b82f6' },
      { label: 'ReLU', sub: 'activation', color: '#fef3c7', border: '#f59e0b' },
      { label: 'MaxPool', sub: '2x2', color: '#ede9fe', border: '#8b5cf6' },
      { label: 'Flatten', sub: '-> 1D', color: '#f1f5f9', border: '#94a3b8' },
      { label: 'Dense', sub: '128 units', color: '#dcfce7', border: '#22c55e' },
      { label: 'Output', sub: '10 classes', color: '#fee2e2', border: '#ef4444' },
    ],
    params: '~93K parameters',
  },
  cifar: {
    name: 'CIFAR-10 CNN',
    desc: 'A deeper CNN for color images. Uses batch normalization and dropout for better training.',
    layers: [
      { label: 'Input', sub: '32x32x3', color: '#e0f2fe', border: '#0ea5e9' },
      { label: 'Conv2D', sub: '32 filters 3x3', color: '#dbeafe', border: '#3b82f6' },
      { label: 'BatchNorm', sub: 'normalize', color: '#fce7f3', border: '#ec4899' },
      { label: 'ReLU', sub: 'activation', color: '#fef3c7', border: '#f59e0b' },
      { label: 'Conv2D', sub: '32 filters 3x3', color: '#dbeafe', border: '#3b82f6' },
      { label: 'MaxPool', sub: '2x2', color: '#ede9fe', border: '#8b5cf6' },
      { label: 'Dropout', sub: '25%', color: '#fee2e2', border: '#ef4444' },
      { label: 'Conv2D', sub: '64 filters 3x3', color: '#dbeafe', border: '#3b82f6' },
      { label: 'BatchNorm', sub: 'normalize', color: '#fce7f3', border: '#ec4899' },
      { label: 'MaxPool', sub: '2x2', color: '#ede9fe', border: '#8b5cf6' },
      { label: 'Flatten', sub: '-> 1D', color: '#f1f5f9', border: '#94a3b8' },
      { label: 'Dense', sub: '512 units', color: '#dcfce7', border: '#22c55e' },
      { label: 'Dropout', sub: '50%', color: '#fee2e2', border: '#ef4444' },
      { label: 'Output', sub: '10 classes', color: '#fee2e2', border: '#ef4444' },
    ],
    params: '~600K parameters',
  },
  vgg: {
    name: 'VGG-style (Deep)',
    desc: 'Inspired by VGG-16. Uses repeated 3x3 convolutions stacked deep. Simple but powerful.',
    layers: [
      { label: 'Input', sub: '224x224x3', color: '#e0f2fe', border: '#0ea5e9' },
      { label: '2x Conv2D', sub: '64 filters 3x3', color: '#dbeafe', border: '#3b82f6' },
      { label: 'MaxPool', sub: '2x2', color: '#ede9fe', border: '#8b5cf6' },
      { label: '2x Conv2D', sub: '128 filters 3x3', color: '#dbeafe', border: '#3b82f6' },
      { label: 'MaxPool', sub: '2x2', color: '#ede9fe', border: '#8b5cf6' },
      { label: '3x Conv2D', sub: '256 filters 3x3', color: '#dbeafe', border: '#3b82f6' },
      { label: 'MaxPool', sub: '2x2', color: '#ede9fe', border: '#8b5cf6' },
      { label: '3x Conv2D', sub: '512 filters 3x3', color: '#dbeafe', border: '#3b82f6' },
      { label: 'MaxPool', sub: '2x2', color: '#ede9fe', border: '#8b5cf6' },
      { label: 'Flatten', sub: '-> 1D', color: '#f1f5f9', border: '#94a3b8' },
      { label: 'Dense', sub: '4096', color: '#dcfce7', border: '#22c55e' },
      { label: 'Dense', sub: '4096', color: '#dcfce7', border: '#22c55e' },
      { label: 'Output', sub: '1000 classes', color: '#fee2e2', border: '#ef4444' },
    ],
    params: '~138M parameters',
  },
};

const LAYER_INFO = {
  'Conv2D': 'Applies learned filters to detect features like edges, textures, and shapes.',
  'ReLU': 'Activation function: keeps positive values, zeros out negatives. Adds non-linearity.',
  'MaxPool': 'Reduces spatial size by keeping only the max value in each window.',
  'Flatten': 'Converts 2D feature maps into a 1D vector for the dense layers.',
  'Dense': 'Fully connected layer — every neuron connects to every input.',
  'Output': 'Final layer with softmax activation — outputs probability for each class.',
  'BatchNorm': 'Normalizes layer inputs for faster, more stable training.',
  'Dropout': 'Randomly disables neurons during training to prevent overfitting.',
  'Input': 'Raw image pixels fed into the network.',
  '2x Conv2D': 'Two consecutive convolution layers — deeper feature extraction.',
  '3x Conv2D': 'Three consecutive convolution layers — even deeper features.',
};

const HIERARCHY = [
  { label: 'Edges', sub: 'Layer 1+', hue: 210 },
  { label: 'Corners & Textures', sub: 'Layer 2+', hue: 240 },
  { label: 'Parts (eyes, wheels)', sub: 'Layer 3+', hue: 270 },
  { label: 'Objects', sub: 'Layer 4+', hue: 300 },
];

export default function ArchitecturePanel() {
  const [arch, setArch] = useState('simple');
  const [hoveredLayer, setHoveredLayer] = useState(null);
  const current = ARCHITECTURES[arch];

  return (
    <div>
      <div className="panel">
        <h2><FiCpu /> CNN Architecture Explorer</h2>
        <p>
          A CNN stacks convolution, activation, and pooling layers to progressively extract
          higher-level features. Early layers detect edges; deeper layers detect complex shapes and objects.
        </p>
      </div>
      <div className="panel">
        <div className="controls">
          {Object.entries(ARCHITECTURES).map(([key, val]) => (
            <button key={key} className={`btn${arch === key ? ' btn-primary' : ''}`}
              onClick={() => { setArch(key); setHoveredLayer(null); }}>{val.name}</button>
          ))}
        </div>
        <p style={{ fontStyle: 'italic', marginBottom: 8 }}>{current.desc}</p>
        <div className="arch-flow">
          {current.layers.map((layer, i) => (
            <React.Fragment key={i}>
              {i > 0 && <span className="arch-arrow"><FiArrowRight /></span>}
              <div className="arch-block"
                style={{ background: layer.color, borderColor: layer.border }}
                onMouseEnter={() => setHoveredLayer(i)}
                onMouseLeave={() => setHoveredLayer(null)}>
                {layer.label}
                <span className="block-label">{layer.sub}</span>
              </div>
            </React.Fragment>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 8 }}>
          <span className="quiz-score">{current.params}</span>
        </div>
        {hoveredLayer !== null && (
          <div className="info-box">
            <FiInfo className="info-icon" />
            <div><strong>{current.layers[hoveredLayer].label}:</strong>{' '}
            {LAYER_INFO[current.layers[hoveredLayer].label] || 'A layer in the CNN pipeline.'}</div>
          </div>
        )}
      </div>
      <div className="panel">
        <h3>Feature Hierarchy</h3>
        <p>As data flows through the network, each layer builds on the previous one:</p>
        <div className="arch-flow" style={{ gap: 12 }}>
          {HIERARCHY.map((h, i) => (
            <React.Fragment key={i}>
              {i > 0 && <span className="arch-arrow"><FiArrowRight /></span>}
              <div className="arch-block" style={{
                background: `hsl(${h.hue}, 80%, 95%)`,
                borderColor: `hsl(${h.hue}, 60%, 50%)`,
              }}>
                {h.label}
                <span className="block-label">{h.sub}</span>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

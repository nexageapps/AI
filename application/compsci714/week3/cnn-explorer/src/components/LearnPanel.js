import React from 'react';
import { FiBookOpen, FiGrid, FiLayers, FiImage, FiCpu, FiPlay, FiAward, FiArrowRight, FiInfo, FiZap, FiTarget } from 'react-icons/fi';

const SECTIONS = [
  {
    id: 'conv', icon: FiGrid, title: 'Convolution', level: 'Beginner',
    levelColor: '#22c55e', levelBg: '#dcfce7',
    desc: 'See how a small filter slides across an image to detect edges and patterns. Step through it one position at a time.',
  },
  {
    id: 'pool', icon: FiLayers, title: 'Pooling', level: 'Beginner',
    levelColor: '#22c55e', levelBg: '#dcfce7',
    desc: 'Learn how pooling shrinks feature maps while keeping the important information. Compare Max vs Average pooling.',
  },
  {
    id: 'feat', icon: FiImage, title: 'Feature Maps', level: 'Intermediate',
    levelColor: '#f59e0b', levelBg: '#fef3c7',
    desc: 'Draw patterns and watch different filters respond. See what a CNN "sees" at each layer.',
  },
  {
    id: 'arch', icon: FiCpu, title: 'Architectures', level: 'Intermediate',
    levelColor: '#f59e0b', levelBg: '#fef3c7',
    desc: 'Explore real CNN architectures from LeNet to VGG. Understand how layers stack together.',
  },
  {
    id: 'play', icon: FiPlay, title: 'Playground', level: 'Advanced',
    levelColor: '#ef4444', levelBg: '#fee2e2',
    desc: 'Build your own CNN layer by layer. See how adding convolutions, pooling, and dense layers affects the network.',
  },
  {
    id: 'quiz', icon: FiAward, title: 'Quiz', level: 'All Levels',
    levelColor: '#8b5cf6', levelBg: '#ede9fe',
    desc: 'Test your understanding with 10 questions covering everything from basic convolution to advanced concepts.',
  },
];

export default function LearnPanel({ onNavigate }) {
  return (
    <div>
      <div className="panel">
        <h2><FiBookOpen /> What is a CNN?</h2>
        <p>
          A <strong>Convolutional Neural Network (CNN)</strong> is a type of deep learning model
          designed specifically for processing grid-like data such as images. Instead of treating
          every pixel independently (like a regular neural network), a CNN looks at small local
          regions and learns to detect patterns like edges, textures, and shapes.
        </p>
        <div className="info-box">
          <FiInfo className="info-icon" />
          <div>
            <strong>Why does this matter?</strong> A regular neural network would need millions of
            parameters for a small image. A CNN uses the same small filter everywhere, so it needs
            far fewer parameters and actually works better because it understands spatial structure.
          </div>
        </div>
      </div>

      <div className="panel">
        <h2><FiZap /> Three Key Ideas</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, margin: '16px 0' }}>
          <div className="info-box success" style={{ flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <FiGrid style={{ fontSize: '1.5rem' }} />
            <strong>Local Connectivity</strong>
            <span>Each neuron only looks at a small patch of the input, not the entire image.</span>
          </div>
          <div className="info-box" style={{ flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <FiLayers style={{ fontSize: '1.5rem' }} />
            <strong>Parameter Sharing</strong>
            <span>The same filter weights are reused at every position in the image.</span>
          </div>
          <div className="info-box warning" style={{ flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <FiTarget style={{ fontSize: '1.5rem' }} />
            <strong>Translation Invariance</strong>
            <span>A cat is detected whether it is in the top-left or bottom-right of the image.</span>
          </div>
        </div>
      </div>

      <div className="panel">
        <h2><FiArrowRight /> Learning Path</h2>
        <p>Work through these sections in order, from beginner to advanced:</p>
        <div className="learn-grid">
          {SECTIONS.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={s.id} className="learn-card" onClick={() => onNavigate(s.id)}>
                <span className="card-level" style={{ background: s.levelBg, color: s.levelColor }}>
                  {s.level}
                </span>
                <h4><Icon /> {i + 1}. {s.title}</h4>
                <p>{s.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

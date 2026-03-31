import React, { useState } from 'react';
import { FiSearch, FiLayers, FiGrid, FiCpu, FiImage, FiPlay, FiAward, FiArrowLeft } from 'react-icons/fi';
import './App.css';
import LearnPanel from './components/LearnPanel';
import ConvolutionPanel from './components/ConvolutionPanel';
import PoolingPanel from './components/PoolingPanel';
import ArchitecturePanel from './components/ArchitecturePanel';
import FeatureMapPanel from './components/FeatureMapPanel';
import PlaygroundPanel from './components/PlaygroundPanel';
import QuizPanel from './components/QuizPanel';

const TABS = [
  { id: 'learn', label: 'Learn', icon: FiSearch, level: 'Beginner' },
  { id: 'conv', label: 'Convolution', icon: FiGrid, level: 'Beginner' },
  { id: 'pool', label: 'Pooling', icon: FiLayers, level: 'Beginner' },
  { id: 'feat', label: 'Feature Maps', icon: FiImage, level: 'Intermediate' },
  { id: 'arch', label: 'Architectures', icon: FiCpu, level: 'Intermediate' },
  { id: 'play', label: 'Playground', icon: FiPlay, level: 'Advanced' },
  { id: 'quiz', label: 'Quiz', icon: FiAward, level: 'All Levels' },
];

const LEVEL_COLORS = {
  'Beginner': '#22c55e',
  'Intermediate': '#f59e0b',
  'Advanced': '#ef4444',
  'All Levels': '#8b5cf6',
};

export default function App() {
  const [tab, setTab] = useState('learn');

  return (
    <div className="app">
      <header className="shell">
        <div className="shell-logo">
          <svg width="28" height="28" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="44" stroke="white" strokeWidth="3" opacity="0.9"/>
            <rect x="25" y="30" width="18" height="18" rx="3" fill="white" opacity="0.8"/>
            <rect x="48" y="30" width="18" height="18" rx="3" fill="white" opacity="0.6"/>
            <rect x="25" y="53" width="18" height="18" rx="3" fill="white" opacity="0.6"/>
            <rect x="48" y="53" width="18" height="18" rx="3" fill="white" opacity="0.4"/>
            <path d="M72 40l8 10-8 10" stroke="white" strokeWidth="3" fill="none" opacity="0.9"/>
          </svg>
          CNN Explorer
        </div>
        <div className="shell-divider"></div>
        <span className="shell-title">University of Auckland · COMPSCI 714 · Week 3</span>
        <div className="shell-spacer"></div>
        <a href="https://nexageapps.github.io/AI/" className="shell-back">
          <FiArrowLeft style={{ marginRight: 4, verticalAlign: 'middle' }} /> All Apps
        </a>
      </header>

      <nav className="tab-nav" role="tablist">
        {TABS.map(t => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              role="tab"
              aria-selected={tab === t.id}
              className={`tab-btn${tab === t.id ? ' active' : ''}`}
              onClick={() => setTab(t.id)}
            >
              <Icon className="tab-icon" />
              <span className="tab-label">{t.label}</span>
              <span className="tab-level" style={{ color: LEVEL_COLORS[t.level] }}>{t.level}</span>
            </button>
          );
        })}
      </nav>

      <main className="main-content">
        {tab === 'learn' && <LearnPanel onNavigate={setTab} />}
        {tab === 'conv' && <ConvolutionPanel />}
        {tab === 'pool' && <PoolingPanel />}
        {tab === 'feat' && <FeatureMapPanel />}
        {tab === 'arch' && <ArchitecturePanel />}
        {tab === 'play' && <PlaygroundPanel />}
        {tab === 'quiz' && <QuizPanel />}
      </main>
    </div>
  );
}

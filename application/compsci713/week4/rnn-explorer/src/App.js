import React, { useState } from 'react';
import {
  FaBrain,
  FaBookOpen,
  FaProjectDiagram,
  FaChartLine,
  FaGraduationCap,
  FaGamepad,
  FaPuzzlePiece,
  FaWaveSquare,
  FaExchangeAlt,
  FaCrosshairs,
  FaFont,
  FaRocket,
} from 'react-icons/fa';
import IntroPanel from './components/IntroPanel';
import LearnPanel from './components/LearnPanel';
import RNNVisualizer from './components/RNNVisualizer';
import GateExplorer from './components/GateExplorer';
import SequencePlayground from './components/SequencePlayground';
import VanishingGradient from './components/VanishingGradient';
import BPTTVisualizer from './components/BPTTVisualizer';
import SelfAttentionViz from './components/SelfAttentionViz';
import NLPEmbeddings from './components/NLPEmbeddings';
import QuizPanel from './components/QuizPanel';
import './App.css';

const LEVELS = [
  { id: 'beginner', label: 'Beginner', icon: FaRocket, desc: 'New to AI' },
  { id: 'intermediate', label: 'Student', icon: FaBookOpen, desc: 'Some background' },
  { id: 'advanced', label: 'Advanced', icon: FaGraduationCap, desc: 'University level' },
];

function App() {
  const [activeTab, setActiveTab] = useState('intro');
  const [level, setLevel] = useState('beginner');

  const allTabs = [
    { id: 'intro', label: 'Start Here', icon: <FaRocket />, desc: 'Fun intro to RNNs', levels: ['beginner', 'intermediate', 'advanced'] },
    { id: 'visualizer', label: 'RNN Flow', icon: <FaProjectDiagram />, desc: 'Data flow through time', levels: ['beginner', 'intermediate', 'advanced'] },
    { id: 'learn', label: 'Learn', icon: <FaBookOpen />, desc: 'Core concepts', levels: ['intermediate', 'advanced'] },
    { id: 'gates', label: 'Gates', icon: <FaChartLine />, desc: 'LSTM & GRU gates', levels: ['intermediate', 'advanced'] },
    { id: 'vanishing', label: 'Gradients', icon: <FaWaveSquare />, desc: 'Vanishing gradient', levels: ['advanced'] },
    { id: 'bptt', label: 'BPTT', icon: <FaExchangeAlt />, desc: 'Backprop through time', levels: ['advanced'] },
    { id: 'selfattn', label: 'Attention', icon: <FaCrosshairs />, desc: 'Self-attention viz', levels: ['intermediate', 'advanced'] },
    { id: 'nlp', label: 'NLP', icon: <FaFont />, desc: 'Embeddings & metrics', levels: ['advanced'] },
    { id: 'playground', label: 'Playground', icon: <FaGamepad />, desc: 'Try it yourself', levels: ['beginner', 'intermediate', 'advanced'] },
    { id: 'quiz', label: 'Quiz', icon: <FaPuzzlePiece />, desc: 'Test knowledge', levels: ['beginner', 'intermediate', 'advanced'] },
  ];

  const tabs = allTabs.filter(t => t.levels.includes(level));

  // If current tab is hidden by level change, reset to intro
  if (!tabs.find(t => t.id === activeTab)) {
    setActiveTab('intro');
  }

  return (
    <div className="App">
      <div className="app-container">
        <header className="app-header">
          <div className="header-icon">UoA</div>
          <div className="header-text">
            <h1 className="app-title">UoA -- Master of Artificial Intelligence</h1>
            <p className="app-subtitle">
              <FaBrain style={{ marginRight: 4, verticalAlign: 'middle' }} />
              Recurrent Neural Networks Explorer
            </p>
          </div>
          <div className="level-selector">
            {LEVELS.map(l => {
              const LIcon = l.icon;
              return (
                <button key={l.id}
                  className={`level-btn ${level === l.id ? 'active' : ''}`}
                  onClick={() => setLevel(l.id)}
                  title={l.desc}>
                  <LIcon style={{ marginRight: 4 }} /> {l.label}
                </button>
              );
            })}
          </div>
          <div className="header-badge">COMPSCI 713</div>
        </header>

        <nav className="tab-bar" role="tablist">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-label">{tab.label}</span>
              <span className="tab-desc">{tab.desc}</span>
            </button>
          ))}
        </nav>

        <div className="tab-content">
          {activeTab === 'intro' && <IntroPanel onNavigate={(tab, lvl) => { if (lvl) setLevel(lvl); setActiveTab(tab); }} />}
          {activeTab === 'visualizer' && <RNNVisualizer />}
          {activeTab === 'learn' && <LearnPanel />}
          {activeTab === 'gates' && <GateExplorer />}
          {activeTab === 'vanishing' && <VanishingGradient />}
          {activeTab === 'bptt' && <BPTTVisualizer />}
          {activeTab === 'selfattn' && <SelfAttentionViz />}
          {activeTab === 'nlp' && <NLPEmbeddings />}
          {activeTab === 'playground' && <SequencePlayground />}
          {activeTab === 'quiz' && <QuizPanel />}
        </div>

        <footer className="app-footer">
          <span>
            <FaGraduationCap style={{ marginRight: 4 }} /> COMPSCI 713 -- University of Auckland
          </span>
          <span className="footer-sep">|</span>
          <span>Recurrent Neural Networks</span>
          <span className="footer-sep">|</span>
          <span className="footer-ref">
            Adapted from <a href="https://stanford.edu/~shervine/teaching/cs-230/" target="_blank" rel="noopener noreferrer">Stanford CS230</a>, <a href="https://cs231n.stanford.edu/" target="_blank" rel="noopener noreferrer">CS231n</a> &amp; <a href="https://sebastianraschka.com/blog/2023/self-attention-from-scratch.html" target="_blank" rel="noopener noreferrer">Raschka 2023</a>
          </span>
        </footer>
      </div>
    </div>
  );
}

export default App;

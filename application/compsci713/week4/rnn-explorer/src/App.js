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
} from 'react-icons/fa';
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

function App() {
  const [activeTab, setActiveTab] = useState('visualizer');

  const tabs = [
    { id: 'visualizer', label: 'RNN Flow', icon: <FaProjectDiagram />, desc: 'Data flow through time' },
    { id: 'learn', label: 'Learn', icon: <FaBookOpen />, desc: 'Core concepts' },
    { id: 'gates', label: 'Gates', icon: <FaChartLine />, desc: 'LSTM & GRU gates' },
    { id: 'vanishing', label: 'Gradients', icon: <FaWaveSquare />, desc: 'Vanishing gradient' },
    { id: 'bptt', label: 'BPTT', icon: <FaExchangeAlt />, desc: 'Backprop through time' },
    { id: 'selfattn', label: 'Attention', icon: <FaCrosshairs />, desc: 'Self-attention viz' },
    { id: 'nlp', label: 'NLP', icon: <FaFont />, desc: 'Embeddings & metrics' },
    { id: 'playground', label: 'Playground', icon: <FaGamepad />, desc: 'Try it yourself' },
    { id: 'quiz', label: 'Quiz', icon: <FaPuzzlePiece />, desc: 'Test knowledge' },
  ];

  return (
    <div className="App">
      <div className="app-container">
        <header className="app-header">
          <div className="header-icon">UoA</div>
          <div className="header-text">
            <h1 className="app-title">UoA — Master of Artificial Intelligence</h1>
            <p className="app-subtitle">
              <FaBrain style={{ marginRight: 4, verticalAlign: 'middle' }} />
              Recurrent Neural Networks Explorer
            </p>
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
            <FaGraduationCap style={{ marginRight: 4 }} /> COMPSCI 713 — University of Auckland
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

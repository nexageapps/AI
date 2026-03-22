import React, { useState } from 'react';
import {
  FaBrain,
  FaBookOpen,
  FaProjectDiagram,
  FaChartLine,
  FaGraduationCap,
  FaGamepad,
} from 'react-icons/fa';
import LearnPanel from './components/LearnPanel';
import NetworkBuilder from './components/NetworkBuilder';
import ActivationExplorer from './components/ActivationExplorer';
import NeuronPlayground from './components/NeuronPlayground';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('playground');

  const tabs = [
    { id: 'playground', label: 'Playground', icon: <FaGamepad />, desc: 'Try a single neuron' },
    { id: 'learn', label: 'Learn', icon: <FaBookOpen />, desc: 'Step-by-step lessons' },
    { id: 'activations', label: 'Activations', icon: <FaChartLine />, desc: 'Explore activation functions' },
    { id: 'build', label: 'Build', icon: <FaProjectDiagram />, desc: 'Design a neural network' },
  ];

  return (
    <div className="App">
      <div className="app-container">
        <header className="app-header">
          <div className="header-icon">UoA</div>
          <div className="header-text">
            <h1 className="app-title">UoA - Master of Artificial Intelligence</h1>
            <p className="app-subtitle">
              <FaBrain style={{ marginRight: 4, verticalAlign: 'middle' }} />
              Neural Networks &amp; Logical Neural Networks
            </p>
          </div>
          <div className="header-badge">COMPSCI 713 · Week 2</div>
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
          {activeTab === 'playground' && <NeuronPlayground />}
          {activeTab === 'learn' && <LearnPanel />}
          {activeTab === 'activations' && <ActivationExplorer />}
          {activeTab === 'build' && <NetworkBuilder />}
        </div>

        <footer className="app-footer">
          <span>
            <FaGraduationCap style={{ marginRight: 4 }} /> COMPSCI 713 — University of Auckland
          </span>
          <span>•</span>
          <span>Week 2: Neural Networks</span>
        </footer>
      </div>
    </div>
  );
}

export default App;

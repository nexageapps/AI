import React, { useState } from 'react';
import { FiBookOpen, FiEye, FiLayers, FiCpu, FiAward, FiArrowLeft } from 'react-icons/fi';
import './App.css';
import LearnPanel from './components/LearnPanel';
import AttentionPanel from './components/AttentionPanel';
import MultiHeadPanel from './components/MultiHeadPanel';
import ArchitecturePanel from './components/ArchitecturePanel';
import QuizPanel from './components/QuizPanel';

const TABS = [
  { id: 'learn', label: 'Learn', icon: FiBookOpen, level: 'Beginner' },
  { id: 'attn', label: 'Self-Attention', icon: FiEye, level: 'Beginner' },
  { id: 'multi', label: 'Multi-Head', icon: FiLayers, level: 'Intermediate' },
  { id: 'arch', label: 'Architecture', icon: FiCpu, level: 'Advanced' },
  { id: 'quiz', label: 'Quiz', icon: FiAward, level: 'All Levels' },
];
const LEVEL_COLORS = { Beginner:'#22c55e', Intermediate:'#f59e0b', Advanced:'#ef4444', 'All Levels':'#8b5cf6' };

export default function App() {
  const [tab, setTab] = useState('learn');
  return (
    <div className="app">
      <header className="shell">
        <div className="shell-logo">
          <svg width="28" height="28" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="44" stroke="white" strokeWidth="3" opacity="0.9"/>
            <circle cx="35" cy="40" r="6" fill="white" opacity="0.9"/>
            <circle cx="65" cy="40" r="6" fill="white" opacity="0.9"/>
            <circle cx="50" cy="65" r="6" fill="white" opacity="0.9"/>
            <path d="M35 40L65 40M35 40L50 65M65 40L50 65" stroke="white" strokeWidth="2" opacity="0.5"/>
          </svg>
          Transformer Explorer
        </div>
        <div className="shell-divider"></div>
        <span className="shell-title">University of Auckland · COMPSCI 714 · Week 4</span>
        <div className="shell-spacer"></div>
        <a href="https://nexageapps.github.io/AI/" className="shell-back"><FiArrowLeft /> All Apps</a>
      </header>
      <nav className="tab-nav" role="tablist">
        {TABS.map(t => {
          const Icon = t.icon;
          return (
            <button key={t.id} role="tab" aria-selected={tab === t.id}
              className={`tab-btn${tab === t.id ? ' active' : ''}`} onClick={() => setTab(t.id)}>
              <Icon className="tab-icon" /><span className="tab-label">{t.label}</span>
              <span className="tab-level" style={{ color: LEVEL_COLORS[t.level] }}>{t.level}</span>
            </button>
          );
        })}
      </nav>
      <main className="main-content">
        {tab === 'learn' && <LearnPanel onNavigate={setTab} />}
        {tab === 'attn' && <AttentionPanel />}
        {tab === 'multi' && <MultiHeadPanel />}
        {tab === 'arch' && <ArchitecturePanel />}
        {tab === 'quiz' && <QuizPanel />}
      </main>
    </div>
  );
}

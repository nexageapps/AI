import React, { useState } from 'react';
import { FiBookOpen, FiScissors, FiType, FiBarChart2, FiGlobe, FiAward, FiArrowLeft } from 'react-icons/fi';
import './App.css';
import LearnPanel from './components/LearnPanel';
import BPEPanel from './components/BPEPanel';
import TokenizerPanel from './components/TokenizerPanel';
import ComparePanel from './components/ComparePanel';
import RealWorldPanel from './components/RealWorldPanel';
import QuizPanel from './components/QuizPanel';

const TABS = [
  { id: 'learn', label: 'Learn', icon: FiBookOpen, level: 'Beginner' },
  { id: 'bpe', label: 'BPE Algorithm', icon: FiScissors, level: 'Beginner' },
  { id: 'tokenizer', label: 'Tokenizer', icon: FiType, level: 'Intermediate' },
  { id: 'compare', label: 'Compare', icon: FiBarChart2, level: 'Intermediate' },
  { id: 'realworld', label: 'Real World', icon: FiGlobe, level: 'Advanced' },
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
            <text x="50" y="42" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold" opacity="0.9">AB</text>
            <text x="50" y="68" textAnchor="middle" fill="white" fontSize="14" opacity="0.7">→ Ab</text>
          </svg>
          BPE Explorer
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
        {tab === 'bpe' && <BPEPanel />}
        {tab === 'tokenizer' && <TokenizerPanel />}
        {tab === 'compare' && <ComparePanel />}
        {tab === 'realworld' && <RealWorldPanel />}
        {tab === 'quiz' && <QuizPanel />}
      </main>
    </div>
  );
}

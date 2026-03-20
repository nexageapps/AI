import React, { useState } from 'react';
import TextInput      from './components/TextInput';
import TripleViewer   from './components/TripleViewer';
import GraphView      from './components/GraphView';
import QuestionBox    from './components/QuestionBox';
import InsightPanel   from './components/InsightPanel';
import EducationPanel from './components/EducationPanel';
import {
  extractTriples,
  detectConflicts,
  suggestMissingLinks,
} from './utils/tripleExtractor';
import './App.css';

export default function App() {
  const [triples,     setTriples]     = useState([]);
  const [conflicts,   setConflicts]   = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const handleExtract = (text) => {
    if (!text) {
      setTriples([]); setConflicts([]); setSuggestions([]);
      return;
    }
    const extracted = extractTriples(text);
    setTriples(extracted);
    setConflicts(detectConflicts(extracted));
    setSuggestions(suggestMissingLinks(extracted));
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-inner">
          <div>
            <h1 className="app-title">UoA COMPSCI 713 — <span>KG Playground</span></h1>
            <p className="app-subtitle">Knowledge Graphs · RDF Triples · RAG Simulation · Week 3</p>
          </div>
          <div className="header-badges">
            <span className="badge">RDF Triples</span>
            <span className="badge">Knowledge Graph</span>
            <span className="badge">RAG Simulation</span>
          </div>
        </div>
      </header>

      <main className="app-main">
        <div className="col-left">
          <TextInput onExtract={handleExtract} />
          <TripleViewer triples={triples} conflicts={conflicts} />
          <QuestionBox triples={triples} />
        </div>
        <div className="col-right">
          <GraphView triples={triples} />
          <InsightPanel triples={triples} suggestions={suggestions} conflicts={conflicts} />
        </div>
      </main>

      <div className="edu-wrapper">
        <EducationPanel />
      </div>
    </div>
  );
}

import React, { useState, useCallback } from 'react';
import SCENARIOS, { QUIZ_QUESTIONS } from './scenarios';
import { generateTruthTable, evaluate, expressionToString } from './logic';
import ScenarioCard from './components/ScenarioCard';
import PropositionToggle from './components/PropositionToggle';
import TruthTable from './components/TruthTable';
import FormulaDisplay from './components/FormulaDisplay';
import LearnPanel from './components/LearnPanel';
import QuizPanel from './components/QuizPanel';
import ExpressionBuilder from './components/ExpressionBuilder';
import FOLPanel from './components/FOLPanel';
import { Icon } from './iconMap';
import { FaSearch, FaBookOpen, FaFlask, FaWrench, FaStar, FaCheckCircle, FaTimesCircle,
  FaTrophy, FaHandPointUp, FaLightbulb, FaGraduationCap } from 'react-icons/fa';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('explore');
  const [selectedScenario, setSelectedScenario] = useState(0);
  const [assignment, setAssignment] = useState({});
  const [showStory, setShowStory] = useState(true);
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [customProps, setCustomProps] = useState([
    { name: 'P', meaning: 'Proposition P', emoji: '🔵', trueText: 'True', falseText: 'False' },
    { name: 'Q', meaning: 'Proposition Q', emoji: '🔴', trueText: 'True', falseText: 'False' },
  ]);
  const [customExpression, setCustomExpression] = useState({
    type: 'op', op: 'AND',
    left: { type: 'prop', name: 'P' },
    right: { type: 'prop', name: 'Q' },
  });

  const scenario = SCENARIOS[selectedScenario];
  const currentExpression = activeTab === 'build' ? customExpression : scenario.expression;
  const currentProps = activeTab === 'build' ? customProps : scenario.propositions;
  const truthTable = generateTruthTable(currentExpression);
  const currentResult = evaluate(currentExpression, assignment);

  const toggleProp = useCallback((name) => {
    setAssignment(prev => ({ ...prev, [name]: !prev[name] }));
  }, []);

  const selectScenario = useCallback((idx) => {
    setSelectedScenario(idx);
    setAssignment({});
    setShowStory(true);
  }, []);

  const filteredScenarios = difficultyFilter === 'all'
    ? SCENARIOS
    : SCENARIOS.filter(s => s.difficulty === difficultyFilter);

  const tabs = [
    { id: 'explore', label: 'Explore', icon: <FaSearch />, desc: 'Try real-world examples' },
    { id: 'learn', label: 'Learn', icon: <FaBookOpen />, desc: 'Step-by-step lessons' },
    { id: 'fol', label: 'First-Order', icon: <FaFlask />, desc: 'Predicates & quantifiers' },
    { id: 'build', label: 'Playground', icon: <FaWrench />, desc: 'Build your own' },
  ];

  const diffLabels = {
    all: { icon: <FaStar />, text: 'All' },
    beginner: { icon: <span className="diff-dot green" />, text: 'Easy' },
    intermediate: { icon: <span className="diff-dot yellow" />, text: 'Medium' },
    advanced: { icon: <span className="diff-dot red" />, text: 'Hard' },
  };

  return (
    <div className="App">
      <div className="app-container">
        <header className="app-header">
          <div className="header-icon">UoA</div>
          <div className="header-text">
            <h1 className="app-title">UoA - Master of Artificial Intelligence</h1>
            <p className="app-subtitle">Learn how computers think with fun puzzles!</p>
          </div>
          <div className="header-badge">COMPSCI 713</div>
        </header>

        <nav className="tab-bar" role="tablist">
          {tabs.map(tab => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => { setActiveTab(tab.id); setAssignment({}); }}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-label">{tab.label}</span>
              <span className="tab-desc">{tab.desc}</span>
            </button>
          ))}
        </nav>

        <div className="tab-content">
        {activeTab === 'learn' && <LearnPanel />}
        {activeTab === 'quiz' && <QuizPanel questions={QUIZ_QUESTIONS} />}
        {activeTab === 'fol' && <FOLPanel />}

        {activeTab === 'explore' && (
          <div className="explore-layout">
            <div className="scenario-sidebar">
              <div className="difficulty-filter">
                <span className="filter-label">Level:</span>
                {['all', 'beginner', 'intermediate', 'advanced'].map(d => (
                  <button
                    key={d}
                    className={`filter-btn ${difficultyFilter === d ? 'active' : ''}`}
                    onClick={() => setDifficultyFilter(d)}
                  >
                    {diffLabels[d].icon} {diffLabels[d].text}
                  </button>
                ))}
              </div>
              <div className="scenario-list">
                {filteredScenarios.map((s) => {
                  const realIdx = SCENARIOS.indexOf(s);
                  return (
                    <ScenarioCard
                      key={s.id}
                      scenario={s}
                      selected={selectedScenario === realIdx}
                      onClick={() => selectScenario(realIdx)}
                    />
                  );
                })}
              </div>
            </div>

            <div className="main-workspace">
              {showStory && (
                <div className="story-banner">
                  <div className="story-content">
                    <Icon emoji={scenario.propositions[0]?.emoji} className="story-icon" size="1.6rem" />
                    <div>
                      <p className="story-text">{scenario.story}</p>
                      {scenario.funFact && (
                        <p className="fun-fact"><FaLightbulb className="fun-fact-icon" /> <span>{scenario.funFact}</span></p>
                      )}
                    </div>
                  </div>
                  <button className="story-close" onClick={() => setShowStory(false)} aria-label="Close story">Got it!</button>
                </div>
              )}

              <FormulaDisplay
                formula={scenario.formula}
                equivalent={scenario.equivalent}
                equivalentFormula={scenario.equivalentFormula}
              />

              <div className="interactive-area">
                <div className="toggle-section">
                  <h3 className="section-title"><FaHandPointUp className="section-title-icon" /> Toggle to explore</h3>
                  <div className="toggle-list">
                    {currentProps.map(p => (
                      <PropositionToggle
                        key={p.name}
                        prop={p}
                        value={assignment[p.name] || false}
                        onToggle={() => toggleProp(p.name)}
                      />
                    ))}
                  </div>
                  <div className={`result-box ${currentResult ? 'true' : 'false'}`}>
                    <span className="result-emoji">{currentResult ? <FaCheckCircle /> : <FaTimesCircle />}</span>
                    <div>
                      <div className="result-label">Result</div>
                      <div className="result-value">{currentResult ? 'TRUE' : 'FALSE'}</div>
                    </div>
                  </div>
                  {scenario.challenge && (
                    <div className="challenge-box">
                      <span className="challenge-icon"><FaTrophy /></span>
                      <p className="challenge-text">{scenario.challenge}</p>
                    </div>
                  )}
                </div>

                <div className="table-section">
                  <TruthTable
                    truthTable={truthTable}
                    expression={currentExpression}
                    assignment={assignment}
                    formulaStr={scenario.formula}
                    equivalent={scenario.equivalent}
                    equivalentFormula={scenario.equivalentFormula}
                    propositions={currentProps}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'build' && (
          <div className="build-layout">
            <ExpressionBuilder
              propositions={customProps}
              setPropositions={setCustomProps}
              expression={customExpression}
              setExpression={setCustomExpression}
            />
            <div className="build-workspace">
              <FormulaDisplay formula={expressionToString(customExpression)} />
              <div className="interactive-area">
                <div className="toggle-section">
                  <h3 className="section-title"><FaHandPointUp className="section-title-icon" /> Toggle to explore</h3>
                  <div className="toggle-list">
                    {currentProps.map(p => (
                      <PropositionToggle
                        key={p.name}
                        prop={p}
                        value={assignment[p.name] || false}
                        onToggle={() => toggleProp(p.name)}
                      />
                    ))}
                  </div>
                  <div className={`result-box ${currentResult ? 'true' : 'false'}`}>
                    <span className="result-emoji">{currentResult ? <FaCheckCircle /> : <FaTimesCircle />}</span>
                    <div>
                      <div className="result-label">Result</div>
                      <div className="result-value">{currentResult ? 'TRUE' : 'FALSE'}</div>
                    </div>
                  </div>
                </div>
                <div className="table-section">
                  <TruthTable
                    truthTable={truthTable}
                    expression={customExpression}
                    assignment={assignment}
                    formulaStr={expressionToString(customExpression)}
                    propositions={customProps}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        </div>

        <footer className="app-footer">
          <span><FaGraduationCap style={{ marginRight: 4 }} /> COMPSCI 713 — University of Auckland</span>
          <span>•</span>
          <span>Made for learners of all ages</span>
        </footer>
      </div>
    </div>
  );
}

export default App;

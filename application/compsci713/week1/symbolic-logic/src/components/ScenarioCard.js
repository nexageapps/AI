import React from 'react';
import './ScenarioCard.css';

const DIFF_COLORS = {
  beginner: '#22c55e',
  intermediate: '#eab308',
  advanced: '#ef4444',
};

function ScenarioCard({ scenario, selected, onClick }) {
  return (
    <button
      className={`scenario-card ${selected ? 'selected' : ''}`}
      onClick={onClick}
      aria-pressed={selected}
    >
      <div className="card-header">
        <span className="card-name">{scenario.name}</span>
        <span
          className="card-diff"
          style={{ background: DIFF_COLORS[scenario.difficulty] }}
        >
          {scenario.difficulty === 'beginner' ? 'Easy' : scenario.difficulty === 'intermediate' ? 'Medium' : 'Hard'}
        </span>
      </div>
      <p className="card-formula">{scenario.formula}</p>
    </button>
  );
}

export default ScenarioCard;

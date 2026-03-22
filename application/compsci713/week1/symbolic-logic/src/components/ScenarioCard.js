import React from 'react';
import { Icon } from '../iconMap';
import './ScenarioCard.css';

const DIFF_COLORS = {
  beginner: '#22c55e',
  intermediate: '#eab308',
  advanced: '#ef4444',
};

// Extract the leading emoji from scenario name and render as icon
function parseScenarioName(name) {
  // Match leading emoji (1-2 chars that are emoji) followed by space and text
  const match = name.match(/^(.+?)\s+(.+)$/);
  if (match) {
    const possibleEmoji = match[1];
    return { emoji: possibleEmoji, text: match[2] };
  }
  return { emoji: null, text: name };
}

function ScenarioCard({ scenario, selected, onClick }) {
  const { emoji, text } = parseScenarioName(scenario.name);

  return (
    <button
      className={`scenario-card ${selected ? 'selected' : ''}`}
      onClick={onClick}
      aria-pressed={selected}
    >
      <div className="card-header">
        <span className="card-name">
          {emoji && <Icon emoji={emoji} className="card-icon" size="0.95rem" />}
          {text}
        </span>
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

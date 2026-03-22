import React from 'react';
import './PropositionPanel.css';

function PropositionPanel({ propositions, assignment, onToggle, result, expression }) {
  return (
    <div className="proposition-panel">
      <h3>Propositions</h3>
      <p className="panel-hint">Toggle each proposition to see how the result changes</p>
      <div className="prop-list">
        {propositions.map(p => {
          const val = assignment[p.name] || false;
          return (
            <div key={p.name} className="prop-row">
              <button
                className={`prop-toggle ${val ? 'true' : 'false'}`}
                onClick={() => onToggle(p.name)}
                aria-label={`Toggle ${p.name}: ${p.meaning}`}
                aria-pressed={val}
              >
                <span className="prop-name">{p.name}</span>
                <span className="prop-value">{val ? 'T' : 'F'}</span>
              </button>
              <span className="prop-meaning">{p.meaning}</span>
            </div>
          );
        })}
      </div>
      <div className={`result-display ${result ? 'true' : 'false'}`}>
        <span className="result-label">Result:</span>
        <span className="result-value">{result ? 'TRUE ✓' : 'FALSE ✗'}</span>
      </div>
    </div>
  );
}

export default PropositionPanel;

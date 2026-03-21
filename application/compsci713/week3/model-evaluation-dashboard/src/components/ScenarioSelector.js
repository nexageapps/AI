import React from 'react';
import './ScenarioSelector.css';

function ScenarioSelector({ scenarios, currentScenario, onScenarioChange }) {
  return (
    <div className="scenario-selector card">
      <h2 className="card-title">Real-World Scenarios</h2>
      <p className="card-subtitle">
        Choose a scenario to see how different metrics matter in different contexts
      </p>
      
      <div className="scenarios-grid">
        {Object.entries(scenarios).map(([key, scenario]) => (
          <button
            key={key}
            className={`scenario-card ${currentScenario === key ? 'active' : ''}`}
            onClick={() => onScenarioChange(key)}
            style={{
              borderColor: currentScenario === key ? scenario.color : '#e0e0e0'
            }}
          >
            <div 
              className="scenario-indicator"
              style={{ backgroundColor: scenario.color }}
            />
            <h3>{scenario.name}</h3>
            <p className="scenario-description">{scenario.description}</p>
            <div className="scenario-stats">
              <span className="stat">
                <strong>Samples:</strong> {scenario.totalSamples.toLocaleString()}
              </span>
              <span className="stat">
                <strong>Positive Rate:</strong> {(scenario.positiveRate * 100).toFixed(1)}%
              </span>
              <span className="optimal-metric">
                Optimize: <strong>{scenario.optimalMetric}</strong>
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default ScenarioSelector;

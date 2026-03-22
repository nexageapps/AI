import React from 'react';
import './FormulaDisplay.css';

function FormulaDisplay({ formula, equivalent, equivalentFormula }) {
  return (
    <div className="formula-display">
      <div className="formula-main">
        <span className="formula-label">Formula</span>
        <span className="formula-text">{formula}</span>
      </div>
      {equivalent && equivalentFormula && (
        <div className="formula-equiv">
          <span className="equiv-symbol">≡</span>
          <span className="equiv-text">{equivalentFormula}</span>
          <span className="equiv-badge">Equivalent!</span>
        </div>
      )}
    </div>
  );
}

export default FormulaDisplay;

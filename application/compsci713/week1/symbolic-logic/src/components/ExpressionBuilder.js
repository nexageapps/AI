import React, { useState } from 'react';
import { OPERATORS, expressionToString } from '../logic';
import { FaCubes, FaCog, FaLayerGroup, FaPlus, FaTimes } from 'react-icons/fa';
import './ExpressionBuilder.css';

function ExpressionBuilder({ propositions, setPropositions, expression, setExpression }) {
  const [newPropName, setNewPropName] = useState('');
  const [newPropMeaning, setNewPropMeaning] = useState('');
  const [hoveredOp, setHoveredOp] = useState(null);

  const addProposition = () => {
    const name = newPropName.trim().toUpperCase();
    if (name && !propositions.find(p => p.name === name)) {
      setPropositions([...propositions, { name, meaning: newPropMeaning || `Proposition ${name}` }]);
      setNewPropName('');
      setNewPropMeaning('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') addProposition();
  };

  const removeProposition = (name) => {
    if (propositions.length > 1) {
      setPropositions(propositions.filter(p => p.name !== name));
    }
  };

  const setLeftProp = (name) => {
    if (expression.type === 'op') {
      setExpression({ ...expression, left: { type: 'prop', name } });
    }
  };

  const setRightProp = (name) => {
    if (expression.type === 'op') {
      setExpression({ ...expression, right: { type: 'prop', name } });
    }
  };

  const setOperator = (op) => {
    if (op === 'NOT') {
      const operand = expression.type === 'op' ? expression.left : (expression.operand || { type: 'prop', name: propositions[0]?.name || 'P' });
      setExpression({ type: 'not', operand });
    } else {
      if (expression.type === 'op') {
        setExpression({ ...expression, op });
      } else {
        setExpression({
          type: 'op', op,
          left: expression.operand || { type: 'prop', name: propositions[0]?.name || 'P' },
          right: { type: 'prop', name: propositions[1]?.name || 'Q' },
        });
      }
    }
  };

  const wrapWithOp = (op) => {
    if (op === 'NOT') {
      setExpression({ type: 'not', operand: expression });
    } else {
      setExpression({
        type: 'op', op,
        left: expression,
        right: { type: 'prop', name: propositions[0]?.name || 'P' },
      });
    }
  };

  const activeOp = expression.type === 'op' ? expression.op : (expression.type === 'not' ? 'NOT' : null);
  const hintOp = hoveredOp ? OPERATORS[hoveredOp] : (activeOp ? OPERATORS[activeOp] : null);

  return (
    <div className="expression-builder">
      {/* Live formula preview */}
      <div className="builder-preview">
        <span className="builder-preview-label">Formula</span>
        <span className="builder-preview-formula">{expressionToString(expression)}</span>
      </div>

      {/* Propositions */}
      <div className="builder-section">
        <div className="builder-section-header">
          <FaCubes className="builder-section-icon" />
          <h3>Variables</h3>
        </div>
        <div className="prop-chips">
          {propositions.map(p => (
            <div key={p.name} className="prop-chip" title={p.meaning}>
              <span className="prop-chip-letter">{p.name}</span>
              <span className="prop-chip-meaning">{p.meaning}</span>
              {propositions.length > 1 && (
                <button className="remove-btn" onClick={() => removeProposition(p.name)} aria-label={`Remove ${p.name}`}>
                  <FaTimes />
                </button>
              )}
            </div>
          ))}
        </div>
        <div className="add-prop-form">
          <input
            type="text"
            placeholder="R"
            value={newPropName}
            onChange={e => setNewPropName(e.target.value)}
            onKeyDown={handleKeyDown}
            maxLength={2}
            className="prop-input"
            aria-label="Proposition letter"
          />
          <input
            type="text"
            placeholder="e.g. It is raining"
            value={newPropMeaning}
            onChange={e => setNewPropMeaning(e.target.value)}
            onKeyDown={handleKeyDown}
            className="meaning-input"
            aria-label="Proposition meaning"
          />
          <button className="add-btn" onClick={addProposition} aria-label="Add proposition">
            <FaPlus />
          </button>
        </div>
      </div>

      {/* Operator selection */}
      <div className="builder-section">
        <div className="builder-section-header">
          <FaCog className="builder-section-icon" />
          <h3>Operator</h3>
        </div>
        <div className="op-grid">
          {Object.entries(OPERATORS).map(([key, op]) => (
            <button
              key={key}
              className={`op-card ${activeOp === key ? 'active' : ''}`}
              onClick={() => setOperator(key)}
              onMouseEnter={() => setHoveredOp(key)}
              onMouseLeave={() => setHoveredOp(null)}
              title={op.kidExplain}
            >
              <span className="op-card-symbol">{op.symbol}</span>
              <span className="op-card-label">{op.label}</span>
            </button>
          ))}
        </div>
        {hintOp && (
          <div className="op-hint">
            <span className="op-hint-emoji">{hintOp.emoji}</span>
            <span className="op-hint-text">{hintOp.kidExplain}</span>
          </div>
        )}
      </div>

      {/* Operand selectors */}
      {expression.type === 'op' && (
        <div className="builder-section">
          <div className="builder-section-header">
            <FaCubes className="builder-section-icon" />
            <h3>Operands</h3>
          </div>
          <div className="operand-row">
            <span className="operand-label">Left</span>
            <div className="operand-buttons">
              {propositions.map(p => (
                <button
                  key={p.name}
                  className={`operand-btn ${expression.left?.type === 'prop' && expression.left?.name === p.name ? 'active' : ''}`}
                  onClick={() => setLeftProp(p.name)}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>
          <div className="operand-row">
            <span className="operand-label">Right</span>
            <div className="operand-buttons">
              {propositions.map(p => (
                <button
                  key={p.name}
                  className={`operand-btn ${expression.right?.type === 'prop' && expression.right?.name === p.name ? 'active' : ''}`}
                  onClick={() => setRightProp(p.name)}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {expression.type === 'not' && (
        <div className="builder-section">
          <div className="builder-section-header">
            <FaCubes className="builder-section-icon" />
            <h3>Operand</h3>
          </div>
          <div className="operand-row">
            <span className="operand-label">Apply ¬ to</span>
            <div className="operand-buttons">
              {propositions.map(p => (
                <button
                  key={p.name}
                  className={`operand-btn ${expression.operand?.type === 'prop' && expression.operand?.name === p.name ? 'active' : ''}`}
                  onClick={() => setExpression({ type: 'not', operand: { type: 'prop', name: p.name } })}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Compose / nest */}
      <div className="builder-section">
        <div className="builder-section-header">
          <FaLayerGroup className="builder-section-icon" />
          <h3>Nest Expression</h3>
        </div>
        <p className="compose-hint">Wrap your current formula with another operator</p>
        <div className="compose-grid">
          {Object.entries(OPERATORS).map(([key, op]) => (
            <button key={key} className="compose-btn" onClick={() => wrapWithOp(key)} title={`Wrap with ${op.label}`}>
              {key === 'NOT' ? `¬(expr)` : `expr ${op.symbol} …`}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ExpressionBuilder;

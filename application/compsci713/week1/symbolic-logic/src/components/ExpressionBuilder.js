import React, { useState } from 'react';
import { OPERATORS, expressionToString } from '../logic';
import './ExpressionBuilder.css';

function ExpressionBuilder({ propositions, setPropositions, expression, setExpression }) {
  const [newPropName, setNewPropName] = useState('');
  const [newPropMeaning, setNewPropMeaning] = useState('');

  const addProposition = () => {
    const name = newPropName.trim().toUpperCase();
    if (name && !propositions.find(p => p.name === name)) {
      setPropositions([...propositions, { name, meaning: newPropMeaning || `Proposition ${name}` }]);
      setNewPropName('');
      setNewPropMeaning('');
    }
  };

  const removeProposition = (name) => {
    if (propositions.length > 1) {
      setPropositions(propositions.filter(p => p.name !== name));
    }
  };

  const buildExpression = (op, left, right) => {
    if (op === 'NOT') {
      setExpression({ type: 'not', operand: left || expression });
    } else {
      setExpression({
        type: 'op', op,
        left: left || { type: 'prop', name: propositions[0]?.name || 'P' },
        right: right || { type: 'prop', name: propositions[1]?.name || 'Q' },
      });
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

  return (
    <div className="expression-builder">
      <div className="builder-section">
        <h3>Propositions</h3>
        <div className="prop-chips">
          {propositions.map(p => (
            <div key={p.name} className="prop-chip">
              <span>{p.name}: {p.meaning}</span>
              {propositions.length > 1 && (
                <button className="remove-btn" onClick={() => removeProposition(p.name)} aria-label={`Remove ${p.name}`}>×</button>
              )}
            </div>
          ))}
        </div>
        <div className="add-prop-form">
          <input
            type="text"
            placeholder="Letter (e.g. R)"
            value={newPropName}
            onChange={e => setNewPropName(e.target.value)}
            maxLength={2}
            className="prop-input"
            aria-label="Proposition letter"
          />
          <input
            type="text"
            placeholder="Meaning (e.g. It is raining)"
            value={newPropMeaning}
            onChange={e => setNewPropMeaning(e.target.value)}
            className="meaning-input"
            aria-label="Proposition meaning"
          />
          <button className="add-btn" onClick={addProposition}>Add</button>
        </div>
      </div>

      <div className="builder-section">
        <h3>Build Expression</h3>
        <div className="current-expr">
          <span className="expr-label">Current:</span>
          <span className="expr-formula">{expressionToString(expression)}</span>
        </div>

        <div className="builder-controls">
          <div className="control-group">
            <label>Operator:</label>
            <div className="op-buttons">
              {Object.entries(OPERATORS).map(([key, op]) => (
                <button
                  key={key}
                  className={`op-btn ${(expression.type === 'op' && expression.op === key) || (expression.type === 'not' && key === 'NOT') ? 'active' : ''}`}
                  onClick={() => setOperator(key)}
                  title={op.label}
                >
                  {op.symbol}
                </button>
              ))}
            </div>
          </div>

          {expression.type === 'op' && (
            <div className="operand-selectors">
              <div className="control-group">
                <label>Left:</label>
                <div className="prop-select-buttons">
                  {propositions.map(p => (
                    <button
                      key={p.name}
                      className={`prop-select-btn ${expression.left?.type === 'prop' && expression.left?.name === p.name ? 'active' : ''}`}
                      onClick={() => setLeftProp(p.name)}
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>
              <div className="control-group">
                <label>Right:</label>
                <div className="prop-select-buttons">
                  {propositions.map(p => (
                    <button
                      key={p.name}
                      className={`prop-select-btn ${expression.right?.type === 'prop' && expression.right?.name === p.name ? 'active' : ''}`}
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
            <div className="control-group">
              <label>Operand:</label>
              <div className="prop-select-buttons">
                {propositions.map(p => (
                  <button
                    key={p.name}
                    className={`prop-select-btn ${expression.operand?.type === 'prop' && expression.operand?.name === p.name ? 'active' : ''}`}
                    onClick={() => setExpression({ type: 'not', operand: { type: 'prop', name: p.name } })}
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="control-group">
            <label>Compose:</label>
            <div className="compose-buttons">
              {Object.entries(OPERATORS).map(([key, op]) => (
                <button key={key} className="compose-btn" onClick={() => wrapWithOp(key)} title={`Wrap with ${op.label}`}>
                  {`expr ${op.symbol} ...`}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExpressionBuilder;

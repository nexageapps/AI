import React from 'react';
import { Icon } from '../iconMap';
import './PropositionToggle.css';

function PropositionToggle({ prop, value, onToggle }) {
  return (
    <div className={`prop-toggle-row ${value ? 'is-true' : 'is-false'}`}>
      <button
        className="prop-toggle-btn"
        onClick={onToggle}
        aria-label={`Toggle ${prop.name}: ${prop.meaning}`}
        aria-pressed={value}
      >
        <Icon emoji={prop.emoji} className="prop-icon" size="1.4rem" />
        <div className="prop-info">
          <span className="prop-letter">{prop.name}</span>
          <span className="prop-meaning">{prop.meaning}</span>
        </div>
        <div className="toggle-switch">
          <div className={`toggle-track ${value ? 'on' : 'off'}`}>
            <div className="toggle-thumb" />
          </div>
        </div>
        <span className="prop-state-text">
          {value ? prop.trueText || 'TRUE' : prop.falseText || 'FALSE'}
        </span>
      </button>
    </div>
  );
}

export default PropositionToggle;

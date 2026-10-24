import React from 'react';
import './Controls.css';

const Controls = ({ onMoveForward, onTurnLeft, onTurnRight, onGrab, onReset, disabled }) => {
  return (
    <div className="controls">
      <div className="controls-section">
        <h3>Movement</h3>
        <div className="button-grid">
          <div></div>
          <button onClick={onMoveForward} disabled={disabled} className="btn-move">
            ↑ Forward
          </button>
          <div></div>
          <button onClick={onTurnLeft} disabled={disabled} className="btn-turn">
            ↶ Turn Left
          </button>
          <div></div>
          <button onClick={onTurnRight} disabled={disabled} className="btn-turn">
            ↷ Turn Right
          </button>
        </div>
      </div>

      <div className="controls-section">
        <h3>Actions</h3>
        <div className="action-buttons">
          <button onClick={onGrab} disabled={disabled} className="btn-action">
            🤲 Grab
          </button>
          <button onClick={onReset} className="btn-reset">
            🔄 Reset
          </button>
        </div>
      </div>

      <div className="instructions">
        <h4>How to Play:</h4>
        <ul>
          <li>🎯 <strong>Goal:</strong> Find gold and return to (1,1)</li>
          <li>🌬️ <strong>Breeze:</strong> Pit in adjacent cell</li>
          <li>💨 <strong>Stench:</strong> Wumpus in adjacent cell</li>
          <li>⚠️ Avoid pits (🕳️) and Wumpus (👹)</li>
          <li>🏆 Grab gold when you find it</li>
        </ul>
      </div>
    </div>
  );
};

export default Controls;

import React from 'react';
import './Sidebar.css';

const Sidebar = ({
  score,
  moves,
  position,
  direction,
  hasGold,
  perceptions,
  numPits,
  totalGold,
  onPitChange,
  onMoveForward,
  onTurnLeft,
  onTurnRight,
  onGrab,
  onReset,
  disabled
}) => {
  return (
    <div className="sidebar">
      <div className="sidebar-section">
        <h3>Game Stats</h3>
        <div className="stat-item">
          <span className="stat-label">Score:</span>
          <span className="stat-value">{score}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Moves:</span>
          <span className="stat-value">{moves}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Position:</span>
          <span className="stat-value">({position.col}, {position.row})</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Direction:</span>
          <span className="stat-value">{direction}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Has Gold:</span>
          <span className="stat-value">{hasGold ? '✓ Yes' : '✗ No'}</span>
        </div>
      </div>

      <div className="sidebar-section">
        <h3>Current Perceptions</h3>
        <div className="perceptions">
          {perceptions.length === 0 ? (
            <div className="perception-item">Nothing detected</div>
          ) : (
            perceptions.map((p, i) => (
              <div key={i} className="perception-item">
                {p === 'stench' && '💨 Stench'}
                {p === 'breeze' && '🌬️ Breeze'}
                {p === 'gold' && '🏆 Gold here!'}
              </div>
            ))
          )}
        </div>
      </div>

      <div className="sidebar-section">
        <h3>World Settings</h3>
        <div className="pit-control">
          <label>Number of Pits: {numPits}</label>
          <input
            type="range"
            min="0"
            max="10"
            value={numPits}
            onChange={(e) => onPitChange(parseInt(e.target.value))}
            className="pit-slider"
          />
        </div>
      </div>

      <div className="sidebar-section hint-section">
        <h3>💡 Hint</h3>
        <div className="hint-content">
          <div className="hint-item">
            <span className="hint-icon">🏆</span>
            <span className="hint-text">Gold in world: {totalGold}</span>
          </div>
        </div>
      </div>

      <div className="sidebar-section">
        <h3>Controls</h3>
        <div className="control-buttons">
          <button onClick={onMoveForward} disabled={disabled} className="btn btn-move">
            ↑ Forward (W)
          </button>
          <div className="turn-buttons">
            <button onClick={onTurnLeft} disabled={disabled} className="btn btn-turn">
              ↶ Left (A)
            </button>
            <button onClick={onTurnRight} disabled={disabled} className="btn btn-turn">
              ↷ Right (D)
            </button>
          </div>
          <button onClick={onGrab} disabled={disabled} className="btn btn-grab">
            🤲 Grab (G)
          </button>
          <button onClick={onReset} className="btn btn-reset">
            🔄 Reset (R)
          </button>
        </div>
      </div>

      <div className="sidebar-section">
        <h3>How to Play</h3>
        <ul className="instructions">
          <li>W: Move forward</li>
          <li>Arrow keys: Turn direction</li>
          <li>A/D: Turn left/right</li>
          <li>G/Space: Grab gold</li>
          <li>Find gold, return to (1,1)</li>
          <li>Breeze = pit nearby</li>
          <li>Stench = Wumpus nearby</li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

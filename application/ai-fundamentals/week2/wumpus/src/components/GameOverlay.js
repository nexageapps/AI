import React from 'react';
import './GameOverlay.css';

const GameOverlay = ({ status, score, moves, onRestart }) => {
  return (
    <div className="game-overlay">
      <div className="overlay-content">
        {status === 'victory' ? (
          <>
            <div className="overlay-icon victory">🎉</div>
            <h2 className="overlay-title">VICTORY!</h2>
            <p className="overlay-message">You escaped with the gold!</p>
          </>
        ) : (
          <>
            <div className="overlay-icon dead">💀</div>
            <h2 className="overlay-title">GAME OVER</h2>
            <p className="overlay-message">You died!</p>
          </>
        )}
        <div className="overlay-stats">
          <div className="overlay-stat">
            <span className="stat-label">Final Score:</span>
            <span className="stat-value">{score}</span>
          </div>
          <div className="overlay-stat">
            <span className="stat-label">Moves:</span>
            <span className="stat-value">{moves}</span>
          </div>
        </div>
        <button onClick={onRestart} className="restart-button">
          Press SPACE or Click to Restart
        </button>
      </div>
    </div>
  );
};

export default GameOverlay;

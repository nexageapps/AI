import React from 'react';
import { useGame } from '../context/GameContext';
import { SURFACE_TYPES } from '../utils/hillSurfaces';
import './ControlPanel.css';

const ControlPanel = () => {
  const { state, actions } = useGame();
  const { learningRate, isAutoMode, gameStatus, hillSurface } = state;

  const handleLearningRateChange = (e) => {
    actions.setLearningRate(parseFloat(e.target.value));
  };

  const handleSurfaceChange = (e) => {
    actions.changeSurface(e.target.value);
  };

  const handlePresetLearningRate = (rate) => {
    actions.setLearningRate(rate);
  };

  return (
    <div className="control-panel">
      <h2>Controls</h2>
      
      <div className="control-section">
        <h3>Surface Type</h3>
        <select 
          value={hillSurface.type} 
          onChange={handleSurfaceChange}
          className="surface-selector"
        >
          <option value={SURFACE_TYPES.BOWL}>Bowl (Simple)</option>
          <option value={SURFACE_TYPES.VALLEY}>Valley</option>
          <option value={SURFACE_TYPES.MULTIMODAL}>Multi-modal</option>
        </select>
      </div>

      <div className="control-section">
        <h3>Learning Rate: {learningRate.toFixed(2)}</h3>
        <input
          type="range"
          min="0.01"
          max="2.0"
          step="0.01"
          value={learningRate}
          onChange={handleLearningRateChange}
          className="learning-rate-slider"
        />
        <div className="preset-buttons">
          <button onClick={() => handlePresetLearningRate(0.1)} className="preset-btn">
            Easy (0.1)
          </button>
          <button onClick={() => handlePresetLearningRate(0.5)} className="preset-btn">
            Medium (0.5)
          </button>
          <button onClick={() => handlePresetLearningRate(1.0)} className="preset-btn">
            Hard (1.0)
          </button>
        </div>
      </div>

      <div className="control-section">
        <h3>Step Controls</h3>
        <div className="button-group">
          <button
            onClick={actions.executeStep}
            disabled={gameStatus !== 'playing'}
            className="control-btn primary"
          >
            Take Step
          </button>
          <button
            onClick={actions.toggleAutoMode}
            disabled={gameStatus !== 'playing'}
            className={`control-btn ${isAutoMode ? 'active' : ''}`}
          >
            {isAutoMode ? 'Pause Auto' : 'Start Auto'}
          </button>
        </div>
      </div>

      <div className="control-section">
        <h3>Game Actions</h3>
        <div className="button-group">
          <button
            onClick={actions.resetGame}
            className="control-btn"
          >
            Reset Game
          </button>
          <button
            onClick={actions.saveRun}
            disabled={gameStatus === 'playing'}
            className="control-btn"
          >
            Save Run
          </button>
        </div>
      </div>

      {gameStatus !== 'playing' && (
        <div className={`status-message ${gameStatus}`}>
          {gameStatus === 'converged' ? '✓ Converged!' : '✗ Diverged'}
        </div>
      )}

      <div className="keyboard-hints">
        <h4>Keyboard Shortcuts</h4>
        <p><kbd>Space</kbd> - Take Step</p>
        <p><kbd>P</kbd> - Play/Pause Auto</p>
        <p><kbd>R</kbd> - Reset Game</p>
      </div>
    </div>
  );
};

export default ControlPanel;

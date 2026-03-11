import React, { useState } from 'react';
import { GameProvider, useGame } from './context/GameContext';
import { useGameLoop } from './hooks/useGameLoop';
import { useKeyboardControls } from './hooks/useKeyboardControls';
import GameCanvas from './components/GameCanvas';
import Tutorial from './components/Tutorial';
import { SURFACE_TYPES } from './utils/hillSurfaces';
import { computeGradient, getMagnitude } from './utils/gradientCalculator';
import { calculateDistance } from './utils/stepEngine';
import './App.css';

function GameContent() {
  const { state, actions } = useGame();
  const { isAutoMode, autoStepRate, gameStatus, learningRate, hillSurface, playerPosition, iterationCount, stepHistory } = state;
  const [showTutorial, setShowTutorial] = useState(true);
  const [showHint, setShowHint] = useState(true);

  // Auto mode animation loop
  useGameLoop(isAutoMode && gameStatus === 'playing', autoStepRate, actions.executeStep);

  // Keyboard controls
  useKeyboardControls(actions, gameStatus);

  // Calculate metrics
  const elevation = hillSurface.equation(playerPosition.x, playerPosition.y);
  const gradient = computeGradient(playerPosition, hillSurface);
  const gradientMagnitude = getMagnitude(gradient);
  const distanceToGoal = calculateDistance(playerPosition, hillSurface.globalMinimum);

  const handleLearningRateChange = (e) => {
    actions.setLearningRate(parseFloat(e.target.value));
  };

  const handleSurfaceChange = (e) => {
    actions.changeSurface(e.target.value);
  };

  const handlePresetLearningRate = (rate) => {
    actions.setLearningRate(rate);
  };

  // Get simple instructions based on game state
  const getInstruction = () => {
    if (gameStatus === 'converged') {
      return "You reached the goal! Click 'Start Over' to try again.";
    }
    if (gameStatus === 'diverged') {
      return "Oops! Try a smaller step size. Click 'Start Over' to try again.";
    }
    if (iterationCount === 0) {
      return "Click 'Take Step' to start moving down the hill!";
    }
    if (iterationCount < 3) {
      return "Good! Keep clicking 'Take Step' or try 'Auto Play'";
    }
    if (distanceToGoal < 2) {
      return "Almost there! You're very close to the goal!";
    }
    return "Follow the yellow arrow to go downhill";
  };

  return (
    <div className="App">
      {showTutorial && <Tutorial onClose={() => setShowTutorial(false)} />}
      
      <div className="app-container">
        {/* Header */}
        <header className="header">
          <div className="header-content">
            <h1>Hill Climbing Game</h1>
            <p>Find the lowest point on the hill!</p>
          </div>
          <button className="help-button" onClick={() => setShowTutorial(true)}>
            Help
          </button>
        </header>

        {/* Instruction Banner */}
        {showHint && (
          <div className="instruction-banner">
            <div className="instruction-content">
              <span className="instruction-text">{getInstruction()}</span>
              <button className="close-hint" onClick={() => setShowHint(false)}>×</button>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="main-content">
          {/* Left Panel - Game Canvas */}
          <div className="canvas-section">
            <div className="game-explanation">
              <h3>The Game Board</h3>
              <p>Blue circle = You | Green target = Goal | Yellow arrow = Which way to go</p>
            </div>
            
            <GameCanvas width={700} height={500} />
            
            {/* Status Badge */}
            {gameStatus !== 'playing' && (
              <div className={`status-badge ${gameStatus}`}>
                {gameStatus === 'converged' ? '✓ Success!' : '✗ Try Again'}
              </div>
            )}

            {/* Simple Stats Below Canvas */}
            <div className="simple-stats">
              <div className="stat-box">
                <div className="stat-number">{iterationCount}</div>
                <div className="stat-label">Steps Taken</div>
              </div>
              <div className="stat-box">
                <div className="stat-number">{distanceToGoal.toFixed(1)}</div>
                <div className="stat-label">Distance to Goal</div>
              </div>
              <div className="stat-box">
                <div className="stat-number">{gradientMagnitude.toFixed(1)}</div>
                <div className="stat-label">Slope Steepness</div>
              </div>
            </div>
          </div>

          {/* Right Panel - Simple Controls */}
          <div className="control-section">
            {/* Main Action Card */}
            <div className="card action-card">
              <h2>What to Do?</h2>
              
              <div className="big-buttons">
                <button
                  onClick={actions.executeStep}
                  disabled={gameStatus !== 'playing'}
                  className="btn btn-huge btn-primary"
                >
                  Take Step ➡️
                </button>
                <button
                  onClick={actions.toggleAutoMode}
                  disabled={gameStatus !== 'playing'}
                  className={`btn btn-huge ${isAutoMode ? 'btn-warning' : 'btn-secondary'}`}
                >
                  {isAutoMode ? '⏸ Pause' : '▶ Auto Play'}
                </button>
                <button onClick={actions.resetGame} className="btn btn-huge btn-outline">
                  🔄 Start Over
                </button>
              </div>
            </div>

            {/* Settings Card */}
            <div className="card settings-card">
              <h2>Settings</h2>
              
              {/* Step Size */}
              <div className="setting-group">
                <label>
                  <strong>Step Size:</strong> {learningRate.toFixed(2)}
                  <span className="help-text">How far you move each step</span>
                </label>
                <input
                  type="range"
                  min="0.01"
                  max="2.0"
                  step="0.01"
                  value={learningRate}
                  onChange={handleLearningRateChange}
                  className="slider"
                />
                <div className="quick-picks">
                  <button onClick={() => handlePresetLearningRate(0.1)} className="quick-btn">
                    Small (0.1)
                  </button>
                  <button onClick={() => handlePresetLearningRate(0.5)} className="quick-btn">
                    Medium (0.5)
                  </button>
                  <button onClick={() => handlePresetLearningRate(1.0)} className="quick-btn">
                    Large (1.0)
                  </button>
                </div>
              </div>

              {/* Hill Type */}
              <div className="setting-group">
                <label>
                  <strong>Hill Type:</strong>
                  <span className="help-text">Choose difficulty</span>
                </label>
                <select value={hillSurface.type} onChange={handleSurfaceChange} className="select-input">
                  <option value={SURFACE_TYPES.BOWL}>Easy - Simple Bowl</option>
                  <option value={SURFACE_TYPES.VALLEY}>Medium - Valley</option>
                  <option value={SURFACE_TYPES.MULTIMODAL}>Hard - Multiple Hills</option>
                </select>
              </div>
            </div>

            {/* How It Works Card */}
            <div className="card info-card">
              <h3>How It Works</h3>
              <div className="info-list">
                <div className="info-item">
                  <span className="info-icon">1️⃣</span>
                  <span>You start somewhere on the hill</span>
                </div>
                <div className="info-item">
                  <span className="info-icon">2️⃣</span>
                  <span>Yellow arrow shows which way is down</span>
                </div>
                <div className="info-item">
                  <span className="info-icon">3️⃣</span>
                  <span>Each step moves you in that direction</span>
                </div>
                <div className="info-item">
                  <span className="info-icon">4️⃣</span>
                  <span>Goal: Reach the green target at the bottom!</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <GameProvider>
      <GameContent />
    </GameProvider>
  );
}

export default App;

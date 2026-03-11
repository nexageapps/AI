import React from 'react';
import { GameProvider, useGame } from './context/GameContext';
import { useGameLoop } from './hooks/useGameLoop';
import { useKeyboardControls } from './hooks/useKeyboardControls';
import GameCanvas from './components/GameCanvas';
import ControlPanel from './components/ControlPanel';
import MetricsDisplay from './components/MetricsDisplay';
import './App.css';

function GameContent() {
  const { state, actions } = useGame();
  const { isAutoMode, autoStepRate, gameStatus } = state;

  // Auto mode animation loop
  useGameLoop(isAutoMode && gameStatus === 'playing', autoStepRate, actions.executeStep);

  // Keyboard controls
  useKeyboardControls(actions, gameStatus);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Blindfold Hill Game</h1>
        <p>Learn Gradient Descent Through Interactive Gameplay</p>
      </header>
      <div className="App-content">
        <div className="game-area">
          <GameCanvas width={800} height={600} />
        </div>
        <div className="sidebar">
          <MetricsDisplay />
          <ControlPanel />
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

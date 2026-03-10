import React, { useState, useEffect } from 'react';
import WumpusGrid from './components/WumpusGrid';
import Controls from './components/Controls';
import './App.css';

function App() {
  // World state (hidden from agent)
  const [worldState] = useState({
    1: { row: 1, col: 1, items: [] },
    2: { row: 1, col: 2, items: ['breeze'] },
    3: { row: 1, col: 3, items: ['pit'] },
    4: { row: 1, col: 4, items: ['breeze'] },
    5: { row: 2, col: 1, items: ['stench'] },
    6: { row: 2, col: 2, items: [] },
    7: { row: 2, col: 3, items: ['breeze'] },
    8: { row: 2, col: 4, items: [] },
    9: { row: 3, col: 1, items: ['wumpus'] },
    10: { row: 3, col: 2, items: ['stench', 'breeze', 'gold'] },
    11: { row: 3, col: 3, items: ['pit'] },
    12: { row: 3, col: 4, items: ['breeze'] },
    13: { row: 4, col: 1, items: ['stench'] },
    14: { row: 4, col: 2, items: [] },
    15: { row: 4, col: 3, items: ['breeze'] },
    16: { row: 4, col: 4, items: ['pit'] }
  });

  const [agentPos, setAgentPos] = useState({ row: 1, col: 1 });
  const [agentDir, setAgentDir] = useState('right'); // right, up, left, down
  const [visitedCells, setVisitedCells] = useState(new Set(['1-1']));
  const [hasGold, setHasGold] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState('');
  const [score, setScore] = useState(0);

  useEffect(() => {
    checkCurrentCell();
  }, [agentPos]);

  const checkCurrentCell = () => {
    const cellKey = Object.keys(worldState).find(
      key => worldState[key].row === agentPos.row && worldState[key].col === agentPos.col
    );
    const cell = worldState[cellKey];
    
    if (cell.items.includes('pit')) {
      setGameOver(true);
      setMessage('💀 You fell into a pit! Game Over!');
      setScore(prev => prev - 1000);
    } else if (cell.items.includes('wumpus')) {
      setGameOver(true);
      setMessage('💀 The Wumpus got you! Game Over!');
      setScore(prev => prev - 1000);
    } else if (cell.items.includes('gold') && !hasGold) {
      setHasGold(true);
      setMessage('🏆 You found the gold! Now get back to (1,1)!');
      setScore(prev => prev + 1000);
    } else if (agentPos.row === 1 && agentPos.col === 1 && hasGold) {
      setGameOver(true);
      setMessage('🎉 Victory! You escaped with the gold!');
      setScore(prev => prev + 500);
    }
  };

  const moveForward = () => {
    if (gameOver) return;
    
    let newRow = agentPos.row;
    let newCol = agentPos.col;

    switch (agentDir) {
      case 'right':
        newCol += 1;
        break;
      case 'up':
        newRow += 1;
        break;
      case 'left':
        newCol -= 1;
        break;
      case 'down':
        newRow -= 1;
        break;
      default:
        break;
    }

    if (newRow >= 1 && newRow <= 4 && newCol >= 1 && newCol <= 4) {
      setAgentPos({ row: newRow, col: newCol });
      setVisitedCells(prev => new Set([...prev, `${newRow}-${newCol}`]));
      setScore(prev => prev - 1);
    } else {
      setMessage('⚠️ Cannot move outside the grid!');
    }
  };

  const turnLeft = () => {
    if (gameOver) return;
    const dirs = ['right', 'up', 'left', 'down'];
    const currentIndex = dirs.indexOf(agentDir);
    setAgentDir(dirs[(currentIndex + 1) % 4]);
    setScore(prev => prev - 1);
  };

  const turnRight = () => {
    if (gameOver) return;
    const dirs = ['right', 'up', 'left', 'down'];
    const currentIndex = dirs.indexOf(agentDir);
    setAgentDir(dirs[(currentIndex + 3) % 4]);
    setScore(prev => prev - 1);
  };

  const grab = () => {
    if (gameOver) return;
    const cellKey = Object.keys(worldState).find(
      key => worldState[key].row === agentPos.row && worldState[key].col === agentPos.col
    );
    const cell = worldState[cellKey];
    
    if (cell.items.includes('gold') && !hasGold) {
      setHasGold(true);
      setMessage('🏆 Grabbed the gold!');
      setScore(prev => prev + 1000);
    } else {
      setMessage('Nothing to grab here.');
    }
  };

  const reset = () => {
    setAgentPos({ row: 1, col: 1 });
    setAgentDir('right');
    setVisitedCells(new Set(['1-1']));
    setHasGold(false);
    setGameOver(false);
    setMessage('');
    setScore(0);
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Wumpus World</h1>
        <p className="subtitle">COMPSCI 713 - Week 2: Symbolic Logic</p>
        
        <div className="game-info">
          <div className="info-item">Score: {score}</div>
          <div className="info-item">Position: ({agentPos.col}, {agentPos.row})</div>
          <div className="info-item">Direction: {agentDir}</div>
          <div className="info-item">Gold: {hasGold ? '✓' : '✗'}</div>
        </div>

        {message && <div className={`message ${gameOver ? 'game-over' : ''}`}>{message}</div>}

        <WumpusGrid 
          worldState={worldState}
          agentPos={agentPos}
          agentDir={agentDir}
          visitedCells={visitedCells}
          hasGold={hasGold}
        />

        <Controls
          onMoveForward={moveForward}
          onTurnLeft={turnLeft}
          onTurnRight={turnRight}
          onGrab={grab}
          onReset={reset}
          disabled={gameOver}
        />

        <div className="legend">
          <h3>Legend</h3>
          <div className="legend-items">
            <div className="legend-item">
              <span className="legend-icon">👤</span>
              <span>Agent</span>
            </div>
            <div className="legend-item">
              <span className="legend-icon">👹</span>
              <span>Wumpus</span>
            </div>
            <div className="legend-item">
              <span className="legend-icon">💨</span>
              <span>Stench</span>
            </div>
            <div className="legend-item">
              <span className="legend-icon">🕳️</span>
              <span>Pit</span>
            </div>
            <div className="legend-item">
              <span className="legend-icon">🌬️</span>
              <span>Breeze</span>
            </div>
            <div className="legend-item">
              <span className="legend-icon">🏆</span>
              <span>Gold</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

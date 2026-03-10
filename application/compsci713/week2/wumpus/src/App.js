import React, { useState, useEffect } from 'react';
import WumpusGrid from './components/WumpusGrid';
import Sidebar from './components/Sidebar';
import GameOverlay from './components/GameOverlay';
import './App.css';

function App() {
  const generateWorld = (numPits = 3) => {
    const world = {};
    for (let row = 1; row <= 4; row++) {
      for (let col = 1; col <= 4; col++) {
        const key = (row - 1) * 4 + col;
        world[key] = { row, col, items: [] };
      }
    }

    // Place Wumpus randomly (not at start)
    const wumpusPos = Math.floor(Math.random() * 15) + 2;
    const wumpusCell = world[wumpusPos];
    wumpusCell.items.push('wumpus');

    // Add stench around Wumpus
    addPerception(world, wumpusCell.row, wumpusCell.col, 'stench');

    // Place Gold randomly (not at start, not on Wumpus)
    let goldPos;
    do {
      goldPos = Math.floor(Math.random() * 15) + 2;
    } while (goldPos === wumpusPos);
    world[goldPos].items.push('gold');

    // Place Pits randomly
    const pits = new Set();
    while (pits.size < numPits) {
      const pitPos = Math.floor(Math.random() * 15) + 2;
      if (pitPos !== wumpusPos && pitPos !== goldPos) {
        pits.add(pitPos);
      }
    }

    pits.forEach(pitPos => {
      const pitCell = world[pitPos];
      pitCell.items.push('pit');
      addPerception(world, pitCell.row, pitCell.col, 'breeze');
    });

    return world;
  };

  const addPerception = (world, row, col, perception) => {
    const adjacent = [
      { r: row - 1, c: col },
      { r: row + 1, c: col },
      { r: row, c: col - 1 },
      { r: row, c: col + 1 }
    ];

    adjacent.forEach(({ r, c }) => {
      if (r >= 1 && r <= 4 && c >= 1 && c <= 4) {
        const key = Object.keys(world).find(
          k => world[k].row === r && world[k].col === c
        );
        if (key && !world[key].items.includes(perception)) {
          world[key].items.push(perception);
        }
      }
    });
  };

  const [numPits, setNumPits] = useState(3);
  const [worldState, setWorldState] = useState(() => generateWorld(3));
  const [agentPos, setAgentPos] = useState({ row: 1, col: 1 });
  const [agentDir, setAgentDir] = useState('right');
  const [visitedCells, setVisitedCells] = useState(new Set(['1-1']));
  const [hasGold, setHasGold] = useState(false);
  const [gameStatus, setGameStatus] = useState('playing'); // playing, victory, dead
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Shift') {
        setShowAll(true);
      }
      if (gameStatus !== 'playing') {
        if (e.key === ' ') {
          e.preventDefault();
          reset();
        }
        return;
      }

      switch (e.key.toLowerCase()) {
        case 'w':
        case 'arrowup':
          e.preventDefault();
          moveForward();
          break;
        case 'a':
        case 'arrowleft':
          e.preventDefault();
          turnLeft();
          break;
        case 'd':
        case 'arrowright':
          e.preventDefault();
          turnRight();
          break;
        case 'g':
        case ' ':
          e.preventDefault();
          grab();
          break;
        case 'r':
          e.preventDefault();
          reset();
          break;
        default:
          break;
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === 'Shift') {
        setShowAll(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameStatus, agentPos, agentDir, hasGold]);

  useEffect(() => {
    checkCurrentCell();
  }, [agentPos]);

  const checkCurrentCell = () => {
    const cellKey = Object.keys(worldState).find(
      key => worldState[key].row === agentPos.row && worldState[key].col === agentPos.col
    );
    const cell = worldState[cellKey];

    if (cell.items.includes('pit')) {
      setGameStatus('dead');
      setScore(prev => prev - 1000);
    } else if (cell.items.includes('wumpus')) {
      setGameStatus('dead');
      setScore(prev => prev - 1000);
    } else if (agentPos.row === 1 && agentPos.col === 1 && hasGold) {
      setGameStatus('victory');
      setScore(prev => prev + 1000);
    }
  };

  const moveForward = () => {
    if (gameStatus !== 'playing') return;

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
      setMoves(prev => prev + 1);
    }
  };

  const turnLeft = () => {
    if (gameStatus !== 'playing') return;
    const dirs = ['right', 'up', 'left', 'down'];
    const currentIndex = dirs.indexOf(agentDir);
    setAgentDir(dirs[(currentIndex + 1) % 4]);
    setScore(prev => prev - 1);
    setMoves(prev => prev + 1);
  };

  const turnRight = () => {
    if (gameStatus !== 'playing') return;
    const dirs = ['right', 'up', 'left', 'down'];
    const currentIndex = dirs.indexOf(agentDir);
    setAgentDir(dirs[(currentIndex + 3) % 4]);
    setScore(prev => prev - 1);
    setMoves(prev => prev + 1);
  };

  const grab = () => {
    if (gameStatus !== 'playing') return;
    const cellKey = Object.keys(worldState).find(
      key => worldState[key].row === agentPos.row && worldState[key].col === agentPos.col
    );
    const cell = worldState[cellKey];

    if (cell.items.includes('gold') && !hasGold) {
      setHasGold(true);
      setScore(prev => prev + 1000);
    }
  };

  const reset = () => {
    const newWorld = generateWorld(numPits);
    setWorldState(newWorld);
    setAgentPos({ row: 1, col: 1 });
    setAgentDir('right');
    setVisitedCells(new Set(['1-1']));
    setHasGold(false);
    setGameStatus('playing');
    setScore(0);
    setMoves(0);
  };

  const handlePitChange = (newPits) => {
    setNumPits(newPits);
    const newWorld = generateWorld(newPits);
    setWorldState(newWorld);
    setAgentPos({ row: 1, col: 1 });
    setAgentDir('right');
    setVisitedCells(new Set(['1-1']));
    setHasGold(false);
    setGameStatus('playing');
    setScore(0);
    setMoves(0);
  };

  const getCurrentPerceptions = () => {
    const cellKey = Object.keys(worldState).find(
      key => worldState[key].row === agentPos.row && worldState[key].col === agentPos.col
    );
    return worldState[cellKey]?.items || [];
  };

  return (
    <div className="App">
      <div className="game-container">
        <div className="game-area">
          <h1 className="game-title">Wumpus World</h1>
          <p className="game-subtitle">COMPSCI 713 - Symbolic Logic</p>
          
          <WumpusGrid
            worldState={worldState}
            agentPos={agentPos}
            agentDir={agentDir}
            visitedCells={visitedCells}
            hasGold={hasGold}
            showAll={showAll}
          />

          {gameStatus !== 'playing' && (
            <GameOverlay status={gameStatus} score={score} moves={moves} onRestart={reset} />
          )}
        </div>

        <Sidebar
          score={score}
          moves={moves}
          position={agentPos}
          direction={agentDir}
          hasGold={hasGold}
          perceptions={getCurrentPerceptions()}
          numPits={numPits}
          onPitChange={handlePitChange}
          onMoveForward={moveForward}
          onTurnLeft={turnLeft}
          onTurnRight={turnRight}
          onGrab={grab}
          onReset={reset}
          disabled={gameStatus !== 'playing'}
        />
      </div>
    </div>
  );
}

export default App;

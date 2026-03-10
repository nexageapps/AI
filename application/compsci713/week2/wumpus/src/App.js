import { useState, useEffect, useCallback } from 'react';
import WumpusGrid from './components/WumpusGrid';
import Sidebar from './components/Sidebar';
import GameOverlay from './components/GameOverlay';
import './App.css';

function App() {
  /**
   * WORLD GENERATION LOGIC
   * ======================
   * Generates a 4x4 Wumpus World grid with the following rules:
   * 1. Agent starts at (1,1) - this cell must be SAFE (no hazards, no perceptions)
   * 2. Cells adjacent to (1,1) must also be SAFE (no Wumpus, no pits)
   * 3. One Wumpus is placed randomly (not at start, not adjacent to start)
   * 4. One or more Gold pieces are placed randomly
   * 5. Pits are placed randomly (not at start, not adjacent to start)
   * 6. Perceptions (stench/breeze) are added to cells adjacent to hazards
   */
  const generateWorld = (numPits = 3) => {
    // Initialize empty 4x4 grid
    const world = {};
    for (let row = 1; row <= 4; row++) {
      for (let col = 1; col <= 4; col++) {
        const key = (row - 1) * 4 + col;
        world[key] = { row, col, items: [] };
      }
    }

    // Define safe zone: starting position (1,1) and its adjacent cells
    // These cells must remain hazard-free for logical gameplay
    const safePositions = new Set([
      1,  // (1,1) - starting position
      2,  // (2,1) - right of start
      5   // (1,2) - above start
    ]);

    // PLACE WUMPUS
    // The Wumpus must not be in the safe zone
    let wumpusPos;
    do {
      wumpusPos = Math.floor(Math.random() * 15) + 2; // positions 2-16
    } while (safePositions.has(wumpusPos));
    
    const wumpusCell = world[wumpusPos];
    wumpusCell.items.push('wumpus');
    
    // Add stench perception to all cells adjacent to Wumpus
    addPerception(world, wumpusCell.row, wumpusCell.col, 'stench');

    // PLACE GOLD
    // Gold can be anywhere except on the Wumpus
    let goldPos;
    do {
      goldPos = Math.floor(Math.random() * 15) + 2;
    } while (goldPos === wumpusPos);
    world[goldPos].items.push('gold');

    // PLACE PITS
    // Pits must not be in safe zone, on Wumpus, or on Gold
    const pits = new Set();
    while (pits.size < numPits) {
      const pitPos = Math.floor(Math.random() * 15) + 2;
      if (!safePositions.has(pitPos) && pitPos !== wumpusPos && pitPos !== goldPos) {
        pits.add(pitPos);
      }
    }

    // Add pits to world and create breeze perceptions
    pits.forEach(pitPos => {
      const pitCell = world[pitPos];
      pitCell.items.push('pit');
      // Add breeze to all cells adjacent to this pit
      addPerception(world, pitCell.row, pitCell.col, 'breeze');
    });

    return world;
  };

  /**
   * PERCEPTION LOGIC
   * ================
   * Adds a perception (stench or breeze) to all cells adjacent to a hazard.
   * Adjacent means: up, down, left, right (not diagonal)
   * 
   * @param {Object} world - The world grid
   * @param {number} row - Row of the hazard
   * @param {number} col - Column of the hazard
   * @param {string} perception - Type of perception ('stench' or 'breeze')
   */
  const addPerception = (world, row, col, perception) => {
    // Define all 4 adjacent cells (up, down, left, right)
    const adjacent = [
      { r: row - 1, c: col },  // below
      { r: row + 1, c: col },  // above
      { r: row, c: col - 1 },  // left
      { r: row, c: col + 1 }   // right
    ];

    // Add perception to each valid adjacent cell
    adjacent.forEach(({ r, c }) => {
      // Check if cell is within grid boundaries
      if (r >= 1 && r <= 4 && c >= 1 && c <= 4) {
        const key = Object.keys(world).find(
          k => world[k].row === r && world[k].col === c
        );
        // Add perception if not already present
        if (key && !world[key].items.includes(perception)) {
          world[key].items.push(perception);
        }
      }
    });
  };

  // ==================
  // GAME STATE
  // ==================
  const [numPits, setNumPits] = useState(3);              // Number of pits in the world
  const [worldState, setWorldState] = useState(() => generateWorld(3)); // The 4x4 grid
  const [agentPos, setAgentPos] = useState({ row: 1, col: 1 }); // Agent position
  const [agentDir, setAgentDir] = useState('right');      // Agent direction: right, up, left, down
  const [visitedCells, setVisitedCells] = useState(new Set(['1-1'])); // Cells agent has visited
  const [hasGold, setHasGold] = useState(false);          // Whether agent has picked up gold
  const [gameStatus, setGameStatus] = useState('playing'); // playing, victory, dead
  const [score, setScore] = useState(0);                  // Current score
  const [moves, setMoves] = useState(0);                  // Number of moves made
  const [showAll, setShowAll] = useState(false);          // Debug mode: show all cells (Shift key)

  /**
   * KEYBOARD CONTROLS
   * =================
   * Handles all keyboard input for the game
   * - W: Move forward in current direction
   * - A/D: Turn left/right (rotate 90°)
   * - Arrow Keys: Move in that direction (changes facing + moves)
   * - G/Space: Grab gold at current position
   * - R: Reset game
   * - Shift: Hold to reveal entire world (debug mode)
   */
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Debug mode: hold Shift to reveal all cells
      if (e.key === 'Shift') {
        setShowAll(true);
      }
      
      // If game is over, only allow restart with Space
      if (gameStatus !== 'playing') {
        if (e.key === ' ') {
          e.preventDefault();
          reset();
        }
        return;
      }

      // Handle game controls
      switch (e.key) {
        case 'w':
        case 'W':
          e.preventDefault();
          moveForward();
          break;
        case 'a':
        case 'A':
          e.preventDefault();
          turnLeft();
          break;
        case 'd':
        case 'D':
          e.preventDefault();
          turnRight();
          break;
        case 'ArrowUp':
          e.preventDefault();
          moveInDirection('up');
          break;
        case 'ArrowDown':
          e.preventDefault();
          moveInDirection('down');
          break;
        case 'ArrowLeft':
          e.preventDefault();
          moveInDirection('left');
          break;
        case 'ArrowRight':
          e.preventDefault();
          moveInDirection('right');
          break;
        case 'g':
        case 'G':
        case ' ':
          e.preventDefault();
          grab();
          break;
        case 'r':
        case 'R':
          e.preventDefault();
          reset();
          break;
        default:
          break;
      }
    };

    const handleKeyUp = (e) => {
      // Release Shift to hide world again
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

  /**
   * CHECK CURRENT CELL
   * ==================
   * Automatically checks the cell when agent moves to determine:
   * 1. Death conditions (pit or Wumpus)
   * 2. Victory condition (back at start with gold)
   */
  const checkCurrentCell = useCallback(() => {
    // Find the cell data for agent's current position
    const cellKey = Object.keys(worldState).find(
      key => worldState[key].row === agentPos.row && worldState[key].col === agentPos.col
    );
    const cell = worldState[cellKey];

    // Check for death conditions
    if (cell.items.includes('pit')) {
      setGameStatus('dead');
      setScore(prev => prev - 1000); // Heavy penalty for death
    } else if (cell.items.includes('wumpus')) {
      setGameStatus('dead');
      setScore(prev => prev - 1000); // Heavy penalty for death
    } 
    // Check for victory condition: back at start (1,1) with gold
    else if (agentPos.row === 1 && agentPos.col === 1 && hasGold) {
      setGameStatus('victory');
      setScore(prev => prev + 1000); // Bonus for winning
    }
  }, [worldState, agentPos, hasGold]);

  useEffect(() => {
    checkCurrentCell();
  }, [agentPos, checkCurrentCell]);

  /**
   * AGENT ACTIONS
   * =============
   * All actions the agent can perform in the world
   */

  /**
   * Move in Direction
   * Sets agent direction and moves forward in one action
   */
  const moveInDirection = (direction) => {
    if (gameStatus !== 'playing') return;
    
    setAgentDir(direction);
    
    let newRow = agentPos.row;
    let newCol = agentPos.col;

    // Calculate new position based on direction
    switch (direction) {
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

    // Only move if new position is within grid boundaries (1-4)
    if (newRow >= 1 && newRow <= 4 && newCol >= 1 && newCol <= 4) {
      setAgentPos({ row: newRow, col: newCol });
      setVisitedCells(prev => new Set([...prev, `${newRow}-${newCol}`]));
      setScore(prev => prev - 1);
      setMoves(prev => prev + 1);
    }
  };

  /**
   * Move Forward
   * Moves agent one cell in the direction it's currently facing
   * - Costs 1 point per move
   * - Cannot move outside grid boundaries
   */
  const moveForward = useCallback(() => {
    if (gameStatus !== 'playing') return;

    let newRow = agentPos.row;
    let newCol = agentPos.col;

    // Calculate new position based on current direction
    switch (agentDir) {
      case 'right':
        newCol += 1;  // Move right (increase column)
        break;
      case 'up':
        newRow += 1;  // Move up (increase row)
        break;
      case 'left':
        newCol -= 1;  // Move left (decrease column)
        break;
      case 'down':
        newRow -= 1;  // Move down (decrease row)
        break;
      default:
        break;
    }

    // Only move if new position is within grid boundaries (1-4)
    if (newRow >= 1 && newRow <= 4 && newCol >= 1 && newCol <= 4) {
      setAgentPos({ row: newRow, col: newCol });
      setVisitedCells(prev => new Set([...prev, `${newRow}-${newCol}`]));
      setScore(prev => prev - 1);  // Each move costs 1 point
      setMoves(prev => prev + 1);
    }
  };

  /**
   * Turn Left
   * Rotates agent 90 degrees counter-clockwise
   * Direction cycle: right → up → left → down → right
   * Costs 1 point per turn
   */
  const turnLeft = () => {
    if (gameStatus !== 'playing') return;
    const dirs = ['right', 'up', 'left', 'down'];
    const currentIndex = dirs.indexOf(agentDir);
    setAgentDir(dirs[(currentIndex + 1) % 4]);  // Rotate counter-clockwise
    setScore(prev => prev - 1);
    setMoves(prev => prev + 1);
  };

  /**
   * Turn Right
   * Rotates agent 90 degrees clockwise
   * Direction cycle: right → down → left → up → right
   * Costs 1 point per turn
   */
  const turnRight = () => {
    if (gameStatus !== 'playing') return;
    const dirs = ['right', 'up', 'left', 'down'];
    const currentIndex = dirs.indexOf(agentDir);
    setAgentDir(dirs[(currentIndex + 3) % 4]);  // Rotate clockwise (same as -1 mod 4)
    setScore(prev => prev - 1);
    setMoves(prev => prev + 1);
  };

  /**
   * Grab Gold
   * Picks up gold at current position if present
   * - Rewards 1000 points
   * - Agent can only carry one gold at a time
   */
  const grab = () => {
    if (gameStatus !== 'playing') return;
    
    // Find current cell
    const cellKey = Object.keys(worldState).find(
      key => worldState[key].row === agentPos.row && worldState[key].col === agentPos.col
    );
    const cell = worldState[cellKey];

    // Pick up gold if present and not already carrying gold
    if (cell.items.includes('gold') && !hasGold) {
      setHasGold(true);
      setScore(prev => prev + 1000);  // Big reward for finding gold
    }
  };

  /**
   * Reset Game
   * Generates a new world and resets all game state
   */
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

  /**
   * Handle Pit Count Change
   * Regenerates world with new number of pits
   */
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

  /**
   * Get Current Perceptions
   * Returns what the agent can sense at current position
   * (stench, breeze, or gold presence)
   */
  const getCurrentPerceptions = () => {
    const cellKey = Object.keys(worldState).find(
      key => worldState[key].row === agentPos.row && worldState[key].col === agentPos.col
    );
    return worldState[cellKey]?.items || [];
  };

  /**
   * Get Total Gold Count
   * Counts how many gold pieces exist in the world
   * Used for the hint system
   */
  const getTotalGoldCount = () => {
    let count = 0;
    Object.values(worldState).forEach(cell => {
      if (cell.items.includes('gold')) {
        count++;
      }
    });
    return count;
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

          {/* Controls and How to Play below grid */}
          <div className="bottom-controls">
            <div className="controls-section">
              <h3>Controls</h3>
              <div className="control-pad">
                <div className="direction-pad">
                  <button 
                    onClick={() => moveInDirection('up')} 
                    disabled={gameStatus !== 'playing'} 
                    className="btn btn-direction btn-up"
                    title="Move Up (↑)"
                  >
                    ↑
                  </button>
                  <div className="direction-middle">
                    <button 
                      onClick={() => moveInDirection('left')} 
                      disabled={gameStatus !== 'playing'} 
                      className="btn btn-direction btn-left"
                      title="Move Left (←)"
                    >
                      ←
                    </button>
                    <div className="center-indicator">
                      <span className="agent-indicator">{
                        agentDir === 'up' ? '↑' :
                        agentDir === 'down' ? '↓' :
                        agentDir === 'left' ? '←' : '→'
                      }</span>
                    </div>
                    <button 
                      onClick={() => moveInDirection('right')} 
                      disabled={gameStatus !== 'playing'} 
                      className="btn btn-direction btn-right"
                      title="Move Right (→)"
                    >
                      →
                    </button>
                  </div>
                  <button 
                    onClick={() => moveInDirection('down')} 
                    disabled={gameStatus !== 'playing'} 
                    className="btn btn-direction btn-down"
                    title="Move Down (↓)"
                  >
                    ↓
                  </button>
                </div>
                <div className="action-buttons-grid">
                  <button onClick={grab} disabled={gameStatus !== 'playing'} className="btn btn-grab">
                    🤲 Grab
                  </button>
                  <button onClick={reset} className="btn btn-reset">
                    🔄 Reset
                  </button>
                </div>
              </div>
            </div>

            <div className="legend-section">
              <h3>Legend</h3>
              <div className="legend-grid">
                <div className="legend-item"><span className="legend-icon">👤</span> Agent</div>
                <div className="legend-item"><span className="legend-icon">👹</span> Wumpus</div>
                <div className="legend-item"><span className="legend-icon">🕳️</span> Pit</div>
                <div className="legend-item"><span className="legend-icon">🏆</span> Gold</div>
                <div className="legend-item"><span className="legend-icon">💨</span> Stench</div>
                <div className="legend-item"><span className="legend-icon">🌬️</span> Breeze</div>
              </div>
              <div className="keyboard-hint">
                <small>💡 Use arrow keys or click buttons</small>
              </div>
            </div>
          </div>
        </div>

        <Sidebar
          score={score}
          moves={moves}
          position={agentPos}
          direction={agentDir}
          hasGold={hasGold}
          perceptions={getCurrentPerceptions()}
          numPits={numPits}
          totalGold={getTotalGoldCount()}
          onPitChange={handlePitChange}
        />
      </div>
    </div>
  );
}

export default App;

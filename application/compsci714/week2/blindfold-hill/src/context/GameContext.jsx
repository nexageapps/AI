import React, { createContext, useContext, useReducer } from 'react';
import { createHillSurface, SURFACE_TYPES } from '../utils/hillSurfaces';
import { computeGradient, getMagnitude, clearCache } from '../utils/gradientCalculator';
import { 
  executeStep as executeStepUtil, 
  checkConvergence, 
  detectDivergence,
  detectBoundaryCollision,
  validateLearningRate,
  calculateDistance
} from '../utils/stepEngine';

const GameContext = createContext();

// Initialize with bowl surface
const initialSurface = createHillSurface(SURFACE_TYPES.BOWL);

// Random starting position within bounds
function getRandomStartPosition(surface) {
  const { bounds } = surface;
  const x = bounds.xMin + Math.random() * (bounds.xMax - bounds.xMin);
  const y = bounds.yMin + Math.random() * (bounds.yMax - bounds.yMin);
  return { x, y };
}

const initialState = {
  hillSurface: initialSurface,
  playerPosition: getRandomStartPosition(initialSurface),
  startPosition: null, // Will be set on first render
  learningRate: 0.1,
  stepHistory: [],
  iterationCount: 0,
  gameStatus: 'playing', // 'playing' | 'converged' | 'diverged'
  isAutoMode: false,
  autoStepRate: 1.0,
  runs: [], // Array of completed run statistics
};

// Set start position after initialization
initialState.startPosition = { ...initialState.playerPosition };

function gameReducer(state, action) {
  switch (action.type) {
    case 'EXECUTE_STEP': {
      if (state.gameStatus !== 'playing') {
        return state;
      }

      const gradient = computeGradient(state.playerPosition, state.hillSurface);
      const newPosition = executeStepUtil(
        state.playerPosition,
        gradient,
        state.learningRate,
        state.hillSurface.bounds
      );

      const elevation = state.hillSurface.equation(newPosition.x, newPosition.y);
      const gradientMagnitude = getMagnitude(gradient);

      const newStepHistory = [
        ...state.stepHistory,
        {
          position: newPosition,
          elevation,
          gradientMagnitude,
          timestamp: Date.now(),
        },
      ];

      const newIterationCount = state.iterationCount + 1;

      // Check convergence
      const converged = checkConvergence(
        newPosition,
        state.hillSurface.globalMinimum,
        0.5
      );

      // Check divergence
      const diverged = !converged && (
        detectDivergence(newStepHistory, 20) ||
        detectBoundaryCollision(newStepHistory, state.hillSurface.bounds, 10)
      );

      let newGameStatus = state.gameStatus;
      if (converged) {
        newGameStatus = 'converged';
      } else if (diverged) {
        newGameStatus = 'diverged';
      }

      return {
        ...state,
        playerPosition: newPosition,
        stepHistory: newStepHistory,
        iterationCount: newIterationCount,
        gameStatus: newGameStatus,
        isAutoMode: newGameStatus === 'playing' ? state.isAutoMode : false,
      };
    }

    case 'SET_LEARNING_RATE': {
      const validatedRate = validateLearningRate(action.payload);
      return { ...state, learningRate: validatedRate };
    }

    case 'TOGGLE_AUTO_MODE':
      return { ...state, isAutoMode: !state.isAutoMode };

    case 'SET_AUTO_STEP_RATE':
      return { ...state, autoStepRate: Math.max(0.5, Math.min(5.0, action.payload)) };

    case 'CHANGE_SURFACE': {
      clearCache();
      const newSurface = createHillSurface(action.payload);
      const newStartPos = getRandomStartPosition(newSurface);
      return {
        ...state,
        hillSurface: newSurface,
        playerPosition: newStartPos,
        startPosition: newStartPos,
        stepHistory: [],
        iterationCount: 0,
        gameStatus: 'playing',
        isAutoMode: false,
      };
    }

    case 'SET_START_POSITION': {
      const { x, y } = action.payload;
      const { bounds } = state.hillSurface;
      
      // Validate position is within bounds
      if (x < bounds.xMin || x > bounds.xMax || y < bounds.yMin || y > bounds.yMax) {
        return state;
      }

      return {
        ...state,
        playerPosition: { x, y },
        startPosition: { x, y },
        stepHistory: [],
        iterationCount: 0,
        gameStatus: 'playing',
        isAutoMode: false,
      };
    }

    case 'RESET_GAME': {
      clearCache();
      const newStartPos = getRandomStartPosition(state.hillSurface);
      return {
        ...state,
        playerPosition: newStartPos,
        startPosition: newStartPos,
        stepHistory: [],
        iterationCount: 0,
        gameStatus: 'playing',
        isAutoMode: false,
      };
    }

    case 'SAVE_RUN': {
      if (state.gameStatus !== 'converged' && state.gameStatus !== 'diverged') {
        return state;
      }

      const finalDistance = calculateDistance(
        state.playerPosition,
        state.hillSurface.globalMinimum
      );

      const runStats = {
        id: `run-${Date.now()}`,
        surfaceType: state.hillSurface.type,
        learningRate: state.learningRate,
        startPosition: state.startPosition,
        iterationCount: state.iterationCount,
        finalDistance,
        convergenceTime: state.stepHistory.length > 0 
          ? state.stepHistory[state.stepHistory.length - 1].timestamp - state.stepHistory[0].timestamp
          : 0,
        path: state.stepHistory.map(step => step.position),
        status: state.gameStatus,
      };

      return {
        ...state,
        runs: [...state.runs, runStats],
      };
    }

    case 'CLEAR_RUNS':
      return { ...state, runs: [] };

    default:
      return state;
  }
}

export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const actions = {
    executeStep: () => dispatch({ type: 'EXECUTE_STEP' }),
    setLearningRate: (rate) => dispatch({ type: 'SET_LEARNING_RATE', payload: rate }),
    toggleAutoMode: () => dispatch({ type: 'TOGGLE_AUTO_MODE' }),
    setAutoStepRate: (rate) => dispatch({ type: 'SET_AUTO_STEP_RATE', payload: rate }),
    changeSurface: (type) => dispatch({ type: 'CHANGE_SURFACE', payload: type }),
    setStartPosition: (position) => dispatch({ type: 'SET_START_POSITION', payload: position }),
    resetGame: () => dispatch({ type: 'RESET_GAME' }),
    saveRun: () => dispatch({ type: 'SAVE_RUN' }),
    clearRuns: () => dispatch({ type: 'CLEAR_RUNS' }),
  };

  return (
    <GameContext.Provider value={{ state, actions }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within GameProvider');
  }
  return context;
};

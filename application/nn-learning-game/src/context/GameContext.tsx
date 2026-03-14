import React, { createContext, useContext, useReducer, useEffect, type Dispatch } from 'react'
import type { GameState, NetworkState, LevelProgress } from '../types'
import { LEVELS } from '../levels'
import {
  forwardPass,
  backpropagate,
  updateWeights,
  buildForwardSteps,
  buildBackpropSteps,
} from '../engine'

// ---------------------------------------------------------------------------
// Initial state
// ---------------------------------------------------------------------------

const INITIAL_NETWORK: NetworkState = {
  inputs:  { x1: 0.05, x2: 0.10 },
  weights: { w1: 0.15, w2: 0.20, w3: 0.25, w4: 0.30,
             w5: 0.40, w6: 0.45, w7: 0.50, w8: 0.55 },
  biases:  { b1: 0.35, b2: 0.60 },
  targets: { t1: 0.01, t2: 0.99 },
  activations: null,
  gradients:   null,
  loss:        null,
}

function makeProgress(levelId: number): LevelProgress {
  return { levelId, completed: false, highScore: 0, lossHistory: [], iterationCount: 0 }
}

const LS_KEY = 'nn-game-scores'

interface StoredScores {
  [levelId: number]: number
}

function loadStoredScores(): StoredScores {
  try {
    const raw = localStorage.getItem(LS_KEY)
    if (raw) return JSON.parse(raw) as StoredScores
  } catch {
    // ignore parse errors
  }
  return {}
}

function buildInitialState(): GameState {
  const stored = loadStoredScores()
  const progress: GameState['progress'] = {
    1: makeProgress(1),
    2: makeProgress(2),
    3: makeProgress(3),
    4: makeProgress(4),
  }
  for (const [id, score] of Object.entries(stored)) {
    const levelId = Number(id)
    if (levelId in progress && score > 0) {
      progress[levelId] = { ...progress[levelId], highScore: score, completed: true }
    }
  }
  return {
    currentLevel: 1,
    levels: LEVELS,
    progress,
    network: INITIAL_NETWORK,
    learningRate: 0.1,
    stepMode: false,
    stepQueue: [],
    animationPhase: 'idle',
    highlightedNode: null,
    highlightedEdge: null,
    iterationPhase: 'ready',
  }
}

// ---------------------------------------------------------------------------
// Action types
// ---------------------------------------------------------------------------

type Action =
  | { type: 'SET_INPUT';        key: keyof NetworkState['inputs'];  value: number }
  | { type: 'SET_WEIGHT';       key: keyof NetworkState['weights']; value: number }
  | { type: 'SET_BIAS';         key: keyof NetworkState['biases'];  value: number }
  | { type: 'SET_TARGET';       key: keyof NetworkState['targets']; value: number }
  | { type: 'SET_LEARNING_RATE'; value: number }
  | { type: 'TOGGLE_STEP_MODE' }
  | { type: 'RUN_FORWARD' }
  | { type: 'BACKPROPAGATE' }
  | { type: 'UPDATE_WEIGHTS' }
  | { type: 'ADVANCE_STEP' }
  | { type: 'COMPLETE_LEVEL';   levelId: number; score: number }
  | { type: 'CHANGE_LEVEL';     levelId: number }

// ---------------------------------------------------------------------------
// Reducer
// ---------------------------------------------------------------------------

function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {

    case 'SET_INPUT': {
      return {
        ...state,
        network: {
          ...state.network,
          inputs: { ...state.network.inputs, [action.key]: action.value },
          // Reset computed values so the user must re-run forward pass
          activations: null,
          gradients:   null,
          loss:        null,
        },
        iterationPhase: 'ready',
      }
    }

    case 'SET_WEIGHT': {
      return {
        ...state,
        network: {
          ...state.network,
          weights: { ...state.network.weights, [action.key]: action.value },
        },
      }
    }

    case 'SET_BIAS': {
      return {
        ...state,
        network: {
          ...state.network,
          biases: { ...state.network.biases, [action.key]: action.value },
        },
      }
    }

    case 'SET_TARGET': {
      return {
        ...state,
        network: {
          ...state.network,
          targets: { ...state.network.targets, [action.key]: action.value },
        },
      }
    }

    case 'SET_LEARNING_RATE': {
      return { ...state, learningRate: action.value }
    }

    case 'TOGGLE_STEP_MODE': {
      return { ...state, stepMode: !state.stepMode, stepQueue: [] }
    }

    case 'RUN_FORWARD': {
      // Guard: only allowed when iterationPhase is 'ready'
      if (state.iterationPhase !== 'ready') return state

      if (state.stepMode) {
        const steps = buildForwardSteps(state.network)
        if (steps.length === 0) return state
        // Apply the first step immediately
        const [first, ...rest] = steps
        const networkAfterFirst = first.apply(state.network)
        return {
          ...state,
          network: networkAfterFirst,
          stepQueue: rest,
          animationPhase: 'forward',
          highlightedNode: first.nodeId ?? null,
          highlightedEdge: first.edgeId ?? null,
          // Stay in 'ready' until the full forward pass queue is drained
          iterationPhase: 'ready',
        }
      }

      const newNetwork = forwardPass(state.network)
      return {
        ...state,
        network: newNetwork,
        iterationPhase: 'forward_done',
        animationPhase: 'forward',
        highlightedNode: null,
        highlightedEdge: null,
        stepQueue: [],
      }
    }

    case 'BACKPROPAGATE': {
      // Guard: only allowed after forward pass
      if (state.iterationPhase !== 'forward_done') return state

      if (state.stepMode) {
        const steps = buildBackpropSteps(state.network)
        if (steps.length === 0) return state
        const [first, ...rest] = steps
        const networkAfterFirst = first.apply(state.network)
        return {
          ...state,
          network: networkAfterFirst,
          stepQueue: rest,
          animationPhase: 'backward',
          highlightedNode: first.nodeId ?? null,
          highlightedEdge: first.edgeId ?? null,
          iterationPhase: 'forward_done',
        }
      }

      const newNetwork = backpropagate(state.network)
      return {
        ...state,
        network: newNetwork,
        iterationPhase: 'backprop_done',
        animationPhase: 'backward',
        highlightedNode: null,
        highlightedEdge: null,
        stepQueue: [],
      }
    }

    case 'UPDATE_WEIGHTS': {
      // Guard: only allowed after backpropagation
      if (state.iterationPhase !== 'backprop_done') return state

      const newNetwork = updateWeights(state.network, state.learningRate)
      const loss = state.network.loss?.E ?? null

      // Update lossHistory and iterationCount for the current level
      const prevProgress = state.progress[state.currentLevel]
      const updatedProgress: LevelProgress = {
        ...prevProgress,
        iterationCount: prevProgress.iterationCount + 1,
        lossHistory: loss !== null
          ? [...prevProgress.lossHistory, loss]
          : prevProgress.lossHistory,
      }

      return {
        ...state,
        network: newNetwork,
        iterationPhase: 'ready',
        animationPhase: 'update',
        highlightedNode: null,
        highlightedEdge: null,
        stepQueue: [],
        progress: { ...state.progress, [state.currentLevel]: updatedProgress },
      }
    }

    case 'ADVANCE_STEP': {
      if (state.stepQueue.length === 0) return state

      const [next, ...remaining] = state.stepQueue
      const newNetwork = next.apply(state.network)
      const queueEmpty = remaining.length === 0

      // When the forward-pass queue drains, transition iterationPhase to 'forward_done'
      // When the backprop queue drains, transition to 'backprop_done'
      let iterationPhase = state.iterationPhase
      if (queueEmpty) {
        if (state.animationPhase === 'forward') iterationPhase = 'forward_done'
        else if (state.animationPhase === 'backward') iterationPhase = 'backprop_done'
      }

      return {
        ...state,
        network: newNetwork,
        stepQueue: remaining,
        highlightedNode: next.nodeId ?? null,
        highlightedEdge: next.edgeId ?? null,
        animationPhase: queueEmpty ? 'idle' : state.animationPhase,
        iterationPhase,
      }
    }

    case 'COMPLETE_LEVEL': {
      const prev = state.progress[action.levelId]
      const newHighScore = action.score > prev.highScore ? action.score : prev.highScore
      return {
        ...state,
        progress: {
          ...state.progress,
          [action.levelId]: { ...prev, completed: true, highScore: newHighScore },
        },
      }
    }

    case 'CHANGE_LEVEL': {
      const level = state.levels.find(l => l.id === action.levelId)
      if (!level) return state

      // Apply level presets on top of the default network
      const newNetwork: NetworkState = {
        ...INITIAL_NETWORK,
        inputs: level.presetInputs
          ? { ...INITIAL_NETWORK.inputs, ...level.presetInputs }
          : INITIAL_NETWORK.inputs,
        weights: level.presetWeights
          ? { ...INITIAL_NETWORK.weights, ...level.presetWeights }
          : INITIAL_NETWORK.weights,
      }

      return {
        ...state,
        currentLevel: action.levelId,
        network: newNetwork,
        iterationPhase: 'ready',
        animationPhase: 'idle',
        highlightedNode: null,
        highlightedEdge: null,
        stepQueue: [],
      }
    }

    default:
      return state
  }
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

interface GameContextValue {
  state: GameState
  dispatch: Dispatch<Action>
}

export const GameContext = createContext<GameContextValue | null>(null)

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, buildInitialState)

  useEffect(() => {
    const scores: StoredScores = {}
    for (const [id, prog] of Object.entries(state.progress)) {
      if (prog.highScore > 0) scores[Number(id)] = prog.highScore
    }
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(scores))
    } catch {
      // ignore storage errors (e.g. private browsing quota)
    }
  }, [state.progress])

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  )
}

export function useGame(): GameContextValue {
  const ctx = useContext(GameContext)
  if (!ctx) throw new Error('useGame must be used inside <GameProvider>')
  return ctx
}

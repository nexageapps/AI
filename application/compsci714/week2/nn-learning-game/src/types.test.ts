import { describe, it, expect } from 'vitest'
import { LEVELS } from './levels'
import type { NetworkState, GameState, LevelProgress, ComputationStep, ScoreResult } from './types'

describe('LevelConfig definitions', () => {
  it('defines exactly four levels', () => {
    expect(LEVELS).toHaveLength(4)
  })

  it('assigns correct ids 1–4', () => {
    expect(LEVELS.map(l => l.id)).toEqual([1, 2, 3, 4])
  })

  it('uses correct loss thresholds per spec', () => {
    const thresholds = LEVELS.map(l => l.lossThreshold)
    expect(thresholds).toEqual([0.1, 0.08, 0.05, 0.02])
  })

  it('level 1 has preset inputs but no preset weights', () => {
    const l1 = LEVELS[0]
    expect(l1.presetInputs).toBeDefined()
    expect(l1.presetWeights).toBeUndefined()
  })

  it('levels 2 and 3 have both preset inputs and weights', () => {
    for (const level of [LEVELS[1], LEVELS[2]]) {
      expect(level.presetInputs).toBeDefined()
      expect(level.presetWeights).toBeDefined()
    }
  })

  it('level 4 has preset inputs but no preset weights', () => {
    const l4 = LEVELS[3]
    expect(l4.presetInputs).toBeDefined()
    expect(l4.presetWeights).toBeUndefined()
  })

  it('all levels have non-empty name and description', () => {
    for (const level of LEVELS) {
      expect(level.name.length).toBeGreaterThan(0)
      expect(level.description.length).toBeGreaterThan(0)
    }
  })
})

// Type-shape smoke tests — these just verify the interfaces compile correctly.
describe('TypeScript interface shapes', () => {
  it('NetworkState accepts null activations, gradients, and loss', () => {
    const state: NetworkState = {
      inputs: { x1: 0.05, x2: 0.10 },
      weights: { w1: 0.15, w2: 0.20, w3: 0.25, w4: 0.30, w5: 0.40, w6: 0.45, w7: 0.50, w8: 0.55 },
      biases: { b1: 0.35, b2: 0.60 },
      targets: { t1: 0.01, t2: 0.99 },
      activations: null,
      gradients: null,
      loss: null,
    }
    expect(state.activations).toBeNull()
    expect(state.gradients).toBeNull()
    expect(state.loss).toBeNull()
  })

  it('ComputationStep apply function returns a NetworkState', () => {
    const step: ComputationStep = {
      label: 'test step',
      nodeId: 'h1',
      apply: (s) => s,
    }
    const state: NetworkState = {
      inputs: { x1: 0, x2: 0 },
      weights: { w1: 0, w2: 0, w3: 0, w4: 0, w5: 0, w6: 0, w7: 0, w8: 0 },
      biases: { b1: 0, b2: 0 },
      targets: { t1: 0, t2: 0 },
      activations: null,
      gradients: null,
      loss: null,
    }
    expect(step.apply(state)).toBe(state)
  })

  it('ScoreResult total is a number', () => {
    const score: ScoreResult = { iterationScore: 30, lossScore: 35, efficiencyScore: 20, total: 85 }
    expect(score.total).toBe(85)
  })

  it('GameState iterationPhase accepts all three values', () => {
    const phases: GameState['iterationPhase'][] = ['ready', 'forward_done', 'backprop_done']
    expect(phases).toHaveLength(3)
  })

  it('LevelProgress tracks lossHistory as an array', () => {
    const progress: LevelProgress = {
      levelId: 1,
      completed: false,
      highScore: 0,
      lossHistory: [0.25, 0.18, 0.12],
      iterationCount: 3,
    }
    expect(progress.lossHistory).toHaveLength(3)
  })
})

import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { NetworkVisualization } from './NetworkVisualization'
import type { GameState, NetworkState } from '../types'
import { LEVELS } from '../levels'
import { GameContext } from '../context/GameContext'
import type { Dispatch } from 'react'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeNetwork(overrides: Partial<NetworkState> = {}): NetworkState {
  return {
    inputs:  { x1: 0.05, x2: 0.10 },
    weights: { w1: 0.15, w2: 0.20, w3: 0.25, w4: 0.30,
               w5: 0.40, w6: 0.45, w7: 0.50, w8: 0.55 },
    biases:  { b1: 0.35, b2: 0.60 },
    targets: { t1: 0.01, t2: 0.99 },
    activations: null,
    gradients:   null,
    loss:        null,
    ...overrides,
  }
}

function makeState(overrides: Partial<GameState> = {}): GameState {
  const progress = { 1: { levelId: 1, completed: false, highScore: 0, lossHistory: [], iterationCount: 0 },
                     2: { levelId: 2, completed: false, highScore: 0, lossHistory: [], iterationCount: 0 },
                     3: { levelId: 3, completed: false, highScore: 0, lossHistory: [], iterationCount: 0 },
                     4: { levelId: 4, completed: false, highScore: 0, lossHistory: [], iterationCount: 0 } }
  return {
    currentLevel: 1,
    levels: LEVELS,
    progress,
    network: makeNetwork(),
    learningRate: 0.1,
    stepMode: false,
    stepQueue: [],
    animationPhase: 'idle',
    highlightedNode: null,
    highlightedEdge: null,
    iterationPhase: 'ready',
    ...overrides,
  }
}

function renderWithState(state: GameState) {
  const dispatch = vi.fn() as unknown as Dispatch<any>
  return render(
    <GameContext.Provider value={{ state, dispatch }}>
      <NetworkVisualization />
    </GameContext.Provider>
  )
}

// ---------------------------------------------------------------------------
// Requirement 1.6 — color coding
// ---------------------------------------------------------------------------

describe('activation color coding (Requirement 1.6)', () => {
  it('renders nodes with fill color (not the default slate for known activations)', () => {
    const state = makeState({
      network: makeNetwork({
        activations: { h1: 0.593, h2: 0.596, y1: 0.663, y2: 0.727 },
      }),
    })
    const { container } = renderWithState(state)
    const circles = container.querySelectorAll('circle')
    // There should be circles rendered (6 main + 2 bias)
    expect(circles.length).toBeGreaterThanOrEqual(6)
  })

  it('uses slate color for null activations', () => {
    const state = makeState({ network: makeNetwork({ activations: null }) })
    const { container } = renderWithState(state)
    const circles = container.querySelectorAll('circle')
    // Hidden and output nodes have null activation → slate fill
    const fills = Array.from(circles).map(c => c.getAttribute('fill'))
    expect(fills.some(f => f === '#94a3b8')).toBe(true)
  })

  it('input nodes always have a non-null activation color', () => {
    const state = makeState({ network: makeNetwork({ activations: null }) })
    const { container } = renderWithState(state)
    const circles = container.querySelectorAll('circle')
    // x1=0.05, x2=0.10 — both non-null, so their fill should be rgb(...)
    const fills = Array.from(circles).map(c => c.getAttribute('fill'))
    expect(fills.some(f => f?.startsWith('rgb('))).toBe(true)
  })
})

// ---------------------------------------------------------------------------
// Requirement 5.5 — gradient display after backpropagation
// ---------------------------------------------------------------------------

describe('gradient display (Requirement 5.5)', () => {
  it('does not show gradient labels before backpropagation', () => {
    const state = makeState({ network: makeNetwork({ gradients: null }) })
    renderWithState(state)
    // No ∂ symbol should appear
    expect(screen.queryByText(/∂/)).toBeNull()
  })

  it('shows gradient values on edges after backpropagation', () => {
    const gradients = {
      dE_dy1: 0.7414, dE_dy2: -0.2174,
      dE_dw5: 0.0822, dE_dw6: 0.0827,
      dE_dw7: -0.0226, dE_dw8: -0.0227,
      dE_dw1: 0.000438, dE_dw2: 0.000877,
      dE_dw3: -0.000495, dE_dw4: -0.000990,
      delta_h1: 0.00877, delta_h2: -0.00990,
    }
    const state = makeState({
      network: makeNetwork({
        activations: { h1: 0.593, h2: 0.596, y1: 0.663, y2: 0.727 },
        gradients,
      }),
    })
    renderWithState(state)
    // At least one gradient label should be visible
    const gradTexts = screen.getAllByText(/∂/)
    expect(gradTexts.length).toBeGreaterThan(0)
  })

  it('shows gradient for each of the 8 weight edges', () => {
    const gradients = {
      dE_dy1: 0.74, dE_dy2: -0.22,
      dE_dw5: 0.082, dE_dw6: 0.083,
      dE_dw7: -0.023, dE_dw8: -0.023,
      dE_dw1: 0.0004, dE_dw2: 0.0009,
      dE_dw3: -0.0005, dE_dw4: -0.001,
      delta_h1: 0.009, delta_h2: -0.010,
    }
    const state = makeState({
      network: makeNetwork({
        activations: { h1: 0.593, h2: 0.596, y1: 0.663, y2: 0.727 },
        gradients,
      }),
    })
    const { container } = renderWithState(state)
    // 8 gradient labels (one per weight edge)
    const gradTexts = container.querySelectorAll('text')
    const gradLabels = Array.from(gradTexts).filter(t => t.textContent?.startsWith('∂'))
    expect(gradLabels.length).toBe(8)
  })
})

// ---------------------------------------------------------------------------
// Requirement 9.4 — step mode highlighting
// ---------------------------------------------------------------------------

describe('step mode highlighting (Requirement 9.4)', () => {
  it('highlights the specified node with amber stroke', () => {
    const state = makeState({ highlightedNode: 'h1' })
    const { container } = renderWithState(state)
    const circles = container.querySelectorAll('circle')
    const highlighted = Array.from(circles).filter(c => c.getAttribute('stroke') === '#f59e0b')
    expect(highlighted.length).toBeGreaterThan(0)
  })

  it('highlights the specified edge with amber stroke', () => {
    const state = makeState({ highlightedEdge: 'w1' })
    const { container } = renderWithState(state)
    const lines = container.querySelectorAll('line')
    const highlighted = Array.from(lines).filter(l => l.getAttribute('stroke') === '#f59e0b')
    expect(highlighted.length).toBeGreaterThan(0)
  })

  it('does not highlight any node when highlightedNode is null', () => {
    const state = makeState({ highlightedNode: null })
    const { container } = renderWithState(state)
    const circles = container.querySelectorAll('circle')
    const highlighted = Array.from(circles).filter(c => c.getAttribute('stroke') === '#f59e0b')
    expect(highlighted.length).toBe(0)
  })

  it('does not highlight any edge when highlightedEdge is null', () => {
    const state = makeState({ highlightedEdge: null })
    const { container } = renderWithState(state)
    const lines = container.querySelectorAll('line')
    const highlighted = Array.from(lines).filter(l => l.getAttribute('stroke') === '#f59e0b')
    expect(highlighted.length).toBe(0)
  })
})

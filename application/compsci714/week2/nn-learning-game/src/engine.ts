import type { NetworkState, ComputationStep } from './types'

// σ(z) = 1 / (1 + e^(-z))
export function sigmoid(z: number): number {
  return 1 / (1 + Math.exp(-z))
}

// σ'(a) = a * (1 - a)  [derivative in terms of activation output]
export function sigmoidDerivative(a: number): number {
  return a * (1 - a)
}

// Forward pass: compute hidden and output activations, then loss.
export function forwardPass(state: NetworkState): NetworkState {
  const { x1, x2 } = state.inputs
  const { w1, w2, w3, w4, w5, w6, w7, w8 } = state.weights
  const { b1, b2 } = state.biases

  const h1 = sigmoid(w1 * x1 + w2 * x2 + b1)
  const h2 = sigmoid(w3 * x1 + w4 * x2 + b1)
  const y1 = sigmoid(w5 * h1 + w6 * h2 + b2)
  const y2 = sigmoid(w7 * h1 + w8 * h2 + b2)

  const stateWithActivations: NetworkState = { ...state, activations: { h1, h2, y1, y2 } }
  return computeLoss(stateWithActivations)
}

// Compute E1, E2, E from current activations and targets.
export function computeLoss(state: NetworkState): NetworkState {
  if (!state.activations) return state
  const { y1, y2 } = state.activations
  const { t1, t2 } = state.targets
  const E1 = 0.5 * (t1 - y1) ** 2
  const E2 = 0.5 * (t2 - y2) ** 2
  return { ...state, loss: { E1, E2, E: E1 + E2 } }
}

// Backpropagation: compute all gradients.
export function backpropagate(state: NetworkState): NetworkState {
  if (!state.activations) return state
  const { h1, h2, y1, y2 } = state.activations
  const { t1, t2 } = state.targets
  const { w5, w6, w7, w8 } = state.weights
  const { x1, x2 } = state.inputs

  // Output layer deltas
  const dE_dy1 = y1 - t1
  const dE_dy2 = y2 - t2
  const delta_y1 = dE_dy1 * sigmoidDerivative(y1)
  const delta_y2 = dE_dy2 * sigmoidDerivative(y2)

  // Output weight gradients
  const dE_dw5 = delta_y1 * h1
  const dE_dw6 = delta_y1 * h2
  const dE_dw7 = delta_y2 * h1
  const dE_dw8 = delta_y2 * h2

  // Hidden layer deltas
  const delta_h1 = (delta_y1 * w5 + delta_y2 * w7) * sigmoidDerivative(h1)
  const delta_h2 = (delta_y1 * w6 + delta_y2 * w8) * sigmoidDerivative(h2)

  // Hidden weight gradients
  const dE_dw1 = delta_h1 * x1
  const dE_dw2 = delta_h1 * x2
  const dE_dw3 = delta_h2 * x1
  const dE_dw4 = delta_h2 * x2

  return {
    ...state,
    gradients: {
      dE_dy1, dE_dy2,
      dE_dw5, dE_dw6, dE_dw7, dE_dw8,
      dE_dw1, dE_dw2, dE_dw3, dE_dw4,
      delta_h1, delta_h2,
    },
  }
}

// Weight update: w_new = w_old - learningRate * gradient
export function updateWeights(state: NetworkState, learningRate: number): NetworkState {
  if (!state.gradients) return state
  const { w1, w2, w3, w4, w5, w6, w7, w8 } = state.weights
  const { dE_dw1, dE_dw2, dE_dw3, dE_dw4, dE_dw5, dE_dw6, dE_dw7, dE_dw8 } = state.gradients
  return {
    ...state,
    weights: {
      w1: w1 - learningRate * dE_dw1,
      w2: w2 - learningRate * dE_dw2,
      w3: w3 - learningRate * dE_dw3,
      w4: w4 - learningRate * dE_dw4,
      w5: w5 - learningRate * dE_dw5,
      w6: w6 - learningRate * dE_dw6,
      w7: w7 - learningRate * dE_dw7,
      w8: w8 - learningRate * dE_dw8,
    },
    // Reset computed values after weight update
    activations: null,
    gradients: null,
    loss: null,
  }
}

// Serialize/deserialize state for persistence (req 10.5)
export function serializeState(state: NetworkState): string {
  return JSON.stringify(state)
}

export function deserializeState(json: string): NetworkState {
  return JSON.parse(json) as NetworkState
}

// Build the 9 forward-pass computation steps for step-by-step mode.
export function buildForwardSteps(_state: NetworkState): ComputationStep[] {
  return [
    // Step 1: net_h1
    {
      label: 'Compute net_h1 = w1·x1 + w2·x2 + b1',
      nodeId: 'h1',
      apply: (s) => {
        const net_h1 = s.weights.w1 * s.inputs.x1 + s.weights.w2 * s.inputs.x2 + s.biases.b1
        // Store net_h1 as a partial activation (not yet sigmoid'd)
        return { ...s, activations: { ...(s.activations ?? { h1: 0, h2: 0, y1: 0, y2: 0 }), h1: net_h1 } }
      },
    },
    // Step 2: h1 = sigmoid(net_h1)
    {
      label: 'Compute h1 = sigmoid(net_h1)',
      nodeId: 'h1',
      apply: (s) => {
        const net_h1 = s.weights.w1 * s.inputs.x1 + s.weights.w2 * s.inputs.x2 + s.biases.b1
        const h1 = sigmoid(net_h1)
        return { ...s, activations: { ...(s.activations ?? { h1: 0, h2: 0, y1: 0, y2: 0 }), h1 } }
      },
    },
    // Step 3: net_h2
    {
      label: 'Compute net_h2 = w3·x1 + w4·x2 + b1',
      nodeId: 'h2',
      apply: (s) => {
        const net_h2 = s.weights.w3 * s.inputs.x1 + s.weights.w4 * s.inputs.x2 + s.biases.b1
        return { ...s, activations: { ...(s.activations ?? { h1: 0, h2: 0, y1: 0, y2: 0 }), h2: net_h2 } }
      },
    },
    // Step 4: h2 = sigmoid(net_h2)
    {
      label: 'Compute h2 = sigmoid(net_h2)',
      nodeId: 'h2',
      apply: (s) => {
        const net_h2 = s.weights.w3 * s.inputs.x1 + s.weights.w4 * s.inputs.x2 + s.biases.b1
        const h2 = sigmoid(net_h2)
        return { ...s, activations: { ...(s.activations ?? { h1: 0, h2: 0, y1: 0, y2: 0 }), h2 } }
      },
    },
    // Step 5: net_y1
    {
      label: 'Compute net_y1 = w5·h1 + w6·h2 + b2',
      nodeId: 'y1',
      apply: (s) => {
        const acts = s.activations ?? { h1: 0, h2: 0, y1: 0, y2: 0 }
        const net_y1 = s.weights.w5 * acts.h1 + s.weights.w6 * acts.h2 + s.biases.b2
        return { ...s, activations: { ...acts, y1: net_y1 } }
      },
    },
    // Step 6: y1 = sigmoid(net_y1)
    {
      label: 'Compute y1 = sigmoid(net_y1)',
      nodeId: 'y1',
      apply: (s) => {
        const acts = s.activations ?? { h1: 0, h2: 0, y1: 0, y2: 0 }
        const net_y1 = s.weights.w5 * acts.h1 + s.weights.w6 * acts.h2 + s.biases.b2
        const y1 = sigmoid(net_y1)
        return { ...s, activations: { ...acts, y1 } }
      },
    },
    // Step 7: net_y2
    {
      label: 'Compute net_y2 = w7·h1 + w8·h2 + b2',
      nodeId: 'y2',
      apply: (s) => {
        const acts = s.activations ?? { h1: 0, h2: 0, y1: 0, y2: 0 }
        const net_y2 = s.weights.w7 * acts.h1 + s.weights.w8 * acts.h2 + s.biases.b2
        return { ...s, activations: { ...acts, y2: net_y2 } }
      },
    },
    // Step 8: y2 = sigmoid(net_y2)
    {
      label: 'Compute y2 = sigmoid(net_y2)',
      nodeId: 'y2',
      apply: (s) => {
        const acts = s.activations ?? { h1: 0, h2: 0, y1: 0, y2: 0 }
        const net_y2 = s.weights.w7 * acts.h1 + s.weights.w8 * acts.h2 + s.biases.b2
        const y2 = sigmoid(net_y2)
        return { ...s, activations: { ...acts, y2 } }
      },
    },
    // Step 9: compute loss E1, E2, E
    {
      label: 'Compute E1 = 0.5·(t1−y1)², E2 = 0.5·(t2−y2)², E = E1+E2',
      apply: (s) => computeLoss(s),
    },
  ]
}

// Build the 14 backpropagation computation steps for step-by-step mode.
// delta_y1/delta_y2 are intermediate values — they are recomputed from activations
// as needed since they are not part of the stored gradients shape.
export function buildBackpropSteps(_state: NetworkState): ComputationStep[] {
  // Helper: derive delta_y1 from current state
  const getDeltaY1 = (s: NetworkState) => {
    const { y1 } = s.activations!
    return (s.gradients?.dE_dy1 ?? (y1 - s.targets.t1)) * sigmoidDerivative(y1)
  }
  // Helper: derive delta_y2 from current state
  const getDeltaY2 = (s: NetworkState) => {
    const { y2 } = s.activations!
    return (s.gradients?.dE_dy2 ?? (y2 - s.targets.t2)) * sigmoidDerivative(y2)
  }

  return [
    // Step 1: ∂E/∂y1
    {
      label: '∂E/∂y1 = y1 − t1',
      nodeId: 'y1',
      apply: (s) => {
        const dE_dy1 = s.activations!.y1 - s.targets.t1
        return { ...s, gradients: { ...emptyGradients(), ...(s.gradients ?? {}), dE_dy1 } }
      },
    },
    // Step 2: ∂E/∂y2
    {
      label: '∂E/∂y2 = y2 − t2',
      nodeId: 'y2',
      apply: (s) => {
        const dE_dy2 = s.activations!.y2 - s.targets.t2
        return { ...s, gradients: { ...emptyGradients(), ...(s.gradients ?? {}), dE_dy2 } }
      },
    },
    // Step 3: δy1 — stored implicitly via dE_dy1; no new field needed
    {
      label: 'δy1 = ∂E/∂y1 · y1·(1−y1)',
      nodeId: 'y1',
      apply: (s) => {
        // Ensure dE_dy1 is set so getDeltaY1 uses it
        const dE_dy1 = s.gradients?.dE_dy1 ?? (s.activations!.y1 - s.targets.t1)
        return { ...s, gradients: { ...emptyGradients(), ...(s.gradients ?? {}), dE_dy1 } }
      },
    },
    // Step 4: δy2
    {
      label: 'δy2 = ∂E/∂y2 · y2·(1−y2)',
      nodeId: 'y2',
      apply: (s) => {
        const dE_dy2 = s.gradients?.dE_dy2 ?? (s.activations!.y2 - s.targets.t2)
        return { ...s, gradients: { ...emptyGradients(), ...(s.gradients ?? {}), dE_dy2 } }
      },
    },
    // Step 5: ∂E/∂w5
    {
      label: '∂E/∂w5 = δy1 · h1',
      edgeId: 'w5',
      apply: (s) => {
        const dE_dw5 = getDeltaY1(s) * s.activations!.h1
        return { ...s, gradients: { ...emptyGradients(), ...(s.gradients ?? {}), dE_dw5 } }
      },
    },
    // Step 6: ∂E/∂w6
    {
      label: '∂E/∂w6 = δy1 · h2',
      edgeId: 'w6',
      apply: (s) => {
        const dE_dw6 = getDeltaY1(s) * s.activations!.h2
        return { ...s, gradients: { ...emptyGradients(), ...(s.gradients ?? {}), dE_dw6 } }
      },
    },
    // Step 7: ∂E/∂w7
    {
      label: '∂E/∂w7 = δy2 · h1',
      edgeId: 'w7',
      apply: (s) => {
        const dE_dw7 = getDeltaY2(s) * s.activations!.h1
        return { ...s, gradients: { ...emptyGradients(), ...(s.gradients ?? {}), dE_dw7 } }
      },
    },
    // Step 8: ∂E/∂w8
    {
      label: '∂E/∂w8 = δy2 · h2',
      edgeId: 'w8',
      apply: (s) => {
        const dE_dw8 = getDeltaY2(s) * s.activations!.h2
        return { ...s, gradients: { ...emptyGradients(), ...(s.gradients ?? {}), dE_dw8 } }
      },
    },
    // Step 9: δh1
    {
      label: 'δh1 = (δy1·w5 + δy2·w7) · h1·(1−h1)',
      nodeId: 'h1',
      apply: (s) => {
        const { h1 } = s.activations!
        const delta_h1 = (getDeltaY1(s) * s.weights.w5 + getDeltaY2(s) * s.weights.w7) * sigmoidDerivative(h1)
        return { ...s, gradients: { ...emptyGradients(), ...(s.gradients ?? {}), delta_h1 } }
      },
    },
    // Step 10: δh2
    {
      label: 'δh2 = (δy1·w6 + δy2·w8) · h2·(1−h2)',
      nodeId: 'h2',
      apply: (s) => {
        const { h2 } = s.activations!
        const delta_h2 = (getDeltaY1(s) * s.weights.w6 + getDeltaY2(s) * s.weights.w8) * sigmoidDerivative(h2)
        return { ...s, gradients: { ...emptyGradients(), ...(s.gradients ?? {}), delta_h2 } }
      },
    },
    // Step 11: ∂E/∂w1
    {
      label: '∂E/∂w1 = δh1 · x1',
      edgeId: 'w1',
      apply: (s) => {
        const { h1 } = s.activations!
        const delta_h1 = s.gradients?.delta_h1 ??
          ((getDeltaY1(s) * s.weights.w5 + getDeltaY2(s) * s.weights.w7) * sigmoidDerivative(h1))
        const dE_dw1 = delta_h1 * s.inputs.x1
        return { ...s, gradients: { ...emptyGradients(), ...(s.gradients ?? {}), delta_h1, dE_dw1 } }
      },
    },
    // Step 12: ∂E/∂w2
    {
      label: '∂E/∂w2 = δh1 · x2',
      edgeId: 'w2',
      apply: (s) => {
        const { h1 } = s.activations!
        const delta_h1 = s.gradients?.delta_h1 ??
          ((getDeltaY1(s) * s.weights.w5 + getDeltaY2(s) * s.weights.w7) * sigmoidDerivative(h1))
        const dE_dw2 = delta_h1 * s.inputs.x2
        return { ...s, gradients: { ...emptyGradients(), ...(s.gradients ?? {}), delta_h1, dE_dw2 } }
      },
    },
    // Step 13: ∂E/∂w3
    {
      label: '∂E/∂w3 = δh2 · x1',
      edgeId: 'w3',
      apply: (s) => {
        const { h2 } = s.activations!
        const delta_h2 = s.gradients?.delta_h2 ??
          ((getDeltaY1(s) * s.weights.w6 + getDeltaY2(s) * s.weights.w8) * sigmoidDerivative(h2))
        const dE_dw3 = delta_h2 * s.inputs.x1
        return { ...s, gradients: { ...emptyGradients(), ...(s.gradients ?? {}), delta_h2, dE_dw3 } }
      },
    },
    // Step 14: ∂E/∂w4
    {
      label: '∂E/∂w4 = δh2 · x2',
      edgeId: 'w4',
      apply: (s) => {
        const { h2 } = s.activations!
        const delta_h2 = s.gradients?.delta_h2 ??
          ((getDeltaY1(s) * s.weights.w6 + getDeltaY2(s) * s.weights.w8) * sigmoidDerivative(h2))
        const dE_dw4 = delta_h2 * s.inputs.x2
        return { ...s, gradients: { ...emptyGradients(), ...(s.gradients ?? {}), delta_h2, dE_dw4 } }
      },
    },
  ]
}

// Helper: zero-initialised gradients object (used when building steps incrementally)
function emptyGradients(): NonNullable<NetworkState['gradients']> {
  return {
    dE_dy1: 0, dE_dy2: 0,
    dE_dw5: 0, dE_dw6: 0, dE_dw7: 0, dE_dw8: 0,
    dE_dw1: 0, dE_dw2: 0, dE_dw3: 0, dE_dw4: 0,
    delta_h1: 0, delta_h2: 0,
  }
}

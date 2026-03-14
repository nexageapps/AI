import type { LevelConfig } from './types'

// Fixed inputs used for levels 1–3 (from the COMPSCI 714 lecture example).
const FIXED_INPUTS: LevelConfig['presetInputs'] = { x1: 0.05, x2: 0.10 }

// Fixed weights used for levels 2 and 3 (from the lecture example).
const FIXED_WEIGHTS: LevelConfig['presetWeights'] = {
  w1: 0.15, w2: 0.20, w3: 0.25, w4: 0.30,
  w5: 0.40, w6: 0.45, w7: 0.50, w8: 0.55,
}

export const LEVELS: LevelConfig[] = [
  {
    id: 1,
    name: 'Network Structure & Forward Propagation',
    description:
      'Explore the network structure and run your first forward pass. ' +
      'Inputs are fixed — weights are randomised so you can see how they affect the output.',
    lossThreshold: 0.1,
    presetInputs: FIXED_INPUTS,
    // No presetWeights for level 1 — weights start random (set by context initialisation).
  },
  {
    id: 2,
    name: 'Predictions & Loss',
    description:
      'Run a forward pass with preset inputs and weights, then observe the ' +
      'individual errors E1, E2 and the total loss E.',
    lossThreshold: 0.08,
    presetInputs: FIXED_INPUTS,
    presetWeights: FIXED_WEIGHTS,
  },
  {
    id: 3,
    name: 'Gradient Descent',
    description:
      'Adjust the learning rate and apply weight updates. Watch the loss ' +
      'decrease as gradient descent nudges the weights toward better predictions.',
    lossThreshold: 0.05,
    presetInputs: FIXED_INPUTS,
    presetWeights: FIXED_WEIGHTS,
  },
  {
    id: 4,
    name: 'Full Backpropagation',
    description:
      'Run a complete training iteration: forward pass → backpropagation → ' +
      'weight update. Set your own initial weights and observe gradient flow.',
    lossThreshold: 0.02,
    presetInputs: FIXED_INPUTS,
    // No presetWeights for level 4 — student sets their own weights.
  },
]

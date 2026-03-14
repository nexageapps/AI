// Core network state — holds all inputs, weights, biases, targets,
// and computed values (activations, gradients, loss).
export interface NetworkState {
  inputs: { x1: number; x2: number };
  weights: {
    w1: number; w2: number; w3: number; w4: number;
    w5: number; w6: number; w7: number; w8: number;
  };
  biases: { b1: number; b2: number };
  targets: { t1: number; t2: number };
  activations: {
    h1: number; h2: number;
    y1: number; y2: number;
  } | null;
  gradients: {
    dE_dy1: number; dE_dy2: number;
    dE_dw5: number; dE_dw6: number; dE_dw7: number; dE_dw8: number;
    dE_dw1: number; dE_dw2: number; dE_dw3: number; dE_dw4: number;
    delta_h1: number; delta_h2: number;
  } | null;
  loss: { E1: number; E2: number; E: number } | null;
}

// Configuration for a single game level.
export interface LevelConfig {
  id: 1 | 2 | 3 | 4;
  name: string;
  description: string;
  lossThreshold: number;
  presetWeights?: Partial<NetworkState['weights']>;
  presetInputs?: Partial<NetworkState['inputs']>;
}

// Per-level progress tracked during a session.
export interface LevelProgress {
  levelId: number;
  completed: boolean;
  highScore: number;
  lossHistory: number[];   // total loss E recorded after each iteration
  iterationCount: number;
}

// A single deferred computation step used in step-by-step mode.
export interface ComputationStep {
  label: string;       // human-readable description, e.g. "Compute h1 = sigmoid(...)"
  nodeId?: string;     // node to highlight in the visualization
  edgeId?: string;     // edge to highlight in the visualization
  apply: (state: NetworkState) => NetworkState;
}

// Top-level application state held in GameContext.
export interface GameState {
  currentLevel: number;
  levels: LevelConfig[];
  progress: Record<number, LevelProgress>;
  network: NetworkState;
  learningRate: number;
  stepMode: boolean;
  stepQueue: ComputationStep[];
  animationPhase: 'idle' | 'forward' | 'backward' | 'update';
  highlightedNode: string | null;
  highlightedEdge: string | null;
  // Guards button ordering: ready → forward_done → backprop_done
  iterationPhase: 'ready' | 'forward_done' | 'backprop_done';
}

// Score breakdown returned after completing a level.
export interface ScoreResult {
  iterationScore: number;   // max 40 pts — decreases with more iterations
  lossScore: number;        // max 40 pts — based on how far below threshold
  efficiencyScore: number;  // max 20 pts — penalises α < 0.05 or α > 0.5
  total: number;            // sum, capped at 100
}

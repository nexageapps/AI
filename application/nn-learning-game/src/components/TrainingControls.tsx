import { useState, useEffect } from 'react'
import { useGame } from '../context/GameContext'
import type { NetworkState } from '../types'

// Weight keys in display order
const WEIGHT_KEYS = ['w1', 'w2', 'w3', 'w4', 'w5', 'w6', 'w7', 'w8'] as const

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function isInRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max
}

function parseFloat_(s: string): number | null {
  const n = parseFloat(s)
  return isNaN(n) ? null : n
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

interface BoundedFieldProps {
  label: string
  rawValue: string
  onChange: (raw: string) => void
  min: number
  max: number
}

function BoundedField({ label, rawValue, onChange, min, max }: BoundedFieldProps) {
  const parsed = parseFloat_(rawValue)
  const outOfRange = parsed !== null && !isInRange(parsed, min, max)

  return (
    <div className="tc-field">
      <label className="tc-label">{label}</label>
      <input
        type="number"
        className={`tc-input${outOfRange ? ' tc-input--error' : ''}`}
        value={rawValue}
        step="0.01"
        onChange={e => onChange(e.target.value)}
        aria-label={label}
        aria-invalid={outOfRange}
        aria-describedby={outOfRange ? `${label}-error` : undefined}
      />
      {outOfRange && (
        <span
          id={`${label}-error`}
          className="tc-error"
          role="alert"
        >
          Must be between {min} and {max}
        </span>
      )}
    </div>
  )
}

interface FreeFieldProps {
  label: string
  rawValue: string
  onChange: (raw: string) => void
}

function FreeField({ label, rawValue, onChange }: FreeFieldProps) {
  return (
    <div className="tc-field">
      <label className="tc-label">{label}</label>
      <input
        type="number"
        className="tc-input"
        value={rawValue}
        step="0.01"
        onChange={e => onChange(e.target.value)}
        aria-label={label}
      />
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function TrainingControls() {
  const { state, dispatch } = useGame()
  const { network } = state

  // Local raw-string state for all fields (allows typing intermediate values)
  const [inputs, setInputs] = useState({
    x1: String(network.inputs.x1),
    x2: String(network.inputs.x2),
  })
  const [targets, setTargets] = useState({
    t1: String(network.targets.t1),
    t2: String(network.targets.t2),
  })
  const [weights, setWeights] = useState({
    w1: String(network.weights.w1),
    w2: String(network.weights.w2),
    w3: String(network.weights.w3),
    w4: String(network.weights.w4),
    w5: String(network.weights.w5),
    w6: String(network.weights.w6),
    w7: String(network.weights.w7),
    w8: String(network.weights.w8),
  })
  const [biases, setBiases] = useState({
    b1: String(network.biases.b1),
    b2: String(network.biases.b2),
  })

  // Sync local state when context network changes externally (e.g. level change)
  useEffect(() => {
    setInputs({ x1: String(network.inputs.x1), x2: String(network.inputs.x2) })
  }, [network.inputs.x1, network.inputs.x2])

  useEffect(() => {
    setTargets({ t1: String(network.targets.t1), t2: String(network.targets.t2) })
  }, [network.targets.t1, network.targets.t2])

  useEffect(() => {
    setWeights({
      w1: String(network.weights.w1),
      w2: String(network.weights.w2),
      w3: String(network.weights.w3),
      w4: String(network.weights.w4),
      w5: String(network.weights.w5),
      w6: String(network.weights.w6),
      w7: String(network.weights.w7),
      w8: String(network.weights.w8),
    })
  }, [
    network.weights.w1, network.weights.w2, network.weights.w3, network.weights.w4,
    network.weights.w5, network.weights.w6, network.weights.w7, network.weights.w8,
  ])

  useEffect(() => {
    setBiases({ b1: String(network.biases.b1), b2: String(network.biases.b2) })
  }, [network.biases.b1, network.biases.b2])

  // ---------------------------------------------------------------------------
  // Change handlers — only dispatch when value is valid
  // ---------------------------------------------------------------------------

  function handleInputChange(key: keyof NetworkState['inputs'], raw: string) {
    setInputs(prev => ({ ...prev, [key]: raw }))
    const n = parseFloat_(raw)
    if (n !== null && isInRange(n, 0, 1)) {
      dispatch({ type: 'SET_INPUT', key, value: n })
    }
  }

  function handleTargetChange(key: keyof NetworkState['targets'], raw: string) {
    setTargets(prev => ({ ...prev, [key]: raw }))
    const n = parseFloat_(raw)
    if (n !== null && isInRange(n, 0, 1)) {
      dispatch({ type: 'SET_TARGET', key, value: n })
    }
  }

  function handleWeightChange(key: keyof NetworkState['weights'], raw: string) {
    setWeights(prev => ({ ...prev, [key]: raw }))
    const n = parseFloat_(raw)
    if (n !== null) {
      dispatch({ type: 'SET_WEIGHT', key, value: n })
    }
  }

  function handleBiasChange(key: keyof NetworkState['biases'], raw: string) {
    setBiases(prev => ({ ...prev, [key]: raw }))
    const n = parseFloat_(raw)
    if (n !== null) {
      dispatch({ type: 'SET_BIAS', key, value: n })
    }
  }

  // ---------------------------------------------------------------------------
  // Warning state for out-of-order button clicks
  // ---------------------------------------------------------------------------

  const [backpropWarning, setBackpropWarning] = useState(false)
  const [updateWarning, setUpdateWarning] = useState(false)

  const { iterationPhase, stepMode, stepQueue, learningRate } = state

  function handleRunForward() {
    dispatch({ type: 'RUN_FORWARD' })
    setBackpropWarning(false)
    setUpdateWarning(false)
  }

  function handleBackpropagate() {
    if (iterationPhase !== 'forward_done') {
      setBackpropWarning(true)
      return
    }
    setBackpropWarning(false)
    dispatch({ type: 'BACKPROPAGATE' })
  }

  function handleUpdateWeights() {
    if (iterationPhase !== 'backprop_done') {
      setUpdateWarning(true)
      return
    }
    setUpdateWarning(false)
    dispatch({ type: 'UPDATE_WEIGHTS' })
  }

  function handleLearningRateChange(raw: string) {
    const n = parseFloat_(raw)
    if (n !== null && n >= 0.01 && n <= 1.0) {
      dispatch({ type: 'SET_LEARNING_RATE', value: n })
    }
  }

  // ---------------------------------------------------------------------------
  // Derived display values
  // ---------------------------------------------------------------------------

  const { activations, loss, gradients, weights: networkWeights } = network

  // Weight delta table: shown when gradients are available (after backprop)
  const weightDeltaRows = gradients
    ? WEIGHT_KEYS.map(key => {
        const gradKey = `dE_d${key}` as keyof typeof gradients
        const grad = gradients[gradKey] as number
        const current = networkWeights[key]
        const next = current - learningRate * grad
        return { key, current, grad, next }
      })
    : null

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <div className="training-controls">
      {/* Inputs section */}
      <section className="tc-section" aria-labelledby="tc-inputs-heading">
        <h3 id="tc-inputs-heading" className="tc-section-title">Inputs</h3>
        <div className="tc-row">
          <BoundedField
            label="x1"
            rawValue={inputs.x1}
            onChange={raw => handleInputChange('x1', raw)}
            min={0}
            max={1}
          />
          <BoundedField
            label="x2"
            rawValue={inputs.x2}
            onChange={raw => handleInputChange('x2', raw)}
            min={0}
            max={1}
          />
        </div>
      </section>

      {/* Targets section */}
      <section className="tc-section" aria-labelledby="tc-targets-heading">
        <h3 id="tc-targets-heading" className="tc-section-title">Targets</h3>
        <div className="tc-row">
          <BoundedField
            label="t1"
            rawValue={targets.t1}
            onChange={raw => handleTargetChange('t1', raw)}
            min={0}
            max={1}
          />
          <BoundedField
            label="t2"
            rawValue={targets.t2}
            onChange={raw => handleTargetChange('t2', raw)}
            min={0}
            max={1}
          />
        </div>
      </section>

      {/* Weights section */}
      <section className="tc-section" aria-labelledby="tc-weights-heading">
        <h3 id="tc-weights-heading" className="tc-section-title">Weights</h3>
        <div className="tc-grid">
          {WEIGHT_KEYS.map(key => (
            <FreeField
              key={key}
              label={key}
              rawValue={weights[key]}
              onChange={raw => handleWeightChange(key, raw)}
            />
          ))}
        </div>
      </section>

      {/* Biases section */}
      <section className="tc-section" aria-labelledby="tc-biases-heading">
        <h3 id="tc-biases-heading" className="tc-section-title">Biases</h3>
        <div className="tc-row">
          <FreeField
            label="b1"
            rawValue={biases.b1}
            onChange={raw => handleBiasChange('b1', raw)}
          />
          <FreeField
            label="b2"
            rawValue={biases.b2}
            onChange={raw => handleBiasChange('b2', raw)}
          />
        </div>
      </section>

      {/* Learning rate slider */}
      <section className="tc-section" aria-labelledby="tc-lr-heading">
        <h3 id="tc-lr-heading" className="tc-section-title">Learning Rate (α)</h3>
        <div className="tc-lr-row">
          <input
            type="range"
            className="tc-slider"
            min={0.01}
            max={1.0}
            step={0.01}
            value={learningRate}
            onChange={e => handleLearningRateChange(e.target.value)}
            aria-label="Learning rate"
            aria-valuemin={0.01}
            aria-valuemax={1.0}
            aria-valuenow={learningRate}
          />
          <span className="tc-lr-value">{learningRate.toFixed(2)}</span>
        </div>
      </section>

      {/* Step Mode toggle */}
      <section className="tc-section" aria-labelledby="tc-stepmode-heading">
        <h3 id="tc-stepmode-heading" className="tc-section-title">Step Mode</h3>
        <button
          className={`tc-btn tc-btn--toggle${stepMode ? ' tc-btn--active' : ''}`}
          onClick={() => dispatch({ type: 'TOGGLE_STEP_MODE' })}
          aria-pressed={stepMode}
        >
          {stepMode ? 'Step Mode: ON' : 'Step Mode: OFF'}
        </button>
      </section>

      {/* Action buttons */}
      <section className="tc-section" aria-labelledby="tc-actions-heading">
        <h3 id="tc-actions-heading" className="tc-section-title">Actions</h3>
        <div className="tc-actions">
          <button
            className="tc-btn tc-btn--primary"
            onClick={handleRunForward}
            disabled={iterationPhase !== 'ready'}
            aria-disabled={iterationPhase !== 'ready'}
          >
            Run Forward Pass
          </button>

          <button
            className="tc-btn tc-btn--primary"
            onClick={handleBackpropagate}
            disabled={iterationPhase !== 'forward_done'}
            aria-disabled={iterationPhase !== 'forward_done'}
          >
            Backpropagate
          </button>
          {backpropWarning && (
            <span className="tc-warning" role="alert">
              Run a forward pass first
            </span>
          )}

          <button
            className="tc-btn tc-btn--primary"
            onClick={handleUpdateWeights}
            disabled={iterationPhase !== 'backprop_done'}
            aria-disabled={iterationPhase !== 'backprop_done'}
          >
            Update Weights
          </button>
          {updateWarning && (
            <span className="tc-warning" role="alert">
              Run backpropagation first
            </span>
          )}

          {stepMode && stepQueue.length > 0 && (
            <button
              className="tc-btn tc-btn--secondary"
              onClick={() => dispatch({ type: 'ADVANCE_STEP' })}
            >
              Next Step
            </button>
          )}
        </div>
      </section>

      {/* Output display — shown after forward pass */}
      {activations !== null && loss !== null && (
        <section className="tc-section" aria-labelledby="tc-output-heading">
          <h3 id="tc-output-heading" className="tc-section-title">Forward Pass Output</h3>
          <div className="tc-output-grid">
            <div className="tc-output-item">
              <span className="tc-output-label">y1</span>
              <span className="tc-output-value">{activations.y1.toFixed(6)}</span>
            </div>
            <div className="tc-output-item">
              <span className="tc-output-label">y2</span>
              <span className="tc-output-value">{activations.y2.toFixed(6)}</span>
            </div>
            <div className="tc-output-item">
              <span className="tc-output-label">E1</span>
              <span className="tc-output-value">{loss.E1.toFixed(6)}</span>
            </div>
            <div className="tc-output-item">
              <span className="tc-output-label">E2</span>
              <span className="tc-output-value">{loss.E2.toFixed(6)}</span>
            </div>
            <div className="tc-output-item tc-output-item--total">
              <span className="tc-output-label">E (total loss)</span>
              <span className="tc-output-value">{loss.E.toFixed(6)}</span>
            </div>
          </div>
        </section>
      )}

      {/* Weight delta table — shown when gradients are available */}
      {weightDeltaRows !== null && (
        <section className="tc-section" aria-labelledby="tc-deltas-heading">
          <h3 id="tc-deltas-heading" className="tc-section-title">Weight Gradients</h3>
          <table className="tc-delta-table" aria-label="Weight gradients">
            <thead>
              <tr>
                <th>Weight</th>
                <th>Current</th>
                <th>Gradient</th>
                <th>New (after update)</th>
              </tr>
            </thead>
            <tbody>
              {weightDeltaRows.map(({ key, current, grad, next }) => (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{current.toFixed(6)}</td>
                  <td>{grad.toFixed(6)}</td>
                  <td>{next.toFixed(6)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </div>
  )
}

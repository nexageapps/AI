import { useState, useEffect } from 'react'
import { useGame } from '../context/GameContext'
import type { NetworkState, GameState } from '../types'
import './TrainingControls.css'

// Weight keys in display order
const WEIGHT_KEYS = ['w1', 'w2', 'w3', 'w4', 'w5', 'w6', 'w7', 'w8'] as const

// ---------------------------------------------------------------------------
// FormulaStrip — shows active formulas with live values below TRAIN buttons
// ---------------------------------------------------------------------------

interface FormulaRow { label: string; expr: string; value?: string; color: string }

function FormulaStrip({ state }: { state: GameState }) {
  const { animationPhase, network } = state
  const { inputs, weights, biases, activations, gradients, targets } = network

  if (animationPhase === 'idle') return null

  let rows: FormulaRow[] = []
  let title = ''

  if (animationPhase === 'forward') {
    title = '▶ Forward Pass Formulas'
    const net_h1 = activations ? (inputs.x1 * weights.w1 + inputs.x2 * weights.w2 + biases.b1) : null
    const net_h2 = activations ? (inputs.x1 * weights.w3 + inputs.x2 * weights.w4 + biases.b1) : null
    rows = [
      { label: 'net_h1', expr: 'x1·w1 + x2·w2 + b1', value: net_h1?.toFixed(4), color: '#8b5cf6' },
      { label: 'h1 = σ(net)', expr: '1/(1+e⁻ⁿᵉᵗ)', value: activations?.h1.toFixed(4), color: '#3b82f6' },
      { label: 'net_h2', expr: 'x1·w3 + x2·w4 + b1', value: net_h2?.toFixed(4), color: '#8b5cf6' },
      { label: 'h2 = σ(net)', expr: '1/(1+e⁻ⁿᵉᵗ)', value: activations?.h2.toFixed(4), color: '#3b82f6' },
      { label: 'y1 = σ(net)', expr: 'h1·w5 + h2·w6 + b2 → σ', value: activations?.y1.toFixed(4), color: '#0066cc' },
      { label: 'y2 = σ(net)', expr: 'h1·w7 + h2·w8 + b2 → σ', value: activations?.y2.toFixed(4), color: '#0066cc' },
      { label: 'Loss E', expr: '½(t1−y1)² + ½(t2−y2)²', value: network.loss?.E.toFixed(5), color: '#ef4444' },
    ]
  } else if (animationPhase === 'backward') {
    title = '◀ Backprop Formulas'
    const dE_dy1 = activations && targets ? activations.y1 - targets.t1 : null
    const dE_dy2 = activations && targets ? activations.y2 - targets.t2 : null
    rows = [
      { label: '∂E/∂y1', expr: 'y1 − t1', value: dE_dy1?.toFixed(4), color: '#f97316' },
      { label: '∂E/∂y2', expr: 'y2 − t2', value: dE_dy2?.toFixed(4), color: '#f97316' },
      { label: "σ'(y1)", expr: 'y1·(1−y1)', value: activations ? (activations.y1*(1-activations.y1)).toFixed(4) : undefined, color: '#10b981' },
      { label: '∂E/∂w5', expr: 'δ_y1 · h1', value: gradients?.dE_dw5.toFixed(5), color: '#f59e0b' },
      { label: '∂E/∂w6', expr: 'δ_y1 · h2', value: gradients?.dE_dw6.toFixed(5), color: '#f59e0b' },
      { label: 'δ_h1', expr: '(δ_y1·w5+δ_y2·w7)·σ\'(h1)', value: gradients?.dE_dw1 !== undefined ? 'see ∂E/∂w1' : undefined, color: '#06b6d4' },
      { label: '∂E/∂w1', expr: 'δ_h1 · x1', value: gradients?.dE_dw1.toFixed(5), color: '#06b6d4' },
    ]
  } else if (animationPhase === 'update') {
    title = '↑ Weight Update Formulas'
    rows = [
      { label: 'Rule', expr: 'w_new = w − α · ∂E/∂w', color: '#00467F' },
      ...(['w1','w2','w3','w4','w5','w6','w7','w8'] as const).map(k => {
        const gradKey = `dE_d${k}` as keyof NonNullable<typeof gradients>
        const grad = gradients?.[gradKey] as number | undefined
        const cur = weights[k]
        const lr = state.learningRate
        const next = grad !== undefined ? cur - lr * grad : undefined
        return {
          label: k,
          expr: `${cur.toFixed(4)} − ${lr}·${grad?.toFixed(4) ?? '?'}`,
          value: next?.toFixed(4),
          color: grad !== undefined ? (grad > 0 ? '#ef4444' : '#10b981') : '#718096',
        }
      }),
    ]
  }

  return (
    <div className="tc-formula-strip">
      <div className="tc-formula-strip-title">{title}</div>
      <div className="tc-formula-rows">
        {rows.map(({ label, expr, value, color }) => (
          <div key={label} className="tc-formula-item" style={{ borderLeftColor: color }}>
            <span className="tc-formula-item-label" style={{ color }}>{label}</span>
            <span className="tc-formula-item-expr">
              {expr}{value !== undefined && <span className="tc-formula-item-value" style={{ color }}> = {value}</span>}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

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

      {/* ── Inputs & Targets on one row ── */}
      <section className="tc-section" aria-labelledby="tc-inputs-heading">
        <h3 id="tc-inputs-heading" className="tc-section-title">Inputs &amp; Targets</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
          <div>
            <div className="tc-inline-label">Inputs</div>
            <div className="tc-row">
              <BoundedField label="x1" rawValue={inputs.x1} onChange={raw => handleInputChange('x1', raw)} min={0} max={1} />
              <BoundedField label="x2" rawValue={inputs.x2} onChange={raw => handleInputChange('x2', raw)} min={0} max={1} />
            </div>
          </div>
          <div>
            <div className="tc-inline-label">Targets</div>
            <div className="tc-row">
              <BoundedField label="t1" rawValue={targets.t1} onChange={raw => handleTargetChange('t1', raw)} min={0} max={1} />
              <BoundedField label="t2" rawValue={targets.t2} onChange={raw => handleTargetChange('t2', raw)} min={0} max={1} />
            </div>
          </div>
        </div>
      </section>

      <hr className="tc-divider" />

      {/* ── Weights ── */}
      <section className="tc-section" aria-labelledby="tc-weights-heading">
        <h3 id="tc-weights-heading" className="tc-section-title">Weights</h3>
        <div className="tc-grid">
          {WEIGHT_KEYS.map(key => (
            <FreeField key={key} label={key} rawValue={weights[key]} onChange={raw => handleWeightChange(key, raw)} />
          ))}
        </div>
      </section>

      {/* ── Biases ── */}
      <section className="tc-section" aria-labelledby="tc-biases-heading">
        <h3 id="tc-biases-heading" className="tc-section-title">Biases</h3>
        <div className="tc-row">
          <FreeField label="b1" rawValue={biases.b1} onChange={raw => handleBiasChange('b1', raw)} />
          <FreeField label="b2" rawValue={biases.b2} onChange={raw => handleBiasChange('b2', raw)} />
        </div>
      </section>

      <hr className="tc-divider" />

      {/* ── Learning Rate + Step Mode on one row ── */}
      <section className="tc-section" aria-labelledby="tc-lr-heading">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
          <h3 id="tc-lr-heading" className="tc-section-title" style={{ margin: 0 }}>α = {learningRate.toFixed(2)}</h3>
          <button
            className={`tc-btn tc-btn--toggle${stepMode ? ' tc-btn--active' : ''}`}
            onClick={() => dispatch({ type: 'TOGGLE_STEP_MODE' })}
            aria-pressed={stepMode}
            style={{ padding: '3px 10px', fontSize: 10 }}
          >
            {stepMode ? '⏸ Step: ON' : '▶ Step: OFF'}
          </button>
        </div>
        <div className="tc-lr-row">
          <input
            type="range"
            className="tc-slider"
            min={0.01} max={1.0} step={0.01}
            value={learningRate}
            onChange={e => handleLearningRateChange(e.target.value)}
            aria-label="Learning rate"
          />
        </div>
      </section>

      <hr className="tc-divider" />

      {/* ── Actions ── */}
      <section className="tc-section" aria-labelledby="tc-actions-heading">
        <h3 id="tc-actions-heading" className="tc-section-title">Train</h3>
        <div className="tc-phase" aria-label="Training phase">
          <div className={`tc-phase-step ${iterationPhase === 'ready' ? 'tc-phase-step--active' : 'tc-phase-step--done'}`}>1. Forward</div>
          <div className={`tc-phase-step ${iterationPhase === 'forward_done' ? 'tc-phase-step--active' : iterationPhase === 'backprop_done' ? 'tc-phase-step--done' : ''}`}>2. Backprop</div>
          <div className={`tc-phase-step ${iterationPhase === 'backprop_done' ? 'tc-phase-step--active' : ''}`}>3. Update</div>
        </div>
        <div className="tc-actions">
          <button className="tc-btn tc-btn--primary" onClick={handleRunForward} disabled={iterationPhase !== 'ready'}>
            ➡ Forward
          </button>
          <button className="tc-btn tc-btn--primary" onClick={handleBackpropagate} disabled={iterationPhase !== 'forward_done'}>
            ⬅ Backprop
          </button>
          <button className="tc-btn tc-btn--primary" onClick={handleUpdateWeights} disabled={iterationPhase !== 'backprop_done'}>
            ↻ Update
          </button>
          {backpropWarning && <span className="tc-warning">Run forward pass first</span>}
          {updateWarning && <span className="tc-warning">Run backprop first</span>}
          {stepMode && stepQueue.length > 0 && (
            <button className="tc-btn tc-btn--secondary" onClick={() => dispatch({ type: 'ADVANCE_STEP' })}>
              ▶ Next Step <span className="tc-step-badge">{stepQueue.length}</span>
            </button>
          )}
        </div>
      </section>

      {/* ── Active formula strip ── */}
      <FormulaStrip state={state} />

      {/* ── Output — shown after forward pass ── */}
      {activations !== null && loss !== null && (
        <>
          <hr className="tc-divider" />
          <section className="tc-section" aria-labelledby="tc-output-heading">
            <h3 id="tc-output-heading" className="tc-section-title">Output</h3>
            <div className="tc-output-grid">
              <div className="tc-output-item"><span className="tc-output-label">y1</span><span className="tc-output-value">{activations.y1.toFixed(5)}</span></div>
              <div className="tc-output-item"><span className="tc-output-label">y2</span><span className="tc-output-value">{activations.y2.toFixed(5)}</span></div>
              <div className="tc-output-item"><span className="tc-output-label">E1</span><span className="tc-output-value">{loss.E1.toFixed(5)}</span></div>
              <div className="tc-output-item"><span className="tc-output-label">E2</span><span className="tc-output-value">{loss.E2.toFixed(5)}</span></div>
              <div className="tc-output-item tc-output-item--total"><span className="tc-output-label">E total</span><span className="tc-output-value">{loss.E.toFixed(5)}</span></div>
            </div>
          </section>
        </>
      )}

      {/* ── Weight gradients — shown after backprop ── */}
      {weightDeltaRows !== null && (
        <>
          <hr className="tc-divider" />
          <section className="tc-section" aria-labelledby="tc-deltas-heading">
            <h3 id="tc-deltas-heading" className="tc-section-title">Weight Gradients</h3>
            <table className="tc-delta-table" aria-label="Weight gradients">
              <thead>
                <tr>
                  <th>w</th>
                  <th>Current</th>
                  <th>∂E/∂w</th>
                  <th>New</th>
                </tr>
              </thead>
              <tbody>
                {weightDeltaRows.map(({ key, current, grad, next }) => (
                  <tr key={key}>
                    <td>{key}</td>
                    <td>{current.toFixed(4)}</td>
                    <td>{grad.toFixed(4)}</td>
                    <td>{next.toFixed(4)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </>
      )}
    </div>
  )
}

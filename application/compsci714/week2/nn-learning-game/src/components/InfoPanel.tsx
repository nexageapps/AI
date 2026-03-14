import { useGame } from '../context/GameContext'
import './InfoPanel.css'

const FORMULAS = [
  { label: 'Sigmoid',    f: 'σ(z) = 1/(1+e⁻ᶻ)',              color: '#3b82f6' },
  { label: 'Net input',  f: 'net = w₁x₁ + w₂x₂ + b',         color: '#8b5cf6' },
  { label: 'Loss',       f: 'E = ½(t₁−y₁)² + ½(t₂−y₂)²',    color: '#ef4444' },
  { label: '∂E/∂y₁',    f: 'y₁ − t₁',                        color: '#f97316' },
  { label: 'σ′(z)',      f: 'σ(z)·(1−σ(z))',                  color: '#10b981' },
  { label: '∂E/∂w₅',    f: 'δ_y₁ · h₁',                      color: '#f59e0b' },
  { label: 'δ_h₁',      f: '(δ_y₁w₅+δ_y₂w₇)·σ′(net_h₁)',    color: '#06b6d4' },
  { label: 'Update',     f: 'w ← w − α · ∂E/∂w',             color: '#00467F' },
]

export default function InfoPanel() {
  const { state } = useGame()
  const { currentLevel, levels, progress, learningRate } = state

  const levelConfig = levels.find(l => l.id === currentLevel)
  const lossThreshold = levelConfig?.lossThreshold ?? 0
  const currentProgress = progress[currentLevel]
  const lossHistory = currentProgress?.lossHistory ?? []
  const iterCount = currentProgress?.iterationCount ?? 0

  // Learning rate visual: map 0.01–1.0 to 0–100%
  const lrPct = ((learningRate - 0.01) / (1.0 - 0.01)) * 100
  // Color: green (low α) → amber (mid) → red (high α)
  const lrColor = learningRate < 0.2 ? '#10b981' : learningRate < 0.6 ? '#f59e0b' : '#ef4444'

  // Best loss so far
  const bestLoss = lossHistory.length > 0 ? Math.min(...lossHistory) : null
  const lastLoss = lossHistory.length > 0 ? lossHistory[lossHistory.length - 1] : null

  return (
    <div className="ip-root">

      {/* ── Learning rate visual ── */}
      <div className="ip-section">
        <div className="ip-section-title">Learning Rate α</div>
        <div className="ip-lr-row">
          <div className="ip-lr-track">
            <div className="ip-lr-fill" style={{ width: `${lrPct}%`, background: lrColor }} />
            <div className="ip-lr-thumb" style={{ left: `${lrPct}%`, background: lrColor }} />
          </div>
          <span className="ip-lr-val" style={{ color: lrColor }}>{learningRate.toFixed(2)}</span>
        </div>
        <div className="ip-lr-labels">
          <span>0.01 (slow)</span><span>0.5</span><span>1.0 (fast)</span>
        </div>
      </div>

      {/* ── Iteration progress ── */}
      <div className="ip-section">
        <div className="ip-section-title">Progress</div>
        <div className="ip-stats">
          <div className="ip-stat">
            <span className="ip-stat-val">{iterCount}</span>
            <span className="ip-stat-label">Iterations</span>
          </div>
          <div className="ip-stat">
            <span className="ip-stat-val" style={{ color: lastLoss !== null && lastLoss < lossThreshold ? '#10b981' : '#ef4444' }}>
              {lastLoss !== null ? lastLoss.toFixed(4) : '—'}
            </span>
            <span className="ip-stat-label">Last Loss</span>
          </div>
          <div className="ip-stat">
            <span className="ip-stat-val" style={{ color: '#00467F' }}>
              {bestLoss !== null ? bestLoss.toFixed(4) : '—'}
            </span>
            <span className="ip-stat-label">Best Loss</span>
          </div>
          <div className="ip-stat">
            <span className="ip-stat-val" style={{ color: '#718096' }}>{lossThreshold}</span>
            <span className="ip-stat-label">Target</span>
          </div>
        </div>
      </div>

      {/* ── Formulas ── */}
      <div className="ip-section">
        <div className="ip-section-title">Key Formulas</div>
        <div className="ip-formulas">
          {FORMULAS.map(({ label, f, color }) => (
            <div key={label} className="ip-formula-row" style={{ borderLeftColor: color }}>
              <span className="ip-formula-label" style={{ color }}>{label}</span>
              <span className="ip-formula-code">{f}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

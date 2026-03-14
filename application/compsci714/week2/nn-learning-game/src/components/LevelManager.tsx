import { useState, useEffect } from 'react'
import { useGame } from '../context/GameContext'
import { calculateScore } from '../scoring'
import './LevelManager.css'

export default function LevelManager() {
  const { state, dispatch } = useGame()
  const { currentLevel, levels, progress, network, learningRate } = state

  const levelConfig = levels.find(l => l.id === currentLevel)
  const lossThreshold = levelConfig?.lossThreshold ?? 0
  const currentLoss = network.loss?.E ?? null
  const currentProgress = progress[currentLevel]

  const [modalDismissed, setModalDismissed] = useState(false)
  const [showFormulas, setShowFormulas] = useState(false)

  useEffect(() => { setModalDismissed(false) }, [currentLevel])

  const levelJustCompleted =
    currentLoss !== null && currentLoss < lossThreshold &&
    !currentProgress.completed && !modalDismissed

  const showModal =
    currentLoss !== null && currentLoss < lossThreshold && !modalDismissed

  const score = levelConfig
    ? calculateScore(currentProgress, learningRate, lossThreshold)
    : null

  function handleContinue() {
    if (levelJustCompleted && score)
      dispatch({ type: 'COMPLETE_LEVEL', levelId: currentLevel, score: score.total })
    setModalDismissed(true)
    const nextLevel = levels.find(l => l.id === currentLevel + 1)
    if (nextLevel) dispatch({ type: 'CHANGE_LEVEL', levelId: nextLevel.id })
  }

  function handleDismiss() {
    if (levelJustCompleted && score)
      dispatch({ type: 'COMPLETE_LEVEL', levelId: currentLevel, score: score.total })
    setModalDismissed(true)
  }

  function isLevelAccessible(levelId: number): boolean {
    if (levelId === 1) return true
    return progress[levelId - 1]?.completed === true
  }

  function handleLevelClick(levelId: number) {
    if (!isLevelAccessible(levelId) || levelId === currentLevel) return
    dispatch({ type: 'CHANGE_LEVEL', levelId })
  }

  // Loss progress bar: 0% = at max loss, 100% = at threshold
  const lossProgressPct = currentLoss !== null
    ? Math.min(100, Math.max(0, (1 - currentLoss / (lossThreshold * 4)) * 100))
    : 0

  const lossGood = currentLoss !== null && currentLoss < lossThreshold

  return (
    <div className="lm-root">
      {/* ── Level tabs ─────────────────────────────────────── */}
      <div className="lm-tabs" role="tablist" aria-label="Game levels">
        {levels.map(level => {
          const accessible = isLevelAccessible(level.id)
          const isActive = level.id === currentLevel
          const prog = progress[level.id]
          const done = prog?.completed

          return (
            <button
              key={level.id}
              role="tab"
              aria-selected={isActive}
              disabled={!accessible}
              onClick={() => handleLevelClick(level.id)}
              className={[
                'lm-tab',
                isActive ? 'lm-tab--active' : '',
                done ? 'lm-tab--done' : '',
                !accessible ? 'lm-tab--locked' : '',
              ].join(' ')}
              title={accessible ? level.name : `Complete Level ${level.id - 1} to unlock`}
            >
              {!accessible ? (
                <span className="lm-tab-lock">🔒</span>
              ) : done ? (
                <span className="lm-tab-check">✓</span>
              ) : (
                <span className="lm-tab-num">{level.id}</span>
              )}
              <span className="lm-tab-label">
                {accessible ? level.name : `Level ${level.id}`}
              </span>
              {done && prog.highScore > 0 && (
                <span className="lm-tab-score">{prog.highScore}pts</span>
              )}
            </button>
          )
        })}
      </div>

      {/* ── Current level info ─────────────────────────────── */}
      {levelConfig && (
        <div className="lm-info">
          <div className="lm-info-top">
            <div>
              <div className="lm-level-badge">Level {currentLevel} of 4</div>
              <h2 className="lm-level-name">{levelConfig.name}</h2>
              <p className="lm-level-desc">{levelConfig.description}</p>
            </div>

            <button
              className="lm-formula-btn"
              onClick={() => setShowFormulas(v => !v)}
              aria-expanded={showFormulas}
            >
              {showFormulas ? '✕ Hide Formulas' : '∑ Show Formulas'}
            </button>
          </div>

          {/* Loss progress */}
          <div className="lm-loss-row">
            <div className="lm-loss-stat">
              <span className="lm-loss-label">Current Loss</span>
              <span className={`lm-loss-val ${lossGood ? 'lm-loss-val--good' : ''}`}>
                {currentLoss !== null ? currentLoss.toFixed(5) : '—'}
              </span>
            </div>
            <div className="lm-loss-stat">
              <span className="lm-loss-label">Target ≤</span>
              <span className="lm-loss-threshold">{lossThreshold}</span>
            </div>
            <div className="lm-loss-bar-wrap">
              <div
                className={`lm-loss-bar ${lossGood ? 'lm-loss-bar--good' : ''}`}
                style={{ width: `${lossProgressPct}%` }}
              />
            </div>
          </div>

          {currentProgress.completed && currentProgress.highScore > 0 && (
            <div className="lm-highscore">
              🏆 High Score: <strong>{currentProgress.highScore}</strong> / 100
            </div>
          )}
        </div>
      )}

      {/* ── Formula panel ──────────────────────────────────── */}
      {showFormulas && <FormulaPanel />}

      {/* ── Locked level overlay hint ───────────────────────── */}
      {levels.filter(l => !isLevelAccessible(l.id)).length > 0 && (
        <div className="lm-locked-hint">
          🔒 Complete each level to unlock the next one
        </div>
      )}

      {/* ── Completion modal ───────────────────────────────── */}
      {showModal && score && (
        <div className="lm-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="lm-modal-title">
          <div className="lm-modal">
            <div className="lm-modal-icon">🎉</div>
            <h2 id="lm-modal-title" className="lm-modal-title">Level Complete!</h2>
            <p className="lm-modal-sub">Loss dropped below {lossThreshold} — great work!</p>

            <div className="lm-score-grid">
              <ScoreRow label={`Iterations (${currentProgress.iterationCount} used)`} value={score.iterationScore} max={40} />
              <ScoreRow label={`Final Loss (${currentLoss?.toFixed(4)})`} value={score.lossScore} max={40} />
              <ScoreRow label={`Learning Rate α = ${learningRate}`} value={score.efficiencyScore} max={20} />
              <div className="lm-score-total">
                <span>Total Score</span>
                <span className="lm-score-total-val">{score.total} / 100</span>
              </div>
            </div>

            <div className="lm-modal-btns">
              {currentLevel < 4 && (
                <button className="lm-btn lm-btn--primary" onClick={handleContinue}>
                  Next Level →
                </button>
              )}
              <button className="lm-btn lm-btn--secondary" onClick={handleDismiss}>
                Stay Here
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Score row helper ──────────────────────────────────────
function ScoreRow({ label, value, max }: { label: string; value: number; max: number }) {
  const pct = (value / max) * 100
  return (
    <div className="lm-score-row">
      <span className="lm-score-row-label">{label}</span>
      <div className="lm-score-row-bar-wrap">
        <div className="lm-score-row-bar" style={{ width: `${pct}%` }} />
      </div>
      <span className="lm-score-row-val">{value} / {max}</span>
    </div>
  )
}

// ── Formula panel ─────────────────────────────────────────
function FormulaPanel() {
  return (
    <div className="lm-formulas">
      <h3 className="lm-formulas-title">Key Formulas</h3>

      <div className="lm-formula-grid">
        <FormulaCard
          title="Sigmoid Activation"
          formula="σ(z) = 1 / (1 + e⁻ᶻ)"
          note="Applied to each neuron's weighted sum"
          color="#3b82f6"
        />
        <FormulaCard
          title="Net Input"
          formula="net_h1 = w1·x1 + w2·x2 + b1"
          note="Sum of weighted inputs plus bias"
          color="#8b5cf6"
        />
        <FormulaCard
          title="Loss (MSE)"
          formula="E = ½(t1−y1)² + ½(t2−y2)²"
          note="Total error across both outputs"
          color="#ef4444"
        />
        <FormulaCard
          title="Output Gradient"
          formula="∂E/∂y1 = y1 − t1"
          note="How much loss changes w.r.t. output"
          color="#f97316"
        />
        <FormulaCard
          title="Sigmoid Derivative"
          formula="σ'(z) = σ(z) · (1 − σ(z))"
          note="Used in backprop chain rule"
          color="#10b981"
        />
        <FormulaCard
          title="Weight Gradient (output)"
          formula="∂E/∂w5 = δ_y1 · h1"
          note="δ_y1 = (∂E/∂y1) · σ'(net_y1)"
          color="#f59e0b"
        />
        <FormulaCard
          title="Hidden Gradient"
          formula="δ_h1 = (δ_y1·w5 + δ_y2·w7) · σ'(net_h1)"
          note="Error propagated back through hidden layer"
          color="#06b6d4"
        />
        <FormulaCard
          title="Weight Update"
          formula="w_new = w_old − α · ∂E/∂w"
          note="α is the learning rate"
          color="#00467F"
        />
      </div>
    </div>
  )
}

function FormulaCard({ title, formula, note, color }: {
  title: string; formula: string; note: string; color: string
}) {
  return (
    <div className="lm-formula-card" style={{ borderLeftColor: color }}>
      <div className="lm-formula-card-title" style={{ color }}>{title}</div>
      <div className="lm-formula-card-formula">{formula}</div>
      <div className="lm-formula-card-note">{note}</div>
    </div>
  )
}

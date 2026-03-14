import { useState, useEffect, useRef } from 'react'
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
  const [popoverOpen, setPopoverOpen] = useState(false)
  const popoverRef = useRef<HTMLDivElement>(null)

  useEffect(() => { setModalDismissed(false); setPopoverOpen(false) }, [currentLevel])

  // Close popover on outside click
  useEffect(() => {
    if (!popoverOpen) return
    function onOutside(e: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node))
        setPopoverOpen(false)
    }
    document.addEventListener('mousedown', onOutside)
    return () => document.removeEventListener('mousedown', onOutside)
  }, [popoverOpen])

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

  function isLevelAccessible(levelId: number) {
    return levelId === 1 || progress[levelId - 1]?.completed === true
  }

  function handleLevelClick(levelId: number) {
    if (!isLevelAccessible(levelId) || levelId === currentLevel) return
    dispatch({ type: 'CHANGE_LEVEL', levelId })
  }

  const lossGood = currentLoss !== null && currentLoss < lossThreshold
  const lossProgressPct = currentLoss !== null
    ? Math.min(100, Math.max(0, (1 - currentLoss / (lossThreshold * 4)) * 100))
    : 0

  return (
    <div className="lm-root">

      {/* ── Single compact bar: tabs + status + info button ── */}
      <div className="lm-bar">

        {/* Level tabs */}
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
                {!accessible ? '🔒' : done ? '✓' : level.id}
                <span className="lm-tab-label">{accessible ? level.name : `Level ${level.id}`}</span>
                {done && prog.highScore > 0 && <span className="lm-tab-score">{prog.highScore}pts</span>}
              </button>
            )
          })}
        </div>

        {/* Loss status pill */}
        <div className="lm-status">
          <div className="lm-loss-pill">
            <span className="lm-loss-pill-label">Loss</span>
            <span className={`lm-loss-pill-val ${lossGood ? 'lm-loss-pill-val--good' : ''}`}>
              {currentLoss !== null ? currentLoss.toFixed(4) : '—'}
            </span>
            <span className="lm-loss-pill-sep">/ {lossThreshold}</span>
            <div className="lm-loss-mini-bar">
              <div className={`lm-loss-mini-fill ${lossGood ? 'lm-loss-mini-fill--good' : ''}`}
                style={{ width: `${lossProgressPct}%` }} />
            </div>
          </div>
          {currentProgress.completed && currentProgress.highScore > 0 && (
            <span className="lm-hs-pill">🏆 {currentProgress.highScore}pts</span>
          )}
        </div>

        {/* Info / formula popover trigger */}
        <div className="lm-popover-wrap" ref={popoverRef}>
          <button
            className={`lm-info-btn ${popoverOpen ? 'lm-info-btn--open' : ''}`}
            onClick={() => setPopoverOpen(v => !v)}
            aria-expanded={popoverOpen}
            title="Level info & formulas"
          >
            ℹ
          </button>

          {popoverOpen && levelConfig && (
            <div className="lm-popover" role="dialog" aria-label="Level info">
              <div className="lm-popover-header">
                <span className="lm-popover-badge">Level {currentLevel} of 4</span>
                <strong className="lm-popover-name">{levelConfig.name}</strong>
              </div>
              <p className="lm-popover-desc">{levelConfig.description}</p>
              <hr className="lm-popover-divider" />
              <h4 className="lm-popover-formulas-title">Key Formulas</h4>
              <div className="lm-popover-formulas">
                <FormulaRow label="Sigmoid" formula="σ(z) = 1/(1+e⁻ᶻ)" />
                <FormulaRow label="Net input" formula="net_h1 = w1·x1 + w2·x2 + b1" />
                <FormulaRow label="Loss" formula="E = ½(t1−y1)² + ½(t2−y2)²" />
                <FormulaRow label="∂E/∂y1" formula="y1 − t1" />
                <FormulaRow label="σ′(z)" formula="σ(z)·(1−σ(z))" />
                <FormulaRow label="∂E/∂w5" formula="δ_y1 · h1" />
                <FormulaRow label="δ_h1" formula="(δ_y1·w5 + δ_y2·w7)·σ′(net_h1)" />
                <FormulaRow label="Update" formula="w ← w − α·∂E/∂w" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Completion modal ── */}
      {showModal && score && (
        <div className="lm-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="lm-modal-title">
          <div className="lm-modal">
            <div className="lm-modal-icon">🎉</div>
            <h2 id="lm-modal-title" className="lm-modal-title">Level Complete!</h2>
            <p className="lm-modal-sub">Loss dropped below {lossThreshold}</p>
            <div className="lm-score-grid">
              <ScoreRow label={`Iterations (${currentProgress.iterationCount})`} value={score.iterationScore} max={40} />
              <ScoreRow label={`Final Loss (${currentLoss?.toFixed(4)})`} value={score.lossScore} max={40} />
              <ScoreRow label={`α = ${learningRate}`} value={score.efficiencyScore} max={20} />
              <div className="lm-score-total">
                <span>Total</span>
                <span className="lm-score-total-val">{score.total} / 100</span>
              </div>
            </div>
            <div className="lm-modal-btns">
              {currentLevel < 4 && (
                <button className="lm-btn lm-btn--primary" onClick={handleContinue}>Next Level →</button>
              )}
              <button className="lm-btn lm-btn--secondary" onClick={handleDismiss}>Stay Here</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function ScoreRow({ label, value, max }: { label: string; value: number; max: number }) {
  return (
    <div className="lm-score-row">
      <span className="lm-score-row-label">{label}</span>
      <div className="lm-score-row-bar-wrap">
        <div className="lm-score-row-bar" style={{ width: `${(value / max) * 100}%` }} />
      </div>
      <span className="lm-score-row-val">{value}/{max}</span>
    </div>
  )
}

function FormulaRow({ label, formula }: { label: string; formula: string }) {
  return (
    <div className="lm-formula-row">
      <span className="lm-formula-row-label">{label}</span>
      <code className="lm-formula-row-formula">{formula}</code>
    </div>
  )
}

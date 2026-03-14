import { useState, useEffect } from 'react'
import { useGame } from '../context/GameContext'
import { calculateScore } from '../scoring'

export default function LevelManager() {
  const { state, dispatch } = useGame()
  const { currentLevel, levels, progress, network, learningRate } = state

  const levelConfig = levels.find(l => l.id === currentLevel)
  const lossThreshold = levelConfig?.lossThreshold ?? 0
  const currentLoss = network.loss?.E ?? null
  const currentProgress = progress[currentLevel]

  // Track whether the modal has been dismissed for this completion event
  const [modalDismissed, setModalDismissed] = useState(false)

  // Reset modal dismissed state when level changes
  useEffect(() => {
    setModalDismissed(false)
  }, [currentLevel])

  // Level is complete when loss is below threshold and not yet marked completed
  const levelJustCompleted =
    currentLoss !== null &&
    currentLoss < lossThreshold &&
    !currentProgress.completed &&
    !modalDismissed

  // Also show modal if loss drops below threshold even after already completed
  // (re-run scenario) — but only if not dismissed
  const showModal =
    currentLoss !== null &&
    currentLoss < lossThreshold &&
    !modalDismissed

  const score = levelConfig
    ? calculateScore(currentProgress, learningRate, lossThreshold)
    : null

  function handleContinue() {
    if (levelJustCompleted && score) {
      dispatch({ type: 'COMPLETE_LEVEL', levelId: currentLevel, score: score.total })
    }
    setModalDismissed(true)

    // Advance to next level if available
    const nextLevelId = currentLevel + 1
    const nextLevel = levels.find(l => l.id === nextLevelId)
    if (nextLevel) {
      dispatch({ type: 'CHANGE_LEVEL', levelId: nextLevelId })
    }
  }

  function handleDismiss() {
    if (levelJustCompleted && score) {
      dispatch({ type: 'COMPLETE_LEVEL', levelId: currentLevel, score: score.total })
    }
    setModalDismissed(true)
  }

  function isLevelAccessible(levelId: number): boolean {
    if (levelId === 1) return true
    return progress[levelId - 1]?.completed === true
  }

  function handleLevelClick(levelId: number) {
    if (!isLevelAccessible(levelId)) return
    if (levelId === currentLevel) return
    dispatch({ type: 'CHANGE_LEVEL', levelId })
  }

  return (
    <div className="level-manager" style={styles.container}>
      {/* Level navigation tabs */}
      <div style={styles.tabs} role="tablist" aria-label="Game levels">
        {levels.map(level => {
          const accessible = isLevelAccessible(level.id)
          const isActive = level.id === currentLevel
          const levelProg = progress[level.id]
          const isCompleted = levelProg?.completed

          return (
            <button
              key={level.id}
              role="tab"
              aria-selected={isActive}
              aria-disabled={!accessible}
              disabled={!accessible}
              onClick={() => handleLevelClick(level.id)}
              style={{
                ...styles.tab,
                ...(isActive ? styles.tabActive : {}),
                ...(isCompleted ? styles.tabCompleted : {}),
                ...(!accessible ? styles.tabLocked : {}),
              }}
              title={accessible ? level.name : `Complete Level ${level.id - 1} to unlock`}
            >
              <span>Level {level.id}</span>
              {isCompleted && (
                <span style={styles.checkmark} aria-label="completed">✓</span>
              )}
              {!accessible && (
                <span style={styles.lockIcon} aria-label="locked">🔒</span>
              )}
              {isCompleted && levelProg.highScore > 0 && (
                <span style={styles.highScore}>{levelProg.highScore}pts</span>
              )}
            </button>
          )
        })}
      </div>

      {/* Current level info */}
      {levelConfig && (
        <div style={styles.levelInfo}>
          <h2 style={styles.levelName}>{levelConfig.name}</h2>
          <p style={styles.levelDescription}>{levelConfig.description}</p>

          <div style={styles.lossDisplay}>
            <span style={styles.lossLabel}>Current Loss:</span>
            <span style={styles.lossValue}>
              {currentLoss !== null ? currentLoss.toFixed(4) : '—'}
            </span>
            <span style={styles.lossSeparator}>/</span>
            <span style={styles.lossLabel}>Threshold:</span>
            <span style={styles.thresholdValue}>{lossThreshold}</span>
          </div>

          {currentProgress.completed && currentProgress.highScore > 0 && (
            <div style={styles.highScoreDisplay}>
              High Score: <strong>{currentProgress.highScore}</strong> pts
            </div>
          )}
        </div>
      )}

      {/* Level-complete modal */}
      {showModal && score && (
        <div
          style={styles.modalOverlay}
          role="dialog"
          aria-modal="true"
          aria-labelledby="level-complete-title"
        >
          <div style={styles.modal}>
            <h2 id="level-complete-title" style={styles.modalTitle}>
              🎉 Level Complete!
            </h2>
            <p style={styles.modalSubtitle}>
              You brought the loss below {lossThreshold}
            </p>

            <div style={styles.scoreBreakdown}>
              <h3 style={styles.scoreTitle}>Score Breakdown</h3>
              <div style={styles.scoreRow}>
                <span>Iterations ({currentProgress.iterationCount} used)</span>
                <span>{score.iterationScore} / 40</span>
              </div>
              <div style={styles.scoreRow}>
                <span>Final Loss ({currentLoss?.toFixed(4)})</span>
                <span>{score.lossScore} / 40</span>
              </div>
              <div style={styles.scoreRow}>
                <span>Learning Rate Efficiency (α = {learningRate})</span>
                <span>{score.efficiencyScore} / 20</span>
              </div>
              <div style={{ ...styles.scoreRow, ...styles.scoreTotalRow }}>
                <span>Total</span>
                <span>{score.total} / 100</span>
              </div>
            </div>

            <div style={styles.modalButtons}>
              {currentLevel < 4 && (
                <button
                  style={{ ...styles.button, ...styles.buttonPrimary }}
                  onClick={handleContinue}
                >
                  Continue to Level {currentLevel + 1}
                </button>
              )}
              <button
                style={{ ...styles.button, ...styles.buttonSecondary }}
                onClick={handleDismiss}
              >
                Stay on Level {currentLevel}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Inline styles
// ---------------------------------------------------------------------------

const styles: Record<string, React.CSSProperties> = {
  container: {
    fontFamily: 'sans-serif',
    position: 'relative',
  },
  tabs: {
    display: 'flex',
    gap: 8,
    marginBottom: 16,
    flexWrap: 'wrap',
  },
  tab: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    padding: '6px 14px',
    border: '2px solid #ccc',
    borderRadius: 6,
    background: '#f5f5f5',
    cursor: 'pointer',
    fontSize: 14,
    fontWeight: 500,
    transition: 'all 0.15s',
  },
  tabActive: {
    borderColor: '#3498db',
    background: '#ebf5fb',
    color: '#2980b9',
  },
  tabCompleted: {
    borderColor: '#27ae60',
    background: '#eafaf1',
    color: '#1e8449',
  },
  tabLocked: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  checkmark: {
    color: '#27ae60',
    fontWeight: 700,
  },
  lockIcon: {
    fontSize: 12,
  },
  highScore: {
    fontSize: 11,
    color: '#888',
    marginLeft: 2,
  },
  levelInfo: {
    padding: '12px 16px',
    border: '1px solid #ddd',
    borderRadius: 8,
    background: '#fafafa',
  },
  levelName: {
    margin: '0 0 6px',
    fontSize: 18,
    fontWeight: 600,
    color: '#2c3e50',
  },
  levelDescription: {
    margin: '0 0 12px',
    fontSize: 14,
    color: '#555',
    lineHeight: 1.5,
  },
  lossDisplay: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    fontSize: 14,
    padding: '8px 12px',
    background: '#fff',
    border: '1px solid #e0e0e0',
    borderRadius: 6,
    width: 'fit-content',
  },
  lossLabel: {
    color: '#666',
    fontWeight: 500,
  },
  lossValue: {
    fontFamily: 'monospace',
    fontWeight: 700,
    color: '#2c3e50',
  },
  lossSeparator: {
    color: '#aaa',
  },
  thresholdValue: {
    fontFamily: 'monospace',
    fontWeight: 700,
    color: '#e74c3c',
  },
  highScoreDisplay: {
    marginTop: 8,
    fontSize: 13,
    color: '#555',
  },
  // Modal
  modalOverlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modal: {
    background: '#fff',
    borderRadius: 12,
    padding: '32px 40px',
    maxWidth: 480,
    width: '90%',
    boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
    textAlign: 'center',
  },
  modalTitle: {
    margin: '0 0 8px',
    fontSize: 28,
    color: '#2c3e50',
  },
  modalSubtitle: {
    margin: '0 0 24px',
    color: '#666',
    fontSize: 15,
  },
  scoreBreakdown: {
    textAlign: 'left',
    background: '#f8f9fa',
    borderRadius: 8,
    padding: '16px 20px',
    marginBottom: 24,
  },
  scoreTitle: {
    margin: '0 0 12px',
    fontSize: 15,
    fontWeight: 600,
    color: '#2c3e50',
  },
  scoreRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: 14,
    color: '#555',
    padding: '4px 0',
    borderBottom: '1px solid #eee',
  },
  scoreTotalRow: {
    fontWeight: 700,
    color: '#2c3e50',
    borderBottom: 'none',
    marginTop: 4,
    paddingTop: 8,
    borderTop: '2px solid #ddd',
  },
  modalButtons: {
    display: 'flex',
    gap: 12,
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  button: {
    padding: '10px 24px',
    borderRadius: 6,
    border: 'none',
    fontSize: 15,
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'opacity 0.15s',
  },
  buttonPrimary: {
    background: '#3498db',
    color: '#fff',
  },
  buttonSecondary: {
    background: '#ecf0f1',
    color: '#2c3e50',
  },
}

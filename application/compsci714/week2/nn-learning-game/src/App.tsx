import { GameProvider, useGame } from './context/GameContext'
import { NetworkVisualization } from './components/NetworkVisualization'
import { TrainingControls } from './components/TrainingControls'
import LossGraph from './components/LossGraph'
import LevelManager from './components/LevelManager'
import './App.css'

function GameLayout() {
  const { state } = useGame()
  const { stepMode, highlightedNode, highlightedEdge } = state

  const stepHint = stepMode && (highlightedNode || highlightedEdge)
    ? `Step: ${highlightedNode ?? highlightedEdge}`
    : null

  return (
    <div className="app-shell">

      {/* ── Slim header ── */}
      <header className="app-header">
        <h1 className="app-title">UoA - COMPSCI 714 — Neural Network Trainer</h1>
        <p className="app-subtitle">Forward propagation · Backpropagation · Gradient descent</p>
      </header>

      {/* ── Level bar ── */}
      <div className="app-level-bar">
        <LevelManager />
      </div>

      {/* ── Step hint ── */}
      {stepHint && (
        <div className="app-step-hint" role="status" aria-live="polite">
          {stepHint}
        </div>
      )}

      {/* ── 3-column dashboard ── */}
      <main className="app-main">

        {/* Left: network diagram */}
        <div className="app-left">
          <section className="app-card app-card--fill" aria-label="Network visualization">
            <h2 className="app-card-title">Network Diagram</h2>
            <NetworkVisualization />
          </section>
        </div>

        {/* Center: training controls */}
        <div className="app-center">
          <section className="app-card app-card--scroll" aria-label="Training controls">
            <h2 className="app-card-title">Training Controls</h2>
            <TrainingControls />
          </section>
        </div>

        {/* Right: loss graph */}
        <div className="app-right">
          <section className="app-card app-card--loss" aria-label="Loss graph">
            <h2 className="app-card-title">Loss over Iterations</h2>
            <LossGraph />
          </section>
        </div>

      </main>
    </div>
  )
}

export default function App() {
  return (
    <GameProvider>
      <GameLayout />
    </GameProvider>
  )
}

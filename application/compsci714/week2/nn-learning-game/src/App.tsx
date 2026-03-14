import { GameProvider, useGame } from './context/GameContext'
import { NetworkVisualization } from './components/NetworkVisualization'
import { TrainingControls } from './components/TrainingControls'
import LossGraph from './components/LossGraph'
import LevelManager from './components/LevelManager'
import './App.css'

// ---------------------------------------------------------------------------
// Inner layout — must be inside GameProvider to use useGame
// ---------------------------------------------------------------------------

function GameLayout() {
  const { state } = useGame()
  const { stepMode, highlightedNode, highlightedEdge } = state

  // Show a hint about the currently highlighted node/edge when in step mode
  const stepHint = stepMode && (highlightedNode || highlightedEdge)
    ? `Highlighted: ${highlightedNode ?? highlightedEdge}`
    : null

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1 className="app-title">UoA COMPSCI 714 : Neural Network Learning Game</h1>
        <p className="app-subtitle">
          Explore forward propagation, backpropagation, and gradient descent step by step.
        </p>
      </header>

      {/* Level navigation + info */}
      <div className="app-level-bar">
        <LevelManager />
      </div>

      {/* Step mode hint */}
      {stepHint && (
        <div className="app-step-hint" role="status" aria-live="polite">
          {stepHint}
        </div>
      )}

      {/* Main two-column layout */}
      <main className="app-main">
        {/* Left column: network visualization + loss graph */}
        <div className="app-left">
          <section className="app-card" aria-label="Network visualization">
            <h2 className="app-card-title">Network</h2>
            <NetworkVisualization />
          </section>

          <section className="app-card" aria-label="Loss graph">
            <h2 className="app-card-title">Loss over Iterations</h2>
            <LossGraph />
          </section>
        </div>

        {/* Right column: training controls */}
        <div className="app-right">
          <section className="app-card" aria-label="Training controls">
            <h2 className="app-card-title">Training Controls</h2>
            <TrainingControls />
          </section>
        </div>
      </main>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Root App — wraps everything in GameProvider
// ---------------------------------------------------------------------------

export default function App() {
  return (
    <GameProvider>
      <GameLayout />
    </GameProvider>
  )
}

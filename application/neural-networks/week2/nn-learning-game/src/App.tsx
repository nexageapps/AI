// References:
//   - Russell, S. & Norvig, P. (2022). Artificial Intelligence: A Modern Approach (4th ed.), Chapter 21: Deep Learning.
//   - UoA COMPSCI 714 lecture materials.

import { GameProvider, useGame } from './context/GameContext'
import { NetworkVisualization } from './components/NetworkVisualization'
import { TrainingControls } from './components/TrainingControls'
import LossGraph from './components/LossGraph'
import InfoPanel from './components/InfoPanel'
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

      <header className="app-header">
        <h1 className="app-title"> UoA COMPSCI 714 — Neural Network Trainer</h1>
        <p className="app-subtitle">Forward propagation · Backpropagation · Gradient descent</p>
      </header>

      <div className="app-level-bar">
        <LevelManager />
      </div>

      {stepHint && (
        <div className="app-step-hint" role="status" aria-live="polite">
          {stepHint}
        </div>
      )}

      <main className="app-main">

        {/* Col 1 — Network diagram */}
        <div className="app-left">
          <section className="app-card app-card--fill" aria-label="Network visualization">
            <h2 className="app-card-title">Network Diagram</h2>
            <NetworkVisualization />
          </section>
        </div>

        {/* Col 2 — Training controls */}
        <div className="app-center">
          <section className="app-card app-card--scroll" aria-label="Training controls">
            <h2 className="app-card-title">Training Controls</h2>
            <TrainingControls />
          </section>
        </div>

        {/* Col 3 — Loss graph (top) + Info panel (bottom) */}
        <div className="app-right">
          <section className="app-card app-card--loss" aria-label="Loss graph">
            <h2 className="app-card-title">Loss over Iterations</h2>
            <LossGraph />
          </section>
          <section className="app-card app-card--info" aria-label="Formulas and progress">
            <h2 className="app-card-title">Formulas &amp; Progress</h2>
            <InfoPanel />
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

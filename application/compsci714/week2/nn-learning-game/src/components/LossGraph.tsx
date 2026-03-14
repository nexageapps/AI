import { useGame } from '../context/GameContext'

// SVG viewport dimensions
const VIEW_W = 400
const VIEW_H = 250

// Padding around the plot area
const PAD_LEFT = 50
const PAD_RIGHT = 20
const PAD_TOP = 20
const PAD_BOTTOM = 40

// Derived plot area dimensions
const PLOT_W = VIEW_W - PAD_LEFT - PAD_RIGHT
const PLOT_H = VIEW_H - PAD_TOP - PAD_BOTTOM

/**
 * Maps a data point to SVG coordinates within the plot area.
 */
function toSvgX(iteration: number, totalPoints: number): number {
  if (totalPoints <= 1) return PAD_LEFT + PLOT_W / 2
  return PAD_LEFT + ((iteration - 1) / (totalPoints - 1)) * PLOT_W
}

function toSvgY(loss: number, maxLoss: number): number {
  return PAD_TOP + PLOT_H - (loss / maxLoss) * PLOT_H
}

export default function LossGraph() {
  const { state } = useGame()
  const { currentLevel, progress, levels } = state

  const levelProgress = progress[currentLevel]
  const lossHistory = levelProgress?.lossHistory ?? []

  const levelConfig = levels.find(l => l.id === currentLevel)
  const lossThreshold = levelConfig?.lossThreshold ?? 0

  // Determine y-axis max: use max of lossHistory, threshold, and 1.0 as floor
  const maxLoss = lossHistory.length > 0
    ? Math.max(...lossHistory, lossThreshold, 0.01) * 1.1
    : 1.0

  // Build polyline points string
  const polylinePoints = lossHistory
    .map((loss, i) => `${toSvgX(i + 1, lossHistory.length)},${toSvgY(loss, maxLoss)}`)
    .join(' ')

  // Y position of the threshold dashed line
  const thresholdY = toSvgY(lossThreshold, maxLoss)

  // Y-axis tick values (5 ticks from 0 to maxLoss)
  const yTicks = [0, 0.25, 0.5, 0.75, 1.0].map(t => t * maxLoss)

  // X-axis tick values
  const xTickCount = lossHistory.length > 0 ? Math.min(lossHistory.length, 5) : 5
  const xMax = lossHistory.length > 0 ? lossHistory.length : 5
  const xTicks = Array.from({ length: xTickCount }, (_, i) =>
    Math.round(1 + (i / (xTickCount - 1)) * (xMax - 1))
  )

  return (
    <div style={{ flex: 1, minHeight: 0, display: 'flex', alignItems: 'stretch' }}>
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        aria-label="Loss over training iterations"
        style={{ fontFamily: 'sans-serif', fontSize: 12, display: 'block' }}
      >
        {/* Plot background */}
        <rect
          x={PAD_LEFT}
          y={PAD_TOP}
          width={PLOT_W}
          height={PLOT_H}
          fill="#f9f9f9"
          stroke="#ddd"
        />

        {/* Y-axis ticks and grid lines */}
        {yTicks.map((val) => {
          const y = toSvgY(val, maxLoss)
          return (
            <g key={`ytick-${val}`}>
              <line x1={PAD_LEFT - 5} y1={y} x2={PAD_LEFT} y2={y} stroke="#666" />
              <line x1={PAD_LEFT} y1={y} x2={PAD_LEFT + PLOT_W} y2={y} stroke="#eee" />
              <text x={PAD_LEFT - 8} y={y + 4} textAnchor="end" fill="#555">
                {val.toFixed(2)}
              </text>
            </g>
          )
        })}

        {/* X-axis ticks */}
        {xTicks.map((val) => {
          const x = lossHistory.length > 0
            ? toSvgX(val, lossHistory.length)
            : PAD_LEFT + ((val - 1) / (xMax - 1)) * PLOT_W
          return (
            <g key={`xtick-${val}`}>
              <line x1={x} y1={PAD_TOP + PLOT_H} x2={x} y2={PAD_TOP + PLOT_H + 5} stroke="#666" />
              <text x={x} y={PAD_TOP + PLOT_H + 18} textAnchor="middle" fill="#555">
                {val}
              </text>
            </g>
          )
        })}

        {/* Axes */}
        {/* Y-axis */}
        <line x1={PAD_LEFT} y1={PAD_TOP} x2={PAD_LEFT} y2={PAD_TOP + PLOT_H} stroke="#333" strokeWidth={1.5} />
        {/* X-axis */}
        <line x1={PAD_LEFT} y1={PAD_TOP + PLOT_H} x2={PAD_LEFT + PLOT_W} y2={PAD_TOP + PLOT_H} stroke="#333" strokeWidth={1.5} />

        {/* Dashed threshold line */}
        {lossThreshold > 0 && (
          <g>
            <line
              x1={PAD_LEFT}
              y1={thresholdY}
              x2={PAD_LEFT + PLOT_W}
              y2={thresholdY}
              stroke="#e74c3c"
              strokeWidth={1.5}
              strokeDasharray="6 4"
            />
            <text
              x={PAD_LEFT + PLOT_W - 2}
              y={thresholdY - 4}
              textAnchor="end"
              fill="#e74c3c"
              fontSize={10}
            >
              threshold
            </text>
          </g>
        )}

        {/* Loss polyline — only when data exists */}
        {lossHistory.length > 0 && (
          <polyline
            points={polylinePoints}
            fill="none"
            stroke="#0066CC"
            strokeWidth={2}
            strokeLinejoin="round"
          />
        )}

        {/* Data point dots */}
        {lossHistory.map((loss, i) => (
          <circle
            key={`dot-${i}`}
            cx={toSvgX(i + 1, lossHistory.length)}
            cy={toSvgY(loss, maxLoss)}
            r={3}
            fill="#00467F"
          />
        ))}

        {/* Axis labels */}
        {/* X-axis label */}
        <text
          x={PAD_LEFT + PLOT_W / 2}
          y={VIEW_H - 4}
          textAnchor="middle"
          fill="#333"
          fontSize={13}
        >
          Iteration
        </text>

        {/* Y-axis label (rotated) */}
        <text
          x={0}
          y={0}
          transform={`translate(14, ${PAD_TOP + PLOT_H / 2}) rotate(-90)`}
          textAnchor="middle"
          fill="#333"
          fontSize={13}
        >
          Loss
        </text>
      </svg>
    </div>
  )
}

import { useGame } from '../context/GameContext'
import type { NetworkState } from '../types'

// ---------------------------------------------------------------------------
// Layout constants
// ---------------------------------------------------------------------------

const SVG_WIDTH = 600
const SVG_HEIGHT = 400
const NODE_RADIUS = 30
const BIAS_RADIUS = 20

// Column x positions
const COL_INPUT = 100
const COL_HIDDEN = 300
const COL_OUTPUT = 500

// Node y positions
const ROW_TOP = 150
const ROW_BOT = 250
const ROW_BIAS = 60

// ---------------------------------------------------------------------------
// Color coding: blue (0) → red (1) based on activation value
// ---------------------------------------------------------------------------

function activationColor(value: number | null): string {
  if (value === null) return '#94a3b8' // slate-400 for unknown
  const t = Math.max(0, Math.min(1, value))
  const r = Math.round(t * 220 + (1 - t) * 59)
  const g = Math.round(t * 38 + (1 - t) * 130)
  const b = Math.round(t * 38 + (1 - t) * 246)
  return `rgb(${r},${g},${b})`
}

// ---------------------------------------------------------------------------
// Helper: format a number for display
// ---------------------------------------------------------------------------

function fmt(v: number | null | undefined, decimals = 3): string {
  if (v === null || v === undefined) return '—'
  return v.toFixed(decimals)
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

interface NodeProps {
  cx: number
  cy: number
  r: number
  label: string
  activation: number | null
  highlighted: boolean
  dashed?: boolean
}

function NetworkNode({ cx, cy, r, label, activation, highlighted, dashed = false }: NodeProps) {
  const fill = activationColor(activation)
  const stroke = highlighted ? '#f59e0b' : '#1e293b'
  const strokeWidth = highlighted ? 3 : 1.5
  const strokeDasharray = dashed ? '4 3' : undefined

  return (
    <g>
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeDasharray={strokeDasharray}
      />
      {/* Node label above center */}
      <text
        x={cx}
        y={cy - 6}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={r >= NODE_RADIUS ? 11 : 9}
        fontWeight="bold"
        fill="#fff"
      >
        {label}
      </text>
      {/* Activation value below label */}
      <text
        x={cx}
        y={cy + 9}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={r >= NODE_RADIUS ? 10 : 8}
        fill="#fff"
      >
        {fmt(activation)}
      </text>
    </g>
  )
}

interface EdgeProps {
  x1: number
  y1: number
  x2: number
  y2: number
  weightLabel: string
  gradientLabel?: string
  highlighted: boolean
  dashed?: boolean
}

function NetworkEdge({ x1, y1, x2, y2, weightLabel, gradientLabel, highlighted, dashed = false }: EdgeProps) {
  const mx = (x1 + x2) / 2
  const my = (y1 + y2) / 2
  const stroke = highlighted ? '#f59e0b' : '#64748b'
  const strokeWidth = highlighted ? 2.5 : 1.5
  const strokeDasharray = dashed ? '5 4' : undefined

  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeDasharray={strokeDasharray}
      />
      {/* Weight label */}
      <rect
        x={mx - 18}
        y={my - 9}
        width={36}
        height={16}
        rx={3}
        fill="white"
        fillOpacity={0.85}
      />
      <text
        x={mx}
        y={my}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={9}
        fill="#1e293b"
      >
        {weightLabel}
      </text>
      {/* Gradient label (shown below weight label after backprop) */}
      {gradientLabel && (
        <>
          <rect
            x={mx - 18}
            y={my + 9}
            width={36}
            height={14}
            rx={3}
            fill="#fef3c7"
            fillOpacity={0.9}
          />
          <text
            x={mx}
            y={my + 16}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={8}
            fill="#92400e"
          >
            {gradientLabel}
          </text>
        </>
      )}
    </g>
  )
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function NetworkVisualization() {
  const { state } = useGame()
  const { network, highlightedNode, highlightedEdge } = state
  const { inputs, weights, biases, activations, gradients } = network

  // Activation values (inputs are always known)
  const actX1 = inputs.x1
  const actX2 = inputs.x2
  const actH1 = activations?.h1 ?? null
  const actH2 = activations?.h2 ?? null
  const actY1 = activations?.y1 ?? null
  const actY2 = activations?.y2 ?? null

  // Gradient labels per weight edge (shown after backprop)
  function gradLabel(key: keyof NonNullable<NetworkState['gradients']>): string | undefined {
    if (!gradients) return undefined
    return `∂${fmt(gradients[key], 4)}`
  }

  return (
    <svg
      viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
      width="100%"
      style={{ maxWidth: SVG_WIDTH, display: 'block', margin: '0 auto' }}
      aria-label="Neural network visualization"
      role="img"
    >
      {/* ------------------------------------------------------------------ */}
      {/* Bias edges (dashed) — drawn first so nodes render on top            */}
      {/* ------------------------------------------------------------------ */}

      {/* b1 → h1 */}
      <NetworkEdge
        x1={COL_HIDDEN} y1={ROW_BIAS + BIAS_RADIUS}
        x2={COL_HIDDEN} y2={ROW_TOP - NODE_RADIUS}
        weightLabel={fmt(biases.b1)}
        highlighted={highlightedEdge === 'b1_h1'}
        dashed
      />
      {/* b1 → h2 */}
      <NetworkEdge
        x1={COL_HIDDEN} y1={ROW_BIAS + BIAS_RADIUS}
        x2={COL_HIDDEN} y2={ROW_BOT - NODE_RADIUS}
        weightLabel=""
        highlighted={highlightedEdge === 'b1_h2'}
        dashed
      />
      {/* b2 → y1 */}
      <NetworkEdge
        x1={COL_OUTPUT} y1={ROW_BIAS + BIAS_RADIUS}
        x2={COL_OUTPUT} y2={ROW_TOP - NODE_RADIUS}
        weightLabel={fmt(biases.b2)}
        highlighted={highlightedEdge === 'b2_y1'}
        dashed
      />
      {/* b2 → y2 */}
      <NetworkEdge
        x1={COL_OUTPUT} y1={ROW_BIAS + BIAS_RADIUS}
        x2={COL_OUTPUT} y2={ROW_BOT - NODE_RADIUS}
        weightLabel=""
        highlighted={highlightedEdge === 'b2_y2'}
        dashed
      />

      {/* ------------------------------------------------------------------ */}
      {/* Weight edges                                                         */}
      {/* ------------------------------------------------------------------ */}

      {/* w1: x1 → h1 */}
      <NetworkEdge
        x1={COL_INPUT + NODE_RADIUS} y1={ROW_TOP}
        x2={COL_HIDDEN - NODE_RADIUS} y2={ROW_TOP}
        weightLabel={`w1=${fmt(weights.w1)}`}
        gradientLabel={gradLabel('dE_dw1')}
        highlighted={highlightedEdge === 'w1'}
      />
      {/* w2: x2 → h1 */}
      <NetworkEdge
        x1={COL_INPUT + NODE_RADIUS} y1={ROW_BOT}
        x2={COL_HIDDEN - NODE_RADIUS} y2={ROW_TOP}
        weightLabel={`w2=${fmt(weights.w2)}`}
        gradientLabel={gradLabel('dE_dw2')}
        highlighted={highlightedEdge === 'w2'}
      />
      {/* w3: x1 → h2 */}
      <NetworkEdge
        x1={COL_INPUT + NODE_RADIUS} y1={ROW_TOP}
        x2={COL_HIDDEN - NODE_RADIUS} y2={ROW_BOT}
        weightLabel={`w3=${fmt(weights.w3)}`}
        gradientLabel={gradLabel('dE_dw3')}
        highlighted={highlightedEdge === 'w3'}
      />
      {/* w4: x2 → h2 */}
      <NetworkEdge
        x1={COL_INPUT + NODE_RADIUS} y1={ROW_BOT}
        x2={COL_HIDDEN - NODE_RADIUS} y2={ROW_BOT}
        weightLabel={`w4=${fmt(weights.w4)}`}
        gradientLabel={gradLabel('dE_dw4')}
        highlighted={highlightedEdge === 'w4'}
      />
      {/* w5: h1 → y1 */}
      <NetworkEdge
        x1={COL_HIDDEN + NODE_RADIUS} y1={ROW_TOP}
        x2={COL_OUTPUT - NODE_RADIUS} y2={ROW_TOP}
        weightLabel={`w5=${fmt(weights.w5)}`}
        gradientLabel={gradLabel('dE_dw5')}
        highlighted={highlightedEdge === 'w5'}
      />
      {/* w6: h2 → y1 */}
      <NetworkEdge
        x1={COL_HIDDEN + NODE_RADIUS} y1={ROW_BOT}
        x2={COL_OUTPUT - NODE_RADIUS} y2={ROW_TOP}
        weightLabel={`w6=${fmt(weights.w6)}`}
        gradientLabel={gradLabel('dE_dw6')}
        highlighted={highlightedEdge === 'w6'}
      />
      {/* w7: h1 → y2 */}
      <NetworkEdge
        x1={COL_HIDDEN + NODE_RADIUS} y1={ROW_TOP}
        x2={COL_OUTPUT - NODE_RADIUS} y2={ROW_BOT}
        weightLabel={`w7=${fmt(weights.w7)}`}
        gradientLabel={gradLabel('dE_dw7')}
        highlighted={highlightedEdge === 'w7'}
      />
      {/* w8: h2 → y2 */}
      <NetworkEdge
        x1={COL_HIDDEN + NODE_RADIUS} y1={ROW_BOT}
        x2={COL_OUTPUT - NODE_RADIUS} y2={ROW_BOT}
        weightLabel={`w8=${fmt(weights.w8)}`}
        gradientLabel={gradLabel('dE_dw8')}
        highlighted={highlightedEdge === 'w8'}
      />

      {/* ------------------------------------------------------------------ */}
      {/* Bias nodes                                                           */}
      {/* ------------------------------------------------------------------ */}

      <NetworkNode
        cx={COL_HIDDEN} cy={ROW_BIAS}
        r={BIAS_RADIUS}
        label="b1"
        activation={biases.b1}
        highlighted={highlightedNode === 'b1'}
        dashed
      />
      <NetworkNode
        cx={COL_OUTPUT} cy={ROW_BIAS}
        r={BIAS_RADIUS}
        label="b2"
        activation={biases.b2}
        highlighted={highlightedNode === 'b2'}
        dashed
      />

      {/* ------------------------------------------------------------------ */}
      {/* Input nodes                                                          */}
      {/* ------------------------------------------------------------------ */}

      <NetworkNode
        cx={COL_INPUT} cy={ROW_TOP}
        r={NODE_RADIUS}
        label="x1"
        activation={actX1}
        highlighted={highlightedNode === 'x1'}
      />
      <NetworkNode
        cx={COL_INPUT} cy={ROW_BOT}
        r={NODE_RADIUS}
        label="x2"
        activation={actX2}
        highlighted={highlightedNode === 'x2'}
      />

      {/* ------------------------------------------------------------------ */}
      {/* Hidden nodes                                                         */}
      {/* ------------------------------------------------------------------ */}

      <NetworkNode
        cx={COL_HIDDEN} cy={ROW_TOP}
        r={NODE_RADIUS}
        label="h1"
        activation={actH1}
        highlighted={highlightedNode === 'h1'}
      />
      <NetworkNode
        cx={COL_HIDDEN} cy={ROW_BOT}
        r={NODE_RADIUS}
        label="h2"
        activation={actH2}
        highlighted={highlightedNode === 'h2'}
      />

      {/* ------------------------------------------------------------------ */}
      {/* Output nodes                                                         */}
      {/* ------------------------------------------------------------------ */}

      <NetworkNode
        cx={COL_OUTPUT} cy={ROW_TOP}
        r={NODE_RADIUS}
        label="y1"
        activation={actY1}
        highlighted={highlightedNode === 'y1'}
      />
      <NetworkNode
        cx={COL_OUTPUT} cy={ROW_BOT}
        r={NODE_RADIUS}
        label="y2"
        activation={actY2}
        highlighted={highlightedNode === 'y2'}
      />

      {/* ------------------------------------------------------------------ */}
      {/* Column labels                                                        */}
      {/* ------------------------------------------------------------------ */}

      <text x={COL_INPUT}  y={SVG_HEIGHT - 10} textAnchor="middle" fontSize={12} fill="#64748b">Input</text>
      <text x={COL_HIDDEN} y={SVG_HEIGHT - 10} textAnchor="middle" fontSize={12} fill="#64748b">Hidden</text>
      <text x={COL_OUTPUT} y={SVG_HEIGHT - 10} textAnchor="middle" fontSize={12} fill="#64748b">Output</text>
    </svg>
  )
}

import { useState, useCallback, useRef, useEffect } from 'react';
import { ACTIVATIONS } from '../neuralNet';
import {
  FaPlus, FaMinus, FaPlay, FaRedo, FaLightbulb, FaInfoCircle,
  FaStepForward, FaCog, FaMousePointer, FaCalculator,
} from 'react-icons/fa';
import './NetworkBuilder.css';

const MAX_LAYERS = 5;
const MAX_NEURONS = 8;
const MIN_NEURONS = 1;

const PRESETS = [
  { name: 'Simple Classifier', input: 2, hidden: [4], output: 2, activation: 'relu' },
  { name: 'Deep Network', input: 3, hidden: [6, 4, 3], output: 2, activation: 'relu' },
  { name: 'Wide Network', input: 4, hidden: [8, 8], output: 3, activation: 'relu' },
  { name: 'XOR Solver', input: 2, hidden: [3], output: 1, activation: 'tanh' },
  { name: 'Autoencoder', input: 6, hidden: [3, 6], output: 6, activation: 'sigmoid' },
];

function randomWeight() {
  return (Math.random() * 2 - 1) * 0.8;
}

function initWeights(layers) {
  const weights = [];
  for (let i = 0; i < layers.length - 1; i++) {
    const w = [];
    for (let j = 0; j < layers[i]; j++) {
      const row = [];
      for (let k = 0; k < layers[i + 1]; k++) {
        row.push(randomWeight());
      }
      w.push(row);
    }
    weights.push(w);
  }
  return weights;
}

function forwardPass(input, weights, activationFn) {
  const activations = [input];
  let current = input;
  for (let l = 0; l < weights.length; l++) {
    const next = [];
    for (let j = 0; j < weights[l][0].length; j++) {
      let sum = 0;
      for (let i = 0; i < current.length; i++) {
        sum += current[i] * weights[l][i][j];
      }
      next.push(l === weights.length - 1 ? sum : activationFn(sum));
    }
    activations.push(next);
    current = next;
  }
  return activations;
}

/* ─── Canvas with hover-to-inspect ─── */
function NetworkCanvas({ layers, weights, activations, dropout, dropoutMask, animLayer, onHoverNeuron }) {
  const canvasRef = useRef(null);
  const positionsRef = useRef([]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    const layerCount = layers.length;
    const gapX = W / (layerCount + 1);
    const PAD_TOP = 24;
    const PAD_BOT = 28;
    const drawH = H - PAD_TOP - PAD_BOT;

    const positions = layers.map((count, li) => {
      const x = gapX * (li + 1);
      return Array.from({ length: count }, (_, ni) => ({
        x,
        y: PAD_TOP + (drawH / (count + 1)) * (ni + 1),
      }));
    });
    positionsRef.current = positions;

    // connections
    for (let li = 0; li < positions.length - 1; li++) {
      const isCurrent = animLayer !== null && li === animLayer - 1;
      const isFuture = animLayer !== null && li >= animLayer;

      for (let ni = 0; ni < positions[li].length; ni++) {
        for (let ni2 = 0; ni2 < positions[li + 1].length; ni2++) {
          const w = weights[li]?.[ni]?.[ni2] ?? 0;
          const isDropped = dropout > 0 && dropoutMask[li + 1]?.[ni2] === 0 && li + 1 < layers.length - 1;

          if (isFuture && animLayer !== null) {
            ctx.strokeStyle = '#e5e7eb';
            ctx.lineWidth = 0.5;
          } else if (isDropped) {
            ctx.strokeStyle = '#e5e7eb';
            ctx.lineWidth = 0.5;
          } else {
            const alpha = isCurrent ? 1 : Math.min(Math.abs(w), 1);
            ctx.strokeStyle = w > 0
              ? `rgba(37,99,235,${alpha})`
              : `rgba(220,38,38,${alpha})`;
            ctx.lineWidth = isCurrent ? Math.max(1.5, Math.abs(w) * 3.5) : Math.max(0.5, Math.abs(w) * 2.5);
          }
          ctx.beginPath();
          ctx.moveTo(positions[li][ni].x, positions[li][ni].y);
          ctx.lineTo(positions[li + 1][ni2].x, positions[li + 1][ni2].y);
          ctx.stroke();
        }
      }
    }

    // neurons
    for (let li = 0; li < positions.length; li++) {
      const isFuture = animLayer !== null && li > animLayer;
      for (let ni = 0; ni < positions[li].length; ni++) {
        const { x, y } = positions[li][ni];
        const val = activations?.[li]?.[ni];
        const isDropped = dropout > 0 && dropoutMask[li]?.[ni] === 0 && li > 0 && li < layers.length - 1;

        ctx.beginPath();
        ctx.arc(x, y, 14, 0, Math.PI * 2);
        if (isFuture) {
          ctx.fillStyle = '#f8fafc';
          ctx.strokeStyle = '#e2e8f0';
          ctx.setLineDash([]);
        } else if (isDropped) {
          ctx.fillStyle = '#f1f5f9';
          ctx.strokeStyle = '#cbd5e1';
          ctx.setLineDash([3, 3]);
        } else {
          ctx.fillStyle = li === 0 ? '#dbeafe' : li === layers.length - 1 ? '#fee2e2' : '#dcfce7';
          ctx.strokeStyle = li === 0 ? '#3b82f6' : li === layers.length - 1 ? '#ef4444' : '#22c55e';
          ctx.setLineDash([]);
        }
        ctx.lineWidth = 2;
        ctx.fill();
        ctx.stroke();
        ctx.setLineDash([]);

        if (val !== undefined && !isDropped && !isFuture) {
          ctx.fillStyle = '#1f2937';
          ctx.font = 'bold 9px sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(val.toFixed(2), x, y);
        }

        if (isDropped) {
          ctx.strokeStyle = '#cbd5e1';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(x - 6, y - 6); ctx.lineTo(x + 6, y + 6);
          ctx.moveTo(x + 6, y - 6); ctx.lineTo(x - 6, y + 6);
          ctx.stroke();
        }
      }
    }

    // layer labels
    ctx.fillStyle = '#6b7280';
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'center';
    const labels = ['Input', ...layers.slice(1, -1).map((_, i) => `Hidden ${i + 1}`), 'Output'];
    positions.forEach((layer, li) => {
      ctx.fillText(labels[li], layer[0].x, H - 8);
    });

    // neuron count labels
    ctx.fillStyle = '#9ca3af';
    ctx.font = '10px sans-serif';
    positions.forEach((layer, li) => {
      ctx.fillText(`(${layers[li]})`, layer[0].x, 12);
    });
  }, [layers, weights, activations, dropout, dropoutMask, animLayer]);

  useEffect(() => { draw(); }, [draw]);

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas || !activations) return;
    const rect = canvas.getBoundingClientRect();
    const mx = (e.clientX - rect.left) * (canvas.width / rect.width);
    const my = (e.clientY - rect.top) * (canvas.height / rect.height);

    for (let li = 0; li < positionsRef.current.length; li++) {
      for (let ni = 0; ni < positionsRef.current[li].length; ni++) {
        const { x, y } = positionsRef.current[li][ni];
        if (Math.hypot(mx - x, my - y) < 16) {
          onHoverNeuron({ layer: li, neuron: ni });
          canvas.style.cursor = 'pointer';
          return;
        }
      }
    }
    onHoverNeuron(null);
    canvas.style.cursor = 'default';
  };

  return (
    <canvas
      ref={canvasRef}
      width={600}
      height={360}
      className="network-canvas"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => onHoverNeuron(null)}
    />
  );
}

/* ─── Stats Bar ─── */
function NetworkStats({ layers, activation, dropout }) {
  const totalParams = layers.reduce((sum, n, i) => {
    if (i === 0) return 0;
    return sum + layers[i - 1] * n + n;
  }, 0);
  const totalNeurons = layers.reduce((a, b) => a + b, 0);

  return (
    <div className="network-stats">
      <div className="stat"><span className="stat-label">Layers</span><span className="stat-value">{layers.length}</span></div>
      <div className="stat"><span className="stat-label">Neurons</span><span className="stat-value">{totalNeurons}</span></div>
      <div className="stat"><span className="stat-label">Parameters</span><span className="stat-value">{totalParams.toLocaleString()}</span></div>
      <div className="stat"><span className="stat-label">Activation</span><span className="stat-value">{ACTIVATIONS[activation].name}</span></div>
      {dropout > 0 && <div className="stat"><span className="stat-label">Dropout</span><span className="stat-value">{(dropout * 100).toFixed(0)}%</span></div>}
    </div>
  );
}

/* ─── Neuron Inspector Tooltip ─── */
function NeuronInspector({ info, layers, activations, weights, activation }) {
  if (!info || !activations) return null;
  const { layer, neuron } = info;
  const val = activations[layer]?.[neuron];
  const layerLabel = layer === 0 ? 'Input' : layer === layers.length - 1 ? 'Output' : `Hidden ${layer}`;

  // compute incoming weighted sums for non-input neurons
  let incoming = null;
  if (layer > 0 && weights[layer - 1]) {
    incoming = activations[layer - 1].map((prevVal, pi) => ({
      from: pi,
      weight: weights[layer - 1][pi]?.[neuron] ?? 0,
      contribution: prevVal * (weights[layer - 1][pi]?.[neuron] ?? 0),
    }));
  }

  return (
    <div className="neuron-inspector">
      <div className="inspector-header">
        <FaMousePointer style={{ marginRight: 4 }} />
        {layerLabel} — Neuron {neuron + 1}
      </div>
      <div className="inspector-val">
        <FaCalculator style={{ marginRight: 4 }} />
        Value: {val !== undefined ? val.toFixed(4) : '—'}
      </div>
      {incoming && (
        <div className="inspector-breakdown">
          <div className="inspector-sub">Incoming connections:</div>
          {incoming.map((c, i) => (
            <div key={i} className="inspector-row">
              <span className="insp-from">n{c.from + 1}</span>
              <span className="insp-w" style={{ color: c.weight >= 0 ? '#2563eb' : '#dc2626' }}>
                w={c.weight.toFixed(3)}
              </span>
              <span className="insp-contrib">
                {c.contribution >= 0 ? '+' : ''}{c.contribution.toFixed(3)}
              </span>
            </div>
          ))}
          <div className="inspector-sub" style={{ marginTop: 4 }}>
            Activation: {ACTIVATIONS[activation].name}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Main Component ─── */
export default function NetworkBuilder() {
  const [hiddenLayers, setHiddenLayers] = useState([4, 3]);
  const [inputSize, setInputSize] = useState(3);
  const [outputSize, setOutputSize] = useState(2);
  const [activation, setActivation] = useState('relu');
  const [dropout, setDropout] = useState(0);
  const [activations, setActivations] = useState(null);
  const [weights, setWeights] = useState([]);
  const [dropoutMask, setDropoutMask] = useState([]);
  const [passCount, setPassCount] = useState(0);
  const [customInputs, setCustomInputs] = useState(null);
  const [animLayer, setAnimLayer] = useState(null);
  const [hoveredNeuron, setHoveredNeuron] = useState(null);
  const [inputMode, setInputMode] = useState('random'); // 'random' | 'custom'
  const animRef = useRef(null);

  const layers = [inputSize, ...hiddenLayers, outputSize];

  const resetWeights = useCallback(() => {
    const l = [inputSize, ...hiddenLayers, outputSize];
    setWeights(initWeights(l));
    setActivations(null);
    setDropoutMask(l.map((n) => Array(n).fill(1)));
    setPassCount(0);
    setAnimLayer(null);
    setCustomInputs(Array(inputSize).fill(0));
  }, [inputSize, hiddenLayers, outputSize]);

  useEffect(() => { resetWeights(); }, [resetWeights]);

  const doForwardPass = (animated) => {
    const input = inputMode === 'custom' && customInputs
      ? customInputs.map(v => +v)
      : Array.from({ length: inputSize }, () => +(Math.random() * 2 - 1).toFixed(2));

    if (inputMode === 'custom') setCustomInputs(input);

    const mask = layers.map((n, li) =>
      Array.from({ length: n }, () =>
        li > 0 && li < layers.length - 1 && Math.random() < dropout ? 0 : 1
      )
    );
    setDropoutMask(mask);

    const acts = forwardPass(input, weights, ACTIVATIONS[activation].fn);
    for (let li = 1; li < acts.length - 1; li++) {
      for (let ni = 0; ni < acts[li].length; ni++) {
        if (mask[li][ni] === 0) acts[li][ni] = 0;
      }
    }

    if (animated) {
      // animate layer by layer
      if (animRef.current) clearInterval(animRef.current);
      setAnimLayer(0);
      setActivations(acts);
      let step = 0;
      animRef.current = setInterval(() => {
        step++;
        if (step > layers.length) {
          clearInterval(animRef.current);
          animRef.current = null;
          setAnimLayer(null);
        } else {
          setAnimLayer(step);
        }
      }, 400);
    } else {
      setAnimLayer(null);
      setActivations(acts);
    }
    setPassCount((c) => c + 1);
  };

  const applyPreset = (preset) => {
    setInputSize(preset.input);
    setHiddenLayers([...preset.hidden]);
    setOutputSize(preset.output);
    setActivation(preset.activation);
  };

  const addLayer = () => {
    if (hiddenLayers.length < MAX_LAYERS) setHiddenLayers([...hiddenLayers, 3]);
  };
  const removeLayer = () => {
    if (hiddenLayers.length > 1) setHiddenLayers(hiddenLayers.slice(0, -1));
  };
  const updateLayer = (idx, delta) => {
    const next = [...hiddenLayers];
    next[idx] = Math.max(MIN_NEURONS, Math.min(MAX_NEURONS, next[idx] + delta));
    setHiddenLayers(next);
  };
  const updateCustomInput = (idx, val) => {
    const next = [...(customInputs || Array(inputSize).fill(0))];
    next[idx] = Math.max(-2, Math.min(2, +val || 0));
    setCustomInputs(next);
  };

  return (
    <div className="network-builder">
      <div className="builder-sidebar">
        <h3 className="sidebar-title"><FaCog style={{ marginRight: 4 }} /> Architecture</h3>

        {/* Presets */}
        <div className="preset-section">
          <label className="config-label">Presets</label>
          <div className="preset-chips">
            {PRESETS.map((p, i) => (
              <button key={i} className="preset-chip" onClick={() => applyPreset(p)}>{p.name}</button>
            ))}
          </div>
        </div>

        <div className="config-group">
          <label>Input neurons</label>
          <div className="stepper">
            <button onClick={() => setInputSize(Math.max(1, inputSize - 1))} aria-label="Decrease input neurons"><FaMinus /></button>
            <span>{inputSize}</span>
            <button onClick={() => setInputSize(Math.min(MAX_NEURONS, inputSize + 1))} aria-label="Increase input neurons"><FaPlus /></button>
          </div>
        </div>

        {hiddenLayers.map((n, i) => (
          <div key={i} className="config-group">
            <label>Hidden {i + 1}</label>
            <div className="stepper">
              <button onClick={() => updateLayer(i, -1)} aria-label={`Decrease hidden layer ${i + 1}`}><FaMinus /></button>
              <span>{n}</span>
              <button onClick={() => updateLayer(i, 1)} aria-label={`Increase hidden layer ${i + 1}`}><FaPlus /></button>
            </div>
          </div>
        ))}

        <div className="layer-actions">
          <button className="small-btn" onClick={addLayer} disabled={hiddenLayers.length >= MAX_LAYERS}><FaPlus /> Layer</button>
          <button className="small-btn" onClick={removeLayer} disabled={hiddenLayers.length <= 1}><FaMinus /> Layer</button>
        </div>

        <div className="config-group">
          <label>Output neurons</label>
          <div className="stepper">
            <button onClick={() => setOutputSize(Math.max(1, outputSize - 1))} aria-label="Decrease output neurons"><FaMinus /></button>
            <span>{outputSize}</span>
            <button onClick={() => setOutputSize(Math.min(MAX_NEURONS, outputSize + 1))} aria-label="Increase output neurons"><FaPlus /></button>
          </div>
        </div>

        <div className="config-group">
          <label>Activation</label>
          <select value={activation} onChange={(e) => setActivation(e.target.value)}>
            {Object.entries(ACTIVATIONS).map(([k, a]) => (
              <option key={k} value={k}>{a.name}</option>
            ))}
          </select>
        </div>

        <div className="config-group">
          <label>Dropout: {(dropout * 100).toFixed(0)}%</label>
          <input type="range" min="0" max="0.5" step="0.05" value={dropout} onChange={(e) => setDropout(+e.target.value)} aria-label="Dropout rate" />
        </div>

        {/* Input mode */}
        <div className="config-group">
          <label>Input values</label>
          <div className="input-mode-toggle">
            <button className={`mode-btn ${inputMode === 'random' ? 'active' : ''}`} onClick={() => setInputMode('random')}>Random</button>
            <button className={`mode-btn ${inputMode === 'custom' ? 'active' : ''}`} onClick={() => setInputMode('custom')}>Custom</button>
          </div>
        </div>

        {inputMode === 'custom' && (
          <div className="custom-inputs">
            {Array.from({ length: inputSize }, (_, i) => (
              <div key={i} className="custom-input-row">
                <label>x{i + 1}</label>
                <input
                  type="number"
                  step="0.1"
                  min="-2"
                  max="2"
                  value={customInputs?.[i] ?? 0}
                  onChange={(e) => updateCustomInput(i, e.target.value)}
                  className="custom-input-field"
                />
              </div>
            ))}
          </div>
        )}

        <div className="action-btns">
          <button className="run-btn" onClick={() => doForwardPass(false)}><FaPlay /> Run</button>
          <button className="run-btn animate-btn" onClick={() => doForwardPass(true)}><FaStepForward /> Animate</button>
        </div>
        <button className="reset-btn-full" onClick={resetWeights}><FaRedo /> Reset Weights</button>

        {passCount > 0 && (
          <div className="pass-counter"><FaInfoCircle /> {passCount} pass{passCount !== 1 ? 'es' : ''} run</div>
        )}
      </div>

      <div className="builder-main">
        <NetworkStats layers={layers} activation={activation} dropout={dropout} />

        <div className="canvas-wrapper">
          <NetworkCanvas
            layers={layers}
            weights={weights}
            activations={activations}
            dropout={dropout}
            dropoutMask={dropoutMask}
            animLayer={animLayer}
            onHoverNeuron={setHoveredNeuron}
          />
          {hoveredNeuron && (
            <NeuronInspector
              info={hoveredNeuron}
              layers={layers}
              activations={activations}
              weights={weights}
              activation={activation}
            />
          )}
        </div>

        <div className="builder-hint">
          <FaLightbulb className="hint-icon" />
          <div>
            <p className="hint-title">How to use</p>
            <p className="hint-text">
              Pick a preset or build your own architecture. Use Custom inputs to set specific values, or Random for quick tests.
              Click Animate to watch data flow layer-by-layer. Hover over any neuron to inspect its value and incoming connections.
              Blue connections = positive weights, red = negative. Thicker = stronger.
            </p>
          </div>
        </div>

        <div className="builder-reference">
          <FaArrowRight className="ref-icon" />
          <div>
            <p className="ref-title">Want to learn how weights are updated?</p>
            <p className="ref-text">
              This builder shows forward propagation — how data flows through the network using current weights.
              To see the full picture of how weights are <strong>calculated and updated</strong> through
              backpropagation (loss computation, gradient calculation, weight updates via the chain rule),
              check out the <a href="../nn-trainer/" className="ref-link">Neural Network Trainer</a> (COMPSCI 714 · Week 2)
              for a detailed step-by-step walkthrough.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

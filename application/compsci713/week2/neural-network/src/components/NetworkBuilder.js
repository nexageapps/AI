import React, { useState, useCallback, useRef, useEffect } from 'react';
import { ACTIVATIONS } from '../neuralNet';
import { FaPlus, FaMinus, FaPlay, FaRedo, FaLightbulb, FaInfoCircle } from 'react-icons/fa';
import './NetworkBuilder.css';

const MAX_LAYERS = 5;
const MAX_NEURONS = 8;
const MIN_NEURONS = 1;

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


function NetworkCanvas({ layers, weights, activations, dropout, dropoutMask }) {
  const canvasRef = useRef(null);

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

    // connections
    for (let li = 0; li < positions.length - 1; li++) {
      for (let ni = 0; ni < positions[li].length; ni++) {
        for (let ni2 = 0; ni2 < positions[li + 1].length; ni2++) {
          const w = weights[li]?.[ni]?.[ni2] ?? 0;
          const isDropped =
            dropout > 0 && dropoutMask[li + 1]?.[ni2] === 0 && li + 1 < layers.length - 1;
          ctx.strokeStyle = isDropped
            ? '#e5e7eb'
            : w > 0
            ? `rgba(37,99,235,${Math.min(Math.abs(w), 1)})`
            : `rgba(220,38,38,${Math.min(Math.abs(w), 1)})`;
          ctx.lineWidth = Math.max(0.5, Math.abs(w) * 2.5);
          ctx.beginPath();
          ctx.moveTo(positions[li][ni].x, positions[li][ni].y);
          ctx.lineTo(positions[li + 1][ni2].x, positions[li + 1][ni2].y);
          ctx.stroke();
        }
      }
    }

    // neurons
    for (let li = 0; li < positions.length; li++) {
      for (let ni = 0; ni < positions[li].length; ni++) {
        const { x, y } = positions[li][ni];
        const val = activations?.[li]?.[ni];
        const isDropped =
          dropout > 0 && dropoutMask[li]?.[ni] === 0 && li > 0 && li < layers.length - 1;

        ctx.beginPath();
        ctx.arc(x, y, 14, 0, Math.PI * 2);
        if (isDropped) {
          ctx.fillStyle = '#f1f5f9';
          ctx.strokeStyle = '#cbd5e1';
          ctx.setLineDash([3, 3]);
        } else {
          ctx.fillStyle =
            li === 0 ? '#dbeafe' : li === layers.length - 1 ? '#fee2e2' : '#dcfce7';
          ctx.strokeStyle =
            li === 0 ? '#3b82f6' : li === layers.length - 1 ? '#ef4444' : '#22c55e';
          ctx.setLineDash([]);
        }
        ctx.lineWidth = 2;
        ctx.fill();
        ctx.stroke();
        ctx.setLineDash([]);

        if (val !== undefined && !isDropped) {
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
  }, [layers, weights, activations, dropout, dropoutMask]);

  useEffect(() => { draw(); }, [draw]);

  return <canvas ref={canvasRef} width={600} height={360} className="network-canvas" />;
}


function NetworkStats({ layers, activation, dropout }) {
  const totalParams = layers.reduce((sum, n, i) => {
    if (i === 0) return 0;
    return sum + layers[i - 1] * n + n; // weights + biases
  }, 0);
  const totalNeurons = layers.reduce((a, b) => a + b, 0);

  return (
    <div className="network-stats">
      <div className="stat">
        <span className="stat-label">Layers</span>
        <span className="stat-value">{layers.length}</span>
      </div>
      <div className="stat">
        <span className="stat-label">Neurons</span>
        <span className="stat-value">{totalNeurons}</span>
      </div>
      <div className="stat">
        <span className="stat-label">Parameters</span>
        <span className="stat-value">{totalParams.toLocaleString()}</span>
      </div>
      <div className="stat">
        <span className="stat-label">Activation</span>
        <span className="stat-value">{ACTIVATIONS[activation].name}</span>
      </div>
      {dropout > 0 && (
        <div className="stat">
          <span className="stat-label">Dropout</span>
          <span className="stat-value">{(dropout * 100).toFixed(0)}%</span>
        </div>
      )}
    </div>
  );
}

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

  const layers = [inputSize, ...hiddenLayers, outputSize];

  const resetWeights = useCallback(() => {
    const l = [inputSize, ...hiddenLayers, outputSize];
    setWeights(initWeights(l));
    setActivations(null);
    setDropoutMask(l.map((n) => Array(n).fill(1)));
    setPassCount(0);
  }, [inputSize, hiddenLayers, outputSize]);

  useEffect(() => { resetWeights(); }, [resetWeights]);

  const runForward = () => {
    const input = Array.from({ length: inputSize }, () => +(Math.random() * 2 - 1).toFixed(2));
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
    setActivations(acts);
    setPassCount((c) => c + 1);
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

  return (
    <div className="network-builder">
      <div className="builder-sidebar">
        <h3 className="sidebar-title">Network Architecture</h3>

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
          <button className="small-btn" onClick={addLayer} disabled={hiddenLayers.length >= MAX_LAYERS}>
            <FaPlus /> Layer
          </button>
          <button className="small-btn" onClick={removeLayer} disabled={hiddenLayers.length <= 1}>
            <FaMinus /> Layer
          </button>
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
          <input
            type="range" min="0" max="0.5" step="0.05"
            value={dropout}
            onChange={(e) => setDropout(+e.target.value)}
            aria-label="Dropout rate"
          />
        </div>

        <div className="action-btns">
          <button className="run-btn" onClick={runForward}><FaPlay /> Forward Pass</button>
          <button className="reset-btn" onClick={resetWeights}><FaRedo /> Reset</button>
        </div>

        {passCount > 0 && (
          <div className="pass-counter">
            <FaInfoCircle /> {passCount} pass{passCount !== 1 ? 'es' : ''} run
          </div>
        )}
      </div>

      <div className="builder-main">
        <NetworkStats layers={layers} activation={activation} dropout={dropout} />

        <NetworkCanvas
          layers={layers}
          weights={weights}
          activations={activations}
          dropout={dropout}
          dropoutMask={dropoutMask}
        />

        <div className="builder-hint">
          <FaLightbulb className="hint-icon" />
          <div>
            <p className="hint-title">How to use</p>
            <p className="hint-text">
              Adjust the architecture on the left, then click Forward Pass to send random inputs
              through the network. Blue connections = positive weights, red = negative. Thicker
              lines = stronger weights. Enable dropout to see neurons randomly deactivated (shown
              with dashed outlines and X marks).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

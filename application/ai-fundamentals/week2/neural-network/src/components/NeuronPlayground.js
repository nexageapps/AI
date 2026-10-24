import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  FaLightbulb,
  FaArrowRight,
  FaCheckCircle,
  FaTimesCircle,
  FaSlidersH,
  FaBolt,
} from 'react-icons/fa';
import { ACTIVATIONS } from '../neuralNet';
import './NeuronPlayground.css';

const SCENARIOS = [
  {
    title: 'Should I bring an umbrella?',
    inputs: [
      { label: 'Is it cloudy?', name: 'cloudy' },
      { label: 'Did the forecast say rain?', name: 'forecast' },
      { label: 'Is it windy?', name: 'windy' },
    ],
    weights: [0.6, 0.8, 0.3],
    bias: -0.5,
    threshold: 0.5,
    yesText: 'Bring an umbrella!',
    noText: 'No umbrella needed.',
  },
  {
    title: 'Will the dog be happy?',
    inputs: [
      { label: 'Going for a walk?', name: 'walk' },
      { label: 'Giving treats?', name: 'treats' },
      { label: 'Playing fetch?', name: 'fetch' },
    ],
    weights: [0.7, 0.5, 0.6],
    bias: -0.3,
    threshold: 0.5,
    yesText: 'Happy dog!',
    noText: 'Dog is bored.',
  },
  {
    title: 'Should I study more?',
    inputs: [
      { label: 'Exam tomorrow?', name: 'exam' },
      { label: 'Feeling confused?', name: 'confused' },
      { label: 'Low practice score?', name: 'lowscore' },
    ],
    weights: [0.9, 0.5, 0.6],
    bias: -0.4,
    threshold: 0.5,
    yesText: 'Time to study!',
    noText: 'You are prepared.',
  },
];


function NeuronDiagram({ inputs, weights, bias, activation, output, fired }) {
  const canvasRef = useRef(null);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    const neuronX = W * 0.6;
    const neuronY = H / 2;
    const neuronR = 32;
    const inputX = 40;
    const outputX = W - 50;
    const count = inputs.length;

    // input nodes
    const inputPositions = inputs.map((_, i) => ({
      x: inputX,
      y: (H / (count + 1)) * (i + 1),
    }));

    // connections from inputs to neuron
    inputPositions.forEach((pos, i) => {
      const w = weights[i];
      ctx.strokeStyle = w >= 0
        ? `rgba(37,99,235,${Math.min(Math.abs(w) + 0.2, 1)})`
        : `rgba(220,38,38,${Math.min(Math.abs(w) + 0.2, 1)})`;
      ctx.lineWidth = Math.max(1, Math.abs(w) * 4);
      ctx.beginPath();
      ctx.moveTo(pos.x + 16, pos.y);
      ctx.lineTo(neuronX - neuronR, neuronY);
      ctx.stroke();

      // weight label
      ctx.fillStyle = '#6b7280';
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'center';
      const midX = (pos.x + 16 + neuronX - neuronR) / 2;
      const midY = (pos.y + neuronY) / 2 - 6;
      ctx.fillText(`w=${w.toFixed(1)}`, midX, midY);
    });

    // input circles
    inputPositions.forEach((pos, i) => {
      const val = inputs[i];
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 16, 0, Math.PI * 2);
      ctx.fillStyle = val > 0.5 ? '#dbeafe' : '#f1f5f9';
      ctx.strokeStyle = val > 0.5 ? '#3b82f6' : '#cbd5e1';
      ctx.lineWidth = 2;
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#1f2937';
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(val.toFixed(1), pos.x, pos.y);
    });

    // neuron body
    const gradient = ctx.createRadialGradient(neuronX, neuronY, 0, neuronX, neuronY, neuronR);
    if (fired) {
      gradient.addColorStop(0, '#fef08a');
      gradient.addColorStop(1, '#fbbf24');
    } else {
      gradient.addColorStop(0, '#f1f5f9');
      gradient.addColorStop(1, '#e2e8f0');
    }
    ctx.beginPath();
    ctx.arc(neuronX, neuronY, neuronR, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.strokeStyle = fired ? '#f59e0b' : '#94a3b8';
    ctx.lineWidth = 3;
    ctx.stroke();

    // activation label inside neuron
    ctx.fillStyle = '#1f2937';
    ctx.font = 'bold 10px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(activation, neuronX, neuronY - 8);
    ctx.font = 'bold 12px sans-serif';
    ctx.fillText(output !== null ? output.toFixed(3) : '?', neuronX, neuronY + 10);

    // bias label
    ctx.fillStyle = '#9ca3af';
    ctx.font = '10px sans-serif';
    ctx.fillText(`bias=${bias.toFixed(1)}`, neuronX, neuronY + neuronR + 14);

    // output connection
    ctx.strokeStyle = fired ? '#f59e0b' : '#cbd5e1';
    ctx.lineWidth = fired ? 3 : 1.5;
    ctx.beginPath();
    ctx.moveTo(neuronX + neuronR, neuronY);
    ctx.lineTo(outputX - 16, neuronY);
    ctx.stroke();

    // output node
    ctx.beginPath();
    ctx.arc(outputX, neuronY, 16, 0, Math.PI * 2);
    ctx.fillStyle = fired ? '#dcfce7' : '#fee2e2';
    ctx.strokeStyle = fired ? '#22c55e' : '#ef4444';
    ctx.lineWidth = 2;
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = fired ? '#16a34a' : '#dc2626';
    ctx.font = 'bold 10px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(fired ? 'YES' : 'NO', outputX, neuronY);
  }, [inputs, weights, bias, activation, output, fired]);

  useEffect(() => { draw(); }, [draw]);

  return <canvas ref={canvasRef} width={480} height={240} className="neuron-canvas" />;
}


export default function NeuronPlayground() {
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [inputValues, setInputValues] = useState([0, 0, 0]);
  const [activation, setActivation] = useState('sigmoid');
  const [customWeights, setCustomWeights] = useState(null);
  const [customBias, setCustomBias] = useState(null);
  const [showWeights, setShowWeights] = useState(false);

  const scenario = SCENARIOS[scenarioIdx];
  const weights = customWeights || scenario.weights;
  const bias = customBias !== null ? customBias : scenario.bias;

  // compute
  let z = bias;
  for (let i = 0; i < inputValues.length; i++) {
    z += inputValues[i] * weights[i];
  }
  const actFn = ACTIVATIONS[activation].fn;
  const output = actFn(z);
  const fired = output >= scenario.threshold;

  const toggleInput = (idx) => {
    const next = [...inputValues];
    next[idx] = next[idx] > 0.5 ? 0 : 1;
    setInputValues(next);
  };

  const changeScenario = (idx) => {
    setScenarioIdx(idx);
    setInputValues([0, 0, 0]);
    setCustomWeights(null);
    setCustomBias(null);
  };

  const updateWeight = (idx, val) => {
    const w = customWeights ? [...customWeights] : [...scenario.weights];
    w[idx] = val;
    setCustomWeights(w);
  };

  return (
    <div className="neuron-playground">
      <div className="np-sidebar">
        <h3 className="np-sidebar-title">
          <FaLightbulb style={{ marginRight: 6 }} /> Pick a Scenario
        </h3>
        {SCENARIOS.map((s, i) => (
          <button
            key={i}
            className={`np-scenario-btn ${scenarioIdx === i ? 'active' : ''}`}
            onClick={() => changeScenario(i)}
          >
            {s.title}
          </button>
        ))}

        <div className="np-divider" />

        <h3 className="np-sidebar-title">
          <FaSlidersH style={{ marginRight: 6 }} /> Inputs
        </h3>
        {scenario.inputs.map((inp, i) => (
          <button
            key={inp.name}
            className={`np-input-btn ${inputValues[i] > 0.5 ? 'on' : 'off'}`}
            onClick={() => toggleInput(i)}
          >
            <span className="np-input-indicator">
              {inputValues[i] > 0.5 ? <FaCheckCircle /> : <FaTimesCircle />}
            </span>
            <span className="np-input-label">{inp.label}</span>
            <span className="np-input-val">{inputValues[i] > 0.5 ? 'YES' : 'NO'}</span>
          </button>
        ))}

        <div className="np-divider" />

        <div className="np-config">
          <label>Activation</label>
          <select value={activation} onChange={(e) => setActivation(e.target.value)}>
            <option value="sigmoid">Sigmoid</option>
            <option value="relu">ReLU</option>
            <option value="tanh">Tanh</option>
          </select>
        </div>

        <button
          className="np-toggle-weights"
          onClick={() => setShowWeights(!showWeights)}
        >
          <FaBolt style={{ marginRight: 4 }} />
          {showWeights ? 'Hide' : 'Show'} weight controls
        </button>

        {showWeights && (
          <div className="np-weight-controls">
            {weights.map((w, i) => (
              <div key={i} className="np-weight-row">
                <label>w{i + 1}: {w.toFixed(2)}</label>
                <input
                  type="range" min="-1" max="1" step="0.05"
                  value={w}
                  onChange={(e) => updateWeight(i, +e.target.value)}
                />
              </div>
            ))}
            <div className="np-weight-row">
              <label>bias: {bias.toFixed(2)}</label>
              <input
                type="range" min="-2" max="2" step="0.1"
                value={bias}
                onChange={(e) => setCustomBias(+e.target.value)}
              />
            </div>
          </div>
        )}
      </div>

      <div className="np-main">
        <div className="np-question">{scenario.title}</div>

        <NeuronDiagram
          inputs={inputValues}
          weights={weights}
          bias={bias}
          activation={ACTIVATIONS[activation].name}
          output={output}
          fired={fired}
        />

        <div className={`np-result ${fired ? 'yes' : 'no'}`}>
          <span className="np-result-icon">
            {fired ? <FaCheckCircle /> : <FaTimesCircle />}
          </span>
          <div>
            <div className="np-result-label">The neuron says:</div>
            <div className="np-result-text">
              {fired ? scenario.yesText : scenario.noText}
            </div>
          </div>
          <div className="np-result-value">
            Output: {output.toFixed(3)}
          </div>
        </div>

        <div className="np-explanation">
          <FaArrowRight className="np-exp-icon" />
          <div>
            <p className="np-exp-title">What just happened?</p>
            <p className="np-exp-text">
              The neuron multiplied each input (0 or 1) by its weight, added them up
              with the bias ({bias.toFixed(1)}), then passed the total ({z.toFixed(2)}) through
              the <strong>{ACTIVATIONS[activation].name}</strong> function to get {output.toFixed(3)}.
              {fired
                ? ` Since ${output.toFixed(3)} >= ${scenario.threshold}, the answer is YES!`
                : ` Since ${output.toFixed(3)} < ${scenario.threshold}, the answer is NO.`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

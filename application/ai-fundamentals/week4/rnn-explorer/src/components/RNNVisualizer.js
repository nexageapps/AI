import React, { useState, useEffect, useCallback } from 'react';
import {
  FaPlay, FaPause, FaRedo, FaStepForward, FaInfoCircle,
  FaFont, FaCloudSun, FaMusic, FaArrowRight, FaArrowDown,
  FaCog, FaDatabase, FaMemory, FaChartLine,
} from 'react-icons/fa';
import './RNNVisualizer.css';

const SEQUENCES = [
  {
    id: 'text',
    label: 'Text Prediction',
    icon: FaFont,
    inputs: ['The', 'cat', 'sat', 'on', 'the'],
    outputs: ['cat', 'sat', 'on', 'the', 'mat'],
    description: 'Predict the next word in a sentence. The hidden state accumulates context from each word.',
  },
  {
    id: 'weather',
    label: 'Weather Forecast',
    icon: FaCloudSun,
    inputs: ['25C', '22C', '18C', '16C', '19C'],
    outputs: ['22C', '18C', '16C', '19C', '23C'],
    description: 'Forecast temperature from past days. The RNN learns temporal patterns in the data.',
  },
  {
    id: 'music',
    label: 'Music Notes',
    icon: FaMusic,
    inputs: ['C4', 'E4', 'G4', 'E4', 'C4'],
    outputs: ['E4', 'G4', 'E4', 'C4', 'E4'],
    description: 'Predict the next note in a melody. Musical patterns have strong sequential dependencies.',
  },
];

const CELL_TYPES = [
  { id: 'rnn', label: 'Simple RNN', color: '#3b82f6', desc: 'Basic recurrence with tanh activation' },
  { id: 'lstm', label: 'LSTM', color: '#8b5cf6', desc: 'Long Short-Term Memory with 3 gates' },
  { id: 'gru', label: 'GRU', color: '#06b6d4', desc: 'Gated Recurrent Unit with 2 gates' },
];

function tanh(x) { return Math.tanh(x); }
function sigmoid(x) { return 1 / (1 + Math.exp(-x)); }

function RNNVisualizer() {
  const [selectedSeq, setSelectedSeq] = useState(0);
  const [cellType, setCellType] = useState('rnn');
  const [currentStep, setCurrentStep] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hiddenStates, setHiddenStates] = useState([]);
  const [speed, setSpeed] = useState(1000);
  const [showWeights, setShowWeights] = useState(false);

  const seq = SEQUENCES[selectedSeq];
  const totalSteps = seq.inputs.length;

  const computeHiddenStates = useCallback(() => {
    const states = [];
    let h = 0;
    for (let t = 0; t < totalSteps; t++) {
      const x = (t + 1) / totalSteps;
      if (cellType === 'rnn') {
        h = tanh(0.5 * h + 0.8 * x);
      } else if (cellType === 'lstm') {
        const f = sigmoid(0.7 * h + 0.3 * x);
        const i = sigmoid(0.4 * h + 0.6 * x);
        const c = f * h + i * tanh(0.5 * x);
        h = sigmoid(0.5 * h + 0.5 * x) * tanh(c);
      } else {
        const z = sigmoid(0.6 * h + 0.4 * x);
        const r = sigmoid(0.5 * h + 0.5 * x);
        h = (1 - z) * h + z * tanh(r * h + x);
      }
      states.push(Math.abs(h));
    }
    return states;
  }, [cellType, totalSteps]);

  useEffect(() => {
    setHiddenStates(computeHiddenStates());
  }, [computeHiddenStates]);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= totalSteps - 1) { setIsPlaying(false); return prev; }
        return prev + 1;
      });
    }, speed);
    return () => clearInterval(timer);
  }, [isPlaying, totalSteps, speed]);

  const reset = () => { setCurrentStep(-1); setIsPlaying(false); };
  const stepForward = () => { if (currentStep < totalSteps - 1) setCurrentStep(p => p + 1); };
  const cellInfo = CELL_TYPES.find(c => c.id === cellType);
  const SeqIcon = SEQUENCES[selectedSeq].icon;

  return (
    <div className="rnn-viz">
      <div className="viz-controls">
        <div className="seq-selector">
          {SEQUENCES.map((s, i) => {
            const Icon = s.icon;
            return (
              <button key={s.id} className={`seq-btn ${selectedSeq === i ? 'active' : ''}`}
                onClick={() => { setSelectedSeq(i); reset(); }}>
                <Icon className="seq-btn-icon" />
                <span className="seq-btn-label">{s.label}</span>
              </button>
            );
          })}
        </div>
        <div className="cell-selector">
          {CELL_TYPES.map(c => (
            <button key={c.id}
              className={`cell-btn ${cellType === c.id ? 'active' : ''}`}
              style={cellType === c.id ? { background: c.color, borderColor: c.color } : {}}
              onClick={() => { setCellType(c.id); reset(); }}
              title={c.desc}>
              {c.label}
            </button>
          ))}
        </div>
        <button className={`toggle-weights-btn ${showWeights ? 'active' : ''}`}
          onClick={() => setShowWeights(!showWeights)} title="Show/hide weight details">
          <FaCog /> Weights
        </button>
      </div>

      <div className="viz-description">
        <SeqIcon style={{ marginRight: 6, color: '#00467F' }} />
        {seq.description} — using <strong style={{ color: cellInfo.color }}>{cellInfo.label}</strong>
      </div>

      {showWeights && (
        <div className="weight-info-panel">
          <FaInfoCircle style={{ color: '#00467F', flexShrink: 0 }} />
          <div className="weight-info-content">
            {cellType === 'rnn' && <span>Simple RNN shares weights W_h (hidden-to-hidden) and W_x (input-to-hidden) across all time steps. Single tanh activation.</span>}
            {cellType === 'lstm' && <span>LSTM has 4 weight matrices per gate: W_f (forget), W_i (input), W_o (output), W_c (candidate). Each gate uses sigmoid except candidate which uses tanh. Total: 4 x (hidden + input) x hidden parameters.</span>}
            {cellType === 'gru' && <span>GRU has 3 weight matrices: W_z (update), W_r (reset), W_h (candidate). Fewer parameters than LSTM. Total: 3 x (hidden + input) x hidden parameters.</span>}
          </div>
        </div>
      )}

      <div className="unrolled-rnn">
        {seq.inputs.map((input, t) => {
          const isActive = t <= currentStep;
          const isCurrent = t === currentStep;
          return (
            <div key={t} className={`rnn-timestep ${isActive ? 'active' : ''} ${isCurrent ? 'current' : ''}`}>
              <div className="ts-label">t={t}</div>
              <div className="ts-input">
                <FaDatabase className="ts-input-icon" /> {input}
              </div>
              <FaArrowDown className="ts-arrow-icon" />
              <div className="ts-cell"
                style={{
                  borderColor: isActive ? cellInfo.color : '#d1d5db',
                  background: isActive ? `${cellInfo.color}12` : '#f9fafb',
                }}>
                <div className="ts-cell-label" style={{ color: isActive ? cellInfo.color : '#9ca3af' }}>
                  {cellInfo.label}
                </div>
                {isActive && (
                  <div className="ts-hidden-val">
                    <FaMemory className="ts-mem-icon" />
                    h<sub>{t}</sub> = {hiddenStates[t]?.toFixed(3) || '0'}
                  </div>
                )}
                {cellType === 'lstm' && isActive && (
                  <div className="ts-gates-mini">
                    <span className="gate-dot forget" title="Forget gate">F</span>
                    <span className="gate-dot input" title="Input gate">I</span>
                    <span className="gate-dot output" title="Output gate">O</span>
                  </div>
                )}
                {cellType === 'gru' && isActive && (
                  <div className="ts-gates-mini">
                    <span className="gate-dot update" title="Update gate">Z</span>
                    <span className="gate-dot reset" title="Reset gate">R</span>
                  </div>
                )}
              </div>
              <FaArrowDown className="ts-arrow-icon" />
              <div className={`ts-output ${isActive ? 'visible' : ''}`}>
                {isActive ? seq.outputs[t] : '?'}
              </div>
              {t < seq.inputs.length - 1 && (
                <div className={`ts-arrow-right ${isActive ? 'active' : ''}`}
                  style={{ color: isActive ? cellInfo.color : '#d1d5db' }}>
                  <FaArrowRight />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="hidden-state-bar">
        <span className="hsb-label">
          <FaChartLine style={{ marginRight: 4 }} /> Hidden State Magnitude Over Time
        </span>
        <div className="hsb-bars">
          {hiddenStates.map((val, i) => (
            <div key={i} className="hsb-bar-wrap" title={`t${i}: ${val.toFixed(4)}`}>
              <div className="hsb-bar"
                style={{
                  height: `${val * 100}%`,
                  background: i <= currentStep ? cellInfo.color : '#e5e7eb',
                  opacity: i <= currentStep ? 1 : 0.4,
                }} />
              <span className="hsb-step">t{i}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="playback-controls">
        <button className="play-btn" onClick={reset} title="Reset"><FaRedo /></button>
        <button className="play-btn" onClick={stepForward} title="Step forward"
          disabled={currentStep >= totalSteps - 1}><FaStepForward /></button>
        <button className={`play-btn primary ${isPlaying ? 'playing' : ''}`}
          onClick={() => { if (currentStep >= totalSteps - 1) reset(); setIsPlaying(!isPlaying); }}
          title={isPlaying ? 'Pause' : 'Play'}>
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <div className="speed-control">
          <label>Speed:</label>
          <input type="range" min={200} max={2000} step={100}
            value={2200 - speed} onChange={e => setSpeed(2200 - Number(e.target.value))}
            aria-label="Playback speed" />
        </div>
      </div>

      <div className="viz-legend">
        <div className="legend-item">
          <span className="legend-dot" style={{ background: '#3b82f6' }} />
          <span>Simple RNN: h<sub>t</sub> = tanh(W<sub>h</sub>h<sub>t-1</sub> + W<sub>x</sub>x<sub>t</sub>)</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot" style={{ background: '#8b5cf6' }} />
          <span>LSTM: 3 gates (forget, input, output) + cell state</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot" style={{ background: '#06b6d4' }} />
          <span>GRU: 2 gates (update, reset) — simpler than LSTM</span>
        </div>
      </div>
    </div>
  );
}

export default RNNVisualizer;

import React, { useState, useEffect, useCallback } from 'react';
import {
  FaPlay, FaPause, FaRedo, FaStepForward, FaInfoCircle,
  FaArrowRight, FaArrowDown, FaArrowLeft, FaLightbulb,
  FaChartLine,
} from 'react-icons/fa';
import './BPTTVisualizer.css';

const STEPS = 5;

function BPTTVisualizer() {
  const [phase, setPhase] = useState('idle'); // idle, forward, backward
  const [currentStep, setCurrentStep] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(800);
  const [truncateAt, setTruncateAt] = useState(STEPS);
  const [showGradAccum, setShowGradAccum] = useState(false);

  const inputs = ['x0', 'x1', 'x2', 'x3', 'x4'];
  const targets = ['y0', 'y1', 'y2', 'y3', 'y4'];

  const totalForwardSteps = STEPS;
  const totalBackwardSteps = Math.min(truncateAt, STEPS);
  const totalAnimSteps = totalForwardSteps + totalBackwardSteps;

  const forwardDone = currentStep >= totalForwardSteps - 1;
  const backwardStart = totalForwardSteps;
  const backwardStep = currentStep >= backwardStart ? currentStep - backwardStart : -1;

  const gradAccum = [];
  for (let i = 0; i <= backwardStep; i++) {
    const magnitude = Math.pow(0.85, i);
    gradAccum.push(magnitude);
  }
  const totalGrad = gradAccum.reduce((s, g) => s + g, 0);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= totalAnimSteps - 1) { setIsPlaying(false); return prev; }
        const next = prev + 1;
        if (next < totalForwardSteps) setPhase('forward');
        else setPhase('backward');
        return next;
      });
    }, speed);
    return () => clearInterval(timer);
  }, [isPlaying, totalAnimSteps, totalForwardSteps, speed]);

  const reset = useCallback(() => {
    setCurrentStep(-1);
    setPhase('idle');
    setIsPlaying(false);
  }, []);

  const stepForward = () => {
    if (currentStep >= totalAnimSteps - 1) return;
    const next = currentStep + 1;
    setCurrentStep(next);
    setPhase(next < totalForwardSteps ? 'forward' : 'backward');
  };

  return (
    <div className="bptt-viz">
      <div className="bptt-intro">
        <FaInfoCircle style={{ color: '#00467F', flexShrink: 0 }} />
        <span>
          Backpropagation Through Time (BPTT) unrolls the RNN and computes gradients backward through each time step.
          Watch the forward pass propagate inputs, then the backward pass flow gradients back to update weights.
        </span>
      </div>

      <div className="bptt-controls">
        <div className="bptt-truncate">
          <label>Truncation depth: {truncateAt === STEPS ? 'Full BPTT' : `${truncateAt} steps`}</label>
          <input type="range" min={1} max={STEPS} value={truncateAt}
            onChange={e => { setTruncateAt(Number(e.target.value)); reset(); }}
            aria-label="Truncation depth" style={{ accentColor: '#00467F' }} />
          <div className="bptt-truncate-labels"><span>Truncated (1)</span><span>Full ({STEPS})</span></div>
        </div>
        <label className="bptt-checkbox">
          <input type="checkbox" checked={showGradAccum} onChange={e => setShowGradAccum(e.target.checked)} />
          Show gradient accumulation
        </label>
      </div>

      <div className="bptt-phase-indicator">
        <span className={`bptt-phase ${phase === 'forward' ? 'active' : ''}`}>
          <FaArrowRight /> Forward Pass
        </span>
        <span className={`bptt-phase ${phase === 'backward' ? 'active' : ''}`}>
          <FaArrowLeft /> Backward Pass (BPTT)
        </span>
      </div>

      <div className="bptt-diagram">
        {/* Input row */}
        <div className="bptt-row bptt-input-row">
          <div className="bptt-row-label">Input</div>
          {inputs.map((inp, t) => {
            const isForwardActive = phase !== 'idle' && t <= Math.min(currentStep, totalForwardSteps - 1);
            return (
              <div key={t} className={`bptt-node input-node ${isForwardActive ? 'active' : ''}`}>
                {inp}
              </div>
            );
          })}
        </div>

        {/* Forward arrows */}
        <div className="bptt-row bptt-arrow-row">
          <div className="bptt-row-label" />
          {inputs.map((_, t) => {
            const isActive = phase !== 'idle' && t <= Math.min(currentStep, totalForwardSteps - 1);
            return <FaArrowDown key={t} className={`bptt-arrow-icon ${isActive ? 'active-arrow' : ''}`} />;
          })}
        </div>

        {/* Hidden state row */}
        <div className="bptt-row bptt-hidden-row">
          <div className="bptt-row-label">Hidden</div>
          {inputs.map((_, t) => {
            const isForwardActive = phase !== 'idle' && t <= Math.min(currentStep, totalForwardSteps - 1);
            const backIdx = STEPS - 1 - t;
            const isBackwardActive = phase === 'backward' && backIdx <= backwardStep && backIdx < truncateAt;
            return (
              <React.Fragment key={t}>
                <div className={`bptt-node hidden-node ${isForwardActive ? 'forward-active' : ''} ${isBackwardActive ? 'backward-active' : ''}`}>
                  h{t}
                  {isBackwardActive && <span className="bptt-grad-badge">dh{t}</span>}
                </div>
                {t < STEPS - 1 && (
                  <div className="bptt-h-arrow-wrap">
                    {isForwardActive && t < Math.min(currentStep, totalForwardSteps - 1) && (
                      <FaArrowRight className="bptt-h-arrow forward-arrow" />
                    )}
                    {phase === 'backward' && (() => {
                      const bIdx = STEPS - 2 - t;
                      return bIdx >= 0 && bIdx < backwardStep && bIdx < truncateAt - 1;
                    })() && (
                      <FaArrowLeft className="bptt-h-arrow backward-arrow" />
                    )}
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Output arrows */}
        <div className="bptt-row bptt-arrow-row">
          <div className="bptt-row-label" />
          {inputs.map((_, t) => {
            const isActive = phase !== 'idle' && t <= Math.min(currentStep, totalForwardSteps - 1);
            return <FaArrowDown key={t} className={`bptt-arrow-icon ${isActive ? 'active-arrow' : ''}`} />;
          })}
        </div>

        {/* Output row */}
        <div className="bptt-row bptt-output-row">
          <div className="bptt-row-label">Output</div>
          {targets.map((tgt, t) => {
            const isActive = phase !== 'idle' && t <= Math.min(currentStep, totalForwardSteps - 1);
            return (
              <div key={t} className={`bptt-node output-node ${isActive ? 'active' : ''}`}>
                {tgt}
              </div>
            );
          })}
        </div>

        {/* Loss row */}
        <div className="bptt-row bptt-loss-row">
          <div className="bptt-row-label">Loss</div>
          {targets.map((_, t) => {
            const isActive = forwardDone && t <= Math.min(currentStep, totalForwardSteps - 1);
            const isBackSource = phase === 'backward' && t === STEPS - 1;
            return (
              <div key={t} className={`bptt-node loss-node ${isActive ? 'active' : ''} ${isBackSource ? 'source' : ''}`}>
                L{t}
              </div>
            );
          })}
        </div>
      </div>

      {showGradAccum && phase === 'backward' && gradAccum.length > 0 && (
        <div className="bptt-grad-panel">
          <div className="bptt-grad-header">
            <FaChartLine style={{ color: '#00467F' }} />
            <span>Gradient Accumulation (dW = sum of gradients from each step)</span>
          </div>
          <div className="bptt-grad-bars">
            {gradAccum.map((g, i) => (
              <div key={i} className="bptt-grad-bar-wrap">
                <div className="bptt-grad-bar" style={{ height: `${g * 100}%`, background: g > 0.5 ? '#22c55e' : g > 0.2 ? '#f59e0b' : '#ef4444' }} />
                <span className="bptt-grad-step">-{i}</span>
              </div>
            ))}
          </div>
          <div className="bptt-grad-total">
            Total accumulated gradient: {totalGrad.toFixed(3)}
          </div>
        </div>
      )}

      <div className="bptt-playback">
        <button className="bptt-btn" onClick={reset} title="Reset"><FaRedo /></button>
        <button className="bptt-btn" onClick={stepForward} title="Step" disabled={currentStep >= totalAnimSteps - 1}>
          <FaStepForward />
        </button>
        <button className={`bptt-btn primary ${isPlaying ? 'playing' : ''}`}
          onClick={() => { if (currentStep >= totalAnimSteps - 1) reset(); setIsPlaying(!isPlaying); }}>
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <div className="bptt-speed">
          <label>Speed:</label>
          <input type="range" min={200} max={1500} step={100}
            value={1700 - speed} onChange={e => setSpeed(1700 - Number(e.target.value))}
            aria-label="Animation speed" />
        </div>
      </div>

      <div className="bptt-explanation">
        <FaLightbulb style={{ color: '#f59e0b', flexShrink: 0 }} />
        <div>
          {phase === 'idle' && <span>Press play to watch BPTT in action. The forward pass computes hidden states and outputs, then the backward pass flows gradients back through time to compute weight updates.</span>}
          {phase === 'forward' && <span>Forward pass: Input x{Math.min(currentStep, STEPS - 1)} is processed. The hidden state h{Math.min(currentStep, STEPS - 1)} combines the previous hidden state with the current input using shared weights W_h and W_x.</span>}
          {phase === 'backward' && <span>Backward pass: Gradients flow from the loss back through time step by step. At each step, the gradient is multiplied by W_h (the recurrent weight matrix). After {backwardStep + 1} steps back, the gradient has been multiplied by W_h {backwardStep + 1} times.{truncateAt < STEPS ? ` Truncated BPTT stops after ${truncateAt} steps to save computation.` : ''}</span>}
        </div>
      </div>
    </div>
  );
}

export default BPTTVisualizer;

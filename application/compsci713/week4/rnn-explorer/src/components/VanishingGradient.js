import React, { useState, useMemo } from 'react';
import {
  FaInfoCircle, FaLightbulb, FaExclamationTriangle,
  FaSlidersH, FaChartBar,
} from 'react-icons/fa';
import './VanishingGradient.css';

function VanishingGradient() {
  const [seqLength, setSeqLength] = useState(10);
  const [weightMag, setWeightMag] = useState(0.8);
  const [cellType, setCellType] = useState('rnn');

  const gradients = useMemo(() => {
    const grads = [];
    for (let t = 0; t < seqLength; t++) {
      const stepsBack = seqLength - 1 - t;
      let grad;
      if (cellType === 'rnn') {
        grad = Math.pow(weightMag, stepsBack);
      } else if (cellType === 'lstm') {
        const forgetGate = 0.9;
        grad = Math.pow(forgetGate, stepsBack) * 0.8;
      } else {
        const updateGate = 0.85;
        grad = Math.pow(updateGate, stepsBack) * 0.85;
      }
      grads.push(Math.min(grad, 5));
    }
    return grads;
  }, [seqLength, weightMag, cellType]);

  const maxGrad = Math.max(...gradients, 0.001);
  const lastGrad = gradients[0];
  const isVanishing = lastGrad < 0.01;
  const isExploding = lastGrad > 2;

  return (
    <div className="vanishing-grad">
      <div className="vg-intro">
        <FaInfoCircle style={{ color: '#00467F', flexShrink: 0 }} />
        <span>
          The vanishing gradient problem occurs when gradients shrink exponentially as they flow backward through time.
          This makes it impossible for the network to learn long-range dependencies. Adjust the controls below to see how
          sequence length and weight magnitude affect gradient flow.
        </span>
      </div>

      <div className="vg-controls">
        <div className="vg-control-group">
          <div className="vg-cell-selector">
            {['rnn', 'lstm', 'gru'].map(type => (
              <button key={type} className={`vg-cell-btn ${cellType === type ? 'active' : ''}`}
                onClick={() => setCellType(type)}>
                {type === 'rnn' ? 'Simple RNN' : type.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="vg-slider-group">
          <div className="vg-slider">
            <div className="vg-slider-header">
              <FaSlidersH style={{ color: '#00467F' }} />
              <span>Sequence Length: {seqLength}</span>
            </div>
            <input type="range" min={3} max={30} value={seqLength}
              onChange={e => setSeqLength(Number(e.target.value))}
              aria-label="Sequence length" style={{ accentColor: '#00467F' }} />
            <div className="vg-slider-labels"><span>Short (3)</span><span>Long (30)</span></div>
          </div>

          {cellType === 'rnn' && (
            <div className="vg-slider">
              <div className="vg-slider-header">
                <FaSlidersH style={{ color: '#8b5cf6' }} />
                <span>Weight Magnitude |W_h|: {weightMag.toFixed(2)}</span>
              </div>
              <input type="range" min={0.1} max={1.5} step={0.05} value={weightMag}
                onChange={e => setWeightMag(Number(e.target.value))}
                aria-label="Weight magnitude" style={{ accentColor: '#8b5cf6' }} />
              <div className="vg-slider-labels"><span>Small (0.1)</span><span>Large (1.5)</span></div>
            </div>
          )}
        </div>
      </div>

      <div className="vg-chart">
        <div className="vg-chart-header">
          <FaChartBar style={{ color: '#00467F' }} />
          <span>Gradient Magnitude at Each Time Step (flowing backward from loss)</span>
        </div>
        <div className="vg-bars">
          {gradients.map((grad, i) => {
            const normalizedHeight = Math.min((grad / Math.max(maxGrad, 0.001)) * 100, 100);
            const color = grad < 0.01 ? '#ef4444' : grad < 0.1 ? '#f59e0b' : grad > 2 ? '#ef4444' : '#22c55e';
            return (
              <div key={i} className="vg-bar-wrap" title={`t=${i}: gradient = ${grad.toExponential(2)}`}>
                <div className="vg-bar" style={{ height: `${normalizedHeight}%`, background: color }} />
                <span className="vg-bar-label">t{i}</span>
              </div>
            );
          })}
        </div>
        <div className="vg-chart-axis">
          <span>Earliest input (hardest to learn)</span>
          <span>Latest input (near loss)</span>
        </div>
      </div>

      <div className={`vg-status ${isVanishing ? 'vanishing' : isExploding ? 'exploding' : 'healthy'}`}>
        {isVanishing && (
          <>
            <FaExclamationTriangle />
            <div>
              <strong>Vanishing Gradients Detected</strong>
              <p>Gradient at t=0 is {lastGrad.toExponential(2)} — effectively zero. The network cannot learn from early inputs.
                {cellType === 'rnn' && ' Try LSTM or GRU to see how gating mechanisms preserve gradient flow.'}
              </p>
            </div>
          </>
        )}
        {isExploding && (
          <>
            <FaExclamationTriangle />
            <div>
              <strong>Exploding Gradients Detected</strong>
              <p>Gradient at t=0 is {lastGrad.toFixed(2)} — growing uncontrollably. In practice, gradient clipping caps the norm to prevent this.</p>
            </div>
          </>
        )}
        {!isVanishing && !isExploding && (
          <>
            <FaLightbulb />
            <div>
              <strong>Healthy Gradient Flow</strong>
              <p>Gradients are flowing well through the sequence. The network can learn from both recent and distant inputs.
                {cellType !== 'rnn' && ' The gating mechanism helps maintain gradient magnitude across time steps.'}
              </p>
            </div>
          </>
        )}
      </div>

      <div className="vg-math">
        <div className="vg-math-title"><FaInfoCircle /> Why does this happen?</div>
        {cellType === 'rnn' && (
          <div className="vg-math-content">
            <code>dL/dh_0 = dL/dh_T x (W_h)^T</code>
            <p>For Simple RNN, the gradient at time 0 involves multiplying by W_h for each time step.
              If |W_h| {'<'} 1, the gradient shrinks exponentially: {weightMag.toFixed(2)}^{seqLength} = {Math.pow(weightMag, seqLength).toExponential(2)}.
              If |W_h| {'>'} 1, it explodes.</p>
          </div>
        )}
        {cellType === 'lstm' && (
          <div className="vg-math-content">
            <code>dC_t/dC_(t-1) = f_t (forget gate)</code>
            <p>In LSTM, the gradient through the cell state only involves multiplication by the forget gate f_t.
              Since f_t is close to 1 when the network wants to remember, gradients flow almost unchanged.
              This is the key insight — the cell state provides a gradient highway.</p>
          </div>
        )}
        {cellType === 'gru' && (
          <div className="vg-math-content">
            <code>dh_t/dh_(t-1) = (1 - z_t) + z_t x dh_tilde/dh_(t-1)</code>
            <p>In GRU, the update gate z_t creates a linear interpolation between old and new states.
              The (1 - z_t) term provides a direct path for gradients, similar to LSTM's cell state highway.
              This prevents vanishing while using fewer parameters than LSTM.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default VanishingGradient;

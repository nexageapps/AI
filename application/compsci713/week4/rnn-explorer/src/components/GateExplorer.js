import React, { useState, useMemo } from 'react';
import { FaInfoCircle, FaLightbulb } from 'react-icons/fa';
import './GateExplorer.css';

function GateExplorer() {
  const [forgetGate, setForgetGate] = useState(0.5);
  const [inputGate, setInputGate] = useState(0.5);
  const [outputGate, setOutputGate] = useState(0.5);
  const [candidateVal, setCandidateVal] = useState(0.7);
  const [prevCellState, setPrevCellState] = useState(0.8);
  const [mode, setMode] = useState('lstm'); // lstm or gru

  const lstm = useMemo(() => {
    const newCell = forgetGate * prevCellState + inputGate * candidateVal;
    const hidden = outputGate * Math.tanh(newCell);
    return { newCell, hidden };
  }, [forgetGate, inputGate, outputGate, candidateVal, prevCellState]);

  // GRU mode
  const [updateGate, setUpdateGate] = useState(0.5);
  const [resetGate, setResetGate] = useState(0.5);
  const [prevHidden, setPrevHidden] = useState(0.6);
  const [gruInput, setGruInput] = useState(0.7);

  const gru = useMemo(() => {
    const candidate = Math.tanh(resetGate * prevHidden + gruInput);
    const hidden = (1 - updateGate) * prevHidden + updateGate * candidate;
    return { candidate, hidden };
  }, [updateGate, resetGate, prevHidden, gruInput]);

  const presets = mode === 'lstm' ? [
    { label: 'Remember Everything', f: 1.0, i: 0.0, o: 1.0, desc: 'Forget gate = 1 keeps all old info, input gate = 0 adds nothing new' },
    { label: 'Forget Everything', f: 0.0, i: 1.0, o: 1.0, desc: 'Forget gate = 0 erases old info, input gate = 1 writes new info' },
    { label: 'Balanced', f: 0.5, i: 0.5, o: 0.5, desc: 'Mix of old and new information' },
    { label: 'Output Blocked', f: 0.8, i: 0.8, o: 0.0, desc: 'Cell state updates but output gate blocks the hidden state' },
  ] : [
    { label: 'Keep Old State', u: 0.0, r: 1.0, desc: 'Update gate = 0 means keep previous hidden state entirely' },
    { label: 'Full Update', u: 1.0, r: 1.0, desc: 'Update gate = 1 means replace with new candidate entirely' },
    { label: 'Balanced', u: 0.5, r: 0.5, desc: 'Mix of old and new information' },
    { label: 'Reset Memory', u: 0.5, r: 0.0, desc: 'Reset gate = 0 ignores previous hidden state for candidate' },
  ];

  const applyPreset = (preset) => {
    if (mode === 'lstm') {
      setForgetGate(preset.f);
      setInputGate(preset.i);
      setOutputGate(preset.o);
    } else {
      setUpdateGate(preset.u);
      setResetGate(preset.r);
    }
  };

  return (
    <div className="gate-explorer">
      <div className="ge-mode-toggle">
        <button className={`ge-mode-btn ${mode === 'lstm' ? 'active' : ''}`}
          style={mode === 'lstm' ? { background: '#8b5cf6' } : {}}
          onClick={() => setMode('lstm')}>
          LSTM Gates
        </button>
        <button className={`ge-mode-btn ${mode === 'gru' ? 'active' : ''}`}
          style={mode === 'gru' ? { background: '#06b6d4' } : {}}
          onClick={() => setMode('gru')}>
          GRU Gates
        </button>
      </div>

      <div className="ge-presets">
        <span className="ge-presets-label">Presets:</span>
        {presets.map((p, i) => (
          <button key={i} className="ge-preset-btn" onClick={() => applyPreset(p)} title={p.desc}>
            {p.label}
          </button>
        ))}
      </div>

      {mode === 'lstm' ? (
        <div className="ge-layout">
          <div className="ge-sliders">
            <GateSlider label="Forget Gate (f)" value={forgetGate} onChange={setForgetGate}
              color="#ef4444" desc="How much of the old cell state to keep" />
            <GateSlider label="Input Gate (i)" value={inputGate} onChange={setInputGate}
              color="#22c55e" desc="How much new information to add" />
            <GateSlider label="Output Gate (o)" value={outputGate} onChange={setOutputGate}
              color="#3b82f6" desc="How much of cell state to expose" />
            <GateSlider label="Candidate Value (C̃)" value={candidateVal} onChange={setCandidateVal}
              color="#6b7280" desc="New candidate information" />
            <GateSlider label="Previous Cell State (C_{t-1})" value={prevCellState} onChange={setPrevCellState}
              color="#6b7280" desc="Cell state from previous step" />
          </div>

          <div className="ge-visualization">
            <div className="ge-flow-diagram">
              <div className="ge-flow-row">
                <FlowBox label="C_{t-1}" value={prevCellState} color="#94a3b8" />
                <span className="ge-op">×</span>
                <FlowBox label="Forget" value={forgetGate} color="#ef4444" />
                <span className="ge-op">+</span>
                <FlowBox label="Input" value={inputGate} color="#22c55e" />
                <span className="ge-op">×</span>
                <FlowBox label="C̃" value={candidateVal} color="#94a3b8" />
              </div>
              <div className="ge-arrow-down">↓</div>
              <div className="ge-flow-row">
                <FlowBox label="New Cell State" value={lstm.newCell} color="#8b5cf6" big />
              </div>
              <div className="ge-arrow-down">↓ × tanh × Output Gate</div>
              <div className="ge-flow-row">
                <FlowBox label="Hidden State (h_t)" value={lstm.hidden} color="#00467F" big />
              </div>
            </div>

            <div className="ge-insight">
              <FaLightbulb style={{ color: '#f59e0b', flexShrink: 0 }} />
              <span>
                {forgetGate > 0.8 && inputGate < 0.2 && 'The cell is mostly remembering old information and ignoring new input.'}
                {forgetGate < 0.2 && inputGate > 0.8 && 'The cell is forgetting old information and writing new data.'}
                {outputGate < 0.2 && 'The output gate is nearly closed — the cell state is hidden from the next layer.'}
                {forgetGate >= 0.2 && forgetGate <= 0.8 && inputGate >= 0.2 && inputGate <= 0.8 && outputGate >= 0.2 &&
                  'The cell is blending old and new information in a balanced way.'}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="ge-layout">
          <div className="ge-sliders">
            <GateSlider label="Update Gate (z)" value={updateGate} onChange={setUpdateGate}
              color="#f59e0b" desc="Balance between old and new state" />
            <GateSlider label="Reset Gate (r)" value={resetGate} onChange={setResetGate}
              color="#8b5cf6" desc="How much past info to use for candidate" />
            <GateSlider label="Previous Hidden (h_{t-1})" value={prevHidden} onChange={setPrevHidden}
              color="#6b7280" desc="Hidden state from previous step" />
            <GateSlider label="Input (x_t)" value={gruInput} onChange={setGruInput}
              color="#6b7280" desc="Current input value" />
          </div>

          <div className="ge-visualization">
            <div className="ge-flow-diagram">
              <div className="ge-flow-row">
                <FlowBox label="(1-z) × h_{t-1}" value={(1 - updateGate) * prevHidden} color="#f59e0b" />
                <span className="ge-op">+</span>
                <FlowBox label="z × candidate" value={updateGate * gru.candidate} color="#8b5cf6" />
              </div>
              <div className="ge-arrow-down">↓</div>
              <div className="ge-flow-row">
                <FlowBox label="Hidden State (h_t)" value={gru.hidden} color="#00467F" big />
              </div>
            </div>

            <div className="ge-insight">
              <FaLightbulb style={{ color: '#f59e0b', flexShrink: 0 }} />
              <span>
                {updateGate < 0.2 && 'Update gate is low — the GRU is keeping the old hidden state almost unchanged.'}
                {updateGate > 0.8 && 'Update gate is high — the GRU is replacing the old state with new information.'}
                {resetGate < 0.2 && 'Reset gate is low — the candidate ignores previous hidden state.'}
                {updateGate >= 0.2 && updateGate <= 0.8 && resetGate >= 0.2 &&
                  'The GRU is blending old and new information based on the gate values.'}
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="ge-equations">
        <FaInfoCircle style={{ color: '#00467F', flexShrink: 0 }} />
        {mode === 'lstm' ? (
          <div>
            <code>{'C_t = f_t ⊙ C_(t-1) + i_t ⊙ C̃_t = '}{forgetGate.toFixed(2)} × {prevCellState.toFixed(2)} + {inputGate.toFixed(2)} × {candidateVal.toFixed(2)} = {lstm.newCell.toFixed(3)}</code>
            <br />
            <code>{'h_t = o_t ⊙ tanh(C_t) = '}{outputGate.toFixed(2)} × tanh({lstm.newCell.toFixed(3)}) = {lstm.hidden.toFixed(3)}</code>
          </div>
        ) : (
          <div>
            <code>{'h̃_t = tanh(r_t ⊙ h_(t-1) + x_t) = tanh('}{resetGate.toFixed(2)} × {prevHidden.toFixed(2)} + {gruInput.toFixed(2)}{') = '}{gru.candidate.toFixed(3)}</code>
            <br />
            <code>{'h_t = (1-z_t) ⊙ h_(t-1) + z_t ⊙ h̃_t = '}{(1-updateGate).toFixed(2)} × {prevHidden.toFixed(2)} + {updateGate.toFixed(2)} × {gru.candidate.toFixed(3)} = {gru.hidden.toFixed(3)}</code>
          </div>
        )}
      </div>
    </div>
  );
}

function GateSlider({ label, value, onChange, color, desc }) {
  return (
    <div className="gate-slider">
      <div className="gs-header">
        <span className="gs-label" style={{ color }}>{label}</span>
        <span className="gs-value">{value.toFixed(2)}</span>
      </div>
      <input
        type="range"
        min={0} max={1} step={0.01}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ accentColor: color }}
        aria-label={label}
      />
      <span className="gs-desc">{desc}</span>
    </div>
  );
}

function FlowBox({ label, value, color, big }) {
  return (
    <div className={`flow-box ${big ? 'big' : ''}`} style={{ borderColor: color, background: `${color}10` }}>
      <span className="fb-label">{label}</span>
      <span className="fb-value" style={{ color }}>{value.toFixed(3)}</span>
    </div>
  );
}

export default GateExplorer;

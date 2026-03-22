import { useState, useCallback, useRef, useEffect } from 'react';
import {
  FaBookOpen,
  FaCubes,
  FaBolt,
  FaArrowRight,
  FaSyncAlt,
  FaBalanceScale,
  FaShieldAlt,
  FaProjectDiagram,
  FaCheckCircle,
  FaTimesCircle,
  FaPlay,
  FaSlidersH,
} from 'react-icons/fa';
import { ACTIVATIONS } from '../neuralNet';
import './LearnPanel.css';

/* ─── Mini interactive: Layer Explorer ─── */
function LayerExplorer() {
  const [hidden, setHidden] = useState(1);
  const descriptions = [
    'Linear model only — can draw straight lines. Fails on curved data.',
    '1 hidden layer — can learn simple curves and basic patterns.',
    '2 hidden layers — can learn more complex shapes and features.',
    '3 hidden layers — can learn abstract, hierarchical representations.',
  ];
  return (
    <div className="interactive-widget">
      <div className="widget-label"><FaSlidersH style={{ marginRight: 4 }} /> Try it: How many hidden layers?</div>
      <input type="range" min={0} max={3} value={hidden} onChange={e => setHidden(+e.target.value)} className="widget-slider" />
      <div className="widget-arch">
        <span className="arch-block input">Input</span>
        {Array.from({ length: hidden }, (_, i) => (
          <span key={i} className="arch-block hidden-b">Hidden {i + 1}</span>
        ))}
        <span className="arch-block output">Output</span>
      </div>
      <div className="widget-result">{descriptions[hidden]}</div>
    </div>
  );
}

/* ─── Mini interactive: Activation Plotter ─── */
function MiniActivationPlot() {
  const canvasRef = useRef(null);
  const [act, setAct] = useState('relu');

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    // axes
    ctx.strokeStyle = '#d1d5db';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, H / 2); ctx.lineTo(W, H / 2);
    ctx.moveTo(W / 2, 0); ctx.lineTo(W / 2, H);
    ctx.stroke();

    // plot
    const fn = ACTIVATIONS[act].fn;
    ctx.strokeStyle = ACTIVATIONS[act].color;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let px = 0; px < W; px++) {
      const x = (px - W / 2) / (W / 8);
      const y = fn(x);
      const py = H / 2 - y * (H / 4);
      if (px === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    }
    ctx.stroke();

    // labels
    ctx.fillStyle = '#9ca3af';
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('-4', 4, H / 2 - 4);
    ctx.fillText('4', W - 8, H / 2 - 4);
    ctx.fillText(ACTIVATIONS[act].name, W / 2, 14);
  }, [act]);

  useEffect(() => { draw(); }, [draw]);

  return (
    <div className="interactive-widget">
      <div className="widget-label"><FaBolt style={{ marginRight: 4 }} /> Try it: Compare activations</div>
      <div className="widget-row">
        {Object.entries(ACTIVATIONS).map(([k, a]) => (
          <button key={k} className={`widget-chip ${act === k ? 'active' : ''}`} onClick={() => setAct(k)}>
            {a.name}
          </button>
        ))}
      </div>
      <canvas ref={canvasRef} width={280} height={140} className="widget-canvas" />
      <div className="widget-result">{ACTIVATIONS[act].formula}</div>
    </div>
  );
}

/* ─── Mini interactive: Forward Pass Step-Through ─── */
function ForwardPassDemo() {
  const [step, setStep] = useState(0);
  const input = 0.8;
  const w = 0.6;
  const b = -0.1;
  const z = input * w + b;
  const a = Math.max(0, z); // ReLU

  const steps = [
    { label: 'Input', value: input.toFixed(2), desc: 'Raw input value enters the neuron' },
    { label: 'Weighted', value: `${input.toFixed(2)} x ${w} = ${(input * w).toFixed(2)}`, desc: 'Multiply input by weight' },
    { label: '+ Bias', value: `${(input * w).toFixed(2)} + (${b}) = ${z.toFixed(2)}`, desc: 'Add the bias term' },
    { label: 'ReLU', value: `max(0, ${z.toFixed(2)}) = ${a.toFixed(2)}`, desc: 'Apply activation function' },
  ];

  return (
    <div className="interactive-widget">
      <div className="widget-label"><FaPlay style={{ marginRight: 4 }} /> Try it: Step through a forward pass</div>
      <div className="fp-steps">
        {steps.map((s, i) => (
          <div key={i} className={`fp-step ${i <= step ? 'active' : ''} ${i === step ? 'current' : ''}`}>
            <div className="fp-step-label">{s.label}</div>
            <div className="fp-step-value">{i <= step ? s.value : '?'}</div>
            {i === step && <div className="fp-step-desc">{s.desc}</div>}
          </div>
        ))}
      </div>
      <div className="widget-row">
        <button className="widget-btn" disabled={step === 0} onClick={() => setStep(step - 1)}>Back</button>
        <button className="widget-btn" disabled={step === steps.length - 1} onClick={() => setStep(step + 1)}>Next Step</button>
        <button className="widget-btn" onClick={() => setStep(0)}>Reset</button>
      </div>
    </div>
  );
}

/* ─── Mini interactive: Gradient Descent Visualiser ─── */
function GradientDescentDemo() {
  const [lr, setLr] = useState(0.3);
  const [pos, setPos] = useState(3.0);
  const [history, setHistory] = useState([3.0]);

  const loss = (x) => x * x;
  const grad = (x) => 2 * x;

  const doStep = () => {
    const newPos = pos - lr * grad(pos);
    setPos(newPos);
    setHistory(h => [...h, newPos]);
  };
  const reset = () => { setPos(3.0); setHistory([3.0]); };

  const canvasRef = useRef(null);
  const drawCb = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    // curve
    ctx.strokeStyle = '#d1d5db';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let px = 0; px < W; px++) {
      const x = (px - W / 2) / (W / 8);
      const y = loss(x);
      const py = H - 20 - y * (H - 30) / 10;
      if (px === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    }
    ctx.stroke();

    // history dots
    history.forEach((x, i) => {
      const px = W / 2 + x * (W / 8);
      const py = H - 20 - loss(x) * (H - 30) / 10;
      ctx.beginPath();
      ctx.arc(px, py, i === history.length - 1 ? 6 : 3, 0, Math.PI * 2);
      ctx.fillStyle = i === history.length - 1 ? '#00467F' : '#93c5fd';
      ctx.fill();
    });
  }, [history]);

  useEffect(() => { drawCb(); }, [drawCb]);

  return (
    <div className="interactive-widget">
      <div className="widget-label"><FaSlidersH style={{ marginRight: 4 }} /> Try it: Gradient descent on f(x) = x²</div>
      <canvas ref={canvasRef} width={280} height={120} className="widget-canvas" />
      <div className="widget-row">
        <label className="widget-sm-label">Learning rate: {lr.toFixed(2)}</label>
        <input type="range" min="0.05" max="1.0" step="0.05" value={lr} onChange={e => setLr(+e.target.value)} className="widget-slider-sm" />
      </div>
      <div className="widget-result">Position: {pos.toFixed(3)} | Loss: {loss(pos).toFixed(3)} | Steps: {history.length - 1}</div>
      <div className="widget-row">
        <button className="widget-btn" onClick={doStep}>Step</button>
        <button className="widget-btn" onClick={reset}>Reset</button>
      </div>
    </div>
  );
}

/* ─── Mini interactive: Overfitting Slider ─── */
function OverfitDemo() {
  const [complexity, setComplexity] = useState(1);
  const labels = ['Underfitting', 'Good fit', 'Overfitting'];
  const trainLoss = [0.8, 0.15, 0.01];
  const valLoss = [0.85, 0.2, 0.9];
  const idx = complexity;

  return (
    <div className="interactive-widget">
      <div className="widget-label"><FaBalanceScale style={{ marginRight: 4 }} /> Try it: Model complexity slider</div>
      <input type="range" min={0} max={2} value={complexity} onChange={e => setComplexity(+e.target.value)} className="widget-slider" />
      <div className="overfit-bars">
        <div className="overfit-bar">
          <div className="bar-label">Train Loss</div>
          <div className="bar-track"><div className="bar-fill train" style={{ width: `${trainLoss[idx] * 100}%` }} /></div>
          <div className="bar-val">{trainLoss[idx].toFixed(2)}</div>
        </div>
        <div className="overfit-bar">
          <div className="bar-label">Val Loss</div>
          <div className="bar-track"><div className="bar-fill val" style={{ width: `${valLoss[idx] * 100}%` }} /></div>
          <div className="bar-val">{valLoss[idx].toFixed(2)}</div>
        </div>
      </div>
      <div className={`widget-result overfit-label-${idx}`}>{labels[idx]}</div>
    </div>
  );
}

/* ─── Mini interactive: Dropout Visualiser ─── */
function DropoutDemo() {
  const [rate, setRate] = useState(0.3);
  const [mask, setMask] = useState(Array(12).fill(1));

  const resample = () => {
    setMask(Array.from({ length: 12 }, () => Math.random() >= rate ? 1 : 0));
  };

  return (
    <div className="interactive-widget">
      <div className="widget-label"><FaShieldAlt style={{ marginRight: 4 }} /> Try it: Dropout visualiser</div>
      <div className="widget-row">
        <label className="widget-sm-label">Rate: {(rate * 100).toFixed(0)}%</label>
        <input type="range" min="0" max="0.8" step="0.1" value={rate} onChange={e => setRate(+e.target.value)} className="widget-slider-sm" />
      </div>
      <div className="dropout-grid">
        {mask.map((v, i) => (
          <div key={i} className={`dropout-cell ${v ? 'active' : 'dropped'}`}>
            {v ? <FaCheckCircle /> : <FaTimesCircle />}
          </div>
        ))}
      </div>
      <button className="widget-btn" onClick={resample}>Resample</button>
      <div className="widget-result">
        {mask.filter(v => v).length} of 12 neurons active ({mask.filter(v => !v).length} dropped)
      </div>
    </div>
  );
}

/* ─── Quiz Component ─── */
function Quiz({ questions }) {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const select = (qi, oi) => {
    if (showResults) return;
    setAnswers({ ...answers, [qi]: oi });
  };

  const score = questions.reduce((s, q, i) => s + (answers[i] === q.correct ? 1 : 0), 0);

  return (
    <div className="quiz-widget">
      <div className="quiz-title"><FaCheckCircle style={{ marginRight: 4 }} /> Quick Quiz</div>
      {questions.map((q, qi) => (
        <div key={qi} className="quiz-question">
          <div className="quiz-q-text">{q.question}</div>
          <div className="quiz-options">
            {q.options.map((opt, oi) => {
              let cls = 'quiz-opt';
              if (answers[qi] === oi) cls += ' selected';
              if (showResults && oi === q.correct) cls += ' correct';
              if (showResults && answers[qi] === oi && oi !== q.correct) cls += ' wrong';
              return (
                <button key={oi} className={cls} onClick={() => select(qi, oi)}>
                  {opt}
                </button>
              );
            })}
          </div>
          {showResults && answers[qi] !== undefined && answers[qi] !== q.correct && (
            <div className="quiz-explanation">{q.explanation}</div>
          )}
        </div>
      ))}
      <div className="quiz-actions">
        {!showResults ? (
          <button className="widget-btn" onClick={() => setShowResults(true)} disabled={Object.keys(answers).length < questions.length}>
            Check Answers
          </button>
        ) : (
          <div className="quiz-score">
            Score: {score}/{questions.length}
            <button className="widget-btn" onClick={() => { setAnswers({}); setShowResults(false); }} style={{ marginLeft: 8 }}>
              Retry
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

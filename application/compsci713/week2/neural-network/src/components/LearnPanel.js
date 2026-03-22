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

/* ─── Lesson Data ─── */
const LESSONS = [
  {
    id: 'hidden-layers',
    title: '1. Why Hidden Layers?',
    icon: FaCubes,
    sections: [
      { heading: 'The problem with a single layer', body: 'A single-layer network (input \u2192 output) can only learn linear patterns \u2014 straight lines, flat planes. But real-world data is messy and curved!' },
      { heading: 'The solution: add layers in between', body: 'By inserting hidden layers between input and output, the network can learn complex, non-linear relationships. Each layer transforms the data a little more, building up from simple features to complex ones.' },
      { heading: 'Architecture evolution', items: [
        'Linear model: Input (784) \u2192 Output (10) \u2014 can only draw straight decision boundaries',
        'With hidden layer: Input (784) \u2192 Hidden (128) \u2192 Output (10) \u2014 can learn curves and shapes',
        'Deep network: Input \u2192 Hidden \u2192 Hidden \u2192 \u2026 \u2192 Output \u2014 can learn very abstract patterns',
      ]},
      { heading: 'Think of it like this', body: 'Imagine recognising a face. The first hidden layer might detect edges. The next layer combines edges into eyes, noses, mouths. The final layer combines those into "that\'s Alice!" Each layer builds on the previous one.' },
    ],
    interactive: LayerExplorer,
    quiz: [
      { question: 'What can a single-layer network learn?', options: ['Non-linear patterns', 'Only linear patterns', 'Any pattern', 'Nothing'], correct: 1, explanation: 'Without hidden layers, the network can only model linear (straight-line) relationships.' },
      { question: 'Why add hidden layers?', options: ['To make training slower', 'To learn non-linear patterns', 'To reduce accuracy', 'For decoration'], correct: 1, explanation: 'Hidden layers let the network learn complex, non-linear features from data.' },
    ],
  },
  {
    id: 'activations',
    title: '2. Activation Functions',
    icon: FaBolt,
    sections: [
      { heading: 'Why do we need them?', body: 'Without activation functions, stacking layers is pointless \u2014 multiple linear transformations collapse into a single one. Activation functions introduce non-linearity so each layer can learn something genuinely new.' },
      { heading: 'ReLU \u2014 the workhorse', body: 'f(x) = max(0, x)\n\nOutputs x when positive, 0 otherwise. Simple, fast, and avoids the vanishing gradient problem. The default choice for hidden layers in most modern networks.' },
      { heading: 'Sigmoid \u2014 the squasher', body: 'f(x) = 1 / (1 + e\u207b\u02e3)\n\nSquashes any value into the range (0, 1). Great for binary classification output, but can cause vanishing gradients in deep hidden layers.' },
      { heading: 'Tanh \u2014 the centred squasher', body: 'f(x) = (e\u02e3 \u2212 e\u207b\u02e3) / (e\u02e3 + e\u207b\u02e3)\n\nSquashes values into (\u22121, 1). Zero-centred, which helps training converge faster. Still suffers from vanishing gradients at the extremes.' },
      { heading: 'Softmax \u2014 the classifier', body: 'Converts a vector of raw scores into probabilities that sum to 1. Used in the output layer for multi-class classification: "40% cat, 35% dog, 25% bird."' },
    ],
    interactive: MiniActivationPlot,
    quiz: [
      { question: 'What happens without activation functions?', options: ['Network learns faster', 'Multiple layers collapse into one linear transform', 'Network becomes non-linear', 'Training stops'], correct: 1, explanation: 'Without non-linear activations, stacking linear layers is equivalent to a single linear layer.' },
      { question: 'Which activation is most common for hidden layers?', options: ['Sigmoid', 'Softmax', 'ReLU', 'Tanh'], correct: 2, explanation: 'ReLU is the default choice for hidden layers because it is simple, fast, and avoids vanishing gradients.' },
    ],
  },
  {
    id: 'forward-prop',
    title: '3. Forward Propagation',
    icon: FaArrowRight,
    sections: [
      { heading: 'Data flows forward', body: 'In a forward pass, data moves from input through each hidden layer to the output. At every neuron, two things happen:' },
      { heading: 'Step 1: Weighted sum', body: 'z = w\u2081x\u2081 + w\u2082x\u2082 + \u2026 + w\u2099x\u2099 + b\n\nEach input is multiplied by its weight, summed up, and a bias is added. The weights determine how much each input matters.' },
      { heading: 'Step 2: Activation', body: 'a = activation(z)\n\nThe weighted sum is passed through an activation function. This is what gives the network its power to learn non-linear patterns.' },
      { heading: 'Layer by layer', items: [
        'Input layer: just passes the raw data through',
        'Hidden layers: weighted sum \u2192 activation \u2192 output becomes input to next layer',
        'Output layer: final weighted sum \u2192 output activation (sigmoid, softmax, etc.)',
      ]},
    ],
    interactive: ForwardPassDemo,
    quiz: [
      { question: 'What are the two operations at each neuron?', options: ['Add and subtract', 'Weighted sum then activation', 'Multiply then divide', 'Sort then filter'], correct: 1, explanation: 'Each neuron computes a weighted sum of inputs (plus bias), then applies an activation function.' },
    ],
  },
  {
    id: 'backprop',
    title: '4. Backpropagation',
    icon: FaSyncAlt,
    sections: [
      { heading: 'How does a network learn?', body: 'After a forward pass, the network makes a prediction. We compare it to the correct answer using a loss function \u2014 this tells us how wrong the prediction is.' },
      { heading: 'The chain rule in action', body: 'Backpropagation uses the chain rule of calculus to compute how much each weight contributed to the error. It works backwards from the output to the input \u2014 hence "back" propagation.' },
      { heading: 'Gradient descent', body: 'Once we know each weight\'s contribution to the error (its gradient), we update it:\n\nw \u2190 w \u2212 \u03b7 \u00b7 \u2202L/\u2202w\n\nwhere \u03b7 (eta) is the learning rate \u2014 how big a step we take. Too big and we overshoot; too small and learning is painfully slow.' },
      { heading: 'The training loop', items: [
        '1. Forward pass: compute prediction',
        '2. Compute loss: how wrong are we?',
        '3. Backward pass: compute gradients for every weight',
        '4. Update weights: nudge them to reduce the loss',
        '5. Repeat for many epochs until the network converges',
      ]},
    ],
    interactive: GradientDescentDemo,
    quiz: [
      { question: 'What does a large learning rate cause?', options: ['Slow convergence', 'Overshooting the minimum', 'Better accuracy', 'No effect'], correct: 1, explanation: 'A learning rate that is too large causes the optimiser to overshoot the minimum and potentially diverge.' },
      { question: 'What does backpropagation compute?', options: ['The prediction', 'The loss', 'Gradients for each weight', 'The input data'], correct: 2, explanation: 'Backpropagation computes the gradient of the loss with respect to each weight using the chain rule.' },
    ],
  },
  {
    id: 'overfitting',
    title: '5. Overfitting vs Underfitting',
    icon: FaBalanceScale,
    sections: [
      { heading: 'Underfitting \u2014 too simple', body: 'The model is too simple to capture the patterns in the data. It performs poorly on both training data AND new data. Like a student who didn\'t study enough.' },
      { heading: 'Overfitting \u2014 too memorised', body: 'The model memorises the training data perfectly but fails on new, unseen data. It learned the noise, not the signal. Like a student who memorised every answer but can\'t solve a slightly different problem.' },
      { heading: 'The sweet spot: generalisation', body: 'We want a model that captures the real patterns without memorising noise. This is called generalisation \u2014 performing well on data it has never seen before.' },
      { heading: 'How to detect it', items: [
        'Plot training loss vs validation loss over epochs',
        'If both are high \u2192 underfitting (model too simple)',
        'If training loss is low but validation loss is high \u2192 overfitting',
        'If both decrease together \u2192 good generalisation',
      ]},
    ],
    interactive: OverfitDemo,
    quiz: [
      { question: 'High training loss AND high validation loss means:', options: ['Overfitting', 'Underfitting', 'Good generalisation', 'Perfect model'], correct: 1, explanation: 'When both losses are high, the model is too simple to learn the patterns (underfitting).' },
    ],
  },
  {
    id: 'regularisation',
    title: '6. Regularisation & Dropout',
    icon: FaShieldAlt,
    sections: [
      { heading: 'Fighting overfitting', body: 'Regularisation techniques add constraints to the training process to prevent the model from becoming too complex and memorising the data.' },
      { heading: 'L2 Regularisation (Weight Decay)', body: 'Adds a penalty proportional to the square of the weights to the loss function:\n\nL_total = L_original + \u03bb \u00b7 \u03a3(w\u00b2)\n\nThis encourages smaller weights, which leads to simpler, more generalisable models.' },
      { heading: 'Dropout \u2014 the team training trick', body: 'During each training step, randomly "turn off" a fraction of neurons (set their output to 0). This forces the network to not rely on any single neuron.' },
      { heading: 'Why dropout works', items: [
        'Prevents co-adaptation: neurons can\'t rely on specific partners',
        'Acts like training many smaller networks and averaging them',
        'Typical dropout rate: 20\u201350% of neurons per layer',
        'Only applied during training \u2014 all neurons are active at test time',
      ]},
    ],
    interactive: DropoutDemo,
    quiz: [
      { question: 'When is dropout applied?', options: ['Only during testing', 'Only during training', 'Always', 'Never'], correct: 1, explanation: 'Dropout is only used during training. At test time, all neurons are active.' },
    ],
  },
  {
    id: 'lnn',
    title: '7. Logical Neural Networks',
    icon: FaProjectDiagram,
    sections: [
      { heading: 'Bridging logic and learning', body: 'A Logical Neural Network (LNN) combines classical symbolic logic with neural network learning. Every neuron corresponds to a logical formula \u2014 AND, OR, NOT, IMPLIES \u2014 with real-valued truth values in [0, 1].' },
      { heading: 'Why LNNs matter', items: [
        'Interpretability: you can trace exactly why a conclusion was reached',
        'Bidirectional inference: supports both top-down and bottom-up reasoning',
        'Combines learning from data with logical rules and constraints',
        'Unlike black-box networks, every neuron has a clear logical meaning',
      ]},
      { heading: 'How they work', body: 'Each logical gate (AND, OR) becomes a neuron with learnable weights and thresholds. The truth value flows through the network just like activations in a standard neural network, but the structure mirrors a logical formula.' },
      { heading: 'Real-valued logic', body: 'Instead of strict TRUE/FALSE, LNNs use values between 0 and 1:\n\n  0.0 = definitely false\n  0.5 = unknown / uncertain\n  1.0 = definitely true\n\nThis lets the network handle uncertainty gracefully while maintaining logical consistency.' },
      { heading: 'Connection to Week 1', body: 'Remember propositional logic from Week 1? LNNs take those same logical operators and make them differentiable \u2014 so we can train them with gradient descent while preserving logical reasoning. It\'s the best of both worlds!' },
    ],
    quiz: [
      { question: 'What does 0.5 represent in an LNN?', options: ['True', 'False', 'Unknown / uncertain', 'Error'], correct: 2, explanation: 'In LNNs, 0.5 represents uncertainty \u2014 the truth value is unknown.' },
      { question: 'What makes LNNs different from standard neural networks?', options: ['They are faster', 'Every neuron has a logical meaning', 'They don\'t use weights', 'They can\'t learn'], correct: 1, explanation: 'In LNNs, each neuron corresponds to a logical formula, making them interpretable.' },
    ],
  },
];

/* ─── Lesson Content Renderer ─── */
function LessonContent({ lesson }) {
  const InteractiveWidget = lesson.interactive;
  return (
    <div className="lesson-sections">
      {lesson.sections.map((sec, i) => (
        <div key={i} className="lesson-section">
          <h4 className="lesson-section-heading">{sec.heading}</h4>
          {sec.body && <pre className="lesson-section-body">{sec.body}</pre>}
          {sec.items && (
            <ul className="lesson-section-list">
              {sec.items.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
      {InteractiveWidget && <InteractiveWidget />}
      {lesson.quiz && <Quiz questions={lesson.quiz} />}
    </div>
  );
}

/* ─── Main Component ─── */
export default function LearnPanel() {
  const [activeLesson, setActiveLesson] = useState(0);
  const current = LESSONS[activeLesson];
  const IconComp = current.icon;

  return (
    <div className="learn-panel">
      <div className="learn-sidebar">
        <h3 className="learn-sidebar-title">
          <FaBookOpen style={{ marginRight: 6 }} /> Lessons
        </h3>
        {LESSONS.map((lesson, i) => {
          const NavIcon = lesson.icon;
          return (
            <button
              key={lesson.id}
              className={`learn-nav-btn ${activeLesson === i ? 'active' : ''}`}
              onClick={() => setActiveLesson(i)}
            >
              <NavIcon className="learn-nav-icon" />
              <span className="learn-nav-text">{lesson.title}</span>
            </button>
          );
        })}
      </div>

      <div className="learn-content">
        <div className="learn-header">
          <IconComp className="learn-icon" />
          <h2 className="learn-title">{current.title}</h2>
        </div>
        <div className="learn-body-scroll">
          <LessonContent lesson={current} />
        </div>
        <div className="learn-nav-arrows">
          <button className="nav-arrow-btn" disabled={activeLesson === 0} onClick={() => setActiveLesson(activeLesson - 1)}>
            ← Previous
          </button>
          <span className="lesson-counter">{activeLesson + 1} / {LESSONS.length}</span>
          <button className="nav-arrow-btn" disabled={activeLesson === LESSONS.length - 1} onClick={() => setActiveLesson(activeLesson + 1)}>
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}

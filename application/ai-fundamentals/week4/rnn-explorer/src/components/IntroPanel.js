import React, { useState, useEffect, useCallback } from 'react';
import {
  FaArrowRight, FaArrowLeft, FaBookReader, FaLightbulb,
  FaStar, FaCheck, FaBrain, FaQuestion, FaCog,
  FaDoorOpen, FaEye, FaGlobeAmericas, FaBook,
  FaFont, FaMusic, FaFilm, FaCloudSun, FaHeartbeat, FaUtensils,
  FaDog, FaCat, FaPen, FaChair, FaHandPointUp, FaMagic,
  FaFlag, FaTrash, FaStickyNote, FaHandPaper, FaVideo,
  FaMeh, FaMoon, FaBullseye, FaGrinStars,
  FaMobile, FaMicrophone, FaExchangeAlt, FaHeadphones,
  FaEnvelope, FaHospital, FaChartLine, FaGamepad,
  FaSearch, FaStepForward, FaGraduationCap, FaLock,
  FaBolt, FaWaveSquare, FaCrosshairs, FaProjectDiagram,
  FaRoad, FaCalculator, FaLayerGroup, FaRandom,
  FaCompressArrowsAlt, FaKey, FaDatabase, FaLanguage,
  FaBalanceScale, FaChartBar,
} from 'react-icons/fa';
import './IntroPanel.css';

// Stage 1: School-friendly basics
const STAGE1 = [
  { id: 'what', icon: FaBrain, title: 'What is an RNN?', subtitle: 'A brain that remembers', panels: [
    { heading: 'Imagine you have a diary...', text: 'Every night you write what happened today. Tomorrow, you read yesterday\'s entry before writing the new one.', highlight: 'An RNN works the same way -- it reads one piece of information at a time and keeps a "diary" (called a hidden state) of everything it has seen so far.' },
    { heading: 'It\'s like a chain of friends', text: 'Imagine passing a message along a line of friends. Each friend hears the message, adds their own thought, and passes it to the next person.', highlight: 'In an RNN, each "friend" is a time step. The message being passed is the hidden state -- it carries memory from the past.' },
    { heading: 'The simple idea', text: 'At each step, the RNN does just two things:', bullets: [{ icon: FaBook, text: 'Reads the new input (like a new word)' }, { icon: FaBrain, text: 'Combines it with what it remembers' }, { icon: FaPen, text: 'Produces an output and updates its memory' }], highlight: 'Read, Remember, Output, Repeat. The same simple process at every step.' },
  ]},
  { id: 'why', icon: FaQuestion, title: 'Why RNNs?', subtitle: 'Order matters!', panels: [
    { heading: 'Order changes meaning', text: 'Think about these two sentences:', examples: [{ text: '"The dog chased the cat"', Icon: FaDog }, { text: '"The cat chased the dog"', Icon: FaCat }], highlight: 'Same words, different order, completely different meaning! RNNs read one word at a time, in order.' },
    { heading: 'Sequences are everywhere', text: 'So many things in life come in sequences:', examples: [{ text: 'Words in a sentence', Icon: FaFont }, { text: 'Notes in a song', Icon: FaMusic }, { text: 'Frames in a video', Icon: FaFilm }, { text: 'Weather over days', Icon: FaCloudSun }, { text: 'Your heartbeat', Icon: FaHeartbeat }, { text: 'Steps in a recipe', Icon: FaUtensils }], highlight: 'Whenever the order of things matters, an RNN can help!' },
  ]},
  { id: 'how', icon: FaCog, title: 'How does it work?', subtitle: 'Step by step', panels: [
    { heading: 'Let\'s predict the next word!', text: 'Suppose we want to predict: "The cat sat on the ___"', steps: [{ word: 'The', memory: 'Something is starting...', Icon: FaSearch }, { word: 'cat', memory: 'We\'re talking about a cat!', Icon: FaCat }, { word: 'sat', memory: 'The cat is sitting somewhere', Icon: FaChair }, { word: 'on', memory: 'It\'s sitting ON something...', Icon: FaHandPointUp }, { word: 'the', memory: 'On the... what?', Icon: FaQuestion }, { word: '???', memory: 'mat! (or floor, or chair)', Icon: FaMagic }], highlight: 'At each step, the RNN updates its memory. By the end, it has enough context to guess "mat"!' },
    { heading: 'The memory problem', text: 'But what if the sentence is really long?', examples: [{ text: '"I grew up in France... I speak fluent ___"', Icon: FaFlag }], highlight: 'The answer is "French" but the clue was way back at the start! Simple RNNs forget old things. That\'s why we invented LSTM and GRU.' },
  ]},
  { id: 'gates', icon: FaDoorOpen, title: 'Gates: Memory Helpers', subtitle: 'LSTM & GRU simply', panels: [
    { heading: 'Gates are like doors in your brain', text: 'Imagine your brain has three special doors:', examples: [{ text: 'Forget Door -- Should I forget old stuff?', Icon: FaTrash }, { text: 'Input Door -- Should I save this new thing?', Icon: FaStickyNote }, { text: 'Output Door -- What should I say right now?', Icon: FaHandPaper }], highlight: 'LSTM has all three doors. GRU simplifies to just two (Update and Reset) -- almost as good!' },
    { heading: 'A real example', text: 'Reading: "The movie was long and boring but the ending was amazing"', steps: [{ word: 'The movie', memory: 'New topic: a movie', Icon: FaVideo }, { word: 'was long', memory: 'Negative feeling', Icon: FaMeh }, { word: 'and boring', memory: 'Definitely negative!', Icon: FaMoon }, { word: 'but', memory: 'FORGET GATE activates! Change coming...', Icon: FaDoorOpen }, { word: 'the ending', memory: 'New subject', Icon: FaBullseye }, { word: 'was amazing', memory: 'INPUT GATE opens! Save positive feeling!', Icon: FaGrinStars }], highlight: '"but" triggers the forget gate, "amazing" triggers the input gate. Final output? Positive review!' },
  ]},
  { id: 'attention', icon: FaEye, title: 'Attention', subtitle: 'Like highlighting a textbook', panels: [
    { heading: 'The highlighter analogy', text: 'When you study, you don\'t read every word equally. You highlight the important parts!', examples: [{ text: 'Translating "The cat sat on the mat" to French', Icon: FaGlobeAmericas }, { text: 'Writing "chat" (cat) -- focus on "cat"', Icon: FaSearch }, { text: 'Writing "tapis" (mat) -- focus on "mat"', Icon: FaBullseye }], highlight: 'Attention lets the model "highlight" different input parts for each output. This idea led to Transformers -- the tech behind ChatGPT!' },
  ]},
  { id: 'realworld', icon: FaGlobeAmericas, title: 'Real World', subtitle: 'RNNs everywhere!', panels: [
    { heading: 'You use RNN-based tech every day', examples: [{ text: 'Phone autocomplete -- predicts next word', Icon: FaMobile }, { text: 'Siri/Alexa -- voice commands', Icon: FaMicrophone }, { text: 'Google Translate', Icon: FaExchangeAlt }, { text: 'Spotify -- song recommendations', Icon: FaHeadphones }, { text: 'Gmail -- smart replies', Icon: FaEnvelope }, { text: 'Medical -- patient health prediction', Icon: FaHospital }, { text: 'Finance -- stock prediction', Icon: FaChartLine }, { text: 'Games -- NPCs with memory', Icon: FaGamepad }], highlight: 'Transformers replaced RNNs in many tasks, but the core ideas (hidden states, gates, attention) that RNNs pioneered are the foundation of all modern AI!' },
  ]},
];

// Stage 2: Masters-level deep dives (Stanford CS-230)
const STAGE2 = [
  { id: 'rnn-math', icon: FaCalculator, title: 'RNN Math', subtitle: 'The equations decoded', panels: [
    { heading: 'The RNN equation, decoded', text: 'The core RNN formula looks scary, but it\'s just our diary analogy in math:', formula: { label: 'Hidden State', code: 'a^<t> = g(W_aa * a^<t-1> + W_ax * x^<t> + b_a)' }, analogy: { Icon: FaBook, title: 'Diary analogy', text: 'W_aa * a^<t-1> = "read yesterday\'s diary". W_ax * x^<t> = "see what happened today". g() = "summarize it all into today\'s entry". Same weights W every day = same handwriting, same diary format.' }, highlight: 'W_aa connects memory to memory (how yesterday affects today). W_ax connects input to memory (how today\'s events get recorded). These weights are shared across ALL time steps -- that\'s the key!' },
    { heading: 'The output equation', text: 'At each step, the RNN also produces an output:', formula: { label: 'Output', code: 'y^<t> = g2(W_ya * a^<t> + b_y)' }, analogy: { Icon: FaPen, title: 'Speaking from memory', text: 'Think of it as: "Based on everything I remember right now (a^<t>), here\'s what I want to say (y^<t>)." W_ya decides which parts of memory are relevant for the answer.' }, highlight: 'The loss across all steps is summed: L = sum of L(y_hat^<t>, y^<t>). The network learns by comparing its predictions to the correct answers at every single step.' },
  ]},
  { id: 'lstm-deep', icon: FaLock, title: 'LSTM Deep Dive', subtitle: 'Cell state + 3 gates', panels: [
    { heading: 'LSTM: Two memory systems', text: 'LSTM maintains TWO separate memories:', examples: [{ text: 'Cell state (C_t) -- Long-term memory, like a conveyor belt. Information flows along it mostly unchanged.', Icon: FaRoad }, { text: 'Hidden state (h_t) -- Short-term/working memory. What the network is actively thinking about right now.', Icon: FaBrain }], formula: { label: 'Cell State Update', code: 'C_t = f_t * C_{t-1} + i_t * g_t' }, analogy: { Icon: FaRoad, title: 'Conveyor belt analogy', text: 'The cell state is like a conveyor belt in a factory. f_t (forget gate) decides what to remove from the belt. i_t * g_t (input gate x candidate) decides what new items to place on the belt. Items can travel the entire length without being disturbed.' }, highlight: 'This is why LSTM solves vanishing gradients: the gradient through the cell state is just dC_t/dC_{t-1} = f_t. When f_t is near 1, gradients flow unchanged -- a "gradient highway" (CS231n).' },
    { heading: 'The three gates in detail', text: 'Each gate is a sigmoid layer that outputs values between 0 (block) and 1 (pass through):', gates: [{ name: 'Forget Gate (f_t)', color: '#ef4444', formula: 'f_t = sigmoid(W_f * [h_{t-1}, x_t] + b_f)', analogy: 'Like an eraser -- decides what old info to wipe from the conveyor belt. Reading "but" in a review? Erase the negative sentiment!' }, { name: 'Input Gate (i_t)', color: '#22c55e', formula: 'i_t = sigmoid(W_i * [h_{t-1}, x_t] + b_i)', analogy: 'Like a stamp of approval -- decides which new info is worth saving. Reading "amazing"? Stamp it and put it on the belt!' }, { name: 'Output Gate (o_t)', color: '#3b82f6', formula: 'o_t = sigmoid(W_o * [h_{t-1}, x_t] + b_o)', analogy: 'Like a filter on what you say out loud. You might know many things (cell state) but only share what\'s relevant right now.' }], formula: { label: 'Hidden State', code: 'h_t = o_t * tanh(C_t)' }, highlight: 'Parameter count: 4 x (hidden_size x (input_size + hidden_size) + hidden_size). The 4 comes from 3 gates + 1 candidate. Each has its own weight matrices.' },
  ]},
  { id: 'gru-deep', icon: FaBolt, title: 'GRU Deep Dive', subtitle: 'Simpler but powerful', panels: [
    { heading: 'GRU: The efficient alternative', text: 'GRU merges the cell state and hidden state into one, and uses only 2 gates instead of 3:', gates: [{ name: 'Update Gate (z_t)', color: '#f59e0b', formula: 'z_t = sigmoid(W_z * [h_{t-1}, x_t] + b_z)', analogy: 'Like a mixing knob -- z=0 means "keep 100% old memory", z=1 means "replace with 100% new". It combines LSTM\'s forget and input gates into one!' }, { name: 'Reset Gate (r_t)', color: '#8b5cf6', formula: 'r_t = sigmoid(W_r * [h_{t-1}, x_t] + b_r)', analogy: 'Like a "start fresh" button -- r=0 means "ignore everything I knew before when computing the candidate", r=1 means "use full past context".' }], formula: { label: 'Hidden State', code: 'h_t = (1 - z_t) * h_{t-1} + z_t * tanh(W * [r_t * h_{t-1}, x_t])' }, analogy: { Icon: FaBalanceScale, title: 'LSTM vs GRU', text: 'LSTM: 3 gates, separate cell state, 4x weight matrices. GRU: 2 gates, single hidden state, 3x weight matrices. GRU trains ~25% faster. Performance is comparable on most tasks. Use GRU when speed matters, LSTM for complex long-range dependencies.' }, highlight: 'GRU is a simplification where LSTM is the generalization (CS230). In practice, try both and pick whichever works better for your specific task.' },
  ]},
  { id: 'vanishing', icon: FaWaveSquare, title: 'Vanishing Gradients', subtitle: 'Why simple RNNs fail', panels: [
    { heading: 'The gradient multiplication problem', text: 'During backpropagation through time (BPTT), gradients are multiplied by the weight matrix at each step:', formula: { label: 'BPTT Gradient', code: 'dL/dW = sum_{t=1}^{T} (dL/dW)|_(t)' }, analogy: { Icon: FaCompressArrowsAlt, title: 'Telephone game analogy', text: 'Imagine whispering a number through 20 people, but each person multiplies it by 0.9. After 20 people: 0.9^20 = 0.12 -- the message nearly vanishes! If each multiplies by 1.1 instead: 1.1^20 = 6.7 -- it explodes! That\'s exactly what happens to gradients in RNNs.' }, highlight: 'Gradient Clipping fixes exploding gradients: if ||g|| > threshold, scale it down. But vanishing gradients need architectural solutions -- that\'s why LSTM/GRU gates create additive paths instead of multiplicative ones.' },
    { heading: 'Truncated BPTT', text: 'Full BPTT through entire sequences is too slow. In practice:', examples: [{ text: 'Run forward through chunks of the sequence', Icon: FaArrowRight }, { text: 'Carry hidden states forward between chunks', Icon: FaBrain }, { text: 'But only backpropagate within each chunk', Icon: FaArrowLeft }], formula: { label: 'Gradient Clipping', code: 'if ||g|| > threshold: g = threshold * g / ||g||' }, highlight: 'Truncated BPTT trades long-range gradient accuracy for computational efficiency. The hidden state still carries information forward -- we just don\'t backpropagate through the entire history.' },
  ]},
  { id: 'architectures', icon: FaProjectDiagram, title: 'RNN Architectures', subtitle: 'Five key patterns', panels: [
    { heading: 'Five ways to use RNNs (CS231n)', text: 'RNNs are incredibly flexible in how they map inputs to outputs:', examples: [{ text: 'One-to-One: Standard classification (not really an RNN)', Icon: FaCrosshairs }, { text: 'One-to-Many: Image captioning -- one image in, sequence of words out', Icon: FaFilm }, { text: 'Many-to-One: Sentiment analysis -- sequence of words in, one label out', Icon: FaLayerGroup }, { text: 'Many-to-Many (equal): POS tagging -- one label per word', Icon: FaFont }, { text: 'Many-to-Many (Seq2Seq): Translation -- encoder reads input, decoder writes output', Icon: FaExchangeAlt }], highlight: 'Bidirectional RNNs process sequences in both directions, capturing past AND future context. Stack multiple layers for deeper representations. Dropout goes between layers, not within time steps.' },
  ]},
  { id: 'attention-deep', icon: FaCrosshairs, title: 'Attention Mechanics', subtitle: 'From RNN attention to Transformers', panels: [
    { heading: 'Attention: The math behind highlighting', text: 'Instead of compressing the entire input into one vector, attention lets the decoder look back at all encoder states:', formula: { label: 'Context Vector (CS230)', code: 'c^<t> = sum_t\' alpha^<t,t\'> * a^<t\'>' }, analogy: { Icon: FaSearch, title: 'Spotlight analogy', text: 'alpha^<t,t\'> is like a spotlight brightness. For each output word, the model shines spotlights of different brightness on each input word. The context vector is the weighted average of what the spotlights illuminate. Bright spotlight = "this input word is very relevant for what I\'m about to say".' }, highlight: 'The attention weights alpha are computed via softmax over energy scores: alpha = softmax(e). The energy e is computed by a small neural network comparing the decoder state with each encoder state.' },
    { heading: 'Self-Attention and Transformers', text: 'Self-attention uses three projections -- Query, Key, Value -- learned during training:', formula: { label: 'Scaled Dot-Product', code: 'alpha_ij = softmax(q_i^T * k_j / sqrt(d_k))' }, analogy: { Icon: FaKey, title: 'Library analogy', text: 'Query = "What am I looking for?" Key = "What does each book contain?" Value = "The actual content of each book." You compare your query against all keys to find the best matches, then read the values of those matches. Dividing by sqrt(d_k) prevents the dot products from getting too large and making softmax too peaked.' }, highlight: 'Multi-head attention runs multiple attention heads in parallel, each with its own Q/K/V matrices. Like having multiple librarians, each specialized in different topics. This is the core of Transformers (Vaswani et al., 2017).' },
  ]},
  { id: 'embeddings', icon: FaDatabase, title: 'Word Embeddings', subtitle: 'Word2Vec, GloVe, and more', panels: [
    { heading: 'From words to vectors', text: 'Computers need numbers, not words. Word embeddings map each word to a dense vector where similar words are close together:', formula: { label: 'Embedding Matrix (CS230)', code: 'e_w = E * o_w  (one-hot to dense vector)' }, analogy: { Icon: FaGlobeAmericas, title: 'Map analogy', text: 'Think of embeddings as placing words on a map. "King" and "Queen" are close together (both royalty). "Cat" and "Dog" are close (both pets). The famous analogy: king - man + woman = queen. The "gender direction" is captured as a vector offset!' }, highlight: 'Cosine similarity measures how close two word vectors are: similarity = (w1 dot w2) / (||w1|| * ||w2||). Values range from -1 (opposite) to 1 (identical).' },
    { heading: 'Word2Vec and GloVe (CS230)', text: 'Two main approaches to learning embeddings:', examples: [{ text: 'Skip-gram: Given center word, predict surrounding context words. P(t|c) = softmax(theta_t^T * e_c)', Icon: FaRandom }, { text: 'Negative Sampling: Instead of full softmax, train k binary classifiers. Much faster! P(y=1|c,t) = sigmoid(theta_t^T * e_c)', Icon: FaBolt }, { text: 'GloVe: Uses co-occurrence matrix X. Optimizes J = sum f(X_ij)(theta_i^T * e_j + b - log(X_ij))^2', Icon: FaChartBar }], highlight: 'Skip-gram is expensive (softmax over entire vocabulary). Negative sampling fixes this by sampling k negative examples per positive. GloVe combines count-based and prediction-based methods. Final embedding: e_final = (e + theta) / 2.' },
  ]},
  { id: 'nlp-metrics', icon: FaLanguage, title: 'NLP Metrics', subtitle: 'BLEU, Perplexity, Beam Search', panels: [
    { heading: 'Evaluating sequence models (CS230)', text: 'How do we measure if a translation or language model is good?', examples: [{ text: 'BLEU Score: Compares n-gram overlap between prediction and reference. BLEU = exp((1/n) * sum p_k). Higher is better.', Icon: FaBalanceScale }, { text: 'Perplexity: How "surprised" is the model? PP = product(1/P(word))^(1/T). Lower is better. PP=42 means choosing among ~42 words.', Icon: FaQuestion }, { text: 'Beam Search: Keep top B candidates at each step instead of just the best one. B=1 is greedy, B=10 is standard.', Icon: FaSearch }], formula: { label: 'Length Normalization', code: 'Objective = (1/T_y^alpha) * sum_t log P(y^<t>|x, y^<1>...y^<t-1>)' }, highlight: 'Raw beam search favors shorter sequences. Length normalization (dividing by T^alpha, typically alpha=0.7) fixes this. Error analysis: if P(y*|x) > P(y_hat|x), beam search is at fault (increase B). Otherwise, the RNN model needs improvement.' },
  ]},
];

function IntroPanel({ onNavigate }) {
  const [stage, setStage] = useState(1);
  const [storyIdx, setStoryIdx] = useState(0);
  const [panelIdx, setPanelIdx] = useState(0);
  const [animStep, setAnimStep] = useState(-1);
  const [completed, setCompleted] = useState(new Set());

  const stories = stage === 1 ? STAGE1 : STAGE2;
  const story = stories[storyIdx];
  const panel = story.panels[panelIdx];
  const StoryIcon = story.icon;

  const goNext = useCallback(() => {
    if (panelIdx < story.panels.length - 1) {
      setPanelIdx(panelIdx + 1);
      setAnimStep(-1);
    } else {
      const key = stage + '-' + storyIdx;
      setCompleted(prev => new Set([...prev, key]));
      if (storyIdx < stories.length - 1) {
        setStoryIdx(storyIdx + 1);
        setPanelIdx(0);
        setAnimStep(-1);
      }
    }
  }, [panelIdx, storyIdx, story.panels.length, stories.length, stage]);

  const goPrev = useCallback(() => {
    if (panelIdx > 0) {
      setPanelIdx(panelIdx - 1);
      setAnimStep(-1);
    } else if (storyIdx > 0) {
      const prevStory = stories[storyIdx - 1];
      setStoryIdx(storyIdx - 1);
      setPanelIdx(prevStory.panels.length - 1);
      setAnimStep(-1);
    }
  }, [panelIdx, storyIdx, stories]);

  const switchToStage2 = () => {
    setStage(2);
    setStoryIdx(0);
    setPanelIdx(0);
    setAnimStep(-1);
  };

  useEffect(() => {
    if (!panel.steps) return;
    setAnimStep(-1);
    const timer = setInterval(() => {
      setAnimStep(prev => {
        if (prev >= panel.steps.length - 1) { clearInterval(timer); return prev; }
        return prev + 1;
      });
    }, 1200);
    return () => clearInterval(timer);
  }, [panel]);

  const totalPanels = stories.reduce((s, st) => s + st.panels.length, 0);
  let currentPanel = 0;
  for (let i = 0; i < storyIdx; i++) currentPanel += stories[i].panels.length;
  currentPanel += panelIdx + 1;

  const isLastPanel = storyIdx === stories.length - 1 && panelIdx === story.panels.length - 1;

  return (
    <div className="intro-panel">
      {/* Stage toggle */}
      <div className="intro-stage-toggle">
        <button className={`stage-btn ${stage === 1 ? 'active' : ''}`}
          onClick={() => { setStage(1); setStoryIdx(0); setPanelIdx(0); setAnimStep(-1); }}>
          <FaBookReader /> Stage 1: Foundations
        </button>
        <button className={`stage-btn ${stage === 2 ? 'active' : ''}`}
          onClick={() => { setStage(2); setStoryIdx(0); setPanelIdx(0); setAnimStep(-1); }}>
          <FaGraduationCap /> Stage 2: Masters Deep Dive
        </button>
      </div>

      {/* Story navigation */}
      <div className="intro-story-nav">
        {stories.map((s, i) => {
          const NavIcon = s.icon;
          const key = stage + '-' + i;
          return (
            <button key={s.id}
              className={`intro-story-btn ${storyIdx === i ? 'active' : ''} ${completed.has(key) ? 'done' : ''}`}
              onClick={() => { setStoryIdx(i); setPanelIdx(0); setAnimStep(-1); }}>
              <NavIcon className="intro-story-icon" />
              <span className="intro-story-title">{s.title}</span>
              {completed.has(key) && <FaCheck className="intro-story-check" />}
            </button>
          );
        })}
      </div>

      {/* Progress */}
      <div className="intro-progress">
        <div className="intro-progress-bar">
          <div className="intro-progress-fill" style={{ width: `${(currentPanel / totalPanels) * 100}%` }} />
        </div>
        <span className="intro-progress-text">{currentPanel} / {totalPanels}</span>
      </div>

      {/* Main card */}
      <div className="intro-card">
        <div className="intro-card-header">
          <StoryIcon className="intro-card-icon" />
          <div>
            <h2 className="intro-card-title">{panel.heading}</h2>
            <span className="intro-card-subtitle">{story.title} -- {story.subtitle}</span>
          </div>
        </div>

        {panel.text && <p className="intro-card-text">{panel.text}</p>}

        {panel.bullets && (
          <ul className="intro-bullets">
            {panel.bullets.map((b, i) => {
              const BIcon = b.icon;
              return (<li key={i} className="intro-bullet"><BIcon className="intro-bullet-icon" /><span>{b.text}</span></li>);
            })}
          </ul>
        )}

        {panel.examples && (
          <div className="intro-examples">
            {panel.examples.map((ex, i) => {
              const ExIcon = ex.Icon;
              return (<div key={i} className="intro-example-card"><ExIcon className="intro-ex-icon" /><span className="intro-ex-text">{ex.text}</span></div>);
            })}
          </div>
        )}

        {panel.steps && (
          <div className="intro-steps">
            {panel.steps.map((step, i) => {
              const StepIcon = step.Icon;
              return (
                <div key={i} className={`intro-step ${i <= animStep ? 'visible' : ''} ${i === animStep ? 'current' : ''}`}>
                  <StepIcon className="intro-step-icon" />
                  <div className="intro-step-content">
                    <span className="intro-step-word">{step.word}</span>
                    <span className="intro-step-memory">{step.memory}</span>
                  </div>
                </div>
              );
            })}
            {animStep < panel.steps.length - 1 && (
              <button className="intro-play-steps-btn" onClick={() => setAnimStep(panel.steps.length - 1)}>
                <FaStepForward style={{ marginRight: 4 }} /> Show all steps
              </button>
            )}
          </div>
        )}

        {/* Formula block (Stage 2) */}
        {panel.formula && (
          <div className="intro-formula">
            <span className="intro-formula-label">{panel.formula.label}:</span>
            <code className="intro-formula-code">{panel.formula.code}</code>
          </div>
        )}

        {/* Analogy block (Stage 2) */}
        {panel.analogy && (
          <div className="intro-analogy">
            {panel.analogy.Icon && <panel.analogy.Icon className="intro-analogy-icon" />}
            <div>
              <strong className="intro-analogy-title">{panel.analogy.title}</strong>
              <p className="intro-analogy-text">{panel.analogy.text}</p>
            </div>
          </div>
        )}

        {/* Gates block (Stage 2) */}
        {panel.gates && (
          <div className="intro-gates-list">
            {panel.gates.map((gate, i) => (
              <div key={i} className="intro-gate-card" style={{ borderLeftColor: gate.color }}>
                <div className="intro-gate-header"><span style={{ color: gate.color, fontWeight: 800 }}>{gate.name}</span></div>
                <code className="intro-gate-formula">{gate.formula}</code>
                <p className="intro-gate-analogy"><FaLightbulb style={{ color: '#f59e0b', marginRight: 6 }} />{gate.analogy}</p>
              </div>
            ))}
          </div>
        )}

        {/* Highlight */}
        <div className="intro-highlight">
          <FaLightbulb className="intro-highlight-icon" />
          <span>{panel.highlight}</span>
        </div>
      </div>

      {/* Navigation */}
      <div className="intro-nav">
        <button className="intro-nav-btn prev" onClick={goPrev} disabled={storyIdx === 0 && panelIdx === 0}>
          <FaArrowLeft /> Previous
        </button>
        <div className="intro-dots">
          {story.panels.map((_, i) => (
            <span key={i} className={`intro-dot ${i === panelIdx ? 'active' : ''} ${i < panelIdx ? 'done' : ''}`} />
          ))}
        </div>
        {isLastPanel && stage === 1 ? (
          <button className="intro-nav-btn next stage2-btn" onClick={switchToStage2}>
            <FaGraduationCap /> Start Masters Deep Dive <FaArrowRight />
          </button>
        ) : isLastPanel && stage === 2 ? (
          <button className="intro-nav-btn next done-btn" onClick={() => { if (onNavigate) onNavigate('visualizer', 'advanced'); }}>
            <FaStar /> Explore the Interactive Tools <FaArrowRight />
          </button>
        ) : (
          <button className="intro-nav-btn next" onClick={goNext}>
            Next <FaArrowRight />
          </button>
        )}
      </div>

      {/* Tip */}
      <div className="intro-tip">
        <FaBookReader style={{ color: '#00467F', flexShrink: 0 }} />
        {stage === 1 ? (
          <span><strong>Stage 1:</strong> Building intuition with analogies. No math required! Complete all topics to unlock the Masters Deep Dive.</span>
        ) : (
          <span><strong>Stage 2:</strong> Stanford CS-230 level content with formulas, analogies, and detailed explanations. Each formula comes with a plain-English analogy to help it click.</span>
        )}
      </div>
    </div>
  );
}

export default IntroPanel;

import React, { useState, useEffect, useCallback } from 'react';
import {
  FaArrowRight, FaArrowLeft, FaBookReader, FaLightbulb,
  FaRocket, FaStar, FaCheck,
} from 'react-icons/fa';
import './IntroPanel.css';

/*
  Beginner-friendly introduction to RNNs using everyday analogies.
  Designed to be accessible to school-age students while still
  being useful for university learners.
*/

const STORIES = [
  {
    id: 'what',
    emoji: '🧠',
    title: 'What is an RNN?',
    subtitle: 'A brain that remembers',
    panels: [
      {
        visual: 'diary',
        heading: 'Imagine you have a diary...',
        text: 'Every night you write what happened today. Tomorrow, you read yesterday\'s entry before writing the new one. This way, you always remember what came before.',
        highlight: 'An RNN works the same way — it reads one piece of information at a time and keeps a "diary" (called a hidden state) of everything it has seen so far.',
      },
      {
        visual: 'chain',
        heading: 'It\'s like a chain of friends',
        text: 'Imagine passing a message along a line of friends. Each friend hears the message, adds their own thought, and passes it to the next person.',
        highlight: 'In an RNN, each "friend" is a time step. The message being passed is the hidden state — it carries memory from the past.',
      },
      {
        visual: 'formula-simple',
        heading: 'The simple idea',
        text: 'At each step, the RNN does just two things:',
        bullets: [
          '📖 Reads the new input (like a new word in a sentence)',
          '🧠 Combines it with what it remembers (the hidden state)',
          '✍️ Produces an output and updates its memory',
        ],
        highlight: 'That\'s it! Read → Remember → Output → Repeat. The same simple process at every step.',
      },
    ],
  },
  {
    id: 'why',
    emoji: '❓',
    title: 'Why do we need RNNs?',
    subtitle: 'Order matters!',
    panels: [
      {
        visual: 'order',
        heading: 'Order changes meaning',
        text: 'Think about these two sentences:',
        examples: [
          { text: '"The dog chased the cat"', icon: '🐕' },
          { text: '"The cat chased the dog"', icon: '🐈' },
        ],
        highlight: 'Same words, different order, completely different meaning! Regular neural networks can\'t tell the difference — they see all words at once like a bag of letters. RNNs read one word at a time, in order.',
      },
      {
        visual: 'sequence-types',
        heading: 'Sequences are everywhere',
        text: 'So many things in life come in sequences:',
        examples: [
          { text: 'Words in a sentence', icon: '📝' },
          { text: 'Notes in a song', icon: '🎵' },
          { text: 'Frames in a video', icon: '🎬' },
          { text: 'Weather over days', icon: '🌤️' },
          { text: 'Your heartbeat over time', icon: '💓' },
          { text: 'Steps in a recipe', icon: '👨‍🍳' },
        ],
        highlight: 'Whenever the order of things matters, an RNN can help!',
      },
    ],
  },
  {
    id: 'how',
    emoji: '⚙️',
    title: 'How does it work?',
    subtitle: 'Step by step',
    panels: [
      {
        visual: 'sentence-demo',
        heading: 'Let\'s predict the next word!',
        text: 'Suppose we want to predict what comes next in: "The cat sat on the ___"',
        steps: [
          { word: 'The', memory: 'Hmm, something is starting...', emoji: '🤔' },
          { word: 'cat', memory: 'Oh, we\'re talking about a cat!', emoji: '🐱' },
          { word: 'sat', memory: 'The cat is sitting somewhere', emoji: '🪑' },
          { word: 'on', memory: 'It\'s sitting ON something...', emoji: '👆' },
          { word: 'the', memory: 'On the... what? Probably a surface', emoji: '🤔' },
          { word: '???', memory: 'mat! (or floor, or chair)', emoji: '✨' },
        ],
        highlight: 'At each step, the RNN updates its memory. By the time it reaches "the ___", it has built up enough context to guess "mat"!',
      },
      {
        visual: 'memory-problem',
        heading: 'The memory problem 🤯',
        text: 'But what if the sentence is really long?',
        examples: [
          { text: '"I grew up in France. I went to school there. I learned many things. ... I speak fluent ___"', icon: '🇫🇷' },
        ],
        highlight: 'The answer is "French" — but the clue ("France") was way back at the start! Simple RNNs forget things that happened long ago. That\'s why we invented LSTM and GRU — they have special "gates" that help them remember important things for longer.',
      },
    ],
  },
  {
    id: 'gates',
    emoji: '🚪',
    title: 'Gates: The Memory Helpers',
    subtitle: 'LSTM & GRU explained simply',
    panels: [
      {
        visual: 'gates-analogy',
        heading: 'Think of gates like doors in your brain',
        text: 'Imagine your brain has three special doors:',
        examples: [
          { text: '🚪 Forget Door — Should I forget old stuff? (like clearing your desk)', icon: '🗑️' },
          { text: '🚪 Input Door — Should I save this new thing? (like writing a note)', icon: '📝' },
          { text: '🚪 Output Door — What should I say right now? (like raising your hand)', icon: '🙋' },
        ],
        highlight: 'LSTM has all three doors. GRU simplifies this to just two doors (Update and Reset) — it\'s like a more efficient version that works almost as well!',
      },
      {
        visual: 'gate-example',
        heading: 'A real example',
        text: 'Reading: "The movie was long and boring but the ending was amazing"',
        steps: [
          { word: 'The movie', memory: 'New topic: a movie', emoji: '🎬' },
          { word: 'was long', memory: 'Hmm, negative feeling', emoji: '😐' },
          { word: 'and boring', memory: 'Definitely negative!', emoji: '😴' },
          { word: 'but', memory: '⚡ FORGET GATE activates! Something is changing...', emoji: '🚪' },
          { word: 'the ending', memory: 'New subject within the movie', emoji: '🎯' },
          { word: 'was amazing', memory: 'INPUT GATE opens! Save this positive feeling!', emoji: '🤩' },
        ],
        highlight: 'The word "but" triggers the forget gate to reduce the negative memory, and "amazing" triggers the input gate to store the new positive sentiment. The final output? Positive review!',
      },
    ],
  },
  {
    id: 'attention',
    emoji: '👀',
    title: 'Attention: Focus on What Matters',
    subtitle: 'Like highlighting in a textbook',
    panels: [
      {
        visual: 'highlighter',
        heading: 'The highlighter analogy',
        text: 'When you study a textbook, you don\'t read every word equally. You highlight the important parts!',
        examples: [
          { text: 'Translating "The cat sat on the mat" to French', icon: '🇫🇷' },
          { text: 'When writing "chat" (cat), you focus on "cat" in the English sentence', icon: '🔍' },
          { text: 'When writing "tapis" (mat), you focus on "mat"', icon: '🎯' },
        ],
        highlight: 'Attention lets the model "highlight" different parts of the input for each output word. This was such a powerful idea that it led to Transformers — the technology behind ChatGPT!',
      },
    ],
  },
  {
    id: 'realworld',
    emoji: '🌍',
    title: 'RNNs in the Real World',
    subtitle: 'They\'re everywhere!',
    panels: [
      {
        visual: 'apps',
        heading: 'You use RNN-based technology every day',
        examples: [
          { text: '📱 Autocomplete on your phone — predicts your next word', icon: '⌨️' },
          { text: '🗣️ Siri/Alexa — understands your voice commands', icon: '🎤' },
          { text: '🌐 Google Translate — translates between languages', icon: '🔄' },
          { text: '🎵 Spotify — recommends songs based on listening history', icon: '🎧' },
          { text: '📧 Gmail — suggests email replies', icon: '💬' },
          { text: '🏥 Medical — predicts patient health from vital signs over time', icon: '❤️' },
          { text: '📈 Finance — predicts stock prices from historical data', icon: '💰' },
          { text: '🎮 Games — NPCs that remember your actions', icon: '🕹️' },
        ],
        highlight: 'While newer Transformer models have replaced RNNs in many tasks, the core ideas (hidden states, gates, attention) that RNNs pioneered are still the foundation of all modern AI language models!',
      },
    ],
  },
];

function IntroPanel() {
  const [storyIdx, setStoryIdx] = useState(0);
  const [panelIdx, setPanelIdx] = useState(0);
  const [animStep, setAnimStep] = useState(-1);
  const [completed, setCompleted] = useState(new Set());

  const story = STORIES[storyIdx];
  const panel = story.panels[panelIdx];

  const goNext = useCallback(() => {
    if (panelIdx < story.panels.length - 1) {
      setPanelIdx(panelIdx + 1);
      setAnimStep(-1);
    } else {
      setCompleted(prev => new Set([...prev, storyIdx]));
      if (storyIdx < STORIES.length - 1) {
        setStoryIdx(storyIdx + 1);
        setPanelIdx(0);
        setAnimStep(-1);
      }
    }
  }, [panelIdx, storyIdx, story.panels.length]);

  const goPrev = useCallback(() => {
    if (panelIdx > 0) {
      setPanelIdx(panelIdx - 1);
      setAnimStep(-1);
    } else if (storyIdx > 0) {
      const prevStory = STORIES[storyIdx - 1];
      setStoryIdx(storyIdx - 1);
      setPanelIdx(prevStory.panels.length - 1);
      setAnimStep(-1);
    }
  }, [panelIdx, storyIdx]);

  // Animate steps if panel has them
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

  const totalPanels = STORIES.reduce((s, st) => s + st.panels.length, 0);
  let currentPanel = 0;
  for (let i = 0; i < storyIdx; i++) currentPanel += STORIES[i].panels.length;
  currentPanel += panelIdx + 1;

  return (
    <div className="intro-panel">
      {/* Story navigation */}
      <div className="intro-story-nav">
        {STORIES.map((s, i) => (
          <button key={s.id}
            className={`intro-story-btn ${storyIdx === i ? 'active' : ''} ${completed.has(i) ? 'done' : ''}`}
            onClick={() => { setStoryIdx(i); setPanelIdx(0); setAnimStep(-1); }}>
            <span className="intro-story-emoji">{s.emoji}</span>
            <span className="intro-story-title">{s.title}</span>
            {completed.has(i) && <FaCheck className="intro-story-check" />}
          </button>
        ))}
      </div>

      {/* Progress bar */}
      <div className="intro-progress">
        <div className="intro-progress-bar">
          <div className="intro-progress-fill" style={{ width: `${(currentPanel / totalPanels) * 100}%` }} />
        </div>
        <span className="intro-progress-text">{currentPanel} / {totalPanels}</span>
      </div>

      {/* Main content card */}
      <div className="intro-card">
        <div className="intro-card-header">
          <span className="intro-card-emoji">{story.emoji}</span>
          <div>
            <h2 className="intro-card-title">{panel.heading}</h2>
            <span className="intro-card-subtitle">{story.title} — {story.subtitle}</span>
          </div>
        </div>

        <p className="intro-card-text">{panel.text}</p>

        {/* Bullets */}
        {panel.bullets && (
          <ul className="intro-bullets">
            {panel.bullets.map((b, i) => (
              <li key={i} className="intro-bullet">{b}</li>
            ))}
          </ul>
        )}

        {/* Examples grid */}
        {panel.examples && (
          <div className="intro-examples">
            {panel.examples.map((ex, i) => (
              <div key={i} className="intro-example-card">
                <span className="intro-ex-icon">{ex.icon}</span>
                <span className="intro-ex-text">{ex.text}</span>
              </div>
            ))}
          </div>
        )}

        {/* Animated steps */}
        {panel.steps && (
          <div className="intro-steps">
            {panel.steps.map((step, i) => (
              <div key={i} className={`intro-step ${i <= animStep ? 'visible' : ''} ${i === animStep ? 'current' : ''}`}>
                <span className="intro-step-emoji">{step.emoji}</span>
                <div className="intro-step-content">
                  <span className="intro-step-word">{step.word}</span>
                  <span className="intro-step-memory">{step.memory}</span>
                </div>
              </div>
            ))}
            {panel.steps && animStep < panel.steps.length - 1 && (
              <button className="intro-play-steps-btn"
                onClick={() => setAnimStep(panel.steps.length - 1)}>
                Show all steps ⏩
              </button>
            )}
          </div>
        )}

        {/* Highlight box */}
        <div className="intro-highlight">
          <FaLightbulb className="intro-highlight-icon" />
          <span>{panel.highlight}</span>
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="intro-nav">
        <button className="intro-nav-btn prev" onClick={goPrev}
          disabled={storyIdx === 0 && panelIdx === 0}>
          <FaArrowLeft /> Previous
        </button>
        <div className="intro-dots">
          {story.panels.map((_, i) => (
            <span key={i} className={`intro-dot ${i === panelIdx ? 'active' : ''} ${i < panelIdx ? 'done' : ''}`} />
          ))}
        </div>
        {storyIdx === STORIES.length - 1 && panelIdx === story.panels.length - 1 ? (
          <button className="intro-nav-btn next done-btn" onClick={() => setCompleted(prev => new Set([...prev, storyIdx]))}>
            <FaStar /> All Done!
          </button>
        ) : (
          <button className="intro-nav-btn next" onClick={goNext}>
            Next <FaArrowRight />
          </button>
        )}
      </div>

      {/* Tip for beginners */}
      <div className="intro-tip">
        <FaBookReader style={{ color: '#00467F', flexShrink: 0 }} />
        <span>
          <strong>Tip:</strong> After finishing this intro, try the <strong>RNN Flow</strong> tab to see it in action,
          or the <strong>Playground</strong> tab to generate text yourself!
        </span>
      </div>
    </div>
  );
}

export default IntroPanel;

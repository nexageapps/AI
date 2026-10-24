import React, { useState } from 'react';
import { FiAward, FiCheckCircle, FiXCircle, FiArrowRight, FiRotateCcw, FiStar, FiThumbsUp, FiBookOpen } from 'react-icons/fi';

const QUESTIONS = [
  {
    q: 'What does a convolution filter (kernel) do?',
    opts: ['Randomly shuffles pixel values', 'Slides across the image to detect specific patterns like edges',
      'Increases the image resolution', 'Converts color images to grayscale'],
    answer: 1,
    explain: 'A kernel slides across the image, multiplying and summing overlapping values to detect patterns like edges, corners, and textures.',
  },
  {
    q: 'Why is parameter sharing important in CNNs?',
    opts: ['It makes the network slower but more accurate',
      'The same filter weights are reused across all positions, reducing parameters dramatically',
      'Each pixel gets its own unique set of weights', 'It only works with grayscale images'],
    answer: 1,
    explain: 'Parameter sharing means the same filter is applied everywhere in the image. A 3x3 filter has only 9 parameters regardless of image size.',
  },
  {
    q: 'What does Max Pooling do?',
    opts: ['Adds more pixels to the image', 'Averages all values in the feature map',
      'Keeps the maximum value in each window, reducing spatial size', 'Applies a new convolution filter'],
    answer: 2,
    explain: 'Max Pooling takes the largest value in each pooling window, reducing the feature map size while keeping the strongest activations.',
  },
  {
    q: 'What is the output size of a 7x7 image convolved with a 3x3 kernel (stride 1, no padding)?',
    opts: ['7x7', '5x5', '3x3', '9x9'],
    answer: 1,
    explain: 'Output = (Input - Kernel) / Stride + 1 = (7 - 3) / 1 + 1 = 5. So the output is 5x5.',
  },
  {
    q: 'What do early layers of a CNN typically detect?',
    opts: ['Complete objects like cats and dogs', 'Simple features like edges and gradients',
      'Text and numbers', 'Colors only'],
    answer: 1,
    explain: 'Early layers detect low-level features (edges, gradients). Deeper layers combine these into increasingly complex patterns.',
  },
  {
    q: 'What is the purpose of the ReLU activation function in a CNN?',
    opts: ['To reduce the image size', 'To add non-linearity by zeroing out negative values',
      'To normalize pixel values to 0-1', 'To connect all neurons together'],
    answer: 1,
    explain: 'ReLU outputs max(0, x). It adds non-linearity, allowing the network to learn complex patterns.',
  },
  {
    q: 'Why are CNNs better than fully connected networks for images?',
    opts: ['They use more parameters', 'They process pixels independently',
      'They exploit spatial structure with local connectivity and parameter sharing',
      'They only work with small images'],
    answer: 2,
    explain: 'CNNs exploit spatial locality and use parameter sharing, making them far more efficient for image data.',
  },
  {
    q: 'What does "translation invariance" mean in CNNs?',
    opts: ['The network can translate text to different languages',
      'A feature is detected regardless of where it appears in the image',
      'The network only works with translated images', 'Filters move in one direction only'],
    answer: 1,
    explain: 'Translation invariance means a CNN can recognize a cat whether it appears in the top-left or bottom-right of the image.',
  },
  {
    q: 'What does Batch Normalization do in a CNN?',
    opts: ['Increases the batch size',
      'Normalizes layer inputs to have zero mean and unit variance for stable training',
      'Removes all negative values', 'Reduces the number of filters'],
    answer: 1,
    explain: 'Batch Normalization normalizes the inputs to each layer, helping the network train faster and more stably.',
  },
  {
    q: 'How does Dropout help prevent overfitting?',
    opts: ['It adds more training data',
      'It randomly disables neurons during training, forcing the network to be robust',
      'It removes the smallest weights', 'It increases the learning rate'],
    answer: 1,
    explain: 'Dropout randomly sets a fraction of neurons to zero during each training step, preventing co-adaptation.',
  },
];

export default function QuizPanel() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = QUESTIONS[current];

  const handleSelect = (idx) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === q.answer) setScore(s => s + 1);
  };

  const next = () => {
    if (current + 1 >= QUESTIONS.length) { setFinished(true); }
    else { setCurrent(c => c + 1); setSelected(null); }
  };

  const restart = () => { setCurrent(0); setSelected(null); setScore(0); setFinished(false); };

  if (finished) {
    const pct = Math.round((score / QUESTIONS.length) * 100);
    const Icon = pct >= 80 ? FiStar : pct >= 50 ? FiThumbsUp : FiBookOpen;
    return (
      <div className="panel" style={{ textAlign: 'center' }}>
        <h2><FiAward /> Quiz Complete</h2>
        <p style={{ fontSize: '1.2rem', margin: '20px 0' }}>
          You scored <strong>{score}/{QUESTIONS.length}</strong> ({pct}%)
        </p>
        <div className="info-box" style={{ display: 'inline-flex', justifyContent: 'center' }}>
          <Icon className="info-icon" />
          <div>
            {pct >= 80 ? 'Excellent! You have a solid understanding of CNNs.' :
             pct >= 50 ? 'Good effort! Review the tabs above to strengthen your knowledge.' :
             'Keep learning! Go through the Learn, Convolution, and Pooling tabs and try again.'}
          </div>
        </div>
        <div style={{ marginTop: 20 }}>
          <button className="btn btn-primary" onClick={restart}><FiRotateCcw /> Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="panel">
        <h2><FiAward /> CNN Knowledge Quiz</h2>
        <div className="quiz-progress">
          <div className="quiz-progress-bar" style={{ width: `${(current / QUESTIONS.length) * 100}%` }}></div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <span className="quiz-score">Question {current + 1} / {QUESTIONS.length}</span>
          <span className="quiz-score">Score: {score}</span>
        </div>

        <h3 style={{ marginBottom: 16 }}>{q.q}</h3>

        {q.opts.map((opt, i) => {
          let cls = 'quiz-option';
          if (selected !== null) {
            cls += ' disabled';
            if (i === q.answer) cls += ' correct';
            else if (i === selected && i !== q.answer) cls += ' wrong';
          }
          return (
            <button key={i} className={cls} onClick={() => handleSelect(i)}>
              {String.fromCharCode(65 + i)}. {opt}
            </button>
          );
        })}

        {selected !== null && (
          <>
            <div className={`info-box${selected === q.answer ? ' success' : ' warning'}`}>
              {selected === q.answer
                ? <FiCheckCircle className="info-icon" />
                : <FiXCircle className="info-icon" />}
              <div>{selected === q.answer ? 'Correct! ' : 'Not quite. '}{q.explain}</div>
            </div>
            <div style={{ marginTop: 12 }}>
              <button className="btn btn-primary" onClick={next}>
                {current + 1 >= QUESTIONS.length ? 'See Results' : <><FiArrowRight /> Next Question</>}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

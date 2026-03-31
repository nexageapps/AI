import React, { useState } from 'react';
import { FiAward, FiCheckCircle, FiXCircle, FiArrowRight, FiRotateCcw, FiStar, FiThumbsUp, FiBookOpen } from 'react-icons/fi';

const QUESTIONS = [
  { q: 'What does BPE stand for?', opts: ['Binary Pair Encoding', 'Byte Pair Encoding', 'Best Pair Extraction', 'Byte Pattern Embedding'],
    answer: 1, explain: 'BPE stands for Byte Pair Encoding, originally a data compression algorithm adapted for NLP tokenization.' },
  { q: 'What is the main advantage of subword tokenization over word-level?',
    opts: ['Faster processing', 'Can handle any word, including unseen ones, by breaking them into known subwords',
      'Smaller model size', 'Better grammar understanding'],
    answer: 1, explain: 'Subword tokenization can represent any word by combining known subword pieces, solving the out-of-vocabulary (OOV) problem.' },
  { q: 'In BPE, what gets merged at each step?',
    opts: ['The rarest pair', 'The most frequent adjacent pair of tokens', 'Random pairs', 'The longest tokens'],
    answer: 1, explain: 'BPE always merges the most frequent adjacent pair. This ensures common patterns get their own tokens first.' },
  { q: 'How would BPE likely tokenize "unhappiness" after training on English text?',
    opts: ['[unhappiness]', '[u, n, h, a, p, p, i, n, e, s, s]', '[un, happi, ness]', '[un, hap, pin, ess]'],
    answer: 2, explain: 'BPE learns common morphemes like "un", "happi", "ness" as subword tokens, producing meaningful splits.' },
  { q: 'What is the typical vocabulary size for GPT-2 BPE?',
    opts: ['256 tokens', '5,000 tokens', '50,257 tokens', '1 million tokens'],
    answer: 2, explain: 'GPT-2 uses approximately 50,257 BPE tokens — a balance between vocabulary coverage and sequence length.' },
  { q: 'What problem does character-level tokenization have?',
    opts: ['Cannot handle new words', 'Creates very long sequences that are expensive to process',
      'Requires a huge vocabulary', 'Only works with English'],
    answer: 1, explain: 'Character-level creates very long sequences (each character is a token), making attention O(n^2) much more expensive.' },
  { q: 'What is the end-of-word marker used for in BPE?',
    opts: ['To mark sentence boundaries', 'To distinguish word-final tokens from word-internal ones',
      'To pad sequences', 'To separate paragraphs'],
    answer: 1, explain: 'The end-of-word marker (like "_" or "</w>") lets BPE distinguish "er" at the end of "lower" from "er" in "eraser".' },
  { q: 'Which tokenization method does BERT use?',
    opts: ['BPE', 'Character-level', 'WordPiece (similar to BPE)', 'Word-level'],
    answer: 2, explain: 'BERT uses WordPiece, which is similar to BPE but uses likelihood instead of frequency to choose merges.' },
];

export default function QuizPanel() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const q = QUESTIONS[current];
  const handleSelect = (idx) => { if (selected !== null) return; setSelected(idx); if (idx === q.answer) setScore(s => s + 1); };
  const next = () => { if (current + 1 >= QUESTIONS.length) setFinished(true); else { setCurrent(c => c + 1); setSelected(null); } };
  const restart = () => { setCurrent(0); setSelected(null); setScore(0); setFinished(false); };

  if (finished) {
    const pct = Math.round((score / QUESTIONS.length) * 100);
    const Icon = pct >= 80 ? FiStar : pct >= 50 ? FiThumbsUp : FiBookOpen;
    return (
      <div className="panel" style={{ textAlign: 'center' }}>
        <h2><FiAward /> Quiz Complete</h2>
        <p style={{ fontSize: '1.2rem', margin: '20px 0' }}>You scored <strong>{score}/{QUESTIONS.length}</strong> ({pct}%)</p>
        <div className="info-box" style={{ display: 'inline-flex', justifyContent: 'center' }}>
          <Icon className="info-icon" />
          <div>{pct >= 80 ? 'Excellent! You understand BPE tokenization well.' : pct >= 50 ? 'Good effort! Review the BPE Algorithm tab.' : 'Keep learning! Step through the BPE algorithm a few times.'}</div>
        </div>
        <div style={{ marginTop: 20 }}><button className="btn btn-primary" onClick={restart}><FiRotateCcw /> Try Again</button></div>
      </div>
    );
  }
  return (
    <div><div className="panel">
      <h2><FiAward /> BPE Quiz</h2>
      <div className="quiz-progress"><div className="quiz-progress-bar" style={{ width: `${(current / QUESTIONS.length) * 100}%` }}></div></div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <span className="quiz-score">Question {current + 1} / {QUESTIONS.length}</span>
        <span className="quiz-score">Score: {score}</span>
      </div>
      <h3 style={{ marginBottom: 16 }}>{q.q}</h3>
      {q.opts.map((opt, i) => {
        let cls = 'quiz-option';
        if (selected !== null) { cls += ' disabled'; if (i === q.answer) cls += ' correct'; else if (i === selected) cls += ' wrong'; }
        return <button key={i} className={cls} onClick={() => handleSelect(i)}>{String.fromCharCode(65+i)}. {opt}</button>;
      })}
      {selected !== null && (
        <>
          <div className={`info-box${selected === q.answer ? ' success' : ' warning'}`}>
            {selected === q.answer ? <FiCheckCircle className="info-icon" /> : <FiXCircle className="info-icon" />}
            <div>{selected === q.answer ? 'Correct! ' : 'Not quite. '}{q.explain}</div>
          </div>
          <div style={{ marginTop: 12 }}><button className="btn btn-primary" onClick={next}>
            {current + 1 >= QUESTIONS.length ? 'See Results' : <><FiArrowRight /> Next</>}
          </button></div>
        </>
      )}
    </div></div>
  );
}

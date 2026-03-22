import React, { useState } from 'react';
import './QuizPanel.css';

function QuizPanel({ questions }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = questions[currentQ];

  const handleSelect = (idx) => {
    if (showAnswer) return;
    setSelected(idx);
    setShowAnswer(true);
    setAnswered(a => a + 1);
    if (q.options[idx].correct) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(c => c + 1);
      setSelected(null);
      setShowAnswer(false);
    } else {
      setFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setSelected(null);
    setShowAnswer(false);
    setScore(0);
    setAnswered(0);
    setFinished(false);
  };

  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    const emoji = pct >= 80 ? '🏆' : pct >= 60 ? '👍' : pct >= 40 ? '📚' : '💪';
    return (
      <div className="quiz-panel">
        <div className="quiz-result">
          <span className="result-big-emoji">{emoji}</span>
          <h2 className="result-title">
            {pct >= 80 ? 'Amazing!' : pct >= 60 ? 'Good job!' : pct >= 40 ? 'Keep learning!' : 'Don\'t give up!'}
          </h2>
          <p className="result-score">You got {score} out of {questions.length} correct ({pct}%)</p>
          <div className="result-bar-bg">
            <div className="result-bar-fill" style={{ width: `${pct}%` }} />
          </div>
          <button className="quiz-restart-btn" onClick={handleRestart}>🔄 Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-panel">
      <div className="quiz-progress">
        <div className="quiz-progress-bar">
          <div className="quiz-progress-fill" style={{ width: `${(currentQ / questions.length) * 100}%` }} />
        </div>
        <span className="quiz-progress-text">Question {currentQ + 1} of {questions.length}</span>
        <span className="quiz-score-badge">Score: {score}/{answered}</span>
      </div>

      <div className="quiz-card">
        <div className="quiz-difficulty">
          <span className={`diff-badge ${q.difficulty}`}>
            {q.difficulty === 'beginner' ? '🟢 Easy' : q.difficulty === 'intermediate' ? '🟡 Medium' : '🔴 Hard'}
          </span>
        </div>
        <div className="quiz-question">
          <span className="q-emoji">{q.emoji}</span>
          <p className="q-text">{q.question}</p>
        </div>

        <div className="quiz-options">
          {q.options.map((opt, i) => {
            let cls = 'quiz-option';
            if (showAnswer) {
              if (opt.correct) cls += ' correct';
              else if (i === selected) cls += ' wrong';
            } else if (i === selected) {
              cls += ' selected';
            }
            return (
              <button key={i} className={cls} onClick={() => handleSelect(i)} disabled={showAnswer}>
                {opt.text}
              </button>
            );
          })}
        </div>

        {showAnswer && (
          <div className={`quiz-explanation ${q.options[selected]?.correct ? 'is-correct' : 'is-wrong'}`}>
            <span className="explain-icon">{q.options[selected]?.correct ? '✅' : '❌'}</span>
            <p>{q.explanation}</p>
          </div>
        )}

        {showAnswer && (
          <button className="quiz-next-btn" onClick={handleNext}>
            {currentQ < questions.length - 1 ? 'Next Question →' : 'See Results 🎉'}
          </button>
        )}
      </div>
    </div>
  );
}

export default QuizPanel;

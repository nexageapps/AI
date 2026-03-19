import React, { useState } from 'react';
import './QuestionBox.css';

/**
 * QuestionBox – simple RAG simulation.
 * User asks a question; the app searches triples via keyword matching.
 * Props:
 *   triples – array of { subject, predicate, object }
 */
export default function QuestionBox({ triples }) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer]     = useState(null);

  const handleAsk = () => {
    if (!question.trim() || triples.length === 0) return;
    setAnswer(queryTriples(question.trim(), triples));
  };

  return (
    <div className="question-card">
      <h2 className="section-title">Question Answering</h2>
      <p className="section-hint">
        Ask a question about the facts you entered. Uses keyword matching over the extracted triples (RAG simulation).
      </p>

      <div className="qa-row">
        <input
          className="qa-input"
          type="text"
          placeholder='e.g. "Where was Einstein born?"'
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
        />
        <button className="btn-ask" onClick={handleAsk} disabled={!question.trim() || triples.length === 0}>
          Ask
        </button>
      </div>

      {answer && (
        <div className={`answer-box ${answer.found ? 'found' : 'not-found'}`}>
          {answer.found ? (
            <>
              <span className="answer-label">Answer:</span>
              <span className="answer-text">{answer.text}</span>
              <div className="answer-source">
                Source triple: ({answer.triple.subject}, {answer.triple.predicate}, {answer.triple.object})
              </div>
            </>
          ) : (
            <span className="answer-text">No matching triple found for that question.</span>
          )}
        </div>
      )}

      {/* LLM placeholder prompt */}
      <details className="llm-prompt">
        <summary>LLM Prompt (placeholder)</summary>
        <pre>{`Answer the following question using ONLY the provided RDF triples.
Triples: ${JSON.stringify(triples, null, 2)}
Question: ${question || '<your question>'}
Answer concisely.`}</pre>
      </details>
    </div>
  );
}

/**
 * Simple keyword-based triple search.
 * Tokenises the question and looks for matching subjects/predicates/objects.
 */
function queryTriples(question, triples) {
  const tokens = question.toLowerCase().replace(/[?!.,]/g, '').split(/\s+/);

  // Predicate keyword map
  const predicateHints = {
    born:     ['born_in', 'lives_in'],
    live:     ['lives_in'],
    located:  ['located_in'],
    location: ['located_in'],
    work:     ['works_in'],
    study:    ['studies'],
    invent:   ['invented'],
    found:    ['founded'],
    teach:    ['teaches'],
    capital:  ['capital_of'],
    part:     ['part_of'],
    belong:   ['belongs_to'],
    type:     ['is_a'],
    kind:     ['is_a'],
  };

  // Find candidate predicates from question tokens
  const candidatePredicates = new Set();
  for (const token of tokens) {
    for (const [hint, preds] of Object.entries(predicateHints)) {
      if (token.startsWith(hint)) preds.forEach(p => candidatePredicates.add(p));
    }
  }

  // Score each triple
  let best = null;
  let bestScore = 0;

  for (const triple of triples) {
    let score = 0;
    const subjectLower    = triple.subject.toLowerCase();
    const predicateLower  = triple.predicate.toLowerCase();
    const objectLower     = triple.object.toLowerCase();

    // Subject match
    if (tokens.some(tok => subjectLower.includes(tok) || tok.includes(subjectLower))) score += 3;
    // Predicate match
    if (candidatePredicates.has(triple.predicate)) score += 2;
    if (tokens.some(tok => predicateLower.includes(tok))) score += 1;
    // Object match (lower weight — it's usually the answer)
    if (tokens.some(tok => objectLower.includes(tok))) score += 1;

    if (score > bestScore) {
      bestScore = score;
      best = triple;
    }
  }

  if (!best || bestScore < 2) return { found: false };

  // Determine which part of the triple is the answer
  const subjectLower = best.subject.toLowerCase();
  const objectLower  = best.object.toLowerCase();
  const subjectInQ   = tokens.some(tok => subjectLower.includes(tok) || tok.includes(subjectLower));
  const objectInQ    = tokens.some(tok => objectLower.includes(tok) || tok.includes(objectLower));

  let answerText;
  if (subjectInQ && !objectInQ) {
    answerText = best.object;
  } else if (objectInQ && !subjectInQ) {
    answerText = best.subject;
  } else {
    answerText = `${best.subject} → ${best.predicate} → ${best.object}`;
  }

  return { found: true, text: answerText, triple: best };
}

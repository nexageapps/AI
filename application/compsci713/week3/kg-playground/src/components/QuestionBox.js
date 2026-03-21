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
        Ask a question about the facts you entered. Uses enhanced semantic search with fuzzy matching, n-gram overlap, and question type detection over extracted triples (RAG simulation).
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
              {answer.confidence && (
                <div className="answer-confidence">
                  Confidence: {(answer.confidence * 100).toFixed(0)}%
                </div>
              )}
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
 * Enhanced semantic search over triples.
 * Uses multiple scoring strategies:
 * 1. Exact and partial entity matching with fuzzy similarity
 * 2. Semantic predicate mapping with synonyms
 * 3. N-gram overlap for better phrase matching
 * 4. Question type detection (who, what, where, when, how many)
 */
function queryTriples(question, triples) {
  const questionLower = question.toLowerCase();
  const tokens = questionLower.replace(/[?!.,]/g, '').split(/\s+/).filter(t => t.length > 2);

  // Detect question type for better predicate matching
  const questionType = detectQuestionType(questionLower);

  // Enhanced predicate mapping with synonyms and question types
  const predicateMap = {
    born:       { predicates: ['born_in'], types: ['where', 'when'] },
    birth:      { predicates: ['born_in'], types: ['where', 'when'] },
    died:       { predicates: ['died_in'], types: ['where', 'when'] },
    death:      { predicates: ['died_in'], types: ['where', 'when'] },
    live:       { predicates: ['lives_in', 'lived'], types: ['where'] },
    lives:      { predicates: ['lives_in'], types: ['where'] },
    lived:      { predicates: ['lives_in', 'lived'], types: ['where'] },
    reside:     { predicates: ['lives_in'], types: ['where'] },
    located:    { predicates: ['located_in'], types: ['where'] },
    location:   { predicates: ['located_in'], types: ['where'] },
    based:      { predicates: ['located_in', 'based'], types: ['where'] },
    situated:   { predicates: ['located_in'], types: ['where'] },
    work:       { predicates: ['works_at', 'employed'], types: ['where'] },
    works:      { predicates: ['works_at'], types: ['where'] },
    worked:     { predicates: ['works_at'], types: ['where'] },
    employed:   { predicates: ['works_at', 'employed'], types: ['where'] },
    study:      { predicates: ['studies', 'studied'], types: ['what'] },
    studied:    { predicates: ['studies', 'studied'], types: ['what'] },
    research:   { predicates: ['studies', 'researches'], types: ['what'] },
    invent:     { predicates: ['invented', 'created', 'developed'], types: ['what'] },
    invented:   { predicates: ['invented'], types: ['what'] },
    created:    { predicates: ['invented', 'created'], types: ['what'] },
    developed:  { predicates: ['invented', 'developed'], types: ['what'] },
    discovered: { predicates: ['invented', 'discovered'], types: ['what'] },
    found:      { predicates: ['founded_in'], types: ['when'] },
    founded:    { predicates: ['founded_in'], types: ['when'] },
    established:{ predicates: ['founded_in'], types: ['when'] },
    teach:      { predicates: ['teaches'], types: ['what'] },
    taught:     { predicates: ['teaches'], types: ['what'] },
    capital:    { predicates: ['capital_of'], types: ['what', 'where'] },
    part:       { predicates: ['part_of'], types: ['what'] },
    member:     { predicates: ['part_of'], types: ['what'] },
    belong:     { predicates: ['belongs_to'], types: ['what'] },
    type:       { predicates: ['is_a'], types: ['what'] },
    kind:       { predicates: ['is_a'], types: ['what'] },
    known:      { predicates: ['known_as', 'also_known_as'], types: ['what'] },
    called:     { predicates: ['known_as'], types: ['what'] },
    ranked:     { predicates: ['ranked_in'], types: ['what', 'how_many'] },
    rank:       { predicates: ['ranked_in'], types: ['what', 'how_many'] },
    has:        { predicates: ['has'], types: ['how_many', 'what'] },
    have:       { predicates: ['has'], types: ['how_many', 'what'] },
    many:       { predicates: ['has'], types: ['how_many'] },
    number:     { predicates: ['has'], types: ['how_many'] },
    received:   { predicates: ['received', 'received_for'], types: ['what'] },
    won:        { predicates: ['received', 'won'], types: ['what'] },
    awarded:    { predicates: ['received'], types: ['what'] },
    married:    { predicates: ['married_to'], types: ['who'] },
    spouse:     { predicates: ['married_to'], types: ['who'] },
    parent:     { predicates: ['parent_of'], types: ['who'] },
    child:      { predicates: ['child_of'], types: ['who'] },
    attended:   { predicates: ['attended'], types: ['where'] },
    graduated:  { predicates: ['attended'], types: ['where'] },
    wrote:      { predicates: ['wrote', 'authored'], types: ['what'] },
    authored:   { predicates: ['wrote'], types: ['what'] },
    published:  { predicates: ['wrote'], types: ['what'] },
  };

  // Find candidate predicates from question
  const candidatePredicates = new Set();
  for (const token of tokens) {
    for (const [keyword, info] of Object.entries(predicateMap)) {
      if (token.includes(keyword) || keyword.includes(token)) {
        // Boost if question type matches
        if (!questionType || info.types.includes(questionType)) {
          info.predicates.forEach(p => candidatePredicates.add(p));
        }
      }
    }
  }

  // Score each triple using multiple strategies
  const scoredTriples = triples.map(triple => {
    let score = 0;
    const subjectLower = triple.subject.toLowerCase();
    const predicateLower = triple.predicate.toLowerCase();
    const objectLower = triple.object.toLowerCase();

    // 1. Entity matching with fuzzy similarity
    const subjectSimilarity = calculateSimilarity(questionLower, subjectLower);
    const objectSimilarity = calculateSimilarity(questionLower, objectLower);
    
    // Exact entity match (highest weight)
    if (questionLower.includes(subjectLower) || subjectLower.includes(questionLower)) {
      score += 5;
    } else if (subjectSimilarity > 0.6) {
      score += 3 * subjectSimilarity;
    }
    
    if (questionLower.includes(objectLower) || objectLower.includes(questionLower)) {
      score += 2;
    } else if (objectSimilarity > 0.6) {
      score += 1.5 * objectSimilarity;
    }

    // 2. Token-level matching with position weighting
    tokens.forEach((token, idx) => {
      const positionWeight = 1 + (tokens.length - idx) / tokens.length * 0.5;
      
      if (subjectLower.includes(token) || token.length > 3 && subjectLower.split(/\s+/).some(w => w.includes(token))) {
        score += 2 * positionWeight;
      }
      if (objectLower.includes(token) || token.length > 3 && objectLower.split(/\s+/).some(w => w.includes(token))) {
        score += 1 * positionWeight;
      }
      if (predicateLower.includes(token)) {
        score += 1.5 * positionWeight;
      }
    });

    // 3. Predicate matching with semantic mapping
    if (candidatePredicates.has(triple.predicate)) {
      score += 4;
    }
    
    // Additional predicate similarity
    const predicateWords = predicateLower.split('_');
    if (tokens.some(tok => predicateWords.some(pw => pw.includes(tok) || tok.includes(pw)))) {
      score += 2;
    }

    // 4. N-gram overlap (bigrams and trigrams)
    const questionNgrams = extractNgrams(questionLower, 2, 3);
    const tripleText = `${subjectLower} ${predicateLower.replace(/_/g, ' ')} ${objectLower}`;
    const tripleNgrams = extractNgrams(tripleText, 2, 3);
    
    const ngramOverlap = questionNgrams.filter(ng => tripleNgrams.includes(ng)).length;
    score += ngramOverlap * 1.5;

    // 5. Question type bonus
    if (questionType) {
      if (questionType === 'where' && ['located_in', 'lives_in', 'born_in', 'works_at'].includes(triple.predicate)) {
        score += 2;
      } else if (questionType === 'when' && ['founded_in', 'born_in', 'died_in'].includes(triple.predicate)) {
        score += 2;
      } else if (questionType === 'who' && ['married_to', 'parent_of', 'child_of'].includes(triple.predicate)) {
        score += 2;
      } else if (questionType === 'how_many' && triple.predicate === 'has') {
        score += 2;
      }
    }

    return { triple, score };
  });

  // Sort by score and get best match
  scoredTriples.sort((a, b) => b.score - a.score);
  const best = scoredTriples[0];

  // Require minimum score threshold
  if (!best || best.score < 3) return { found: false };

  // Determine answer based on what's in the question
  const subjectLower = best.triple.subject.toLowerCase();
  const objectLower = best.triple.object.toLowerCase();
  const subjectInQ = tokens.some(tok => subjectLower.includes(tok) || tok.includes(subjectLower)) ||
                     questionLower.includes(subjectLower);
  const objectInQ = tokens.some(tok => objectLower.includes(tok) || tok.includes(objectLower)) ||
                    questionLower.includes(objectLower);

  let answerText;
  if (subjectInQ && !objectInQ) {
    answerText = best.triple.object;
  } else if (objectInQ && !subjectInQ) {
    answerText = best.triple.subject;
  } else {
    // Both or neither in question - return full triple
    answerText = `${best.triple.subject} ${best.triple.predicate.replace(/_/g, ' ')} ${best.triple.object}`;
  }

  return { 
    found: true, 
    text: answerText, 
    triple: best.triple,
    confidence: Math.min(0.99, best.score / 15).toFixed(2)
  };
}

/**
 * Detect question type from question words
 */
function detectQuestionType(question) {
  if (/\b(where|location|place)\b/i.test(question)) return 'where';
  if (/\b(when|year|date|time)\b/i.test(question)) return 'when';
  if (/\b(who|whom|whose|person|people)\b/i.test(question)) return 'who';
  if (/\b(how many|how much|number of|count)\b/i.test(question)) return 'how_many';
  if (/\b(what|which)\b/i.test(question)) return 'what';
  return null;
}

/**
 * Calculate string similarity using Jaccard index on character bigrams
 */
function calculateSimilarity(str1, str2) {
  const bigrams1 = new Set(extractNgrams(str1, 2, 2));
  const bigrams2 = new Set(extractNgrams(str2, 2, 2));
  
  const intersection = [...bigrams1].filter(x => bigrams2.has(x)).length;
  const union = bigrams1.size + bigrams2.size - intersection;
  
  return union === 0 ? 0 : intersection / union;
}

/**
 * Extract n-grams from text
 */
function extractNgrams(text, minN = 2, maxN = 2) {
  const words = text.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/).filter(Boolean);
  const ngrams = [];
  
  for (let n = minN; n <= maxN; n++) {
    for (let i = 0; i <= words.length - n; i++) {
      ngrams.push(words.slice(i, i + n).join(' '));
    }
  }
  
  return ngrams;
}

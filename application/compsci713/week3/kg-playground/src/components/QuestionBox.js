import React, { useState } from 'react';
import './QuestionBox.css';

/**
 * QuestionBox – RAG simulation with multi-hop reasoning.
 * User asks a question; the app searches triples via semantic search.
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
        Ask a question about the facts you entered. Supports multi-hop reasoning (AND/OR queries), fuzzy matching, n-gram overlap, and question type detection (RAG simulation).
      </p>

      <div className="qa-row">
        <input
          className="qa-input"
          type="text"
          placeholder='e.g. "Who worked in Physics AND was born in Europe?"'
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
                  {answer.multiHop && <span className="multi-hop-badge"> (Multi-hop)</span>}
                </div>
              )}
              <div className="answer-source">
                {answer.multiHop && answer.supportingTriples ? (
                  <>
                    Supporting triples:
                    {answer.supportingTriples.slice(0, 3).map((t, i) => (
                      <div key={i} style={{ marginLeft: '10px', fontSize: '0.85em' }}>
                        • ({t.subject}, {t.predicate}, {t.object})
                      </div>
                    ))}
                  </>
                ) : (
                  <>Source triple: ({answer.triple.subject}, {answer.triple.predicate}, {answer.triple.object})</>
                )}
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
 * Main query function with multi-hop reasoning support
 */
function queryTriples(question, triples) {
  const questionLower = question.toLowerCase();
  const tokens = questionLower.replace(/[?!.,]/g, '').split(/\s+/).filter(t => t.length > 2);

  // Detect if this is a multi-condition query (AND/OR)
  const hasAnd = /\band\b/i.test(questionLower);
  const hasOr = /\bor\b/i.test(questionLower);
  
  if (hasAnd || hasOr) {
    return handleMultiHopQuery(question, questionLower, tokens, triples, hasAnd ? 'AND' : 'OR');
  }

  // Single-hop query
  return querySingleTriple(questionLower, tokens, triples);
}

/**
 * Handle multi-hop queries with AND/OR conditions
 * Example: "Who worked in Physics AND was born in Europe?"
 */
function handleMultiHopQuery(question, questionLower, tokens, triples, operator) {
  // Split question by AND/OR
  const parts = questionLower.split(new RegExp(`\\s+${operator.toLowerCase()}\\s+`, 'i'));
  
  if (parts.length < 2) {
    return querySingleTriple(questionLower, tokens, triples);
  }

  // Extract conditions from each part
  const conditions = parts.map(part => extractCondition(part.trim(), triples));
  
  // Build entity graph for traversal
  const entityGraph = buildEntityGraph(triples);
  
  // Find entities that satisfy all/any conditions
  const matchingEntities = findMatchingEntities(conditions, entityGraph, operator);
  
  if (matchingEntities.length === 0) {
    return { found: false };
  }

  // Return the best matching entity
  const bestEntity = matchingEntities[0];
  const supportingTriples = bestEntity.triples;
  
  return {
    found: true,
    text: bestEntity.entity,
    triple: supportingTriples[0],
    confidence: Math.min(0.99, bestEntity.confidence).toFixed(2),
    multiHop: true,
    supportingTriples: supportingTriples
  };
}

/**
 * Extract condition from a query part
 */
function extractCondition(part, triples) {
  const tokens = part.split(/\s+/).filter(t => t.length > 2);
  
  // Common patterns
  const patterns = [
    { re: /(?:worked?|works?|employed)\s+(?:in|at)\s+(.+)/, predicate: 'works_at' },
    { re: /(?:born|birth)\s+(?:in|at)\s+(.+)/, predicate: 'born_in' },
    { re: /(?:lived?|lives?|resides?)\s+(?:in|at)\s+(.+)/, predicate: 'lives_in' },
    { re: /(?:located|based|situated)\s+(?:in|at)\s+(.+)/, predicate: 'located_in' },
    { re: /(?:studied?|studies?)\s+(.+)/, predicate: 'studies' },
    { re: /(?:invented?|created?|developed?)\s+(.+)/, predicate: 'invented' },
    { re: /(?:received?|won|awarded?)\s+(.+)/, predicate: 'received' },
  ];
  
  for (const pattern of patterns) {
    const match = part.match(pattern.re);
    if (match) {
      return {
        predicate: pattern.predicate,
        value: normalizeValue(match[1]),
        tokens: tokens
      };
    }
  }
  
  return {
    predicate: null,
    value: tokens.join(' '),
    tokens: tokens
  };
}

/**
 * Build entity graph for traversal
 */
function buildEntityGraph(triples) {
  const graph = new Map();
  
  for (const triple of triples) {
    if (!graph.has(triple.subject)) {
      graph.set(triple.subject, { outgoing: [], incoming: [] });
    }
    
    if (!graph.has(triple.object) && isEntity(triple.object)) {
      graph.set(triple.object, { outgoing: [], incoming: [] });
    }
    
    graph.get(triple.subject).outgoing.push({
      predicate: triple.predicate,
      target: triple.object,
      triple: triple
    });
    
    if (isEntity(triple.object)) {
      graph.get(triple.object).incoming.push({
        predicate: triple.predicate,
        source: triple.subject,
        triple: triple
      });
    }
  }
  
  return graph;
}

/**
 * Check if a value is an entity (not a literal)
 */
function isEntity(value) {
  if (/^\d+$/.test(value)) return false;
  if (/^\d{4}$/.test(value)) return false;
  return true;
}

/**
 * Find entities matching all/any conditions
 */
function findMatchingEntities(conditions, entityGraph, operator) {
  const results = [];
  
  for (const [entity, node] of entityGraph.entries()) {
    const matchedConditions = [];
    let totalConfidence = 0;
    
    for (const condition of conditions) {
      const match = checkCondition(entity, condition, node, entityGraph);
      if (match.matched) {
        matchedConditions.push(match);
        totalConfidence += match.confidence;
      }
    }
    
    const satisfies = operator === 'AND' 
      ? matchedConditions.length === conditions.length
      : matchedConditions.length > 0;
    
    if (satisfies) {
      results.push({
        entity: entity,
        confidence: totalConfidence / conditions.length,
        triples: matchedConditions.flatMap(m => m.triples),
        matchedConditions: matchedConditions
      });
    }
  }
  
  results.sort((a, b) => b.confidence - a.confidence);
  return results;
}

/**
 * Check if an entity satisfies a condition (with 1-hop traversal)
 */
function checkCondition(entity, condition, node, entityGraph) {
  const result = { matched: false, confidence: 0, triples: [] };
  
  // Direct match
  for (const edge of node.outgoing) {
    const predicateMatch = !condition.predicate || edge.predicate === condition.predicate;
    const valueMatch = matchValue(edge.target, condition.value);
    
    if (predicateMatch && valueMatch > 0.5) {
      result.matched = true;
      result.confidence = Math.max(result.confidence, valueMatch);
      result.triples.push(edge.triple);
    }
  }
  
  // 1-hop traversal
  if (!result.matched) {
    for (const edge of node.outgoing) {
      if (isEntity(edge.target) && entityGraph.has(edge.target)) {
        const targetNode = entityGraph.get(edge.target);
        for (const targetEdge of targetNode.outgoing) {
          const valueMatch = matchValue(targetEdge.target, condition.value);
          if (valueMatch > 0.5) {
            result.matched = true;
            result.confidence = Math.max(result.confidence, valueMatch * 0.8);
            result.triples.push(edge.triple, targetEdge.triple);
          }
        }
      }
    }
  }
  
  return result;
}

/**
 * Match a value against a condition value
 */
function matchValue(value, conditionValue) {
  const valueLower = value.toLowerCase();
  const conditionLower = conditionValue.toLowerCase();
  
  if (valueLower === conditionLower) return 1.0;
  if (valueLower.includes(conditionLower) || conditionLower.includes(valueLower)) return 0.9;
  
  return calculateSimilarity(valueLower, conditionLower);
}

/**
 * Normalize extracted value
 */
function normalizeValue(value) {
  return value.trim()
    .replace(/^(the|a|an)\s+/i, '')
    .replace(/\s+/g, ' ');
}

/**
 * Single-hop query (enhanced semantic search)
 */
function querySingleTriple(questionLower, tokens, triples) {
  const questionType = detectQuestionType(questionLower);

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

  const candidatePredicates = new Set();
  for (const token of tokens) {
    for (const [keyword, info] of Object.entries(predicateMap)) {
      if (token.includes(keyword) || keyword.includes(token)) {
        if (!questionType || info.types.includes(questionType)) {
          info.predicates.forEach(p => candidatePredicates.add(p));
        }
      }
    }
  }

  const scoredTriples = triples.map(triple => {
    let score = 0;
    const subjectLower = triple.subject.toLowerCase();
    const predicateLower = triple.predicate.toLowerCase();
    const objectLower = triple.object.toLowerCase();

    const subjectSimilarity = calculateSimilarity(questionLower, subjectLower);
    const objectSimilarity = calculateSimilarity(questionLower, objectLower);
    
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

    if (candidatePredicates.has(triple.predicate)) {
      score += 4;
    }
    
    const predicateWords = predicateLower.split('_');
    if (tokens.some(tok => predicateWords.some(pw => pw.includes(tok) || tok.includes(pw)))) {
      score += 2;
    }

    const questionNgrams = extractNgrams(questionLower, 2, 3);
    const tripleText = `${subjectLower} ${predicateLower.replace(/_/g, ' ')} ${objectLower}`;
    const tripleNgrams = extractNgrams(tripleText, 2, 3);
    
    const ngramOverlap = questionNgrams.filter(ng => tripleNgrams.includes(ng)).length;
    score += ngramOverlap * 1.5;

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

  scoredTriples.sort((a, b) => b.score - a.score);
  const best = scoredTriples[0];

  if (!best || best.score < 3) return { found: false };

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
    answerText = `${best.triple.subject} ${best.triple.predicate.replace(/_/g, ' ')} ${best.triple.object}`;
  }

  return { 
    found: true, 
    text: answerText, 
    triple: best.triple,
    confidence: Math.min(0.99, best.score / 15).toFixed(2)
  };
}

function detectQuestionType(question) {
  if (/\b(where|location|place)\b/i.test(question)) return 'where';
  if (/\b(when|year|date|time)\b/i.test(question)) return 'when';
  if (/\b(who|whom|whose|person|people)\b/i.test(question)) return 'who';
  if (/\b(how many|how much|number of|count)\b/i.test(question)) return 'how_many';
  if (/\b(what|which)\b/i.test(question)) return 'what';
  return null;
}

function calculateSimilarity(str1, str2) {
  const bigrams1 = new Set(extractNgrams(str1, 2, 2));
  const bigrams2 = new Set(extractNgrams(str2, 2, 2));
  
  const intersection = [...bigrams1].filter(x => bigrams2.has(x)).length;
  const union = bigrams1.size + bigrams2.size - intersection;
  
  return union === 0 ? 0 : intersection / union;
}

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

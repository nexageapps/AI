import React from 'react';
import './InsightPanel.css';

/**
 * InsightPanel – shows:
 *   1. Missing link suggestions
 *   2. Graph stats
 *   3. LLM placeholder prompts
 * Props:
 *   triples     – array of { subject, predicate, object }
 *   suggestions – array of { subject, predicate, object, confidence }
 *   conflicts   – array of conflict strings
 */
export default function InsightPanel({ triples, suggestions, conflicts }) {
  const entities  = [...new Set(triples.flatMap(t => [t.subject, t.object]))];
  const relations = [...new Set(triples.map(t => t.predicate))];

  return (
    <div className="insight-card">
      <h2 className="section-title">Insights</h2>

      {/* Stats */}
      <div className="stats-row">
        <Stat label="Triples"   value={triples.length}   color="#7ab3f0" />
        <Stat label="Entities"  value={entities.length}  color="#60a5fa" />
        <Stat label="Relations" value={relations.length} color="#93c5fd" />
        <Stat label="Conflicts" value={conflicts.length} color={conflicts.length ? '#f87171' : '#2a5298'} />
      </div>

      {/* Missing link suggestions */}
      <div className="insight-section">
        <h3 className="insight-sub">Missing Link Suggestions</h3>
        {suggestions.length === 0 ? (
          <p className="empty-msg">No suggestions yet.</p>
        ) : (
          <ul className="suggestion-list">
            {suggestions.map((s, i) => (
              <li key={i} className="suggestion-item">
                <span className="sug-triple">
                  ({s.subject}, <em>{s.predicate}</em>, {s.object})
                </span>
                <span className="sug-confidence">confidence: {s.confidence}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="insight-section">
        <h3 className="insight-sub">LLM Prompt Templates</h3>
        <div className="prompt-list">
          {LLM_PROMPTS.map((p, i) => (
            <div key={i} className="prompt-chip" title={p.prompt}>
              <span className="prompt-label">{p.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, color }) {
  return (
    <div className="stat-box">
      <span className="stat-value" style={{ color }}>{value}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

const LLM_PROMPTS = [
  { label: 'Text to Triples',   prompt: 'Convert the following text into RDF triples (Subject, Predicate, Object).' },
  { label: 'Explain Graph',     prompt: 'Explain the knowledge graph represented by these triples in plain English.' },
  { label: 'Answer w/ Triples', prompt: 'Answer the question using ONLY the provided RDF triples.' },
  { label: 'Detect Conflicts',  prompt: 'Identify any inconsistencies or contradictions in these triples.' },
  { label: 'Suggest Links',     prompt: 'Suggest missing relationships between entities in this knowledge graph.' },
];

import React, { useState } from 'react';
import './EducationPanel.css';

/**
 * EducationPanel — deep conceptual explanations with visual diagrams.
 *
 * My understanding of each concept:
 *
 * RDF Triple:
 *   The simplest possible unit of structured knowledge. A triple is just a
 *   sentence broken into three slots. The genius of it is that ANY fact in
 *   the world can be expressed this way — and machines can process it without
 *   understanding natural language at all.
 *
 * Knowledge Graph:
 *   When you connect thousands of triples together, entities become nodes and
 *   predicates become edges. The "graph" part is literal — it's a directed
 *   graph in the mathematical sense. The power is that you can traverse it:
 *   "Who worked with someone born in Germany?" is just a two-hop graph query.
 *
 * RAG (Retrieval-Augmented Generation):
 *   LLMs hallucinate because they only know what was in their training data.
 *   RAG fixes this by giving the LLM a "cheat sheet" at query time — you
 *   retrieve the relevant facts first, then ask the LLM to answer using ONLY
 *   those facts. Knowledge Graphs are a natural triple store for RAG because
 *   they're structured, queryable, and conflict-detectable.
 *
 * Conflict Detection:
 *   In a triple store, a conflict is when (Subject, Predicate) maps to two
 *   different Objects. This is called a "functional property violation" in
 *   ontology terms. Real KG systems use OWL reasoning to detect these.
 *
 * Missing Links:
 *   If two entities appear in the same context but have no explicit predicate
 *   between them, there's likely a relationship we haven't captured yet.
 *   This is the basis of Knowledge Graph Completion — a whole ML subfield.
 */

const TOPICS = [
  {
    id: 'rdf',
    label: 'RDF Triple',
    color: '#0ea5e9',
    content: <RDFContent />,
  },
  {
    id: 'kg',
    label: 'Knowledge Graph',
    color: '#a855f7',
    content: <KGContent />,
  },
  {
    id: 'rag',
    label: 'RAG',
    color: '#10b981',
    content: <RAGContent />,
  },
  {
    id: 'conflict',
    label: 'Conflict Detection',
    color: '#ef4444',
    content: <ConflictContent />,
  },
  {
    id: 'missing',
    label: 'Missing Links',
    color: '#f59e0b',
    content: <MissingContent />,
  },
];

export default function EducationPanel() {
  const [open,   setOpen]   = useState(false);
  const [active, setActive] = useState(0);

  return (
    <div className="edu-card">
      <button className="edu-toggle" onClick={() => setOpen(o => !o)}>
        <span className="edu-toggle-label">
          <span className="edu-toggle-icon">&#9432;</span>
          Concepts Explained — RDF · Knowledge Graphs · RAG · Conflict Detection · Missing Links
        </span>
        <span className="edu-chevron">{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div className="edu-body">
          <div className="edu-tabs">
            {TOPICS.map((t, i) => (
              <button
                key={t.id}
                className={`edu-tab ${active === i ? 'active' : ''}`}
                style={active === i ? { borderColor: t.color, color: t.color } : {}}
                onClick={() => setActive(i)}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="edu-content">
            {TOPICS[active].content}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Individual topic components ───────────────────────────────────────────────

function RDFContent() {
  return (
    <div className="edu-topic">
      <p className="edu-intro">
        RDF (Resource Description Framework) is the W3C standard for representing
        knowledge on the web. Every fact is expressed as exactly three parts —
        a <span className="hl-subject">Subject</span>, a <span className="hl-predicate">Predicate</span>,
        and an <span className="hl-object">Object</span>.
      </p>

      {/* Visual anatomy of a triple */}
      <div className="triple-anatomy">
        <div className="triple-part subject-part">
          <div className="triple-node">Einstein</div>
          <div className="triple-role">Subject</div>
          <div className="triple-desc">The entity being described</div>
        </div>
        <div className="triple-arrow">&#8594;</div>
        <div className="triple-part predicate-part">
          <div className="triple-node">born_in</div>
          <div className="triple-role">Predicate</div>
          <div className="triple-desc">The relationship / property</div>
        </div>
        <div className="triple-arrow">&#8594;</div>
        <div className="triple-part object-part">
          <div className="triple-node">Germany</div>
          <div className="triple-role">Object</div>
          <div className="triple-desc">The value or related entity</div>
        </div>
      </div>

      <div className="edu-insight">
        <strong>Why triples?</strong> Any sentence in any language can be reduced to
        Subject-Predicate-Object. Machines don't need to understand grammar — they
        just store and query these three slots. A database of triples is called a
        <em> triple store</em> (e.g. Apache Jena, Amazon Neptune).
      </div>

      <div className="edu-examples">
        <div className="edu-example-row">
          <span className="hl-subject">Newton</span>
          <span className="hl-predicate">invented</span>
          <span className="hl-object">Calculus</span>
        </div>
        <div className="edu-example-row">
          <span className="hl-subject">UoA</span>
          <span className="hl-predicate">located_in</span>
          <span className="hl-object">Auckland</span>
        </div>
        <div className="edu-example-row">
          <span className="hl-subject">Python</span>
          <span className="hl-predicate">is_a</span>
          <span className="hl-object">ProgrammingLanguage</span>
        </div>
      </div>
    </div>
  );
}

function KGContent() {
  return (
    <div className="edu-topic">
      <p className="edu-intro">
        A Knowledge Graph is what you get when you connect thousands of RDF triples
        together. Entities become <strong>nodes</strong> and predicates become
        <strong> directed edges</strong>. The result is a graph you can traverse,
        query, and reason over.
      </p>

      {/* Mini graph diagram */}
      <div className="kg-diagram">
        <svg viewBox="0 0 420 180" className="kg-svg">
          {/* Edges */}
          <line x1="80"  y1="90"  x2="200" y2="50"  stroke="#38bdf8" strokeWidth="1.5" markerEnd="url(#arr)" />
          <line x1="80"  y1="90"  x2="200" y2="130" stroke="#38bdf8" strokeWidth="1.5" markerEnd="url(#arr)" />
          <line x1="200" y1="50"  x2="340" y2="90"  stroke="#a78bfa" strokeWidth="1.5" markerEnd="url(#arr)" />
          <line x1="200" y1="130" x2="340" y2="90"  stroke="#a78bfa" strokeWidth="1.5" markerEnd="url(#arr)" />
          {/* Edge labels */}
          <text x="128" y="58"  fill="#7dd3fc" fontSize="10" textAnchor="middle">born_in</text>
          <text x="128" y="122" fill="#7dd3fc" fontSize="10" textAnchor="middle">works_in</text>
          <text x="278" y="58"  fill="#c4b5fd" fontSize="10" textAnchor="middle">part_of</text>
          <text x="278" y="128" fill="#c4b5fd" fontSize="10" textAnchor="middle">known_for</text>
          {/* Arrow marker */}
          <defs>
            <marker id="arr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#38bdf8" />
            </marker>
          </defs>
          {/* Nodes */}
          <circle cx="80"  cy="90"  r="28" fill="#0c4a6e" stroke="#0ea5e9" strokeWidth="2" />
          <circle cx="200" cy="50"  r="28" fill="#4c1d95" stroke="#a855f7" strokeWidth="2" />
          <circle cx="200" cy="130" r="28" fill="#78350f" stroke="#f59e0b" strokeWidth="2" />
          <circle cx="340" cy="90"  r="28" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
          {/* Node labels */}
          <text x="80"  y="94"  fill="white" fontSize="11" fontWeight="bold" textAnchor="middle">Einstein</text>
          <text x="200" y="54"  fill="white" fontSize="11" fontWeight="bold" textAnchor="middle">Germany</text>
          <text x="200" y="134" fill="white" fontSize="11" fontWeight="bold" textAnchor="middle">Physics</text>
          <text x="340" y="94"  fill="white" fontSize="11" fontWeight="bold" textAnchor="middle">Europe</text>
        </svg>
      </div>

      <div className="edu-insight">
        <strong>Real-world KGs:</strong> Google's Knowledge Graph has 500 billion facts.
        Wikidata has 100 million items. They power search cards, voice assistants,
        and recommendation engines. The key advantage over a relational database:
        you can add new entity types and relationships without changing a schema.
      </div>

      <div className="edu-two-col">
        <div className="edu-col-item">
          <div className="edu-col-title" style={{ color: '#0ea5e9' }}>Graph Query</div>
          <code>"Who worked in Physics AND was born in Europe?"</code>
          <p>Two-hop traversal: find nodes connected to both Physics (works_in) and any node connected to Europe (part_of).</p>
        </div>
        <div className="edu-col-item">
          <div className="edu-col-title" style={{ color: '#a855f7' }}>vs Relational DB</div>
          <p>A SQL JOIN across 3 tables. Adding a new relationship type requires ALTER TABLE. In a KG, just add new triples.</p>
        </div>
      </div>
    </div>
  );
}

function RAGContent() {
  return (
    <div className="edu-topic">
      <p className="edu-intro">
        RAG (Retrieval-Augmented Generation) solves the biggest problem with LLMs:
        they hallucinate facts that weren't in their training data, or that have
        changed since training. RAG gives the model a verified "cheat sheet" at
        query time.
      </p>

      {/* RAG pipeline diagram */}
      <div className="rag-pipeline">
        <div className="rag-step" style={{ borderColor: '#0ea5e9' }}>
          <div className="rag-step-num" style={{ background: '#0ea5e9' }}>1</div>
          <div className="rag-step-title">Store</div>
          <div className="rag-step-body">Convert documents into RDF triples and store in a triple store / vector DB.</div>
        </div>
        <div className="rag-arrow">&#8594;</div>
        <div className="rag-step" style={{ borderColor: '#a855f7' }}>
          <div className="rag-step-num" style={{ background: '#a855f7' }}>2</div>
          <div className="rag-step-title">Retrieve</div>
          <div className="rag-step-body">When a question arrives, find the most relevant triples using keyword or semantic search.</div>
        </div>
        <div className="rag-arrow">&#8594;</div>
        <div className="rag-step" style={{ borderColor: '#10b981' }}>
          <div className="rag-step-num" style={{ background: '#10b981' }}>3</div>
          <div className="rag-step-title">Generate</div>
          <div className="rag-step-body">Pass retrieved triples as context to the LLM. It answers using ONLY those facts.</div>
        </div>
      </div>

      <div className="edu-insight">
        <strong>This app simulates steps 1 and 2.</strong> Your text input is the
        "document". Triple extraction is the "store" step. The Question Answering
        box is the "retrieve" step — it finds the best matching triple using keyword
        scoring. In production, step 2 uses embeddings (semantic similarity) and
        step 3 uses GPT-4 / Claude / Llama.
      </div>

      <div className="edu-prompt-box">
        <div className="edu-prompt-label">Example LLM Prompt in a real RAG system:</div>
        <pre>{`You are a factual assistant. Answer using ONLY the triples below.
Triples:
  (Einstein, born_in, Germany)
  (Einstein, works_in, Physics)

Question: Where was Einstein born?
Answer: Germany`}</pre>
      </div>
    </div>
  );
}

function ConflictContent() {
  return (
    <div className="edu-topic">
      <p className="edu-intro">
        A conflict occurs when the same (Subject, Predicate) pair maps to two
        different Objects. In ontology terms this is a <em>functional property
        violation</em> — a property is "functional" if each subject can have at
        most one value for it.
      </p>

      <div className="conflict-demo">
        <div className="conflict-triple ok">
          <span className="hl-subject">UoC</span>
          <span className="hl-predicate">located_in</span>
          <span className="hl-object">Christchurch</span>
          <span className="conflict-badge ok-badge">Triple 1</span>
        </div>
        <div className="conflict-triple bad">
          <span className="hl-subject">UoC</span>
          <span className="hl-predicate">located_in</span>
          <span className="hl-object">Auckland</span>
          <span className="conflict-badge bad-badge">Triple 2 — CONFLICT</span>
        </div>
        <div className="conflict-result">
          Conflict detected: "UoC" has multiple values for "located_in": Christchurch, Auckland
        </div>
      </div>

      <div className="edu-insight">
        <strong>Why this matters for AI:</strong> If you feed conflicting triples
        to an LLM in a RAG prompt, it will give inconsistent answers depending on
        which triple it "sees" first. Conflict detection is a data quality gate —
        you should resolve conflicts before they reach the model. Real systems use
        OWL (Web Ontology Language) and reasoners like HermiT to detect these
        automatically.
      </div>

      <div className="edu-two-col">
        <div className="edu-col-item">
          <div className="edu-col-title" style={{ color: '#ef4444' }}>How to resolve</div>
          <p>1. Keep the most recent triple (temporal reasoning)<br />
             2. Keep the triple with the highest source confidence<br />
             3. Flag for human review</p>
        </div>
        <div className="edu-col-item">
          <div className="edu-col-title" style={{ color: '#f59e0b' }}>In this app</div>
          <p>Try entering: "UoC is located in Christchurch" then add "UoC is located in Auckland" — the conflict banner will appear in the RDF Triples panel.</p>
        </div>
      </div>
    </div>
  );
}

function MissingContent() {
  return (
    <div className="edu-topic">
      <p className="edu-intro">
        Knowledge Graph Completion (KGC) is the task of predicting missing edges.
        If two entities appear together in text but have no explicit predicate
        between them, there's likely a relationship we haven't captured yet.
      </p>

      <div className="missing-demo">
        <div className="missing-known">
          <div className="missing-label">Known triples</div>
          <div className="missing-triple"><span className="hl-subject">Einstein</span> <span className="hl-predicate">born_in</span> <span className="hl-object">Germany</span></div>
          <div className="missing-triple"><span className="hl-subject">Einstein</span> <span className="hl-predicate">works_in</span> <span className="hl-object">Physics</span></div>
        </div>
        <div className="missing-arrow">+</div>
        <div className="missing-known">
          <div className="missing-label">Co-occurring entities</div>
          <div className="missing-triple"><span className="hl-subject">Einstein</span> <span style={{color:'#64748b'}}>???</span> <span className="hl-object">Nobel</span></div>
        </div>
        <div className="missing-arrow">&#8594;</div>
        <div className="missing-suggestion">
          <div className="missing-label">Suggested link</div>
          <div className="missing-triple">
            <span className="hl-subject">Einstein</span>
            <span className="hl-predicate">related_to</span>
            <span className="hl-object">Nobel</span>
          </div>
          <div className="confidence-bar">
            <div className="confidence-fill" style={{ width: '80%' }} />
            <span>confidence: 0.8</span>
          </div>
        </div>
      </div>

      <div className="edu-insight">
        <strong>In production ML systems</strong>, missing link prediction uses
        graph embedding models like TransE, RotatE, or ComplEx. These learn vector
        representations of entities and relations such that
        <em> head + relation ≈ tail</em>. This app uses a simpler heuristic:
        if two entities appear in the same sentence with no known predicate,
        suggest "related_to" with confidence 0.8.
      </div>
    </div>
  );
}

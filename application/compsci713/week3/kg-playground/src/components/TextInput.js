import React, { useState } from 'react';
import './TextInput.css';

/**
 * TextInput – lets the user type a sentence and trigger triple extraction.
 * Props:
 *   onExtract(text) – called when the user clicks "Generate Triples"
 */
const EXAMPLES = [
  'Einstein was born in Germany and worked in Physics.',
  'University of Auckland (UoA) is New Zealand\'s top-ranked public research university, located primarily in Auckland with around 45,000 students. Known as Waipapa Taumata Rau in Māori, it was founded in 1883 and leads nationally in research output, ranked #65 in QS World University Rankings 2026.',
  'Newton invented Calculus and studied Mathematics.',
  'Marie Curie was born in Poland and worked in Chemistry.',
  'Karthik was born in India and works in SAP and studies AI.',
];

export default function TextInput({ onExtract }) {
  const [text, setText] = useState('');

  const handleExtract = () => {
    if (text.trim()) onExtract(text.trim());
  };

  const loadExample = (ex) => {
    setText(ex);
    onExtract(ex);
  };

  return (
    <div className="text-input-card">
      <h2 className="section-title">Text Input</h2>
      <p className="section-hint">
        Type any sentence with facts — who did what, where they are, what they invented.
        The app breaks it into Subject → Predicate → Object triples and draws the graph.
      </p>

      <textarea
        className="text-area"
        rows={4}
        placeholder='e.g. "Einstein was born in Germany and worked in Physics."'
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && e.ctrlKey) handleExtract();
        }}
      />

      <div className="input-actions">
        <button className="btn-primary" onClick={handleExtract} disabled={!text.trim()}>
          Generate Triples
        </button>
        <button className="btn-ghost" onClick={() => { setText(''); onExtract(''); }}>
          Clear
        </button>
      </div>

      <div className="examples">
        <span className="examples-label">Try an example:</span>
        {EXAMPLES.map((ex, i) => (
          <button key={i} className="btn-example" onClick={() => loadExample(ex)}>
            {ex.split(' ').slice(0, 4).join(' ')}…
          </button>
        ))}
      </div>
    </div>
  );
}

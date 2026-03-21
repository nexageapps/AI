import React, { useState } from 'react';
import './TextInput.css';

/**
 * TextInput – lets the user type a sentence and trigger triple extraction.
 * Props:
 *   onExtract(text) – called when the user clicks "Generate Triples"
 */
const EXAMPLES = [
  'Einstein was born in Germany and worked in Physics. Germany is part of Europe. Europe is known for Physics.',
  'University of Auckland (UoA) was founded in 1883 and is located in Auckland. Auckland is part of New Zealand.',
  'Marie Curie was born in Poland and worked in Chemistry. Poland is part of Europe. Marie Curie received the Nobel Prize in 1903.',
  'Newton invented Calculus and studied Mathematics at Cambridge University. Cambridge University is located in England.',
  'Steve Jobs founded Apple in 1976. Apple is located in California. California is part of the United States.',
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
        Include hierarchical relationships (e.g., "Germany is part of Europe") to enable multi-hop queries.
      </p>

      <textarea
        className="text-area"
        rows={4}
        placeholder='e.g. "Einstein was born in Germany and worked in Physics. Germany is part of Europe."'
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

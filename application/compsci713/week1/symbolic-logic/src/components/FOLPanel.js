import React, { useState } from 'react';
import { Icon } from '../iconMap';
import { FaUsers, FaKey, FaExchangeAlt, FaSearch, FaBook, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import './FOLPanel.css';

const KINSHIP_PEOPLE = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve'];

const INITIAL_FACTS = {
  'Parent(Alice,Bob)': true,
  'Parent(Alice,Charlie)': true,
  'Parent(Bob,Diana)': true,
  'Parent(Bob,Eve)': true,
  'Female(Alice)': true,
  'Male(Bob)': true,
  'Female(Charlie)': true,
  'Female(Diana)': true,
  'Female(Eve)': true,
};

const FOL_EXAMPLES = [
  {
    id: 'forall-parent',
    title: '∀x ∃y Parent(x, y)',
    meaning: 'Everyone is a parent of someone',
    icon: '👨‍👩‍👧',
    evaluate: (facts) => {
      return KINSHIP_PEOPLE.every(x =>
        KINSHIP_PEOPLE.some(y => facts[`Parent(${x},${y})`])
      );
    },
    explanation: (facts, result) => {
      if (result) return 'TRUE: Every person has at least one child in our domain.';
      const noChild = KINSHIP_PEOPLE.find(x =>
        !KINSHIP_PEOPLE.some(y => facts[`Parent(${x},${y})`])
      );
      return `FALSE: ${noChild} has no children, so not everyone is a parent.`;
    },
  },
  {
    id: 'exists-parent',
    title: '∃x ∃y Parent(x, y)',
    meaning: 'Someone is a parent of someone',
    icon: '👶',
    evaluate: (facts) => {
      return KINSHIP_PEOPLE.some(x =>
        KINSHIP_PEOPLE.some(y => facts[`Parent(${x},${y})`])
      );
    },
    explanation: (facts, result) => {
      if (!result) return 'FALSE: No parent relationships exist.';
      for (const x of KINSHIP_PEOPLE) {
        for (const y of KINSHIP_PEOPLE) {
          if (facts[`Parent(${x},${y})`]) return `TRUE: ${x} is a parent of ${y}.`;
        }
      }
      return 'TRUE';
    },
  },
  {
    id: 'mother',
    title: '∃x ∃y Mother(x, y)',
    meaning: 'Someone is a mother (Female AND Parent)',
    icon: '👩',
    evaluate: (facts) => {
      return KINSHIP_PEOPLE.some(x =>
        facts[`Female(${x})`] && KINSHIP_PEOPLE.some(y => facts[`Parent(${x},${y})`])
      );
    },
    explanation: (facts, result) => {
      if (!result) return 'FALSE: No one is both female and a parent.';
      for (const x of KINSHIP_PEOPLE) {
        if (facts[`Female(${x})`]) {
          for (const y of KINSHIP_PEOPLE) {
            if (facts[`Parent(${x},${y})`]) return `TRUE: ${x} is a mother of ${y} (Female ∧ Parent).`;
          }
        }
      }
      return 'TRUE';
    },
  },
  {
    id: 'grandparent',
    title: '∃x ∃y Grandparent(x, y)',
    meaning: '∃x ∃y ∃z Parent(x,z) ∧ Parent(z,y)',
    icon: '👵',
    evaluate: (facts) => {
      return KINSHIP_PEOPLE.some(x =>
        KINSHIP_PEOPLE.some(z =>
          facts[`Parent(${x},${z})`] && KINSHIP_PEOPLE.some(y => facts[`Parent(${z},${y})`])
        )
      );
    },
    explanation: (facts, result) => {
      if (!result) return 'FALSE: No grandparent chain exists.';
      for (const x of KINSHIP_PEOPLE) {
        for (const z of KINSHIP_PEOPLE) {
          if (facts[`Parent(${x},${z})`]) {
            for (const y of KINSHIP_PEOPLE) {
              if (facts[`Parent(${z},${y})`]) return `TRUE: ${x} → ${z} → ${y} (${x} is grandparent of ${y}).`;
            }
          }
        }
      }
      return 'TRUE';
    },
  },
  {
    id: 'sibling',
    title: '∃x ∃y Sibling(x, y)',
    meaning: '∃x ∃y (x≠y) ∧ ∃z Parent(z,x) ∧ Parent(z,y)',
    icon: '👫',
    evaluate: (facts) => {
      return KINSHIP_PEOPLE.some(x =>
        KINSHIP_PEOPLE.some(y =>
          x !== y && KINSHIP_PEOPLE.some(z =>
            facts[`Parent(${z},${x})`] && facts[`Parent(${z},${y})`]
          )
        )
      );
    },
    explanation: (facts, result) => {
      if (!result) return 'FALSE: No two different people share a parent.';
      for (const x of KINSHIP_PEOPLE) {
        for (const y of KINSHIP_PEOPLE) {
          if (x !== y) {
            for (const z of KINSHIP_PEOPLE) {
              if (facts[`Parent(${z},${x})`] && facts[`Parent(${z},${y})`]) {
                return `TRUE: ${x} and ${y} are siblings (shared parent: ${z}).`;
              }
            }
          }
        }
      }
      return 'TRUE';
    },
  },
  {
    id: 'all-female-parent',
    title: '∀x Female(x) → ∃y Parent(x,y)',
    meaning: 'Every female is a parent of someone',
    icon: '👩‍👧',
    evaluate: (facts) => {
      return KINSHIP_PEOPLE.every(x => {
        if (!facts[`Female(${x})`]) return true;
        return KINSHIP_PEOPLE.some(y => facts[`Parent(${x},${y})`]);
      });
    },
    explanation: (facts, result) => {
      if (result) return 'TRUE: Every female in the domain has at least one child.';
      const counter = KINSHIP_PEOPLE.find(x =>
        facts[`Female(${x})`] && !KINSHIP_PEOPLE.some(y => facts[`Parent(${x},${y})`])
      );
      return `FALSE: ${counter} is female but has no children.`;
    },
  },
];

const VARIABLE_EXAMPLES = [
  { formula: '∀x Likes(x, IceCream)', variables: [{ name: 'x', bound: true, by: '∀x' }], isSentence: true },
  { formula: 'Likes(x, y)', variables: [{ name: 'x', bound: false }, { name: 'y', bound: false }], isSentence: false },
  { formula: '∀x ∃y Loves(x, y)', variables: [{ name: 'x', bound: true, by: '∀x' }, { name: 'y', bound: true, by: '∃y' }], isSentence: true },
  { formula: '∀x Loves(x, y)', variables: [{ name: 'x', bound: true, by: '∀x' }, { name: 'y', bound: false }], isSentence: false },
  { formula: '∃x Cat(x) ∧ Cute(x)', variables: [{ name: 'x', bound: true, by: '∃x' }], isSentence: true },
  { formula: 'Parent(x, Bob) ∧ Female(x)', variables: [{ name: 'x', bound: false }], isSentence: false },
];

function FOLPanel() {
  const [facts, setFacts] = useState({ ...INITIAL_FACTS });
  const [activeSection, setActiveSection] = useState('kinship');
  const [selectedExample, setSelectedExample] = useState(0);

  const toggleFact = (key) => {
    setFacts(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const resetFacts = () => setFacts({ ...INITIAL_FACTS });

  const sections = [
    { id: 'kinship', label: 'Kinship World', icon: <FaUsers />, desc: 'Build a family and query it' },
    { id: 'variables', label: 'Free & Bound', icon: <FaKey />, desc: 'Identify variable types' },
    { id: 'equivalence', label: 'FOL Equivalence', icon: <FaExchangeAlt />, desc: 'Quantifier equivalences' },
  ];

  return (
    <div className="fol-panel">
      <div className="fol-section-tabs">
        {sections.map(s => (
          <button
            key={s.id}
            className={`fol-section-btn ${activeSection === s.id ? 'active' : ''}`}
            onClick={() => setActiveSection(s.id)}
          >
            <span className="fol-btn-label">{s.icon} {s.label}</span>
            <span className="fol-btn-desc">{s.desc}</span>
          </button>
        ))}
      </div>

      {activeSection === 'kinship' && (
        <div className="kinship-section">
          <div className="kinship-intro">
            <h3><FaUsers style={{ marginRight: 6 }} /> Build a Family, Query with Logic</h3>
            <p>Toggle family relationships below, then see how FOL sentences evaluate in your world.</p>
          </div>

          <div className="kinship-layout">
            <div className="facts-panel">
              <div className="facts-header">
                <h4><FaBook style={{ marginRight: 4 }} /> Facts (click to toggle)</h4>
                <button className="reset-btn" onClick={resetFacts}>Reset</button>
              </div>

              <div className="facts-group">
                <h5>Parent Relations</h5>
                <div className="facts-grid">
                  {KINSHIP_PEOPLE.map(x =>
                    KINSHIP_PEOPLE.filter(y => x !== y).map(y => {
                      const key = `Parent(${x},${y})`;
                      const active = facts[key] || false;
                      return (
                        <button
                          key={key}
                          className={`fact-chip ${active ? 'active' : ''}`}
                          onClick={() => toggleFact(key)}
                        >
                          {active ? <FaCheckCircle className="fact-icon-active" /> : <span className="fact-icon-inactive" />} Parent({x},{y})
                        </button>
                      );
                    })
                  )}
                </div>
              </div>

              <div className="facts-group">
                <h5>Gender</h5>
                <div className="facts-grid">
                  {KINSHIP_PEOPLE.map(x => (
                    <React.Fragment key={x}>
                      <button
                        className={`fact-chip ${facts[`Male(${x})`] ? 'active' : ''}`}
                        onClick={() => {
                          toggleFact(`Male(${x})`);
                          if (!facts[`Male(${x})`]) setFacts(prev => ({ ...prev, [`Female(${x})`]: false }));
                        }}
                      >
                        {facts[`Male(${x})`] ? <FaCheckCircle className="fact-icon-active" /> : <span className="fact-icon-inactive" />} Male({x})
                      </button>
                      <button
                        className={`fact-chip ${facts[`Female(${x})`] ? 'active' : ''}`}
                        onClick={() => {
                          toggleFact(`Female(${x})`);
                          if (!facts[`Female(${x})`]) setFacts(prev => ({ ...prev, [`Male(${x})`]: false }));
                        }}
                      >
                        {facts[`Female(${x})`] ? <FaCheckCircle className="fact-icon-active" /> : <span className="fact-icon-inactive" />} Female({x})
                      </button>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>

            <div className="queries-panel">
              <h4><FaSearch style={{ marginRight: 4 }} /> FOL Queries</h4>
              <div className="query-list">
                {FOL_EXAMPLES.map(ex => {
                  const result = ex.evaluate(facts);
                  const expl = ex.explanation(facts, result);
                  return (
                    <div key={ex.id} className={`query-card ${result ? 'is-true' : 'is-false'}`}>
                      <div className="query-header">
                        <Icon emoji={ex.icon} className="query-icon" size="1.2rem" />
                        <div className="query-info">
                          <span className="query-formula">{ex.title}</span>
                          <span className="query-meaning">{ex.meaning}</span>
                        </div>
                        <span className={`query-result ${result ? 'true' : 'false'}`}>
                          {result ? 'TRUE' : 'FALSE'}
                        </span>
                      </div>
                      <p className="query-explanation">{expl}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeSection === 'variables' && (
        <div className="variables-section">
          <div className="var-intro">
            <h3><FaKey style={{ marginRight: 6 }} /> Free Variables vs Bound Variables</h3>
            <p>A variable is <span className="bound-tag">BOUND</span> if it's inside a quantifier (∀ or ∃). A variable is <span className="free-tag">FREE</span> if it's not. A formula with no free variables is a <span className="sentence-tag">SENTENCE</span>.</p>
          </div>
          <div className="var-examples">
            {VARIABLE_EXAMPLES.map((ex, i) => (
              <div
                key={i}
                className={`var-card ${selectedExample === i ? 'selected' : ''}`}
                onClick={() => setSelectedExample(i)}
              >
                <div className="var-formula">{ex.formula}</div>
                <div className="var-tags">
                  {ex.variables.map((v, j) => (
                    <span key={j} className={`var-tag ${v.bound ? 'bound' : 'free'}`}>
                      {v.name}: {v.bound ? `Bound by ${v.by}` : 'Free'}
                    </span>
                  ))}
                </div>
                <div className={`var-sentence-badge ${ex.isSentence ? 'yes' : 'no'}`}>
                  {ex.isSentence ? <><FaCheckCircle style={{ marginRight: 4 }} /> Sentence (can be T/F)</> : <><FaTimesCircle style={{ marginRight: 4 }} /> Not a sentence (has free variables)</>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSection === 'equivalence' && (
        <div className="equiv-section">
          <div className="equiv-intro">
            <h3><FaExchangeAlt style={{ marginRight: 6 }} /> FOL Logical Equivalences</h3>
            <p>These equivalences let you transform quantified statements while preserving meaning.</p>
          </div>
          <div className="equiv-cards">
            {[
              { left: '¬∀x P(x)', right: '∃x ¬P(x)', name: 'Quantifier Negation 1',
                example: '"Not all students passed" ≡ "Some student didn\'t pass"', iconKey: '🔀' },
              { left: '¬∃x P(x)', right: '∀x ¬P(x)', name: 'Quantifier Negation 2',
                example: '"No dog can fly" ≡ "All dogs can\'t fly"', iconKey: '🔀' },
              { left: '∀x (P(x) ∧ Q(x))', right: '(∀x P(x)) ∧ (∀x Q(x))', name: '∀ distributes over ∧',
                example: '"All cats are furry and cute" ≡ "All cats are furry AND all cats are cute"', iconKey: '📦' },
              { left: '∃x (P(x) ∨ Q(x))', right: '(∃x P(x)) ∨ (∃x Q(x))', name: '∃ distributes over ∨',
                example: '"Some animal is a cat or dog" ≡ "Some animal is a cat OR some animal is a dog"', iconKey: '📦' },
              { left: '∀x ∀y P(x,y)', right: '∀y ∀x P(x,y)', name: 'Quantifier Reordering (same type)',
                example: 'Order doesn\'t matter for same quantifier type', iconKey: '🔃' },
              { left: '∀x ∃y P(x,y)', right: '∃y ∀x P(x,y)', name: 'NOT equivalent!',
                example: '"Everyone loves someone" ≠ "Someone is loved by everyone"', iconKey: '⚠️', notEquiv: true },
            ].map((eq, i) => (
              <div key={i} className={`equiv-card ${eq.notEquiv ? 'not-equiv' : ''}`}>
                <div className="equiv-card-header">
                  <Icon emoji={eq.iconKey} className="equiv-icon" size="1.1rem" />
                  <span className="equiv-name">{eq.name}</span>
                </div>
                <div className="equiv-formulas">
                  <span className="equiv-left">{eq.left}</span>
                  <span className="equiv-symbol">{eq.notEquiv ? '≢' : '≡'}</span>
                  <span className="equiv-right">{eq.right}</span>
                </div>
                <p className="equiv-example">{eq.example}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default FOLPanel;

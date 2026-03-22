import React, { useState } from 'react';
import { Icon } from '../iconMap';
import { FaUsers, FaKey, FaExchangeAlt, FaSearch, FaBook, FaCheckCircle, FaTimesCircle, FaInfoCircle } from 'react-icons/fa';
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
    kidExplain: 'Is every person in our family a parent? Check if each person has at least one child.',
    icon: '👨‍👩‍👧',
    evaluate: (facts) => {
      return KINSHIP_PEOPLE.every(x =>
        KINSHIP_PEOPLE.some(y => facts[`Parent(${x},${y})`])
      );
    },
    explanation: (facts, result) => {
      if (result) return 'Yes! Every person has at least one child.';
      const noChild = KINSHIP_PEOPLE.find(x =>
        !KINSHIP_PEOPLE.some(y => facts[`Parent(${x},${y})`])
      );
      return `No! ${noChild} doesn't have any children, so not everyone is a parent.`;
    },
  },
  {
    id: 'exists-parent',
    title: '∃x ∃y Parent(x, y)',
    meaning: 'Someone is a parent of someone',
    kidExplain: 'Is there at least one parent-child pair in our family?',
    icon: '👶',
    evaluate: (facts) => {
      return KINSHIP_PEOPLE.some(x =>
        KINSHIP_PEOPLE.some(y => facts[`Parent(${x},${y})`])
      );
    },
    explanation: (facts, result) => {
      if (!result) return 'No parent relationships exist at all!';
      for (const x of KINSHIP_PEOPLE) {
        for (const y of KINSHIP_PEOPLE) {
          if (facts[`Parent(${x},${y})`]) return `Yes! For example, ${x} is a parent of ${y}.`;
        }
      }
      return 'Yes!';
    },
  },
  {
    id: 'mother',
    title: '∃x ∃y Mother(x, y)',
    meaning: 'Someone is a mother (Female AND Parent)',
    kidExplain: 'Is there someone who is both female AND a parent? That makes them a mother!',
    icon: '👩',
    evaluate: (facts) => {
      return KINSHIP_PEOPLE.some(x =>
        facts[`Female(${x})`] && KINSHIP_PEOPLE.some(y => facts[`Parent(${x},${y})`])
      );
    },
    explanation: (facts, result) => {
      if (!result) return 'No one is both female and a parent right now.';
      for (const x of KINSHIP_PEOPLE) {
        if (facts[`Female(${x})`]) {
          for (const y of KINSHIP_PEOPLE) {
            if (facts[`Parent(${x},${y})`]) return `Yes! ${x} is a mother of ${y} (she's female AND a parent).`;
          }
        }
      }
      return 'Yes!';
    },
  },
  {
    id: 'grandparent',
    title: '∃x ∃y Grandparent(x, y)',
    meaning: '∃x ∃y ∃z Parent(x,z) ∧ Parent(z,y)',
    kidExplain: 'Is there a grandparent? That means: someone is a parent of a parent!',
    icon: '👵',
    evaluate: (facts) => {
      return KINSHIP_PEOPLE.some(x =>
        KINSHIP_PEOPLE.some(z =>
          facts[`Parent(${x},${z})`] && KINSHIP_PEOPLE.some(y => facts[`Parent(${z},${y})`])
        )
      );
    },
    explanation: (facts, result) => {
      if (!result) return 'No grandparent chain found. Try adding more parent links!';
      for (const x of KINSHIP_PEOPLE) {
        for (const z of KINSHIP_PEOPLE) {
          if (facts[`Parent(${x},${z})`]) {
            for (const y of KINSHIP_PEOPLE) {
              if (facts[`Parent(${z},${y})`]) return `Yes! ${x} → ${z} → ${y} (${x} is grandparent of ${y} through ${z}).`;
            }
          }
        }
      }
      return 'Yes!';
    },
  },
  {
    id: 'sibling',
    title: '∃x ∃y Sibling(x, y)',
    meaning: '∃x ∃y (x≠y) ∧ ∃z Parent(z,x) ∧ Parent(z,y)',
    kidExplain: 'Are there any siblings? Two different people who share the same parent!',
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
      if (!result) return 'No siblings found. Siblings need to share a parent!';
      for (const x of KINSHIP_PEOPLE) {
        for (const y of KINSHIP_PEOPLE) {
          if (x !== y) {
            for (const z of KINSHIP_PEOPLE) {
              if (facts[`Parent(${z},${x})`] && facts[`Parent(${z},${y})`]) {
                return `Yes! ${x} and ${y} are siblings (they share parent ${z}).`;
              }
            }
          }
        }
      }
      return 'Yes!';
    },
  },
  {
    id: 'all-female-parent',
    title: '∀x Female(x) → ∃y Parent(x,y)',
    meaning: 'Every female is a parent of someone',
    kidExplain: 'Is every female person also a parent? If even one female has no children, this is false!',
    icon: '👩‍👧',
    evaluate: (facts) => {
      return KINSHIP_PEOPLE.every(x => {
        if (!facts[`Female(${x})`]) return true;
        return KINSHIP_PEOPLE.some(y => facts[`Parent(${x},${y})`]);
      });
    },
    explanation: (facts, result) => {
      if (result) return 'Yes! Every female in our family has at least one child.';
      const counter = KINSHIP_PEOPLE.find(x =>
        facts[`Female(${x})`] && !KINSHIP_PEOPLE.some(y => facts[`Parent(${x},${y})`])
      );
      return `No! ${counter} is female but doesn't have any children.`;
    },
  },
];

const VARIABLE_EXAMPLES = [
  { formula: '∀x Likes(x, IceCream)', plain: 'Everyone likes ice cream', variables: [{ name: 'x', bound: true, by: '∀x' }], isSentence: true },
  { formula: 'Likes(x, y)', plain: 'x likes y (but who are x and y?)', variables: [{ name: 'x', bound: false }, { name: 'y', bound: false }], isSentence: false },
  { formula: '∀x ∃y Loves(x, y)', plain: 'Everyone loves at least someone', variables: [{ name: 'x', bound: true, by: '∀x' }, { name: 'y', bound: true, by: '∃y' }], isSentence: true },
  { formula: '∀x Loves(x, y)', plain: 'Everyone loves y (but who is y?)', variables: [{ name: 'x', bound: true, by: '∀x' }, { name: 'y', bound: false }], isSentence: false },
  { formula: '∃x Cat(x) ∧ Cute(x)', plain: 'There is a cute cat', variables: [{ name: 'x', bound: true, by: '∃x' }], isSentence: true },
  { formula: 'Parent(x, Bob) ∧ Female(x)', plain: 'x is Bob\'s mother (but who is x?)', variables: [{ name: 'x', bound: false }], isSentence: false },
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
    { id: 'kinship', label: 'Family World', icon: <FaUsers />, desc: 'Build a family tree and ask questions about it' },
    { id: 'variables', label: 'Free & Bound', icon: <FaKey />, desc: 'Learn which variables have a "boss" and which don\'t' },
    { id: 'equivalence', label: 'FOL Rules', icon: <FaExchangeAlt />, desc: 'Ways to rewrite sentences that mean the same thing' },
  ];

  return (
    <div className="fol-panel">
      <div className="fol-intro-banner">
        <FaInfoCircle className="fol-intro-icon" />
        <p>First-Order Logic lets us talk about "all" and "some" things — like "ALL cats have whiskers" or "SOME dogs are friendly." It's way more powerful than basic logic!</p>
      </div>

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
            <h3><FaUsers style={{ marginRight: 6 }} /> Build a Family, Ask Questions</h3>
            <p>Click the buttons below to create family relationships. Then watch how the logic queries update in real time! Try making Alice a grandparent, or creating siblings.</p>
          </div>

          <div className="kinship-layout">
            <div className="facts-panel">
              <div className="facts-header">
                <h4><FaBook style={{ marginRight: 4 }} /> Family Facts</h4>
                <button className="reset-btn" onClick={resetFacts}>Reset to Default</button>
              </div>

              <div className="facts-group">
                <h5>Who is a parent of whom? (click to toggle)</h5>
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
                          {active ? <FaCheckCircle className="fact-icon-active" /> : <span className="fact-icon-inactive" />} {x} → {y}
                        </button>
                      );
                    })
                  )}
                </div>
              </div>

              <div className="facts-group">
                <h5>Gender (click to set)</h5>
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
                        {facts[`Male(${x})`] ? <FaCheckCircle className="fact-icon-active" /> : <span className="fact-icon-inactive" />} {x} is Male
                      </button>
                      <button
                        className={`fact-chip ${facts[`Female(${x})`] ? 'active' : ''}`}
                        onClick={() => {
                          toggleFact(`Female(${x})`);
                          if (!facts[`Female(${x})`]) setFacts(prev => ({ ...prev, [`Male(${x})`]: false }));
                        }}
                      >
                        {facts[`Female(${x})`] ? <FaCheckCircle className="fact-icon-active" /> : <span className="fact-icon-inactive" />} {x} is Female
                      </button>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>

            <div className="queries-panel">
              <h4><FaSearch style={{ marginRight: 4 }} /> Logic Questions</h4>
              <p className="queries-hint">These questions are written in FOL notation. Watch them update as you change the family!</p>
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
                          <span className="query-kid-explain">{ex.kidExplain}</span>
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
            <h3><FaKey style={{ marginRight: 6 }} /> Free vs Bound Variables</h3>
            <p>Think of quantifiers (∀ and ∃) as "bosses" for variables. A <span className="bound-tag">BOUND</span> variable has a boss telling it what to do. A <span className="free-tag">FREE</span> variable is on its own — we don't know what it refers to! Only formulas where ALL variables have a boss (a <span className="sentence-tag">SENTENCE</span>) can be true or false.</p>
          </div>
          <div className="var-examples">
            {VARIABLE_EXAMPLES.map((ex, i) => (
              <div
                key={i}
                className={`var-card ${selectedExample === i ? 'selected' : ''}`}
                onClick={() => setSelectedExample(i)}
              >
                <div className="var-formula">{ex.formula}</div>
                <p className="var-plain">{ex.plain}</p>
                <div className="var-tags">
                  {ex.variables.map((v, j) => (
                    <span key={j} className={`var-tag ${v.bound ? 'bound' : 'free'}`}>
                      {v.name}: {v.bound ? `Bound by ${v.by}` : 'Free (no boss!)'}
                    </span>
                  ))}
                </div>
                <div className={`var-sentence-badge ${ex.isSentence ? 'yes' : 'no'}`}>
                  {ex.isSentence ? <><FaCheckCircle style={{ marginRight: 4 }} /> Sentence — can be TRUE or FALSE</> : <><FaTimesCircle style={{ marginRight: 4 }} /> Not a sentence — has free variables</>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSection === 'equivalence' && (
        <div className="equiv-section">
          <div className="equiv-intro">
            <h3><FaExchangeAlt style={{ marginRight: 6 }} /> FOL Rewrite Rules</h3>
            <p>Just like in basic logic, some FOL sentences can be rewritten in different ways that mean the exact same thing. But be careful — some rewrites look similar but change the meaning!</p>
          </div>
          <div className="equiv-cards">
            {[
              { left: '¬∀x P(x)', right: '∃x ¬P(x)', name: 'NOT all = SOME are not',
                example: '"Not all students passed the test" means the same as "At least one student failed."', iconKey: '🔀' },
              { left: '¬∃x P(x)', right: '∀x ¬P(x)', name: 'NONE = ALL are not',
                example: '"No dog can fly" means the same as "Every dog can\'t fly."', iconKey: '🔀' },
              { left: '∀x (P(x) ∧ Q(x))', right: '(∀x P(x)) ∧ (∀x Q(x))', name: 'ALL with AND — safe to split',
                example: '"All cats are furry AND cute" = "All cats are furry" AND "All cats are cute." You can split AND apart!', iconKey: '📦' },
              { left: '∃x (P(x) ∨ Q(x))', right: '(∃x P(x)) ∨ (∃x Q(x))', name: 'SOME with OR — safe to split',
                example: '"Some animal is a cat or a dog" = "Some animal is a cat" OR "Some animal is a dog."', iconKey: '📦' },
              { left: '∀x ∀y P(x,y)', right: '∀y ∀x P(x,y)', name: 'Same quantifiers — order doesn\'t matter',
                example: 'When both quantifiers are the same type (both ∀ or both ∃), you can swap their order freely.', iconKey: '🔃' },
              { left: '∀x ∃y P(x,y)', right: '∃y ∀x P(x,y)', name: 'DANGER: Different quantifiers — order MATTERS!',
                example: '"Everyone loves someone" (each person loves a different someone) is NOT the same as "There\'s one person everyone loves" (one specific person).', iconKey: '⚠️', notEquiv: true },
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

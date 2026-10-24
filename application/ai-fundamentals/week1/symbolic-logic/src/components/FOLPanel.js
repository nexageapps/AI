import React, { useState, useMemo } from 'react';
import { FaUsers, FaKey, FaExchangeAlt, FaSearch, FaBook, FaCheckCircle, FaTimesCircle, FaInfoCircle, FaChevronDown, FaChevronUp, FaLightbulb, FaArrowRight, FaQuestionCircle, FaMale, FaFemale } from 'react-icons/fa';
import './FOLPanel.css';

const KINSHIP_PEOPLE = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve'];

const PERSON_COLORS = {
  Alice: '#6366f1',
  Bob: '#0891b2',
  Charlie: '#d97706',
  Diana: '#db2777',
  Eve: '#059669',
};

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

/* ── helpers ── */
function getChildren(person, facts) {
  return KINSHIP_PEOPLE.filter(y => y !== person && facts[`Parent(${person},${y})`]);
}
function getParents(person, facts) {
  return KINSHIP_PEOPLE.filter(x => x !== person && facts[`Parent(${x},${person})`]);
}
function getGender(person, facts) {
  if (facts[`Male(${person})`]) return 'male';
  if (facts[`Female(${person})`]) return 'female';
  return 'unknown';
}


/* ── FOL query definitions ── */
const FOL_EXAMPLES = [
  {
    id: 'forall-parent',
    title: '∀x ∃y Parent(x, y)',
    meaning: 'Is EVERY person a parent of someone?',
    howToRead: ['∀x', 'means "for every person x"', '∃y', 'means "there exists some person y"', 'Parent(x,y)', 'means "x is a parent of y"'],
    stepByStep: (facts) => {
      const steps = KINSHIP_PEOPLE.map(x => {
        const children = getChildren(x, facts);
        return {
          person: x,
          pass: children.length > 0,
          detail: children.length > 0
            ? `${x} → parent of ${children.join(', ')} ✓`
            : `${x} → has no children ✗`,
        };
      });
      const allPass = steps.every(s => s.pass);
      return { steps, result: allPass, conclusion: allPass ? 'Every person has at least one child, so ∀x ∃y Parent(x,y) is TRUE.' : `Not everyone is a parent, so ∀x ∃y Parent(x,y) is FALSE.` };
    },
    evaluate: (facts) => KINSHIP_PEOPLE.every(x => KINSHIP_PEOPLE.some(y => facts[`Parent(${x},${y})`])),
  },
  {
    id: 'exists-parent',
    title: '∃x ∃y Parent(x, y)',
    meaning: 'Is there at least ONE parent-child pair?',
    howToRead: ['∃x', 'means "there exists some person x"', '∃y', 'means "there exists some person y"', 'Parent(x,y)', 'means "x is a parent of y"'],
    stepByStep: (facts) => {
      // Show each person and whether they are a parent of anyone
      const steps = KINSHIP_PEOPLE.map(x => {
        const children = getChildren(x, facts);
        return {
          person: x,
          pass: children.length > 0,
          detail: children.length > 0
            ? `${x} → parent of ${children.join(', ')} ✓`
            : `${x} → not a parent of anyone`,
        };
      });
      const found = steps.some(s => s.pass);
      return { steps, result: found, conclusion: found ? 'At least one parent-child pair exists. ∃x ∃y Parent(x,y) is TRUE.' : 'No parent-child pairs exist at all. ∃x ∃y Parent(x,y) is FALSE.' };
    },
    evaluate: (facts) => KINSHIP_PEOPLE.some(x => KINSHIP_PEOPLE.some(y => facts[`Parent(${x},${y})`])),
  },
  {
    id: 'mother',
    title: '∃x ∃y Mother(x, y)',
    meaning: 'Is there a mother? (Female AND Parent)',
    howToRead: ['∃x', '"there exists x"', '∃y', '"there exists y"', 'Female(x) ∧ Parent(x,y)', '"x is female AND x is parent of y"'],
    stepByStep: (facts) => {
      const steps = KINSHIP_PEOPLE.map(x => {
        const isFemale = facts[`Female(${x})`];
        const children = getChildren(x, facts);
        const isMother = isFemale && children.length > 0;
        return {
          person: x,
          pass: isMother,
          detail: isFemale
            ? (children.length > 0 ? `${x}: Female ✓ + Parent of ${children.join(', ')} ✓ → Mother!` : `${x}: Female ✓ but no children ✗`)
            : `${x}: Not female ✗`,
        };
      });
      const found = steps.some(s => s.pass);
      return { steps, result: found, conclusion: found ? 'Found at least one mother. ∃x ∃y Mother(x,y) is TRUE.' : 'No one is both female and a parent. FALSE.' };
    },
    evaluate: (facts) => KINSHIP_PEOPLE.some(x => facts[`Female(${x})`] && KINSHIP_PEOPLE.some(y => facts[`Parent(${x},${y})`])),
  },
  {
    id: 'grandparent',
    title: '∃x ∃y Grandparent(x, y)',
    meaning: 'Is there a grandparent? (Parent of a parent)',
    howToRead: ['∃x ∃y ∃z', '"there exist x, y, z"', 'Parent(x,z) ∧ Parent(z,y)', '"x is parent of z AND z is parent of y"'],
    stepByStep: (facts) => {
      // Check each person: are they a grandparent (parent of someone who is also a parent)?
      const steps = KINSHIP_PEOPLE.map(x => {
        const children = getChildren(x, facts);
        const grandchildren = [];
        children.forEach(z => {
          getChildren(z, facts).forEach(y => {
            grandchildren.push(`${z}→${y}`);
          });
        });
        if (children.length === 0) {
          return { person: x, pass: false, detail: `${x} → no children, can't be a grandparent` };
        }
        if (grandchildren.length > 0) {
          return { person: x, pass: true, detail: `${x} → children: ${children.join(', ')} → grandchildren via: ${grandchildren.join(', ')} ✓` };
        }
        return { person: x, pass: false, detail: `${x} → children: ${children.join(', ')}, but none of them have children` };
      });
      const found = steps.some(s => s.pass);
      return { steps, result: found, conclusion: found ? 'Found a grandparent chain. ∃x ∃y Grandparent(x,y) is TRUE.' : 'No grandparent chains. Try adding more parent links! FALSE.' };
    },
    evaluate: (facts) => KINSHIP_PEOPLE.some(x => KINSHIP_PEOPLE.some(z => facts[`Parent(${x},${z})`] && KINSHIP_PEOPLE.some(y => facts[`Parent(${z},${y})`]))),
  },
  {
    id: 'sibling',
    title: '∃x ∃y Sibling(x, y)',
    meaning: 'Are there siblings? (Share a parent, x≠y)',
    howToRead: ['∃x ∃y', '"there exist x and y"', 'x≠y', '"x and y are different people"', '∃z Parent(z,x) ∧ Parent(z,y)', '"they share a parent z"'],
    stepByStep: (facts) => {
      // For each person who is a parent, check if they have 2+ children (siblings)
      const steps = [];
      const parentsSeen = new Set();
      KINSHIP_PEOPLE.forEach(z => {
        const children = getChildren(z, facts);
        if (children.length >= 2) {
          parentsSeen.add(z);
          // List all sibling pairs
          for (let i = 0; i < children.length; i++) {
            for (let j = i + 1; j < children.length; j++) {
              steps.push({ person: children[i], pass: true, detail: `${children[i]} & ${children[j]} are siblings (shared parent: ${z}) ✓` });
            }
          }
        }
      });
      // Also show parents with only 1 or 0 children
      KINSHIP_PEOPLE.forEach(z => {
        if (!parentsSeen.has(z)) {
          const children = getChildren(z, facts);
          if (children.length === 1) {
            steps.push({ person: z, pass: false, detail: `${z} has only 1 child (${children[0]}) — no siblings from this parent` });
          } else if (children.length === 0) {
            steps.push({ person: z, pass: false, detail: `${z} has no children` });
          }
        }
      });
      const found = steps.some(s => s.pass);
      return { steps, result: found, conclusion: found ? 'Found siblings. ∃x ∃y Sibling(x,y) is TRUE.' : 'No siblings found. Need 2+ children of the same parent. FALSE.' };
    },
    evaluate: (facts) => KINSHIP_PEOPLE.some(x => KINSHIP_PEOPLE.some(y => x !== y && KINSHIP_PEOPLE.some(z => facts[`Parent(${z},${x})`] && facts[`Parent(${z},${y})`]))),
  },
  {
    id: 'all-female-parent',
    title: '∀x Female(x) → ∃y Parent(x,y)',
    meaning: 'Is every female also a parent?',
    howToRead: ['∀x', '"for every person x"', 'Female(x) →', '"IF x is female THEN"', '∃y Parent(x,y)', '"x is a parent of someone"'],
    stepByStep: (facts) => {
      const steps = KINSHIP_PEOPLE.map(x => {
        const isFemale = facts[`Female(${x})`];
        if (!isFemale) return { person: x, pass: true, detail: `${x}: Not female → rule doesn't apply (vacuously true) ✓` };
        const children = getChildren(x, facts);
        return {
          person: x,
          pass: children.length > 0,
          detail: children.length > 0
            ? `${x}: Female ✓ and parent of ${children.join(', ')} ✓`
            : `${x}: Female ✓ but NOT a parent ✗ — counterexample!`,
        };
      });
      const allPass = steps.every(s => s.pass);
      return { steps, result: allPass, conclusion: allPass ? 'Every female is a parent. TRUE.' : 'Found a female who is not a parent. FALSE.' };
    },
    evaluate: (facts) => KINSHIP_PEOPLE.every(x => { if (!facts[`Female(${x})`]) return true; return KINSHIP_PEOPLE.some(y => facts[`Parent(${x},${y})`]); }),
  },
];


const VARIABLE_EXAMPLES = [
  { formula: '∀x Likes(x, IceCream)', plain: 'Everyone likes ice cream', variables: [{ name: 'x', bound: true, by: '∀x' }], isSentence: true,
    whyMatters: 'x is controlled by ∀ — it checks every person. So we can say this is TRUE or FALSE.' },
  { formula: 'Likes(x, y)', plain: 'x likes y (but who are x and y?)', variables: [{ name: 'x', bound: false }, { name: 'y', bound: false }], isSentence: false,
    whyMatters: 'Neither x nor y has a quantifier. We can\'t evaluate this — it\'s like saying "he likes her" without saying who.' },
  { formula: '∀x ∃y Loves(x, y)', plain: 'Everyone loves at least someone', variables: [{ name: 'x', bound: true, by: '∀x' }, { name: 'y', bound: true, by: '∃y' }], isSentence: true,
    whyMatters: 'Both variables are bound — x by ∀ and y by ∃. This is a complete statement we can evaluate.' },
  { formula: '∀x Loves(x, y)', plain: 'Everyone loves y (but who is y?)', variables: [{ name: 'x', bound: true, by: '∀x' }, { name: 'y', bound: false }], isSentence: false,
    whyMatters: 'x is bound by ∀, but y is free. It\'s like saying "everyone loves ???" — incomplete!' },
  { formula: '∃x Cat(x) ∧ Cute(x)', plain: 'There is a cute cat', variables: [{ name: 'x', bound: true, by: '∃x' }], isSentence: true,
    whyMatters: 'x is bound by ∃ — it says "there exists at least one." We can check if this is true.' },
  { formula: 'Parent(x, Bob) ∧ Female(x)', plain: 'x is Bob\'s mother (but who is x?)', variables: [{ name: 'x', bound: false }], isSentence: false,
    whyMatters: 'x has no quantifier. Add ∃x to say "someone is Bob\'s mother" or ∀x to say "everyone is Bob\'s mother."' },
];

const EQUIV_RULES = [
  { left: '¬∀x P(x)', right: '∃x ¬P(x)', name: 'NOT all = SOME are not', category: 'safe',
    englishLeft: 'Not all students passed', englishRight: 'Some student didn\'t pass',
    example: 'These always mean the same thing. Denying "everyone" is the same as saying "at least one person doesn\'t."' },
  { left: '¬∃x P(x)', right: '∀x ¬P(x)', name: 'NONE exist = ALL are not', category: 'safe',
    englishLeft: 'No dog can fly', englishRight: 'Every dog can\'t fly',
    example: 'Saying "none" is the same as saying "all are not." Two ways to express the same idea.' },
  { left: '∀x (P(x) ∧ Q(x))', right: '(∀x P(x)) ∧ (∀x Q(x))', name: '∀ distributes over ∧', category: 'safe',
    englishLeft: 'All cats are furry and cute', englishRight: 'All cats are furry AND all cats are cute',
    example: 'You can safely split "all are A and B" into two separate "all" statements with AND.' },
  { left: '∃x (P(x) ∨ Q(x))', right: '(∃x P(x)) ∨ (∃x Q(x))', name: '∃ distributes over ∨', category: 'safe',
    englishLeft: 'Some animal is a cat or dog', englishRight: 'Some animal is a cat OR some animal is a dog',
    example: 'You can safely split "some is A or B" into two separate "some" statements with OR.' },
  { left: '∀x ∀y P(x,y)', right: '∀y ∀x P(x,y)', name: 'Same quantifiers can swap', category: 'safe',
    englishLeft: 'For all x, for all y: P', englishRight: 'For all y, for all x: P',
    example: 'When both quantifiers are the same type (both ∀ or both ∃), order doesn\'t matter.' },
  { left: '∀x ∃y Loves(x,y)', right: '∃y ∀x Loves(x,y)', name: '⚠️ DANGER: ∀∃ ≠ ∃∀', category: 'danger',
    englishLeft: 'Everyone loves someone (maybe different people)', englishRight: 'There\'s ONE person everyone loves',
    example: 'Swapping ∀ and ∃ changes the meaning completely! The first allows different "someones" for each person. The second requires one specific person.' },
];


/* ── Visual Family Tree Component ── */
function FamilyTree({ facts }) {
  // BFS from roots to assign correct generation depths
  const depths = {};
  const roots = KINSHIP_PEOPLE.filter(p => getParents(p, facts).length === 0);
  const hasRelationships = KINSHIP_PEOPLE.some(p => getChildren(p, facts).length > 0);

  // People with no parents AND no children are "unconnected" — show at gen 1
  const unconnected = roots.filter(p => getChildren(p, facts).length === 0);
  const actualRoots = roots.filter(p => getChildren(p, facts).length > 0);

  // BFS to compute depth for each person
  const queue = actualRoots.map(p => ({ person: p, depth: 0 }));
  actualRoots.forEach(p => { depths[p] = 0; });

  while (queue.length > 0) {
    const { person, depth } = queue.shift();
    const children = getChildren(person, facts);
    children.forEach(child => {
      // Take the max depth if reached via multiple parents
      const newDepth = depth + 1;
      if (depths[child] === undefined || newDepth > depths[child]) {
        depths[child] = newDepth;
        queue.push({ person: child, depth: newDepth });
      }
    });
  }

  // Also assign unconnected people to depth 0
  unconnected.forEach(p => { if (depths[p] === undefined) depths[p] = 0; });

  // Anyone still without a depth (orphan with parents not in tree) gets depth 0
  KINSHIP_PEOPLE.forEach(p => { if (depths[p] === undefined) depths[p] = 0; });

  // Group by generation
  const maxDepth = Math.max(...Object.values(depths), 0);
  const generations = [];
  for (let d = 0; d <= maxDepth; d++) {
    const people = KINSHIP_PEOPLE.filter(p => depths[p] === d);
    if (people.length > 0) generations.push(people);
  }

  const PersonBubble = ({ name }) => {
    const gender = getGender(name, facts);
    const children = getChildren(name, facts);
    const parents = getParents(name, facts);
    return (
      <div className="tree-person" style={{ '--person-color': PERSON_COLORS[name] }}>
        <div className={`tree-avatar ${gender}`}>
          {gender === 'male' ? <FaMale /> : gender === 'female' ? <FaFemale /> : <FaQuestionCircle />}
        </div>
        <span className="tree-name">{name}</span>
        {children.length > 0 && <span className="tree-role">Parent of {children.join(', ')}</span>}
        {parents.length > 0 && <span className="tree-role child-of">Child of {parents.join(', ')}</span>}
      </div>
    );
  };

  return (
    <div className="family-tree-visual">
      <div className="tree-label">Family Tree Visualization</div>
      {!hasRelationships ? (
        <div className="tree-empty">No relationships yet. Click the buttons below to build your family!</div>
      ) : (
        <div className="tree-layers">
          {generations.map((gen, i) => (
            <React.Fragment key={i}>
              {i > 0 && (
                <div className="tree-connector">
                  <div className="connector-line" />
                  <FaArrowRight className="connector-arrow" />
                </div>
              )}
              <div className="tree-layer">
                <span className="layer-label">Generation {i + 1}</span>
                <div className="layer-people">
                  {gen.map(p => <PersonBubble key={p} name={p} />)}
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
}


/* ── Query Card with expandable step-by-step ── */
function QueryCard({ ex, facts, isExpanded, onToggle }) {
  const result = ex.evaluate(facts);
  const breakdown = ex.stepByStep(facts);

  return (
    <div className={`query-card-v2 ${result ? 'is-true' : 'is-false'}`}>
      <button className="query-card-header-v2" onClick={onToggle} aria-expanded={isExpanded}>
        <div className="query-left">
          <span className="query-formula-v2">{ex.title}</span>
          <span className="query-meaning-v2">{ex.meaning}</span>
        </div>
        <div className="query-right">
          <span className={`query-badge ${result ? 'true' : 'false'}`}>
            {result ? <><FaCheckCircle /> TRUE</> : <><FaTimesCircle /> FALSE</>}
          </span>
          {isExpanded ? <FaChevronUp className="query-chevron" /> : <FaChevronDown className="query-chevron" />}
        </div>
      </button>

      {isExpanded && (
        <div className="query-expand">
          <div className="query-how-to-read">
            <span className="expand-label"><FaLightbulb /> How to read this:</span>
            <div className="how-read-tokens">
              {ex.howToRead.map((token, i) => (
                <span key={i} className={i % 2 === 0 ? 'read-symbol' : 'read-english'}>{token}</span>
              ))}
            </div>
          </div>

          <div className="query-steps">
            <span className="expand-label"><FaSearch /> Step-by-step evaluation:</span>
            {breakdown.steps.map((step, i) => (
              <div key={i} className={`eval-step ${step.pass ? 'pass' : 'fail'}`}>
                <span className="step-icon">{step.pass ? '✓' : '✗'}</span>
                <span className="step-text">{step.detail}</span>
              </div>
            ))}
          </div>

          <div className={`query-conclusion ${breakdown.result ? 'true' : 'false'}`}>
            <strong>Conclusion:</strong> {breakdown.conclusion}
          </div>
        </div>
      )}
    </div>
  );
}


/* ── Variable Card with interactive highlighting ── */
function VariableCard({ ex, isSelected, onClick }) {
  return (
    <div className={`var-card-v2 ${isSelected ? 'selected' : ''} ${ex.isSentence ? 'is-sentence' : 'not-sentence'}`} onClick={onClick}>
      <div className="var-card-top">
        <div className="var-formula-v2">{ex.formula}</div>
        <div className={`var-verdict ${ex.isSentence ? 'yes' : 'no'}`}>
          {ex.isSentence ? 'SENTENCE' : 'NOT A SENTENCE'}
        </div>
      </div>
      <p className="var-english">"{ex.plain}"</p>
      <div className="var-tags-v2">
        {ex.variables.map((v, j) => (
          <span key={j} className={`var-tag-v2 ${v.bound ? 'bound' : 'free'}`}>
            <span className="tag-var-name">{v.name}</span>
            {v.bound ? <span className="tag-detail">bound by {v.by}</span> : <span className="tag-detail">free (no quantifier)</span>}
          </span>
        ))}
      </div>
      {isSelected && (
        <div className="var-why-matters">
          <FaLightbulb className="why-icon" />
          <span>{ex.whyMatters}</span>
        </div>
      )}
    </div>
  );
}


/* ── Main FOLPanel ── */
function FOLPanel() {
  const [facts, setFacts] = useState({ ...INITIAL_FACTS });
  const [activeSection, setActiveSection] = useState('kinship');
  const [expandedQuery, setExpandedQuery] = useState(null);
  const [selectedVarExample, setSelectedVarExample] = useState(null);

  const toggleFact = (key) => {
    setFacts(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const resetFacts = () => {
    setFacts({ ...INITIAL_FACTS });
    setExpandedQuery(null);
  };

  const sections = [
    { id: 'kinship', label: 'Family World', icon: <FaUsers />, desc: 'Build a family and ask logic questions about it' },
    { id: 'variables', label: 'Free & Bound', icon: <FaKey />, desc: 'Which variables have a quantifier "boss"?' },
    { id: 'equivalence', label: 'FOL Rules', icon: <FaExchangeAlt />, desc: 'Rewrite rules — which are safe and which are traps?' },
  ];

  const trueCount = useMemo(() => FOL_EXAMPLES.filter(ex => ex.evaluate(facts)).length, [facts]);
  const totalCount = FOL_EXAMPLES.length;

  return (
    <div className="fol-panel">
      <div className="fol-intro-banner">
        <FaInfoCircle className="fol-intro-icon" />
        <div>
          <p>First-Order Logic lets us talk about "all" and "some" things — like "ALL cats have whiskers" or "SOME dogs are friendly."</p>
          <p className="fol-intro-sub">It adds <strong>quantifiers</strong> (∀ = for all, ∃ = there exists) and <strong>predicates</strong> (like Parent, Female) to basic logic.</p>
        </div>
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

      {/* ═══════ FAMILY WORLD ═══════ */}
      {activeSection === 'kinship' && (
        <div className="kinship-section-v2">
          <FamilyTree facts={facts} />

          <div className="kinship-layout-v2">
            {/* Left: Facts editor */}
            <div className="facts-panel-v2">
              <div className="facts-header">
                <h4><FaBook style={{ marginRight: 4 }} /> Family Facts</h4>
                <button className="reset-btn" onClick={resetFacts}>Reset to Default</button>
              </div>

              <div className="facts-group-v2">
                <h5>Parent relationships <span className="facts-hint">(click to toggle)</span></h5>
                <div className="facts-grid-v2">
                  {KINSHIP_PEOPLE.map(x =>
                    KINSHIP_PEOPLE.filter(y => x !== y).map(y => {
                      const key = `Parent(${x},${y})`;
                      const active = facts[key] || false;
                      return (
                        <button
                          key={key}
                          className={`fact-chip-v2 ${active ? 'active' : ''}`}
                          onClick={() => toggleFact(key)}
                          style={active ? { borderColor: PERSON_COLORS[x], background: `${PERSON_COLORS[x]}12` } : {}}
                        >
                          <span className={`chip-dot ${active ? 'on' : 'off'}`} style={active ? { background: PERSON_COLORS[x] } : {}} />
                          {x} → {y}
                        </button>
                      );
                    })
                  )}
                </div>
              </div>

              <div className="facts-group-v2">
                <h5>Gender <span className="facts-hint">(click to toggle)</span></h5>
                <div className="facts-grid-v2 gender-grid">
                  {KINSHIP_PEOPLE.map(x => (
                    <React.Fragment key={x}>
                      <button
                        className={`fact-chip-v2 gender-chip ${facts[`Male(${x})`] ? 'active male' : ''}`}
                        onClick={() => {
                          const wasMale = facts[`Male(${x})`];
                          setFacts(prev => ({ ...prev, [`Male(${x})`]: !wasMale, [`Female(${x})`]: false }));
                        }}
                      >
                        <FaMale className="gender-icon" /> {x}
                      </button>
                      <button
                        className={`fact-chip-v2 gender-chip ${facts[`Female(${x})`] ? 'active female' : ''}`}
                        onClick={() => {
                          const wasFemale = facts[`Female(${x})`];
                          setFacts(prev => ({ ...prev, [`Female(${x})`]: !wasFemale, [`Male(${x})`]: false }));
                        }}
                      >
                        <FaFemale className="gender-icon" /> {x}
                      </button>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Queries */}
            <div className="queries-panel-v2">
              <div className="queries-header">
                <h4><FaSearch style={{ marginRight: 4 }} /> Logic Questions</h4>
                <span className="queries-score">{trueCount}/{totalCount} TRUE</span>
              </div>
              <p className="queries-hint-v2">Click any question to see the step-by-step evaluation. Change the family to see results update live!</p>
              <div className="query-list-v2">
                {FOL_EXAMPLES.map(ex => (
                  <QueryCard
                    key={ex.id}
                    ex={ex}
                    facts={facts}
                    isExpanded={expandedQuery === ex.id}
                    onToggle={() => setExpandedQuery(expandedQuery === ex.id ? null : ex.id)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══════ FREE & BOUND ═══════ */}
      {activeSection === 'variables' && (
        <div className="variables-section-v2">
          <div className="var-intro-v2">
            <div className="var-concept-row">
              <div className="var-concept-card bound-concept">
                <div className="concept-header">
                  <span className="concept-symbol">∀x / ∃x</span>
                  <span className="concept-badge bound">BOUND</span>
                </div>
                <p>A variable controlled by a quantifier. It has a "boss" telling it to check all values or find one.</p>
                <div className="concept-example">Example: In <code>∀x Likes(x, Pizza)</code>, x is bound by ∀</div>
              </div>
              <div className="var-concept-card free-concept">
                <div className="concept-header">
                  <span className="concept-symbol">x, y</span>
                  <span className="concept-badge free">FREE</span>
                </div>
                <p>A variable with no quantifier. It's undefined — we don't know what it refers to.</p>
                <div className="concept-example">Example: In <code>Likes(x, Pizza)</code>, x is free — who is x?</div>
              </div>
            </div>
            <div className="var-key-insight">
              <FaLightbulb className="insight-icon" />
              <span>Only formulas where <strong>ALL</strong> variables are bound (called <strong>sentences</strong>) can be evaluated as TRUE or FALSE.</span>
            </div>
          </div>

          <h4 className="var-examples-title">Click an example to explore:</h4>
          <div className="var-examples-v2">
            {VARIABLE_EXAMPLES.map((ex, i) => (
              <VariableCard
                key={i}
                ex={ex}
                isSelected={selectedVarExample === i}
                onClick={() => setSelectedVarExample(selectedVarExample === i ? null : i)}
              />
            ))}
          </div>
        </div>
      )}

      {/* ═══════ FOL RULES ═══════ */}
      {activeSection === 'equivalence' && (
        <div className="equiv-section-v2">
          <div className="equiv-intro-v2">
            <p>Some FOL formulas can be rewritten to mean the exact same thing. But watch out — one common rewrite is a <strong>trap</strong> that changes the meaning!</p>
          </div>

          <div className="equiv-cards-v2">
            {EQUIV_RULES.map((eq, i) => (
              <div key={i} className={`equiv-card-v2 ${eq.category}`}>
                <div className="equiv-card-top">
                  <span className={`equiv-category-badge ${eq.category}`}>
                    {eq.category === 'safe' ? '✓ Equivalent' : '⚠ NOT Equivalent'}
                  </span>
                  <span className="equiv-rule-name">{eq.name}</span>
                </div>

                <div className="equiv-comparison">
                  <div className="equiv-side">
                    <span className="equiv-formula-label">Formula A</span>
                    <span className="equiv-formula-v2">{eq.left}</span>
                    <span className="equiv-english">{eq.englishLeft}</span>
                  </div>
                  <div className="equiv-middle">
                    <span className={`equiv-symbol-v2 ${eq.category}`}>
                      {eq.category === 'safe' ? '≡' : '≢'}
                    </span>
                  </div>
                  <div className="equiv-side">
                    <span className="equiv-formula-label">Formula B</span>
                    <span className="equiv-formula-v2">{eq.right}</span>
                    <span className="equiv-english">{eq.englishRight}</span>
                  </div>
                </div>

                <div className="equiv-explanation-v2">
                  <FaLightbulb className="equiv-explain-icon" />
                  <span>{eq.example}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default FOLPanel;

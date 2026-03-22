import React, { useState } from 'react';
import { Icon } from '../iconMap';
import { FaBookOpen } from 'react-icons/fa';
import './LearnPanel.css';

const LESSONS = [
  {
    id: 'prop',
    title: '1. What is a Proposition?',
    icon: '💬',
    sections: [
      {
        heading: 'Think of it like this...',
        body: 'A proposition is just a sentence that is either TRUE or FALSE. That\'s it! No maybes, no "kind of" — just yes or no.',
      },
      {
        heading: 'These ARE propositions',
        items: [
          '"It is raining right now" — you can check, it\'s true or false',
          '"2 + 2 = 4" — always true!',
          '"Dogs can fly" — always false (sorry, dogs)',
        ],
      },
      {
        heading: 'These are NOT propositions',
        items: [
          '"What time is it?" — it\'s a question, not a statement',
          '"Close the door!" — it\'s a command',
          '"x + 1 = 5" — we don\'t know what x is yet!',
        ],
      },
      {
        heading: 'We use letters as shortcuts',
        body: 'Instead of writing long sentences, we use letters:\n  A = "It is raining"\n  B = "The sun is shining"\n  C = "There is a rainbow"\n\nThis makes it way easier to work with!',
      },
    ],
  },
  {
    id: 'connectives',
    title: '2. Logical Connectives',
    icon: '🔗',
    sections: [
      {
        heading: 'Connectives are like glue',
        body: 'They join simple propositions together to make bigger, more interesting ones. There are 5 main connectives:',
      },
      {
        heading: 'NOT  (¬)  —  "The Opposite"',
        body: 'Flips true to false, and false to true.\n  ¬TRUE = FALSE\n  ¬FALSE = TRUE\n\nThink of it like Opposite Day — everything gets flipped!',
      },
      {
        heading: 'AND  (∧)  —  "Both Must Be True"',
        body: 'Both sides need to be true for the whole thing to be true.\n  TRUE ∧ TRUE = TRUE\n  Everything else = FALSE\n\nLike saying "I need a ticket AND popcorn to enjoy the movie."',
      },
      {
        heading: 'OR  (∨)  —  "At Least One"',
        body: 'At least one side needs to be true.\n  FALSE ∨ FALSE = FALSE\n  Everything else = TRUE\n\nLike saying "Do you want pizza OR pasta?" (you could have both!)',
      },
      {
        heading: 'IMPLIES  (→)  —  "If...Then"',
        body: 'Only false when the first part is true but the second is false.\n  TRUE → FALSE = FALSE\n  Everything else = TRUE\n\nLike a promise: "If you do homework, then you can play games." The promise is only broken if you DID the homework but DIDN\'T get to play.',
      },
      {
        heading: 'BICONDITIONAL  (↔)  —  "Same or Different"',
        body: 'True when both sides match (both true or both false).\n  TRUE ↔ TRUE = TRUE\n  FALSE ↔ FALSE = TRUE\n\nLike a light switch: switch ON ↔ light ON. They always match!',
      },
    ],
  },
  {
    id: 'truthtables',
    title: '3. Truth Tables',
    icon: '📊',
    sections: [
      {
        heading: 'What\'s a truth table?',
        body: 'A truth table is like a cheat sheet that shows EVERY possible combination of true and false values, and what the result is for each one.',
      },
      {
        heading: 'How many rows?',
        body: 'The number of rows depends on how many propositions you have:\n  2 propositions → 4 rows (2 × 2)\n  3 propositions → 8 rows (2 × 2 × 2)\n  4 propositions → 16 rows!\n\nIt doubles every time you add a new proposition.',
      },
      {
        heading: 'Example: A AND B',
        body: '  A      B     │ A ∧ B\n  TRUE   TRUE  │ TRUE   ← the only one!\n  TRUE   FALSE │ FALSE\n  FALSE  TRUE  │ FALSE\n  FALSE  FALSE │ FALSE\n\nSee? AND is strict — both must be true.',
      },
      {
        heading: 'Why are they useful?',
        items: [
          'Check if something is ALWAYS true (called a "tautology")',
          'Check if two formulas mean the same thing',
          'Understand exactly how each connective works',
          'Try it yourself in the Explore tab!',
        ],
      },
    ],
  },
  {
    id: 'equivalences',
    title: '4. Logical Equivalences',
    icon: '⚖️',
    sections: [
      {
        heading: 'When two formulas are twins',
        body: 'Two formulas are "equivalent" (≡) when they ALWAYS give the same answer, no matter what values you plug in. Their truth tables are identical!',
      },
      {
        heading: 'De Morgan\'s Laws — The Magic Swap',
        body: '  ¬(A ∧ B)  ≡  (¬A ∨ ¬B)\n  ¬(A ∨ B)  ≡  (¬A ∧ ¬B)\n\nIn plain English: "It\'s NOT true that I have BOTH a dog and a cat" is the same as "I don\'t have a dog OR I don\'t have a cat."\n\nWhen you push NOT inside, AND becomes OR, and OR becomes AND!',
      },
      {
        heading: 'Contrapositive — The Flip',
        body: '  (A → B)  ≡  (¬B → ¬A)\n\n"If it rains, the ground is wet" means the same as "If the ground is NOT wet, it did NOT rain."\n\nFlip the order AND negate both sides!',
      },
      {
        heading: 'Double Negation',
        body: '  ¬(¬A)  ≡  A\n\n"I am NOT not-happy" just means "I am happy." Two NOTs cancel out!',
      },
    ],
  },
  {
    id: 'inference',
    title: '5. Inference Rules',
    icon: '🧠',
    sections: [
      {
        heading: 'Figuring out new facts',
        body: 'Inference rules let us discover NEW truths from things we already know. It\'s like being a detective!',
      },
      {
        heading: 'Modus Ponens — "The Classic"',
        body: 'If we know "P → Q" is true, AND P is true...\nthen Q MUST be true!\n\nExample: "If it rains, the ground gets wet. It\'s raining. So... the ground is wet!"',
      },
      {
        heading: 'Modus Tollens — "The Reverse Detective"',
        body: 'If we know "P → Q" is true, AND Q is false...\nthen P MUST be false!\n\nExample: "If it rains, the ground gets wet. The ground is dry. So... it\'s NOT raining!"',
      },
      {
        heading: 'Disjunctive Syllogism — "Process of Elimination"',
        body: 'If we know "P ∨ Q" is true, AND P is false...\nthen Q MUST be true!\n\nExample: "Pizza or pasta for dinner. No pizza available. So... pasta it is!"',
      },
    ],
  },
  {
    id: 'fol-intro',
    title: '6. First-Order Logic',
    icon: '�',
    sections: [
      {
        heading: 'Why do we need more?',
        body: 'Regular logic (propositional) can only say things like "A is true" or "B is false." But what if we want to say "ALL cats have whiskers" or "SOME dogs are friendly"? We need First-Order Logic (FOL)!',
      },
      {
        heading: 'New tools in our toolbox',
        items: [
          'Variables (x, y, z) — stand-ins for objects, like "some person" or "any animal"',
          'Predicates — describe properties: Cat(x) means "x is a cat"',
          '∀ (for ALL) — "every single one": ∀x Cat(x) → HasWhiskers(x)',
          '∃ (there EXISTS) — "at least one": ∃x Dog(x) ∧ Friendly(x)',
        ],
      },
      {
        heading: 'Real examples',
        body: '  ∀x Cat(x) → HasWhiskers(x)\n  "Every cat has whiskers"\n\n  ∃x Dog(x) ∧ Friendly(x)\n  "There is at least one friendly dog"\n\n  ∀x ∀y Parent(x,y) → Loves(x,y)\n  "All parents love their children"',
      },
    ],
  },
  {
    id: 'fol-variables',
    title: '7. Free & Bound Variables',
    icon: '🔓',
    sections: [
      {
        heading: 'Bound = has a quantifier boss',
        body: 'A variable is BOUND when it\'s "owned" by a ∀ or ∃ quantifier.\n\n  ∀x Likes(x, IceCream)\n  → x is BOUND (∀x is its boss)',
      },
      {
        heading: 'Free = no boss, floating around',
        body: 'A variable is FREE when no quantifier claims it.\n\n  Likes(x, y)\n  → x is FREE, y is FREE\n  → We can\'t say if this is true or false yet!',
      },
      {
        heading: 'Sentences vs Formulas',
        body: 'A SENTENCE has NO free variables — every variable has a quantifier boss. Only sentences can be TRUE or FALSE.\n\n  ∀x ∃y Loves(x, y) — Sentence (all bound)\n  ∀x Loves(x, y) — NOT a sentence (y is free!)',
      },
    ],
  },
  {
    id: 'fol-satisfaction',
    title: '8. Models & Satisfaction',
    icon: '✅',
    sections: [
      {
        heading: 'A model is a mini world',
        body: 'A model gives meaning to our logic by defining:\n  • A set of objects (the "domain")\n  • What the predicates mean for those objects',
      },
      {
        heading: 'Example: A tiny family',
        body: '  Domain: {Alice, Bob, Charlie}\n  Parent(Alice, Bob) = TRUE\n  Parent(Bob, Charlie) = TRUE\n  Parent(Alice, Charlie) = FALSE',
      },
      {
        heading: 'Does the model "satisfy" a sentence?',
        body: 'We write M ⊨ φ to mean "the model M makes φ true."\n\n  ∃x ∃y Parent(x,y) → TRUE (Alice is parent of Bob)\n  ∀x ∃y Parent(x,y) → FALSE (Charlie has no child)\n\nA sentence that\'s true in ALL possible models is called a tautology!',
      },
    ],
  },
  {
    id: 'fol-equivalence',
    title: '9. FOL Equivalences',
    icon: '🔄',
    sections: [
      {
        heading: 'Flipping quantifiers with NOT',
        body: '  ¬∀x P(x)  ≡  ∃x ¬P(x)\n  "Not ALL students passed" = "SOME student didn\'t pass"\n\n  ¬∃x P(x)  ≡  ∀x ¬P(x)\n  "NO dog can fly" = "ALL dogs can\'t fly"',
      },
      {
        heading: 'Distributing quantifiers',
        body: '  ∀x (P(x) ∧ Q(x))  ≡  (∀x P(x)) ∧ (∀x Q(x))\n  "All cats are furry AND cute" = "All cats are furry" AND "All cats are cute"',
      },
      {
        heading: 'Watch out! Order matters!',
        body: '  ∀x ∃y Loves(x,y)  ≠  ∃y ∀x Loves(x,y)\n\n  First one: "Everyone loves SOMEONE" (different people for each)\n  Second one: "There\'s ONE person everyone loves" (same person)\n\n  These are NOT the same! Swapping ∀ and ∃ changes the meaning.',
      },
    ],
  },
  {
    id: 'fol-kinship',
    title: '10. FOL with Families',
    icon: '👨‍👩‍👧‍👦',
    sections: [
      {
        heading: 'Family trees are perfect for FOL!',
        body: 'We can describe family relationships using predicates:\n  Parent(x, y) = "x is a parent of y"\n  Male(x) = "x is male"\n  Female(x) = "x is female"',
      },
      {
        heading: 'Building new relationships',
        body: '  Mother(x, y)  ≡  Female(x) ∧ Parent(x, y)\n  "x is a mother of y means x is female AND x is a parent of y"\n\n  Grandparent(x, y)  ≡  ∃z Parent(x, z) ∧ Parent(z, y)\n  "x is a grandparent of y means there\'s someone z in between"\n\n  Sibling(x, y)  ≡  x ≠ y ∧ ∃z Parent(z, x) ∧ Parent(z, y)\n  "x and y are siblings if they share a parent (and aren\'t the same person)"',
      },
      {
        heading: 'Try it yourself!',
        body: 'Head over to the First-Order tab to build your own family and test these queries live!',
      },
    ],
  },
];

function LessonContent({ lesson }) {
  return (
    <div className="lesson-sections">
      {lesson.sections.map((sec, i) => (
        <div key={i} className="lesson-section">
          <h4 className="lesson-section-heading">{sec.heading}</h4>
          {sec.body && <pre className="lesson-section-body">{sec.body}</pre>}
          {sec.items && (
            <ul className="lesson-section-list">
              {sec.items.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

function LearnPanel() {
  const [activeLesson, setActiveLesson] = useState(0);

  return (
    <div className="learn-panel">
      <div className="learn-sidebar">
        <h3 className="learn-sidebar-title"><FaBookOpen style={{ marginRight: 6 }} /> Lessons</h3>
        {LESSONS.map((lesson, i) => (
          <button
            key={lesson.id}
            className={`learn-nav-btn ${activeLesson === i ? 'active' : ''}`}
            onClick={() => setActiveLesson(i)}
          >
            <Icon emoji={lesson.icon} className="learn-nav-icon" size="1.1rem" />
            <span className="learn-nav-text">{lesson.title}</span>
          </button>
        ))}
      </div>
      <div className="learn-content">
        <div className="learn-header">
          <Icon emoji={LESSONS[activeLesson].icon} className="learn-icon" size="1.6rem" />
          <h2 className="learn-title">{LESSONS[activeLesson].title}</h2>
        </div>
        <div className="learn-body-scroll">
          <LessonContent lesson={LESSONS[activeLesson]} />
        </div>
        <div className="learn-nav-arrows">
          <button
            className="nav-arrow-btn"
            disabled={activeLesson === 0}
            onClick={() => setActiveLesson(activeLesson - 1)}
          >
            ← Previous
          </button>
          <span className="lesson-counter">{activeLesson + 1} / {LESSONS.length}</span>
          <button
            className="nav-arrow-btn"
            disabled={activeLesson === LESSONS.length - 1}
            onClick={() => setActiveLesson(activeLesson + 1)}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}

export default LearnPanel;

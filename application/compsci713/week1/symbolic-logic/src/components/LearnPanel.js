import React, { useState } from 'react';
import './LearnPanel.css';

const LESSONS = [
  {
    id: 'prop',
    title: '1. What is a Proposition?',
    emoji: '💬',
    content: `A proposition is a statement that is either TRUE or FALSE — nothing in between.

✅ Propositions:
  • "It is raining" → could be true or false
  • "2 + 2 = 4" → always true
  • "Dogs can fly" → always false

❌ NOT propositions:
  • "What time is it?" → it's a question
  • "Close the door!" → it's a command
  • "x + 1 = 5" → depends on x

We use letters like A, B, C to represent propositions:
  A = "It is raining"
  B = "The sun is shining"
  C = "There is a rainbow"`,
  },
  {
    id: 'connectives',
    title: '2. Logical Connectives',
    emoji: '🔗',
    content: `Connectives join propositions together:

¬ NOT (Negation) — flips the value
  ¬TRUE = FALSE,  ¬FALSE = TRUE
  Think: "Opposite Day!"

∧ AND (Conjunction) — BOTH must be true
  TRUE ∧ TRUE = TRUE, everything else = FALSE
  Think: "I need a ticket AND popcorn"

∨ OR (Disjunction) — at least ONE must be true
  FALSE ∨ FALSE = FALSE, everything else = TRUE
  Think: "Pizza OR pasta for dinner"

→ IMPLIES (If...Then) — only false when premise is true but conclusion is false
  TRUE → FALSE = FALSE, everything else = TRUE
  Think: "If you do homework, then you can play games"

↔ BICONDITIONAL (If and Only If) — both must match
  TRUE ↔ TRUE = TRUE,  FALSE ↔ FALSE = TRUE
  Think: "Light switch ON ↔ Light is ON"`,
  },
  {
    id: 'truthtables',
    title: '3. Truth Tables',
    emoji: '📊',
    content: `A truth table shows EVERY possible combination of true/false values.

For 2 propositions (A, B) → 4 rows (2² = 4)
For 3 propositions (A, B, C) → 8 rows (2³ = 8)

Example: A ∧ B (A AND B)
  A     B    │ A ∧ B
  TRUE  TRUE │ TRUE   ← only this one!
  TRUE  FALSE│ FALSE
  FALSE TRUE │ FALSE
  FALSE FALSE│ FALSE

Truth tables help us:
  • Check if a formula is always true (tautology)
  • Check if two formulas are equivalent
  • Understand how connectives work`,
  },
  {
    id: 'equivalences',
    title: '4. Logical Equivalences',
    emoji: '⚖️',
    content: `Two formulas are equivalent (≡) if they have the same truth table.

De Morgan's Laws:
  ¬(A ∧ B) ≡ (¬A ∨ ¬B)
  ¬(A ∨ B) ≡ (¬A ∧ ¬B)
  "NOT both" = "not one OR not the other"

Contrapositive:
  (A → B) ≡ (¬B → ¬A)
  "If rain then wet" = "If not wet then not rain"

Double Negation:
  ¬(¬A) ≡ A
  "Not not happy" = "Happy"

Material Implication:
  (A → B) ≡ (¬A ∨ B)
  "If A then B" = "Not A or B"`,
  },
  {
    id: 'inference',
    title: '5. Inference Rules',
    emoji: '🧠',
    content: `Inference rules let us derive NEW truths from existing ones.

Modus Ponens:
  If (P → Q) is true AND P is true → Q must be true
  "If it rains, ground is wet. It's raining. So ground is wet."

Modus Tollens:
  If (P → Q) is true AND Q is false → P must be false
  "If it rains, ground is wet. Ground is dry. So it's not raining."

Hypothetical Syllogism:
  If (P → Q) and (Q → R) → then (P → R)
  "If rain→wet, wet→slippery → rain→slippery"

Disjunctive Syllogism:
  If (P ∨ Q) and ¬P → then Q
  "Pizza or pasta. No pizza. So pasta!"`,
  },
  {
    id: 'fol-intro',
    title: '6. First-Order Logic (FOL)',
    emoji: '🔬',
    content: `Propositional logic has limits — it can't talk about "all" or "some" things.

First-Order Logic adds:
  • Variables: x, y, z (represent objects)
  • Predicates: properties or relations
      Cat(x) = "x is a cat"
      Loves(x, y) = "x loves y"
  • Quantifiers:
      ∀x = "for ALL x" (universal)
      ∃x = "there EXISTS an x" (existential)

Examples:
  ∀x Cat(x) → HasWhiskers(x)
  "All cats have whiskers"

  ∃x Dog(x) ∧ Friendly(x)
  "There exists a friendly dog"

  ∀x ∀y Parent(x,y) → Loves(x,y)
  "All parents love their children"`,
  },
  {
    id: 'fol-variables',
    title: '7. Free Variables & Sentences',
    emoji: '🔓',
    content: `A variable is BOUND if it's inside a quantifier (∀ or ∃).
A variable is FREE if it's NOT inside any quantifier.

Examples:
  ∀x Likes(x, IceCream)
  → x is BOUND (inside ∀x)
  → IceCream is a constant

  Likes(x, y)
  → x is FREE, y is FREE
  → This is NOT a sentence (it's a formula with free variables)

A SENTENCE is a formula with NO free variables:
  ✅ ∀x ∃y Loves(x, y) — sentence (all variables bound)
  ❌ ∀x Loves(x, y) — NOT a sentence (y is free)

Only sentences can be TRUE or FALSE.
Formulas with free variables need an assignment to evaluate.`,
  },
  {
    id: 'fol-satisfaction',
    title: '8. Satisfaction & Models',
    emoji: '✅',
    content: `A MODEL is a "mini world" that gives meaning to our logic:
  • A domain (set of objects)
  • Interpretations for predicates and constants

Example model (Family):
  Domain: {Alice, Bob, Charlie}
  Parent(Alice, Bob) = TRUE
  Parent(Bob, Charlie) = TRUE
  Parent(Alice, Charlie) = FALSE

SATISFACTION: A model M satisfies a sentence φ if φ is TRUE in M.
  We write: M ⊨ φ ("M models φ" or "M satisfies φ")

  M ⊨ ∃x ∃y Parent(x,y)  ✅ (Alice is parent of Bob)
  M ⊨ ∀x ∃y Parent(x,y)  ❌ (Charlie has no child)

A sentence is:
  • VALID (tautology) if true in ALL models
  • SATISFIABLE if true in SOME model
  • UNSATISFIABLE if true in NO model`,
  },
  {
    id: 'fol-equivalence',
    title: '9. FOL Logical Equivalence',
    emoji: '🔄',
    content: `Two FOL sentences are equivalent if they're true in exactly the same models.

Key equivalences:
  ¬∀x P(x) ≡ ∃x ¬P(x)
  "Not all are P" = "Some are not P"
  "Not all students passed" = "Some student didn't pass"

  ¬∃x P(x) ≡ ∀x ¬P(x)
  "None are P" = "All are not P"
  "No dog flies" = "All dogs don't fly"

Quantifier distribution:
  ∀x (P(x) ∧ Q(x)) ≡ (∀x P(x)) ∧ (∀x Q(x))
  ∃x (P(x) ∨ Q(x)) ≡ (∃x P(x)) ∨ (∃x Q(x))

  ⚠️ But NOT:
  ∀x (P(x) ∨ Q(x)) ≢ (∀x P(x)) ∨ (∀x Q(x))
  ∃x (P(x) ∧ Q(x)) ≢ (∃x P(x)) ∧ (∃x Q(x))`,
  },
  {
    id: 'fol-kinship',
    title: '10. FOL with Kinship',
    emoji: '👨‍👩‍👧‍👦',
    content: `Kinship (family relationships) is a classic FOL domain.

Constants: Alice, Bob, Charlie, Diana
Predicates:
  Parent(x, y) = "x is a parent of y"
  Male(x), Female(x)
  Sibling(x, y) = "x and y are siblings"

We can DEFINE new relations:
  Mother(x, y) ≡ Female(x) ∧ Parent(x, y)
  Father(x, y) ≡ Male(x) ∧ Parent(x, y)
  Grandparent(x, y) ≡ ∃z Parent(x, z) ∧ Parent(z, y)
  Sibling(x, y) ≡ x ≠ y ∧ ∃z Parent(z, x) ∧ Parent(z, y)
  Ancestor(x, y) ≡ Parent(x, y) ∨ ∃z Parent(x, z) ∧ Ancestor(z, y)

Example queries:
  ∀x ∀y Mother(x,y) → Loves(x,y)
  "Every mother loves her child"

  ∃x ∃y Sibling(x,y) ∧ ¬Likes(x,y)
  "Some siblings don't like each other"

This connects to AI: knowledge graphs, Wumpus World, and expert systems all use FOL!`,
  },
];

function LearnPanel() {
  const [activeLesson, setActiveLesson] = useState(0);

  return (
    <div className="learn-panel">
      <div className="learn-sidebar">
        <h3 className="learn-sidebar-title">📖 Lessons</h3>
        {LESSONS.map((lesson, i) => (
          <button
            key={lesson.id}
            className={`learn-nav-btn ${activeLesson === i ? 'active' : ''}`}
            onClick={() => setActiveLesson(i)}
          >
            <span className="learn-nav-emoji">{lesson.emoji}</span>
            <span className="learn-nav-text">{lesson.title}</span>
          </button>
        ))}
      </div>
      <div className="learn-content">
        <div className="learn-header">
          <span className="learn-emoji">{LESSONS[activeLesson].emoji}</span>
          <h2 className="learn-title">{LESSONS[activeLesson].title}</h2>
        </div>
        <pre className="learn-body">{LESSONS[activeLesson].content}</pre>
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

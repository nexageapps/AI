import React, { useState } from 'react';
import './TheoryPanel.css';

const SECTIONS = [
  {
    title: 'What is Propositional Logic?',
    content: `Propositional logic (also called sentential logic) is the branch of logic that studies ways of combining or altering statements or propositions to form more complex statements. A proposition is a declarative sentence that is either true or false, but not both.

Examples of propositions:
• "It is raining" — can be true or false
• "2 + 2 = 4" — always true (tautology)
• "The sky is green" — always false (contradiction)

Non-propositions:
• "What time is it?" — a question
• "Close the door" — a command
• "x + 1 = 5" — depends on x (predicate, not proposition)`,
  },
  {
    title: 'Logical Connectives',
    content: `Connectives combine propositions into compound statements:

¬ (NOT / Negation): Flips the truth value
  ¬T = F,  ¬F = T

∧ (AND / Conjunction): True only when BOTH are true
  T ∧ T = T,  all others = F

∨ (OR / Disjunction): True when AT LEAST ONE is true
  F ∨ F = F,  all others = T

→ (IMPLIES / Conditional): False ONLY when premise is true and conclusion is false
  T → F = F,  all others = T
  Key insight: "If it rains, I carry an umbrella" is only false when it rains and I don't carry one.

↔ (BICONDITIONAL / If and only if): True when both sides have the SAME truth value
  T ↔ T = T,  F ↔ F = T,  others = F`,
  },
  {
    title: 'Operator Precedence',
    content: `When evaluating complex expressions, operators follow this precedence (highest first):

1. ¬ (NOT) — highest precedence, evaluated first
2. ∧ (AND)
3. ∨ (OR)
4. → (IMPLIES)
5. ↔ (BICONDITIONAL) — lowest precedence

Example: ¬A ∧ B → C
Evaluated as: ((¬A) ∧ B) → C

Use parentheses to override precedence:
¬(A ∧ B) is different from (¬A) ∧ B`,
  },
  {
    title: 'Truth Tables',
    content: `A truth table lists all possible combinations of truth values for propositions and shows the result of the compound expression for each combination.

For n propositions, there are 2ⁿ rows:
• 1 proposition → 2 rows
• 2 propositions → 4 rows
• 3 propositions → 8 rows

Truth tables help us:
• Verify logical equivalences
• Identify tautologies (always true) and contradictions (always false)
• Check validity of arguments
• Understand the behavior of logical connectives`,
  },
  {
    title: 'Important Equivalences',
    content: `De Morgan's Laws:
  ¬(A ∧ B) ≡ (¬A ∨ ¬B)
  ¬(A ∨ B) ≡ (¬A ∧ ¬B)

Double Negation:
  ¬(¬A) ≡ A

Contrapositive:
  (A → B) ≡ (¬B → ¬A)

Material Implication:
  (A → B) ≡ (¬A ∨ B)

Distributive Laws:
  A ∧ (B ∨ C) ≡ (A ∧ B) ∨ (A ∧ C)
  A ∨ (B ∧ C) ≡ (A ∨ B) ∧ (A ∨ C)

Absorption:
  A ∧ (A ∨ B) ≡ A
  A ∨ (A ∧ B) ≡ A`,
  },
  {
    title: 'Inference Rules',
    content: `Modus Ponens:
  If P → Q and P, then Q.
  "If it rains, the ground is wet. It rains. Therefore, the ground is wet."

Modus Tollens:
  If P → Q and ¬Q, then ¬P.
  "If it rains, the ground is wet. The ground is not wet. Therefore, it is not raining."

Hypothetical Syllogism:
  If P → Q and Q → R, then P → R.

Disjunctive Syllogism:
  If P ∨ Q and ¬P, then Q.

Resolution:
  If (P ∨ Q) and (¬P ∨ R), then (Q ∨ R).
  This is the basis of automated theorem proving.`,
  },
  {
    title: 'Applications in AI',
    content: `Propositional logic is foundational to AI and computer science:

Knowledge Representation:
  AI agents use logical propositions to represent facts about the world.
  Example: In the Wumpus World game, "There is a breeze in cell (1,2)" is a proposition.

Automated Reasoning:
  SAT solvers determine if a propositional formula can be satisfied.
  Used in hardware verification, planning, and scheduling.

Expert Systems:
  Rule-based systems use IF-THEN rules (implications) to make decisions.

Neural Networks Connection:
  A single perceptron can compute AND, OR, and NOT.
  This connects symbolic logic to the neural network foundations you'll study next.`,
  },
];

function TheoryPanel() {
  const [expandedIdx, setExpandedIdx] = useState(0);

  return (
    <div className="theory-panel">
      <div className="theory-header">
        <h2>📖 Propositional Logic Theory</h2>
        <p>Foundations for COMPSCI 713 — Understanding symbolic reasoning</p>
      </div>
      <div className="theory-sections">
        {SECTIONS.map((section, i) => (
          <div key={i} className={`theory-section ${expandedIdx === i ? 'expanded' : ''}`}>
            <button
              className="section-header"
              onClick={() => setExpandedIdx(expandedIdx === i ? -1 : i)}
              aria-expanded={expandedIdx === i}
            >
              <span className="section-number">{i + 1}</span>
              <span className="section-title">{section.title}</span>
              <span className="section-toggle">{expandedIdx === i ? '−' : '+'}</span>
            </button>
            {expandedIdx === i && (
              <div className="section-content">
                <pre>{section.content}</pre>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TheoryPanel;

/**
 * Symbolic Logic Engine
 * Evaluates propositional logic expressions and generates truth tables.
 */

export const OPERATORS = {
  AND: { symbol: '∧', label: 'AND', emoji: '🤝', precedence: 3, fn: (a, b) => a && b,
    kidExplain: 'Both must be true (like needing BOTH a ticket AND popcorn to enjoy the movie)' },
  OR:  { symbol: '∨', label: 'OR', emoji: '✋', precedence: 2, fn: (a, b) => a || b,
    kidExplain: 'At least one must be true (like choosing pizza OR pasta for dinner)' },
  IMPLIES: { symbol: '→', label: 'IF...THEN', emoji: '➡️', precedence: 1, fn: (a, b) => !a || b,
    kidExplain: 'If the first thing is true, the second must be too (like "If it rains, I take an umbrella")' },
  BICONDITIONAL: { symbol: '↔', label: 'IF AND ONLY IF', emoji: '🔄', precedence: 0, fn: (a, b) => a === b,
    kidExplain: 'Both must be the same — both true or both false (like a light switch and the light)' },
  NOT: { symbol: '¬', label: 'NOT', emoji: '🚫', precedence: 4, fn: (a) => !a,
    kidExplain: 'Flips true to false and false to true (like opposite day!)' },
};

export function extractPropositions(expression) {
  const props = new Set();
  function walk(node) {
    if (!node) return;
    if (node.type === 'prop') props.add(node.name);
    if (node.left) walk(node.left);
    if (node.right) walk(node.right);
    if (node.operand) walk(node.operand);
  }
  walk(expression);
  return Array.from(props).sort();
}

export function evaluate(node, assignment) {
  if (!node) return false;
  if (node.type === 'prop') return assignment[node.name] || false;
  if (node.type === 'not') return !evaluate(node.operand, assignment);
  if (node.type === 'op') {
    const left = evaluate(node.left, assignment);
    const right = evaluate(node.right, assignment);
    return OPERATORS[node.op].fn(left, right);
  }
  return false;
}

export function generateTruthTable(expression) {
  const props = extractPropositions(expression);
  const rows = [];
  const n = props.length;
  const totalRows = Math.pow(2, n);
  for (let i = 0; i < totalRows; i++) {
    const assignment = {};
    props.forEach((p, idx) => {
      assignment[p] = Boolean((i >> (n - 1 - idx)) & 1);
    });
    const result = evaluate(expression, assignment);
    rows.push({ assignment, result });
  }
  return { props, rows };
}

export function expressionToString(node) {
  if (!node) return '';
  if (node.type === 'prop') return node.name;
  if (node.type === 'not') return `¬${expressionToString(node.operand)}`;
  if (node.type === 'op') {
    const left = expressionToString(node.left);
    const right = expressionToString(node.right);
    const sym = OPERATORS[node.op].symbol;
    return `(${left} ${sym} ${right})`;
  }
  return '';
}

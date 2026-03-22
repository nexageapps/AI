/**
 * Kid-friendly real-world scenarios for symbolic logic.
 * Each scenario has emojis, relatable stories, and visual props.
 */

const SCENARIOS = [
  {
    id: 'rainbow',
    name: '🌈 Rainbow Rule',
    category: 'nature',
    difficulty: 'beginner',
    story: "Have you ever seen a rainbow? Rainbows appear when two things happen at the same time — it's raining AND the sun is shining. Let's explore this with logic!",
    propositions: [
      { name: 'A', meaning: 'It is raining', emoji: '🌧️', trueText: 'Raining!', falseText: 'No rain' },
      { name: 'B', meaning: 'The sun is shining', emoji: '☀️', trueText: 'Sunny!', falseText: 'Cloudy' },
      { name: 'C', meaning: 'There is a rainbow', emoji: '🌈', trueText: 'Rainbow!', falseText: 'No rainbow' },
    ],
    expression: {
      type: 'op', op: 'IMPLIES',
      left: { type: 'op', op: 'AND', left: { type: 'prop', name: 'A' }, right: { type: 'prop', name: 'B' } },
      right: { type: 'prop', name: 'C' },
    },
    formula: '(A ∧ B) → C',
    funFact: 'A rainbow needs both rain AND sunshine at the same time. The sunlight bends through raindrops to create the colors!',
    challenge: 'Can you find the ONE combination where this rule is broken (FALSE)?',
    challengeAnswer: { A: true, B: true, C: false },
  },
  {
    id: 'pizza',
    name: '🍕 Pizza Party',
    category: 'food',
    difficulty: 'beginner',
    story: "It's Friday night! You can have pizza OR pasta for dinner. In logic, OR means at least one must be true — you could even have BOTH!",
    propositions: [
      { name: 'P', meaning: 'We order pizza', emoji: '🍕', trueText: 'Pizza!', falseText: 'No pizza' },
      { name: 'Q', meaning: 'We order pasta', emoji: '🍝', trueText: 'Pasta!', falseText: 'No pasta' },
    ],
    expression: {
      type: 'op', op: 'OR',
      left: { type: 'prop', name: 'P' },
      right: { type: 'prop', name: 'Q' },
    },
    formula: 'P ∨ Q',
    funFact: 'In everyday language, "or" usually means one or the other. But in logic, OR means one, the other, or BOTH! This is called "inclusive or."',
    challenge: 'When is "P OR Q" false? (Hint: it\'s a hungry night...)',
    challengeAnswer: { P: false, Q: false },
  },
  {
    id: 'pet',
    name: '🐕 Pet Day',
    category: 'animals',
    difficulty: 'beginner',
    story: "You want a pet! Your parents say you can have a dog AND a cat. The AND rule means you need BOTH to be true.",
    propositions: [
      { name: 'D', meaning: 'You get a dog', emoji: '🐕', trueText: 'Got a dog!', falseText: 'No dog' },
      { name: 'C', meaning: 'You get a cat', emoji: '🐈', trueText: 'Got a cat!', falseText: 'No cat' },
    ],
    expression: {
      type: 'op', op: 'AND',
      left: { type: 'prop', name: 'D' },
      right: { type: 'prop', name: 'C' },
    },
    formula: 'D ∧ C',
    funFact: 'AND is the strictest connective — ALL parts must be true. With 3 propositions, only 1 out of 8 combinations is true!',
    challenge: 'How many ways can "D AND C" be true?',
    challengeAnswer: { D: true, C: true },
  },
  {
    id: 'homework',
    name: '📚 Homework Deal',
    category: 'school',
    difficulty: 'intermediate',
    story: "Your teacher says: \"If you finish your homework, then you can play video games.\" This is an IF...THEN rule. But here's the tricky part — the rule is only broken if you DON'T do homework but still play games... wait, actually it's only broken if you DO the homework but CAN'T play!",
    propositions: [
      { name: 'H', meaning: 'You finish homework', emoji: '📚', trueText: 'Done!', falseText: 'Not done' },
      { name: 'G', meaning: 'You play video games', emoji: '🎮', trueText: 'Playing!', falseText: 'No games' },
    ],
    expression: {
      type: 'op', op: 'IMPLIES',
      left: { type: 'prop', name: 'H' },
      right: { type: 'prop', name: 'G' },
    },
    formula: 'H → G',
    funFact: 'The IMPLIES arrow (→) is the trickiest connective! "If homework, then games" is only FALSE when you DO the homework but DON\'T get to play. If you never did homework, the promise isn\'t broken!',
    challenge: 'When is the teacher\'s promise broken?',
    challengeAnswer: { H: true, G: false },
  },
  {
    id: 'lightswitch',
    name: '💡 Light Switch',
    category: 'home',
    difficulty: 'intermediate',
    story: "A light switch and a light bulb are connected: the switch is ON if and only if the light is ON. They always match! This is the BICONDITIONAL — both must be the same.",
    propositions: [
      { name: 'S', meaning: 'Switch is ON', emoji: '🔘', trueText: 'ON', falseText: 'OFF' },
      { name: 'L', meaning: 'Light is ON', emoji: '💡', trueText: 'Bright!', falseText: 'Dark' },
    ],
    expression: {
      type: 'op', op: 'BICONDITIONAL',
      left: { type: 'prop', name: 'S' },
      right: { type: 'prop', name: 'L' },
    },
    formula: 'S ↔ L',
    funFact: 'The biconditional (↔) means "if and only if" — both sides must agree. It\'s true when both are true OR both are false.',
    challenge: 'In how many cases does the switch match the light?',
    challengeAnswer: { S: true, L: true },
  },
  {
    id: 'opposite',
    name: '🙃 Opposite Day',
    category: 'fun',
    difficulty: 'beginner',
    story: "It's Opposite Day! Everything is flipped. If it's true that you're happy, NOT happy means you're sad. The NOT operator flips everything around!",
    propositions: [
      { name: 'H', meaning: 'You are happy', emoji: '😊', trueText: 'Happy!', falseText: 'Not happy' },
    ],
    expression: {
      type: 'not',
      operand: { type: 'prop', name: 'H' },
    },
    formula: '¬H',
    funFact: 'NOT is the simplest operator — it just flips the value. Double NOT (¬¬H) brings you back to the original! Try it: NOT(NOT(true)) = true.',
    challenge: 'If you\'re happy (H = True), what is ¬H?',
    challengeAnswer: { H: true },
  },
  {
    id: 'demorgan',
    name: '🧙 De Morgan\'s Magic',
    category: 'advanced',
    difficulty: 'advanced',
    story: "Augustus De Morgan discovered a magical rule: saying \"NOT (A AND B)\" is the same as saying \"(NOT A) OR (NOT B)\". It's like saying \"it's not true that I have BOTH a dog and a cat\" is the same as \"I don't have a dog OR I don't have a cat.\"",
    propositions: [
      { name: 'A', meaning: 'Statement A is true', emoji: '🅰️', trueText: 'True', falseText: 'False' },
      { name: 'B', meaning: 'Statement B is true', emoji: '🅱️', trueText: 'True', falseText: 'False' },
    ],
    expression: {
      type: 'not',
      operand: { type: 'op', op: 'AND', left: { type: 'prop', name: 'A' }, right: { type: 'prop', name: 'B' } },
    },
    formula: '¬(A ∧ B)',
    equivalent: {
      type: 'op', op: 'OR',
      left: { type: 'not', operand: { type: 'prop', name: 'A' } },
      right: { type: 'not', operand: { type: 'prop', name: 'B' } },
    },
    equivalentFormula: '(¬A ∨ ¬B)',
    funFact: 'De Morgan\'s Laws are used everywhere in computer science — from database queries to circuit design. Every programmer uses them!',
    challenge: 'Check every row: do both formulas always give the same answer?',
    challengeAnswer: { A: false, B: false },
  },
  {
    id: 'contrapositive',
    name: '🔄 The Flip Rule',
    category: 'advanced',
    difficulty: 'advanced',
    story: "Here's a mind-bender: \"If you study, you pass\" means the SAME thing as \"If you didn't pass, you didn't study.\" This is called the contrapositive — flip and negate both sides!",
    propositions: [
      { name: 'S', meaning: 'Student studies', emoji: '📖', trueText: 'Studying', falseText: 'Not studying' },
      { name: 'P', meaning: 'Student passes', emoji: '✅', trueText: 'Passed!', falseText: 'Failed' },
    ],
    expression: {
      type: 'op', op: 'IMPLIES',
      left: { type: 'prop', name: 'S' },
      right: { type: 'prop', name: 'P' },
    },
    formula: 'S → P',
    equivalent: {
      type: 'op', op: 'IMPLIES',
      left: { type: 'not', operand: { type: 'prop', name: 'P' } },
      right: { type: 'not', operand: { type: 'prop', name: 'S' } },
    },
    equivalentFormula: '¬P → ¬S',
    funFact: 'The contrapositive is always logically equivalent to the original. But the CONVERSE (P → S, "if you pass, you studied") is NOT the same — you might have gotten lucky!',
    challenge: 'Verify: do "S → P" and "¬P → ¬S" always match?',
    challengeAnswer: { S: true, P: false },
  },
];

export default SCENARIOS;

export const QUIZ_QUESTIONS = [
  {
    id: 1,
    difficulty: 'beginner',
    question: 'If A is TRUE and B is TRUE, what is A ∧ B (A AND B)?',
    emoji: '🤔',
    options: [
      { text: 'TRUE ✅', correct: true },
      { text: 'FALSE ❌', correct: false },
    ],
    explanation: 'AND needs BOTH to be true. Since A and B are both true, A ∧ B is TRUE!',
  },
  {
    id: 2,
    difficulty: 'beginner',
    question: 'If A is TRUE and B is FALSE, what is A ∨ B (A OR B)?',
    emoji: '🧐',
    options: [
      { text: 'TRUE ✅', correct: true },
      { text: 'FALSE ❌', correct: false },
    ],
    explanation: 'OR needs at least ONE to be true. A is true, so A ∨ B is TRUE!',
  },
  {
    id: 3,
    difficulty: 'beginner',
    question: 'What is ¬TRUE (NOT TRUE)?',
    emoji: '🙃',
    options: [
      { text: 'TRUE', correct: false },
      { text: 'FALSE', correct: true },
    ],
    explanation: 'NOT flips the value. NOT TRUE = FALSE. It\'s like Opposite Day!',
  },
  {
    id: 4,
    difficulty: 'intermediate',
    question: 'If A is TRUE and B is FALSE, what is A → B (A IMPLIES B)?',
    emoji: '🤨',
    options: [
      { text: 'TRUE', correct: false },
      { text: 'FALSE', correct: true },
    ],
    explanation: 'IMPLIES is only FALSE when the first part is TRUE but the second is FALSE. That\'s exactly this case!',
  },
  {
    id: 5,
    difficulty: 'intermediate',
    question: 'If A is FALSE, what is A → B regardless of B?',
    emoji: '💭',
    options: [
      { text: 'Always TRUE', correct: true },
      { text: 'Always FALSE', correct: false },
      { text: 'Depends on B', correct: false },
    ],
    explanation: 'When the premise (A) is false, the implication is always true! A false promise can\'t be broken.',
  },
  {
    id: 6,
    difficulty: 'advanced',
    question: 'Which is equivalent to ¬(A ∨ B)?',
    emoji: '🧙',
    options: [
      { text: '¬A ∨ ¬B', correct: false },
      { text: '¬A ∧ ¬B', correct: true },
      { text: 'A ∧ B', correct: false },
    ],
    explanation: 'De Morgan\'s Law: ¬(A ∨ B) = ¬A ∧ ¬B. When you negate an OR, it becomes AND, and each part gets negated too!',
  },
  {
    id: 7,
    difficulty: 'advanced',
    question: 'What is the contrapositive of "If it rains, the ground is wet" (R → W)?',
    emoji: '🔄',
    options: [
      { text: 'If the ground is wet, it rained (W → R)', correct: false },
      { text: 'If the ground is NOT wet, it did NOT rain (¬W → ¬R)', correct: true },
      { text: 'If it doesn\'t rain, the ground is dry (¬R → ¬W)', correct: false },
    ],
    explanation: 'The contrapositive flips AND negates: R → W becomes ¬W → ¬R. It\'s always equivalent to the original!',
  },
];

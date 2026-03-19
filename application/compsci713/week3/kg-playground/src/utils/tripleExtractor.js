/**
 * tripleExtractor.js  —  Rule-based RDF triple extraction
 *
 * Design philosophy:
 *   Real-world paragraphs like the UoA description contain facts expressed in
 *   many different grammatical forms — not just "X verb Y" but also:
 *     - parenthetical aliases:  "University of Auckland (UoA)"
 *     - participial phrases:    "Known as Waipapa Taumata Rau"
 *     - prepositional phrases:  "located primarily in Auckland"
 *     - numeric facts:          "around 45,000 students"
 *     - ranking facts:          "#65 in QS World University Rankings"
 *     - founding facts:         "founded in 1883"
 *
 *   Strategy:
 *   1. Pre-process: strip parenthetical aliases, extract them as triples.
 *   2. Split into sentences, then into clauses on "and / , / ; / which / that".
 *   3. For each clause try a priority-ordered list of patterns.
 *   4. Carry the last known subject forward into subject-less clauses.
 *   5. Normalise multi-word entities to CamelCase ("New Zealand" → "NewZealand").
 */

// ── Pattern table ─────────────────────────────────────────────────────────
// Ordered from most-specific to least-specific.
// Each entry: { re, predicate, subjectGroup, objectGroup }
// subjectGroup / objectGroup default to 1 / 2.
const PATTERNS = [
  // "founded in 1883" / "established in 1883"
  { re: /^(.+?)\s+(?:was\s+)?(?:founded|established)\s+in\s+(\d{4})\b/i,  predicate: 'founded_in'    },
  // "born in Germany"
  { re: /^(.+?)\s+(?:was\s+)?born\s+in\s+(.+)$/i,                         predicate: 'born_in'       },
  // "located in Auckland" / "located primarily in Auckland"
  { re: /^(.+?)\s+(?:is\s+|are\s+)?located\s+(?:\w+\s+)?in\s+(.+)$/i,    predicate: 'located_in'    },
  // "known as Waipapa Taumata Rau"
  { re: /^(.+?)\s+(?:is\s+)?known\s+as\s+(.+)$/i,                         predicate: 'known_as'      },
  // "ranked #N in X" / "ranks #N in X"
  { re: /^(.+?)\s+(?:is\s+)?ranked?\s+(?:#\d+\s+)?in\s+(.+)$/i,           predicate: 'ranked_in'     },
  // "leads in X" / "leads nationally in X"
  { re: /^(.+?)\s+leads?\s+(?:\w+\s+)?in\s+(.+)$/i,                       predicate: 'leads_in'      },
  // "part of New Zealand"
  { re: /^(.+?)\s+(?:is\s+|are\s+)?(?:a\s+)?part\s+of\s+(.+)$/i,         predicate: 'part_of'       },
  // "works in / at / for X"
  { re: /^(.+?)\s+(?:works?|worked)\s+(?:in|at|for)\s+(.+)$/i,            predicate: 'works_in'      },
  // "studies X"
  { re: /^(.+?)\s+(?:studies|studied)\s+(.+)$/i,                           predicate: 'studies'       },
  // "invented / created / developed X"
  { re: /^(.+?)\s+(?:invented|created|developed)\s+(.+)$/i,                predicate: 'invented'      },
  // "lives in X"
  { re: /^(.+?)\s+(?:lives?|lived)\s+in\s+(.+)$/i,                        predicate: 'lives_in'      },
  // "teaches X"
  { re: /^(.+?)\s+(?:teaches?|taught)\s+(.+)$/i,                           predicate: 'teaches'       },
  // "capital of X"
  { re: /^(.+?)\s+(?:is\s+)?(?:the\s+)?capital\s+of\s+(.+)$/i,            predicate: 'capital_of'    },
  // "belongs to X"
  { re: /^(.+?)\s+belongs?\s+to\s+(.+)$/i,                                 predicate: 'belongs_to'    },
  // "has N students / campuses / etc."
  { re: /^(.+?)\s+(?:has|have|had)\s+(.+)$/i,                              predicate: 'has'           },
  // "received / won / got X"  — covers "received Nobel Prize for theory of relativity"
  { re: /^(.+?)\s+(?:won|received|got|receive)\s+(.+?)(?:\s+for\s+.+)?$/i,  predicate: 'received'      },
  // "received X for Y" — also extract the reason as a separate triple
  { re: /^(.+?)\s+(?:won|received|got|receive)\s+(.+?)\s+for\s+(.+)$/i,     predicate: 'received_for', objectGroup: 3, subjectFromPred: true },
  // "is a/an X"  — least specific, must come last
  { re: /^(.+?)\s+(?:is\s+|are\s+)(?:a|an)\s+(.+)$/i,                     predicate: 'is_a'          },
];

// ── Main entry point ──────────────────────────────────────────────────────

export function extractTriples(text) {
  const triples = [];
  const seen    = new Set();

  // Step 1: extract parenthetical aliases  "University of Auckland (UoA)"
  extractAliases(text, triples, seen);

  // Step 2: sentence split
  const sentences = text
    .split(/(?<=[.!?])\s+|(?<=---+)\s*/)
    .map(s => s.trim())
    .filter(Boolean);

  for (const sentence of sentences) {
    extractFromSentence(sentence, triples, seen);
  }

  return triples;
}

// ── Alias extraction ──────────────────────────────────────────────────────
// "University of Auckland (UoA)" → (UniversityOfAuckland, also_known_as, UoA)
function extractAliases(text, triples, seen) {
  const re = /([A-Z][^()]{2,40})\s*\(([A-Z][A-Za-z0-9]{1,10})\)/g;
  let m;
  while ((m = re.exec(text)) !== null) {
    const subject = normalise(m[1].trim());
    const alias   = m[2].trim();
    if (!subject || !alias || isStopWord(subject)) continue;
    addTriple(triples, seen, subject, 'also_known_as', alias);
  }
}

// ── Sentence-level extraction ─────────────────────────────────────────────
function extractFromSentence(sentence, triples, seen) {
  // Remove parenthetical content to avoid confusing the patterns
  const clean = sentence.replace(/\([^)]*\)/g, ' ').replace(/\s{2,}/g, ' ').trim();

  // Split into clauses
  const clauses = clean.split(/\s*,\s*|\s+and\s+|\s+but\s+|\s*;\s*|\s+which\s+|\s+that\s+/i);

  let lastSubject = null;

  for (let clause of clauses) {
    clause = clause.trim();
    if (clause.length < 4) continue;

    const result = tryPatterns(clause);

    if (result) {
      lastSubject = result.subject;
      addTriple(triples, seen, result.subject, result.predicate, result.object);
    } else if (lastSubject) {
      // Subject-less clause — prepend last known subject and retry
      const augmented = `${lastSubject} ${clause}`;
      const r2 = tryPatterns(augmented);
      if (r2) {
        addTriple(triples, seen, r2.subject, r2.predicate, r2.object);
      }
    }
  }
}

// ── Pattern matching ──────────────────────────────────────────────────────
function tryPatterns(clause) {
  for (const { re, predicate, objectGroup } of PATTERNS) {
    const m = clause.match(re);
    if (!m) continue;

    let subjectRaw = m[1].trim();
    // objectGroup=3 means "received X for Y" — object is group 2, reason is group 3
    let objectRaw  = (objectGroup === 3 && m[3]) ? m[3].trim() : m[2].trim();

    // Strip leading articles from subject
    subjectRaw = subjectRaw
      .replace(/^(the|a|an)\s+/i, '')
      .replace(/\s+(is|are|was|were|has|have|had)\s*$/i, '')
      .trim();

    // Trim object at noise boundaries
    objectRaw = objectRaw
      .replace(/\s+(and|but|or|which|who|that|where|when|such as|including|with|across).*$/i, '')
      .replace(/[.,;:!?]+$/, '')
      .replace(/^(the|a|an)\s+/i, '')
      .trim();

    const subject = normalise(subjectRaw);
    const object  = normalise(objectRaw);

    if (!subject || !object) continue;
    if (isStopWord(subject) || isStopWord(object)) continue;
    if (subject.toLowerCase() === object.toLowerCase()) continue;
    if (subject.length < 2 || object.length < 2) continue;

    return { subject, predicate, object };
  }
  return null;
}

// ── Helpers ───────────────────────────────────────────────────────────────

function addTriple(triples, seen, subject, predicate, object) {
  const key = `${subject}|${predicate}|${object}`;
  if (!seen.has(key)) {
    seen.add(key);
    triples.push({ subject, predicate, object });
  }
}

/**
 * Normalise a raw phrase to a clean entity label.
 *   "New Zealand"              → "NewZealand"
 *   "university of auckland"   → "UniversityOfAuckland"
 *   "QS World University Rankings 2026" → "QSWorldUniversityRankings2026"
 *   "45,000 students"          → "45000Students"
 *   "#65"                      → "Rank65"
 */
function normalise(phrase) {
  if (!phrase) return '';
  let p = phrase.trim();
  // Handle rank notation
  p = p.replace(/^#(\d+)/, 'Rank$1');
  // Remove commas in numbers
  p = p.replace(/(\d),(\d)/g, '$1$2');
  // Title-case each word and join
  const words = p.split(/\s+/).filter(w => w.length > 0);
  if (words.length === 1) return capWord(words[0]);
  return words.map(capWord).join('');
}

function capWord(w) {
  if (!w) return '';
  // Preserve all-caps abbreviations (UoA, QS, NZ)
  if (/^[A-Z]{2,}$/.test(w)) return w;
  // Preserve already-CamelCase words (e.g. "MarieCurie" passed back as lastSubject)
  if (/[A-Z].*[A-Z]/.test(w)) return w;
  return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
}

// ── Conflict detection ────────────────────────────────────────────────────

export function detectConflicts(triples) {
  const map = {};
  const conflicts = [];

  for (const t of triples) {
    const key = `${t.subject}|${t.predicate}`;
    if (!map[key]) map[key] = [];
    if (!map[key].includes(t.object)) map[key].push(t.object);
  }

  for (const [key, objects] of Object.entries(map)) {
    if (objects.length > 1) {
      const [subject, predicate] = key.split('|');
      conflicts.push(
        `Conflict: "${subject}" has multiple values for "${predicate}": ${objects.join(', ')}`
      );
    }
  }

  return conflicts;
}

// ── Missing link suggestions ──────────────────────────────────────────────

export function suggestMissingLinks(text, existingTriples) {
  const entities = [...new Set(existingTriples.flatMap(t => [t.subject, t.object]))];

  const existingKeys = new Set(
    existingTriples.flatMap(t => [
      `${t.subject}|${t.object}`,
      `${t.object}|${t.subject}`,
    ])
  );

  const suggestions = [];
  for (let i = 0; i < entities.length; i++) {
    for (let j = i + 1; j < entities.length; j++) {
      const a = entities[i], b = entities[j];
      if (!existingKeys.has(`${a}|${b}`)) {
        suggestions.push({ subject: a, predicate: 'related_to', object: b, confidence: 0.8 });
      }
    }
  }

  return suggestions.slice(0, 4);
}

// ── Stop words ────────────────────────────────────────────────────────────

const STOP_WORDS = new Set([
  'a','an','the','is','are','was','were','be','been','being',
  'have','has','had','do','does','did','will','would','could',
  'should','may','might','shall','can','need','dare','ought',
  'and','or','but','in','on','at','to','for','of','with',
  'by','from','up','about','into','through','during','before',
  'after','above','below','between','out','off','over','under',
  'again','further','then','once','here','there','when','where',
  'why','how','all','both','each','few','more','most','other',
  'some','such','no','nor','not','only','own','same','so','than',
  'too','very','just','because','as','until','while','although',
  'though','since','unless','however','therefore','moreover',
  'it','he','she','they','we','i','you','him','her','them','us','me',
  'its','their','our','your','his','her','my',
  'also','known','primarily','around','across','nationally','globally',
  'such','including','multiple','top','public','global',
]);

function isStopWord(word) {
  return STOP_WORDS.has(word.toLowerCase());
}

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
  // "founded in 1883" / "established in 1883" / "created in 2020"
  { re: /^(.+?)\s+(?:was\s+)?(?:founded|established|created|formed|built)\s+(?:in\s+)?(\d{4})\b/i,  predicate: 'founded_in'    },
  
  // "born in Germany" / "born on March 14, 1879"
  { re: /^(.+?)\s+(?:was\s+)?born\s+(?:in|on)\s+(.+)$/i,                  predicate: 'born_in'       },
  
  // "died in 1955" / "died on April 18, 1955"
  { re: /^(.+?)\s+(?:died|passed\s+away)\s+(?:in|on)\s+(.+)$/i,           predicate: 'died_in'       },
  
  // "located in Auckland" / "located primarily in Auckland" / "based in New York"
  { re: /^(.+?)\s+(?:is\s+|are\s+)?(?:located|based|situated)\s+(?:\w+\s+)?in\s+(.+)$/i, predicate: 'located_in' },
  
  // "known as Waipapa Taumata Rau" / "called Einstein"
  { re: /^(.+?)\s+(?:is\s+)?(?:known|called|referred\s+to)\s+as\s+(.+)$/i, predicate: 'known_as'      },
  
  // "ranked #N in X" / "ranks #N in X" / "ranked 65th in QS"
  { re: /^(.+?)\s+(?:is\s+)?ranked?\s+(?:#?\d+(?:st|nd|rd|th)?\s+)?in\s+(.+)$/i, predicate: 'ranked_in' },
  
  // "leads in X" / "leads nationally in X"
  { re: /^(.+?)\s+leads?\s+(?:\w+\s+)?in\s+(.+)$/i,                       predicate: 'leads_in'      },
  
  // "part of New Zealand" / "member of United Nations"
  { re: /^(.+?)\s+(?:is\s+|are\s+)?(?:a\s+)?(?:part|member)\s+of\s+(.+)$/i, predicate: 'part_of'    },
  
  // "works in / at / for X" / "employed by X"
  { re: /^(.+?)\s+(?:works?|worked|employed)\s+(?:in|at|for|by)\s+(.+)$/i, predicate: 'works_at'   },
  
  // "studies X" / "studied physics"
  { re: /^(.+?)\s+(?:studies|studied|researches|researched)\s+(.+)$/i,     predicate: 'studies'       },
  
  // "invented / created / developed / discovered X"
  { re: /^(.+?)\s+(?:invented|created|developed|discovered|pioneered)\s+(.+)$/i, predicate: 'invented' },
  
  // "lives in X" / "resides in X"
  { re: /^(.+?)\s+(?:lives?|lived|resides?|resided)\s+in\s+(.+)$/i,       predicate: 'lives_in'      },
  
  // "teaches X" / "taught physics"
  { re: /^(.+?)\s+(?:teaches?|taught|instructs?|instructed)\s+(.+)$/i,     predicate: 'teaches'       },
  
  // "graduated from X" / "attended X"
  { re: /^(.+?)\s+(?:graduated|attended)\s+(?:from\s+)?(.+)$/i,            predicate: 'attended'      },
  
  // "wrote X" / "authored X" / "published X"
  { re: /^(.+?)\s+(?:wrote|authored|published|composed)\s+(.+)$/i,         predicate: 'wrote'         },
  
  // "capital of X"
  { re: /^(.+?)\s+(?:is\s+)?(?:the\s+)?capital\s+of\s+(.+)$/i,            predicate: 'capital_of'    },
  
  // "belongs to X" / "owned by X"
  { re: /^(.+?)\s+(?:belongs?|owned)\s+(?:to|by)\s+(.+)$/i,                predicate: 'belongs_to'    },
  
  // "married to X" / "spouse is X"
  { re: /^(.+?)\s+(?:is\s+)?(?:married|wed)\s+to\s+(.+)$/i,                predicate: 'married_to'    },
  
  // "parent of X" / "child of X"
  { re: /^(.+?)\s+(?:is\s+)?(?:the\s+)?(?:parent|father|mother)\s+of\s+(.+)$/i, predicate: 'parent_of' },
  { re: /^(.+?)\s+(?:is\s+)?(?:the\s+)?(?:child|son|daughter)\s+of\s+(.+)$/i,   predicate: 'child_of'  },
  
  // "has N students / campuses / etc." / "contains X"
  { re: /^(.+?)\s+(?:has|have|had|contains?|contained)\s+(.+)$/i,          predicate: 'has'           },
  
  // "received / won / got X" — covers "received Nobel Prize for theory of relativity"
  { re: /^(.+?)\s+(?:won|received|got|receive|awarded)\s+(.+?)(?:\s+for\s+.+)?$/i, predicate: 'received' },
  
  // "received X for Y" — extract both the award and reason
  { re: /^(.+?)\s+(?:won|received|got|receive|awarded)\s+(.+?)\s+for\s+(.+)$/i, predicate: 'received_for', objectGroup: 3 },
  
  // "specializes in X" / "focuses on X"
  { re: /^(.+?)\s+(?:specializes?|specialized|focuses?|focused)\s+(?:in|on)\s+(.+)$/i, predicate: 'specializes_in' },
  
  // "contributes to X" / "contributed to X"
  { re: /^(.+?)\s+(?:contributes?|contributed)\s+to\s+(.+)$/i,             predicate: 'contributes_to' },
  
  // "collaborates with X" / "collaborated with X"
  { re: /^(.+?)\s+(?:collaborates?|collaborated)\s+with\s+(.+)$/i,         predicate: 'collaborates_with' },
  
  // "is a/an X" — least specific, must come last
  { re: /^(.+?)\s+(?:is\s+|are\s+|was\s+|were\s+)(?:a|an|the)\s+(.+)$/i,  predicate: 'is_a'          },
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

  // Step 3: Track last mentioned person/entity for pronoun resolution
  let lastSubject = null;

  for (const sentence of sentences) {
    const result = extractFromSentence(sentence, triples, seen, lastSubject);
    // Update lastSubject if we found a new subject in this sentence
    if (result) {
      lastSubject = result;
    }
  }

  return triples;
}

// ── Alias extraction ──────────────────────────────────────────────────────
// "University of Auckland (UoA)" → (UniversityOfAuckland, also_known_as, UoA)
// "Albert Einstein (1879-1955)" → (AlbertEinstein, lived_during, 1879-1955)
function extractAliases(text, triples, seen) {
  // Pattern 1: Name (Acronym) - e.g., "University of Auckland (UoA)"
  const acronymRe = /([A-Z][^()]{2,40})\s*\(([A-Z][A-Za-z0-9]{1,10})\)/g;
  let m;
  while ((m = acronymRe.exec(text)) !== null) {
    const subject = normalise(m[1].trim());
    const alias   = m[2].trim();
    if (!subject || !alias || isStopWord(subject)) continue;
    addTriple(triples, seen, subject, 'also_known_as', alias);
  }
  
  // Pattern 2: Name (Year-Year) - e.g., "Albert Einstein (1879-1955)"
  const yearRangeRe = /([A-Z][A-Za-z\s]{2,40})\s*\((\d{4})\s*[-–]\s*(\d{4})\)/g;
  while ((m = yearRangeRe.exec(text)) !== null) {
    const subject = normalise(m[1].trim());
    const birthYear = m[2];
    const deathYear = m[3];
    if (!subject || isStopWord(subject)) continue;
    addTriple(triples, seen, subject, 'born_in', birthYear);
    addTriple(triples, seen, subject, 'died_in', deathYear);
  }
  
  // Pattern 3: Name (born Year) - e.g., "Marie Curie (born 1867)"
  const bornYearRe = /([A-Z][A-Za-z\s]{2,40})\s*\(born\s+(\d{4})\)/gi;
  while ((m = bornYearRe.exec(text)) !== null) {
    const subject = normalise(m[1].trim());
    const year = m[2];
    if (!subject || isStopWord(subject)) continue;
    addTriple(triples, seen, subject, 'born_in', year);
  }
}

// ── Sentence-level extraction ─────────────────────────────────────────────
function extractFromSentence(sentence, triples, seen, lastSubject) {
  // Remove parenthetical content to avoid confusing the patterns
  let clean = sentence.replace(/\([^)]*\)/g, ' ').replace(/\s{2,}/g, ' ').trim();
  
  // Pronoun resolution: replace pronouns with last known subject
  if (lastSubject) {
    // Replace pronouns at the start of the sentence
    clean = clean.replace(/^(he|she|it|they)\s+/i, `${lastSubject} `);
    // Replace pronouns after "and"
    clean = clean.replace(/\s+and\s+(he|she|it|they)\s+/gi, ` and ${lastSubject} `);
  }

  // Split into clauses - improved splitting with more delimiters
  const clauses = clean.split(/\s*[,;]\s*|\s+(?:and|but|while|whereas|although|though)\s+|\s+(?:which|that|who|whom|whose)\s+/i);

  let currentSubject = lastSubject;

  for (let clause of clauses) {
    clause = clause.trim();
    if (clause.length < 4) continue;

    const result = tryPatterns(clause);

    if (result) {
      currentSubject = result.subject;
      addTriple(triples, seen, result.subject, result.predicate, result.object);
      
      // If the pattern extracted a "received_for", also add the base "received" triple
      if (result.predicate === 'received_for' && result.award) {
        addTriple(triples, seen, result.subject, 'received', result.award);
      }
    } else if (currentSubject) {
      // Subject-less clause — prepend last known subject and retry
      const augmented = `${currentSubject} ${clause}`;
      const r2 = tryPatterns(augmented);
      if (r2) {
        addTriple(triples, seen, r2.subject, r2.predicate, r2.object);
        if (r2.predicate === 'received_for' && r2.award) {
          addTriple(triples, seen, r2.subject, 'received', r2.award);
        }
      }
    }
  }
  
  // Return the last subject found in this sentence for pronoun resolution
  return currentSubject;
}

// ── Pattern matching ──────────────────────────────────────────────────────
function tryPatterns(clause) {
  for (const { re, predicate, objectGroup } of PATTERNS) {
    const m = clause.match(re);
    if (!m) continue;

    let subjectRaw = m[1].trim();
    // objectGroup=3 means "received X for Y" — object is group 3 (reason), award is group 2
    let objectRaw  = (objectGroup === 3 && m[3]) ? m[3].trim() : m[2].trim();
    let awardRaw   = (objectGroup === 3 && m[2]) ? m[2].trim() : null;

    // Strip leading articles and trailing verbs from subject
    subjectRaw = subjectRaw
      .replace(/^(the|a|an)\s+/i, '')
      .replace(/\s+(is|are|was|were|has|have|had|being|been)\s*$/i, '')
      .trim();

    // Trim object at noise boundaries - improved cleaning
    objectRaw = objectRaw
      .replace(/\s+(and|but|or|which|who|that|where|when|such as|including|with|across|from|to|by|in|on|at).*$/i, '')
      .replace(/[.,;:!?]+$/, '')
      .replace(/^(the|a|an)\s+/i, '')
      .replace(/\s+(in|on|at|from|to|by|with)\s+\d{4}$/i, '') // Remove trailing "in 2020" etc
      .trim();

    const subject = normalise(subjectRaw);
    const object  = normalise(objectRaw);
    const award   = awardRaw ? normalise(awardRaw) : null;

    // Validation checks
    if (!subject || !object) continue;
    if (isStopWord(subject) || isStopWord(object)) continue;
    if (subject.toLowerCase() === object.toLowerCase()) continue;
    if (subject.length < 2 || object.length < 2) continue;
    
    // Additional quality checks
    if (subject.length > 100 || object.length > 100) continue; // Avoid overly long entities
    if (/^\d+$/.test(subject) && subject.length < 4) continue; // Skip bare numbers as subjects (except years)

    return { subject, predicate, object, award };
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
 *   "New Zealand"              → "New Zealand"
 *   "university of auckland"   → "University Of Auckland"
 *   "QS World University Rankings 2026" → "QS World University Rankings 2026"
 *   "45,000 students"          → "45000 Students"
 *   "#65"                      → "Rank 65"
 *   "March 14, 1879"           → "March 14 1879"
 */
function normalise(phrase) {
  if (!phrase) return '';
  let p = phrase.trim();
  
  // Handle rank notation (#65 → Rank 65)
  p = p.replace(/^#(\d+)/, 'Rank $1');
  
  // Handle ordinal numbers (65th → 65th, 1st → 1st)
  p = p.replace(/(\d+)(st|nd|rd|th)\b/g, '$1$2');
  
  // Remove commas in numbers (45,000 → 45000)
  p = p.replace(/(\d),(\d)/g, '$1$2');
  
  // Handle dates with commas (March 14, 1879 → March 14 1879)
  p = p.replace(/,\s+/g, ' ');
  
  // Handle special characters in entity names
  p = p.replace(/[&]/g, 'And');
  p = p.replace(/[+]/g, 'Plus');
  p = p.replace(/[@]/g, 'At');
  
  // Remove other special characters except spaces, hyphens, and underscores
  p = p.replace(/[^\w\s-]/g, '');
  
  // Title-case each word but keep spaces for readability
  const words = p.split(/[\s-]+/).filter(w => w.length > 0);
  if (words.length === 0) return '';
  
  // Join with spaces for better readability
  return words.map(capWord).join(' ');
}

function capWord(w) {
  if (!w) return '';
  // Preserve all-caps abbreviations (UoA, QS, NZ, USA, UK, etc.)
  if (/^[A-Z]{2,}$/.test(w)) return w;
  // Preserve already-CamelCase words (e.g. "MarieCurie" passed back as lastSubject)
  if (/[A-Z].*[A-Z]/.test(w)) return w;
  // Preserve numbers with ordinals (1st, 2nd, 65th)
  if (/^\d+(st|nd|rd|th)$/i.test(w)) return w.toLowerCase();
  // Preserve pure numbers
  if (/^\d+$/.test(w)) return w;
  // Standard title case
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

export function suggestMissingLinks(existingTriples) {
  const entities = [...new Set(existingTriples.flatMap(t => [t.subject, t.object]))];

  const existingKeys = new Set(
    existingTriples.flatMap(t => [
      `${t.subject}|${t.object}`,
      `${t.object}|${t.subject}`,
    ])
  );

  const suggestions = [];
  
  // Build entity co-occurrence map for better suggestions
  const coOccurrence = new Map();
  for (const triple of existingTriples) {
    const key = `${triple.subject}|${triple.object}`;
    coOccurrence.set(key, (coOccurrence.get(key) || 0) + 1);
  }
  
  for (let i = 0; i < entities.length; i++) {
    for (let j = i + 1; j < entities.length; j++) {
      const a = entities[i], b = entities[j];
      if (!existingKeys.has(`${a}|${b}`)) {
        // Calculate confidence based on shared connections
        let sharedConnections = 0;
        for (const triple of existingTriples) {
          if ((triple.subject === a || triple.object === a) && 
              (triple.subject === b || triple.object === b)) {
            sharedConnections++;
          }
        }
        const confidence = Math.min(0.9, 0.5 + (sharedConnections * 0.1));
        suggestions.push({ subject: a, predicate: 'related_to', object: b, confidence });
      }
    }
  }

  // Sort by confidence and return top suggestions
  return suggestions.sort((a, b) => b.confidence - a.confidence).slice(0, 5);
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

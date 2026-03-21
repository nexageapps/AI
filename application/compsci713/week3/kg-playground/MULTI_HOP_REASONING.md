# Multi-Hop Reasoning in KG Playground

## What is Multi-Hop Reasoning?

Multi-hop reasoning is the ability to answer questions that require connecting multiple triples (relationships) in the knowledge graph. Instead of finding a single triple that answers the question, the system traverses the graph to combine information from multiple connected triples.

---

## The Problem

### Example Question:
**"Who worked in Physics AND was born in Europe?"**

### Knowledge Graph:
```
Einstein → born_in → Germany
Germany → part_of → Europe
Einstein → works_at → Physics
```

### Challenge:
- No single triple contains both "Physics" and "Europe"
- Need to traverse: Einstein → Germany → Europe (2 hops)
- Must combine conditions: works_at=Physics AND born_in→part_of=Europe

### Without Multi-Hop:
- Simple keyword search finds: (Einstein, born_in, Germany)
- Confidence: 35% (low because "Europe" not directly mentioned)
- Answer: Incomplete or incorrect

### With Multi-Hop:
- Finds: Einstein satisfies BOTH conditions
- Traverses: Einstein → Germany → Europe
- Confidence: 85% (high because both conditions met)
- Answer: Einstein ✓

---

## How It Works

### Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    MULTI-HOP QUERY                           │
│     "Who worked in Physics AND was born in Europe?"          │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│              STEP 1: DETECT OPERATOR                         │
├─────────────────────────────────────────────────────────────┤
│  Scan for: "AND" or "OR" keywords                            │
│  Result: AND operator detected                               │
│  Action: Split into conditions                               │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│              STEP 2: EXTRACT CONDITIONS                      │
├─────────────────────────────────────────────────────────────┤
│  Part 1: "worked in Physics"                                 │
│    → Condition: { predicate: 'works_at', value: 'Physics' }  │
│                                                              │
│  Part 2: "was born in Europe"                                │
│    → Condition: { predicate: 'born_in', value: 'Europe' }    │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│              STEP 3: BUILD ENTITY GRAPH                      │
├─────────────────────────────────────────────────────────────┤
│  Create adjacency list:                                      │
│                                                              │
│  Einstein:                                                   │
│    outgoing: [                                               │
│      { predicate: 'born_in', target: 'Germany' },           │
│      { predicate: 'works_at', target: 'Physics' }           │
│    ]                                                         │
│                                                              │
│  Germany:                                                    │
│    outgoing: [                                               │
│      { predicate: 'part_of', target: 'Europe' }             │
│    ]                                                         │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│              STEP 4: CHECK CONDITIONS                        │
├─────────────────────────────────────────────────────────────┤
│  For entity: Einstein                                        │
│                                                              │
│  Condition 1: works_at = Physics                             │
│    Direct match: Einstein → works_at → Physics ✓             │
│    Confidence: 1.0                                           │
│                                                              │
│  Condition 2: born_in = Europe                               │
│    Direct match: Einstein → born_in → Europe ✗               │
│    1-hop match: Einstein → born_in → Germany                 │
│                          Germany → part_of → Europe ✓        │
│    Confidence: 0.8 (reduced for 1-hop)                      │
│                                                              │
│  AND operator: Both conditions satisfied ✓                   │
│  Average confidence: (1.0 + 0.8) / 2 = 0.9                  │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│              STEP 5: RETURN ANSWER                           │
├─────────────────────────────────────────────────────────────┤
│  Answer: Einstein                                            │
│  Confidence: 90%                                             │
│  Multi-hop: true                                             │
│  Supporting triples:                                         │
│    • (Einstein, works_at, Physics)                           │
│    • (Einstein, born_in, Germany)                            │
│    • (Germany, part_of, Europe)                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Supported Query Types

### 1. AND Queries (All conditions must be satisfied)

**Example 1:**
```
Question: "Who worked in Physics AND was born in Europe?"
Conditions:
  - works_at = Physics
  - born_in = Europe (via 1-hop: Germany → Europe)
Answer: Einstein
```

**Example 2:**
```
Question: "What university is located in Auckland AND was founded in 1883?"
Conditions:
  - located_in = Auckland
  - founded_in = 1883
Answer: University Of Auckland
```

**Example 3:**
```
Question: "Who received the Nobel Prize AND studied at ETH Zurich?"
Conditions:
  - received = Nobel Prize
  - attended = ETH Zurich
Answer: Einstein
```

---

### 2. OR Queries (Any condition can be satisfied)

**Example 1:**
```
Question: "Who was born in Germany OR France?"
Conditions:
  - born_in = Germany
  - born_in = France
Answer: Einstein (born in Germany) OR Marie Curie (born in France)
```

**Example 2:**
```
Question: "What did Einstein invent OR discover?"
Conditions:
  - invented = ?
  - discovered = ?
Answer: Theory Of Relativity (invented)
```

---

## Pattern Recognition

The system recognizes these patterns in query parts:

| Pattern | Predicate | Example |
|---------|-----------|---------|
| `worked/works in X` | `works_at` | "worked in Physics" |
| `born in X` | `born_in` | "was born in Europe" |
| `lived/lives in X` | `lives_in` | "lived in France" |
| `located in X` | `located_in` | "located in Auckland" |
| `studied X` | `studies` | "studied physics" |
| `invented/created X` | `invented` | "invented calculus" |
| `received/won X` | `received` | "received Nobel Prize" |

---

## Graph Traversal

### Direct Match (0-hop)
```
Question: "Who worked in Physics?"
Graph: Einstein → works_at → Physics
Hops: 0 (direct connection)
Confidence: 1.0
```

### 1-Hop Traversal
```
Question: "Who was born in Europe?"
Graph: Einstein → born_in → Germany → part_of → Europe
Hops: 1 (through Germany)
Confidence: 0.8 (reduced for indirect match)
```

### 2-Hop Traversal (Future Enhancement)
```
Question: "Who worked in a field related to energy?"
Graph: Einstein → works_at → Physics → related_to → Energy
Hops: 2
Confidence: 0.6 (further reduced)
```

**Current Limitation:** System supports up to 1-hop traversal. 2+ hops planned for future versions.

---

## Confidence Scoring

### Formula
```javascript
confidence = average(condition_confidences)

where condition_confidence = {
  1.0  if direct match (0-hop)
  0.8  if 1-hop match
  0.6  if 2-hop match (future)
}
```

### Examples

**High Confidence (90%+):**
```
Question: "Who worked in Physics AND was born in Germany?"
Both conditions: direct match
Confidence: (1.0 + 1.0) / 2 = 1.0 = 100%
```

**Medium Confidence (70-89%):**
```
Question: "Who worked in Physics AND was born in Europe?"
Condition 1: direct match (1.0)
Condition 2: 1-hop match (0.8)
Confidence: (1.0 + 0.8) / 2 = 0.9 = 90%
```

**Lower Confidence (50-69%):**
```
Question: "Who worked in science AND lived in a European country?"
Both conditions: fuzzy/indirect matches
Confidence: (0.7 + 0.6) / 2 = 0.65 = 65%
```

---

## Examples to Try

### Example 1: Academic Research
**Input Text:**
```
Albert Einstein was born in Germany. Germany is part of Europe. 
Einstein worked in Physics. Marie Curie was born in Poland. 
Poland is part of Europe. Marie Curie worked in Chemistry.
```

**Questions:**
1. "Who worked in Physics AND was born in Europe?" → Einstein
2. "Who worked in Chemistry AND was born in Europe?" → Marie Curie
3. "Who was born in Germany OR Poland?" → Einstein, Marie Curie

---

### Example 2: University Information
**Input Text:**
```
The University of Auckland is located in Auckland. Auckland is 
part of New Zealand. UoA was founded in 1883. The University of 
Canterbury is located in Christchurch. Christchurch is part of 
New Zealand. UC was founded in 1873.
```

**Questions:**
1. "What university is in New Zealand AND was founded in 1883?" → UoA
2. "What is located in Auckland AND founded in the 1800s?" → UoA
3. "What was founded in 1873 OR 1883?" → UC, UoA

---

### Example 3: Historical Events
**Input Text:**
```
Winston Churchill was born in England. England is part of Europe. 
Churchill was Prime Minister of the United Kingdom. Franklin Roosevelt 
was born in the United States. Roosevelt was President of the United States.
```

**Questions:**
1. "Who was born in Europe AND was a Prime Minister?" → Churchill
2. "Who was born in the United States AND was President?" → Roosevelt
3. "Who was Prime Minister OR President?" → Churchill, Roosevelt

---

## Comparison: Single-Hop vs Multi-Hop

### Question: "Who worked in Physics AND was born in Europe?"

#### Single-Hop Search (Old)
```
Process:
1. Find triples matching "Physics"
   → (Einstein, works_at, Physics) - Score: 5
2. Find triples matching "Europe"
   → No direct match
3. Find triples matching "born"
   → (Einstein, born_in, Germany) - Score: 3

Best match: (Einstein, born_in, Germany)
Confidence: 35% (low - doesn't mention Europe)
Answer: Germany (incorrect - answers "where" not "who")
```

#### Multi-Hop Search (New)
```
Process:
1. Detect AND operator
2. Extract conditions:
   - works_at = Physics
   - born_in = Europe
3. Build graph and traverse
4. Find Einstein satisfies both:
   - Direct: Einstein → works_at → Physics ✓
   - 1-hop: Einstein → born_in → Germany → part_of → Europe ✓

Best match: Einstein
Confidence: 90% (high - both conditions met)
Answer: Einstein ✓ (correct)
```

---

## Technical Implementation

### Data Structures

**Entity Graph:**
```javascript
Map {
  "Einstein" => {
    outgoing: [
      { predicate: "born_in", target: "Germany", triple: {...} },
      { predicate: "works_at", target: "Physics", triple: {...} }
    ],
    incoming: []
  },
  "Germany" => {
    outgoing: [
      { predicate: "part_of", target: "Europe", triple: {...} }
    ],
    incoming: [
      { predicate: "born_in", source: "Einstein", triple: {...} }
    ]
  }
}
```

**Condition Object:**
```javascript
{
  predicate: "works_at",
  value: "Physics",
  tokens: ["worked", "physics"]
}
```

---

## Limitations

### Current Limitations

1. **Max 1-Hop Traversal**
   - Can traverse one intermediate entity
   - Example: Einstein → Germany → Europe ✓
   - Cannot: Einstein → Germany → Europe → Continent ✗

2. **Simple Pattern Matching**
   - Recognizes common patterns only
   - May miss complex phrasings

3. **No Negation**
   - Cannot handle "NOT" conditions
   - Example: "Who worked in Physics AND NOT in Germany?" ✗

4. **No Temporal Reasoning**
   - Cannot handle time-based conditions
   - Example: "Who worked in Physics BEFORE 1950?" ✗

5. **No Quantifiers**
   - Cannot handle "all", "some", "most"
   - Example: "Who worked in ALL European countries?" ✗

---

## Future Enhancements

### Planned Features

1. **Extended Hop Depth**
   - Support 2-3 hop traversal
   - Configurable max depth

2. **Negation Support**
   - Handle NOT conditions
   - Example: "Who worked in Physics AND NOT in Germany?"

3. **Temporal Reasoning**
   - Date range queries
   - Before/after conditions

4. **Aggregation**
   - Count, sum, average
   - Example: "How many people worked in Physics?"

5. **Path Ranking**
   - Score different paths
   - Prefer shorter paths

6. **Explanation Generation**
   - Show reasoning chain
   - Visualize traversal path

---

## Best Practices

### Writing Multi-Hop Queries

**✅ Good:**
- "Who worked in Physics AND was born in Europe?"
- "What university is in Auckland AND was founded in 1883?"
- "Who received the Nobel Prize OR Fields Medal?"

**❌ Avoid:**
- "Who worked in Physics and stuff?" (vague)
- "What about universities in Auckland?" (no clear conditions)
- "Who was born somewhere in Europe and did science?" (too ambiguous)

### Input Text Requirements

For multi-hop to work, ensure your input includes:
1. **Direct relationships**: "Einstein worked in Physics"
2. **Hierarchical relationships**: "Germany is part of Europe"
3. **Clear entity names**: Use full names consistently

---

## Testing Multi-Hop

### Quick Test

1. **Enter this text:**
```
Einstein was born in Germany and worked in Physics. 
Germany is part of Europe. Europe is known for Physics.
```

2. **Ask:** "Who worked in Physics AND was born in Europe?"

3. **Expected:**
   - Answer: Einstein
   - Confidence: 85-90%
   - Multi-hop badge shown
   - Supporting triples displayed

---

## Conclusion

Multi-hop reasoning transforms the KG Playground from a simple triple matcher into an intelligent graph traversal system. It enables:

- **Complex queries** with multiple conditions
- **Graph traversal** to find indirect relationships
- **Higher accuracy** for real-world questions
- **Better simulation** of production RAG systems

This brings the playground closer to how actual knowledge graph query systems work in production environments.

---

**Version**: 2.1 (Multi-Hop Reasoning)  
**Last Updated**: March 21, 2026  
**Course**: COMPSCI 713 - Knowledge Graphs & RAG

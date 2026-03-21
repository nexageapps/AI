# KG Playground - Quick Reference Card

## 🚀 Quick Start (30 seconds)

1. **Paste text** into the input box
2. **Click "Extract Triples"** to build the knowledge graph
3. **Ask questions** in the Question Answering box
4. **Explore** the graph visualization

---

## 📝 Example Inputs

### Biography Template
```
[Person] was born in [Place] in [Year]. [He/She] studied [Subject] 
at [University]. [Person] worked at [Institution] and received 
[Award] in [Year]. [Person] is known for [Achievement].
```

### Organization Template
```
[Organization] is a [Type] founded in [Year]. It is located in 
[Place] and has [Number] [Units]. [Organization] is known for 
[Achievement] and ranks [Position] in [Ranking].
```

---

## 🎯 Supported Question Types

| Type | Keywords | Example | Expected Answer |
|------|----------|---------|-----------------|
| **Where** | where, location, place | "Where was Einstein born?" | Location entity |
| **When** | when, year, date, time | "When was UoA founded?" | Year/date |
| **Who** | who, whom, person | "Who founded Apple?" | Person name |
| **What** | what, which | "What did Curie discover?" | Thing/concept |
| **How many** | how many, number | "How many students?" | Quantity |

---

## 🔗 Supported Predicates (40+)

### Location & Time
- `born_in`, `died_in`, `lives_in`, `located_in`, `based_in`
- `founded_in`, `established_in`, `created_in`

### Work & Education
- `works_at`, `employed`, `teaches`, `studies`, `attended`, `graduated`

### Relationships
- `married_to`, `parent_of`, `child_of`, `collaborates_with`

### Achievements
- `invented`, `created`, `developed`, `discovered`, `received`, `won`

### Properties
- `is_a`, `has`, `known_as`, `also_known_as`, `specializes_in`

### Rankings & Affiliations
- `ranked_in`, `leads_in`, `part_of`, `belongs_to`, `member_of`

---

## 💡 Tips for Best Results

### ✅ DO
- Use clear, factual sentences
- Include specific names, dates, and numbers
- Write "University of Auckland (UoA)" for aliases
- Separate facts into different sentences
- Use full names first, then abbreviations

### ❌ DON'T
- Use complex nested clauses
- Mix multiple topics in one sentence
- Use vague pronouns without clear antecedents
- Include opinions or subjective statements
- Use ambiguous terms

---

## 🎨 Understanding the Graph

### Node Colors
- **Blue**: People and organizations
- **Purple**: Locations and places
- **Orange**: Concepts and subjects
- **Green**: Achievements and awards

### Edge Labels
- Show the predicate (relationship type)
- Hover to see full triple details

### Interactions
- **Drag**: Move nodes around
- **Hover**: See triple information
- **Zoom**: Scroll to zoom in/out
- **Pan**: Click and drag background

---

## 🔍 Semantic Search Features

### Fuzzy Matching
- "Einstein" matches "Albert Einstein"
- "UoA" matches "University of Auckland"
- Handles typos and variations

### Synonym Recognition
- "employed" → `works_at`
- "created" → `invented`
- "residence" → `lives_in`

### Question Type Detection
- "Where" → prioritizes location predicates
- "When" → prioritizes temporal predicates
- "Who" → prioritizes person relationships

### Confidence Scores
- **90-99%**: Very high confidence
- **70-89%**: High confidence
- **50-69%**: Medium confidence
- **40-49%**: Low confidence
- **< 40%**: No answer shown

---

## ⚠️ Understanding Conflicts

### What is a Conflict?
When the same entity has multiple different values for the same property:

```
❌ (UoA, located_in, Auckland)
❌ (UoA, located_in, Wellington)
→ Conflict: UoA can't be in two places
```

### How to Resolve
1. Check your input text for contradictions
2. Use consistent terminology
3. Separate different time periods
4. Remove or correct the conflicting statement

---

## 🔗 Missing Link Suggestions

### What Are They?
Potential relationships between entities that appear together but have no explicit connection:

```
Known: (Einstein, born_in, Germany)
Known: (Einstein, works_in, Physics)
Known: (Nobel Prize, is_a, Award)

Suggested: (Einstein, related_to, Nobel Prize)
Confidence: 0.8
```

### Why Suggested?
- Entities appear in same context
- Co-occurrence patterns detected
- Transitive relationships inferred

---

## 📊 Scoring Breakdown

### How Answers Are Scored

| Component | Weight | Example |
|-----------|--------|---------|
| Exact entity match | +5 | "Einstein" in "Albert Einstein" |
| Fuzzy entity match | +3 × similarity | 85% similar → +2.55 |
| Predicate semantic match | +4 | "born" → `born_in` |
| Question type bonus | +2 | "where" + location predicate |
| N-gram overlap | +1.5 per match | "einstein born" matches |
| Token position weight | +1-2 | Earlier tokens weighted more |

**Minimum threshold**: 3 points to show answer

---

## 🐛 Troubleshooting

### No Triples Extracted
- **Problem**: Input text too complex or ambiguous
- **Solution**: Use simpler, more explicit sentences

### Wrong Answer Returned
- **Problem**: Question doesn't match extracted triples
- **Solution**: Rephrase question or check triple extraction

### Low Confidence Score
- **Problem**: Weak match between question and triples
- **Solution**: Use more specific entity names or keywords

### Too Many Conflicts
- **Problem**: Contradictory information in input
- **Solution**: Review and correct input text

---

## 🎓 Learning Path

### Beginner (5 minutes)
1. Try Example 1 from EXAMPLES_AND_TUTORIALS.md
2. Ask 3-5 questions
3. Observe the graph visualization

### Intermediate (15 minutes)
1. Try Examples 2-3 with different domains
2. Test fuzzy matching with partial names
3. Experiment with synonym recognition
4. Observe confidence scores

### Advanced (30 minutes)
1. Create your own complex input text
2. Test conflict detection
3. Analyze missing link suggestions
4. Compare question phrasings
5. Study the graph structure

---

## 📚 Full Documentation

- **[EXAMPLES_AND_TUTORIALS.md](./EXAMPLES_AND_TUTORIALS.md)** - Detailed examples and walkthroughs
- **[SEMANTIC_SEARCH_EXPLAINED.md](./SEMANTIC_SEARCH_EXPLAINED.md)** - Deep dive into algorithms
- **[TESTING_SEMANTIC_SEARCH.md](./TESTING_SEMANTIC_SEARCH.md)** - Comprehensive test suite
- **[README.md](./README.md)** - Main documentation

---

## 🔑 Key Concepts

### RDF Triple
```
(Subject, Predicate, Object)
(Einstein, born_in, Germany)
```
The atomic unit of knowledge representation.

### Knowledge Graph
```
Einstein ──born_in──> Germany ──part_of──> Europe
   │
   └──works_in──> Physics
```
A network of connected triples.

### RAG (Retrieval-Augmented Generation)
```
1. Store facts as triples
2. Retrieve relevant triples for question
3. Generate answer using only those facts
```
Prevents LLM hallucination by grounding in verified data.

---

## 💻 Keyboard Shortcuts

- **Enter** in text input → Extract triples
- **Enter** in question box → Ask question
- **Esc** → Clear current input
- **Tab** → Navigate between inputs

---

## 🌟 Pro Tips

1. **Use parenthetical aliases**: "University of Auckland (UoA)" automatically creates alias triples
2. **Include years in parentheses**: "Einstein (1879-1955)" extracts birth and death years
3. **Start with full names**: "Albert Einstein" first, then use "Einstein" in later sentences
4. **One fact per sentence**: Easier for the extractor to parse
5. **Test multiple question phrasings**: See how semantic search handles variations

---

## 📞 Need Help?

1. Check [EXAMPLES_AND_TUTORIALS.md](./EXAMPLES_AND_TUTORIALS.md) for detailed walkthroughs
2. Read [SEMANTIC_SEARCH_EXPLAINED.md](./SEMANTIC_SEARCH_EXPLAINED.md) for algorithm details
3. Review [TESTING_SEMANTIC_SEARCH.md](./TESTING_SEMANTIC_SEARCH.md) for test cases
4. Consult the Education Panel in the app (click "Concepts Explained")

---

**Version**: 2.0 (Enhanced Semantic Search)  
**Last Updated**: March 21, 2026  
**Course**: COMPSCI 713 - Knowledge Graphs & RAG

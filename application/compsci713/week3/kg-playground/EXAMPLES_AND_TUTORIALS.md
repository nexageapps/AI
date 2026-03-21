# KG Playground - Examples & Tutorials

## Table of Contents
1. [Quick Start Examples](#quick-start-examples)
2. [Academic Research Scenario](#academic-research-scenario)
3. [Company Information Scenario](#company-information-scenario)
4. [Historical Events Scenario](#historical-events-scenario)
5. [Understanding Semantic Search](#understanding-semantic-search)
6. [Advanced Features](#advanced-features)

---

## Quick Start Examples

### Example 1: Simple Biography
**Input Text:**
```
Marie Curie was born in Poland in 1867. She studied physics and chemistry 
at the University of Paris. Marie Curie discovered radium and polonium. 
She received the Nobel Prize in Physics in 1903 and the Nobel Prize in 
Chemistry in 1911. Marie Curie worked in France and died in 1934.
```

**Expected Triples:**
- (Marie Curie, born_in, Poland)
- (Marie Curie, born_in, 1867)
- (Marie Curie, studies, Physics)
- (Marie Curie, studies, Chemistry)
- (Marie Curie, attended, University Of Paris)
- (Marie Curie, invented, Radium)
- (Marie Curie, invented, Polonium)
- (Marie Curie, received, Nobel Prize In Physics)
- (Marie Curie, received, Nobel Prize In Chemistry)
- (Marie Curie, works_at, France)
- (Marie Curie, died_in, 1934)

**Try These Questions:**
- "Where was Marie Curie born?" → Poland
- "What did Marie Curie discover?" → Radium / Polonium
- "When did Marie Curie receive the Nobel Prize?" → 1903 / 1911
- "What did Marie Curie study?" → Physics / Chemistry
- "Where did Marie Curie work?" → France

**What You'll Learn:**
- How biographical facts are extracted into triples
- How temporal information (years) is captured
- How multiple values for the same predicate are handled
- How semantic search matches questions to relevant triples

---

### Example 2: University Information
**Input Text:**
```
The University of Auckland (UoA) is New Zealand's top-ranked public research 
university. It was founded in 1883 and is located primarily in Auckland. 
The university has around 45,000 students and is known as Waipapa Taumata Rau 
in Māori. UoA ranks #65 in the QS World University Rankings 2026 and leads 
nationally in research output.
```

**Expected Triples:**
- (University Of Auckland, also_known_as, UoA)
- (University Of Auckland, is_a, Public Research University)
- (University Of Auckland, founded_in, 1883)
- (University Of Auckland, located_in, Auckland)
- (University Of Auckland, has, 45000 Students)
- (University Of Auckland, known_as, Waipapa Taumata Rau)
- (University Of Auckland, ranked_in, QS World University Rankings 2026)
- (University Of Auckland, leads_in, Research Output)
- (Auckland, part_of, New Zealand)

**Try These Questions:**
- "When was UoA founded?" → 1883
- "Where is the University of Auckland located?" → Auckland
- "How many students does UoA have?" → 45000 Students
- "What is UoA known as in Māori?" → Waipapa Taumata Rau
- "What is UoA's ranking?" → Rank 65 / QS World University Rankings 2026

**What You'll Learn:**
- Parenthetical alias extraction (UoA)
- Numeric fact extraction (45,000 students)
- Ranking information capture
- Multi-word entity normalization
- Alternative name handling

---

## Academic Research Scenario

### Example 3: Research Paper Information
**Input Text:**
```
Dr. Sarah Chen is a computer science professor at Stanford University. 
She specializes in machine learning and artificial intelligence. Dr. Chen 
published "Deep Learning for Natural Language Processing" in 2020. She 
received the ACM Distinguished Scientist Award in 2022. Dr. Chen collaborates 
with researchers at MIT and Carnegie Mellon University. Her research focuses 
on transformer architectures and attention mechanisms.
```

**Expected Triples:**
- (Dr Sarah Chen, is_a, Computer Science Professor)
- (Dr Sarah Chen, works_at, Stanford University)
- (Dr Sarah Chen, specializes_in, Machine Learning)
- (Dr Sarah Chen, specializes_in, Artificial Intelligence)
- (Dr Sarah Chen, wrote, Deep Learning For Natural Language Processing)
- (Dr Sarah Chen, received, ACM Distinguished Scientist Award)
- (Dr Sarah Chen, collaborates_with, MIT)
- (Dr Sarah Chen, collaborates_with, Carnegie Mellon University)
- (Dr Sarah Chen, specializes_in, Transformer Architectures)
- (Dr Sarah Chen, specializes_in, Attention Mechanisms)

**Advanced Questions:**
- "Where does Dr. Chen work?" → Stanford University
- "What does Sarah Chen specialize in?" → Machine Learning / AI
- "What award did Dr. Chen receive?" → ACM Distinguished Scientist Award
- "Who does Dr. Chen collaborate with?" → MIT / Carnegie Mellon
- "What did Sarah Chen publish?" → Deep Learning For Natural Language Processing

**Graph Insights:**
- The graph will show Dr. Chen as a central node
- Multiple "specializes_in" edges showing research areas
- Collaboration network with other universities
- Publication and award relationships

---

## Company Information Scenario

### Example 4: Tech Company Profile
**Input Text:**
```
OpenAI is an artificial intelligence research company founded in 2015. 
The company is based in San Francisco, California. OpenAI developed ChatGPT, 
GPT-4, and DALL-E. Sam Altman is the CEO of OpenAI. The company focuses on 
developing safe and beneficial artificial general intelligence. OpenAI 
collaborates with Microsoft and received significant funding from Microsoft 
in 2023. The company employs over 500 researchers and engineers.
```

**Expected Triples:**
- (OpenAI, is_a, Artificial Intelligence Research Company)
- (OpenAI, founded_in, 2015)
- (OpenAI, located_in, San Francisco)
- (San Francisco, located_in, California)
- (OpenAI, developed, ChatGPT)
- (OpenAI, developed, GPT-4)
- (OpenAI, developed, DALL-E)
- (Sam Altman, is_a, CEO)
- (Sam Altman, works_at, OpenAI)
- (OpenAI, specializes_in, Artificial General Intelligence)
- (OpenAI, collaborates_with, Microsoft)
- (OpenAI, has, 500 Researchers And Engineers)

**Business Intelligence Questions:**
- "When was OpenAI founded?" → 2015
- "Where is OpenAI located?" → San Francisco
- "Who is the CEO of OpenAI?" → Sam Altman
- "What did OpenAI develop?" → ChatGPT / GPT-4 / DALL-E
- "Who does OpenAI collaborate with?" → Microsoft

**Use Case:**
This demonstrates how KGs can power:
- Company knowledge bases
- Competitive intelligence systems
- Investment research platforms
- Business relationship mapping

---

## Historical Events Scenario

### Example 5: World War II Facts
**Input Text:**
```
World War II was a global conflict that lasted from 1939 to 1945. The war 
involved most of the world's nations. Adolf Hitler led Nazi Germany during 
the war. Winston Churchill was the Prime Minister of the United Kingdom. 
Franklin D. Roosevelt was the President of the United States. The war ended 
in 1945 with the defeat of Nazi Germany and Imperial Japan. The United Nations 
was founded in 1945 after the war ended.
```

**Expected Triples:**
- (World War II, is_a, Global Conflict)
- (World War II, founded_in, 1939)
- (World War II, died_in, 1945)
- (Adolf Hitler, is_a, Leader)
- (Adolf Hitler, works_at, Nazi Germany)
- (Winston Churchill, is_a, Prime Minister)
- (Winston Churchill, works_at, United Kingdom)
- (Franklin D Roosevelt, is_a, President)
- (Franklin D Roosevelt, works_at, United States)
- (United Nations, founded_in, 1945)

**Historical Questions:**
- "When did World War II start?" → 1939
- "When did World War II end?" → 1945
- "Who led Nazi Germany?" → Adolf Hitler
- "Who was the Prime Minister of the UK?" → Winston Churchill
- "When was the United Nations founded?" → 1945

**Educational Value:**
- Temporal relationships (start/end dates)
- Leadership roles and affiliations
- Cause-and-effect relationships
- Multi-entity event modeling

---

## Understanding Semantic Search

### How the Enhanced Search Works

#### Example Question: "Where was Einstein born?"

**Step 1: Question Type Detection**
- Detects "where" → prioritizes location predicates
- Keywords: "where", "born"

**Step 2: Entity Matching**
- "Einstein" matches "Albert Einstein" (fuzzy matching)
- Similarity score: 0.85

**Step 3: Predicate Mapping**
- "born" → maps to `born_in` predicate
- Synonym recognition: "birth" would also map to `born_in`

**Step 4: Scoring**
```
Triple: (Albert Einstein, born_in, Germany)
- Entity match (Einstein): +5 points
- Predicate match (born_in): +4 points
- Question type bonus (where): +2 points
- Total score: 11 points
```

**Step 5: Answer Extraction**
- Subject "Einstein" is in the question
- Object "Germany" is NOT in the question
- Answer: "Germany"
- Confidence: 85%

---

### Comparison: Simple vs Enhanced Search

#### Question: "Where did Einstein work?"

**Simple Keyword Search (Old):**
```
Tokens: ["where", "did", "einstein", "work"]
Matches: 
- "einstein" in subject → +3 points
- "work" in predicate → +1 point
Total: 4 points
```

**Enhanced Semantic Search (New):**
```
Question Type: "where" (location query)
Entity Similarity: "Einstein" → "Albert Einstein" (0.92)
Predicate Mapping: "work" → ["works_at", "employed"]
N-grams: ["where did", "did einstein", "einstein work"]

Scoring:
- Fuzzy entity match: +4.6 points (5 × 0.92)
- Predicate semantic match: +4 points
- Question type bonus: +2 points
- N-gram overlap: +3 points
- Token position weighting: +2 points
Total: 15.6 points
Confidence: 96%
```

**Result:** More accurate matching, higher confidence, better handling of variations

---

## Advanced Features

### Feature 1: Conflict Detection

**Input Text:**
```
The University of Canterbury is located in Christchurch. 
The University of Canterbury is located in Auckland.
```

**What Happens:**
1. Two triples are extracted:
   - (University Of Canterbury, located_in, Christchurch)
   - (University Of Canterbury, located_in, Auckland)

2. Conflict detected:
   - Same subject: "University Of Canterbury"
   - Same predicate: "located_in"
   - Different objects: "Christchurch" vs "Auckland"

3. Red warning banner appears:
   - "Conflict: University Of Canterbury has multiple values for located_in: Christchurch, Auckland"

**Why This Matters:**
- Prevents inconsistent answers in RAG systems
- Identifies data quality issues
- Flags contradictory information sources

---

### Feature 2: Missing Link Suggestions

**Input Text:**
```
Albert Einstein was born in Germany. Einstein worked in physics. 
The Nobel Prize is awarded for outstanding contributions. 
Germany is part of Europe.
```

**Extracted Triples:**
- (Albert Einstein, born_in, Germany)
- (Albert Einstein, works_at, Physics)
- (Nobel Prize, is_a, Award)
- (Germany, part_of, Europe)

**Suggested Missing Links:**
- (Albert Einstein, related_to, Nobel Prize) - confidence: 0.8
- (Albert Einstein, related_to, Europe) - confidence: 0.7
- (Physics, related_to, Nobel Prize) - confidence: 0.6

**Why These Suggestions:**
- Einstein and Nobel Prize appear in same context
- Einstein → Germany → Europe (transitive relationship)
- Physics and Nobel Prize are co-occurring entities

**Real-World Application:**
- Knowledge graph completion
- Relationship discovery
- Data enrichment
- Link prediction in social networks

---

### Feature 3: Graph Visualization

**What You See:**
- **Nodes**: Entities (subjects and objects)
- **Edges**: Relationships (predicates)
- **Colors**: Different entity types
- **Hover**: Shows triple details
- **Drag**: Rearrange nodes
- **Physics**: Spring-force layout

**Graph Insights:**
- **Central nodes**: Entities with many connections (high degree)
- **Clusters**: Related entities group together
- **Paths**: Multi-hop relationships visible
- **Isolated nodes**: Entities with few connections

**Example Analysis:**
```
Input: Einstein biography

Graph shows:
- Einstein (central node) with 8+ connections
- Cluster 1: Birth/death info (Germany, 1879, 1955)
- Cluster 2: Work info (Physics, Princeton, Nobel Prize)
- Cluster 3: Achievements (Relativity, Photoelectric Effect)
```

---

## Best Practices

### Writing Good Input Text

**✅ DO:**
- Use clear, factual sentences
- Include specific dates, numbers, and names
- Use full names first, then abbreviations
- Separate different facts into different sentences

**❌ DON'T:**
- Use overly complex nested clauses
- Mix multiple topics in one sentence
- Use ambiguous pronouns without clear antecedents
- Include opinions or subjective statements

### Example Comparison

**Bad Input:**
```
Einstein, who was really smart and did a lot of stuff, 
worked on things that were important and got awards.
```

**Good Input:**
```
Albert Einstein was a theoretical physicist. He developed 
the theory of relativity. Einstein received the Nobel Prize 
in Physics in 1921. He worked at Princeton University.
```

---

## Testing Scenarios

### Scenario 1: Data Quality Testing
**Goal:** Test conflict detection

**Input:**
```
Apple was founded in 1976.
Apple was founded in 1977.
Steve Jobs founded Apple.
```

**Expected:** Conflict warning for founding year

---

### Scenario 2: Relationship Discovery
**Goal:** Test missing link suggestions

**Input:**
```
Marie Curie studied at the University of Paris.
Pierre Curie studied at the University of Paris.
Marie Curie married Pierre Curie.
```

**Expected:** Suggestions for relationships between the Curies and the university

---

### Scenario 3: Multi-hop Reasoning
**Goal:** Test graph traversal

**Input:**
```
Einstein was born in Germany.
Germany is part of Europe.
Europe is a continent.
```

**Questions:**
- "Where was Einstein born?" → Germany
- "What continent is Germany in?" → Europe
- Multi-hop: "What continent was Einstein born in?" → Europe (requires 2 hops)

---

## Real-World Applications

### 1. Academic Research Assistant
**Use Case:** Help researchers find connections between papers, authors, and institutions

**Example Query:**
"Find all researchers who worked on transformer architectures at Stanford"

**KG Approach:**
- Extract triples from research papers
- Build author-institution-topic graph
- Query for paths: Author → works_at → Stanford AND Author → specializes_in → Transformers

---

### 2. Customer Support Knowledge Base
**Use Case:** Answer product questions using company documentation

**Example Query:**
"What features does the Pro plan include?"

**KG Approach:**
- Extract triples from product docs
- Build product-feature-plan graph
- Query: Pro Plan → has → [list of features]

---

### 3. Medical Information System
**Use Case:** Connect symptoms, diseases, and treatments

**Example Query:**
"What treatments are available for condition X?"

**KG Approach:**
- Extract triples from medical literature
- Build symptom-disease-treatment graph
- Query: Condition X → treated_by → [list of treatments]

---

## Troubleshooting

### Problem: No triples extracted
**Solution:** 
- Check that sentences have clear subject-verb-object structure
- Use more explicit language
- Break complex sentences into simpler ones

### Problem: Wrong answers from questions
**Solution:**
- Check that the relevant triple was extracted
- Rephrase question to match predicate keywords
- Use more specific entity names

### Problem: Too many conflicts
**Solution:**
- Review input text for contradictions
- Use consistent terminology
- Separate different time periods

---

## Next Steps

1. **Try the examples** above in order
2. **Experiment** with your own text
3. **Compare** simple vs complex inputs
4. **Analyze** the graph visualization
5. **Test** different question phrasings
6. **Explore** conflict detection and missing links

## Further Reading

- [RDF Primer](https://www.w3.org/TR/rdf11-primer/) - W3C Standard
- [Knowledge Graphs](https://arxiv.org/abs/2003.02320) - Survey Paper
- [RAG Systems](https://arxiv.org/abs/2005.11401) - Research Paper
- [Graph Embeddings](https://arxiv.org/abs/1709.07604) - TransE and Beyond

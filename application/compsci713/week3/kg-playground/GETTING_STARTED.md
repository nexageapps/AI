# Getting Started with KG Playground

Welcome! This guide will help you understand and use the KG Playground effectively in just 10 minutes.

---

## What is KG Playground?

KG Playground is an interactive learning tool that demonstrates three key concepts in modern AI:

1. **RDF Triples** - How to represent knowledge as (Subject, Predicate, Object)
2. **Knowledge Graphs** - How triples connect to form queryable networks
3. **RAG (Retrieval-Augmented Generation)** - How to answer questions using structured knowledge

---

## 🎯 Your First 5 Minutes

### Step 1: Extract Your First Knowledge Graph (1 minute)

**Copy this text:**
```
Albert Einstein was born in Germany in 1879. He studied physics at 
ETH Zurich. Einstein worked at Princeton University and received the 
Nobel Prize in Physics in 1921. He developed the theory of relativity 
and died in 1955.
```

**Actions:**
1. Paste the text into the large text box at the top
2. Click the blue "Extract Triples" button
3. Watch the magic happen! ✨

**What You'll See:**
- **Left Panel**: List of extracted triples
- **Right Panel**: Interactive graph visualization
- **Bottom**: Question answering box

---

### Step 2: Explore the Triples (1 minute)

Look at the "RDF Triples" panel on the left. You should see triples like:

```
(Albert Einstein, born_in, Germany)
(Albert Einstein, born_in, 1879)
(Albert Einstein, studies, Physics)
(Albert Einstein, works_at, Princeton University)
(Albert Einstein, received, Nobel Prize In Physics)
(Albert Einstein, invented, Theory Of Relativity)
(Albert Einstein, died_in, 1955)
```

**Understanding Triples:**
- **Subject** (blue): The entity being described
- **Predicate** (purple): The relationship or property
- **Object** (green): The value or related entity

---

### Step 3: Ask Questions (2 minutes)

Scroll down to the "Question Answering" box and try these questions:

1. **"Where was Einstein born?"**
   - Expected answer: Germany
   - Confidence: ~95%

2. **"When did Einstein receive the Nobel Prize?"**
   - Expected answer: 1921
   - Confidence: ~90%

3. **"What did Einstein develop?"**
   - Expected answer: Theory Of Relativity
   - Confidence: ~85%

4. **"Where did Einstein work?"**
   - Expected answer: Princeton University
   - Confidence: ~90%

**Notice:**
- Each answer shows a confidence percentage
- The source triple is displayed below the answer
- The system handles variations like "Einstein" vs "Albert Einstein"

---

### Step 4: Explore the Graph (1 minute)

Look at the graph visualization on the right:

**Try these interactions:**
- **Hover** over nodes to see entity names
- **Hover** over edges to see relationships
- **Drag** nodes to rearrange the layout
- **Observe** how Einstein is the central node with connections to all other entities

**Graph Insights:**
- Nodes = Entities (Einstein, Germany, Physics, etc.)
- Edges = Relationships (born_in, works_at, etc.)
- The graph shows how knowledge is interconnected

---

## 🚀 Your Next 5 Minutes

### Step 5: Try a More Complex Example (2 minutes)

**Copy this text:**
```
Marie Curie (1867-1934) was born in Poland. She studied physics and 
chemistry at the University of Paris. Marie Curie discovered radium 
and polonium. She received the Nobel Prize in Physics in 1903 and the 
Nobel Prize in Chemistry in 1911. Marie Curie was married to Pierre Curie. 
She worked in France and was the first woman to win a Nobel Prize.
```

**What's Different:**
- Birth/death years in parentheses: `(1867-1934)`
- Multiple awards with different years
- Relationship information: `married to Pierre Curie`
- Multiple discoveries

**New Questions to Try:**
1. "When was Marie Curie born?" → 1867
2. "What did Marie Curie discover?" → Radium / Polonium
3. "Who was Marie Curie married to?" → Pierre Curie
4. "How many Nobel Prizes did Marie Curie receive?" → (will find the triples)

---

### Step 6: Test Semantic Search Features (2 minutes)

The system uses **enhanced semantic search** with several smart features:

**Test 1: Fuzzy Matching**
- Question: "Where was Curie born?" (using last name only)
- Should still match "Marie Curie" ✓

**Test 2: Synonym Recognition**
- Question: "Where was Marie Curie employed?" (using "employed")
- Should match `works_at` predicate ✓

**Test 3: Question Type Detection**
- Question: "When did Curie win the Nobel Prize?" (temporal question)
- Should prioritize year-based answers ✓

**Test 4: Confidence Scores**
- Try vague questions: "What did Curie do?"
- Notice lower confidence scores for ambiguous questions

---

### Step 7: Understand Conflicts (1 minute)

**Try this experiment:**

1. Enter: "The University of Canterbury is located in Christchurch"
2. Click "Extract Triples"
3. Add: "The University of Canterbury is located in Auckland"
4. Click "Extract Triples" again

**What Happens:**
- A red warning banner appears
- Message: "Conflict detected: University Of Canterbury has multiple values for located_in"
- This shows data quality checking in action

**Why This Matters:**
- In real RAG systems, conflicts lead to inconsistent answers
- Detecting conflicts early prevents AI hallucination
- You can resolve by keeping the correct triple

---

## 📚 Understanding the Concepts

### What is an RDF Triple?

Think of it as the simplest possible sentence:

```
Traditional sentence: "Einstein was born in Germany"
RDF Triple: (Einstein, born_in, Germany)
```

**Why triples?**
- Machines can process them without understanding grammar
- Easy to store in databases (triple stores)
- Can be queried efficiently
- Language-independent

---

### What is a Knowledge Graph?

When you connect many triples together:

```
Einstein ──born_in──> Germany ──part_of──> Europe
   │
   ├──works_at──> Princeton
   │
   └──received──> Nobel Prize ──awarded_for──> Physics
```

**Real-world examples:**
- Google Knowledge Graph: 500 billion facts
- Wikidata: 100 million entities
- Your company's knowledge base

---

### What is RAG?

RAG = Retrieval-Augmented Generation

**The Problem:**
- LLMs (like ChatGPT) sometimes make up facts (hallucinate)
- They only know what was in their training data
- Information becomes outdated

**The Solution:**
```
1. STORE: Convert documents to triples (what you just did!)
2. RETRIEVE: Find relevant triples for a question (semantic search)
3. GENERATE: LLM answers using ONLY those triples (prevents hallucination)
```

**This app simulates steps 1 and 2:**
- Text input → Triple extraction (STORE)
- Question answering → Semantic search (RETRIEVE)
- In production, step 3 uses GPT-4/Claude/Llama

---

## 🎓 Learning Paths

### Path 1: Quick Learner (15 minutes)
1. ✅ Complete this guide (10 minutes)
2. Read [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) (5 minutes)
3. Try 3-5 examples from [EXAMPLES_AND_TUTORIALS.md](./EXAMPLES_AND_TUTORIALS.md)

### Path 2: Deep Diver (1 hour)
1. ✅ Complete this guide (10 minutes)
2. Work through all examples in [EXAMPLES_AND_TUTORIALS.md](./EXAMPLES_AND_TUTORIALS.md) (30 minutes)
3. Read [SEMANTIC_SEARCH_EXPLAINED.md](./SEMANTIC_SEARCH_EXPLAINED.md) (20 minutes)

### Path 3: Technical Expert (2+ hours)
1. ✅ Complete Path 2
2. Study [SEMANTIC_SEARCH_IMPROVEMENTS.md](./SEMANTIC_SEARCH_IMPROVEMENTS.md)
3. Run all tests from [TESTING_SEMANTIC_SEARCH.md](./TESTING_SEMANTIC_SEARCH.md)
4. Experiment with your own datasets
5. Explore the source code

---

## 💡 Pro Tips

### Writing Better Input Text

**Good Example:**
```
Marie Curie was born in Poland in 1867. She studied physics at 
the University of Paris. Marie Curie discovered radium in 1898.
```
- Clear subject-verb-object structure
- One fact per sentence
- Specific dates and names

**Bad Example:**
```
Marie Curie, who was really smart and did a lot of important 
scientific work that changed the world, discovered stuff.
```
- Vague and subjective
- Multiple clauses
- No specific facts

---

### Asking Better Questions

**Good Questions:**
- "Where was Einstein born?" (specific entity, clear intent)
- "When did UoA receive its charter?" (temporal, specific)
- "What did Marie Curie discover?" (achievement-focused)

**Challenging Questions:**
- "What did Einstein do?" (too vague)
- "Tell me about Einstein" (not a specific question)
- "Why is Einstein famous?" (requires reasoning, not just facts)

---

## 🔍 What Makes the Search "Semantic"?

Traditional keyword search:
```
Question: "Where was Einstein born?"
Looks for: exact words "einstein" and "born"
Problem: Won't match "Albert Einstein" or "birth"
```

Semantic search (what we have):
```
Question: "Where was Einstein born?"
Understands:
  - "Einstein" ≈ "Albert Einstein" (fuzzy matching)
  - "born" → born_in predicate (synonym mapping)
  - "where" → expects location (question type)
  - "was born" as a phrase (n-gram analysis)
Result: Finds the right answer even with variations
```

---

## 🎯 Common Use Cases

### 1. Academic Research
**Input:** Research paper abstracts
**Questions:** "Who collaborated with Dr. Smith?", "What methods were used?"
**Benefit:** Quickly find connections between researchers and topics

### 2. Company Knowledge Base
**Input:** Product documentation, team info
**Questions:** "Who is the lead for Project X?", "What features does Pro plan include?"
**Benefit:** Instant answers without reading full docs

### 3. Historical Analysis
**Input:** Historical events and figures
**Questions:** "When did X happen?", "Who was involved in Y?"
**Benefit:** Understand temporal relationships and connections

### 4. Personal Knowledge Management
**Input:** Notes, articles, learning materials
**Questions:** "What did I learn about topic X?", "Who recommended book Y?"
**Benefit:** Your personal AI-powered second brain

---

## 🐛 Troubleshooting

### "No triples extracted"
**Cause:** Input text is too complex or ambiguous
**Fix:** Use simpler sentences with clear subject-verb-object structure

### "No matching triple found"
**Cause:** Question doesn't match any extracted triples
**Fix:** 
- Check that relevant triples were extracted
- Rephrase question to match predicate keywords
- Use entity names that appear in the triples

### "Low confidence score"
**Cause:** Weak match between question and triples
**Fix:**
- Use more specific entity names
- Include keywords that match predicates
- Try different question phrasings

---

## 🎉 Next Steps

Now that you understand the basics:

1. **Experiment** with your own text
   - Try different domains (tech, history, science)
   - Test with longer paragraphs
   - See how the graph grows

2. **Explore Advanced Features**
   - Conflict detection
   - Missing link suggestions
   - Graph insights panel

3. **Learn the Theory**
   - Read the Education Panel in the app
   - Study the documentation files
   - Understand the algorithms

4. **Apply to Real Projects**
   - Build a knowledge base for your domain
   - Create a Q&A system for your team
   - Experiment with RAG pipelines

---

## 📖 Documentation Index

| Document | Purpose | Time |
|----------|---------|------|
| **GETTING_STARTED.md** (this file) | Quick introduction | 10 min |
| [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) | Cheat sheet | 5 min |
| [EXAMPLES_AND_TUTORIALS.md](./EXAMPLES_AND_TUTORIALS.md) | Detailed examples | 30 min |
| [SEMANTIC_SEARCH_EXPLAINED.md](./SEMANTIC_SEARCH_EXPLAINED.md) | Algorithm deep dive | 20 min |
| [SEMANTIC_SEARCH_IMPROVEMENTS.md](./SEMANTIC_SEARCH_IMPROVEMENTS.md) | Technical details | 15 min |
| [TESTING_SEMANTIC_SEARCH.md](./TESTING_SEMANTIC_SEARCH.md) | Test suite | 20 min |
| [README.md](./README.md) | Main documentation | 10 min |

---

## 🌟 Key Takeaways

1. **RDF Triples** are the building blocks of structured knowledge
2. **Knowledge Graphs** connect triples into queryable networks
3. **RAG** uses KGs to prevent LLM hallucination
4. **Semantic Search** understands meaning, not just keywords
5. **Conflict Detection** ensures data quality
6. **This is how production AI systems work** (simplified)

---

## 🚀 Ready to Start?

1. Open the KG Playground app
2. Copy the Einstein example from Step 1
3. Extract triples and ask questions
4. Explore the graph
5. Try your own examples!

**Have fun learning! 🎓**

---

**Course**: COMPSCI 713 - Knowledge Graphs & RAG  
**Institution**: University of Auckland  
**Version**: 2.0 (Enhanced Semantic Search)  
**Last Updated**: March 21, 2026

# KG Playground — Knowledge Graphs & RAG
**COMPSCI 713 · Week 3 · University of Auckland**

An interactive, browser-only React app for learning Knowledge Graphs, RDF triples, and Retrieval-Augmented Generation (RAG) concepts visually.

## What it does

Type any sentence (or paste a paragraph) and the app:

1. Extracts RDF triples — `(Subject, Predicate, Object)` — using rule-based JavaScript NLP
2. Renders a live, draggable force-directed graph (SVG + spring simulation, no external graph library)
3. Lets you ask plain-English questions answered by searching the triple store
4. Detects conflicts — e.g. two different `located_in` values for the same entity
5. Suggests missing links between co-occurring entities
6. Shows a plain-English summary of what the graph is saying

## Features

| Feature | Detail |
|---------|--------|
| Triple Extractor | Clause-level matching with subject carry-forward across conjunctions |
| Supported predicates | `born_in`, `works_in`, `located_in`, `founded_in`, `known_as`, `also_known_as`, `ranked_in`, `leads_in`, `received`, `studies`, `is_a`, and 30+ more |
| Parenthetical aliases | `University of Auckland (UoA)` → auto-adds `also_known_as` triple |
| Graph | Draggable nodes (mouse + touch), hover tooltips, spring physics, no overlap |
| QA | **Enhanced semantic search** with fuzzy matching, n-gram overlap, question type detection, confidence scoring, and **multi-hop reasoning** (AND/OR queries) |
| Conflict Detection | Flags when the same subject+predicate maps to multiple objects |
| Missing Link Suggestions | Confidence-scored suggestions for co-occurring entities |
| Education Panel | School-friendly explanations of RDF, KG, and RAG |
| LLM Prompt Templates | Ready-made prompts for future LLM integration |

## Run locally

```bash
cd application/compsci713/week3/kg-playground
npm install
npm start
```

Opens at http://localhost:3000

## Example input

```
University of Auckland (UoA) is New Zealand's top-ranked public research university,
located primarily in Auckland with around 45,000 students. Known as Waipapa Taumata Rau
in Māori, it was founded in 1883 and leads nationally in research output and global
rankings, such as #65 in QS World University Rankings 2026.
```

Expected triples include: `(UniversityOfAuckland, located_in, Auckland)`, `(UniversityOfAuckland, founded_in, 1883)`, `(UniversityOfAuckland, also_known_as, UoA)`, etc.

## What you learned (Week 3)

- RDF triples as the atomic unit of knowledge representation
- Knowledge Graphs as networks of entities and relationships
- Subject carry-forward — how clauses share a subject across conjunctions
- Conflict detection in triple stores (same predicate, multiple values)
- Retrieval-Augmented Generation — retrieve relevant facts, then answer
- **Enhanced semantic search** — fuzzy matching, n-gram analysis, question type detection
- How rule-based NLP can simulate LLM behaviour for simple structured tasks

## Recent Improvements

### Multi-Hop Reasoning (Latest)
The question answering system now supports complex queries with multiple conditions:
- **AND/OR operators**: "Who worked in Physics AND was born in Europe?"
- **Graph traversal**: Follows relationships across multiple triples (up to 1-hop)
- **Condition extraction**: Automatically parses complex query parts
- **Path finding**: Discovers indirect relationships (e.g., Einstein → Germany → Europe)
- **Supporting triples**: Shows all triples used to answer the query

### Enhanced Semantic Search
- **Multi-strategy scoring**: Combines entity matching, predicate mapping, n-gram overlap, and question type detection
- **Fuzzy string matching**: Handles spelling variations and partial entity names using Jaccard similarity
- **Question type detection**: Automatically identifies "where", "when", "who", "what", "how many" questions
- **Confidence scoring**: Each answer includes a confidence percentage (0-99%)
- **Expanded predicate mapping**: 40+ keyword mappings with synonym support
- **N-gram analysis**: Bigram and trigram matching for better phrase understanding

## Documentation

📖 **[START HERE: Documentation Index](./INDEX.md)** - Find the right guide for your needs

### 📚 Comprehensive Guides
- **[GETTING_STARTED.md](./GETTING_STARTED.md)** - Quick 10-minute introduction for beginners
- **[EXAMPLES_AND_TUTORIALS.md](./EXAMPLES_AND_TUTORIALS.md)** - Step-by-step examples with real-world scenarios
  - Quick start examples (biographies, universities, companies)
  - Academic research scenarios
  - Historical events modeling
  - Advanced features walkthrough
  - Best practices and troubleshooting

- **[MULTI_HOP_REASONING.md](./MULTI_HOP_REASONING.md)** - Deep dive into multi-hop query support
  - How AND/OR queries work
  - Graph traversal algorithms
  - Pattern recognition
  - Examples and use cases
  - Limitations and future enhancements

- **[SEMANTIC_SEARCH_EXPLAINED.md](./SEMANTIC_SEARCH_EXPLAINED.md)** - Deep dive into how semantic search works
  - Visual architecture diagrams
  - Detailed scoring algorithm explanation
  - Before/after comparisons
  - Performance characteristics
  - Future improvements roadmap

### 🔧 Technical Documentation
- **[SEMANTIC_SEARCH_IMPROVEMENTS.md](./SEMANTIC_SEARCH_IMPROVEMENTS.md)** - Technical implementation details
- **[TESTING_SEMANTIC_SEARCH.md](./TESTING_SEMANTIC_SEARCH.md)** - Comprehensive test suite
- **[CHANGELOG_SEMANTIC_SEARCH.md](./CHANGELOG_SEMANTIC_SEARCH.md)** - Complete change history
- **[QUICK_REFERENCE.md](./QUICK_REFERENCE.md)** - Quick reference card for common tasks

## Tech stack

- React 18 (functional components + hooks)
- Pure SVG graph renderer with spring physics (no D3, no external graph lib)
- Zero backend — everything runs in the browser

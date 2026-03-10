# University of Auckland – Practical Learning Extensions

**⚠️ Important Disclaimer:** This section is designed for University of Auckland students and other learners worldwide. This repository is an **independent learning project** and is **NOT official University of Auckland course material**. It is not affiliated with or endorsed by the university. Use this as a supplementary learning tool to extend lecture concepts into practical implementations.

## Overview

This section shows how you can extend lecture concepts from the University of Auckland Master of Artificial Intelligence program into small, practical MVP-style projects using this repository. The goal is to transform theory into practice by building small, working products that deepen your understanding beyond the lecture hall.

**Key Principles:**
- Turn lecture theory into working code
- Build small MVP (Minimum Viable Product) projects
- Encourage experimentation and iteration
- Deepen understanding through hands-on implementation
- Create portfolio-worthy projects

---

## COMPSCI 713 – AI Fundamentals

**Course Focus:** Foundations of artificial intelligence, problem-solving, search algorithms, and knowledge representation.

**🎮 Interactive Demo:** [Wumpus World Game](https://nexageapps.github.io/AI/wumpus/) - Play the classic AI problem from Week 2: Symbolic Logic

| Lecture Topic | Practical Extension | Repository Resources |
|---------------|-------------------|----------------------|
| **Week 2: Symbolic Logic & Knowledge Representation** | **🎮 [Play Wumpus World](https://nexageapps.github.io/AI/wumpus/)** - Interactive visualization of the classic Wumpus World problem. Navigate a 4x4 grid using logical inference to avoid pits and the Wumpus while collecting gold. Demonstrates propositional logic, FOL formulas, and knowledge-based agents. | [Source Code](./application/compsci713/week2/wumpus/) |
| **Intelligent Agents** | Build a simple maze-solving agent using search algorithms (BFS/DFS). Create an interactive visualization showing how the agent explores the environment. | B01-B05 (Fundamentals), B14 (Projects) |
| **Search Algorithms** | Implement A* pathfinding for a game character. Build a visual demo where the agent navigates obstacles optimally. | B05 (Neural Networks), B14 (Projects) |
| **Knowledge Representation** | Create a simple knowledge base system that answers questions using rule-based logic. Extend it to learn new rules from examples. | B04-B05 (Classification), B14 (Projects) |
| **Game Playing** | Build a simple game AI (Tic-Tac-Toe or Connect Four) using minimax algorithm with alpha-beta pruning. | B05 (Neural Networks), B14 (Projects) |

**Example MVP Project:**
Create a **Smart Maze Solver** that uses search algorithms to find the shortest path through a maze. Visualize the search process in real-time, showing explored cells and the final path. Extend it to learn from multiple mazes and optimize its strategy.

**Featured Project - Wumpus World:**
An interactive React application demonstrating symbolic logic and knowledge representation from COMPSCI 713 Week 2. The game implements:
- **Propositional Logic:** `Breeze(x,y) ⟹ ∃adjacent(x',y'). Pit(x',y')`
- **First-Order Logic:** `∀x,y. Pit(x,y) ⟹ Breeze(adjacent cells)`
- **Knowledge-Based Agent:** Uses logical inference to navigate safely
- **Fog of War:** Agent only knows what it has explored
- **Real-time Scoring:** Track performance and decision-making

[Play Now](https://nexageapps.github.io/AI/wumpus/) | [View Source](./application/compsci713/week2/wumpus/) | [README](./application/compsci713/week2/wumpus/README.md)

#### Detailed Practical Examples

**Example 1: Intelligent Agent with Visualization**

**What You'll Build**: A maze-solving agent that uses BFS, DFS, and A* algorithms with real-time visualization showing how each algorithm explores the environment differently.

**Learning Outcomes**:
- Understand agent architecture and how agents perceive and act in environments
- Implement three core search algorithms from scratch
- Visualize exploration patterns to understand algorithm efficiency differences

**Technologies**:
- Python 3.8+
- pygame or matplotlib for visualization
- numpy for grid representation
- Optional: Jupyter Notebook for interactive exploration

**Implementation Steps**:
1. **Set up environment**: Create a Python project with pygame/matplotlib installed. Design a grid-based maze representation using numpy arrays (0 = open, 1 = wall, 2 = goal).
2. **Implement maze generator**: Create a simple maze generator or load pre-made mazes. Start with small 10x10 grids for testing.
3. **Build BFS algorithm**: Implement breadth-first search to find shortest path. Track visited cells and parent pointers for path reconstruction.
4. **Build DFS algorithm**: Implement depth-first search using a stack. Compare memory usage and path length with BFS.
5. **Build A* algorithm**: Implement A* with Manhattan distance heuristic. Observe how heuristics guide the search more efficiently.
6. **Create visualization**: Draw the maze, show explored cells in different colors, highlight the final path. Add real-time animation showing search progression.
7. **Compare algorithms**: Run all three on the same maze, display statistics (cells explored, path length, time taken). Create side-by-side visualizations.

**Common Challenges & Tips**:
- **Challenge**: Grid representation and coordinate systems
  - **Solution**: Use (row, col) consistently. Test with print statements before visualization. Create helper functions for neighbor finding.
- **Challenge**: Visualization performance with large grids
  - **Solution**: Start with 20x20 grids. Use pygame for better performance than matplotlib. Consider downsampling for display.
- **Challenge**: Understanding why A* is faster
  - **Solution**: Visualize the heuristic values. See how A* prioritizes cells closer to the goal. Compare explored cell counts.

**Repository Resources**: [B01](../Basic/B01%20-%20Arithmetic.ipynb) (Fundamentals), [B05](../Basic/B05%20-%20Neural%20Network%20Fundamentals.ipynb) (Data Structures), [B14](../Basic/B14%20-%20Projects.ipynb) (Project Guidance)

**Extension Ideas**:
- Add different heuristic functions (Euclidean, Chebyshev) and compare performance
- Implement bidirectional search starting from both start and goal
- Create a maze generator using recursive backtracking or Prim's algorithm
- Add obstacles that move dynamically and replan paths in real-time
- Implement Dijkstra's algorithm for weighted graphs

---

**Example 2: Knowledge-Based Question Answering System**

**What You'll Build**: A rule-based system that stores facts and rules, then answers questions using logical inference. Start simple with propositional logic, then extend to handle more complex queries.

**Learning Outcomes**:
- Implement knowledge bases to store facts and rules
- Create inference engines that apply rules to derive new facts
- Handle query parsing and answer retrieval
- Understand the difference between forward and backward chaining

**Technologies**:
- Python 3.8+
- JSON for knowledge base storage
- Optional: pyDatalog for more advanced logic programming
- Optional: Jupyter Notebook for interactive testing

**Implementation Steps**:
1. **Define knowledge schema**: Create a JSON structure for facts (e.g., `{"type": "fact", "subject": "Socrates", "predicate": "is_mortal"}`) and rules (e.g., `{"type": "rule", "if": "is_human", "then": "is_mortal"}`).
2. **Implement fact storage**: Build a simple database class that stores facts and rules. Add methods to add, remove, and query facts.
3. **Build inference engine**: Implement forward chaining - start with known facts and apply rules to derive new facts until no new facts can be derived.
4. **Create query interface**: Build a simple parser that converts natural language questions into queries. Implement backward chaining to answer "why" questions.
5. **Add rule conflict resolution**: Handle cases where multiple rules could apply. Implement priority or specificity-based resolution.
6. **Test with examples**: Create a knowledge base about animals (e.g., "All dogs are animals", "Fido is a dog"). Query it with questions like "Is Fido an animal?"
7. **Build interactive interface**: Create a simple command-line or web interface where users can add facts, define rules, and ask questions.

**Common Challenges & Tips**:
- **Challenge**: Rule conflict resolution and ambiguous queries
  - **Solution**: Start with simple, non-conflicting rules. Use rule priorities or timestamps. Document assumptions clearly.
- **Challenge**: Query parsing and natural language understanding
  - **Solution**: Start with structured queries (e.g., "Is X a Y?"). Use simple pattern matching. Gradually add complexity.
- **Challenge**: Knowledge base design and completeness
  - **Solution**: Start small with 5-10 facts and 3-5 rules. Test thoroughly. Document what the system knows and doesn't know.

**Repository Resources**: [B04](../Basic/B04%20-%20Multi-Class%20Classification.ipynb) (Logic and Classification), [B05](../Basic/B05%20-%20Neural%20Network%20Fundamentals.ipynb) (Reasoning), [B14](../Basic/B14%20-%20Projects.ipynb) (Project Guidance)

**Extension Ideas**:
- Add learning from examples - let the system discover new rules from data
- Implement uncertainty handling with confidence scores
- Create a web interface using Flask or Django
- Add support for first-order logic with variables and quantifiers
- Implement explanation generation - explain why a conclusion was reached

---

**Example 3: Game-Playing AI with Minimax**

**What You'll Build**: A Tic-Tac-Toe or Connect Four AI opponent using the minimax algorithm with alpha-beta pruning. Build a playable game where you compete against the AI.

**Learning Outcomes**:
- Understand adversarial search and game trees
- Implement minimax algorithm to find optimal moves
- Optimize with alpha-beta pruning to reduce search space
- Evaluate game states and implement heuristic evaluation functions

**Technologies**:
- Python 3.8+
- pygame for GUI (or simple terminal-based interface)
- numpy for board representation
- Optional: Jupyter Notebook for algorithm visualization

**Implementation Steps**:
1. **Create game logic**: Implement Tic-Tac-Toe or Connect Four rules. Represent the board as a numpy array. Implement move validation and win detection.
2. **Implement minimax algorithm**: Build recursive minimax function that explores all possible moves. Assign scores: +1 for AI win, -1 for human win, 0 for draw.
3. **Add alpha-beta pruning**: Optimize minimax by pruning branches that won't affect the final decision. Track alpha (best for maximizer) and beta (best for minimizer).
4. **Create evaluation function**: For deeper searches, implement heuristic evaluation (e.g., count potential winning lines). This allows searching deeper without exploring all moves.
5. **Build game interface**: Create a simple pygame GUI or terminal interface. Let human player make moves, then AI responds with minimax.
6. **Test and debug**: Play against the AI. Verify it makes optimal moves. Check that pruning actually reduces search nodes.
7. **Add difficulty levels**: Implement depth limits to create easier opponents. Shallow search = weaker AI, deep search = stronger AI.

**Common Challenges & Tips**:
- **Challenge**: State evaluation functions and heuristics
  - **Solution**: Start with simple evaluation (just win/loss/draw). Test with shallow searches first. Gradually add heuristics.
- **Challenge**: Pruning implementation and correctness
  - **Solution**: Implement minimax first without pruning. Verify it works. Then add pruning carefully. Compare results to ensure correctness.
- **Challenge**: Performance optimization and search depth
  - **Solution**: Profile your code to find bottlenecks. Use memoization to cache evaluated positions. Start with depth 4-6, increase gradually.

**Repository Resources**: [B05](../Basic/B05%20-%20Neural%20Network%20Fundamentals.ipynb) (Algorithm Design), [B14](../Basic/B14%20-%20Projects.ipynb) (Project Guidance)

**Extension Ideas**:
- Implement iterative deepening to search as deep as time allows
- Add Monte Carlo Tree Search as an alternative to minimax
- Create difficulty levels with different search depths
- Implement opening book - pre-computed optimal moves for early game
- Add time management - search deeper when you have more time

---

## COMPSCI 714 – AI Architecture and Design

See [COMPSCI 714 Detailed Practical Examples](./COMPSCI_714_EXTENSIONS.md)

---

## COMPSCI 762 – Machine Learning Foundations

See [COMPSCI 762 Detailed Practical Examples](./COMPSCI_762_EXTENSIONS.md)

---

## COMPSCI 703 – Generalising AI

See [COMPSCI 703 Detailed Practical Examples](./COMPSCI_703_EXTENSIONS.md)

---

## COMPSYS 721 – Deep Learning

See [COMPSYS 721 Detailed Practical Examples](./COMPSYS_721_EXTENSIONS.md)

---

## How to Use This Section

**Step 1: Choose Your Course**
- Select the course code that matches your current lecture topics
- Review the practical extensions that align with what you're learning

**Step 2: Pick a Project**
- Choose an extension that interests you
- Check the recommended repository resources

**Step 3: Build Your MVP**
- Start small – aim for a working prototype in 1-2 weeks
- Use the repository lessons as your foundation
- Implement the core functionality first, then iterate

**Step 4: Extend & Experiment**
- Add features and improvements
- Try different approaches and compare results
- Document your process and findings

**Step 5: Share Your Work**
- Create a GitHub repository for your project
- Write a clear README explaining your approach
- Share on LinkedIn and tag your classmates
- Add to your portfolio

---

## Tips for Success

**Connect Theory to Practice:**
- After each lecture, identify one concept you want to implement
- Use this repository's lessons to understand the theory
- Build a small project to apply what you learned
- Reflect on how the theory manifests in your code

**Build Incrementally:**
- Start with the simplest version that works
- Add complexity gradually
- Test and validate at each step
- Don't aim for perfection – aim for learning

**Experiment Fearlessly:**
- Try different architectures and hyperparameters
- Compare approaches and measure results
- Document what works and what doesn't
- Share your experiments with classmates

**Create Portfolio Projects:**
- These projects are perfect for your portfolio
- Employers love seeing practical implementations
- Document your process and learnings
- Showcase on GitHub and LinkedIn

---

## Important Reminders

**Academic Integrity:**
- Use this repository to **learn and understand** concepts
- Implement your own solutions from scratch
- Don't copy code directly into assignments
- Always cite sources and follow your institution's policies
- When in doubt, ask your instructor

**This is a Learning Tool:**
- These extensions are suggestions, not requirements
- Adapt them to your interests and learning style
- Work at your own pace
- Collaborate with classmates but do your own work

**Not Official Material:**
- This repository is independent and not affiliated with the University of Auckland
- It complements but does not replace official course materials
- Always refer to your course syllabus and instructor guidance
- Use responsibly and ethically

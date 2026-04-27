# COMPSCI 713 – AI Fundamentals: Complete Study Guide

**University of Auckland · Semester 1 2026**  
**Instructors:** Dr Thomas Lacombe · Dr Xinyu Zhang

> This guide maps every week of COMPSCI 713 to the relevant notebooks and interactive apps in this repository. Use it alongside your lectures, not instead of them.

---

## Course Overview

COMPSCI 713 examines the core concepts and techniques in AI, including breakthroughs in symbolic AI, machine learning, and neural networks. Topics span heuristic search, constraint satisfaction, knowledge representation, Bayesian inference, statistical machine learning, and connectionist neural networks that gave rise to deep learning.

Real-world applications are presented, with a focus on AI research in Aotearoa/NZ and ethical considerations.

The course is structured around four themes:

| Theme | Weeks | Focus |
|---|---|---|
| Foundations of Intelligence | W2–W5 | How machines represent and reason about the world |
| Learning & Adaptation | W6–W7 | How machines learn from data and interaction |
| Search & Decision Making | W8–W9 | How machines choose optimal actions |
| Embodied & Real-World AI | W6, W10–W11 | How AI acts in physical and societal environments |

---

## Assessment at a Glance

| Assessment | Lane | Weight |
|---|---|---|
| Individual Presentation (recording) | Lane 2 | 10% |
| Group Project (lit. review + workshops) | Lane 2 | 35% |
| Online Quizzes (5 × 1%) | Lane 2 | 5% |
| Mid-semester Test | Lane 1 | 20% |
| Final Exam | Lane 1 | 30% |

To pass the course you must obtain at least 50% overall **and** pass both the combined Lane 1 and Lane 2 components separately (25/50 each).

**Lane 1 (Controlled – no GenAI):** Mid-semester test (20%) + Final exam (30%) = 50%  
**Lane 2 (Uncontrolled – GenAI allowed responsibly):** Quizzes (5%) + Presentation (10%) + Group project (35%) = 50%

> For Lane 2, GenAI use must be responsible, ethical, and transparent. You cannot directly generate your presentation video or use an AI-generated voice.

---

## Key Dates

| Item | Date |
|---|---|
| Paper selection deadline (presentation) | Sunday 29 March |
| Workshop 1 – project proposal (6%) | 12 April |
| **Mid-semester test (20%)** | **Tuesday 28 April, 6:30 pm** |
| Workshop 2 – lit. review outline (6%) | 10 May |
| Individual presentation video (10%) | 17 May |
| Final lit. review report (23%) | 10 June |
| **Final Exam (30%)** | **Exam period (after Week 13)** |

---

## Week-by-Week Lesson Mapping

### Theme A – Foundations of Intelligence

#### Week 1 · Introduction to AI
**What is AI? Weak vs Strong AI. Course overview.**

| Repository Resource | Type |
|---|---|
| [B01 – Symbolic Logic Fundamentals](../Basic/B01%20-%20Symbolic%20Logic%20Fundamentals.ipynb) | Notebook |
| [Symbolic Logic Explorer](https://nexageapps.github.io/AI/symbolic-logic/) | Interactive App |

Key concepts:
- **AI defined:** simulation of human intelligence — learning, reasoning, problem-solving, perception, language
- **Weak (Narrow) AI:** designed for specific tasks only (Siri, Alexa, recommendation systems, image recognition); cannot generalise beyond its domain
- **Strong (General) AI:** human-level intelligence across all tasks; still largely theoretical and not yet achieved

---

#### Week 2 · Symbolic Logic
**Propositional logic, FOL, Logic Theorist, Logical Neural Networks**

| Repository Resource | Type |
|---|---|
| [B01 – Symbolic Logic Fundamentals](../Basic/B01%20-%20Symbolic%20Logic%20Fundamentals.ipynb) | Notebook |
| [Symbolic Logic Explorer](https://nexageapps.github.io/AI/symbolic-logic/) | Interactive App |
| [Wumpus World](https://nexageapps.github.io/AI/wumpus) | Interactive App |

Study focus:
- Propositional connectives (¬, ∧, ∨, →, ↔) and truth tables
- Inference rules: Modus Ponens, Modus Tollens, resolution
- First-Order Logic: predicates, quantifiers (∀, ∃), free/bound variables
- Kinship domain examples (Parent, Grandparent, Sibling)
- Connection to neural networks as logic gates

---

#### Week 3 · Knowledge Representation
**Ontologies, semantic networks, frames, RDF triples**

| Repository Resource | Type |
|---|---|
| [KG Playground](https://nexageapps.github.io/AI/compsci713/week3/kg-playground/) | Interactive App |
| [A03 – Retrieval-Augmented Generation (RAG)](../Advanced/A03%20-%20Retrieval-Augmented%20Generation%20(RAG).ipynb) | Notebook |

Study focus:
- RDF triples (subject–predicate–object)
- Knowledge graphs and ontologies
- Semantic search and multi-hop reasoning
- Connection to modern RAG systems

---

#### Week 4 · Expert Systems (MYCIN)
**Rule-based systems, decision trees, ID3 to XGBoost**

| Repository Resource | Type |
|---|---|
| [B04 – Multi-Class Classification](../Basic/B04%20-%20Multi-Class%20Classification.ipynb) | Notebook |
| [I05 – Transfer Learning and Fine-tuning](../Intermediate/I05%20-%20Transfer%20Learning%20and%20Fine-tuning.ipynb) | Notebook |

Study focus:
- IF-THEN rule bases and inference engines
- Decision tree induction (ID3 algorithm, information gain)
- Ensemble methods: bagging, boosting, XGBoost
- Certainty factors and uncertainty in expert systems

---

#### Week 5 · Soft Computing
**Bayesian reasoning, Fuzzy logic & control**

| Repository Resource | Type |
|---|---|
| [B07 – Model Evaluation and Performance Metrics](../Basic/B07%20-%20Model%20Evaluation%20and%20Performance%20Metrics.ipynb) | Notebook |
| [I02 – Regularization Techniques](../Intermediate/I02%20-%20Regularization%20Techniques.ipynb) | Notebook |

Study focus:
- Bayes' theorem and probabilistic inference
- Naive Bayes classifiers
- Fuzzy sets and membership functions
- Fuzzy control systems

---

### Theme B – Learning & Adaptation

#### Week 6 · Genetic Algorithms & Embodied AI
**NEAT, neuro-genetic control, robotics, swarms**

| Repository Resource | Type |
|---|---|
| [I13 – Multi-Task and Meta-Learning](../Intermediate/I13%20-%20Multi-Task%20and%20Meta-Learning.ipynb) | Notebook |
| [E07 – Meta-Learning and Few-Shot Learning](../Expert/E07%20-%20Meta-Learning%20and%20Few-Shot%20Learning.ipynb) | Notebook |

Study focus:
- Evolutionary computation: selection, crossover, mutation
- NEAT (NeuroEvolution of Augmenting Topologies)
- Layered robot control architectures (subsumption)
- Swarm intelligence: stigmergy, emergent behaviour

---

#### Week 7 · Workshop 2 *(No lecture – ANZAC Day observed)*
**Writing a literature review in AI**

Use this week to:
- Work on your group project literature review outline (due 10 May)
- Review Weeks 1–6 content for the mid-semester test (28 April)

---

### Theme C – Search & Decision Making

#### Week 8 · Deep Learning & Search Algorithms I
**AlphaGo, Deep Learning, Tree search, A\***

| Repository Resource | Type |
|---|---|
| [B05 – Neural Network Fundamentals](../Basic/B05%20-%20Neural%20Network%20Fundamentals.ipynb) | Notebook |
| [B05a – Neural Networks Theory](../Basic/B05a%20-%20Neural%20Networks%20Theory%20(COMPSCI%20714).ipynb) | Notebook |
| [B05b – Training and Optimization](../Basic/B05b%20-%20Training%20and%20Optimization%20(COMPSCI%20714).ipynb) | Notebook |
| [Neural Network Trainer](https://nexageapps.github.io/AI/nn-trainer/) | Interactive App |
| [Mountain Explorer (Gradient Descent)](https://nexageapps.github.io/AI/gradient-descent) | Interactive App |

Study focus:
- Deep neural network architecture and backpropagation
- How AlphaGo combines CNNs with MCTS
- Uninformed search: BFS, DFS
- Informed search: greedy best-first, A* algorithm
- Heuristic functions and admissibility

---

#### Week 9 · Search Algorithms II & Reinforcement Learning
**Adversarial search, MCTS, MDP, RL principles, intro to DRL**

| Repository Resource | Type |
|---|---|
| [E10 – Deep Reinforcement Learning](../Expert/E10%20-%20Deep%20Reinforcement%20Learning.ipynb) | Notebook |
| [E11 – Reinforcement Learning from Human Feedback (RLHF)](../Expert/E11%20-%20Reinforcement%20Learning%20from%20Human%20Feedback%20(RLHF).ipynb) | Notebook |

Study focus:
- Minimax algorithm and alpha-beta pruning
- Monte Carlo Tree Search (MCTS)
- Markov Decision Processes (MDPs): states, actions, rewards, transitions
- Q-learning and policy gradients
- Introduction to Deep RL (DQN)

---

### Theme D – Embodied & Real-World AI

#### Week 10 · AI and Sustainability: GraphCast
**Graph data, Graph Neural Networks**

| Repository Resource | Type |
|---|---|
| [A10 – ML Pipeline Architecture](../Advanced/A10%20-%20ML%20Pipeline%20Architecture.ipynb) | Notebook |
| [E14 – Efficient and Green AI](../Expert/E14%20-%20Efficient%20and%20Green%20AI.ipynb) | Notebook |

Study focus:
- Graph representation: nodes, edges, adjacency matrices
- Message passing in GNNs
- GraphCast for weather prediction
- Environmental cost of AI training

---

#### Week 11 · Sustainability in AI
**Self-supervised learning, Data Streams, Continual Learning**

| Repository Resource | Type |
|---|---|
| [E09 – Self-Supervised and Contrastive Learning](../Expert/E09%20-%20Self-Supervised%20and%20Contrastive%20Learning.ipynb) | Notebook |
| [E08 – Continual and Lifelong Learning](../Expert/E08%20-%20Continual%20and%20Lifelong%20Learning.ipynb) | Notebook |
| [A12 – Monitoring and Observability](../Advanced/A12%20-%20Monitoring%20and%20Observability.ipynb) | Notebook |

Study focus:
- Pretext tasks (rotation prediction, contrastive loss)
- SimCLR, MoCo, BYOL frameworks
- Concept drift in data streams
- Catastrophic forgetting and continual learning strategies
- Incremental vs batch learning

---

#### Week 12 · Paper Discussion Session
**Selected research paper presentations (6–7 papers)**

Use this week to:
- Prepare for the final exam
- Complete the group project final report (due 10 June)

---

## Mid-Semester Test Prep

**Date:** Tuesday 28 April, 6:30 pm · **Duration:** 60 min (55 + 5 reading) · **On paper**  
**Allowed:** Pen, Student ID, bottled water, one A4 two-sided handwritten notes sheet  
**Not allowed:** Calculators

**Topics (Weeks 1–6):**
- What is AI? Weak vs Strong AI definitions
- Propositional logic, FOL, inference rules (Modus Ponens, resolution)
- Knowledge representation: ontologies, RDF triples, frames
- Expert systems (MYCIN), rule bases, certainty factors
- Decision trees: ID3, information gain, XGBoost
- Bayesian inference, Naive Bayes, fuzzy logic
- Genetic algorithms: selection, crossover, mutation, NEAT
- Embodied AI: layered control, swarm intelligence

---

## Final Exam Prep

**Duration:** 2 hours · **On paper** · **On campus (room via SSO)**  
**Allowed:** Blue/black pen + spare, pencil, Student Campus Card ($25 fine without it), bottled water, one A4 two-sided handwritten notes sheet  
**Not allowed:** Calculators  
**Content:** All lectures except guest lectures + selected research papers (TBA)

**Additional topics (Weeks 7–12):**
- Deep learning and AlphaGo
- Uninformed search (BFS, DFS) and informed search (A*, heuristics)
- Adversarial search: minimax, alpha-beta pruning
- Monte Carlo Tree Search
- Markov Decision Processes and Q-learning
- Graph Neural Networks
- Self-supervised learning (pretext tasks, contrastive learning)
- Continual learning and catastrophic forgetting
- Data streams and concept drift

---

## Key Topics Checklist

The course covers these topics — tick each off as you feel confident:

**Foundations of Intelligence**
- [ ] Propositional logic and truth tables
- [ ] First-Order Logic (predicates, quantifiers ∀, ∃)
- [ ] Inference rules (Modus Ponens, Modus Tollens, resolution)
- [ ] Knowledge graphs and RDF triples
- [ ] Ontologies and semantic networks
- [ ] Expert systems and certainty factors (MYCIN)
- [ ] Decision trees (ID3, information gain, pruning)
- [ ] Ensemble methods (bagging, boosting, XGBoost)
- [ ] Bayesian inference and Naive Bayes
- [ ] Fuzzy sets and fuzzy control

**Learning & Adaptation**
- [ ] Genetic algorithms (selection, crossover, mutation)
- [ ] NEAT and neuro-evolution
- [ ] Layered robot control (subsumption architecture)
- [ ] Swarm intelligence

**Search & Decision Making**
- [ ] Deep neural networks (forward pass, backprop)
- [ ] Uninformed search (BFS, DFS)
- [ ] Informed search (A*, heuristics, admissibility)
- [ ] Minimax and alpha-beta pruning
- [ ] Monte Carlo Tree Search
- [ ] Markov Decision Processes
- [ ] Q-learning and policy gradients

**Embodied & Real-World AI**
- [ ] Graph Neural Networks (message passing)
- [ ] Self-supervised learning (pretext tasks, contrastive)
- [ ] Continual learning and catastrophic forgetting
- [ ] Data streams and concept drift

---

## Online Quizzes

5 timed MCQ quizzes (60 min each, 10 questions), released Friday morning, due Sunday night, approximately every 2 weeks. They cover the previous 2–3 weeks of content.

> The teaching team strongly recommends doing quizzes without GenAI — they are designed to check your understanding, not ChatGPT's. You won't have GenAI access in the test or exam.

---

## Communication

| Channel | Use |
|---|---|
| Canvas Announcements | Teaching team → students (check daily) |
| Ed Discussion Forum | General course questions, content, admin |
| Email | Specific/private/urgent requests |

Email tips: use `[CS713] subject` in the subject line, email the right person (coordinator for admin, lecturer for content), and check Canvas/Ed before emailing.

**Teaching Team:**
- Dr Thomas Lacombe – thomas.lacombe@auckland.ac.nz *(content: Weeks 8–12)*
- Dr Xinyu Zhang – xinyu.zhang@auckland.ac.nz *(content: Weeks 1–7)*
- Tutors: Zhongsheng Wang · Yuzhuo Li · Zhenyu Yin

---

## Workload

Lectures: Monday 12–1 pm and Thursday 2–4 pm, BLT100/106-100.

This is a 15-point course. Expect ~10 hours/week:
- 3 hours of lecture
- 4 hours of reading and thinking
- 3–4 hours on assignments/projects and test preparation

Total: ~150 hours over 15 weeks (36 lectures + 60 reading + 54 assignments).

---

*This guide is an independent student resource. It is not official University of Auckland material.*

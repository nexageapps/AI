# Guide for University of Auckland MAI Students

**How This Repository Complements Your MAI Journey**

---

**DISCLAIMER:** This guide is created by an independent student and is not officially affiliated with, endorsed by, or sponsored by the University of Auckland. This is a personal learning resource created by a current MAI student to share study strategies and materials with fellow students. Use of the University of Auckland name is solely to provide context about the author's academic program. Course references and study strategies are provided based on personal experience to help fellow students. Always refer to official course materials and consult with your professors for authoritative guidance. The content and opinions expressed here are solely those of the author and do not represent the views or policies of the University of Auckland.

---

## Table of Contents

- [Overview](#overview)
- [Quick Reference: Course Mapping](#quick-reference-course-mapping)
- [Learning Path Flowchart](#learning-path-flowchart)
- [Course-by-Course Guide](#course-by-course-guide)
- [Study Strategies](#study-strategies)
- [Integration with Assessments](#integration-with-assessments)
- [Common Challenges & Solutions](#common-challenges--solutions)
- [Resources](#resources)
- [FAQ](#frequently-asked-questions)

---

## Overview

This repository is designed by a fellow MAI student at the University of Auckland to complement your coursework and provide hands-on practice for the concepts you're learning in class. Think of it as your practical companion to the theoretical foundations taught in your courses.

**Key Benefits:**
- Practical implementations of lecture concepts
- Hands-on practice before assignments
- Reference code for projects and dissertation
- Portfolio-worthy capstone projects
- Exam preparation materials

---

## Quick Reference: Course Mapping

Use this table to quickly find which lessons support each course:

**Core Required Courses (60 points):**

| Course Code | Course Name | Relevant Lessons | Focus Area |
|-------------|-------------|------------------|------------|
| COMPSCI 712 | AI Agency, Ethics and Society | B06, B07, B14, B15 | Ethics & Bias |
| COMPSCI 713 | AI Fundamentals | B01-B05, B14 | Core Algorithms |
| COMPSCI 714 | AI Architecture and Design | B09-B11, B13-B15 | System Design |
| INFOSYS 703 | Information Systems | - | Systems Thinking |

**Research Project (45 points - Choose one path):**

| Course Code | Course Name | Relevant Lessons | Focus Area |
|-------------|-------------|------------------|------------|
| ENGGEN 769 + COMPSCI 792 | Research Project | B15 | Research & Thesis |
| ENGGEN 794 | Research Project | B15 | Research & Thesis |

**Required Internship (30 points):**

| Course Code | Course Name | Relevant Lessons | Focus Area |
|-------------|-------------|------------------|------------|
| COMPSCI 779 | Internship | B15 | Industry Experience |

**Elective Courses (15 points minimum from this group):**

| Course Code | Course Name | Relevant Lessons | Focus Area |
|-------------|-------------|------------------|------------|
| COMPSCI 703 | Generalising AI | B11-B13, B14, B15 | General AI |
| COMPSCI 764 | Advanced Topics | B06, B12 | Advanced Concepts |
| COMPSCI 769 | Natural Language Processing | B11-B13 | NLP |
| COMPSYS 726 | Machine Learning | B09-B13 | Deep Learning |

**Additional Electives (Up to 45 points):**

| Course Code | Course Name | Relevant Lessons | Focus Area |
|-------------|-------------|------------------|------------|
| COMPSCI 760-762 | Various Advanced Topics | B02-B07 | ML Theory |
| COMPSCI 765, 767, 773 | Specialized Topics | B09-B13 | Specialization |
| COMPSYS 728, 731, 732 | Computer Systems | B09-B11 | Systems |
| DIGIHLT 704 | Artificial Intelligence in Healthcare | B09-B15 | Healthcare AI |

**Program Structure:**
- **Total Points Required**: 180 points
- **Core Courses**: 60 points (CS712, CS713, CS714, INFOSYS703)
- **Research Project**: 45 points (ENGGEN769 + CS792 or ENGGEN794)
- **Internship**: 30 points (CS779)
- **Electives**: 45 points (15 points minimum from specific courses + up to 45 from broader list)

**Recommended Study Order:**
1. **COMPSCI 713 (Fundamentals)** - CRITICAL: Build strong foundations first
2. **COMPSCI 714 (Architecture)** - CRITICAL: Core deep learning architectures
3. COMPSCI 712 (Ethics) - Understand responsible AI principles
4. INFOSYS 703 (Information Systems) - Systems thinking
5. Electives: COMPSCI 703, 764, 769, COMPSYS 726, etc.
6. COMPSCI 779 (Internship) - Industry experience
7. Research Project: ENGGEN 769 + COMPSCI 792 or ENGGEN 794

**Why CS713 and CS714 are Critical:**
- **CS713**: Foundation for all other courses - covers essential ML algorithms
- **CS714**: Core architectures (CNNs, RNNs, Transformers) used throughout the program
- These two courses provide the practical and architectural knowledge needed for success in all advanced courses

---

## Learning Path Flowchart

**Your Complete MAI Journey Visualized (180 Points)**

```mermaid
graph TB
    Start([START MAI PROGRAM<br/>University of Auckland<br/>180 Points Total]):::startNode
    
    subgraph Core["CORE REQUIRED - 60 Points"]
        direction TB
        CS712["COMPSCI 712<br/>AI Ethics & Society<br/>15 points<br/>Lessons: B06, B07"]:::required
        CS713["COMPSCI 713<br/>AI Fundamentals<br/>15 points<br/>Lessons: B01-B05"]:::required
        CS714["COMPSCI 714<br/>AI Architecture<br/>15 points<br/>Lessons: B09-B11, B13"]:::required
        INFOSYS703["INFOSYS 703<br/>Information Systems<br/>15 points"]:::required
    end
    
    subgraph Electives["ELECTIVES - 45 Points Total"]
        direction TB
        Elective1["15 points minimum from:<br/>CS703, CS764, CS769<br/>COMPSYS726<br/>Lessons: B11-B13"]:::elective
        Elective2["Up to 45 points from:<br/>CS760-762, CS765, CS767<br/>COMPSYS728, 731, 732<br/>DIGIHLT704<br/>Lessons: B02-B13"]:::elective
    end
    
    subgraph Experience["PRACTICAL EXPERIENCE - 75 Points"]
        direction TB
        Internship["COMPSCI 779<br/>Internship<br/>30 points<br/>Industry Experience"]:::internship
        Research["Research Project<br/>45 points<br/>ENGGEN769 + CS792<br/>or ENGGEN794<br/>Lessons: B15"]:::research
    end
    
    subgraph Practice["CONTINUOUS PRACTICE"]
        direction LR
        B14["B14 Assignments<br/>10 projects<br/>Weekly practice"]:::practice
        B15["B15 Capstone<br/>5 portfolio projects<br/>Research preparation"]:::practice
    end
    
    Start ==> CS713
    Start ==> CS712
    CS713 ==> CS714
    CS712 --> INFOSYS703
    CS713 --> INFOSYS703
    
    CS714 ==> Elective1
    INFOSYS703 --> Elective1
    Elective1 --> Elective2
    
    CS714 -.-> B14
    Elective1 -.-> B14
    Elective2 -.-> B14
    
    B14 --> B15
    Elective2 --> Internship
    B15 --> Research
    Internship --> Research
    
    classDef startNode fill:#2E7D32,stroke:#1B5E20,stroke-width:4px,color:#fff,font-size:16px,font-weight:bold
    classDef required fill:#E91E63,stroke:#AD1457,stroke-width:4px,color:#fff,font-size:14px,font-weight:bold
    classDef elective fill:#2196F3,stroke:#0D47A1,stroke-width:3px,color:#fff,font-size:13px
    classDef internship fill:#FF9800,stroke:#E65100,stroke-width:4px,color:#fff,font-size:14px,font-weight:bold
    classDef research fill:#9C27B0,stroke:#6A1B9A,stroke-width:4px,color:#fff,font-size:14px,font-weight:bold
    classDef practice fill:#00BCD4,stroke:#006064,stroke-width:3px,color:#fff,font-size:13px
```

**Color Legend:**
- **Green**: Program start - 180 points total
- **Pink/Red**: Core Required (60 points) - CS712, CS713, CS714, INFOSYS703
- **Blue**: Electives (45 points) - Choose from approved list
- **Orange**: Internship (30 points) - CS779 industry experience
- **Purple**: Research Project (45 points) - Thesis/dissertation
- **Cyan**: Practice - B14 assignments and B15 capstone projects

**Connection Types:**
- **Solid thick arrows (==>)**: Primary learning path - follow these first
- **Solid thin arrows (-->)**: Secondary connections - important relationships
- **Dotted lines (-..->)**: Practice opportunities - apply your knowledge continuously

**180-Point Program Breakdown:**
- **Core Required (60 points)**: CS712, CS713, CS714, INFOSYS703
- **Electives (45 points)**: 15 points minimum from CS703/764/769/COMPSYS726, up to 45 from broader list
- **Internship (30 points)**: CS779 industry experience
- **Research Project (45 points)**: ENGGEN769 + CS792 or ENGGEN794

**Critical Path:**
1. Start with CS713 (Fundamentals) and CS712 (Ethics)
2. Complete CS714 (Architecture) - builds on CS713
3. Take INFOSYS703 and begin electives
4. Complete CS779 (Internship) for industry experience
5. Finish with Research Project (45 points) - your thesis/dissertation

---

## Course-by-Course Guide

### COMPSCI 712: AI Agency, Ethics and Society

**Course Focus:** Philosophical and ethical foundations of AI

**Repository Coverage:**
- B06 - Data Preprocessing (Understanding bias in data)
- B07 - Model Evaluation (Fairness metrics)
- B14 - Practical Projects (Bias detection assignments)
- B15 - Capstone Projects (Ethical AI system design)

**Weekly Study Plan:**

| Week | Lecture Topics | Repository Work | Deliverables |
|------|---------------|-----------------|--------------|
| 1-3 | AI Ethics Foundations | Review B06 (Data Bias) | Bias analysis report |
| 4-6 | Fairness & Accountability | Complete B07 (Fairness Metrics) | Fairness evaluation |
| 7-9 | Privacy & Consent | B14 Assignment (Bias Detection) | Implementation |
| 10-12 | Societal Impact | B15 Project Planning | Project proposal |

**How to Use:**
1. Before lectures: Read relevant sections in B06/B07
2. During semester: Apply concepts to detect bias in datasets
3. For assignments: Use B14 ethical AI assignments as practice
4. For projects: Build responsible AI systems using B15 guidelines

**What to Add for Assignments:**
- Ethical analysis frameworks
- Case studies of AI failures
- Regulatory compliance (GDPR, AI Act)
- Stakeholder impact assessments

---

### COMPSCI 713: AI Fundamentals

**Course Focus:** Core AI/ML algorithms and foundations

**Repository Coverage:**
- B01 - Arithmetic (TensorFlow fundamentals)
- B02 - Linear Regression (Gradient descent)
- B03 - Binary Classification (Classification basics)
- B04 - Multi-Class Classification (Softmax)
- B05 - Neural Networks (MLPs, backpropagation)
- B14 - Assignments 1-5 (Fundamentals practice)

**Learning Progression:**

```mermaid
graph LR
    B01["B01<br/>Tensors &<br/>Operations"]:::foundation --> B02["B02<br/>Linear<br/>Regression"]:::foundation
    B02 --> B03["B03<br/>Binary<br/>Classification"]:::intermediate
    B03 --> B04["B04<br/>Multi-Class<br/>Classification"]:::intermediate
    B04 --> B05["B05<br/>Neural<br/>Networks"]:::advanced
    B05 --> B14["B14<br/>Practice<br/>Assignments"]:::practice
    
    classDef foundation fill:#4CAF50,stroke:#2E7D32,stroke-width:3px,color:#fff,font-size:14px
    classDef intermediate fill:#FF9800,stroke:#E65100,stroke-width:3px,color:#fff,font-size:14px
    classDef advanced fill:#2196F3,stroke:#1565C0,stroke-width:3px,color:#fff,font-size:14px
    classDef practice fill:#9C27B0,stroke:#6A1B9A,stroke-width:4px,color:#fff,font-size:14px,font-weight:bold
```

**Progression Colors:**
- **Green**: Foundation - Start here (B01-B02)
- **Orange**: Intermediate - Building skills (B03-B04)
- **Blue**: Advanced - Deep concepts (B05)
- **Purple**: Practice - Apply everything (B14)

**Weekly Study Plan:**

| Week | Topics | Repository Work | Practice |
|------|--------|-----------------|----------|
| 1-2 | Tensors & Linear Models | B01-B02 | B14 Assignment 1 |
| 3-4 | Classification Basics | B03-B04 | B14 Assignment 2-3 |
| 5-6 | Neural Networks | B05 | B14 Assignment 4-5 |
| 7-8 | Review & Practice | All lessons | Complete all B14 |

**How to Use:**
1. Complete B01-B05 sequentially before lectures
2. Implement algorithms from scratch (no high-level APIs)
3. Use B14 assignments for practice before course assignments
4. Focus on understanding, not just running code

**What to Add for Assignments:**
- Mathematical derivations
- Complexity analysis (Big O notation)
- Comparison with theoretical bounds
- Algorithm variations

---

### COMPSCI 714: AI Architecture and Design

**Course Focus:** Designing and implementing AI system architectures

**Repository Coverage:**
- B09 - CNNs (Computer vision architectures)
- B10 - RNNs (Sequential architectures)
- B11 - Transformers (Modern architectures)
- B13 - Language Model (End-to-end system)
- B14 - Assignments 6-10 (Architecture practice)
- B15 - Capstone Projects (System design)

**Architecture Design Process:**

```mermaid
graph TD
    Problem["Define Problem<br/>What are we solving?"]:::start
    Requirements["Gather Requirements<br/>Performance, constraints, data"]:::step
    Design["Architecture Design<br/>Choose model type"]:::design
    Implement["Implementation<br/>Build the system"]:::implement
    Evaluate["Evaluation<br/>Test & measure"]:::evaluate
    Deploy["Deployment<br/>Production ready"]:::deploy
    
    Problem --> Requirements
    Requirements --> Design
    Design --> Implement
    Implement --> Evaluate
    Evaluate --> Deploy
    
    Design -.->|"Vision Tasks"| B09["B09: CNN<br/>Architectures<br/>Images"]:::cnn
    Design -.->|"Sequential Data"| B10["B10: RNN<br/>Architectures<br/>Time Series"]:::rnn
    Design -.->|"Modern NLP"| B11["B11: Transformer<br/>Architectures<br/>Language"]:::transformer
    
    Implement -.->|"End-to-End"| B13["B13: Complete<br/>System<br/>Full Pipeline"]:::system
    Deploy -.->|"Production"| B15["B15: Deployment<br/>Strategies<br/>Cloud Ready"]:::production
    
    classDef start fill:#E91E63,stroke:#AD1457,stroke-width:4px,color:#fff,font-size:14px,font-weight:bold
    classDef step fill:#FF9800,stroke:#E65100,stroke-width:3px,color:#fff,font-size:13px
    classDef design fill:#9C27B0,stroke:#6A1B9A,stroke-width:3px,color:#fff,font-size:13px
    classDef implement fill:#3F51B5,stroke:#1A237E,stroke-width:3px,color:#fff,font-size:13px
    classDef evaluate fill:#00BCD4,stroke:#006064,stroke-width:3px,color:#fff,font-size:13px
    classDef deploy fill:#4CAF50,stroke:#2E7D32,stroke-width:4px,color:#fff,font-size:13px,font-weight:bold
    classDef cnn fill:#FF5722,stroke:#BF360C,stroke-width:2px,color:#fff,font-size:12px
    classDef rnn fill:#673AB7,stroke:#311B92,stroke-width:2px,color:#fff,font-size:12px
    classDef transformer fill:#2196F3,stroke:#0D47A1,stroke-width:2px,color:#fff,font-size:12px
    classDef system fill:#FFC107,stroke:#F57C00,stroke-width:2px,color:#000,font-size:12px
    classDef production fill:#8BC34A,stroke:#558B2F,stroke-width:2px,color:#fff,font-size:12px
```

**Process Flow Colors:**
- **Pink**: Problem definition - Start here
- **Orange**: Requirements gathering
- **Purple**: Design phase - Critical decisions
- **Blue**: Implementation - Build it
- **Cyan**: Evaluation - Test it
- **Green**: Deployment - Ship it

**Architecture References:**
- **CNN (Red)**: For image/vision tasks
- **RNN (Purple)**: For sequential/time-series data
- **Transformer (Blue)**: For modern NLP tasks
- **Complete System (Yellow)**: End-to-end implementation
- **Production (Green)**: Deployment strategies

**Weekly Study Plan:**

| Week | Topics | Repository Work | Deliverables |
|------|--------|-----------------|--------------|
| 1-3 | CNN Architectures | B09 Deep Dive | Architecture analysis |
| 4-6 | RNN & Transformers | B10-B11 | Comparison report |
| 7-9 | System Design | B13 Implementation | Working system |
| 10-12 | Deployment | B15 Project | Deployed model |

**How to Use:**
1. Study architecture choices in each notebook
2. Understand trade-offs (accuracy vs speed, memory vs performance)
3. Use B15 projects as templates for course projects
4. Document design decisions

**What to Add for Assignments:**
- Architecture justification
- Design trade-off analysis
- Scalability considerations
- Performance benchmarking
- Alternative architecture comparisons

---

### COMPSCI 761: Advanced Topics in Artificial Intelligence

**Course Focus:** Knowledge representation, search, and advanced AI

**Repository Coverage:**
- B06 - Data Preprocessing (Feature representation)
- B12 - Byte Pair Encoding (Text representation)
- B14 - Assignment 9 (Custom tokenizer)
- B15 - Capstone Projects (Advanced applications)

**Weekly Study Plan:**

| Week | Topics | Repository Work | Focus |
|------|--------|-----------------|-------|
| 1-3 | Feature Representation | B06 | Feature engineering |
| 4-6 | Text Representation | B12 | Tokenization |
| 7-9 | Custom Implementation | B14 Assignment 9 | BPE from scratch |
| 10-12 | Advanced Topics | Lectures + B15 | Research project |

**How to Use:**
1. Focus on representation techniques
2. Understand how knowledge is encoded
3. Build custom representations for your domain
4. Connect to search and planning algorithms from lectures

**What to Add for Assignments:**
- Search algorithm implementations
- Knowledge base design
- Heuristic function development
- Planning and reasoning systems

---

### COMPSCI 762: Foundations of Machine Learning

**Course Focus:** Theoretical foundations and core ML algorithms

**Repository Coverage:**
- B02 - Linear Regression (Regression theory)
- B03 - Binary Classification (Classification theory)
- B04 - Multi-Class Classification (Multi-class methods)
- B05 - Neural Networks (Deep learning foundations)
- B07 - Model Evaluation (Metrics and validation)
- B14 - Assignments 1-5 (ML fundamentals)

**Theory to Practice Bridge:**

```mermaid
graph LR
    Theory["Lecture<br/>Theory &<br/>Concepts"]:::theory --> Understand["Understand<br/>Core Ideas"]:::understand
    Understand --> Implement["Repository<br/>Implementation<br/>& Code"]:::implement
    Implement --> Experiment["Experiment<br/>Modify &<br/>Test"]:::experiment
    Experiment --> Master["Master<br/>Complete<br/>Understanding"]:::master
    
    classDef theory fill:#E91E63,stroke:#AD1457,stroke-width:3px,color:#fff,font-size:14px
    classDef understand fill:#FF9800,stroke:#E65100,stroke-width:3px,color:#fff,font-size:14px
    classDef implement fill:#2196F3,stroke:#0D47A1,stroke-width:3px,color:#fff,font-size:14px
    classDef experiment fill:#9C27B0,stroke:#6A1B9A,stroke-width:3px,color:#fff,font-size:14px
    classDef master fill:#4CAF50,stroke:#2E7D32,stroke-width:4px,color:#fff,font-size:14px,font-weight:bold
```

**Learning Cycle:**
- **Pink**: Theory from lectures - Learn concepts
- **Orange**: Understanding - Process information
- **Blue**: Implementation - Code it yourself
- **Purple**: Experimentation - Modify and explore
- **Green**: Mastery - Complete understanding achieved

**Weekly Study Plan:**

| Week | Theory (Lectures) | Practice (Repository) | Integration |
|------|-------------------|----------------------|-------------|
| 1-2 | Linear Models | B02 Implementation | Compare theory vs code |
| 3-4 | Classification | B03-B04 | Derive loss functions |
| 5-7 | Neural Networks | B05 | Backprop derivation |
| 8-10 | Evaluation | B07 | Metric analysis |
| 11-12 | Review | B14 All Assignments | Exam prep |

**How to Use:**
1. Attend lectures for theory
2. Implement concepts using repository code
3. Derive mathematical foundations
4. Use B14 for exam preparation

**What to Add for Assignments:**
- Theoretical analysis and proofs
- Comparison with research papers
- Novel variations or improvements
- Computational learning theory connections

---

### COMPSCI 703: Generalising Artificial Intelligence

**Course Focus:** Building general AI systems, NLP, and reasoning

**Repository Coverage:**
- B11 - Transformers (NLP foundations)
- B12 - BPE (Tokenization)
- B13 - Language Model (General AI system)
- B14 - Assignments 8-10 (NLP practice)
- B15 - Capstone Projects (Research projects)

**Weekly Study Plan:**

| Week | Topics | Repository Work | Output |
|------|--------|-----------------|--------|
| 1-3 | Attention Mechanisms | B11 | Attention implementation |
| 4-6 | Tokenization | B12 | Custom tokenizer |
| 7-9 | Language Models | B13 | Mini GPT |
| 10-12 | Research Project | B15 | Dissertation proposal |

**How to Use:**
1. Understand how specialized systems contribute to general AI
2. Build complete language model (B13)
3. Extend for multi-task learning
4. Use as foundation for dissertation

**What to Add for Assignments:**
- Planning and reasoning implementations
- Natural language understanding systems
- Knowledge acquisition methods
- Multi-task learning approaches

---

### COMPSYS 721: Machine Intelligence and Deep Learning

**Course Focus:** Deep neural networks and cutting-edge architectures

**Repository Coverage:**
- B09 - CNNs (Computer vision)
- B10 - RNNs (Sequential data)
- B11 - Transformers (Modern NLP)
- B13 - Language Model (Complete implementation)
- B14 - Assignments 6-10 (Deep learning practice)

**Deep Learning Architecture Evolution:**

```mermaid
graph TD
    Traditional["Traditional ML<br/>Linear Models<br/>Decision Trees"]:::traditional
    CNN["CNNs<br/>B09<br/>Computer Vision"]:::cnn
    RNN["RNNs/LSTMs<br/>B10<br/>Sequential Data"]:::rnn
    Attention["Attention<br/>B11<br/>Focus Mechanism"]:::attention
    Transformer["Transformers<br/>B11<br/>Modern Architecture"]:::transformer
    LLM["Language Models<br/>B13<br/>GPT-style Systems"]:::llm
    
    Traditional --> CNN
    Traditional --> RNN
    CNN --> Attention
    RNN --> Attention
    Attention --> Transformer
    Transformer --> LLM
    
    classDef traditional fill:#9E9E9E,stroke:#616161,stroke-width:2px,color:#fff,font-size:13px
    classDef cnn fill:#FF5722,stroke:#BF360C,stroke-width:3px,color:#fff,font-size:13px
    classDef rnn fill:#673AB7,stroke:#311B92,stroke-width:3px,color:#fff,font-size:13px
    classDef attention fill:#FF9800,stroke:#E65100,stroke-width:3px,color:#fff,font-size:13px
    classDef transformer fill:#2196F3,stroke:#0D47A1,stroke-width:4px,color:#fff,font-size:14px,font-weight:bold
    classDef llm fill:#4CAF50,stroke:#2E7D32,stroke-width:4px,color:#fff,font-size:14px,font-weight:bold
```

**Architecture Evolution:**
- **Gray**: Traditional ML - Where we started
- **Red**: CNNs (B09) - Vision revolution
- **Purple**: RNNs (B10) - Sequential processing
- **Orange**: Attention (B11) - Focus mechanism
- **Blue**: Transformers (B11) - Modern breakthrough
- **Green**: LLMs (B13) - Current state-of-the-art

**Evolution Path:**
Traditional methods → Specialized architectures (CNN/RNN) → Attention mechanism → Transformers → Large Language Models

**Weekly Study Plan:**

| Week | Architecture | Repository Work | Project |
|------|-------------|-----------------|---------|
| 1-3 | CNNs | B09 + Experiments | Image classifier |
| 4-6 | RNNs | B10 + Experiments | Sequence model |
| 7-9 | Transformers | B11 + Experiments | Attention model |
| 10-12 | Complete System | B13 | Language model |

**How to Use:**
1. Implement each architecture from scratch
2. Experiment with hyperparameters
3. Compare architectures on same task
4. Use B14 assignments for practice

**What to Add for Assignments:**
- Literature review of recent papers
- Ablation studies
- Performance optimization
- Novel architecture variations
- Research contribution

---

## Study Strategies

### Semester Planning

```mermaid
gantt
    title MAI Study Plan - Updated Course Schedule
    dateFormat YYYY-MM-DD
    section Preparation
    Complete B01-B07           :prep1, 2026-01-01, 21d
    Setup Environment          :prep2, 2026-01-01, 7d
    
    section Semester 1
    COMPSCI 712 (Ethics)       :s1c1, 2026-02-01, 84d
    COMPSCI 713 (Fundamentals) :s1c2, 2026-02-01, 84d
    COMPSCI 714 (Architecture) :s1c3, 2026-02-01, 84d
    COMPSCI 762 (ML Theory)    :s1c4, 2026-02-15, 70d
    B14 Assignments 1-7        :s1p1, 2026-02-01, 84d
    
    section Mid-Year Break
    B09-B13 Deep Learning      :break1, 2026-05-01, 21d
    Review & Consolidate       :break2, 2026-05-15, 14d
    
    section Semester 2
    COMPSYS 721 (Deep Learning):s2c1, 2026-06-01, 84d
    COMPSCI 703 (General AI)   :s2c2, 2026-06-01, 84d
    COMPSCI 761 (Advanced AI)  :s2c3, 2026-06-15, 70d
    B14 Assignments 8-10       :s2p1, 2026-06-01, 84d
    B15 Capstone Project       :s2p2, 2026-07-01, 60d
```

**Key Changes:**
- **Semester 1**: COMPSCI 712, 713, 714, and 762 (4 courses)
- **Semester 2**: COMPSYS 721, COMPSCI 703, and 761 (3 courses)
- **Mid-Year Break**: Focus on B09-B13 to prepare for Semester 2

### Time Management

**Semester 1 Weekly Schedule (4 Courses):**

| Day | Morning (9-12) | Afternoon (1-4) | Evening (7-9) |
|-----|---------------|-----------------|---------------|
| Mon | CS712 + CS713 Lectures | Repository Practice (B01-B05) | Review & Notes |
| Tue | CS714 + CS762 Lectures | Assignment Work | B14 Practice (1-5) |
| Wed | CS712 + CS713 Lectures | Repository Practice (B06-B07) | Study Group |
| Thu | CS714 + CS762 Lectures | Architecture Practice (B09-B11) | Review & Notes |
| Fri | Catch-up Lectures | Repository Practice | B14 Practice (6-7) |
| Sat | Project Work | B13 Language Model | Free Time |
| Sun | Review Week | Prepare Next Week | Free Time |

**Semester 2 Weekly Schedule (3 Courses):**

| Day | Morning (9-12) | Afternoon (1-4) | Evening (7-9) |
|-----|---------------|-----------------|---------------|
| Mon | CS721 + CS703 Lectures | Deep Learning Practice | Review & Notes |
| Tue | CS761 Lectures | Assignment Work | B14 Practice (8-10) |
| Wed | CS721 + CS703 Lectures | Repository Practice | Study Group |
| Thu | CS761 Lectures | Advanced Topics | Review & Notes |
| Fri | Catch-up Lectures | Repository Practice | B14 Practice |
| Sat | B15 Capstone Project | Portfolio Building | Free Time |
| Sun | Review Week | Prepare Next Week | Free Time |

**Daily Habits:**
- 30 min: Code practice (repository)
- 10 min: Review previous concepts
- 20 min: Read ML articles/papers
- 10 min: Participate in discussions

**Semester 1 Focus (Heavy Load):**
- **CS712 (Ethics)**: B06-B07 for bias and fairness
- **CS713 (Fundamentals)**: B01-B05 for core concepts
- **CS714 (Architecture)**: B09-B11, B13 for deep learning
- **CS762 (ML Theory)**: B02-B07 for theoretical foundations
- **Practice**: B14 Assignments 1-7

**Semester 2 Focus (Lighter Load + Capstone):**
- **CS721 (Deep Learning)**: B09-B13 for neural networks
- **CS703 (General AI)**: B11-B13 for transformers and LLMs
- **CS761 (Advanced AI)**: B06, B12 for advanced topics
- **Practice**: B14 Assignments 8-10
- **Portfolio**: B15 Capstone Projects

---

## Integration with Assessments

### Assignment Workflow

```mermaid
graph TD
    Receive["Receive Assignment<br/>Read requirements"]:::start
    Review["Review Related<br/>Repository Lessons<br/>Find relevant code"]:::review
    Understand["Understand<br/>Requirements<br/>Break down tasks"]:::understand
    Reference["Use Code as<br/>Reference<br/>Learn patterns"]:::reference
    Implement["Implement Your<br/>Solution<br/>Write original code"]:::implement
    Test["Test & Debug<br/>Fix issues"]:::test
    Document["Document<br/>Approach<br/>Explain decisions"]:::document
    Submit["Submit<br/>On time!"]:::submit
    
    Receive --> Review
    Review --> Understand
    Understand --> Reference
    Reference --> Implement
    Implement --> Test
    Test --> Document
    Document --> Submit
    
    Test -.->|"Issues Found"| Reference
    
    classDef start fill:#E91E63,stroke:#AD1457,stroke-width:4px,color:#fff,font-size:14px,font-weight:bold
    classDef review fill:#FF9800,stroke:#E65100,stroke-width:3px,color:#fff,font-size:13px
    classDef understand fill:#FFC107,stroke:#F57C00,stroke-width:3px,color:#000,font-size:13px
    classDef reference fill:#2196F3,stroke:#0D47A1,stroke-width:3px,color:#fff,font-size:13px
    classDef implement fill:#9C27B0,stroke:#6A1B9A,stroke-width:3px,color:#fff,font-size:13px
    classDef test fill:#00BCD4,stroke:#006064,stroke-width:3px,color:#fff,font-size:13px
    classDef document fill:#673AB7,stroke:#311B92,stroke-width:3px,color:#fff,font-size:13px
    classDef submit fill:#4CAF50,stroke:#2E7D32,stroke-width:4px,color:#fff,font-size:14px,font-weight:bold
```

**Workflow Steps:**
- **Pink**: Start - Receive assignment
- **Orange**: Review - Find relevant lessons
- **Yellow**: Understand - Break down requirements
- **Blue**: Reference - Learn from examples
- **Purple**: Implement - Write your code
- **Cyan**: Test - Debug and fix
- **Dark Purple**: Document - Explain your work
- **Green**: Submit - Complete!

**Pro Tip:** If testing reveals issues, loop back to reference materials before re-implementing.

### Dissertation Planning

**Timeline:**

| Phase | Duration | Repository Support | Deliverables |
|-------|----------|-------------------|--------------|
| Topic Selection | Week 1-2 | Browse B15 projects | Topic proposal |
| Literature Review | Week 3-6 | Review related lessons | Literature survey |
| Implementation | Week 7-14 | Use B13/B15 as templates | Working system |
| Experiments | Week 15-18 | Apply B07 evaluation | Results |
| Writing | Week 19-24 | Document approach | Thesis draft |
| Revision | Week 25-26 | Final improvements | Final thesis |

---

## Common Challenges & Solutions

### Challenge Matrix

| Challenge | Symptoms | Repository Solution | Additional Help |
|-----------|----------|-------------------|-----------------|
| Math overwhelming | Can't follow derivations | Focus on B01-B05 intuition first | Khan Academy |
| Code not working | Errors, wrong outputs | Compare with notebooks | Office hours |
| Falling behind | Missing deadlines | Use notebooks for quick review | Study groups |
| Concepts abstract | Can't visualize | Study all plots in notebooks | Draw diagrams |
| Forgetting material | Poor exam performance | Spaced repetition with B14 | Flashcards |

---

## Resources

### University of Auckland Resources

- **Course Forums**: Canvas discussion boards
- **Office Hours**: Check course outlines
- **Study Spaces**: Kate Edger Information Commons, Science Library
- **HPC Cluster**: Apply for access for large model training
- **Writing Support**: Student Learning Services

### Online Communities

- **r/MachineLearning**: Latest research discussions
- **Papers with Code**: Research implementations
- **Kaggle**: Competitions and datasets
- **GitHub**: Open-source projects

### Recommended Reading

**Essential Books:**
- **"Artificial Intelligence: A Modern Approach"** by Stuart Russell and Peter Norvig
  - The definitive AI textbook used in CS713 and CS714
  - Comprehensive coverage of AI fundamentals, search, logic, and learning
  - [Available online](http://aima.cs.berkeley.edu/)
- **"Deep Learning"** by Ian Goodfellow, Yoshua Bengio, and Aaron Courville
  - In-depth coverage of neural networks and deep learning
  - Essential for CS721 and CS714
  - [Free online version](http://www.deeplearningbook.org/)
- **"Pattern Recognition and Machine Learning"** by Christopher Bishop
  - Strong theoretical foundations for CS762
  - Probabilistic perspective on machine learning
- **Course-specific readings**: Check your course syllabi for required texts

**Supplementary Books:**
- "Hands-On Machine Learning" by Aurélien Géron - Practical implementations
- "Neural Networks and Deep Learning" by Michael Nielsen - Intuitive explanations
- "Speech and Language Processing" by Jurafsky & Martin - For NLP in CS703

**Research Papers:**
- "Attention Is All You Need" (Transformers) - Vaswani et al., 2017
- "BERT: Pre-training of Deep Bidirectional Transformers" - Devlin et al., 2018
- "Language Models are Few-Shot Learners" (GPT-3) - Brown et al., 2020
- Recent papers from NeurIPS, ICML, ICLR, ACL conferences

---

## Frequently Asked Questions

### Q: Should I complete this repo before starting MAI?
**A:** Not necessary, but B01-B07 will give you a strong foundation. Focus on B01-B04 if you're new to ML.

### Q: Can I use code from this repo in my assignments?
**A:** Use it as reference and learning material, but write your own implementations. Understand the concepts, don't copy-paste. Always cite sources.

### Q: How much time should I spend on this repo?
**A:** 3-5 hours per week alongside your coursework. Prioritize your course assignments first.

### Q: What if the repo content differs from lectures?
**A:** Always prioritize your course materials. This repo is supplementary. Discuss differences with your professors.

### Q: Can I share my course materials here?
**A:** No, respect copyright. Only share your own implementations and projects.

### Q: How do I contribute?
**A:** Fork the repo, make improvements, and submit a pull request. See contribution guidelines in main README.

---

## Contributing

As a fellow MAI student, contributions are welcome:

**Ways to Contribute:**
1. Fix errors or bugs
2. Add implementation examples
3. Improve explanations
4. Share capstone projects (with permission)
5. Update course mappings

**Guidelines:**
- Follow existing code style
- Add clear comments
- Test your code
- Reference sources

---

## Stay Connected

**Repository Updates:**
- Star the repo for notifications
- Watch releases for new content
- Check issues for discussions

**Author:**
- Karthik Arjun
- MAI Student, University of Auckland
- LinkedIn: [karthik-arjun-a5b4a258](https://www.linkedin.com/in/karthik-arjun-a5b4a258/)

**Note:** This is an independent student project, not officially affiliated with the University of Auckland.

**Community:**
- Form study groups with fellow MAI students
- Help each other with code reviews
- Collaborate on B15 projects

---

## Final Thoughts

This repository grows alongside my MAI journey. As I learn new concepts in class, I add practical implementations here. Use it as your companion throughout the program.

**Remember:**
- Theory + Practice = Mastery
- Consistency beats intensity
- Collaboration accelerates learning
- Building projects solidifies understanding

**Let's learn together and make the most of our MAI experience!**

---

*Last Updated: March 2026*  
*Aligned with: University of Auckland MAI 2026 Curriculum*

---

**Good luck with your MAI studies!**

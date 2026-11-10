<div align="center">

<img src="./logo/logo_v1.png" width="220" height="220" alt="AI Engineering Logo"/>

# AI Engineering: From Foundations to Production Agents

### Master AI, LLMs, Agents & Modern Frameworks

**Open-source AI engineering curriculum for building intelligent systems.**

From ML Fundamentals → LLMs & RAG → AI Agents → Production Deployment

[**Get Started**](#quick-start) • [Curriculum](./documentation/CURRICULUM.md) • [Live Demos](https://nexageapps.github.io/AI/) • [Student Guide](./documentation/STUDENT_GUIDE.md)

[![Python](https://img.shields.io/badge/Python-3.10+-3776AB?logo=python&logoColor=white)](https://www.python.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)
[![Lessons](https://img.shields.io/badge/Lessons-177-brightgreen.svg)](./documentation/CURRICULUM.md)
[![Stars](https://img.shields.io/github/stars/nexageapps/AI?style=social)](https://github.com/nexageapps/AI/stargazers)

</div>

---

## Learning Journey

The complete AI Engineering curriculum visualized:

```mermaid
%%{init: {'theme':'base', 'themeVariables': {'primaryColor':'#0366d6','primaryTextColor':'#fff','primaryBorderColor':'#0366d6','lineColor':'#6a737d','secondaryColor':'#f6f8fa','tertiaryColor':'#fafbfc','noteTextColor':'#24292e','noteBkgColor':'#fff5b1','textColor':'#24292e','fontSize':'16px'}}}%%
graph TB
    Start([Start Here]) --> Basic[Basic: ML Fundamentals<br/>18 lessons • 48h]
    Basic --> Intermediate[Intermediate: Deep Learning<br/>26 lessons • 78h]
    Intermediate --> Advanced[Advanced: LLM Engineering<br/>15 lessons • 48h]
    Advanced --> Split{Choose Path}
    Split --> Agents[Agents: AI Systems<br/>18 lessons • 56h]
    Split --> Applied[Applied: Production<br/>35 lessons • 140h]
    Agents --> Production[Production Ready]
    Applied --> Production
    Production --> Expert[Expert: Research<br/>26 lessons • 92h]
    Expert --> End([AI Engineer])
    
    style Start fill:#28a745,stroke:#22863a,stroke-width:2px,color:#fff
    style Basic fill:#0366d6,stroke:#044289,stroke-width:2px,color:#fff
    style Intermediate fill:#6f42c1,stroke:#5a32a3,stroke-width:2px,color:#fff
    style Advanced fill:#d73a49,stroke:#cb2431,stroke-width:2px,color:#fff
    style Agents fill:#f66a0a,stroke:#e36209,stroke-width:2px,color:#fff
    style Applied fill:#6f42c1,stroke:#5a32a3,stroke-width:2px,color:#fff
    style Expert fill:#0366d6,stroke:#044289,stroke-width:2px,color:#fff
    style Production fill:#28a745,stroke:#22863a,stroke-width:2px,color:#fff
    style End fill:#28a745,stroke:#22863a,stroke-width:2px,color:#fff
```

---

## Quick Start

```bash
# Clone the repository
git clone https://github.com/nexageapps/AI.git && cd AI

# Setup virtual environment
python -m venv .venv
source .venv/bin/activate          # Windows: .venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Launch Jupyter
jupyter lab
```

**For live agent lessons:** Set `ANTHROPIC_API_KEY` environment variable. Without it, lessons replay recorded traces.

---

## Learning Paths

### Path Overview

```mermaid
%%{init: {'theme':'base', 'themeVariables': {'primaryColor':'#0366d6','primaryTextColor':'#fff','primaryBorderColor':'#0366d6','lineColor':'#6a737d','secondaryColor':'#0366d6','fontSize':'16px'}}}%%
flowchart LR
    subgraph Path1["Path 1: Complete Journey (579h)"]
        P1A[Basic] --> P1B[Intermediate]
        P1B --> P1C[Advanced]
        P1C --> P1D[Agents]
        P1D --> P1E[Applied]
        P1E --> P1F[Expert]
    end
    
    subgraph Path2["Path 2: Fast Track (110h)"]
        P2A[Advanced<br/>A01-A04] --> P2B[Agents<br/>AG01-AG18]
        P2B --> P2C[Applied<br/>AP01-AP10]
    end
    
    subgraph Path3["Path 3: LLM to Prod (90h)"]
        P3A[Agents<br/>AG02-AG18] --> P3B[Applied<br/>AP01-AP35]
    end
    
    subgraph Path4["Path 4: Research (150h)"]
        P4A[Basic<br/>skim] --> P4B[Intermediate]
        P4B --> P4C[Advanced<br/>A05-A07]
        P4C --> P4D[Expert]
    end
    
    style Path1 fill:#0366d6,stroke:#044289,color:#fff
    style Path2 fill:#6f42c1,stroke:#5a32a3,color:#fff
    style Path3 fill:#d73a49,stroke:#cb2431,color:#fff
    style Path4 fill:#28a745,stroke:#22863a,color:#fff
```

### Detailed Path 1: Complete Beginner (579 hours)

```mermaid
gantt
    title Complete Learning Journey (47 weeks)
    dateFormat YYYY-MM-DD
    axisFormat %W
    
    section Foundations
    Basic ML Fundamentals           :a1, 2024-01-01, 6w
    
    section Deep Learning
    Intermediate CNNs, RNNs         :a2, after a1, 9w
    
    section LLMs
    Advanced LLM Engineering        :a3, after a2, 5w
    
    section Agents
    Agents LangChain, LangGraph     :a4, after a3, 6w
    
    section Production
    Applied LlamaIndex, DSPy        :a5, after a4, 12w
    
    section Research
    Expert Frontiers                :a6, after a5, 9w
```

---

## Technology Stack

```mermaid
%%{init: {'theme':'base', 'themeVariables': {'primaryColor':'#0366d6','primaryTextColor':'#fff','primaryBorderColor':'#0366d6'}}}%%
graph TD
    subgraph Foundations
        F1[PyTorch]
        F2[TensorFlow]
        F3[scikit-learn]
        F4[NumPy/Pandas]
    end
    
    subgraph Agents["AI Agents"]
        A1[LangChain]
        A2[LangGraph]
        A3[LlamaIndex]
        A4[DSPy]
        A5[CrewAI]
    end
    
    subgraph VectorDB["Vector Databases"]
        V1[Pinecone]
        V2[Weaviate]
        V3[Qdrant]
        V4[Chroma]
    end
    
    subgraph LLMs["LLM Providers"]
        L1[OpenAI GPT-4]
        L2[Anthropic Claude]
        L3[Google Gemini]
        L4[Open Source]
    end
    
    subgraph Production
        P1[FastAPI]
        P2[Docker]
        P3[Kubernetes]
        P4[CI/CD]
    end
    
    Foundations --> Agents
    Agents --> VectorDB
    Agents --> LLMs
    Agents --> Production
    
    style Foundations fill:#0366d6,stroke:#044289,color:#fff
    style Agents fill:#6f42c1,stroke:#5a32a3,color:#fff
    style VectorDB fill:#d73a49,stroke:#cb2431,color:#fff
    style LLMs fill:#28a745,stroke:#22863a,color:#fff
    style Production fill:#f66a0a,stroke:#e36209,color:#fff
```

---

## Curriculum Architecture

### System Design View

```mermaid
C4Context
    title AI Engineering Curriculum - System Context
    
    Person(student, "Student", "Learns AI/ML from basics to production")
    
    System_Boundary(curriculum, "AI Curriculum") {
        System(basic, "Basic Module", "ML Fundamentals")
        System(intermediate, "Intermediate", "Deep Learning")
        System(advanced, "Advanced", "LLMs & RAG")
        System(agents, "Agents", "AI Agent Systems")
        System(applied, "Applied", "Production Frameworks")
        System(expert, "Expert", "Research Frontiers")
    }
    
    System_Ext(demos, "Interactive Demos", "Browser-based visualizations")
    System_Ext(tools, "Tools & Tests", "nbtest, gen_readmes")
    
    Rel(student, basic, "Starts with")
    Rel(basic, intermediate, "Progresses to")
    Rel(intermediate, advanced, "Advances to")
    Rel(advanced, agents, "Learns")
    Rel(advanced, applied, "Learns")
    Rel(agents, expert, "Masters")
    Rel(applied, expert, "Masters")
    Rel(student, demos, "Practices with")
    Rel(student, tools, "Tests with")
```

### Module Completion Status

```mermaid
%%{init: {'theme':'base', 'themeVariables': {'primaryColor':'#0366d6','primaryTextColor':'#fff','pie1':'#28a745','pie2':'#0366d6','pie3':'#6f42c1','pie4':'#d73a49','pie5':'#f66a0a','pie6':'#6a737d','pie7':'#ffd33d'}}}%%
pie title Curriculum Progress (177 lessons)
    "Basic (90%)" : 16
    "Intermediate (85%)" : 22
    "Advanced (100%)" : 15
    "Agents (100%)" : 18
    "Applied (40%)" : 14
    "Expert (0%)" : 0
    "Electives (100%)" : 39
```

---

## AI Agent Architecture

```mermaid
%%{init: {'theme':'base', 'themeVariables': {'primaryColor':'#0366d6','primaryTextColor':'#fff','primaryBorderColor':'#0366d6'}}}%%
graph TB
    User[User Input] --> Agent[Agent Orchestrator]
    
    Agent --> Plan[Planning Layer]
    Agent --> Memory[Memory System]
    Agent --> Tools[Tool Execution]
    
    subgraph MemSys[Memory System]
        M1[Conversation Buffer]
        M2[Vector Store]
        M3[Entity Memory]
    end
    
    subgraph ToolSys[Tools]
        T1[Web Search]
        T2[Database Query]
        T3[API Calls]
        T4[File Operations]
    end
    
    Plan --> LLM[Large Language Model]
    Memory --> LLM
    Tools --> LLM
    
    LLM --> Response[Response Generation]
    Response --> Action{Next Action?}
    
    Action -->|Yes| Agent
    Action -->|No| Output[Final Output]
    
    style User fill:#0366d6,stroke:#044289,color:#fff
    style Agent fill:#6f42c1,stroke:#5a32a3,color:#fff
    style LLM fill:#d73a49,stroke:#cb2431,color:#fff
    style Output fill:#28a745,stroke:#22863a,color:#fff
    style MemSys fill:#f66a0a,stroke:#e36209,color:#fff
    style ToolSys fill:#0366d6,stroke:#044289,color:#fff
```

---

## RAG System Architecture

```mermaid
%%{init: {'theme':'base', 'themeVariables': {'primaryColor':'#0366d6','primaryTextColor':'#fff','primaryBorderColor':'#0366d6','actorBkg':'#0366d6','actorTextColor':'#fff','actorLineColor':'#044289','signalColor':'#24292e','signalTextColor':'#24292e','labelBoxBkgColor':'#fafbfc','labelBoxBorderColor':'#d1d5da','labelTextColor':'#24292e','loopTextColor':'#24292e','noteBorderColor':'#0366d6','noteBkgColor':'#f1f8ff','noteTextColor':'#24292e'}}}%%
sequenceDiagram
    participant User
    participant Query as Query Processing
    participant Embed as Embedding Model
    participant VectorDB as Vector Database
    participant Retriever as Retrieval System
    participant LLM as Large Language Model
    participant Response as Response Generator
    
    User->>Query: Ask question
    Query->>Embed: Convert to embedding
    Embed->>VectorDB: Search similar vectors
    VectorDB->>Retriever: Return top-k documents
    Retriever->>LLM: Context + Query
    LLM->>Response: Generate answer
    Response->>User: Return grounded response
    
    Note over VectorDB: Pinecone, Weaviate,<br/>Qdrant, Chroma
    Note over LLM: GPT-4, Claude,<br/>Gemini, OSS Models
```

---

## Lesson Flow Architecture

```mermaid
%%{init: {'theme':'base', 'themeVariables': {'primaryColor':'#0366d6','primaryTextColor':'#fff','primaryBorderColor':'#0366d6','lineColor':'#6a737d','tertiaryColor':'#f1f8ff','tertiaryTextColor':'#24292e','tertiaryBorderColor':'#0366d6','noteBkgColor':'#fff5b1','noteTextColor':'#24292e','noteBorderColor':'#d73a49'}}}%%
stateDiagram-v2
    [*] --> RealScenario: Start Lesson
    
    RealScenario --> Objectives: Understand Context
    Objectives --> Concept: Clear Goals Set
    Concept --> BuildFromScratch: Theory Learned
    BuildFromScratch --> UseTools: Implementation Done
    UseTools --> BreakIt: Tools Mastered
    BreakIt --> Exercises: Limits Understood
    
    state Exercises {
        [*] --> Practice
        Practice --> Stretch
        Stretch --> Challenge
        Challenge --> [*]
    }
    
    Exercises --> Checkpoint: Exercises Complete
    Checkpoint --> [*]: Lesson Complete
    
    note right of RealScenario
        Real-world problem
        that needs solving
    end note
    
    note right of Checkpoint
        Self-assessment
        questions
    end note
```

---

## Production Deployment Pipeline

```mermaid
%%{init: {'theme':'base', 'themeVariables': {'primaryColor':'#0366d6','primaryTextColor':'#fff','primaryBorderColor':'#0366d6'}}}%%
graph LR
    subgraph Development
        D1[Code] --> D2[Test Locally]
        D2 --> D3[nbtest.py]
    end
    
    subgraph CICD[CI/CD]
        D3 --> C1[GitHub Actions]
        C1 --> C2[Run Tests]
        C2 --> C3[Build Docker]
    end
    
    subgraph Deployment
        C3 --> P1[Container Registry]
        P1 --> P2[Kubernetes]
        P2 --> P3[Load Balancer]
    end
    
    subgraph Monitoring
        P3 --> M1[Prometheus]
        M1 --> M2[Grafana]
        M2 --> M3[Alerts]
    end
    
    M3 -->|Issues| D1
    
    style Development fill:#0366d6,stroke:#044289,color:#fff
    style CICD fill:#6f42c1,stroke:#5a32a3,color:#fff
    style Deployment fill:#d73a49,stroke:#cb2431,color:#fff
    style Monitoring fill:#28a745,stroke:#22863a,color:#fff
```

---

## Interactive Demonstrations

**Explore AI concepts visually** → [**Launch All Demos**](https://nexageapps.github.io/AI/)

### Demo Categories

```mermaid
%%{init: {'theme':'base', 'themeVariables': {'primaryColor':'#0366d6','primaryTextColor':'#fff','primaryBorderColor':'#0366d6','secondaryColor':'#6f42c1','tertiaryColor':'#28a745'}}}%%
mindmap
  root((Interactive<br/>Demos))
    Symbolic AI
      Wumpus World
      Logic Systems
    Optimization
      Gradient Descent
      Learning Rates
      Convergence
    Neural Networks
      NN Trainer
      CNN Explorer
      Data Preprocessing
    Language Models
      Knowledge Graphs
      RNN Explorer
      Transformers
      BPE Tokenizer
```

### Featured Demonstrations

<table>
<tr>
<td width="33%" align="center">
<h4>Wumpus World</h4>
<img src="https://via.placeholder.com/300x200/2C3E50/ECF0F1?text=Wumpus+World" alt="Wumpus World" width="100%"/>
<p><strong>Symbolic Logic & Reasoning</strong></p>
<p>Knowledge representation, uncertainty</p>
<p><a href="https://nexageapps.github.io/AI/wumpus">Launch Demo</a></p>
</td>
<td width="33%" align="center">
<h4>Gradient Descent</h4>
<img src="https://via.placeholder.com/300x200/34495E/ECF0F1?text=Mountain+Explorer" alt="Mountain Explorer" width="100%"/>
<p><strong>Optimization Fundamentals</strong></p>
<p>Learning rates, convergence</p>
<p><a href="https://nexageapps.github.io/AI/gradient-descent">Launch Demo</a></p>
</td>
<td width="33%" align="center">
<h4>CNN Explorer</h4>
<img src="https://via.placeholder.com/300x200/16A085/ECF0F1?text=CNN+Explorer" alt="CNN Explorer" width="100%"/>
<p><strong>Convolutional Networks</strong></p>
<p>Feature maps, pooling, filters</p>
<p><a href="https://nexageapps.github.io/AI/neural-networks/week3/cnn-explorer/">Launch Demo</a></p>
</td>
</tr>
<tr>
<td width="33%" align="center">
<h4>Knowledge Graphs</h4>
<img src="https://via.placeholder.com/300x200/D35400/ECF0F1?text=KG+Playground" alt="KG Playground" width="100%"/>
<p><strong>Semantic Reasoning</strong></p>
<p>RDF triples, graph queries</p>
<p><a href="https://nexageapps.github.io/AI/ai-fundamentals/week3/kg-playground/">Launch Demo</a></p>
</td>
<td width="33%" align="center">
<h4>Transformer</h4>
<img src="https://via.placeholder.com/300x200/8E44AD/ECF0F1?text=Transformer" alt="Transformer" width="100%"/>
<p><strong>Self-Attention</strong></p>
<p>Q/K/V matrices, multi-head attention</p>
<p><a href="https://nexageapps.github.io/AI/neural-networks/week4/transformer-explorer/">Launch Demo</a></p>
</td>
<td width="33%" align="center">
<h4>BPE Tokenization</h4>
<img src="https://via.placeholder.com/300x200/C0392B/ECF0F1?text=BPE+Explorer" alt="BPE Explorer" width="100%"/>
<p><strong>Subword Encoding</strong></p>
<p>Byte pair encoding, vocabulary</p>
<p><a href="https://nexageapps.github.io/AI/neural-networks/week4/bpe-explorer/">Launch Demo</a></p>
</td>
</tr>
</table>

[**View All 14+ Demonstrations**](https://nexageapps.github.io/AI/)

---

## Lesson Design Pattern

Every lesson follows this proven structure:

```mermaid
%%{init: {'theme':'base', 'themeVariables': {'primaryColor':'#0366d6','primaryTextColor':'#fff','primaryBorderColor':'#0366d6'}}}%%
flowchart TD
    A[1. Real-World Scenario] --> B[2. Learning Objectives]
    B --> C[3. Concept Explanation]
    C --> D[4. Build From Scratch]
    D --> E[5. Use Production Tools]
    E --> F[6. Break It & Understand Limits]
    F --> G[7. Three-Tier Exercises]
    
    G --> G1[Practice:<br/>Solidify Basics]
    G --> G2[Stretch:<br/>Apply to New Problems]
    G --> G3[Challenge:<br/>Push Your Limits]
    
    G1 --> H[8. Checkpoint & Assessment]
    G2 --> H
    G3 --> H
    
    H --> I{Pass?}
    I -->|Yes| J[Next Lesson]
    I -->|No| K[Review & Retry]
    K --> D
    
    style A fill:#0366d6,stroke:#044289,color:#fff
    style B fill:#6f42c1,stroke:#5a32a3,color:#fff
    style C fill:#d73a49,stroke:#cb2431,color:#fff
    style D fill:#28a745,stroke:#22863a,color:#fff
    style E fill:#f66a0a,stroke:#e36209,color:#fff
    style F fill:#0366d6,stroke:#044289,color:#fff
    style H fill:#28a745,stroke:#22863a,color:#fff
    style J fill:#28a745,stroke:#22863a,color:#fff
```

### Core Principles

- **Runs offline, free, no GPU required**
- **Production-ready code examples**
- **Industry-standard tools and frameworks**
- **Hands-on exercises at every step**
- **Progressive difficulty curve**
- **Clear, measurable learning objectives**
- **Self-paced with checkpoints**
- **Open-source and free forever**

---

## Project Structure

```
AI/
│
├── Basic/                           # 18 lessons: ML fundamentals
├── Intermediate/                    # 26 lessons: Deep learning
├── Advanced/                        # 15 lessons: LLMs & RAG
├── Agents/                          # 18 lessons: AI agents
├── Applied/                         # 35 lessons: Production
├── Expert/                          # 26 lessons: Research
├── Electives/                       # 39 lessons: Specialized
│
├── agentkit/                        # Shared library for agents
├── tools/                           # Build, test, curriculum tools
├── application/                     # Interactive demos
├── documentation/                   # All guides
│   ├── diagrams/                    # Excalidraw & Mermaid sources
│   ├── CURRICULUM.md
│   ├── LEARNING_SEQUENCE.md
│   └── QUICK_REFERENCE.md
│
└── README.md                        # This file
```

---

## Module Dependencies

```mermaid
%%{init: {'theme':'base', 'themeVariables': {'primaryColor':'#0366d6','primaryTextColor':'#fff','primaryBorderColor':'#0366d6'}}}%%
graph LR
    subgraph Prerequisites
        P1[Python Basics]
        P2[Math Fundamentals]
    end
    
    P1 --> Basic
    P2 --> Basic
    
    Basic --> Intermediate
    Intermediate --> Advanced
    
    Advanced --> Agents
    Advanced --> Applied
    
    Agents -.->|Optional| Applied
    Applied -.->|Optional| Agents
    
    Agents --> Expert
    Applied --> Expert
    
    style Basic fill:#0366d6,stroke:#044289,color:#fff
    style Intermediate fill:#6f42c1,stroke:#5a32a3,color:#fff
    style Advanced fill:#d73a49,stroke:#cb2431,color:#fff
    style Agents fill:#28a745,stroke:#22863a,color:#fff
    style Applied fill:#f66a0a,stroke:#e36209,color:#fff
    style Expert fill:#6a737d,stroke:#444d56,color:#fff
```

---

## Contributing Workflow

```mermaid
gitGraph
    commit id: "Initial Curriculum"
    branch feature/new-lesson
    checkout feature/new-lesson
    commit id: "Draft Lesson AG19"
    commit id: "Add Exercises"
    commit id: "Test with nbtest.py"
    checkout main
    merge feature/new-lesson tag: "v1.1.0"
    commit id: "Update README"
    branch bugfix/ag03-typo
    checkout bugfix/ag03-typo
    commit id: "Fix Typo"
    checkout main
    merge bugfix/ag03-typo
    commit id: "Deploy"
```

### Contribution Process

1. **Fork** the repository
2. **Create** a feature branch
3. **Write** or improve lessons
4. **Test** with `python tools/nbtest.py`
5. **Submit** a pull request

[**Read Full Contributing Guide**](./CONTRIBUTING.md)

---

## Quality Standards

```mermaid
%%{init: {'theme':'base', 'themeVariables': {'primaryColor':'#0366d6','primaryTextColor':'#fff','primaryBorderColor':'#0366d6'}}}%%
flowchart LR
    A[Write Lesson] --> B{Follows<br/>Template?}
    B -->|No| A
    B -->|Yes| C[Run nbtest.py]
    
    C --> D{Tests<br/>Pass?}
    D -->|No| E[Fix Issues]
    E --> C
    D -->|Yes| F[Update README]
    
    F --> G[Submit PR]
    G --> H{Code<br/>Review}
    H -->|Changes Needed| E
    H -->|Approved| I[Merge]
    
    style A fill:#0366d6,stroke:#044289,color:#fff
    style C fill:#6f42c1,stroke:#5a32a3,color:#fff
    style F fill:#d73a49,stroke:#cb2431,color:#fff
    style I fill:#28a745,stroke:#22863a,color:#fff
```

---

## Learning Progress Tracker

```mermaid
journey
    title Student Learning Journey
    section Week 1-6
      Learn ML Basics: 3: Student
      Neural Networks: 4: Student
      First Model: 5: Student
    section Week 7-15
      CNNs & Vision: 4: Student
      NLP & Text: 4: Student
      Transformers: 5: Student
    section Week 16-20
      Fine-tune LLMs: 5: Student
      Build RAG: 5: Student
    section Week 21-26
      Create Agents: 5: Student
      LangGraph: 4: Student
      Production: 5: Student
```

---

## License & Academic Integrity

### MIT License - Free to Use

This repository is **free, open-source educational material** (MIT).

```mermaid
%%{init: {'theme':'base', 'themeVariables': {'primaryColor':'#0366d6','primaryTextColor':'#fff','primaryBorderColor':'#0366d6'}}}%%
graph TD
    A[AI Curriculum<br/>MIT License] --> B{You Can}
    A --> C{You Cannot}
    
    B --> B1[Learn from it]
    B --> B2[Teach with it]
    B --> B3[Fork & modify]
    B --> B4[Use in courses]
    B --> B5[Build upon it]
    
    C --> C1[Claim as yours]
    C --> C2[Remove attribution]
    C --> C3[Violate policies]
    C --> C4[Submit as coursework<br/>without understanding]
    
    style A fill:#0366d6,stroke:#044289,color:#fff
    style B fill:#28a745,stroke:#22863a,color:#fff
    style C fill:#d73a49,stroke:#cb2431,color:#fff
```

**Full policy:** [ACADEMIC_INTEGRITY.md](./documentation/ACADEMIC_INTEGRITY.md)

---

## Roadmap

```mermaid
timeline
    title Curriculum Development Roadmap
    2024 Q1 : Basic & Intermediate : Complete curriculum : 14+ demos
    2024 Q2 : Advanced & Agents : LangChain/LangGraph : Production ready
    2024 Q3 : Applied Module : LlamaIndex : DSPy : Vector DBs
    2024 Q4 : Expert Module : Research topics : Paper implementations
    2025 Q1 : Translations : Video tutorials : Community showcase
```

[**View Detailed Roadmap**](./documentation/VIRAL_CURRICULUM_UPDATE_2025.md)

---

## Support This Project

<div align="center">

```mermaid
%%{init: {'theme':'base', 'themeVariables': {'primaryColor':'#0366d6','primaryTextColor':'#fff','primaryBorderColor':'#0366d6','secondaryColor':'#6f42c1','tertiaryColor':'#28a745'}}}%%
mindmap
  root((Support<br/>Options))
    Star Repository
      Help visibility
      Show appreciation
    Share
      Social media
      Blog posts
      Word of mouth
    Contribute
      Fix bugs
      Add lessons
      Improve docs
    Translate
      Spanish
      Chinese
      Others
    Sponsor
      Buy me a book
      GitHub Sponsors
```

[![Star on GitHub](https://img.shields.io/github/stars/nexageapps/AI?style=social)](https://github.com/nexageapps/AI/stargazers)
[![Buy Me A Book](https://img.shields.io/badge/Buy%20Me%20A%20Book-Support-yellow.svg)](https://buymeacoffee.com/fcc4sbsx5f6)

**Connect:** [LinkedIn](https://www.linkedin.com/in/karthik-arjun-a5b4a258/) • [Discord](https://discord.com/channels/1482175575488598109/1482175576168206590) • [GitHub](https://github.com/nexageapps/AI)

**Sponsored by** [nexageapps](https://nexageapps.com)

</div>

---

## Target Audience

```mermaid
%%{init: {'theme':'base', 'themeVariables': {'primaryColor':'#0366d6','primaryTextColor':'#fff','primaryBorderColor':'#0366d6','secondaryColor':'#6f42c1','tertiaryColor':'#28a745'}}}%%
mindmap
  root((Who Is<br/>This For))
    Students
      CS Undergrads
      Graduate Students
      Self-Learners
    Professionals
      Software Engineers
      Data Scientists
      ML Engineers
    Educators
      University Instructors
      Bootcamp Teachers
      Online Educators
    Leaders
      CTOs
      Product Managers
      Technical Founders
```

---

<div align="center">

## Ready to Start Your Journey?

**177 lessons • 579 hours • Zero to production AI engineer**

```mermaid
%%{init: {'theme':'base', 'themeVariables': {'primaryColor':'#0366d6','primaryTextColor':'#fff','primaryBorderColor':'#0366d6'}}}%%
graph LR
    A[Read Curriculum] --> B[Try Demos]
    B --> C[Start Learning]
    C --> D[Build Projects]
    D --> E[Master AI Engineering]
    
    style A fill:#0366d6,stroke:#044289,color:#fff
    style B fill:#6f42c1,stroke:#5a32a3,color:#fff
    style C fill:#d73a49,stroke:#cb2431,color:#fff
    style D fill:#f66a0a,stroke:#e36209,color:#fff
    style E fill:#28a745,stroke:#22863a,color:#fff
```

[**Browse Curriculum**](./documentation/CURRICULUM.md) • [**Try Demos**](https://nexageapps.github.io/AI/) • [**Quick Start**](#quick-start)

---

**Made for the AI community** • **Open source forever** • **Production-ready examples**

<sub>Star this repo to support the project and help others discover it</sub>

</div>

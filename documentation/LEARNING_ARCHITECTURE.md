# Learning Architecture & Visual Guide

Visual representations of the curriculum structure, learning paths, and AI concepts.

---

## 🏗️ Overall Architecture

```
                    AI ENGINEERING CURRICULUM
                    ═════════════════════════

┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                        ┌──────────────┐                         │
│                        │   BEGINNER   │                         │
│                        │   FRIENDLY   │                         │
│                        └──────┬───────┘                         │
│                               │                                 │
│              ┌────────────────┴────────────────┐                │
│              │                                 │                │
│        ┌─────▼─────┐                    ┌──────▼──────┐        │
│        │   BASIC   │                    │ INTERMEDIATE │        │
│        │ 18 Lessons│                    │  26 Lessons  │        │
│        │           │                    │              │        │
│        │ ML Basics │                    │ Deep Learning│        │
│        │ Regression│◄───────────────────┤ CNNs, RNNs   │        │
│        │ Neural Nets│                   │ Transformers │        │
│        └─────┬─────┘                    └──────┬───────┘        │
│              │                                 │                │
│              └────────────────┬────────────────┘                │
│                               │                                 │
│                        ┌──────▼───────┐                         │
│                        │   ADVANCED   │                         │
│                        │  15 Lessons  │                         │
│                        │              │                         │
│                        │ LLMs & RAG   │                         │
│                        │ Fine-tuning  │                         │
│                        │ Prompting    │                         │
│                        └──────┬───────┘                         │
│                               │                                 │
│              ┌────────────────┴────────────────┐                │
│              │                                 │                │
│        ┌─────▼─────┐                    ┌──────▼──────┐        │
│        │  AGENTS   │                    │   APPLIED   │        │
│        │ 18 Lessons│◄──────────────────►│  35 Lessons │        │
│        │           │   Integration      │             │        │
│        │ LangChain │                    │ LlamaIndex  │        │
│        │ LangGraph │                    │ DSPy, FastAPI│       │
│        │ Multi-Agent│                   │ Vector DBs  │        │
│        └─────┬─────┘                    └──────┬───────┘        │
│              │                                 │                │
│              └────────────────┬────────────────┘                │
│                               │                                 │
│                        ┌──────▼───────┐                         │
│                        │    EXPERT    │                         │
│                        │  26 Lessons  │                         │
│                        │              │                         │
│                        │   Research   │                         │
│                        │  Frontiers   │                         │
│                        └──────────────┘                         │
│                                                                 │
│                ┌──────────────────────────────┐                │
│                │      ELECTIVES (39)          │                │
│                │  Classical AI • Specialized  │                │
│                └──────────────────────────────┘                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

     Total: 177 Lessons • 579 Hours • 7 Modules
```

---

## 🎯 Learning Paths Visualization

### Path 1: Complete Journey

```
START HERE
    │
    ▼
╔═══════════╗      6 weeks
║   BASIC   ║──────────────► Fundamentals Mastered
║ 18 lessons║                (ML, Neural Nets, CNNs)
╚═══════════╝
    │
    ▼
╔═══════════╗      9 weeks
║INTERMEDIATE║─────────────► Deep Learning Expert
║ 26 lessons ║               (Vision, NLP, Transformers)
╚═══════════╝
    │
    ▼
╔═══════════╗      5 weeks
║  ADVANCED  ║─────────────► LLM Engineer
║ 15 lessons ║               (RAG, Fine-tuning, Prompting)
╚═══════════╝
    │
    ▼
╔═══════════╗      6 weeks
║   AGENTS   ║─────────────► AI Agent Developer
║ 18 lessons ║               (LangChain, LangGraph)
╚═══════════╝
    │
    ▼
╔═══════════╗      12 weeks
║  APPLIED   ║─────────────► Production Ready
║ 35 lessons ║               (LlamaIndex, DSPy, FastAPI)
╚═══════════╝
    │
    ▼
╔═══════════╗      9 weeks
║   EXPERT   ║─────────────► Research Level
║ 26 lessons ║               (Cutting Edge)
╚═══════════╝
    │
    ▼
   DONE! 🎉
   47 weeks total
```

### Path 2: Fast Track to Agents

```
START HERE (You know ML basics)
    │
    ▼
╔═══════════╗      2 weeks
║ ADVANCED  ║──────────────► LLM Fundamentals
║  A01-A04  ║                (Fine-tuning, RAG)
╚═══════════╝
    │
    ▼
╔═══════════╗      6 weeks
║   AGENTS   ║─────────────► Agent Expert
║ AG01-AG18  ║               (Full agent stack)
╚═══════════╝
    │
    ▼
╔═══════════╗      4 weeks
║  APPLIED   ║─────────────► Production Skills
║ AP01-AP10  ║               (Vector DBs, FastAPI)
╚═══════════╝
    │
    ▼
   DONE! 🚀
   12 weeks total
```

---

## 🧠 AI Agent Architecture

```
                     AI AGENT SYSTEM
                     ═══════════════

┌─────────────────────────────────────────────────────────┐
│                                                         │
│                    ┌─────────────┐                      │
│                    │    USER     │                      │
│                    │   PROMPT    │                      │
│                    └──────┬──────┘                      │
│                           │                             │
│                           ▼                             │
│              ┌────────────────────────┐                 │
│              │   AGENT ORCHESTRATOR   │                 │
│              │    (LangGraph State)   │                 │
│              └───────────┬────────────┘                 │
│                          │                              │
│         ┌────────────────┼────────────────┐             │
│         │                │                │             │
│         ▼                ▼                ▼             │
│   ┌─────────┐     ┌──────────┐    ┌──────────┐        │
│   │  PLAN   │     │  MEMORY  │    │  TOOLS   │        │
│   │         │     │          │    │          │        │
│   │ Reason  │     │ Vector   │    │ Search   │        │
│   │ Decide  │     │ Store    │    │ API Call │        │
│   │ Route   │     │ History  │    │ Database │        │
│   └────┬────┘     └────┬─────┘    └────┬─────┘        │
│        │               │               │               │
│        └───────────────┼───────────────┘               │
│                        │                               │
│                        ▼                               │
│              ┌───────────────────┐                     │
│              │       LLM         │                     │
│              │  (GPT-4/Claude)   │                     │
│              └─────────┬─────────┘                     │
│                        │                               │
│                        ▼                               │
│              ┌───────────────────┐                     │
│              │  RESPONSE         │                     │
│              │  + Next Action    │                     │
│              └───────────────────┘                     │
│                                                         │
└─────────────────────────────────────────────────────────┘

Covered in: Agents Module (AG01-AG18)
```

---

## 🔄 RAG System Architecture

```
                RETRIEVAL-AUGMENTED GENERATION
                ═══════════════════════════════

┌──────────────────────────────────────────────────────────┐
│                                                          │
│  USER QUERY                                              │
│  "What are the company's benefits?"                      │
│          │                                               │
│          ▼                                               │
│  ┌────────────────┐                                      │
│  │  EMBEDDING     │                                      │
│  │  MODEL         │───► [0.23, -0.45, 0.12, ...]        │
│  └────────────────┘                                      │
│          │                                               │
│          ▼                                               │
│  ┌────────────────────────────────┐                      │
│  │    VECTOR DATABASE             │                      │
│  │  ┌──────┐ ┌──────┐ ┌──────┐  │                      │
│  │  │ Doc1 │ │ Doc2 │ │ Doc3 │  │                      │
│  │  └──────┘ └──────┘ └──────┘  │                      │
│  │                                │                      │
│  │  Similarity Search ─────►      │                      │
│  │  Top 3 matches                 │                      │
│  └────────────┬───────────────────┘                      │
│               │                                          │
│               ▼                                          │
│  ┌─────────────────────────────┐                        │
│  │  RETRIEVED CONTEXT          │                        │
│  │  • Healthcare: Full coverage │                       │
│  │  • 401k: 5% match           │                        │
│  │  • PTO: 20 days/year        │                        │
│  └────────────┬────────────────┘                        │
│               │                                          │
│               ▼                                          │
│  ┌────────────────────────────────────┐                 │
│  │  PROMPT CONSTRUCTION               │                 │
│  │  Context + Query → Full Prompt     │                 │
│  └────────────┬───────────────────────┘                 │
│               │                                          │
│               ▼                                          │
│  ┌────────────────────────────────────┐                 │
│  │        LLM (GPT-4/Claude)          │                 │
│  └────────────┬───────────────────────┘                 │
│               │                                          │
│               ▼                                          │
│  ┌────────────────────────────────────┐                 │
│  │  GROUNDED RESPONSE                 │                 │
│  │  "The company offers..."           │                 │
│  │  [with citations from docs]        │                 │
│  └────────────────────────────────────┘                 │
│                                                          │
└──────────────────────────────────────────────────────────┘

Covered in: Advanced Module (A03-RAG)
            Applied Module (AP01-AP06)
```

---

## 🛠️ Tech Stack Integration

```
               PRODUCTION AI SYSTEM
               ═══════════════════

┌────────────────────────────────────────────────────────┐
│                                                        │
│  ┌──────────────┐        ┌──────────────┐            │
│  │   FRONTEND   │        │   API LAYER  │            │
│  │              │◄──────►│              │            │
│  │  React/Next  │  REST  │   FastAPI    │            │
│  │   Gradio     │  WS    │   Flask      │            │
│  └──────────────┘        └──────┬───────┘            │
│                                  │                    │
│                                  ▼                    │
│          ┌──────────────────────────────────┐        │
│          │     AGENT LAYER                  │        │
│          │  ┌────────────┐ ┌─────────────┐ │        │
│          │  │ LangChain  │ │ LlamaIndex  │ │        │
│          │  └────────────┘ └─────────────┘ │        │
│          │  ┌────────────┐ ┌─────────────┐ │        │
│          │  │ LangGraph  │ │    DSPy     │ │        │
│          │  └────────────┘ └─────────────┘ │        │
│          └──────────────┬───────────────────┘        │
│                         │                            │
│         ┌───────────────┼───────────────┐            │
│         │               │               │            │
│         ▼               ▼               ▼            │
│  ┌──────────┐    ┌──────────┐   ┌──────────┐       │
│  │   LLMs   │    │ VECTOR   │   │  TOOLS   │       │
│  │          │    │   DBs    │   │          │       │
│  │ OpenAI   │    │ Pinecone │   │ Search   │       │
│  │ Claude   │    │ Weaviate │   │ Database │       │
│  │ Gemini   │    │ Qdrant   │   │ APIs     │       │
│  └──────────┘    └──────────┘   └──────────┘       │
│       │               │               │             │
│       └───────────────┼───────────────┘             │
│                       │                             │
│                       ▼                             │
│          ┌────────────────────────┐                 │
│          │   INFRASTRUCTURE       │                 │
│          │  ┌──────┐  ┌────────┐ │                 │
│          │  │Docker│  │  K8s   │ │                 │
│          │  └──────┘  └────────┘ │                 │
│          │  ┌──────┐  ┌────────┐ │                 │
│          │  │Redis │  │Postgres│ │                 │
│          │  └──────┘  └────────┘ │                 │
│          └────────────────────────┘                 │
│                                                     │
└─────────────────────────────────────────────────────┘

Covered in: Applied Module (AP15-AP35)
```

---

## 📚 Lesson Structure

```
           EVERY LESSON FOLLOWS THIS PATTERN
           ═══════════════════════════════════

┌──────────────────────────────────────────────────────┐
│                                                      │
│  1️⃣  REAL SCENARIO                                   │
│      ┌──────────────────────────────────────┐       │
│      │ "You're building a chatbot that      │       │
│      │  needs to remember conversations..."  │       │
│      └──────────────────────────────────────┘       │
│                      │                              │
│                      ▼                              │
│  2️⃣  LEARNING OBJECTIVES                            │
│      ✓ Understand context windows                   │
│      ✓ Implement conversation memory                │
│      ✓ Use vector stores for retrieval              │
│                      │                              │
│                      ▼                              │
│  3️⃣  CONCEPT EXPLANATION                            │
│      Theory + Visualizations + Examples             │
│                      │                              │
│                      ▼                              │
│  4️⃣  BUILD FROM SCRATCH                             │
│      class ConversationMemory:                      │
│          def __init__(self):                        │
│              self.history = []                      │
│          def add(self, message):                    │
│              # Your implementation                  │
│                      │                              │
│                      ▼                              │
│  5️⃣  USE REAL TOOLS                                 │
│      from langchain.memory import                   │
│          ConversationBufferMemory                   │
│      memory = ConversationBufferMemory()            │
│                      │                              │
│                      ▼                              │
│  6️⃣  BREAK IT                                       │
│      What happens with:                             │
│      • Very long conversations?                     │
│      • Multiple users?                              │
│      • Context limitations?                         │
│                      │                              │
│                      ▼                              │
│  7️⃣  THREE-TIER EXERCISES                           │
│      ┌─────────────┬────────────┬────────────┐     │
│      │  Practice   │  Stretch   │  Challenge │     │
│      │  Solidify   │  Apply     │  Push      │     │
│      │  concepts   │  to new    │  limits    │     │
│      └─────────────┴────────────┴────────────┘     │
│                      │                              │
│                      ▼                              │
│  8️⃣  CHECKPOINT                                     │
│      ❓ Can you explain context windows?            │
│      ❓ When would you use vector memory?           │
│      ❓ What are the tradeoffs?                     │
│                                                     │
└──────────────────────────────────────────────────────┘

         Time: 2-4 hours per lesson
         Result: Deep understanding + Practical skills
```

---

## 🎓 Skill Progression

```
                    SKILL DEVELOPMENT CURVE
                    ═════════════════════════

Level
  ▲
  │                                        ╔═══════════╗
  │                                       ║   EXPERT  ║
  │                                      ║  Research  ║
  │                              ╔═══════╩════════════╝
  │                             ║    APPLIED           
  │                            ║   Production         
  │                    ╔═══════╩═══════╗             
  │                   ║     AGENTS      ║            
  │                  ║  AI Systems     ║            
  │          ╔═══════╩═════════════════╝            
  │         ║      ADVANCED                         
  │        ║      LLMs & RAG                       
  │  ╔═════╩════════════╗                          
  │ ║   INTERMEDIATE    ║                         
  │ ║  Deep Learning    ║                         
  ╔╩══════════════════╗                           
 ║     BASIC          ║                          
 ║  ML Fundamentals   ║                         
 ╚════════════════════╝                         
  │
  └──────────────────────────────────────────────► Time
    0        12        24        36        48 weeks

  Key Milestones:
  • Week 6:  Can build neural networks from scratch
  • Week 15: Can implement CNNs and transformers
  • Week 20: Can fine-tune LLMs and build RAG systems
  • Week 26: Can deploy AI agents to production
  • Week 38: Can work with cutting-edge frameworks
  • Week 47: Research-level understanding
```

---

## 🔄 Learning Feedback Loop

```
                   CONTINUOUS IMPROVEMENT CYCLE
                   ═══════════════════════════

        ┌─────────────────────────────────────┐
        │                                     │
        │         1. LEARN                    │
        │    ┌──────────────────┐             │
        │    │  Watch/Read      │             │
        │    │  Understand      │             │
        │    │  Take notes      │             │
        │    └────────┬─────────┘             │
        │             │                       │
        │             ▼                       │
        │         2. BUILD                    │
        │    ┌──────────────────┐             │
        │    │  Code from       │             │
        │    │  scratch         │             │
        │    │  Implement       │             │
        │    └────────┬─────────┘             │
        │             │                       │
        │             ▼                       │
        │         3. PRACTICE                 │
        │    ┌──────────────────┐             │
        │    │  Exercises       │             │
        │    │  Debug           │             │
        │    │  Experiment      │             │
        │    └────────┬─────────┘             │
        │             │                       │
        │             ▼                       │
        │         4. APPLY                    │
        │    ┌──────────────────┐             │
        │    │  Real project    │             │
        │    │  Solve problems  │             │
        │    │  Share work      │             │
        │    └────────┬─────────┘             │
        │             │                       │
        │             ▼                       │
        │         5. REFLECT                  │
        │    ┌──────────────────┐             │
        │    │  What worked?    │             │
        │    │  What didn't?    │             │
        │    │  Next steps?     │             │
        │    └────────┬─────────┘             │
        │             │                       │
        │             └──────────────┐        │
        │                            │        │
        └────────────────────────────┼────────┘
                                     │
                                     │
            ┌────────────────────────┘
            │
            ▼
      (Repeat with next lesson)
```

---

## 🎯 Success Metrics

```
          WHAT SUCCESS LOOKS LIKE AT EACH STAGE
          ════════════════════════════════════════

┌───────────────────────────────────────────────────────┐
│                                                       │
│  After BASIC (Week 6):                                │
│  ✓ Can implement ML algorithms from scratch           │
│  ✓ Understand gradient descent deeply                 │
│  ✓ Can train neural networks                          │
│  ✓ Comfortable with PyTorch/TensorFlow                │
│                                                       │
│  After INTERMEDIATE (Week 15):                        │
│  ✓ Can build CNNs for computer vision                 │
│  ✓ Understand transformers architecture               │
│  ✓ Can work with text and sequences                   │
│  ✓ Know when to use which architecture                │
│                                                       │
│  After ADVANCED (Week 20):                            │
│  ✓ Can fine-tune large language models                │
│  ✓ Can build RAG systems                              │
│  ✓ Master prompt engineering                          │
│  ✓ Understand LLM limitations                         │
│                                                       │
│  After AGENTS (Week 26):                              │
│  ✓ Can build production AI agents                     │
│  ✓ Implement complex workflows with LangGraph         │
│  ✓ Design multi-agent systems                         │
│  ✓ Handle tool use and function calling               │
│                                                       │
│  After APPLIED (Week 38):                             │
│  ✓ Master LlamaIndex and DSPy                         │
│  ✓ Deploy agents to production                        │
│  ✓ Work with vector databases at scale                │
│  ✓ Build FastAPI services                             │
│                                                       │
│  After EXPERT (Week 47):                              │
│  ✓ Understand cutting-edge research                   │
│  ✓ Can read and implement papers                      │
│  ✓ Contribute to open-source AI projects              │
│  ✓ Ready for AI research roles                        │
│                                                       │
└───────────────────────────────────────────────────────┘
```

---

## 📊 Time Investment

```
           WEEKLY TIME COMMITMENT OPTIONS
           ═══════════════════════════════

┌────────────────────────────────────────────────────┐
│                                                    │
│  Option 1: Casual Learner (4h/week)               │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━│
│  • 1 lesson per week                               │
│  • Complete in ~177 weeks (3.4 years)              │
│  • Perfect for busy professionals                  │
│                                                    │
│  Option 2: Part-Time (8h/week) ⭐ RECOMMENDED      │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━│
│  • 2 lessons + 1 review per week                   │
│  • Complete in ~72 weeks (1.4 years)               │
│  • Balanced learning pace                          │
│                                                    │
│  Option 3: Intensive (20h/week)                    │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━│
│  • 5 lessons per week                              │
│  • Complete in ~29 weeks (7 months)                │
│  • Bootcamp-style immersion                        │
│                                                    │
│  Option 4: Full-Time (40h/week)                    │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━│
│  • 10 lessons per week                             │
│  • Complete in ~15 weeks (3.5 months)              │
│  • Career transition focused                       │
│                                                    │
└────────────────────────────────────────────────────┘
```

---

**For the full curriculum details, see [CURRICULUM.md](./CURRICULUM.md)**

**For week-by-week study plans, see [LEARNING_SEQUENCE.md](./LEARNING_SEQUENCE.md)**

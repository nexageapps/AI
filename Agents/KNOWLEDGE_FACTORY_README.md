# Knowledge Factory Pattern - Quick Reference

## What is This?

The **Knowledge Factory** is a pattern for building AI agent systems that improve over time by accumulating organizational knowledge.

**Source:** [LangChain Blog Post](https://www.langchain.com/blog/knowledge-factory)

**Key Insight:**
> Making AI work isn't about better models or more context—it's about better **knowledge** of how your company works, what standards you have, where data is stored, and how to access it.

---

## For Students

### Quick Start

1. **Read the concept:** [`AG17-CONCEPT-knowledge-factory.md`](./AG17-CONCEPT-knowledge-factory.md)
2. **Explore enhancements:** [`enhancements/`](./enhancements/) folder
3. **Apply in capstone:** Use patterns in AG15 final project

### Where It Appears in Curriculum

**AG05 (Memory):**
- Concept: Session memory vs organizational memory
- See: `enhancements/AG05-knowledge-factory-addition.md`

**AG06 (RAG):**
- Pattern: Dynamic knowledge bases that improve over time
- See: `enhancements/AG06-knowledge-factory-addition.md`

**AG14 (Observability):**
- Application: Using traces to find knowledge gaps
- See: `enhancements/AG14-knowledge-factory-addition.md`

**AG17 (Concept):**
- Complete guide: Full Knowledge Factory pattern
- See: `AG17-CONCEPT-knowledge-factory.md`

### Prerequisites

Before diving in, complete:
- ✅ AG05 (Memory & Context Engineering)
- ✅ AG06 (Agentic RAG)
- ✅ AG07 (Workflow Patterns)
- ✅ AG14 (Evaluation & Observability)

---

## Three Types of Knowledge

### 1. **Skills** (Procedural Memory)
How to do things properly in your company.

**Example:**
```python
# Before: Agent figures this out every time
# After: Codified as a skill
@tool
def issue_refund(order_id: str, amount: float) -> str:
    """Issue refund for an order.
    
    ⚠️ ALWAYS check order status and delivery date FIRST.
    Do not refund if delivered >30 days ago.
    """
    ...
```

### 2. **Domain Knowledge** (Semantic Memory)
Core facts about your business that don't change often.

**Example:**
```markdown
# How We Calculate ARR
ARR = (Monthly Recurring Revenue × 12) + Annual Subscriptions

**Excludes:**
- One-time setup fees
- Usage-based charges
- Free tier users

**Source:** finance_db.arr_calculations table
```

### 3. **Data Access Guidance** (Metacognitive Memory)
Where to find current information.

**Example:**
```python
# Knowledge: Revenue data locations
locations = {
    "revenue_totals": "BigQuery prod.finance.revenue",
    "customer_records": "Salesforce API",
    "real_time_events": "Kafka topic 'user_events'",
}
```

---

## The Factory Components

### 1. Feedback Mechanism
**Agents flag missing or wrong knowledge while working.**

```python
@tool
def report_knowledge_issue(issue_type: str, description: str) -> str:
    """Report a knowledge gap discovered during work.
    
    Use when:
    - Information is missing
    - Information is outdated
    - Information is incorrect
    """
    log_issue(issue_type, description)
    return "Issue reported. Curator will review."
```

### 2. Curator Agent
**Background agent that maintains knowledge over time.**

Runs on schedule (nightly, weekly) to:
- Review flagged issues from working agents
- Inspect traces to find patterns
- Search company sources for answers
- Update knowledge base
- Resolve conflicts

### 3. Knowledge Storage
**Where knowledge lives** (flexible formats):
- Skills → GitHub (Python files with `@tool`)
- Domain facts → Notion, wiki, knowledge graph
- Data guidance → Data catalog, documentation

---

## The Learning Loop

```
1. Agents work → Generate traces
       ↓
2. Traces analyzed → Patterns detected
       ↓
3. Patterns → Knowledge gaps identified
       ↓
4. Curator agent → Updates knowledge
       ↓
5. Better knowledge → Better agent behavior
       ↓
   (Repeat)
```

**Result:** System gets smarter over time without manual intervention.

---

## When to Use This Pattern

### ✅ Use Knowledge Factory When:
- Knowledge changes frequently
- Many agents share the same knowledge base
- You have production traffic to learn from
- Cost of wrong answers is high

### ⛔ Don't Need It When:
- Knowledge is stable
- Single agent, low traffic
- Building prototype/MVP
- Simpler ops preferred

---

## Real-World Example

**Scenario:** Customer support agent at a growing company

**Week 1:**
```
Agent handles 100 tickets
→ Struggles with: 15 outdated policies, 8 unknown procedures
→ Flags 23 knowledge gaps
```

**Weekend: Curator Agent Runs**
```
Reviews 23 gaps
→ Finds 12 updated policies in Slack/docs
→ Adds to knowledge base
→ Codifies 6 new procedures as skills
```

**Week 2:**
```
Agent handles 120 tickets
→ Struggles with: 3 outdated policies (-80%), 2 unknown procedures (-75%)
→ Flags 5 knowledge gaps (-78%)
→ Handles more tickets with less difficulty
```

**Week 4:**
```
Agent handles 150 tickets
→ Knowledge base is now comprehensive
→ Flags 1-2 gaps (genuinely new situations)
→ System is now stable and efficient
```

---

## Files in This Repository

### Core Documentation
- **`AG17-CONCEPT-knowledge-factory.md`** - Complete pattern guide
- **`KNOWLEDGE_FACTORY_README.md`** - This file (quick reference)

### Enhancements (Optional)
- **`enhancements/AG05-knowledge-factory-addition.md`** - Organizational memory
- **`enhancements/AG06-knowledge-factory-addition.md`** - Dynamic RAG
- **`enhancements/AG14-knowledge-factory-addition.md`** - Knowledge gap analysis
- **`enhancements/README.md`** - Enhancement guide
- **`enhancements/IMPLEMENTATION_GUIDE.md`** - For instructors

---

## How to Learn This

### Beginner Path (1-2 hours)
1. Read this file (quick reference)
2. Read AG17-CONCEPT sections 1-3
3. Understand the three knowledge types
4. See examples in your capstone project

### Intermediate Path (3-4 hours)
1. Complete beginner path
2. Read all of AG17-CONCEPT
3. Read enhancement files for AG05, AG06, AG14
4. Try implementing feedback tool
5. Design knowledge structure for a domain

### Advanced Path (8+ hours)
1. Complete intermediate path
2. Build a simple curator agent
3. Implement in your capstone project
4. Create a full knowledge factory
5. Deploy and measure improvement over time

---

## Key Takeaways

1. **Knowledge ≠ Context**
   - Context: what's in THIS prompt
   - Knowledge: reusable understanding maintained over time

2. **Three Types**
   - Skills (how to do things)
   - Domain facts (what's true)
   - Data locations (where to find current info)

3. **Self-Improving**
   - Agents flag gaps while working
   - Curator agent fixes gaps automatically
   - System gets better with use

4. **Production Pattern**
   - LangChain uses this internally
   - Powers LangSmith Engine, GTM agents, content studio
   - Real companies deploy this at scale

---

## Resources

### Internal
- [Concept Guide](./AG17-CONCEPT-knowledge-factory.md)
- [Enhancements](./enhancements/)
- [Implementation Guide](./enhancements/IMPLEMENTATION_GUIDE.md)

### External
- [LangChain Blog Post](https://www.langchain.com/blog/knowledge-factory)
- [LangSmith Context Hub](https://docs.smith.langchain.com/)
- [Skills Format](https://github.com/skills/spec) (emerging standard)

### Related Lessons
- AG05: Memory & Context Engineering
- AG06: Agentic RAG
- AG07: Workflow Patterns (curator is a workflow)
- AG14: Evaluation & Observability
- AG15: Production Deployment

---

## Questions?

1. **"Is this like RAG?"**
   → RAG is one component. Knowledge Factory is the whole system for maintaining knowledge.

2. **"Do I need LangSmith?"**
   → No, the pattern is tool-agnostic. LangSmith is one implementation option.

3. **"When should I build this?"**
   → When you have production traffic and changing knowledge. Not for prototypes.

4. **"Is this required for the course?"**
   → No, it's optional advanced material for production-focused students.

5. **"How long to implement?"**
   → Feedback tool: 1 hour. Basic curator: 1 day. Full system: 1-2 weeks.

---

**Ready to learn more?** Start with [`AG17-CONCEPT-knowledge-factory.md`](./AG17-CONCEPT-knowledge-factory.md)!

**Want hands-on?** Check the exercises in [`enhancements/`](./enhancements/)!

**Building production agents?** This pattern is essential for scale!

🎓 **Knowledge Factory = Agents that get smarter over time** 🚀

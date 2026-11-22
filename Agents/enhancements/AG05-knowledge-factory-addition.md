# AG05 Enhancement: Organizational Memory (Knowledge Factory)

## Where to Add This Section

**After Section 3 (Long-term Memory Store)**  
**Before Section 4 (Prompt Caching)**

**Title:** "3.5 · Beyond Session Memory: Organizational Knowledge"

---

## Markdown Cell Content

```markdown
## 3.5 · Beyond Session Memory: Organizational Knowledge

So far we've focused on **session memory**: facts from *this* conversation that help the agent complete *this* task.
But in a production system serving many users, there's another kind of memory that matters: **organizational knowledge**
that persists *across* all conversations and improves over time.

### The Knowledge Factory Pattern

Think of the difference:

| Session Memory | Organizational Knowledge |
|---|---|
| "User's son is allergic to shellfish" | "How we validate restaurant recommendations" |
| "User wants to ski in Queenstown" | "Standard questions to ask about ski trips" |
| "User prefers morning flights" | "Data location: flights table in `travel_db`" |
| Forgotten when session ends | Persists and accumulates forever |
| Helps THIS agent with THIS user | Helps ALL agents with ALL users |

**The insight from LangChain's Knowledge Factory:**
> Making AI work isn't about better models or more context—it's about better **knowledge** of how your
> company works, what standards you have, where data is stored, and how to access it.

### Three Types of Organizational Knowledge

1. **Skills (Procedural)**: How to do things properly
   - Standard procedures: "Always check delivery date before issuing refund"
   - Data access patterns: "Query revenue data from BigQuery, not Stripe API directly"
   - Company style: "Reports use 'Qx YYYY' header format"

2. **Domain Facts (Semantic)**: Core information that doesn't change often
   - Definitions: "ARR = (MRR × 12) + Annual Subscriptions"
   - Policies: "Refunds allowed within 30 days of delivery"
   - Product info: "Enterprise tier includes SSO and audit logs"

3. **Data Access Guidance (Metacognitive)**: Where to find current information
   - "Customer records: Salesforce, query via REST API"
   - "Revenue metrics: BigQuery `prod.finance.revenue` table"
   - "User events: Kafka topic `user_events` (real-time)"

### Memory in Context

```
┌─────────────────────────────────────────────┐
│  Context Engineering (This Lesson)          │
│  ─────────────────────────────────────────  │
│  Session Memory:                            │
│  • Current conversation turns               │
│  • Tool results from this session           │
│  • User preferences mentioned now           │
│  • Lasts: minutes to hours                  │
└─────────────────────────────────────────────┘
                    ↕
┌─────────────────────────────────────────────┐
│  Organizational Memory (Knowledge Factory)  │
│  ─────────────────────────────────────────  │
│  Durable Knowledge:                         │
│  • Skills all agents should use             │
│  • Domain facts everyone needs              │
│  • Data access patterns                     │
│  • Lasts: forever, improves over time       │
└─────────────────────────────────────────────┘
```

### How It Connects to This Lesson

The `long_term_memory` we built stores facts **within a session**. In a Knowledge Factory:

- **Agents flag knowledge gaps** during work (via a tool)
- **Curator agent** collects those flags and updates shared knowledge
- **Next agent** benefits from improved knowledge automatically

**Example from our travel concierge:**

```python
# Session 1: Agent struggles
user: "Book a hotel in Queenstown"
agent: search_hotels("Queenstown")  # Which country? 🤔
# Agent figures it out through conversation, but wastes turns

# Agent flags the gap:
report_knowledge_issue(
    "When user says 'Queenstown' without country, assume NZ (85% of our customers)"
)

# Curator agent (overnight) updates knowledge:
# → Adds to shared skills: "Queenstown = Queenstown, NZ unless specified"

# Session 2: Agent knows immediately
user: "Book a hotel in Queenstown"
agent: search_hotels("Queenstown, New Zealand")  # ✓ Direct!
```

### When to Use Each Type of Memory

| Use Case | Memory Type | Why |
|---|---|---|
| User said "I'm vegetarian" this session | Session memory | Personal, temporary |
| User uploaded their dietary profile | User profile DB | Personal, permanent |
| "Queenstown usually means NZ for our customers" | Org knowledge | Shared learning |
| "Always verify restaurant allergen info" | Org knowledge | Company standard |
| Current flight prices for today | API call | Changes too fast to store |

### 🎓 Key Insight

**Context engineering** (this lesson) makes a single conversation efficient.  
**Knowledge factories** (AG17 concept) make your entire agent *system* smarter over time.

Both manage what goes in the prompt—just at different scales:
- Context engineering: optimize *this* prompt
- Knowledge factory: improve *all future* prompts

### Where to Learn More

The Knowledge Factory pattern is an advanced topic covered in:
- **`agents/AG17-CONCEPT-knowledge-factory.md`** - Full concept guide
- **AG06** (next lesson) - Dynamic knowledge bases with RAG
- **AG14** - Using traces to find knowledge gaps
- **AG15** - Deploying knowledge factories in production

**For now:** Focus on session memory. The organizational layer builds on these same principles at a larger scale.
```

---

## Code Cell (Optional Demo)

```python
# Demo: Session memory vs organizational knowledge

# Session memory (what we built in §3)
session_memory = LongTermMemory()
session_memory.add_note("user_dietary", "allergic to shellfish")

# Organizational knowledge (conceptual - would be in shared system)
org_knowledge = {
    "skills": {
        "validate_restaurants": "Always check allergen info before recommending",
        "data_location": "Restaurant DB: postgres://prod/restaurants",
    },
    "facts": {
        "queenstown_default": "Queenstown, New Zealand (85% of queries)",
        "ski_season_nz": "June through October",
    },
    "access": {
        "flights_api": "Use Amadeus API for NZ domestic flights",
        "weather_api": "MetService NZ for ski conditions",
    }
}

print("Session Memory (this conversation only):")
print(f"  {session_memory.notes}")
print()
print("Organizational Knowledge (shared across all agents):")
for category, items in org_knowledge.items():
    print(f"  {category}: {len(items)} entries")
print()
print("💡 Key difference:")
print("  - Session: Forgotten after conversation")
print("  - Organizational: Persists forever, improves all future conversations")
```

---

## Exercise Addition

**Add to existing exercises:**

**Exercise 3.5: Knowledge Gap Detection**

Modify the travel concierge to detect and report knowledge gaps:

```python
@tool
def report_knowledge_issue(issue_type: str, description: str) -> str:
    """Report something that should be in the knowledge base but isn't.
    
    Args:
        issue_type: "missing", "incorrect", or "outdated"
        description: What knowledge is needed
    """
    # In production: log to tracking system
    print(f"📝 Knowledge issue: [{issue_type}] {description}")
    return "Issue reported. Will be reviewed."

# Test: Run concierge and detect when it struggles
# Where should it report a knowledge gap?
```

**Challenge question:**
> Imagine this concierge runs 1000 conversations/day. What percentage of knowledge gaps
> would you expect agents to flag correctly? What would cause false negatives (gaps missed)?
> What would cause false positives (non-gaps reported)?

---

## Why This Enhancement Fits

1. **Natural Extension**: Session memory → organizational memory is a logical progression
2. **Same Principles**: Both use memory stores, just at different scopes
3. **Forward Looking**: Prepares students for AG14 (traces) and production systems
4. **Doesn't Disrupt**: Fits cleanly after §3, before caching discussion
5. **Practical**: Students see why this matters for real systems

---

## Impact

- **5-10 minutes** additional reading time
- **Optional** code demo (doesn't break existing flow)
- **Connects** to AG06 (dynamic RAG), AG14 (traces), AG17 (full pattern)
- **Prepares** students for production thinking

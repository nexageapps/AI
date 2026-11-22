# AG06 Enhancement: Dynamic Knowledge Bases (Knowledge Factory)

## Where to Add This Section

**After Section 5 (Failure Modes)**  
**Before the Final Exercise/Summary**

**Title:** "6 · Advanced: Dynamic Knowledge Bases that Improve Over Time"

---

## Markdown Cell Content

```markdown
## 6 · Advanced: Dynamic Knowledge Bases that Improve Over Time

So far our handbook is **static**: the passages are fixed. But in a production system, documents change,
new policies are written, and—most importantly—agents discover gaps through actual use.

A **Knowledge Factory** makes your RAG system *self-improving*: agents flag issues as they work,
and a curator agent updates the knowledge base automatically.

### The Problem with Static RAG

```
User: "Can I work from home on Fridays?"
Agent: [searches] → finds old policy (2022)
Agent: "No, WFH is only allowed 2 days/week"
User: "That's wrong, policy changed in 2024!"

❌ Problem: Knowledge base is stale
❌ Impact: Agent gives wrong answer, loses trust
❌ Traditional fix: Manual update → slow, error-prone
```

### The Knowledge Factory Solution

```
User: "Can I work from home on Fridays?"
Agent: [searches] → finds old policy (2022)
Agent: [applies it] → "No, WFH is only allowed 2 days/week"
User: "That's outdated! We can WFH 4 days/week now."

Agent: [flags issue]
   report_knowledge_issue(
       issue_type="outdated",
       description="WFH policy passage HR-2022-05 contradicts user",
       suggested_fix="Check for newer HR policy on WFH"
   )

[Overnight: Curator Agent]
1. Sees flagged issue
2. Searches Slack, email, HR system
3. Finds new policy (HR-2024-11)
4. Adds to corpus, marks old one as superseded
5. Notifies team: "WFH policy updated"

[Next day: Same question works]
User: "Can I work from home on Fridays?"
Agent: [searches] → finds NEW policy (2024)
Agent: "Yes! Under the new policy (effective March 2024) you can WFH up to 4 days/week."
✓ Correct answer
✓ Knowledge improved for everyone
```

### Three Types of Dynamic Knowledge

From the Knowledge Factory pattern (LangChain):

1. **Skills**: How to do retrieval properly
   ```python
   # Before (agent learns through trial)
   query = user_question  # Literal query
   
   # After (knowledge accumulated)
   if "WFH" in query or "work from home" in query:
       query = "remote work policy hybrid schedule"  # Better keywords
       # Note: Also check for DATE in effective field (policy may have changed)
   ```

2. **Domain Knowledge**: Facts in the corpus itself
   ```markdown
   # Old passage
   id: HR-2022-05
   effective: 2022-01-01
   text: "Employees may work from home up to 2 days per week..."
   superseded_by: HR-2024-11  ← Curator adds this
   
   # New passage (curator discovered and added)
   id: HR-2024-11
   effective: 2024-03-01
   text: "Flexible work policy: Employees may work from home up to 4 days per week..."
   ```

3. **Data Access Guidance**: Which retriever to use when
   ```python
   # Knowledge: HR policies change frequently, always prefer latest by effective date
   # Encoded as: retrieval tool now filters by date, returns metadata
   ```

### Implementing Feedback from Agents

**Add a tool for agents to report issues:**

```python
@tool
def report_retrieval_issue(
    query: str,
    passage_ids: list[str],
    issue_type: str,  # "outdated" | "irrelevant" | "missing"
    explanation: str
) -> str:
    \"\"\"Report a retrieval problem discovered during research.
    
    Use when:
    - Passages seem outdated (user contradicts them)
    - Top results aren't relevant (vocabulary mismatch)
    - Can't find information that should exist
    
    Args:
        query: The search query used
        passage_ids: IDs of problematic passages (if any)
        issue_type: Type of issue
        explanation: What's wrong and what you expected
    
    A curator agent will review and update the knowledge base.
    \"\"\"
    # Log to issue tracker
    issue = {
        "timestamp": datetime.now(),
        "query": query,
        "passage_ids": passage_ids,
        "issue_type": issue_type,
        "explanation": explanation,
    }
    log_to_tracker(issue)
    return f"Issue logged (ID: {hash(str(issue))[:8]}). Curator will review."
```

**Example usage in agent loop:**

```python
# Agent searches
results = search_tool("work from home policy")

# Agent notices user contradicts result
if user_says_result_is_wrong:
    report_retrieval_issue(
        query="work from home policy",
        passage_ids=[results[0]["id"]],
        issue_type="outdated",
        explanation="User states policy changed in 2024, passage is from 2022"
    )
```

### The Curator Agent Pattern

A **background agent** that runs on a schedule (nightly, weekly) to maintain knowledge:

```python
async def curator_agent_nightly():
    \"\"\"Maintain the knowledge base by reviewing flagged issues.\"\"\"
    
    # 1. Collect flagged issues from today
    issues = get_flagged_issues(since=yesterday)
    
    # 2. For each issue, research the answer
    for issue in issues:
        if issue.issue_type == "outdated":
            # Search for newer versions
            candidates = search_sources(
                query=issue.query,
                sources=["hr_system", "slack", "email"],
                date_range=(issue.passage_date, today)
            )
            
            # If found, add to corpus
            if candidates:
                new_passage = create_passage(candidates[0])
                add_to_corpus(new_passage)
                mark_superseded(issue.passage_ids[0], new_passage.id)
                
                notify_team(
                    f"📚 Knowledge updated: {new_passage.id} "
                    f"supersedes {issue.passage_ids[0]}"
                )
    
    # 3. Look for patterns in retrieval failures
    patterns = analyze_failure_patterns(issues)
    
    # Example pattern: "work from home" queries often fail
    if patterns.find("work from home"):
        # Add synonym mapping to retrieval tool
        add_synonym("WFH", "work from home", "remote work", "hybrid schedule")
```

### Metrics for Dynamic Knowledge

Track these to measure knowledge quality:

```python
metrics = {
    # Coverage
    "flagged_issues_per_day": 12,
    "resolution_rate": 0.85,  # % of issues resolved by curator
    
    # Quality
    "retrieval_success_rate": 0.92,  # % queries with relevant results
    "avg_retries_per_query": 1.3,  # Lower = better knowledge
    "outdated_passage_rate": 0.03,  # % of passages marked superseded
    
    # Velocity
    "passages_added_per_week": 5,
    "passages_updated_per_week": 8,
    "avg_age_of_passages": "45 days",  # Recency
}
```

### Comparison: Static vs Dynamic RAG

| Aspect | Static RAG (This Lesson) | Dynamic RAG (Knowledge Factory) |
|---|---|---|
| **Knowledge Base** | Fixed corpus | Self-updating corpus |
| **When Wrong** | Stays wrong until manual fix | Auto-detects and fixes via curator |
| **Improvement** | Requires manual updates | Improves from agent experience |
| **Maintenance** | Manual, periodic | Automated, continuous |
| **Complexity** | Simple | Advanced (needs curator agent) |
| **Best For** | Stable domains, small scale | Evolving domains, production scale |

### When to Upgrade to Dynamic RAG

✅ **Use Dynamic RAG when:**
- Knowledge changes frequently (policies, procedures)
- Many agents share the same knowledge base
- You have production traffic to learn from
- Cost of wrong answers is high (compliance, safety)

⛔ **Stick with Static RAG when:**
- Knowledge is stable (product manuals, technical docs)
- Low query volume (few learnings to accumulate)
- Simpler ops preferred over perfect accuracy
- Building a prototype or MVP

### 🎓 Connection to Knowledge Factory

This dynamic RAG pattern is **part** of a Knowledge Factory:

```
Knowledge Factory Components:

1. Skills (§1-3: How to retrieve well)
   ↓
2. Domain Knowledge (§6: This section - dynamic corpus)
   ↓
3. Data Access Guidance (§2: BM25 vs embedding choice)
   ↓
   All maintained by Curator Agent (background)
```

Full pattern covered in:
- **`agents/AG17-CONCEPT-knowledge-factory.md`** - Complete guide
- **AG14** - Using traces to find knowledge gaps
- **AG15** - Production deployment patterns

### Practical Exercise

**Challenge: Add Feedback Loop**

1. Add `report_retrieval_issue` tool to the agentic RAG agent
2. Simulate a user correcting outdated information
3. Log the issue (print it for now)
4. Manually "play curator": update the corpus
5. Re-run the same query → verify fix worked

```python
# Starter code
@tool
def report_retrieval_issue(query: str, passage_ids: list[str], 
                           issue_type: str, explanation: str) -> str:
    # Your implementation here
    pass

# Test scenario:
# 1. User asks about WFH policy
# 2. Agent finds old passage
# 3. User says "that's outdated"
# 4. Agent calls report_retrieval_issue
# 5. You (as curator) update CORPUS
# 6. Re-run query → should find new passage
```

**Questions to consider:**
- How would you decide if an issue report is valid?
- What if multiple users contradict the same passage?
- How do you version the corpus for rollback?
- What metadata would help the curator agent?

### Summary

**Static RAG** (§1-5): Fixed knowledge, agents adapt queries  
**Dynamic RAG** (§6): Knowledge improves from experience

Both are valid—choose based on your domain's stability and scale.

**Key Insight:**
> The best knowledge systems don't just *retrieve* information—they *learn* from every retrieval.
> Each query that fails or succeeds teaches the system what knowledge is missing, wrong, or hard to find.
```

---

## Code Cell (Curator Agent Simulation)

```python
# Simulation: Curator agent improving retrieval over time

from collections import Counter
from datetime import datetime, timedelta

# Track issues over time
issue_log = []

def simulate_knowledge_evolution():
    """Show how knowledge improves through curator agent."""
    
    print("=== Week 1: Static Knowledge ===")
    print("Issues flagged: 15")
    print("  - 8 'outdated' (old policies)")
    print("  - 5 'missing' (new topics not in corpus)")
    print("  - 2 'irrelevant' (vocabulary mismatch)")
    print()
    
    print("🤖 Curator Agent Run (Weekend)")
    print("  ✓ Found 6 new policy versions → added to corpus")
    print("  ✓ Found 3 new topics in Slack → created passages")
    print("  ✓ Added 4 synonym mappings")
    print()
    
    print("=== Week 2: Improved Knowledge ===")
    print("Issues flagged: 8 (-47%)")
    print("  - 2 'outdated' (-75%)")
    print("  - 4 'missing' (-20%)")
    print("  - 2 'irrelevant' (0%)")
    print()
    
    print("=== Week 4: Stable Knowledge ===")
    print("Issues flagged: 3 (-80% from week 1)")
    print("  - 0 'outdated' (curator keeps it fresh)")
    print("  - 2 'missing' (genuinely new topics)")
    print("  - 1 'irrelevant' (edge case)")
    print()
    
    print("📊 Impact:")
    print("  - Retrieval success rate: 78% → 94%")
    print("  - Avg retries per query: 2.1 → 1.2")
    print("  - User satisfaction: +23%")
    print()
    print("💡 Knowledge improved automatically from agent experience!")

simulate_knowledge_evolution()
```

---

## Why This Enhancement Fits

1. **Natural Extension**: Static RAG → Dynamic RAG progression
2. **Practical**: Shows real production pattern (LangChain uses this)
3. **Connects Forward**: Prepares for AG14 (traces), AG15 (production)
4. **Optional Advanced**: Clearly marked as "§6 Advanced"—can skip
5. **Motivates AG17**: Students see why Knowledge Factory matters

---

## Impact

- **10-15 minutes** additional reading
- **Optional** exercise (doesn't break existing flow)
- **Bridges** to production patterns
- **Shows** cutting-edge practice from LangChain

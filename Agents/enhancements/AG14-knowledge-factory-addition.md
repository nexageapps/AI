# AG14 Enhancement: Knowledge Gap Analysis (Knowledge Factory)

## Where to Add This Section

**After Section 5 (Regression Gate)**  
**Before Section 6 (Production Considerations) or Final Summary**

**Title:** "5.5 · Using Traces to Find Knowledge Gaps"

---

## Markdown Cell Content

```markdown
## 5.5 · Using Traces to Find Knowledge Gaps

Traces don't just catch regressions—they reveal what knowledge your agents are missing.
Every failed trace, every unnecessary retry, every time an agent "gets lucky" without following proper
procedure... those are **signals** about gaps in your organizational knowledge.

This is a key component of the **Knowledge Factory** pattern: using observability to make your system smarter over time.

### The Pattern: From Traces to Knowledge

```
Agents work → Generate traces
       ↓
Traces analyzed → Patterns detected
       ↓
Patterns → Knowledge gaps identified
       ↓
Knowledge gaps → Curator agent updates knowledge
       ↓
Updated knowledge → Better agent behavior (repeat)
```

**Concrete example from §5:**
```python
# Remember the regression we caught?
trace = get_trace(task_id="refund_old_order")

# What the trace shows:
# Turn 1: check_order(order_id) → {status: delivered, days_ago: 45}
# Turn 2: issue_refund(order_id, 50.00) → ❌ RefundError: outside 30-day window
# Turn 3: Agent apologizes to customer

# This trace reveals TWO knowledge gaps:
```

**Gap 1: Missing Skill**
```python
# What happened: Agent checked order AFTER attempting refund (wrong order)
# What should happen: Agent checks BEFORE attempting refund
# Knowledge needed: A skill that codifies "always check delivery date first"

# How curator fixes it:
add_skill("""
@tool
def issue_refund(order_id: str, amount: float) -> str:
    '''Issue refund for an order.
    
    ⚠️ REQUIREMENT: Call check_order() FIRST and verify:
    1. Order status is 'delivered'
    2. Delivery was within last 30 days
    
    Do not issue refund if either check fails.
    '''
    ...
""")
```

**Gap 2: Missing Data Validation**
```python
# What happened: issue_refund tool didn't validate the 30-day rule
# What should happen: Tool enforces invariant, agent can't bypass it
# Knowledge needed: Domain fact about refund policy

# How curator fixes it:
# 1. Updates tool implementation to check date
# 2. Documents the rule in company wiki
# 3. Adds test case for this edge case
```

### Three Types of Knowledge Gaps Traces Reveal

#### 1. Procedural Gaps (Skills)

**Symptom in traces:** Agent succeeds but takes wrong path

```python
# Good outcome, bad trajectory
trace = [
    ("user", "I need a refund for order-789"),
    ("assistant", [tool_call("issue_refund", {"order_id": "789", "amount": 50.00})]),
    ("tool_result", "Error: Order not delivered yet"),  # ← Lucky failure
    ("assistant", [tool_call("check_order", {"order_id": "789"})]),
    ("tool_result", {"status": "shipped"}),
    ("assistant", "I see your order is still in transit...")
]

# Knowledge gap: "Always check order status BEFORE attempting refund"
# Impact: Agent got lucky (tool rejected it), but risk is there
```

**How to detect:**
```python
def analyze_trajectory_risks(trace):
    """Find cases where agent succeeded despite risky behavior."""
    risks = []
    
    # Check: refund called before check_order?
    refund_turn = find_tool_call(trace, "issue_refund")
    check_turn = find_tool_call(trace, "check_order")
    
    if refund_turn and check_turn and refund_turn < check_turn:
        risks.append({
            "type": "procedure_violation",
            "description": "Attempted refund before checking order status",
            "severity": "high",
            "suggested_fix": "Add skill: always check order before refund"
        })
    
    return risks
```

#### 2. Domain Knowledge Gaps

**Symptom in traces:** Agent asks questions it should know answers to

```python
# Agent wastes turns on known facts
trace = [
    ("user", "What's our refund window?"),
    ("assistant", [tool_call("search_docs", {"query": "refund policy"})]),  # ← Unnecessary
    ("tool_result", "30 days from delivery"),
    ("assistant", "Our refund window is 30 days...")
]

# Knowledge gap: "Refund window = 30 days" should be in agent's base knowledge
# Impact: Extra tool call (cost), slower response (latency)
```

**How to detect:**
```python
def find_repeated_queries(traces, threshold=10):
    """Find queries agents repeatedly search for → should be in base knowledge."""
    query_counts = Counter()
    
    for trace in traces:
        for turn in trace:
            if turn.tool == "search_docs":
                query_counts[turn.args["query"]] += 1
    
    # If same query appears >threshold times, it's a knowledge gap
    frequent = {q: count for q, count in query_counts.items() if count > threshold}
    
    return [{
        "query": query,
        "frequency": count,
        "suggested_fix": f"Add to base knowledge (asked {count} times)"
    } for query, count in frequent.items()]
```

#### 3. Data Access Gaps

**Symptom in traces:** Agent tries wrong data sources, backtracks

```python
# Agent doesn't know where data lives
trace = [
    ("user", "Show revenue for Q3"),
    ("assistant", [tool_call("query_stripe_api", {"query": "revenue"})]),  # ← Wrong source
    ("tool_result", "Error: Stripe doesn't have aggregated revenue"),
    ("assistant", [tool_call("query_bigquery", {"query": "SELECT SUM(revenue)..."})]),  # ← Right source
    ("tool_result", "$2.4M"),
    ("assistant", "Q3 revenue was $2.4M")
]

# Knowledge gap: "Revenue data lives in BigQuery, not Stripe"
# Impact: Wasted API call, wrong path, slower
```

**How to detect:**
```python
def find_data_access_confusion(trace):
    """Find cases where agent tried wrong data source first."""
    issues = []
    
    # Pattern: same query type, different sources, one failed
    for i in range(len(trace) - 1):
        if (trace[i].tool in DATA_SOURCES and 
            trace[i].result.startswith("Error") and
            trace[i+1].tool in DATA_SOURCES):
            
            issues.append({
                "type": "wrong_data_source",
                "query_type": infer_query_type(trace[i].args),
                "wrong_source": trace[i].tool,
                "right_source": trace[i+1].tool,
                "suggested_fix": f"Document: {query_type} data lives in {right_source}"
            })
    
    return issues
```

### Building a Knowledge Gap Analyzer

**Practical implementation:**

```python
class KnowledgeGapAnalyzer:
    """Analyze traces to find knowledge gaps across many runs."""
    
    def __init__(self):
        self.gaps = {
            "procedural": [],   # Skills to add
            "domain": [],       # Facts to document
            "data_access": [],  # Data locations to clarify
        }
    
    def analyze_trace(self, trace):
        """Analyze one trace for knowledge gaps."""
        # Procedural gaps
        self.gaps["procedural"].extend(
            analyze_trajectory_risks(trace)
        )
        
        # Domain gaps (repeated queries)
        if hasattr(trace, 'query_history'):
            for query in trace.query_history:
                if self._is_common_question(query):
                    self.gaps["domain"].append({
                        "query": query,
                        "fix": "Add to base knowledge"
                    })
        
        # Data access gaps
        self.gaps["data_access"].extend(
            find_data_access_confusion(trace)
        )
    
    def analyze_batch(self, traces):
        """Analyze many traces to find patterns."""
        for trace in traces:
            self.analyze_trace(trace)
        
        # Find patterns across traces
        return self._aggregate_findings()
    
    def _aggregate_findings(self):
        """Group similar gaps, prioritize by frequency."""
        # Group by similarity
        grouped = {}
        for gap_type, gaps in self.gaps.items():
            counter = Counter(gap["description"] for gap in gaps)
            grouped[gap_type] = [
                {"description": desc, "frequency": count, "priority": self._priority(count)}
                for desc, count in counter.most_common()
            ]
        
        return grouped
    
    def _priority(self, frequency):
        """Priority based on how often gap appears."""
        if frequency > 50: return "critical"
        if frequency > 20: return "high"
        if frequency > 5: return "medium"
        return "low"
```

**Usage:**

```python
# Collect traces from production (last week)
traces = get_production_traces(since=one_week_ago)

# Analyze for knowledge gaps
analyzer = KnowledgeGapAnalyzer()
gaps = analyzer.analyze_batch(traces)

print("📊 Knowledge Gaps Detected:")
for gap_type, items in gaps.items():
    print(f"\n{gap_type.upper()}:")
    for item in items[:5]:  # Top 5
        print(f"  [{item['priority']}] {item['description']}")
        print(f"    Frequency: {item['frequency']} times this week")

# Output:
# PROCEDURAL:
#   [critical] Attempted refund before checking order status
#     Frequency: 67 times this week
#   [high] Queried Stripe before BigQuery for revenue data
#     Frequency: 34 times this week
#
# DOMAIN:
#   [critical] Asked about refund window (30 days)
#     Frequency: 89 times this week
#   [medium] Asked about customer tier definitions
#     Frequency: 23 times this week
```

### From Analysis to Action: The Curator Agent

Once gaps are identified, the **curator agent** (see AG17-CONCEPT) acts on them:

```python
async def curator_weekly_run():
    """Weekly job: analyze traces → update knowledge."""
    
    # 1. Get traces and analyze
    traces = get_production_traces(since=one_week_ago)
    gaps = KnowledgeGapAnalyzer().analyze_batch(traces)
    
    # 2. For each critical/high priority gap, take action
    for gap in gaps["procedural"]:
        if gap["priority"] in ["critical", "high"]:
            # Create or update skill
            skill = generate_skill_from_gap(gap)
            review_ticket = create_review_ticket(skill, gap)
            
            # If confidence is high, auto-apply
            if gap["frequency"] > 100 and not has_risk(skill):
                add_to_skill_library(skill)
                notify_team(f"✅ Auto-added skill: {skill.name}")
            else:
                notify_team(f"🔍 Review needed: {review_ticket.url}")
    
    # 3. For domain gaps, update documentation
    for gap in gaps["domain"]:
        if gap["priority"] in ["critical", "high"]:
            # Search for authoritative answer
            answer = search_company_sources(gap["description"])
            
            if answer.confidence > 0.9:
                add_to_knowledge_base(gap["description"], answer.text)
                notify_team(f"📚 Added to knowledge: {gap['description']}")
    
    # 4. For data access gaps, update data catalog
    for gap in gaps["data_access"]:
        update_data_catalog(
            query_type=gap["query_type"],
            correct_source=gap["right_source"],
            wrong_source=gap["wrong_source"]
        )
```

### Metrics: Knowledge Quality Over Time

Track these to see if knowledge is improving:

```python
# Week 1 (before curator)
metrics_week1 = {
    "knowledge_gaps_detected": 156,
    "procedural_violations": 67,
    "repeated_queries": 89,
    "wrong_data_source_tries": 34,
    "avg_turns_per_task": 4.2,
}

# Week 4 (after 3 curator runs)
metrics_week4 = {
    "knowledge_gaps_detected": 42,  # -73%
    "procedural_violations": 8,     # -88%
    "repeated_queries": 12,         # -87%
    "wrong_data_source_tries": 3,   # -91%
    "avg_turns_per_task": 2.8,      # -33%
}

print("📈 Knowledge Improvement:")
print(f"  Total gaps: {metrics_week1['knowledge_gaps_detected']} → {metrics_week4['knowledge_gaps_detected']}")
print(f"  Efficiency: {metrics_week1['avg_turns_per_task']:.1f} → {metrics_week4['avg_turns_per_task']:.1f} turns/task")
print()
print("💡 System is learning from experience!")
```

### Exercise: Build a Gap Detector

**Challenge:** Implement a simple knowledge gap detector

```python
def find_knowledge_gaps(traces):
    """Analyze traces to find top 3 knowledge gaps.
    
    Returns:
        List of dicts with:
        - type: "procedural", "domain", or "data_access"
        - description: what's missing
        - evidence: which traces show this
        - frequency: how often it appears
    """
    # Your implementation here
    # Hint: Look for patterns in the traces
    pass

# Test with traces from §2-4
traces = [refund_trace, policy_trace, revenue_trace]
gaps = find_knowledge_gaps(traces)

for gap in gaps:
    print(f"[{gap['type']}] {gap['description']}")
    print(f"  Frequency: {gap['frequency']}")
    print(f"  Evidence: {gap['evidence']}")
```

### Summary: Traces → Knowledge → Better Agents

**This lesson taught:**
- Traces for catching regressions (§1-5)
- **Traces for finding knowledge gaps (§5.5)** ← New

**The flywheel:**
```
1. Agents work → generate traces
2. Traces reveal knowledge gaps
3. Curator agent fills gaps
4. Better knowledge → fewer gaps in future traces
5. Repeat
```

**Key insight:**
> Every trace that shows an agent struggling, backtracking, or "getting lucky"
> is a signal about missing knowledge. In a Knowledge Factory, those signals
> automatically improve the system.

**Where this fits:**
- **AG05** - Organizational memory (concept)
- **AG06** - Dynamic RAG (updating corpus)
- **AG14** - Using traces (this section)
- **AG15** - Production deployment (next lesson)
- **AG17-CONCEPT** - Full Knowledge Factory pattern

### 🎓 Production Perspective

In production:
- Thousands of traces per day
- Patterns invisible in single traces become clear in aggregate
- Automated analysis finds gaps no human would spot
- Curator agent runs continuously, improving knowledge 24/7

This is how production agent systems get smarter over time—not from manual updates,
but from learning from their own experience.
```

---

## Code Cell: Full Gap Analysis Demo

```python
# Demo: Knowledge gap analysis on AG14 traces

from collections import Counter, defaultdict

class SimpleGapDetector:
    """Lightweight knowledge gap detector."""
    
    def __init__(self):
        self.tool_sequences = []
        self.error_patterns = []
        self.query_repetitions = Counter()
    
    def analyze(self, trace):
        """Analyze one trace."""
        # Extract tool call sequence
        tools = [turn.tool for turn in trace if hasattr(turn, 'tool')]
        self.tool_sequences.append(tools)
        
        # Find errors followed by retries
        for i in range(len(trace) - 1):
            if hasattr(trace[i], 'result') and 'error' in trace[i].result.lower():
                self.error_patterns.append({
                    "failed_tool": trace[i].tool,
                    "next_tool": trace[i+1].tool if i+1 < len(trace) else None
                })
    
    def report(self):
        """Generate gap report."""
        print("🔍 Knowledge Gap Analysis\n")
        
        # Procedural: tools called in wrong order
        print("PROCEDURAL GAPS (Wrong Order):")
        refund_before_check = sum(
            1 for seq in self.tool_sequences
            if 'issue_refund' in seq and 'check_order' in seq
            and seq.index('issue_refund') < seq.index('check_order')
        )
        if refund_before_check:
            print(f"  ⚠️  Refund before check: {refund_before_check} times")
            print("      FIX: Add skill 'always check order before refund'")
        
        print()
        
        # Data access: wrong source tried first
        print("DATA ACCESS GAPS (Wrong Source):")
        wrong_source = [
            p for p in self.error_patterns
            if p['failed_tool'] in ['query_stripe_api', 'query_database']
        ]
        if wrong_source:
            print(f"  ⚠️  Tried wrong data source: {len(wrong_source)} times")
            for p in wrong_source[:3]:
                print(f"      {p['failed_tool']} → {p['next_tool']}")
            print("      FIX: Document where each data type lives")

# Run on traces from this lesson
detector = SimpleGapDetector()

# Simulate some traces
example_traces = [
    # Trace 1: Refund without checking (bad order)
    [
        {"tool": "issue_refund", "result": "Error: Order not delivered"},
        {"tool": "check_order", "result": '{"status": "shipped"}'},
    ],
    # Trace 2: Query wrong database first
    [
        {"tool": "query_stripe_api", "result": "Error: Data not in Stripe"},
        {"tool": "query_bigquery", "result": "Success: $2.4M"},
    ],
]

for trace in example_traces:
    detector.analyze(trace)

detector.report()

print("\n💡 These patterns, repeated across thousands of traces,")
print("   reveal exactly what knowledge the system is missing!")
```

---

## Why This Enhancement Fits

1. **Natural Extension**: Traces → Evaluation → Knowledge Gap Analysis
2. **Practical Value**: Shows how to actually use traces for improvement
3. **Connects Pattern**: Ties AG14 to Knowledge Factory concept
4. **Production Ready**: This is what LangSmith, LangChain actually do
5. **Motivates AG17**: Students see why knowledge factories matter

---

## Impact

- **10-15 minutes** additional reading
- **Optional** exercise (existing flow intact)
- **Shows production practice** from LangChain
- **Bridges** AG14 → AG15 → AG17

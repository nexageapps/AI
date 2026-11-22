# AG17 Concept: Knowledge Factory for AI Agents

## 🎯 Overview

**The Knowledge Factory** is a system for collecting, curating, and maintaining organizational knowledge that agents need to work effectively.

**Source:** Based on [LangChain's Knowledge Factory pattern](https://www.langchain.com/blog/knowledge-factory)

**Key Insight:**
> Making AI work isn't about better models or more context—it's about better **knowledge**. The system that collects, curates, and maintains that knowledge is a Knowledge Factory.

---

## 🤔 Context vs Knowledge

### Context
What an agent has available **when doing a task**.
- Raw data (revenue numbers, user records)
- Current state (recent messages, active tickets)
- Immediate inputs (user query, form submission)

### Knowledge
**Reusable understanding** maintained so the agent can do tasks correctly:
- What a metric means (how we calculate ARR)
- Which source to trust (use production DB, not staging)
- How we handle situations (escalation procedures)

**A Knowledge Factory turns scattered documents and experience into knowledge that becomes context for future work.**

---

## 🏗️ Relationship to Existing Lessons

### Builds On
- **AG03: Tools Done Right** - Skills are codified as tools
- **AG05: Memory and Context Engineering** - Knowledge is a form of long-term memory
- **AG06: Agentic RAG** - Domain knowledge often stored in documents
- **AG07: Workflow Patterns** - Curator agent is a background workflow

### Complements
- **AG09: Human-in-the-Loop** - Humans curate knowledge
- **AG14: Evaluation & Observability** - Traces reveal missing knowledge
- **AG16: n8n Integration** - Workflows can trigger knowledge updates

### Enables
- **Production agents** that improve over time
- **Self-learning systems** that codify experience
- **Organizational memory** that persists beyond individuals

---

## 📦 Three Pieces of Knowledge

### 1. Skills (Procedural Memory)
**How to do work "properly" inside your company.**

Examples:
- How to format LangChain reports (header, sections, style)
- How to create Jira tickets (required fields, naming conventions)
- How to respond to customer complaints (tone, escalation criteria)

**Storage:** GitHub, Context Hub, skills format

**Before Knowledge Factory:**
> "Just check with Sarah, she knows how we do reports."

**After:**
```python
# Stored as a skill
@tool
def create_langchain_report(data: dict) -> str:
    """Create a report in LangChain style.
    
    Standards:
    - Use 'LangChain Revenue Report' header
    - Include Executive Summary section
    - Format currency as $X.XXM
    - Include MoM and YoY comparisons
    """
    ...
```

---

### 2. Domain Knowledge (Semantic Memory)
**How the business works.**

Examples:
- How we calculate ARR (formula, edge cases)
- Who our competitors are (names, positioning)
- What our product tiers include (features per tier)
- Internal definitions (what counts as "active user")

**Storage:** Company wiki, Notion, knowledge graphs, OKF format

**Before:**
> "I think ARR is just... yearly revenue? Or is it something else?"

**After:**
```markdown
# Annual Recurring Revenue (ARR)

**Definition:** Total value of all active subscriptions normalized to 1 year.

**Formula:** 
ARR = (Monthly Recurring Revenue × 12) + Annual Subscriptions

**Excludes:**
- One-time setup fees
- Usage-based charges
- Free tier users

**Source of Truth:** finance_db.arr_calculations table
**Updated:** Monthly, automated via Airflow
```

---

### 3. Data Access Guidance (Metacognitive Memory)
**Where to get current information.**

Examples:
- Revenue data lives in BigQuery `prod.finance.revenue`
- Customer data in Salesforce (use API, not web scrape)
- Usage metrics in Snowflake `analytics.product_usage`
- Real-time events in Kafka topic `user_events`

**Storage:** Often as skills, documentation, or data catalog

**Before:**
> "Is this in the database? Which one? What's the table called?"

**After:**
```python
@tool
def get_revenue_data(start_date: str, end_date: str) -> str:
    """Get revenue data for date range.
    
    Data location: BigQuery prod.finance.revenue
    Columns:
    - date (DATE)
    - amount_usd (NUMERIC)
    - customer_id (STRING)
    - product_tier (STRING: 'free', 'pro', 'enterprise')
    
    Note: Data is refreshed daily at 2 AM UTC.
    For real-time data, query Stripe API instead.
    """
    ...
```

---

## ⚙️ The Factory Components

### 1. Feedback Mechanism
**Agents flag missing or wrong knowledge.**

```python
@tool
def report_knowledge_issue(
    issue_type: str,  # "missing" | "incorrect" | "outdated"
    description: str,
    suggested_fix: str = ""
) -> str:
    """Report a knowledge gap or error.
    
    Use this when:
    - You can't find information to complete a task
    - You discover information is incorrect
    - You learn something that should be documented
    
    The curator agent will review and update knowledge.
    """
    # Log to issue tracker
    issue_id = log_to_tracker(issue_type, description, suggested_fix)
    return f"Knowledge issue #{issue_id} reported. Curator will review."
```

**Example usage:**
```python
# Agent working on report
revenue_data = get_revenue_data("2024-01-01", "2024-01-31")

# Agent notices column name changed
if "revenue_usd" not in revenue_data.columns:
    if "amount_usd" in revenue_data.columns:
        report_knowledge_issue(
            issue_type="outdated",
            description="get_revenue_data documentation says column is 'revenue_usd' but actual column is 'amount_usd'",
            suggested_fix="Update tool docstring to reference 'amount_usd' column"
        )
```

---

### 2. Curator Agent
**Background agent that maintains knowledge.**

**Responsibilities:**
1. **Review flagged issues** from working agents
2. **Inspect traces** to find patterns (what do agents struggle with?)
3. **Update knowledge** by synthesizing multiple sources
4. **Resolve conflicts** when different sources disagree
5. **Run on schedule** (nightly, weekly, after major changes)

**Access to:**
- Raw data sources (Notion, Slack, Google Docs, GitHub)
- Agent traces (LangSmith, custom observability)
- Flagged issues (issue tracker)
- Current knowledge base (skills repo, wiki, knowledge graph)

**Example curator workflow:**
```python
async def curator_agent_run():
    """Nightly curator agent run."""
    
    # 1. Collect flagged issues
    issues = get_flagged_issues(since=yesterday)
    
    # 2. Inspect recent traces
    traces = get_agent_traces(since=yesterday, min_turns=3)
    failures = [t for t in traces if t.result == "error"]
    
    # 3. Find patterns
    patterns = analyze_common_failures(failures)
    # Example: 40% of failures mention "can't find customer data"
    
    # 4. Research solutions
    for pattern in patterns:
        # Check Slack conversations
        slack_context = search_slack(pattern.keywords)
        
        # Check documentation
        docs = search_notion(pattern.keywords)
        
        # Synthesize
        solution = synthesize_solution(pattern, slack_context, docs)
        
        # 5. Update knowledge
        if solution.confidence > 0.8:
            update_knowledge_base(solution)
            notify_team(f"Auto-updated knowledge: {solution.title}")
        else:
            create_review_ticket(solution)
            notify_team(f"Needs review: {solution.title}")
```

---

### 3. Knowledge Storage
**Where knowledge lives.**

**Options:**

**Skills (Procedural):**
```
GitHub repo:
  skills/
    create_report.py
    handle_complaint.py
    query_revenue.py
```

**Domain Knowledge (Semantic):**
```
Notion:
  Company Wiki/
    Finance/ARR Definition
    Products/Feature Matrix
    Sales/Competitor Analysis

Or: Knowledge Graph (Neo4j)
Or: Context Hub (LangSmith)
Or: OKF format (Open Knowledge Format)
```

**Data Guidance (Metacognitive):**
```
Data Catalog (Notion/Confluence):
  Databases/
    BigQuery/
      prod.finance.revenue (docs)
    Salesforce (API docs)
```

**LangChain's take:**
> "This is actually the least important thing... The curator agent should know how to interact with all formats. It's early and no standard has emerged yet."

**Practical advice:** Start simple (Markdown files, GitHub), evolve as needed.

---

## 🔄 The Complete Loop

### Example: Revenue Report Agent

**1. Initial State**
```
Skills: ✓ How to format reports (in GitHub)
Domain: ✓ ARR definition (in wiki)
Data: ✓ How to query BigQuery (documented)
```

**2. Agent Runs**
```python
# Agent tries to create report
data = query_bigquery("SELECT * FROM prod.finance.revenue")
# ❌ Error: Column 'revenue_usd' not found

# Agent adapts on the fly
columns = data.columns
if 'amount_usd' in columns:
    data = data.rename(columns={'amount_usd': 'revenue'})
    
# Agent flags issue
report_knowledge_issue(
    issue_type="outdated",
    description="Column renamed from revenue_usd to amount_usd",
    suggested_fix="Update query_revenue tool to use amount_usd"
)

# Agent completes task
report = create_report(data)
```

**3. Human Collaboration**
```
Finance Lead: "Hey, use this new header format"
Agent: "Got it, using new header"
[Agent completes report with new header]
```

**4. Curator Agent (Nightly)**
```python
# Reviews flagged issue
issue = "Column renamed revenue_usd → amount_usd"

# Confirms by checking BigQuery schema
schema = get_bigquery_schema("prod.finance.revenue")
assert "amount_usd" in schema
assert "revenue_usd" not in schema

# Updates skill
update_tool_docstring(
    tool="query_revenue",
    old="Column: revenue_usd",
    new="Column: amount_usd"
)

# Reviews traces
trace = get_trace(agent="revenue_report", date=today)
# Sees back-and-forth with Finance Lead about header

# Extracts new requirement
new_requirement = extract_requirement(trace.messages)
# "Use 'Q1 2024 Revenue Analysis' format for headers"

# Updates skill
update_skill(
    skill="create_report",
    section="header_format",
    new_rule="Use 'Qx YYYY Revenue Analysis' format"
)

# Notifies team
notify_slack(
    "#engineering",
    "Knowledge updated:\n"
    "- Fixed revenue column name\n"
    "- Codified new header format"
)
```

**5. Next Run**
```python
# Next agent run automatically uses updated knowledge
# No errors, no back-and-forth needed
# Knowledge accumulated for everyone
```

---

## 🎓 How This Fits Your Curriculum

### Option 1: Standalone Lesson (AG17)
**"Building a Knowledge Factory"**

**Time:** 3-4 hours

**Parts:**
1. Context vs Knowledge (concepts)
2. Three types of knowledge (skills, domain, data)
3. Building feedback mechanisms (tools for agents)
4. Building a curator agent (background workflow)
5. Storage strategies (where to keep knowledge)
6. Production example (revenue report)

**Exercises:**
- Build a feedback tool for agents
- Create a simple curator agent
- Design knowledge structure for a domain

---

### Option 2: Enhance Existing Lessons

**AG05: Memory and Context Engineering**
- Add section on "Organizational Memory"
- Distinguish working memory vs long-term knowledge
- Show how knowledge persists beyond context windows

**AG06: Agentic RAG**
- Add "Dynamic Knowledge Base" pattern
- Show how agents can update the knowledge they retrieve from
- Curator agent that improves RAG corpus

**AG07: Workflow Patterns**
- Add "Curator Pattern" workflow
- Background agent that runs on schedule
- Feedback loop from working agents to curator

**AG14: Evaluation & Observability**
- Add "Knowledge Gap Analysis" from traces
- Show how traces reveal missing knowledge
- Metrics for knowledge quality

**AG15: Production Capstone**
- Add knowledge factory to production system
- Show how production agents improve over time
- Deployment patterns for curator agents

---

### Option 3: Advanced Elective (Recommended)

**AG17: Knowledge Factory (Advanced)**

**Prerequisites:**
- AG05 (Memory)
- AG06 (RAG)
- AG07 (Workflows)
- AG14 (Observability)

**Time:** 4-5 hours

**Why Advanced:**
- Combines multiple concepts (memory, RAG, workflows, observability)
- Requires understanding of production systems
- More about system design than coding
- Best understood after building simpler agents

**Structure:**
1. **Motivation** (30 min)
   - Why knowledge factories matter
   - Context vs knowledge
   - Software factory → knowledge factory analogy

2. **Knowledge Types** (60 min)
   - Skills, domain, data guidance
   - How to identify each type
   - Storage strategies for each
   - Hands-on: Audit your domain

3. **Feedback Mechanisms** (60 min)
   - Tools for flagging issues
   - Trace analysis patterns
   - Build: Add feedback to existing agent
   
4. **Curator Agent** (90 min)
   - Background workflow pattern
   - Synthesizing from multiple sources
   - Conflict resolution
   - Build: Simple curator for one knowledge type

5. **Production Patterns** (60 min)
   - Full loop example
   - Monitoring knowledge quality
   - Versioning and rollback
   - Deploy: Add to capstone project

---

## 💡 Key Concepts to Teach

### 1. Knowledge Accumulates
Traditional software: you write it once.
Knowledge factory: **doing the work improves the knowledge**.

### 2. Agents as Sensors
Working agents detect knowledge gaps.
They're not just workers—they're sensors for what's missing.

### 3. Curator ≠ Worker
Don't ask working agents to maintain knowledge.
Separate concerns: workers work, curators curate.

### 4. Start Small, Iterate
Don't document everything upfront.
Start with one workflow, see where agents struggle, close that loop.

### 5. Knowledge Has Velocity
Some knowledge changes fast (data locations, column names).
Some is stable (company values, calculation definitions).
Store accordingly.

---

## 🛠️ Implementation Considerations

### For Your Repo

**Easy Wins:**
1. Add `report_knowledge_issue` tool to existing agents
2. Update AG06 with "Dynamic RAG" section
3. Add curator pattern to AG07 workflows
4. Update AG14 with knowledge gap analysis

**Medium Effort:**
1. Create AG17 standalone lesson
2. Full end-to-end example in capstone (AG15)
3. Build simple curator agent template

**Advanced:**
1. Integrate with LangSmith Context Hub
2. Support for OKF (Open Knowledge Format)
3. Knowledge graph storage patterns

---

## 📚 Resources

**LangChain Article:**
https://www.langchain.com/blog/knowledge-factory

**Related Concepts:**
- Skills (procedural memory for agents)
- OKF (Open Knowledge Format) - emerging standard
- Context Hub (LangSmith) - knowledge storage
- Memory systems (AG05)
- RAG patterns (AG06)

**Tools to Explore:**
- LangSmith for traces and context storage
- Neo4j for knowledge graphs
- GitHub for skills storage
- Notion/Confluence for domain knowledge

---

## 🎯 Learning Objectives (If Made Into AG17)

After completing this lesson, students will:

1. ✅ **Distinguish** between context, knowledge, and data
2. ✅ **Identify** three types of knowledge (skills, domain, data guidance)
3. ✅ **Design** feedback mechanisms for agents to report knowledge gaps
4. ✅ **Build** a curator agent that maintains knowledge over time
5. ✅ **Implement** a complete knowledge factory for a domain
6. ✅ **Evaluate** knowledge quality and coverage

---

## 🤔 Decision Time

**Should we build this into your repo?**

**Yes, if:**
- ✅ You want to cover advanced production patterns
- ✅ Students are building real agents for companies
- ✅ You want to teach system-level thinking
- ✅ You have time for 1-2 more advanced lessons

**Not yet, if:**
- Students are still learning basics
- Focus is on individual agents, not systems
- Time-constrained curriculum
- Want to see if the pattern becomes standard first

**My recommendation:**
1. **Now**: Add concepts to existing lessons (AG05, AG06, AG07, AG14)
2. **Soon**: Create AG17 as advanced elective
3. **Later**: Update capstone (AG15) to include knowledge factory

This builds on the strong foundation you have while introducing cutting-edge production patterns!

What do you think? Should we:
1. **Enhance existing lessons** with knowledge factory concepts?
2. **Create AG17** as a new standalone lesson?
3. **Both** - enhance some, create new for deep dive?

# AG16 Learning Guide: n8n Workflow Integration

## 🎯 Learning Objectives

By the end of this lesson, you will be able to:

1. ✅ **Explain** the difference between agent reasoning and workflow execution
2. ✅ **Design** tools that integrate external APIs with AI agents
3. ✅ **Implement** error handling that enables agent recovery
4. ✅ **Build** agents that orchestrate multi-step automated processes
5. ✅ **Deploy** production-ready agent + workflow systems

---

## 📚 Prerequisites

**Required Knowledge:**
- AG02: The Agent Loop from Scratch
- AG03: Tools Done Right
- Basic Python (functions, classes, error handling)
- Basic HTTP/REST concepts

**Nice to Have:**
- AG07: Workflow Patterns
- Experience with automation tools
- Understanding of API design

**Time Required:** 3-4 hours

---

## 🗺️ Learning Path

### Phase 1: Understand the Concepts (30 min)

**Goal:** Understand WHY we integrate agents with workflows

**Activities:**
1. Read "Why n8n + AI Agents?" in the notebook
2. Study the architecture diagram in `documentation/n8n-architecture.md`
3. Ask yourself:
   - What can agents do that workflows can't?
   - What can workflows do that agents can't?
   - Why combine them?

**Key Insight:** 
> Agents decide WHAT to do (reasoning, planning, adaptation)
> Workflows decide HOW to do it (reliable execution, integrations)

**Checkpoint:**
- [ ] Can you explain when to use an agent vs a workflow?
- [ ] Can you list 3 benefits of combining them?

---

### Phase 2: Setup and Basics (30 min)

**Goal:** Get n8n running and understand basic operations

**Activities:**
1. Follow `N8N_QUICKSTART.md` to install n8n
2. Create your first test workflow in the n8n UI
3. Trigger it manually to see it work
4. Use the Python client directly (no agent yet)

```python
from agentkit.n8n_tools import get_n8n_client

client = get_n8n_client()
workflows = client.list_workflows()
print(workflows)
```

**Key Skills:**
- Environment variable configuration
- REST API basics
- n8n workflow creation

**Checkpoint:**
- [ ] Is n8n running and accessible?
- [ ] Can you list workflows via the Python client?
- [ ] Can you trigger a workflow manually?

---

### Phase 3: Tool Design Study (45 min)

**Goal:** Understand how to build tools for agents

**Activities:**
1. Read the entire `agentkit/n8n_tools.py` file
2. Focus on the learning notes (🎓) in the code
3. Study ONE tool deeply: `n8n_trigger_workflow`

**Study Questions:**
- Why does the tool accept `data: str` instead of `data: dict`?
- Why do we return error strings instead of raising exceptions?
- What is the @tool decorator doing?
- How does the tool schema help the LLM?

**Exercise: Analyze a Tool**

Fill in this analysis for `n8n_trigger_workflow`:

```
Tool Name: n8n_trigger_workflow

Purpose (in one sentence):
_________________________________________________

Inputs:
1. workflow_id (type: _____, purpose: _______)
2. data (type: _____, purpose: _______)

Output (type: _____, format: _______)

Error Handling Strategy:
_________________________________________________

Why this design?
_________________________________________________
```

**Key Insight:**
> Tools are the boundary between agent reasoning (LLM) and 
> the real world (APIs, files, databases). Design them carefully!

**Checkpoint:**
- [ ] Can you explain why tools return strings?
- [ ] Can you explain the @tool decorator?
- [ ] Can you write a simple tool from scratch?

---

### Phase 4: Build Your First Integration (60 min)

**Goal:** Create an agent that uses n8n tools

**Activities:**
1. Open `AG16-n8n-workflow-integration.ipynb`
2. Work through Part 1 and Part 2
3. Run every cell and READ the outputs
4. Modify prompts and observe changes

**Experiment:**
Change the system prompt to be more specific:
```python
system = """
You are a workflow assistant. 
When asked to do something:
1. FIRST check what workflows exist
2. THEN trigger the appropriate one
3. ALWAYS report back what happened
"""
```

**Key Skills:**
- Combining LLM + ToolBox + tools
- Writing effective system prompts
- Debugging agent behavior with traces

**Checkpoint:**
- [ ] Can your agent list workflows?
- [ ] Can it trigger a workflow you specify?
- [ ] Can it handle errors gracefully?

---

### Phase 5: Real-World Patterns (60 min)

**Goal:** Learn production-ready patterns

**Activities:**
1. Complete Part 3 and Part 4 of the notebook
2. Study the three patterns:
   - Workflow chaining
   - Conditional routing
   - Monitoring

**Deep Dive: Workflow Chaining**

Understand this pattern:
```python
# The agent needs to:
# 1. Trigger workflow A
# 2. Get the result
# 3. Pass that result to workflow B
# 4. Pass workflow B's result to workflow C

# Why not hardcode this?
# Because the agent can adapt if any step fails!
```

**Exercise: Design a Pattern**

Design a workflow pattern for this scenario:

```
Scenario: Customer submits a form
Requirements:
- Validate the data
- If valid: Create account + Send welcome email
- If invalid: Send error notification
- Log everything

Your pattern:
_________________________________________________
_________________________________________________
_________________________________________________
```

**Checkpoint:**
- [ ] Can you implement workflow chaining?
- [ ] Can you add conditional logic?
- [ ] Can you handle failures in a chain?

---

### Phase 6: Production Considerations (45 min)

**Goal:** Understand what it takes to deploy this

**Activities:**
1. Read Part 5 of the notebook (Production Agent)
2. Study `documentation/n8n-integration-guide.md` security section
3. Think about monitoring and observability

**Production Checklist:**

```
Security:
[ ] API keys in environment variables
[ ] HTTPS in production
[ ] Input validation
[ ] Rate limiting

Reliability:
[ ] Error handling at every level
[ ] Retry logic for transient failures
[ ] Logging and tracing
[ ] Monitoring for workflow failures

Observability:
[ ] Agent traces (agentkit.trace.Tracer)
[ ] n8n execution logs
[ ] Metrics dashboard
[ ] Alerting for failures
```

**Key Insight:**
> In production, the code is 20% of the work.
> Monitoring, error handling, and operations are 80%.

**Checkpoint:**
- [ ] Can you list 5 production concerns?
- [ ] Do you know where logs are?
- [ ] Can you monitor execution status?

---

## 🎓 Exercises (Choose Your Level)

### Beginner: Notification Agent

**Time:** 30 minutes

Build an agent that:
1. Asks the user what notification to send
2. Lists available notification workflows
3. Triggers the appropriate one
4. Confirms success

**Learning Focus:** Basic tool usage, prompting

---

### Intermediate: Data Pipeline Agent

**Time:** 60 minutes

Build an agent that orchestrates a 3-step ETL pipeline:
1. Extract data from source
2. Transform and validate
3. Load to destination

Handle failures at each step.

**Learning Focus:** Workflow chaining, error recovery

---

### Advanced: Monitoring & Recovery Agent

**Time:** 90 minutes

Build an agent that:
1. Runs on a schedule (every 5 minutes)
2. Checks recent workflow executions
3. Detects patterns in failures
4. Attempts smart recovery (retry, escalate, or fix)
5. Reports to a monitoring dashboard

**Learning Focus:** Production patterns, autonomous behavior

---

### Challenge: Build Your Own Integration

**Time:** 2-3 hours

Pick ANY external service with an API and:
1. Write tools to interact with it (like we did for n8n)
2. Create workflows in n8n that use this service
3. Build an agent that combines your tools + n8n
4. Write documentation and examples

**Learning Focus:** Full integration design, tool creation

---

## 🧠 Concept Map

```
AI Agent System
│
├── Agent Loop (AG02)
│   ├── LLM decides what to do
│   ├── Calls tools to act
│   └── Interprets results
│
├── Tools (AG03)
│   ├── Tool schema (for LLM)
│   ├── Tool function (for execution)
│   └── Error handling (for recovery)
│
└── External Systems (AG16)
    ├── n8n Workflows
    │   ├── Reliable execution
    │   ├── Service integrations
    │   └── Error handling + retries
    │
    └── Integration Layer
        ├── Client (HTTP communication)
        ├── Tools (agent interface)
        └── Patterns (how to combine)
```

---

## 📖 Key Concepts Explained

### Separation of Concerns

**Agent Responsibility:**
- Understand user intent
- Decide which workflows to use
- Determine what data to pass
- Interpret results
- Handle high-level errors

**Workflow Responsibility:**
- Execute reliably
- Integrate with services
- Handle retries
- Manage service-specific errors

**Why separate?**
- Agents are non-deterministic (LLM behavior)
- Workflows are deterministic (guaranteed execution)
- Each layer can be tested independently

---

### Error Handling Strategy

**3 Levels of Error Handling:**

1. **Tool Level** (agentkit/n8n_tools.py)
   - Catch all exceptions
   - Return error as string
   - Never raise into agent loop

2. **Agent Level** (agent reasoning)
   - Interpret error strings
   - Decide on recovery strategy
   - Try alternative approaches

3. **Workflow Level** (n8n)
   - Service-specific errors
   - Retry logic
   - Circuit breakers

**Why?**
> Agents can reason about failures and adapt.
> This is impossible if exceptions crash the loop!

---

### Tool Schema Design

**The tool docstring becomes the schema:**

```python
@tool
def example_tool(param1: str, param2: int = 10) -> str:
    """Does something useful.
    
    Use this when you need to accomplish X.
    
    Args:
        param1: Clear description of what this is
        param2: Description with default behavior
    
    Returns:
        Description of return format
    """
```

**LLM receives:**
- Function name
- Description
- Parameter names, types, defaults
- Parameter descriptions

**Design Principles:**
- Description: WHEN to use it (not HOW it works)
- Args: What each parameter means (not implementation)
- Returns: Format of output (for LLM to parse)

---

## 🔬 Debugging Tips

### Agent Not Using Tools?

**Check:**
1. Is the tool in the ToolBox?
2. Is the tool description clear?
3. Does the system prompt guide tool usage?
4. Is max_turns high enough?

**Try:**
```python
# Add explicit instruction
system = """
You MUST use n8n_list_workflows before triggering any workflow.
"""
```

---

### Tool Returning Errors?

**Check:**
1. Is n8n running? (`curl http://localhost:5678`)
2. Is API key set? (`echo $N8N_API_KEY`)
3. Does the workflow exist? (check n8n UI)
4. Is the workflow active? (toggle in n8n UI)

**Debug:**
```python
# Test client directly
from agentkit.n8n_tools import get_n8n_client
client = get_n8n_client()
print(client.list_workflows())  # Should work without agent
```

---

### Agent Stuck in Loop?

**Reasons:**
1. Tool returns unclear output
2. Agent can't parse results
3. No clear success/failure signal

**Fix:**
- Simplify tool output
- Add explicit success messages
- Set lower max_turns to force stop

---

## 📝 Review Questions

Test your understanding:

1. **Why combine agents with workflows instead of doing everything in the agent?**
   <details>
   <summary>Answer</summary>
   Agents provide reasoning and adaptability; workflows provide reliability and integrations. Workflows handle deterministic execution while agents handle dynamic decision-making.
   </details>

2. **Why do tools return strings instead of raising exceptions?**
   <details>
   <summary>Answer</summary>
   So the agent can reason about errors and recover. If we raise exceptions, the agent loop crashes and can't adapt.
   </details>

3. **What's the difference between the N8nClient and the n8n tools?**
   <details>
   <summary>Answer</summary>
   N8nClient handles HTTP communication. Tools wrap the client for agent use with proper error handling and LLM-friendly output.
   </details>

4. **When should you use workflow chaining vs separate workflows?**
   <details>
   <summary>Answer</summary>
   Chaining when: steps depend on each other, agent needs to adapt between steps. Separate when: independent operations, can run in parallel.
   </details>

5. **What makes a good tool description?**
   <details>
   <summary>Answer</summary>
   Explains WHEN to use it (not HOW), written for the LLM, includes use cases and context.
   </details>

---

## 🚀 Next Steps

After completing this lesson:

1. ✅ **Practice:** Build 2-3 agents with different patterns
2. ✅ **Explore:** Try other n8n integrations (Slack, email, databases)
3. ✅ **Combine:** Mix n8n tools with other tools (file, database, API)
4. ✅ **Deploy:** Put one agent+workflow system in production
5. ✅ **Share:** Document your integration for others

**Related Lessons:**
- AG07: Workflow Patterns (orchestration fundamentals)
- AG09: Human-in-the-Loop (approval gates for workflows)
- AG14: Evaluation & Observability (monitoring production agents)
- AG15: Production Deployment (shipping the full system)

---

## 💡 Key Takeaways

1. **Agents + Workflows = Powerful Automation**
   - Agents: reasoning and adaptation
   - Workflows: reliability and integration

2. **Tools are the Bridge**
   - Designed for LLM consumption
   - Error handling enables recovery
   - Schema quality matters

3. **Production is Different**
   - Security, monitoring, error handling
   - 80% of the work is operations
   - Plan for it from day 1

4. **Patterns are Reusable**
   - Chaining, routing, monitoring
   - Apply to any external system
   - Build a library over time

---

**Ready to build?** Start with the quick start guide, then dive into the notebook!

Questions? Check the troubleshooting section or review the architecture docs.

Happy learning! 🎓🤖

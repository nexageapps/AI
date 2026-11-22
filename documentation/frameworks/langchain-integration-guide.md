# LangChain & LangGraph Integration Guide

**For students who completed the Agents track and need to work with LangChain/LangGraph in industry.**

---

## 🎯 Purpose of This Guide

You learned agents using **`agentkit`** (our teaching library, ~400 lines). In industry, you'll often use **LangChain** and **LangGraph**. This guide bridges the gap.

**What you'll learn:**
- How agentkit concepts map to LangChain
- When to use frameworks vs custom code
- LangGraph for complex workflows
- Migration patterns
- When NOT to use frameworks

**Time:** 30-45 minutes reading

---

## 📚 Table of Contents

1. [Philosophy: Why We Teach Custom First](#philosophy)
2. [Concept Mapping: agentkit → LangChain](#concept-mapping)
3. [Code Comparisons](#code-comparisons)
4. [LangGraph for Workflows](#langgraph)
5. [When to Use What](#when-to-use-what)
6. [Migration Guide](#migration-guide)
7. [Common Pitfalls](#common-pitfalls)

---

## Philosophy: Why We Teach Custom First {#philosophy}

### Our Approach (agentkit)

**Goal:** Understand how agents actually work

```python
# You wrote this yourself in AG02
def run_agent(llm, toolbox, task, system="", max_turns=10):
    messages = [{"role": "user", "content": task}]
    for turn in range(max_turns):
        reply = llm.chat(messages, system=system, tools=toolbox.schemas())
        messages.append({"role": "assistant", "content": reply.content})
        if not reply.tool_calls:
            return reply.text
        results = []
        for call in reply.tool_calls:
            output, error = toolbox.run(call["name"], call["input"])
            results.append({"type": "tool_result", "tool_use_id": call["id"], "content": output})
        messages.append({"role": "user", "content": results})
    return "Max turns reached"
```

**Benefits:**
- ✅ You understand every line
- ✅ Can debug easily
- ✅ Transparent behavior
- ✅ No magic
- ✅ ~60 lines total

### Framework Approach (LangChain)

**Goal:** Move fast with production-ready components

```python
from langchain.agents import create_react_agent, AgentExecutor
from langchain.tools import Tool
from langchain_anthropic import ChatAnthropic

# Similar result, but abstracted
agent = create_react_agent(llm, tools, prompt)
executor = AgentExecutor(agent=agent, tools=tools, max_iterations=10)
result = executor.invoke({"input": task})
```

**Benefits:**
- ✅ Production-tested code
- ✅ Rich ecosystem
- ✅ Many integrations
- ✅ Active development
- ✅ Community support

### When to Use Each

| Use Custom (agentkit) | Use Framework (LangChain) |
|---|---|
| Learning how agents work | Building production apps |
| Need full control | Want battle-tested components |
| Debugging complex issues | Standard use cases |
| Research / experimentation | Rapid prototyping |
| Performance critical | Ecosystem integrations needed |

**Our recommendation:** Learn custom first (you did!), then use frameworks in production.

---

## Concept Mapping: agentkit → LangChain {#concept-mapping}

### Core Concepts

| agentkit | LangChain | Notes |
|---|---|---|
| `@tool` decorator | `@tool` decorator | Same concept! |
| `ToolBox` | `List[BaseTool]` | Direct list, no wrapper |
| `run_agent()` | `AgentExecutor.invoke()` | Similar interface |
| `Tracer` | `LangSmith` | LangSmith is more powerful |
| `Claude` (llm.py) | `ChatAnthropic` | Similar chat interface |
| Messages list | `ChatPromptTemplate` | LangChain uses templates |
| Simple loop | ReAct, OpenAI Functions, etc. | LangChain has many agent types |

### Tool Definition

**agentkit:**
```python
from agentkit import tool

@tool
def search_web(query: str) -> str:
    """Search the web for information.
    
    Args:
        query: The search query
    
    Returns:
        Search results as text
    """
    return search_api(query)
```

**LangChain:**
```python
from langchain.tools import tool

@tool
def search_web(query: str) -> str:
    """Search the web for information."""
    return search_api(query)
```

**Difference:** Nearly identical! LangChain's `@tool` works the same way.

### Agent Loop

**agentkit:**
```python
from agentkit import run_agent, Claude, ToolBox

llm = Claude("claude-3-5-sonnet-20241022")
toolbox = ToolBox(search_web, calculator)

result = run_agent(
    llm,
    toolbox,
    task="What's 15% of the GDP of France?",
    system="You are a helpful assistant.",
    max_turns=10
)

print(result.final_text)
```

**LangChain:**
```python
from langchain.agents import create_react_agent, AgentExecutor
from langchain_anthropic import ChatAnthropic
from langchain.prompts import ChatPromptTemplate

llm = ChatAnthropic(model="claude-3-5-sonnet-20241022")
tools = [search_web, calculator]

prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a helpful assistant."),
    ("human", "{input}"),
    ("placeholder", "{agent_scratchpad}"),
])

agent = create_react_agent(llm, tools, prompt)
executor = AgentExecutor(agent=agent, tools=tools, max_iterations=10)

result = executor.invoke({"input": "What's 15% of the GDP of France?"})
print(result["output"])
```

**Key differences:**
- LangChain uses `AgentExecutor` (wrapper around loop)
- Prompt is templated (more flexible)
- Result is dict with `"output"` key
- More boilerplate, but more configurable

---

## Code Comparisons {#code-comparisons}

### Example 1: Simple Tool-Using Agent

**agentkit (AG02 style):**
```python
from agentkit import run_agent, Claude, tool, ToolBox

@tool
def get_weather(city: str) -> str:
    """Get weather for a city."""
    return f"Weather in {city}: Sunny, 72°F"

llm = Claude("claude-3-5-sonnet-20241022")
toolbox = ToolBox(get_weather)

result = run_agent(
    llm, toolbox,
    "What's the weather in Paris?",
    max_turns=5
)

print(result.final_text)  # "It's sunny and 72°F in Paris"
```

**LangChain equivalent:**
```python
from langchain.agents import create_react_agent, AgentExecutor
from langchain_anthropic import ChatAnthropic
from langchain.tools import tool
from langchain.prompts import ChatPromptTemplate

@tool
def get_weather(city: str) -> str:
    """Get weather for a city."""
    return f"Weather in {city}: Sunny, 72°F"

llm = ChatAnthropic(model="claude-3-5-sonnet-20241022")

prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a helpful assistant."),
    ("human", "{input}"),
    ("placeholder", "{agent_scratchpad}"),
])

agent = create_react_agent(llm, [get_weather], prompt)
executor = AgentExecutor(agent=agent, tools=[get_weather], max_iterations=5)

result = executor.invoke({"input": "What's the weather in Paris?"})
print(result["output"])
```

**Lines of code:**
- agentkit: 11 lines
- LangChain: 18 lines

**Clarity winner:** agentkit (for learning)  
**Production winner:** LangChain (ecosystem, testing, community)

### Example 2: RAG Agent

**agentkit (AG06 style):**
```python
from agentkit import run_agent, Claude, tool, ToolBox

@tool
def search_docs(query: str) -> str:
    """Search company documentation."""
    # BM25 retrieval (you built this!)
    results = retriever.search(query, k=3)
    return "\n\n".join(results)

llm = Claude("claude-3-5-sonnet-20241022")
toolbox = ToolBox(search_docs)

system = """You are a documentation assistant.
Use search_docs to find relevant information.
Always cite your sources."""

result = run_agent(llm, toolbox, "What's our refund policy?", system=system)
print(result.final_text)
```

**LangChain equivalent:**
```python
from langchain.agents import create_react_agent, AgentExecutor
from langchain_anthropic import ChatAnthropic
from langchain.tools import tool
from langchain.prompts import ChatPromptTemplate

@tool
def search_docs(query: str) -> str:
    """Search company documentation."""
    results = retriever.search(query, k=3)
    return "\n\n".join(results)

llm = ChatAnthropic(model="claude-3-5-sonnet-20241022")

prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a documentation assistant.\nUse search_docs to find relevant information.\nAlways cite your sources."),
    ("human", "{input}"),
    ("placeholder", "{agent_scratchpad}"),
])

agent = create_react_agent(llm, [search_docs], prompt)
executor = AgentExecutor(agent=agent, tools=[search_docs])

result = executor.invoke({"input": "What's our refund policy?"})
print(result["output"])
```

**Observation:** Very similar! LangChain just adds more structure.

---

## LangGraph for Workflows {#langgraph}

**When you need more than a simple agent loop** (multi-step, branches, human-in-loop), use **LangGraph**.

### agentkit Approach (AG07)

**Pattern: Sequential workflow**

```python
# AG07 style: manual orchestration
def workflow(input_data):
    # Step 1: Extract
    extracted = extract_tool(input_data)
    
    # Step 2: Validate
    if not validate_tool(extracted):
        return "Validation failed"
    
    # Step 3: Process
    processed = process_tool(extracted)
    
    # Step 4: Store
    store_tool(processed)
    
    return "Success"
```

**Pros:** Simple, explicit  
**Cons:** Hard to visualize, no checkpointing, manual error handling

### LangGraph Approach

**Pattern: State graph with explicit edges**

```python
from langgraph.graph import StateGraph, END

# Define state
class WorkflowState(TypedDict):
    input_data: str
    extracted: dict
    validated: bool
    processed: dict
    result: str

# Define nodes
def extract(state):
    return {"extracted": extract_tool(state["input_data"])}

def validate(state):
    return {"validated": validate_tool(state["extracted"])}

def process(state):
    if not state["validated"]:
        return {"result": "Validation failed"}
    return {"processed": process_tool(state["extracted"])}

def store(state):
    store_tool(state["processed"])
    return {"result": "Success"}

# Build graph
graph = StateGraph(WorkflowState)
graph.add_node("extract", extract)
graph.add_node("validate", validate)
graph.add_node("process", process)
graph.add_node("store", store)

# Define edges
graph.set_entry_point("extract")
graph.add_edge("extract", "validate")
graph.add_edge("validate", "process")

# Conditional edge: only store if validated
def should_store(state):
    return "store" if state["validated"] else END

graph.add_conditional_edges("process", should_store, {"store": "store", END: END})
graph.add_edge("store", END)

# Compile
workflow = graph.compile()

# Run
result = workflow.invoke({"input_data": "..."})
```

**Pros:** 
- Visual (can render graph)
- Checkpointing (can pause/resume)
- Type-safe state
- Conditional branches
- Human-in-loop easy to add

**Cons:**
- More code
- Learning curve
- Overkill for simple agents

### When to Use LangGraph

✅ **Use LangGraph when:**
- Multi-step workflows (>3 steps)
- Conditional branches
- Human approval gates
- Need to pause/resume
- Want visualization
- Orchestrating multiple agents

❌ **Don't use LangGraph when:**
- Simple agent loop (use AgentExecutor)
- One-shot LLM call (use just the LLM)
- Prototyping (add complexity later)

### Mapping AG07 Patterns to LangGraph

| AG07 Pattern | LangGraph Equivalent |
|---|---|
| Sequential | Linear edges: A → B → C |
| Routing | Conditional edges: A → B or C based on state |
| Parallel | Multiple edges from one node |
| Orchestrator | Central node with edges to/from workers |
| Human-in-loop | interrupt_before/after on nodes |

**Example: AG07 routing in LangGraph:**

```python
# AG07 style
def route(query):
    if "sql" in query.lower():
        return sql_agent(query)
    elif "doc" in query.lower():
        return doc_agent(query)
    else:
        return general_agent(query)

# LangGraph style
def router(state):
    query = state["query"]
    if "sql" in query.lower():
        return "sql"
    elif "doc" in query.lower():
        return "doc"
    return "general"

graph.add_conditional_edges("start", router, {
    "sql": "sql_agent",
    "doc": "doc_agent",
    "general": "general_agent"
})
```

---

## When to Use What {#when-to-use-what}

### Decision Tree

```
Need an agent?
  ├─ Simple loop, 1-3 tools?
  │   ├─ Learning/understanding? → agentkit ✅
  │   └─ Production? → LangChain AgentExecutor ✅
  │
  ├─ Complex workflow, branches, HITL?
  │   ├─ Learning? → AG07 patterns (manual) ✅
  │   └─ Production? → LangGraph ✅
  │
  └─ Just one LLM call?
      └─ Use LLM directly (no framework needed) ✅
```

### Concrete Examples

**Use agentkit (custom code):**
- AG01-AG15 lessons (learning)
- Research prototypes
- Blog posts / tutorials
- When you need to understand internals
- Performance-critical (custom loop is faster)

**Use LangChain AgentExecutor:**
- Standard production agent (tool-using, <10 tools)
- Need integrations (LangSmith, callbacks)
- Team familiar with LangChain
- Want community support

**Use LangGraph:**
- Multi-agent orchestration (AG11 patterns)
- Human-in-the-loop workflows (AG09)
- Complex state machines
- Need checkpointing (pause/resume)
- Want to visualize workflow

**Use neither (just LLM):**
- Single prompt-response
- No tools needed
- Simplest possible solution

---

## Migration Guide {#migration-guide}

### From agentkit to LangChain

**Step 1: Tools**
```python
# agentkit
from agentkit import tool

# LangChain (same!)
from langchain.tools import tool
```
✅ No changes needed!

**Step 2: LLM**
```python
# agentkit
from agentkit import Claude
llm = Claude("claude-3-5-sonnet-20241022")

# LangChain
from langchain_anthropic import ChatAnthropic
llm = ChatAnthropic(model="claude-3-5-sonnet-20241022")
```

**Step 3: Agent Loop**
```python
# agentkit
from agentkit import run_agent, ToolBox
toolbox = ToolBox(tool1, tool2)
result = run_agent(llm, toolbox, task, system=system_prompt)

# LangChain
from langchain.agents import create_react_agent, AgentExecutor
from langchain.prompts import ChatPromptTemplate

prompt = ChatPromptTemplate.from_messages([
    ("system", system_prompt),
    ("human", "{input}"),
    ("placeholder", "{agent_scratchpad}"),
])

agent = create_react_agent(llm, [tool1, tool2], prompt)
executor = AgentExecutor(agent=agent, tools=[tool1, tool2])
result = executor.invoke({"input": task})
```

**Step 4: Extract Result**
```python
# agentkit
final_text = result.final_text

# LangChain
final_text = result["output"]
```

### Full Migration Example

**agentkit version (from AG02):**
```python
from agentkit import run_agent, Claude, tool, ToolBox

@tool
def calculator(expression: str) -> str:
    """Evaluate a math expression."""
    return str(eval(expression))

llm = Claude("claude-3-5-sonnet-20241022")
toolbox = ToolBox(calculator)

result = run_agent(
    llm,
    toolbox,
    "What's 15% of 450?",
    system="You are a helpful assistant.",
    max_turns=5
)

print(result.final_text)
print(f"Turns: {result.turns}")
```

**LangChain version:**
```python
from langchain.agents import create_react_agent, AgentExecutor
from langchain_anthropic import ChatAnthropic
from langchain.tools import tool
from langchain.prompts import ChatPromptTemplate

@tool
def calculator(expression: str) -> str:
    """Evaluate a math expression."""
    return str(eval(expression))

llm = ChatAnthropic(model="claude-3-5-sonnet-20241022")

prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a helpful assistant."),
    ("human", "{input}"),
    ("placeholder", "{agent_scratchpad}"),
])

agent = create_react_agent(llm, [calculator], prompt)
executor = AgentExecutor(
    agent=agent,
    tools=[calculator],
    max_iterations=5,
    return_intermediate_steps=True  # To count turns
)

result = executor.invoke({"input": "What's 15% of 450?"})

print(result["output"])
print(f"Turns: {len(result['intermediate_steps'])}")
```

---

## Common Pitfalls {#common-pitfalls}

### 1. Over-Engineering

**❌ Bad:**
```python
# Using LangGraph for a simple 2-tool agent
from langgraph.graph import StateGraph
# ... 50 lines of graph definition
# When this would work:
result = llm.bind_tools([tool1, tool2]).invoke(input)
```

**✅ Good:**
Use the simplest thing that works. Add complexity only when needed.

### 2. Ignoring Fundamentals

**❌ Bad:**
```python
# Jumping to framework without understanding
from langchain.agents import create_react_agent
# (no idea what ReAct is or how it works)
```

**✅ Good:**
Understand AG02 (the loop), AG03 (tools), AG04 (ReAct) FIRST.  
Then frameworks make sense.

### 3. Framework Lock-in

**❌ Bad:**
```python
# Business logic tightly coupled to LangChain
class MyAgent(BaseAgent):  # LangChain class
    def my_business_logic(self):
        # Now can't switch frameworks
```

**✅ Good:**
```python
# Business logic separate
def my_business_logic(input_data):
    # Pure Python, no framework dependency
    return result

# Framework is just the wrapper
executor = AgentExecutor(agent=agent, tools=[wrapper(my_business_logic)])
```

### 4. Not Reading Traces

**❌ Bad:**
```python
# Agent fails, no idea why
result = executor.invoke({"input": task})
if "error" in result:
    print("Failed")  # 🤷 Why?
```

**✅ Good:**
```python
# Always trace (LangSmith or custom)
result = executor.invoke(
    {"input": task},
    config={"callbacks": [tracer]}
)
# Review trace to see what agent did
```

---

## Summary: What You Need to Know

### For Interviews

**Question:** "Do you know LangChain?"

**Good answer:**
> "Yes, I understand the core concepts—agents, tools, chains, and graphs. I learned by building agents from scratch first, so I understand what LangChain abstracts. I can use LangChain for production projects and choose the right abstraction level (direct LLM call, AgentExecutor, or LangGraph) based on complexity."

### For Projects

**Starting new agent project:**
1. Prototype with simple code (agentkit style)
2. Once working, decide if you need framework
3. If yes, migrate to LangChain/LangGraph
4. If no, keep it simple

**Joining existing LangChain project:**
1. Read the LangChain code
2. Map it to concepts you know (tools, loops, state)
3. When confused, ask "what would this be in raw Python?"
4. Contribute improvements based on fundamentals

---

## Resources

### Official Documentation
- **LangChain:** https://python.langchain.com/docs/
- **LangGraph:** https://langchain-ai.github.io/langgraph/
- **LangSmith:** https://docs.smith.langchain.com/

### Learning Path
1. ✅ Complete AG01-AG15 (you did this!)
2. Read LangChain "Get Started" guide
3. Do LangChain "Tutorials" (should feel familiar)
4. Try LangGraph tutorial (maps to AG07, AG11)
5. Build something with both (compare experience)

### When Stuck
1. Map to agentkit concept: "This is just a tool/loop/workflow"
2. Read LangChain docs for that concept
3. Look at examples in docs
4. Ask: "How would I do this in 20 lines of Python?"
5. Use that insight to understand framework

---

## Final Thoughts

**You learned the fundamentals with agentkit.** That knowledge transfers directly to any framework.

**LangChain/LangGraph are tools,** not magic. They're well-built, battle-tested tools—but they're solving the same problems you already understand.

**Choose based on your needs:**
- Learning? Custom code (agentkit)
- Production? Framework (LangChain)
- Complex workflows? LangGraph
- Simple tasks? Neither (just LLM)

**The principles stay the same:**
- Prompts guide behavior
- Tools extend capabilities
- Loops enable multi-step reasoning
- State machines handle complexity
- Traces reveal what happened

**You're ready for LangChain** because you understand what it's doing under the hood. That's the advantage of learning fundamentals first.

---

**Questions?** Check:
- AG02 (agent loop) - maps to AgentExecutor
- AG03 (tools) - maps to LangChain tools
- AG07 (workflows) - maps to LangGraph
- AG11 (multi-agent) - maps to LangGraph patterns

**Next steps:** Build something with LangChain and see how it feels compared to agentkit!

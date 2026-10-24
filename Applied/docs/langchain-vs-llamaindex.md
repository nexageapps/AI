# LangChain vs LlamaIndex: Complete Comparison Guide

## Executive Summary

Both LangChain and LlamaIndex are powerful frameworks for building LLM applications, but they excel in different areas:

- **LlamaIndex**: Specialized for data indexing and retrieval (RAG applications)
- **LangChain**: General-purpose framework for agents, workflows, and orchestration

**TL;DR:** Use LlamaIndex for RAG, LangChain for agents, or both together!

---

## Quick Comparison Table

| Feature | LangChain | LlamaIndex |
|---------|-----------|------------|
| **Primary Focus** | Agent orchestration & workflows | Data indexing & retrieval |
| **Best For** | Multi-agent systems, complex workflows | RAG applications, Q&A systems |
| **Learning Curve** | Steeper (more concepts) | Gentler (focused scope) |
| **Time to First App** | 1-2 hours | 5 minutes |
| **Documentation** | Extensive, broad | Excellent, focused |
| **Community Size** | Larger | Growing rapidly |
| **Flexibility** | Very high | High (for data tasks) |
| **Production Maturity** | Very mature | Mature |
| **Code Verbosity** | More verbose | More concise |
| **Memory Systems** | Multiple types, flexible | Built into indexes |
| **Tool Integration** | 100+ built-in tools | Focused on data connectors |
| **Agent Capabilities** | Extensive (ReAct, Plan-Execute, etc.) | Basic (ReAct-style) |
| **RAG Capabilities** | Good (requires setup) | Excellent (core focus) |
| **Vector DB Support** | Many (via integrations) | Many (first-class) |
| **Streaming** | Yes | Yes |
| **Custom Components** | Very flexible | Flexible for data tasks |
| **Cost** | Free, open-source | Free, open-source |

---

## Detailed Comparison

### 1. Philosophy & Design

#### LangChain
```
"General-purpose framework for building applications with LLMs"
```

**Design principles:**
- Composable components
- Chain-based architecture
- Extensive tool ecosystem
- Agent-first thinking

**Architecture:**
```
User → Agent → Tools → Memory → LLM → Response
           ↓
      Complex workflows, multi-agent systems
```

#### LlamaIndex
```
"Data framework for connecting LLMs to your data"
```

**Design principles:**
- Data-first approach
- Simple, intuitive API
- Fast prototyping
- RAG-optimized

**Architecture:**
```
Data → Documents → Nodes → Index → Query Engine → Response
                                        ↓
                            Optimized retrieval & synthesis
```

---

### 2. Use Case Comparison

#### When to Use LangChain ✅

1. **Complex Multi-Agent Systems**
   ```python
   # Multiple agents working together
   researcher = Agent(tools=[web_search, wikipedia])
   writer = Agent(tools=[text_editor, grammarly])
   editor = Agent(tools=[style_checker, fact_checker])
   ```

2. **Advanced Workflows**
   ```python
   # Plan-and-execute patterns
   planner → executor → validator → refiner
   ```

3. **Extensive Tool Integration**
   ```python
   # 100+ built-in tools
   - APIs, databases, web scrapers
   - Calculators, code interpreters
   - Custom business logic
   ```

4. **Complex Decision Making**
   - Conditional routing
   - Dynamic tool selection
   - Multi-step reasoning

#### When to Use LlamaIndex ✅

1. **RAG Applications**
   ```python
   # Build RAG in 5 lines
   documents = SimpleDirectoryReader("data").load_data()
   index = VectorStoreIndex.from_documents(documents)
   query_engine = index.as_query_engine()
   response = query_engine.query("What is...?")
   ```

2. **Document Q&A**
   - Enterprise knowledge bases
   - Customer support bots
   - Documentation search

3. **Structured Data Queries**
   - SQL databases
   - Knowledge graphs
   - API data

4. **Fast Prototyping**
   - MVP in minutes
   - Quick experiments
   - Proof of concepts

---

### 3. Code Comparison

#### Simple RAG Application

**LangChain:**
```python
from langchain.document_loaders import TextLoader
from langchain.text_splitter import CharacterTextSplitter
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import Chroma
from langchain.chains import RetrievalQA
from langchain.llms import OpenAI

# Load documents
loader = TextLoader("data.txt")
documents = loader.load()

# Split
text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=0)
texts = text_splitter.split_documents(documents)

# Create embeddings
embeddings = OpenAIEmbeddings()

# Create vector store
vectorstore = Chroma.from_documents(texts, embeddings)

# Create retriever
retriever = vectorstore.as_retriever()

# Create chain
qa_chain = RetrievalQA.from_chain_type(
    llm=OpenAI(),
    chain_type="stuff",
    retriever=retriever
)

# Query
response = qa_chain.run("What is...?")
```

**LlamaIndex:**
```python
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader

# Load, index, query - that's it!
documents = SimpleDirectoryReader("data").load_data()
index = VectorStoreIndex.from_documents(documents)
query_engine = index.as_query_engine()
response = query_engine.query("What is...?")
```

**Winner for RAG:** LlamaIndex (simpler, faster)

---

#### Agent with Tools

**LangChain:**
```python
from langchain.agents import create_react_agent, AgentExecutor
from langchain.tools import Tool
from langchain.llms import OpenAI

def search_tool(query: str) -> str:
    return f"Results for {query}"

tools = [
    Tool(
        name="Search",
        func=search_tool,
        description="Search the web"
    )
]

agent = create_react_agent(
    llm=OpenAI(),
    tools=tools,
    prompt=react_prompt
)

agent_executor = AgentExecutor(
    agent=agent,
    tools=tools,
    verbose=True
)

result = agent_executor.invoke({"input": "Search for AI news"})
```

**LlamaIndex:**
```python
from llama_index.core.agent import ReActAgent
from llama_index.core.tools import FunctionTool

def search_tool(query: str) -> str:
    return f"Results for {query}"

tools = [
    FunctionTool.from_defaults(
        fn=search_tool,
        name="search",
        description="Search the web"
    )
]

agent = ReActAgent.from_tools(tools, verbose=True)
result = agent.chat("Search for AI news")
```

**Winner for Agents:** LangChain (more mature, more features)

---

### 4. Feature Comparison

#### Data Ingestion

| Feature | LangChain | LlamaIndex |
|---------|-----------|------------|
| **Document Loaders** | 100+ | 100+ |
| **Text Splitters** | Many options | Optimized defaults |
| **Metadata Extraction** | Manual | Automated |
| **Incremental Updates** | Custom | Built-in |
| **Setup Complexity** | Medium | Low |

**Winner:** LlamaIndex (easier setup)

---

#### Indexing & Retrieval

| Feature | LangChain | LlamaIndex |
|---------|-----------|------------|
| **Index Types** | Vector stores | Vector, List, Tree, KG, etc. |
| **Query Optimization** | Manual | Automatic |
| **Hybrid Search** | Via integrations | First-class |
| **Metadata Filtering** | Yes | Yes, optimized |
| **Sub-queries** | Custom | Built-in |

**Winner:** LlamaIndex (specialized for this)

---

#### Agents & Tools

| Feature | LangChain | LlamaIndex |
|---------|-----------|------------|
| **Agent Types** | ReAct, Plan-Execute, OpenAI Functions, Structured Chat | ReAct |
| **Tool Ecosystem** | 100+ built-in | Data-focused |
| **Custom Tools** | Very flexible | Function-based |
| **Multi-Agent** | LangGraph | Basic |
| **Human-in-Loop** | LangGraph | Basic |

**Winner:** LangChain (more mature)

---

#### Memory Systems

| Feature | LangChain | LlamaIndex |
|---------|-----------|------------|
| **Buffer Memory** | Yes | Via chat engine |
| **Summary Memory** | Yes | Via chat engine |
| **Vector Memory** | Yes | Built into index |
| **Entity Memory** | Yes | Via KG index |
| **Custom Memory** | Very flexible | Index-based |

**Winner:** Tie (different approaches)

---

### 5. Performance Comparison

#### Startup Time
- **LangChain:** ~2-3 seconds (more imports)
- **LlamaIndex:** ~1-2 seconds (focused imports)

**Winner:** LlamaIndex

#### Query Latency (RAG)
- **LangChain:** ~500-1000ms (depends on setup)
- **LlamaIndex:** ~300-500ms (optimized)

**Winner:** LlamaIndex (for RAG)

#### Agent Execution
- **LangChain:** Highly optimized
- **LlamaIndex:** Good but simpler

**Winner:** LangChain

---

### 6. Developer Experience

#### Learning Curve
```
LangChain:  ▓▓▓▓▓▓▓▓░░ (8/10 complexity)
LlamaIndex: ▓▓▓▓░░░░░░ (4/10 complexity)
```

#### Time to First Working App
```
LangChain:  1-2 hours
LlamaIndex: 5 minutes
```

#### Documentation Quality
```
LangChain:  ⭐⭐⭐⭐⭐ (extensive but sometimes overwhelming)
LlamaIndex: ⭐⭐⭐⭐⭐ (focused, clear examples)
```

---

### 7. Production Considerations

#### LangChain Advantages ✅
- More battle-tested
- Larger community
- More monitoring tools (LangSmith)
- Better for complex systems
- More deployment examples

#### LlamaIndex Advantages ✅
- Simpler to maintain
- Faster for RAG use cases
- Better caching by default
- More efficient for data-heavy apps
- Easier to debug

---

## 8. Integration: Using Both Together

### Best of Both Worlds

```python
from langchain.agents import Tool
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader

# 1. Use LlamaIndex for data indexing
documents = SimpleDirectoryReader("docs").load_data()
index = VectorStoreIndex.from_documents(documents)
query_engine = index.as_query_engine()

# 2. Wrap as LangChain tool
def rag_tool(query: str) -> str:
    response = query_engine.query(query)
    return str(response)

llama_tool = Tool(
    name="Knowledge_Base",
    func=rag_tool,
    description="Search company knowledge base"
)

# 3. Use in LangChain agent
from langchain.agents import create_react_agent

agent = create_react_agent(
    llm=llm,
    tools=[llama_tool, web_search_tool, calculator],
    prompt=prompt
)
```

### When to Use Integration

✅ **Use together when:**
- Need RAG (LlamaIndex) + Complex workflow (LangChain)
- Want fast indexing + Advanced agents
- Building multi-tool systems with document search

❌ **Don't mix if:**
- Pure RAG application → Use LlamaIndex only
- Pure agent application → Use LangChain only
- Adding unnecessary complexity

---

## 9. Migration Guide

### From LangChain to LlamaIndex (for RAG)

**Before (LangChain):**
```python
from langchain.document_loaders import DirectoryLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import Chroma
from langchain.chains import RetrievalQA

loader = DirectoryLoader("data")
docs = loader.load()
splitter = RecursiveCharacterTextSplitter(chunk_size=1000)
chunks = splitter.split_documents(docs)
embeddings = OpenAIEmbeddings()
vectorstore = Chroma.from_documents(chunks, embeddings)
qa = RetrievalQA.from_chain_type(llm, retriever=vectorstore.as_retriever())
```

**After (LlamaIndex):**
```python
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader

documents = SimpleDirectoryReader("data").load_data()
index = VectorStoreIndex.from_documents(documents)
query_engine = index.as_query_engine()
```

**Savings:** ~70% less code, ~50% faster setup

---

### From LlamaIndex to LangChain (for Agents)

**Before (LlamaIndex - limited):**
```python
from llama_index.core.agent import ReActAgent
agent = ReActAgent.from_tools(tools)
```

**After (LangChain - full-featured):**
```python
from langchain.agents import create_react_agent, AgentExecutor
from langgraph.prebuilt import create_react_agent

# Option 1: Classic LangChain
agent = create_react_agent(llm, tools, prompt)
executor = AgentExecutor(agent=agent, tools=tools)

# Option 2: LangGraph (modern)
agent = create_react_agent(llm, tools)
```

---

## 10. Decision Framework

### Choose LlamaIndex if:
- [ ] Primary use case is RAG
- [ ] Need fast prototyping
- [ ] Team has limited LLM experience
- [ ] Focus on data queries
- [ ] Want simple, maintainable code

### Choose LangChain if:
- [ ] Building multi-agent systems
- [ ] Need complex workflows
- [ ] Require many tool integrations
- [ ] Team is experienced with LLMs
- [ ] Need advanced orchestration

### Choose Both if:
- [ ] RAG + Complex agents
- [ ] Large-scale enterprise app
- [ ] Different teams, different needs
- [ ] Want best-of-breed approach

---

## 11. Real-World Examples

### Example 1: Customer Support Bot

**Requirement:** Answer questions from documentation + create tickets

**Solution:** LlamaIndex + LangChain
```python
# LlamaIndex for doc search
doc_index = VectorStoreIndex.from_documents(docs)

# LangChain for workflow
agent = create_agent(
    tools=[
        doc_search_tool,  # LlamaIndex
        create_ticket_tool,  # Custom API
        escalate_tool  # Business logic
    ]
)
```

---

### Example 2: Enterprise Search

**Requirement:** Search across multiple data sources

**Solution:** LlamaIndex only
```python
from llama_index.core import ComposableGraph

# Multiple indexes
sql_index = SQLIndex(...)
vector_index = VectorStoreIndex(...)
kg_index = KnowledgeGraphIndex(...)

# Compose
graph = ComposableGraph.from_indices([sql_index, vector_index, kg_index])
query_engine = graph.as_query_engine()
```

---

### Example 3: Research Assistant

**Requirement:** Web search + Summarization + Report generation

**Solution:** LangChain + LangGraph
```python
from langgraph.prebuilt import create_react_agent

agent = create_react_agent(
    llm=llm,
    tools=[
        web_search,
        wikipedia,
        arxiv_search,
        summarizer,
        report_writer
    ]
)
```

---

## 12. Future Outlook

### LangChain Trends
- More LangGraph adoption
- Better LangSmith integration
- Multi-modal agents
- Computer use agents

### LlamaIndex Trends
- Advanced agentic RAG
- Better caching
- More specialized indexes
- Enterprise features

### Convergence
- Both adding each other's features
- More interoperability
- Shared standards emerging

---

## Conclusion

### The Bottom Line

| Your Goal | Use This |
|-----------|----------|
| Quick RAG prototype | LlamaIndex |
| Production RAG | LlamaIndex |
| Simple agent | Either |
| Complex agent | LangChain |
| Multi-agent system | LangChain + LangGraph |
| RAG + Agents | Both |
| Learning LLM apps | Start with LlamaIndex |

### Final Recommendation

**For this course:**
- Learn **both** frameworks
- Understand strengths of each
- Use the right tool for the job
- Don't be afraid to mix them

**Remember:** The best tool is the one that gets your job done efficiently. Don't let framework wars distract from building great applications! 🚀

---

## Additional Resources

- [LangChain Docs](https://python.langchain.com/)
- [LlamaIndex Docs](https://docs.llamaindex.ai/)
- [Integration Examples](https://github.com/run-llama/llama_index/tree/main/docs/examples/agent)
- [Community Discussions](https://discord.gg/langchain)

---

*Part of the Applied AI module*  
*Master of Artificial Intelligence - University of Auckland*  
*Last updated: January 2025*

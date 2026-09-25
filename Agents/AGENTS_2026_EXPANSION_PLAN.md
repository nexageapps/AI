# Agents Sector 2026 Expansion Plan

## Overview

Expanding Agents sector from 18 to 31 lessons with production-ready content covering:
- LangChain and LangGraph deep dives
- Vector databases and RAG agents
- Multi-agent orchestration (LangGraph, CrewAI)
- Computer-use agents (Claude, OpenAI Operator)
- Production deployment and monitoring
- Multimodal agents

**Aligned with:** Stanford CS224V (Conversational AI & Agents)

---

## Current Status

### Completed (AG01-AG03) ✅
- **AG01** - Introduction to AI Agents ✅ (Complete with ReAct pattern)
- **AG02** - LangChain Basics ✅ (Complete with chains, prompts)
- **AG03** - Memory Systems ✅ (Complete with buffer, summary, vector)

### To Create (AG04-AG31) 🔄

**AG04-AG18:** Files exist but are empty placeholders
**AG19-AG31:** Files don't exist yet

---

## Lesson Breakdown by Category

### Category 1: Tools & Functions (AG04-AG06)

**AG04 - Tools and Function Calling**
- OpenAI function calling
- Anthropic Claude tools
- Custom tool creation
- Tool schemas and validation
- Error handling
- **Hands-on:** Build calculator and weather tools
- **Production:** Tool versioning and testing

**AG05 - Building Your First Agent**
- ReAct agent implementation
- Agent executor patterns
- Prompt engineering for agents
- Stopping conditions
- **Hands-on:** Build a research agent
- **Production:** Logging and debugging

**AG06 - Custom Tools Development**
- API integration tools
- Database query tools
- File system tools
- Web scraping tools
- **Hands-on:** Build GitHub integration tool
- **Production:** Rate limiting and caching

---

### Category 2: RAG Agents (AG07-AG09)

**AG07 - RAG Agents with LangChain**
- Document loaders (PDF, Web, Markdown)
- Text splitters and chunking strategies
- Vector store integration
- Retrieval strategies (similarity, MMR, compression)
- **Hands-on:** Build document QA agent
- **Production:** Chunk optimization

**AG08 - Document Loaders and Text Splitters** (RENAMED from original AG08)
- 20+ document loaders
- Recursive character splitter
- Token-based splitting
- Semantic chunking
- Metadata extraction
- **Hands-on:** Multi-format document processor
- **Production:** Batch processing

**AG09 - Agent Evaluation and Testing** (RENAMED from original AG07)
- Evaluation datasets
- RAGAs metrics
- Unit testing agents
- Integration testing
- Load testing
- **Hands-on:** Build eval pipeline
- **Production:** CI/CD for agents

---

### Category 3: LangGraph (AG10-AG13)

**AG10 - Introduction to LangGraph** (RENAMED from original AG08)
- State machines for agents
- Nodes and edges
- Conditional routing
- State management
- **Hands-on:** Build state machine agent
- **Production:** Debugging graphs

**AG11 - Multi-Step Agent Workflows** (RENAMED from original AG09)
- Planning and execution
- Tool sequences
- Branching logic
- Cycle detection
- **Hands-on:** Multi-step research agent
- **Production:** Error recovery

**AG12 - Conditional Edges and Routing**
- Dynamic routing
- User input routing
- Error routing
- Fallback strategies
- **Hands-on:** Intelligent routing agent
- **Production:** A/B testing routes

**AG13 - Persistence and Checkpointing**
- State persistence
- Checkpointing strategies
- Resume from checkpoint
- State migration
- **Hands-on:** Long-running agent
- **Production:** Disaster recovery

---

### Category 4: Multi-Agent Systems (AG14-AG17)

**AG14 - Human-in-the-Loop Patterns** (RENAMED from original AG10)
- Approval gates
- Human feedback
- Interrupt patterns
- Breakpoints in LangGraph
- **Hands-on:** Approval workflow agent
- **Production:** Notification systems

**AG15 - Multi-Agent Systems with LangGraph** (RENAMED from original AG11)
- Agent communication
- Shared state
- Delegation patterns
- Coordination strategies
- **Hands-on:** Manager-worker system
- **Production:** Scaling multi-agent

**AG16 - CrewAI for Role-Based Teams**
- Role definition
- Task assignment
- Sequential vs hierarchical
- Crew configuration
- **Hands-on:** Content creation crew
- **Production:** CrewAI vs LangGraph comparison

**AG17 - Agent Orchestration Patterns**
- Sequential orchestration
- Parallel execution
- Map-reduce patterns
- Supervisor patterns
- **Hands-on:** Complex workflow system
- **Production:** Performance optimization

---

### Category 5: Specialized Agents (AG18-AG21)

**AG18 - Code Generation and Analysis Agents** (RENAMED from original AG12)
- Code understanding
- Code generation
- Testing generation
- Documentation generation
- **Hands-on:** Code review agent
- **Production:** Security scanning

**AG19 - Data Analysis and SQL Agents** (RENAMED from original AG13)
- SQL query generation
- Pandas integration
- Visualization generation
- Data validation
- **Hands-on:** Business intelligence agent
- **Production:** Query optimization

**AG20 - Research and Content Creation Agents** (RENAMED from original AG14)
- Web research
- Content synthesis
- Citation management
- Fact checking
- **Hands-on:** Blog post generator
- **Production:** Plagiarism detection

**AG21 - Multimodal Agents (Vision + Text)** [NEW]
- GPT-4V integration
- Claude 3.5 Sonnet vision
- Image understanding
- PDF with images
- Screenshot analysis
- **Hands-on:** Visual QA agent
- **Production:** Image preprocessing

---

### Category 6: Computer-Use Agents (AG22-AG24) [NEW]

**AG22 - Claude Computer Use Agents** [NEW]
- Computer use API
- Screenshot + click + type
- Docker sandbox setup
- Web automation
- Desktop automation
- **Hands-on:** Web form filler
- **Production:** Security considerations

**AG23 - OpenAI Operator and Browser Automation** [NEW]
- Operator API
- Browser control
- CUA (Computer-Using Agent) model
- Navigation patterns
- **Hands-on:** Data extraction agent
- **Production:** Rate limiting

**AG24 - Desktop Automation with Agents** [NEW]
- Cross-platform automation
- File system operations
- Application control
- Workflow automation
- **Hands-on:** Report generation agent
- **Production:** Permission management

---

### Category 7: Production Agents (AG25-AG28)

**AG25 - Agent APIs with FastAPI** (RENAMED from original AG15)
- RESTful agent APIs
- WebSocket support
- Authentication
- Rate limiting
- **Hands-on:** Complete agent API
- **Production:** Load balancing

**AG26 - Agent UIs with Streamlit and Gradio** (RENAMED from original AG16)
- Streamlit chat interface
- Gradio components
- Real-time updates
- State management
- **Hands-on:** Chat UI for agent
- **Production:** Deployment options

**AG27 - WebSockets for Real-Time Agents** [NEW]
- WebSocket protocol
- Streaming responses
- Token-by-token updates
- Connection management
- **Hands-on:** Real-time chat agent
- **Production:** Scaling WebSockets

**AG28 - Agent Deployment on Cloud** [NEW]
- AWS deployment
- Docker containers
- Kubernetes orchestration
- Environment management
- **Hands-on:** Deploy to AWS
- **Production:** Cost optimization

---

### Category 8: Monitoring & Evaluation (AG29-AG30)

**AG29 - Agent Observability with LangSmith** (RENAMED from original AG17)
- Trace collection
- Debugging workflows
- Performance metrics
- Cost tracking
- **Hands-on:** Full LangSmith integration
- **Production:** Alert systems

**AG30 - Production Agent Monitoring** [NEW]
- Custom metrics
- Logging strategies
- Error tracking (Sentry)
- Performance monitoring
- **Hands-on:** Complete monitoring stack
- **Production:** SLA tracking

---

### Category 9: Capstone (AG31)

**AG31 - Capstone Agent Projects** (RENAMED from original AG18)

**5 Complete Projects:**

1. **Enterprise RAG System**
   - Multi-document ingestion
   - Vector database (Pinecone)
   - Advanced retrieval
   - FastAPI backend
   - Streamlit frontend
   - LangSmith monitoring

2. **Customer Support Multi-Agent**
   - Triage agent
   - Specialist agents (billing, tech, account)
   - Escalation to human
   - Knowledge base RAG
   - Sentiment analysis
   - Ticket creation (Zendesk integration)

3. **Research Assistant with Computer Use**
   - Web search and navigation
   - Paper downloading (Arxiv)
   - PDF analysis
   - Citation management
   - Report generation
   - Claude computer use

4. **Code Review Agent Team**
   - Code analysis agent
   - Security scanning agent
   - Test generation agent
   - Documentation agent
   - GitHub integration
   - PR comment generation

5. **Data Analysis Pipeline**
   - SQL query agent
   - Pandas analysis agent
   - Visualization agent
   - Report writing agent
   - Scheduled execution
   - Email delivery

---

## Implementation Priority

### Phase 1: Core Infrastructure (Weeks 1-3)
- AG04-AG06: Tools and functions
- AG07-AG09: RAG agents
- These enable all other agents

### Phase 2: LangGraph Mastery (Weeks 4-5)
- AG10-AG13: LangGraph workflows
- Essential for complex agents

### Phase 3: Multi-Agent (Weeks 6-7)
- AG14-AG17: Multi-agent orchestration
- CrewAI integration

### Phase 4: Specialized & Computer-Use (Weeks 8-10)
- AG18-AG21: Domain-specific agents
- AG22-AG24: Computer-use agents
- Cutting-edge capabilities

### Phase 5: Production (Weeks 11-12)
- AG25-AG28: Deployment and APIs
- AG29-AG30: Monitoring
- Production-ready systems

### Phase 6: Capstone (Weeks 13-14)
- AG31: 5 complete projects
- Portfolio-ready applications

---

## Content Standards

Each lesson includes:

### 1. Notebook Structure
- Clear learning objectives
- Theoretical foundation
- Code examples (runnable)
- Hands-on exercises
- Production considerations
- Further reading

### 2. Code Quality
- Type hints
- Error handling
- Logging
- Testing examples
- Documentation strings
- Best practices

### 3. Real-World Focus
- Production patterns
- Cost considerations
- Performance optimization
- Security best practices
- Monitoring and debugging

### 4. Stanford CS224V Alignment
- Academic rigor
- Research connections
- State-of-the-art techniques
- Proper citations

---

## Framework Coverage

### LangChain
- Covered in: AG02, AG04-AG09, AG18-AG21, AG25-AG31
- Components: Chains, prompts, agents, memory, tools
- Advanced: Custom chains, streaming, callbacks

### LangGraph
- Covered in: AG10-AG17, AG31
- Components: Graphs, nodes, edges, state
- Advanced: Persistence, human-in-loop, multi-agent

### CrewAI
- Covered in: AG16, AG31
- Components: Roles, tasks, crews
- Comparison: When to use vs LangGraph

### Vector Databases
- Covered in: AG03, AG07-AG09, AG31
- Databases: Pinecone, Weaviate, Chroma
- Advanced: Hybrid search, filtering, reranking

### LangSmith
- Covered in: AG29, AG31
- Components: Tracing, datasets, evaluations
- Advanced: Custom evaluators, A/B testing

### Computer-Use APIs
- Covered in: AG22-AG24
- APIs: Claude Computer Use, OpenAI Operator
- Advanced: Security, sandboxing, automation

---

## Dependencies

### External Libraries
```python
# Core
langchain>=0.1.0
langgraph>=0.0.20
langchain-openai>=0.0.5
langchain-anthropic>=0.1.0

# Vector DBs
pinecone-client>=3.0.0
chromadb>=0.4.0
weaviate-client>=3.0.0

# Agents
crewai>=0.11.0

# Production
fastapi>=0.104.0
streamlit>=1.28.0
gradio>=4.0.0

# Monitoring
langsmith>=0.0.60
sentry-sdk>=1.38.0

# Utils
python-dotenv>=1.0.0
pydantic>=2.0.0
```

### Prerequisites
- AG01-AG03 must be complete before AG04+
- AG04-AG06 recommended before AG07+
- AG07-AG09 recommended before AG10+
- AG10-AG13 recommended before AG14+

---

## Success Metrics

Learners will be able to:

1. ✅ Build production RAG systems
2. ✅ Create multi-agent workflows with LangGraph
3. ✅ Deploy agents with FastAPI/Streamlit
4. ✅ Implement computer-use automation
5. ✅ Monitor agents with LangSmith
6. ✅ Build 5 portfolio-quality projects
7. ✅ Understand agent orchestration patterns
8. ✅ Make framework decisions (LangChain vs CrewAI vs custom)

---

## Timeline

**Total:** 14 weeks for complete sector

- Weeks 1-3: Foundation (AG04-AG09)
- Weeks 4-5: LangGraph (AG10-AG13)
- Weeks 6-7: Multi-agent (AG14-AG17)
- Weeks 8-10: Specialized (AG18-AG24)
- Weeks 11-12: Production (AG25-AG30)
- Weeks 13-14: Capstone (AG31)

---

## Next Steps

1. Create AG04 with complete LangChain tools tutorial
2. Create AG07 with RAG system implementation
3. Create AG10 with LangGraph introduction
4. Create AG22 with Claude computer-use example
5. Create AG25 with FastAPI deployment
6. Complete all remaining lessons
7. Test all code examples
8. Review for CS224V alignment

---

**Document Version:** 1.0
**Created:** September 25, 2026
**Status:** Plan Approved - Ready for Implementation
**Alignment:** Stanford CS224V (Conversational AI & Agents)

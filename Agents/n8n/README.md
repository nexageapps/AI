# AG16: n8n Workflow Integration

Connect your AI agents with n8n workflow automation for powerful, reliable automation systems.

## 🚀 Quick Start (10 minutes)

**Start here if you want to get running fast:**

1. Read [N8N_QUICKSTART.md](../N8N_QUICKSTART.md) - 10-minute setup guide
2. Run the tutorial notebook: `agents/AG16-n8n-workflow-integration.ipynb`
3. Try the example: `python agents/examples/n8n_agent_example.py`

## 📚 Learning Resources

### For Students

**Recommended Learning Path:**

```
1. Quick Start Guide → Get n8n running (10 min)
   └─ agents/N8N_QUICKSTART.md

2. Learning Guide → Understand the concepts (read first!)
   └─ agents/AG16-LEARNING-GUIDE.md

3. Tutorial Notebook → Hands-on learning (3-4 hours)
   └─ agents/AG16-n8n-workflow-integration.ipynb
   
4. Practice → Build something real
   └─ Do the exercises in the notebook
```

**Documentation:**
- **Quick Start**: `../N8N_QUICKSTART.md` - Setup in 10 minutes
- **Learning Guide**: `../AG16-LEARNING-GUIDE.md` - Complete learning path
- **Integration Guide**: `../../documentation/n8n-integration-guide.md` - Architecture & patterns
- **Architecture**: `../../documentation/n8n-architecture.md` - System design deep dive

**Code:**
- **Tutorial**: `../AG16-n8n-workflow-integration.ipynb` - Jupyter notebook
- **Example**: `../examples/n8n_agent_example.py` - Interactive CLI demo
- **Tools**: `../../agentkit/n8n_tools.py` - Core integration code

## 🎯 What You'll Learn

By completing AG16, you will:

1. ✅ **Understand** when to use agents vs workflows
2. ✅ **Design** tools that integrate external APIs
3. ✅ **Build** agents that orchestrate workflows
4. ✅ **Deploy** production-ready automation systems

## 🛠️ What's Included

### 5 Agent Tools

Your agents gain these capabilities:

1. **`n8n_list_workflows`** - Discover available workflows
2. **`n8n_get_workflow_details`** - Inspect workflow configuration
3. **`n8n_trigger_workflow`** - Execute workflows with data
4. **`n8n_check_execution_status`** - Monitor execution progress
5. **`n8n_list_recent_executions`** - View execution history

### Example Usage

```python
from agentkit.llm import Claude
from agentkit.agent import run_agent
from agentkit.tools import ToolBox
from agentkit.n8n_tools import create_n8n_toolbox

# Setup
llm = Claude("claude-3-5-sonnet-20241022")
toolbox = ToolBox(*create_n8n_toolbox())

# Run agent
result = run_agent(
    llm, toolbox,
    "List all available n8n workflows",
    system="You can interact with n8n workflows.",
    max_turns=5
)

print(result.final_text)
```

## 💡 Real-World Use Cases

### Customer Support Agent
```
Agent receives customer issue
  ↓
Triggers "create-support-ticket" workflow
  ↓
n8n creates Jira ticket + sends Slack notification
  ↓
Agent reports ticket ID to customer
```

### Data Processing Pipeline
```
Agent receives data request
  ↓
Orchestrates: extract → transform → load
  ↓
n8n executes each step reliably
  ↓
Agent reports completion
```

### Monitoring Agent
```
Agent checks workflow executions (scheduled)
  ↓
Detects failures
  ↓
Triggers "alert-team" workflow
  ↓
Attempts recovery or escalation
```

## 📖 Learning Path

**Choose your path based on your goal:**

### 🏃 Fast Track (2 hours)
For those who want to get productive quickly.

1. Quick Start → 15 min
2. Notebook Parts 1-4 → 90 min
3. Beginner Exercise → 15 min

### 🚶 Standard Path (3-4 hours)
Recommended for most learners.

1. Learning Guide (Phase 1-6) → 3 hours
2. All exercises → 1 hour

### 🧗 Deep Dive (8+ hours)
For mastery and building custom integrations.

1. Complete learning path → 3-4 hours
2. All exercises (beginner → challenge) → 2-3 hours
3. Read all documentation → 1-2 hours
4. Build a real project → 3-5 hours

## 🎓 Prerequisites

**Required:**
- AG02: The Agent Loop from Scratch
- AG03: Tools Done Right
- Basic Python knowledge
- Basic HTTP/REST concepts

**Helpful:**
- AG07: Workflow Patterns
- Experience with automation tools

**Time:** 3-4 hours

## 🧪 Practice Exercises

The tutorial includes 4 exercises at different levels:

1. **Beginner**: Build a notification agent (30 min)
2. **Intermediate**: Create a data pipeline agent (60 min)
3. **Advanced**: Build a monitoring & recovery agent (90 min)
4. **Challenge**: Create your own integration (2-3 hours)

## 🔧 Technical Details

**Integration:**
- Compatible with existing agentkit
- Follows standard @tool pattern
- Environment-based configuration
- Only adds `requests` dependency

**Architecture:**
```
User Request
    ↓
AI Agent (reasoning)
    ↓
n8n Tools (integration)
    ↓
n8n Platform (execution)
    ↓
External Services (Slack, Jira, etc.)
```

## 📦 Files Structure

```
agents/
├── AG16-n8n-workflow-integration.ipynb  ← Tutorial
├── AG16-LEARNING-GUIDE.md               ← Learning path
├── N8N_QUICKSTART.md                    ← Quick setup
├── n8n/                                 ← You are here
│   └── README.md                        
└── examples/
    └── n8n_agent_example.py             ← CLI demo

agentkit/
└── n8n_tools.py                         ← Core integration

documentation/
├── n8n-integration-guide.md             ← Complete guide
└── n8n-architecture.md                  ← System design
```

## 🐛 Troubleshooting

**Can't connect to n8n?**
```bash
# Check if n8n is running
curl http://localhost:5678
```

**401 Unauthorized?**
```bash
# Verify API key is set
echo $N8N_API_KEY
```

**Workflow not found?**
```python
# List available workflows
from agentkit.n8n_tools import get_n8n_client
client = get_n8n_client()
print(client.list_workflows())
```

See full troubleshooting guide in `../../documentation/n8n-integration-guide.md`.

## 🔗 External Resources

- **n8n Documentation**: https://docs.n8n.io/
- **n8n API Reference**: https://docs.n8n.io/api/
- **n8n Community**: https://community.n8n.io/

## 🎯 Success Criteria

You've mastered AG16 when you can:

**Basic Level:**
- [ ] Set up n8n and connect from Python
- [ ] Create a workflow in n8n UI
- [ ] Build an agent that triggers it
- [ ] Explain why agents + workflows work well together

**Intermediate Level:**
- [ ] Implement workflow chaining
- [ ] Add error handling and recovery
- [ ] Monitor execution status
- [ ] Debug agent-workflow issues

**Advanced Level:**
- [ ] Design tools for new APIs
- [ ] Implement all 4 integration patterns
- [ ] Deploy to production with monitoring
- [ ] Build custom integrations

## 🚀 Next Steps

After completing AG16:

1. **Combine with other lessons:**
   - AG14: Add observability to your agents
   - AG15: Deploy your agent+workflow system
   - AG11: Build multi-agent systems with workflows

2. **Build more integrations:**
   - Slack, Email, CRM systems
   - Databases and data warehouses
   - Custom APIs and services

3. **Create real projects:**
   - Customer support automation
   - Data processing pipelines
   - Monitoring and alerting systems

---

**Ready to start?** → [Quick Start Guide](../N8N_QUICKSTART.md)

**Questions?** → Check the [Learning Guide](../AG16-LEARNING-GUIDE.md) or [Integration Guide](../../documentation/n8n-integration-guide.md)

🎓 **Happy learning!** 🤖🔄

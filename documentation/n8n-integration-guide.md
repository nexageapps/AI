# n8n Integration Guide for AI Agents

This guide explains how to integrate n8n workflow automation with your AI agents, enabling them to orchestrate complex multi-step processes, interact with external services, and automate repetitive tasks.

## Table of Contents

- [What is n8n?](#what-is-n8n)
- [Why Integrate with AI Agents?](#why-integrate-with-ai-agents)
- [Setup](#setup)
- [Basic Usage](#basic-usage)
- [Architecture Patterns](#architecture-patterns)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

---

## What is n8n?

[n8n](https://n8n.io/) is a fair-code workflow automation platform that lets you connect different services and APIs together. Think of it as a visual programming environment for creating automated workflows.

**Key Features:**
- 300+ pre-built integrations (Slack, Gmail, Jira, databases, etc.)
- Visual workflow editor
- Self-hostable (you control your data)
- Webhook triggers for real-time automation
- Conditional logic and data transformation

---

## Why Integrate with AI Agents?

### The Power of Combining AI + Workflows

**AI Agents** excel at:
- Natural language understanding
- Decision-making and reasoning
- Adapting to new situations
- Understanding context

**n8n Workflows** excel at:
- Reliable execution
- Error handling and retries
- Integration with multiple services
- Structured data processing

### Together They Enable:

1. **Intelligent Automation**
   - Agent decides WHAT to do
   - n8n executes HOW to do it

2. **Dynamic Orchestration**
   - Agent chooses workflows based on context
   - n8n ensures reliable execution

3. **Scalable Integration**
   - Agent provides the intelligence
   - n8n provides 300+ integrations

---

## Setup

### 1. Install n8n

**Option A: Docker (Recommended)**

```bash
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n
```

**Option B: npm**

```bash
npm install -g n8n
n8n start
```

**Option C: Docker Compose (Production)**

```yaml
version: '3.8'
services:
  n8n:
    image: n8nio/n8n
    ports:
      - 5678:5678
    environment:
      - N8N_BASIC_AUTH_ACTIVE=true
      - N8N_BASIC_AUTH_USER=admin
      - N8N_BASIC_AUTH_PASSWORD=changeme
    volumes:
      - ~/.n8n:/home/node/.n8n
```

### 2. Configure n8n API Access

1. Open n8n UI: http://localhost:5678
2. Go to **Settings** → **API**
3. Click **Create API Key**
4. Copy the generated key

### 3. Set Environment Variables

```bash
# Add to your ~/.bashrc or ~/.zshrc
export N8N_API_KEY="your-api-key-here"
export N8N_BASE_URL="http://localhost:5678"
```

### 4. Install Python Dependencies

```bash
cd AI/
pip install -r requirements.txt
```

This includes the `requests` library needed for n8n API calls.

### 5. Verify Connection

```python
from agentkit.n8n_tools import get_n8n_client

client = get_n8n_client()
workflows = client.list_workflows()
print(f"Connected! Found {len(workflows)} workflows")
```

---

## Basic Usage

### Example 1: Simple Agent with n8n Tools

```python
from agentkit.llm import Claude
from agentkit.agent import run_agent
from agentkit.tools import ToolBox
from agentkit.n8n_tools import create_n8n_toolbox

# Initialize
llm = Claude("claude-3-5-sonnet-20241022")
toolbox = ToolBox(*create_n8n_toolbox())

system = """
You are an AI agent with access to n8n workflows.
You can list workflows, get their details, and trigger them.
"""

# Run agent
result = run_agent(
    llm, toolbox,
    "List all available workflows",
    system=system,
    max_turns=5
)

print(result.final_text)
```

### Example 2: Trigger a Workflow

```python
task = """
Trigger the workflow named 'send-welcome-email' with this data:
{
  "email": "user@example.com",
  "name": "John Doe",
  "signup_date": "2024-01-15"
}
"""

result = run_agent(llm, toolbox, task, system=system)
```

### Example 3: Monitor Executions

```python
task = "Show me the last 10 workflow executions and tell me if any failed"

result = run_agent(llm, toolbox, task, system=system)
```

---

## Architecture Patterns

### Pattern 1: Request → Agent → Workflow

```
User Request
    ↓
AI Agent (reasoning)
    ↓
n8n Workflow (execution)
    ↓
Result to User
```

**Use Case:** Simple automation tasks

**Example:**
- User: "Send a Slack notification to #alerts"
- Agent: Identifies the `slack-notifier` workflow
- n8n: Sends the message via Slack API
- Agent: Reports success to user

### Pattern 2: Multi-Workflow Orchestration

```
User Request
    ↓
AI Agent
    ↓
Workflow 1 → Workflow 2 → Workflow 3
    ↓           ↓           ↓
  Result    → Agent   →  Result
```

**Use Case:** Complex multi-step processes

**Example:**
- Extract data → Transform data → Generate report → Send email
- Agent orchestrates the entire pipeline
- Each workflow handles one step reliably

### Pattern 3: Conditional Routing

```
User Request
    ↓
AI Agent (analyzes request type)
    ↓
   / | \
  /  |  \
Wf1 Wf2 Wf3 (different workflows for different scenarios)
```

**Use Case:** Dynamic workflow selection

**Example:**
- Urgent requests → priority processing workflow
- Standard requests → normal processing workflow
- Bulk requests → batch processing workflow

### Pattern 4: Monitoring & Error Recovery

```
n8n Executions
    ↓
Monitoring Agent
    ↓
Detect Failures → Trigger Recovery Workflow
```

**Use Case:** Resilient automation systems

---

## Best Practices

### 1. Workflow Design

**DO:**
- Keep workflows focused on one task
- Use meaningful workflow names
- Add tags for categorization
- Include error handling nodes
- Document expected input/output

**DON'T:**
- Create monolithic workflows
- Use unclear variable names
- Skip error handling
- Hard-code credentials

### 2. Agent Design

**DO:**
- Always validate data before triggering workflows
- Check workflow availability first
- Handle workflow errors gracefully
- Log all executions for debugging
- Use structured data formats (JSON)

**DON'T:**
- Assume workflows exist
- Pass unvalidated user input
- Ignore execution failures
- Skip result verification

### 3. Security

**Critical:**
- Never expose API keys in code
- Use environment variables for secrets
- Validate all external input
- Implement rate limiting
- Use HTTPS in production

### 4. Error Handling

```python
from agentkit.n8n_tools import get_n8n_client

client = get_n8n_client()

try:
    result = client.trigger_workflow(workflow_id, data)
    # Check if successful
    if result.get("status") == "error":
        # Handle workflow error
        pass
except requests.exceptions.RequestException as e:
    # Handle network/API errors
    pass
except Exception as e:
    # Handle unexpected errors
    pass
```

### 5. Testing

**Test at Multiple Levels:**

1. **Unit Tests**: Test n8n client methods
2. **Integration Tests**: Test workflow triggers end-to-end
3. **Agent Tests**: Test agent decision-making
4. **System Tests**: Test full user scenarios

Example:

```python
def test_workflow_trigger():
    client = get_n8n_client()
    result = client.trigger_workflow("test-workflow", {"test": "data"})
    assert result is not None
    assert "id" in result
```

---

## Common Use Cases

### 1. Customer Support Automation

**Scenario:** Agent handles customer queries and creates support tickets

```python
system = """
When a user reports an issue:
1. Collect necessary information
2. Trigger 'create-support-ticket' workflow
3. Trigger 'notify-support-team' workflow
4. Provide ticket ID to user
"""
```

**n8n Workflows:**
- `create-support-ticket`: Creates Jira ticket
- `notify-support-team`: Sends Slack notification

### 2. Data Processing Pipeline

**Scenario:** Agent orchestrates ETL workflows

```python
system = """
For data processing requests:
1. Trigger 'extract-data' workflow (source → staging)
2. Wait for completion
3. Trigger 'transform-data' workflow (staging → processed)
4. Trigger 'load-data' workflow (processed → destination)
5. Report pipeline status
"""
```

### 3. Content Publishing

**Scenario:** Agent manages content publication workflow

```python
system = """
For publishing requests:
1. Validate content format
2. Trigger 'content-review' workflow (if needed)
3. Trigger 'publish-to-cms' workflow
4. Trigger 'social-media-share' workflow
5. Confirm publication
"""
```

### 4. Monitoring & Alerting

**Scenario:** Agent monitors systems and sends alerts

```python
system = """
You monitor workflow executions every 5 minutes.
If you detect failures:
1. Trigger 'send-alert' workflow (PagerDuty/Slack)
2. Attempt workflow retry (if appropriate)
3. Log incident details
"""
```

---

## Troubleshooting

### Connection Issues

**Problem:** `ConnectionError: Failed to connect to n8n`

**Solutions:**
1. Check n8n is running: `curl http://localhost:5678`
2. Verify N8N_BASE_URL is correct
3. Check firewall settings
4. Verify Docker container status: `docker ps`

### Authentication Errors

**Problem:** `401 Unauthorized`

**Solutions:**
1. Verify N8N_API_KEY is set correctly
2. Check API key hasn't expired
3. Regenerate API key in n8n UI
4. Ensure API access is enabled in n8n settings

### Workflow Not Found

**Problem:** `404 Workflow not found`

**Solutions:**
1. List workflows to see available IDs
2. Verify workflow is activated
3. Check workflow ID spelling
4. Ensure workflow hasn't been deleted

### Execution Failures

**Problem:** Workflow triggers but fails

**Solutions:**
1. Check workflow logs in n8n UI
2. Verify input data format matches expectations
3. Test workflow manually in n8n editor
4. Check if external service credentials are valid
5. Review workflow error handling logic

### Performance Issues

**Problem:** Slow workflow execution

**Solutions:**
1. Optimize workflow design (parallel execution)
2. Reduce unnecessary nodes
3. Use batch processing for large datasets
4. Consider async triggers for long-running workflows
5. Monitor n8n resource usage

---

## Resources

- **n8n Documentation**: https://docs.n8n.io/
- **n8n API Reference**: https://docs.n8n.io/api/
- **n8n Community Forum**: https://community.n8n.io/
- **Agent Integration Tutorial**: See `AG16-n8n-workflow-integration.ipynb`
- **Example Code**: `agents/examples/n8n_agent_example.py`

---

## Next Steps

1. **Build Your First Integration**
   - Create a simple workflow in n8n
   - Build an agent that can trigger it
   - Test the end-to-end flow

2. **Explore Advanced Patterns**
   - Multi-workflow orchestration
   - Conditional routing based on agent decisions
   - Error recovery and retry logic

3. **Production Deployment**
   - Set up n8n with proper authentication
   - Implement monitoring and logging
   - Add rate limiting and error handling
   - Deploy agents and workflows together

4. **Extend Further**
   - Build domain-specific workflow libraries
   - Create reusable agent templates
   - Integrate with your existing systems
   - Share workflows with your team

---

**Happy Automating! 🤖 + 🔄 = 🚀**

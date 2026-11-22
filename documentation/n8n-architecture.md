# n8n + AI Agent Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                         User Input                          │
│               "Send a Slack notification..."                │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                      AI Agent Layer                         │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  LLM (Claude)                                        │  │
│  │  - Understands user intent                           │  │
│  │  - Selects appropriate workflows                     │  │
│  │  - Decides tool usage                                │  │
│  └───────────────────┬──────────────────────────────────┘  │
│                      │                                      │
│  ┌───────────────────┴──────────────────────────────────┐  │
│  │  ToolBox (n8n tools)                                 │  │
│  │  - n8n_list_workflows                                │  │
│  │  - n8n_trigger_workflow                              │  │
│  │  - n8n_check_execution_status                        │  │
│  │  - n8n_get_workflow_details                          │  │
│  │  - n8n_list_recent_executions                        │  │
│  └───────────────────┬──────────────────────────────────┘  │
└────────────────────────┼────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    n8n Client Layer                         │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  N8nClient (agentkit/n8n_tools.py)                   │  │
│  │  - HTTP API communication                            │  │
│  │  - Authentication (API key)                          │  │
│  │  - Error handling                                    │  │
│  │  - JSON parsing                                      │  │
│  └───────────────────┬──────────────────────────────────┘  │
└────────────────────────┼────────────────────────────────────┘
                         │ HTTP/REST
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    n8n Platform                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Workflow Engine                                     │  │
│  │  - Execute workflows                                 │  │
│  │  - Handle retries                                    │  │
│  │  - Manage state                                      │  │
│  └───────────────────┬──────────────────────────────────┘  │
│                      │                                      │
│  ┌──────────┬────────┴────────┬──────────┬──────────────┐  │
│  │ Workflow │   Workflow 2    │ Workflow │  Workflow N  │  │
│  │    1     │                 │    3     │              │  │
│  └─────┬────┴─────────────────┴─────┬────┴──────────────┘  │
└────────┼──────────────────────────────┼────────────────────┘
         │                              │
         ▼                              ▼
┌────────────────────┐        ┌────────────────────┐
│  External Services │        │  External Services │
│  - Slack           │        │  - Gmail           │
│  - Jira            │        │  - Databases       │
│  - CRM             │        │  - APIs            │
└────────────────────┘        └────────────────────┘
```

---

## Data Flow Example: "Send Slack Notification"

```
1. User: "Send a Slack notification about the new customer"
   ↓
2. Agent (LLM):
   - Analyzes intent
   - Decides to use n8n_list_workflows
   ↓
3. n8n_list_workflows tool:
   - Calls N8nClient.list_workflows()
   - Returns: ["slack-notifier", "email-sender", ...]
   ↓
4. Agent (LLM):
   - Sees "slack-notifier" workflow
   - Decides to trigger it with customer data
   ↓
5. n8n_trigger_workflow tool:
   - Calls N8nClient.trigger_workflow("slack-notifier", {...})
   - Sends HTTP POST to n8n API
   ↓
6. n8n Platform:
   - Receives trigger request
   - Executes "slack-notifier" workflow
   - Workflow sends message via Slack API
   ↓
7. Response flows back:
   n8n → N8nClient → Tool → Agent → User
   "✅ Notification sent to #alerts channel"
```

---

## Component Responsibilities

### AI Agent Layer
**What it does:**
- Natural language understanding
- Decision-making (which workflow to use)
- Parameter extraction from user input
- Result interpretation
- Error recovery logic

**What it doesn't do:**
- Direct API integrations
- Retry logic
- State persistence
- Service-specific error handling

### n8n Client Layer
**What it does:**
- HTTP communication with n8n
- API authentication
- Request/response formatting
- Basic error handling
- JSON serialization

**What it doesn't do:**
- Decision making
- Natural language processing
- Workflow logic

### n8n Platform
**What it does:**
- Workflow execution
- Error handling and retries
- State management
- Service integrations (300+)
- Scheduling and triggers

**What it doesn't do:**
- AI reasoning
- Natural language understanding
- Complex decision trees

---

## Integration Patterns

### Pattern 1: Discovery → Trigger

```
User Request
    ↓
Agent: n8n_list_workflows
    ↓
Agent: Analyze available workflows
    ↓
Agent: n8n_trigger_workflow
    ↓
Result
```

### Pattern 2: Details → Validate → Trigger

```
User Request
    ↓
Agent: n8n_get_workflow_details
    ↓
Agent: Validate user data matches requirements
    ↓
Agent: n8n_trigger_workflow
    ↓
Agent: n8n_check_execution_status
    ↓
Result
```

### Pattern 3: Chain Orchestration

```
User: "Run ETL pipeline"
    ↓
Agent: n8n_trigger_workflow("extract")
    ↓
Agent: n8n_check_execution_status (wait)
    ↓
Agent: Extract output from execution result
    ↓
Agent: n8n_trigger_workflow("transform", data=output)
    ↓
Agent: n8n_check_execution_status (wait)
    ↓
Agent: n8n_trigger_workflow("load", data=output)
    ↓
Result: "Pipeline complete"
```

### Pattern 4: Monitoring Loop

```
Timer/Schedule
    ↓
Agent: n8n_list_recent_executions
    ↓
Agent: Analyze for failures
    ↓
IF failures found:
    Agent: n8n_trigger_workflow("alert-system")
    Agent: Attempt retry or escalation
```

---

## Security Architecture

```
┌─────────────────────────────────────────────┐
│  Environment Variables                      │
│  - N8N_API_KEY (secret)                    │
│  - N8N_BASE_URL (config)                   │
└───────────────┬─────────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────────┐
│  N8nClient                                  │
│  - Reads env vars                           │
│  - Adds API key to headers                  │
│  - Never logs sensitive data                │
└───────────────┬─────────────────────────────┘
                │ HTTPS (production)
                ▼
┌─────────────────────────────────────────────┐
│  n8n Platform                               │
│  - Validates API key                        │
│  - Stores service credentials               │
│  - Manages access control                   │
└─────────────────────────────────────────────┘
```

**Security Best Practices:**
1. ✅ Store API keys in environment variables
2. ✅ Use HTTPS in production
3. ✅ Validate all user input before triggering
4. ✅ Use separate API keys per environment
5. ✅ Rotate keys regularly
6. ✅ Never log sensitive data
7. ✅ Implement rate limiting

---

## Error Handling Flow

```
Agent calls n8n_trigger_workflow
    ↓
    ├─→ Network Error
    │   ↓
    │   Tool returns: "Error: Connection refused"
    │   ↓
    │   Agent: "n8n is unavailable, try again later"
    │
    ├─→ Auth Error (401)
    │   ↓
    │   Tool returns: "Error: Unauthorized"
    │   ↓
    │   Agent: "Configuration issue, check API key"
    │
    ├─→ Not Found (404)
    │   ↓
    │   Tool returns: "Error: Workflow not found"
    │   ↓
    │   Agent: Lists available workflows
    │
    ├─→ Workflow Execution Error
    │   ↓
    │   Tool returns: Execution result with error status
    │   ↓
    │   Agent: Analyzes error, suggests fixes or retry
    │
    └─→ Success
        ↓
        Tool returns: Execution result
        ↓
        Agent: Confirms success to user
```

---

## Scalability Considerations

### Horizontal Scaling

```
┌─────────┐     ┌─────────┐     ┌─────────┐
│ Agent 1 │     │ Agent 2 │     │ Agent N │
└────┬────┘     └────┬────┘     └────┬────┘
     │               │               │
     └───────────────┼───────────────┘
                     │
                     ▼
              ┌─────────────┐
              │ Load Balancer│
              └──────┬───────┘
                     │
         ┌───────────┼───────────┐
         ▼           ▼           ▼
    ┌────────┐  ┌────────┐  ┌────────┐
    │ n8n 1  │  │ n8n 2  │  │ n8n N  │
    └────────┘  └────────┘  └────────┘
```

### Performance Optimization

1. **Workflow Design**
   - Use parallel execution nodes
   - Minimize unnecessary transformations
   - Cache frequently used data

2. **Agent Design**
   - Batch similar requests
   - Cache workflow metadata
   - Use async execution for long workflows

3. **Infrastructure**
   - Deploy n8n close to services
   - Use persistent storage for workflows
   - Monitor resource usage

---

## Observability Stack

```
┌─────────────────────────────────────────────┐
│  Agent Layer                                │
│  - agentkit.trace.Tracer                    │
│  - Logs: Tool calls, results, errors        │
└───────────────┬─────────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────────┐
│  n8n Layer                                  │
│  - Execution logs                           │
│  - Success/failure metrics                  │
│  - Execution time tracking                  │
└───────────────┬─────────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────────┐
│  Monitoring (Optional)                      │
│  - Prometheus/Grafana                       │
│  - ELK Stack                                │
│  - Custom dashboards                        │
└─────────────────────────────────────────────┘
```

---

## Deployment Architectures

### Development Setup
```
Developer Machine
├── AI Agent (local)
├── n8n (Docker local)
└── Test workflows
```

### Production Setup
```
Cloud Infrastructure
├── Agent Service (K8s/ECS)
├── n8n (Self-hosted or n8n Cloud)
├── Database (workflow state)
└── Monitoring stack
```

### Hybrid Setup
```
├── Agent (Cloud)
├── n8n Cloud (managed)
└── Private services via tunnel
```

---

## Technology Stack

```
┌─────────────────────────────────────────────┐
│  Language: Python 3.10+                     │
├─────────────────────────────────────────────┤
│  Agent Framework: agentkit                  │
│  - agent.py (loop)                          │
│  - tools.py (decorator)                     │
│  - trace.py (observability)                 │
├─────────────────────────────────────────────┤
│  LLM: Anthropic Claude                      │
│  - claude-3-5-sonnet-20241022              │
├─────────────────────────────────────────────┤
│  HTTP Client: requests                      │
│  - API communication                        │
│  - Error handling                           │
├─────────────────────────────────────────────┤
│  Workflow Platform: n8n                     │
│  - Fair-code license                        │
│  - Self-hostable                            │
│  - 300+ integrations                        │
└─────────────────────────────────────────────┘
```

---

This architecture enables flexible, reliable, and scalable automation by combining AI reasoning with robust workflow execution.

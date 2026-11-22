# n8n Integration Quick Start

Get your AI agents connected to n8n workflow automation in 10 minutes.

## Prerequisites

- Python 3.10+
- Docker (recommended) OR npm

## Step 1: Start n8n

### Option A: Docker (Easiest)

```bash
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n
```

### Option B: npm

```bash
npm install -g n8n
n8n start
```

Wait until you see: `Editor is now accessible via: http://localhost:5678`

## Step 2: Configure n8n

1. Open http://localhost:5678 in your browser
2. Create an account (first time only)
3. Go to **Settings** (bottom left) → **API**
4. Click **Create API Key**
5. Copy the generated key

## Step 3: Set Environment Variables

```bash
# Add to your shell profile (~/.bashrc or ~/.zshrc)
export N8N_API_KEY="your-api-key-here"
export N8N_BASE_URL="http://localhost:5678"
```

Reload your shell:
```bash
source ~/.bashrc  # or ~/.zshrc
```

## Step 4: Install Dependencies

```bash
cd AI/
pip install -r requirements.txt
```

## Step 5: Create a Test Workflow

In the n8n UI:

1. Click **+ Workflow** (top right)
2. Add a **Webhook** node:
   - Click to configure
   - Path: `test-agent`
   - HTTP Method: `POST`
   - Click **Listen for Test Event**
3. Add a **Set** node:
   - Connect from Webhook
   - Add these fields:
     - `status` = `success`
     - `message` = `Hello from n8n!`
     - `received_data` = `{{$json.body}}`
4. Click **Save** (top right)
5. Click **Activate** toggle (top right)
6. Copy the workflow ID from the URL (e.g., `https://localhost:5678/workflow/123` → ID is `123`)

## Step 6: Test the Integration

### Quick Test (Python REPL)

```python
from agentkit.n8n_tools import get_n8n_client

# Test connection
client = get_n8n_client()
workflows = client.list_workflows()
print(f"✅ Connected! Found {len(workflows)} workflows")

# Trigger your test workflow
result = client.trigger_workflow("YOUR_WORKFLOW_ID", {"test": "data"})
print(result)
```

### Full Agent Test

```bash
python agents/examples/n8n_agent_example.py
```

This will:
- Verify connection to n8n
- List available workflows
- Enter interactive mode where you can chat with the agent

## Step 7: Try the Tutorial

Open the Jupyter notebook:

```bash
jupyter lab agents/AG16-n8n-workflow-integration.ipynb
```

Work through the examples to learn:
- Basic n8n operations
- Agent integration patterns
- Real-world use cases
- Advanced orchestration

## Common Issues

### "Connection refused"

Make sure n8n is running:
```bash
curl http://localhost:5678
```

Should return HTML. If not, restart n8n.

### "401 Unauthorized"

Your API key is wrong or not set:
```bash
echo $N8N_API_KEY  # Should show your key
```

Regenerate the key in n8n UI if needed.

### "No workflows found"

Your test workflow might not be active:
1. Open n8n UI
2. Go to workflows
3. Click on your workflow
4. Toggle "Active" switch to ON

## Next Steps

1. **Read the Guide**: See `documentation/n8n-integration-guide.md` for architecture patterns
2. **Explore Examples**: Check `agents/examples/n8n_agent_example.py`
3. **Build Workflows**: Create workflows in n8n for your specific use cases
4. **Integrate**: Add n8n tools to your existing agents

## Example Use Cases to Try

1. **Notification Agent**
   - Create workflow: n8n → Slack/Email
   - Agent decides when to send notifications

2. **Data Processing Agent**
   - Create workflow: Extract → Transform → Load
   - Agent orchestrates the pipeline

3. **Customer Support Agent**
   - Create workflow: Create Jira ticket + Slack notification
   - Agent handles customer requests and triggers automation

4. **Monitoring Agent**
   - Agent checks workflow executions
   - Reports failures and retries if needed

## Resources

- **Tutorial**: `agents/AG16-n8n-workflow-integration.ipynb`
- **Guide**: `documentation/n8n-integration-guide.md`
- **Examples**: `agents/examples/n8n_agent_example.py`
- **n8n Docs**: https://docs.n8n.io/

---

**Questions?** Open an issue or check the documentation!

Happy automating! 🤖 + 🔄 = 🚀

# Agent Examples

This directory contains practical examples demonstrating different agent patterns and integrations.

## Available Examples

### n8n_agent_example.py

An interactive example showing how to build AI agents that orchestrate n8n workflows.

**Features:**
- Lists available n8n workflows
- Triggers workflows with data
- Monitors execution status
- Interactive CLI mode

**Prerequisites:**
1. n8n running (locally or remote)
2. N8N_API_KEY environment variable set
3. N8N_BASE_URL environment variable set (optional)

**Usage:**
```bash
# Set up environment
export N8N_API_KEY="your-api-key"
export N8N_BASE_URL="http://localhost:5678"  # optional

# Run the example
python agents/examples/n8n_agent_example.py
```

**What it demonstrates:**
- Initializing n8n client
- Creating toolboxes with n8n tools
- Building agents that can interact with workflows
- Error handling and connection verification
- Interactive agent conversations

## Creating Your Own Examples

To add a new example:

1. Create a new Python file in this directory
2. Add appropriate docstring with usage instructions
3. Include error handling and environment checks
4. Update this README with a description
5. Add any required dependencies to `requirements.txt`

## Related Resources

- **Tutorial**: See `AG16-n8n-workflow-integration.ipynb` for detailed walkthrough
- **Guide**: See `documentation/n8n-integration-guide.md` for architecture patterns
- **Tools**: See `agentkit/n8n_tools.py` for tool implementations

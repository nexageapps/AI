"""n8n workflow integration tools for AI agents.

This module provides tools to interact with n8n workflows from AI agents,
enabling workflow automation, data processing, and orchestration.

🎓 LEARNING GOALS:
- Understand how agents interact with external APIs
- Learn the @tool decorator pattern for creating agent capabilities
- See error handling in production tool design
- Practice integrating AI reasoning with reliable workflow execution

💡 KEY CONCEPTS:
- Separation of concerns: Agent (reasoning) + n8n (execution)
- Tool schema design for LLM consumption
- Environment-based configuration
- Graceful error handling (never raise into agent loop)
"""
from __future__ import annotations
import json
import os
from typing import Any, Literal
import requests
from .tools import tool


class N8nClient:
    """Client for interacting with n8n API.
    
    🎓 LEARNING NOTE:
    This is a typical REST API client. Key patterns:
    - Centralized configuration (base_url, headers)
    - Reusable _request() method for DRY principle
    - Error handling at the boundary (let requests raise, handle in tools)
    
    In production, you'd add:
    - Retry logic with exponential backoff
    - Rate limiting
    - Connection pooling
    - Request/response logging
    """
    
    def __init__(self, base_url: str | None = None, api_key: str | None = None):
        """Initialize n8n client.
        
        Args:
            base_url: n8n instance URL (e.g., 'http://localhost:5678')
            api_key: n8n API key for authentication
        
        🎓 PATTERN: Environment-based config (12-factor app principle)
        - Reads from env vars by default
        - Allows override for testing
        - Never hardcode secrets in code
        """
        self.base_url = (base_url or os.getenv("N8N_BASE_URL", "http://localhost:5678")).rstrip("/")
        self.api_key = api_key or os.getenv("N8N_API_KEY")
        self.headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
        }
        if self.api_key:
            self.headers["X-N8N-API-KEY"] = self.api_key
    
    def _request(self, method: str, endpoint: str, **kwargs) -> dict | list:
        """Make HTTP request to n8n API.
        
        🎓 LEARNING NOTE:
        This is the single point of HTTP communication. Benefits:
        - URL construction in one place
        - Header management centralized
        - Easy to add logging, metrics, or retries later
        
        raise_for_status() converts HTTP errors (4xx, 5xx) to exceptions,
        which we catch in the tool functions to return error strings.
        """
        url = f"{self.base_url}/api/v1/{endpoint.lstrip('/')}"
        response = requests.request(method, url, headers=self.headers, **kwargs)
        response.raise_for_status()
        return response.json() if response.content else {}
    
    def trigger_workflow(self, workflow_id: str, data: dict | None = None) -> dict:
        """Trigger a workflow execution via webhook or test webhook.
        
        Args:
            workflow_id: The workflow ID or webhook path
            data: Optional data to send to the workflow
        
        Returns:
            Workflow execution result
        """
        return self._request("POST", f"workflows/{workflow_id}/execute", json=data or {})
    
    def get_workflow(self, workflow_id: str) -> dict:
        """Get workflow details by ID."""
        return self._request("GET", f"workflows/{workflow_id}")
    
    def list_workflows(self, active_only: bool = False) -> list[dict]:
        """List all workflows."""
        workflows = self._request("GET", "workflows")
        if active_only:
            workflows = [w for w in workflows.get("data", []) if w.get("active")]
        return workflows.get("data", []) if isinstance(workflows, dict) else workflows
    
    def get_execution(self, execution_id: str) -> dict:
        """Get execution details by ID."""
        return self._request("GET", f"executions/{execution_id}")
    
    def list_executions(self, workflow_id: str | None = None, limit: int = 20) -> list[dict]:
        """List recent executions."""
        params = {"limit": limit}
        if workflow_id:
            params["workflowId"] = workflow_id
        result = self._request("GET", "executions", params=params)
        return result.get("data", []) if isinstance(result, dict) else result


# Global client instance (lazy initialization)
_client: N8nClient | None = None


def get_n8n_client(base_url: str | None = None, api_key: str | None = None) -> N8nClient:
    """Get or create the global n8n client instance."""
    global _client
    if _client is None or base_url or api_key:
        _client = N8nClient(base_url, api_key)
    return _client


# Tool definitions for agent use

@tool
def n8n_trigger_workflow(workflow_id: str, data: str = "{}") -> str:
    """Trigger an n8n workflow and wait for completion.
    
    Use this to execute automated workflows, data processing pipelines,
    integrations with external services, or any n8n automation.
    
    Args:
        workflow_id: The n8n workflow ID or webhook path to trigger
        data: JSON string of data to pass to the workflow (default: empty object)
    
    Returns:
        JSON string with execution results
    
    🎓 LEARNING NOTE: Tool Design Principles
    
    1. DESCRIPTION: Written for the LLM, not humans. Explains WHEN to use it.
    2. ARGS: Clear descriptions help the model pass correct data.
    3. RETURNS: Always string (the agent loop format). Complex data as JSON.
    4. ERROR HANDLING: NEVER raise into agent loop. Return error as string so
       the model can reason about failures and recover.
    5. VALIDATION: Parse/validate inputs before external calls.
    
    This is the pattern for ALL agent tools. Study it carefully!
    """
    try:
        client = get_n8n_client()
        payload = json.loads(data) if isinstance(data, str) else data
        result = client.trigger_workflow(workflow_id, payload)
        return json.dumps(result, indent=2)
    except requests.exceptions.RequestException as e:
        return f"Error triggering workflow: {e}"
    except json.JSONDecodeError as e:
        return f"Invalid JSON data: {e}"
    except Exception as e:
        return f"Unexpected error: {e}"


@tool
def n8n_list_workflows(active_only: bool = False) -> str:
    """List available n8n workflows.
    
    Use this to discover what workflows are available to trigger.
    
    Args:
        active_only: If true, only return active workflows (default: false)
    
    Returns:
        JSON string with list of workflows (id, name, active status)
    """
    try:
        client = get_n8n_client()
        workflows = client.list_workflows(active_only)
        simplified = [
            {
                "id": w.get("id"),
                "name": w.get("name"),
                "active": w.get("active", False),
                "tags": w.get("tags", [])
            }
            for w in workflows
        ]
        return json.dumps(simplified, indent=2)
    except Exception as e:
        return f"Error listing workflows: {e}"


@tool
def n8n_get_workflow_details(workflow_id: str) -> str:
    """Get detailed information about a specific workflow.
    
    Use this to understand what a workflow does before triggering it.
    
    Args:
        workflow_id: The workflow ID to inspect
    
    Returns:
        JSON string with workflow details (nodes, connections, settings)
    """
    try:
        client = get_n8n_client()
        workflow = client.get_workflow(workflow_id)
        # Simplify output - just the key info
        simplified = {
            "id": workflow.get("id"),
            "name": workflow.get("name"),
            "active": workflow.get("active"),
            "nodes": [
                {"type": n.get("type"), "name": n.get("name")}
                for n in workflow.get("nodes", [])
            ],
            "settings": workflow.get("settings", {}),
        }
        return json.dumps(simplified, indent=2)
    except Exception as e:
        return f"Error getting workflow details: {e}"


@tool
def n8n_check_execution_status(execution_id: str) -> str:
    """Check the status of a workflow execution.
    
    Use this to monitor long-running workflows or check if a previous execution succeeded.
    
    Args:
        execution_id: The execution ID to check
    
    Returns:
        JSON string with execution status and results
    """
    try:
        client = get_n8n_client()
        execution = client.get_execution(execution_id)
        simplified = {
            "id": execution.get("id"),
            "status": execution.get("status"),
            "mode": execution.get("mode"),
            "startedAt": execution.get("startedAt"),
            "stoppedAt": execution.get("stoppedAt"),
            "workflowId": execution.get("workflowId"),
            "finished": execution.get("finished"),
            "data": execution.get("data", {}).get("resultData"),
        }
        return json.dumps(simplified, indent=2)
    except Exception as e:
        return f"Error checking execution status: {e}"


@tool
def n8n_list_recent_executions(workflow_id: str = "", limit: int = 10) -> str:
    """List recent workflow executions.
    
    Use this to see execution history and check for failures or patterns.
    
    Args:
        workflow_id: Optional workflow ID to filter by (default: all workflows)
        limit: Maximum number of executions to return (default: 10)
    
    Returns:
        JSON string with list of recent executions
    """
    try:
        client = get_n8n_client()
        executions = client.list_executions(
            workflow_id if workflow_id else None,
            min(limit, 100)  # Cap at 100
        )
        simplified = [
            {
                "id": e.get("id"),
                "workflowId": e.get("workflowId"),
                "workflowName": e.get("workflowData", {}).get("name"),
                "status": e.get("status"),
                "startedAt": e.get("startedAt"),
                "stoppedAt": e.get("stoppedAt"),
            }
            for e in executions
        ]
        return json.dumps(simplified, indent=2)
    except Exception as e:
        return f"Error listing executions: {e}"


# Convenience function to create a ToolBox with all n8n tools
def create_n8n_toolbox() -> list:
    """Create a list of all n8n tools for use with ToolBox.
    
    Usage:
        from agentkit.tools import ToolBox
        from agentkit.n8n_tools import create_n8n_toolbox
        
        toolbox = ToolBox(*create_n8n_toolbox())
    
    🎓 LEARNING NOTE: Tool Composition Pattern
    
    This helper makes it easy to add ALL n8n tools at once. Benefits:
    - Single import for common use case
    - Easy to extend (just add to the list)
    - Clear what tools are included
    
    You can also cherry-pick tools:
        toolbox = ToolBox(n8n_trigger_workflow, n8n_list_workflows)
    
    Or combine with other tool sets:
        all_tools = create_n8n_toolbox() + create_database_toolbox()
        toolbox = ToolBox(*all_tools)
    """
    return [
        n8n_trigger_workflow,
        n8n_list_workflows,
        n8n_get_workflow_details,
        n8n_check_execution_status,
        n8n_list_recent_executions,
    ]

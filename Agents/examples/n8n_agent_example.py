#!/usr/bin/env python3
"""
Example: AI Agent with n8n Workflow Integration

This demonstrates how to build an AI agent that can orchestrate
n8n workflows for automation tasks.

Prerequisites:
    1. n8n running locally or remotely
    2. N8N_API_KEY environment variable set
    3. N8N_BASE_URL environment variable set (optional, defaults to localhost)

Usage:
    python n8n_agent_example.py
"""
import os
import sys
from pathlib import Path

# Add parent directory to path
sys.path.insert(0, str(Path(__file__).parent.parent.parent))

from agentkit.llm import Claude
from agentkit.agent import run_agent
from agentkit.tools import ToolBox
from agentkit.n8n_tools import create_n8n_toolbox, get_n8n_client


def check_n8n_connection():
    """Verify n8n connection before starting."""
    print("🔍 Checking n8n connection...")
    
    api_key = os.getenv("N8N_API_KEY")
    base_url = os.getenv("N8N_BASE_URL", "http://localhost:5678")
    
    if not api_key:
        print("❌ N8N_API_KEY not set!")
        print("\nSet it with:")
        print('  export N8N_API_KEY="your-api-key"')
        return False
    
    try:
        client = get_n8n_client()
        workflows = client.list_workflows()
        print(f"✅ Connected to n8n at {base_url}")
        print(f"   Found {len(workflows)} workflows")
        return True
    except Exception as e:
        print(f"❌ Failed to connect: {e}")
        print(f"\nMake sure n8n is running at {base_url}")
        return False


def main():
    """Run the n8n-powered agent."""
    print("=" * 60)
    print("🤖 AI Agent with n8n Workflow Integration")
    print("=" * 60)
    
    # Check connection
    if not check_n8n_connection():
        return
    
    # Initialize components
    print("\n📦 Initializing agent...")
    llm = Claude("claude-3-5-sonnet-20241022")
    toolbox = ToolBox(*create_n8n_toolbox())
    
    system = """
You are an intelligent workflow automation assistant powered by n8n.

When a user asks you to do something:
1. Check what workflows are available
2. Look for workflows that match their request
3. Trigger the appropriate workflow with relevant data
4. Report on the execution status

Be helpful and explain what you're doing.
""".strip()
    
    print("✅ Agent ready!\n")
    
    # Example interactions
    examples = [
        "What workflows do you have available?",
        "Show me details about the first workflow",
        "What were the last 5 workflow executions?",
    ]
    
    print("=" * 60)
    print("Example Interactions")
    print("=" * 60)
    
    for i, task in enumerate(examples, 1):
        print(f"\n📝 Task {i}: {task}")
        print("-" * 60)
        
        result = run_agent(
            llm, toolbox, task,
            system=system,
            max_turns=5
        )
        
        print(f"\n🤖 Response:\n{result.final_text}")
        print(f"\n📊 Completed in {result.turns} turns")
    
    # Interactive mode
    print("\n" + "=" * 60)
    print("Interactive Mode (type 'quit' to exit)")
    print("=" * 60)
    
    while True:
        try:
            user_input = input("\n💬 You: ").strip()
            if user_input.lower() in ["quit", "exit", "q"]:
                print("\n👋 Goodbye!")
                break
            
            if not user_input:
                continue
            
            result = run_agent(
                llm, toolbox, user_input,
                system=system,
                max_turns=10
            )
            
            print(f"\n🤖 Agent: {result.final_text}")
            
        except KeyboardInterrupt:
            print("\n\n👋 Goodbye!")
            break
        except Exception as e:
            print(f"\n❌ Error: {e}")


if __name__ == "__main__":
    main()

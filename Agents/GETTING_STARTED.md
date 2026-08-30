# Getting Started with Agents

Welcome to the **Agents** sector! This guide will help you start building intelligent AI agents with LangChain and LangGraph.

---

## 🚀 Quick Start (5 Minutes)

### 1. Open Your First Lesson

**Option A: Google Colab (Recommended for Beginners)**
- Open [AG01 - Introduction to AI Agents](./AG01%20-%20Introduction%20to%20AI%20Agents.ipynb)
- Click "Open in Colab" badge
- No setup required!

**Option B: Local Jupyter**
```bash
cd Agents
jupyter lab
# Open AG01 - Introduction to AI Agents.ipynb
```

### 2. Get an API Key

You'll need an OpenAI API key:
1. Go to [platform.openai.com](https://platform.openai.com/)
2. Sign up or log in
3. Go to API Keys section
4. Create a new secret key
5. Copy it (you won't see it again!)

**Cost:** Most lessons cost < $0.10 to run completely

### 3. Start Learning!

Follow the lessons in order:
- **AG01** - Understand what agents are (no coding, just concepts)
- **AG02** - Build your first LangChain application
- **AG03** - Add memory to make agents stateful

---

## 📚 What You'll Learn

### Foundation (AG01-AG03)
Learn the fundamentals of AI agents:
- What makes an agent different from a simple LLM call
- The ReAct pattern (Reasoning + Acting)
- Building chains with LangChain
- Memory systems for conversations

### Core Development (AG04-AG07)
Build functional agents:
- Creating and using tools
- Your first complete agent
- RAG (Retrieval-Augmented Generation)
- Testing and evaluation

### Advanced (AG08-AG11)
Master complex patterns:
- LangGraph state machines
- Multi-step workflows
- Human-in-the-loop
- Multi-agent systems

### Applications (AG12-AG14)
Real-world use cases:
- Code generation and analysis
- Data analysis automation
- Research and content creation

### Production (AG15-AG17)
Deploy agents:
- Building APIs
- Creating UIs
- Monitoring and observability

### Capstone (AG18)
Portfolio projects:
- 5 complete applications
- Deployment-ready code
- Documentation and best practices

---

## 🛤️ Learning Paths

### Path 1: Complete Beginner (Recommended)
**Timeline:** 8-12 weeks (6-8 hours/week)

Week 1-2: Foundation
- AG01 → AG02 → AG03

Week 3-4: Core Agents  
- AG04 → AG05

Week 5: RAG & Evaluation
- AG06 → AG07

Week 6-7: LangGraph
- AG08 → AG09

Week 8-9: Advanced
- AG10 → AG11

Week 10: Applications
- Pick one: AG12, AG13, or AG14

Week 11: Production
- AG15 → AG16 → AG17

Week 12+: Capstone
- AG18 (complete 2-3 projects)

### Path 2: Fast Track (With LLM Experience)
**Timeline:** 4-6 weeks

Week 1: Skim AG01-AG03, focus on gaps
Week 2: AG06 (RAG) + AG08 (LangGraph)  
Week 3: AG12, AG13, or AG14 (application focus)
Week 4: AG15-AG17 (production)
Week 5-6: AG18 (capstone)

### Path 3: RAG Specialist
**Timeline:** 6-8 weeks

Focus on knowledge systems and retrieval:
- Weeks 1-2: AG01-AG05 (foundation)
- Weeks 3-4: AG06 deep dive (build multiple RAG systems)
- Week 5: AG08-AG09 (complex RAG workflows)
- Week 6: AG14 (research agent)
- Weeks 7-8: AG15-AG17 (deploy RAG system)

### Path 4: Multi-Agent Expert
**Timeline:** 6-8 weeks

Focus on agent teams:
- Weeks 1-2: AG01-AG05 (foundation)
- Week 3: AG08 (LangGraph)
- Weeks 4-5: AG11 deep dive (build agent teams)
- Week 6: AG13 (data analysis team)
- Weeks 7-8: AG15-AG17 (production deployment)

---

## 🔧 Setup Options

### Option 1: Google Colab (Zero Setup)

**Pros:**
- ✅ No installation needed
- ✅ Free GPU access
- ✅ Works everywhere
- ✅ Easy API key management

**Cons:**
- ❌ Requires internet
- ❌ Session timeout after inactivity

**Setup:**
1. Click "Open in Colab" in any notebook
2. Add API key to Colab Secrets (key icon in left sidebar)
3. Run the first cell to install dependencies
4. Start learning!

### Option 2: Local Development

**Pros:**
- ✅ Work offline
- ✅ Full control
- ✅ Faster for large projects
- ✅ Use local models

**Cons:**
- ❌ Requires setup
- ❌ Need to manage environment

**Setup:**
```bash
# 1. Create virtual environment
python -m venv .venv
source .venv/bin/activate  # macOS/Linux
# .venv\Scripts\activate   # Windows

# 2. Install dependencies
pip install langchain langchain-openai langchain-community \
    chromadb faiss-cpu python-dotenv jupyterlab

# 3. Set up environment
echo "OPENAI_API_KEY=your-key-here" > .env

# 4. Start Jupyter
jupyter lab
```

### Option 3: VSCode + Jupyter Extension

**Pros:**
- ✅ Best debugging experience
- ✅ Integrated terminal
- ✅ Git integration
- ✅ IntelliSense

**Setup:**
1. Install Python extension in VSCode
2. Install Jupyter extension
3. Follow Option 2 setup steps
4. Open `.ipynb` files directly in VSCode

---

## 📦 Dependencies

### Core Libraries
```bash
langchain              # Main framework
langchain-openai       # OpenAI integration
langchain-community    # Community tools
```

### Memory & Storage
```bash
chromadb              # Vector database
faiss-cpu             # Facebook AI similarity search
```

### Utilities
```bash
python-dotenv         # Environment variables
```

### Optional (for specific lessons)
```bash
langchain-anthropic   # Claude support
streamlit             # Quick UIs
fastapi               # API backends
gradio                # Interactive demos
```

---

## 💰 Cost Expectations

### Per Lesson (approximate)
- AG01: Free (no API calls)
- AG02: $0.05-0.10
- AG03: $0.10-0.20
- AG04-AG11: $0.20-0.50 each
- AG12-AG14: $0.50-1.00 each
- AG15-AG17: Minimal (mostly setup)
- AG18: $2-5 (multiple projects)

**Total for complete course: ~$10-15**

### Cost Saving Tips
1. Use `gpt-3.5-turbo` instead of `gpt-4` for learning
2. Implement caching for repeated queries
3. Use smaller prompts during development
4. Consider local models (Ollama) for practice

---

## ✅ Prerequisites

### Required
- ✅ Python fundamentals (functions, classes, loops)
- ✅ Basic understanding of LLMs (what they are)
- ✅ Familiarity with Jupyter notebooks

### Recommended (but not required)
- ⭐ Completed Basic level (B01-B15) OR equivalent knowledge
- ⭐ Understanding of embeddings and vector similarity
- ⭐ Basic API knowledge
- ⭐ Prompt engineering experience

### Not Required (we'll teach you)
- ❌ LangChain experience
- ❌ Agent development knowledge
- ❌ Production deployment experience
- ❌ FastAPI or React

---

## 🎯 Learning Tips

### Before Starting a Lesson
1. ✅ Review prerequisites
2. ✅ Set aside 1-2 hours
3. ✅ Have API key ready
4. ✅ Open a notebook for notes

### While Learning
1. ✅ Run every code cell
2. ✅ Modify code - experiment!
3. ✅ Add your own comments
4. ✅ Try variations of examples
5. ✅ Debug intentionally (break things!)

### After Completing a Lesson
1. ✅ Build a mini-project using concepts
2. ✅ Write a summary in your own words
3. ✅ Share your implementation
4. ✅ Help others in the community

### Best Practices
- **Consistency > Intensity:** 1 hour daily beats 7 hours on Sunday
- **Active Learning:** Modify every example
- **Document Everything:** Keep a learning journal
- **Build Projects:** Apply concepts immediately
- **Join Communities:** LangChain Discord, Reddit
- **Teach Others:** Best way to solidify understanding

---

## 🐛 Troubleshooting

### "Module not found" errors
```bash
# Reinstall dependencies
pip install -U langchain langchain-openai langchain-community
```

### "Invalid API key" errors
```python
# Check your key is set correctly
import os
print(os.getenv("OPENAI_API_KEY")[:10] + "...")  # Should show sk-...
```

### "Rate limit exceeded"
- Wait a few seconds between API calls
- Implement retries with exponential backoff
- Check your OpenAI usage limits

### "Out of tokens" in memory
- Use ConversationSummaryMemory instead of BufferMemory
- Set max_token_limit on summary buffer memory
- Implement token counting

### High costs
- Switch to `gpt-3.5-turbo` (10x cheaper than GPT-4)
- Add caching for repeated queries
- Use smaller context windows
- Monitor usage with callbacks

---

## 📖 Additional Resources

### Official Documentation
- [LangChain Docs](https://python.langchain.com/) - Complete API reference
- [LangGraph Docs](https://langchain-ai.github.io/langgraph/) - State machines
- [OpenAI Docs](https://platform.openai.com/docs) - API details

### Community
- [LangChain Discord](https://discord.gg/langchain) - Active community, quick help
- [r/LangChain](https://reddit.com/r/LangChain) - Reddit discussions
- [GitHub Issues](https://github.com/langchain-ai/langchain) - Report bugs

### Video Resources
- LangChain YouTube - Official tutorials
- Sam Witteveen - Excellent LangChain tutorials
- AI Jason - Practical builds

### Example Projects
- [LangChain Templates](https://github.com/langchain-ai/langchain/tree/master/templates)
- [LangGraph Examples](https://github.com/langchain-ai/langgraph/tree/main/examples)
- [Awesome LangChain](https://github.com/kyrolabs/awesome-langchain)

---

## 🎓 After Completing This Sector

You'll be able to:
1. ✅ Build conversational agents with memory
2. ✅ Create RAG systems for knowledge retrieval
3. ✅ Design complex workflows with LangGraph
4. ✅ Deploy agents as production APIs
5. ✅ Build user interfaces for agents
6. ✅ Monitor and optimize agent performance
7. ✅ Create multi-agent systems
8. ✅ Implement human-in-the-loop patterns

### Career Opportunities
- AI/ML Engineer (Agent specialization)
- LLM Application Developer
- AI Product Engineer
- Conversational AI Engineer
- MLOps Engineer (Agent deployment)

### Next Steps
- Build a portfolio of 3-5 agent projects
- Contribute to LangChain open source
- Join agent development communities
- Stay current with latest research
- Consider Advanced or Expert sectors for deeper ML knowledge

---

## 💬 Get Help

### Stuck on a lesson?
1. Re-read the explanation carefully
2. Check the troubleshooting section
3. Search LangChain Discord
4. Ask in community forums
5. Review official documentation

### Found a bug?
- Open an issue on GitHub
- Include error message and context
- Provide minimal reproduction example

### Want to contribute?
- Fix typos or improve explanations
- Add more examples
- Create supplementary content
- Share your implementations

---

## 🌟 Community

Share your progress:
- Tweet with #LangChain #AIAgents
- Post projects on Reddit r/LangChain
- Share notebooks on GitHub
- Help other learners in Discord

---

**Ready to start? Open AG01 and begin your agent journey! →**

*Happy building! 🚀*

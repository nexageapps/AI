# Project Ideas for AI Engineering Practice

**50+ project ideas** organized by difficulty and track, with skills, estimated time, and templates.

---

## 🎯 How to Use This Guide

1. **Pick a project** that matches your skill level
2. **Check prerequisites** (which lessons to complete first)
3. **Follow the template** to structure your work
4. **Share your results** (GitHub, blog, portfolio)

**Pro tip:** Build projects in public! Document your process, challenges, and learnings.

---

## 📊 Project Matrix

| Difficulty | Basic | Intermediate | Advanced | Agents |
|---|---|---|---|---|
| **Beginner** | 10 projects | 8 projects | 5 projects | 5 projects |
| **Intermediate** | 5 projects | 10 projects | 10 projects | 10 projects |
| **Advanced** | - | 5 projects | 10 projects | 15 projects |

**Total: 93 project ideas!**

---

## 🟢 Beginner Projects (1-3 days)

### Basic Track (After B01-B10)

#### 1. **House Price Predictor with Explainability**
**Skills:** Linear regression, feature engineering, visualization  
**Prerequisites:** B02, B05, B06  
**Time:** 1-2 days  

**What to build:**
- Load housing dataset (Kaggle or generate synthetic)
- Engineer features (location, size, age)
- Train linear regression model
- Visualize feature importance
- Create simple web UI (Streamlit)

**Success criteria:**
- R² > 0.7 on test set
- Can explain why model predicts each price
- UI allows inputting new house features

**Extensions:**
- Add ridge/lasso regularization
- Compare with decision tree
- Deploy to Streamlit Cloud

---

#### 2. **Spam Email Classifier**
**Skills:** Binary classification, text preprocessing, evaluation  
**Prerequisites:** B03, B05, B06  
**Time:** 1-2 days  

**What to build:**
- Collect spam/ham emails (use public dataset)
- Extract features (word counts, TF-IDF)
- Train logistic regression
- Evaluate with precision/recall curves
- Build confusion matrix visualization

**Success criteria:**
- Precision > 0.95 (low false positives crucial!)
- Recall > 0.80
- Can explain misclassifications

---

#### 3. **Customer Churn Predictor**
**Skills:** Classification, feature engineering, metrics  
**Prerequisites:** B03-B06  
**Time:** 2-3 days  

**What to build:**
- Generate or load customer data
- Engineer features (usage, tenure, support tickets)
- Train classifier
- Identify top churn risk factors
- Create retention recommendations

**Success criteria:**
- ROC AUC > 0.80
- Top 10% predicted churners contain >30% actual churners
- Actionable business insights

---

#### 4. **Product Review Sentiment Analyzer**
**Skills:** Multi-class classification, text features  
**Prerequisites:** B04, B05  
**Time:** 1-2 days  

**What to build:**
- Scrape or load product reviews
- Label as positive/neutral/negative
- Extract features (word counts, sentiment lexicons)
- Train softmax classifier
- Build simple dashboard

**Success criteria:**
- Accuracy > 0.70 on 3-class problem
- Can handle new products
- Visualize sentiment trends

---

#### 5. **A/B Test Analyzer**
**Skills:** Statistical testing, visualization  
**Prerequisites:** B01, B05, B06  
**Time:** 1 day  

**What to build:**
- Simulate A/B test data (control vs variant)
- Calculate statistical significance
- Visualize confidence intervals
- Determine sample size needed
- Generate report

**Success criteria:**
- Correctly identifies significant differences
- Calculates required sample size
- Clear visualization of results

---

### Intermediate Track (After I01-I10)

#### 6. **Product Image Classifier**
**Skills:** CNNs, transfer learning, data augmentation  
**Prerequisites:** I01, I02  
**Time:** 2-3 days  

**What to build:**
- Collect/generate product images (5-10 categories)
- Fine-tune pretrained CNN (ResNet, EfficientNet)
- Apply data augmentation
- Build confusion matrix
- Deploy as API

**Success criteria:**
- Accuracy > 0.90 on test set
- Works on new images
- API responds in <1 second

---

#### 7. **Text Generator (Mini-GPT)**
**Skills:** Transformers, tokenization, attention  
**Prerequisites:** I04, I05, I06  
**Time:** 3-4 days  

**What to build:**
- Implement tiny GPT (4-6 layers)
- Train on text corpus (Shakespeare, code, etc.)
- Generate new text
- Visualize attention heads
- Interactive demo

**Success criteria:**
- Generates coherent 2-3 sentence passages
- Can complete prompts
- Attention visualizations show meaningful patterns

---

#### 8. **FAQ Semantic Search**
**Skills:** Embeddings, similarity search, evaluation  
**Prerequisites:** I07  
**Time:** 1-2 days  

**What to build:**
- Create FAQ dataset (100+ Q&A pairs)
- Embed questions
- Build similarity search
- Compare to keyword search (BM25)
- Create simple UI

**Success criteria:**
- Better than BM25 on semantic queries
- Sub-100ms search time
- Works with paraphrased questions

---

---

## 🟡 Intermediate Projects (4-7 days)

### Advanced Track (After A01-A10)

#### 9. **Structured Data Extractor**
**Skills:** LLM APIs, structured output, validation  
**Prerequisites:** A01, A02  
**Time:** 2-3 days  

**What to build:**
- Extract invoice/receipt data
- Define Pydantic schemas
- Handle validation errors
- Build retry logic
- Calculate cost per extraction

**Success criteria:**
- >95% field extraction accuracy
- Handles schema violations gracefully
- Cost < $0.01 per document

---

#### 10. **Internal Knowledge Assistant (RAG)**
**Skills:** RAG, retrieval, evaluation, citations  
**Prerequisites:** A03, A04  
**Time:** 4-5 days  

**What to build:**
- Index company docs (or use sample docs)
- Build BM25 + embedding hybrid search
- Implement reranking
- Add citation validation
- Create evaluation dataset

**Success criteria:**
- Answer quality >0.80 (LLM judge)
- All answers have valid citations
- <3 second end-to-end latency

---

#### 11. **Prompt A/B Testing Platform**
**Skills:** Evaluation, LLM-as-judge, statistics  
**Prerequisites:** A02, A04  
**Time:** 3-4 days  

**What to build:**
- Run multiple prompts on test set
- LLM-judge scores responses
- Statistical significance testing
- Visualize results
- Export reports

**Success criteria:**
- Correctly identifies best prompt
- Handles multiple evaluation criteria
- Exportable reports

---

#### 12. **Multi-Modal Document QA**
**Skills:** Vision, OCR, document understanding  
**Prerequisites:** A08  
**Time:** 3-4 days  

**What to build:**
- Upload PDF/image documents
- Extract text + understand layouts
- Answer questions about documents
- Handle tables and charts
- Multi-document reasoning

**Success criteria:**
- Works on receipts, invoices, forms
- Can answer complex questions
- Handles multi-page documents

---

---

## 🔴 Advanced Projects (1-2 weeks)

### Agents Track (After AG01-AG16)

#### 13. **Customer Support Agent**
**Skills:** Tool use, memory, guardrails, evaluation  
**Prerequisites:** AG02, AG03, AG05, AG09  
**Time:** 5-7 days  

**What to build:**
- Order lookup tool
- Refund policy tool
- Email/ticket creation tool
- Session memory
- Approval gates for refunds
- Evaluation harness

**Success criteria:**
- >90% task completion on test scenarios
- No unapproved refunds
- Handles 50+ turn conversations
- Cost < $0.10 per conversation

---

#### 14. **Code Review Agent**
**Skills:** Coding agents, tools, structured output  
**Prerequisites:** AG12  
**Time:** 5-7 days  

**What to build:**
- GitHub PR integration
- Code analysis tools
- Style checker tool
- Bug detection
- Generates review comments
- Suggests fixes

**Success criteria:**
- Finds real issues (test on known bugs)
- Low false positive rate (<20%)
- Actionable feedback
- Handles multiple languages

---

#### 15. **Research Assistant Agent**
**Skills:** RAG, web search, multi-step reasoning  
**Prerequisites:** AG04, AG06  
**Time:** 7-10 days  

**What to build:**
- Web search tool
- PDF reading tool
- Note-taking system
- Multi-hop reasoning
- Citation tracking
- Report generation

**Success criteria:**
- Can research complex topics
- Synthesizes multiple sources
- Accurate citations
- Readable reports

---

#### 16. **Workflow Automation Agent (n8n)**
**Skills:** n8n integration, orchestration, monitoring  
**Prerequisites:** AG16  
**Time:** 5-7 days  

**What to build:**
- Agent triggers n8n workflows
- Dynamic workflow selection
- Error recovery
- Execution monitoring
- Cost tracking

**Success criteria:**
- Handles 10+ workflow types
- Recovers from failures
- Dashboards show metrics
- Cost-effective execution

---

#### 17. **Multi-Agent System**
**Skills:** Multi-agent orchestration, communication  
**Prerequisites:** AG11  
**Time:** 7-10 days  

**What to build:**
- Supervisor agent
- Specialist agents (3-4 types)
- Task routing
- Result aggregation
- Conflict resolution

**Success criteria:**
- Successfully delegates tasks
- Specialists stay in scope
- Handles inter-agent failures
- Better than single agent on complex tasks

---

---

## 🎓 Capstone-Level Projects (2-4 weeks)

### 18. **Production RAG Application**
**Skills:** Full stack RAG, evals, monitoring, deployment  
**Prerequisites:** A03, A04, AG14, AG15  
**Time:** 2-3 weeks  

**What to build:**
- Document ingestion pipeline
- Hybrid search (BM25 + embeddings)
- Reranking
- Streaming responses
- Evaluation suite
- LangSmith tracing
- Docker deployment
- Monitoring dashboard
- Cost tracking
- User feedback loop

**Success criteria:**
- >0.85 answer quality (golden set)
- <2s p95 latency
- Deployed and accessible
- Monitoring shows all metrics
- Cost per query documented

---

#### 19. **Agentic Coding Assistant**
**Skills:** Coding agents, tools, testing, deployment  
**Prerequisites:** AG12, AG15  
**Time:** 3-4 weeks  

**What to build:**
- File reading/writing tools
- Code execution sandbox
- Test runner
- Git integration
- Multi-file reasoning
- Iterative debugging
- Web IDE interface
- User authentication
- Rate limiting

**Success criteria:**
- Completes HumanEval tasks
- Generates tests
- Fixes bugs iteratively
- Safe execution (sandboxed)
- Production-ready UI

---

#### 20. **Personal AI Assistant**
**Skills:** Multi-modal agents, memory, tools, personalization  
**Prerequisites:** AG02-AG09, AG16  
**Time:** 3-4 weeks  

**What to build:**
- Calendar integration (Google/Outlook)
- Email reading/writing
- Web search
- Long-term memory
- User preferences
- Task automation (n8n workflows)
- Voice interface (optional)
- Mobile app (optional)

**Success criteria:**
- Handles daily assistant tasks
- Learns user preferences
- Proactive suggestions
- Privacy-preserving
- Real users find it useful

---

---

## 🛠️ Project Templates

### Template 1: Data Science Project

```markdown
# Project: [Name]

## Problem Statement
[What problem are you solving?]

## Dataset
- Source: [Where did you get data?]
- Size: [How many samples?]
- Features: [What variables?]

## Approach
1. Data exploration
2. Feature engineering
3. Model selection
4. Evaluation
5. Deployment (optional)

## Results
- Metric 1: [value]
- Metric 2: [value]
- Key findings: [insights]

## Code
[Link to GitHub repo]

## Next Steps
[What would you improve?]
```

### Template 2: Agent Project

```markdown
# Project: [Name]

## Use Case
[What task does the agent solve?]

## Architecture
- LLM: [Which model?]
- Tools: [List of tools]
- Memory: [Session/long-term?]
- Workflow: [How does it work?]

## Implementation
1. Tool design
2. Prompt engineering
3. Loop implementation
4. Evaluation
5. Deployment

## Evaluation
- Test scenarios: [How many?]
- Success rate: [%]
- Cost per task: [$]
- Latency: [seconds]

## Demo
[Link to video/app]

## Learnings
[What did you discover?]
```

### Template 3: Full-Stack Application

```markdown
# Project: [Name]

## Product
[What does the user see/experience?]

## Tech Stack
- Frontend: [React, Streamlit, etc.]
- Backend: [FastAPI, Flask, etc.]
- LLM: [Claude, GPT-4, etc.]
- Infrastructure: [Docker, AWS, etc.]

## Features
1. Feature 1
2. Feature 2
3. Feature 3

## Deployment
- URL: [Link]
- Hosting: [Where?]
- CI/CD: [GitHub Actions, etc.]

## Metrics
- Users: [How many?]
- Usage: [Frequency?]
- Cost: [$ per user?]
- Latency: [Response time?]

## Roadmap
[What's next?]
```

---

## 📝 Project Planning Worksheet

Before starting, answer these questions:

### 1. Scope
- [ ] What exactly am I building?
- [ ] What's the MVP (minimum viable product)?
- [ ] What's out of scope for v1?

### 2. Skills
- [ ] What lessons should I complete first?
- [ ] What new skills will I learn?
- [ ] Where might I get stuck?

### 3. Time
- [ ] How long do I have?
- [ ] What's my daily/weekly commitment?
- [ ] What's my deadline?

### 4. Resources
- [ ] What data do I need?
- [ ] What APIs/tools do I need?
- [ ] What's my budget? (API costs)

### 5. Success
- [ ] How will I know it works?
- [ ] What metrics matter?
- [ ] Who will use/review it?

### 6. Portfolio
- [ ] Will I share this publicly?
- [ ] What will I write about it?
- [ ] How will I present it?

---

## 🎯 Tips for Success

### Before Starting
1. **Pick the right difficulty** - stretch yourself, don't overwhelm
2. **Have a clear goal** - "build an agent" is too vague
3. **Time-box it** - better to finish small than abandon large
4. **Plan for evaluation** - decide success criteria upfront

### While Building
1. **Start simple** - MVP first, features later
2. **Test frequently** - don't wait until the end
3. **Document as you go** - future you will thank present you
4. **Ask for help** - community, office hours, Stack Overflow
5. **Iterate** - first version will be rough, that's OK

### After Finishing
1. **Write about it** - blog post, README, tutorial
2. **Share widely** - GitHub, LinkedIn, Twitter, Discord
3. **Get feedback** - ask others to review/use it
4. **Reflect** - what did you learn? What would you do differently?
5. **Add to portfolio** - showcase your work

---

## 🌟 Portfolio-Worthy Projects

These projects make excellent portfolio pieces:

1. **Production RAG Application** (#18) - shows full-stack skills
2. **Customer Support Agent** (#13) - shows real-world problem-solving
3. **Code Review Agent** (#14) - demonstrates technical depth
4. **Multi-Agent System** (#17) - shows advanced orchestration
5. **Personal AI Assistant** (#20) - shows end-to-end product thinking

**For each, document:**
- Problem statement
- Technical approach
- Results/metrics
- Demo video
- Code (GitHub)
- Write-up (blog)

---

## 📚 Additional Resources

### Datasets
- **Kaggle** - kaggle.com/datasets
- **Hugging Face Datasets** - huggingface.co/datasets
- **UCI ML Repository** - archive.ics.uci.edu/ml
- **Papers with Code** - paperswithcode.com/datasets

### APIs
- **Anthropic Claude** - anthropic.com
- **OpenAI GPT** - openai.com
- **Serp API** (search) - serpapi.com
- **News API** - newsapi.org

### Deployment
- **Streamlit Cloud** - streamlit.io/cloud
- **Hugging Face Spaces** - huggingface.co/spaces
- **Railway** - railway.app
- **Render** - render.com

### Communities
- **r/MachineLearning** - reddit.com/r/MachineLearning
- **r/LanguageTechnology** - reddit.com/r/LanguageTechnology
- **AI Discord servers** - find via discordservers.com
- **Stack Overflow** - stackoverflow.com

---

## 🏆 Project Showcase

Build something amazing with this curriculum? Let us know!

**Submit your project:**
- Open an issue on GitHub with [PROJECT] tag
- Include: name, description, link, lessons used
- We'll feature standout projects in this README

**Featured projects coming soon!**

---

## 💡 Can't Decide? Start Here

**For absolute beginners:**
→ #1 (House Price Predictor) - classic ML problem

**For NLP enthusiasts:**
→ #7 (Text Generator) or #10 (RAG Assistant)

**For agent builders:**
→ #13 (Customer Support Agent) - real-world, practical

**For full-stack developers:**
→ #18 (Production RAG) - complete application

**For researchers:**
→ #15 (Research Assistant) - tools for yourself

**Still unsure?**
Pick the project that excites you most. Motivation > difficulty.

---

## 🔄 Contributing

Have a project idea to add? Submit a PR!

**Format:**
```markdown
#### N. **Project Name**
**Skills:** [comma-separated]
**Prerequisites:** [lesson IDs]
**Time:** [X days]

**What to build:**
- Bullet points

**Success criteria:**
- Measurable outcomes
```

---

**Happy building!** 🚀

Remember: The best way to learn is by doing. Pick a project, start building, and share your results!

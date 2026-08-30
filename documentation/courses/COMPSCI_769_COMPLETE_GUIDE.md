# COMPSCI 769: Natural Language Processing - Complete Course Guide

<div align="center">

**University of Auckland - Semester 2, 2025**

*From Word Vectors to Large Language Models*

</div>

---

## 📋 Table of Contents

- [Course Overview](#course-overview)
- [Teaching Team](#teaching-team)
- [Course Structure](#course-structure)
- [Weekly Topics](#weekly-topics)
- [Assessment](#assessment)
- [Learning Objectives](#learning-objectives)
- [Prerequisites](#prerequisites)
- [Required Resources](#required-resources)
- [Repository Lesson Mapping](#repository-lesson-mapping)
- [Study Guide](#study-guide)
- [Important Policies](#important-policies)

---

## 🎯 Course Overview

<cite index="1-102,1-103,1-104,1-105,1-106,1-107">Computers are becoming increasingly competent at manipulating, understanding, and producing natural language, and language-like products. Systems that can produce and analyse language with near-human competence are becoming widely available, and progress is very rapid. This course introduces natural language processing (NLP), a key component of artificial intelligence (AI). We delve into cutting-edge NLP techniques and explore their applications in spoken and written language, as well as in specific domain languages. This course describes how we achieved modern capabilities for text understanding and generation, large language models, question answering, knowledge representation and reasoning, and so on. The course approaches these techniques and aims to equip students to contribute to the application of and enhancement of the state of the art in computer processing and the production of speech, text, and other symbolic representations of knowledge.</cite>

### What is NLP?

<cite index="1-15">Natural Language Processing (NLP) is a sub-field of AI that is focused on enabling computers to understand and process human languages, to get computers closer to a human-level understanding of language.</cite>

**Key Aspects:**
- **Processing as "representation"**: <cite index="1-20,1-21">Language needs to be transformed into a format computers can work with, like vectors, embeddings, or syntactic structures. These representations allow computers to analyse and reason about language effectively.</cite>

- **Processing as "understanding"**: <cite index="1-23,1-24">This means the computer doesn't just read text but tries to grasp its meaning—such as the semantics, context, and intent behind the words. Understanding is crucial for applications like machine translation, question answering, and sentiment analysis.</cite>

### Why NLP is Core to AI

1. **<cite index="1-32">Language is the primary way humans express intelligence</cite>**
   - <cite index="1-32,1-33">Humans communicate, learn, reason, and collaborate through language. Intelligent systems need to understand and generate language to interact naturally with people.</cite>

2. **<cite index="1-35,1-36">Language contains vast human knowledge - Books, websites, scientific papers, legal documents, and conversations are all stored in natural language. NLP enables AI to access and utilize this knowledge.</cite>**

3. **<cite index="1-38">NLP is not only about processing words—it also involves: Understanding meaning, Reasoning, Question answering, Decision making</cite>**

### Course Philosophy

<cite index="1-43,1-44">"If a machine can converse in a way indistinguishable from a human, it can be called intelligent." "Can Machines Think?" posed in terms of a computer's convincing use of language</cite>

---

## 👥 Teaching Team

### Course Coordinator & Lecturers

**<cite index="1-99">Dr. FAN Wei (Course Coordinator)</cite>**
- Email: wei.fan@auckland.ac.nz
- Office: Newmarket Campus 903-428
- Office hours: By appointment (email first)

**<cite index="1-98">Dr. LIU Qian</cite>**
- Email: liu.qian@auckland.ac.nz
- Office: Newmarket Campus 903-422
- Office hours: By appointment (email first)
- **Background**: <cite index="1-100,1-101">PhD in Computer Science (Beijing Institute of Technology), PhD in Software Engineering (UTS). Research experience at Microsoft (Asia) on Pre-trained Language Models (BERT, RoBERTa) for Question Answering and Retrieval. Postdoc at NTU Singapore on LLM-based Commonsense Reasoning, Affective Computing, Neuro-symbolic AI.</cite>

### Tutors

- **LIU Chenghao** - cliu797@aucklanduni.ac.nz
- **Zhu Ziqin** - ziqin.zhu@auckland.ac.nz

---

## 📚 Course Structure

### Schedule Format

- **Wednesday**: Main lecture (theory)
- **Friday Part 1**: Advanced topics/applications
- **Friday Part 2**: Hands-on tutorials/practical sessions

### Course Phases

<cite index="1-119">
**Week 1-2:** Basics of NLP
**Week 3-8:** NLP tasks
**Week 9-10:** Advanced NLP topics
**Week 11-12:** Presentations given by students (State-of-the-art methods in NLP)
</cite>

---

## 📅 Weekly Topics

<cite index="1-109,1-110,1-111,1-112,1-113,1-114,1-115,1-116,1-117,1-118,1-119">

| Week | Wednesday | Friday (Part 1) | Friday (Part 2) |
|------|-----------|-----------------|-----------------|
| **1** | NLP Introduction | Semantic Representation | How to use word vectors? |
| **2** | Pretraining | Post-training | How to use BERT? |
| **3** | Information Retrieval-1 | Information Retrieval-2 | How does Dense Passage Retrieval work? |
| **4** | Question Answering-1 | Question Answering-2 | How to build Question Answering systems using RAG? |
| **5** | Summarization-1 | Summarization-2 | How to use LLMs for Summarization and Generation? |
| **6** | Knowledge Representation-1 | Knowledge Representation-2 | How to do knowledge representation? |
| **7** | Time Series Forecasting-1 | Time Series Forecasting-2 | How to do time series forecasting? |
| **8** | Align LLMs with Human Value | NLP Meets the World | How to do bias detection? |
| **9** | Advanced NLP Topic: LLM for Science | Advanced NLP Topic: LLM for Financial | How to use LLM as a science tutor? |
| **10** | Advanced NLP Topic: LLM for Reasoning | Advanced NLP Topic: LLM for Law | How to use LLMs as a legal assistant? |
| **11** | Presentation-1 | Presentation-2 | Presentation-3 |
| **12** | Presentation-4 | Presentation-5 | Presentation-6 |

</cite>

### Detailed Topic Coverage

#### Weeks 1-2: Foundations
- What is NLP and why is it important?
- Evolution of NLP (Rule-based → Statistical ML → Deep Learning → LLMs)
- Semantic representation (Word2Vec, GloVe)
- Pre-training language models
- Post-training (RLHF, instruction tuning)

#### Weeks 3-8: Core NLP Tasks
- **Information Retrieval**: Search engines, ranking, dense passage retrieval
- **Question Answering**: Extractive QA, generative QA, RAG systems
- **Summarization**: Abstractive vs extractive, transformer-based approaches
- **Knowledge Representation**: Knowledge graphs, reasoning, ontologies
- **Time Series**: Language models for temporal data
- **AI Safety**: Alignment, bias detection, ethical considerations

#### Weeks 9-10: Advanced Applications
- NLP for Science (scientific literature, hypothesis generation)
- NLP for Finance (sentiment analysis, market prediction)
- NLP for Reasoning (logical inference, common sense)
- NLP for Law (legal document analysis, case law)

#### Weeks 11-12: Student Presentations
- Paper reading and analysis
- State-of-the-art methods
- Group research presentations

---

## 📊 Assessment

<cite index="1-120">

| Component | Weight | Type |
|-----------|--------|------|
| **Assignment 1** | 10% | Coding |
| **Assignment 2** | 30% | Essay |
| **Assignment 3** | 20% | Group Research & Presentation |
| **Final Exam** | 40% | Written Examination |

</cite>

### Assessment Details

**Assignment 1: Coding (10%)**
- Hands-on implementation of NLP techniques
- Topics likely include: word embeddings, text preprocessing, model fine-tuning
- Individual work
- Focus on practical skills with PyTorch/TensorFlow

**Assignment 2: Essay (30%)**
- In-depth analysis of NLP concepts/methods
- Critical evaluation of research papers
- Individual work
- Demonstrates understanding of theory and applications

**Assignment 3: Group Research & Presentation (20%)**
- Team-based research project
- Present state-of-the-art NLP methods
- Weeks 11-12 presentation slots
- Collaborative learning and communication skills

**Final Exam (40%)**
- Comprehensive coverage of all course material
- Theory, applications, and problem-solving
- Closed or open book (TBD)

---

## 🎯 Learning Objectives

<cite index="1-93,1-94,1-95,1-96,1-97">

### 1. Foundations of Modern NLP
- Basics first: semantic representation, word2vec, pretrained language models, large language models
- Then key methods used in NLP: pretraining and post-training (RLHF)

### 2. Understanding NLP Technologies
- Question Answering, Information Retrieval, Knowledge Representation

### 3. Advanced NLP Topics
- NLP for science, law, financial, deep reasoning
- State-of-the-art NLP models

### 4. Practical System Building
- Tutorials in PyTorch
- An understanding of and ability to build systems for some of the major problems in NLP

</cite>

---

## 📚 Prerequisites

### Required Background

**Machine Learning Basics:**
- Neural networks fundamentals
- Gradient descent and backpropagation
- Loss functions and optimization
- Training/validation/test splits

**Python Programming:**
- Proficiency in Python
- Experience with NumPy, pandas
- Basic understanding of PyTorch or TensorFlow

**Mathematics:**
- Linear algebra (vectors, matrices, dot products)
- Probability and statistics
- Calculus (derivatives, chain rule)

### Recommended Preparation

Before the course starts, review:
- Basic neural networks (see Basic/B05)
- Recurrent neural networks (see Basic/B10)
- Attention mechanisms (see Basic/B11)
- Transformers (see Basic/B11)

---

## 📖 Required Resources

### Textbooks & Resources

**Primary Resources:**
- Course lecture slides and notes (Canvas)
- Assigned research papers
- Hugging Face Transformers documentation

**Supplementary Books:**
- *Speech and Language Processing* by Jurafsky & Martin (3rd ed. draft)
- *Natural Language Processing with Transformers* by Tunstall, von Werra & Wolf
- *Dive into Deep Learning* by Zhang et al. (d2l.ai)

### Software & Tools

**Required:**
- Python 3.8+
- PyTorch or TensorFlow
- Hugging Face Transformers library
- Jupyter Notebook

**Recommended:**
- Google Colab (for GPU access)
- wandb (experiment tracking)
- Git/GitHub (version control)

---

## 🗺️ Repository Lesson Mapping

### Week 1-2: Foundations

| Course Topic | Repository Lessons | Notes |
|--------------|-------------------|-------|
| Semantic Representation | [B11 - Attention & Transformers](../../Basic/B11%20-%20Attention%20and%20Transformers.ipynb) | Word2Vec concepts, embeddings |
| Pretraining | [A01 - Fine-tuning LLMs](../../Advanced/A01%20-%20Fine-tuning%20Large%20Language%20Models.ipynb) | Understanding pre-training process |
| Post-training | [A02 - Prompt Engineering](../../Advanced/A02%20-%20Prompt%20Engineering%20and%20In-Context%20Learning.ipynb) | RLHF, instruction tuning |
| Word Vectors Tutorial | [B11 - Attention & Transformers](../../Basic/B11%20-%20Attention%20and%20Transformers.ipynb) | Practical implementation |

### Week 3-4: Information Retrieval & Question Answering

| Course Topic | Repository Lessons | Notes |
|--------------|-------------------|-------|
| Information Retrieval | [A03 - RAG](../../Advanced/A03%20-%20Retrieval-Augmented%20Generation%20(RAG).ipynb) | Dense passage retrieval |
| Question Answering | [A03 - RAG](../../Advanced/A03%20-%20Retrieval-Augmented%20Generation%20(RAG).ipynb) | RAG systems, extractive QA |
| RAG Tutorial | [A03 - RAG](../../Advanced/A03%20-%20Retrieval-Augmented%20Generation%20(RAG).ipynb) | Hands-on implementation |

### Week 5: Summarization

| Course Topic | Repository Lessons | Notes |
|--------------|-------------------|-------|
| Summarization | [A02 - Prompt Engineering](../../Advanced/A02%20-%20Prompt%20Engineering%20and%20In-Context%20Learning.ipynb) | Abstractive summarization |
| LLM Generation | [B13 - Mini Language Model](../../Basic/B13%20-%20Building%20a%20Mini%20Language%20Model.ipynb) | Text generation fundamentals |

### Week 6: Knowledge Representation

| Course Topic | Repository Lessons | Notes |
|--------------|-------------------|-------|
| Knowledge Graphs | Related to COMPSCI 713 KG content | See application/compsci713/week3 |
| Reasoning | [A14 - Responsible AI](../../Advanced/A14%20-%20Responsible%20AI%20and%20Governance.ipynb) | Knowledge-based reasoning |

### Week 7: Time Series

| Course Topic | Repository Lessons | Notes |
|--------------|-------------------|-------|
| Time Series Forecasting | [B10 - RNNs](../../Basic/B10%20-%20Recurrent%20Neural%20Networks.ipynb) | Sequence modeling |
| LSTM/GRU | [B10a - RNNs (COMPSCI 714)](../../Basic/B10a%20-%20Recurrent%20Neural%20Networks%20(COMPSCI%20714).ipynb) | Advanced sequence models |

### Week 8: Ethics & Safety

| Course Topic | Repository Lessons | Notes |
|--------------|-------------------|-------|
| LLM Alignment | [A14 - Responsible AI](../../Advanced/A14%20-%20Responsible%20AI%20and%20Governance.ipynb) | RLHF, alignment |
| Bias Detection | [A14 - Responsible AI](../../Advanced/A14%20-%20Responsible%20AI%20and%20Governance.ipynb) | Fairness, ethics |

### Weeks 9-10: Advanced Topics

| Course Topic | Repository Lessons | Notes |
|--------------|-------------------|-------|
| LLM for Science | [E01 - Research Papers](../../Expert/E01%20-%20Reading%20and%20Implementing%20Research%20Papers.ipynb) | Scientific applications |
| LLM for Domain Tasks | [A01 - Fine-tuning](../../Advanced/A01%20-%20Fine-tuning%20Large%20Language%20Models.ipynb) | Domain adaptation |

### Supporting Concepts

| Concept | Repository Lessons | Importance |
|---------|-------------------|------------|
| Neural Network Basics | [B05 - Neural Networks](../../Basic/B05%20-%20Neural%20Network%20Fundamentals.ipynb) | Foundation |
| RNNs | [B10 - RNNs](../../Basic/B10%20-%20Recurrent%20Neural%20Networks.ipynb) | Sequence modeling |
| Attention & Transformers | [B11 - Attention & Transformers](../../Basic/B11%20-%20Attention%20and%20Transformers.ipynb) | Core NLP architecture |
| Tokenization | [B12 - BPE](../../Basic/B12%20-%20Byte%20Pair%20Encoding%20(BPE).ipynb) | Text preprocessing |
| Language Models | [B13 - Mini LM](../../Basic/B13%20-%20Building%20a%20Mini%20Language%20Model.ipynb) | Understanding LLMs |

---

## 📝 Study Guide

### Before Each Week

1. **Review prerequisite lessons** from the mapping above
2. **Read assigned papers** (if any)
3. **Set up coding environment** for tutorials

### During Lectures

1. **Take notes** on key concepts and formulas
2. **Ask questions** when concepts are unclear
3. **Participate** in discussions and examples

### After Lectures

1. **Review lecture slides** within 24 hours
2. **Work through tutorials** hands-on
3. **Complete practice problems**
4. **Connect concepts** to repository lessons

### For Assignments

1. **Start early** - don't wait until deadline
2. **Understand the task** before coding
3. **Use repository** as reference, not as template
4. **Test thoroughly** before submission

### For Presentations (Weeks 11-12)

1. **Choose papers early** (Week 8-9)
2. **Read thoroughly** and understand methodology
3. **Identify key contributions**
4. **Prepare clear visualizations**
5. **Practice presentation** with team

### Exam Preparation

**Theory Review:**
- NLP fundamentals and evolution
- Semantic representation methods
- Pre-training vs post-training
- Major NLP tasks and approaches
- Ethics and safety considerations

**Practical Skills:**
- Implement word embeddings
- Fine-tune pre-trained models
- Build RAG systems
- Evaluate model performance
- Debug NLP pipelines

**Study Timeline:**
- **4 weeks before**: Review all lecture notes
- **3 weeks before**: Work through past papers
- **2 weeks before**: Practice implementations
- **1 week before**: Focus on weak areas
- **Day before**: Light review, rest well

---

## ⚠️ Important Policies

### Academic Integrity

<cite index="1-121,1-122,1-123,1-124,1-125">

**Plagiarism Definition:**
"Plagiarism means using the work of others in preparing an assignment and presenting it as your own without explicitly acknowledging – or referencing – where it came from. Plagiarism can also mean not acknowledging the full extent of reliance on a source."

**Seeking Advice:**
Course coordinators, lecturers or tutors are the appropriate people with whom you should discuss how to appropriately use and acknowledge the work of others, including work produced by AI systems.

**Consequences:**
Cheating is viewed as a serious offence by The University of Auckland. Penalties are administered by the Discipline Committee of the Senate and may include suspension or expulsion from the University.

**Important:** Work written primarily by an AI system counts as "the work of others" for the purposes of COMPSCI 769

</cite>

### AI Tool Usage

**✅ Appropriate Use:**
- Understanding concepts and debugging code
- Generating ideas for research topics
- Improving writing clarity (with disclosure)
- Learning new programming techniques

**❌ Inappropriate Use:**
- Generating assignment solutions directly
- Writing essays or reports without understanding
- Copying AI-generated code without modification
- Using AI during assessments without permission

**Always disclose AI usage** in your work and ensure you understand what you submit.

### Communication Guidelines

<cite index="1-126,1-127,1-128,1-129,1-130,1-131,1-132">

**Teaching Team to Students:**
- Check Canvas Announcements daily
- Set email notifications to ASAP

**Students to Teaching Team:**
- Use **ED Discussion** for general course questions
- Use **Email** for specific/private/urgent requests

**Email Guidelines:**
- Email the right person: course coordinator (admin) vs. lecturer (content)
- Use descriptive subjects: [CS769] + subject
- Be concise but provide enough context
- Expect response within 48 hours (not immediate)

</cite>

### Class Representative

<cite index="1-133,1-134,1-135,1-136,1-137,1-138,1-139,1-140">

The class rep acts as an intermediary between students and teaching staff. You can share suggestions, complaints, or remarks about lectures with them. The class rep can also organize student communication (e.g., social media chats).

**Election Process:**
- Mandatory for courses with 15+ students
- Candidates post motivations on ED
- Voting via Canvas poll if multiple candidates

</cite>

---

## 🚀 Getting Started

### Week 1 Preparation Checklist

- [ ] Join Canvas course page
- [ ] Set up Python environment with PyTorch
- [ ] Install Hugging Face Transformers
- [ ] Review B11 (Attention & Transformers) from repository
- [ ] Attend first lecture
- [ ] Introduce yourself on ED Discussion
- [ ] Find study partners

### Essential Python Libraries

```bash
pip install torch transformers datasets evaluate
pip install numpy pandas matplotlib jupyter
pip install sentencepiece tokenizers
```

### Recommended Learning Path

1. **Before Week 1:** Review transformer basics (B11)
2. **Week 1:** Focus on semantic representation theory
3. **Week 2:** Practice with pre-trained models
4. **Weeks 3-8:** Build mini-projects for each topic
5. **Weeks 9-10:** Explore advanced applications
6. **Weeks 11-12:** Present your research

---

## 📊 Key NLP Concepts

### NLP Task Categories

<cite index="1-63">

**Information Extraction:** Text Mining; Knowledge Graph Maintenance; Ontology Construction

**Information Retrieval:** Indexing; Term Weighting; Vector-based; Spoken Docs; Metadata

**Question Answering:** Unrestricted; Database Queries; Inference-based; Argumentation

**Dialogue Systems:** Interactive Query; Knowledge Capture; Scripted Agents

**Summarisation:** Single-document; Multi-document

**Speech:** Transcription; Speaker ID; Emotion Recognition; Synthesis

**Text Generation, Sentiment Analysis, Named Entity Recognition**, and more

</cite>

### Evolution of NLP

<cite index="1-88">

**1980s - Rule-based NLP:**
- Expert-designed linguistic rules
- Handcrafted rules, grammar, and lexicons
- High interpretability but hard to scale

**1990s-2010s - Machine Learning:**
- Statistical models learn from data
- Naive Bayes, Hidden Markov Models, SVM
- Better generalization than rules

**2013-2018 - Deep Learning:**
- Neural networks learn representations
- Word2Vec, GloVe, RNN, LSTM, CNN
- Automatic representation learning

**2018-Today - Large Language Models:**
- Foundation models at unprecedented scale
- BERT, GPT series, T5, PaLM
- Pre-trained on massive corpora

</cite>

### What Makes Language Hard?

<cite index="1-47,1-48,1-49,1-50,1-51,1-52,1-53,1-54">

- **Ambiguity:** Words, phrases, and sentences can have multiple meanings
- **Context-dependence:** Meaning depends on surrounding context (e.g., "He's cool" - Temperature? Personality? Fashion?)
- **Social complexity:** Language is a complex social process
- **Multilingual and multimodal diversity:** Different languages, scripts, cultural conventions
- **Dynamic evolution:** Language never stops changing

</cite>

<cite index="1-59,1-60">Language is hard because it's a compressed, lossy encoding of human experience—requiring shared context, creativity, and consciousness to decode fully. Machines excel at pattern matching, but struggle with meaning making.</cite>

---

## 🔗 Useful Resources

### Official Course Resources
- **Canvas:** Course announcements, lectures, assignments
- **ED Discussion:** Q&A forum
- **Office Hours:** Book via email

### NLP Tools & Platforms
- **Hugging Face:** Pre-trained models and datasets
- **Papers With Code:** Latest research with implementations
- **ArXiv:** Research paper preprints
- **ACL Anthology:** NLP conference proceedings

### Research Communities
- **ACL, EMNLP, NAACL:** Top NLP conferences
- **NeurIPS, ICLR, ICML:** ML/AI conferences with NLP tracks
- **r/LanguageTechnology:** Reddit NLP community
- **Twitter/X:** Follow NLP researchers

### Practice & Learning
- **Kaggle:** NLP competitions and datasets
- **Google Colab:** Free GPU for experiments
- **This Repository:** Hands-on tutorials and code

---

## 🤝 Getting Help

### When You're Stuck

1. **Check lecture slides** and course materials first
2. **Search ED Discussion** - someone may have asked already
3. **Review repository lessons** for related concepts
4. **Ask on ED** for course-related questions
5. **Email teaching team** for personal/urgent matters
6. **Attend office hours** for in-depth discussions

### Study Groups

Form study groups early! Benefits:
- Discuss difficult concepts together
- Share different perspectives
- Practice explanations
- Prepare for presentations
- Moral support during assignments

---

## 🎓 Success Tips

### From Past Students

1. **Start assignments early** - NLP projects take time to debug
2. **Understand, don't memorize** - concepts build on each other
3. **Implement from scratch** at least once for key algorithms
4. **Read papers actively** - try to reproduce results
5. **Build a portfolio** - create NLP projects for GitHub
6. **Stay current** - NLP moves fast, follow recent papers
7. **Ask questions** - the teaching team is here to help

### Time Management

**Per Week Expected:**
- Lectures: 3 hours
- Tutorials: 2 hours
- Self-study: 5-7 hours
- **Total: 10-12 hours/week**

**Assignment Periods:**
- Assignment 1: Plan 10-15 hours
- Assignment 2: Plan 20-30 hours
- Assignment 3: Plan 15-20 hours (group)

---

## 🌟 Career Paths

### NLP Skills Open Doors To:

**Industry Roles:**
- NLP Engineer
- ML Research Scientist
- Data Scientist (NLP focus)
- Conversational AI Engineer
- Information Retrieval Specialist

**Research Areas:**
- Large Language Models
- Multimodal AI
- Low-resource NLP
- Interpretability & Safety
- Domain-specific NLP

**Companies Hiring:**
- Tech giants (Google, Meta, Microsoft, Amazon)
- AI labs (OpenAI, Anthropic, Cohere)
- Startups (Hugging Face, Scale AI)
- Traditional industries (finance, healthcare, legal)

---

## 📞 Support Services

**University Health & Counselling:**
- Phone: 0800 623 1700 (available 24/7)
- Website: auckland.ac.nz/studenthealth

**Student Disability Services:**
- Website: disability.auckland.ac.nz
- Email: disability@auckland.ac.nz

**AUSA Advocacy:**
- Website: ausa.org.nz
- Independent advice and support

**Te Papa Manaaki (Campus Care):**
- Website: auckland.ac.nz/campus-care
- Report concerns about yourself or others

---

## 📅 Important Dates

*(Check Canvas for official dates)*

- **Week 1:** Course begins, class rep election
- **Week 2:** Assignment 1 released
- **Week 4:** Assignment 1 due, Assignment 2 released
- **Week 7:** Assignment 2 due, Assignment 3 groups formed
- **Week 9:** Assignment 3 topic selection
- **Week 11-12:** Group presentations
- **TBD:** Final exam

---

## 🎉 Final Thoughts

NLP is one of the most exciting and rapidly evolving fields in AI. This course will give you:
- **Theoretical foundation** in modern NLP
- **Practical skills** with state-of-the-art models
- **Research exposure** to cutting-edge methods
- **Industry relevance** for career opportunities

<cite index="1-90">**Keep up with NLP:**
- Follow top conferences & journals – ACL, EMNLP, NeurIPS, ICLR, TACL
- Read preprints & leaderboards – arXiv, Papers With Code
- Try open-source tools – Hugging Face, GitHub projects
- Watch for big news & breakthroughs – major LLM releases
- Stay active in the community – follow researchers on X/LinkedIn</cite>

**Remember:** This repository is your companion for hands-on learning. Use it alongside course materials to build strong practical skills.

---

<div align="center">

**Questions? Issues? Suggestions?**

📧 Email: wei.fan@auckland.ac.nz | liu.qian@auckland.ac.nz

💬 ED Discussion Forum | Canvas

📚 [Back to Documentation Index](../DOCUMENTATION_INDEX.md)

---

*Last Updated: January 2025*

**Happy Learning! 🚀**

</div>

# Agents Sector - Practice Exercises

Complete these exercises to reinforce your learning. Solutions are provided at the end of each section.

---

## AG01 - Introduction to AI Agents

### Exercise 1: Identify the Right Approach
For each scenario, choose: **Simple LLM Call**, **Chain**, **Agent**, or **Multi-Agent System**

1. Translate text from English to Spanish
2. Research a topic, summarize findings, and cite sources
3. Generate SQL query → Execute → Format results
4. Build a customer support system with triage, specialist, and escalation
5. Summarize a document
6. Debug code by reading files, running tests, and suggesting fixes

<details>
<summary><b>Solution</b></summary>

1. **Simple LLM Call** - Single-step task
2. **Agent** - Multi-step with tools (search) and dynamic planning
3. **Chain** - Fixed sequence of steps
4. **Multi-Agent System** - Multiple specialized roles
5. **Simple LLM Call** - Single-step task
6. **Agent** - Multi-step with tools (file reader, test runner) and reasoning
</details>

---

### Exercise 2: Design a ReAct Flow
Design the ReAct loop for: "Find the population of Tokyo and compare it to New York"

Write out the Thought → Action → Observation sequence.

<details>
<summary><b>Solution</b></summary>

```
Thought 1: I need to find Tokyo's population
Action 1: search("Tokyo population 2024")
Observation 1: Tokyo population is approximately 14 million

Thought 2: Now I need New York's population
Action 2: search("New York City population 2024")
Observation 2: New York City population is approximately 8.3 million

Thought 3: I can now compare them
Action 3: calculator("14000000 - 8300000")
Observation 3: 5700000

Thought 4: I have all information
Final Answer: "Tokyo has a population of ~14 million, while New York City has ~8.3 million. Tokyo is larger by approximately 5.7 million people."
```
</details>

---

### Exercise 3: Agent Cost Analysis
An agent makes 5 iterations with the following token usage:
- Iteration 1: 500 input, 200 output
- Iteration 2: 700 input, 150 output
- Iteration 3: 800 input, 300 output
- Iteration 4: 600 input, 100 output
- Iteration 5: 900 input, 250 output

Using gpt-3.5-turbo pricing ($0.50/1M input tokens, $1.50/1M output tokens), calculate total cost.

<details>
<summary><b>Solution</b></summary>

**Input tokens:** 500 + 700 + 800 + 600 + 900 = 3,500 tokens
- Cost: 3,500 × $0.50 / 1,000,000 = $0.00175

**Output tokens:** 200 + 150 + 300 + 100 + 250 = 1,000 tokens  
- Cost: 1,000 × $1.50 / 1,000,000 = $0.0015

**Total: $0.00325** (~$0.003)

**Comparison to single LLM call** (assume 500 input, 200 output):
- Single call cost: ~$0.00055
- **Agent is 6x more expensive** but provides tool use and multi-step reasoning
</details>

---

### Exercise 4: Identify Failure Modes
For each scenario, identify the problem and suggest a solution:

1. Agent keeps calling `search("weather")` → getting results → calling `search("weather")` again (infinite loop)
2. User asks "What's 2+2?" and agent uses web search instead of calculator
3. Agent claims "Einstein won the Nobel Prize in 1920" (it was 1921)

<details>
<summary><b>Solutions</b></summary>

1. **Problem:** Infinite loop - agent doesn't recognize it has the answer
   - **Solution:** Set `max_iterations=10`, improve prompts to include "stop when you have the answer", add loop detection

2. **Problem:** Wrong tool selection
   - **Solution:** Improve tool descriptions, add few-shot examples showing when to use each tool, use better prompts

3. **Problem:** Hallucination
   - **Solution:** Use grounding with retrieval, require citations, add verification tool, fact-check critical claims
</details>

---

### Exercise 5: Design Your Agent
Design an agent for: **"Code Review Assistant"**

Specify:
- What tools it needs
- What memory type to use
- Potential failure modes
- Safety considerations

<details>
<summary><b>Sample Solution</b></summary>

**Tools Needed:**
1. `read_file` - Read code files
2. `execute_tests` - Run test suite
3. `static_analysis` - Run linter/type checker
4. `search_docs` - Search language documentation
5. `search_codebase` - Find similar code patterns

**Memory:**
- Use **Entity Memory** to track:
  - Files reviewed
  - Common issues found
  - Coding standards
  - Previous suggestions

**Failure Modes:**
1. Suggesting changes that break tests → Always run tests after suggesting changes
2. Missing context from related files → Implement file dependency tracking
3. Suggesting outdated patterns → Keep knowledge base current

**Safety:**
- Never execute arbitrary code
- Require human approval for destructive changes
- Log all suggestions
- Explain reasoning for each suggestion
- Allow developers to override
</details>

---

## AG02 - LangChain Basics

### Exercise 1: Build a Translation Chain
Create a chain that:
1. Translates English to French
2. Translates French back to English
3. Compares the results

<details>
<summary><b>Solution</b></summary>

```python
from langchain_openai import ChatOpenAI
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser

llm = ChatOpenAI(model="gpt-3.5-turbo")

# Chain 1: English to French
to_french = (
    PromptTemplate.from_template("Translate to French: {text}")
    | llm
    | StrOutputParser()
)

# Chain 2: French to English
to_english = (
    PromptTemplate.from_template("Translate to English: {french}")
    | llm
    | StrOutputParser()
)

# Combined chain
translation_chain = (
    {"french": to_french}
    | to_english
)

# Test
original = "Hello, how are you today?"
result = translation_chain.invoke({"text": original})

print(f"Original: {original}")
print(f"After round-trip: {result}")
```
</details>

---

### Exercise 2: Movie Extractor
Create a Pydantic model for a movie and extract information from text.

**Text:** "Inception (2010) is a sci-fi thriller rated 8.8/10 directed by Christopher Nolan"

Extract: title, year, genre, rating, director

<details>
<summary><b>Solution</b></summary>

```python
from pydantic import BaseModel, Field
from langchain_core.output_parsers import PydanticOutputParser
from langchain_core.prompts import ChatPromptTemplate

class Movie(BaseModel):
    title: str = Field(description="Movie title")
    year: int = Field(description="Release year")
    genre: str = Field(description="Movie genre")
    rating: float = Field(description="Rating out of 10")
    director: str = Field(description="Director name")

parser = PydanticOutputParser(pydantic_object=Movie)

template = ChatPromptTemplate.from_messages([
    ("system", "Extract movie information.\\n{format_instructions}"),
    ("human", "{text}")
])

chain = template | llm | parser

result = chain.invoke({
    "text": "Inception (2010) is a sci-fi thriller rated 8.8/10 directed by Christopher Nolan",
    "format_instructions": parser.get_format_instructions()
})

print(f"Title: {result.title}")
print(f"Year: {result.year}")
print(f"Genre: {result.genre}")
print(f"Rating: {result.rating}")
print(f"Director: {result.director}")
```
</details>

---

### Exercise 3: Parallel Pros/Cons Analyzer
Build a chain that analyzes pros and cons of a topic in parallel, then combines them.

<details>
<summary><b>Solution</b></summary>

```python
from langchain_core.runnables import RunnableParallel

pros_chain = (
    PromptTemplate.from_template("List 3 pros of {topic} in bullet points")
    | llm
    | StrOutputParser()
)

cons_chain = (
    PromptTemplate.from_template("List 3 cons of {topic} in bullet points")
    | llm
    | StrOutputParser()
)

# Parallel execution
parallel_chain = RunnableParallel(
    pros=pros_chain,
    cons=cons_chain
)

# Combine results
combine_template = PromptTemplate.from_template("""
Based on the following analysis of {topic}:

PROS:
{pros}

CONS:
{cons}

Provide a balanced 2-sentence summary.
""")

full_chain = (
    parallel_chain
    | combine_template
    | llm
    | StrOutputParser()
)

result = full_chain.invoke({"topic": "remote work"})
print(result)
```
</details>

---

### Exercise 4: Few-Shot Prompt Engineer
Create a few-shot prompt template that teaches the LLM to extract sentiment and score from reviews.

Examples:
- "This product is amazing!" → Positive, 5/5
- "Terrible quality, very disappointed" → Negative, 1/5

<details>
<summary><b>Solution</b></summary>

```python
from langchain_core.prompts import FewShotChatMessagePromptTemplate

examples = [
    {"review": "This product is amazing!", "output": "Sentiment: Positive, Score: 5/5"},
    {"review": "Terrible quality, very disappointed", "output": "Sentiment: Negative, Score: 1/5"},
    {"review": "It's okay, nothing special", "output": "Sentiment: Neutral, Score: 3/5"},
    {"review": "Exceeded my expectations!", "output": "Sentiment: Positive, Score: 5/5"},
]

example_prompt = ChatPromptTemplate.from_messages([
    ("human", "{review}"),
    ("ai", "{output}")
])

few_shot_prompt = FewShotChatMessagePromptTemplate(
    example_prompt=example_prompt,
    examples=examples,
)

final_prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a sentiment analyzer. Provide sentiment and score."),
    few_shot_prompt,
    ("human", "{review}"),
])

chain = final_prompt | llm | StrOutputParser()

# Test
test_review = "Good value for money but could be better quality"
result = chain.invoke({"review": test_review})
print(result)
```
</details>

---

### Exercise 5: Build a Recipe Generator
Create a chain that:
1. Takes ingredients list
2. Generates a recipe name
3. Creates step-by-step instructions
4. Estimates cooking time

Output as a structured Pydantic model.

<details>
<summary><b>Solution</b></summary>

```python
from typing import List
from pydantic import BaseModel, Field

class Recipe(BaseModel):
    name: str = Field(description="Recipe name")
    ingredients: List[str] = Field(description="List of ingredients")
    instructions: List[str] = Field(description="Step-by-step instructions")
    cooking_time: int = Field(description="Total time in minutes")
    difficulty: str = Field(description="Easy, Medium, or Hard")

parser = PydanticOutputParser(pydantic_object=Recipe)

template = ChatPromptTemplate.from_messages([
    ("system", "You are a chef. Create a recipe from ingredients.\\n{format_instructions}"),
    ("human", "Create a recipe using: {ingredients}")
])

recipe_chain = template | llm | parser

result = recipe_chain.invoke({
    "ingredients": "chicken, tomatoes, garlic, pasta",
    "format_instructions": parser.get_format_instructions()
})

print(f"Recipe: {result.name}")
print(f"Time: {result.cooking_time} minutes")
print(f"Difficulty: {result.difficulty}")
print(f"\\nInstructions:")
for i, step in enumerate(result.instructions, 1):
    print(f"{i}. {step}")
```
</details>

---

## AG03 - Memory Systems

### Exercise 1: Build a Preference Tracker
Create a chatbot that remembers user preferences (name, favorite color, hobby, food) and uses them in responses.

<details>
<summary><b>Solution</b></summary>

```python
from langchain.memory import ConversationEntityMemory
from langchain.chains import ConversationChain

# Create entity memory
preference_memory = ConversationEntityMemory(
    llm=llm,
    return_messages=True
)

# Create chain
preference_bot = ConversationChain(
    llm=llm,
    memory=preference_memory,
    verbose=True
)

# Conversation
print(preference_bot.predict(
    input="My name is Alice, I love blue color and I enjoy hiking"
))

print("\\n" + "="*50 + "\\n")

print(preference_bot.predict(
    input="I also love pizza"
))

print("\\n" + "="*50 + "\\n")

# Ask about preferences
print(preference_bot.predict(
    input="What are my favorite things?"
))

print("\\n" + "="*50 + "\\n")

# Check entity store
print("Entity Store:")
print(preference_memory.entity_store.store)
```
</details>

---

### Exercise 2: Compare Memory Types
Test the same conversation with 3 different memory types and compare:
1. Buffer Memory (stores everything)
2. Window Memory (k=2)
3. Summary Memory

Measure token usage for each.

<details>
<summary><b>Solution</b></summary>

```python
from langchain.memory import (
    ConversationBufferMemory,
    ConversationBufferWindowMemory,
    ConversationSummaryMemory
)
from langchain.callbacks import get_openai_callback

# Test conversation
messages = [
    "I'm planning a trip to Japan",
    "I want to visit Tokyo and Kyoto",
    "I'm interested in temples and technology",
    "My budget is $3000",
    "I prefer hotels over hostels",
    "What cities should I visit based on my interests?"
]

# Test each memory type
memory_types = {
    "Buffer": ConversationBufferMemory(return_messages=True),
    "Window (k=2)": ConversationBufferWindowMemory(k=2, return_messages=True),
    "Summary": ConversationSummaryMemory(llm=llm, return_messages=True)
}

results = {}

for name, memory in memory_types.items():
    chain = ConversationChain(llm=llm, memory=memory, verbose=False)
    
    with get_openai_callback() as cb:
        for msg in messages:
            chain.predict(input=msg)
        
        results[name] = {
            "tokens": cb.total_tokens,
            "cost": cb.total_cost
        }

# Compare
print("\\n=== Memory Type Comparison ===")
for name, data in results.items():
    print(f"{name}:")
    print(f"  Tokens: {data['tokens']}")
    print(f"  Cost: ${data['cost']:.4f}")
    print()
```
</details>

---

### Exercise 3: Semantic Memory Search
Create a vector memory system and test semantic search.

Store these memories:
1. "I love machine learning and deep learning"
2. "I'm interested in NLP and transformers"
3. "I enjoy computer vision tasks"
4. "I prefer Python for all my projects"
5. "I work as a data scientist"

Then search for:
- "What programming language does the user like?"
- "What AI topics is the user interested in?"

<details>
<summary><b>Solution</b></summary>

```python
from langchain.memory import VectorStoreRetrieverMemory
from langchain_community.vectorstores import FAISS
from langchain_openai import OpenAIEmbeddings

# Create embeddings and vector store
embeddings = OpenAIEmbeddings()
vectorstore = FAISS.from_texts(
    ["placeholder"],
    embeddings
)

# Create retriever
retriever = vectorstore.as_retriever(search_kwargs={"k": 3})

# Create vector memory
vector_memory = VectorStoreRetrieverMemory(
    retriever=retriever,
    memory_key="history",
    input_key="input"
)

# Add memories
memories = [
    {"input": "I love machine learning and deep learning", "output": "That's great!"},
    {"input": "I'm interested in NLP and transformers", "output": "Transformers are powerful!"},
    {"input": "I enjoy computer vision tasks", "output": "CV is fascinating!"},
    {"input": "I prefer Python for all my projects", "output": "Python is excellent!"},
    {"input": "I work as a data scientist", "output": "Interesting career!"}
]

for mem in memories:
    vector_memory.save_context(mem, {"output": mem["output"]})

# Search
queries = [
    "What programming language does the user like?",
    "What AI topics is the user interested in?"
]

for query in queries:
    print(f"\\nQuery: {query}")
    relevant = vector_memory.load_memory_variables({"input": query})
    print("Relevant memories:")
    print(relevant['history'])
    print("="*50)
```
</details>

---

### Exercise 4: Persistent Chat History
Create a chatbot that saves conversation history to a file and can reload it later.

<details>
<summary><b>Solution</b></summary>

```python
import json
from langchain.schema import messages_from_dict, messages_to_dict
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationChain

def save_conversation(memory, filename="chat_history.json"):
    """Save conversation to file"""
    messages = memory.chat_memory.messages
    messages_dict = messages_to_dict(messages)
    
    with open(filename, "w") as f:
        json.dump(messages_dict, f, indent=2)
    print(f"✅ Saved to {filename}")

def load_conversation(filename="chat_history.json"):
    """Load conversation from file"""
    with open(filename, "r") as f:
        messages_dict = json.load(f)
    
    messages = messages_from_dict(messages_dict)
    
    memory = ConversationBufferMemory(return_messages=True)
    memory.chat_memory.messages = messages
    print(f"✅ Loaded from {filename}")
    return memory

# Session 1: Chat and save
print("=== Session 1 ===")
memory1 = ConversationBufferMemory(return_messages=True)
chat1 = ConversationChain(llm=llm, memory=memory1)

chat1.predict(input="My name is Bob")
chat1.predict(input="I work as a software engineer")

save_conversation(memory1)

# Session 2: Load and continue
print("\\n=== Session 2 (Later) ===")
memory2 = load_conversation()
chat2 = ConversationChain(llm=llm, memory=memory2)

# Should remember from previous session
response = chat2.predict(input="What's my name and job?")
print(f"Response: {response}")
```
</details>

---

### Exercise 5: Build a Session-Based Chatbot
Create a chatbot that handles multiple users with separate memory per session.

<details>
<summary><b>Solution</b></summary>

```python
from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain_core.chat_history import BaseChatMessageHistory, InMemoryChatMessageHistory
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.runnables import RunnablePassthrough

# Session store
sessions = {}

def get_session_history(session_id: str) -> BaseChatMessageHistory:
    if session_id not in sessions:
        sessions[session_id] = InMemoryChatMessageHistory()
    return sessions[session_id]

# Create prompt
prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a helpful assistant. Remember user preferences."),
    MessagesPlaceholder(variable_name="history"),
    ("human", "{input}")
])

# Create chain
chain = prompt | llm | StrOutputParser()

# Wrap with history
chain_with_history = RunnableWithMessageHistory(
    chain,
    get_session_history,
    input_messages_key="input",
    history_messages_key="history"
)

# User 1
print("=== User 1 (Alice) ===")
config1 = {"configurable": {"session_id": "user_alice"}}

print(chain_with_history.invoke(
    {"input": "My name is Alice and I love Python"},
    config=config1
))

print(chain_with_history.invoke(
    {"input": "What's my favorite language?"},
    config=config1
))

# User 2
print("\\n=== User 2 (Bob) ===")
config2 = {"configurable": {"session_id": "user_bob"}}

print(chain_with_history.invoke(
    {"input": "My name is Bob and I love JavaScript"},
    config=config2
))

print(chain_with_history.invoke(
    {"input": "What's my favorite language?"},
    config=config2
))

# Back to User 1
print("\\n=== Back to User 1 ===")
print(chain_with_history.invoke(
    {"input": "And what's MY favorite language?"},
    config=config1
))
```
</details>

---

## Challenge Projects

### Challenge 1: Multi-Memory Agent
Build an agent that uses:
- Buffer memory for recent conversation
- Entity memory for tracking people/places
- Vector memory for semantic search of past conversations

### Challenge 2: Memory Optimization
Given a 1000-message conversation:
1. Compare costs for different memory strategies
2. Find the optimal configuration for < $0.10 per query
3. Ensure no important context is lost

### Challenge 3: Cross-Session Knowledge Base
Build a system where:
- Each user has their own conversation memory
- All users share a common knowledge base
- The agent can distinguish between "what you told me" vs "what I know generally"

---

## Tips for Success

1. **Start Simple** - Get basic version working first
2. **Test Thoroughly** - Use diverse inputs
3. **Monitor Costs** - Always use `get_openai_callback()`
4. **Handle Errors** - Add try-except blocks
5. **Version Control** - Commit working versions
6. **Document** - Add comments explaining your choices

---

## Next Steps

After completing these exercises:
1. ✅ Review solutions
2. ✅ Build variations of each example
3. ✅ Combine concepts (e.g., chains + memory)
4. ✅ Share your implementations
5. ✅ Move to AG04 - Tools and Function Calling

---

**Need Help?**
- Review lesson notebooks
- Check LangChain documentation
- Ask in Discord/Reddit
- Open GitHub issue

**Ready for more?** → Continue to AG04!

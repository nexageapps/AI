# Intermediate Sector 2026 Expansion Plan

## Overview

Expanding Intermediate from 15 to 22 lessons by adding:
- **Diffusion Models** (I07b-I07d): 3 lessons on modern image generation
- **RAG Infrastructure** (I16-I18): 3 lessons on vector databases and retrieval systems
- **Organization**: Subfolder structure for better navigation

**Aligned with:** Stanford CS231n (Computer Vision), CS236 (Deep Generative Models), CS224V (RAG Infrastructure)

---

## New Lessons Breakdown

### Diffusion Models Section (I07b-I07d) [NEW]

Located in: `02-Intermediate/Generative-Models/`

**I07b - Diffusion Models and Image Generation**
- **Theory:**
  - Forward diffusion process (adding noise)
  - Reverse diffusion process (denoising)
  - DDPM (Denoising Diffusion Probabilistic Models)
  - DDIM (Denoising Diffusion Implicit Models)
  - Variance schedules (linear, cosine)
  - U-Net denoising architecture
- **Implementation:**
  - Build DDPM from scratch (PyTorch)
  - Train on MNIST/Fashion-MNIST
  - Sampling algorithms
  - Visualize diffusion process
- **Hands-on:**
  - Generate images with trained model
  - Experiment with noise schedules
  - Compare DDPM vs DDIM sampling speed
- **Production:**
  - Efficient sampling (50 steps → 10 steps)
  - Memory optimization
  - Batch generation
- **Stanford Level:** CS236 (Deep Generative Models)
- **Prerequisites:** I07 (VAEs), B09 (CNNs)
- **Builds To:** I07c (Stable Diffusion), A06b (Video diffusion)

**I07c - Latent Diffusion and Stable Diffusion**
- **Theory:**
  - Latent space diffusion
  - VAE encoder/decoder
  - Cross-attention conditioning
  - CLIP text encoder
  - Classifier-free guidance
  - Negative prompts
- **Implementation:**
  - Use Hugging Face Diffusers
  - Stable Diffusion architecture walkthrough
  - Text-to-image pipeline
  - Image-to-image pipeline
  - Inpainting
- **Hands-on:**
  - Generate images from prompts
  - Image editing with inpainting
  - Style transfer
  - ControlNet for precise control
- **Production:**
  - Prompt engineering for SD
  - Guidance scale tuning
  - Aspect ratio handling
  - xFormers memory optimization
- **Applications:**
  - Product photography
  - Marketing materials
  - Concept art generation
- **Stanford Level:** CS236 + CS231n
- **Prerequisites:** I07b (Diffusion basics)
- **Builds To:** A06b (Video diffusion), APP16-18 (Diffusion apps)

**I07d - Image Generation with DALL-E and FLUX**
- **Theory:**
  - OpenAI DALL-E architecture
  - FLUX model architecture
  - Diffusion Transformers (DiT)
  - Text conditioning techniques
  - Quality vs speed tradeoffs
- **Implementation:**
  - OpenAI API integration
  - FLUX model usage
  - Prompt optimization
  - Image variations
  - Outpainting
- **Hands-on:**
  - Build image generation app
  - Compare DALL-E vs Stable Diffusion vs FLUX
  - Quality evaluation
  - Cost analysis
- **Production:**
  - API rate limiting
  - Cost optimization
  - Caching strategies
  - Fallback mechanisms
- **Model Comparison:**
  - DALL-E 3: Best text rendering, safety
  - Stable Diffusion: Open-source, customizable
  - FLUX: Speed, realism
  - Midjourney: Artistic quality (API via Discord)
- **Stanford Level:** CS236 + Industry practice
- **Prerequisites:** I07b-I07c
- **Builds To:** APP16-18 (Production image apps)

---

### RAG Infrastructure Section (I16-I18) [NEW]

Located in: `02-Intermediate/RAG-Infrastructure/`

**I16 - Vector Databases (Pinecone, Weaviate, Chroma)**
- **Theory:**
  - Vector similarity search
  - Approximate Nearest Neighbors (ANN)
  - HNSW indexing (Hierarchical Navigable Small World)
  - IVF indexing (Inverted File Index)
  - Product quantization
  - Metadata filtering
- **Vector Databases:**
  - **Pinecone**: Managed, serverless, easy setup
  - **Weaviate**: Open-source, GraphQL API, hybrid search
  - **Chroma**: Local-first, Python-native, simple
  - **Qdrant**: Rust-based, performance, on-prem
  - **pgvector**: PostgreSQL extension, familiar
- **Implementation:**
  - Setup each database
  - Index embeddings
  - Similarity search
  - Metadata filtering
  - Hybrid search (keyword + vector)
- **Hands-on:**
  - Build search engine for Wikipedia
  - Compare performance (latency, recall@k)
  - Cost analysis
- **Production:**
  - Indexing strategies
  - Sharding and replication
  - Backup and recovery
  - Monitoring
- **Decision Matrix:**
  ```
  Pinecone: Zero-ops, scales automatically, $$
  Weaviate: Flexible, GraphQL, self-host
  Chroma: Local dev, simple, free
  Qdrant: Performance-critical, on-prem
  pgvector: Existing PostgreSQL users
  ```
- **Stanford Level:** CS224V infrastructure
- **Prerequisites:** B11 (Transformers), I09 (BERT embeddings)
- **Builds To:** I17-I18 (RAG systems), AG07-09 (RAG agents)

**I17 - Embeddings and Semantic Search**
- **Theory:**
  - Embedding models (Sentence Transformers)
  - Dense retrieval vs keyword search
  - Bi-encoders vs cross-encoders
  - Embedding dimensions (384, 768, 1536)
  - Cosine similarity vs dot product
  - Semantic chunking
- **Models:**
  - OpenAI text-embedding-3-small/large
  - sentence-transformers/all-MiniLM-L6-v2
  - BAAI/bge-large-en-v1.5
  - Cohere embed-v3
  - Voyage AI embeddings
- **Implementation:**
  - Generate embeddings
  - Build semantic search
  - Reranking with cross-encoders
  - Hybrid search (BM25 + vector)
- **Hands-on:**
  - Semantic search for research papers
  - Compare embedding models
  - Reranking evaluation
- **Production:**
  - Batch embedding generation
  - Embedding caching
  - Model selection criteria
  - Cost optimization
- **Evaluation:**
  - Recall@k metrics
  - MRR (Mean Reciprocal Rank)
  - NDCG (Normalized Discounted Cumulative Gain)
- **Stanford Level:** CS224n (embeddings) + CS224V (retrieval)
- **Prerequisites:** I16 (Vector databases)
- **Builds To:** I18 (Complete RAG), AG07 (RAG agents)

**I18 - Building Your First RAG System**
- **Theory:**
  - RAG architecture (indexing + retrieval + generation)
  - Document loading and preprocessing
  - Chunking strategies (fixed, recursive, semantic)
  - Retrieval methods (similarity, MMR, compression)
  - Context stuffing vs refinement
  - Citation generation
- **Implementation:**
  - End-to-end RAG pipeline
  - LangChain integration
  - LlamaIndex comparison
  - Document loaders (PDF, web, markdown, docx)
  - Text splitters
  - Vector store
  - Retrieval QA chain
- **Hands-on:**
  - Build documentation Q&A system
  - Ingest company docs
  - Query with natural language
  - Generate answers with citations
- **Production:**
  - Chunk size optimization (200, 500, 1000 tokens)
  - Overlap tuning
  - Metadata extraction
  - Error handling
  - Response validation
- **Evaluation:**
  - Answer relevance
  - Context precision
  - Context recall
  - Faithfulness (no hallucination)
  - RAGAs framework
- **Common Issues:**
  - Lost in the middle problem
  - Hallucination management
  - Chunk size vs context window
  - Cost vs quality tradeoff
- **Stanford Level:** CS224V RAG foundations
- **Prerequisites:** I16-I17 (Vector DBs + embeddings)
- **Builds To:** A03 (Advanced RAG), AG07-09 (RAG agents)

---

## Existing Lessons (I01-I15)

### Organized Structure

**02-Intermediate/**
├── **Optimization/** (I01-I03)
│   ├── I01 - Advanced Optimization Algorithms.ipynb
│   ├── I02 - Regularization Techniques.ipynb
│   └── I03 - Batch and Layer Normalization.ipynb
│
├── **Computer-Vision/** (I04-I06)
│   ├── I04 - Advanced CNN Architectures.ipynb
│   ├── I04a - Pretrained Foundation Models in CV.ipynb
│   ├── I05 - Transfer Learning and Fine-tuning.ipynb
│   └── I06 - Object Detection and Segmentation.ipynb
│
├── **Generative-Models/** (I07-I07d) [EXPANDED]
│   ├── I07 - Generative Models (GANs, VAEs).ipynb
│   ├── I07b - Diffusion Models and Image Generation.ipynb [NEW]
│   ├── I07c - Latent Diffusion and Stable Diffusion.ipynb [NEW]
│   └── I07d - Image Generation with DALL-E and FLUX.ipynb [NEW]
│
├── **NLP/** (I08-I11)
│   ├── I08 - Sequence-to-Sequence Models.ipynb
│   ├── I09 - BERT and Transformer Models.ipynb
│   ├── I10 - Named Entity Recognition.ipynb
│   └── I11 - Sentiment Analysis and Text Classification.ipynb
│
├── **Production-ML/** (I12-I15)
│   ├── I12 - Hyperparameter Tuning and AutoML.ipynb
│   ├── I13 - Multi-Task and Meta-Learning.ipynb
│   ├── I14 - Model Compression and Quantization.ipynb
│   └── I15 - MLOps Fundamentals.ipynb
│
└── **RAG-Infrastructure/** (I16-I18) [NEW]
    ├── I16 - Vector Databases.ipynb [NEW]
    ├── I17 - Embeddings and Semantic Search.ipynb [NEW]
    └── I18 - Building Your First RAG System.ipynb [NEW]

---

## Implementation Priority

### Phase 1: RAG Infrastructure (Weeks 1-2)
**Why first:** Enables all agent work, immediate practical value

1. **I16** - Vector Databases
   - Practical setup guides
   - Comparison table
   - Simple examples

2. **I17** - Embeddings
   - Model comparison
   - Semantic search implementation
   - Reranking

3. **I18** - RAG System
   - Complete pipeline
   - LangChain integration
   - Evaluation

### Phase 2: Diffusion Models (Weeks 3-5)
**Why second:** Popular topic, creative applications

4. **I07b** - Diffusion Basics
   - Theory from scratch
   - DDPM implementation
   - Visual walkthrough

5. **I07c** - Stable Diffusion
   - Practical usage
   - Prompt engineering
   - ControlNet

6. **I07d** - DALL-E and FLUX
   - API integration
   - Model comparison
   - Cost analysis

---

## Content Standards

### Each Lesson Includes:

1. **Theoretical Foundation**
   - Mathematical formulation
   - Algorithmic explanation
   - Visual diagrams
   - Research paper citations

2. **Implementation**
   - Complete working code
   - Step-by-step walkthrough
   - Error handling
   - Best practices

3. **Hands-On Exercises**
   - Guided tutorials
   - Challenge problems
   - Real datasets
   - Expected outputs

4. **Production Considerations**
   - Performance optimization
   - Cost analysis
   - Scaling strategies
   - Monitoring

5. **Stanford-Level Rigor**
   - CS236/CS224V alignment
   - Research connections
   - Industry practices
   - Proper citations

---

## Dependencies

### External Libraries

```python
# Diffusion Models
diffusers>=0.25.0
transformers>=4.36.0
accelerate>=0.25.0
xformers>=0.0.23  # Optional, for memory optimization

# Vector Databases
pinecone-client>=3.0.0
chromadb>=0.4.0
weaviate-client>=4.4.0
qdrant-client>=1.7.0
pgvector>=0.2.0  # If using PostgreSQL

# Embeddings
sentence-transformers>=2.2.0
openai>=1.0.0
cohere>=4.0.0

# RAG
langchain>=0.1.0
llama-index>=0.9.0
ragas>=0.0.20  # For evaluation

# Utils
pillow>=10.0.0
matplotlib>=3.7.0
numpy>=1.24.0
```

### Prerequisites

**For Diffusion Models:**
- I07 (GANs, VAEs) - understanding generative models
- B09 (CNNs) - understanding convolutions
- Comfort with PyTorch

**For RAG Infrastructure:**
- B11 (Transformers) - understanding attention
- I09 (BERT) - understanding embeddings
- Python async/await (for some databases)

---

## Success Metrics

After completing Intermediate, learners can:

1. ✅ Generate images using diffusion models
2. ✅ Fine-tune Stable Diffusion for specific styles
3. ✅ Set up and use vector databases
4. ✅ Build semantic search engines
5. ✅ Create complete RAG systems
6. ✅ Evaluate retrieval quality
7. ✅ Compare DALL-E vs Stable Diffusion vs FLUX
8. ✅ Optimize RAG for production

---

## Evaluation Approach

### Diffusion Models Assessment
- Generate images from prompts (quality eval)
- Implement DDPM sampling
- Compare model architectures
- Cost-benefit analysis assignment

### RAG Infrastructure Assessment
- Build working vector search
- Implement complete RAG pipeline
- Evaluation with RAGAs metrics
- Database selection justification

---

## Real-World Applications

### Diffusion Models
- Marketing: Product image generation
- Gaming: Asset creation
- Fashion: Design prototyping
- Architecture: Concept visualization
- Content: Social media graphics

### RAG Systems
- Customer Support: Knowledge base Q&A
- Enterprise: Internal documentation search
- Legal: Case law research
- Healthcare: Medical literature search
- Education: Intelligent tutoring systems

---

## Timeline

**Total Time:** 5 weeks for new content

- Week 1: I16 (Vector databases)
- Week 2: I17-I18 (Embeddings + RAG)
- Week 3: I07b (Diffusion theory)
- Week 4: I07c (Stable Diffusion)
- Week 5: I07d (DALL-E, FLUX)

**Learning Time (Students):**
- RAG Infrastructure: 2-3 weeks
- Diffusion Models: 2-3 weeks
- Total: 4-6 weeks additional

---

## Next Steps

1. Create I16 notebook (Vector Databases)
2. Create I17 notebook (Embeddings)
3. Create I18 notebook (RAG System)
4. Create I07b notebook (Diffusion basics)
5. Create I07c notebook (Stable Diffusion)
6. Create I07d notebook (DALL-E/FLUX)
7. Test all code examples
8. Create exercise solutions
9. Record video walkthroughs (optional)
10. Peer review for CS236/CS224V alignment

---

**Document Version:** 1.0  
**Created:** September 25, 2026  
**Status:** Plan Approved - Ready for Implementation  
**Alignment:** Stanford CS231n, CS236, CS224V

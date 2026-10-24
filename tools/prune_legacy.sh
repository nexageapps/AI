#!/usr/bin/env bash
# Removes stub / superseded files from the pre-restructure repo. Everything is recoverable from git history.
# Review the list, then run from the repo root:  bash tools/prune_legacy.sh
# (Run AFTER the replacement lessons exist, i.e. when `python tools/gen_readmes.py` shows no 'retained' stubs you care about.)
set -euo pipefail
cd "$(git rev-parse --show-toplevel)"

echo "== Old Agents notebooks & status docs (AG04-AG18 were 0-byte files; AG01-AG03 were LangChain-0.1-era and are replaced) =="
# NOTE: the old 0-byte 'AG11 - Multi-Agent Systems.ipynb' has the same name as the new lesson, so it is overwritten, not deleted.
git rm -q --ignore-unmatch \
  "Agents/AG01 - Introduction to AI Agents.ipynb" "Agents/AG02 - LangChain Basics.ipynb" "Agents/AG03 - Memory Systems.ipynb" \
  "Agents/AG04 - Tools and Function Calling.ipynb" "Agents/AG05 - Building Your First Agent.ipynb" "Agents/AG06 - RAG Agents.ipynb" \
  "Agents/AG07 - Agent Evaluation and Testing.ipynb" "Agents/AG08 - Introduction to LangGraph.ipynb" "Agents/AG09 - Multi-Step Agent Workflows.ipynb" \
  "Agents/AG10 - Human-in-the-Loop Patterns.ipynb" \
  "Agents/AG12 - Code Generation and Analysis Agents.ipynb" "Agents/AG13 - Data Analysis and Visualization Agents.ipynb" \
  "Agents/AG14 - Research and Content Creation Agents.ipynb" "Agents/AG15 - Agent APIs and Backends.ipynb" "Agents/AG16 - Agent UIs and Frontends.ipynb" \
  "Agents/AG17 - Monitoring and Production.ipynb" "Agents/AG18 - Capstone Agent Projects.ipynb" \
  Agents/UPDATE_SUMMARY.md Agents/AGENTS_SETUP_COMPLETE.md Agents/ROADMAP.md Agents/EXERCISES.md Agents/GETTING_STARTED.md

echo "== Old Advanced stubs A01-A15 (5 KB templates) =="
git rm -q --ignore-unmatch \
  "Advanced/A01 - Fine-tuning Large Language Models.ipynb" "Advanced/A02 - Prompt Engineering and In-Context Learning.ipynb" \
  "Advanced/A03 - Retrieval-Augmented Generation (RAG).ipynb" "Advanced/A04 - Vision-Language Models.ipynb" \
  "Advanced/A05 - Audio and Speech Processing.ipynb" "Advanced/A06 - Multi-Modal Fusion and Integration.ipynb" \
  "Advanced/A07 - Distributed Training Strategies.ipynb" "Advanced/A08 - Mixed Precision and Optimization.ipynb" \
  "Advanced/A09 - Model Serving and Inference Optimization.ipynb" "Advanced/A10 - ML Pipeline Architecture.ipynb" \
  "Advanced/A11 - Containerization and Deployment.ipynb" "Advanced/A12 - Monitoring and Observability.ipynb" \
  "Advanced/A13 - CI-CD for Machine Learning.ipynb" "Advanced/A14 - Responsible AI and Governance.ipynb" \
  "Advanced/A15 - Production Case Studies and Capstone.ipynb"

echo "== Old Intermediate stubs (3-4 KB) =="
git rm -q --ignore-unmatch \
  "Intermediate/I08 - Encoder-Decoder and Seq2Seq Models.ipynb" "Intermediate/I10 - Hyperparameter Tuning and AutoML.ipynb" \
  "Intermediate/I11 - Model Compression and Optimization.ipynb" "Intermediate/I12 - Generative Models.ipynb" \
  "Intermediate/I13 - Multi-Task and Meta-Learning.ipynb" "Intermediate/I14 - Explainable AI and Interpretability.ipynb" \
  "Intermediate/I15 - MLOps and Production Deployment.ipynb"

echo "== Old Expert stubs (0-code outlines) =="
git rm -q --ignore-unmatch Expert/E0[1-7]\ -*.ipynb Expert/E09\ -*.ipynb Expert/E1[0-5]\ -*.ipynb

echo "== Placeholder / status-report docs =="
git rm -rq --ignore-unmatch documentation/stanford-alignment documentation/learning-paths documentation/frameworks documentation/planning \
  documentation/updates documentation/archive documentation/README_RESTRUCTURING_COMPLETE.md documentation/README_REFACTORING_SUMMARY.md \
  documentation/UPDATES_SUMMARY.md documentation/ADVANCED_LESSONS_COMPLETE.md documentation/LEARNING_PATH_DIAGRAM.md application/UOA_THEME_UPDATE_COMPLETE.md \
  Applied/docs/langchain-vs-llamaindex.md Applied/GETTING_STARTED.md

echo "Done. Review with: git status --short | head -80   (undo any of it with: git restore --staged --worktree <path>)"
python3 tools/gen_readmes.py >/dev/null && echo "READMEs regenerated."

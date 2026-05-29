import json

cells = []

# Cell 1: Title and Learning Objectives
cells.append({
    'cell_type': 'markdown',
    'metadata': {},
    'source': [
        '# E08 - Continual and Lifelong Learning\n',
        '\n',
        '[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/)\n',
        '\n',
        '**Build systems that learn continuously without forgetting**\n',
        '\n',
        '**MAI Alignment:** COMPSCI 713 (Continual Learning Lecture) | **Next Level:** [E09 - Self-Supervised and Contrastive Learning](./E09%20-%20Self-Supervised%20and%20Contrastive%20Learning.ipynb)\n',
        '\n',
        '---\n',
        '\n',
        '## Learning Objectives\n',
        '\n',
        '1. Explain the principles and challenges of continual learning (CL)\n',
        '2. Identify and explain the characteristics of Replay-based, Regularisation-based and Architecture-based CL techniques\n',
        '3. Give examples of Replay-based, Regularisation-based and Architecture-based CL techniques\n',
        '4. Implement Elastic Weight Consolidation (EWC)\n',
        '5. Build a replay-based continual learning system\n',
        '6. Evaluate continual learning performance\n',
        '\n',
        '**Duration:** 5-6 hours  \n',
        '**Prerequisites:** E01-E07\n',
        '\n',
        '---'
    ]
})

# Cell 2: Progress Tracker
cells.append({
    'cell_type': 'markdown',
    'metadata': {},
    'source': [
        '---\n',
        '\n',
        '## Learning Progress Tracker\n',
        '\n',
        '### Completion Status\n',
        '- [ ] Lesson completed\n',
        '- [ ] All code cells executed successfully\n',
        '- [ ] Understood all key concepts\n',
        '- [ ] Completed practice exercises\n',
        '\n',
        '### Key Concepts to Remember (E08)\n',
        '- [ ] Catastrophic forgetting & stability-plasticity dilemma\n',
        '- [ ] CL settings (class-incremental, domain-incremental, task-incremental)\n',
        '- [ ] Replay-based methods (iCaRL, GEM)\n',
        '- [ ] Regularisation-based methods (LwF, EWC)\n',
        '- [ ] Architecture-based methods (PackNet, PNN)\n',
        '\n',
        '---'
    ]
})

# Cell 3: Overview & Definitions
cells.append({
    'cell_type': 'markdown',
    'metadata': {},
    'source': [
        '## 1. Overview & Definitions\n',
        '\n',
        '### What is Continual Learning?\n',
        '\n',
        '**Continual Learning** (a.k.a. *Lifelong Learning*, *Incremental Learning*) is the ability of a model to learn from a stream of data with **changing data distribution**, with the goal of **transferring knowledge between tasks**.\n',
        '\n',
        '**Core Idea:** An incremental learner learns continuously from a sequence of tasks, without accessing all data at once, while aiming to:\n',
        '- **Acquire new knowledge**\n',
        '- **Retain previously learned knowledge** (avoid forgetting)\n',
        '\n',
        '> **Reference:** Tercan, H., Deibert, P., & Meisen, T. (2022). Continual learning of neural networks for quality prediction in production using memory aware synapses and weight transfer. *Journal of Intelligent Manufacturing*, 33(1), 283-292.\n',
        '\n',
        '### Knowledge Transfer in CL\n',
        '\n',
        '- **Forward transfer:** Knowledge learnt during one task affects learning of *future* tasks\n',
        '  - Positive forward transfer = learning task A helps learn task B faster\n',
        '- **Backward transfer:** Knowledge learnt during one task affects performance on *previous* tasks\n',
        '  - **Catastrophic Forgetting** is *negative* backward transfer\n',
        '  - Positive backward transfer = learning task B improves performance on task A\n',
        '\n',
        '### The Stability-Plasticity Dilemma\n',
        '\n',
        'CL is fundamentally about balancing two competing objectives:\n',
        '\n',
        '| Property | Definition | Risk if too much |\n',
        '|----------|-----------|------------------|\n',
        '| **Plasticity** | Ability to adapt and integrate new information | Rapidly forgets previous tasks |\n',
        '| **Stability** | Ability to preserve existing representations | Fails to learn new tasks |\n',
        '\n',
        '---'
    ]
})

# Cell 4: Catastrophic Forgetting
cells.append({
    'cell_type': 'markdown',
    'metadata': {},
    'source': [
        '## 2. Catastrophic Forgetting\n',
        '\n',
        '### The Formal Problem\n',
        '\n',
        'We aim to minimise the expected loss over **all tasks seen so far**:\n',
        '\n',
        '$$\\sum_{t=1}^{\\mathcal{T}} \\mathbb{E}_{(x^t, y^t) \\sim \\mathcal{D}^t} [\\mathcal{L}(f(x^t; \\theta), y^t)]$$\n',
        '\n',
        'In practice, we only have access to data from the **current task** $\\mathcal{T}$:\n',
        '\n',
        '$$\\frac{1}{N_{\\mathcal{T}}} \\sum_{i=1}^{N_{\\mathcal{T}}} \\ell(f(x_i^{\\mathcal{T}}; \\theta), y_i^{\\mathcal{T}})$$\n',
        '\n',
        '**When optimising for the current task, we will deteriorate performance on old tasks!**\n',
        '\n',
        '### Where Can Shift Happen?\n',
        '\n',
        'Data arrives in multiple stages (tasks). Each task may introduce new:\n',
        '\n',
        '- **Class shift:** The set of labels or their frequencies change over time  \n',
        '  *E.g., image classifier trained on cats/dogs later encounters rabbits*\n',
        '\n',
        '- **Domain shift:** The input representation changes, even if task and labels remain the same  \n',
        '  *E.g., model trained on sunny photos used on night-time or indoor photos*\n',
        '\n',
        '- **Task shift:** The objective or prediction target changes, even if domain remains unchanged  \n',
        '  *E.g., model trained to classify dog/cat later required to count dogs*\n',
        '\n',
        '---'
    ]
})

# Cell 5: Settings of CL
cells.append({
    'cell_type': 'markdown',
    'metadata': {},
    'source': [
        '## 3. Settings of Continual Learning\n',
        '\n',
        '### Class-Incremental Learning (CIL)\n',
        '- Model is presented with **new classes** over time\n',
        '- Must eventually distinguish between **all classes seen so far**\n',
        '- *E.g., medical image classification where new pathologies are discovered*\n',
        '\n',
        '### Domain-Incremental Learning (DIL)\n',
        '- Task remains unchanged, but the **input domain changes** over time\n',
        '- Model must be robust to these changes **without explicit cues** (Task-ID not available at test time)\n',
        '- *E.g., classify objects in new environments like car detection across daylight, rain, or snowstorm conditions*\n',
        '\n',
        '### Task-Incremental Learning (TIL)\n',
        '- Model exposed to a **sequence of distinct tasks**, learned one at a time\n',
        '- Task identity is known at test time (multi-head architecture)\n',
        '- *E.g., robotics where a robot must learn a new function*\n',
        '\n',
        '| Setting | New Classes? | Domain Changes? | Task-ID at Test? | Difficulty |\n',
        '|---------|:---:|:---:|:---:|:---:|\n',
        '| Class-Incremental | Yes | No | No | Hardest |\n',
        '| Domain-Incremental | No | Yes | No | Medium |\n',
        '| Task-Incremental | Varies | Varies | Yes | Easiest |\n',
        '\n',
        '---'
    ]
})

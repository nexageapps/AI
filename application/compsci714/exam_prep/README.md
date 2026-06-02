# COMPSCI 714 — Exam Preparation

Based on past papers: **Semester 1 2024** and **Semester 1 2025**.

---

## How to Use

Each notebook (`EP0X_...`) covers one exam topic with:
- The exact exam question and model answer
- Working code that demonstrates the concept
- Visualisations to build intuition
- A quick-reference summary at the end

---

## Notebook Index

| Notebook | Topic | Exam Questions | Marks |
|---|---|---|---|
| [EP01](EP01_MLP_Debugging_and_Training.ipynb) | MLP Debugging & Training | 2025 Q1, 2024 Q3 | 8 + 9 |
| [EP02](EP02_Evaluation_Metrics_Imbalanced_Data.ipynb) | Evaluation Metrics & Imbalanced Data | 2025 Q2, 2024 Q1 | 9 + 8 |
| [EP03](EP03_CNN_Shape_Calculations.ipynb) | CNN Shape Calculations | 2025 Q4 | 6 |
| [EP04](EP04_RNN_vs_Transformer.ipynb) | RNN vs Transformer | 2025 Q3 | 4 |
| [EP05](EP05_Transfer_Learning_BERT_GPT.ipynb) | Transfer Learning, BERT & GPT | 2025 Q5+Q6, 2024 Q5 | 7.5+15 / 18 |
| [EP06](EP06_GANs_Diffusion_Models.ipynb) | GANs & Diffusion Models | 2025 Q7.1, 2024 Q6 | 9 + 19 |
| [EP07](EP07_LLM_Sampling_Strategies.ipynb) | LLM Sampling: Top-k, Top-p, Temperature | 2025 Q7.2, 2024 Q6.3 | 10 + 6 |
| [EP08](EP08_Multimodal_AI_CLIP_BLIP.ipynb) | Multimodal AI: CLIP, BLIP, Fusion | 2025 Q8, 2024 Q7 | 11.5 + 16 |

---

## Topic Priority (by total marks across both years)

1. **Transfer Learning + BERT/GPT** — 40.5 marks total
2. **Multimodal AI (CLIP/BLIP)** — 27.5 marks total
3. **Generative AI (GANs/Diffusion)** — 28 marks total
4. **LLM Sampling** — 16 marks total
5. **MLP Debugging** — 17 marks total
6. **Evaluation Metrics** — 17 marks total
7. **CNN Shapes** — 6 marks total
8. **RNN vs Transformer** — 4 marks total

---

## Key Formulas to Know Cold

**CNN output size:**
```
output = floor((input - kernel + 2*padding) / stride) + 1
Valid padding = 0, Same padding = kernel // 2
FC inputs = H × W × channels
```

**Top-p sampling:** Sort descending, accumulate until sum ≥ p  
**Top-k sampling:** Take the k highest probability tokens

**Metrics from confusion matrix:**
```
Accuracy  = (TP+TN) / total
Precision = TP / (TP+FP)
Recall    = TP / (TP+FN)
F1        = 2 * Precision * Recall / (Precision + Recall)
```

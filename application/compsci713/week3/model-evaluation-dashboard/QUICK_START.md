# Model Evaluation Dashboard

**COMPSCI 713 Week 3 | Basic Lesson 7**

## Run

```bash
cd application/compsci713/week3/model-evaluation-dashboard
pip install -r requirements.txt
streamlit run app.py
```

## Features

1. **Your Data** — View and edit the dataset directly
2. **Decision Threshold** — Slide to see how predictions change
3. **Confusion Matrix** — TP, TN, FP, FN with cost explanations
4. **Performance Metrics** — Accuracy, Precision, Recall, F1 with formulas
5. **ROC Curve & AUC** — Threshold-independent performance
6. **Exam Reference** — Quick lookup table for exams
7. **Precision-Recall Curve** — Better for imbalanced data than ROC
8. **Threshold Optimizer** — Find the best threshold for each metric
9. **Cross-Validation Simulator** — K-Fold CV with per-fold breakdown

## Scenarios

- **Cancer Detection** → Optimise Recall (don't miss cancer)
- **Fraud Detection** → Optimise F1 (balance both errors)
- **Spam Filter** → Optimise Precision (don't block good email)

Upload your own CSV/Excel with `Actual` and `Model Score` columns.

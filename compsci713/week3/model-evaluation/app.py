"""
Model Evaluation Dashboard
UoA - COMPSCI 713 Week 3 | Basic Lesson 7

Interactive companion to B07 - Model Evaluation and Performance Metrics.
Covers: Accuracy Trap, Confusion Matrix, Classification Metrics,
ROC/PR Curves, Threshold Tuning, Cross-Validation, and Imbalanced Data.
"""

import streamlit as st
import pandas as pd
import numpy as np
from sklearn.metrics import (
    confusion_matrix, accuracy_score, precision_score,
    recall_score, f1_score, roc_curve, roc_auc_score,
    precision_recall_curve, average_precision_score,
)
from sklearn.model_selection import StratifiedKFold
import plotly.graph_objects as go
from io import BytesIO

# ── Page config ──
st.set_page_config(
    page_title="Model Evaluation | UoA COMPSCI 713",
    page_icon="U",
    layout="wide",
    initial_sidebar_state="expanded",
)

# ── Theme-aware CSS ──
st.markdown("""
<style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
    html, body, [class*="css"] {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    }
    .main .block-container { padding-top: 1rem; max-width: 1200px; }

    /* Header */
    .uoa-header {
        background: linear-gradient(135deg, #00467F 0%, #0066B3 100%);
        color: #ffffff;
        padding: 1.5rem 2rem;
        border-radius: 10px;
        margin-bottom: 1.5rem;
    }
    .uoa-header h1 { margin: 0; font-size: 1.6rem; font-weight: 700; color: #ffffff; }
    .uoa-header p  { margin: 0.3rem 0 0; opacity: 0.9; font-size: 0.9rem; color: #d0e4f5; }

    /* Step headers */
    .step-header {
        display: flex; align-items: center; gap: 0.6rem;
        margin: 1.5rem 0 0.5rem;
    }
    .step-num {
        background: #00467F; color: #fff;
        width: 32px; height: 32px; border-radius: 50%;
        display: flex; align-items: center; justify-content: center;
        font-weight: 700; font-size: 0.85rem; flex-shrink: 0;
    }
    .step-title { font-size: 1.25rem; font-weight: 600; }
    .step-lesson {
        font-size: 0.75rem; color: #6c9dc6;
        background: rgba(0,70,127,0.12); padding: 2px 8px;
        border-radius: 10px; margin-left: 0.5rem;
    }

    /* Explanation boxes */
    .explain-box {
        background: rgba(0,70,127,0.08);
        border-left: 4px solid #00467F;
        padding: 1rem 1.2rem;
        border-radius: 0 8px 8px 0;
        margin: 0.5rem 0 1rem;
        font-size: 0.9rem;
        line-height: 1.7;
    }
    .explain-box strong { color: #4da6ff; }

    .warn-box {
        background: rgba(243,156,18,0.12);
        border-left: 4px solid #f39c12;
        padding: 1rem 1.2rem;
        border-radius: 0 8px 8px 0;
        margin: 0.5rem 0 1rem;
        font-size: 0.9rem;
        line-height: 1.6;
    }
    .warn-box strong { color: #f5b041; }

    .success-box {
        background: rgba(39,174,96,0.12);
        border-left: 4px solid #27ae60;
        padding: 1rem 1.2rem;
        border-radius: 0 8px 8px 0;
        margin: 0.5rem 0 1rem;
        font-size: 0.9rem;
    }
    .success-box strong { color: #2ecc71; }

    /* Metric cards */
    .metric-card {
        background: rgba(255,255,255,0.05);
        border: 2px solid rgba(255,255,255,0.12);
        border-radius: 10px;
        padding: 1rem;
        text-align: center;
        transition: border-color 0.2s;
    }
    .metric-card.highlight {
        border-color: #4da6ff;
        background: rgba(0,70,127,0.15);
        box-shadow: 0 0 12px rgba(0,70,127,0.2);
    }
    .metric-card h3 {
        margin: 0; font-size: 0.75rem;
        text-transform: uppercase; letter-spacing: 0.5px;
        opacity: 0.6;
    }
    .metric-card .value {
        font-size: 1.8rem; font-weight: 700;
        color: #4da6ff; margin: 0.3rem 0;
    }
    .metric-card.highlight .value { color: #66b3ff; }
    .metric-card .formula {
        font-family: 'SF Mono', 'Fira Code', monospace;
        font-size: 0.72rem; opacity: 0.5;
    }

    /* Confusion matrix legend */
    .cm-legend {
        display: flex; flex-wrap: wrap; gap: 0.5rem;
        margin: 0.5rem 0;
    }
    .cm-legend-item {
        display: flex; align-items: center; gap: 0.4rem;
        font-size: 0.82rem;
    }
    .cm-dot {
        width: 14px; height: 14px; border-radius: 3px;
    }

    /* Sidebar */
    section[data-testid="stSidebar"] h1,
    section[data-testid="stSidebar"] h2 {
        color: #4da6ff; font-size: 1rem;
    }
</style>
""", unsafe_allow_html=True)


# ── Header ──
st.markdown("""
<div class="uoa-header">
    <h1>UoA - Model Evaluation Dashboard</h1>
    <p>COMPSCI 713 Week 3 -- Basic Lesson 7: Model Evaluation and Performance Metrics</p>
</div>
""", unsafe_allow_html=True)


# ── Helper: step header ──
def step_header(num, title, lesson_part=""):
    lesson_tag = f'<span class="step-lesson">{lesson_part}</span>' if lesson_part else ""
    st.markdown(f"""
    <div class="step-header">
        <div class="step-num">{num}</div>
        <span class="step-title">{title}</span>{lesson_tag}
    </div>
    """, unsafe_allow_html=True)


# ── Sidebar ──
with st.sidebar:
    st.markdown("## Scenario")
    scenario = st.radio(
        "Pick a real-world problem:",
        ["Cancer Detection", "Fraud Detection", "Spam Filter"],
        index=0,
        help="Each scenario shows why different metrics matter",
    )
    st.divider()
    st.markdown("## Data Source")
    data_source = st.radio(
        "How to load data:",
        ["Use built-in samples", "Upload CSV / Excel"],
        index=0,
    )
    st.divider()
    st.markdown("## Lesson Map")
    st.caption("""
    Step 1 -- B07 Part 1: Accuracy Trap
    Step 2 -- B07 Part 2: Threshold & Predictions
    Step 3 -- B07 Part 2: Confusion Matrix
    Step 4 -- B07 Part 2: Classification Metrics
    Step 5 -- B07 Part 3: ROC Curve & AUC
    Step 6 -- B07 Part 3: Precision-Recall Curve
    Step 7 -- B07 Part 4: Threshold Optimisation
    Step 8 -- B07 Part 5: Cross-Validation
    Step 9 -- B07 Part 7: Exam Reference
    """)


# ── Built-in sample data generators ──
def make_cancer_data():
    np.random.seed(42)
    n = 200
    labels = np.array([1]*20 + [0]*180)
    np.random.shuffle(labels)
    scores = np.where(
        labels == 1,
        np.clip(np.random.normal(0.72, 0.18, n), 0, 1),
        np.clip(np.random.normal(0.30, 0.20, n), 0, 1),
    )
    df = pd.DataFrame({
        "ID": [f"Patient-{i+1:03d}" for i in range(n)],
        "Age": np.random.randint(25, 80, n),
        "Tumour Size (mm)": np.round(np.where(labels == 1, np.random.normal(28, 10, n), np.random.normal(8, 5, n)).clip(1), 1),
        "Actual": ["Cancer" if l == 1 else "Healthy" for l in labels],
        "Model Score": np.round(scores, 3),
    })
    return df, "Cancer", "Healthy"


def make_fraud_data():
    np.random.seed(42)
    n = 300
    labels = np.array([1]*30 + [0]*270)
    np.random.shuffle(labels)
    scores = np.where(
        labels == 1,
        np.clip(np.random.normal(0.68, 0.20, n), 0, 1),
        np.clip(np.random.normal(0.25, 0.18, n), 0, 1),
    )
    df = pd.DataFrame({
        "ID": [f"TXN-{i+1:04d}" for i in range(n)],
        "Amount ($)": np.round(np.where(labels == 1, np.random.exponential(500, n), np.random.exponential(80, n)), 2),
        "Country": np.random.choice(["NZ", "AU", "US", "UK", "NG", "RU"], n),
        "Actual": ["Fraud" if l == 1 else "Legitimate" for l in labels],
        "Model Score": np.round(scores, 3),
    })
    return df, "Fraud", "Legitimate"


def make_spam_data():
    np.random.seed(42)
    n = 250
    labels = np.array([1]*75 + [0]*175)
    np.random.shuffle(labels)
    scores = np.where(
        labels == 1,
        np.clip(np.random.normal(0.75, 0.15, n), 0, 1),
        np.clip(np.random.normal(0.28, 0.18, n), 0, 1),
    )
    subjects = np.where(
        labels == 1,
        np.random.choice(["WIN FREE iPHONE", "URGENT: Claim prize", "Buy cheap meds", "You won $1M", "Hot singles near you"], n),
        np.random.choice(["Meeting tomorrow", "Project update", "Invoice attached", "Job offer", "Flight confirmation"], n),
    )
    df = pd.DataFrame({
        "ID": [f"Email-{i+1:03d}" for i in range(n)],
        "Subject": subjects,
        "Word Count": np.random.randint(10, 500, n),
        "Actual": ["Spam" if l == 1 else "Important" for l in labels],
        "Model Score": np.round(scores, 3),
    })
    return df, "Spam", "Important"


# ── Load data ──
if data_source == "Use built-in samples":
    if scenario == "Cancer Detection":
        df, pos_label, neg_label = make_cancer_data()
    elif scenario == "Fraud Detection":
        df, pos_label, neg_label = make_fraud_data()
    else:
        df, pos_label, neg_label = make_spam_data()
else:
    uploaded = st.sidebar.file_uploader(
        "Upload your CSV or Excel file",
        type=["csv", "xlsx", "xls"],
        help="Must have columns: 'Actual' (true labels) and 'Model Score' (0-1 probability)",
    )
    if uploaded is not None:
        df = pd.read_csv(uploaded) if uploaded.name.endswith(".csv") else pd.read_excel(uploaded)
        if "Actual" not in df.columns or "Model Score" not in df.columns:
            st.error("File must have 'Actual' and 'Model Score' columns.")
            st.stop()
        unique_labels = df["Actual"].unique()
        if len(unique_labels) != 2:
            st.error("'Actual' column must have exactly 2 unique values.")
            st.stop()
        pos_label = st.sidebar.selectbox("Which is the POSITIVE class?", unique_labels)
        neg_label = [l for l in unique_labels if l != pos_label][0]
    else:
        st.info("Upload a CSV/Excel file or switch to built-in samples to get started.")
        st.stop()


# ── Scenario context ──
scenario_info = {
    "Cancer Detection": {
        "context": f"A hospital screens patients. The model scores each patient 0-1 for cancer likelihood. We have **{len(df)}** patients, **{(df['Actual'] == pos_label).sum()}** actually have cancer.",
        "why": "Missing cancer (False Negative) can be fatal. We prioritise **Recall** -- catch every cancer case, even if it means extra tests for healthy patients.",
        "fn_cost": "Patient goes untreated -- potentially fatal",
        "fp_cost": "Extra tests needed -- acceptable cost",
        "optimal": "Recall",
    },
    "Fraud Detection": {
        "context": f"A bank processes transactions. The model scores each for fraud likelihood. We have **{len(df)}** transactions, **{(df['Actual'] == pos_label).sum()}** are fraudulent.",
        "why": "Both errors are costly: missing fraud loses money, blocking legitimate transactions annoys customers. We use **F1-Score** to balance both.",
        "fn_cost": "Fraud succeeds -- money lost",
        "fp_cost": "Legitimate transaction blocked -- angry customer",
        "optimal": "F1-Score",
    },
    "Spam Filter": {
        "context": f"An email system filters messages. The model scores each email for spam likelihood. We have **{len(df)}** emails, **{(df['Actual'] == pos_label).sum()}** are spam.",
        "why": "Marking an important email as spam (False Positive) is worse than letting spam through. We prioritise **Precision** -- when we say it's spam, we'd better be right.",
        "fn_cost": "Spam in inbox -- minor annoyance",
        "fp_cost": "Important email missed -- serious problem",
        "optimal": "Precision",
    },
}
info = scenario_info[scenario]


# ══════════════════════════════════════════════════
# STEP 1: The Accuracy Trap (B07 Part 1)
# ══════════════════════════════════════════════════
st.markdown("---")
step_header(1, "The Accuracy Trap", "B07 Part 1")

n_pos = (df["Actual"] == pos_label).sum()
n_neg = (df["Actual"] == neg_label).sum()
naive_acc = max(n_pos, n_neg) / len(df)
majority = pos_label if n_pos > n_neg else neg_label

miss_msg = ""
if n_pos < n_neg:
    miss_msg = (
        "<br><br>It would miss <strong>every single "
        + pos_label.lower()
        + " case</strong>. In "
        + scenario.lower()
        + ", that could be catastrophic."
    )

st.markdown(f"""
<div class="warn-box">
    <strong>Why accuracy alone is dangerous:</strong><br>
    Your dataset has <strong>{n_pos}</strong> {pos_label} and <strong>{n_neg}</strong> {neg_label} samples.
    A naive model that <em>always</em> predicts "{majority}" would get
    <strong>{naive_acc:.1%} accuracy</strong> -- without learning anything at all.
    {miss_msg}
</div>
""", unsafe_allow_html=True)

col_trap1, col_trap2 = st.columns([1, 1])
with col_trap1:
    fig_dist = go.Figure(data=[go.Pie(
        labels=[pos_label, neg_label],
        values=[n_pos, n_neg],
        marker=dict(colors=["#e74c3c", "#27ae60"]),
        hole=0.4,
        textinfo="label+percent",
        textfont=dict(size=14, color="white"),
    )])
    fig_dist.update_layout(
        height=250, margin=dict(l=10, r=10, t=10, b=10),
        paper_bgcolor="rgba(0,0,0,0)", plot_bgcolor="rgba(0,0,0,0)",
        font=dict(family="Inter, sans-serif", color="white"),
        showlegend=False,
    )
    st.plotly_chart(fig_dist, use_container_width=True)

with col_trap2:
    st.markdown(f"""
<div class="explain-box">
    <strong>Key lesson from B07:</strong> When classes are imbalanced, accuracy is misleading.
    <br><br>
    A model predicting all "{majority}" gets <strong>{naive_acc:.1%}</strong> accuracy but
    <strong>0% recall</strong> on the minority class.
    <br><br>
    This is why we need <strong>Precision</strong>, <strong>Recall</strong>, <strong>F1-Score</strong>,
    and <strong>ROC-AUC</strong> -- metrics that reveal what accuracy hides.
</div>
""", unsafe_allow_html=True)


# ══════════════════════════════════════════════════
# STEP 2: Data + Threshold (B07 Part 2)
# ══════════════════════════════════════════════════
st.markdown("---")
step_header(2, "Your Data & Decision Threshold", "B07 Part 2")

st.markdown(f"""
<div class="explain-box">
    {info['context']}
    <br><br>
    The <strong>Model Score</strong> is the model's confidence that a sample is <strong>{pos_label}</strong>
    (0 = definitely {neg_label}, 1 = definitely {pos_label}).
    Set a <strong>threshold</strong> below: if score >= threshold, predict {pos_label}.
</div>
""", unsafe_allow_html=True)

threshold = st.slider(
    f"Decision Threshold (score >= threshold -> {pos_label})",
    min_value=0.0, max_value=1.0, value=0.5, step=0.01,
)

# Apply threshold
y_true = (df["Actual"] == pos_label).astype(int).values
y_scores = df["Model Score"].values
y_pred = (y_scores >= threshold).astype(int)

display_df = df.copy()
display_df["Predicted"] = np.where(y_pred == 1, pos_label, neg_label)
display_df["Correct?"] = display_df["Actual"] == display_df["Predicted"]

# Editable data table
edited_df = st.data_editor(
    df,
    use_container_width=True,
    num_rows="dynamic",
    height=300,
    column_config={
        "Model Score": st.column_config.ProgressColumn(
            "Model Score", min_value=0, max_value=1, format="%.3f",
        ),
    },
)
df = edited_df
# Recompute after edit
y_true = (df["Actual"] == pos_label).astype(int).values
y_scores = df["Model Score"].values
y_pred = (y_scores >= threshold).astype(int)
display_df = df.copy()
display_df["Predicted"] = np.where(y_pred == 1, pos_label, neg_label)
display_df["Correct?"] = display_df["Actual"] == display_df["Predicted"]

correct = display_df["Correct?"].sum()
wrong = len(display_df) - correct
st.caption(f"Correct: **{correct}** | Wrong: **{wrong}** | Total: **{len(df)}**")


# ══════════════════════════════════════════════════
# STEP 3: Confusion Matrix (B07 Part 2)
# ══════════════════════════════════════════════════
st.markdown("---")
step_header(3, "Confusion Matrix", "B07 Part 2")

st.markdown(f"""
<div class="explain-box">
    The confusion matrix groups every prediction into 4 categories.
    <strong>Green = correct</strong>, <strong>Red = errors</strong>.
    <br><br>
    For <strong>{scenario}</strong>:
    FN cost = <em>{info['fn_cost']}</em> | FP cost = <em>{info['fp_cost']}</em>
</div>
""", unsafe_allow_html=True)

cm = confusion_matrix(y_true, y_pred, labels=[0, 1])
tn, fp, fn, tp = cm.ravel()

col_cm, col_explain = st.columns([1, 1])

with col_cm:
    fig_cm = go.Figure()
    cm_colors = [
        ["#27ae60", "#c0392b"],  # row 0: TN=green, FP=red
        ["#e74c3c", "#2ecc71"],  # row 1: FN=red,   TP=green
    ]
    cm_text = [
        [f"<b>TN</b><br>{tn}", f"<b>FP</b><br>{fp}"],
        [f"<b>FN</b><br>{fn}", f"<b>TP</b><br>{tp}"],
    ]
    for i in range(2):
        for j in range(2):
            fig_cm.add_trace(go.Scatter(
                x=[j], y=[1 - i],
                mode="text",
                text=[cm_text[i][j]],
                textfont=dict(size=22, color="white"),
                showlegend=False, hoverinfo="skip",
            ))
            fig_cm.add_shape(
                type="rect",
                x0=j - 0.48, x1=j + 0.48,
                y0=(1 - i) - 0.48, y1=(1 - i) + 0.48,
                fillcolor=cm_colors[i][j],
                line=dict(width=2, color="rgba(255,255,255,0.2)"),
                layer="below",
            )
    fig_cm.update_layout(
        xaxis=dict(tickvals=[0, 1], ticktext=[f"Pred {neg_label}", f"Pred {pos_label}"], side="bottom", showgrid=False),
        yaxis=dict(tickvals=[0, 1], ticktext=[f"Actual {pos_label}", f"Actual {neg_label}"], showgrid=False),
        height=320, margin=dict(l=20, r=20, t=20, b=40),
        paper_bgcolor="rgba(0,0,0,0)", plot_bgcolor="rgba(0,0,0,0)",
        font=dict(family="Inter, sans-serif", color="white"),
    )
    st.plotly_chart(fig_cm, use_container_width=True)
    st.markdown("""
    <div class="cm-legend">
        <div class="cm-legend-item"><div class="cm-dot" style="background:#27ae60"></div> Correct prediction</div>
        <div class="cm-legend-item"><div class="cm-dot" style="background:#e74c3c"></div> Error (misclassification)</div>
    </div>
    """, unsafe_allow_html=True)

with col_explain:
    st.markdown(f"""
**True Positive (TP) = {tp}**
Model said "{pos_label}" -- correct.

**True Negative (TN) = {tn}**
Model said "{neg_label}" -- correct.

**False Positive (FP) = {fp}** -- Type I Error
Model said "{pos_label}" but was actually {neg_label}.
Cost: _{info['fp_cost']}_

**False Negative (FN) = {fn}** -- Type II Error
Model said "{neg_label}" but was actually {pos_label}.
Cost: _{info['fn_cost']}_
    """)

    if info["optimal"] == "Recall":
        st.markdown(f"""
<div class="warn-box">
    <strong>For {scenario}:</strong> FN is the dangerous error.
    We need high <strong>Recall</strong> to minimise FN = {fn}.
</div>""", unsafe_allow_html=True)
    elif info["optimal"] == "Precision":
        st.markdown(f"""
<div class="warn-box">
    <strong>For {scenario}:</strong> FP is the dangerous error.
    We need high <strong>Precision</strong> to minimise FP = {fp}.
</div>""", unsafe_allow_html=True)
    else:
        st.markdown(f"""
<div class="warn-box">
    <strong>For {scenario}:</strong> Both FP and FN are costly.
    We use <strong>F1-Score</strong> to balance both.
</div>""", unsafe_allow_html=True)


# ══════════════════════════════════════════════════
# STEP 4: Performance Metrics (B07 Part 2)
# ══════════════════════════════════════════════════
st.markdown("---")
step_header(4, "Classification Metrics", "B07 Part 2")

st.markdown(f"""
<div class="explain-box">
    Each metric answers a different question. For <strong>{scenario}</strong>,
    the most important metric is <strong>{info['optimal']}</strong> (highlighted in blue).
    <br><br>
    <strong>Why?</strong> {info['why']}
</div>
""", unsafe_allow_html=True)

acc = accuracy_score(y_true, y_pred)
prec = precision_score(y_true, y_pred, zero_division=0)
rec = recall_score(y_true, y_pred, zero_division=0)
f1 = f1_score(y_true, y_pred, zero_division=0)
spec = tn / (tn + fp) if (tn + fp) > 0 else 0

optimal_map = {"Recall": rec, "Precision": prec, "F1-Score": f1}

c1, c2, c3, c4 = st.columns(4)

metrics_data = [
    ("Accuracy", acc, "(TP+TN)/Total", f"({tp}+{tn})/{tp+tn+fp+fn}", c1),
    ("Precision", prec, "TP/(TP+FP)", f"{tp}/({tp}+{fp})", c2),
    ("Recall", rec, "TP/(TP+FN)", f"{tp}/({tp}+{fn})", c3),
    ("F1-Score", f1, "2(P*R)/(P+R)", f"2({prec:.2f}*{rec:.2f})/({prec:.2f}+{rec:.2f})", c4),
]

for name, val, formula, calc, col in metrics_data:
    hl = "highlight" if info["optimal"] == name else ""
    with col:
        st.markdown(f"""
        <div class="metric-card {hl}">
            <h3>{name}</h3>
            <div class="value">{val:.1%}</div>
            <div class="formula">{formula}<br>{calc}</div>
        </div>
        """, unsafe_allow_html=True)

# Accuracy trap warning -- use pre-computed values to avoid f-string issues
trap_metric_name = "Recall" if rec < 0.6 else "Precision"
trap_metric_val = rec if rec < 0.6 else prec
if acc > 0.85 and (rec < 0.6 or prec < 0.6):
    st.markdown(f"""
    <div class="warn-box">
        <strong>Accuracy Trap detected:</strong> Accuracy is {acc:.1%} but
        {trap_metric_name} is only {trap_metric_val:.1%}. The model may just be predicting
        the majority class. This is exactly what B07 Part 1 warns about.
    </div>
    """, unsafe_allow_html=True)

# Metric intuition expander
with st.expander("What does each metric mean? (click to expand)"):
    st.markdown(f"""
| Metric | Question it answers | When to prioritise |
|--------|--------------------|--------------------|
| **Accuracy** | "Overall, how often is the model correct?" | Balanced classes only |
| **Precision** | "When the model says {pos_label}, how often is it right?" | When FP is costly (e.g. spam filter) |
| **Recall** | "Of all actual {pos_label} cases, how many did we catch?" | When FN is costly (e.g. cancer) |
| **F1-Score** | "Balance between Precision and Recall" | When both FP and FN matter |
| **Specificity** | "Of all actual {neg_label}, how many correctly identified?" | Value = {spec:.4f} |
    """)


# ══════════════════════════════════════════════════
# STEP 5: ROC Curve (B07 Part 3)
# ══════════════════════════════════════════════════
st.markdown("---")
step_header(5, "ROC Curve & AUC", "B07 Part 3")

st.markdown("""
<div class="explain-box">
    The ROC curve plots <strong>True Positive Rate</strong> (Recall) vs <strong>False Positive Rate</strong>
    across all possible thresholds. AUC summarises this into one number:
    <strong>1.0 = perfect</strong>, <strong>0.5 = random coin flip</strong>.
    <br><br>
    The red dot shows where your current threshold sits on the curve.
</div>
""", unsafe_allow_html=True)

auc_val = None
try:
    fpr_arr, tpr_arr, _ = roc_curve(y_true, y_scores)
    auc_val = roc_auc_score(y_true, y_scores)

    current_tpr = tp / (tp + fn) if (tp + fn) > 0 else 0
    current_fpr = fp / (fp + tn) if (fp + tn) > 0 else 0

    fig_roc = go.Figure()
    fig_roc.add_trace(go.Scatter(
        x=fpr_arr, y=tpr_arr, mode="lines",
        name=f"Model (AUC = {auc_val:.3f})",
        line=dict(color="#4da6ff", width=3),
        fill="tozeroy", fillcolor="rgba(77,166,255,0.1)",
    ))
    fig_roc.add_trace(go.Scatter(
        x=[0, 1], y=[0, 1], mode="lines",
        name="Random (AUC = 0.500)",
        line=dict(color="rgba(255,255,255,0.3)", width=2, dash="dash"),
    ))
    fig_roc.add_trace(go.Scatter(
        x=[current_fpr], y=[current_tpr],
        mode="markers+text",
        name=f"Threshold = {threshold:.2f}",
        marker=dict(color="#e74c3c", size=14),
        text=[f"t={threshold:.2f}"],
        textposition="top right",
        textfont=dict(size=12, color="#e74c3c"),
    ))
    fig_roc.update_layout(
        xaxis_title="False Positive Rate (FPR)",
        yaxis_title="True Positive Rate (Recall)",
        height=420,
        margin=dict(l=20, r=20, t=30, b=20),
        paper_bgcolor="rgba(0,0,0,0)", plot_bgcolor="rgba(0,0,0,0)",
        font=dict(family="Inter, sans-serif", color="white"),
        legend=dict(x=0.5, y=0.05),
        xaxis=dict(gridcolor="rgba(255,255,255,0.1)"),
        yaxis=dict(gridcolor="rgba(255,255,255,0.1)"),
    )
    st.plotly_chart(fig_roc, use_container_width=True)

    if auc_val >= 0.9:
        interp, auc_color = "Excellent", "#27ae60"
    elif auc_val >= 0.8:
        interp, auc_color = "Good", "#2ecc71"
    elif auc_val >= 0.7:
        interp, auc_color = "Fair", "#f39c12"
    else:
        interp, auc_color = "Poor", "#e74c3c"

    auc_detail = "The model separates classes well." if auc_val >= 0.8 else "Consider improving the model or features."
    st.markdown(f"""
    <div class="success-box" style="border-left-color: {auc_color};">
        <strong>AUC = {auc_val:.3f}</strong> -- {interp} model performance. {auc_detail}
    </div>
    """, unsafe_allow_html=True)

except ValueError:
    st.warning("Cannot compute ROC curve -- need both positive and negative samples.")


# ══════════════════════════════════════════════════
# STEP 6: Precision-Recall Curve (B07 Part 3)
# ══════════════════════════════════════════════════
st.markdown("---")
step_header(6, "Precision-Recall Curve", "B07 Part 3")

st.markdown(f"""
<div class="explain-box">
    For <strong>imbalanced data</strong>, the PR curve is more informative than ROC.
    It focuses on the positive class (<strong>{pos_label}</strong>) and shows the
    precision-recall trade-off at every threshold.
    <br><br>
    <strong>AP (Average Precision)</strong> summarises the curve. Higher = better.
</div>
""", unsafe_allow_html=True)

try:
    prec_arr, rec_arr, _ = precision_recall_curve(y_true, y_scores)
    ap_val = average_precision_score(y_true, y_scores)
    baseline = y_true.sum() / len(y_true)

    fig_pr = go.Figure()
    fig_pr.add_trace(go.Scatter(
        x=rec_arr, y=prec_arr, mode="lines",
        name=f"Model (AP = {ap_val:.3f})",
        line=dict(color="#4da6ff", width=3),
        fill="tozeroy", fillcolor="rgba(77,166,255,0.1)",
    ))
    fig_pr.add_trace(go.Scatter(
        x=[0, 1], y=[baseline, baseline], mode="lines",
        name=f"Random (baseline = {baseline:.3f})",
        line=dict(color="rgba(255,255,255,0.3)", width=2, dash="dash"),
    ))
    fig_pr.add_trace(go.Scatter(
        x=[rec], y=[prec], mode="markers+text",
        name=f"Threshold = {threshold:.2f}",
        marker=dict(color="#e74c3c", size=14),
        text=[f"t={threshold:.2f}"],
        textposition="top left",
        textfont=dict(size=12, color="#e74c3c"),
    ))
    fig_pr.update_layout(
        xaxis_title="Recall", yaxis_title="Precision",
        height=400, margin=dict(l=20, r=20, t=30, b=20),
        paper_bgcolor="rgba(0,0,0,0)", plot_bgcolor="rgba(0,0,0,0)",
        font=dict(family="Inter, sans-serif", color="white"),
        legend=dict(x=0.05, y=0.05),
        xaxis=dict(gridcolor="rgba(255,255,255,0.1)"),
        yaxis=dict(gridcolor="rgba(255,255,255,0.1)"),
    )
    st.plotly_chart(fig_pr, use_container_width=True)

    pr_note = "PR curve is more informative here" if baseline < 0.3 else "both curves are useful"
    col_pr1, col_pr2 = st.columns(2)
    with col_pr1:
        st.markdown(f"""
**ROC vs PR Curve:**
- ROC can look overly optimistic on imbalanced data
- PR curve gives a realistic picture when positives are rare
- Your data: **{baseline:.1%}** positive rate -- {pr_note}
        """)
    with col_pr2:
        st.markdown(f"""
**Reading the curve:**
- Top-right corner = ideal (high precision AND recall)
- Steep drop = model struggles to maintain precision
- AP = **{ap_val:.3f}** (random baseline = {baseline:.3f})
        """)

except ValueError:
    st.warning("Cannot compute PR curve -- need both positive and negative samples.")


# ══════════════════════════════════════════════════
# STEP 7: Threshold Optimiser (B07 Part 4)
# ══════════════════════════════════════════════════
st.markdown("---")
step_header(7, "Threshold Optimisation", "B07 Part 4")

st.markdown("""
<div class="explain-box">
    Different thresholds optimise different metrics. This chart sweeps all thresholds
    and shows how each metric changes. Use this to find the <strong>best threshold</strong>
    for your specific problem.
</div>
""", unsafe_allow_html=True)

try:
    sweep_t = np.linspace(0.01, 0.99, 99)
    s_acc, s_prec, s_rec, s_f1 = [], [], [], []
    for t in sweep_t:
        yp = (y_scores >= t).astype(int)
        s_acc.append(accuracy_score(y_true, yp))
        s_prec.append(precision_score(y_true, yp, zero_division=0))
        s_rec.append(recall_score(y_true, yp, zero_division=0))
        s_f1.append(f1_score(y_true, yp, zero_division=0))

    metric_colors = {
        "Accuracy": "#3498db", "Precision": "#2ecc71",
        "Recall": "#e74c3c", "F1-Score": "#f39c12",
    }

    fig_sweep = go.Figure()
    for name, vals in [("Accuracy", s_acc), ("Precision", s_prec), ("Recall", s_rec), ("F1-Score", s_f1)]:
        fig_sweep.add_trace(go.Scatter(
            x=sweep_t, y=vals, mode="lines", name=name,
            line=dict(color=metric_colors[name], width=2.5),
        ))

    best_f1_idx = int(np.argmax(s_f1))
    fig_sweep.add_vline(
        x=sweep_t[best_f1_idx], line_dash="dash", line_color="#f39c12",
        annotation_text=f"Best F1 = {sweep_t[best_f1_idx]:.2f}",
        annotation_font_color="#f39c12",
    )
    fig_sweep.add_vline(
        x=threshold, line_dash="dot", line_color="#4da6ff",
        annotation_text=f"Current = {threshold:.2f}",
        annotation_font_color="#4da6ff",
    )
    fig_sweep.update_layout(
        xaxis_title="Threshold", yaxis_title="Metric Value",
        height=400, margin=dict(l=20, r=20, t=30, b=20),
        paper_bgcolor="rgba(0,0,0,0)", plot_bgcolor="rgba(0,0,0,0)",
        font=dict(family="Inter, sans-serif", color="white"),
        legend=dict(x=0.01, y=0.01),
        xaxis=dict(gridcolor="rgba(255,255,255,0.1)"),
        yaxis=dict(gridcolor="rgba(255,255,255,0.1)"),
    )
    st.plotly_chart(fig_sweep, use_container_width=True)

    best_rec_idx = next((i for i in range(len(s_rec)) if s_rec[i] >= 0.95), best_f1_idx)
    best_prec_idx = next((i for i in range(len(s_prec) - 1, -1, -1) if s_prec[i] >= 0.95), best_f1_idx)

    col_opt1, col_opt2 = st.columns(2)
    with col_opt1:
        st.markdown(f"""
**Optimal thresholds found:**

| Goal | Threshold | Metric Value |
|------|-----------|-------------|
| Best F1-Score | **{sweep_t[best_f1_idx]:.2f}** | {s_f1[best_f1_idx]:.4f} |
| Recall >= 95% | **{sweep_t[best_rec_idx]:.2f}** | Recall = {s_rec[best_rec_idx]:.4f} |
| Precision >= 95% | **{sweep_t[best_prec_idx]:.2f}** | Precision = {s_prec[best_prec_idx]:.4f} |
        """)
    with col_opt2:
        if info['optimal'] == 'Recall':
            advice = "Lower the threshold to catch more positives (higher recall)."
        elif info['optimal'] == 'Precision':
            advice = "Raise the threshold to be more confident in positive predictions."
        else:
            advice = "Use the Best F1 threshold to balance both errors."

        opt_val = optimal_map[info['optimal']]
        st.markdown(f"""
**Recommendation for {scenario}:**

The key metric is **{info['optimal']}**.
{advice}

Current threshold **{threshold:.2f}** gives {info['optimal']} = **{opt_val:.4f}**
        """)

except Exception:
    st.warning("Cannot compute threshold sweep -- check your data.")


# ══════════════════════════════════════════════════
# STEP 8: Cross-Validation (B07 Part 5)
# ══════════════════════════════════════════════════
st.markdown("---")
step_header(8, "Cross-Validation Simulator", "B07 Part 5")

st.markdown("""
<div class="explain-box">
    A single train-test split can be misleading -- you might get lucky (or unlucky) with the split.
    <strong>K-Fold Cross-Validation</strong> splits data into K parts, tests on each fold in turn,
    and averages the results. This gives a <strong>more reliable performance estimate</strong>.
    <br><br>
    <strong>Stratified K-Fold</strong> ensures each fold has the same class distribution as the full dataset.
</div>
""", unsafe_allow_html=True)

n_folds = st.slider("Number of folds (K)", min_value=2, max_value=10, value=5,
                     help="More folds = more reliable estimate, but slower")

try:
    X_cv = df["Model Score"].values.reshape(-1, 1)
    y_cv = y_true
    skf = StratifiedKFold(n_splits=n_folds, shuffle=True, random_state=42)
    fold_metrics = []

    for fold_i, (train_idx, test_idx) in enumerate(skf.split(X_cv, y_cv), 1):
        y_test_fold = y_cv[test_idx]
        scores_fold = y_scores[test_idx]
        y_pred_fold = (scores_fold >= threshold).astype(int)
        fold_metrics.append({
            "Fold": fold_i,
            "Samples": len(test_idx),
            "Positives": int(y_test_fold.sum()),
            "Accuracy": accuracy_score(y_test_fold, y_pred_fold),
            "Precision": precision_score(y_test_fold, y_pred_fold, zero_division=0),
            "Recall": recall_score(y_test_fold, y_pred_fold, zero_division=0),
            "F1-Score": f1_score(y_test_fold, y_pred_fold, zero_division=0),
        })

    fold_df = pd.DataFrame(fold_metrics)
    col_cv1, col_cv2 = st.columns([1, 1])

    with col_cv1:
        best_fold = fold_df["F1-Score"].idxmax()
        bar_colors = ["#4da6ff" if i == best_fold else "#1a5276" for i in range(len(fold_df))]

        fig_cv = go.Figure()
        fig_cv.add_trace(go.Bar(
            x=[f"Fold {r['Fold']}" for _, r in fold_df.iterrows()],
            y=fold_df["F1-Score"],
            marker_color=bar_colors,
            text=[f"{v:.3f}" for v in fold_df["F1-Score"]],
            textposition="outside",
            textfont=dict(color="white"),
        ))
        mean_f1_cv = fold_df["F1-Score"].mean()
        fig_cv.add_hline(
            y=mean_f1_cv, line_dash="dash", line_color="#e74c3c",
            annotation_text=f"Mean = {mean_f1_cv:.3f}",
            annotation_font_color="#e74c3c",
        )
        fig_cv.update_layout(
            yaxis_title="F1-Score", height=350,
            margin=dict(l=20, r=20, t=30, b=20),
            paper_bgcolor="rgba(0,0,0,0)", plot_bgcolor="rgba(0,0,0,0)",
            font=dict(family="Inter, sans-serif", color="white"),
            xaxis=dict(gridcolor="rgba(255,255,255,0.1)"),
            yaxis=dict(gridcolor="rgba(255,255,255,0.1)"),
        )
        st.plotly_chart(fig_cv, use_container_width=True)

    with col_cv2:
        st.dataframe(fold_df.style.format({
            "Accuracy": "{:.4f}", "Precision": "{:.4f}",
            "Recall": "{:.4f}", "F1-Score": "{:.4f}",
        }), use_container_width=True, height=280)

        st.markdown(f"""
**{n_folds}-Fold CV Summary:**

| Metric | Mean +/- Std |
|--------|-------------|
| Accuracy | {fold_df['Accuracy'].mean():.4f} +/- {fold_df['Accuracy'].std():.4f} |
| Precision | {fold_df['Precision'].mean():.4f} +/- {fold_df['Precision'].std():.4f} |
| Recall | {fold_df['Recall'].mean():.4f} +/- {fold_df['Recall'].std():.4f} |
| F1-Score | {fold_df['F1-Score'].mean():.4f} +/- {fold_df['F1-Score'].std():.4f} |
        """)

    f1_std = fold_df["F1-Score"].std()
    if f1_std > 0.1:
        st.markdown("""
        <div class="warn-box">
            <strong>High variance across folds.</strong> Performance varies a lot depending
            on which data the model sees. This could mean the dataset is too small or the
            model is unstable.
        </div>
        """, unsafe_allow_html=True)
    else:
        st.markdown(f"""
        <div class="success-box">
            <strong>Stable performance.</strong> Low variance across folds (std = {f1_std:.4f})
            suggests the model generalises consistently.
        </div>
        """, unsafe_allow_html=True)

except Exception as e:
    st.warning(f"Cross-validation could not run: {e}")


# ══════════════════════════════════════════════════
# STEP 9: Exam Reference (B07 Part 7)
# ══════════════════════════════════════════════════
st.markdown("---")
step_header(9, "Exam Quick Reference", "B07 Part 7")

col_exam1, col_exam2 = st.columns(2)

auc_display = f"{auc_val:.4f}" if auc_val is not None else "N/A"

with col_exam1:
    st.markdown(f"""
**Calculations from your data (threshold = {threshold:.2f}):**

| Metric | Formula | Value |
|--------|---------|-------|
| Accuracy | (TP+TN)/Total = ({tp}+{tn})/{tp+tn+fp+fn} | **{acc:.4f}** |
| Precision | TP/(TP+FP) = {tp}/({tp}+{fp}) | **{prec:.4f}** |
| Recall | TP/(TP+FN) = {tp}/({tp}+{fn}) | **{rec:.4f}** |
| F1-Score | 2(P*R)/(P+R) | **{f1:.4f}** |
| Specificity | TN/(TN+FP) = {tn}/({tn}+{fp}) | **{spec:.4f}** |
| AUC | Area under ROC curve | **{auc_display}** |
    """)

with col_exam2:
    st.markdown("""
**When to use which metric:**

| Problem | Best Metric | Why |
|---------|-------------|-----|
| Medical diagnosis | Recall | Missing disease = fatal |
| Spam filter | Precision | Blocking good email = serious |
| Fraud detection | F1-Score | Both errors are costly |
| Imbalanced data | F1 or AUC | Accuracy is misleading |
| Ranking / probability | ROC-AUC | Threshold-independent |

**Key terms:**
- Type I Error = False Positive (FP)
- Type II Error = False Negative (FN)
- Sensitivity = Recall = TPR
- Specificity = TNR = TN/(TN+FP)
    """)

# Practice problem
with st.expander("Practice Problem (try it yourself)"):
    st.markdown("""
**Given this confusion matrix, calculate all metrics:**

```
                Predicted
              Neg    Pos
Actual Neg  [ 90     10 ]
Actual Pos  [  5     95 ]
```

<details>
<summary>Click to reveal answer</summary>

- TP = 95, TN = 90, FP = 10, FN = 5
- Accuracy = (95+90)/200 = **92.5%**
- Precision = 95/(95+10) = **90.5%**
- Recall = 95/(95+5) = **95.0%**
- F1 = 2(0.905 * 0.950)/(0.905+0.950) = **92.7%**
- Specificity = 90/(90+10) = **90.0%**

</details>
    """, unsafe_allow_html=True)


# ── Export ──
st.markdown("---")
st.markdown("### Export Results")

results_df = display_df.copy()
col_dl1, col_dl2 = st.columns(2)

with col_dl1:
    csv = results_df.to_csv(index=False)
    st.download_button(
        "Download predictions as CSV",
        csv,
        file_name=f"{scenario.lower().replace(' ', '_')}_predictions.csv",
        mime="text/csv",
    )

with col_dl2:
    buffer = BytesIO()
    with pd.ExcelWriter(buffer, engine="openpyxl") as writer:
        results_df.to_excel(writer, index=False, sheet_name="Predictions")
        pd.DataFrame({
            "Metric": ["Accuracy", "Precision", "Recall", "F1-Score", "AUC", "Threshold"],
            "Value": [acc, prec, rec, f1, auc_display, threshold],
        }).to_excel(writer, index=False, sheet_name="Metrics")
    st.download_button(
        "Download as Excel (with metrics)",
        buffer.getvalue(),
        file_name=f"{scenario.lower().replace(' ', '_')}_results.xlsx",
        mime="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    )


# ── Footer ──
st.markdown("---")
st.caption("University of Auckland | COMPSCI 713 | Model Evaluation and Performance Metrics")

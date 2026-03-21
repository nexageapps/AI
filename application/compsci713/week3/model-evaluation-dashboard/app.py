"""
Model Evaluation Dashboard
UoA - COMPSCI 713 Week 3 | Basic Lesson 7

A simple, data-first approach: see your data like a spreadsheet,
add or upload samples, and learn metrics from your own data.
"""

import streamlit as st
import pandas as pd
import numpy as np
from sklearn.metrics import (
    confusion_matrix, accuracy_score, precision_score,
    recall_score, f1_score, roc_curve, roc_auc_score,
    classification_report
)
import plotly.graph_objects as go
import plotly.express as px
from io import BytesIO

# ── Page config ──
st.set_page_config(
    page_title="Model Evaluation | UoA - COMPSCI 713",
    page_icon="U",
    layout="wide",
    initial_sidebar_state="expanded",
)

# ── UoA Theme ──
st.markdown("""
<style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

    html, body, [class*="css"] {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    }
    .main .block-container { padding-top: 1rem; max-width: 1200px; }

    /* UoA header */
    .uoa-header {
        background: linear-gradient(135deg, #00467F 0%, #0066B3 100%);
        color: white;
        padding: 1.5rem 2rem;
        border-radius: 8px;
        margin-bottom: 1.5rem;
    }
    .uoa-header h1 { margin: 0; font-size: 1.6rem; font-weight: 700; }
    .uoa-header p { margin: 0.3rem 0 0; opacity: 0.9; font-size: 0.9rem; }

    /* Cards */
    .metric-card {
        background: #f8f9fa;
        border: 2px solid #e0e0e0;
        border-radius: 8px;
        padding: 1rem;
        text-align: center;
    }
    .metric-card.highlight { border-color: #00467F; background: #e6f2ff; }
    .metric-card h3 { margin: 0; font-size: 0.8rem; color: #7f8c8d; text-transform: uppercase; letter-spacing: 0.5px; }
    .metric-card .value { font-size: 1.8rem; font-weight: 700; color: #00467F; margin: 0.3rem 0; }
    .metric-card .formula { font-family: monospace; font-size: 0.75rem; color: #999; }

    /* Explanation boxes */
    .explain-box {
        background: #f8f9fa;
        border-left: 4px solid #00467F;
        padding: 1rem;
        border-radius: 0 8px 8px 0;
        margin: 0.5rem 0;
        font-size: 0.9rem;
        line-height: 1.6;
    }
    .explain-box strong { color: #00467F; }

    .warn-box {
        background: #fff3e0;
        border-left: 4px solid #f39c12;
        padding: 1rem;
        border-radius: 0 8px 8px 0;
        margin: 0.5rem 0;
    }

    /* Data table styling */
    .stDataFrame { border-radius: 8px; overflow: hidden; }

    /* Sidebar */
    section[data-testid="stSidebar"] {
        background: #f0f4f8;
    }
    section[data-testid="stSidebar"] h1 {
        color: #00467F;
        font-size: 1.1rem;
    }
</style>
""", unsafe_allow_html=True)


# ── Header ──
st.markdown("""
<div class="uoa-header">
    <h1>Model Evaluation Dashboard</h1>
    <p>UoA - COMPSCI 713 Week 3 | Basic Lesson 7: Model Evaluation and Performance Metrics</p>
</div>
""", unsafe_allow_html=True)


# ── Sidebar: Scenario + Data Source ──
with st.sidebar:
    st.markdown("## Choose Scenario")

    scenario = st.radio(
        "Pick a real-world problem:",
        ["Cancer Detection", "Fraud Detection", "Spam Filter"],
        index=0,
        help="Each scenario shows why different metrics matter"
    )

    st.divider()
    st.markdown("## Data Source")
    data_source = st.radio(
        "How to load data:",
        ["Use built-in samples", "Upload CSV / Excel"],
        index=0,
    )


# ── Built-in sample data generators ──
def make_cancer_data():
    """1000 patients, 100 have cancer. Model scores each patient."""
    np.random.seed(42)
    n = 200
    labels = np.array([1]*20 + [0]*180)
    np.random.shuffle(labels)
    # model confidence scores
    scores = np.where(
        labels == 1,
        np.clip(np.random.normal(0.72, 0.18, n), 0, 1),
        np.clip(np.random.normal(0.30, 0.20, n), 0, 1),
    )
    ids = [f"Patient-{i+1:03d}" for i in range(n)]
    df = pd.DataFrame({
        "ID": ids,
        "Age": np.random.randint(25, 80, n),
        "Tumour Size (mm)": np.round(np.where(labels == 1, np.random.normal(28, 10, n), np.random.normal(8, 5, n)).clip(1), 1),
        "Actual": ["Cancer" if l == 1 else "Healthy" for l in labels],
        "Model Score": np.round(scores, 3),
    })
    return df, "Cancer", "Healthy"


def make_fraud_data():
    """10000 transactions, 200 fraudulent."""
    np.random.seed(42)
    n = 300
    labels = np.array([1]*30 + [0]*270)
    np.random.shuffle(labels)
    scores = np.where(
        labels == 1,
        np.clip(np.random.normal(0.68, 0.20, n), 0, 1),
        np.clip(np.random.normal(0.25, 0.18, n), 0, 1),
    )
    ids = [f"TXN-{i+1:04d}" for i in range(n)]
    df = pd.DataFrame({
        "ID": ids,
        "Amount ($)": np.round(np.where(labels == 1, np.random.exponential(500, n), np.random.exponential(80, n)), 2),
        "Country": np.random.choice(["NZ", "AU", "US", "UK", "NG", "RU"], n),
        "Actual": ["Fraud" if l == 1 else "Legitimate" for l in labels],
        "Model Score": np.round(scores, 3),
    })
    return df, "Fraud", "Legitimate"


def make_spam_data():
    """5000 emails, 1500 spam."""
    np.random.seed(42)
    n = 250
    labels = np.array([1]*75 + [0]*175)
    np.random.shuffle(labels)
    scores = np.where(
        labels == 1,
        np.clip(np.random.normal(0.75, 0.15, n), 0, 1),
        np.clip(np.random.normal(0.28, 0.18, n), 0, 1),
    )
    ids = [f"Email-{i+1:03d}" for i in range(n)]
    subjects = np.where(
        labels == 1,
        np.random.choice(["WIN FREE iPHONE", "URGENT: Claim prize", "Buy cheap meds", "You won $1M", "Hot singles near you"], n),
        np.random.choice(["Meeting tomorrow", "Project update", "Invoice attached", "Job offer", "Flight confirmation"], n),
    )
    df = pd.DataFrame({
        "ID": ids,
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
        help="Must have columns: 'Actual' (true labels) and 'Model Score' (0-1 probability)"
    )
    if uploaded is not None:
        if uploaded.name.endswith(".csv"):
            df = pd.read_csv(uploaded)
        else:
            df = pd.read_excel(uploaded)

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
        "context": f"A hospital screens patients. The model gives each patient a score (0-1) indicating cancer likelihood. We have **{len(df)}** patients, **{(df['Actual'] == pos_label).sum()}** actually have cancer.",
        "why": "Missing cancer (False Negative) can be fatal. We prioritise **Recall** -- catch every cancer case, even if it means extra tests for healthy patients.",
        "fn_cost": "Patient goes untreated -- potentially fatal",
        "fp_cost": "Extra tests needed -- acceptable cost",
        "optimal": "Recall",
    },
    "Fraud Detection": {
        "context": f"A bank processes transactions. The model scores each transaction for fraud likelihood. We have **{len(df)}** transactions, **{(df['Actual'] == pos_label).sum()}** are fraudulent.",
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
# STEP 1: Show the data
# ══════════════════════════════════════════════════
st.markdown("---")
st.markdown("### Step 1: Your Data")
st.markdown(f"""
<div class="explain-box">
    {info['context']}
    <br><br>
    Each row is one sample. The <strong>Model Score</strong> column is the model's confidence
    that this sample is <strong>{pos_label}</strong> (0 = definitely {neg_label}, 1 = definitely {pos_label}).
</div>
""", unsafe_allow_html=True)

# Editable data table
edited_df = st.data_editor(
    df,
    use_container_width=True,
    num_rows="dynamic",
    height=350,
    column_config={
        "Model Score": st.column_config.ProgressColumn(
            "Model Score",
            min_value=0,
            max_value=1,
            format="%.3f",
        ),
    },
)
df = edited_df

col_info1, col_info2 = st.columns(2)
with col_info1:
    st.caption(f"Total samples: **{len(df)}**")
with col_info2:
    st.caption(f"Positive ({pos_label}): **{(df['Actual'] == pos_label).sum()}** | Negative ({neg_label}): **{(df['Actual'] == neg_label).sum()}**")


# ══════════════════════════════════════════════════
# STEP 2: Set the threshold
# ══════════════════════════════════════════════════
st.markdown("---")
st.markdown("### Step 2: Set the Decision Threshold")
st.markdown(f"""
<div class="explain-box">
    The model gives a score between 0 and 1. We need a <strong>threshold</strong> to decide:
    if score >= threshold, predict <strong>{pos_label}</strong>, otherwise predict <strong>{neg_label}</strong>.
    <br><br>
    Try moving the slider and watch how the predictions and metrics change.
</div>
""", unsafe_allow_html=True)

threshold = st.slider(
    "Decision Threshold",
    min_value=0.0,
    max_value=1.0,
    value=0.5,
    step=0.01,
    help=f"Score >= threshold → predict {pos_label}"
)

# Apply threshold to get predictions
y_true = (df["Actual"] == pos_label).astype(int).values
y_scores = df["Model Score"].values
y_pred = (y_scores >= threshold).astype(int)

# Add prediction column to display
display_df = df.copy()
display_df["Predicted"] = np.where(y_pred == 1, pos_label, neg_label)
display_df["Correct?"] = display_df["Actual"] == display_df["Predicted"]

# Show a few rows with predictions
st.markdown("#### Predictions at this threshold:")
st.dataframe(
    display_df.style.apply(
        lambda row: [
            "background-color: #d4edda" if row["Correct?"] else "background-color: #f8d7da"
        ] * len(row),
        axis=1,
    ),
    use_container_width=True,
    height=300,
)

correct = display_df["Correct?"].sum()
wrong = len(display_df) - correct
st.caption(f"Correct: **{correct}** (green) | Wrong: **{wrong}** (red)")


# ══════════════════════════════════════════════════
# STEP 3: Confusion Matrix
# ══════════════════════════════════════════════════
st.markdown("---")
st.markdown("### Step 3: Confusion Matrix")
st.markdown(f"""
<div class="explain-box">
    The confusion matrix groups every prediction into 4 categories.
    Think of it as a 2x2 table: <strong>what actually happened</strong> vs <strong>what the model predicted</strong>.
</div>
""", unsafe_allow_html=True)

cm = confusion_matrix(y_true, y_pred, labels=[0, 1])
tn, fp, fn, tp = cm.ravel()

col_cm, col_explain = st.columns([1, 1])

with col_cm:
    # Plotly confusion matrix heatmap
    fig_cm = go.Figure(data=go.Heatmap(
        z=[[tn, fp], [fn, tp]],
        x=[f"Predicted {neg_label}", f"Predicted {pos_label}"],
        y=[f"Actual {neg_label}", f"Actual {pos_label}"],
        text=[
            [f"TN\n{tn}", f"FP\n{fp}"],
            [f"FN\n{fn}", f"TP\n{tp}"],
        ],
        texttemplate="%{text}",
        textfont={"size": 18, "color": "white"},
        colorscale=[
            [0, "#3498db"],
            [0.33, "#2ecc71"],
            [0.66, "#f39c12"],
            [1, "#e74c3c"],
        ],
        showscale=False,
        hoverinfo="skip",
    ))
    fig_cm.update_layout(
        height=350,
        margin=dict(l=20, r=20, t=30, b=20),
        font=dict(family="Inter, sans-serif"),
        xaxis=dict(side="bottom"),
    )
    st.plotly_chart(fig_cm, use_container_width=True)

with col_explain:
    st.markdown(f"""
**True Positive (TP) = {tp}**
Model correctly said "{pos_label}" -- and it was right.

**True Negative (TN) = {tn}**
Model correctly said "{neg_label}" -- and it was right.

**False Positive (FP) = {fp}** -- Type I Error
Model said "{pos_label}" but it was actually {neg_label}.
Cost: _{info['fp_cost']}_

**False Negative (FN) = {fn}** -- Type II Error
Model said "{neg_label}" but it was actually {pos_label}.
Cost: _{info['fn_cost']}_
    """)


# ══════════════════════════════════════════════════
# STEP 4: Metrics with formulas
# ══════════════════════════════════════════════════
st.markdown("---")
st.markdown("### Step 4: Performance Metrics")
st.markdown(f"""
<div class="explain-box">
    Now we calculate metrics from the confusion matrix.
    For <strong>{scenario}</strong>, the most important metric is <strong>{info['optimal']}</strong>.
    <br><br>
    <strong>Why?</strong> {info['why']}
</div>
""", unsafe_allow_html=True)

acc = accuracy_score(y_true, y_pred)
prec = precision_score(y_true, y_pred, zero_division=0)
rec = recall_score(y_true, y_pred, zero_division=0)
f1 = f1_score(y_true, y_pred, zero_division=0)

optimal_map = {"Recall": rec, "Precision": prec, "F1-Score": f1}

c1, c2, c3, c4 = st.columns(4)

with c1:
    hl = "highlight" if info["optimal"] == "Accuracy" else ""
    st.markdown(f"""
    <div class="metric-card {hl}">
        <h3>Accuracy</h3>
        <div class="value">{acc:.1%}</div>
        <div class="formula">(TP+TN) / Total<br>({tp}+{tn}) / {tp+tn+fp+fn}</div>
    </div>
    """, unsafe_allow_html=True)

with c2:
    hl = "highlight" if info["optimal"] == "Precision" else ""
    st.markdown(f"""
    <div class="metric-card {hl}">
        <h3>Precision</h3>
        <div class="value">{prec:.1%}</div>
        <div class="formula">TP / (TP+FP)<br>{tp} / ({tp}+{fp})</div>
    </div>
    """, unsafe_allow_html=True)

with c3:
    hl = "highlight" if info["optimal"] == "Recall" else ""
    st.markdown(f"""
    <div class="metric-card {hl}">
        <h3>Recall</h3>
        <div class="value">{rec:.1%}</div>
        <div class="formula">TP / (TP+FN)<br>{tp} / ({tp}+{fn})</div>
    </div>
    """, unsafe_allow_html=True)

with c4:
    hl = "highlight" if info["optimal"] == "F1-Score" else ""
    st.markdown(f"""
    <div class="metric-card {hl}">
        <h3>F1-Score</h3>
        <div class="value">{f1:.1%}</div>
        <div class="formula">2(P*R)/(P+R)<br>2({prec:.2f}*{rec:.2f})/({prec:.2f}+{rec:.2f})</div>
    </div>
    """, unsafe_allow_html=True)

# Warning about accuracy
if acc > 0.9 and (rec < 0.7 or prec < 0.7):
    st.markdown(f"""
    <div class="warn-box">
        <strong>Watch out!</strong> Accuracy is {acc:.1%} which looks great, but
        {'Recall' if rec < 0.7 else 'Precision'} is only
        {rec:.1% if rec < 0.7 else prec:.1%}. This is the classic
        <strong>accuracy trap</strong> with imbalanced data.
        The model might just be predicting the majority class.
    </div>
    """, unsafe_allow_html=True)


# ══════════════════════════════════════════════════
# STEP 5: ROC Curve
# ══════════════════════════════════════════════════
st.markdown("---")
st.markdown("### Step 5: ROC Curve and AUC")
st.markdown("""
<div class="explain-box">
    The ROC curve shows model performance across <strong>all possible thresholds</strong>.
    AUC (Area Under Curve) summarises this: 1.0 = perfect, 0.5 = random coin flip.
    <br><br>
    The red dot shows where your current threshold sits on the curve.
</div>
""", unsafe_allow_html=True)

try:
    fpr_arr, tpr_arr, thresholds_arr = roc_curve(y_true, y_scores)
    auc_val = roc_auc_score(y_true, y_scores)

    fig_roc = go.Figure()
    # ROC curve
    fig_roc.add_trace(go.Scatter(
        x=fpr_arr, y=tpr_arr,
        mode="lines",
        name=f"Model (AUC = {auc_val:.3f})",
        line=dict(color="#00467F", width=3),
        fill="tozeroy",
        fillcolor="rgba(0,70,127,0.1)",
    ))
    # Random line
    fig_roc.add_trace(go.Scatter(
        x=[0, 1], y=[0, 1],
        mode="lines",
        name="Random (AUC = 0.500)",
        line=dict(color="#ccc", width=2, dash="dash"),
    ))
    # Current threshold point
    current_tpr = tp / (tp + fn) if (tp + fn) > 0 else 0
    current_fpr = fp / (fp + tn) if (fp + tn) > 0 else 0
    fig_roc.add_trace(go.Scatter(
        x=[current_fpr], y=[current_tpr],
        mode="markers+text",
        name=f"Threshold = {threshold:.2f}",
        marker=dict(color="#e74c3c", size=14, symbol="circle"),
        text=[f"t={threshold:.2f}"],
        textposition="top right",
        textfont=dict(size=12, color="#e74c3c"),
    ))
    fig_roc.update_layout(
        xaxis_title="False Positive Rate",
        yaxis_title="True Positive Rate (Recall)",
        height=400,
        margin=dict(l=20, r=20, t=30, b=20),
        font=dict(family="Inter, sans-serif"),
        legend=dict(x=0.55, y=0.05),
    )
    st.plotly_chart(fig_roc, use_container_width=True)

    # AUC interpretation
    if auc_val >= 0.9:
        interp = "Excellent"
    elif auc_val >= 0.8:
        interp = "Good"
    elif auc_val >= 0.7:
        interp = "Fair"
    else:
        interp = "Poor"
    st.caption(f"AUC = **{auc_val:.3f}** -- {interp} model performance")

except ValueError:
    st.warning("Cannot compute ROC curve -- need both positive and negative samples.")


# ══════════════════════════════════════════════════
# STEP 6: Exam Cheat Sheet
# ══════════════════════════════════════════════════
st.markdown("---")
st.markdown("### Step 6: Exam Reference")

col_exam1, col_exam2 = st.columns(2)

with col_exam1:
    st.markdown(f"""
**Calculations from YOUR data:**

| Metric | Formula | Value |
|--------|---------|-------|
| Accuracy | (TP+TN)/Total = ({tp}+{tn})/{tp+tn+fp+fn} | **{acc:.4f}** |
| Precision | TP/(TP+FP) = {tp}/({tp}+{fp}) | **{prec:.4f}** |
| Recall | TP/(TP+FN) = {tp}/({tp}+{fn}) | **{rec:.4f}** |
| F1-Score | 2(P*R)/(P+R) | **{f1:.4f}** |
| Specificity | TN/(TN+FP) = {tn}/({tn}+{fp}) | **{tn/(tn+fp) if (tn+fp) > 0 else 0:.4f}** |
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

**Key terms:**
- Type I Error = False Positive (FP)
- Type II Error = False Negative (FN)
- Sensitivity = Recall = TPR
- Specificity = TNR = TN/(TN+FP)
    """)


# ── Download results ──
st.markdown("---")
st.markdown("### Export")

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
            "Value": [acc, prec, rec, f1, auc_val if 'auc_val' in dir() else "N/A", threshold],
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

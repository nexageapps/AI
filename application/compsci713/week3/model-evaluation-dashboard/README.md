# Model Evaluation Dashboard

**COMPSCI 713 - Week 3 | Basic Lesson 7: Model Evaluation and Performance Metrics**

An interactive web application demonstrating real-world applications of model evaluation metrics and performance analysis.

## 🎯 Features

### Real-World Scenarios
- **Cancer Detection**: Medical diagnosis prioritizing recall (minimize false negatives)
- **Fraud Detection**: Balance precision and recall with F1-Score
- **Spam Filter**: Email filtering prioritizing precision (minimize false positives)
- **Credit Scoring**: Risk ranking using ROC-AUC

### Interactive Components

1. **Confusion Matrix Visualization**
   - Visual representation of TP, FP, FN, TN
   - Real-time updates based on threshold
   - Color-coded cells with intensity mapping

2. **Performance Metrics Display**
   - Accuracy, Precision, Recall, F1-Score, Specificity
   - Formula display for each metric
   - Performance interpretation (Excellent/Good/Fair/Poor)
   - Optimal metric highlighting per scenario

3. **ROC Curve & AUC**
   - Interactive ROC curve visualization
   - Area Under Curve (AUC) calculation
   - Current operating point display
   - Comparison with random classifier

4. **Threshold Adjustment**
   - Interactive slider to adjust classification threshold
   - Real-time metric updates
   - Trade-off visualization between precision and recall

5. **Regression Metrics**
   - MAE, RMSE, R² visualization
   - Scatter plot with perfect prediction line
   - Adjustable noise level
   - Residual analysis

6. **Cross-Validation**
   - K-Fold cross-validation simulation
   - Statistical analysis (mean, std dev, range)
   - Confidence interval visualization
   - Adjustable K parameter

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Navigate to the project directory
cd application/compsci713/week3/model-evaluation-dashboard

# Install dependencies
npm install

# Start the development server
npm start
```

The application will open at `http://localhost:3000`

### Building for Production

```bash
# Create optimized production build
npm run build

# The build folder will contain the production-ready files
```

## 📚 Learning Objectives

This application helps students understand:

1. **Why Accuracy Alone is Misleading**
   - Imbalanced dataset problems
   - Context-dependent metric selection

2. **Classification Metrics**
   - Precision: Of predicted positives, how many are correct?
   - Recall: Of actual positives, how many did we find?
   - F1-Score: Harmonic mean of precision and recall
   - Specificity: Of actual negatives, how many correctly identified?

3. **ROC-AUC Analysis**
   - Threshold-independent evaluation
   - Trade-off between TPR and FPR
   - Model comparison

4. **Regression Metrics**
   - MAE: Average absolute error
   - RMSE: Root mean squared error
   - R²: Variance explained

5. **Cross-Validation**
   - Reducing variance in performance estimates
   - Confidence intervals
   - Stratified K-Fold for imbalanced data

## 🎓 Alignment with Course Content

### COMPSCI 713 Topics Covered
- Model evaluation fundamentals
- Classification metrics
- Confusion matrix interpretation
- ROC curve analysis
- Regression metrics
- Cross-validation techniques
- Handling imbalanced datasets

### Related UoA Courses
- COMPSCI 762: Advanced Machine Learning
- COMPSCI 761: Data Mining and Machine Learning

## 🏗️ Technical Stack

- **React 18**: Modern UI framework
- **Recharts**: Data visualization library
- **CSS3**: Custom styling with UoA theme
- **JavaScript ES6+**: Modern JavaScript features

## 📖 Usage Guide

### Scenario Selection
1. Choose a real-world scenario from the top cards
2. Each scenario has different optimal metrics
3. Observe how metrics change based on context

### Threshold Adjustment
1. Use the slider to adjust classification threshold
2. Watch confusion matrix update in real-time
3. Observe trade-offs between precision and recall

### Metric Interpretation
- Green values (≥90%): Excellent performance
- Light green (80-89%): Good performance
- Orange (70-79%): Fair performance
- Red (<70%): Poor performance

### Cross-Validation
1. Adjust K (number of folds) using slider
2. Observe variance in performance across folds
3. Check confidence intervals (Mean ± 2×Std)

## 🎨 UoA Branding

The application follows University of Auckland design guidelines:
- Primary color: #00467F (UoA Blue)
- Clean, professional interface
- Accessible color contrasts
- Responsive design for all devices

## 📝 Key Concepts

### When to Use Each Metric

| Scenario | Optimal Metric | Reason |
|----------|---------------|---------|
| Medical Diagnosis | Recall | Missing disease is catastrophic |
| Spam Filter | Precision | False positives annoy users |
| Fraud Detection | F1-Score | Balance both types of errors |
| Credit Scoring | ROC-AUC | Threshold adjustable by business |

### Confusion Matrix Components

```
                Predicted
             Negative  Positive
Actual Neg      TN        FP     (Type I Error)
Actual Pos      FN        TP     (Type II Error)
```

## 🔧 Customization

### Adding New Scenarios
Edit `src/App.js` and add to the `scenarios` object:

```javascript
newScenario: {
  name: 'Scenario Name',
  description: 'Description',
  totalSamples: 1000,
  positiveRate: 0.1,
  optimalMetric: 'Recall',
  color: '#e74c3c'
}
```

### Modifying Metrics
Update calculations in `src/App.js` `calculateMetrics()` function.

## 📊 Data Generation

All data is synthetically generated for educational purposes:
- Confusion matrices based on threshold and scenario
- ROC curves simulated from performance parameters
- Regression data with adjustable noise
- Cross-validation scores with realistic variance

## 🤝 Contributing

This is an educational project for COMPSCI 713. Suggestions and improvements are welcome!

## 📄 License

Educational use for University of Auckland students.

## 🙏 Acknowledgments

- Based on Basic Lesson 7: Model Evaluation and Performance Metrics
- Inspired by real-world ML applications
- Designed for COMPSCI 713 students

## 📞 Support

For questions or issues:
- Check the course materials (Basic/B07)
- Review the Jupyter notebook
- Consult with course instructors

---

**University of Auckland | COMPSCI 713 | 2024**

import React from 'react';
import './MetricsDisplay.css';

function MetricsDisplay({ metrics, optimalMetric, color }) {
  const { accuracy, precision, recall, f1, specificity } = metrics;

  const metricsList = [
    {
      name: 'Accuracy',
      value: accuracy,
      formula: '(TP + TN) / Total',
      description: 'Overall correctness - can be misleading with imbalanced data'
    },
    {
      name: 'Precision',
      value: precision,
      formula: 'TP / (TP + FP)',
      description: 'Of predicted positives, how many are correct?'
    },
    {
      name: 'Recall',
      value: recall,
      formula: 'TP / (TP + FN)',
      description: 'Of actual positives, how many did we find?'
    },
    {
      name: 'F1-Score',
      value: f1,
      formula: '2 × (P × R) / (P + R)',
      description: 'Harmonic mean of precision and recall'
    },
    {
      name: 'Specificity',
      value: specificity,
      formula: 'TN / (TN + FP)',
      description: 'Of actual negatives, how many correctly identified?'
    }
  ];

  const getPerformanceClass = (value) => {
    if (value >= 0.9) return 'excellent';
    if (value >= 0.8) return 'good';
    if (value >= 0.7) return 'fair';
    return 'poor';
  };

  return (
    <div className="metrics-display card">
      <h2 className="card-title">Performance Metrics</h2>
      <p className="card-subtitle">
        Optimal metric for this scenario: <strong style={{ color }}>{optimalMetric}</strong>
      </p>

      <div className="metrics-grid">
        {metricsList.map((metric) => {
          const isOptimal = metric.name === optimalMetric || 
                           (optimalMetric === 'ROC-AUC' && metric.name === 'Recall');
          
          return (
            <div 
              key={metric.name}
              className={`metric-card ${isOptimal ? 'optimal' : ''} ${getPerformanceClass(metric.value)}`}
              style={isOptimal ? { borderColor: color } : {}}
            >
              <div className="metric-header">
                <span className="metric-name">{metric.name}</span>
                {isOptimal && <span className="optimal-badge">OPTIMAL</span>}
              </div>
              
              <div className="metric-value">
                {(metric.value * 100).toFixed(2)}%
              </div>
              
              <div className="metric-bar">
                <div 
                  className="metric-bar-fill"
                  style={{ 
                    width: `${metric.value * 100}%`,
                    backgroundColor: isOptimal ? color : '#3498db'
                  }}
                />
              </div>
              
              <div className="metric-formula">{metric.formula}</div>
              <div className="metric-description">{metric.description}</div>
            </div>
          );
        })}
      </div>

      <div className="metrics-interpretation">
        <h3>Interpretation Guide</h3>
        <div className="interpretation-grid">
          <div className="interpretation-item excellent">
            <span className="interpretation-label">Excellent</span>
            <span className="interpretation-range">≥ 90%</span>
          </div>
          <div className="interpretation-item good">
            <span className="interpretation-label">Good</span>
            <span className="interpretation-range">80-89%</span>
          </div>
          <div className="interpretation-item fair">
            <span className="interpretation-label">Fair</span>
            <span className="interpretation-range">70-79%</span>
          </div>
          <div className="interpretation-item poor">
            <span className="interpretation-label">Poor</span>
            <span className="interpretation-range">&lt; 70%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MetricsDisplay;

import React from 'react';
import './ConfusionMatrix.css';

function ConfusionMatrix({ matrix, color }) {
  const { TP, FP, FN, TN } = matrix;
  const total = TP + FP + FN + TN;

  const getIntensity = (value) => {
    const max = Math.max(TP, FP, FN, TN);
    return value / max;
  };

  return (
    <div className="confusion-matrix card">
      <h2 className="card-title">Confusion Matrix</h2>
      <p className="card-subtitle">
        Foundation of all classification metrics - shows actual vs predicted classes
      </p>

      <div className="matrix-container">
        <div className="matrix-labels">
          <div className="label-vertical">
            <span>Actual</span>
          </div>
          <div className="label-horizontal">
            <span>Predicted</span>
          </div>
        </div>

        <div className="matrix-grid">
          <div className="matrix-headers">
            <div className="header-cell"></div>
            <div className="header-cell">Negative</div>
            <div className="header-cell">Positive</div>
          </div>

          <div className="matrix-row">
            <div className="header-cell">Negative</div>
            <div 
              className="matrix-cell tn"
              style={{ 
                backgroundColor: `rgba(46, 204, 113, ${getIntensity(TN) * 0.7 + 0.3})`
              }}
            >
              <div className="cell-label">TN</div>
              <div className="cell-value">{TN.toLocaleString()}</div>
              <div className="cell-description">True Negative</div>
            </div>
            <div 
              className="matrix-cell fp"
              style={{ 
                backgroundColor: `rgba(231, 76, 60, ${getIntensity(FP) * 0.7 + 0.3})`
              }}
            >
              <div className="cell-label">FP</div>
              <div className="cell-value">{FP.toLocaleString()}</div>
              <div className="cell-description">False Positive</div>
              <div className="cell-error">Type I Error</div>
            </div>
          </div>

          <div className="matrix-row">
            <div className="header-cell">Positive</div>
            <div 
              className="matrix-cell fn"
              style={{ 
                backgroundColor: `rgba(230, 126, 34, ${getIntensity(FN) * 0.7 + 0.3})`
              }}
            >
              <div className="cell-label">FN</div>
              <div className="cell-value">{FN.toLocaleString()}</div>
              <div className="cell-description">False Negative</div>
              <div className="cell-error">Type II Error</div>
            </div>
            <div 
              className="matrix-cell tp"
              style={{ 
                backgroundColor: `rgba(52, 152, 219, ${getIntensity(TP) * 0.7 + 0.3})`
              }}
            >
              <div className="cell-label">TP</div>
              <div className="cell-value">{TP.toLocaleString()}</div>
              <div className="cell-description">True Positive</div>
            </div>
          </div>
        </div>

        <div className="matrix-summary">
          <div className="summary-item">
            <span className="summary-label">Total Samples:</span>
            <span className="summary-value">{total.toLocaleString()}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Correct Predictions:</span>
            <span className="summary-value">{(TP + TN).toLocaleString()}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Errors:</span>
            <span className="summary-value">{(FP + FN).toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfusionMatrix;

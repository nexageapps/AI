import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import './CrossValidation.css';

function CrossValidation() {
  const [kFolds, setKFolds] = useState(5);

  // Generate cross-validation scores
  const generateCVScores = () => {
    const scores = [];
    const baseScore = 0.85;
    
    for (let i = 1; i <= kFolds; i++) {
      const variance = (Math.random() - 0.5) * 0.1;
      const accuracy = Math.max(0.7, Math.min(0.95, baseScore + variance));
      const f1 = Math.max(0.65, Math.min(0.92, baseScore + variance - 0.03));
      
      scores.push({
        fold: `Fold ${i}`,
        accuracy: parseFloat((accuracy * 100).toFixed(2)),
        f1: parseFloat((f1 * 100).toFixed(2))
      });
    }
    
    return scores;
  };

  const cvScores = generateCVScores();

  // Calculate statistics
  const calculateStats = (metric) => {
    const values = cvScores.map(s => s[metric]);
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    const variance = values.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / values.length;
    const std = Math.sqrt(variance);
    
    return { mean, std, min: Math.min(...values), max: Math.max(...values) };
  };

  const accuracyStats = calculateStats('accuracy');
  const f1Stats = calculateStats('f1');

  return (
    <div className="cross-validation card">
      <h2 className="card-title">Cross-Validation</h2>
      <p className="card-subtitle">
        K-Fold cross-validation provides confidence intervals for model performance
      </p>

      <div className="cv-controls">
        <label>
          <span>Number of Folds (K): {kFolds}</span>
          <input
            type="range"
            min="3"
            max="10"
            value={kFolds}
            onChange={(e) => setKFolds(parseInt(e.target.value))}
            className="k-slider"
          />
        </label>
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={cvScores} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis dataKey="fold" tick={{ fontSize: 12 }} />
          <YAxis 
            domain={[0, 100]} 
            label={{ value: 'Score (%)', angle: -90, position: 'insideLeft' }}
            tick={{ fontSize: 12 }}
          />
          <Tooltip />
          <Legend />
          
          <ReferenceLine 
            y={accuracyStats.mean} 
            stroke="#3498db" 
            strokeDasharray="3 3" 
            label="Mean"
          />
          
          <Bar dataKey="accuracy" fill="#3498db" name="Accuracy" />
          <Bar dataKey="f1" fill="#9b59b6" name="F1-Score" />
        </BarChart>
      </ResponsiveContainer>

      <div className="cv-stats">
        <div className="stat-section">
          <h4>Accuracy Statistics</h4>
          <div className="stat-grid">
            <div className="stat-item">
              <span className="stat-label">Mean:</span>
              <span className="stat-value">{accuracyStats.mean.toFixed(2)}%</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Std Dev:</span>
              <span className="stat-value">±{accuracyStats.std.toFixed(2)}%</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Range:</span>
              <span className="stat-value">
                {accuracyStats.min.toFixed(2)}% - {accuracyStats.max.toFixed(2)}%
              </span>
            </div>
          </div>
        </div>

        <div className="stat-section">
          <h4>F1-Score Statistics</h4>
          <div className="stat-grid">
            <div className="stat-item">
              <span className="stat-label">Mean:</span>
              <span className="stat-value">{f1Stats.mean.toFixed(2)}%</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Std Dev:</span>
              <span className="stat-value">±{f1Stats.std.toFixed(2)}%</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Range:</span>
              <span className="stat-value">
                {f1Stats.min.toFixed(2)}% - {f1Stats.max.toFixed(2)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="cv-explanation">
        <h4>Why Cross-Validation?</h4>
        <div className="explanation-list">
          <div className="explanation-point">
            <span className="point-icon">📊</span>
            <div>
              <strong>Reduces Variance:</strong> Single train-test split can be misleading
            </div>
          </div>
          <div className="explanation-point">
            <span className="point-icon">🎯</span>
            <div>
              <strong>Better Estimates:</strong> Uses all data for both training and testing
            </div>
          </div>
          <div className="explanation-point">
            <span className="point-icon">📈</span>
            <div>
              <strong>Confidence Intervals:</strong> Mean ± 2×Std gives 95% confidence
            </div>
          </div>
          <div className="explanation-point">
            <span className="point-icon">⚖️</span>
            <div>
              <strong>Stratified K-Fold:</strong> Maintains class distribution in each fold
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CrossValidation;

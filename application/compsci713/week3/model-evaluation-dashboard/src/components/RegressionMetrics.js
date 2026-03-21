import React, { useState } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, Legend } from 'recharts';
import './RegressionMetrics.css';

function RegressionMetrics() {
  const [noiseLevel, setNoiseLevel] = useState(10);

  // Generate synthetic regression data
  const generateData = () => {
    const data = [];
    for (let i = 0; i < 50; i++) {
      const actual = i * 2 + 10;
      const noise = (Math.random() - 0.5) * noiseLevel * 2;
      const predicted = actual + noise;
      data.push({ actual, predicted });
    }
    return data;
  };

  const data = generateData();

  // Calculate regression metrics
  const calculateMetrics = () => {
    const n = data.length;
    let sumAE = 0;
    let sumSE = 0;
    let sumActual = 0;
    
    data.forEach(({ actual, predicted }) => {
      sumAE += Math.abs(actual - predicted);
      sumSE += Math.pow(actual - predicted, 2);
      sumActual += actual;
    });

    const mae = sumAE / n;
    const mse = sumSE / n;
    const rmse = Math.sqrt(mse);
    
    const meanActual = sumActual / n;
    let ssTot = 0;
    data.forEach(({ actual }) => {
      ssTot += Math.pow(actual - meanActual, 2);
    });
    
    const r2 = 1 - (sumSE / ssTot);

    return { mae, mse, rmse, r2 };
  };

  const metrics = calculateMetrics();

  // Perfect prediction line
  const minVal = Math.min(...data.map(d => d.actual));
  const maxVal = Math.max(...data.map(d => d.actual));
  const perfectLine = [
    { actual: minVal, predicted: minVal },
    { actual: maxVal, predicted: maxVal }
  ];

  return (
    <div className="regression-metrics card">
      <h2 className="card-title">Regression Metrics</h2>
      <p className="card-subtitle">
        Metrics for evaluating continuous predictions
      </p>

      <div className="noise-control">
        <label>
          <span>Prediction Noise Level: {noiseLevel}</span>
          <input
            type="range"
            min="1"
            max="30"
            value={noiseLevel}
            onChange={(e) => setNoiseLevel(parseInt(e.target.value))}
            className="noise-slider"
          />
        </label>
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <ScatterChart margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis 
            dataKey="actual" 
            name="Actual" 
            label={{ value: 'Actual Values', position: 'insideBottom', offset: -5 }}
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            dataKey="predicted" 
            name="Predicted"
            label={{ value: 'Predicted Values', angle: -90, position: 'insideLeft' }}
            tick={{ fontSize: 12 }}
          />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Legend />
          
          {/* Perfect prediction line */}
          <Line 
            data={perfectLine}
            type="monotone"
            dataKey="predicted"
            stroke="#e74c3c"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={false}
            name="Perfect Prediction"
          />
          
          {/* Actual predictions */}
          <Scatter 
            data={data}
            fill="#3498db" 
            name="Predictions"
          />
        </ScatterChart>
      </ResponsiveContainer>

      <div className="regression-metrics-grid">
        <div className="regression-metric">
          <div className="regression-metric-name">MAE</div>
          <div className="regression-metric-value">{metrics.mae.toFixed(2)}</div>
          <div className="regression-metric-formula">Mean Absolute Error</div>
          <div className="regression-metric-desc">Average absolute difference</div>
        </div>

        <div className="regression-metric">
          <div className="regression-metric-name">RMSE</div>
          <div className="regression-metric-value">{metrics.rmse.toFixed(2)}</div>
          <div className="regression-metric-formula">Root Mean Squared Error</div>
          <div className="regression-metric-desc">Standard deviation of errors</div>
        </div>

        <div className="regression-metric">
          <div className="regression-metric-name">R²</div>
          <div className="regression-metric-value">{metrics.r2.toFixed(4)}</div>
          <div className="regression-metric-formula">Coefficient of Determination</div>
          <div className="regression-metric-desc">Variance explained: {(metrics.r2 * 100).toFixed(1)}%</div>
        </div>
      </div>

      <div className="regression-explanation">
        <h4>Regression Metrics Guide</h4>
        <div className="explanation-grid">
          <div className="explanation-item">
            <strong>MAE:</strong> Same units as target, robust to outliers
          </div>
          <div className="explanation-item">
            <strong>RMSE:</strong> Penalizes large errors more heavily
          </div>
          <div className="explanation-item">
            <strong>R²:</strong> 1.0 = perfect, 0.0 = as good as mean
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegressionMetrics;

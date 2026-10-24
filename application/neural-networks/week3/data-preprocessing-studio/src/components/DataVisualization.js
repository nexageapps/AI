import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

/**
 * Distribution visualization for numerical columns
 */
export function DistributionChart({ data, column, title }) {
  if (!data || data.length === 0 || !column) return null;
  
  const values = data
    .map(row => row[column])
    .filter(val => val !== null && val !== undefined && !isNaN(val));
  
  if (values.length === 0) return null;
  
  // Create histogram bins
  const min = Math.min(...values);
  const max = Math.max(...values);
  const binCount = Math.min(20, Math.ceil(Math.sqrt(values.length)));
  const binSize = (max - min) / binCount;
  
  const bins = Array(binCount).fill(0).map((_, i) => ({
    range: `${(min + i * binSize).toFixed(1)}-${(min + (i + 1) * binSize).toFixed(1)}`,
    count: 0,
    binStart: min + i * binSize
  }));
  
  values.forEach(val => {
    const binIndex = Math.min(Math.floor((val - min) / binSize), binCount - 1);
    bins[binIndex].count++;
  });
  
  return (
    <div className="chart-container">
      <h4>{title || `Distribution of ${column}`}</h4>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={bins} margin={{ top: 5, right: 30, left: 20, bottom: 60 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="range" 
            angle={-45} 
            textAnchor="end" 
            height={100}
            interval={0}
            tick={{ fontSize: 11 }}
          />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#00467F" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

/**
 * Comparison chart for before/after preprocessing
 */
export function ComparisonChart({ originalData, processedData, column }) {
  if (!originalData || !processedData || !column) return null;
  
  const getStats = (data) => {
    const values = data
      .map(row => row[column])
      .filter(val => val !== null && val !== undefined && !isNaN(val));
    
    if (values.length === 0) return null;
    
    const sorted = [...values].sort((a, b) => a - b);
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    
    return {
      mean: mean.toFixed(2),
      median: sorted[Math.floor(sorted.length / 2)].toFixed(2),
      min: Math.min(...values).toFixed(2),
      max: Math.max(...values).toFixed(2)
    };
  };
  
  const originalStats = getStats(originalData);
  const processedStats = getStats(processedData);
  
  if (!originalStats || !processedStats) return null;
  
  const comparisonData = [
    { metric: 'Mean', Original: parseFloat(originalStats.mean), Processed: parseFloat(processedStats.mean) },
    { metric: 'Median', Original: parseFloat(originalStats.median), Processed: parseFloat(processedStats.median) },
    { metric: 'Min', Original: parseFloat(originalStats.min), Processed: parseFloat(processedStats.min) },
    { metric: 'Max', Original: parseFloat(originalStats.max), Processed: parseFloat(processedStats.max) }
  ];
  
  return (
    <div className="chart-container">
      <h4>Before vs After: {column}</h4>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={comparisonData} margin={{ top: 5, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="metric" tick={{ fontSize: 12 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Original" fill="#f44336" />
          <Bar dataKey="Processed" fill="#4caf50" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

/**
 * Correlation heatmap visualization
 */
export function CorrelationMatrix({ data, columns }) {
  if (!data || data.length === 0 || !columns || columns.length < 2) return null;
  
  const numericalColumns = columns.filter(col => 
    typeof data[0]?.[col] === 'number'
  );
  
  if (numericalColumns.length < 2) return null;
  
  // Calculate correlation matrix
  const correlations = [];
  numericalColumns.forEach((col1, i) => {
    numericalColumns.forEach((col2, j) => {
      if (i <= j) {
        const corr = calculateCorrelation(data, col1, col2);
        correlations.push({
          col1,
          col2,
          correlation: corr.toFixed(2),
          strength: Math.abs(corr)
        });
      }
    });
  });
  
  return (
    <div className="chart-container">
      <h4>Feature Correlations</h4>
      <div className="correlation-grid">
        {correlations.map((item, idx) => (
          <div 
            key={idx} 
            className="correlation-cell"
            style={{
              background: getCorrelationColor(item.correlation),
              opacity: 0.7 + Math.abs(item.correlation) * 0.3
            }}
          >
            <div className="correlation-label">{item.col1} × {item.col2}</div>
            <div className="correlation-value">{item.correlation}</div>
          </div>
        ))}
      </div>
      <div className="correlation-legend">
        <span>-1 (negative)</span>
        <span>0 (no correlation)</span>
        <span>+1 (positive)</span>
      </div>
    </div>
  );
}

function calculateCorrelation(data, col1, col2) {
  const pairs = data
    .map(row => ({ x: row[col1], y: row[col2] }))
    .filter(pair => 
      pair.x !== null && pair.x !== undefined && !isNaN(pair.x) &&
      pair.y !== null && pair.y !== undefined && !isNaN(pair.y)
    );
  
  if (pairs.length < 2) return 0;
  
  const n = pairs.length;
  const sumX = pairs.reduce((sum, p) => sum + p.x, 0);
  const sumY = pairs.reduce((sum, p) => sum + p.y, 0);
  const sumXY = pairs.reduce((sum, p) => sum + p.x * p.y, 0);
  const sumX2 = pairs.reduce((sum, p) => sum + p.x * p.x, 0);
  const sumY2 = pairs.reduce((sum, p) => sum + p.y * p.y, 0);
  
  const numerator = n * sumXY - sumX * sumY;
  const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));
  
  return denominator === 0 ? 0 : numerator / denominator;
}

function getCorrelationColor(correlation) {
  const value = parseFloat(correlation);
  if (value > 0) {
    return `rgba(76, 175, 80, ${value})`; // Green for positive
  } else {
    return `rgba(244, 67, 54, ${Math.abs(value)})`; // Red for negative
  }
}

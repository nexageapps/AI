import React from 'react';
import { FiCheckCircle, FiAlertTriangle, FiXCircle, FiInfo } from 'react-icons/fi';

/**
 * Data Quality Report Component
 * Provides comprehensive quality assessment of the dataset
 */
export function DataQualityReport({ data, columns }) {
  if (!data || data.length === 0) return null;

  const calculateQualityScore = () => {
    let score = 100;
    const issues = [];

    // Check missing values
    columns.forEach(col => {
      const missing = data.filter(row => 
        row[col] === null || row[col] === undefined || row[col] === ''
      ).length;
      const missingPercent = (missing / data.length) * 100;
      
      if (missingPercent > 50) {
        score -= 15;
        issues.push(`High missing values in ${col} (${missingPercent.toFixed(1)}%)`);
      } else if (missingPercent > 20) {
        score -= 5;
        issues.push(`Moderate missing values in ${col} (${missingPercent.toFixed(1)}%)`);
      }
    });

    // Check data size
    if (data.length < 10) {
      score -= 20;
      issues.push('Very small dataset (< 10 rows)');
    } else if (data.length < 50) {
      score -= 10;
      issues.push('Small dataset (< 50 rows)');
    }

    // Check column count
    if (columns.length < 2) {
      score -= 10;
      issues.push('Too few columns for meaningful analysis');
    }

    return { score: Math.max(0, score), issues };
  };

  const getScoreGrade = (score) => {
    if (score >= 90) return { grade: 'Excellent', class: 'excellent' };
    if (score >= 70) return { grade: 'Good', class: 'good' };
    if (score >= 50) return { grade: 'Fair', class: 'fair' };
    return { grade: 'Poor', class: 'poor' };
  };

  const calculateMetrics = () => {
    const totalCells = data.length * columns.length;
    let missingCells = 0;
    let numericColumns = 0;
    let categoricalColumns = 0;

    columns.forEach(col => {
      const missing = data.filter(row => 
        row[col] === null || row[col] === undefined || row[col] === ''
      ).length;
      missingCells += missing;

      const isNumeric = typeof data[0]?.[col] === 'number';
      if (isNumeric) {
        numericColumns++;
      } else {
        categoricalColumns++;
      }
    });

    const completeness = ((totalCells - missingCells) / totalCells * 100).toFixed(1);
    const uniqueRows = new Set(data.map(row => JSON.stringify(row))).size;
    const duplicates = data.length - uniqueRows;

    return {
      completeness,
      duplicates,
      numericColumns,
      categoricalColumns,
      totalRows: data.length,
      totalColumns: columns.length
    };
  };

  const { score, issues } = calculateQualityScore();
  const { grade, class: scoreClass } = getScoreGrade(score);
  const metrics = calculateMetrics();

  return (
    <div className="quality-report">
      <h3><FiInfo style={{ marginRight: '8px' }} />Data Quality Report</h3>
      
      <div className="quality-score">
        <div className={`score-circle ${scoreClass}`}>
          <div>{score}</div>
          <div className="score-label">{grade}</div>
        </div>
      </div>

      <div className="quality-metrics">
        <div className="quality-metric">
          <div className="metric-label">Completeness</div>
          <div className="metric-value">{metrics.completeness}%</div>
          <span className={`metric-status ${metrics.completeness > 90 ? 'good' : metrics.completeness > 70 ? 'warning' : 'error'}`}>
            {metrics.completeness > 90 ? <FiCheckCircle /> : metrics.completeness > 70 ? <FiAlertTriangle /> : <FiXCircle />}
            {' '}{metrics.completeness > 90 ? 'Excellent' : metrics.completeness > 70 ? 'Good' : 'Needs Work'}
          </span>
        </div>

        <div className="quality-metric">
          <div className="metric-label">Total Rows</div>
          <div className="metric-value">{metrics.totalRows.toLocaleString()}</div>
          <span className={`metric-status ${metrics.totalRows > 100 ? 'good' : metrics.totalRows > 50 ? 'warning' : 'error'}`}>
            {metrics.totalRows > 100 ? 'Sufficient' : metrics.totalRows > 50 ? 'Adequate' : 'Small'}
          </span>
        </div>

        <div className="quality-metric">
          <div className="metric-label">Columns</div>
          <div className="metric-value">{metrics.totalColumns}</div>
          <span className="metric-status good">
            {metrics.numericColumns} numeric, {metrics.categoricalColumns} categorical
          </span>
        </div>

        <div className="quality-metric">
          <div className="metric-label">Duplicates</div>
          <div className="metric-value">{metrics.duplicates}</div>
          <span className={`metric-status ${metrics.duplicates === 0 ? 'good' : metrics.duplicates < 5 ? 'warning' : 'error'}`}>
            {metrics.duplicates === 0 ? 'None found' : `${((metrics.duplicates / metrics.totalRows) * 100).toFixed(1)}% of data`}
          </span>
        </div>
      </div>

      {issues.length > 0 && (
        <div className="quality-issues">
          <h4><FiAlertTriangle style={{ marginRight: '8px' }} />Issues Found</h4>
          <ul>
            {issues.map((issue, index) => (
              <li key={index}>{issue}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="quality-recommendations">
        <h4><FiCheckCircle style={{ marginRight: '8px' }} />Recommendations</h4>
        <ul>
          {metrics.completeness < 90 && (
            <li>Address missing values using appropriate imputation strategies</li>
          )}
          {metrics.duplicates > 0 && (
            <li>Remove or investigate duplicate rows</li>
          )}
          {metrics.totalRows < 100 && (
            <li>Consider collecting more data for better statistical significance</li>
          )}
          {metrics.numericColumns > 0 && (
            <li>Apply feature scaling to numerical columns for better model performance</li>
          )}
          {metrics.categoricalColumns > 0 && (
            <li>Encode categorical variables before model training</li>
          )}
          <li>Always validate preprocessing results before using in production</li>
        </ul>
      </div>
    </div>
  );
}

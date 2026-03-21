import React from 'react';
import { getDataStatistics } from '../utils/statistics';

function DataStatistics({ data, columns }) {
  if (!data || data.length === 0) return null;

  return (
    <div className="statistics-panel">
      <h3>Dataset Statistics</h3>
      <div className="stats-grid">
        {columns.map(col => {
          const stats = getDataStatistics(data, col);
          return (
            <div key={col} className="stat-card">
              <h4>{col}</h4>
              <div className="stat-details">
                <div className="stat-row">
                  <span>Type:</span>
                  <span className="stat-value">{stats.type}</span>
                </div>
                <div className="stat-row">
                  <span>Count:</span>
                  <span className="stat-value">{stats.count}</span>
                </div>
                <div className="stat-row">
                  <span>Missing:</span>
                  <span className="stat-value missing">{stats.missing} ({stats.missingPercent}%)</span>
                </div>
                {stats.type === 'numerical' ? (
                  <>
                    <div className="stat-row">
                      <span>Mean:</span>
                      <span className="stat-value">{stats.mean}</span>
                    </div>
                    <div className="stat-row">
                      <span>Median:</span>
                      <span className="stat-value">{stats.median}</span>
                    </div>
                    <div className="stat-row">
                      <span>Std Dev:</span>
                      <span className="stat-value">{stats.std}</span>
                    </div>
                    <div className="stat-row">
                      <span>Range:</span>
                      <span className="stat-value">{stats.min} - {stats.max}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="stat-row">
                      <span>Unique:</span>
                      <span className="stat-value">{stats.unique}</span>
                    </div>
                    <div className="stat-row">
                      <span>Mode:</span>
                      <span className="stat-value">{stats.mode}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DataStatistics;

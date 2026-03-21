import React, { useState } from 'react';
import { imputeMissingValues, calculateColumnStats, exportToCSV } from '../utils/dataProcessing';
import { DistributionChart, ComparisonChart } from './DataVisualization';
import { FiDownload, FiRefreshCw, FiCheckCircle, FiAlertCircle, FiBook } from 'react-icons/fi';

export function EnhancedMissingValuesTab({ data, setData, originalData, columns }) {
  const [selectedColumn, setSelectedColumn] = useState('');
  const [strategy, setStrategy] = useState('mean');
  const [customValue, setCustomValue] = useState('');
  const [showVisualization, setShowVisualization] = useState(false);

  const getMissingStats = () => {
    const stats = {};
    columns.forEach(col => {
      const missing = data.filter(row => 
        row[col] === null || row[col] === undefined || row[col] === ''
      ).length;
      const percentage = ((missing / data.length) * 100).toFixed(2);
      const columnStats = calculateColumnStats(data, col);
      
      stats[col] = { 
        missing, 
        percentage,
        ...columnStats
      };
    });
    return stats;
  };

  const handleImputation = () => {
    if (!selectedColumn) return;
    
    const options = strategy === 'custom' ? { customValue: parseFloat(customValue) || 0 } : {};
    const newData = imputeMissingValues(data, selectedColumn, strategy, options);
    setData(newData);
    setShowVisualization(true);
  };

  const resetData = () => {
    setData(JSON.parse(JSON.stringify(originalData)));
    setShowVisualization(false);
  };

  const handleExport = () => {
    exportToCSV(data, 'preprocessed_data.csv');
  };

  const missingStats = getMissingStats();
  const hasMissingValues = Object.values(missingStats).some(stat => stat.missing > 0);

  return (
    <div className="content-grid">
      <div className="panel">
        <div className="panel-header">
          <h3><FiCheckCircle className="panel-icon" /> Data Overview</h3>
          <button className="export-button" onClick={handleExport} title="Export to CSV">
            <FiDownload /> Export
          </button>
        </div>
        
        {!hasMissingValues && (
          <div className="success-message">
            <FiCheckCircle /> Great! No missing values detected in your dataset.
          </div>
        )}
        
        <div className="data-table">
          <table>
            <thead>
              <tr>
                {columns.map(col => <th key={col}>{col}</th>)}
              </tr>
            </thead>
            <tbody>
              {data.slice(0, 10).map((row, idx) => (
                <tr key={idx}>
                  {columns.map(col => (
                    <td key={col} className={row[col] === null || row[col] === undefined || row[col] === '' ? 'missing-cell' : ''}>
                      {row[col] === null || row[col] === undefined || row[col] === '' ? 
                        <span className="missing-indicator">NULL</span> : 
                        typeof row[col] === 'number' ? row[col].toFixed(2) : row[col]
                      }
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="stats-grid">
          {Object.entries(missingStats).map(([col, stats]) => (
            <div key={col} className={`stat-card ${stats.missing > 0 ? 'has-missing' : ''}`}>
              <h4>{col}</h4>
              <div className="stat-value">
                {stats.missing} missing ({stats.percentage}%)
              </div>
              {stats.mean && (
                <div className="stat-details">
                  <small>Mean: {stats.mean} | Median: {stats.median}</small>
                </div>
              )}
            </div>
          ))}
        </div>

        {showVisualization && selectedColumn && (
          <>
            <DistributionChart 
              data={data} 
              column={selectedColumn} 
              title={`Distribution after imputation: ${selectedColumn}`}
            />
            <ComparisonChart 
              originalData={originalData}
              processedData={data}
              column={selectedColumn}
            />
          </>
        )}
      </div>

      <div className="panel">
        <h3><FiRefreshCw className="panel-icon" /> Imputation Controls</h3>
        <div className="controls">
          <div className="control-group">
            <label>Select Column</label>
            <select value={selectedColumn} onChange={(e) => setSelectedColumn(e.target.value)}>
              <option value="">Choose a column...</option>
              {columns.map(col => (
                <option key={col} value={col}>
                  {col} ({missingStats[col]?.missing || 0} missing)
                </option>
              ))}
            </select>
          </div>

          <div className="control-group">
            <label>Imputation Strategy</label>
            <select value={strategy} onChange={(e) => setStrategy(e.target.value)}>
              <option value="mean">Mean (Average)</option>
              <option value="median">Median (Middle value)</option>
              <option value="mode">Mode (Most frequent)</option>
              <option value="forward">Forward Fill</option>
              <option value="backward">Backward Fill</option>
              <option value="zero">Zero Fill</option>
              <option value="custom">Custom Value</option>
            </select>
          </div>

          {strategy === 'custom' && (
            <div className="control-group">
              <label>Custom Value</label>
              <input 
                type="number" 
                value={customValue}
                onChange={(e) => setCustomValue(e.target.value)}
                placeholder="Enter value..."
              />
            </div>
          )}

          <div className="button-group">
            <button 
              className="action-button primary" 
              onClick={handleImputation} 
              disabled={!selectedColumn}
            >
              Apply Imputation
            </button>
            <button 
              className="action-button secondary" 
              onClick={resetData}
            >
              Reset to Original
            </button>
          </div>
        </div>

        <div className="info-box educational">
          <h4><FiBook className="panel-icon" /> Understanding Missing Values</h4>
          
          <div className="concept-section">
            <strong>What are Missing Values?</strong>
            <p>Data points that are absent from your dataset (NULL, NaN, empty cells).</p>
          </div>
          
          <div className="concept-section">
            <strong>Types of Missing Data:</strong>
            <ul>
              <li><strong>MCAR</strong> (Missing Completely At Random): No pattern, random occurrence</li>
              <li><strong>MAR</strong> (Missing At Random): Related to other observed variables</li>
              <li><strong>MNAR</strong> (Missing Not At Random): Related to the missing value itself</li>
            </ul>
          </div>
          
          <div className="strategy-grid">
            <div className="strategy-card">
              <strong>Mean</strong>
              <p>Best for: Normal distributions without outliers</p>
              <code>Example: [25, 30, NULL, 40] → 31.67</code>
            </div>
            
            <div className="strategy-card">
              <strong>Median</strong>
              <p>Best for: Skewed data or with outliers</p>
              <code>Example: [50k, 60k, NULL, 200k] → 60k</code>
            </div>
            
            <div className="strategy-card">
              <strong>Mode</strong>
              <p>Best for: Categorical data</p>
              <code>Example: [IT, HR, NULL, IT] → IT</code>
            </div>
            
            <div className="strategy-card">
              <strong>Forward/Backward Fill</strong>
              <p>Best for: Time series data</p>
              <code>Uses previous/next valid value</code>
            </div>
          </div>
          
          <div className="warning-box">
            <FiAlertCircle style={{ marginRight: '5px' }} />
            <strong>Important:</strong> Always analyze WHY data is missing before choosing a strategy. The best method depends on your specific dataset and problem domain.
          </div>
        </div>
      </div>
    </div>
  );
}

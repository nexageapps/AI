import React, { useState } from 'react';
import './App.css';
import Papa from 'papaparse';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter } from 'recharts';

function App() {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [activeTab, setActiveTab] = useState('upload');
  const [columns, setColumns] = useState([]);

  // Sample dataset
  const loadSampleData = () => {
    const sampleData = [
      { age: 25, salary: 50000, experience: 2, department: 'IT', performance: 85 },
      { age: 30, salary: 60000, experience: 5, department: 'HR', performance: 90 },
      { age: null, salary: 55000, experience: 3, department: 'IT', performance: 88 },
      { age: 35, salary: null, experience: 7, department: 'Finance', performance: 92 },
      { age: 40, salary: 70000, experience: 10, department: 'IT', performance: 95 },
      { age: 28, salary: 65000, experience: null, department: 'HR', performance: 87 },
      { age: 45, salary: 75000, experience: 12, department: 'Finance', performance: 93 },
      { age: 32, salary: 58000, experience: 6, department: 'IT', performance: 89 },
      { age: 38, salary: 68000, experience: 9, department: null, performance: 91 },
      { age: 29, salary: 62000, experience: 4, department: 'HR', performance: 86 }
    ];
    setData(sampleData);
    setOriginalData(JSON.parse(JSON.stringify(sampleData)));
    setColumns(Object.keys(sampleData[0]));
    setActiveTab('missing');
  };

  // File upload handler
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        complete: (results) => {
          setData(results.data.filter(row => Object.values(row).some(val => val !== null && val !== '')));
          setOriginalData(JSON.parse(JSON.stringify(results.data.filter(row => Object.values(row).some(val => val !== null && val !== '')))));
          setColumns(Object.keys(results.data[0]));
          setActiveTab('missing');
        }
      });
    }
  };

  return (
    <div className="app">
      <div className="header">
        <h1>UoA COMPSCI 714 - Data Preprocessing Studio</h1>
        <p>Week 3: Interactive Data Preprocessing and Feature Engineering</p>
      </div>

      <div className="container">
        <div className="tabs">
          <button className={`tab ${activeTab === 'upload' ? 'active' : ''}`} onClick={() => setActiveTab('upload')}>
            Upload Data
          </button>
          <button className={`tab ${activeTab === 'missing' ? 'active' : ''}`} onClick={() => setActiveTab('missing')} disabled={data.length === 0}>
            Missing Values
          </button>
          <button className={`tab ${activeTab === 'scaling' ? 'active' : ''}`} onClick={() => setActiveTab('scaling')} disabled={data.length === 0}>
            Feature Scaling
          </button>
          <button className={`tab ${activeTab === 'encoding' ? 'active' : ''}`} onClick={() => setActiveTab('encoding')} disabled={data.length === 0}>
            Encoding
          </button>
          <button className={`tab ${activeTab === 'engineering' ? 'active' : ''}`} onClick={() => setActiveTab('engineering')} disabled={data.length === 0}>
            Feature Engineering
          </button>
        </div>

        {activeTab === 'upload' && <UploadTab onFileUpload={handleFileUpload} onLoadSample={loadSampleData} />}
        {activeTab === 'missing' && <MissingValuesTab data={data} setData={setData} originalData={originalData} columns={columns} />}
        {activeTab === 'scaling' && <ScalingTab data={data} setData={setData} originalData={originalData} columns={columns} />}
        {activeTab === 'encoding' && <EncodingTab data={data} setData={setData} originalData={originalData} columns={columns} />}
        {activeTab === 'engineering' && <EngineeringTab data={data} setData={setData} columns={columns} setColumns={setColumns} />}
      </div>
    </div>
  );
}

// Upload Tab Component
function UploadTab({ onFileUpload, onLoadSample }) {
  return (
    <div className="upload-section">
      <h2>Upload Your Dataset</h2>
      <p style={{ marginBottom: '20px', color: '#666' }}>Upload a CSV file or use sample data to get started</p>
      <input type="file" id="file-upload" accept=".csv" onChange={onFileUpload} />
      <label htmlFor="file-upload">
        <button className="upload-button" onClick={() => document.getElementById('file-upload').click()}>
          Choose CSV File
        </button>
      </label>
      <button className="sample-data-button" onClick={onLoadSample}>
        Use Sample Data
      </button>
    </div>
  );
}

// Missing Values Tab Component
function MissingValuesTab({ data, setData, originalData, columns }) {
  const [selectedColumn, setSelectedColumn] = useState('');
  const [strategy, setStrategy] = useState('mean');

  const getMissingStats = () => {
    const stats = {};
    columns.forEach(col => {
      const missing = data.filter(row => row[col] === null || row[col] === undefined || row[col] === '').length;
      stats[col] = { missing, percentage: ((missing / data.length) * 100).toFixed(2) };
    });
    return stats;
  };

  const handleImputation = () => {
    if (!selectedColumn) return;

    const newData = [...data];
    const values = newData.map(row => row[selectedColumn]).filter(val => val !== null && val !== undefined && val !== '');

    newData.forEach(row => {
      if (row[selectedColumn] === null || row[selectedColumn] === undefined || row[selectedColumn] === '') {
        if (strategy === 'mean') {
          const sum = values.reduce((a, b) => a + b, 0);
          row[selectedColumn] = sum / values.length;
        } else if (strategy === 'median') {
          const sorted = [...values].sort((a, b) => a - b);
          row[selectedColumn] = sorted[Math.floor(sorted.length / 2)];
        } else if (strategy === 'mode') {
          const frequency = {};
          values.forEach(val => frequency[val] = (frequency[val] || 0) + 1);
          row[selectedColumn] = Object.keys(frequency).reduce((a, b) => frequency[a] > frequency[b] ? a : b);
        } else if (strategy === 'zero') {
          row[selectedColumn] = 0;
        }
      }
    });

    setData(newData);
  };

  const resetData = () => {
    setData(JSON.parse(JSON.stringify(originalData)));
  };

  const missingStats = getMissingStats();

  return (
    <div className="content-grid">
      <div className="panel">
        <h3>Data Preview</h3>
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
                    <td key={col}>
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
            <div key={col} className="stat-card">
              <h4>{col}</h4>
              <p>{stats.missing} missing ({stats.percentage}%)</p>
            </div>
          ))}
        </div>
      </div>

      <div className="panel">
        <h3>Imputation Controls</h3>
        <div className="controls">
          <div className="control-group">
            <h4>Select Column</h4>
            <select value={selectedColumn} onChange={(e) => setSelectedColumn(e.target.value)}>
              <option value="">Choose a column...</option>
              {columns.map(col => (
                <option key={col} value={col}>{col}</option>
              ))}
            </select>
          </div>

          <div className="control-group">
            <h4>Imputation Strategy</h4>
            <select value={strategy} onChange={(e) => setStrategy(e.target.value)}>
              <option value="mean">Mean (Average)</option>
              <option value="median">Median (Middle value)</option>
              <option value="mode">Mode (Most frequent)</option>
              <option value="zero">Zero Fill</option>
            </select>
          </div>

          <button className="action-button" onClick={handleImputation} disabled={!selectedColumn}>
            Apply Imputation
          </button>
          <button className="action-button" onClick={resetData} style={{ background: '#f44336' }}>
            Reset to Original
          </button>
        </div>

        <div className="info-box">
          <h4>About Missing Values</h4>
          <p><strong>Mean:</strong> Best for normally distributed numerical data</p>
          <p><strong>Median:</strong> Better when data has outliers</p>
          <p><strong>Mode:</strong> Use for categorical data</p>
          <p><strong>Zero Fill:</strong> When zero is a meaningful value</p>
        </div>
      </div>
    </div>
  );
}

// Scaling Tab Component
function ScalingTab({ data, setData, originalData, columns }) {
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [scalingMethod, setScalingMethod] = useState('standardization');

  const numericalColumns = columns.filter(col => 
    typeof data[0]?.[col] === 'number'
  );

  const handleScaling = () => {
    if (selectedColumns.length === 0) return;

    const newData = [...data];

    selectedColumns.forEach(col => {
      const values = newData.map(row => row[col]).filter(val => val !== null && val !== undefined);
      
      if (scalingMethod === 'standardization') {
        const mean = values.reduce((a, b) => a + b, 0) / values.length;
        const std = Math.sqrt(values.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / values.length);
        newData.forEach(row => {
          if (row[col] !== null && row[col] !== undefined) {
            row[col] = (row[col] - mean) / (std || 1);
          }
        });
      } else if (scalingMethod === 'normalization') {
        const min = Math.min(...values);
        const max = Math.max(...values);
        newData.forEach(row => {
          if (row[col] !== null && row[col] !== undefined) {
            row[col] = (row[col] - min) / (max - min || 1);
          }
        });
      }
    });

    setData(newData);
  };

  const resetData = () => {
    setData(JSON.parse(JSON.stringify(originalData)));
  };

  const toggleColumn = (col) => {
    setSelectedColumns(prev => 
      prev.includes(col) ? prev.filter(c => c !== col) : [...prev, col]
    );
  };

  return (
    <div className="content-grid">
      <div className="panel">
        <h3>Scaled Data Preview</h3>
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
                    <td key={col}>
                      {row[col] === null || row[col] === undefined ? 
                        <span className="missing-indicator">NULL</span> : 
                        typeof row[col] === 'number' ? row[col].toFixed(4) : row[col]
                      }
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="panel">
        <h3>Scaling Controls</h3>
        <div className="controls">
          <div className="control-group">
            <h4>Select Numerical Columns</h4>
            <div className="checkbox-group">
              {numericalColumns.map(col => (
                <label key={col}>
                  <input 
                    type="checkbox" 
                    checked={selectedColumns.includes(col)}
                    onChange={() => toggleColumn(col)}
                  />
                  {col}
                </label>
              ))}
            </div>
          </div>

          <div className="control-group">
            <h4>Scaling Method</h4>
            <select value={scalingMethod} onChange={(e) => setScalingMethod(e.target.value)}>
              <option value="standardization">Standardization (Z-score)</option>
              <option value="normalization">Normalization (Min-Max)</option>
            </select>
          </div>

          <button className="action-button" onClick={handleScaling} disabled={selectedColumns.length === 0}>
            Apply Scaling
          </button>
          <button className="action-button" onClick={resetData} style={{ background: '#f44336' }}>
            Reset to Original
          </button>
        </div>

        <div className="info-box">
          <h4>Scaling Formulas</h4>
          <p><strong>Standardization:</strong></p>
          <div className="formula">z = (x - μ) / σ</div>
          <p>Result: mean = 0, std = 1</p>
          
          <p style={{ marginTop: '15px' }}><strong>Normalization:</strong></p>
          <div className="formula">x' = (x - min) / (max - min)</div>
          <p>Result: range [0, 1]</p>
        </div>
      </div>
    </div>
  );
}

// Encoding Tab Component
function EncodingTab({ data, setData, originalData, columns }) {
  const [selectedColumn, setSelectedColumn] = useState('');
  const [encodingMethod, setEncodingMethod] = useState('label');

  const categoricalColumns = columns.filter(col => 
    typeof data[0]?.[col] === 'string'
  );

  const handleEncoding = () => {
    if (!selectedColumn) return;

    const newData = [...data];
    const uniqueValues = [...new Set(newData.map(row => row[selectedColumn]).filter(val => val !== null && val !== undefined))];

    if (encodingMethod === 'label') {
      const mapping = {};
      uniqueValues.forEach((val, idx) => mapping[val] = idx);
      
      newData.forEach(row => {
        if (row[selectedColumn] !== null && row[selectedColumn] !== undefined) {
          row[selectedColumn + '_encoded'] = mapping[row[selectedColumn]];
        }
      });
    } else if (encodingMethod === 'onehot') {
      uniqueValues.forEach(val => {
        newData.forEach(row => {
          row[`${selectedColumn}_${val}`] = row[selectedColumn] === val ? 1 : 0;
        });
      });
    }

    setData(newData);
  };

  const resetData = () => {
    setData(JSON.parse(JSON.stringify(originalData)));
  };

  return (
    <div className="content-grid">
      <div className="panel">
        <h3>Encoded Data Preview</h3>
        <div className="data-table">
          <table>
            <thead>
              <tr>
                {Object.keys(data[0] || {}).map(col => <th key={col}>{col}</th>)}
              </tr>
            </thead>
            <tbody>
              {data.slice(0, 10).map((row, idx) => (
                <tr key={idx}>
                  {Object.keys(data[0] || {}).map(col => (
                    <td key={col}>
                      {row[col] === null || row[col] === undefined ? 
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
      </div>

      <div className="panel">
        <h3>Encoding Controls</h3>
        <div className="controls">
          <div className="control-group">
            <h4>Select Categorical Column</h4>
            <select value={selectedColumn} onChange={(e) => setSelectedColumn(e.target.value)}>
              <option value="">Choose a column...</option>
              {categoricalColumns.map(col => (
                <option key={col} value={col}>{col}</option>
              ))}
            </select>
          </div>

          <div className="control-group">
            <h4>Encoding Method</h4>
            <select value={encodingMethod} onChange={(e) => setEncodingMethod(e.target.value)}>
              <option value="label">Label Encoding</option>
              <option value="onehot">One-Hot Encoding</option>
            </select>
          </div>

          <button className="action-button" onClick={handleEncoding} disabled={!selectedColumn}>
            Apply Encoding
          </button>
          <button className="action-button" onClick={resetData} style={{ background: '#f44336' }}>
            Reset to Original
          </button>
        </div>

        <div className="info-box">
          <h4>Encoding Methods</h4>
          <p><strong>Label Encoding:</strong> Converts categories to integers (0, 1, 2...)</p>
          <p>Warning: Implies ordering - use for ordinal data</p>
          
          <p style={{ marginTop: '15px' }}><strong>One-Hot Encoding:</strong> Creates binary columns for each category</p>
          <p>Best: No ordering implied - use for nominal data</p>
        </div>
      </div>
    </div>
  );
}

// Feature Engineering Tab Component
function EngineeringTab({ data, setData, columns, setColumns }) {
  const [col1, setCol1] = useState('');
  const [col2, setCol2] = useState('');
  const [operation, setOperation] = useState('add');
  const [newFeatureName, setNewFeatureName] = useState('');

  const numericalColumns = columns.filter(col => 
    typeof data[0]?.[col] === 'number'
  );

  const createFeature = () => {
    if (!col1 || !col2 || !newFeatureName) return;

    const newData = [...data];
    newData.forEach(row => {
      const val1 = row[col1];
      const val2 = row[col2];
      
      if (val1 !== null && val1 !== undefined && val2 !== null && val2 !== undefined) {
        switch(operation) {
          case 'add':
            row[newFeatureName] = val1 + val2;
            break;
          case 'subtract':
            row[newFeatureName] = val1 - val2;
            break;
          case 'multiply':
            row[newFeatureName] = val1 * val2;
            break;
          case 'divide':
            row[newFeatureName] = val2 !== 0 ? val1 / val2 : 0;
            break;
          case 'ratio':
            row[newFeatureName] = val2 !== 0 ? val1 / val2 : 0;
            break;
          default:
            row[newFeatureName] = 0;
        }
      } else {
        row[newFeatureName] = null;
      }
    });

    setData(newData);
    if (!columns.includes(newFeatureName)) {
      setColumns([...columns, newFeatureName]);
    }
    setNewFeatureName('');
  };

  return (
    <div className="content-grid">
      <div className="panel">
        <h3>Engineered Data Preview</h3>
        <div className="data-table">
          <table>
            <thead>
              <tr>
                {Object.keys(data[0] || {}).map(col => <th key={col}>{col}</th>)}
              </tr>
            </thead>
            <tbody>
              {data.slice(0, 10).map((row, idx) => (
                <tr key={idx}>
                  {Object.keys(data[0] || {}).map(col => (
                    <td key={col}>
                      {row[col] === null || row[col] === undefined ? 
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
      </div>

      <div className="panel">
        <h3>Feature Engineering</h3>
        <div className="controls">
          <div className="control-group">
            <h4>Select First Column</h4>
            <select value={col1} onChange={(e) => setCol1(e.target.value)}>
              <option value="">Choose column 1...</option>
              {numericalColumns.map(col => (
                <option key={col} value={col}>{col}</option>
              ))}
            </select>
          </div>

          <div className="control-group">
            <h4>Operation</h4>
            <select value={operation} onChange={(e) => setOperation(e.target.value)}>
              <option value="add">Add (+)</option>
              <option value="subtract">Subtract (-)</option>
              <option value="multiply">Multiply (×)</option>
              <option value="divide">Divide (÷)</option>
              <option value="ratio">Ratio</option>
            </select>
          </div>

          <div className="control-group">
            <h4>Select Second Column</h4>
            <select value={col2} onChange={(e) => setCol2(e.target.value)}>
              <option value="">Choose column 2...</option>
              {numericalColumns.map(col => (
                <option key={col} value={col}>{col}</option>
              ))}
            </select>
          </div>

          <div className="control-group">
            <h4>New Feature Name</h4>
            <input 
              type="text" 
              value={newFeatureName} 
              onChange={(e) => setNewFeatureName(e.target.value)}
              placeholder="e.g., salary_per_year"
            />
          </div>

          <button 
            className="action-button" 
            onClick={createFeature} 
            disabled={!col1 || !col2 || !newFeatureName}
          >
            Create Feature
          </button>
        </div>

        <div className="info-box">
          <h4>Feature Engineering Tips</h4>
          <p><strong>Ratios:</strong> salary / experience = salary per year</p>
          <p><strong>Combinations:</strong> bedrooms + bathrooms = total rooms</p>
          <p><strong>Interactions:</strong> area × price = total value</p>
          <p>Good features can improve model performance significantly!</p>
        </div>
      </div>
    </div>
  );
}

export default App;

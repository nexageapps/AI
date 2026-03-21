import React, { useState, useEffect } from 'react';
import './App.css';
import Papa from 'papaparse';
import { EnhancedMissingValuesTab } from './components/EnhancedMissingValuesTab';
import { DistributionChart, ComparisonChart, CorrelationMatrix } from './components/DataVisualization';
import { PipelineManager } from './components/PipelineManager';
import { DataQualityReport } from './components/DataQualityReport';
import { validateDataQuality, exportToCSV } from './utils/dataProcessing';
import { 
  FiUpload, FiSearch, FiBarChart2, FiCode, FiSettings, 
  FiPieChart, FiCheckCircle, FiAlertTriangle, FiFile,
  FiDatabase, FiCheck, FiTarget, FiTrendingUp, FiZap
} from 'react-icons/fi';
import { MdOutlineScience } from 'react-icons/md';

function App() {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [activeTab, setActiveTab] = useState('upload');
  const [columns, setColumns] = useState([]);
  const [dataQuality, setDataQuality] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [operations, setOperations] = useState([]);
  const [showQuickActions, setShowQuickActions] = useState(true);

  // Validate data quality whenever data changes
  useEffect(() => {
    if (data.length > 0) {
      const quality = validateDataQuality(data);
      setDataQuality(quality);
    }
  }, [data]);

  // Track operations for pipeline
  const addOperation = (operation) => {
    setOperations(prev => [...prev, {
      ...operation,
      timestamp: new Date().toISOString()
    }]);
  };

  const loadPipeline = (pipelineOperations) => {
    setOperations(pipelineOperations);
    // TODO: Apply operations to data
  };

  // Sample dataset with more realistic data
  const loadSampleData = () => {
    setLoading(true);
    setError(null);
    
    const sampleData = [
      { age: 25, salary: 50000, experience: 2, department: 'IT', performance: 85, education: 'Bachelor' },
      { age: 30, salary: 60000, experience: 5, department: 'HR', performance: 90, education: 'Master' },
      { age: null, salary: 55000, experience: 3, department: 'IT', performance: 88, education: 'Bachelor' },
      { age: 35, salary: null, experience: 7, department: 'Finance', performance: 92, education: 'Master' },
      { age: 40, salary: 70000, experience: 10, department: 'IT', performance: 95, education: 'PhD' },
      { age: 28, salary: 65000, experience: null, department: 'HR', performance: 87, education: 'Bachelor' },
      { age: 45, salary: 75000, experience: 12, department: 'Finance', performance: 93, education: 'Master' },
      { age: 32, salary: 58000, experience: 6, department: 'IT', performance: 89, education: 'Bachelor' },
      { age: 38, salary: 68000, experience: 9, department: null, performance: 91, education: 'Master' },
      { age: 29, salary: 62000, experience: 4, department: 'HR', performance: 86, education: 'Bachelor' },
      { age: 42, salary: 72000, experience: 11, department: 'Finance', performance: 94, education: 'PhD' },
      { age: 27, salary: 53000, experience: 3, department: 'IT', performance: 84, education: 'Bachelor' },
      { age: 36, salary: null, experience: 8, department: 'HR', performance: 90, education: 'Master' },
      { age: 31, salary: 61000, experience: 5, department: 'Finance', performance: 88, education: 'Bachelor' },
      { age: null, salary: 69000, experience: 9, department: 'IT', performance: 92, education: 'Master' }
    ];
    
    setData(sampleData);
    setOriginalData(JSON.parse(JSON.stringify(sampleData)));
    setColumns(Object.keys(sampleData[0]));
    setOperations([{ 
      type: 'upload', 
      description: 'Loaded sample data',
      details: { rows: sampleData.length, columns: Object.keys(sampleData[0]).length }
    }]);
    setActiveTab('quality');
    setLoading(false);
    setShowQuickActions(true);
  };

  // File upload handler with validation
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    setLoading(true);
    setError(null);
    
    // Validate file type
    if (!file.name.endsWith('.csv')) {
      setError('Please upload a CSV file');
      setLoading(false);
      return;
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      setLoading(false);
      return;
    }
    
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.errors.length > 0) {
          setError(`CSV parsing error: ${results.errors[0].message}`);
          setLoading(false);
          return;
        }
        
        const filteredData = results.data.filter(row => 
          Object.values(row).some(val => val !== null && val !== '')
        );
        
        if (filteredData.length === 0) {
          setError('No valid data found in CSV file');
          setLoading(false);
          return;
        }
        
        setData(filteredData);
        setOriginalData(JSON.parse(JSON.stringify(filteredData)));
        setColumns(Object.keys(filteredData[0]));
        setOperations([{ 
          type: 'upload', 
          description: `Loaded ${file.name}`,
          details: { filename: file.name, rows: filteredData.length, columns: Object.keys(filteredData[0]).length }
        }]);
        setActiveTab('quality');
        setLoading(false);
        setShowQuickActions(true);
      },
      error: (error) => {
        setError(`Failed to parse CSV: ${error.message}`);
        setLoading(false);
      }
    });
  };

  return (
    <div className="app">
      <div className="header">
        <h1><MdOutlineScience className="header-icon" /> COMPSCI 714, 761, 762 - Data Preprocessing Studio</h1>
        <p>Week 3: Interactive Data Preprocessing and Feature Engineering</p>
        {dataQuality && (
          <div className="data-quality-badge">
            <span><FiDatabase /> {dataQuality.rowCount} rows × {dataQuality.columnCount} columns</span>
            {dataQuality.warnings.length > 0 && (
              <span className="warning-badge"><FiAlertTriangle /> {dataQuality.warnings.length} warnings</span>
            )}
          </div>
        )}
      </div>

      <div className="container">
        {error && (
          <div className="error-message">
            <FiAlertTriangle /> {error}
            <button onClick={() => setError(null)}>×</button>
          </div>
        )}
        
        {loading && (
          <div className="loading-overlay">
            <div className="spinner"></div>
            <p>Processing data...</p>
          </div>
        )}

        <div className="tabs">
          <button className={`tab ${activeTab === 'upload' ? 'active' : ''}`} onClick={() => setActiveTab('upload')}>
            <FiUpload /> Upload Data
          </button>
          <button className={`tab ${activeTab === 'quality' ? 'active' : ''}`} onClick={() => setActiveTab('quality')} disabled={data.length === 0}>
            <FiCheckCircle /> Data Quality
          </button>
          <button className={`tab ${activeTab === 'missing' ? 'active' : ''}`} onClick={() => setActiveTab('missing')} disabled={data.length === 0}>
            <FiSearch /> Missing Values
          </button>
          <button className={`tab ${activeTab === 'scaling' ? 'active' : ''}`} onClick={() => setActiveTab('scaling')} disabled={data.length === 0}>
            <FiBarChart2 /> Feature Scaling
          </button>
          <button className={`tab ${activeTab === 'encoding' ? 'active' : ''}`} onClick={() => setActiveTab('encoding')} disabled={data.length === 0}>
            <FiCode /> Encoding
          </button>
          <button className={`tab ${activeTab === 'engineering' ? 'active' : ''}`} onClick={() => setActiveTab('engineering')} disabled={data.length === 0}>
            <FiSettings /> Feature Engineering
          </button>
          <button className={`tab ${activeTab === 'analysis' ? 'active' : ''}`} onClick={() => setActiveTab('analysis')} disabled={data.length === 0}>
            <FiPieChart /> Analysis
          </button>
        </div>

        {data.length > 0 && <PipelineManager operations={operations} onLoadPipeline={loadPipeline} />}

        {activeTab === 'upload' && <UploadTab onFileUpload={handleFileUpload} onLoadSample={loadSampleData} loading={loading} />}
        {activeTab === 'quality' && <QualityTab data={data} columns={columns} />}
        {activeTab === 'missing' && <EnhancedMissingValuesTab data={data} setData={setData} originalData={originalData} columns={columns} addOperation={addOperation} />}
        {activeTab === 'scaling' && <ScalingTab data={data} setData={setData} originalData={originalData} columns={columns} addOperation={addOperation} />}
        {activeTab === 'encoding' && <EncodingTab data={data} setData={setData} originalData={originalData} columns={columns} addOperation={addOperation} />}
        {activeTab === 'engineering' && <EngineeringTab data={data} setData={setData} columns={columns} setColumns={setColumns} addOperation={addOperation} />}
        {activeTab === 'analysis' && <AnalysisTab data={data} columns={columns} />}
      </div>
    </div>
  );
}

// Upload Tab Component with loading state
function UploadTab({ onFileUpload, onLoadSample, loading }) {
  return (
    <div className="upload-section">
      <h2><FiUpload className="section-icon" /> Upload Your Dataset</h2>
      <p style={{ marginBottom: '20px', color: '#666' }}>
        Upload a CSV file or use sample data to get started with data preprocessing
      </p>
      
      <div className="upload-info">
        <div className="info-item">
          <FiFile className="icon" />
          <span>CSV files only</span>
        </div>
        <div className="info-item">
          <FiDatabase className="icon" />
          <span>Max 5MB</span>
        </div>
        <div className="info-item">
          <FiCheck className="icon" />
          <span>Headers required</span>
        </div>
      </div>
      
      <input type="file" id="file-upload" accept=".csv" onChange={onFileUpload} disabled={loading} />
      <label htmlFor="file-upload">
        <button className="upload-button" onClick={() => document.getElementById('file-upload').click()} disabled={loading}>
          {loading ? <><div className="button-spinner"></div> Processing...</> : <><FiUpload /> Choose CSV File</>}
        </button>
      </label>
      <button className="sample-data-button" onClick={onLoadSample} disabled={loading}>
        <FiTarget /> Use Sample Data
      </button>
      
      <div className="info-box" style={{ marginTop: '30px', textAlign: 'left' }}>
        <h4><FiTrendingUp style={{ marginRight: '8px' }} /> What You'll Learn</h4>
        <ul style={{ lineHeight: '2', marginLeft: '20px' }}>
          <li><strong>Missing Values:</strong> Handle NULL values with different imputation strategies</li>
          <li><strong>Feature Scaling:</strong> Normalize and standardize numerical features</li>
          <li><strong>Encoding:</strong> Convert categorical data to numerical format</li>
          <li><strong>Feature Engineering:</strong> Create new features from existing ones</li>
          <li><strong>Data Analysis:</strong> Visualize correlations and distributions</li>
        </ul>
      </div>
    </div>
  );
}

// Analysis Tab Component - NEW!
function AnalysisTab({ data, columns }) {
  const [selectedColumn, setSelectedColumn] = useState('');
  
  const numericalColumns = columns.filter(col => 
    typeof data[0]?.[col] === 'number'
  );
  
  return (
    <div className="content-grid">
      <div className="panel">
        <h3><FiBarChart2 className="panel-icon" /> Data Distribution</h3>
        <div className="control-group">
          <label>Select Column to Visualize</label>
          <select value={selectedColumn} onChange={(e) => setSelectedColumn(e.target.value)}>
            <option value="">Choose a column...</option>
            {numericalColumns.map(col => (
              <option key={col} value={col}>{col}</option>
            ))}
          </select>
        </div>
        
        {selectedColumn && (
          <DistributionChart 
            data={data} 
            column={selectedColumn} 
            title={`Distribution of ${selectedColumn}`}
          />
        )}
        
        <div className="info-box">
          <h4>Understanding Distributions</h4>
          <p><strong>Normal Distribution:</strong> Bell-shaped curve, most values near the mean</p>
          <p><strong>Skewed Distribution:</strong> Tail on one side, indicates outliers</p>
          <p><strong>Uniform Distribution:</strong> All values equally likely</p>
          <p style={{ marginTop: '10px', fontSize: '0.9rem', color: '#555' }}>
            Understanding your data's distribution helps choose the right preprocessing techniques!
          </p>
        </div>
      </div>
      
      <div className="panel">
        <h3><FiPieChart className="panel-icon" /> Feature Correlations</h3>
        <CorrelationMatrix data={data} columns={numericalColumns} />
        
        <div className="info-box">
          <h4>Understanding Correlations</h4>
          <p><strong>Positive Correlation (+1):</strong> Features increase together</p>
          <p><strong>Negative Correlation (-1):</strong> One increases, other decreases</p>
          <p><strong>No Correlation (0):</strong> Features are independent</p>
          
          <div style={{ background: '#fff3cd', padding: '10px', borderRadius: '5px', marginTop: '10px', fontSize: '0.85rem' }}>
            <FiAlertTriangle style={{ marginRight: '5px' }} />
            <strong>Feature Selection Tip:</strong> If two features have correlation &gt; 0.9, consider removing one to reduce redundancy!
          </div>
        </div>
      </div>
    </div>
  );
}

// Missing Values Tab Component (keeping original for now, will be replaced by Enhanced version)
function MissingValuesTab({ data, setData, originalData, columns }) {
  // Use the enhanced version
  return <EnhancedMissingValuesTab data={data} setData={setData} originalData={originalData} columns={columns} />;
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

        <div className="info-box" style={{ marginTop: '20px' }}>
          <h4>Understanding Feature Scaling</h4>
          
          <p><strong>What is Feature Scaling?</strong></p>
          <p style={{ marginBottom: '12px' }}>Feature scaling transforms numerical features to a similar scale. It's like converting different units (meters, feet, miles) to a common measurement system.</p>
          
          <p><strong>The Problem Without Scaling:</strong></p>
          <div style={{ background: '#fff3cd', padding: '10px', borderRadius: '5px', margin: '8px 0', fontSize: '0.85rem', border: '1px solid #ffc107' }}>
            Imagine predicting house prices using:<br/>
            • Area: 1000-3000 sq ft (range: 2000)<br/>
            • Bedrooms: 1-5 (range: 4)<br/>
            • Year built: 1950-2020 (range: 70)<br/>
            <br/>
            <strong>Problem:</strong> Area dominates because its range is 500x larger than bedrooms! The model will mostly ignore bedrooms and year.
          </div>
          
          <p><strong>Why Scale Features?</strong></p>
          <ul style={{ marginLeft: '20px', marginTop: '8px', lineHeight: '1.8', marginBottom: '12px' }}>
            <li><strong>Equal Importance:</strong> All features contribute equally to learning</li>
            <li><strong>Faster Training:</strong> Gradient descent converges much faster</li>
            <li><strong>Better Performance:</strong> Models learn patterns more effectively</li>
            <li><strong>Numerical Stability:</strong> Prevents overflow/underflow errors</li>
          </ul>
          
          <p><strong>Standardization (Z-score Normalization):</strong></p>
          <div style={{ background: '#f5f5f5', padding: '10px', borderRadius: '5px', margin: '8px 0', fontSize: '0.85rem' }}>
            <strong>Formula:</strong> z = (x - μ) / σ<br/>
            Where μ = mean, σ = standard deviation<br/>
            <br/>
            <strong>Result:</strong> Mean = 0, Standard Deviation = 1<br/>
            <br/>
            <strong>Example:</strong><br/>
            Ages: [25, 30, 35, 40, 45]<br/>
            Mean (μ) = 35, Std (σ) = 7.07<br/>
            Age 25 → z = (25-35)/7.07 = -1.41<br/>
            Age 35 → z = (35-35)/7.07 = 0<br/>
            Age 45 → z = (45-35)/7.07 = +1.41<br/>
            <br/>
            <em>Interpretation:</em> Negative = below average, 0 = average, Positive = above average
          </div>
          
          <p><strong>Normalization (Min-Max Scaling):</strong></p>
          <div style={{ background: '#f5f5f5', padding: '10px', borderRadius: '5px', margin: '8px 0', fontSize: '0.85rem' }}>
            <strong>Formula:</strong> x' = (x - min) / (max - min)<br/>
            <br/>
            <strong>Result:</strong> All values between 0 and 1<br/>
            <br/>
            <strong>Example:</strong><br/>
            Salaries: [50000, 60000, 70000, 80000]<br/>
            Min = 50000, Max = 80000<br/>
            $50k → (50000-50000)/(80000-50000) = 0.0<br/>
            $65k → (65000-50000)/(80000-50000) = 0.5<br/>
            $80k → (80000-50000)/(80000-50000) = 1.0<br/>
            <br/>
            <em>Interpretation:</em> 0 = minimum value, 0.5 = halfway, 1 = maximum value
          </div>
          
          <p><strong>When to Use Each Method:</strong></p>
          <div style={{ background: '#e6f2ff', padding: '10px', borderRadius: '5px', margin: '8px 0', fontSize: '0.85rem' }}>
            <strong>Use Standardization when:</strong><br/>
            • Data is normally distributed (bell curve)<br/>
            • You have outliers (median/mean differ significantly)<br/>
            • Using algorithms like Neural Networks, SVM, Logistic Regression<br/>
            • You don't need a specific range<br/>
            <br/>
            <strong>Use Normalization when:</strong><br/>
            • You need values in a specific range [0,1]<br/>
            • Using algorithms like KNN, Neural Networks with sigmoid/tanh<br/>
            • Features have different units (meters, kilograms, seconds)<br/>
            • You want to preserve zero values
          </div>
          
          <p style={{ marginTop: '12px', fontSize: '0.9rem', color: '#059669' }}>
            <strong>Pro Tip:</strong> Always fit the scaler on training data only, then transform both training and test data using the same scaler. This prevents data leakage!
          </p>
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
          <p>Where μ = mean, σ = standard deviation</p>
          <p>Result: mean = 0, std = 1</p>
          <p style={{ marginTop: '8px', fontSize: '0.85rem', color: '#555' }}>
            Example: If age has mean=35 and std=8, then age=43 becomes z=(43-35)/8=1.0
          </p>
          
          <p style={{ marginTop: '15px' }}><strong>Normalization:</strong></p>
          <div className="formula">x' = (x - min) / (max - min)</div>
          <p>Result: range [0, 1]</p>
          <p style={{ marginTop: '8px', fontSize: '0.85rem', color: '#555' }}>
            Example: If salary ranges from 50,000 to 75,000, then 60,000 becomes (60000-50000)/(75000-50000)=0.4
          </p>
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

        <div className="info-box" style={{ marginTop: '20px' }}>
          <h4>Understanding Categorical Encoding</h4>
          <p><strong>Why Encode Categories?</strong></p>
          <p>Machine learning models only understand numbers, not text. We must convert categorical data (like "IT", "HR", "Finance") into numerical format.</p>
          
          <p style={{ marginTop: '12px' }}><strong>The Problem:</strong></p>
          <p>You can't directly use text values like "red", "blue", "green" in mathematical operations. Models need numerical input to calculate predictions.</p>
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
          <div style={{ background: '#f5f5f5', padding: '10px', borderRadius: '5px', margin: '8px 0', fontSize: '0.85rem' }}>
            Example: "IT"→0, "HR"→1, "Finance"→2
          </div>
          <p style={{ fontSize: '0.9rem', color: '#d97706', marginTop: '5px' }}>
            <strong>Warning:</strong> Implies ordering (IT &lt; HR &lt; Finance). Only use for ordinal data like "Small" &lt; "Medium" &lt; "Large".
          </p>
          
          <p style={{ marginTop: '15px' }}><strong>One-Hot Encoding:</strong> Creates binary columns for each category</p>
          <div style={{ background: '#f5f5f5', padding: '10px', borderRadius: '5px', margin: '8px 0', fontSize: '0.85rem' }}>
            "IT" → department_IT=1, department_HR=0, department_Finance=0<br/>
            "HR" → department_IT=0, department_HR=1, department_Finance=0
          </div>
          <p style={{ fontSize: '0.9rem', color: '#059669', marginTop: '5px' }}>
            <strong>Best:</strong> No ordering implied. Use for nominal data (colors, countries, departments).
          </p>
          
          <p style={{ marginTop: '12px', fontSize: '0.9rem', color: '#555' }}>
            <strong>How it works:</strong> Each unique category becomes its own binary (0/1) column. A value of 1 means "this category is present", 0 means "not present".
          </p>
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

        <div className="info-box" style={{ marginTop: '20px' }}>
          <h4>Understanding Feature Engineering</h4>
          <p><strong>What is Feature Engineering?</strong></p>
          <p>Creating new features from existing ones to help the model learn better patterns. Good features can improve model performance more than complex algorithms.</p>
          
          <p style={{ marginTop: '12px' }}><strong>Why Create New Features?</strong></p>
          <ul style={{ marginLeft: '20px', marginTop: '8px', lineHeight: '1.8' }}>
            <li>Reveal hidden relationships (e.g., salary per year of experience)</li>
            <li>Combine related information (e.g., total rooms = bedrooms + bathrooms)</li>
            <li>Make patterns more obvious to the model</li>
            <li>Reduce complexity by summarizing multiple features</li>
          </ul>
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
          
          <p><strong>Common Operations:</strong></p>
          
          <div style={{ background: '#f5f5f5', padding: '10px', borderRadius: '5px', margin: '8px 0', fontSize: '0.85rem' }}>
            <strong>Ratios:</strong> salary ÷ experience = salary_per_year<br/>
            <em>Why:</em> Shows earning efficiency, normalizes salary by experience
          </div>
          
          <div style={{ background: '#f5f5f5', padding: '10px', borderRadius: '5px', margin: '8px 0', fontSize: '0.85rem' }}>
            <strong>Combinations:</strong> bedrooms + bathrooms = total_rooms<br/>
            <em>Why:</em> Summarizes house size in one feature
          </div>
          
          <div style={{ background: '#f5f5f5', padding: '10px', borderRadius: '5px', margin: '8px 0', fontSize: '0.85rem' }}>
            <strong>Interactions:</strong> area × price = total_value<br/>
            <em>Why:</em> Captures relationship between two features
          </div>
          
          <p style={{ marginTop: '12px', fontSize: '0.9rem', color: '#555' }}>
            <strong>Key Principle:</strong> Use domain knowledge! The best features come from understanding what matters in your problem domain.
          </p>
        </div>

        <div className="info-box" style={{ marginTop: '20px', background: '#f0f9ff', borderLeft: '4px solid #0ea5e9' }}>
          <h4 style={{ color: '#0369a1' }}>Understanding Feature Selection</h4>
          
          <p><strong>What is Feature Selection?</strong></p>
          <p style={{ marginBottom: '12px' }}>Feature selection is the process of choosing the most relevant features (columns) from your dataset while removing irrelevant or redundant ones. It's like cleaning your closet - keep what you need, remove what you don't.</p>
          
          <p><strong>Why Select Features?</strong></p>
          <ul style={{ marginLeft: '20px', marginTop: '8px', lineHeight: '1.8', marginBottom: '12px' }}>
            <li><strong>Reduce Overfitting:</strong> Fewer features = less chance of memorizing noise</li>
            <li><strong>Improve Performance:</strong> Models train faster and often perform better</li>
            <li><strong>Reduce Training Time:</strong> Less data to process = faster training</li>
            <li><strong>Improve Interpretability:</strong> Easier to understand which features matter</li>
            <li><strong>Reduce Storage:</strong> Smaller datasets are easier to store and manage</li>
          </ul>
          
          <p><strong>Common Feature Selection Methods:</strong></p>
          
          <div style={{ background: 'white', padding: '10px', borderRadius: '5px', margin: '8px 0', fontSize: '0.85rem', border: '1px solid #e0e0e0' }}>
            <strong>1. Correlation Analysis</strong><br/>
            Remove features that are highly correlated with each other (e.g., correlation &gt; 0.9)<br/>
            <br/>
            <em>Example:</em> If "total_price" and "price_with_tax" have 0.99 correlation, keep only one.<br/>
            <em>Why:</em> Redundant features don't add new information but increase complexity.
          </div>
          
          <div style={{ background: 'white', padding: '10px', borderRadius: '5px', margin: '8px 0', fontSize: '0.85rem', border: '1px solid #e0e0e0' }}>
            <strong>2. Variance Threshold</strong><br/>
            Remove features with very low variance (almost constant values)<br/>
            <br/>
            <em>Example:</em> A "country" column where 99% of values are "USA" provides little information.<br/>
            <em>Why:</em> Features that don't vary can't help distinguish between different outcomes.
          </div>
          
          <div style={{ background: 'white', padding: '10px', borderRadius: '5px', margin: '8px 0', fontSize: '0.85rem', border: '1px solid #e0e0e0' }}>
            <strong>3. Feature Importance</strong><br/>
            Use model-based methods to rank features by importance<br/>
            <br/>
            <em>Example:</em> Random Forest can tell you which features contribute most to predictions.<br/>
            <em>Why:</em> Keep features that actually help the model make better predictions.
          </div>
          
          <div style={{ background: 'white', padding: '10px', borderRadius: '5px', margin: '8px 0', fontSize: '0.85rem', border: '1px solid #e0e0e0' }}>
            <strong>4. Recursive Feature Elimination (RFE)</strong><br/>
            Iteratively remove the least important features and retrain<br/>
            <br/>
            <em>Example:</em> Start with 20 features, remove the weakest one, retrain, repeat until you have 10.<br/>
            <em>Why:</em> Finds the optimal subset of features through systematic elimination.
          </div>
          
          <p><strong>Real-World Example:</strong></p>
          <div style={{ background: '#fff3cd', padding: '10px', borderRadius: '5px', margin: '8px 0', fontSize: '0.85rem', border: '1px solid #ffc107' }}>
            <strong>Scenario:</strong> Predicting customer churn with 50 features<br/>
            <br/>
            <strong>Before Selection:</strong><br/>
            • 50 features (customer age, purchase history, support tickets, etc.)<br/>
            • Training time: 10 minutes<br/>
            • Accuracy: 85%<br/>
            • Model is complex and hard to explain<br/>
            <br/>
            <strong>After Selection (kept 15 most important):</strong><br/>
            • 15 features (recent purchases, support tickets, account age)<br/>
            • Training time: 2 minutes (5x faster!)<br/>
            • Accuracy: 87% (better!)<br/>
            • Model is simple and explainable
          </div>
          
          <p><strong>Feature Selection vs Feature Engineering:</strong></p>
          <div style={{ background: '#e6f2ff', padding: '10px', borderRadius: '5px', margin: '8px 0', fontSize: '0.85rem' }}>
            <strong>Feature Engineering:</strong> Creating NEW features from existing ones<br/>
            <em>Example:</em> salary ÷ experience = salary_per_year<br/>
            <br/>
            <strong>Feature Selection:</strong> Choosing WHICH features to keep or remove<br/>
            <em>Example:</em> Keep salary_per_year, remove raw salary and experience<br/>
            <br/>
            <strong>Together:</strong> First engineer useful features, then select the best ones!
          </div>
          
          <p style={{ marginTop: '12px', fontSize: '0.9rem', color: '#059669' }}>
            <strong>Best Practice:</strong> Start with feature engineering to create meaningful features, then use feature selection to remove redundant or irrelevant ones. This combination often gives the best results!
          </p>
          
          <p style={{ marginTop: '12px', fontSize: '0.9rem', color: '#d97706' }}>
            <strong>Warning:</strong> Don't remove features too aggressively! Sometimes features that seem unimportant individually become important when combined with others. Always validate your selection with cross-validation.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;

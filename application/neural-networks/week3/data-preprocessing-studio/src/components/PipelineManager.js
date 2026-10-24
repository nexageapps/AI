import React, { useState } from 'react';
import { FiDownload, FiSave, FiUpload, FiCode, FiFileText } from 'react-icons/fi';
import { generatePythonCode, generateRCode, downloadCode } from '../utils/pipelineGenerator';

/**
 * Pipeline Manager Component
 * Allows users to save, load, and export their preprocessing pipeline
 */
export function PipelineManager({ operations, onLoadPipeline }) {
  const [showExport, setShowExport] = useState(false);

  const savePipeline = () => {
    const pipeline = {
      version: '1.0',
      created: new Date().toISOString(),
      operations: operations
    };
    
    const blob = new Blob([JSON.stringify(pipeline, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `preprocessing_pipeline_${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const loadPipeline = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const pipeline = JSON.parse(e.target.result);
        if (pipeline.operations) {
          onLoadPipeline(pipeline.operations);
          alert('Pipeline loaded successfully!');
        } else {
          alert('Invalid pipeline file');
        }
      } catch (error) {
        alert('Error loading pipeline: ' + error.message);
      }
    };
    reader.readAsText(file);
  };

  const exportPython = () => {
    const code = generatePythonCode(operations);
    downloadCode(code, 'preprocessing_pipeline.py');
  };

  const exportR = () => {
    const code = generateRCode(operations);
    downloadCode(code, 'preprocessing_pipeline.R');
  };

  const exportReport = () => {
    let report = `# Data Preprocessing Report
Generated: ${new Date().toLocaleString()}

## Pipeline Summary
Total Operations: ${operations.length}

## Operations Applied

`;

    operations.forEach((op, index) => {
      report += `### ${index + 1}. ${op.description}
- Type: ${op.type}
- Details: ${JSON.stringify(op, null, 2)}

`;
    });

    report += `## Recommendations

1. **Validate Results**: Always check the processed data for correctness
2. **Document Changes**: Keep track of all preprocessing steps
3. **Version Control**: Save different versions of your pipeline
4. **Test on Sample**: Test the pipeline on a small sample first
5. **Backup Original**: Always keep a copy of your original data

## Next Steps

1. Review the processed data
2. Export to Python/R for reproducibility
3. Apply to your full dataset
4. Validate model performance improvements
`;

    downloadCode(report, 'preprocessing_report.md');
  };

  return (
    <div className="pipeline-manager">
      <div className="pipeline-actions">
        <button className="pipeline-button" onClick={savePipeline} title="Save Pipeline">
          <FiSave /> Save Pipeline
        </button>
        
        <label className="pipeline-button" title="Load Pipeline">
          <FiUpload /> Load Pipeline
          <input 
            type="file" 
            accept=".json" 
            onChange={loadPipeline}
            style={{ display: 'none' }}
          />
        </label>
        
        <button 
          className="pipeline-button" 
          onClick={() => setShowExport(!showExport)}
          title="Export Code"
        >
          <FiCode /> Export Code
        </button>
        
        <button className="pipeline-button" onClick={exportReport} title="Download Report">
          <FiFileText /> Generate Report
        </button>
      </div>

      {showExport && (
        <div className="export-options">
          <h4>Export Preprocessing Code</h4>
          <p>Download your preprocessing pipeline as executable code:</p>
          <div className="export-buttons">
            <button className="export-lang-button python" onClick={exportPython}>
              <FiDownload /> Python (.py)
            </button>
            <button className="export-lang-button r" onClick={exportR}>
              <FiDownload /> R (.R)
            </button>
          </div>
          <p className="export-note">
            The generated code can be run independently to reproduce your preprocessing steps.
          </p>
        </div>
      )}

      {operations.length > 0 && (
        <div className="pipeline-summary">
          <h4>Pipeline Operations ({operations.length})</h4>
          <div className="operations-list">
            {operations.map((op, index) => (
              <div key={index} className="operation-item">
                <span className="operation-number">{index + 1}</span>
                <span className="operation-desc">{op.description}</span>
                <span className="operation-type">{op.type}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

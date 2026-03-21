import React from 'react';
import './ThresholdSlider.css';

function ThresholdSlider({ threshold, onThresholdChange, color }) {
  return (
    <div className="threshold-slider card">
      <h2 className="card-title">Decision Threshold</h2>
      <p className="card-subtitle">
        Adjust the classification threshold to see how it affects metrics
      </p>

      <div className="slider-container">
        <div className="slider-value" style={{ color }}>
          {threshold.toFixed(2)}
        </div>
        
        <input
          type="range"
          min="0.1"
          max="0.9"
          step="0.01"
          value={threshold}
          onChange={(e) => onThresholdChange(parseFloat(e.target.value))}
          className="slider"
          style={{
            background: `linear-gradient(to right, ${color} 0%, ${color} ${threshold * 100}%, #e0e0e0 ${threshold * 100}%, #e0e0e0 100%)`
          }}
        />
        
        <div className="slider-labels">
          <span>0.1</span>
          <span>0.5</span>
          <span>0.9</span>
        </div>
      </div>

      <div className="threshold-explanation">
        <div className="explanation-section">
          <h4>Lower Threshold (← 0.1)</h4>
          <ul>
            <li>More predictions classified as positive</li>
            <li>Higher recall (catch more positives)</li>
            <li>Lower precision (more false positives)</li>
            <li>Use when: Missing positives is costly</li>
          </ul>
        </div>
        
        <div className="explanation-section">
          <h4>Higher Threshold (0.9 →)</h4>
          <ul>
            <li>Fewer predictions classified as positive</li>
            <li>Higher precision (fewer false positives)</li>
            <li>Lower recall (miss more positives)</li>
            <li>Use when: False alarms are costly</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ThresholdSlider;

import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import ScenarioSelector from './components/ScenarioSelector';
import ConfusionMatrix from './components/ConfusionMatrix';
import MetricsDisplay from './components/MetricsDisplay';
import ROCCurve from './components/ROCCurve';
import ThresholdSlider from './components/ThresholdSlider';
import RegressionMetrics from './components/RegressionMetrics';
import CrossValidation from './components/CrossValidation';

function App() {
  const [scenario, setScenario] = useState('cancer');
  const [threshold, setThreshold] = useState(0.5);
  const [confusionMatrix, setConfusionMatrix] = useState({ TP: 85, FP: 5, FN: 10, TN: 900 });

  // Scenario configurations
  const scenarios = {
    cancer: {
      name: 'Cancer Detection',
      description: 'Medical diagnosis where missing cancer (false negative) is catastrophic',
      totalSamples: 1000,
      positiveRate: 0.1,
      optimalMetric: 'Recall',
      color: '#e74c3c'
    },
    fraud: {
      name: 'Fraud Detection',
      description: 'Balance between catching fraud and not annoying legitimate customers',
      totalSamples: 10000,
      positiveRate: 0.02,
      optimalMetric: 'F1-Score',
      color: '#f39c12'
    },
    spam: {
      name: 'Spam Filter',
      description: 'Avoid marking legitimate emails as spam (minimize false positives)',
      totalSamples: 5000,
      positiveRate: 0.3,
      optimalMetric: 'Precision',
      color: '#3498db'
    },
    credit: {
      name: 'Credit Scoring',
      description: 'Rank applicants by risk, threshold adjustable by business needs',
      totalSamples: 2000,
      positiveRate: 0.15,
      optimalMetric: 'ROC-AUC',
      color: '#2ecc71'
    }
  };

  // Calculate metrics from confusion matrix
  const calculateMetrics = () => {
    const { TP, FP, FN, TN } = confusionMatrix;
    const total = TP + FP + FN + TN;
    
    const accuracy = (TP + TN) / total;
    const precision = TP / (TP + FP) || 0;
    const recall = TP / (TP + FN) || 0;
    const f1 = 2 * (precision * recall) / (precision + recall) || 0;
    const specificity = TN / (TN + FP) || 0;
    
    return { accuracy, precision, recall, f1, specificity };
  };

  // Update confusion matrix based on threshold
  const updateConfusionMatrix = (newThreshold) => {
    const config = scenarios[scenario];
    const total = config.totalSamples;
    const actualPositives = Math.round(total * config.positiveRate);
    const actualNegatives = total - actualPositives;
    
    // Simulate model performance based on threshold
    const sensitivity = 0.95 - (newThreshold - 0.5) * 0.4;
    const specificity = 0.85 + (newThreshold - 0.5) * 0.3;
    
    const TP = Math.round(actualPositives * Math.max(0.1, Math.min(0.99, sensitivity)));
    const FN = actualPositives - TP;
    const TN = Math.round(actualNegatives * Math.max(0.1, Math.min(0.99, specificity)));
    const FP = actualNegatives - TN;
    
    setConfusionMatrix({ TP, FP, FN, TN });
  };

  const handleScenarioChange = (newScenario) => {
    setScenario(newScenario);
    setThreshold(0.5);
    updateConfusionMatrix(0.5);
  };

  const handleThresholdChange = (newThreshold) => {
    setThreshold(newThreshold);
    updateConfusionMatrix(newThreshold);
  };

  const metrics = calculateMetrics();

  return (
    <div className="App">
      <Header />
      
      <div className="container">
        <ScenarioSelector 
          scenarios={scenarios}
          currentScenario={scenario}
          onScenarioChange={handleScenarioChange}
        />

        <div className="main-content">
          <div className="left-panel">
            <ConfusionMatrix 
              matrix={confusionMatrix}
              color={scenarios[scenario].color}
            />
            
            <ThresholdSlider 
              threshold={threshold}
              onThresholdChange={handleThresholdChange}
              color={scenarios[scenario].color}
            />
            
            <MetricsDisplay 
              metrics={metrics}
              optimalMetric={scenarios[scenario].optimalMetric}
              color={scenarios[scenario].color}
            />
          </div>

          <div className="right-panel">
            <ROCCurve 
              confusionMatrix={confusionMatrix}
              threshold={threshold}
              color={scenarios[scenario].color}
            />
            
            <RegressionMetrics />
            
            <CrossValidation />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

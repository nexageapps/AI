import React from 'react';
import { useGame } from '../context/GameContext';
import { computeGradient, getMagnitude } from '../utils/gradientCalculator';
import { calculateDistance } from '../utils/stepEngine';
import './MetricsDisplay.css';

const MetricsDisplay = () => {
  const { state } = useGame();
  const { playerPosition, hillSurface, iterationCount, stepHistory } = state;

  const elevation = hillSurface.equation(playerPosition.x, playerPosition.y);
  const gradient = computeGradient(playerPosition, hillSurface);
  const gradientMagnitude = getMagnitude(gradient);
  const distanceToGoal = calculateDistance(playerPosition, hillSurface.globalMinimum);

  return (
    <div className="metrics-display">
      <h2>Metrics</h2>
      
      <div className="metric-item">
        <span className="metric-label">Position:</span>
        <span className="metric-value">
          ({playerPosition.x.toFixed(2)}, {playerPosition.y.toFixed(2)})
        </span>
      </div>

      <div className="metric-item">
        <span className="metric-label">Elevation:</span>
        <span className="metric-value">{elevation.toFixed(3)}</span>
      </div>

      <div className="metric-item">
        <span className="metric-label">Gradient Magnitude:</span>
        <span className="metric-value">{gradientMagnitude.toFixed(3)}</span>
      </div>

      <div className="metric-item">
        <span className="metric-label">Distance to Goal:</span>
        <span className="metric-value">{distanceToGoal.toFixed(3)}</span>
      </div>

      <div className="metric-item">
        <span className="metric-label">Iterations:</span>
        <span className="metric-value">{iterationCount}</span>
      </div>

      {stepHistory.length > 1 && (
        <div className="metric-item">
          <span className="metric-label">Elevation Change:</span>
          <span className="metric-value">
            {(stepHistory[stepHistory.length - 1].elevation - stepHistory[0].elevation).toFixed(3)}
          </span>
        </div>
      )}

      <div className="concept-info">
        <h3>Gradient Descent Concepts</h3>
        <div className="concept-item">
          <strong>Gradient:</strong> Direction of steepest ascent. We move in the opposite direction (descent).
        </div>
        <div className="concept-item">
          <strong>Learning Rate:</strong> Step size. Larger values = faster but less stable.
        </div>
        <div className="concept-item">
          <strong>Convergence:</strong> Successfully reaching the minimum (goal).
        </div>
      </div>
    </div>
  );
};

export default MetricsDisplay;

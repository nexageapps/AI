/**
 * Step Engine Module
 * Implements gradient descent step logic and convergence detection
 */

/**
 * Execute a single gradient descent step
 * Formula: position_new = position_old - learning_rate * gradient
 * 
 * @param {Object} currentPosition - Current {x, y} position
 * @param {Object} gradient - Gradient vector {dx, dy}
 * @param {number} learningRate - Step size parameter
 * @param {Object} bounds - Surface bounds {xMin, xMax, yMin, yMax}
 * @returns {Object} New position {x, y}
 */
export function executeStep(currentPosition, gradient, learningRate, bounds) {
  const { x, y } = currentPosition;
  const { dx, dy } = gradient;
  
  // Gradient descent update rule
  let newX = x - learningRate * dx;
  let newY = y - learningRate * dy;
  
  // Clamp to surface bounds
  newX = clamp(newX, bounds.xMin, bounds.xMax);
  newY = clamp(newY, bounds.yMin, bounds.yMax);
  
  return { x: newX, y: newY };
}

/**
 * Clamp a value between min and max
 * @param {number} value - Value to clamp
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Clamped value
 */
function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

/**
 * Calculate Euclidean distance between two points
 * @param {Object} pos1 - First position {x, y}
 * @param {Object} pos2 - Second position {x, y}
 * @returns {number} Distance
 */
export function calculateDistance(pos1, pos2) {
  const dx = pos2.x - pos1.x;
  const dy = pos2.y - pos1.y;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Check if the player has converged to the goal
 * Convergence criteria:
 * - Distance to goal < threshold (default 0.5 units)
 * 
 * @param {Object} position - Current position {x, y}
 * @param {Object} goalPosition - Goal position {x, y}
 * @param {number} threshold - Convergence threshold (default 0.5)
 * @returns {boolean} True if converged
 */
export function checkConvergence(position, goalPosition, threshold = 0.5) {
  const distance = calculateDistance(position, goalPosition);
  return distance < threshold;
}

/**
 * Detect if the player is diverging (oscillating without converging)
 * Divergence criteria:
 * - Position oscillates within a small region for many iterations
 * - Checks if recent positions are cycling
 * 
 * @param {Array<Object>} stepHistory - Array of {position, ...} objects
 * @param {number} windowSize - Number of recent steps to check (default 20)
 * @returns {boolean} True if diverging
 */
export function detectDivergence(stepHistory, windowSize = 20) {
  if (stepHistory.length < windowSize) {
    return false;
  }
  
  // Get recent positions
  const recentSteps = stepHistory.slice(-windowSize);
  const positions = recentSteps.map(step => step.position);
  
  // Calculate average position
  const avgX = positions.reduce((sum, pos) => sum + pos.x, 0) / positions.length;
  const avgY = positions.reduce((sum, pos) => sum + pos.y, 0) / positions.length;
  const avgPos = { x: avgX, y: avgY };
  
  // Calculate variance (how spread out the positions are)
  const variance = positions.reduce((sum, pos) => {
    const dist = calculateDistance(pos, avgPos);
    return sum + dist * dist;
  }, 0) / positions.length;
  
  // If variance is very small, positions are oscillating in a tight region
  const OSCILLATION_THRESHOLD = 0.01;
  return variance < OSCILLATION_THRESHOLD;
}

/**
 * Detect if the player is repeatedly hitting boundaries
 * @param {Array<Object>} stepHistory - Array of step objects
 * @param {Object} bounds - Surface bounds
 * @param {number} windowSize - Number of recent steps to check
 * @returns {boolean} True if boundary collision detected
 */
export function detectBoundaryCollision(stepHistory, bounds, windowSize = 10) {
  if (stepHistory.length < windowSize) {
    return false;
  }
  
  const recentSteps = stepHistory.slice(-windowSize);
  const boundaryHits = recentSteps.filter(step => {
    const { x, y } = step.position;
    const EPSILON = 0.01;
    return (
      Math.abs(x - bounds.xMin) < EPSILON ||
      Math.abs(x - bounds.xMax) < EPSILON ||
      Math.abs(y - bounds.yMin) < EPSILON ||
      Math.abs(y - bounds.yMax) < EPSILON
    );
  });
  
  // If more than half of recent steps hit boundaries, consider it divergence
  return boundaryHits.length > windowSize / 2;
}

/**
 * Validate learning rate is within acceptable bounds
 * @param {number} learningRate - Learning rate to validate
 * @returns {number} Clamped learning rate
 */
export function validateLearningRate(learningRate) {
  const MIN_LEARNING_RATE = 0.01;
  const MAX_LEARNING_RATE = 2.0;
  return clamp(learningRate, MIN_LEARNING_RATE, MAX_LEARNING_RATE);
}

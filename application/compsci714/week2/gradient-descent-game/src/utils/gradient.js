/**
 * Gradient descent algorithm utilities
 */

/**
 * Execute one step of gradient descent
 */
export const gradientDescentStep = (position, surface, learningRate) => {
  const gradient = surface.gradient(position.x, position.y);
  
  // Move in the negative gradient direction (downhill)
  const newPosition = {
    x: position.x - learningRate * gradient.dx,
    y: position.y - learningRate * gradient.dy
  };
  
  // Keep within bounds
  const { bounds } = surface;
  newPosition.x = Math.max(bounds.xMin, Math.min(bounds.xMax, newPosition.x));
  newPosition.y = Math.max(bounds.yMin, Math.min(bounds.yMax, newPosition.y));
  
  return {
    position: newPosition,
    gradient,
    elevation: surface.equation(newPosition.x, newPosition.y)
  };
};

/**
 * Calculate distance between two points
 */
export const calculateDistance = (point1, point2) => {
  const dx = point1.x - point2.x;
  const dy = point1.y - point2.y;
  return Math.sqrt(dx * dx + dy * dy);
};

/**
 * Check if we've converged to the minimum
 */
export const hasConverged = (position, target, threshold = 0.1) => {
  return calculateDistance(position, target) < threshold;
};

/**
 * Check if the learning rate is causing oscillation
 */
export const detectOscillation = (history, windowSize = 5) => {
  if (history.length < windowSize * 2) return false;
  
  const recent = history.slice(-windowSize * 2);
  let oscillations = 0;
  
  for (let i = 1; i < recent.length - 1; i++) {
    const prev = recent[i - 1].elevation;
    const curr = recent[i].elevation;
    const next = recent[i + 1].elevation;
    
    // Check if we're bouncing up and down
    if ((curr > prev && curr > next) || (curr < prev && curr < next)) {
      oscillations++;
    }
  }
  
  return oscillations > windowSize * 0.6; // More than 60% oscillations
};

/**
 * Get gradient magnitude (steepness)
 */
export const getGradientMagnitude = (gradient) => {
  return Math.sqrt(gradient.dx * gradient.dx + gradient.dy * gradient.dy);
};

/**
 * Normalize gradient for visualization
 */
export const normalizeGradient = (gradient, maxLength = 1) => {
  const magnitude = getGradientMagnitude(gradient);
  if (magnitude === 0) return { dx: 0, dy: 0 };
  
  return {
    dx: (gradient.dx / magnitude) * maxLength,
    dy: (gradient.dy / magnitude) * maxLength
  };
};

/**
 * Generate random starting position within bounds
 */
export const getRandomStartPosition = (surface) => {
  const { bounds } = surface;
  return {
    x: bounds.xMin + Math.random() * (bounds.xMax - bounds.xMin),
    y: bounds.yMin + Math.random() * (bounds.yMax - bounds.yMin)
  };
};

/**
 * Validate learning rate and provide feedback
 */
export const validateLearningRate = (rate, surface, position) => {
  const gradient = surface.gradient(position.x, position.y);
  const magnitude = getGradientMagnitude(gradient);
  
  // Estimate good learning rate based on gradient
  const suggestedMax = 0.1 / Math.max(magnitude, 0.1);
  
  if (rate > suggestedMax * 2) {
    return {
      valid: false,
      message: "Learning rate too high! The ball might overshoot the valley.",
      suggestion: Math.min(suggestedMax, 0.1)
    };
  }
  
  if (rate < 0.001) {
    return {
      valid: true,
      message: "Learning rate is very small. It will take many steps to reach the goal.",
      suggestion: 0.01
    };
  }
  
  return {
    valid: true,
    message: "Learning rate looks good!",
    suggestion: rate
  };
};
/**
 * Gradient Calculator Module
 * Computes gradients using central finite differences for numerical stability
 */

// Small step size for numerical differentiation
const H = 0.001;

// Cache for gradient calculations
const gradientCache = new Map();

/**
 * Generate cache key for a position
 * @param {number} x - X coordinate
 * @param {number} y - Y coordinate
 * @param {string} surfaceType - Type of surface
 * @returns {string} Cache key
 */
function getCacheKey(x, y, surfaceType) {
  // Round to 3 decimal places for cache key
  const xRounded = Math.round(x * 1000) / 1000;
  const yRounded = Math.round(y * 1000) / 1000;
  return `${surfaceType}:${xRounded},${yRounded}`;
}

/**
 * Compute gradient using central finite differences
 * ∂f/∂x ≈ (f(x + h, y) - f(x - h, y)) / (2h)
 * ∂f/∂y ≈ (f(x, y + h) - f(x, y - h)) / (2h)
 * 
 * @param {Object} position - {x, y} coordinates
 * @param {Object} surface - Hill surface object with equation function
 * @returns {Object} Gradient vector {dx, dy}
 */
export function computeGradient(position, surface) {
  const { x, y } = position;
  const { equation, type } = surface;
  
  // Check cache first
  const cacheKey = getCacheKey(x, y, type);
  if (gradientCache.has(cacheKey)) {
    return gradientCache.get(cacheKey);
  }
  
  // Compute using central finite differences
  const fx_plus = equation(x + H, y);
  const fx_minus = equation(x - H, y);
  const fy_plus = equation(x, y + H);
  const fy_minus = equation(x, y - H);
  
  const dx = (fx_plus - fx_minus) / (2 * H);
  const dy = (fy_plus - fy_minus) / (2 * H);
  
  // Check for numerical issues
  if (!isFinite(dx) || !isFinite(dy)) {
    console.warn('Gradient calculation resulted in non-finite values', { x, y, dx, dy });
    return { dx: 0, dy: 0 };
  }
  
  const gradient = { dx, dy };
  
  // Cache the result
  gradientCache.set(cacheKey, gradient);
  
  return gradient;
}

/**
 * Calculate the magnitude of a gradient vector
 * magnitude = √(dx² + dy²)
 * 
 * @param {Object} gradient - Gradient vector {dx, dy}
 * @returns {number} Magnitude of the gradient
 */
export function getMagnitude(gradient) {
  const { dx, dy } = gradient;
  
  // Handle edge case
  if (!isFinite(dx) || !isFinite(dy)) {
    return 0;
  }
  
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Calculate the direction angle of a gradient vector
 * angle = atan2(dy, dx)
 * 
 * @param {Object} gradient - Gradient vector {dx, dy}
 * @returns {number} Angle in radians
 */
export function getDirection(gradient) {
  const { dx, dy } = gradient;
  
  // Handle edge case
  if (!isFinite(dx) || !isFinite(dy)) {
    return 0;
  }
  
  return Math.atan2(dy, dx);
}

/**
 * Get the descent direction (negative gradient)
 * Used for gradient descent: move in direction of steepest descent
 * 
 * @param {Object} gradient - Gradient vector {dx, dy}
 * @returns {Object} Descent direction {dx, dy}
 */
export function getDescentDirection(gradient) {
  return {
    dx: -gradient.dx,
    dy: -gradient.dy,
  };
}

/**
 * Clear the gradient cache
 * Useful when switching surfaces or resetting the game
 */
export function clearCache() {
  gradientCache.clear();
}

/**
 * Get cache statistics for debugging
 * @returns {Object} Cache statistics
 */
export function getCacheStats() {
  return {
    size: gradientCache.size,
    maxSize: 10000, // Arbitrary limit
  };
}

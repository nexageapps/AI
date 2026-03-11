/**
 * Hill Surface Generation Module
 * Implements three types of mathematical surfaces for gradient descent visualization
 */

// Surface type definitions
export const SURFACE_TYPES = {
  BOWL: 'bowl',
  VALLEY: 'valley',
  MULTIMODAL: 'multimodal',
};

/**
 * Bowl surface: f(x,y) = x² + y²
 * Simple convex function with single global minimum at origin
 */
const bowlSurface = {
  type: SURFACE_TYPES.BOWL,
  bounds: { xMin: -5, xMax: 5, yMin: -5, yMax: 5 },
  
  equation: (x, y) => {
    return x * x + y * y;
  },
  
  gradient: (x, y) => {
    return {
      dx: 2 * x,
      dy: 2 * y,
    };
  },
  
  globalMinimum: { x: 0, y: 0, value: 0 },
};

/**
 * Valley surface: f(x,y) = (x² - 1)² + y²
 * Elongated valley with minimum along a curve
 */
const valleySurface = {
  type: SURFACE_TYPES.VALLEY,
  bounds: { xMin: -3, xMax: 3, yMin: -3, yMax: 3 },
  
  equation: (x, y) => {
    const term1 = (x * x - 1);
    return term1 * term1 + y * y;
  },
  
  gradient: (x, y) => {
    const term1 = x * x - 1;
    return {
      dx: 4 * x * term1,
      dy: 2 * y,
    };
  },
  
  globalMinimum: { x: 1, y: 0, value: 0 },
};

/**
 * Multimodal surface: f(x,y) = sin(x) * sin(y) + 0.1(x² + y²)
 * Multiple local minima with quadratic bias toward center
 */
const multimodalSurface = {
  type: SURFACE_TYPES.MULTIMODAL,
  bounds: { xMin: -6, xMax: 6, yMin: -6, yMax: 6 },
  
  equation: (x, y) => {
    return Math.sin(x) * Math.sin(y) + 0.1 * (x * x + y * y);
  },
  
  gradient: (x, y) => {
    return {
      dx: Math.cos(x) * Math.sin(y) + 0.2 * x,
      dy: Math.sin(x) * Math.cos(y) + 0.2 * y,
    };
  },
  
  globalMinimum: { x: 0, y: 0, value: 0 },
};

/**
 * Factory function to create a hill surface by type
 * @param {string} type - One of SURFACE_TYPES
 * @returns {Object} Hill surface configuration
 */
export function createHillSurface(type) {
  switch (type) {
    case SURFACE_TYPES.BOWL:
      return bowlSurface;
    case SURFACE_TYPES.VALLEY:
      return valleySurface;
    case SURFACE_TYPES.MULTIMODAL:
      return multimodalSurface;
    default:
      return bowlSurface;
  }
}

/**
 * Get all available surface types
 * @returns {Array<string>} Array of surface type names
 */
export function getAllSurfaceTypes() {
  return Object.values(SURFACE_TYPES);
}

/**
 * Get a random surface type
 * @returns {string} Random surface type
 */
export function getRandomSurfaceType() {
  const types = getAllSurfaceTypes();
  return types[Math.floor(Math.random() * types.length)];
}

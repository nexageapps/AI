/**
 * Mathematical surface functions for gradient descent visualization
 * Each function represents a different optimization landscape
 */

export const SURFACE_TYPES = {
  SIMPLE_BOWL: 'simple_bowl',
  ROSENBROCK: 'rosenbrock',
  HIMMELBLAU: 'himmelblau',
  RASTRIGIN: 'rastrigin'
};

/**
 * Simple quadratic bowl - easiest for beginners
 * f(x,y) = (x-2)² + (y-1)²
 */
export const simpleBowl = {
  name: 'Simple Bowl',
  difficulty: 'Easy',
  description: 'A simple bowl shape - perfect for learning!',
  bounds: { xMin: -2, xMax: 6, yMin: -3, yMax: 5 },
  globalMinimum: { x: 2, y: 1 },
  
  equation: (x, y) => {
    return Math.pow(x - 2, 2) + Math.pow(y - 1, 2);
  },
  
  gradient: (x, y) => {
    return {
      dx: 2 * (x - 2),
      dy: 2 * (y - 1)
    };
  }
};

/**
 * Rosenbrock function - banana-shaped valley
 * f(x,y) = (a-x)² + b(y-x²)²
 */
export const rosenbrock = {
  name: 'Banana Valley',
  difficulty: 'Medium',
  description: 'A curved valley that looks like a banana!',
  bounds: { xMin: -2, xMax: 3, yMin: -1, yMax: 4 },
  globalMinimum: { x: 1, y: 1 },
  
  equation: (x, y) => {
    const a = 1;
    const b = 100;
    return Math.pow(a - x, 2) + b * Math.pow(y - x * x, 2);
  },
  
  gradient: (x, y) => {
    const a = 1;
    const b = 100;
    return {
      dx: -2 * (a - x) - 4 * b * x * (y - x * x),
      dy: 2 * b * (y - x * x)
    };
  }
};

/**
 * Himmelblau's function - multiple local minima
 * f(x,y) = (x²+y-11)² + (x+y²-7)²
 */
export const himmelblau = {
  name: 'Four Valleys',
  difficulty: 'Hard',
  description: 'Four different valleys to explore!',
  bounds: { xMin: -5, xMax: 5, yMin: -5, yMax: 5 },
  globalMinimum: { x: 3, y: 2 }, // One of four minima
  
  equation: (x, y) => {
    return Math.pow(x * x + y - 11, 2) + Math.pow(x + y * y - 7, 2);
  },
  
  gradient: (x, y) => {
    return {
      dx: 4 * x * (x * x + y - 11) + 2 * (x + y * y - 7),
      dy: 2 * (x * x + y - 11) + 4 * y * (x + y * y - 7)
    };
  }
};

/**
 * Get surface function by type
 */
export const getSurface = (type) => {
  switch (type) {
    case SURFACE_TYPES.SIMPLE_BOWL:
      return simpleBowl;
    case SURFACE_TYPES.ROSENBROCK:
      return rosenbrock;
    case SURFACE_TYPES.HIMMELBLAU:
      return himmelblau;
    default:
      return simpleBowl;
  }
};

/**
 * Get color for elevation value (normalized 0-1)
 */
export const getElevationColor = (normalized) => {
  if (normalized < 0.2) return '#1e3a8a'; // Dark blue (valley)
  if (normalized < 0.4) return '#3b82f6'; // Blue
  if (normalized < 0.6) return '#10b981'; // Green
  if (normalized < 0.8) return '#f59e0b'; // Yellow
  return '#ef4444'; // Red (peak)
};

/**
 * Generate contour lines for the surface
 */
export const generateContours = (surface, levels = 10) => {
  const { bounds } = surface;
  const contours = [];
  
  // Sample the surface to find min/max values
  let minZ = Infinity;
  let maxZ = -Infinity;
  
  for (let x = bounds.xMin; x <= bounds.xMax; x += 0.1) {
    for (let y = bounds.yMin; y <= bounds.yMax; y += 0.1) {
      const z = surface.equation(x, y);
      minZ = Math.min(minZ, z);
      maxZ = Math.max(maxZ, z);
    }
  }
  
  // Generate contour levels
  for (let i = 0; i < levels; i++) {
    const level = minZ + (maxZ - minZ) * (i / (levels - 1));
    contours.push(level);
  }
  
  return contours;
};
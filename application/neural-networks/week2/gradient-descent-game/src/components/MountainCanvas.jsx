import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getElevationColor } from '../utils/surfaceFunction';

const MountainCanvas = ({ 
  surface, 
  ballPosition, 
  path, 
  gradient, 
  isAnimating,
  onCanvasClick 
}) => {
  const canvasRef = useRef(null);
  const [canvasSize, setCanvasSize] = useState({ width: 600, height: 400 });

  // Truly responsive canvas sizing with proper desktop 2-column layout
  useEffect(() => {
    const updateSize = () => {
      const container = canvasRef.current?.parentElement;
      if (container) {
        const rect = container.getBoundingClientRect();
        const screenWidth = window.innerWidth;
        
        let width, height;
        
        if (screenWidth < 768) {
          // Mobile: Larger canvas for better visibility
          width = Math.min(rect.width - 16, screenWidth - 32, 450);
          height = width * 0.8; // Taller ratio for better view
        } else {
          // Tablet/Desktop/Laptop: 2-column layout - canvas fits in left column
          width = Math.min(rect.width - 32, 500);
          height = width * 0.75; // Good aspect ratio for split view
        }
        
        setCanvasSize({ width, height });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Transform coordinates from world space to canvas space
  const worldToCanvas = (worldPos) => {
    const { bounds } = surface;
    const padding = 40;
    
    const x = padding + ((worldPos.x - bounds.xMin) / (bounds.xMax - bounds.xMin)) * (canvasSize.width - 2 * padding);
    const y = padding + ((bounds.yMax - worldPos.y) / (bounds.yMax - bounds.yMin)) * (canvasSize.height - 2 * padding);
    
    return { x, y };
  };

  // Transform canvas coordinates back to world space
  const canvasToWorld = (canvasPos) => {
    const { bounds } = surface;
    const padding = 40;
    
    const x = bounds.xMin + ((canvasPos.x - padding) / (canvasSize.width - 2 * padding)) * (bounds.xMax - bounds.xMin);
    const y = bounds.yMax - ((canvasPos.y - padding) / (canvasSize.height - 2 * padding)) * (bounds.yMax - bounds.yMin);
    
    return { x, y };
  };

  // Handle canvas click for setting new position
  const handleCanvasClick = (event) => {
    if (!onCanvasClick) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const canvasPos = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
    
    const worldPos = canvasToWorld(canvasPos);
    onCanvasClick(worldPos);
  };

  // Draw the mountain surface
  const drawSurface = (ctx) => {
    const { bounds } = surface;
    const gridSize = 50;
    
    // Sample elevation data
    const elevations = [];
    let minElev = Infinity;
    let maxElev = -Infinity;
    
    for (let i = 0; i <= gridSize; i++) {
      elevations[i] = [];
      for (let j = 0; j <= gridSize; j++) {
        const x = bounds.xMin + (i / gridSize) * (bounds.xMax - bounds.xMin);
        const y = bounds.yMin + (j / gridSize) * (bounds.yMax - bounds.yMin);
        const elev = surface.equation(x, y);
        elevations[i][j] = elev;
        minElev = Math.min(minElev, elev);
        maxElev = Math.max(maxElev, elev);
      }
    }
    
    // Draw colored grid cells
    const cellWidth = (canvasSize.width - 80) / gridSize;
    const cellHeight = (canvasSize.height - 80) / gridSize;
    
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const elev = elevations[i][j];
        const normalized = (elev - minElev) / (maxElev - minElev);
        const color = getElevationColor(normalized);
        
        ctx.fillStyle = color;
        ctx.fillRect(
          40 + i * cellWidth,
          40 + j * cellHeight,
          cellWidth,
          cellHeight
        );
      }
    }
    
    // Draw contour lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 1;
    
    // Vertical lines
    for (let i = 0; i <= gridSize; i += 5) {
      const x = 40 + i * cellWidth;
      ctx.beginPath();
      ctx.moveTo(x, 40);
      ctx.lineTo(x, canvasSize.height - 40);
      ctx.stroke();
    }
    
    // Horizontal lines
    for (let j = 0; j <= gridSize; j += 5) {
      const y = 40 + j * cellHeight;
      ctx.beginPath();
      ctx.moveTo(40, y);
      ctx.lineTo(canvasSize.width - 40, y);
      ctx.stroke();
    }
  };

  // Draw the goal target
  const drawGoal = (ctx) => {
    const canvasPos = worldToCanvas(surface.globalMinimum);
    
    // Animated target rings
    const time = Date.now() * 0.003;
    
    for (let i = 3; i >= 1; i--) {
      const radius = 15 + i * 8 + Math.sin(time + i) * 3;
      const alpha = 0.8 - i * 0.2;
      
      ctx.strokeStyle = `rgba(34, 197, 94, ${alpha})`;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(canvasPos.x, canvasPos.y, radius, 0, Math.PI * 2);
      ctx.stroke();
    }
    
    // Center dot
    ctx.fillStyle = '#22c55e';
    ctx.beginPath();
    ctx.arc(canvasPos.x, canvasPos.y, 6, 0, Math.PI * 2);
    ctx.fill();
  };

  // Draw the path trail
  const drawPath = (ctx) => {
    if (path.length < 2) return;
    
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    for (let i = 0; i < path.length - 1; i++) {
      const pos1 = worldToCanvas(path[i]);
      const pos2 = worldToCanvas(path[i + 1]);
      
      // Color gradient from start (red) to current (orange)
      const t = i / (path.length - 1);
      const r = Math.floor(255 * (1 - t * 0.5));
      const g = Math.floor(165 * (0.5 + t * 0.5));
      const b = 0;
      
      ctx.strokeStyle = `rgb(${r}, ${g}, ${b})`;
      ctx.beginPath();
      ctx.moveTo(pos1.x, pos1.y);
      ctx.lineTo(pos2.x, pos2.y);
      ctx.stroke();
    }
    
    // Draw step markers
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    path.forEach((pos, index) => {
      if (index % 3 === 0) { // Every 3rd step
        const canvasPos = worldToCanvas(pos);
        ctx.beginPath();
        ctx.arc(canvasPos.x, canvasPos.y, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    });
  };

  // Draw gradient arrow
  const drawGradientArrow = (ctx) => {
    if (!gradient || !ballPosition) return;
    
    const canvasPos = worldToCanvas(ballPosition);
    const magnitude = Math.sqrt(gradient.dx * gradient.dx + gradient.dy * gradient.dy);
    
    if (magnitude < 0.001) return;
    
    // Scale arrow length based on gradient magnitude
    const arrowLength = Math.min(60, 20 + magnitude * 10);
    const normalizedGradient = {
      dx: -gradient.dx / magnitude, // Negative for downhill
      dy: -gradient.dy / magnitude
    };
    
    const endX = canvasPos.x + normalizedGradient.dx * arrowLength;
    const endY = canvasPos.y - normalizedGradient.dy * arrowLength; // Flip Y for canvas
    
    // Draw arrow shaft
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(canvasPos.x, canvasPos.y);
    ctx.lineTo(endX, endY);
    ctx.stroke();
    
    // Draw arrowhead
    const angle = Math.atan2(-(normalizedGradient.dy), normalizedGradient.dx);
    const headLength = 12;
    
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.moveTo(endX, endY);
    ctx.lineTo(
      endX - headLength * Math.cos(angle - Math.PI / 6),
      endY - headLength * Math.sin(angle - Math.PI / 6)
    );
    ctx.lineTo(
      endX - headLength * Math.cos(angle + Math.PI / 6),
      endY - headLength * Math.sin(angle + Math.PI / 6)
    );
    ctx.closePath();
    ctx.fill();
  };

  // Main canvas drawing effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
    
    // Draw all elements
    drawSurface(ctx);
    drawGoal(ctx);
    drawPath(ctx);
    drawGradientArrow(ctx);
    
  }, [surface, ballPosition, path, gradient, canvasSize]);

  return (
    <div className="relative" style={{ width: 'fit-content', margin: '0 auto' }}>
      <motion.canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        className="mountain-canvas cursor-crosshair"
        onClick={handleCanvasClick}
        style={{ display: 'block' }}
      />
      
      {/* Ball component - positioned absolutely over canvas */}
      <GradientBall 
        position={ballPosition}
        canvasSize={canvasSize}
        worldToCanvas={worldToCanvas}
        isAnimating={isAnimating}
      />
    </div>
  );
};

// Separate ball component for better animation control
const GradientBall = ({ position, canvasSize, worldToCanvas, isAnimating }) => {
  if (!position) return null;
  
  const canvasPos = worldToCanvas(position);
  
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: canvasPos.x - 16,
        top: canvasPos.y - 16,
      }}
      animate={{
        x: 0,
        y: 0,
        rotate: isAnimating ? 360 : 0,
      }}
      transition={{
        duration: isAnimating ? 0.8 : 0.3,
        ease: "easeInOut",
        rotate: {
          duration: 0.8,
          ease: "linear"
        }
      }}
    >
      <div className="w-8 h-8 bg-blue-500 rounded-full shadow-lg border-2 border-white flex items-center justify-center">
        <div className="w-2 h-2 bg-white rounded-full opacity-80"></div>
      </div>
    </motion.div>
  );
};

export default MountainCanvas;
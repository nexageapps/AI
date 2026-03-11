import React, { useRef, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { computeGradient, getDescentDirection } from '../utils/gradientCalculator';
import './GameCanvas.css';

const GameCanvas = ({ width, height }) => {
  const canvasRef = useRef(null);
  const { state } = useGame();
  const { hillSurface, playerPosition, stepHistory, gameStatus } = state;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw contour map
    drawContourMap(ctx, hillSurface, width, height);

    // Draw path history
    if (stepHistory.length > 0) {
      drawPathTrail(ctx, stepHistory, hillSurface.bounds, width, height);
    }

    // Draw goal position
    drawGoal(ctx, hillSurface.globalMinimum, hillSurface.bounds, width, height);

    // Draw player
    drawPlayer(ctx, playerPosition, hillSurface.bounds, width, height, gameStatus);

    // Draw gradient arrow
    const gradient = computeGradient(playerPosition, hillSurface);
    const descentDir = getDescentDirection(gradient);
    drawGradientArrow(ctx, playerPosition, descentDir, hillSurface.bounds, width, height);

  }, [hillSurface, playerPosition, stepHistory, gameStatus, width, height]);

  return (
    <div className="game-canvas-container">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="game-canvas"
      />
    </div>
  );
};

// Coordinate transformation: game coordinates -> canvas pixels
function gameToCanvas(gamePos, bounds, canvasWidth, canvasHeight) {
  const { x, y } = gamePos;
  const { xMin, xMax, yMin, yMax } = bounds;
  
  const padding = 40;
  const usableWidth = canvasWidth - 2 * padding;
  const usableHeight = canvasHeight - 2 * padding;
  
  const canvasX = padding + ((x - xMin) / (xMax - xMin)) * usableWidth;
  const canvasY = padding + ((yMax - y) / (yMax - yMin)) * usableHeight; // Flip Y axis
  
  return { x: canvasX, y: canvasY };
}

// Draw contour map
function drawContourMap(ctx, surface, width, height) {
  const { bounds, equation } = surface;
  const gridSize = 50;
  const padding = 40;
  
  // Sample elevation grid
  const elevations = [];
  let minElev = Infinity;
  let maxElev = -Infinity;
  
  for (let i = 0; i <= gridSize; i++) {
    elevations[i] = [];
    for (let j = 0; j <= gridSize; j++) {
      const x = bounds.xMin + (i / gridSize) * (bounds.xMax - bounds.xMin);
      const y = bounds.yMin + (j / gridSize) * (bounds.yMax - bounds.yMin);
      const elev = equation(x, y);
      elevations[i][j] = elev;
      minElev = Math.min(minElev, elev);
      maxElev = Math.max(maxElev, elev);
    }
  }
  
  // Draw colored grid cells
  const cellWidth = (width - 2 * padding) / gridSize;
  const cellHeight = (height - 2 * padding) / gridSize;
  
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const elev = elevations[i][j];
      const normalized = (elev - minElev) / (maxElev - minElev);
      
      // Color gradient: blue (low) -> cyan -> green -> yellow -> red (high)
      const color = getElevationColor(normalized);
      
      ctx.fillStyle = color;
      ctx.fillRect(
        padding + i * cellWidth,
        padding + j * cellHeight,
        cellWidth,
        cellHeight
      );
    }
  }
  
  // Draw grid lines
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.lineWidth = 0.5;
  for (let i = 0; i <= gridSize; i += 5) {
    const x = padding + i * cellWidth;
    const y = padding + i * cellHeight;
    ctx.beginPath();
    ctx.moveTo(x, padding);
    ctx.lineTo(x, height - padding);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(padding, y);
    ctx.lineTo(width - padding, y);
    ctx.stroke();
  }
}

// Get color for elevation value (0-1 normalized)
function getElevationColor(normalized) {
  if (normalized < 0.25) {
    // Blue to cyan
    const t = normalized / 0.25;
    return `rgb(${Math.floor(0 * (1 - t) + 0 * t)}, ${Math.floor(0 * (1 - t) + 150 * t)}, ${Math.floor(100 * (1 - t) + 200 * t)})`;
  } else if (normalized < 0.5) {
    // Cyan to green
    const t = (normalized - 0.25) / 0.25;
    return `rgb(0, ${Math.floor(150 * (1 - t) + 200 * t)}, ${Math.floor(200 * (1 - t) + 100 * t)})`;
  } else if (normalized < 0.75) {
    // Green to yellow
    const t = (normalized - 0.5) / 0.25;
    return `rgb(${Math.floor(0 * (1 - t) + 255 * t)}, ${Math.floor(200 * (1 - t) + 255 * t)}, ${Math.floor(100 * (1 - t) + 0 * t)})`;
  } else {
    // Yellow to red
    const t = (normalized - 0.75) / 0.25;
    return `rgb(255, ${Math.floor(255 * (1 - t) + 100 * t)}, 0)`;
  }
}

// Draw path trail
function drawPathTrail(ctx, stepHistory, bounds, width, height) {
  if (stepHistory.length < 2) return;
  
  ctx.lineWidth = 2;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  
  for (let i = 0; i < stepHistory.length - 1; i++) {
    const pos1 = stepHistory[i].position;
    const pos2 = stepHistory[i + 1].position;
    
    const canvas1 = gameToCanvas(pos1, bounds, width, height);
    const canvas2 = gameToCanvas(pos2, bounds, width, height);
    
    // Color gradient from red (start) to green (current)
    const t = i / (stepHistory.length - 1);
    const r = Math.floor(255 * (1 - t) + 0 * t);
    const g = Math.floor(0 * (1 - t) + 255 * t);
    
    ctx.strokeStyle = `rgb(${r}, ${g}, 0)`;
    ctx.beginPath();
    ctx.moveTo(canvas1.x, canvas1.y);
    ctx.lineTo(canvas2.x, canvas2.y);
    ctx.stroke();
  }
  
  // Draw position markers every 5 steps
  ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
  for (let i = 0; i < stepHistory.length; i += 5) {
    const pos = stepHistory[i].position;
    const canvas = gameToCanvas(pos, bounds, width, height);
    ctx.beginPath();
    ctx.arc(canvas.x, canvas.y, 3, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Draw goal position
function drawGoal(ctx, goalPos, bounds, width, height) {
  const canvas = gameToCanvas(goalPos, bounds, width, height);
  
  // Draw target circles
  ctx.strokeStyle = '#00ff00';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(canvas.x, canvas.y, 15, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(canvas.x, canvas.y, 10, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(canvas.x, canvas.y, 5, 0, Math.PI * 2);
  ctx.stroke();
  
  // Draw center dot
  ctx.fillStyle = '#00ff00';
  ctx.beginPath();
  ctx.arc(canvas.x, canvas.y, 3, 0, Math.PI * 2);
  ctx.fill();
}

// Draw player character
function drawPlayer(ctx, playerPos, bounds, width, height, gameStatus) {
  const canvas = gameToCanvas(playerPos, bounds, width, height);
  
  // Player color based on status
  let color = '#00d9ff'; // Playing
  if (gameStatus === 'converged') {
    color = '#00ff00'; // Success
  } else if (gameStatus === 'diverged') {
    color = '#ff0000'; // Diverged
  }
  
  // Draw player circle
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(canvas.x, canvas.y, 8, 0, Math.PI * 2);
  ctx.fill();
  
  // Draw outline
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2;
  ctx.stroke();
  
  // Draw blindfold indicator
  ctx.fillStyle = '#000000';
  ctx.fillRect(canvas.x - 6, canvas.y - 2, 12, 4);
}

// Draw gradient arrow
function drawGradientArrow(ctx, playerPos, descentDir, bounds, width, height) {
  const canvas = gameToCanvas(playerPos, bounds, width, height);
  
  // Scale arrow by gradient magnitude
  const magnitude = Math.sqrt(descentDir.dx * descentDir.dx + descentDir.dy * descentDir.dy);
  const arrowLength = Math.min(50, 20 + magnitude * 10);
  
  // Normalize direction
  const norm = magnitude > 0 ? magnitude : 1;
  const dx = (descentDir.dx / norm) * arrowLength;
  const dy = -(descentDir.dy / norm) * arrowLength; // Flip Y for canvas
  
  const endX = canvas.x + dx;
  const endY = canvas.y + dy;
  
  // Draw arrow line
  ctx.strokeStyle = '#ffff00';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(canvas.x, canvas.y);
  ctx.lineTo(endX, endY);
  ctx.stroke();
  
  // Draw arrowhead
  const angle = Math.atan2(dy, dx);
  const headLength = 10;
  
  ctx.fillStyle = '#ffff00';
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
}

export default GameCanvas;

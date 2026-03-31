import React, { useState, useRef, useEffect, useCallback } from 'react';
import { FiImage, FiInfo, FiArrowRight } from 'react-icons/fi';

const PATTERNS = {
  'Diagonal Line': (r, c) => Math.abs(r - c) < 2 ? 200 : 30,
  'Cross': (r, c) => (r === 4 || c === 4) ? 200 : 30,
  'Box': (r, c) => (r >= 2 && r <= 6 && c >= 2 && c <= 6 && (r === 2 || r === 6 || c === 2 || c === 6)) ? 200 : 30,
  'Circle': (r, c) => { const d = Math.sqrt((r-4)**2 + (c-4)**2); return (d > 2.5 && d < 3.8) ? 200 : 30; },
  'Checkerboard': (r, c) => ((r + c) % 2 === 0) ? 200 : 30,
};

const FILTERS = {
  'Horizontal Edge': [[-1,-1,-1],[0,0,0],[1,1,1]],
  'Vertical Edge': [[-1,0,1],[-1,0,1],[-1,0,1]],
  'Diagonal Edge': [[2,1,0],[1,0,-1],[0,-1,-2]],
  'Sharpen': [[0,-1,0],[-1,5,-1],[0,-1,0]],
};

function generateImage(name) {
  const fn = PATTERNS[name];
  const img = [];
  for (let r = 0; r < 9; r++) {
    const row = [];
    for (let c = 0; c < 9; c++) row.push(Math.round(fn(r, c)));
    img.push(row);
  }
  return img;
}

function applyFilter(image, kernel) {
  const result = [];
  for (let i = 0; i < image.length - 2; i++) {
    const row = [];
    for (let j = 0; j < image[0].length - 2; j++) {
      let sum = 0;
      for (let ki = 0; ki < 3; ki++)
        for (let kj = 0; kj < 3; kj++)
          sum += image[i+ki][j+kj] * kernel[ki][kj];
      row.push(Math.max(0, sum));
    }
    result.push(row);
  }
  return result;
}

function drawGrid(canvas, data, cellSize) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const rows = data.length, cols = data[0].length;
  canvas.width = cols * cellSize;
  canvas.height = rows * cellSize;
  const max = Math.max(...data.flat(), 1);
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++) {
      const v = Math.round((data[r][c] / max) * 255);
      ctx.fillStyle = `rgb(${v},${v},${v})`;
      ctx.fillRect(c * cellSize, r * cellSize, cellSize, cellSize);
    }
}

export default function FeatureMapPanel() {
  const [pattern, setPattern] = useState('Diagonal Line');
  const [filter, setFilter] = useState('Horizontal Edge');
  const inputRef = useRef(null);
  const outputRef = useRef(null);

  const image = generateImage(pattern);
  const kernel = FILTERS[filter];
  const featureMap = applyFilter(image, kernel);

  const draw = useCallback(() => {
    drawGrid(inputRef.current, image, 28);
    drawGrid(outputRef.current, featureMap, 28);
  }, [image, featureMap]);

  useEffect(() => { draw(); }, [draw]);

  return (
    <div>
      <div className="panel">
        <h2><FiImage /> Feature Map Visualizer</h2>
        <p>
          See what a CNN "sees" when it applies different filters to an image.
          Each filter produces a <strong>feature map</strong> that highlights specific patterns.
          After ReLU activation, negative values become zero (dark).
        </p>
      </div>
      <div className="panel">
        <div className="controls">
          <div className="select-wrap">
            <label>Pattern:</label>
            <select value={pattern} onChange={e => setPattern(e.target.value)}>
              {Object.keys(PATTERNS).map(k => <option key={k}>{k}</option>)}
            </select>
          </div>
          <div className="select-wrap">
            <label>Filter:</label>
            <select value={filter} onChange={e => setFilter(e.target.value)}>
              {Object.keys(FILTERS).map(k => <option key={k}>{k}</option>)}
            </select>
          </div>
        </div>
        <div className="canvas-wrap">
          <div className="canvas-card">
            <canvas ref={inputRef}></canvas>
            <p>Input Image (9x9)</p>
          </div>
          <div style={{ color: '#8a9ab0', alignSelf: 'center' }}><FiArrowRight size={28} /></div>
          <div className="grid-section" style={{ textAlign: 'center' }}>
            <h4>Filter (3x3)</h4>
            <div className="grid-table" style={{ gridTemplateColumns: 'repeat(3, 44px)', display: 'inline-grid' }}>
              {kernel.map((row, ri) =>
                row.map((v, ci) => (
                  <div key={`k${ri}-${ci}`} className="grid-cell"
                    style={{ background: v > 0 ? '#dcfce7' : v < 0 ? '#fee2e2' : '#f8fafc' }}>{v}</div>
                ))
              )}
            </div>
          </div>
          <div style={{ color: '#8a9ab0', alignSelf: 'center' }}><FiArrowRight size={28} /></div>
          <div className="canvas-card">
            <canvas ref={outputRef}></canvas>
            <p>Feature Map after ReLU (7x7)</p>
          </div>
        </div>
        <div className="info-box">
          <FiInfo className="info-icon" />
          <div>Try different combinations. Notice how the <strong>Horizontal Edge</strong> filter
          lights up horizontal lines but ignores vertical ones, and vice versa.</div>
        </div>
      </div>
      <div className="panel">
        <h3>What Happens in a Real CNN?</h3>
        <p>
          A real CNN has <strong>many filters per layer</strong> (32, 64, 128...). Each filter
          learns to detect a different pattern. The network figures out the best filters
          automatically during training — you don't design them by hand.
        </p>
        <p>
          <strong>Layer 1:</strong> Simple edges and gradients<br/>
          <strong>Layer 2:</strong> Corners, curves, textures<br/>
          <strong>Layer 3+:</strong> Complex shapes, object parts, and eventually whole objects
        </p>
      </div>
    </div>
  );
}

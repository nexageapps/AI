import React, { useState } from 'react';
import { FiLayers, FiInfo, FiAlertTriangle, FiArrowRight } from 'react-icons/fi';

const INPUT = [
  [12, 20, 30, 0],
  [8, 12, 2, 0],
  [34, 70, 37, 4],
  [112, 100, 25, 12],
];

function pool(grid, mode) {
  const out = [];
  for (let r = 0; r < grid.length; r += 2) {
    const row = [];
    for (let c = 0; c < grid[0].length; c += 2) {
      const block = [grid[r][c], grid[r][c+1], grid[r+1][c], grid[r+1][c+1]];
      row.push(mode === 'max' ? Math.max(...block) : Math.round(block.reduce((a,b) => a+b, 0) / 4));
    }
    out.push(row);
  }
  return out;
}

export default function PoolingPanel() {
  const [mode, setMode] = useState('max');
  const [hoverBlock, setHoverBlock] = useState(null);
  const output = pool(INPUT, mode);

  const isInBlock = (r, c, br, bc) => r >= br*2 && r < br*2+2 && c >= bc*2 && c < bc*2+2;
  const getBlockMax = (br, bc) => {
    const block = [INPUT[br*2][bc*2], INPUT[br*2][bc*2+1], INPUT[br*2+1][bc*2], INPUT[br*2+1][bc*2+1]];
    return Math.max(...block);
  };
  const cellBg = (v) => `rgb(${255-Math.round((v/112)*200)},${255-Math.round((v/112)*80)},255)`;

  return (
    <div>
      <div className="panel">
        <h2><FiLayers /> Pooling Layers</h2>
        <p>
          Pooling reduces the spatial size of feature maps, making the network more efficient
          and helping it become invariant to small translations. It is like zooming out — you keep
          the important info but lose some detail.
        </p>
        <div className="info-box">
          <FiInfo className="info-icon" />
          <div><strong>Why pool?</strong> After convolution, we have lots of feature maps. Pooling
          shrinks them so the network processes fewer numbers, while keeping the strongest signals.</div>
        </div>
      </div>

      <div className="panel">
        <div className="controls">
          <button className={`btn${mode === 'max' ? ' btn-primary' : ''}`} onClick={() => setMode('max')}>Max Pooling</button>
          <button className={`btn${mode === 'avg' ? ' btn-primary' : ''}`} onClick={() => setMode('avg')}>Average Pooling</button>
        </div>
        <div className="grid-container">
          <div className="grid-section">
            <h4>Input (4x4)</h4>
            <div className="pool-grid" style={{ gridTemplateColumns: 'repeat(4, 52px)' }}>
              {INPUT.map((row, ri) =>
                row.map((v, ci) => {
                  const inBlock = hoverBlock && isInBlock(ri, ci, hoverBlock[0], hoverBlock[1]);
                  const isMax = inBlock && mode === 'max' && v === getBlockMax(hoverBlock[0], hoverBlock[1]);
                  return (
                    <div key={`${ri}-${ci}`}
                      className={`pool-cell${inBlock ? ' selected' : ''}${isMax ? ' max-val' : ''}`}
                      style={{ background: cellBg(v) }}>{v}</div>
                  );
                })
              )}
            </div>
          </div>
          <div style={{ alignSelf: 'center', color: '#8a9ab0' }}><FiArrowRight size={28} /></div>
          <div className="grid-section">
            <h4>Output (2x2) — {mode === 'max' ? 'Max' : 'Average'} Pooling</h4>
            <div className="pool-grid" style={{ gridTemplateColumns: 'repeat(2, 52px)' }}>
              {output.map((row, ri) =>
                row.map((v, ci) => (
                  <div key={`o${ri}-${ci}`} className="pool-cell"
                    style={{ background: cellBg(v), cursor: 'pointer' }}
                    onMouseEnter={() => setHoverBlock([ri, ci])}
                    onMouseLeave={() => setHoverBlock(null)}>{v}</div>
                ))
              )}
            </div>
          </div>
        </div>
        {hoverBlock && (
          <div className="info-box">
            <FiInfo className="info-icon" />
            <div>
              <strong>Block ({hoverBlock[0]}, {hoverBlock[1]}):</strong>{' '}
              Values = [{INPUT[hoverBlock[0]*2][hoverBlock[1]*2]}, {INPUT[hoverBlock[0]*2][hoverBlock[1]*2+1]}, {INPUT[hoverBlock[0]*2+1][hoverBlock[1]*2]}, {INPUT[hoverBlock[0]*2+1][hoverBlock[1]*2+1]}]
              {' → '}{mode === 'max' ? `Max = ${output[hoverBlock[0]][hoverBlock[1]]}` : `Average = ${output[hoverBlock[0]][hoverBlock[1]]}`}
            </div>
          </div>
        )}
      </div>
      <div className="panel">
        <h3>Max vs Average Pooling</h3>
        <p>
          <strong>Max Pooling</strong> picks the largest value in each block — it keeps the strongest
          activation (most confident detection). This is the most common choice.
        </p>
        <p>
          <strong>Average Pooling</strong> takes the mean of all values — it gives a smoother,
          more blended result. Often used in the final layers of a network.
        </p>
        <div className="info-box warning">
          <FiAlertTriangle className="info-icon" />
          <div><strong>Pooling reduces size by half</strong> (with 2x2 pool, stride 2).
          A 224x224 image becomes 112x112 after one pooling layer. After 4 pooling layers: 14x14.</div>
        </div>
      </div>
    </div>
  );
}

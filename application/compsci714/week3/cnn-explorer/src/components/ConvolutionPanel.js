import React, { useState, useCallback, useEffect } from 'react';
import { FiSearch, FiPlay, FiPause, FiSkipForward, FiRotateCcw, FiInfo, FiCheckCircle } from 'react-icons/fi';

const KERNELS = {
  'Edge (Horizontal)': [[-1,-1,-1],[0,0,0],[1,1,1]],
  'Edge (Vertical)': [[-1,0,1],[-1,0,1],[-1,0,1]],
  'Sharpen': [[0,-1,0],[-1,5,-1],[0,-1,0]],
  'Blur': [[1,1,1],[1,1,1],[1,1,1]],
  'Emboss': [[-2,-1,0],[-1,1,1],[0,1,2]],
};

const DEFAULT_IMAGE = [
  [10,10,10,10,10,50,50],
  [10,10,10,10,50,50,50],
  [10,10,10,50,50,50,10],
  [10,10,50,50,50,10,10],
  [10,50,50,50,10,10,10],
  [50,50,50,10,10,10,10],
  [50,50,10,10,10,10,10],
];

function convolve(image, kernel) {
  const rows = image.length - kernel.length + 1;
  const cols = image[0].length - kernel[0].length + 1;
  const result = [];
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      let sum = 0;
      for (let ki = 0; ki < kernel.length; ki++)
        for (let kj = 0; kj < kernel[0].length; kj++)
          sum += image[i+ki][j+kj] * kernel[ki][kj];
      row.push(sum);
    }
    result.push(row);
  }
  return result;
}

export default function ConvolutionPanel() {
  const [kernelName, setKernelName] = useState('Edge (Horizontal)');
  const [stepR, setStepR] = useState(0);
  const [stepC, setStepC] = useState(0);
  const [playing, setPlaying] = useState(false);

  const kernel = KERNELS[kernelName];
  const output = convolve(DEFAULT_IMAGE, kernel);
  const maxR = output.length - 1;
  const maxC = output[0].length - 1;

  const advance = useCallback(() => {
    setStepC(c => {
      if (c < maxC) return c + 1;
      setStepR(r => {
        if (r < maxR) return r + 1;
        setPlaying(false);
        return 0;
      });
      return 0;
    });
  }, [maxC, maxR]);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(advance, 400);
    return () => clearInterval(id);
  }, [playing, advance]);

  const reset = () => { setStepR(0); setStepC(0); setPlaying(false); };

  const cellBg = (v, min, max) => {
    const t = max === min ? 0.5 : (v - min) / (max - min);
    return `rgb(${Math.round(255-t*200)},${Math.round(255-t*100)},255)`;
  };

  const outMin = Math.min(...output.flat());
  const outMax = Math.max(...output.flat());
  const currentVal = output[stepR]?.[stepC] ?? 0;

  const breakdown = [];
  for (let ki = 0; ki < 3; ki++)
    for (let kj = 0; kj < 3; kj++)
      breakdown.push({ img: DEFAULT_IMAGE[stepR+ki][stepC+kj], kern: kernel[ki][kj] });

  return (
    <div>
      <div className="panel">
        <h2><FiSearch /> Convolution Operation</h2>
        <p>
          A <strong>convolution</strong> slides a small filter (kernel) across the image.
          At each position, it multiplies overlapping values and sums them to produce one output pixel.
          This is how CNNs detect edges, textures, and patterns.
        </p>
        <div className="info-box">
          <FiInfo className="info-icon" />
          <div>
            <strong>Think of it like this:</strong> The kernel is a tiny magnifying glass that looks
            for a specific pattern. As it slides across the image, it "lights up" wherever it finds that pattern.
          </div>
        </div>
      </div>

      <div className="panel">
        <div className="controls">
          <div className="select-wrap">
            <label>Kernel:</label>
            <select value={kernelName} onChange={e => { setKernelName(e.target.value); reset(); }}>
              {Object.keys(KERNELS).map(k => <option key={k}>{k}</option>)}
            </select>
          </div>
          <button className="btn btn-primary" onClick={() => setPlaying(!playing)}>
            {playing ? <><FiPause /> Pause</> : <><FiPlay /> Play</>}
          </button>
          <button className="btn" onClick={advance} disabled={playing}>
            <FiSkipForward /> Step
          </button>
          <button className="btn" onClick={reset}><FiRotateCcw /> Reset</button>
        </div>

        <div className="grid-container">
          <div className="grid-section">
            <h4>Input Image (7x7)</h4>
            <div className="grid-table" style={{ gridTemplateColumns: 'repeat(7, 44px)' }}>
              {DEFAULT_IMAGE.map((row, ri) =>
                row.map((v, ci) => {
                  const inKernel = ri >= stepR && ri < stepR+3 && ci >= stepC && ci < stepC+3;
                  return (
                    <div key={`${ri}-${ci}`}
                      className={`grid-cell${inKernel ? ' highlight' : ''}`}
                      style={{ background: cellBg(v, 10, 50) }}>{v}</div>
                  );
                })
              )}
            </div>
          </div>
          <div className="grid-section">
            <h4>Kernel (3x3)</h4>
            <div className="grid-table" style={{ gridTemplateColumns: 'repeat(3, 44px)' }}>
              {kernel.map((row, ri) =>
                row.map((v, ci) => (
                  <div key={`k${ri}-${ci}`} className="grid-cell kernel-active"
                    style={{ background: v > 0 ? '#dcfce7' : v < 0 ? '#fee2e2' : '#f8fafc' }}>{v}</div>
                ))
              )}
            </div>
          </div>
          <div className="grid-section">
            <h4>Output Feature Map (5x5)</h4>
            <div className="grid-table" style={{ gridTemplateColumns: 'repeat(5, 44px)' }}>
              {output.map((row, ri) =>
                row.map((v, ci) => (
                  <div key={`o${ri}-${ci}`}
                    className={`grid-cell${ri === stepR && ci === stepC ? ' highlight' : ''}`}
                    style={{ background: cellBg(v, outMin, outMax) }}>{v}</div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="info-box">
          <FiInfo className="info-icon" />
          <div>
            <strong>Position ({stepR}, {stepC}):</strong>{' '}
            {breakdown.map((b, i) => (
              <span key={i}>{b.img}x{b.kern}{i < breakdown.length-1 ? ' + ' : ''}</span>
            ))}
            {' = '}<strong>{currentVal}</strong>
          </div>
        </div>
      </div>

      <div className="panel">
        <h3>Key Concepts</h3>
        <p>
          <strong>Stride:</strong> How many pixels the kernel moves each step (here stride = 1).<br/>
          <strong>Padding:</strong> Adding zeros around the image to control output size.<br/>
          <strong>Feature Map:</strong> The output of applying one filter — highlights where the pattern was found.<br/>
          <strong>Parameter Sharing:</strong> The same kernel weights are used at every position.
        </p>
        <div className="info-box success">
          <FiCheckCircle className="info-icon" />
          <div><strong>Output size formula:</strong> (Input - Kernel + 2xPadding) / Stride + 1 = (7 - 3 + 0) / 1 + 1 = 5</div>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ACTIVATIONS } from '../neuralNet';
import { FaInfoCircle, FaMousePointer } from 'react-icons/fa';
import './ActivationExplorer.css';

const RANGE = 6;
const STEPS = 200;

function plotPoints(fn) {
  const pts = [];
  for (let i = 0; i <= STEPS; i++) {
    const x = -RANGE + (2 * RANGE * i) / STEPS;
    pts.push({ x, y: fn(x) });
  }
  return pts;
}

function ActivationCanvas({ activationKey, showDerivative }) {
  const canvasRef = useRef(null);
  const [hover, setHover] = useState(null);
  const act = ACTIVATIONS[activationKey];

  const toCanvasX = useCallback((x, W) => ((x + RANGE) / (2 * RANGE)) * W, []);
  const toCanvasY = useCallback((y, H) => H / 2 - (y / RANGE) * (H / 2), []);
  const fromCanvasX = useCallback((cx, W) => (cx / W) * (2 * RANGE) - RANGE, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, W, H);

    // grid
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    for (let gx = -RANGE; gx <= RANGE; gx++) {
      const cx = toCanvasX(gx, W);
      ctx.beginPath(); ctx.moveTo(cx, 0); ctx.lineTo(cx, H); ctx.stroke();
    }
    for (let gy = -RANGE; gy <= RANGE; gy++) {
      const cy = toCanvasY(gy, H);
      ctx.beginPath(); ctx.moveTo(0, cy); ctx.lineTo(W, cy); ctx.stroke();
    }

    // axes
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(0, H / 2); ctx.lineTo(W, H / 2); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(W / 2, 0); ctx.lineTo(W / 2, H); ctx.stroke();

    // axis labels
    ctx.fillStyle = '#64748b';
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'center';
    for (let gx = -RANGE; gx <= RANGE; gx += 2) {
      if (gx === 0) continue;
      ctx.fillText(gx, toCanvasX(gx, W), H / 2 + 14);
    }
    ctx.textAlign = 'right';
    for (let gy = -RANGE; gy <= RANGE; gy += 2) {
      if (gy === 0) continue;
      ctx.fillText(gy, W / 2 - 6, toCanvasY(gy, H) + 4);
    }

    const drawCurve = (fn, color, lineWidth = 2.5) => {
      const pts = plotPoints(fn);
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.beginPath();
      pts.forEach((p, i) => {
        const cx = toCanvasX(p.x, W);
        const cy = Math.max(0, Math.min(H, toCanvasY(p.y, H)));
        i === 0 ? ctx.moveTo(cx, cy) : ctx.lineTo(cx, cy);
      });
      ctx.stroke();
    };

    drawCurve(act.fn, act.color);
    if (showDerivative) {
      ctx.setLineDash([6, 4]);
      drawCurve(act.derivative, act.color + '99', 2);
      ctx.setLineDash([]);
    }

    // hover crosshair
    if (hover !== null) {
      const hx = toCanvasX(hover, W);
      const hy = toCanvasY(act.fn(hover), H);

      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      ctx.beginPath(); ctx.moveTo(hx, 0); ctx.lineTo(hx, H); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, hy); ctx.lineTo(W, hy); ctx.stroke();
      ctx.setLineDash([]);

      // dot
      ctx.beginPath();
      ctx.arc(hx, hy, 5, 0, Math.PI * 2);
      ctx.fillStyle = act.color;
      ctx.fill();
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 2;
      ctx.stroke();

      // tooltip
      const val = act.fn(hover);
      const label = `x=${hover.toFixed(2)}, f(x)=${val.toFixed(3)}`;
      ctx.font = 'bold 11px sans-serif';
      const tw = ctx.measureText(label).width + 12;
      const tx = Math.min(hx + 10, W - tw - 4);
      const ty = Math.max(hy - 28, 4);
      ctx.fillStyle = 'rgba(0,0,0,0.8)';
      ctx.beginPath();
      ctx.roundRect(tx, ty, tw, 22, 4);
      ctx.fill();
      ctx.fillStyle = 'white';
      ctx.textAlign = 'left';
      ctx.fillText(label, tx + 6, ty + 15);
    }
  }, [act, showDerivative, hover, toCanvasX, toCanvasY]);

  useEffect(() => { draw(); }, [draw]);

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const cx = (e.clientX - rect.left) * scaleX;
    setHover(fromCanvasX(cx, canvas.width));
  };

  return (
    <canvas
      ref={canvasRef}
      width={520}
      height={320}
      className="act-canvas"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHover(null)}
    />
  );
}

export default function ActivationExplorer() {
  const [selected, setSelected] = useState('relu');
  const [showDeriv, setShowDeriv] = useState(false);
  const act = ACTIVATIONS[selected];

  return (
    <div className="activation-explorer">
      <div className="act-sidebar">
        <h3 className="sidebar-title">Activation Functions</h3>
        {Object.entries(ACTIVATIONS).map(([key, a]) => (
          <button
            key={key}
            className={`act-btn ${selected === key ? 'active' : ''}`}
            onClick={() => setSelected(key)}
            style={{ borderLeftColor: a.color }}
          >
            <span className="act-name">{a.name}</span>
            <span className="act-formula">{a.formula}</span>
          </button>
        ))}
      </div>

      <div className="act-main">
        <div className="act-info-bar">
          <FaInfoCircle style={{ color: act.color, flexShrink: 0, marginTop: 2 }} />
          <span className="act-desc">{act.description}</span>
        </div>

        <ActivationCanvas activationKey={selected} showDerivative={showDeriv} />

        <div className="act-controls">
          <label className="deriv-toggle">
            <input type="checkbox" checked={showDeriv} onChange={() => setShowDeriv(!showDeriv)} />
            <span>Show derivative (dashed)</span>
          </label>
          <div className="legend">
            <span className="legend-item">
              <span className="legend-swatch" style={{ background: act.color }} /> f(x)
            </span>
            {showDeriv && (
              <span className="legend-item">
                <span className="legend-swatch dashed" style={{ background: act.color }} /> f\u2032(x)
              </span>
            )}
          </div>
        </div>

        <div className="act-hover-hint">
          <FaMousePointer className="hover-hint-icon" />
          <span>Hover over the graph to inspect values at any point</span>
        </div>
      </div>
    </div>
  );
}

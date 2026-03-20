import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import './GraphView.css';

/**
 * GraphView — Interactive SVG Knowledge Graph
 *
 * Handles large graphs (10+ nodes) from rich paragraphs like the UoA description.
 *
 * Key design decisions:
 *  - Canvas size scales with node count so nodes have room to spread
 *  - Repulsion scales with node count so dense graphs don't clump
 *  - Node radius is fixed small (28px) with wrapped text so long CamelCase
 *    labels don't make nodes huge and overlap
 *  - Drag works on both mouse and touch
 *  - Tooltip shows plain-English facts on hover
 *  - "What the graph says" strip below translates every triple to a sentence
 */

// ── Physics constants ─────────────────────────────────────────────────────
const BASE_REPULSION = 6000;
const ATTRACTION     = 0.028;
const IDEAL_LEN      = 140;
const DAMPING        = 0.75;
const CENTER_F       = 0.01;
const NODE_R         = 28;   // fixed radius — text wraps inside

// ── Colour scheme ─────────────────────────────────────────────────────────
function nodeColour(id, triples) {
  const isSub = triples.some(t => t.subject === id);
  const isObj = triples.some(t => t.object  === id);
  if (isSub && isObj) return { fill: '#5b21b6', stroke: '#a78bfa', glow: '#a855f7', role: 'Subject & Object' };
  if (isSub)          return { fill: '#075985', stroke: '#38bdf8', glow: '#0ea5e9', role: 'Subject'          };
  return                     { fill: '#92400e', stroke: '#fbbf24', glow: '#f59e0b', role: 'Object'           };
}

// ── Predicate → plain English ─────────────────────────────────────────────
const PRED_LABEL = {
  born_in:       'was born in',
  located_in:    'is located in',
  part_of:       'is part of',
  works_in:      'works in',
  studies:       'studies',
  invented:      'invented',
  founded_in:    'was founded in',
  founded:       'founded',
  lives_in:      'lives in',
  teaches:       'teaches',
  capital_of:    'is the capital of',
  belongs_to:    'belongs to',
  is_a:          'is a type of',
  has:           'has',
  received:      'received',
  uses:          'uses',
  knows:         'knows',
  related_to:    'is related to',
  also_known_as: 'is also known as',
  known_as:      'is known as',
  ranked_in:     'is ranked in',
  leads_in:      'leads in',
  received_for:  'received award for',
};

function predLabel(p) {
  return PRED_LABEL[p] || p.replace(/_/g, ' ');
}

// ── Wrap a label into ≤2 lines for node display ──────────────────────────
function wrapLabel(label) {
  // Split on spaces
  const words = label.split(' ');
  if (words.length === 1) {
    // Single word - check if it's too long
    if (label.length <= 12) return [label];
    // Split long single words at reasonable points
    const mid = Math.ceil(label.length / 2);
    return [label.slice(0, mid), label.slice(mid)];
  }

  // Multiple words - try to split into two roughly equal lines
  const mid = Math.ceil(words.length / 2);
  const line1 = words.slice(0, mid).join(' ');
  const line2 = words.slice(mid).join(' ');
  
  // If either line is too long, truncate with ellipsis
  const maxLen = 15;
  return [
    line1.length > maxLen ? line1.slice(0, maxLen) + '…' : line1,
    line2.length > maxLen ? line2.slice(0, maxLen) + '…' : line2,
  ].filter(Boolean);
}

// ── Canvas dimensions scale with node count ───────────────────────────────
function canvasSize(nodeCount) {
  const side = Math.max(520, Math.min(800, nodeCount * 80));
  return { W: side, H: Math.round(side * 0.65) };
}

export default function GraphView({ triples }) {
  const posRef    = useRef({});
  const rafRef    = useRef(null);
  const svgRef    = useRef(null);
  const [, forceRender]     = useState(0);
  const [tooltip, setTooltip]   = useState(null);
  const [dragging, setDragging] = useState(null);

  const { nodes, links } = useMemo(() => {
    if (!triples.length) return { nodes: [], links: [] };
    const nodeSet = new Set();
    triples.forEach(t => { nodeSet.add(t.subject); nodeSet.add(t.object); });
    return {
      nodes: [...nodeSet].map(id => ({ id })),
      links: triples.map((t, i) => ({
        source: t.subject, target: t.object, label: t.predicate, id: i,
      })),
    };
  }, [triples]);

  const { W, H } = canvasSize(nodes.length);
  const REPULSION = BASE_REPULSION + nodes.length * 400;

  // Initialise / update positions when node set changes
  useEffect(() => {
    const cx = W / 2, cy = H / 2;
    const r  = Math.min(W, H) * 0.33;
    const prev = posRef.current;
    const next = {};
    nodes.forEach((node, i) => {
      next[node.id] = prev[node.id] ?? {
        x:  cx + r * Math.cos((2 * Math.PI * i) / nodes.length),
        y:  cy + r * Math.sin((2 * Math.PI * i) / nodes.length),
        vx: 0, vy: 0, pinned: false,
      };
    });
    posRef.current = next;
  }, [nodes, W, H]);

  // Spring simulation loop
  useEffect(() => {
    if (!nodes.length) return;
    let running = true;

    function step() {
      if (!running) return;
      const pos = posRef.current;
      const ids = Object.keys(pos);
      const cx = W / 2, cy = H / 2;

      // Repulsion
      for (let i = 0; i < ids.length; i++) {
        for (let j = i + 1; j < ids.length; j++) {
          const a = pos[ids[i]], b = pos[ids[j]];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d  = Math.max(Math.hypot(dx, dy), 1);
          const f  = REPULSION / (d * d);
          const fx = (dx / d) * f, fy = (dy / d) * f;
          if (!a.pinned) { a.vx += fx; a.vy += fy; }
          if (!b.pinned) { b.vx -= fx; b.vy -= fy; }
        }
      }

      // Spring attraction along edges
      for (const lk of links) {
        const a = pos[lk.source], b = pos[lk.target];
        if (!a || !b) continue;
        const dx = b.x - a.x, dy = b.y - a.y;
        const d  = Math.max(Math.hypot(dx, dy), 1);
        const s  = (d - IDEAL_LEN) * ATTRACTION;
        const fx = (dx / d) * s, fy = (dy / d) * s;
        if (!a.pinned) { a.vx += fx; a.vy += fy; }
        if (!b.pinned) { b.vx -= fx; b.vy -= fy; }
      }

      // Centering + integrate
      for (const id of ids) {
        const p = pos[id];
        if (p.pinned) continue;
        p.vx = (p.vx + (cx - p.x) * CENTER_F) * DAMPING;
        p.vy = (p.vy + (cy - p.y) * CENTER_F) * DAMPING;
        p.x  = Math.max(NODE_R + 4, Math.min(W - NODE_R - 4, p.x + p.vx));
        p.y  = Math.max(NODE_R + 4, Math.min(H - NODE_R - 4, p.y + p.vy));
      }

      forceRender(n => n + 1);
      rafRef.current = requestAnimationFrame(step);
    }

    rafRef.current = requestAnimationFrame(step);
    return () => { running = false; cancelAnimationFrame(rafRef.current); };
  }, [nodes, links, W, H, REPULSION]);

  // ── Drag (mouse + touch) ──────────────────────────────────────────────────
  const startDrag = useCallback((id) => {
    if (posRef.current[id]) posRef.current[id].pinned = true;
    setDragging(id);
  }, []);

  const moveDrag = useCallback((clientX, clientY) => {
    if (!dragging) return;
    const svg  = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    posRef.current[dragging].x = (clientX - rect.left) * (W / rect.width);
    posRef.current[dragging].y = (clientY - rect.top)  * (H / rect.height);
  }, [dragging, W, H]);

  const endDrag = useCallback(() => {
    if (dragging && posRef.current[dragging]) {
      posRef.current[dragging].pinned = false;
    }
    setDragging(null);
  }, [dragging]);

  // ── Tooltip ───────────────────────────────────────────────────────────────
  const showTooltip = useCallback((id) => {
    const related = triples.filter(t => t.subject === id || t.object === id);
    setTooltip({ id, lines: related.map(t => `${t.subject} ${predLabel(t.predicate)} ${t.object}`), role: nodeColour(id, triples).role });
  }, [triples]);

  // ── Render ────────────────────────────────────────────────────────────────
  const pos = posRef.current;

  if (!triples.length) {
    return (
      <div className="graph-card">
        <GraphHeader />
        <div className="graph-empty">
          <div className="graph-empty-icon">&#9671;</div>
          <p>Enter a sentence and click Generate Triples to see the graph.</p>
          <p className="graph-empty-hint">Try pasting a whole paragraph — the more facts, the richer the graph.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="graph-card">
      <GraphHeader />
      <div className="graph-wrap">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${W} ${H}`}
          className="graph-svg"
          onMouseMove={e => moveDrag(e.clientX, e.clientY)}
          onMouseUp={endDrag}
          onMouseLeave={endDrag}
          onTouchMove={e => { e.preventDefault(); moveDrag(e.touches[0].clientX, e.touches[0].clientY); }}
          onTouchEnd={endDrag}
          style={{ cursor: dragging ? 'grabbing' : 'default' }}
        >
          <defs>
            <marker id="arr" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
              <path d="M0,0 L7,3.5 L0,7 Z" fill="#38bdf8" opacity="0.75" />
            </marker>
            <linearGradient id="eg" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#38bdf8" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.6" />
            </linearGradient>
          </defs>

          {/* ── Edges ── */}
          {links.map(lk => {
            const s = pos[lk.source], t = pos[lk.target];
            if (!s || !t) return null;
            const d    = Math.max(Math.hypot(t.x - s.x, t.y - s.y), 1);
            const x1   = s.x + (t.x - s.x) / d * (NODE_R + 2);
            const y1   = s.y + (t.y - s.y) / d * (NODE_R + 2);
            const x2   = t.x - (t.x - s.x) / d * (NODE_R + 10);
            const y2   = t.y - (t.y - s.y) / d * (NODE_R + 10);
            const mx   = (x1 + x2) / 2;
            const my   = (y1 + y2) / 2;
            const lbl  = lk.label;
            const lw   = lbl.length * 5.5 + 10;

            return (
              <g key={lk.id}>
                <line x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke="url(#eg)" strokeWidth="1.8" markerEnd="url(#arr)" />
                {/* Label pill */}
                <rect x={mx - lw/2} y={my - 8} width={lw} height="16" rx="8"
                  fill="#0a1628" stroke="#1e3a6e" strokeWidth="1" />
                <text x={mx} y={my} textAnchor="middle" dominantBaseline="middle"
                  fontSize="9" fontWeight="600" fill="#7dd3fc"
                  fontFamily="Segoe UI, sans-serif">
                  {lbl}
                </text>
              </g>
            );
          })}

          {/* ── Nodes ── */}
          {nodes.map(node => {
            const p      = pos[node.id];
            if (!p) return null;
            const col    = nodeColour(node.id, triples);
            const active = tooltip?.id === node.id;
            const lines  = wrapLabel(node.id);

            return (
              <g key={node.id}
                transform={`translate(${p.x},${p.y})`}
                style={{ cursor: 'grab' }}
                onMouseDown={e => { e.preventDefault(); startDrag(node.id); }}
                onTouchStart={e => { e.preventDefault(); startDrag(node.id); }}
                onMouseEnter={() => showTooltip(node.id)}
                onMouseLeave={() => setTooltip(null)}
              >
                {/* Glow halo on hover */}
                {active && <circle r={NODE_R + 10} fill={col.fill} opacity="0.18" />}
                {/* Pulse ring */}
                <circle r={NODE_R + 4} fill={col.fill} opacity="0.12" />
                {/* Main circle */}
                <circle r={NODE_R} fill={col.fill} stroke={col.stroke}
                  strokeWidth={active ? 2.5 : 1.8} />
                {/* Wrapped label */}
                {lines.length === 1 ? (
                  <text textAnchor="middle" dominantBaseline="middle"
                    fontSize="10" fontWeight="700" fill="#fff"
                    fontFamily="Segoe UI, sans-serif"
                    style={{ pointerEvents: 'none', userSelect: 'none' }}>
                    {lines[0]}
                  </text>
                ) : (
                  <>
                    <text textAnchor="middle" y="-6"
                      fontSize="9" fontWeight="700" fill="#fff"
                      fontFamily="Segoe UI, sans-serif"
                      style={{ pointerEvents: 'none', userSelect: 'none' }}>
                      {lines[0]}
                    </text>
                    <text textAnchor="middle" y="7"
                      fontSize="9" fontWeight="700" fill="#fff"
                      fontFamily="Segoe UI, sans-serif"
                      style={{ pointerEvents: 'none', userSelect: 'none' }}>
                      {lines[1]}
                    </text>
                  </>
                )}
              </g>
            );
          })}
        </svg>

        {/* Tooltip */}
        {tooltip && (
          <div className="graph-tooltip">
            <div className="tooltip-header">
              <span className="tooltip-name">{tooltip.id}</span>
              <span className="tooltip-role">{tooltip.role}</span>
            </div>
            <div className="tooltip-facts">
              {tooltip.lines.map((line, i) => (
                <div key={i} className="tooltip-fact">
                  <span className="tooltip-bullet">&#9654;</span> {line}
                </div>
              ))}
            </div>
            <div className="tooltip-hint">Drag to rearrange</div>
          </div>
        )}
      </div>

      {/* Plain-English strip */}
      <div className="graph-sentences">
        <div className="graph-sentences-label">What the graph is saying ({triples.length} facts extracted):</div>
        <div className="graph-sentences-grid">
          {triples.map((t, i) => (
            <div key={i} className="graph-sentence">
              <span className="gs-num">{i + 1}</span>
              <span className="gs-subject">{t.subject}</span>
              <span className="gs-pred">{predLabel(t.predicate)}</span>
              <span className="gs-object">{t.object}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function GraphHeader() {
  return (
    <div className="graph-header">
      <h2 className="section-title">Knowledge Graph</h2>
      <div className="graph-legend">
        <span className="legend-dot" style={{ background: '#0ea5e9' }} /> Subject
        <span className="legend-dot" style={{ background: '#f59e0b' }} /> Object
        <span className="legend-dot" style={{ background: '#a855f7' }} /> Both
        <span className="legend-drag">Drag nodes to explore</span>
      </div>
    </div>
  );
}

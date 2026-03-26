import React, { useState, useMemo } from 'react';
import {
  FaInfoCircle, FaLightbulb, FaFont, FaSearch, FaChartBar,
  FaExchangeAlt, FaArrowRight, FaGlobe, FaStar,
} from 'react-icons/fa';
import './NLPEmbeddings.css';

/*
  Content adapted from Stanford CS230 Deep Learning cheatsheets.
  stanford.edu/~shervine/teaching/cs-230/
  Content was rephrased for compliance with licensing restrictions.
*/

// --- Word Embedding Demo ---
const WORD_EMBEDDINGS = {
  king:   [0.9, 0.1, 0.8, 0.2],
  queen:  [0.85, 0.9, 0.75, 0.2],
  man:    [0.7, 0.05, 0.3, 0.5],
  woman:  [0.65, 0.95, 0.25, 0.5],
  prince: [0.8, 0.15, 0.6, 0.3],
  princess:[0.75, 0.85, 0.55, 0.3],
  cat:    [0.1, 0.4, 0.1, 0.9],
  dog:    [0.15, 0.35, 0.15, 0.85],
  paris:  [0.3, 0.5, 0.9, 0.1],
  france: [0.35, 0.45, 0.85, 0.15],
};
const EMBED_DIMS = ['Royalty', 'Femininity', 'Power', 'Animal'];

function cosineSim(a, b) {
  let dot = 0, na = 0, nb = 0;
  for (let i = 0; i < a.length; i++) { dot += a[i]*b[i]; na += a[i]*a[i]; nb += b[i]*b[i]; }
  return dot / (Math.sqrt(na) * Math.sqrt(nb) + 1e-8);
}

// --- Beam Search Demo ---
const BEAM_TREE = {
  '<start>': { 'I': 0.5, 'The': 0.3, 'We': 0.2 },
  'I':       { 'love': 0.6, 'like': 0.3, 'see': 0.1 },
  'The':     { 'cat': 0.5, 'dog': 0.4, 'bird': 0.1 },
  'We':      { 'go': 0.5, 'run': 0.3, 'eat': 0.2 },
  'love':    { 'cats': 0.7, 'dogs': 0.3 },
  'like':    { 'food': 0.6, 'music': 0.4 },
  'see':     { 'stars': 0.8, 'birds': 0.2 },
  'cat':     { 'sleeps': 0.6, 'runs': 0.4 },
  'dog':     { 'barks': 0.7, 'plays': 0.3 },
  'bird':    { 'flies': 0.9, 'sings': 0.1 },
};

function NLPEmbeddings() {
  const [section, setSection] = useState('embeddings');

  return (
    <div className="nlp-panel">
      <div className="nlp-section-tabs">
        {[
          { id: 'embeddings', label: 'Word Embeddings', icon: <FaFont /> },
          { id: 'word2vec',   label: 'Word2Vec & GloVe', icon: <FaSearch /> },
          { id: 'beam',       label: 'Beam Search', icon: <FaExchangeAlt /> },
          { id: 'metrics',    label: 'BLEU & Perplexity', icon: <FaChartBar /> },
        ].map(s => (
          <button key={s.id}
            className={`nlp-sec-btn ${section === s.id ? 'active' : ''}`}
            onClick={() => setSection(s.id)}>
            {s.icon} <span>{s.label}</span>
          </button>
        ))}
      </div>

      {section === 'embeddings' && <EmbeddingSection />}
      {section === 'word2vec' && <Word2VecSection />}
      {section === 'beam' && <BeamSearchSection />}
      {section === 'metrics' && <MetricsSection />}
    </div>
  );
}

// ─── Embedding Explorer ───
function EmbeddingSection() {
  const [wordA, setWordA] = useState('king');
  const [wordB, setWordB] = useState('queen');
  const words = Object.keys(WORD_EMBEDDINGS);
  const sim = cosineSim(WORD_EMBEDDINGS[wordA], WORD_EMBEDDINGS[wordB]);

  const allSims = useMemo(() => {
    return words.map(w => ({
      word: w,
      sim: cosineSim(WORD_EMBEDDINGS[wordA], WORD_EMBEDDINGS[w]),
    })).sort((a, b) => b.sim - a.sim);
  }, [wordA, words]);

  // Analogy: king - man + woman = ?
  const [showAnalogy, setShowAnalogy] = useState(false);
  const analogyResult = useMemo(() => {
    const v = WORD_EMBEDDINGS['king'].map((val, i) =>
      val - WORD_EMBEDDINGS['man'][i] + WORD_EMBEDDINGS['woman'][i]
    );
    return words.map(w => ({
      word: w,
      sim: cosineSim(v, WORD_EMBEDDINGS[w]),
    })).sort((a, b) => b.sim - a.sim).filter(w => !['king','man','woman'].includes(w.word));
  }, [words]);

  return (
    <div className="nlp-section">
      <div className="nlp-intro">
        <FaInfoCircle style={{ color: '#00467F', flexShrink: 0 }} />
        <span>
          Word embeddings map words to dense vectors where similar words are close together.
          The embedding matrix E maps a one-hot vector o_w to its embedding e_w = E·o_w (CS230).
          Explore cosine similarity and word analogies below.
        </span>
      </div>

      <div className="embed-explorer">
        <div className="embed-compare">
          <div className="embed-word-select">
            <label>Word A:</label>
            <select value={wordA} onChange={e => setWordA(e.target.value)}>
              {words.map(w => <option key={w} value={w}>{w}</option>)}
            </select>
          </div>
          <div className="embed-word-select">
            <label>Word B:</label>
            <select value={wordB} onChange={e => setWordB(e.target.value)}>
              {words.map(w => <option key={w} value={w}>{w}</option>)}
            </select>
          </div>
          <div className="embed-sim-result">
            <span className="sim-label">Cosine Similarity:</span>
            <span className="sim-value" style={{
              color: sim > 0.9 ? '#22c55e' : sim > 0.7 ? '#f59e0b' : '#ef4444'
            }}>{sim.toFixed(4)}</span>
          </div>
        </div>

        <div className="embed-vectors">
          <div className="embed-vec-row">
            <span className="vec-word">{wordA}</span>
            {WORD_EMBEDDINGS[wordA].map((v, i) => (
              <div key={i} className="vec-cell" style={{ background: `rgba(0,70,127,${v})` }}>
                <span className="vec-dim">{EMBED_DIMS[i]}</span>
                <span className="vec-val">{v.toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="embed-vec-row">
            <span className="vec-word">{wordB}</span>
            {WORD_EMBEDDINGS[wordB].map((v, i) => (
              <div key={i} className="vec-cell" style={{ background: `rgba(0,70,127,${v})` }}>
                <span className="vec-dim">{EMBED_DIMS[i]}</span>
                <span className="vec-val">{v.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="embed-nearest">
          <h4>Nearest to "{wordA}" (by cosine similarity):</h4>
          <div className="nearest-list">
            {allSims.slice(0, 5).map((item, i) => (
              <div key={i} className="nearest-item">
                <span className="nearest-word">{item.word}</span>
                <div className="nearest-bar-wrap">
                  <div className="nearest-bar" style={{ width: `${item.sim * 100}%` }} />
                </div>
                <span className="nearest-val">{item.sim.toFixed(3)}</span>
              </div>
            ))}
          </div>
        </div>

        <button className="analogy-btn" onClick={() => setShowAnalogy(!showAnalogy)}>
          <FaStar /> {showAnalogy ? 'Hide' : 'Try'} Analogy: king - man + woman = ?
        </button>
        {showAnalogy && (
          <div className="analogy-result">
            <div className="analogy-eq">
              <span className="analogy-word">king</span>
              <span className="analogy-op">−</span>
              <span className="analogy-word">man</span>
              <span className="analogy-op">+</span>
              <span className="analogy-word">woman</span>
              <span className="analogy-op">≈</span>
              <span className="analogy-word result">{analogyResult[0]?.word}</span>
            </div>
            <div className="analogy-scores">
              {analogyResult.slice(0, 3).map((r, i) => (
                <span key={i} className="analogy-score">
                  {r.word}: {r.sim.toFixed(3)}
                </span>
              ))}
            </div>
            <div className="analogy-note">
              <FaLightbulb style={{ color: '#f59e0b' }} />
              Word analogies work because embeddings capture semantic relationships as vector offsets.
              The "royalty" direction is preserved when shifting from male to female (CS230).
            </div>
          </div>
        )}
      </div>

      <div className="nlp-formula-box">
        <h4>Cosine Similarity (CS230)</h4>
        <code>similarity(w1, w2) = (w1 · w2) / (||w1|| × ||w2||) = cos(θ)</code>
        <p>Values range from -1 (opposite) to 1 (identical direction). Used to measure word relatedness.</p>
      </div>
    </div>
  );
}


// ─── Word2Vec & GloVe Section ───
function Word2VecSection() {
  const [method, setMethod] = useState('skipgram');

  return (
    <div className="nlp-section">
      <div className="nlp-intro">
        <FaInfoCircle style={{ color: '#00467F', flexShrink: 0 }} />
        <span>
          Word2Vec is a framework for learning word embeddings by estimating the likelihood that
          a given word appears near other words. GloVe uses co-occurrence statistics instead (CS230).
        </span>
      </div>

      <div className="w2v-method-tabs">
        {[
          { id: 'skipgram', label: 'Skip-gram' },
          { id: 'negative', label: 'Negative Sampling' },
          { id: 'glove', label: 'GloVe' },
        ].map(m => (
          <button key={m.id}
            className={`w2v-tab ${method === m.id ? 'active' : ''}`}
            onClick={() => setMethod(m.id)}>
            {m.label}
          </button>
        ))}
      </div>

      {method === 'skipgram' && (
        <div className="w2v-content">
          <div className="w2v-diagram">
            <div className="w2v-context">
              {['The', 'cat'].map((w, i) => (
                <span key={i} className="w2v-ctx-word">{w}</span>
              ))}
              <span className="w2v-center-word">sat</span>
              {['on', 'the'].map((w, i) => (
                <span key={i} className="w2v-ctx-word">{w}</span>
              ))}
            </div>
            <div className="w2v-arrows">
              <FaArrowRight className="w2v-arrow" />
              <span className="w2v-arrow-label">Predict context from center word</span>
            </div>
          </div>
          <div className="nlp-formula-box">
            <h4>Skip-gram Probability (CS230)</h4>
            <code>P(t|c) = exp(θ_t^T · e_c) / Σ_j exp(θ_j^T · e_c)</code>
            <p>Given context word c, predict target word t. The softmax over the entire vocabulary V
              makes this expensive to compute, motivating negative sampling.</p>
          </div>
          <div className="w2v-keypoint">
            <FaLightbulb style={{ color: '#f59e0b' }} />
            <span>Skip-gram learns by predicting surrounding context words from a center word.
              The window size determines how many neighbors to consider. Larger windows capture
              broader semantic relationships.</span>
          </div>
        </div>
      )}

      {method === 'negative' && (
        <div className="w2v-content">
          <div className="w2v-neg-example">
            <div className="neg-pair positive">
              <span className="neg-label">Positive</span>
              <span className="neg-words">"sat" → "cat"</span>
              <span className="neg-target">y = 1</span>
            </div>
            {['king', 'apple', 'run', 'blue'].map((w, i) => (
              <div key={i} className="neg-pair negative">
                <span className="neg-label">Negative</span>
                <span className="neg-words">"sat" → "{w}"</span>
                <span className="neg-target">y = 0</span>
              </div>
            ))}
          </div>
          <div className="nlp-formula-box">
            <h4>Negative Sampling (CS230)</h4>
            <code>P(y=1|c,t) = σ(θ_t^T · e_c)</code>
            <p>Instead of softmax over all V words, train k binary classifiers.
              Each uses 1 positive example and k negative examples sampled from the corpus.
              Typical k: 5-20 for small datasets, 2-5 for large ones.</p>
          </div>
          <div className="w2v-keypoint">
            <FaLightbulb style={{ color: '#f59e0b' }} />
            <span>Negative sampling dramatically reduces computation: from O(|V|) per update
              to O(k) where k is the number of negative samples. The negative words are sampled
              proportional to their frequency raised to the 3/4 power.</span>
          </div>
        </div>
      )}

      {method === 'glove' && (
        <div className="w2v-content">
          <div className="glove-matrix">
            <h4>Co-occurrence Matrix X</h4>
            <div className="glove-grid">
              <div className="glove-header" />
              {['the', 'cat', 'sat', 'on'].map(w => (
                <div key={w} className="glove-header">{w}</div>
              ))}
              {['the', 'cat', 'sat', 'on'].map((w, i) => (
                <React.Fragment key={w}>
                  <div className="glove-header">{w}</div>
                  {[
                    [0, 2, 1, 2],
                    [2, 0, 1, 0],
                    [1, 1, 0, 1],
                    [2, 0, 1, 0],
                  ][i].map((v, j) => (
                    <div key={j} className="glove-cell"
                      style={{ background: `rgba(0,70,127,${v * 0.3})` }}>
                      {v}
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
            <p className="glove-note">X_ij = number of times target i appeared with context j</p>
          </div>
          <div className="nlp-formula-box">
            <h4>GloVe Cost Function (CS230)</h4>
            <code>J(θ) = ½ Σ_ij f(X_ij)(θ_i^T·e_j + b_i + b_j' - log(X_ij))²</code>
            <p>Where f is a weighting function with f(0) = 0. The final embedding is the average:
              e_w^(final) = (e_w + θ_w) / 2, exploiting the symmetry between e and θ.</p>
          </div>
          <div className="w2v-keypoint">
            <FaLightbulb style={{ color: '#f59e0b' }} />
            <span>GloVe (Global Vectors) combines the benefits of count-based methods (like LSA)
              with prediction-based methods (like Word2Vec). It directly optimizes on the
              co-occurrence statistics of the entire corpus.</span>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Beam Search Section ───
function BeamSearchSection() {
  const [beamWidth, setBeamWidth] = useState(2);
  const [step, setStep] = useState(0);

  const beamResults = useMemo(() => {
    let beams = [{ words: ['<start>'], prob: 1.0 }];
    const history = [beams.map(b => ({ ...b }))];

    for (let s = 0; s < 3; s++) {
      let candidates = [];
      for (const beam of beams) {
        const lastWord = beam.words[beam.words.length - 1];
        const nextWords = BEAM_TREE[lastWord] || {};
        for (const [word, prob] of Object.entries(nextWords)) {
          candidates.push({
            words: [...beam.words, word],
            prob: beam.prob * prob,
          });
        }
      }
      candidates.sort((a, b) => b.prob - a.prob);
      beams = candidates.slice(0, beamWidth);
      history.push(beams.map(b => ({ ...b })));
    }
    return history;
  }, [beamWidth]);

  const currentBeams = beamResults[Math.min(step, beamResults.length - 1)];

  return (
    <div className="nlp-section">
      <div className="nlp-intro">
        <FaInfoCircle style={{ color: '#00467F', flexShrink: 0 }} />
        <span>
          Beam search is a heuristic search algorithm used in machine translation and speech recognition
          to find the most likely output sequence. It keeps the top B candidates at each step (CS230).
        </span>
      </div>

      <div className="beam-controls">
        <div className="beam-width-control">
          <label>Beam Width (B): {beamWidth}</label>
          <input type="range" min={1} max={4} value={beamWidth}
            onChange={e => { setBeamWidth(Number(e.target.value)); setStep(0); }}
            aria-label="Beam width" />
          <div className="beam-width-labels">
            <span>Greedy (1)</span><span>Wide (4)</span>
          </div>
        </div>
        <div className="beam-step-control">
          <label>Step: {step}/{beamResults.length - 1}</label>
          <div className="beam-step-btns">
            <button onClick={() => setStep(0)} disabled={step === 0}>Reset</button>
            <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}>← Back</button>
            <button onClick={() => setStep(Math.min(beamResults.length - 1, step + 1))}
              disabled={step >= beamResults.length - 1}>Next →</button>
          </div>
        </div>
      </div>

      <div className="beam-viz">
        <div className="beam-candidates">
          {currentBeams.map((beam, i) => (
            <div key={i} className={`beam-candidate ${i === 0 ? 'best' : ''}`}>
              <div className="beam-rank">#{i + 1}</div>
              <div className="beam-words">
                {beam.words.slice(1).map((w, j) => (
                  <span key={j} className="beam-word">{w}</span>
                ))}
                {beam.words.length === 1 && <span className="beam-word empty">...</span>}
              </div>
              <div className="beam-prob">
                P = {beam.prob.toFixed(4)}
              </div>
              <div className="beam-prob-bar">
                <div className="beam-prob-fill"
                  style={{ width: `${beam.prob * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="nlp-formula-box">
        <h4>Length Normalization (CS230)</h4>
        <code>Objective = (1/T_y^α) Σ_t log P(y^{'<'}t{'>'}|x, y^{'<'}1{'>'}, ..., y^{'<'}t-1{'>'})</code>
        <p>Raw probabilities favor shorter sequences. Length normalization divides by T_y^α
          (typically α ≈ 0.7) to balance. This is the normalized log-likelihood objective.</p>
      </div>

      <div className="beam-tradeoff">
        <FaLightbulb style={{ color: '#f59e0b' }} />
        <span>
          Large B → better results but slower. Small B → faster but may miss optimal sequences.
          B=1 is greedy search. Standard value is around B=10 (CS230).
          {beamWidth === 1 && ' You are currently using greedy search — only the single best candidate is kept.'}
        </span>
      </div>
    </div>
  );
}

// ─── BLEU & Perplexity Section ───
function MetricsSection() {
  const [metric, setMetric] = useState('bleu');

  const refTokens = ['the', 'cat', 'sat', 'on', 'the', 'mat'];
  const predTokens = ['the', 'cat', 'is', 'on', 'a', 'mat'];

  const bleuScores = useMemo(() => {
    const scores = [];
    for (let n = 1; n <= 4; n++) {
      const refNgrams = {};
      const predNgrams = {};
      for (let i = 0; i <= refTokens.length - n; i++) {
        const ng = refTokens.slice(i, i + n).join(' ');
        refNgrams[ng] = (refNgrams[ng] || 0) + 1;
      }
      for (let i = 0; i <= predTokens.length - n; i++) {
        const ng = predTokens.slice(i, i + n).join(' ');
        predNgrams[ng] = (predNgrams[ng] || 0) + 1;
      }
      let clipped = 0, total = 0;
      for (const [ng, count] of Object.entries(predNgrams)) {
        clipped += Math.min(count, refNgrams[ng] || 0);
        total += count;
      }
      scores.push({ n, precision: total > 0 ? clipped / total : 0 });
    }
    const avgLogP = scores.reduce((s, sc) => s + (sc.precision > 0 ? Math.log(sc.precision) : -10), 0) / scores.length;
    const bleu = Math.exp(avgLogP);
    return { ngramScores: scores, bleu };
  }, []);

  return (
    <div className="nlp-section">
      <div className="nlp-intro">
        <FaInfoCircle style={{ color: '#00467F', flexShrink: 0 }} />
        <span>
          BLEU score evaluates machine translation quality using n-gram precision.
          Perplexity measures language model quality — lower is better (CS230).
        </span>
      </div>

      <div className="metrics-tabs">
        <button className={`metrics-tab ${metric === 'bleu' ? 'active' : ''}`}
          onClick={() => setMetric('bleu')}>
          <FaGlobe /> BLEU Score
        </button>
        <button className={`metrics-tab ${metric === 'perplexity' ? 'active' : ''}`}
          onClick={() => setMetric('perplexity')}>
          <FaChartBar /> Perplexity
        </button>
      </div>

      {metric === 'bleu' && (
        <div className="bleu-section">
          <div className="bleu-example">
            <div className="bleu-sentence">
              <span className="bleu-label">Reference:</span>
              <div className="bleu-tokens">
                {refTokens.map((t, i) => (
                  <span key={i} className={`bleu-token ${predTokens.includes(t) ? 'match' : ''}`}>{t}</span>
                ))}
              </div>
            </div>
            <div className="bleu-sentence">
              <span className="bleu-label">Predicted:</span>
              <div className="bleu-tokens">
                {predTokens.map((t, i) => (
                  <span key={i} className={`bleu-token ${refTokens.includes(t) ? 'match' : 'miss'}`}>{t}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="bleu-scores">
            {bleuScores.ngramScores.map(s => (
              <div key={s.n} className="bleu-ngram">
                <span className="bleu-n">{s.n}-gram</span>
                <div className="bleu-bar-wrap">
                  <div className="bleu-bar" style={{ width: `${s.precision * 100}%` }} />
                </div>
                <span className="bleu-val">p{s.n} = {s.precision.toFixed(3)}</span>
              </div>
            ))}
            <div className="bleu-total">
              <FaStar style={{ color: '#f59e0b' }} />
              <span>BLEU = {bleuScores.bleu.toFixed(4)}</span>
            </div>
          </div>

          <div className="nlp-formula-box">
            <h4>BLEU Score (CS230)</h4>
            <code>BLEU = exp((1/n) Σ_k p_k)</code>
            <p>Where p_n is the clipped n-gram precision: count_clip(n-gram) / count(n-gram) in the prediction.
              Clipping prevents inflated scores from repeated words.</p>
          </div>
        </div>
      )}

      {metric === 'perplexity' && (
        <div className="perplexity-section">
          <div className="pp-example">
            <h4>Language Model Evaluation</h4>
            <p>A language model estimates P(y) — the probability of a sentence.
              Perplexity measures how "surprised" the model is by the test data.</p>
            <div className="pp-comparison">
              <div className="pp-model good">
                <span className="pp-model-name">Good Model</span>
                <span className="pp-model-val">PP = 42</span>
                <span className="pp-model-desc">Low perplexity = confident, accurate predictions</span>
              </div>
              <div className="pp-model bad">
                <span className="pp-model-name">Poor Model</span>
                <span className="pp-model-val">PP = 350</span>
                <span className="pp-model-desc">High perplexity = uncertain, poor predictions</span>
              </div>
            </div>
          </div>

          <div className="nlp-formula-box">
            <h4>Perplexity (CS230)</h4>
            <code>PP = Π_t (1 / Σ_j y_j^(t) · ŷ_j^(t))^(1/T)</code>
            <p>Perplexity is the inverse probability of the dataset, normalized by the number of words T.
              Intuitively, it represents the effective vocabulary size the model is choosing from at each step.
              Lower perplexity means the model assigns higher probability to the correct words.</p>
          </div>

          <div className="pp-insight">
            <FaLightbulb style={{ color: '#f59e0b' }} />
            <span>
              A perplexity of 42 means the model is as uncertain as if it were choosing uniformly
              among 42 words at each step. State-of-the-art language models achieve perplexity below 20
              on standard benchmarks.
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default NLPEmbeddings;

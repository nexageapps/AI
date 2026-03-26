import React, { useState, useCallback, useRef } from 'react';
import {
  FaPlay, FaRedo, FaThermometerHalf, FaInfoCircle,
  FaFont, FaChartLine, FaSmile, FaSnowflake, FaBalanceScale, FaFire,
  FaThumbsUp, FaThumbsDown, FaMeh, FaArrowRight,
} from 'react-icons/fa';
import './SequencePlayground.css';

function predictNext(input, temperature) {
  if (!input) return [];
  const lastChar = input.slice(-1).toLowerCase();
  const commonFollowers = {
    'a': 'tnlrsdcbm ', 'b': 'elouyair ', 'c': 'oehaktil ',
    'd': ' eioasuy', 'e': ' rnsdalctm', 'f': ' oieratlu',
    'g': ' ehioarsu', 'h': 'eiao trus', 'i': 'nstcodel ',
    'j': 'uoeai ', 'k': 'eins ao', 'l': 'elioa yds',
    'm': 'eaoi pubs', 'n': ' gdtseoia', 'o': 'nfrutmlw ',
    'p': 'eroalith ', 'q': 'u', 'r': 'eoia stny',
    's': ' tehoiupa', 't': 'heioa rsu', 'u': 'rnstlcpb ',
    'v': 'eiao', 'w': 'aihoe nrs', 'x': 'pticea ',
    'y': ' soeitab', 'z': 'eiao ', ' ': 'taisohwbcm',
    '.': ' ', ',': ' ', '!': ' ', '?': ' ',
  };
  const followers = commonFollowers[lastChar] || 'etaoinshrd ';
  const predictions = [];
  for (let i = 0; i < followers.length && predictions.length < 5; i++) {
    const char = followers[i];
    const baseProb = 1 / (i + 1);
    const adjustedProb = Math.pow(baseProb, 1 / Math.max(temperature, 0.1));
    predictions.push({ char: char === ' ' ? '[space]' : char, prob: adjustedProb, raw: char });
  }
  const total = predictions.reduce((s, p) => s + p.prob, 0);
  predictions.forEach(p => { p.prob = p.prob / total; });
  return predictions;
}

function sampleFromPredictions(predictions, temperature) {
  if (!predictions.length) return '';
  const adjusted = predictions.map(p => ({ ...p, prob: Math.pow(p.prob, 1 / Math.max(temperature, 0.1)) }));
  const total = adjusted.reduce((s, p) => s + p.prob, 0);
  let r = Math.random() * total;
  for (const p of adjusted) { r -= p.prob; if (r <= 0) return p.raw; }
  return adjusted[0].raw;
}

function SequencePlayground() {
  const [input, setInput] = useState('The cat sat on');
  const [generated, setGenerated] = useState('');
  const [temperature, setTemperature] = useState(0.5);
  const [isGenerating, setIsGenerating] = useState(false);
  const [mode, setMode] = useState('text');
  const [sineData] = useState(() => {
    const data = [];
    for (let i = 0; i < 30; i++) data.push(Math.sin(i * 0.3) * 0.5 + 0.5);
    return data;
  });
  const [sinePhase, setSinePhase] = useState(0);
  const [sentimentText, setSentimentText] = useState('');
  const [sentimentResult, setSentimentResult] = useState(null);
  const [hiddenSteps, setHiddenSteps] = useState([]);
  const intervalRef = useRef(null);

  const generateText = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsGenerating(true);
    setGenerated('');
    setHiddenSteps([]);
    let result = '';
    let step = 0;
    const maxSteps = 60;
    intervalRef.current = setInterval(() => {
      if (step >= maxSteps) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setIsGenerating(false);
        return;
      }
      const preds = predictNext(input + result, temperature);
      const nextChar = sampleFromPredictions(preds, temperature);
      result += nextChar;
      setGenerated(result);
      setHiddenSteps(prev => [...prev, { char: nextChar, topPred: preds[0]?.char || '', conf: preds[0]?.prob || 0 }]);
      step++;
    }, 80);
  }, [input, temperature]);

  const stopGeneration = useCallback(() => {
    if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
    setIsGenerating(false);
  }, []);

  const analyzeSentiment = useCallback(() => {
    const text = sentimentText.toLowerCase();
    const positiveWords = ['good', 'great', 'love', 'amazing', 'wonderful', 'excellent', 'happy', 'best', 'fantastic', 'beautiful', 'enjoy', 'perfect', 'brilliant', 'awesome', 'outstanding', 'superb'];
    const negativeWords = ['bad', 'terrible', 'hate', 'awful', 'horrible', 'worst', 'boring', 'poor', 'ugly', 'disappointing', 'waste', 'stupid', 'annoying', 'dreadful', 'mediocre'];
    let score = 0;
    const words = text.split(/\s+/);
    const highlights = [];
    const stateHistory = [];
    let runningState = 0;
    words.forEach(word => {
      const clean = word.replace(/[^a-z]/g, '');
      if (positiveWords.includes(clean)) { score += 1; highlights.push({ word, type: 'pos' }); }
      else if (negativeWords.includes(clean)) { score -= 1; highlights.push({ word, type: 'neg' }); }
      else { highlights.push({ word, type: 'neutral' }); }
      runningState = Math.tanh(runningState * 0.8 + score * 0.3);
      stateHistory.push(runningState);
    });
    const normalized = Math.tanh(score / 3);
    const label = normalized > 0.2 ? 'Positive' : normalized < -0.2 ? 'Negative' : 'Neutral';
    setSentimentResult({ score: normalized, label, highlights, rawScore: score, stateHistory });
  }, [sentimentText]);

  const predictions = mode === 'text' ? predictNext(input + generated, temperature) : [];

  const regenerateSine = () => setSinePhase(p => p + 1);
  const sineDataShifted = sineData.map((v, i) => Math.sin((i + sinePhase) * 0.3) * 0.5 + 0.5);

  return (
    <div className="seq-playground">
      <div className="sp-mode-bar">
        <button className={`sp-mode-btn ${mode === 'text' ? 'active' : ''}`} onClick={() => setMode('text')}>
          <FaFont /> Text Generation
        </button>
        <button className={`sp-mode-btn ${mode === 'sine' ? 'active' : ''}`} onClick={() => setMode('sine')}>
          <FaChartLine /> Time Series
        </button>
        <button className={`sp-mode-btn ${mode === 'sentiment' ? 'active' : ''}`} onClick={() => setMode('sentiment')}>
          <FaSmile /> Sentiment Analysis
        </button>
      </div>

      {mode === 'text' && (
        <div className="sp-text-mode">
          <div className="sp-input-area">
            <label className="sp-label">Seed Text</label>
            <div className="sp-input-row">
              <input type="text" className="sp-input" value={input}
                onChange={e => { setInput(e.target.value); setGenerated(''); setHiddenSteps([]); }}
                placeholder="Type a starting phrase..." aria-label="Seed text for generation" />
              <button className="sp-gen-btn" onClick={isGenerating ? stopGeneration : generateText} disabled={!input}>
                {isGenerating ? <><FaRedo className="spinning" /> Stop</> : <><FaPlay /> Generate</>}
              </button>
              <button className="sp-reset-btn" onClick={() => { stopGeneration(); setGenerated(''); setHiddenSteps([]); }}>
                <FaRedo />
              </button>
            </div>
          </div>

          <div className="sp-temp-control">
            <FaThermometerHalf style={{ color: temperature > 0.7 ? '#ef4444' : temperature < 0.3 ? '#3b82f6' : '#f59e0b' }} />
            <label>Temperature: {temperature.toFixed(2)}</label>
            <input type="range" min={0.1} max={1.5} step={0.05} value={temperature}
              onChange={e => setTemperature(Number(e.target.value))} aria-label="Temperature control" />
            <span className="sp-temp-hint">
              {temperature < 0.3 && <><FaSnowflake /> Conservative</>}
              {temperature >= 0.3 && temperature < 0.7 && <><FaBalanceScale /> Balanced</>}
              {temperature >= 0.7 && temperature < 1.1 && <><FaFire /> Creative</>}
              {temperature >= 1.1 && <><FaFire style={{ color: '#ef4444' }} /> Wild</>}
            </span>
          </div>

          <div className="sp-output-area">
            <label className="sp-label">Generated Output</label>
            <div className="sp-output-box">
              <span className="sp-seed">{input}</span>
              <span className="sp-generated">{generated}</span>
              {isGenerating && <span className="sp-cursor">|</span>}
            </div>
          </div>

          <div className="sp-two-col">
            <div className="sp-predictions">
              <label className="sp-label">Next Character Predictions</label>
              <div className="sp-pred-bars">
                {predictions.map((p, i) => (
                  <div key={i} className="sp-pred-bar">
                    <span className="sp-pred-char">{p.char}</span>
                    <div className="sp-pred-track">
                      <div className="sp-pred-fill" style={{ width: `${p.prob * 100}%`, background: i === 0 ? '#00467F' : '#93c5fd' }} />
                    </div>
                    <span className="sp-pred-pct">{(p.prob * 100).toFixed(1)}%</span>
                  </div>
                ))}
              </div>
            </div>

            {hiddenSteps.length > 0 && (
              <div className="sp-confidence-chart">
                <label className="sp-label">Confidence Over Time</label>
                <div className="sp-conf-bars">
                  {hiddenSteps.slice(-20).map((s, i) => (
                    <div key={i} className="sp-conf-bar-wrap" title={`"${s.char}" conf: ${(s.conf * 100).toFixed(1)}%`}>
                      <div className="sp-conf-bar" style={{ height: `${s.conf * 100}%`, background: s.conf > 0.5 ? '#22c55e' : s.conf > 0.3 ? '#f59e0b' : '#ef4444' }} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="sp-info">
            <FaInfoCircle style={{ color: '#00467F', flexShrink: 0 }} />
            <span>This simulates how an RNN generates text character by character. At each step, the model predicts probabilities for the next character based on all previous characters (encoded in the hidden state). Temperature controls randomness: low values pick the most likely character, high values explore more options.</span>
          </div>
        </div>
      )}

      {mode === 'sine' && (
        <div className="sp-sine-mode">
          <div className="sp-sine-chart">
            <label className="sp-label"><FaChartLine style={{ marginRight: 4 }} /> Sine Wave Prediction — RNN learns the pattern</label>
            <div className="sine-canvas">
              {sineDataShifted.map((val, i) => (
                <div key={i} className="sine-bar-wrap">
                  <div className="sine-bar" style={{
                    height: `${val * 100}%`,
                    background: i < 20 ? '#00467F' : i < 25 ? '#8b5cf6' : '#22c55e',
                    opacity: i < 20 ? 1 : 0.7,
                  }} />
                  {i === 19 && <div className="sine-divider" />}
                </div>
              ))}
            </div>
            <div className="sine-legend">
              <span><span className="sine-dot" style={{ background: '#00467F' }} /> Input sequence (known)</span>
              <span><span className="sine-dot" style={{ background: '#8b5cf6' }} /> RNN predicted</span>
              <span><span className="sine-dot" style={{ background: '#22c55e' }} /> Actual future</span>
            </div>
          </div>
          <button className="sp-gen-btn" onClick={regenerateSine} style={{ alignSelf: 'flex-start' }}>
            <FaRedo /> Shift Phase
          </button>
          <div className="sp-info">
            <FaInfoCircle style={{ color: '#00467F', flexShrink: 0 }} />
            <span>RNNs excel at time series prediction. Given past values (blue), the model predicts future values (purple). The green bars show actual future values. In practice, an LSTM is trained on many sequences to learn the underlying pattern. The hidden state accumulates information about the trend, periodicity, and amplitude.</span>
          </div>
        </div>
      )}

      {mode === 'sentiment' && (
        <div className="sp-sentiment-mode">
          <div className="sp-input-area">
            <label className="sp-label">Enter a movie review or any text</label>
            <textarea className="sp-textarea" value={sentimentText}
              onChange={e => { setSentimentText(e.target.value); setSentimentResult(null); }}
              placeholder="e.g., This movie was absolutely amazing! The acting was brilliant and the story was wonderful."
              rows={3} aria-label="Text for sentiment analysis" />
            <button className="sp-gen-btn" onClick={analyzeSentiment} disabled={!sentimentText.trim()}>
              <FaSmile /> Analyze Sentiment
            </button>
          </div>

          {sentimentResult && (
            <div className="sp-sentiment-result">
              <div className={`sp-sentiment-badge ${sentimentResult.score > 0.2 ? 'positive' : sentimentResult.score < -0.2 ? 'negative' : 'neutral'}`}>
                {sentimentResult.score > 0.2 && <FaThumbsUp className="sp-sent-icon" />}
                {sentimentResult.score < -0.2 && <FaThumbsDown className="sp-sent-icon" />}
                {sentimentResult.score >= -0.2 && sentimentResult.score <= 0.2 && <FaMeh className="sp-sent-icon" />}
                <span className="sp-sent-label">{sentimentResult.label}</span>
                <span className="sp-sent-score">Score: {sentimentResult.score.toFixed(3)}</span>
              </div>

              <div className="sp-sentiment-meter">
                <span>Negative</span>
                <div className="sp-meter-track">
                  <div className="sp-meter-fill" style={{ left: `${(sentimentResult.score + 1) / 2 * 100}%` }} />
                </div>
                <span>Positive</span>
              </div>

              <div className="sp-highlighted-text">
                <label className="sp-label">Word-by-word analysis (how an RNN reads)</label>
                <div className="sp-word-flow">
                  {sentimentResult.highlights.map((h, i) => (
                    <React.Fragment key={i}>
                      <span className={`sp-word sp-word-${h.type}`}>{h.word}</span>
                      {i < sentimentResult.highlights.length - 1 && <FaArrowRight className="sp-word-arrow" />}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {sentimentResult.stateHistory && (
                <div className="sp-state-evolution">
                  <label className="sp-label">Hidden State Evolution (sentiment accumulation)</label>
                  <div className="sp-state-bars">
                    {sentimentResult.stateHistory.map((val, i) => (
                      <div key={i} className="sp-state-bar-wrap"
                        title={`After "${sentimentResult.highlights[i]?.word}": ${val.toFixed(3)}`}>
                        <div className="sp-state-bar"
                          style={{
                            height: `${Math.abs(val) * 100}%`,
                            background: val > 0 ? '#22c55e' : '#ef4444',
                            marginTop: val > 0 ? 'auto' : 0,
                            marginBottom: val > 0 ? 0 : 'auto',
                          }} />
                      </div>
                    ))}
                  </div>
                  <div className="sp-state-axis">
                    <span>Negative</span><span>Neutral</span><span>Positive</span>
                  </div>
                </div>
              )}

              <div className="sp-info">
                <FaInfoCircle style={{ color: '#00467F', flexShrink: 0 }} />
                <span>In a real LSTM sentiment model, the network reads the entire review word by word, building up a hidden state that captures the overall sentiment. Positive words push the state up, negative words push it down. The final hidden state is passed through a dense layer with sigmoid activation to produce a probability between 0 (negative) and 1 (positive).</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SequencePlayground;

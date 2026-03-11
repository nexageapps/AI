import React, { useState } from 'react';
import './Tutorial.css';

const Tutorial = ({ onClose }) => {
  const [step, setStep] = useState(0);

  const tutorialSteps = [
    {
      title: "Welcome to Hill Climbing Game!",
      content: (
        <>
          <p><strong>Your Mission:</strong> You're blindfolded on a colorful hill. Your goal is to reach the lowest point (the green target) by following clues!</p>
          <p><strong>The Challenge:</strong> You can't see where you are, but you can feel which way is downhill. A yellow arrow shows you the direction.</p>
          <div className="analogy">
            <strong>Imagine:</strong> You're playing a treasure hunt game where you're blindfolded and have to find the treasure at the bottom of a hill. You can only feel the ground under your feet to know which way to go!
          </div>
          <p><strong>Why This Matters:</strong> This is how computers learn! They use the same trick to train AI like ChatGPT and image recognition.</p>
        </>
      )
    },
    {
      title: "The Goal",
      content: (
        <>
          <p>Your goal is to reach the <span className="highlight-green">green target</span> at the bottom of the hill.</p>
          <p>The <span className="highlight-blue">blue circle with blindfold</span> is you - the player.</p>
          <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='100'%3E%3Ccircle cx='50' cy='50' r='20' fill='%2300d9ff' stroke='white' stroke-width='2'/%3E%3Crect x='40' y='45' width='20' height='8' fill='black'/%3E%3Ctext x='80' y='55' fill='white' font-size='14'%3EYou (blindfolded)%3C/text%3E%3C/svg%3E" alt="Player" />
          <p>The colored background shows elevation:</p>
          <ul>
            <li><span className="color-blue">Blue</span> = Low elevation (good!)</li>
            <li><span className="color-green">Green/Yellow</span> = Medium elevation</li>
            <li><span className="color-red">Red</span> = High elevation (bad!)</li>
          </ul>
        </>
      )
    },
    {
      title: "The Gradient (Yellow Arrow)",
      content: (
        <>
          <p>The <span className="highlight-yellow">yellow arrow</span> shows the <strong>gradient</strong> - the direction of steepest descent.</p>
          <p><strong>Think of it as:</strong> If you put a ball on the ground, which way would it roll?</p>
          <div className="key-point">
            <strong>Longer arrow</strong> = Steeper slope (far from goal)<br/>
            <strong>Shorter arrow</strong> = Flatter slope (near goal)
          </div>
          <p>In AI: The gradient tells us which direction to adjust our model parameters.</p>
        </>
      )
    },
    {
      title: "Learning Rate (Step Size)",
      content: (
        <>
          <p>The <strong>Learning Rate</strong> controls how big each step you take is.</p>
          <div className="comparison">
            <div className="comparison-item">
              <strong>Small Learning Rate (0.1)</strong>
              <ul>
                <li>+ Safe, stable steps</li>
                <li>- Takes many steps to reach goal</li>
                <li>Best for: Learning the concept</li>
              </ul>
            </div>
            <div className="comparison-item">
              <strong>Large Learning Rate (1.0)</strong>
              <ul>
                <li>+ Fast progress</li>
                <li>- Might overshoot and miss the goal</li>
                <li>Best for: Seeing what happens when too aggressive</li>
              </ul>
            </div>
          </div>
          <p>In AI: Too small = slow training. Too large = unstable training.</p>
        </>
      )
    },
    {
      title: "How to Play",
      content: (
        <>
          <h3>Step 1: Choose Difficulty</h3>
          <p>Start with <strong>"Bowl (Simple)"</strong> surface and <strong>"Easy (0.1)"</strong> learning rate.</p>
          
          <h3>Step 2: Take Steps</h3>
          <ul>
            <li>Click <strong>"Take Step"</strong> button (or press Space)</li>
            <li>Watch the blue circle move in the direction of the yellow arrow</li>
            <li>See the path trail showing where you've been</li>
          </ul>

          <h3>Step 3: Watch the Metrics</h3>
          <ul>
            <li><strong>Iterations:</strong> How many steps you've taken</li>
            <li><strong>Distance to Goal:</strong> How far from the target</li>
            <li><strong>Gradient Magnitude:</strong> How steep the slope is</li>
          </ul>

          <h3>Step 4: Try Auto Mode</h3>
          <p>Click <strong>"Start Auto"</strong> to watch it solve automatically!</p>
        </>
      )
    },
    {
      title: "Success vs Failure",
      content: (
        <>
          <h3>Success!</h3>
          <p>When you get close enough to the green target, you win!</p>
          <ul>
            <li>Player turns <span className="highlight-green">green</span></li>
            <li>Message shows "Converged!"</li>
            <li>You found the minimum!</li>
          </ul>

          <h3>Failure</h3>
          <p>If your learning rate is too high, you might:</p>
          <ul>
            <li>Overshoot the target repeatedly</li>
            <li>Bounce back and forth without getting closer</li>
            <li>Player turns <span className="highlight-red">red</span></li>
          </ul>

          <div className="tip">
            <strong>Tip:</strong> If you diverge, try a smaller learning rate!
          </div>
        </>
      )
    },
    {
      title: "Experiments to Try",
      content: (
        <>
          <h3>Experiment 1: Learning Rate</h3>
          <p>Try the same surface with different learning rates:</p>
          <ul>
            <li>0.1 (Easy) - How many steps?</li>
            <li>0.5 (Medium) - Faster or slower?</li>
            <li>1.0 (Hard) - Does it still work?</li>
          </ul>

          <h3>Experiment 2: Different Surfaces</h3>
          <ul>
            <li><strong>Bowl:</strong> Simple, one clear path down</li>
            <li><strong>Valley:</strong> Elongated, trickier to navigate</li>
            <li><strong>Multi-modal:</strong> Multiple "valleys" - might get stuck in wrong one!</li>
          </ul>

          <h3>Experiment 3: Starting Position</h3>
          <p>Click on the map to set a different starting position. Does it matter where you start?</p>
        </>
      )
    },
    {
      title: "Connection to AI",
      content: (
        <>
          <h3>What you just learned applies to AI!</h3>
          
          <div className="ai-connection">
            <div className="connection-row">
              <div className="game-side">
                <strong>In the Game</strong>
              </div>
              <div className="ai-side">
                <strong>In AI Training</strong>
              </div>
            </div>
            
            <div className="connection-row">
              <div className="game-side">Hill elevation</div>
              <div className="ai-side">Loss/Error function</div>
            </div>
            
            <div className="connection-row">
              <div className="game-side">Your position (x, y)</div>
              <div className="ai-side">Model parameters (weights)</div>
            </div>
            
            <div className="connection-row">
              <div className="game-side">Reaching the bottom</div>
              <div className="ai-side">Minimizing error</div>
            </div>
            
            <div className="connection-row">
              <div className="game-side">Yellow arrow (gradient)</div>
              <div className="ai-side">Gradient of loss function</div>
            </div>
            
            <div className="connection-row">
              <div className="game-side">Each step</div>
              <div className="ai-side">One training iteration</div>
            </div>
          </div>

          <p className="final-note">
            <strong>Every AI model</strong> (ChatGPT, image recognition, etc.) was trained using this exact algorithm!
          </p>
        </>
      )
    }
  ];

  const currentStep = tutorialSteps[step];

  return (
    <div className="tutorial-overlay">
      <div className="tutorial-modal">
        <div className="tutorial-header">
          <h2>{currentStep.title}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="tutorial-content">
          {currentStep.content}
        </div>

        <div className="tutorial-footer">
          <div className="step-indicator">
            Step {step + 1} of {tutorialSteps.length}
          </div>
          <div className="tutorial-buttons">
            {step > 0 && (
              <button onClick={() => setStep(step - 1)} className="tutorial-btn">
                Previous
              </button>
            )}
            {step < tutorialSteps.length - 1 ? (
              <button onClick={() => setStep(step + 1)} className="tutorial-btn primary">
                Next
              </button>
            ) : (
              <button onClick={onClose} className="tutorial-btn primary">
                Start Playing!
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tutorial;

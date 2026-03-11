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
      title: "What You See on the Screen",
      content: (
        <>
          <p><strong>The Colorful Map:</strong> This shows the hill from above. Different colors mean different heights:</p>
          <ul>
            <li><span className="color-blue">Dark Blue</span> = Very low (like a valley - this is where you want to be!)</li>
            <li><span className="color-green">Light Blue/Green</span> = Medium height</li>
            <li><span className="color-red">Yellow/Red</span> = Very high (like a mountain top)</li>
          </ul>
          <p><strong>The Blue Circle:</strong> That's YOU! You have a black blindfold on, so you can't see the colors.</p>
          <p><strong>The Green Target:</strong> This is your goal - the lowest point on the hill. You win when you reach it!</p>
          <p><strong>The Yellow Arrow:</strong> This is your helper! It always points downhill (the steepest way down).</p>
        </>
      )
    },
    {
      title: "How the Yellow Arrow Works",
      content: (
        <>
          <p>The yellow arrow is called the <strong>"gradient"</strong> - a fancy word that means "which way is downhill."</p>
          <p><strong>Think of it like this:</strong></p>
          <ul>
            <li>If you put a ball on the ground, which way would it roll? That's the gradient!</li>
            <li>The arrow always points to where the ground slopes down the most</li>
          </ul>
          <div className="key-point">
            <strong>Arrow Length Tells You:</strong><br/>
            • Long arrow = Very steep slope (you're far from the bottom)<br/>
            • Short arrow = Gentle slope (you're getting close!)<br/>
            • Tiny arrow = Almost flat (you're at the bottom!)
          </div>
          <p><strong>In Real AI:</strong> Computers use this same idea to learn. They follow the "gradient" to find the best answer, just like you follow the arrow to find the bottom!</p>
        </>
      )
    },
    {
      title: "Understanding Step Size",
      content: (
        <>
          <p>The <strong>Step Size</strong> (also called "Learning Rate") controls how far you move each time you take a step.</p>
          
          <p><strong>Imagine walking down a real hill:</strong></p>
          
          <div className="comparison">
            <div className="comparison-item">
              <strong>Small Steps (0.1)</strong>
              <ul>
                <li>+ You won't fall or miss the bottom</li>
                <li>+ Very safe and steady</li>
                <li>- Takes a long time (many steps)</li>
                <li><strong>Like:</strong> Taking baby steps down a hill</li>
              </ul>
            </div>
            <div className="comparison-item">
              <strong>Big Steps (1.0)</strong>
              <ul>
                <li>+ You get there faster (fewer steps)</li>
                <li>- You might jump over the bottom!</li>
                <li>- You could bounce back and forth</li>
                <li><strong>Like:</strong> Taking giant leaps down a hill</li>
              </ul>
            </div>
          </div>
          
          <p><strong>The Trick:</strong> You need to find the right step size - not too small (slow) and not too big (unstable)!</p>
          <p><strong>In Real AI:</strong> This is one of the hardest problems! If the computer's steps are too big, it never learns properly. Too small, and training takes forever!</p>
        </>
      )
    },
    {
      title: "How to Play the Game",
      content: (
        <>
          <h3>Step 1: Start Simple</h3>
          <p>Choose <strong>"Easy - Simple Bowl"</strong> and <strong>Step Size 0.1</strong> for your first try.</p>
          
          <h3>Step 2: Take Your First Step</h3>
          <ul>
            <li>Click the big <strong>"Take Step"</strong> button</li>
            <li>Watch the blue circle move in the direction of the yellow arrow</li>
            <li>See the orange trail showing where you've been</li>
          </ul>

          <h3>Step 3: Keep Going!</h3>
          <ul>
            <li>Keep clicking "Take Step" to move closer to the green target</li>
            <li>Watch the numbers: "Distance to Goal" should get smaller</li>
            <li>The yellow arrow will get shorter as you get closer</li>
          </ul>

          <h3>Step 4: Try Auto Play</h3>
          <p>Click <strong>"Auto Play"</strong> to watch the computer solve it automatically! This is how AI learns - step by step, following the gradient.</p>
        </>
      )
    },
    {
      title: "What Can Go Wrong?",
      content: (
        <>
          <h3>Success! (You Win)</h3>
          <p>When you get close to the green target:</p>
          <ul>
            <li>Your blue circle turns <span className="highlight-green">green</span></li>
            <li>You see "Success!" message</li>
            <li>You found the lowest point!</li>
          </ul>

          <h3>Failure (Oops!)</h3>
          <p>If your step size is TOO BIG, bad things happen:</p>
          <ul>
            <li><strong>Overshooting:</strong> You jump over the target and land on the other side</li>
            <li><strong>Bouncing:</strong> You keep jumping back and forth, never reaching the bottom</li>
            <li>Your circle turns <span className="highlight-red">red</span></li>
            <li>You see "Try Again" message</li>
          </ul>

          <div className="tip">
            <strong>What to Do:</strong> If you fail, click "Start Over" and try a SMALLER step size. Start with 0.1 and slowly increase it to find the fastest step size that still works!
          </div>
          
          <p><strong>In Real AI:</strong> This is called "divergence" - when the learning rate is too high and the AI never learns properly. Data scientists spend a lot of time finding the right learning rate!</p>
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

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, X, PartyPopper } from 'lucide-react';

import MountainCanvas from './components/MountainCanvas';
import ControlPanel from './components/ControlPanel';
import InfoPanel from './components/InfoPanel';

import { getSurface, SURFACE_TYPES } from './utils/surfaceFunction';
import { 
  gradientDescentStep, 
  calculateDistance, 
  hasConverged, 
  detectOscillation,
  getGradientMagnitude,
  getRandomStartPosition 
} from './utils/gradient';

function App() {
  // Game state
  const [surface, setSurface] = useState(() => getSurface(SURFACE_TYPES.SIMPLE_BOWL));
  const [ballPosition, setBallPosition] = useState(() => getRandomStartPosition(getSurface(SURFACE_TYPES.SIMPLE_BOWL)));
  const [path, setPath] = useState([]);
  const [stepCount, setStepCount] = useState(0);
  const [learningRate, setLearningRate] = useState(0.1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentGradient, setCurrentGradient] = useState(null);
  
  // Tutorial state
  const [showTutorial, setShowTutorial] = useState(true);
  
  // Responsive state
  const [isMobile, setIsMobile] = useState(false);
  
  // Check screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Computed values
  const currentElevation = surface.equation(ballPosition.x, ballPosition.y);
  const distanceToGoal = calculateDistance(ballPosition, surface.globalMinimum);
  const gradientMagnitude = currentGradient ? getGradientMagnitude(currentGradient) : 0;
  const isConverged = hasConverged(ballPosition, surface.globalMinimum, 0.2);
  const hasOvershooting = detectOscillation(path.slice(-10));

  // Initialize gradient
  useEffect(() => {
    const gradient = surface.gradient(ballPosition.x, ballPosition.y);
    setCurrentGradient(gradient);
  }, [ballPosition, surface]);

  // Auto-play effect
  useEffect(() => {
    if (!isPlaying || isConverged || isAnimating) return;
    
    const interval = setInterval(() => {
      executeStep();
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isPlaying, isConverged, isAnimating]);

  // Execute one step of gradient descent
  const executeStep = useCallback(() => {
    if (isConverged || isAnimating) return;
    
    setIsAnimating(true);
    
    const result = gradientDescentStep(ballPosition, surface, learningRate);
    
    setTimeout(() => {
      setBallPosition(result.position);
      setPath(prev => [...prev, result.position]);
      setCurrentGradient(result.gradient);
      setStepCount(prev => prev + 1);
      setIsAnimating(false);
    }, 300);
    
  }, [ballPosition, surface, learningRate, isConverged, isAnimating]);

  // Control handlers
  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);
  
  const handleReset = () => {
    setIsPlaying(false);
    setIsAnimating(false);
    const newPosition = getRandomStartPosition(surface);
    setBallPosition(newPosition);
    setPath([newPosition]);
    setStepCount(0);
    const gradient = surface.gradient(newPosition.x, newPosition.y);
    setCurrentGradient(gradient);
  };

  const handleLearningRateChange = (rate) => {
    setLearningRate(rate);
  };

  const handleSurfaceChange = (surfaceName) => {
    let newSurface;
    switch (surfaceName) {
      case 'Banana Valley':
        newSurface = getSurface(SURFACE_TYPES.ROSENBROCK);
        break;
      case 'Four Valleys':
        newSurface = getSurface(SURFACE_TYPES.HIMMELBLAU);
        break;
      default:
        newSurface = getSurface(SURFACE_TYPES.SIMPLE_BOWL);
    }
    
    setSurface(newSurface);
    setIsPlaying(false);
    setIsAnimating(false);
    const newPosition = getRandomStartPosition(newSurface);
    setBallPosition(newPosition);
    setPath([newPosition]);
    setStepCount(0);
    const gradient = newSurface.gradient(newPosition.x, newPosition.y);
    setCurrentGradient(gradient);
  };

  const handleCanvasClick = (worldPos) => {
    if (isPlaying || isAnimating) return;
    
    setBallPosition(worldPos);
    setPath([worldPos]);
    setStepCount(0);
    const gradient = surface.gradient(worldPos.x, worldPos.y);
    setCurrentGradient(gradient);
  };

  return (
    <div className="bg-blue-50 min-h-screen py-4">
      {/* Responsive Header */}
      <motion.header 
        className="bg-white bg-opacity-90 shadow-sm border-b border-white border-opacity-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="max-w-5xl mx-auto px-3 sm:px-4 py-2 sm:py-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-blue-600">
                Mountain Explorer
              </h1>
              <p className="text-gray-600 text-xs sm:text-sm hidden sm:block">
                Learn gradient descent through visualization
              </p>
            </div>
            <motion.button
              onClick={() => setShowTutorial(true)}
              className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors text-xs sm:text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <BookOpen size={14} className="sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">How to Play</span>
              <span className="sm:hidden">Help</span>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Responsive Main Content - Different layouts for mobile vs desktop */}
      <main className="max-w-5xl mx-auto px-3 sm:px-4 py-3 sm:py-4 md:py-6">
        {/* Mobile Only: Vertical Stack */}
        {isMobile && (
        <div className="space-y-4">
          {/* Canvas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="control-card">
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <h2 className="text-sm sm:text-base font-bold text-gray-800">
                  UoA COMPSCI 714: Gradient Descent- The Mountain
                </h2>
              </div>
              
              <div className="mb-2 sm:mb-3">
                <MountainCanvas
                  surface={surface}
                  ballPosition={ballPosition}
                  path={path}
                  gradient={currentGradient}
                  isAnimating={isAnimating}
                  onCanvasClick={handleCanvasClick}
                />
              </div>
              
              <div className="flex flex-wrap gap-2 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-800 rounded"></div>
                  <span>Valley</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded"></div>
                  <span>Low</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded"></div>
                  <span>High</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded"></div>
                  <span>Peak</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded-full"></div>
                  <span>Ball</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="space-y-3 sm:space-y-4">
              <ControlPanel
                isPlaying={isPlaying}
                learningRate={learningRate}
                surface={surface}
                onPlay={handlePlay}
                onPause={handlePause}
                onStep={executeStep}
                onReset={handleReset}
                onLearningRateChange={handleLearningRateChange}
                onSurfaceChange={handleSurfaceChange}
                isConverged={isConverged}
                hasOvershooting={hasOvershooting}
              />
              
              <InfoPanel
                currentPosition={ballPosition}
                surface={surface}
                stepCount={stepCount}
                currentElevation={currentElevation}
                gradientMagnitude={gradientMagnitude}
                distanceToGoal={distanceToGoal}
                learningRate={learningRate}
                isConverged={isConverged}
              />
            </div>
          </motion.div>
        </div>
        )}

        {/* Tablet/Desktop/Laptop: Compact 2-Column Side-by-Side */}
        {!isMobile && (
        <div className="grid grid-cols-2 gap-6">
          {/* Left: Canvas */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="control-card">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-bold text-gray-800">
                  UoA COMPSCI 714: Gradient Descent- The Mountain
                </h2>
                <div className="text-xs text-gray-600">
                  Click to set position
                </div>
              </div>
              
              <div className="mb-3">
                <MountainCanvas
                  surface={surface}
                  ballPosition={ballPosition}
                  path={path}
                  gradient={currentGradient}
                  isAnimating={isAnimating}
                  onCanvasClick={handleCanvasClick}
                />
              </div>
              
              <div className="flex flex-wrap gap-2 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-blue-800 rounded"></div>
                  <span>Valley</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-green-500 rounded"></div>
                  <span>Low</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                  <span>High</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-red-500 rounded"></div>
                  <span>Peak</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>Ball</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Controls */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="space-y-4">
              <ControlPanel
                isPlaying={isPlaying}
                learningRate={learningRate}
                surface={surface}
                onPlay={handlePlay}
                onPause={handlePause}
                onStep={executeStep}
                onReset={handleReset}
                onLearningRateChange={handleLearningRateChange}
                onSurfaceChange={handleSurfaceChange}
                isConverged={isConverged}
                hasOvershooting={hasOvershooting}
              />
              
              <InfoPanel
                currentPosition={ballPosition}
                surface={surface}
                stepCount={stepCount}
                currentElevation={currentElevation}
                gradientMagnitude={gradientMagnitude}
                distanceToGoal={distanceToGoal}
                learningRate={learningRate}
                isConverged={isConverged}
              />
            </div>
          </motion.div>
        </div>
        )}
      </main>

      {/* Tutorial Modal */}
      <AnimatePresence>
        {showTutorial && (
          <TutorialModal onClose={() => setShowTutorial(false)} />
        )}
      </AnimatePresence>

      {/* Success Modal */}
      <AnimatePresence>
        {isConverged && (
          <SuccessModal onReset={handleReset} />
        )}
      </AnimatePresence>
    </div>
  );
}

// Tutorial Modal Component - Much more compact
const TutorialModal = ({ onClose }) => {
  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-lg max-w-lg w-full max-h-[80vh] overflow-y-auto shadow-xl"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">
              How to Play
            </h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="space-y-4 text-gray-700 text-sm">
            <div>
              <h3 className="font-semibold mb-2 text-blue-600">Your Mission</h3>
              <p>
                Help the blue ball find the lowest valley! This teaches gradient descent - 
                how AI systems learn to find the best solution.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2 text-green-600">Controls</h3>
              <ul className="space-y-1 ml-4 text-xs">
                <li>• <strong>Take Step:</strong> Move ball one step downhill</li>
                <li>• <strong>Auto Play:</strong> Watch automatic descent</li>
                <li>• <strong>Reset:</strong> Start over with new position</li>
                <li>• <strong>Step Size:</strong> Control movement distance</li>
                <li>• <strong>Click map:</strong> Set new starting position</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2 text-purple-600">Tips</h3>
              <ul className="space-y-1 ml-4 text-xs">
                <li>• Start with Simple Bowl and small step size</li>
                <li>• Yellow arrow shows steepest downhill direction</li>
                <li>• Orange trail shows path taken</li>
                <li>• If ball overshoots, use smaller step size</li>
              </ul>
            </div>
            
            <div className="bg-blue-50 p-3 rounded border border-blue-200">
              <div className="text-xs font-semibold text-blue-800 mb-1">
                Colors:
              </div>
              <div className="text-xs text-blue-700 space-y-1">
                <div>• Dark Blue = Valley (goal)</div>
                <div>• Green = Lower hills</div>
                <div>• Yellow = Higher hills</div>
                <div>• Red = Peaks</div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <motion.button
              onClick={onClose}
              className="btn-primary px-6 py-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Playing!
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Success Modal Component
const SuccessModal = ({ onReset }) => {
  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onReset}
    >
      <motion.div
        className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 rounded-3xl shadow-2xl border-4 border-green-400 p-8 sm:p-10 max-w-md w-full relative overflow-hidden"
        initial={{ scale: 0.5, opacity: 0, y: 100 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.5, opacity: 0, y: 100 }}
        transition={{ type: "spring", damping: 15, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Animated background circles */}
        <motion.div
          className="absolute top-0 right-0 w-32 h-32 bg-green-200 rounded-full opacity-30"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ filter: 'blur(40px)' }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-40 h-40 bg-emerald-200 rounded-full opacity-30"
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [360, 180, 0]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ filter: 'blur(40px)' }}
        />
        
        <div className="text-center relative z-10">
          {/* Animated icon */}
          <motion.div
            className="inline-block mb-6"
            animate={{ 
              rotate: [0, -15, 15, -15, 15, 0],
              scale: [1, 1.2, 1, 1.2, 1]
            }}
            transition={{ 
              duration: 0.8,
              repeat: Infinity,
              repeatDelay: 1.5
            }}
          >
            <div className="relative">
              <PartyPopper size={64} className="text-green-600" strokeWidth={2} />
              {/* Sparkle effects */}
              <motion.div
                className="absolute -top-2 -right-2 text-yellow-400"
                animate={{ 
                  scale: [0, 1, 0],
                  rotate: [0, 180, 360]
                }}
                transition={{ 
                  duration: 1,
                  repeat: Infinity,
                  repeatDelay: 0.5
                }}
              >
                ✨
              </motion.div>
              <motion.div
                className="absolute -bottom-2 -left-2 text-yellow-400"
                animate={{ 
                  scale: [0, 1, 0],
                  rotate: [360, 180, 0]
                }}
                transition={{ 
                  duration: 1,
                  repeat: Infinity,
                  repeatDelay: 0.8
                }}
              >
                ✨
              </motion.div>
            </div>
          </motion.div>
          
          <motion.h3 
            className="text-3xl sm:text-4xl font-bold text-green-800 mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Congratulations!
          </motion.h3>
          
          <motion.p 
            className="text-lg sm:text-xl text-green-700 mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            You found the valley!
          </motion.p>
          
          <motion.p 
            className="text-sm text-green-600 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            You've mastered gradient descent
          </motion.p>
          
          <motion.button
            onClick={onReset}
            className="btn-primary px-8 py-4 text-lg w-full font-bold shadow-xl"
            style={{ 
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              transform: 'translateY(0)'
            }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 20px 40px rgba(16, 185, 129, 0.4)'
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Try Another Mountain
          </motion.button>
          
          <motion.p 
            className="text-xs text-green-600 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Click anywhere to close
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default App;
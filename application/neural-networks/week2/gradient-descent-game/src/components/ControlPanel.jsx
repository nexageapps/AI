import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Zap, Turtle, Rabbit } from 'lucide-react';

const ControlPanel = ({
  isPlaying,
  learningRate,
  surface,
  onPlay,
  onPause,
  onStep,
  onReset,
  onLearningRateChange,
  onSurfaceChange,
  isConverged,
  hasOvershooting
}) => {
  const learningRateLabels = {
    0.01: { icon: Turtle, label: 'Slow & Steady', color: 'text-green-600' },
    0.1: { icon: Zap, label: 'Just Right', color: 'text-blue-600' },
    0.5: { icon: Rabbit, label: 'Fast & Risky', color: 'text-orange-600' }
  };

  const getCurrentRateInfo = () => {
    if (learningRate <= 0.05) return learningRateLabels[0.01];
    if (learningRate <= 0.3) return learningRateLabels[0.1];
    return learningRateLabels[0.5];
  };

  const rateInfo = getCurrentRateInfo();
  const RateIcon = rateInfo.icon;

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Main Controls */}
      <motion.div 
        className="control-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h3 className="text-xs sm:text-sm font-bold text-gray-800 mb-2 sm:mb-3">
          Controls
        </h3>
        
        <div className="grid grid-cols-1 gap-2">
          <motion.button
            onClick={onStep}
            disabled={isConverged}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1 text-xs sm:text-sm py-2 sm:py-2.5"
            whileTap={{ scale: 0.95 }}
          >
            <Zap size={14} className="sm:w-4 sm:h-4" />
            Take Step
          </motion.button>
          
          <motion.button
            onClick={isPlaying ? onPause : onPlay}
            disabled={isConverged}
            className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1 text-xs sm:text-sm py-2 sm:py-2.5"
            whileTap={{ scale: 0.95 }}
          >
            {isPlaying ? <Pause size={14} className="sm:w-4 sm:h-4" /> : <Play size={14} className="sm:w-4 sm:h-4" />}
            {isPlaying ? 'Pause' : 'Auto Play'}
          </motion.button>
          
          <motion.button
            onClick={onReset}
            className="btn-danger flex items-center justify-center gap-1 text-xs sm:text-sm py-2 sm:py-2.5"
            whileTap={{ scale: 0.95 }}
          >
            <RotateCcw size={14} className="sm:w-4 sm:h-4" />
            Reset
          </motion.button>
        </div>
      </motion.div>

      {/* Learning Rate Control */}
      <motion.div 
        className="control-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-xs sm:text-sm font-bold text-gray-800 mb-2 sm:mb-3 flex items-center gap-2">
          <RateIcon size={14} className={`sm:w-4 sm:h-4 ${rateInfo.color}`} />
          Step Size
        </h3>
        
        <div className="space-y-2">
          <div className="text-xs text-center">
            <span className={`font-bold ${rateInfo.color}`}>
              {learningRate.toFixed(3)}
            </span>
          </div>
          
          <input
            type="range"
            min="0.001"
            max="1.0"
            step="0.001"
            value={learningRate}
            onChange={(e) => onLearningRateChange(parseFloat(e.target.value))}
            className="w-full h-2 bg-gradient-to-r from-green-300 via-blue-300 to-red-300 rounded-lg appearance-none cursor-pointer"
          />
          
          <div className="flex justify-between text-xs text-gray-500">
            <span>Safe</span>
            <span>Risky</span>
          </div>
        </div>
        
        {/* Warning messages */}
        {hasOvershooting && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-center"
          >
            <p className="text-xs text-red-600">
              Step too large!
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* Surface Selection */}
      <motion.div 
        className="control-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-xs sm:text-sm font-bold text-gray-800 mb-2 sm:mb-3">
          Mountain
        </h3>
        
        <select
          value={surface.name}
          onChange={(e) => onSurfaceChange(e.target.value)}
          className="w-full p-2 border border-gray-200 rounded focus:border-blue-500 focus:outline-none transition-colors text-xs sm:text-sm"
        >
          <option value="Simple Bowl">Simple Bowl</option>
          <option value="Banana Valley">Banana Valley</option>
          <option value="Four Valleys">Four Valleys</option>
        </select>
      </motion.div>

    </div>
  );
};

export default ControlPanel;
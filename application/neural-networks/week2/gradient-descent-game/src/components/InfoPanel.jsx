import React from 'react';
import { motion } from 'framer-motion';
import { TrendingDown, Target, Footprints, Zap, Mountain, Info } from 'lucide-react';

const InfoPanel = ({
  currentPosition,
  surface,
  stepCount,
  currentElevation,
  gradientMagnitude,
  distanceToGoal,
  learningRate,
  isConverged
}) => {
  const stats = [
    {
      icon: Footprints,
      label: 'Steps Taken',
      value: stepCount,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Mountain,
      label: 'Current Height',
      value: currentElevation?.toFixed(2) || '0.00',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      icon: Target,
      label: 'Distance to Goal',
      value: distanceToGoal?.toFixed(2) || '0.00',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: TrendingDown,
      label: 'Slope Steepness',
      value: gradientMagnitude?.toFixed(2) || '0.00',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  const getSlopeDescription = () => {
    if (!gradientMagnitude) return 'Flat ground';
    if (gradientMagnitude < 0.5) return 'Gentle slope';
    if (gradientMagnitude < 2) return 'Moderate slope';
    if (gradientMagnitude < 5) return 'Steep slope';
    return 'Very steep!';
  };

  const getProgressDescription = () => {
    if (isConverged) return "You've reached the goal!";
    if (!distanceToGoal) return "Ready to start your journey!";
    if (distanceToGoal < 1) return "Almost there! You're very close!";
    if (distanceToGoal < 3) return "Good progress! Keep going!";
    return "You're exploring the mountain!";
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Responsive Statistics */}
      <motion.div 
        className="control-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h3 className="text-xs sm:text-sm font-bold text-gray-800 mb-2 sm:mb-3">
          Stats
        </h3>
        
        <div className="grid grid-cols-2 gap-2">
          <div className="text-center">
            <div className="text-xs text-gray-600">Steps</div>
            <div className="text-base sm:text-lg font-bold text-blue-600">{stepCount}</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-600">Distance</div>
            <div className="text-base sm:text-lg font-bold text-green-600">{distanceToGoal?.toFixed(1) || '0.0'}</div>
          </div>
        </div>
        
        <div className="mt-2 text-center">
          <div className="text-xs text-gray-600 mb-1">Status</div>
          <div className="text-xs font-semibold text-gray-800">
            {getProgressDescription()}
          </div>
        </div>
      </motion.div>

      {/* Responsive How It Works */}
      <motion.div 
        className="control-card bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-xs sm:text-sm font-bold text-gray-800 mb-2">
          How It Works
        </h3>
        
        <div className="space-y-1 text-xs text-gray-700">
          <div>1. Look at slope</div>
          <div>2. Move downhill</div>
          <div>3. Repeat until valley</div>
        </div>
        
        <div className="mt-2 p-2 bg-white/50 rounded text-xs text-gray-600">
          This is how AI learns!
        </div>
      </motion.div>
    </div>
  );
};

export default InfoPanel;
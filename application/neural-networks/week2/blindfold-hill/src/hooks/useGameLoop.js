import { useEffect, useRef } from 'react';

/**
 * Custom hook for game animation loop
 * Handles automatic stepping at configurable rate
 */
export function useGameLoop(isActive, stepRate, onStep) {
  const lastStepTimeRef = useRef(0);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    if (!isActive) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      return;
    }

    const stepInterval = 1000 / stepRate; // Convert steps/second to milliseconds

    const animate = (timestamp) => {
      const elapsed = timestamp - lastStepTimeRef.current;

      if (elapsed >= stepInterval) {
        onStep();
        lastStepTimeRef.current = timestamp;
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    lastStepTimeRef.current = performance.now();
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isActive, stepRate, onStep]);
}

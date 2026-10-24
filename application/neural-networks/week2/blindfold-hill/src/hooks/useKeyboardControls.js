import { useEffect } from 'react';

/**
 * Custom hook for keyboard controls
 * Handles keyboard shortcuts for game actions
 */
export function useKeyboardControls(actions, gameStatus) {
  useEffect(() => {
    const handleKeyPress = (event) => {
      // Ignore if typing in an input field
      if (event.target.tagName === 'INPUT' || event.target.tagName === 'SELECT') {
        return;
      }

      switch (event.key.toLowerCase()) {
        case ' ':
        case 'spacebar':
          event.preventDefault();
          if (gameStatus === 'playing') {
            actions.executeStep();
          }
          break;
        case 'p':
          event.preventDefault();
          if (gameStatus === 'playing') {
            actions.toggleAutoMode();
          }
          break;
        case 'r':
          event.preventDefault();
          actions.resetGame();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [actions, gameStatus]);
}

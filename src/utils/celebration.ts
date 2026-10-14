import { triggerTaskCompletionFireworks, triggerDayCompleteGrandFinale } from './confetti';
import { soundManager } from './sound';

/**
 * Triggers both visual fireworks and random celebratory audio (applause, cheering, fanfare)
 */
export function triggerTaskCelebration(origin?: { x: number; y: number }) {
  // Firework visuals
  triggerTaskCompletionFireworks(origin);
  // Audio: applause, cheering, fanfare, chime
  soundManager.playRandomCelebration();
}

/**
 * Triggers grand finale fireworks and fanfare cheering when the whole day's plan is completed
 */
export function triggerDayCompletionCelebration() {
  triggerDayCompleteGrandFinale();
  soundManager.playCheering();
  setTimeout(() => {
    soundManager.playFanfare();
  }, 400);
}

export { soundManager };

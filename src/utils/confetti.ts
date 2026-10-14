import confetti from 'canvas-confetti';

/**
 * Triggers a multi-stage celebratory firework burst when a task/todo is completed
 */
export function triggerTaskCompletionFireworks(customOrigin?: { x: number; y: number }) {
  const origin = customOrigin || { x: 0.5, y: 0.65 };

  // Stage 1: Core firework burst (Gold, Cyan, Emerald, Coral, Violet)
  confetti({
    particleCount: 55,
    spread: 80,
    startVelocity: 35,
    origin,
    colors: ['#fbbf24', '#34d399', '#38bdf8', '#f43f5e', '#a855f7'],
    ticks: 200,
    gravity: 1.1,
    scalar: 1.05,
    shapes: ['circle', 'square'],
  });

  // Stage 2: Fast ascending sparkles
  confetti({
    particleCount: 25,
    angle: 90,
    spread: 45,
    startVelocity: 45,
    origin,
    colors: ['#fef08a', '#67e8f9', '#a7f3d0'],
    ticks: 180,
    gravity: 0.9,
    scalar: 0.8,
  });

  // Stage 3: Left & Right auxiliary cannon pop after 120ms
  setTimeout(() => {
    confetti({
      particleCount: 30,
      angle: 60,
      spread: 50,
      startVelocity: 35,
      origin: { x: Math.max(0.1, origin.x - 0.25), y: Math.min(0.85, origin.y + 0.05) },
      colors: ['#f59e0b', '#10b981', '#06b6d4'],
    });

    confetti({
      particleCount: 30,
      angle: 120,
      spread: 50,
      startVelocity: 35,
      origin: { x: Math.min(0.9, origin.x + 0.25), y: Math.min(0.85, origin.y + 0.05) },
      colors: ['#f59e0b', '#ec4899', '#8b5cf6'],
    });
  }, 120);
}

/**
 * Grand finale celebratory firework sequence when all tasks for the day are accomplished
 */
export function triggerDayCompleteGrandFinale() {
  const duration = 2000;
  const animationEnd = Date.now() + duration;

  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();
    if (timeLeft <= 0) {
      clearInterval(interval);
      return;
    }

    const particleCount = Math.floor(40 * (timeLeft / duration));

    // Random fireworks across the top/middle screen
    confetti({
      particleCount,
      angle: 60,
      spread: 60,
      origin: { x: Math.random() * 0.4 + 0.05, y: Math.random() * 0.3 + 0.5 },
      colors: ['#fbbf24', '#34d399', '#38bdf8', '#f43f5e', '#a855f7'],
    });

    confetti({
      particleCount,
      angle: 120,
      spread: 60,
      origin: { x: Math.random() * 0.4 + 0.55, y: Math.random() * 0.3 + 0.5 },
      colors: ['#f59e0b', '#10b981', '#06b6d4', '#ec4899', '#8b5cf6'],
    });
  }, 220);
}

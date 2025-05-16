import { useEffect, useRef, useState } from 'react';

export function usePathProgress(
  duration: number,
  paused: boolean,
  startDelay: number = 0
) {
  const [progress, setProgress] = useState(0);
  const start = useRef<number | null>(null);
  const pauseTime = useRef<number | null>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (paused) {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      pauseTime.current = performance.now(); // record when paused
      return;
    }

    // If resuming after pause, adjust start time to maintain current progress
    if (start.current && pauseTime.current) {
      const pausedDuration = pauseTime.current - start.current;
      start.current = performance.now() - pausedDuration;
    }

    const animate = (timestamp: number) => {
      if (start.current === null) start.current = timestamp;
      const adjustedTime = timestamp - start.current;

      if (adjustedTime < startDelay) {
        frameRef.current = requestAnimationFrame(animate);
        return;
      }

      const elapsed = (adjustedTime - startDelay) % duration;
      setProgress(elapsed / duration);

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [duration, paused, startDelay]);

  return progress;
}

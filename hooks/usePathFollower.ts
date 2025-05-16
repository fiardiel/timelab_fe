import { useEffect, useRef, useState } from 'react';

export function usePathFollower(
  pathId: string,
  duration: number,
  svgRef: React.RefObject<SVGSVGElement>,
  paused: boolean,
  startDelay: number = 0
) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const startTime = useRef<number | null>(null);
  const pauseStart = useRef<number | null>(null);
  const totalPausedTime = useRef<number>(0);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const path = document.getElementById(pathId) as SVGPathElement | null;
    if (!path || !svgRef.current) return;

    const length = path.getTotalLength();

    const animate = (timestamp: number) => {
      if (startTime.current === null) startTime.current = timestamp;
      const elapsedSinceStart = timestamp - startTime.current - totalPausedTime.current;

      if (elapsedSinceStart < startDelay) {
        frameRef.current = requestAnimationFrame(animate);
        return;
      }

      const elapsed = (elapsedSinceStart - startDelay) % duration;
      const progress = elapsed / duration;
      const point = path.getPointAtLength(progress * length);
      setPosition({ x: point.x, y: point.y });

      frameRef.current = requestAnimationFrame(animate);
    };

    if (!paused) {
      // Resuming: adjust for time spent paused
      if (pauseStart.current !== null) {
        totalPausedTime.current += performance.now() - pauseStart.current;
        pauseStart.current = null;
      }
      frameRef.current = requestAnimationFrame(animate);
    } else {
      // Pausing: record pause start time
      pauseStart.current = performance.now();
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    }

    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [pathId, duration, svgRef, paused, startDelay]);

  return position;
}


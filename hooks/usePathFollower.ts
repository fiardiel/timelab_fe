import { useEffect, useRef, useState } from 'react';

export function usePathFollower(
  pathId: string,
  duration: number,
  svgRef: React.RefObject<SVGSVGElement>,
  paused: boolean,
  startDelay: number = 0
) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const start = useRef<number | null>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (paused) {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      return;
    }

    const path = document.getElementById(pathId) as SVGPathElement | null;
    if (!path || !svgRef.current) return;

    const length = path.getTotalLength();

    const animate = (timestamp: number) => {
      if (start.current === null) start.current = timestamp;
      const adjustedTime = timestamp - start.current;

      if (adjustedTime < startDelay) {
        frameRef.current = requestAnimationFrame(animate);
        return;
      }

      const elapsed = (adjustedTime - startDelay) % duration;
      const progress = elapsed / duration;
      const point = path.getPointAtLength(progress * length);
      setPosition({ x: point.x, y: point.y });
      frameRef.current = requestAnimationFrame(animate);
    };


    frameRef.current = requestAnimationFrame(animate);
    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [pathId, duration, svgRef, paused]);

  return position;
}

// hooks/usePathFollower.ts
import { useRef, useState, useEffect } from "react";
import { useAnimationFrame } from "framer-motion";

export function usePathFollower(pathId: string, duration = 5000) {
  const [point, setPoint] = useState({ x: 0, y: 0 });
  const pathRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    pathRef.current = document.getElementById(pathId) as SVGPathElement;
  }, [pathId]);

  useAnimationFrame((t) => {
    if (!pathRef.current) return;
    const total = pathRef.current.getTotalLength();
    const progress = (t % duration) / duration;
    const { x, y } = pathRef.current.getPointAtLength(total * progress);
    setPoint({ x, y });
  });

  return point;
}

export default usePathFollower;

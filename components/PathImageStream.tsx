'use client';

import { motion } from 'framer-motion';
import { usePathFollower } from '@/hooks/usePathFollower';
import { RefObject } from 'react';

interface PathImageStreamProps {
  pathId: string;
  duration: number;
  count: number;
  delayStep?: number;
  paused: boolean;
  svgRef: RefObject<SVGSVGElement>;
  onClick?: (index: number) => void;
}

export const PathImageStream = ({
  pathId,
  duration,
  count,
  delayStep = 1000,
  paused,
  svgRef,
  onClick,
}: PathImageStreamProps) => {
    const transitionDuration = duration / 1000;

  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
          const appearDelay = (i * delayStep) / 1000;
        const point = usePathFollower(pathId, duration, svgRef, paused, i * delayStep);
        return (
            <motion.g
              animate={paused ? { scale: 1 } : { scale: [0, 2, 0] }}
              transition={{ duration: transitionDuration, repeat: Infinity, ease: 'easeInOut', delay: appearDelay }}
              style={{ transformOrigin: 'center', cursor: 'pointer' }}
              onClick={() => onClick?.(i)}
            >
              <image
                href="/0Z.png"
                x={point.x - 2.5}
                y={point.y - 2.5}
                width={5}
                height={5}
              />
            </motion.g>

        );
      })}
    </>
  );
};

'use client';

import { motion } from 'framer-motion';
import { usePathFollower } from '@/hooks/usePathFollower';
import { usePathProgress } from '@/hooks/usePathProgress';
import { RefObject } from 'react';

interface PathImageStreamProps {
  pathId: string;
  duration: number;
  delayStep?: number;
  paused: boolean;
  svgRef: RefObject<SVGSVGElement>;
  onClick?: (index: number) => void;
  imageLinks: string[];
}

export const PathImageStream = ({
  pathId,
  duration,
  delayStep = 1000,
  paused,
  svgRef,
  onClick,
  imageLinks,
}: PathImageStreamProps) => {
  return (
    <>
      {imageLinks.map((imageLink, i) => {
        const startDelay = i * delayStep;
        const point = usePathFollower(pathId, duration, svgRef, paused, startDelay);
        const progress = usePathProgress(duration, paused, startDelay);

        // Smooth scale based on progress (0 -> 1 -> 0)
        const scale = 3* Math.sin(progress * Math.PI);

        return (
          <motion.g
            key={imageLink}
            animate={{ scale }}
            style={{ transformOrigin: 'center', cursor: 'pointer' }}
            onClick={() => onClick?.(i)}
          >
            <image
              href={imageLink}
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

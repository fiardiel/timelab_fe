'use client';

import { motion } from 'framer-motion';
import { usePathFollower } from '@/hooks/usePathFollower';
import { RefObject } from 'react';

interface PathImageStreamProps {
  pathId: string;
  duration: number;
  delayStep?: number;
  paused: boolean;
  svgRef: RefObject<SVGSVGElement>;
  onClick?: (index: number) => void;
  imageLinks: string[]
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
  const transitionDuration = duration / 1000;
  return (
    <>
      {imageLinks.map((imageLink, i) => {
        const appearDelay = (i * delayStep) / 1000;
        const point = usePathFollower(pathId, duration, svgRef, paused, i * delayStep);
        return (
          <motion.g
            animate={paused ? { scale: 1 } : { scale: [0, 2, 0] }}
            transition={{ duration: transitionDuration, repeat: Infinity, ease: 'easeInOut', delay: appearDelay }}
            style={{ transformOrigin: 'center', cursor: 'pointer' }}
            onClick={() => onClick?.(i)}
            key={imageLink}
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

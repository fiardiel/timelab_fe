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
  selectedIndex?: number | null; // NEW: optional prop to hide selected image
  startIndex?: number; // NEW: helps calculate global index for uniqueness
}

export const PathImageStream = ({
  pathId,
  duration,
  delayStep = 1000,
  paused,
  svgRef,
  onClick,
  imageLinks,
  selectedIndex = null,
  startIndex = 0, // default to 0
}: PathImageStreamProps) => {
  return (
    <>
      {imageLinks.map((imageLink, i) => {
        const globalIndex = startIndex + i;
        if (selectedIndex === globalIndex) return null; // skip if selected

        const startDelay = i * delayStep;
        const point = usePathFollower(pathId, duration, svgRef, paused, startDelay);
        const progress = usePathProgress(duration, paused, startDelay);
        const scale = 3 * Math.sin(progress * Math.PI);

        return (
          <motion.g
            key={`${pathId}-${i}`}
            animate={{ scale }}
            style={{ transformOrigin: 'center', cursor: 'pointer' }}
            onClick={() => onClick?.(globalIndex)}
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

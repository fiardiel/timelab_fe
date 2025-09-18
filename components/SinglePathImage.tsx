'use client';

import { motion } from 'framer-motion';
import { usePathFollower } from '@/hooks/usePathFollower';
import { usePathProgress } from '@/hooks/usePathProgress';
import { RefObject } from 'react';

interface SinglePathImageProps {
  pathId: string;
  duration: number;
  delay: number;
  paused: boolean;
  svgRef: RefObject<SVGSVGElement | null>;
  imageLink: string;
  globalIndex: number;
  onClick?: (index: number) => void;
}

export const SinglePathImage = ({
  pathId,
  duration,
  delay,
  paused,
  svgRef,
  imageLink,
  globalIndex,
  onClick,
}: SinglePathImageProps) => {
  const point = usePathFollower(pathId, duration, svgRef, paused, delay);
  const progress = usePathProgress(duration, paused, delay);
  const scale = 3 * Math.sin(progress * Math.PI);

  return (
    <motion.g
      animate={{ scale }}
      style={{ transformOrigin: 'center', cursor: 'pointer' }}
      onClick={() => onClick?.(globalIndex)}
    >
      <image
        data-testid="stream-image"
        href={imageLink}
        x={point.x - 2.5}
        y={point.y - 2.5}
        width={5}
        height={5}
      />
    </motion.g>
  );
};

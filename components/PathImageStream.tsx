'use client';

import { RefObject } from 'react';
import { SinglePathImage } from './SinglePathImage';

interface PathImageStreamProps {
  pathId: string;
  duration: number;
  delayStep?: number;
  paused: boolean;
  svgRef: RefObject<SVGSVGElement>;
  onClick?: (index: number) => void;
  imageLinks: string[];
  selectedIndex?: number | null;
  startIndex?: number;
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
  startIndex = 0,
}: PathImageStreamProps) => {
  return (
    <>
      {imageLinks.map((imageLink, i) => {
        const globalIndex = startIndex + i;
        if (selectedIndex === globalIndex) return null;

        const delay = i * delayStep;
        return (
          <SinglePathImage
            key={`${pathId}-${i}`}
            pathId={pathId}
            duration={duration}
            delay={delay}
            paused={paused}
            svgRef={svgRef}
            imageLink={imageLink}
            globalIndex={globalIndex}
            onClick={onClick}
          />
        );
      })}
    </>
  );
};


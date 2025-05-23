'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface CircleLayoutProps {
  centerImage: string;
  surroundingImages: string[];
  onClose: () => void;
  onSelect: (newImage: string) => void;
}

export const CircleLayout: React.FC<CircleLayoutProps> = ({
  centerImage,
  surroundingImages,
  onClose,
  onSelect,
}) => {
  const radius = 300;
  const centerSize = 260;
  const surroundingSize = 80;

  const [angleOffset, setAngleOffset] = useState(0);

  // Animate angleOffset using requestAnimationFrame
  useEffect(() => {
    let animationFrame: number;
    let lastTimestamp: number;

    const animate = (timestamp: number) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const delta = (timestamp - lastTimestamp) / 1000; // seconds
      lastTimestamp = timestamp;
      setAngleOffset(prev => prev + delta * 0.2); // 0.5 rad/sec rotation speed
      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <>
      {/* Background Overlay */}
      <motion.div
        data-testid="overlay"
        role='presentation'
        className="fixed inset-0 bg-black/70 z-30 backdrop-blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.9 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Centered Image */}
      <div className="fixed inset-0 z-40 flex items-center justify-center pointer-events-none">
        <motion.img
          src={centerImage}
          alt="Focused"
          className="rounded-lg object-cover pointer-events-auto"
          style={{
            width: centerSize,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
        />
      </div>

      {surroundingImages.map((img, i) => {
        const angle = (2 * Math.PI * i) / surroundingImages.length + angleOffset;
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);

        return (
          <div
            key={i}
            className="fixed z-40 cursor-pointer"
            style={{
              left: `calc(50% + ${x}px - ${surroundingSize / 2}px)`,
              top: `calc(50% + ${y}px - ${surroundingSize / 2}px)`,
              width: surroundingSize,
              height: surroundingSize,
            }}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(img);
            }}
          >
            <motion.img
              src={img}
              alt={`orbiting-${i}`}
              className="rounded-md w-full h-full object-cover"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
            />
          </div>
        );
      })}
    </>
  );
};

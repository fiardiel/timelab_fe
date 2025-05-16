'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface CircleLayoutProps {
  centerImage: string;
  surroundingImages: string[];
  onClose: () => void;
}

export const CircleLayout: React.FC<CircleLayoutProps> = ({
  centerImage,
  surroundingImages,
  onClose,
}) => {
  const radius = 300;
  const centerSize = 230;
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
        className="fixed inset-0 bg-black z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Centered Image */}
      <motion.img
        src={centerImage}
        alt="Focused"
        className="fixed z-40 rounded-lg"
        style={{
          width: centerSize,
          height: centerSize,
          left: '43%',
          top: '37%',
          transform: 'translate(-50%, -50%)',
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
      />

      {/* Surrounding Images with rotation */}
      {surroundingImages.map((img, i) => {
        const angle = (2 * Math.PI * i) / surroundingImages.length + angleOffset;
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);

        return (
          <motion.img
            key={i}
            src={img}
            className="fixed z-40 rounded-md"
            style={{
              width: surroundingSize,
              height: surroundingSize,
              left: `calc(50% + ${x}px - ${surroundingSize / 2}px)`,
              top: `calc(50% + ${y}px - ${surroundingSize / 2}px)`,
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
          />
        );
      })}
    </>
  );
};

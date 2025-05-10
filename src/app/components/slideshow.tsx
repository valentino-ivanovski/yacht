'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Playfair } from 'next/font/google';
import { motion, AnimatePresence } from 'framer-motion';

const playfair = Playfair({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-playfair',
  style: ['italic', 'normal'],
});

const Slideshow: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const expandedImageRef = useRef<HTMLDivElement>(null);

  const images = Array.from({ length: 13 }, (_, i) => ({
    src: `/images/slideshow/${i + 1}.webp`,
    alt: `Slideshow image ${i + 1} of Greenline 48 Fly`,
  }));

  const goToIndex = (index: number) => {
    const newIndex = (index + images.length) % images.length;
    const dir = index > currentIndex ? 1 : -1;
    setDirection(dir);
    setCurrentIndex(newIndex);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touchStartX = e.touches[0].clientX;
    const handleTouchMove = (moveEvent: TouchEvent) => {
      const touchMoveX = moveEvent.touches[0].clientX;
      const diff = touchStartX - touchMoveX;
      if (diff > 50) goToIndex(currentIndex + 1);
      if (diff < -50) goToIndex(currentIndex - 1);
      window.removeEventListener('touchmove', handleTouchMove);
    };
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', () =>
      window.removeEventListener('touchmove', handleTouchMove),
      { once: true }
    );
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (isExpanded) {
      if (e.key === 'ArrowLeft') goToIndex(currentIndex - 1);
      if (e.key === 'ArrowRight') goToIndex(currentIndex + 1);
      if (e.key === 'Escape') setIsExpanded(false);
    }
  };

  useEffect(() => {
    if (isExpanded) {
      document.addEventListener('keydown', handleKeyDown);
      expandedImageRef.current?.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    }
        return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isExpanded, currentIndex]);

  return (
    <div className="relative w-full  max-w-4xl mx-auto pb-10">
      {/* Main Slideshow */}
      <div className="relative h-96 overflow-hidden rounded-lg shadow-lg">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 40 : -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -40 : 40 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="absolute inset-0"
          >
            <Image
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              width={1200}
              height={800}
              loading="lazy"
              onClick={() => setIsExpanded(true)}
              className="cursor-pointer object-cover w-full h-full"
            />
          </motion.div>
        </AnimatePresence>

        {/* Left Arrow */}
        <button
          onClick={() => goToIndex(currentIndex - 1)}
          className={`p-2 rounded-full cursor-pointer transition-colors duration-200 ${playfair.className} bg-white/50 text-black hover:bg-white/60 absolute top-1/2 left-4 transform -translate-y-1/2 z-10`}
        >
          <svg
            width="23"
            height="23"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14 18l-6-6 6-6" />
          </svg>
        </button>

        {/* Right Arrow */}
        <button
          onClick={() => goToIndex(currentIndex + 1)}
          className={`p-2 rounded-full cursor-pointer transition-colors duration-200 ${playfair.className} bg-white/50 text-black hover:bg-white/60 absolute top-1/2 right-4 transform -translate-y-1/2 z-10`}
        >
          <svg
            width="23"
            height="23"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* Photo Number Indicator */}
      <div className={`text-center mt-4 text-white ${playfair.className}`}>
        {currentIndex + 1}/13
      </div>

      {/* Expanded Image Modal */}
      {isExpanded && (
        <div
          id="yacht"
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-[110]"
          onClick={() => setIsExpanded(false)}
          ref={expandedImageRef}
          tabIndex={0}
        >
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 40 : -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -40 : 40 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="relative max-w-4xl w-full h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[currentIndex].src}
                alt={images[currentIndex].alt}
                fill
                className="object-contain"
                onClick={() => setIsExpanded(false)}
              />
            </motion.div>
          </AnimatePresence>

          {/* Left Arrow in Expanded */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToIndex(currentIndex - 1);
            }}
            className={`p-2 rounded-full cursor-pointer transition-colors duration-200 ${playfair.className} bg-white/50 text-black hover:bg-white/60 absolute top-1/2 left-4 transform -translate-y-1/2 z-[110]`}
          >
            <svg
              width="23"
              height="23"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Right Arrow in Expanded */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToIndex(currentIndex + 1);
            }}
            className={`p-2 rounded-full cursor-pointer transition-colors duration-200 ${playfair.className} bg-white/50 text-black hover:bg-white/60 absolute top-1/2 right-4 transform -translate-y-1/2 z-[110]`}
          >
            <svg
              width="23"
              height="23"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default Slideshow;
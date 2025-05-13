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
  const [isExpanded, setIsExpanded] = useState(false);
  const expandedImageRef = useRef<HTMLDivElement>(null);

  const images = Array.from({ length: 13 }, (_, i) => ({
    src: `/images/slideshow/${i + 1}.webp?v2`,
    alt: `Slideshow image ${i + 1} of Greenline 48 Fly`,
  }));

  // Preload images
  useEffect(() => {
    images.forEach((image) => {
      const img = new window.Image();
      img.src = image.src;
    });
  }, []);

  const goToIndex = (index: number) => {
    const newIndex = (index + images.length) % images.length;
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
    <div className="relative w-full max-w-4xl mx-auto pb-10">
      {/* Main Slideshow */}
      <div className="relative h-110 overflow-hidden rounded-sm shadow-lg">
        <AnimatePresence initial={false}>
          <motion.div
            key={images[currentIndex].src}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="absolute inset-0"
            style={{ zIndex: 10 - currentIndex }}
          >
            <Image
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              width={1200}
              height={800}
              priority={currentIndex === 0}
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
          <AnimatePresence initial={false}>
            <motion.div
              key={images[currentIndex].src}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="absolute inset-0 flex items-center justify-center"
              style={{ zIndex: 10 - currentIndex }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[currentIndex].src}
                alt={images[currentIndex].alt}
                fill
                className="object-contain"
                priority={true}
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
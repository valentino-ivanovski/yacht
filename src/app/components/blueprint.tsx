'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Playfair_Display_SC, Playfair, Playfair_Display } from 'next/font/google';

const playfairDisplaySC = Playfair_Display_SC({
    subsets: ['latin'],
    weight: ['400', '700'],
    variable: '--font-playfair',
    style: ['italic', 'normal'],
});

const playfair = Playfair({
    subsets: ['latin'],
    weight: ['400', '700'],
    variable: '--font-playfair',
    style: ['italic', 'normal'],
});

const playfairDisplay = Playfair_Display({
    subsets: ['latin'],
    weight: ['400', '700'],
    variable: '--font-playfair',
    style: ['italic', 'normal'],
});

const images = [
  { src: '/images/flybridge.webp?v=2', label: 'Flybridge' },
  { src: '/images/maindeck.webp?v=2', label: 'Main deck' },
  { src: '/images/lower-deckA1.webp?v=2', label: 'Lower deck A' },
  { src: '/images/lower-deckB1.webp?v=2', label: 'Lower deck B' },
  { src: '/images/lower-deckC.webp?v=2', label: 'Lower deck C' },
];

export default function Blueprint() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Preload images
  useEffect(() => {
    images.forEach((image) => {
      const img = new window.Image();
      img.src = image.src;
    });
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToIndex = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="flex flex-col items-center py-8">
      <div className="relative w-[90vw] max-w-3xl aspect-[1110/355]">
        <AnimatePresence initial={false}>
          <motion.div
            key={images[currentIndex].src}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="absolute inset-0"
            style={{ zIndex: currentIndex }}
          >
            <Image
              src={images[currentIndex].src}
              alt={images[currentIndex].label}
              layout="fill"
              objectFit="contain"
              objectPosition="center"
              className="rounded-lg shadow-lg"
              priority={currentIndex === 0}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-10 flex flex-row items-center justify-center gap-4">
        <motion.button
          onClick={() => goToIndex((currentIndex - 1 + images.length) % images.length)}
          className={`p-2 rounded-full cursor-pointer transition-colors duration-200 ${playfair.className} bg-white/50 text-black hover:bg-white/60`}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="23"
            height="23"
            viewBox="0 0 23 23"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ transform: 'translateX(-2px)' }}
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </motion.button>
        <AnimatePresence mode="wait">
          <motion.div
            key={images[currentIndex].label}
            className={`px-10 py-1 rounded-sm text-center text-3xl ${playfair.className} bg-transparent text-white`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {images[currentIndex].label}
          </motion.div>
        </AnimatePresence>
        <motion.button
          onClick={() => goToIndex((currentIndex + 1) % images.length)}
          className={`p-2 rounded-full cursor-pointer transition-colors duration-200 ${playfair.className} bg-white/50 text-black hover:bg-white/60`}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="23"
            height="23"
            viewBox="0 0 23 23"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </motion.button>
      </div>
    </div>
  );
}
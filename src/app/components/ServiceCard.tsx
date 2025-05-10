'use client';

import { motion } from 'framer-motion';
import { Playfair_Display_SC, Playfair } from 'next/font/google';
import Image from 'next/image';
import { ReactNode } from 'react';

const playfairDisplaySC = Playfair_Display_SC({
  subsets: ['latin'],
  weight: ['400', '700'],
});

const playfair = Playfair({
  subsets: ['latin'],
  weight: ['400', '700'],
});

interface ServiceOption {
  label: string;
  value?: string;
}

interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  options: ServiceOption[];
  optionsTitle: string;
  priceNote?: string;
  isListStyle?: boolean;
}

export default function ServiceCard({
  icon,
  title,
  description,
  options,
  optionsTitle,
  priceNote,
  isListStyle = false
}: ServiceCardProps) {
  return (
    <motion.div 
      className="bg-white/5 backdrop-blur-sm border border-white/30 rounded-lg overflow-hidden hover:bg-white/10 transition-all duration-300 p-8 flex flex-col items-center"
      whileHover={{ y: -10 }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-20%" }}
    >
      <div className="w-32 h-32 mb-6 flex items-center justify-center">
        {icon}
      </div>
      <div className="text-center">
        <h3 className={`text-2xl font-bold mb-3 ${playfairDisplaySC.className}`}>{title}</h3>
        <p className={`text-white/90 ${playfair.className} mb-4`}>
          {description}
        </p>
        
        <div className={`w-full border-t border-white/20 pt-4 ${playfair.className}`}>
          <h4 className="text-lg mb-2">{optionsTitle}</h4>
          {isListStyle ? (
            <ul className="space-y-2 text-sm text-left pl-4">
              {options.map((option, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{option.label}</span>
                </li>
              ))}
            </ul>
          ) : (
            <ul className="space-y-2 text-sm">
              {options.map((option, index) => (
                <li key={index} className="flex justify-between">
                  <span>{option.label}</span>
                  {option.value && <span>{option.value}</span>}
                </li>
              ))}
            </ul>
          )}
          {priceNote && (
            <div className="mt-4 text-center">
              <span className="text-sm">{priceNote}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
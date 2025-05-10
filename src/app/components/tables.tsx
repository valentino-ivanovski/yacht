'use client';

import React from 'react';
import { Playfair } from 'next/font/google';

const playfair = Playfair({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-playfair',
  style: ['italic', 'normal'],
});

const Tables: React.FC = () => {
  const dimensions = [
    { label: 'Length overall', value: '15.97 m' },
    { label: 'Beam', value: '4.80 m' },
    { label: 'Bridge clearance min.', value: '4.10 m' },
    { label: 'Draft empty', value: '0.98 m' },
    { label: 'Displacement empty', value: '13,800 kg appr.' },
  ];

  const accommodations = [
    { label: 'Cabins', value: '3 (opt. 4 skip)' },
    { label: 'Max. Berths', value: '6 + 2 salon + 1' },
    { label: 'Toilets/washrooms', value: '3 (opt. 4 skip)' },
  ];

  return (
    <div className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-8 py-20">
      <div className="w-full bg-white/5 sm:w-1/2 bg-transparent rounded-lg overflow-hidden border border-white/70">
        <table className={`w-full text-sm ${playfair.className}`}>
          <thead>
            <tr>
              <th colSpan={2} className="py-2 px-4 text-white text-2xl font-normal border-b border-white/50">
                Dimensions
              </th>
            </tr>
          </thead>
          <tbody>
            {dimensions.map((item, index) => (
              <tr key={index} className="border-b border-white/30 last:border-b-0">
                <td className="py-2 px-4 text-white text-lg">{item.label}</td>
                <td className="py-2 px-4 text-right text-lg text-white">{item.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="w-full bg-white/5 sm:w-1/2 bg-transparent rounded-lg overflow-hidden border border-white/70">
        <table className={`w-full text-sm ${playfair.className}`}>
          <thead>
            <tr>
              <th colSpan={2} className="py-2 px-4 text-white text-2xl font-normal border-b border-white/50">
                Accommodation
              </th>
            </tr>
          </thead>
          <tbody>
            {accommodations.map((item, index) => (
              <tr key={index} className="border-b border-white/30 last:border-b-0">
                <td className="py-2 px-4 text-white text-lg">{item.label}</td>
                <td className="py-2 px-4 text-right text-lg text-white">{item.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tables;
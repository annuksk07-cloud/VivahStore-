/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Share2, PlusCircle, Smartphone } from 'lucide-react';

export const QuickStrip: React.FC = () => {
  const chips = [
    { icon: Share2, label: '1. Share one link' },
    { icon: PlusCircle, label: '2. Guest taps Add' },
    { icon: Smartphone, label: '3. Your photo is on their home screen' },
  ];

  return (
    <section className="relative py-4 sm:py-6 px-5 max-w-[1100px] mx-auto box-border min-w-0">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20px' }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4"
      >
        {chips.map((chip, idx) => {
          const Icon = chip.icon;
          return (
            <div
              key={idx}
              className="liquid-glass rounded-2xl py-3.5 px-4 flex items-center justify-center gap-3 border border-white/90 shadow-md text-center"
            >
              <div className="w-8 h-8 rounded-full bg-[#DDF3F8] text-[#2A8FBD] flex items-center justify-center shrink-0 border border-white">
                <Icon className="w-4 h-4" />
              </div>
              <span className="font-outfit font-semibold text-sm sm:text-base text-[#12324A]">
                {chip.label}
              </span>
            </div>
          );
        })}
      </motion.div>
    </section>
  );
};

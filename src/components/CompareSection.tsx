/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Check, X, Sparkles } from 'lucide-react';

export const CompareSection: React.FC = () => {
  const rows = [
    "Stays on the guest's home screen",
    "Shows your photo as the icon",
    "Opens full screen like an app",
    "Map, music and RSVP included",
    "Easy to find on the wedding day",
  ];

  return (
    <section className="relative py-12 sm:py-16 px-3 sm:px-5 max-w-[1100px] mx-auto box-border min-w-0">
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
        <h2 className="font-syne font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#12324A] tracking-tight">
          Paper card, PDF, or an app invitation?
        </h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5 }}
        className="liquid-glass rounded-[28px] sm:rounded-[32px] p-3 sm:p-8 border border-white/90 shadow-xl overflow-hidden"
      >
        <div className="w-full">
          {/* Table Header */}
          <div className="grid grid-cols-[1.2fr_0.8fr_0.8fr_1.1fr] sm:grid-cols-[1.5fr_1fr_1fr_1.2fr] gap-1 sm:gap-4 pb-4 border-b border-[#2A8FBD]/20 items-center text-center">
            <div className="text-left font-syne font-bold text-xs sm:text-base text-[#12324A] pl-1 sm:pl-2">
              Features
            </div>
            <div className="font-outfit font-semibold text-[11px] sm:text-sm text-[#12324A]/70">
              Paper card
            </div>
            <div className="font-outfit font-semibold text-[11px] sm:text-sm text-[#12324A]/70">
              Image or PDF
            </div>
            {/* Highlighted with Aqua Glow */}
            <div className="relative rounded-2xl bg-gradient-to-tr from-[#7FD6E3]/30 to-[#2A8FBD]/20 p-1.5 sm:p-2.5 border border-[#7FD6E3]/50 shadow-md shadow-[#7FD6E3]/20">
              <span className="font-syne font-extrabold text-[11px] sm:text-sm text-[#2A8FBD] flex items-center justify-center gap-1">
                <Sparkles className="w-3 h-3 text-[#2A8FBD] hidden sm:inline-block" />
                Our app invitation
              </span>
            </div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-[#2A8FBD]/10">
            {rows.map((rowText, idx) => (
              <div
                key={idx}
                className="grid grid-cols-[1.2fr_0.8fr_0.8fr_1.1fr] sm:grid-cols-[1.5fr_1fr_1fr_1.2fr] gap-1 sm:gap-4 py-3.5 sm:py-4 items-center text-center hover:bg-white/30 transition-colors rounded-xl px-1 sm:px-2"
              >
                {/* Feature Label */}
                <div className="text-left font-outfit font-semibold text-xs sm:text-base text-[#12324A] leading-tight">
                  {rowText}
                </div>

                {/* Paper card */}
                <div className="flex justify-center items-center">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-red-100/70 text-red-500 flex items-center justify-center">
                    <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3]" />
                  </div>
                </div>

                {/* Image or PDF */}
                <div className="flex justify-center items-center">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-red-100/70 text-red-500 flex items-center justify-center">
                    <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3]" />
                  </div>
                </div>

                {/* Our app invitation (Highlighted Column) */}
                <div className="flex justify-center items-center">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-md shadow-emerald-500/30">
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 stroke-[3]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

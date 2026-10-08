/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Check, X } from 'lucide-react';

export const CompareSection: React.FC = () => {
  const rows = [
    {
      feature: "Finding it again",
      paper: "Wherever you left it",
      videoPdf: "Scroll through old chats",
      vivahStore: "Tap the icon",
    },
    {
      feature: "Getting to the venue",
      paper: "Type the address",
      videoPdf: "Copy it, then open Maps",
      vivahStore: "Directions in one tap",
    },
    {
      feature: "Your photo on their phone",
      paper: "No",
      videoPdf: "No",
      vivahStore: "Yes, as the icon",
    },
    {
      feature: "Countdown and RSVP",
      paper: "No",
      videoPdf: "Depends on the file",
      vivahStore: "Included",
    },
  ];

  return (
    <section id="compare" className="relative py-12 sm:py-16 px-5 max-w-[1100px] mx-auto box-border min-w-0">
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
        <h2 className="font-syne font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#12324A] tracking-tight">
          Paper, video, PDF or Vivah Store?
        </h2>
      </div>

      {/* DESKTOP TABLE VIEW (900px and up) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5 }}
        className="hidden md:block liquid-glass rounded-[32px] p-6 sm:p-8 border border-white/90 shadow-xl overflow-hidden"
      >
        <div className="w-full">
          {/* Table Header */}
          <div className="grid grid-cols-[1.2fr_1fr_1.1fr_1.2fr] gap-4 pb-4 border-b border-[#2A8FBD]/20 items-center text-center">
            <div className="text-left font-syne font-bold text-base text-[#12324A] pl-2">
              Features
            </div>
            <div className="font-outfit font-semibold text-sm text-[#12324A]/70">
              Paper card
            </div>
            <div className="font-outfit font-semibold text-sm text-[#12324A]/70">
              Video or PDF
            </div>
            <div className="relative rounded-2xl bg-gradient-to-tr from-[#7FD6E3]/30 to-[#2A8FBD]/20 p-2.5 border border-[#7FD6E3]/50 shadow-md shadow-[#7FD6E3]/20">
              <span className="font-syne font-extrabold text-sm text-[#2A8FBD] flex items-center justify-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#2A8FBD]" />
                Vivah Store
              </span>
            </div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-[#2A8FBD]/10">
            {rows.map((row, idx) => (
              <div
                key={idx}
                className="grid grid-cols-[1.2fr_1fr_1.1fr_1.2fr] gap-4 py-4 items-center text-center hover:bg-white/30 transition-colors rounded-xl px-2"
              >
                {/* Feature Label */}
                <div className="text-left font-outfit font-bold text-base text-[#12324A]">
                  {row.feature}
                </div>

                {/* Paper card */}
                <div className="font-outfit text-sm text-[#12324A]/75 font-medium flex items-center justify-center gap-1.5">
                  {row.paper === "No" && <X className="w-4 h-4 text-red-500 stroke-[2.5]" />}
                  <span>{row.paper}</span>
                </div>

                {/* Video or PDF */}
                <div className="font-outfit text-sm text-[#12324A]/75 font-medium flex items-center justify-center gap-1.5">
                  {row.videoPdf === "No" && <X className="w-4 h-4 text-red-500 stroke-[2.5]" />}
                  <span>{row.videoPdf}</span>
                </div>

                {/* Vivah Store */}
                <div className="font-outfit text-sm font-bold text-[#2A8FBD] flex items-center justify-center gap-1.5 bg-[#DDF3F8]/60 py-2 rounded-xl border border-white">
                  <Check className="w-4 h-4 text-[#2A8FBD] stroke-[3]" />
                  <span>{row.vivahStore}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* MOBILE CARDS VIEW (below 900px - No horizontal scroll) */}
      <div className="block md:hidden space-y-4">
        {rows.map((row, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: idx * 0.08 }}
            className="liquid-glass rounded-2xl p-4 border border-white/90 shadow-md space-y-2.5"
          >
            <div className="font-syne font-extrabold text-base text-[#12324A] pb-2 border-b border-[#2A8FBD]/15">
              {row.feature}
            </div>

            <div className="space-y-1.5 text-xs font-outfit">
              <div className="flex justify-between items-center text-[#12324A]/70">
                <span className="font-semibold">Paper card:</span>
                <span>{row.paper}</span>
              </div>

              <div className="flex justify-between items-center text-[#12324A]/70">
                <span className="font-semibold">Video or PDF:</span>
                <span>{row.videoPdf}</span>
              </div>

              <div className="flex justify-between items-center text-[#2A8FBD] font-bold bg-[#DDF3F8] p-2 rounded-xl border border-white">
                <span>Vivah Store:</span>
                <span className="flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-[#2A8FBD] stroke-[3]" />
                  {row.vivahStore}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

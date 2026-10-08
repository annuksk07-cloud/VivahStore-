/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Smartphone, ArrowUp } from 'lucide-react';

export const TryItSection: React.FC = () => {
  const scrollToDesigns = () => {
    const el = document.getElementById('designs');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="try-it" className="relative py-12 sm:py-16 px-5 max-w-[1100px] mx-auto box-border min-w-0">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5 }}
        className="liquid-glass rounded-[32px] p-6 sm:p-10 border border-white/90 shadow-xl text-center"
      >
        <div className="max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass text-xs font-semibold tracking-wider uppercase text-[#2A8FBD] border border-white/80 shadow-sm mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#7FD6E3]" />
            <span>SEE IT FOR YOURSELF</span>
          </div>

          <h2 className="font-syne font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#12324A] tracking-tight mb-3">
            Try it on your own phone.
          </h2>

          <p className="text-base sm:text-lg text-[#12324A]/85 font-medium leading-relaxed mb-6">
            Open any design above and tap Add. The invitation lands on your home screen, exactly where your guests will find it.
          </p>

          <p className="text-xs sm:text-sm text-[#12324A]/70 font-medium flex items-center justify-center gap-2 mb-8">
            <Smartphone className="w-4 h-4 text-[#2A8FBD]" />
            <span>On iPhone: tap Share, then Add to Home Screen.</span>
          </p>

          <div className="flex justify-center">
            <button
              type="button"
              onClick={scrollToDesigns}
              className="h-[52px] px-8 rounded-full font-outfit font-semibold text-base text-[#12324A] liquid-glass hover:bg-white/90 shadow-md flex items-center justify-center gap-2 cursor-pointer border border-white/90"
            >
              <span>See live designs</span>
              <ArrowUp className="w-4 h-4 text-[#2A8FBD]" />
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

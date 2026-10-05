/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

export const ImagineSection: React.FC = () => {
  return (
    <section className="relative py-12 sm:py-16 px-5 max-w-[1100px] mx-auto box-border min-w-0">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5 }}
        className="liquid-glass rounded-[32px] p-6 sm:p-10 border border-white/90 shadow-xl"
      >
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-12 h-12 rounded-2xl bg-[#DDF3F8] text-[#2A8FBD] flex items-center justify-center mx-auto mb-4 border border-white">
            <Sparkles className="w-6 h-6" />
          </div>

          <h2 className="font-syne font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#12324A] tracking-tight mb-4">
            Imagine your wedding day.
          </h2>

          <p className="text-base sm:text-lg text-[#12324A]/85 font-medium leading-relaxed">
            Every guest opens their phone, taps your photo, and finds the date and the map in seconds. No scrolling. No 'where is the card?' messages. Without it, your invitation is just one more image in a crowded chat.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

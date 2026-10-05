/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Share2, PlusCircle, Smartphone } from 'lucide-react';

export const WhatIsItSection: React.FC = () => {
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
          <h2 className="font-syne font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#12324A] tracking-tight mb-4">
            So, what exactly do you get?
          </h2>
          <p className="text-base sm:text-lg text-[#12324A]/85 font-medium leading-relaxed mb-10">
            A wedding invitation website made with your names, photos, date and venue. You send one link on WhatsApp. A small pop-up asks your guest to add it to their phone. Then your invitation sits on their home screen, with your photo as the icon, just like any app.
          </p>

          {/* Three small icon steps in a row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2 border-t border-[#2A8FBD]/15">
            <div className="flex flex-col items-center text-center p-3">
              <div className="w-12 h-12 rounded-2xl bg-[#DDF3F8] text-[#2A8FBD] flex items-center justify-center mb-3 shadow-sm border border-white">
                <Share2 className="w-6 h-6" />
              </div>
              <h3 className="font-outfit font-semibold text-base text-[#12324A]">
                1. You share one link
              </h3>
            </div>

            <div className="flex flex-col items-center text-center p-3">
              <div className="w-12 h-12 rounded-2xl bg-[#DDF3F8] text-[#2A8FBD] flex items-center justify-center mb-3 shadow-sm border border-white">
                <PlusCircle className="w-6 h-6" />
              </div>
              <h3 className="font-outfit font-semibold text-base text-[#12324A]">
                2. Guest taps Add
              </h3>
            </div>

            <div className="flex flex-col items-center text-center p-3">
              <div className="w-12 h-12 rounded-2xl bg-[#DDF3F8] text-[#2A8FBD] flex items-center justify-center mb-3 shadow-sm border border-white">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="font-outfit font-semibold text-base text-[#12324A]">
                3. Your photo appears on their home screen
              </h3>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { AlertCircle } from 'lucide-react';

export const ProblemSection: React.FC = () => {
  return (
    <section id="why-us" className="relative py-12 sm:py-16 px-5 max-w-[1100px] mx-auto box-border min-w-0">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5 }}
        className="liquid-glass rounded-[32px] p-6 sm:p-10 border border-white/90 shadow-xl"
      >
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center mx-auto mb-4 border border-amber-500/20">
            <AlertCircle className="w-6 h-6" />
          </div>

          <h2 className="font-syne font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#12324A] tracking-tight mb-4">
            Your invitation deserves better than getting lost in a chat.
          </h2>

          <p className="text-base sm:text-lg text-[#12324A]/85 font-medium leading-relaxed">
            You plan your wedding for months. Then the invitation goes out as a photo or a PDF, and it gets buried under good-morning messages. Guests scroll and scroll to find the date and the venue. And you are left wondering if they even saw it. The most important message of your life should not be this hard to find.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

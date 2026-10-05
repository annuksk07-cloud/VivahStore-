/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { MessageCircle, Sparkles } from 'lucide-react';
import { getFinalCtaWhatsAppUrl } from '../config/siteConfig.ts';

export const FinalCta: React.FC = () => {
  const waUrl = getFinalCtaWhatsAppUrl();

  return (
    <section className="relative py-12 sm:py-20 px-5 max-w-[1100px] mx-auto box-border min-w-0">
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5 }}
        className="liquid-glass-accent rounded-[36px] p-8 sm:p-14 border border-white/90 shadow-2xl text-center relative overflow-hidden"
      >
        {/* Soft Background Aqua Glow */}
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#7FD6E3]/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-[#2A8FBD]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-2xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass text-xs font-semibold tracking-wider uppercase text-[#2A8FBD] border border-white/80 shadow-sm mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#7FD6E3]" />
            <span>START NOW</span>
          </div>

          <h2 className="font-syne font-extrabold text-2xl sm:text-4xl lg:text-5xl text-[#12324A] tracking-tight mb-4">
            Ready to make your invitation an app icon?
          </h2>

          <p className="text-base sm:text-xl text-[#12324A]/85 font-medium leading-relaxed mb-8">
            Send us your names, date, venue and favourite design. We will take it from there.
          </p>

          <div className="flex justify-center">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="h-[56px] px-9 rounded-full font-outfit font-semibold text-base sm:text-lg text-white bg-gradient-to-r from-[#25D366] to-[#1FB85A] shadow-xl shadow-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2.5 no-underline cursor-pointer select-none border border-white/40"
            >
              <MessageCircle className="w-6 h-6 fill-white" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

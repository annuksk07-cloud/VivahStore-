/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, MessageCircle, Navigation, MapPin } from 'lucide-react';
import { getCleanWhatsAppNumber } from '../config/siteConfig.ts';

export const WeddingDaySection: React.FC = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  const number = getCleanWhatsAppNumber();
  const waMessage = "Hi Vivah Store! I want an invitation my guests can open in one tap.";
  const waUrl = `https://wa.me/${number}?text=${encodeURIComponent(waMessage)}`;

  const videoSteps = [
    "Open WhatsApp",
    "Scroll to find the file",
    "Open it and zoom in",
    "Pause and rewind to read the address",
    "Copy it into Maps",
  ];

  const vivahSteps = [
    "Tap your photo on the home screen",
    "Tap Directions",
  ];

  return (
    <section id="wedding-day" className="relative py-12 sm:py-16 px-5 max-w-[1100px] mx-auto box-border min-w-0">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass text-xs font-semibold tracking-wider uppercase text-[#2A8FBD] border border-white/80 shadow-sm mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#7FD6E3]" />
          <span>ON THE WEDDING DAY</span>
        </div>

        <h2 className="font-syne font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#12324A] tracking-tight mb-4">
          Picture a guest running late.
        </h2>

        <p className="text-base sm:text-lg text-[#12324A]/85 font-medium leading-relaxed">
          They are in the car and they need the venue right now. With a video or a PDF, they scroll, pause, zoom and copy the address by hand. With your Vivah Store invitation, they tap your photo and tap Directions.
        </p>
      </div>

      {/* Two Comparison Cards Side-by-Side on Desktop, Stacked on Mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 items-stretch">
        {/* Card 1: Video or PDF */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4 }}
          className="liquid-glass rounded-[32px] p-6 sm:p-8 border border-white/80 shadow-md opacity-90 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between gap-2 mb-4">
              <h3 className="font-syne font-extrabold text-xl sm:text-2xl text-[#12324A]/80">
                Video or PDF
              </h3>
              <span className="text-xs font-bold text-[#12324A]/70 bg-black/5 px-3 py-1 rounded-full border border-black/10">
                5 steps
              </span>
            </div>

            <ol className="space-y-3 font-outfit text-sm text-[#12324A]/80 font-medium">
              {videoSteps.map((step, idx) => (
                <motion.li
                  key={idx}
                  initial={prefersReducedMotion ? false : { opacity: 0, x: -10 }}
                  whileInView={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={prefersReducedMotion ? undefined : { duration: 0.3, delay: idx * 0.25 }}
                  className="flex items-center gap-3 bg-white/40 p-2.5 rounded-xl border border-white/60"
                >
                  <span className="w-6 h-6 rounded-full bg-[#12324A]/10 text-[#12324A]/70 font-bold text-xs flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </motion.li>
              ))}
            </ol>
          </div>
        </motion.div>

        {/* Card 2: Vivah Store */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="liquid-glass rounded-[32px] p-6 sm:p-8 border-2 border-[#7FD6E3] shadow-[0_0_25px_rgba(127,214,227,0.35)] flex flex-col justify-between relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#7FD6E3]/20 rounded-full blur-2xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between gap-2 mb-4">
              <h3 className="font-syne font-extrabold text-xl sm:text-2xl text-[#12324A] flex items-center gap-2">
                <span>Vivah Store</span>
                <MapPin className="w-5 h-5 text-[#2A8FBD]" />
              </h3>

              <motion.span
                animate={
                  prefersReducedMotion
                    ? undefined
                    : { scale: [1, 1.15, 1] }
                }
                transition={
                  prefersReducedMotion
                    ? undefined
                    : { duration: 0.6, delay: 1.2, ease: "easeInOut" }
                }
                className="text-xs font-bold text-[#2A8FBD] bg-[#7FD6E3]/30 px-3.5 py-1 rounded-full border border-[#7FD6E3]/60 shadow-sm"
              >
                2 taps
              </motion.span>
            </div>

            <ol className="space-y-3 font-outfit text-sm text-[#12324A] font-semibold">
              {vivahSteps.map((step, idx) => (
                <motion.li
                  key={idx}
                  initial={prefersReducedMotion ? false : { opacity: 0, x: -10 }}
                  whileInView={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={
                    prefersReducedMotion
                      ? undefined
                      : { duration: 0.3, delay: (videoSteps.length + idx) * 0.25 }
                  }
                  className="flex items-center gap-3 bg-gradient-to-r from-[#DDF3F8] to-white/90 p-3.5 rounded-xl border border-white shadow-xs"
                >
                  <span className="w-7 h-7 rounded-full bg-[#2A8FBD] text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
                    {idx + 1}
                  </span>
                  <span className="text-base text-[#12324A]">{step}</span>
                </motion.li>
              ))}
            </ol>
          </div>

          <div className="mt-6 pt-4 border-t border-[#2A8FBD]/15">
            <div className="flex items-center gap-2 text-xs font-bold text-[#2A8FBD]">
              <Navigation className="w-4 h-4 fill-[#2A8FBD]" />
              <span>Instant Maps directions on their phone</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Small Caption & Closing Line */}
      <div className="text-center space-y-2 mb-8">
        <p className="text-xs text-[#12324A]/60 font-medium">
          An example of how guests usually look for an address.
        </p>
        <p className="font-syne font-bold text-base sm:text-lg text-[#12324A]">
          Fewer 'where is the venue?' messages for your family. Less stress for your guests.
        </p>
      </div>

      {/* WhatsApp Button */}
      <div className="flex justify-center">
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="h-[56px] px-8 rounded-full font-outfit font-semibold text-base text-white bg-gradient-to-r from-[#25D366] to-[#1FB85A] shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/35 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2.5 no-underline cursor-pointer border border-white/30"
        >
          <MessageCircle className="w-5 h-5 fill-white" />
          <span>Chat on WhatsApp</span>
        </a>
      </div>
    </section>
  );
};

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { MessageCircle, Sparkles, Smartphone, ArrowDown } from 'lucide-react';
import { buildWhatsAppUrl } from '../config/siteConfig.ts';

interface HeroSectionProps {
  onOpenDemo: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenDemo }) => {
  const heroMsg = "Hi! I saw your website and want to know more about the app-style wedding invitation.";
  const heroWaUrl = buildWhatsAppUrl(heroMsg);

  return (
    <section
      id="hero"
      className="relative pt-24 sm:pt-32 pb-12 sm:pb-20 px-5 max-w-[1100px] mx-auto box-border min-w-0"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10 lg:gap-12 items-center">
        {/* Left Column: Headline, Copy, Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-start text-left max-w-2xl"
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass text-xs font-semibold tracking-wider uppercase text-[#2A8FBD] border border-white/80 shadow-sm mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#7FD6E3]" />
            <span>WEDDING INVITATIONS, REIMAGINED</span>
          </div>

          {/* Headline */}
          <h1
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', lineHeight: 1.1 }}
            className="font-syne font-extrabold text-[#12324A] tracking-tight mb-5"
          >
            Your wedding invitation, <span className="text-gradient-ocean">now an app icon.</span>
          </h1>

          {/* Sub-line */}
          <p className="text-base sm:text-lg text-[#12324A]/85 font-medium leading-relaxed mb-8 max-w-xl">
            We turn your invitation into a stylish app-like website. Guests add it to their phone's home screen with your photo as the icon. One tap, and your wedding is right there.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-4">
            {/* Primary Button */}
            <a
              href={heroWaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="h-[56px] px-8 rounded-full font-outfit font-semibold text-base text-white bg-gradient-to-r from-[#25D366] to-[#1FB85A] shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/35 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2.5 no-underline cursor-pointer select-none border border-white/30"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              <span>Chat on WhatsApp</span>
            </a>

            {/* Secondary Button */}
            <button
              onClick={onOpenDemo}
              className="h-[56px] px-8 rounded-full font-outfit font-semibold text-base text-[#12324A] liquid-glass hover:bg-white/80 shadow-md shadow-[#2A8FBD]/10 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 cursor-pointer select-none border border-white/90"
            >
              <span>See live designs</span>
              <ArrowDown className="w-4 h-4 text-[#2A8FBD]" />
            </button>
          </div>

          {/* Small Line */}
          <p className="text-xs sm:text-sm text-[#12324A]/70 font-medium flex items-center gap-2 mt-1">
            <Smartphone className="w-4 h-4 text-[#2A8FBD]" />
            <span>Works on Android and iPhone. No app store needed.</span>
          </p>
        </motion.div>

        {/* Right Column: Modern Glass Phone Frame Mockup Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-col items-center"
        >
          {/* Glass Phone Frame */}
          <div className="animate-float relative w-[280px] sm:w-[310px] h-[550px] rounded-[48px] p-3.5 liquid-glass-accent border-2 border-white/90 shadow-2xl shadow-[#2A8FBD]/20 backdrop-blur-2xl flex flex-col overflow-hidden">
            {/* Phone Notch / Speaker */}
            <div className="w-28 h-4 bg-[#12324A]/20 backdrop-blur-md rounded-full mx-auto mb-3 shrink-0 flex items-center justify-center">
              <div className="w-3 h-1 bg-[#12324A]/30 rounded-full" />
            </div>

            {/* Phone Screen Wallpaper Content */}
            <div className="flex-1 rounded-[36px] bg-gradient-to-b from-[#1e3c54] via-[#12324A] to-[#0d2233] p-4 flex flex-col justify-between relative overflow-hidden text-white shadow-inner">
              {/* Wallpaper Background Soft Glow */}
              <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#7FD6E3]/20 rounded-full blur-3xl pointer-events-none" />

              {/* Status Bar */}
              <div className="flex justify-between items-center text-[10px] text-white/70 px-1 font-semibold">
                <span>9:41</span>
                <div className="flex items-center gap-1.5">
                  <span>5G</span>
                  <div className="w-4 h-2 border border-white/80 rounded-sm p-0.5 flex items-center">
                    <div className="w-full h-full bg-white rounded-xs" />
                  </div>
                </div>
              </div>

              {/* Home Screen App Grid */}
              <div className="my-auto py-4">
                <p className="text-[10px] text-white/50 uppercase tracking-widest text-center mb-6 font-semibold">
                  Home Screen
                </p>

                <div className="grid grid-cols-3 gap-y-6 gap-x-4 place-items-center px-2">
                  {/* Regular dummy app icons */}
                  <div className="flex flex-col items-center gap-1 opacity-40">
                    <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center" />
                    <span className="text-[9px] text-white/60">Camera</span>
                  </div>

                  <div className="flex flex-col items-center gap-1 opacity-40">
                    <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center" />
                    <span className="text-[9px] text-white/60">Photos</span>
                  </div>

                  <div className="flex flex-col items-center gap-1 opacity-40">
                    <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center" />
                    <span className="text-[9px] text-white/60">WhatsApp</span>
                  </div>

                  {/* PROMINENT WEDDING COUPLE APP ICON WITH PULSING RING */}
                  <div className="flex flex-col items-center gap-1.5 relative col-span-3 my-2">
                    {/* Soft Pulsing Aqua Ring */}
                    <div className="relative">
                      <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-[#7FD6E3] to-[#25D366] opacity-75 blur-md animate-pulse" />
                      <div className="absolute -inset-1.5 rounded-3xl border-2 border-[#7FD6E3] animate-ping opacity-50" />
                      
                      {/* Couple Photo App Icon */}
                      <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-white shadow-xl bg-gradient-to-tr from-[#2A8FBD] to-[#5BC3E3] flex items-center justify-center">
                        <img
                          src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=300&q=80"
                          alt="Couple photo app icon"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    <span className="text-xs font-bold text-white tracking-wide shadow-sm mt-1">
                      Ananya & Aarav
                    </span>
                    <span className="text-[9px] text-[#7FD6E3] font-semibold bg-[#7FD6E3]/20 px-2 py-0.5 rounded-full border border-[#7FD6E3]/30">
                      Wedding App Icon
                    </span>
                  </div>

                  {/* More dummy app icons */}
                  <div className="flex flex-col items-center gap-1 opacity-40">
                    <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center" />
                    <span className="text-[9px] text-white/60">Maps</span>
                  </div>

                  <div className="flex flex-col items-center gap-1 opacity-40">
                    <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center" />
                    <span className="text-[9px] text-white/60">Music</span>
                  </div>

                  <div className="flex flex-col items-center gap-1 opacity-40">
                    <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center" />
                    <span className="text-[9px] text-white/60">Notes</span>
                  </div>
                </div>
              </div>

              {/* Bottom Dock */}
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-2.5 flex justify-around items-center border border-white/10 mt-auto">
                <div className="w-10 h-10 rounded-xl bg-white/20" />
                <div className="w-10 h-10 rounded-xl bg-white/20" />
                <div className="w-10 h-10 rounded-xl bg-white/20" />
                <div className="w-10 h-10 rounded-xl bg-white/20" />
              </div>
            </div>
          </div>

          {/* Caption */}
          <p className="text-xs text-[#12324A]/75 font-semibold mt-3 text-center">
            This is how it looks on a guest's phone.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

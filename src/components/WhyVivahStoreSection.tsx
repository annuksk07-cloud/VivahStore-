/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Smartphone, Navigation, Touchpad, Share2, MessageCircle } from 'lucide-react';
import { buildWhatsAppUrl } from '../config/siteConfig.ts';

export const WhyVivahStoreSection: React.FC = () => {
  const waUrl = buildWhatsAppUrl("Hi Vivah Store! I saw your website and want to know more about the app-style wedding invitation.");

  const cards = [
    {
      icon: Smartphone,
      title: "Your photo, on their phone",
      desc: "They see your faces on the home screen, not a file lost in a chat.",
    },
    {
      icon: Navigation,
      title: "Directions in one tap",
      desc: "The venue opens in Maps. No copying, no pausing a video.",
    },
    {
      icon: Touchpad,
      title: "Everything in one place",
      desc: "Events, music, countdown and RSVP in a single link.",
    },
    {
      icon: Share2,
      title: "One link for everyone",
      desc: "Send it once on WhatsApp to the whole family.",
    },
  ];

  return (
    <section id="why-us" className="relative py-12 sm:py-16 px-5 max-w-[1100px] mx-auto box-border min-w-0">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="font-syne font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#12324A] tracking-tight">
          What your guests will notice.
        </h2>
      </div>

      {/* 4 Glass Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
        {cards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="liquid-glass rounded-[28px] p-6 sm:p-8 border border-white/90 shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#DDF3F8] text-[#2A8FBD] flex items-center justify-center mb-4 shadow-sm border border-white">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-syne font-extrabold text-xl text-[#12324A] mb-2">
                  {card.title}
                </h3>
                <p className="text-base text-[#12324A]/80 font-medium leading-relaxed">
                  {card.desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Button */}
      <div className="flex justify-center">
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="h-[56px] px-8 rounded-full font-outfit font-semibold text-base text-white bg-gradient-to-r from-[#25D366] to-[#1FB85A] shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/35 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2.5 no-underline cursor-pointer select-none border border-white/30"
        >
          <MessageCircle className="w-5 h-5 fill-white" />
          <span>Chat on WhatsApp</span>
        </a>
      </div>
    </section>
  );
};

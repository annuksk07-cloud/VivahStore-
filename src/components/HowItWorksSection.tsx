/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { MessageCircle, Clock, Smartphone, Code, Share2 } from 'lucide-react';
import { getHowItWorksWhatsAppUrl } from '../config/siteConfig.ts';

export const HowItWorksSection: React.FC = () => {
  const waUrl = getHowItWorksWhatsAppUrl();

  const steps = [
    {
      num: '1',
      icon: MessageCircle,
      title: 'Message us on WhatsApp',
      desc: 'Send your names, date and venue, and pick a design.',
    },
    {
      num: '2',
      icon: Code,
      title: 'We build it',
      desc: 'We create your invitation website and your photo app icon.',
    },
    {
      num: '3',
      icon: Share2,
      title: 'Share one link',
      desc: 'Send it on WhatsApp. Guests add it to their home screen.',
    },
  ];

  return (
    <section id="how-it-works" className="relative py-12 sm:py-16 px-5 max-w-[1100px] mx-auto box-border min-w-0">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="font-syne font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#12324A] tracking-tight mb-2">
          Three simple steps.
        </h2>
      </div>

      {/* 3 Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="liquid-glass rounded-[28px] p-6 sm:p-8 border border-white/90 shadow-lg relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#DDF3F8] text-[#2A8FBD] flex items-center justify-center shadow-sm border border-white">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="font-syne font-extrabold text-3xl text-[#2A8FBD]/30">
                    0{step.num}
                  </span>
                </div>

                <h3 className="font-syne font-extrabold text-xl text-[#12324A] mb-2">
                  {step.title}
                </h3>
                <p className="text-base text-[#12324A]/80 font-medium leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Line under the steps */}
      <div className="text-center mb-8">
        <p className="inline-flex items-center gap-2 font-syne font-bold text-base sm:text-lg text-[#2A8FBD] bg-[#DDF3F8]/60 px-5 py-2 rounded-full border border-white">
          <Clock className="w-5 h-5 text-[#2A8FBD]" />
          <span>Your invitation is ready in 48 hours.</span>
        </p>
      </div>

      {/* Small box "How guests add it" */}
      <div className="liquid-glass rounded-2xl p-5 max-w-2xl mx-auto border border-white/90 shadow-md text-center mb-8">
        <div className="flex items-center justify-center gap-2 font-syne font-extrabold text-sm sm:text-base text-[#12324A] mb-1">
          <Smartphone className="w-4 h-4 text-[#2A8FBD]" />
          <span>How guests add it:</span>
        </div>
        <p className="text-sm sm:text-base text-[#12324A]/85 font-medium">
          Android: tap the Add pop-up. iPhone: tap Share, then Add to Home Screen.
        </p>
      </div>

      {/* Button: "Start on WhatsApp" */}
      <div className="flex justify-center">
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="h-[56px] px-8 rounded-full font-outfit font-semibold text-base text-white bg-gradient-to-r from-[#25D366] to-[#1FB85A] shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/35 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2.5 no-underline cursor-pointer select-none border border-white/30"
        >
          <MessageCircle className="w-5 h-5 fill-white" />
          <span>Start on WhatsApp</span>
        </a>
      </div>
    </section>
  );
};

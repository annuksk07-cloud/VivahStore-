/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Check, ArrowUp } from 'lucide-react';
import { PRICING_CONFIG } from '../config/pricingConfig.ts';

export const PlansOverviewSection: React.FC = () => {
  const { plans, commonFeatures } = PRICING_CONFIG;

  const scrollToDesigns = () => {
    const el = document.getElementById('designs');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const planList = [plans.classic, plans.signature];

  return (
    <section id="packages" className="relative py-12 sm:py-16 px-5 max-w-[1100px] mx-auto box-border min-w-0">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass text-xs font-semibold tracking-wider uppercase text-[#2A8FBD] border border-white/80 shadow-sm mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#7FD6E3]" />
          <span>OUR PLANS</span>
        </div>

        <h2 className="font-syne font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#12324A] tracking-tight mb-2">
          Two plans. Pick a look.
        </h2>

        <p className="text-sm sm:text-base text-[#12324A]/80 font-medium leading-relaxed">
          Open a design above to see its price and customise it.
        </p>
      </div>

      {/* Two Glass Cards Side-by-Side on Desktop, Stacked on Mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {planList.map((plan) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4 }}
            className="liquid-glass rounded-[32px] p-6 sm:p-8 border border-white/90 shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <h3 className="font-syne font-extrabold text-2xl sm:text-3xl text-[#12324A]">
                  {plan.name}
                </h3>
                <span className="text-xs font-bold text-[#2A8FBD] bg-[#7FD6E3]/20 px-3 py-1 rounded-full border border-[#7FD6E3]/30">
                  Ready in {plan.delivery}
                </span>
              </div>

              <p className="text-sm font-semibold text-[#12324A]/75 mb-4">
                {plan.tagline}
              </p>

              <div className="mb-5 pb-4 border-b border-[#2A8FBD]/15">
                <span className="font-syne font-extrabold text-3xl sm:text-4xl text-[#12324A]">
                  From ₹{plan.price.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="space-y-2.5 text-sm text-[#12324A]/85 font-medium mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-[#25D366]/20 text-[#25D366] flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span>{plan.includedEvents} events included</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-[#25D366]/20 text-[#25D366] flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span>Extra event ₹{plan.extraEventPrice.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-[#25D366]/20 text-[#25D366] flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span>{plan.tagline}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Common Features Row */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20px' }}
        transition={{ duration: 0.4 }}
        className="liquid-glass rounded-[28px] p-6 sm:p-8 border border-white/90 shadow-lg text-center mb-8"
      >
        <h4 className="font-syne font-bold text-base sm:text-lg text-[#12324A] mb-4">
          Both plans include
        </h4>

        <div className="flex flex-wrap justify-center gap-2.5">
          {commonFeatures.map((feat, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/60 text-[#12324A] text-xs sm:text-sm font-semibold border border-white shadow-xs"
            >
              <Check className="w-3.5 h-3.5 text-[#25D366] stroke-[3]" />
              <span>{feat}</span>
            </span>
          ))}
        </div>
      </motion.div>

      {/* Button: "See designs" */}
      <div className="flex justify-center">
        <button
          type="button"
          onClick={scrollToDesigns}
          className="h-[52px] px-8 rounded-full font-outfit font-semibold text-base text-[#12324A] liquid-glass hover:bg-white/90 shadow-md flex items-center justify-center gap-2 cursor-pointer border border-white/90"
        >
          <span>See designs</span>
          <ArrowUp className="w-4 h-4 text-[#2A8FBD]" />
        </button>
      </div>
    </section>
  );
};

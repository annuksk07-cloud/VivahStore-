/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { PRICING_CONFIG } from '../config/pricingConfig.ts';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "Is it an app?",
      a: "Yes. It sits on the home screen with your photo as the icon and opens full screen. No app store needed.",
    },
    {
      q: "Why not a video or a PDF?",
      a: "Videos and PDFs look nice, but they cannot open Maps. Guests have to pause, scroll and copy the address by hand. Your Vivah Store invitation gives them Directions in one tap.",
    },
    {
      q: "Can my parents and grandparents use it?",
      a: "Yes. They tap your link, then tap Add. No login and no app store. If they skip Add, the link still opens like a normal website.",
    },
    {
      q: "Does it work on iPhone?",
      a: "Yes. Tap Share, then Add to Home Screen. On Android, a pop-up helps.",
    },
    {
      q: "Do guests need to download anything?",
      a: "No. They open your link and tap Add.",
    },
    {
      q: "Is Hindi available?",
      a: "Yes. Hindi, English or both.",
    },
    {
      q: "How long does it take?",
      a: "3 to 5 days, depending on your plan.",
    },
    {
      q: "What is the price?",
      a: `Plans start at ₹${PRICING_CONFIG.plans.classic.price.toLocaleString('en-IN')}. Open a design above to see its price, then send your order on WhatsApp.`,
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="questions" className="relative py-12 sm:py-16 px-5 max-w-[1100px] mx-auto box-border min-w-0">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="w-12 h-12 rounded-2xl bg-[#DDF3F8] text-[#2A8FBD] flex items-center justify-center mx-auto mb-3 border border-white">
          <HelpCircle className="w-6 h-6" />
        </div>
        <h2 className="font-syne font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#12324A] tracking-tight">
          Questions
        </h2>
      </div>

      <div className="max-w-3xl mx-auto space-y-3.5">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="liquid-glass rounded-2xl overflow-hidden border border-white/90 shadow-md"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer select-none min-h-[56px]"
                aria-expanded={isOpen}
              >
                <span className="font-syne font-bold text-base sm:text-lg text-[#12324A]">
                  {faq.q}
                </span>
                <div className={`w-8 h-8 rounded-full bg-[#DDF3F8] text-[#2A8FBD] flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-[#2A8FBD] text-white' : ''}`}>
                  <ChevronDown className="w-5 h-5" />
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
                  >
                    <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-base text-[#12324A]/80 font-medium border-t border-[#2A8FBD]/10 pt-3">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

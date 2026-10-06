/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, LayoutGrid, MessageCircle, HelpCircle as QuestionIcon, ShieldCheck } from 'lucide-react';
import { SITE_CONFIG, buildWhatsAppUrl } from '../config/siteConfig.ts';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate }) => {
  const navMsg = "Hi Vivah Store! I saw your website and want to know more about the app-style wedding invitation.";
  const navWaUrl = buildWhatsAppUrl(navMsg);

  const mobileNavItems = [
    { id: 'designs', label: 'Designs', icon: LayoutGrid },
    { id: 'how-it-works', label: 'Steps', icon: Sparkles },
    { id: 'why-us', label: 'Why Us', icon: ShieldCheck },
    { id: 'questions', label: 'Questions', icon: QuestionIcon },
    { id: 'whatsapp', label: 'WhatsApp', icon: MessageCircle, isWhatsApp: true },
  ];

  const handleMobileClick = (item: typeof mobileNavItems[0]) => {
    if (item.isWhatsApp) {
      window.open(navWaUrl, '_blank', 'noopener,noreferrer');
    } else {
      onNavigate(item.id);
    }
  };

  return (
    <>
      {/* ================= MOBILE TOP BAR (BELOW 900px) ================= */}
      <div className="lg:hidden fixed top-3 inset-x-4 z-40 max-w-lg mx-auto">
        <div className="liquid-glass rounded-full px-4 py-2 flex items-center justify-between shadow-lg shadow-[#2A8FBD]/5 border border-white/90">
          {/* Logo on the left */}
          <button
            onClick={() => onNavigate('hero')}
            className="flex items-center gap-2 cursor-pointer select-none text-left min-h-[48px] py-1"
            aria-label="Vivah Store Home"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#7FD6E3] to-[#2A8FBD] flex items-center justify-center text-white shadow-sm">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="font-syne font-extrabold text-lg tracking-tight text-[#12324A]">
              {SITE_CONFIG.businessName}
            </span>
          </button>

          {/* Round Green WhatsApp Icon Button on the right */}
          <a
            href={navWaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 min-w-[48px] min-h-[48px] rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-md shadow-emerald-500/25 active:scale-95 transition-transform cursor-pointer border border-white/40 no-underline"
            aria-label="Chat on WhatsApp"
          >
            <MessageCircle className="w-5 h-5 fill-white" />
          </a>
        </div>
      </div>

      {/* ================= DESKTOP TOP BAR (900px & ABOVE) ================= */}
      <header className="hidden lg:block fixed top-4 inset-x-0 z-40 max-w-[1100px] mx-auto px-4">
        <nav
          className="liquid-glass rounded-full px-7 py-3 flex items-center justify-between shadow-xl shadow-[#2A8FBD]/10 border border-white/90"
          aria-label="Desktop navigation"
        >
          {/* Brand Logo on Left */}
          <button
            onClick={() => onNavigate('hero')}
            className="flex items-center gap-2.5 group text-left cursor-pointer min-h-[48px] select-none"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#7FD6E3] to-[#2A8FBD] flex items-center justify-center text-white shadow-md shadow-[#7FD6E3]/40 group-hover:scale-105 transition-transform duration-300">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="font-syne font-extrabold text-xl tracking-tight text-[#12324A] flex items-center gap-1.5">
              {SITE_CONFIG.businessName}
              <span className="w-2 h-2 rounded-full bg-[#7FD6E3] animate-pulse" />
            </span>
          </button>

          {/* Nav Links: Designs, How it works, Why Vivah Store, Questions */}
          <div className="flex items-center gap-7 text-[15px] font-outfit font-semibold text-[#12324A]/80">
            <button
              onClick={() => onNavigate('designs')}
              className={`hover:text-[#2A8FBD] transition-colors relative py-2 min-h-[48px] flex items-center cursor-pointer select-none ${
                activeSection === 'designs' ? 'text-[#2A8FBD] font-bold' : ''
              }`}
            >
              Designs
              {activeSection === 'designs' && (
                <motion.div
                  layoutId="desktop-active-dot"
                  className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#2A8FBD]"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
            </button>

            <button
              onClick={() => onNavigate('why-us')}
              className={`hover:text-[#2A8FBD] transition-colors relative py-2 min-h-[48px] flex items-center cursor-pointer select-none ${
                activeSection === 'why-us' ? 'text-[#2A8FBD] font-bold' : ''
              }`}
            >
              Why Vivah Store
              {activeSection === 'why-us' && (
                <motion.div
                  layoutId="desktop-active-dot"
                  className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#2A8FBD]"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
            </button>

            <button
              onClick={() => onNavigate('how-it-works')}
              className={`hover:text-[#2A8FBD] transition-colors relative py-2 min-h-[48px] flex items-center cursor-pointer select-none ${
                activeSection === 'how-it-works' ? 'text-[#2A8FBD] font-bold' : ''
              }`}
            >
              How it works
              {activeSection === 'how-it-works' && (
                <motion.div
                  layoutId="desktop-active-dot"
                  className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#2A8FBD]"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
            </button>

            <button
              onClick={() => onNavigate('questions')}
              className={`hover:text-[#2A8FBD] transition-colors relative py-2 min-h-[48px] flex items-center cursor-pointer select-none ${
                activeSection === 'questions' ? 'text-[#2A8FBD] font-bold' : ''
              }`}
            >
              Questions
              {activeSection === 'questions' && (
                <motion.div
                  layoutId="desktop-active-dot"
                  className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#2A8FBD]"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
            </button>
          </div>

          {/* Green "Chat on WhatsApp" Pill on Right */}
          <a
            href={navWaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="h-[52px] px-6 rounded-full font-outfit font-semibold text-base text-white bg-[#25D366] hover:bg-[#20bd5a] shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/35 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 no-underline cursor-pointer select-none border border-white/30"
            aria-label="Chat on WhatsApp"
          >
            <MessageCircle className="w-5 h-5 fill-white" />
            <span>Chat on WhatsApp</span>
          </a>
        </nav>
      </header>

      {/* ================= MOBILE FLOATING BOTTOM BAR (HIDDEN ON DESKTOP 900px+) ================= */}
      <aside className="lg:hidden fixed bottom-[max(0.75rem,env(safe-area-inset-bottom))] inset-x-4 z-40 max-w-md mx-auto">
        <nav
          className="liquid-glass rounded-full p-1.5 shadow-2xl shadow-[#2A8FBD]/20 border border-white/95 backdrop-blur-2xl"
          aria-label="Mobile navigation"
        >
          <div className="grid grid-cols-5 relative items-center">
            {mobileNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              const isWa = item.isWhatsApp;

              return (
                <button
                  key={item.id}
                  onClick={() => handleMobileClick(item)}
                  className={`relative flex flex-col items-center justify-center py-2 px-1 rounded-full transition-all duration-300 min-h-[48px] select-none ${
                    isWa
                      ? 'text-[#25D366] font-bold'
                      : isActive
                      ? 'text-[#2A8FBD] font-bold'
                      : 'text-[#12324A]/70 hover:text-[#12324A]'
                  }`}
                  aria-label={item.label}
                >
                  <Icon
                    className={`w-5 h-5 mb-0.5 transition-transform duration-250 ${
                      isActive ? 'scale-110 text-[#2A8FBD]' : ''
                    } ${isWa ? 'fill-[#25D366] text-white scale-105' : ''}`}
                  />
                  <span className="text-[10px] font-outfit leading-tight tracking-tight whitespace-nowrap">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>
      </aside>
    </>
  );
};

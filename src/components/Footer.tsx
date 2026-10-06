/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sparkles, MessageCircle, Instagram } from 'lucide-react';
import { SITE_CONFIG, buildWhatsAppUrl } from '../config/siteConfig.ts';

export const Footer: React.FC = () => {
  const footerMsg = "Hi Vivah Store! I saw your website and want to know more about the app-style wedding invitation.";
  const waUrl = buildWhatsAppUrl(footerMsg);

  return (
    <footer className="relative pt-10 pb-[130px] lg:pb-12 px-5 sm:px-6 z-20 max-w-[1100px] mx-auto w-full box-border">
      <div className="liquid-glass rounded-[32px] p-6 sm:p-8 border border-white/90 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        {/* Brand Name */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#7FD6E3] to-[#2A8FBD] flex items-center justify-center text-white shadow-md shadow-[#7FD6E3]/30">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="font-syne font-extrabold text-2xl tracking-tight text-[#12324A]">
            {SITE_CONFIG.businessName}
          </span>
        </div>

        {/* Links: WhatsApp, Instagram */}
        <div className="flex items-center gap-4">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] text-white font-outfit font-semibold text-sm shadow-md hover:bg-[#20bd5a] transition-all no-underline"
            aria-label="WhatsApp"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>WhatsApp</span>
          </a>

          <a
            href={SITE_CONFIG.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full liquid-glass text-[#12324A] font-outfit font-semibold text-sm shadow-sm hover:bg-white/80 transition-all no-underline border border-white/90"
            aria-label="Instagram"
          >
            <Instagram className="w-4 h-4 text-pink-600" />
            <span>Instagram</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

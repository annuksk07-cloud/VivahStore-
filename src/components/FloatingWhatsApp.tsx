/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { buildWhatsAppUrl } from '../config/siteConfig.ts';

export const FloatingWhatsApp: React.FC = () => {
  const msg = "Hi! I saw your website and want to know more about the app-style wedding invitation.";
  const waUrl = buildWhatsAppUrl(msg);

  return (
    <aside
      className="fixed bottom-[calc(env(safe-area-inset-bottom)+80px)] lg:bottom-8 right-4 lg:right-8 z-50 pointer-events-auto"
      aria-label="Contact us on WhatsApp"
    >
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-2xl shadow-emerald-500/40 hover:scale-105 active:scale-95 transition-all duration-300 no-underline border-2 border-white/50"
        aria-label="Chat on WhatsApp"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366]/40 animate-ping pointer-events-none" />
        <MessageCircle className="w-7 h-7 fill-white relative z-10" />
      </a>
    </aside>
  );
};

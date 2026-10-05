/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface WaveDividerProps {
  flip?: boolean;
  className?: string;
}

export const WaveDivider: React.FC<WaveDividerProps> = ({ flip = false, className = '' }) => {
  return (
    <div
      aria-hidden="true"
      className={`w-full overflow-hidden leading-none select-none pointer-events-none relative z-10 opacity-30 ${
        flip ? 'rotate-180' : ''
      } ${className}`}
    >
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="relative block w-full h-8 sm:h-12 md:h-14 text-white/30"
      >
        <path
          d="M0,0 C150,90 350,-40 500,45 C650,130 900,10 1200,40 L1200,120 L0,120 Z"
          fill="currentColor"
        />
        <path
          d="M0,20 C200,80 400,-10 600,60 C800,130 1000,20 1200,50 L1200,120 L0,120 Z"
          fill="rgba(255, 255, 255, 0.2)"
        />
        {/* Subtle water bubbles */}
        <circle cx="240" cy="50" r="6" fill="rgba(255,255,255,0.4)" />
        <circle cx="580" cy="40" r="4" fill="rgba(255,255,255,0.3)" />
        <circle cx="890" cy="65" r="8" fill="rgba(255,255,255,0.35)" />
      </svg>
    </div>
  );
};

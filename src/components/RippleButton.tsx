/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, MouseEvent } from 'react';

interface Ripple {
  x: number;
  y: number;
  id: number;
}

interface RippleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: 'wa' | 'glass' | 'ghost' | 'ocean';
}

export const RippleButton: React.FC<RippleButtonProps> = ({
  children,
  className = '',
  variant = 'glass',
  onClick,
  ...props
}) => {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handlePointerDown = (e: MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newRipple = { x, y, id: Date.now() + Math.random() };

    setRipples((prev) => [...prev.slice(-3), newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 700);

    if (onClick) {
      onClick(e);
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'wa':
        return 'bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-lg shadow-emerald-500/20 active:scale-[0.98] border border-white/20';
      case 'ocean':
        return 'bg-gradient-to-r from-[#2A8FBD] to-[#12324A] hover:opacity-95 text-white shadow-lg shadow-[#2A8FBD]/20 active:scale-[0.98] border border-white/20';
      case 'glass':
        return 'bg-white/70 hover:bg-white/90 text-[#12324A] backdrop-blur-md border border-white/90 shadow-sm active:scale-[0.98]';
      case 'ghost':
        return 'bg-transparent hover:bg-white/40 text-[#12324A] border border-transparent active:scale-[0.98]';
      default:
        return '';
    }
  };

  return (
    <button
      {...props}
      onPointerDown={handlePointerDown}
      className={`relative overflow-hidden transition-all duration-200 select-none cursor-pointer flex items-center justify-center font-medium ${getVariantStyles()} ${className}`}
    >
      {/* Ripple elements */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute rounded-full pointer-events-none animate-ripple bg-white/40"
          style={{
            left: ripple.x,
            top: ripple.y,
            transform: 'translate(-50%, -50%)',
            width: 140,
            height: 140,
          }}
        />
      ))}
      <span className="relative z-10 flex items-center gap-2 pointer-events-none">
        {children}
      </span>
    </button>
  );
};

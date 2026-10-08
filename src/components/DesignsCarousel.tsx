/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, Droplet, Sparkles, ArrowUpRight, Share2, Copy, Check, X, Plus, Minus, Tag } from 'lucide-react';
import { SITE_CONFIG, getCleanWhatsAppNumber } from '../config/siteConfig.ts';
import { PRICING_CONFIG, PlanDetails } from '../config/pricingConfig.ts';

/* =========================================================================
   DESIGNS SHOWCASE CONFIGURATION
   ========================================================================= */
const LIVE_DESIGNS = [
  {
    no: '01',
    name: 'Aangan Se Mandap',
    live: 'https://angan-ki-duniya.vercel.app/invite',
    mockup: 'https://drive.google.com/file/d/1bMdF3fOqkJDmVCXhNCiQ48n8ctqMSIzE/view?usp=drivesdk',
  },
  {
    no: '02',
    name: 'VEDIKARUDR',
    live: 'https://vedika-rudra.vercel.app/invite',
    mockup: 'https://drive.google.com/file/d/1AmAE2CViEThanERxiPzv6G3AGLZ0VQ8L/view?usp=drivesdk',
  },
  {
    no: '03',
    name: 'Ananya Aarav',
    live: 'https://aarav-ananya-nine.vercel.app/invite',
    mockup: 'https://drive.google.com/file/d/1aD5yY6eejTelCuo6E-rSZoSmGzI0NEpX/view?usp=drivesdk',
  },
  {
    no: '04',
    name: 'Rashmi Vijay',
    live: 'https://rashmika-vijay.vercel.app/invite',
    mockup: 'https://drive.google.com/file/d/1uU51Bg-1O4QC1I8Z41xLjC370c38jwBB/view?usp=drivesdk',
  },
];

const COMING_SOON_DESIGNS = [
  { id: 'cs-1', label: 'Upcoming Theme' },
  { id: 'cs-2', label: 'Upcoming Theme' },
];

function extractDriveId(urlOrId: string): string {
  if (!urlOrId) return '';
  const dMatch = urlOrId.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (dMatch && dMatch[1]) return dMatch[1];
  const idMatch = urlOrId.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (idMatch && idMatch[1]) return idMatch[1];
  return urlOrId.trim();
}

const triggerButtonRipple = (e: React.MouseEvent<HTMLElement>) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const circle = document.createElement('span');
  circle.className = 'absolute rounded-full pointer-events-none animate-ripple bg-white/40';
  circle.style.left = `${x}px`;
  circle.style.top = `${y}px`;
  circle.style.width = '140px';
  circle.style.height = '140px';
  circle.style.transform = 'translate(-50%, -50%)';
  e.currentTarget.appendChild(circle);
  setTimeout(() => circle.remove(), 700);
};

function buildShareText(designName: string, liveUrl: string): string {
  const number = getCleanWhatsAppNumber();
  return `💍 ${designName} by Vivah Store
A wedding invitation that lives on the guest's home screen.
✨ Couple's photo as the app icon
✨ Opens full screen
✨ Date, map, music and RSVP in one tap
👉 See it live: ${liveUrl}
Want one for your wedding? Chat with Vivah Store: https://wa.me/${number}?text=Hi%20Vivah%20Store!%20I%20saw%20${encodeURIComponent(
    designName
  )}%20and%20want%20one%20for%20my%20wedding.`;
}

function buildInlinePanelWhatsAppUrl(
  designName: string,
  plan: PlanDetails,
  extraEvents: number,
  customDomain: boolean,
  rushDelivery: boolean,
  totalPrice: number
): string {
  const number = getCleanWhatsAppNumber();
  const extraEventsTotal = extraEvents * plan.extraEventPrice;
  const totalEvents = plan.includedEvents + extraEvents;

  const extrasList: string[] = [];
  if (extraEvents > 0) {
    extrasList.push(`- Extra events: ${extraEvents} (₹${extraEventsTotal.toLocaleString('en-IN')})`);
  }
  if (customDomain) {
    extrasList.push(`- Custom domain (₹1,500)`);
  }
  if (rushDelivery) {
    extrasList.push(`- Rush delivery (${plan.rushDelivery}) (₹1,000)`);
  }

  const extrasText = extrasList.length > 0 ? extrasList.join('\n') : 'None';
  const deliveryDays = rushDelivery ? plan.rushDelivery : plan.delivery;

  const msg = `Namaste Vivah Store! 🙏
I want to order this design.

*Design:* ${designName}
*Plan:* ${plan.name} (${plan.tagline})
*Events:* ${totalEvents} (${plan.includedEvents} included + ${extraEvents} extra)
*Extras:*
${extrasText}
*Estimated total:* ₹${totalPrice.toLocaleString('en-IN')}
*Delivery:* ${deliveryDays}
*Payment:* To be discussed here on WhatsApp.

*Names:* 
*Wedding date:* 
*Events and dates:* 
*Venue:* 

(Prices are starting estimates. Please confirm the final quote.)`;

  return `https://wa.me/${number}?text=${encodeURIComponent(msg)}`;
}

interface DesktopDesignButtonProps {
  href: string;
  type: 'primary' | 'secondary';
  label: string;
}

const DesktopDesignButton: React.FC<DesktopDesignButtonProps> = ({
  href,
  type,
  label,
}) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const btnRef = useRef<HTMLAnchorElement>(null);

  const isPrimary = type === 'primary';

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const relX = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const relY = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    setOffset({
      x: Math.max(-6, Math.min(6, relX * 6)),
      y: Math.max(-6, Math.min(6, relY * 6)),
    });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setOffset({ x: 0, y: 0 });
  };

  const baseStyle: React.CSSProperties = {
    width: '240px',
    maxWidth: '100%',
    height: '54px',
    padding: '0 9px 0 24px',
    borderRadius: '999px',
    display: 'inline-flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    background: isPrimary
      ? 'linear-gradient(135deg, #2A8FBD, #5BC3E3)'
      : 'linear-gradient(135deg, #25D366, #1FB85A)',
    boxShadow: isPrimary
      ? isHovered
        ? '0 16px 36px rgba(42, 143, 189, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.6)'
        : '0 10px 30px rgba(42, 143, 189, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.5)'
      : isHovered
      ? '0 16px 36px rgba(37, 211, 102, 0.45)'
      : '0 10px 30px rgba(37, 211, 102, 0.35)',
    transform: isHovered
      ? `translate(${offset.x}px, ${offset.y - 3}px)`
      : 'translate(0px, 0px)',
    transition:
      'transform 250ms cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 250ms cubic-bezier(0.2, 0.8, 0.2, 1)',
  };

  return (
    <a
      ref={btnRef}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onPointerDown={triggerButtonRipple}
      style={baseStyle}
      className="group/btn relative overflow-hidden text-white font-outfit font-semibold text-[16px] leading-none select-none cursor-pointer no-underline shrink-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-white focus-visible:shadow-[0_0_0_6px_rgba(127,214,227,0.7)]"
    >
      <span
        aria-hidden="true"
        className="desktop-btn-streak absolute inset-y-0 -left-[60px] w-[50px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none rounded-full"
      />
      <span className="relative z-10 whitespace-nowrap">{label}</span>
      <div
        className={`w-[36px] h-[36px] min-w-[36px] rounded-full flex items-center justify-center transition-all duration-[250ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] relative z-10 shrink-0 ${
          isPrimary
            ? 'bg-white/25 text-white group-hover/btn:bg-white group-hover/btn:text-[#2A8FBD]'
            : 'bg-white/25 text-white group-hover/btn:bg-white group-hover/btn:text-[#25D366]'
        }`}
      >
        {isPrimary ? (
          <ArrowUpRight className="w-4 h-4 stroke-[2.5] transition-transform duration-[250ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover/btn:translate-x-[3px] group-hover/btn:-translate-y-[3px]" />
        ) : (
          <MessageCircle className="w-4 h-4 fill-current transition-transform duration-[250ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]" />
        )}
      </div>
    </a>
  );
};

const TypewriterTitle: React.FC<{ text: string }> = ({ text }) => {
  const [displayed, setDisplayed] = useState('');
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) return;
    let i = 0;
    setDisplayed('');
    const timer = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(timer);
    }, 40);

    return () => clearInterval(timer);
  }, [isInView, text]);

  const titleStyle: React.CSSProperties = {
    fontSize: 'clamp(1.4rem, 2.3vw, 2.2rem)',
    lineHeight: 1.1,
    maxWidth: '100%',
    paddingRight: '12px',
    overflowWrap: 'normal',
    wordBreak: 'keep-all',
    hyphens: 'none',
    textWrap: 'balance',
  };

  return (
    <h3
      ref={containerRef}
      style={titleStyle}
      className="font-syne font-extrabold text-[#12324A] tracking-tight grid grid-cols-1 grid-rows-1"
    >
      <span
        aria-hidden="true"
        className="col-start-1 row-start-1 invisible select-none pointer-events-none"
      >
        {text}
      </span>

      <span className="col-start-1 row-start-1">
        {displayed || (isInView ? '' : text)}
        {isInView && displayed.length < text.length && (
          <span className="inline-block w-1.5 h-[0.85em] bg-[#2A8FBD] ml-1 animate-pulse align-middle" />
        )}
      </span>
    </h3>
  );
};

const DriveMockupImage: React.FC<{
  mockupUrl: string;
  designName: string;
}> = ({ mockupUrl, designName }) => {
  const [srcStep, setSrcStep] = useState<0 | 1 | 2>(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const driveId = extractDriveId(mockupUrl);

  const sources = [
    `https://drive.google.com/thumbnail?id=${driveId}&sz=w1600`,
    `https://lh3.googleusercontent.com/d/${driveId}=w1600`,
  ];

  const handleError = () => {
    if (srcStep === 0) setSrcStep(1);
    else setSrcStep(2);
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-white/40 border border-white/80 shadow-md cursor-pointer group">
      {!isLoaded && srcStep < 2 && (
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#DDF3F8]/50 via-white/80 to-[#DDF3F8]/50 animate-pulse rounded-2xl flex items-center justify-center min-h-[220px]">
          <div className="w-8 h-8 rounded-full border-2 border-[#2A8FBD]/30 border-t-[#2A8FBD] animate-spin" />
        </div>
      )}

      {srcStep < 2 ? (
        <img
          src={sources[srcStep]}
          alt={`${designName} showcase mockup`}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          onError={handleError}
          className={`w-full h-auto object-cover rounded-2xl transition-all duration-500 block ${
            isLoaded ? 'opacity-100 scale-100 group-hover:scale-[1.02]' : 'opacity-0 scale-98 min-h-[240px]'
          }`}
        />
      ) : (
        <div className="w-full min-h-[240px] p-8 liquid-glass flex flex-col items-center justify-center text-center rounded-2xl border border-white">
          <Sparkles className="w-8 h-8 text-[#2A8FBD] mb-2 animate-pulse" />
          <p className="font-syne font-extrabold text-lg text-[#12324A]">{designName}</p>
          <p className="text-xs text-[#2A8FBD] mt-1 font-semibold">Vivah Store App Invitation</p>
        </div>
      )}
    </div>
  );
};

/* =========================================================================
   INLINE CUSTOMISATION PANEL
   ========================================================================= */
interface InlinePanelProps {
  designName: string;
  defaultPlanKey: 'classic' | 'signature';
  onClose: () => void;
  panelId: string;
}

const InlinePanel: React.FC<InlinePanelProps> = ({
  designName,
  defaultPlanKey,
  onClose,
  panelId,
}) => {
  const [selectedPlanKey, setSelectedPlanKey] = useState<'classic' | 'signature'>(defaultPlanKey);
  const [extraEvents, setExtraEvents] = useState<number>(0);
  const [customDomain, setCustomDomain] = useState<boolean>(false);
  const [rushDelivery, setRushDelivery] = useState<boolean>(false);

  const panelRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const activePlan = PRICING_CONFIG.plans[selectedPlanKey];
  const allowSwitch = PRICING_CONFIG.allowPlanSwitch;

  // Esc key listener to close panel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Scroll into view & focus heading on mount
  useEffect(() => {
    if (panelRef.current) {
      panelRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    const timer = setTimeout(() => {
      headingRef.current?.focus();
    }, 250);
    return () => clearTimeout(timer);
  }, []);

  const extraEventPrice = activePlan.extraEventPrice;
  const extraEventsTotal = extraEvents * extraEventPrice;
  const domainCost = customDomain ? PRICING_CONFIG.extras.customDomainPrice : 0;
  const rushCost = rushDelivery ? PRICING_CONFIG.extras.rushDeliveryPrice : 0;

  const totalPrice = activePlan.price + extraEventsTotal + domainCost + rushCost;
  const deliveryDays = rushDelivery ? activePlan.rushDelivery : activePlan.delivery;

  const whatsappUrl = buildInlinePanelWhatsAppUrl(
    designName,
    activePlan,
    extraEvents,
    customDomain,
    rushDelivery,
    totalPrice
  );

  return (
    <motion.div
      ref={panelRef}
      id={panelId}
      tabIndex={-1}
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
      className="w-full col-span-full mt-6 scroll-mt-[90px] focus:outline-none"
    >
      <div className="liquid-glass-accent rounded-[32px] p-5 sm:p-8 border-2 border-[#7FD6E3]/60 shadow-2xl relative overflow-hidden">
        {/* Top Header & Close Button */}
        <div className="flex items-start justify-between gap-4 mb-6 pb-4 border-b border-[#2A8FBD]/15">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h4
                ref={headingRef}
                tabIndex={-1}
                className="font-syne font-extrabold text-xl sm:text-2xl text-[#12324A] focus:outline-none"
              >
                Customise {designName}
              </h4>
              <span className="text-xs font-bold text-[#2A8FBD] bg-[#7FD6E3]/20 px-3 py-1 rounded-full border border-[#7FD6E3]/40">
                {activePlan.name} Plan
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#12324A]/70 font-medium">
              Configure your events, add-ons and delivery options.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/60 hover:bg-white text-[#12324A] flex items-center justify-center shrink-0 border border-white transition-all cursor-pointer min-w-[40px] min-h-[40px]"
            aria-label="Close inline panel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Segmented Control for Plan Switch */}
        {allowSwitch && (
          <div className="mb-6 p-4 rounded-2xl bg-white/50 border border-white/80">
            <label className="text-xs font-bold uppercase tracking-wider text-[#2A8FBD] block mb-2">
              Select Plan
            </label>
            <div className="grid grid-cols-2 gap-2 p-1.5 rounded-2xl bg-white/60 border border-white shadow-inner">
              <button
                type="button"
                onClick={() => setSelectedPlanKey('classic')}
                className={`py-2.5 px-3 rounded-xl font-syne font-extrabold text-xs sm:text-sm transition-all cursor-pointer text-center min-h-[48px] ${
                  selectedPlanKey === 'classic'
                    ? 'bg-gradient-to-r from-[#2A8FBD] to-[#4FB3D9] text-white shadow-md'
                    : 'text-[#12324A]/70 hover:text-[#12324A]'
                }`}
              >
                Classic (₹{PRICING_CONFIG.plans.classic.price.toLocaleString('en-IN')})
              </button>

              <button
                type="button"
                onClick={() => setSelectedPlanKey('signature')}
                className={`py-2.5 px-3 rounded-xl font-syne font-extrabold text-xs sm:text-sm transition-all cursor-pointer text-center min-h-[48px] ${
                  selectedPlanKey === 'signature'
                    ? 'bg-gradient-to-r from-[#2A8FBD] to-[#4FB3D9] text-white shadow-md'
                    : 'text-[#12324A]/70 hover:text-[#12324A]'
                }`}
              >
                Signature (₹{PRICING_CONFIG.plans.signature.price.toLocaleString('en-IN')})
              </button>
            </div>

            <p className="text-xs text-[#2A8FBD] font-semibold mt-2.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span>Want a separate look for every event? Choose Signature.</span>
            </p>
          </div>
        )}

        {/* Panel Main Content: Desktop 2 Columns, Mobile 1 Column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column (8 cols on desktop): What you get & Customise */}
          <div className="lg:col-span-7 space-y-6">
            {/* What You Get Box */}
            <div className="p-5 rounded-2xl bg-white/40 border border-white/80">
              <h5 className="font-syne font-bold text-base text-[#12324A] mb-3">
                What you get in {activePlan.name} Plan
              </h5>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-[#12324A]/85 font-medium">
                {/* Plan Specific Feature */}
                <div className="flex items-start gap-2 col-span-full font-bold text-[#2A8FBD] bg-[#DDF3F8]/80 p-2 rounded-xl border border-white/80">
                  <Check className="w-4 h-4 text-[#2A8FBD] shrink-0 mt-0.5 stroke-[3]" />
                  <span>{PRICING_CONFIG.planSpecificFeatures[selectedPlanKey]}</span>
                </div>

                {/* Common Features */}
                {PRICING_CONFIG.commonFeatures.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#25D366] shrink-0 mt-0.5 stroke-[3]" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Customise Extras Box */}
            <div className="p-5 rounded-2xl bg-white/40 border border-white/80 space-y-4">
              <h5 className="font-syne font-bold text-base text-[#12324A] mb-1">
                Customise
              </h5>

              {/* Extra Events Stepper */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-white/60 border border-white/90">
                <div>
                  <div className="font-outfit font-semibold text-sm sm:text-base text-[#12324A] flex items-center gap-2">
                    <span>Extra events</span>
                    <span className="text-xs font-bold text-[#2A8FBD] bg-[#DDF3F8] px-2 py-0.5 rounded-full">
                      ₹{extraEventPrice} / extra event
                    </span>
                  </div>
                  <div className="text-xs text-[#12324A]/70 font-medium">
                    Add up to 6 extra wedding functions
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  <button
                    type="button"
                    disabled={extraEvents <= 0}
                    onClick={() => setExtraEvents(Math.max(0, extraEvents - 1))}
                    className="w-10 h-10 rounded-full liquid-glass border border-white text-[#12324A] flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white transition-colors cursor-pointer min-w-[40px] min-h-[40px]"
                    aria-label="Decrease extra events"
                  >
                    <Minus className="w-4 h-4 stroke-[2.5]" />
                  </button>

                  <span className="font-syne font-bold text-base text-[#12324A] w-6 text-center">
                    {extraEvents}
                  </span>

                  <button
                    type="button"
                    disabled={extraEvents >= 6}
                    onClick={() => setExtraEvents(Math.min(6, extraEvents + 1))}
                    className="w-10 h-10 rounded-full liquid-glass border border-white text-[#12324A] flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white transition-colors cursor-pointer min-w-[40px] min-h-[40px]"
                    aria-label="Increase extra events"
                  >
                    <Plus className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>
              </div>

              {/* Custom Domain Toggle */}
              <div className="flex items-center justify-between gap-4 p-3.5 rounded-xl bg-white/60 border border-white/90">
                <div className="pr-2">
                  <div className="font-outfit font-semibold text-sm sm:text-base text-[#12324A]">
                    Custom domain (+₹1,500)
                  </div>
                  <div className="text-xs text-[#12324A]/70 font-medium">
                    Your own web address (e.g. couple.com)
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setCustomDomain(!customDomain)}
                  className={`w-14 h-8 rounded-full p-1 transition-colors duration-200 ease-in-out cursor-pointer min-w-[56px] min-h-[48px] flex items-center ${
                    customDomain ? 'bg-[#2A8FBD]' : 'bg-[#12324A]/20'
                  }`}
                  aria-label="Toggle custom domain"
                >
                  <div
                    className={`w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-200 ease-in-out ${
                      customDomain ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Rush Delivery Toggle */}
              <div className="flex items-center justify-between gap-4 p-3.5 rounded-xl bg-white/60 border border-white/90">
                <div className="pr-2">
                  <div className="font-outfit font-semibold text-sm sm:text-base text-[#12324A]">
                    Rush delivery (+₹1,000)
                  </div>
                  <div className="text-xs text-[#12324A]/70 font-medium">
                    Faster delivery: {activePlan.rushDelivery} (normal: {activePlan.delivery})
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setRushDelivery(!rushDelivery)}
                  className={`w-14 h-8 rounded-full p-1 transition-colors duration-200 ease-in-out cursor-pointer min-w-[56px] min-h-[48px] flex items-center ${
                    rushDelivery ? 'bg-[#2A8FBD]' : 'bg-[#12324A]/20'
                  }`}
                  aria-label="Toggle rush delivery"
                >
                  <div
                    className={`w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-200 ease-in-out ${
                      rushDelivery ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols on desktop): Summary Box & WhatsApp CTA */}
          <div className="lg:col-span-5 p-5 rounded-2xl bg-white/70 border border-white shadow-lg space-y-4">
            <h5 className="font-syne font-bold text-base text-[#12324A] pb-2 border-b border-[#2A8FBD]/15">
              Order Summary
            </h5>

            {/* Itemized Lines */}
            <div className="space-y-2 text-xs sm:text-sm text-[#12324A]/80 font-medium">
              <div className="flex justify-between items-center">
                <span>{activePlan.name} Plan Base</span>
                <span className="font-bold">₹{activePlan.price.toLocaleString('en-IN')}</span>
              </div>

              {extraEvents > 0 && (
                <div className="flex justify-between items-center text-[#2A8FBD]">
                  <span>Extra events ({extraEvents} x ₹{extraEventPrice})</span>
                  <span className="font-bold">+₹{extraEventsTotal.toLocaleString('en-IN')}</span>
                </div>
              )}

              {customDomain && (
                <div className="flex justify-between items-center text-[#2A8FBD]">
                  <span>Custom domain</span>
                  <span className="font-bold">+₹1,500</span>
                </div>
              )}

              {rushDelivery && (
                <div className="flex justify-between items-center text-[#2A8FBD]">
                  <span>Rush delivery ({activePlan.rushDelivery})</span>
                  <span className="font-bold">+₹1,000</span>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-[#2A8FBD]/15">
              <div className="text-xs text-[#12324A]/60 font-medium uppercase tracking-wider mb-0.5">
                Estimated Total
              </div>
              <div className="font-syne font-extrabold text-3xl sm:text-4xl text-[#12324A]">
                ₹{totalPrice.toLocaleString('en-IN')}
              </div>
              <div className="text-xs font-semibold text-[#2A8FBD] mt-1">
                Ready in {deliveryDays}
              </div>
            </div>

            <p className="text-[11px] text-[#12324A]/70 font-medium leading-relaxed bg-[#DDF3F8]/60 p-2.5 rounded-xl border border-white/80">
              Starting estimate. We confirm the final quote on WhatsApp. No payment on this website.
            </p>

            {/* Full Width Green Send on WhatsApp Button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="h-[52px] w-full rounded-full font-outfit font-semibold text-base text-white bg-gradient-to-r from-[#25D366] to-[#1FB85A] shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/35 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2.5 no-underline cursor-pointer border border-white/30"
            >
              <MessageCircle className="w-5 h-5 fill-white shrink-0" />
              <span>Send on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* =========================================================================
   DESIGNS CAROUSEL MAIN COMPONENT
   ========================================================================= */
export const DesignsCarousel: React.FC = () => {
  const [activeOpenDesignId, setActiveOpenDesignId] = useState<string | null>(null);
  const [activeShareDesign, setActiveShareDesign] = useState<{
    name: string;
    text: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const togglePanel = (designNo: string) => {
    if (activeOpenDesignId === designNo) {
      setActiveOpenDesignId(null);
    } else {
      setActiveOpenDesignId(designNo);
    }
  };

  const handleShareTap = async (designName: string, liveUrl: string) => {
    const text = buildShareText(designName, liveUrl);

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: `${designName} | Vivah Store`,
          text: text,
        });
        return;
      } catch (err: unknown) {
        if (err instanceof Error && err.name === 'AbortError') {
          return;
        }
      }
    }

    setActiveShareDesign({ name: designName, text: text });
    setCopied(false);
  };

  const handleCopyText = async () => {
    if (!activeShareDesign) return;
    try {
      await navigator.clipboard.writeText(activeShareDesign.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = activeShareDesign.text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section
      id="designs"
      className="relative pt-12 sm:pt-16 pb-[120px] px-5 max-w-[1100px] mx-auto box-border min-w-0"
    >
      {/* ================= SECTION HEADER ================= */}
      <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
        <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#2A8FBD] mb-2">
          <Sparkles className="w-3.5 h-3.5 text-[#7FD6E3]" />
          <span>OUR DESIGNS</span>
        </div>

        <h2
          style={{ fontSize: 'clamp(1.75rem, 7.5vw, 2.5rem)', lineHeight: 1.1 }}
          className="font-syne font-extrabold text-[#12324A] tracking-tight overflow-wrap-break-word"
        >
          See it <span className="text-gradient-aqua">live.</span>
        </h2>

        <p className="mt-2 text-sm sm:text-base text-[#12324A]/80 font-medium">
          Open a design on your own phone. Each one is made with your names, photos and venue.
        </p>
      </div>

      {/* ================= LIVE DESIGNS STACK ================= */}
      <div className="space-y-7 sm:space-y-10 mb-12 sm:mb-16">
        {LIVE_DESIGNS.map((design, index) => {
          const isAlternate = index % 2 === 1;
          const defaultPlanKey = PRICING_CONFIG.designToPlan[design.name] || 'classic';
          const defaultPlan = PRICING_CONFIG.plans[defaultPlanKey];
          const isPanelOpen = activeOpenDesignId === design.no;
          const panelId = `inline-panel-${design.no}`;

          return (
            <React.Fragment key={design.no}>
              <motion.div
                initial={{ opacity: 0, filter: 'blur(8px)', y: 24 }}
                whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className={`liquid-glass rounded-[32px] p-5 sm:p-8 lg:p-[40px] border border-white/90 shadow-xl w-full max-w-[calc(100vw-40px)] lg:max-w-none mx-auto box-border grid grid-cols-1 ${
                  isAlternate
                    ? 'lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)]'
                    : 'lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]'
                } gap-6 sm:gap-8 lg:gap-[40px] items-center`}
              >
                {/* Mockup stage - clicking image toggles panel */}
                <div
                  onClick={() => togglePanel(design.no)}
                  className={`w-full min-w-0 ${
                    isAlternate ? 'order-1 lg:order-2' : 'order-1 lg:order-1'
                  }`}
                >
                  <DriveMockupImage mockupUrl={design.mockup} designName={design.name} />
                </div>

                {/* Text column */}
                <div
                  className={`w-full min-w-0 max-w-full flex flex-col justify-center items-start gap-[16px] ${
                    isAlternate ? 'order-2 lg:order-1' : 'order-2 lg:order-2'
                  }`}
                >
                  <div className="w-full min-w-0">
                    <span className="text-xs font-bold tracking-widest text-[#2A8FBD] uppercase block mb-1">
                      {design.no}
                    </span>
                    <TypewriterTitle text={design.name} />

                    {/* Small Row of 3 Chips */}
                    <div className="flex flex-wrap items-center gap-2 mt-3">
                      {/* Chip 1: Plan Name & Tagline */}
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7FD6E3]/20 text-[#2A8FBD] font-outfit font-bold text-xs border border-[#7FD6E3]/40">
                        <Tag className="w-3 h-3" />
                        <span>{defaultPlan.name} · {defaultPlan.tagline}</span>
                      </span>

                      {/* Chip 2: From Price */}
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/60 text-[#12324A] font-syne font-extrabold text-xs border border-white shadow-2xs">
                        From ₹{defaultPlan.price.toLocaleString('en-IN')}
                      </span>

                      {/* Chip 3: Included Events */}
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#DDF3F8] text-[#12324A]/80 font-outfit font-semibold text-xs border border-white">
                        {defaultPlan.includedEvents} events included
                      </span>
                    </div>
                  </div>

                  {/* ================= MOBILE BUTTONS (< 900px) ================= */}
                  <div className="flex flex-col gap-3 w-full lg:hidden pt-2">
                    <div className="flex items-center gap-2.5 w-full">
                      {/* View Live Website Button */}
                      <a
                        href={design.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        onPointerDown={triggerButtonRipple}
                        className="relative overflow-hidden flex-1 h-[52px] rounded-full font-outfit font-semibold text-base text-white bg-gradient-to-r from-[#2A8FBD] to-[#4FB3D9] shadow-lg shadow-[#2A8FBD]/25 hover:shadow-xl hover:shadow-[#2A8FBD]/35 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-1.5 no-underline cursor-pointer select-none border border-white/30"
                      >
                        <span className="relative z-10 pointer-events-none">View Live Website</span>
                      </a>

                      {/* Share Button beside View Live Website */}
                      <button
                        type="button"
                        onClick={() => handleShareTap(design.name, design.live)}
                        onPointerDown={triggerButtonRipple}
                        aria-label="Share this design"
                        className="w-[48px] h-[48px] min-w-[48px] min-h-[48px] rounded-full bg-white/55 hover:bg-white/80 border border-white/80 shadow-md shadow-[#2A8FBD]/10 hover:shadow-[0_0_20px_rgba(127,214,227,0.6)] flex items-center justify-center text-[#12324A] hover:text-[#2A8FBD] transition-all cursor-pointer shrink-0"
                      >
                        <Share2 className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Get This Design Button -> Opens Inline Panel */}
                    <button
                      type="button"
                      onClick={() => togglePanel(design.no)}
                      onPointerDown={triggerButtonRipple}
                      aria-expanded={isPanelOpen}
                      aria-controls={panelId}
                      className={`relative overflow-hidden w-full h-[52px] rounded-full font-outfit font-semibold text-base transition-all flex items-center justify-center gap-2 cursor-pointer select-none border border-white/30 ${
                        isPanelOpen
                          ? 'bg-[#12324A] text-white shadow-lg'
                          : 'bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-lg shadow-emerald-500/25'
                      }`}
                    >
                      <Sparkles className="w-5 h-5 fill-white relative z-10 pointer-events-none" />
                      <span className="relative z-10 pointer-events-none">
                        {isPanelOpen ? 'Close Panel' : 'Get This Design'}
                      </span>
                    </button>
                  </div>

                  {/* ================= DESKTOP BUTTONS (≥ 900px) ================= */}
                  <div className="hidden lg:flex flex-col min-[1200px]:flex-row min-[1200px]:flex-wrap gap-[12px] w-full items-start pt-2">
                    <div className="flex items-center gap-2.5">
                      <DesktopDesignButton
                        href={design.live}
                        type="primary"
                        label="View Live Website"
                      />

                      {/* Share Button beside View Live Website */}
                      <button
                        type="button"
                        onClick={() => handleShareTap(design.name, design.live)}
                        onPointerDown={triggerButtonRipple}
                        aria-label="Share this design"
                        className="w-[48px] h-[48px] min-w-[48px] min-h-[48px] rounded-full bg-white/55 hover:bg-white/80 border border-white/80 shadow-md shadow-[#2A8FBD]/10 hover:shadow-[0_0_20px_rgba(127,214,227,0.6)] flex items-center justify-center text-[#12324A] hover:text-[#2A8FBD] transition-all cursor-pointer shrink-0"
                      >
                        <Share2 className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Get This Design Desktop Button -> Opens Inline Panel */}
                    <button
                      type="button"
                      onClick={() => togglePanel(design.no)}
                      onPointerDown={triggerButtonRipple}
                      aria-expanded={isPanelOpen}
                      aria-controls={panelId}
                      style={{
                        width: '240px',
                        maxWidth: '100%',
                        height: '54px',
                        padding: '0 9px 0 24px',
                        borderRadius: '999px',
                        display: 'inline-flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        whiteSpace: 'nowrap',
                        background: isPanelOpen
                          ? 'linear-gradient(135deg, #12324A, #1e3c54)'
                          : 'linear-gradient(135deg, #25D366, #1FB85A)',
                        boxShadow: '0 10px 30px rgba(37, 211, 102, 0.35)',
                      }}
                      className="group/btn relative overflow-hidden text-white font-outfit font-semibold text-[16px] select-none cursor-pointer border border-white/30 transition-all shrink-0 active:scale-[0.98]"
                    >
                      <span className="relative z-10 whitespace-nowrap">
                        {isPanelOpen ? 'Close Panel' : 'Get This Design'}
                      </span>
                      <div className="w-[36px] h-[36px] min-w-[36px] rounded-full bg-white/25 text-white flex items-center justify-center relative z-10 shrink-0">
                        <Sparkles className="w-4 h-4 fill-current" />
                      </div>
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* INLINE PANEL (Renders directly below the selected design card) */}
              <AnimatePresence>
                {isPanelOpen && (
                  <InlinePanel
                    key={panelId}
                    panelId={panelId}
                    designName={design.name}
                    defaultPlanKey={defaultPlanKey}
                    onClose={() => setActiveOpenDesignId(null)}
                  />
                )}
              </AnimatePresence>
            </React.Fragment>
          );
        })}
      </div>

      {/* ================= COMING SOON CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 w-full max-w-[calc(100vw-40px)] lg:max-w-none mx-auto">
        {COMING_SOON_DESIGNS.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="liquid-glass rounded-[28px] p-6 text-center border-2 border-dashed border-[#2A8FBD]/35 flex flex-col items-center justify-center min-h-[170px] relative overflow-hidden shadow-sm"
          >
            <div className="w-11 h-11 rounded-full bg-[#DDF3F8] text-[#2A8FBD] flex items-center justify-center mb-2.5 relative">
              <span className="absolute inset-0 rounded-full bg-[#7FD6E3]/40 animate-ping pointer-events-none" />
              <Droplet className="w-5 h-5 fill-[#2A8FBD] relative z-10" />
            </div>

            <span className="text-[11px] font-bold uppercase tracking-wider text-[#2A8FBD]">
              {item.label}
            </span>

            <h4 className="font-syne font-extrabold text-xl text-[#12324A] mt-0.5">
              Coming Soon
            </h4>
          </motion.div>
        ))}
      </div>

      {/* ================= FALLBACK SHARE BOTTOM SHEET MODAL ================= */}
      <AnimatePresence>
        {activeShareDesign && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-[#12324A]/40 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              className="liquid-glass rounded-[32px] p-6 sm:p-8 max-w-md w-full border border-white/90 shadow-2xl relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-[#2A8FBD] font-syne font-bold text-lg">
                  <Share2 className="w-5 h-5" />
                  <span>Share {activeShareDesign.name}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveShareDesign(null)}
                  className="w-8 h-8 rounded-full bg-white/50 hover:bg-white text-[#12324A] flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Close share sheet"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="bg-white/40 p-4 rounded-2xl border border-white/60 mb-6 text-xs text-[#12324A]/80 font-mono whitespace-pre-wrap max-h-36 overflow-y-auto">
                {activeShareDesign.text}
              </div>

              <div className="flex flex-col gap-3">
                {/* Share on WhatsApp */}
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(activeShareDesign.text)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-[52px] w-full rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-outfit font-semibold text-base shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 no-underline border border-white/30"
                >
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span>Share on WhatsApp</span>
                </a>

                {/* Copy Text */}
                <button
                  type="button"
                  onClick={handleCopyText}
                  className="h-[52px] w-full rounded-full liquid-glass hover:bg-white/80 text-[#12324A] font-outfit font-semibold text-base shadow-md flex items-center justify-center gap-2 border border-white/90 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-5 h-5 text-emerald-600" />
                      <span className="text-emerald-700 font-bold">Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-5 h-5 text-[#2A8FBD]" />
                      <span>Copy Text</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

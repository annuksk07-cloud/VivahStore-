/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * =====================================================================
 * VIVAH.LINK - MASTER CONFIGURATION
 * All verified text, phone numbers, and official FACTS.
 * =====================================================================
 */

export interface WeddingDesign {
  id: string;
  no: string;
  name: string;
  live: string;
  desktopId: string;
  mobileId: string;
}

export const DESIGNS: WeddingDesign[] = [
  { id:'aangan-se-mandap', no:'01', name:'Aangan Se Mandap',
    live:'https://angan-ki-duniya.vercel.app/',
    desktopId:'1fuOXWqRKmuO8Gum_WaWxE3OpM4CIb0Au',
    mobileId:'1Yq2L3maQ8JA9-BTffQdSxVgSvb9YKt0H' },
  { id:'vedikarudr', no:'02', name:'VEDIKARUDR',
    live:'https://vedikarudr.netlify.app/',
    desktopId:'1DdEU8EdWFf9QAeFF3ukR-xT5pxQ7i-kf',
    mobileId:'1VWJZmDuTHWrxUuqXWogTS8FXnh4I_xhw' },
  { id:'ananya-aarav', no:'03', name:'Ananya Aarav',
    live:'https://ananyaaaravwed.netlify.app/',
    desktopId:'1gEx5QZR9dE9CQk_-Pf-1ZVFPmMiFb-dO',
    mobileId:'1LhU0ZVwiKJL3V-y_cZoTi8tvnvuehkmM' },
  { id:'rashmi-vijay', no:'04', name:'Rashmi Vijay',
    live:'https://rashmikvijay.netlify.app/',
    desktopId:'1uU51Bg-1O4QC1I8Z41xLjC370c38jwBB',
    mobileId:'1uU51Bg-1O4QC1I8Z41xLjC370c38jwBB' },
];

export const INCLUDED_FEATURES = [
  'RSVP',
  'Background music',
  'Countdown',
  'Google Maps',
  'Photo gallery',
  'Hindi and English',
] as const;

export interface SiteConfig {
  businessName: string;
  brandDomain: string;
  whatsappNumber: string;
  instagramHandle: string;
  instagramUrl: string;
  designs: WeddingDesign[];
}

export const SITE_CONFIG: SiteConfig = {
  businessName: "Vivah.link",
  brandDomain: "vivah.link",
  whatsappNumber: "9876543210",
  instagramHandle: "@vivah.link",
  instagramUrl: "https://instagram.com/vivah.link",
  designs: DESIGNS,
};

export function buildWhatsAppUrl(customMessage?: string): string {
  const number = SITE_CONFIG.whatsappNumber.replace(/\D/g, "");
  const defaultText = "Hi! I saw your website and want to know more about the app-style wedding invitation.";
  const text = customMessage || defaultText;
  return `https://wa.me/91${number}?text=${encodeURIComponent(text)}`;
}

export function getDifferentSectionWhatsAppUrl(): string {
  const number = SITE_CONFIG.whatsappNumber.replace(/\D/g, "");
  const message = "Hi! I like the home-screen app invitation. Can you tell me more?";
  return `https://wa.me/91${number}?text=${encodeURIComponent(message)}`;
}

export function getHowItWorksWhatsAppUrl(): string {
  const number = SITE_CONFIG.whatsappNumber.replace(/\D/g, "");
  const message = "Hi! I want to start my wedding invitation. Names: , Date: , Venue: ";
  return `https://wa.me/91${number}?text=${encodeURIComponent(message)}`;
}

export function getFinalCtaWhatsAppUrl(): string {
  const number = SITE_CONFIG.whatsappNumber.replace(/\D/g, "");
  const message = "Hi! I want an app-style wedding invitation.\nNames: \nDate: \nVenue: \nDesign: ";
  return `https://wa.me/91${number}?text=${encodeURIComponent(message)}`;
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * =====================================================================
 * VIVAH STORE - MASTER CONFIGURATION
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

export interface SiteConfig {
  businessName: string;
  brandDomain: string;
  whatsappNumber: string;
  instagramHandle: string;
  instagramUrl: string;
  designs: WeddingDesign[];
}

export const SITE_CONFIG: SiteConfig = {
  businessName: "Vivah Store",
  brandDomain: "vivahstore.com",
  whatsappNumber: "917827357021",
  instagramHandle: "@vivahstore",
  instagramUrl: "https://instagram.com/vivahstore",
  designs: DESIGNS,
};

export function getCleanWhatsAppNumber(): string {
  let num = SITE_CONFIG.whatsappNumber.replace(/\D/g, "");
  if (!num.startsWith("91") && num.length === 10) {
    num = `91${num}`;
  }
  return num;
}

export function buildWhatsAppUrl(customMessage?: string): string {
  const number = getCleanWhatsAppNumber();
  const defaultText = "Hi Vivah Store! I saw your website and want to know more about the app-style wedding invitation.";
  const text = customMessage || defaultText;
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

export function getHowItWorksWhatsAppUrl(): string {
  const number = getCleanWhatsAppNumber();
  const message = "Hi Vivah Store! I want to start my wedding invitation. Names: , Date: , Venue: ";
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function getFinalCtaWhatsAppUrl(): string {
  const number = getCleanWhatsAppNumber();
  const message = "Hi Vivah Store! I want an app-style wedding invitation.\nNames: \nDate: \nVenue: \nDesign: ";
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

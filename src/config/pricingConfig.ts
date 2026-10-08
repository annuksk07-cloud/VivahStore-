/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface PlanDetails {
  name: string;
  tagline: string;
  price: number;
  includedEvents: number;
  extraEventPrice: number;
  delivery: string;
  rushDelivery: string;
}

export interface PricingConfig {
  plans: {
    classic: PlanDetails;
    signature: PlanDetails;
  };
  commonFeatures: string[];
  planSpecificFeatures: {
    classic: string;
    signature: string;
  };
  extras: {
    customDomainPrice: number;
    rushDeliveryPrice: number;
  };
  designToPlan: Record<string, 'classic' | 'signature'>;
  allowPlanSwitch: boolean;
}

export const PRICING_CONFIG: PricingConfig = {
  plans: {
    classic: {
      name: "Classic",
      tagline: "All events share one look",
      price: 4999,
      includedEvents: 4,
      extraEventPrice: 500,
      delivery: "3 days",
      rushDelivery: "2 days",
    },
    signature: {
      name: "Signature",
      tagline: "Every event gets its own look",
      price: 6499,
      includedEvents: 4,
      extraEventPrice: 900,
      delivery: "5 days",
      rushDelivery: "3 days",
    },
  },
  commonFeatures: [
    "4 events included (Haldi, Mehendi, Sangeet, Wedding)",
    "Google Maps directions",
    "Live countdown",
    "Wedding music",
    "Home-screen app icon with your photo",
    "WhatsApp link preview with your photo",
    "RSVP on WhatsApp",
    "Photo gallery, up to 9 photos",
    "Hindi and English",
  ],
  planSpecificFeatures: {
    classic: "All events share one look",
    signature: "Every event gets its own look",
  },
  extras: {
    customDomainPrice: 1500,
    rushDeliveryPrice: 1000,
  },
  designToPlan: {
    "Aangan Se Mandap": "classic",
    "VEDIKARUDR": "classic",
    "Rashmi Vijay": "classic",
    "Ananya Aarav": "signature",
  },
  allowPlanSwitch: true,
};

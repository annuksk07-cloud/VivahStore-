/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import WaterBackground from './components/WaterBackground.tsx';
import { Navbar } from './components/Navbar.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { QuickStrip } from './components/QuickStrip.tsx';
import { DesignsCarousel } from './components/DesignsCarousel.tsx';
import { WeddingDaySection } from './components/WeddingDaySection.tsx';
import { WhyVivahStoreSection } from './components/WhyVivahStoreSection.tsx';
import { CompareSection } from './components/CompareSection.tsx';
import { TryItSection } from './components/TryItSection.tsx';
import { HowItWorksSection } from './components/HowItWorksSection.tsx';
import { PlansOverviewSection } from './components/PlansOverviewSection.tsx';
import { FaqSection } from './components/FaqSection.tsx';
import { FinalCta } from './components/FinalCta.tsx';
import { Footer } from './components/Footer.tsx';
import { WaveDivider } from './components/WaveDivider.tsx';
import { FloatingWhatsApp } from './components/FloatingWhatsApp.tsx';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');

  // Smooth navigation handler
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const topOffset = sectionId === 'hero' ? 0 : element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
    }
  };

  // Scroll listener to update active navigation tab based on viewport position
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'hero',
        'designs',
        'wedding-day',
        'why-us',
        'compare',
        'try-it',
        'how-it-works',
        'packages',
        'questions',
      ];
      const scrollY = window.scrollY;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop - 180;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenDemoById = () => {
    handleNavigate('designs');
  };

  return (
    <div className="relative min-h-[100dvh] w-full max-w-[100vw] overflow-x-hidden bg-transparent text-[#12324A] flex flex-col selection:bg-[#7FD6E3]/35 pb-[130px]">
      {/* 1. Full-Screen WebGL Water Background */}
      <WaterBackground />

      {/* 2. Navigation */}
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />

      {/* Main Content: Exact Required Order */}
      <main className="relative z-10 flex-1 flex flex-col">
        {/* 1. Hero */}
        <HeroSection onOpenDemo={handleOpenDemoById} />

        {/* 2. Quick strip */}
        <QuickStrip />

        <WaveDivider className="my-2 sm:my-4" />

        {/* 3. Designs */}
        <DesignsCarousel />

        <WaveDivider flip className="my-2 sm:my-4" />

        {/* 4. Wedding day */}
        <WeddingDaySection />

        <WaveDivider className="my-2 sm:my-4" />

        {/* 5. What your guests will notice */}
        <WhyVivahStoreSection />

        <WaveDivider flip className="my-2 sm:my-4" />

        {/* 6. Compare */}
        <CompareSection />

        <WaveDivider className="my-2 sm:my-4" />

        {/* 7. Try it */}
        <TryItSection />

        <WaveDivider flip className="my-2 sm:my-4" />

        {/* 8. How it works */}
        <HowItWorksSection />

        <WaveDivider className="my-2 sm:my-4" />

        {/* 9. Plans */}
        <PlansOverviewSection />

        <WaveDivider flip className="my-2 sm:my-4" />

        {/* 10. FAQ */}
        <FaqSection />

        <WaveDivider flip className="my-2 sm:my-4" />

        {/* 11. Final CTA */}
        <FinalCta />
      </main>

      {/* 12. Footer */}
      <Footer />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp />
    </div>
  );
}

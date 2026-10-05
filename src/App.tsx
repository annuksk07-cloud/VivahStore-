/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import WaterBackground from './components/WaterBackground.tsx';
import { Navbar } from './components/Navbar.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { WhatIsItSection } from './components/WhatIsItSection.tsx';
import { ProblemSection } from './components/ProblemSection.tsx';
import { WhyUsCards } from './components/WhyUsCards.tsx';
import { CompareSection } from './components/CompareSection.tsx';
import { DesignsCarousel } from './components/DesignsCarousel.tsx';
import { HowItWorksSection } from './components/HowItWorksSection.tsx';
import { ImagineSection } from './components/ImagineSection.tsx';
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
      const sections = ['hero', 'why-us', 'designs', 'how-it-works', 'questions'];
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
      {/* 1. Real Full-Screen WebGL Water Canvas Background */}
      <WaterBackground />

      {/* 2. Top and Bottom Floating Navigation */}
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />

      {/* Main Content Sections in Exact Required Order */}
      <main className="relative z-10 flex-1 flex flex-col">
        {/* Section 2: HERO */}
        <HeroSection onOpenDemo={handleOpenDemoById} />

        <WaveDivider className="my-2 sm:my-4" />

        {/* Section 3: "What is it?" */}
        <WhatIsItSection />

        <WaveDivider flip className="my-2 sm:my-4" />

        {/* Section 4: "The problem" (id: why-us) */}
        <ProblemSection />

        {/* Section 5: "What makes us different" */}
        <WhyUsCards />

        <WaveDivider className="my-2 sm:my-4" />

        {/* Section 6: "Compare" */}
        <CompareSection />

        <WaveDivider flip className="my-2 sm:my-4" />

        {/* Section 7: DESIGNS section (id: designs) */}
        <DesignsCarousel />

        <WaveDivider className="my-2 sm:my-4" />

        {/* Section 8: "How it works" (id: how-it-works) */}
        <HowItWorksSection />

        <WaveDivider flip className="my-2 sm:my-4" />

        {/* Section 9: "Imagine" */}
        <ImagineSection />

        <WaveDivider className="my-2 sm:my-4" />

        {/* Section 10: "Questions" (id: questions) */}
        <FaqSection />

        <WaveDivider flip className="my-2 sm:my-4" />

        {/* Section 11: FINAL CTA */}
        <FinalCta />
      </main>

      {/* Section 12: FOOTER */}
      <Footer />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp />
    </div>
  );
}

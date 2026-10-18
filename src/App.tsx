import React, { useState } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import WhyItMattersSection from './components/WhyItMattersSection';
import WhoCanParticipate from './components/WhoCanParticipate';
import TimelineSection from './components/TimelineSection';
import JudgingCriteriaSection from './components/JudgingCriteriaSection';
import Gallery from './components/EventGallery';
import FaqSection from './components/FaqSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import RegistrationModal from './components/RegistrationModal';

function App() {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const openRegisterModal = () => setIsRegisterModalOpen(true);
  const closeRegisterModal = () => setIsRegisterModalOpen(false);

  return (
    <div className="font-sans relative bg-gray-950 text-white min-h-screen overflow-x-hidden selection:bg-pink-500 selection:text-white">
      {/* Global Background Layer: Engineering Dot Grid & Ambient Colored Refraction Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Subtle dot matrix texture */}
        <div className="absolute inset-0 bg-dot-grid opacity-35"></div>

        {/* Ambient luminous glow spheres that bleed through frosted glass cards */}
        <div className="absolute top-[10%] -left-[150px] w-[550px] h-[550px] rounded-full bg-pink-600/20 blur-[130px]"></div>
        <div className="absolute top-[28%] -right-[150px] w-[600px] h-[600px] rounded-full bg-purple-600/20 blur-[140px]"></div>
        <div className="absolute top-[48%] left-[10%] w-[500px] h-[500px] rounded-full bg-pink-500/15 blur-[120px]"></div>
        <div className="absolute top-[68%] right-[5%] w-[550px] h-[550px] rounded-full bg-indigo-600/20 blur-[130px]"></div>
        <div className="absolute top-[88%] left-[20%] w-[600px] h-[600px] rounded-full bg-pink-600/15 blur-[140px]"></div>
      </div>

      <div className="relative z-10">
        {/* Navigation Header */}
        <Header onOpenRegister={openRegisterModal} />

      {/* Hero Section */}
      <HeroSection onOpenRegister={openRegisterModal} />

      {/* About the Summit */}
      <AboutSection />

      {/* The 5 Solution-Focused Tracks */}
      <WhyItMattersSection onOpenRegister={openRegisterModal} />

      {/* Who Can Participate & 4-Step Onboarding */}
      <WhoCanParticipate onOpenRegister={openRegisterModal} />

      {/* 4-Stage Competition Timeline */}
      <TimelineSection onOpenRegister={openRegisterModal} />

      {/* Official 100-Point Scoring Rubric & 8-Min Pitch Rules */}
      <JudgingCriteriaSection onOpenRegister={openRegisterModal} />

      {/* Past Event Highlights */}
      <Gallery />

      {/* Frequently Asked Questions */}
      <FaqSection />

      {/* Contact & Venue Information */}
      <ContactSection onOpenRegister={openRegisterModal} />

      {/* Footer */}
      <Footer onOpenRegister={openRegisterModal} />

      {/* In-App Stateful Registration Modal */}
      <RegistrationModal 
        isOpen={isRegisterModalOpen} 
        onClose={closeRegisterModal} 
      />
      </div>
    </div>
  );
}

export default App;
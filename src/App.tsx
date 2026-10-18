import React, { useState, useEffect } from 'react';
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
import RegistrationPage from './components/RegistrationPage';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'register'>(() => {
    // Check initial URL pathname or hash for direct link sharing (e.g. /register or #register)
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path === '/register' || path === '/register/' || hash === '#register') {
        return 'register';
      }
    }
    return 'home';
  });

  // Handle browser native Back and Forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path === '/register' || path === '/register/' || hash === '#register') {
        setCurrentPage('register');
      } else {
        setCurrentPage('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const openRegisterPage = () => {
    setCurrentPage('register');
    try {
      window.history.pushState({ page: 'register' }, '', '/register');
    } catch {
      window.location.hash = 'register';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const backToHome = () => {
    setCurrentPage('home');
    try {
      window.history.pushState({ page: 'home' }, '', '/');
    } catch {
      window.location.hash = '';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If on the dedicated registration page
  if (currentPage === 'register') {
    return <RegistrationPage onBack={backToHome} />;
  }

  // Main Summit Landing Page
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
        <Header onOpenRegister={openRegisterPage} />

        {/* Hero Section */}
        <HeroSection onOpenRegister={openRegisterPage} />

        {/* About the Summit */}
        <AboutSection />

        {/* The 5 Solution-Focused Tracks */}
        <WhyItMattersSection onOpenRegister={openRegisterPage} />

        {/* Who Can Participate & 4-Step Onboarding */}
        <WhoCanParticipate onOpenRegister={openRegisterPage} />

        {/* 4-Stage Competition Timeline */}
        <TimelineSection onOpenRegister={openRegisterPage} />

        {/* Official 100-Point Scoring Rubric & 8-Min Pitch Rules */}
        <JudgingCriteriaSection onOpenRegister={openRegisterPage} />

        {/* Past Event Highlights */}
        <Gallery />

        {/* Frequently Asked Questions */}
        <FaqSection />

        {/* Contact & Venue Information */}
        <ContactSection onOpenRegister={openRegisterPage} />

        {/* Footer */}
        <Footer onOpenRegister={openRegisterPage} />
      </div>
    </div>
  );
}

export default App;
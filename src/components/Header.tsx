import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { LINKS } from '../config/constants';

interface HeaderProps {
  onOpenRegister?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenRegister }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock background scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  // Requested options only: About, How It Works, Timeline, FAQ, Contact
  const navItems = [
    { label: 'About', id: 'about' },
    { label: 'How It Works', id: 'participate' },
    { label: 'Timeline', id: 'timeline' },
    { label: 'FAQ', id: 'FAQ' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-gray-950/70 backdrop-blur-xl py-3 shadow-2xl border-b border-white/10'
            : 'bg-transparent py-5'
        }`}
      >
        {/* Full width container with edge alignment to push logo left and CTAs right */}
        <div className="w-full px-4 sm:px-6 lg:px-10">
          <div className="flex justify-between items-center">

            {/* Logo - moved closer to the left */}
            <div 
              onClick={() => scrollToSection('hero')} 
              className="flex items-center space-x-3 cursor-pointer group"
            >
              <img
                src="/apwen_logo.png"
                alt="APWEN Logo"
                className="h-10 w-auto transition-transform group-hover:scale-105"
                style={{ maxHeight: 42 }}
              />
              <div className="block">
                <span className="block text-xs sm:text-sm font-orbitron font-bold text-white uppercase tracking-wider">
                  APWEN LASU
                </span>
                <span className="block text-[10px] sm:text-xs text-pink-400 font-ubuntu">
                  Career Summit 2.0
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:block">
              <ul className="flex items-center space-x-8">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className="text-sm font-medium font-orbitron text-gray-300 hover:text-pink-400 transition-colors"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Desktop CTAs - moved closer to the right */}
            <div className="hidden md:flex items-center space-x-4">
              {/* <a
                href={LINKS.pitchGuideDriveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-orbitron text-gray-300 hover:text-white px-3.5 py-2 rounded-lg border border-gray-700 hover:border-pink-500/50 transition-colors flex items-center space-x-1.5"
              >
                <span>Pitch Guide</span>
                <Icon icon="solar:link-circle-bold" className="w-3.5 h-3.5 text-pink-400" />
              </a> */}

              <button
                onClick={onOpenRegister}
                className="bg-pink-500 hover:bg-pink-600 font-orbitron text-white text-xs font-semibold px-5 py-2.5 rounded-full transition-all duration-300 shadow-md hover:shadow-pink-500/25 transform hover:scale-105 flex items-center space-x-1.5"
              >
                <Icon icon="solar:stars-minimalistic-bold" className="w-3.5 h-3.5" />
                <span>Register Team</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl backdrop-blur-md bg-gray-800/60 border border-gray-700 text-white relative z-50"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <Icon icon="solar:close-circle-bold" className="w-6 h-6 text-pink-400" />
              ) : (
                <Icon icon="solar:hamburger-menu-bold" className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Blur Backdrop */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/75 backdrop-blur-xl z-40 lg:hidden flex flex-col justify-center px-6 animate-fade-in-fast"
          onClick={() => setIsMenuOpen(false)}
        >
          <div 
            className="glass-panel rounded-3xl p-6 shadow-2xl max-w-sm mx-auto w-full font-orbitron text-center animate-slide-down"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-center space-x-2 mb-4 pb-3 border-b border-white/10">
              <img src="/apwen_logo.png" alt="APWEN Logo" className="h-8 w-auto" />
              <span className="text-xs text-white font-bold tracking-wider">APWEN LASU 2.0</span>
            </div>

            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className="block w-full py-2.5 text-sm text-gray-200 hover:text-pink-400 transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>

            <div className="pt-6 border-t border-gray-800 mt-4 space-y-3">
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  onOpenRegister?.();
                }}
                className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-xl font-semibold text-xs tracking-wider transition-all flex items-center justify-center space-x-2 shadow-lg shadow-pink-500/20"
              >
                <Icon icon="solar:stars-minimalistic-bold" className="w-4 h-4" />
                <span>Register Team</span>
              </button>

              {/* Pitch Guide CTA (Uncomment when guide is ready)
              <a
                href={LINKS.pitchGuideDriveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full border border-gray-700 hover:border-pink-500 text-gray-300 hover:text-white py-2.5 rounded-xl text-xs transition-colors flex items-center justify-center space-x-1.5 font-ubuntu"
              >
                <span>Pitch Guide (Google Drive)</span>
                <Icon icon="solar:link-circle-bold" className="w-3.5 h-3.5 text-pink-400" />
              </a>
              */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
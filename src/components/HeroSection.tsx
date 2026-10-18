import React, { useEffect, useRef } from 'react';
import NET from 'vanta/dist/vanta.net.min';
import * as THREE from 'three';
import { Icon } from '@iconify/react';
import { EVENT_DETAILS, LINKS } from '../config/constants';

interface HeroSectionProps {
  onOpenRegister?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onOpenRegister }) => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);

  useEffect(() => {
    if (!vantaEffect.current && vantaRef.current) {
      try {
        vantaEffect.current = NET({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0xec4899, // pink-500
          backgroundColor: 0x09090b, // zinc-950
          maxDistance: 20.00,
          spacing: 16.0,
          points: 14.00,
        });
      } catch (e) {
        console.warn('Vanta initialization error:', e);
      }
    }
    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
    };
  }, []);

  return (
    <section id="hero" className="min-h-screen relative overflow-hidden flex items-center pt-24 pb-16">
      {/* Vanta 3D Net Canvas */}
      <div
        ref={vantaRef}
        className="absolute inset-0 w-full h-full z-0"
        style={{ minHeight: '100vh' }}
      />

      {/* Atmospheric gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-950/90 via-gray-950/75 to-transparent z-10 pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-10 relative z-20">
        <div className="flex flex-col md:flex-row items-center justify-between">
          
          {/* Left Column: Clean, Left-Aligned Minimalist Typography */}
          <div className="w-full md:w-3/5 lg:w-1/2 text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in font-orbitron leading-tight">
              Where Ideas Meet <br />
              <span className="bg-gradient-to-r from-pink-400 via-purple-300 to-pink-500 bg-clip-text text-transparent">
                Opportunities
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-200 font-light mb-8 animate-slide-up font-ubuntu leading-relaxed">
              Empower your innovation at the <span className="font-orbitron font-bold text-white">APWEN LASU</span> Career & Innovation Summit 2.0 – Pitch Deck Competition.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={onOpenRegister}
                className="w-full sm:w-auto bg-pink-500 hover:bg-pink-600 text-white px-8 py-3.5 font-orbitron text-xs sm:text-sm rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-pink-500/25 transform hover:scale-105 flex items-center justify-center space-x-2 group"
              >
                <span>Register Team (Free)</span>
                <Icon icon="solar:arrow-right-bold" className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              {/* Pitch Guide CTA (Uncomment when guide is ready)
              <a
                href={LINKS.pitchGuideDriveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-3.5 font-orbitron text-xs sm:text-sm rounded-full font-medium text-gray-200 border border-gray-700 hover:border-pink-500/50 hover:bg-gray-900/80 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Icon icon="solar:file-download-bold" className="w-4 h-4 text-pink-400" />
                <span>Download Pitch Guide</span>
              </a>
              */}
            </div>
          </div>

          {/* Right side left open for breathing room and Vanta interactive 3D particle net */}
          <div className="hidden md:block md:w-2/5 lg:w-1/2"></div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;

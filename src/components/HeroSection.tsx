import React, { useEffect, useRef } from 'react';
import NET from 'vanta/dist/vanta.net.min';
import * as THREE from 'three';

const HeroSection: React.FC = () => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);

  useEffect(() => {
    if (!vantaEffect.current && vantaRef.current) {
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
        // color: new THREE.Color().setRGB(1, 1, 1),
        maxDistance: 20.00,
        spacing: 15.0,
        points: 15.00,
      });
    }
    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
    };
  }, []);

  return (
    <section id="hero" className="min-h-screen relative overflow-hidden flex items-center">
      <div
        ref={vantaRef}
        className="absolute inset-0 w-full h-full z-0"
        style={{ minHeight: '100vh' }}
      />
      {/* <div className="absolute inset-0 bg-[url('/src/assets/hero.jpeg')] bg-cover bg-center opacity-40"></div> */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-purple-300 opacity-70 z-10"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-20">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 animate-fade-in font-orbitron">
              Where Ideas Meet Opportunities <span className="text-pink-500"></span>
            </h1>
            <p className="text-xl md:text-2xl text-white font-light mb-8 animate-slide-up font-ubuntu">
              Empower your innovation at the APWEN LASU Career & Innovation Summit 2025 – Pitch Deck Competition.
              {/* Connect with mentors, ignite ideas, and launch your startup journey in a dynamic fusion of hackathon energy and professional excellence. */}
            </p>

            <div className="space-y-4 md:space-y-0 md:space-x-4 flex flex-col md:flex-row items-center md:items-start">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLScz-Jyc7sjwB_0hiISx-VPT-BrFOZxwjgL-jgV1N6lC3vm7ew/viewform?usp=header"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white hover:bg-gray-100 text-pink-500 px-8 py-3 font-orbitron rounded-full font-medium transition-all duration-300 shadow-lg transform hover:scale-105 hover:shadow-xl hover:glow relative overflow-hidden group"
              >
                <span className="relative z-10">Register</span>
                {/* <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div> */}
              </a>
              {/* <a
                href="https://drive.google.com/drive/folders/1RBu_yvnFR0QdVTZKPMxxtDJUC_XS2Tqd?usp=drive_link" // Update this path to your actual file location
                download
                className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 font-orbitron rounded-full font-medium transition-all duration-300 shadow-lg transform hover:scale-105 hover:shadow-xl ml-0 md:ml-4"
              >
                Download Guide
              </a> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
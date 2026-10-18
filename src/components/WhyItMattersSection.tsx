import React from 'react';
import { Icon } from '@iconify/react';
import { useScrollAnimation } from '../hooks/useScrollAnimations';
import { COMPETITION_TRACKS } from '../config/constants';

const trackSolarIcons: Record<string, string> = {
  "tech-ai": "solar:cpu-bolt-bold",
  "health-life": "solar:heart-pulse-bold",
  "business-finance": "solar:chart-2-bold",
  "energy-climate": "solar:leaf-bold",
  "social-innovation": "solar:users-group-two-rounded-bold",
};

interface WhyItMattersSectionProps {
  onOpenRegister?: () => void;
}

const WhyItMattersSection: React.FC<WhyItMattersSectionProps> = ({ onOpenRegister }) => {
  useScrollAnimation();

  return (
    <section id="tracks" className="py-24 bg-gray-950/60 text-white relative overflow-hidden">
      {/* Ambient background glow orbs for glass refraction */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-purple-600/15 rounded-full blur-[130px] pointer-events-none"></div>
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-pink-600/15 rounded-full blur-[130px] pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-orbitron text-white mb-4 scroll-animate scroll-hidden">
            Five Solution-Focused Tracks
          </h2>
          <div className="w-20 h-1 bg-pink-500 mx-auto mb-6"></div>
          <p className="text-sm md:text-base text-gray-300 max-w-2xl mx-auto font-ubuntu scroll-animate scroll-hidden">
            Open to multidisciplinary teams across LASU and visiting institutions. Choose the track where your innovation makes the greatest impact.
          </p>
        </div>

        {/* Tracks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 scroll-animate scroll-hidden">
          {COMPETITION_TRACKS.map((track, idx) => (
            <div 
              key={track.id} 
              className={`glass-card glass-card-hover rounded-2xl p-6 sm:p-7 hover:-translate-y-1.5 flex flex-col justify-between group relative overflow-hidden ${
                idx === 4 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              {/* Subtle Watermark Icon on the Right Side */}
              <div 
                aria-hidden="true"
                className="absolute -right-5 top-5 w-36 h-36 sm:w-44 sm:h-44 text-white/[0.05] group-hover:text-pink-400/[0.12] transition-all duration-500 pointer-events-none select-none group-hover:scale-105 group-hover:rotate-2"
              >
                <Icon 
                  icon={trackSolarIcons[track.id] || "solar:stars-minimalistic-bold"} 
                  className="w-full h-full" 
                />
              </div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-orbitron font-bold text-gray-400 group-hover:text-pink-400 transition-colors tracking-wider">
                    Track 0{idx + 1}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white mb-2 font-poppins group-hover:text-pink-300 transition-colors">
                  {track.title}
                </h3>

                <p className="text-xs font-semibold text-pink-400/90 font-ubuntu uppercase tracking-wider mb-3">
                  {track.tagline}
                </p>

                <p className="text-xs sm:text-sm text-gray-300 font-ubuntu mb-5 leading-relaxed">
                  {track.description}
                </p>
              </div>

              {/* Subcategories tags */}
              <div className="pt-4 border-t border-white/10 relative z-10">
                <span className="block text-[10px] uppercase tracking-wider font-orbitron text-gray-400 mb-2 font-medium">
                  Sample Areas:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {track.subcategories.map((sub, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-ubuntu bg-white/[0.05] text-gray-300 px-2.5 py-0.5 rounded-md border border-white/10 backdrop-blur-sm"
                    >
                      {sub}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-14 text-center">
          <button
            onClick={onOpenRegister}
            className="inline-flex items-center space-x-2 bg-pink-500 hover:bg-pink-600 text-white px-7 py-3 rounded-full font-orbitron text-xs sm:text-sm font-semibold transition-all shadow-lg hover:shadow-pink-500/25"
          >
            <span>Register in a Track</span>
            <Icon icon="solar:arrow-right-bold" className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};

export default WhyItMattersSection;
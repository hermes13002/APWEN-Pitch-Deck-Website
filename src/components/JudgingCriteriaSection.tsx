import React from 'react';
import { Icon } from '@iconify/react';
import { useScrollAnimation } from '../hooks/useScrollAnimations';
import { JUDGING_RUBRIC, PITCH_ELEMENTS, LINKS } from '../config/constants';

const solarIconMap: Record<string, string> = {
  Target: "solar:target-bold",
  Lightbulb: "solar:lightbulb-bolt-bold",
  Code2: "solar:code-2-bold",
  Users2: "solar:users-group-two-rounded-bold",
  TrendingUp: "solar:chart-2-bold",
  CheckSquare: "solar:checklist-bold",
  Maximize2: "solar:maximize-square-bold",
  Globe: "solar:globus-bold",
  Mic: "solar:microphone-2-bold",
};

interface JudgingCriteriaSectionProps {
  onOpenRegister?: () => void;
}

const JudgingCriteriaSection: React.FC<JudgingCriteriaSectionProps> = ({ onOpenRegister }) => {
  useScrollAnimation();

  // Double the list for infinite continuous loop
  const marqueeItems = [...JUDGING_RUBRIC, ...JUDGING_RUBRIC];

  return (
    <section id="rubric" className="py-24 bg-gray-950 text-white relative overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold font-orbitron text-white mb-4 scroll-animate scroll-hidden">
            Pitch Format & Scoring Rubric
          </h2>
          <div className="w-20 h-1 bg-pink-500 mx-auto mb-6"></div>
          <p className="text-gray-300 font-ubuntu max-w-2xl mx-auto text-sm sm:text-base scroll-animate scroll-hidden">
            Standardized 100-point uniform framework applied across all five tracks. Hover over cards to pause and inspect the criteria.
          </p>
        </div>

        {/* Proportional 8-Minute Time Format Bar */}
        <div className="max-w-3xl mx-auto glass-card rounded-2xl p-5 sm:p-6 mb-12">
          {/* Top Row: Title + Status */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-pink-500/20 border border-pink-500/30 flex items-center justify-center text-pink-400">
                <Icon icon="solar:clock-circle-bold" className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs sm:text-sm font-orbitron font-bold text-white tracking-wide block">
                  8-Minute Total Pitch Session
                </span>
                <span className="text-[11px] text-gray-400 font-ubuntu">
                  Standardized presentation format across all tracks
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2 bg-white/[0.05] border border-white/10 px-3 py-1 rounded-full text-[11px] font-orbitron text-gray-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Strictly Moderated</span>
            </div>
          </div>

          {/* Visual Proportional Split Bar (5m = 62.5%, 3m = 37.5%) */}
          <div className="h-3 w-full bg-gray-900/80 rounded-full overflow-hidden flex p-0.5 border border-white/10 shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-pink-500 to-pink-400 rounded-l-full shadow-[0_0_12px_rgba(236,72,153,0.5)] transition-all"
              style={{ width: '62.5%' }}
            ></div>
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-r-full shadow-[0_0_12px_rgba(168,85,247,0.5)] transition-all ml-0.5"
              style={{ width: '37.5%' }}
            ></div>
          </div>

          {/* Legend / Metrics Below Bar */}
          <div className="grid grid-cols-2 gap-4 mt-3.5 pt-2 border-t border-white/5">
            <div className="text-left">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-pink-400 shrink-0"></span>
                <span className="text-xs font-orbitron font-bold text-pink-300">
                  05:00 Mins (62.5%)
                </span>
              </div>
              <p className="text-[11px] text-gray-400 font-ubuntu mt-0.5 pl-4">
                Slide presentation, solution demo & business model
              </p>
            </div>

            <div className="text-right">
              <div className="flex items-center justify-end space-x-2">
                <span className="text-xs font-orbitron font-bold text-purple-300">
                  03:00 Mins (37.5%)
                </span>
                <span className="w-2 h-2 rounded-full bg-purple-400 shrink-0"></span>
              </div>
              <p className="text-[11px] text-gray-400 font-ubuntu mt-0.5 pr-4">
                Judges' questions, feasibility defense & live scoring
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Auto-sliding Carousel with Left and Right Gradient Fades */}
      <div className="relative w-full overflow-hidden my-6 py-3">
        {/* Ambient glow behind marquee */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-64 bg-pink-600/15 rounded-full blur-[130px] pointer-events-none"></div>

        {/* Left edge fade */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-gray-950 via-gray-950/80 to-transparent z-20"></div>

        {/* Right edge fade */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-gray-950 via-gray-950/80 to-transparent z-20"></div>

        {/* Marquee Track */}
        <div className="animate-marquee flex gap-5 px-4 cursor-grab active:cursor-grabbing relative z-10">
          {marqueeItems.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="w-72 sm:w-80 shrink-0 glass-card glass-card-hover rounded-2xl p-5 sm:p-6 group flex flex-col justify-between relative overflow-hidden"
            >
              {/* Subtle Watermark Icon on the Right */}
              <div 
                aria-hidden="true"
                className="absolute -right-4 top-4 w-32 h-32 sm:w-36 sm:h-36 text-white/[0.04] group-hover:text-pink-400/[0.10] transition-all duration-500 pointer-events-none select-none group-hover:scale-105 group-hover:rotate-2"
              >
                <Icon icon={solarIconMap[item.icon] || "solar:stars-minimalistic-bold"} className="w-full h-full" />
              </div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold font-orbitron bg-pink-500/15 text-pink-400 border border-pink-500/30">
                    {item.weight} Points
                  </span>
                  <span className="text-[10px] font-orbitron font-semibold text-gray-500 group-hover:text-pink-400/80 transition-colors uppercase tracking-wider">
                    Criteria
                  </span>
                </div>

                <h4 className="text-base sm:text-lg font-bold font-poppins text-white mb-2 group-hover:text-pink-300 transition-colors">
                  {item.title}
                </h4>

                <p className="text-xs sm:text-sm text-gray-300 font-ubuntu leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-10 relative z-10 pt-16">
        
        {/* Section Heading: 8 Elements Every Pitch Deck Must Address */}
        <div className="text-center mb-10">
          <h3 className="text-2xl sm:text-4xl font-bold font-orbitron text-white mb-2">
            8 Elements Every Pitch Deck Must Address
          </h3>
          <div className="w-16 h-0.5 bg-pink-500/60 mx-auto mb-3"></div>
          <p className="text-xs sm:text-sm text-gray-400 font-ubuntu max-w-xl mx-auto">
            Organize your 5-minute presentation around these core components:
          </p>
        </div>

        {/* Master Card with Non-Touching Floating Dividers (Architectural Blueprint) */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 md:p-10 relative overflow-hidden max-w-6xl mx-auto mb-14">
          
          {/* Subtle Background Watermark */}
          <div 
            aria-hidden="true"
            className="absolute -right-8 -bottom-8 w-72 h-72 text-white/[0.02] pointer-events-none select-none"
          >
            <Icon icon="solar:presentation-graph-bold" className="w-full h-full" />
          </div>

          {/* Floating Horizontal Inset Divider for Desktop (Does NOT touch left or right edges) */}
          <div 
            aria-hidden="true"
            className="hidden lg:block absolute left-8 right-8 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none z-10"
          ></div>

          {/* Floating Vertical Inset Dividers for Desktop (Do NOT touch top or bottom edges) */}
          <div 
            aria-hidden="true"
            className="hidden lg:block absolute left-[25%] top-8 bottom-8 w-px bg-gradient-to-b from-transparent via-white/15 to-transparent pointer-events-none z-10"
          ></div>
          <div 
            aria-hidden="true"
            className="hidden lg:block absolute left-[50%] top-8 bottom-8 w-px bg-gradient-to-b from-transparent via-white/15 to-transparent pointer-events-none z-10"
          ></div>
          <div 
            aria-hidden="true"
            className="hidden lg:block absolute left-[75%] top-8 bottom-8 w-px bg-gradient-to-b from-transparent via-white/15 to-transparent pointer-events-none z-10"
          ></div>

          {/* Floating Inset Divider for Tablet (sm: 2 columns) */}
          <div 
            aria-hidden="true"
            className="hidden sm:block lg:hidden absolute left-1/2 top-8 bottom-8 w-px bg-gradient-to-b from-transparent via-white/15 to-transparent pointer-events-none z-10"
          ></div>

          {/* Grid of 8 Elements (No redundant "ELEMENT" text) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-6 sm:gap-y-8 gap-x-6 relative z-20">
            {PITCH_ELEMENTS.map((elem) => (
              <div 
                key={elem.step}
                className="p-3 sm:p-4 rounded-xl transition-all duration-300 hover:bg-white/[0.04] group flex flex-col justify-between"
              >
                <div>
                  <span className="inline-block text-xs font-orbitron font-bold text-pink-400 bg-pink-500/10 border border-pink-500/25 px-2.5 py-0.5 rounded mb-3 group-hover:bg-pink-500/20 group-hover:text-pink-300 transition-colors">
                    0{elem.step}
                  </span>
                  <h5 className="font-bold text-white text-base sm:text-lg font-poppins mb-2 group-hover:text-pink-300 transition-colors">
                    {elem.name}
                  </h5>
                  <p className="text-xs sm:text-sm text-gray-300 font-ubuntu leading-relaxed">
                    {elem.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Clean, Refined Action Row */}
        <div className="text-center flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Pitch Guide CTA (Uncomment when guide is ready)
          <a
            href={LINKS.pitchGuideDriveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-pink-500 hover:bg-pink-600 text-white px-7 py-3 rounded-full font-orbitron text-xs sm:text-sm font-semibold transition-all shadow-lg hover:shadow-pink-500/25"
          >
            <Icon icon="solar:file-download-bold" className="w-4 h-4" />
            <span>Download Pitch Guide & Rubric</span>
          </a>
          */}

          <button
            onClick={onOpenRegister}
            className="inline-flex items-center space-x-2 bg-pink-500 hover:bg-pink-600 text-white px-8 py-3.5 rounded-full font-orbitron text-xs sm:text-sm font-semibold transition-all shadow-lg hover:shadow-pink-500/25"
          >
            <span>Register Your Team</span>
            <Icon icon="solar:arrow-right-bold" className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};

export default JudgingCriteriaSection;

import React from 'react';
import { Icon } from '@iconify/react';
import { useScrollAnimation } from '../hooks/useScrollAnimations';
import { LINKS } from '../config/constants';

interface WhoCanParticipateProps {
  onOpenRegister?: () => void;
}

const WhoCanParticipate: React.FC<WhoCanParticipateProps> = ({ onOpenRegister }) => {
  useScrollAnimation();

  const steps = [
    {
      step: "01",
      iconName: "solar:plain-bold",
      title: "Register Team & Idea",
      deadline: "Oct 19 – Nov 6",
      description: "Submit team details (2–4 undergraduate students) and a brief concept summary. No completed deck required to get started."
    },
    {
      step: "02",
      iconName: "solar:chat-round-dots-bold",
      title: "Join WhatsApp Cohort",
      deadline: "Immediate access",
      description: "Get invited directly to the official participant cohort. Access pitch templates, rubrics, check-in announcements, and peer support."
    },
    {
      step: "03",
      iconName: "solar:file-check-bold",
      title: "Submit 5-Min Deck",
      deadline: "By Nov 6, 11:59 PM",
      description: "Polish your 8-element slide deck addressing problem, solution, tech, and feasibility, then upload your link inside the cohort."
    },
    {
      step: "04",
      iconName: "solar:cup-first-bold",
      title: "Compete & Pitch",
      deadline: "Nov 13 & Nov 27",
      description: "Advance through virtual pre-finals (Nov 13) to pitch live at the Grand Finale at LASU Epe Campus on Friday, Nov 27."
    }
  ];

  return (
    <section 
      id="participate" 
      className="relative py-24 bg-cover bg-center overflow-hidden" 
      style={{ backgroundImage: "url('/whocanparticipate_bg.jpg')" }}
    >
      {/* Dark frosted overlay */}
      <div className="absolute inset-0 bg-gray-950/80 backdrop-blur-[2px]"></div>

      {/* Ambient background glow orbs for glass refraction */}
      <div className="absolute top-1/4 -right-24 w-96 h-96 bg-pink-500/15 rounded-full blur-[130px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 -left-24 w-96 h-96 bg-purple-500/15 rounded-full blur-[130px] pointer-events-none"></div>

      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-gray-950 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-950 to-transparent z-10 pointer-events-none"></div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-10 z-20">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-orbitron text-white mb-4 scroll-animate scroll-hidden">
            Who Can Participate
          </h2>
          <div className="w-20 h-1 bg-pink-500 mx-auto mb-6"></div>
          <p className="text-sm md:text-base text-gray-300 max-w-2xl mx-auto font-ubuntu scroll-animate scroll-hidden">
            Open to all undergraduate innovators across LASU and visiting collegiate sister chapters from any academic department.
          </p>
        </div>

        {/* 2-Column Balanced Eligibility & Rules Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-20 scroll-animate scroll-hidden">
          
          {/* Card 1: Institutional & Academic Eligibility */}
          <div className="glass-card glass-card-hover rounded-2xl p-6 sm:p-8 flex flex-col justify-between group relative overflow-hidden">
            {/* Subtle Watermark Icon */}
            <div 
              aria-hidden="true"
              className="absolute -right-5 top-5 w-36 h-36 sm:w-44 sm:h-44 text-white/[0.04] group-hover:text-pink-400/[0.10] transition-all duration-500 pointer-events-none select-none group-hover:scale-105 group-hover:rotate-2"
            >
              <Icon icon="solar:diploma-bold" className="w-full h-full" />
            </div>

            <div className="relative z-10">
              <span className="text-xs font-orbitron font-bold text-gray-400 group-hover:text-pink-400 transition-colors tracking-wider block mb-3">
                Eligibility 01
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 font-poppins group-hover:text-pink-300 transition-colors">
                Cross-Campus & Interdisciplinary
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 font-ubuntu leading-relaxed mb-6">
                Open to all passionate undergraduate students from <strong className="text-white">Lagos State University (LASU)</strong> as well as students from visiting tertiary institutions and collegiate sister chapters (including <strong className="text-pink-300">APWEN UNILAG</strong>, <strong className="text-pink-300">APWEN Covenant</strong>, and others) from any faculty or academic department.
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 relative z-10 flex flex-wrap gap-2">
              <span className="text-[11px] font-ubuntu bg-white/[0.05] text-gray-300 px-3 py-1 rounded-md border border-white/10">
                LASU All Campuses
              </span>
              <span className="text-[11px] font-ubuntu bg-white/[0.05] text-pink-300 px-3 py-1 rounded-md border border-pink-500/20">
                Sister Collegiate Chapters
              </span>
              <span className="text-[11px] font-ubuntu bg-white/[0.05] text-gray-300 px-3 py-1 rounded-md border border-white/10">
                Any Department
              </span>
            </div>
          </div>

          {/* Card 2: Team Composition & Gender Representation */}
          <div className="glass-card glass-card-hover rounded-2xl p-6 sm:p-8 flex flex-col justify-between group relative overflow-hidden">
            {/* Subtle Watermark Icon */}
            <div 
              aria-hidden="true"
              className="absolute -right-5 top-5 w-36 h-36 sm:w-44 sm:h-44 text-white/[0.04] group-hover:text-pink-400/[0.10] transition-all duration-500 pointer-events-none select-none group-hover:scale-105 group-hover:rotate-2"
            >
              <Icon icon="solar:users-group-two-rounded-bold" className="w-full h-full" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-orbitron font-bold text-gray-400 group-hover:text-pink-400 transition-colors tracking-wider">
                  Eligibility 02
                </span>
                <span className="text-xs font-orbitron font-bold text-pink-400 bg-pink-500/10 border border-pink-500/20 px-2.5 py-0.5 rounded-full">
                  2 to 4 Members
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 font-poppins group-hover:text-pink-300 transition-colors">
                Team Structure & Gender Balance
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 font-ubuntu leading-relaxed mb-6">
                Teams must consist of <strong>2 to 4 undergraduate students</strong>. As an APWEN initiative championing women in STEM, <strong>every team must have female representation</strong> (no all-male teams permitted). Male students are warmly welcomed and encouraged to partner as co-founders and team members.
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 relative z-10 flex flex-wrap gap-2">
              <span className="text-[11px] font-ubuntu bg-pink-500/10 text-pink-300 px-3 py-1 rounded-md border border-pink-500/30 font-medium">
                Female Representation Required
              </span>
              <span className="text-[11px] font-ubuntu bg-white/[0.05] text-gray-300 px-3 py-1 rounded-md border border-white/10">
                2–4 Students / Team
              </span>
              <span className="text-[11px] font-ubuntu bg-white/[0.05] text-gray-300 px-3 py-1 rounded-md border border-white/10">
                Male Allies Welcome
              </span>
            </div>
          </div>

        </div>

        {/* Sub-Header: How It Works Journey */}
        <div className="text-center mb-12 scroll-animate scroll-hidden">
          <h3 className="text-2xl sm:text-4xl font-bold font-orbitron text-white mb-3">
            How It Works: 4-Step Registration Journey
          </h3>
          <div className="w-16 h-0.5 bg-pink-500/60 mx-auto mb-4"></div>
          <p className="text-xs sm:text-sm text-gray-400 font-ubuntu max-w-xl mx-auto">
            100% Free • Simple 3-minute entry • No completed deck needed to start
          </p>
        </div>

        {/* 4 Steps Grid with Subtle Watermarks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14 scroll-animate scroll-hidden">
          {steps.map((item) => (
            <div 
              key={item.step} 
              className="glass-card glass-card-hover rounded-2xl p-6 sm:p-7 hover:-translate-y-1.5 flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Subtle Watermark Icon on the Right */}
              <div 
                aria-hidden="true"
                className="absolute -right-4 top-4 w-32 h-32 sm:w-36 sm:h-36 text-white/[0.05] group-hover:text-pink-400/[0.12] transition-all duration-500 pointer-events-none select-none group-hover:scale-105 group-hover:rotate-2"
              >
                <Icon icon={item.iconName} className="w-full h-full" />
              </div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-orbitron font-bold text-gray-400 group-hover:text-pink-400 transition-colors tracking-wider">
                    Step {item.step}
                  </span>
                  <span className="text-[10px] font-orbitron text-pink-400 bg-pink-500/10 border border-pink-500/20 px-2 py-0.5 rounded-full">
                    {item.deadline}
                  </span>
                </div>

                <h4 className="font-bold text-base sm:text-lg text-white mb-2 font-poppins group-hover:text-pink-300 transition-colors">
                  {item.title}
                </h4>

                <p className="text-gray-300 text-xs sm:text-sm font-ubuntu leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Clean, Refined Action Row */}
        <div className="text-center flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenRegister}
            className="inline-flex items-center space-x-2 bg-pink-500 hover:bg-pink-600 text-white px-7 py-3 rounded-full font-orbitron text-xs sm:text-sm font-semibold transition-all shadow-lg hover:shadow-pink-500/25"
          >
            <span>Register Team (Free)</span>
            <Icon icon="solar:arrow-right-bold" className="w-4 h-4" />
          </button>

          {/* Pitch Guide CTA (Uncomment when guide is ready)
          <a
            href={LINKS.pitchGuideDriveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1.5 px-6 py-3 rounded-full border border-gray-700 hover:border-pink-500/50 text-gray-300 hover:text-white font-orbitron text-xs sm:text-sm transition-colors"
          >
            <Icon icon="solar:file-download-bold" className="w-4 h-4 text-pink-400" />
            <span>Download Pitch Guide</span>
          </a>
          */}
        </div>

      </div>
    </section>
  );
};

export default WhoCanParticipate;
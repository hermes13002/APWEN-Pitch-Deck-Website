import React, { useState, useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';

const AboutSection: React.FC = () => {
  const [topInView, setTopInView] = useState(false);
  const [pillarsInView, setPillarsInView] = useState(false);

  const cardsRef = useRef<HTMLDivElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cardsObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTopInView(true);
          cardsObserver.disconnect();
        }
      },
      { 
        threshold: 0.2,
        // Negative rootMargin ensures the animation does NOT start until cards are 140px inside the visible viewport
        rootMargin: "0px 0px -140px 0px"
      }
    );

    const pillarsObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPillarsInView(true);
          pillarsObserver.disconnect();
        }
      },
      { 
        threshold: 0.2,
        rootMargin: "0px 0px -120px 0px"
      }
    );

    if (cardsRef.current) cardsObserver.observe(cardsRef.current);
    if (pillarsRef.current) pillarsObserver.observe(pillarsRef.current);

    return () => {
      cardsObserver.disconnect();
      pillarsObserver.disconnect();
    };
  }, []);

  const pillars = [
    { 
      icon: "solar:lightbulb-bolt-bold", 
      color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
      title: 'Practical Problem-Solving', 
      tag: 'Pillar 01',
      description: "Moving beyond textbook theory into working prototypes. Students tackle everyday challenges in energy, software, agriculture, and healthcare." 
    },
    { 
      icon: "solar:users-group-two-rounded-bold", 
      color: "text-pink-400 bg-pink-500/10 border-pink-500/20",
      title: 'Inter-Collegiate Sisterhood', 
      tag: 'Pillar 02',
      description: "Uniting LASU with visiting collegiate sister chapters (such as APWEN UNILAG and APWEN Covenant) to foster cross-campus collaboration." 
    },
    { 
      icon: "solar:cup-first-bold", 
      color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
      title: 'Student Leadership & Pitching', 
      tag: 'Pillar 03',
      description: "A student-organized arena for practicing technical communication, defense under questions, and building poise in public presentation." 
    },
  ];

  return (
    <section id="about" className="py-24 bg-cover bg-center relative overflow-hidden" style={{ backgroundImage: "url('/about_bg.jpg')" }}>
      {/* Dark frosted overlay allowing underlying textures to refract */}
      <div className="absolute inset-0 bg-gray-950/80 backdrop-blur-[2px]"></div>

      {/* Local Ambient Glow Orbs for Glass Refraction */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-pink-500/15 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute top-1/3 -right-20 w-96 h-96 bg-purple-500/15 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 w-[700px] h-72 bg-pink-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-gray-950 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-950 to-transparent z-10 pointer-events-none"></div>
      
      {/* Outer container pushing left/right cards near edges on wide viewports */}
      <div className="relative w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14 z-20">

        {/* Section Header */}
        <div className={`text-center mb-16 sm:mb-20 transition-all duration-700 ease-out ${
          topInView ? 'opacity-100 translate-y-0' : 'opacity-80 translate-y-2'
        }`}>
          <h2 className="text-3xl sm:text-5xl font-bold font-orbitron text-white mb-3">
            About APWEN & The Summit
          </h2>
          <div className="w-20 h-1 bg-pink-500 mx-auto mb-4"></div>
          <p className="text-sm sm:text-base text-gray-300 font-ubuntu max-w-2xl mx-auto">
            A student-led movement championing female excellence, peer mentorship, and practical engineering solutions across universities.
          </p>
        </div>

        {/* Top Section: Left and Right Cards Pushed Near the Edges (Observed directly) */}
        <div ref={cardsRef} className="relative flex flex-col md:flex-row justify-between items-start gap-8 lg:gap-12 mb-24 lg:mb-32">
          
          {/* Card 1: About APWEN & APWEN LASU (Slides in smoothly from the Left) */}
          <div 
            className={`w-full md:w-[48%] lg:w-[44%] xl:w-[42%] transform transition-all duration-800 ease-out ${
              topInView 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 -translate-x-12 sm:-translate-x-16 pointer-events-none'
            }`}
            style={{ transitionDelay: topInView ? '150ms' : '0ms' }}
          >
            <div className="glass-card glass-card-hover rounded-3xl p-7 sm:p-9 hover:-translate-y-1 group">
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-2xl bg-gray-800/80 border border-gray-700/80 flex items-center justify-center text-pink-400 group-hover:scale-105 transition-transform">
                  <Icon icon="solar:shield-check-bold" className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-orbitron font-bold text-gray-400 bg-gray-800/80 px-3 py-1 rounded-full border border-gray-700/80">
                  The Chapter
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 font-orbitron group-hover:text-pink-300 transition-colors">
                APWEN & APWEN LASU
              </h3>
              <div className="w-12 h-1 bg-pink-500 mb-4"></div>

              <p className="text-xs sm:text-sm text-gray-300 font-ubuntu leading-relaxed mb-3">
                The <strong className="text-white">Association of Professional Women Engineers of Nigeria (APWEN)</strong> is a national non-profit division of the Nigerian Society of Engineers (NSE), committed to empowering female engineers and inspiring young girls into STEM careers.
              </p>

              <p className="text-xs sm:text-sm text-gray-300 font-ubuntu leading-relaxed">
                At the collegiate level, the <strong className="text-pink-300">APWEN LASU Chapter</strong> is driven entirely by undergraduate student executives at Lagos State University, Epe Campus. Through workshops, mentorship sessions, and study cohorts, the chapter creates a supportive community where female engineering students build hands-on technical skills and leadership.
              </p>

              <div className="mt-6 pt-4 border-t border-gray-800/80 flex items-center text-xs text-gray-400 font-ubuntu">
                <Icon icon="solar:map-point-bold" className="w-4 h-4 mr-1 text-pink-400 shrink-0" />
                <span>Collegiate Chapter • LASU Epe Campus</span>
              </div>
            </div>
          </div>

          {/* Curved dashed connector with progressive path reveal (desktop only) */}
          <div className="hidden lg:flex absolute left-[42%] right-[42%] top-20 bottom-12 items-center justify-center pointer-events-none">
            <svg className="w-full h-36 overflow-visible" viewBox="0 0 160 100" fill="none" preserveAspectRatio="none">
              <defs>
                {/* Progressive reveal mask: strokeDashoffset moves from 100 to 0 */}
                <mask id="about-dash-connector-mask">
                  <path 
                    d="M 10 20 C 80 20, 80 80, 150 80" 
                    stroke="white" 
                    strokeWidth="6" 
                    fill="none"
                    pathLength="100"
                    strokeDasharray="100"
                    style={{
                      strokeDashoffset: topInView ? 0 : 100,
                      transition: 'stroke-dashoffset 1100ms cubic-bezier(0.4, 0, 0.2, 1) 450ms'
                    }}
                  />
                </mask>
              </defs>

              {/* The dashed pink path revealed from start to finish */}
              <path 
                d="M 10 20 C 80 20, 80 80, 150 80" 
                stroke="rgba(236, 72, 153, 0.45)" 
                strokeWidth="2.5" 
                strokeDasharray="6 6" 
                mask="url(#about-dash-connector-mask)"
              />

              {/* Start Node Pulse Circle at Left Card */}
              <circle 
                cx="10" 
                cy="20" 
                r="3.5" 
                fill="#ec4899" 
                className={`transition-all duration-500 ease-out ${
                  topInView ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                }`}
                style={{ 
                  transitionDelay: '350ms',
                  transformOrigin: '10px 20px',
                  filter: 'drop-shadow(0 0 6px rgba(236, 72, 153, 0.9))'
                }}
              />

              {/* End Node Pulse Circle at Right Card */}
              <circle 
                cx="150" 
                cy="80" 
                r="3.5" 
                fill="#ec4899" 
                className={`transition-all duration-500 ease-out ${
                  topInView ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                }`}
                style={{ 
                  transitionDelay: '1500ms',
                  transformOrigin: '150px 80px',
                  filter: 'drop-shadow(0 0 6px rgba(236, 72, 153, 0.9))'
                }}
              />
            </svg>
          </div>

          {/* Card 2: About Career Summit 2.0 (Slides in from the Right as the line arrives) */}
          <div 
            className={`w-full md:w-[48%] lg:w-[44%] xl:w-[42%] md:mt-20 lg:mt-28 transform transition-all duration-800 ease-out ${
              topInView 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-12 sm:translate-x-16 pointer-events-none'
            }`}
            style={{ transitionDelay: topInView ? '1450ms' : '0ms' }}
          >
              <div className="glass-card glass-card-hover rounded-3xl p-7 sm:p-9 hover:-translate-y-1 group">
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-gray-800/80 border border-gray-700/80 flex items-center justify-center text-pink-400 group-hover:scale-105 transition-transform">
                    <Icon icon="solar:cup-first-bold" className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-orbitron font-bold text-gray-400 bg-gray-800/80 px-3 py-1 rounded-full border border-gray-700/80">
                    The Event
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 font-orbitron group-hover:text-pink-300 transition-colors">
                  About Career Summit 2.0
                </h3>
                <div className="w-12 h-1 bg-pink-500 mb-4"></div>

                <p className="text-xs sm:text-sm text-gray-300 font-ubuntu leading-relaxed mb-3">
                  <strong className="text-white">Career Summit 2.0</strong> is our flagship student-organized innovation platform and pitch competition. It bridges the gap between academic engineering theory and real-world execution.
                </p>

                <p className="text-xs sm:text-sm text-gray-300 font-ubuntu leading-relaxed">
                  The summit welcomes ambitious undergraduate innovators from LASU alongside invited peers from collegiate sister chapters across Nigerian tertiary institutions (such as <strong className="text-pink-300">APWEN UNILAG</strong>, <strong className="text-pink-300">APWEN Covenant</strong>, and others) to present actionable solutions, exchange peer feedback, and celebrate student ingenuity.
                </p>

                <div className="mt-6 pt-4 border-t border-gray-800/80 flex items-center text-xs text-gray-400 font-ubuntu">
                  <Icon icon="solar:calendar-date-bold" className="w-4 h-4 mr-1 text-pink-400 shrink-0" />
                  <span>Grand Finale • Friday, 27 November 2026</span>
                </div>
              </div>
            </div>

          </div>

        {/* Bottom Section: Three Cards Centered Horizontally with Descending Staircase Cascade & Generous Spacing */}
        <div ref={pillarsRef} className="max-w-6xl xl:max-w-7xl mx-auto pt-10 pb-28 lg:pb-36 px-2 sm:px-4">
          
          <div className={`text-center mb-14 transition-all duration-700 ease-out ${
            pillarsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <span className="text-xs font-orbitron uppercase text-pink-400 font-bold tracking-wider">
              Core Pillars of the Summit
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-orbitron mt-1">
              What We Foster
            </h3>
            <div className="w-12 h-1 bg-pink-500 mx-auto mt-2"></div>
          </div>

          {/* 3 Descending Cards with increased gap between them */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 lg:gap-12 xl:gap-14 items-start">
            
            {/* Card 1 - Highest (Stagger 1: Arrives first from below) */}
            <div 
              className={`transform transition-all duration-700 ease-out ${
                pillarsInView 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-16 pointer-events-none'
              }`}
              style={{ transitionDelay: pillarsInView ? '100ms' : '0ms' }}
            >
              <div className="md:translate-y-0 transition-all duration-300 hover:-translate-y-2 group">
                <div className="glass-card glass-card-hover rounded-3xl p-6 sm:p-7 flex flex-col justify-between min-h-[290px]">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-11 h-11 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-400 group-hover:scale-105 transition-transform">
                        <Icon icon={pillars[0].icon} className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-orbitron font-bold text-yellow-400/80 bg-yellow-500/10 px-2.5 py-0.5 rounded-full border border-yellow-500/20">
                        {pillars[0].tag}
                      </span>
                    </div>

                    <h4 className="text-base sm:text-lg font-bold text-white font-poppins mb-2 group-hover:text-pink-300 transition-colors">
                      {pillars[0].title}
                    </h4>

                    <p className="text-xs sm:text-sm text-gray-300 font-ubuntu leading-relaxed">
                      {pillars[0].description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-800/80 flex items-center text-[11px] text-gray-500 font-ubuntu">
                    <span>Theory to Execution</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 - Lower than Card 1 (Stagger 2: Arrives second from below) */}
            <div 
              className={`transform transition-all duration-700 ease-out ${
                pillarsInView 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-20 pointer-events-none'
              }`}
              style={{ transitionDelay: pillarsInView ? '250ms' : '0ms' }}
            >
              <div className="md:translate-y-10 lg:translate-y-14 transition-all duration-300 hover:translate-y-8 lg:hover:translate-y-12 group">
                <div className="glass-card glass-card-hover rounded-3xl p-6 sm:p-7 flex flex-col justify-between min-h-[290px]">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-11 h-11 rounded-2xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 group-hover:scale-105 transition-transform">
                        <Icon icon={pillars[1].icon} className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-orbitron font-bold text-pink-400/80 bg-pink-500/10 px-2.5 py-0.5 rounded-full border border-pink-500/20">
                        {pillars[1].tag}
                      </span>
                    </div>

                    <h4 className="text-base sm:text-lg font-bold text-white font-poppins mb-2 group-hover:text-pink-300 transition-colors">
                      {pillars[1].title}
                    </h4>

                    <p className="text-xs sm:text-sm text-gray-300 font-ubuntu leading-relaxed">
                      {pillars[1].description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-800/80 flex items-center text-[11px] text-gray-500 font-ubuntu">
                    <span>Cross-Campus Networks</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3 - Lower than Card 2 (Stagger 3: Arrives third from below) */}
            <div 
              className={`transform transition-all duration-700 ease-out ${
                pillarsInView 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-24 pointer-events-none'
              }`}
              style={{ transitionDelay: pillarsInView ? '400ms' : '0ms' }}
            >
              <div className="md:translate-y-20 lg:translate-y-28 transition-all duration-300 hover:translate-y-18 lg:hover:translate-y-26 group">
                <div className="glass-card glass-card-hover rounded-3xl p-6 sm:p-7 flex flex-col justify-between min-h-[290px]">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-11 h-11 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-105 transition-transform">
                        <Icon icon={pillars[2].icon} className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-orbitron font-bold text-purple-400/80 bg-purple-500/10 px-2.5 py-0.5 rounded-full border border-purple-500/20">
                        {pillars[2].tag}
                      </span>
                    </div>

                    <h4 className="text-base sm:text-lg font-bold text-white font-poppins mb-2 group-hover:text-pink-300 transition-colors">
                      {pillars[2].title}
                    </h4>

                    <p className="text-xs sm:text-sm text-gray-300 font-ubuntu leading-relaxed">
                      {pillars[2].description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-800/80 flex items-center text-[11px] text-gray-500 font-ubuntu">
                    <span>Confidence & Growth</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default AboutSection;
import React, { useState, useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';
import { TIMELINE_MILESTONES } from '../config/constants';

interface TimelineSectionProps {
  onOpenRegister?: () => void;
}

const milestoneSolarIcons = [
  "solar:users-group-two-rounded-bold",
  "solar:checklist-bold",
  "solar:videocamera-record-bold",
  "solar:cup-first-bold"
];

const TimelineSection: React.FC<TimelineSectionProps> = ({ onOpenRegister }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [timelineInView, setTimelineInView] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimelineInView(true);
          observer.disconnect();
        }
      },
      { 
        threshold: 0.25,
        // Negative bottom margin ensures animation only triggers once the timeline cards are genuinely 160px into the viewport
        rootMargin: "0px 0px -160px 0px"
      }
    );

    if (timelineRef.current) {
      observer.observe(timelineRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Synchronized, graceful milestone choreography (paced at ~1.4s per phase so user can easily absorb each stage)
  const cardDelays = [200, 1600, 3000, 4300];
  const nodeDelays = [300, 1500, 2900, 4200];

  return (
    <section id="timeline" className="py-24 bg-gray-950/60 text-white relative overflow-hidden">
      {/* Ambient background glow orbs */}
      <div className="absolute top-1/3 -left-20 w-96 h-96 bg-purple-600/15 rounded-full blur-[130px] pointer-events-none"></div>
      <div className="absolute bottom-1/3 -right-20 w-96 h-96 bg-pink-600/15 rounded-full blur-[130px] pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ease-out ${
          timelineInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}>
          <h2 className="text-3xl md:text-5xl font-bold font-orbitron text-white mb-4">
            Event Timeline
          </h2>
          <div className="w-20 h-1 bg-pink-500 mx-auto mb-6"></div>
          <p className="text-sm md:text-base text-gray-300 max-w-2xl mx-auto font-ubuntu">
            Mark your calendar for this high-energy journey from initial registration to live pitch triumph at LASU Epe.
          </p>
        </div>

        {/* Mobile Interactive Timeline */}
        <div className={`md:hidden transition-all duration-700 ease-out ${
          timelineInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}>
          <div className="flex items-center justify-between mb-6 px-2">
            {TIMELINE_MILESTONES.map((step, index) => (
              <button
                key={index}
                onClick={() => setActiveStep(index)}
                className={`w-11 h-11 rounded-2xl flex items-center justify-center font-orbitron text-sm font-bold transition-all shadow-md ${
                  activeStep === index 
                    ? 'bg-pink-500 text-white scale-110 shadow-pink-500/30' 
                    : 'glass-card text-gray-400'
                }`}
              >
                {step.step}
              </button>
            ))}
          </div>

          <div className="glass-card rounded-2xl p-6 shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs uppercase font-orbitron tracking-wider text-pink-400 font-bold bg-pink-500/10 px-2.5 py-1 rounded-md">
                {TIMELINE_MILESTONES[activeStep].phase} • {TIMELINE_MILESTONES[activeStep].badge}
              </span>
              <div className="w-10 h-10 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center">
                <Icon icon={milestoneSolarIcons[activeStep]} className="w-5 h-5" />
              </div>
            </div>

            <h3 className="text-lg sm:text-xl font-bold font-poppins text-white mb-1">
              {TIMELINE_MILESTONES[activeStep].title}
            </h3>

            <p className="text-pink-400 text-xs sm:text-sm font-orbitron font-semibold mb-3">
              {TIMELINE_MILESTONES[activeStep].date}
            </p>

            <p className="text-gray-300 text-xs sm:text-sm font-ubuntu leading-relaxed">
              {TIMELINE_MILESTONES[activeStep].description}
            </p>
          </div>
        </div>

        {/* Desktop Choreographed Timeline */}
        <div ref={timelineRef} className="hidden md:block">
          <div className="relative max-w-5xl mx-auto py-4">
            
            {/* Center Vertical Line: Static subtle guide track */}
            <div className="absolute left-1/2 transform -translate-x-1/2 top-6 bottom-6 w-0.5 bg-gray-800/60 rounded-full"></div>
            
            {/* Center Vertical Line: Animated progressive laser line growing downward */}
            <div 
              className="absolute left-1/2 transform -translate-x-1/2 top-6 w-0.5 rounded-full bg-gradient-to-b from-pink-500 via-purple-500 to-pink-400"
              style={{
                height: timelineInView ? 'calc(100% - 48px)' : '0%',
                transition: 'height 4100ms cubic-bezier(0.35, 0, 0.25, 1) 400ms',
                boxShadow: '0 0 10px rgba(236, 72, 153, 0.7)'
              }}
            >
              {/* Glowing tracer dot leading the charge downward */}
              <div 
                className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-pink-400 transition-opacity duration-300 ${
                  timelineInView ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  boxShadow: '0 0 12px 2px rgba(236, 72, 153, 0.9)'
                }}
              />
            </div>
            
            {/* Timeline Items */}
            <div className="space-y-16 relative z-10">
              {TIMELINE_MILESTONES.map((step, index) => {
                const isEven = index % 2 === 0;
                const cardDelay = cardDelays[index];
                const nodeDelay = nodeDelays[index];

                return (
                  <div key={index} className="relative">
                    <div className={`flex items-center ${isEven ? 'flex-row' : 'flex-row-reverse'}`}>
                      
                      {/* Content Card (Half Width) with directional entrance */}
                      <div className={`w-1/2 ${isEven ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
                        <div 
                          className={`transform transition-all duration-800 ease-out ${
                            timelineInView
                              ? 'opacity-100 translate-x-0'
                              : isEven
                                ? 'opacity-0 -translate-x-16 pointer-events-none'
                                : 'opacity-0 translate-x-16 pointer-events-none'
                          }`}
                          style={{ transitionDelay: timelineInView ? `${cardDelay}ms` : '0ms' }}
                        >
                          <div className="glass-card glass-card-hover p-6 sm:p-7 rounded-2xl group inline-block max-w-md text-left">
                            <div className="flex items-center justify-between mb-2">
                              <span className="inline-block text-xs uppercase font-orbitron tracking-wider text-pink-400 font-bold">
                                {step.phase} • {step.badge}
                              </span>
                              <span className="text-[11px] font-orbitron font-bold text-gray-400 bg-white/[0.04] border border-white/10 px-2 py-0.5 rounded-md">
                                Step {step.step}
                              </span>
                            </div>
                            <h3 className="text-lg sm:text-xl font-bold text-white mb-1 font-poppins group-hover:text-pink-300 transition-colors">
                              {step.title}
                            </h3>
                            <p className="text-pink-400 font-orbitron text-xs sm:text-sm font-semibold mb-2">
                              {step.date}
                            </p>
                            <p className="text-gray-300 text-xs sm:text-sm font-ubuntu leading-relaxed">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Center Node Icon - Pops on right as the progressive line reaches it */}
                      <div className="relative z-10 flex items-center justify-center">
                        <div 
                          className={`transform transition-all duration-500 ease-out ${
                            timelineInView ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                          }`}
                          style={{ 
                            transitionDelay: timelineInView ? `${nodeDelay}ms` : '0ms',
                            transformOrigin: 'center'
                          }}
                        >
                          <div className={`w-12 h-12 rounded-2xl ${
                            step.highlight 
                              ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/40 ring-4 ring-pink-500/20' 
                              : 'glass-card text-pink-400 border border-white/20'
                          } flex items-center justify-center font-bold font-orbitron transition-transform hover:scale-110`}>
                            <Icon icon={milestoneSolarIcons[index]} className="w-5 h-5" />
                          </div>
                        </div>
                      </div>
                      
                      {/* Empty counterpart spacer */}
                      <div className="w-1/2"></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Action Button: Rises from the bottom right as the timeline concludes */}
        <div 
          className={`mt-16 text-center transform transition-all duration-800 ease-out ${
            timelineInView 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8 pointer-events-none'
          }`}
          style={{ transitionDelay: timelineInView ? '5100ms' : '0ms' }}
        >
          <button
            onClick={onOpenRegister}
            className="bg-pink-500 hover:bg-pink-600 font-orbitron text-white px-8 py-3.5 rounded-full font-semibold text-xs sm:text-sm transition-all shadow-lg hover:shadow-pink-500/30 inline-flex items-center space-x-2 transform hover:scale-105"
          >
            <span>Register Your Team</span>
            <Icon icon="solar:arrow-right-bold" className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};

export default TimelineSection;
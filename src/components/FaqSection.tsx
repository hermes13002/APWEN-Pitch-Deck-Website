import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { FAQS } from '../config/constants';

const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="FAQ" className="py-24 px-4 sm:px-6 lg:px-10 bg-gray-950/60 text-white relative overflow-hidden">
      {/* Ambient background glow orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-orbitron text-white mb-4">
            Frequently Asked Questions
          </h2>
          <div className="w-20 h-1 bg-pink-500 mx-auto mb-6"></div>
          <p className="text-gray-300 font-ubuntu text-sm sm:text-base">
            Everything you need to know about the APWEN-LASU Career Summit 2.0 Pitch Competition.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`border rounded-2xl transition-all duration-300 overflow-hidden ${
                  isOpen 
                    ? 'glass-card border-pink-500/50 shadow-lg shadow-pink-500/10' 
                    : 'bg-white/[0.03] backdrop-blur-md border-white/10 hover:border-pink-500/30 hover:bg-white/[0.06]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between space-x-4 focus:outline-none"
                >
                  <h3 className="font-semibold font-orbitron text-xs sm:text-sm md:text-base text-white">
                    {faq.question}
                  </h3>
                  <div className="shrink-0 w-8 h-8 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-pink-400">
                    {isOpen ? (
                      <Icon icon="solar:alt-arrow-up-bold" className="w-4 h-4" />
                    ) : (
                      <Icon icon="solar:alt-arrow-down-bold" className="w-4 h-4" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 sm:pb-6 pt-0 text-gray-300 font-ubuntu text-xs sm:text-sm leading-relaxed border-t border-white/10 mt-1">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;

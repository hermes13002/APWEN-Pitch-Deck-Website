import React from 'react';
import { Icon } from '@iconify/react';
import { useScrollAnimation } from '../hooks/useScrollAnimations';
import { LINKS, EVENT_DETAILS } from '../config/constants';

interface ContactSectionProps {
  onOpenRegister?: () => void;
}

const ContactSection: React.FC<ContactSectionProps> = ({ onOpenRegister }) => {
  useScrollAnimation();

  return (
    <section id="contact" className="py-24 bg-gray-950/60 text-white relative overflow-hidden">
      {/* Ambient background glow orbs */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-purple-600/15 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-pink-600/15 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-orbitron text-white mb-4 scroll-animate scroll-hidden">
            Contact & Location
          </h2>
          <div className="w-20 h-1 bg-pink-500 mx-auto mb-6 scroll-animate scroll-hidden"></div>
          <p className="text-sm md:text-base text-gray-300 max-w-2xl mx-auto font-ubuntu scroll-animate scroll-hidden">
            Have questions about registrations, visiting chapters, or summit schedules? The student organizing committee is here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {/* Contact Details Card */}
          <div className="glass-panel rounded-3xl p-8 sm:p-10 scroll-animate scroll-hidden flex flex-col justify-between">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 font-poppins">
                APWEN LASU Organizing Team
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="mr-4 bg-pink-500/20 border border-pink-500/30 rounded-2xl p-3 text-pink-400">
                    <Icon icon="solar:letter-bold" className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-semibold text-white mb-0.5 font-poppins">Official Email</h4>
                    <a 
                      href={`mailto:${LINKS.email}`} 
                      className="text-pink-400 hover:text-pink-300 font-ubuntu text-xs sm:text-sm"
                    >
                      {LINKS.email}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-4 bg-pink-500/20 border border-pink-500/30 rounded-2xl p-3 text-pink-400">
                    <Icon icon="solar:phone-calling-bold" className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-semibold text-white mb-0.5 font-poppins">Direct Inquiries</h4>
                    <p className="text-gray-300 font-ubuntu text-xs sm:text-sm">{LINKS.phones[0]}</p>
                    <p className="text-gray-300 font-ubuntu text-xs sm:text-sm">{LINKS.phones[1]}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-4 bg-pink-500/20 border border-pink-500/30 rounded-2xl p-3 text-pink-400">
                    <Icon icon="solar:map-point-bold" className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-semibold text-white mb-0.5 font-poppins">Summit Venue</h4>
                    <p className="text-gray-300 font-ubuntu text-xs sm:text-sm">{EVENT_DETAILS.venue}</p>
                    <p className="text-gray-400 font-ubuntu text-xs">{EVENT_DETAILS.venueDetails}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-3">
              <button
                onClick={onOpenRegister}
                className="bg-pink-500 hover:bg-pink-600 text-white px-7 py-3 rounded-full font-orbitron font-semibold text-xs sm:text-sm transition-all shadow-lg hover:shadow-pink-500/25 text-center flex items-center justify-center space-x-2"
              >
                <span>Register Team</span>
                <Icon icon="solar:arrow-right-bold" className="w-4 h-4" />
              </button>
              {/* WhatsApp Community link (Cohort link is exclusive to registered teams)
              <a
                href={LINKS.whatsappCommunityUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-full font-orbitron text-xs sm:text-sm transition-colors text-center flex items-center justify-center space-x-1.5 shadow-md"
              >
                <Icon icon="solar:chat-round-dots-bold" className="w-4 h-4" />
                <span>Join WhatsApp Group</span>
              </a>
              */}
            </div>
          </div>

          {/* Interactive Google Map with glass frame */}
          <div className="glass-panel rounded-3xl overflow-hidden p-2 min-h-[350px]">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.4228202883332!2d3.993372974081202!3d6.594255022338947!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1039471c10863f8d%3A0x792b76ef90513491!2sLAGOS%20STATE%20UNIVERSITY%20EPE%20CAMPUS!5e0!3m2!1sen!2sng!4v1759747307370!5m2!1sen!2sng" 
              width="100%" 
              height="100%" 
              className="rounded-2xl"
              style={{ border: 0, minHeight: '380px' }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade" 
              title="LASU Epe Campus Map"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default ContactSection;

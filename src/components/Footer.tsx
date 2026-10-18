import React from 'react';
import { Icon } from '@iconify/react';
import { LINKS, EVENT_DETAILS } from '../config/constants';

interface FooterProps {
  onOpenRegister?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenRegister }) => {
  return (
    <footer className="bg-gray-950 text-white py-16 border-t border-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10">
          
          <div className="max-w-md">
            <div className="flex items-center space-x-3 mb-3">
              <img
                src="/apwen_logo.png"
                alt="APWEN Logo"
                className="h-10 w-auto"
                style={{ maxHeight: 42 }}
              />
              <div>
                <span className="block font-orbitron font-bold text-sm tracking-wider uppercase text-white">
                  APWEN LASU
                </span>
                <span className="block text-xs text-pink-400 font-ubuntu">
                  {EVENT_DETAILS.title}
                </span>
              </div>
            </div>

            <p className="text-gray-400 text-xs sm:text-sm font-ubuntu leading-relaxed mb-4">
              "{EVENT_DETAILS.theme}" — A student-led platform championing female excellence, peer mentorship, and engineering innovation across universities.
            </p>

            <div className="flex items-center space-x-3">
              <button
                onClick={onOpenRegister}
                className="text-xs font-orbitron text-pink-400 hover:text-pink-300 font-semibold underline underline-offset-4"
              >
                Register Team
              </button>
              {/* WhatsApp Community link (Cohort link is exclusive to registered teams)
              <span className="text-gray-600">•</span>
              <a
                href={LINKS.whatsappCommunityUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-orbitron text-green-400 hover:text-green-300 flex items-center space-x-1"
              >
                <Icon icon="solar:chat-round-dots-bold" className="w-3.5 h-3.5" />
                <span>WhatsApp Group</span>
              </a>
              */}
              {/* Pitch Guide link (Uncomment when guide is ready)
              <span className="text-gray-600">•</span>
              <a
                href={LINKS.pitchGuideDriveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-orbitron text-gray-400 hover:text-white flex items-center space-x-1"
              >
                <span>Pitch Guide</span>
                <Icon icon="solar:link-circle-bold" className="w-3 h-3 text-pink-400" />
              </a>
              */}
            </div>
          </div>
          
          {/* Socials & Community */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="flex space-x-4">
              <a 
                href={LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="APWEN LASU on Instagram"
                className="w-10 h-10 rounded-full bg-gray-900 border border-gray-800 text-gray-400 hover:text-pink-400 hover:border-pink-500/40 flex items-center justify-center transition-all transform hover:scale-110"
              >
                <Icon icon="mdi:instagram" className="w-5 h-5" />
              </a>
              <a 
                href={LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="APWEN LASU on LinkedIn"
                className="w-10 h-10 rounded-full bg-gray-900 border border-gray-800 text-gray-400 hover:text-pink-400 hover:border-pink-500/40 flex items-center justify-center transition-all transform hover:scale-110"
              >
                <Icon icon="mdi:linkedin" className="w-5 h-5" />
              </a>
              {/* WhatsApp Community Icon (Cohort link is exclusive to registered teams)
              <a 
                href={LINKS.whatsappCommunityUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="APWEN LASU on WhatsApp"
                className="w-10 h-10 rounded-full bg-gray-900 border border-gray-800 text-green-400 hover:text-green-300 hover:border-green-500/40 flex items-center justify-center transition-all transform hover:scale-110"
              >
                <Icon icon="solar:chat-round-dots-bold" className="w-5 h-5" />
              </a>
              */}
            </div>
          </div>
          
          {/* Copyright & Credit */}
          <div className="text-left lg:text-right font-ubuntu text-xs text-gray-500 space-y-1">
            <p>
              &copy; {new Date().getFullYear()} APWEN LASU Chapter. All rights reserved.
            </p>
            <p>
              Summit 2.0 • Lagos State University, Epe Campus
            </p>
            <div className="pt-2 flex items-center lg:justify-end text-gray-400">
              Made with <Icon icon="solar:heart-bold" className="w-3.5 h-3.5 mx-1.5 text-pink-500 animate-pulse" /> by APWEN LASU Collegiate Team
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
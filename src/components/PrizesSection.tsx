import React from 'react';
import {Trophy, Sparkles, Gem} from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimations';

const PrizesSection: React.FC = () => {
  useScrollAnimation();
  const reasons = [
    {
      icon: <Trophy className="w-10 h-10 text-pink-500" />,
      title: '1st Place',
      description: "₦300,000 cash + 6-month mentorship + pitch to investors."
    },
    {
      icon: <Gem className="w-10 h-10 text-pink-600" />,
      title: '2nd Place',
      description: '₦200,000 cash + workshop access + networking sessions.'
    },
    {
      icon: <Sparkles className="w-10 h-10 text-pink-500" />,
      title: '3rd Place',
      description: '₦100,000 cash + certificates + community resources.'
    }
  ];

  return (
    <section id="why" className="py-20 dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white-900 mb-4 font-orbitron scroll-animate scroll-hidden">Prizes & Rewards</h2>
          <div className="w-20 h-1 bg-pink-500 mx-auto mb-6 scroll-animate scroll-hidden"></div>
          <p className="text-lg text-white-600 max-w-3xl mx-auto font-ubuntu scroll-animate scroll-hidden">
            Winning big fuels your startup dreams. Top pitches claim cash prizes, mentorship packages, and exclusive investor access to accelerate your venture.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 scroll-animate scroll-hidden">
          {reasons.map((reason, index) => (
            <div key={index} className="rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex mb-4">
                {reason.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-100 mb-3 font-poppins">{reason.title}</h3>
              <p className="text-gray-300 font-ubuntu">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PrizesSection;
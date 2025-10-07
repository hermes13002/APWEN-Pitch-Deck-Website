import React from 'react';
import { Lightbulb, BrainCog, HeartPulse, Leaf, LeafyGreen} from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimations';

const WhyItMattersSection: React.FC = () => {
  useScrollAnimation();
  const reasons = [
    {
      icon: <Lightbulb className="w-10 h-10 text-pink-500" />,
      title: 'Energy',
      description: "Innovate renewable solutions for powering the continent's growth."
    },
    {
      icon: <BrainCog className="w-10 h-10 text-pink-600" />,
      title: 'Technology & Digital Innovation',
      description: 'Harness AI, apps, and digital tools to revolutionize daily life.'
    },
    {
      icon: <HeartPulse className="w-10 h-10 text-pink-500" />,
      title: 'Health',
      description: 'Develop accessible tech for better healthcare outcomes.'
    },
    {
      icon: <Leaf className="w-10 h-10 text-pink-500" />,
      title: 'Agriculture & Food Security',
      description: 'Boost yields and sustainability with smart farming innovations.'
    },
    {
      icon: <LeafyGreen className="w-10 h-10 text-pink-500" />,
      title: 'Sustainability',
      description: 'Create eco-friendly ventures for a greener Africa.'
    }
  ];

  return (
    // <section id="why" className="py-20 dark:bg-gray-900">
    <section id = 'why' className="py-20 dark:bg-[linear-gradient(to_bottom,_rgba(17,24,39,1)_80%,_rgba(17,24,39,1)_100%)]">
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white-900 mb-4 font-orbitron scroll-animate scroll-hidden">Focus Areas</h2>
          <div className="w-20 h-1 bg-pink-500 mx-auto mb-6"></div>
          <p className="text-lg text-white-600 max-w-3xl mx-auto font-ubuntu scroll-animate scroll-hidden">
            Dive into transformative themes shaping Africa's tomorrow. Pitch ideas that solve real challenges and drive sustainable impact across key sectors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 useScrollAnimation();">
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

export default WhyItMattersSection;
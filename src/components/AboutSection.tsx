import React from 'react';
import { Lightbulb, LineChart, Hand } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimations';

const AboutSection: React.FC = () => {
  useScrollAnimation();
  
  const themes = [
    { icon: <Hand className="w-6 h-6 text-yellow-500" />, title: 'Mentorship', 
      description: "Personalized guidance from tech pioneers to refine your vision and strategy." 
    },
    { icon: <Lightbulb className="w-6 h-6 text-green-500" />, title: 'Innovation', 
      description: 'Spark breakthroughs in tech and beyond through collaborative workshops.' },
    { icon: <LineChart className="w-6 h-6 text-orange-500" />, title: 'Industry Connections', 
      description: "Build networks with startups, investors, and executives driving Africa's future." },
  ];

  return (
    <section id="about" className="py-20 bg-cover bg-center relative" style={{ backgroundImage: "url('/about_bg.jpg')" }}>
      <div className="absolute inset-0 bg-black/40 dark:bg-black/60"></div>

      {/* <div className="absolute top-0 left-0 w-full h-40 opacity-70 bg-gradient-to-b from-purple-700 via-black/60 to-transparent z-10"></div> */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-gray-900 via-black/60 to-transparent z-10"></div>
      
      <div className="relative container mx-auto px-4 md:px-6">
        <div className="bg-gray-100/80 dark:bg-gray-900/70 backdrop-blur-md rounded-xl p-10 shadow-xl">

          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 font-orbitron scroll-animate scroll-hidden">
              About the Summit
            </h2>
            <div className="w-20 h-1 bg-pink-500 mx-auto mb-6"></div>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-5xl mx-auto font-ubuntu scroll-animate scroll-hidden">
              Step into the future at APWEN LASU's premier event, blending cutting-edge innovation with career acceleration. Young African female trailblazers like you will gain mentorship from industry leaders, forge vital connections, and pitch bold ideas to real-world opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 scroll-animate scroll-hidden">
            {themes.map((theme, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
              >
                <div className="rounded-full bg-gray-100 dark:bg-gray-700 w-14 h-14 flex items-center justify-center mb-4 shadow-sm">
                  {theme.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2 font-poppins">
                  {theme.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 font-ubuntu">
                  {theme.description}
                </p>
              </div>
            ))}
          </div>
          </div>
        </div>
    </section>
  );
};

export default AboutSection;
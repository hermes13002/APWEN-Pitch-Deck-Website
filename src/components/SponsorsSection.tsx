import React from 'react';

const SponsorsSection: React.FC = () => {
  const sponsors = [
    {
      name: "TotalEnergies",
      logo: "https://images.pexels.com/photos/2381465/pexels-photo-2381465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      name: "Shell",
      logo: "https://images.pexels.com/photos/2381466/pexels-photo-2381466.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      name: "Chevron",
      logo: "https://images.pexels.com/photos/2381467/pexels-photo-2381467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      name: "ExxonMobil",
      logo: "https://images.pexels.com/photos/2381468/pexels-photo-2381468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      name: "NNPC",
      logo: "https://images.pexels.com/photos/2381469/pexels-photo-2381469.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 font-spacegrotesk">Our Sponsors</h2>
          <div className="w-20 h-1 bg-orange-500 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-opensans">
            We're proud to partner with leading organizations that share our vision for innovation and technological advancement.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {sponsors.map((sponsor, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
            >
              <img
                src={sponsor.logo}
                alt={`${sponsor.name} logo`}
                className="max-h-16 w-auto grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SponsorsSection;
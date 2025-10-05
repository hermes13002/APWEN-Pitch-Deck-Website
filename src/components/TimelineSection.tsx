import React, { useState } from 'react';
import { Calendar, Users, CheckCircle, Award, MapPin } from 'lucide-react';

const TimelineSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  
  const timelineSteps = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Registration",
      date: "Oct 1 – Oct 21",
      description: "Idea Submission Window: Submit your pitch deck online.",
      color: "bg-pink-500"
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Proposal Review",
      date: "Nov 26",
      description: "Pitch Day: Live event with judging and awards.",
      color: "bg-pink-600"
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Project Refinement",
      date: "Oct 30",
      description: "Shortlist Announcement: Top 20 ideas selected.",
      color: "bg-pink-500"
    },
  ];

  return (
    <section id="timeline" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white-900 mb-4 font-orbitron">Event Timeline</h2>
          <div className="w-20 h-1 bg-pink-500 mx-auto mb-6"></div>
          <p className="text-xl text-white-600 max-w-4xl mx-auto font-ubuntu">
            Mark your calendar for this high-energy journey from idea submission to pitch triumph. Stay ahead with clear milestones to showcase your innovation.
          </p>
        </div>

        {/* Mobile Timeline */}
        <div className="md:hidden">
          <div className="flex items-center justify-between mb-6">
            {timelineSteps.map((step, index) => (
              <button
                key={index}
                onClick={() => setActiveStep(index)}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${
                  activeStep === index ? step.color : 'bg-gray-700'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <div className="bg-gray-900 rounded-xl p-6 shadow-md">
            <div className={`w-16 h-16 rounded-full ${timelineSteps[activeStep].color} text-white flex items-center justify-center mx-auto mb-4`}>
              {timelineSteps[activeStep].icon}
            </div>
            {/* <h3 className="text-xl font-bold text-center text-gray-900 mb-2">{timelineSteps[activeStep].title}</h3> */}
            <p className="text-gray-100 text-xl font-ubuntu text-center mb-4">{timelineSteps[activeStep].date}</p>
            <p className="text-gray-300 text-xl font-ubuntu text-center">{timelineSteps[activeStep].description}</p>
          </div>
        </div>

        {/* Desktop Timeline */}
        <div className="hidden md:block">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200"></div>
            
            {/* Timeline Items */}
            <div className="space-y-20">
              {timelineSteps.map((step, index) => (
                <div key={index} className={`relative ${index % 2 === 0 ? 'left-timeline' : 'right-timeline'}`}>
                  <div className={`flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12'}`}>
                      {/* <h3 className="text-xl font-bold text-white-900 mb-2 font-poppins">{step.title}</h3> */}
                      <p className="text-white-500 mb-3 text-xl font-ubuntu">{step.date}</p>
                      <p className="text-white-700 text-xl font-ubuntu">{step.description}</p>
                    </div>
                    
                    <div className="relative">
                      <div className={`absolute top-0 ${index % 2 === 0 ? '-right-10' : '-left-10'} w-20 h-20 rounded-full ${step.color} text-white flex items-center justify-center shadow-lg z-10`}>
                        {step.icon}
                      </div>
                    </div>
                    
                    <div className="w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <a
            href="https://forms.gle/z258wJh7Vas1W3ZF9"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-pink-500 hover:bg-pink-600 font-orbitron text-white px-8 py-3 rounded-full font-medium transition-colors shadow-lg inline-block"
          >
            Register
          </a>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
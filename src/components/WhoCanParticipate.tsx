import React from 'react';
import { Send, Mic2Icon, File} from 'lucide-react';

const WhoCanParticipate: React.FC = () => {
  
  return (
    <section 
        id="participate" 
        className="relative py-20 bg-cover bg-center" 
        style={{ backgroundImage: "url('/whocanparticipate_bg.jpg')" }} // Replace with actual bg image
        >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Content Wrapper */}
        <div className="relative container mx-auto px-4 md:px-6">
            <div className="bg-gray-900/90 text-white rounded-2xl p-10 shadow-xl backdrop-blur-md border border-gray-700">
            
            {/* Heading */}
            <h2 className="text-3xl md:text-4xl font-bold text-white-900 mb-6 font-orbitron">
                Who Can Participate
            </h2>
            <p className="text-gray-300 text-xl mb-10 max-w-4xl font-ubuntu">
                Open to ambitious young African female students, early-career innovators, and startup enthusiasts 
                aged 18-35 with passion for tech and social impact. No prior experience required – just bold ideas 
                ready to disrupt.
            </p>

            {/* Subheading */}
            <h3 className="text-2xl font-semibold text-pink-400 mb-6 font-orbitron">
                How to Register
            </h3>

            {/* Steps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">

                {/* Step 1 */}
                <div className="border-t-2 border-pink-400 pt-4">
                <Send className="w-7 h-7 text-pink-500" />
                <h4 className="font-bold text-xl mb-2 font-poppins">Submit Idea</h4>
                <p className="text-gray-300 text-lg font-ubuntu">
                    Upload your 1-page pitch summary via our portal by Oct 21.
                </p>
                </div>

                {/* Step 2 */}
                <div className="border-t-2 border-pink-400 pt-4">
                <File className="w-7 h-7 text-pink-500" />
                <h4 className="font-bold text-xl mb-2 font-poppins">Prepare Pitch</h4>
                <p className="text-gray-300 text-lg font-ubuntu">
                    Craft a 5-minute deck focusing on problem, solution, and impact.
                </p>
                </div>

                {/* Step 3 */}
                <div className="border-t-2 border-pink-400 pt-4">
                <Mic2Icon className="w-7 h-7 text-pink-500" />
                <h4 className="font-bold text-xl mb-2 font-poppins">Attend Event</h4>
                <p className="text-gray-300 text-lg font-ubuntu">
                    Join Nov 26 for live pitches and feedback from experts.
                </p>
                </div>

            </div>

            {/* Footer Text */}
            <p className="text-gray-300 text-xl font-ubuntu">
                Registration is free – secure your spot and launch your future today.
            </p>

            </div>
        </div>
        </section>

  );
};

export default WhoCanParticipate;
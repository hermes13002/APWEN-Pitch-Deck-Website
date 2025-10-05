import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      quote: "Winning Nexus 1.0 was an unforgettable experience. My team built Kukunya, a one-tap security app that alerts nearby hospitals and police with your location and vital info. The hackathon pushed us to move fast, stay sharp, and build something that could save lives. If you're into real-world problem-solving, Nexus is where you want to be. Can’t wait to see what you’ll build!",
      author: "Team Inventus",
      role: "Team Lead",
      image: "/mayowa_nexus.png"
    },
    {
      quote: "The Energy Mavericks competed at the NEXUS 1.0 Hackathon, in what seemed like a very challenging contest. It was indeed our very first Hackathon which served as an eye opener as we pushed ourselves to the limit in creating a sustainable energy solution.",
      author: "Energy Mavericks",
      role: "Team Member",
      image: "/gospel_nexus2.png"
    },
    // {
    //   quote: "Nexus Hackathon provided the perfect platform for our team to develop our idea from concept to prototype. The experience was transformative.",
    //   author: "Aisha Oladele",
    //   role: "Winning Team Lead, Previous Edition",
    //   image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    // }
  ];

  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrent(current === testimonials.length - 1 ? 0 : current + 1);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const prevSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrent(current === 0 ? testimonials.length - 1 : current - 1);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [current]);

  return (
    <section id="testimonials" className="py-20 bg-gray-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white-900 mb-4 font-spacegrotesk">What People Say</h2>
          <div className="w-20 h-1 bg-orange-500 mx-auto mb-6"></div>
          <p className="text-lg text-white-600 max-w-3xl mx-auto font-opensans">
            Hear from past participants, mentors, and industry partners about their Nexus Hackathon experience.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute -top-10 -left-10 text-orange-200 opacity-50">
            <Quote size={80} />
          </div>
          
          <div className="relative bg-white rounded-xl shadow-lg p-8 md:p-12 overflow-hidden">
            <div className="transition-all duration-500 ease-in-out transform">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/3 mb-6 md:mb-0 flex justify-center">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-orange-100 shadow-md">
                    <img 
                      src={testimonials[current].image} 
                      alt={testimonials[current].author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="md:w-2/3 md:pl-8">
                  <p className="text-gray-700 text-lg italic mb-6 font-poppins">"{testimonials[current].quote}"</p>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 font-poppins">{testimonials[current].author}</h4>
                    <p className="text-gray-500 font-poppins">{testimonials[current].role}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-8 space-x-4">
            <button
              onClick={prevSlide}
              className="w-10 h-10 rounded-full bg-white text-orange-500 flex items-center justify-center shadow-md hover:bg-orange-50 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === current ? 'bg-orange-500' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={nextSlide}
              className="w-10 h-10 rounded-full bg-white text-orange-500 flex items-center justify-center shadow-md hover:bg-orange-50 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
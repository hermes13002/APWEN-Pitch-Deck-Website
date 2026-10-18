import React, { useState } from "react";
import { Icon } from '@iconify/react';

const Gallery: React.FC = () => {
  const images = [
    "/img1.jpg",
    "/img2.jpg",
    "/img3.jpg",
    "/img4.jpg",
  ];

  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-10 bg-gray-950 text-white border-t border-gray-900">
      <div className="container mx-auto">
        
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-4xl font-bold text-center text-white mb-3 font-orbitron">
            APWEN Event Highlights
          </h2>
          <div className="w-20 h-1 bg-pink-500 mx-auto mb-4"></div>
          <p className="text-xs sm:text-sm text-gray-400 font-ubuntu max-w-xl mx-auto">
            Memories and milestones from past APWEN LASU workshops, pitch events, and community outreaches.
          </p>
        </div>

        {/* Masonry Layout */}
        <div className="columns-1 sm:columns-2 md:columns-4 gap-4 px-2 max-w-6xl mx-auto">
          {images.map((src, idx) => (
            <div key={idx} className="mb-4 rounded-2xl overflow-hidden shadow-lg break-inside-avoid border border-gray-800 bg-gray-900 group">
              <img
                src={src}
                alt={`APWEN Highlight ${idx + 1}`}
                className="w-full object-cover cursor-pointer transition-transform duration-500 group-hover:scale-105"
                onClick={() => setLightboxImage(src)}
              />
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {lightboxImage && (
          <div
            className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in"
            onClick={() => setLightboxImage(null)}
          >
            <div className="relative max-w-4xl max-h-[90vh]">
              <button 
                onClick={() => setLightboxImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-pink-400 p-2"
                aria-label="Close image"
              >
                <Icon icon="solar:close-circle-bold" className="w-8 h-8" />
              </button>
              <img
                src={lightboxImage}
                alt="Enlarged Event Highlight"
                className="max-w-full max-h-[85vh] rounded-2xl shadow-2xl border border-gray-700"
              />
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default Gallery;

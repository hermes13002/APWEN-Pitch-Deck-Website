import React, { useState } from "react";

const Gallery: React.FC = () => {
  const images = [
    "/img1.jpg",
    "/img2.jpg",
    "/img3.jpg",
    "/img4.jpg",
    // "/img.jpg",
    // "/img.jpg",
  ];

  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  return (
    <section className="py-16 px-16">
      
      {/* <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-gray-900 via-black/60 to-transparent z-10"></div>
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-gray-900 via-black/60 to-transparent z-10"></div> */}

      <h2 className="text-2xl font-bold text-center text-white mb-4 font-orbitron">
        APWEN Event Highlights
      </h2>
      <div className="w-20 h-1 bg-pink-500 mx-auto mb-6"></div>

      {/* <p className="text-lg text-white-600 max-w-4xl mx-auto font-ubuntu scroll-animate scroll-hidden">
        Highlights of APWEN previous events
      </p> */}

      {/* Masonry Layout */}
      <div className="columns-1 sm:columns-2 md:columns-3 gap-2 px-2">
        {images.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt=""
            className="w-full mb-4 rounded-lg shadow-lg break-inside-avoid cursor-pointer transition-transform duration-300 hover:scale-105"
            onClick={() => setLightboxImage(src)}
          />
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setLightboxImage(null)}
        >
          <img
            src={lightboxImage}
            alt="Lightbox"
            className="max-w-3xl max-h-[90vh] rounded-lg shadow-lg"
          />
        </div>
      )}
    </section>
  );
};

export default Gallery;

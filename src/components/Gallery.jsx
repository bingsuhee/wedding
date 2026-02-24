import React from 'react';
import { weddingInfo } from '../data/info';

const Gallery = () => {
  return (
    <section className="py-24 px-6 bg-white text-center">
      <h3 className="text-xl font-serif mb-12 text-wedding-accent font-bold italic">갤러리</h3>
      <div className="grid grid-cols-2 gap-3">
        {weddingInfo.gallery.map((img, idx) => (
          <div key={idx} className="aspect-[3/4] overflow-hidden rounded-xl shadow-sm border border-gray-50">
            <img
              src={img}
              alt={`gallery-${idx}`}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;

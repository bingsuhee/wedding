import React from 'react';
import { weddingInfo } from '../data/info';
import { Heart } from 'lucide-react';

const Main = () => {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen py-20 px-6 text-center bg-white overflow-hidden">
      <div className="z-10 animate-fade-in">
        <h2 className="text-sm tracking-[0.3em] uppercase text-wedding-accent mb-8 font-serif">Wedding Invitation</h2>
        <h1 className="text-4xl font-serif mb-6 text-gray-800">
          {weddingInfo.groom.name} <span className="text-2xl">&</span> {weddingInfo.bride.name}
        </h1>
        <div className="w-px h-16 bg-wedding-accent mx-auto mb-6 opacity-30"></div>
        <p className="text-lg text-wedding-primary font-serif mb-12">
          {weddingInfo.date}
        </p>
        <p className="text-gray-500 tracking-widest text-sm">
          {weddingInfo.location.name}
        </p>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03]">
        <Heart size={400} fill="currentColor" className="text-wedding-accent" />
      </div>
    </section>
  );
};

export default Main;

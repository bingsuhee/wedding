import React from 'react';
import { weddingInfo } from '../data/info';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const Main = () => {
  return (
    <section className="relative flex flex-col items-center justify-center bg-white overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: false }}
        className="z-10 text-center"
      >
        <h2 className="text-sm tracking-[0.4em] uppercase text-wedding-accent mb-10 font-serif font-bold">Wedding Invitation</h2>
        <h1 className="text-4xl font-serif mb-8 text-gray-800 tracking-tight">
          {weddingInfo.groom.name} <span className="text-2xl text-wedding-accent/60 mx-1">&</span> {weddingInfo.bride.name}
        </h1>
        <div className="w-12 h-px bg-wedding-accent mx-auto mb-8 opacity-40"></div>
        <p className="text-lg text-gray-600 font-serif mb-12">
          {weddingInfo.date}
        </p>
        <p className="text-gray-400 tracking-[0.2em] text-xs uppercase">
          {weddingInfo.location.name}
        </p>
      </motion.div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02]">
        <Heart size={400} fill="currentColor" className="text-wedding-accent" />
      </div>
    </section>
  );
};

export default Main;

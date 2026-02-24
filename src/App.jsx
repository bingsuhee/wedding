import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Main from './components/Main';
import Invitation from './components/Invitation';
import Gallery from './components/Gallery';
import Map from './components/Map';
import Guestbook from './components/Guestbook';
import ProgressBar from './components/ProgressBar';
import Petals from './components/Petals';
import { Heart } from 'lucide-react';

const Section = ({ children, index, total, scrollYProgress }) => {
  const step = 1 / total;
  const start = index * step;
  const prevStart = (index - 1) * step;
  const nextStart = (index + 1) * step;

  // Stacking & Unveiling:
  // When active (at 'start'), scale=1, opacity=1.
  // When exiting (towards 'nextStart'), scale decreases, opacity decreases.
  // When entrance (from 'prevStart' to 'start'), scale increases, opacity increases.

  const scale = useTransform(scrollYProgress,
    [prevStart, start, nextStart],
    [0.9, 1, 0.85]
  );

  const opacity = useTransform(scrollYProgress,
    [prevStart, start, nextStart],
    [0, 1, 0]
  );

  const blurValue = useTransform(scrollYProgress,
    [prevStart, start, nextStart],
    [10, 0, 10]
  );
  const filter = useTransform(blurValue, (v) => `blur(${v}px)`);

  const y = useTransform(scrollYProgress,
    [start, nextStart],
    [0, -100]
  );

  return (
    <motion.div
      style={{
        scale,
        opacity,
        filter,
        y,
        zIndex: total - index,
      }}
      className="sticky-section flex items-center justify-center border-x border-gray-100"
    >
      <div className="w-full h-full flex items-center justify-center p-6">
        {children}
      </div>
    </motion.div>
  );
};

function App() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const sections = [
    <Main />,
    <Invitation />,
    <Gallery />,
    <Map />,
    <Guestbook />
  ];

  return (
    <div className="bg-wedding-bg">
      <Petals count={20} />
      <ProgressBar />

      {/* Scrollable area */}
      <div ref={containerRef} className="relative" style={{ height: `${sections.length * 200}vh` }}>
        {sections.map((section, idx) => (
          <Section
            key={idx}
            index={idx}
            total={sections.length}
            scrollYProgress={scrollYProgress}
          >
            {section}
          </Section>
        ))}
      </div>

      {/* Footer is NOT sticky, it comes after the long scrollable div */}
      <footer className="h-screen flex flex-col items-center justify-center bg-white relative z-[100] shadow-2xl">
        <Heart size={24} className="mx-auto text-wedding-accent mb-4 opacity-30" />
        <p className="text-sm text-gray-400 font-serif">
          © 2024. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;

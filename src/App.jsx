import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Main from './components/Main';
import Invitation from './components/Invitation';
import Gallery from './components/Gallery';
import Map from './components/Map';
import Guestbook from './components/Guestbook';
import ProgressBar from './components/ProgressBar';
import Petals from './components/Petals';
import { Heart } from 'lucide-react';

const SectionWrapper = ({ children, index, totalSections }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Animation for the current section as it exits (scrolling up)
  // When this section is at the top, it should scale down and fade out
  // The next section will be unveiling from underneath.

  // Use scrollYProgress of the section itself
  // 0: section starts entering from bottom
  // 0.5: section is fully in view
  // 1: section starts leaving at top

  const scale = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.9, 1, 1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0, 1, 1, 0]);
  const blur = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], ["blur(10px)", "blur(0px)", "blur(0px)", "blur(10px)"]);

  return (
    <div ref={ref} className="relative h-[150vh] w-full">
      <motion.div
        style={{ scale, opacity, filter: blur }}
        className="sticky-section bg-white"
      >
        {children}
      </motion.div>
    </div>
  );
};

function App() {
  const sections = [
    <Main />,
    <Invitation />,
    <Gallery />,
    <Map />,
    <Guestbook />
  ];

  return (
    <>
      <Petals count={15} />
      <ProgressBar />
      <main className="relative">
        {sections.map((section, idx) => (
          <SectionWrapper key={idx} index={idx} totalSections={sections.length}>
            {section}
          </SectionWrapper>
        ))}

        <section className="h-screen flex flex-col items-center justify-center bg-gray-50/50 sticky top-0 z-10">
          <Heart size={24} className="mx-auto text-wedding-accent mb-4 opacity-30" />
          <p className="text-sm text-gray-400 font-serif">
            © 2024. All rights reserved.
          </p>
        </section>
      </main>
    </>
  );
}

export default App;

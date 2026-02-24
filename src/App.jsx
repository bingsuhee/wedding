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

const Section = ({ children, index, total, scrollYProgress, activeIndex }) => {
  const step = 1 / total;
  const start = index * step;
  const prevStart = (index - 1) * step;
  const nextStart = (index + 1) * step;

  // Thresholds: Stay at 1 from 10% to 90% of the active range
  const enteringThreshold = prevStart + step * 0.9;
  const exitingThreshold = start + step * 0.9;

  // Stacking & Unveiling:
  // We want the section to be fully visible earlier and stay visible longer.
  const scale = useTransform(scrollYProgress,
    [prevStart, enteringThreshold, start, exitingThreshold, nextStart],
    [0.9, 1, 1, 1, 0.85]
  );

  const opacityTransform = useTransform(scrollYProgress,
    [prevStart, enteringThreshold, start, exitingThreshold, nextStart],
    [0, 1, 1, 1, 0]
  );

  // Explicitly force opacity based on active index to avoid hanging states
  const isActive = activeIndex === index;
  const opacity = useTransform(opacityTransform, (v) => {
    if (isActive) return 1;
    // If it's a past section, it should be fading/faded
    // If it's a future section, it should be hidden
    return v;
  });

  const blurValue = useTransform(scrollYProgress,
    [prevStart, enteringThreshold, start, exitingThreshold, nextStart],
    [10, 0, 0, 0, 10]
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const isLocked = useRef(false);
  const lastTouchY = useRef(0);

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

  const totalSnapPoints = sections.length; // 0 to 4 are sections, 5 is footer

  const handleSnap = (direction) => {
    if (isLocked.current) return;

    // Boundary check for Guestbook (index 4)
    if (currentIndex === 4) {
      const gbList = document.querySelector('.guestbook-list');
      if (gbList) {
        const isAtTop = gbList.scrollTop <= 0;
        const isAtBottom = gbList.scrollTop + gbList.clientHeight >= gbList.scrollHeight - 1;

        if (direction === 'down' && !isAtBottom) return; // Let internal scroll happen
        if (direction === 'up' && !isAtTop) return; // Let internal scroll happen
      }
    }

    let nextIndex = currentIndex;
    if (direction === 'down' && currentIndex < totalSnapPoints) {
      nextIndex = currentIndex + 1;
    } else if (direction === 'up' && currentIndex > 0) {
      nextIndex = currentIndex - 1;
    }

    if (nextIndex !== currentIndex) {
      isLocked.current = true;
      setCurrentIndex(nextIndex);

      // Calculate target using dvh if possible, or consistent window.innerHeight
      const vh = window.innerHeight;
      const targetY = nextIndex * (2 * vh);

      window.scrollTo({
        top: targetY,
        behavior: 'smooth'
      });

      // Unlock after animation/transition time - increased for authoritative snap
      setTimeout(() => {
        isLocked.current = false;
      }, 1000);
    }
  };

  useEffect(() => {
    const onWheel = (e) => {
      // Don't prevent default if we're inside Guestbook and it needs to scroll
      if (currentIndex === 4) {
        const gbList = document.querySelector('.guestbook-list');
        if (gbList) {
          const isAtTop = gbList.scrollTop <= 0;
          const isAtBottom = gbList.scrollTop + gbList.clientHeight >= gbList.scrollHeight - 1;
          if (e.deltaY > 0 && !isAtBottom) return;
          if (e.deltaY < 0 && !isAtTop) return;
        }
      }

      e.preventDefault();
      handleSnap(e.deltaY > 0 ? 'down' : 'up');
    };

    const onTouchStart = (e) => {
      lastTouchY.current = e.touches[0].clientY;
    };

    const onTouchMove = (e) => {
      if (isLocked.current) {
        e.preventDefault();
        return;
      }

      // Guestbook internal scroll check for touch
      if (currentIndex === 4) {
        const gbList = document.querySelector('.guestbook-list');
        if (gbList) {
          const isAtTop = gbList.scrollTop <= 0;
          const isAtBottom = gbList.scrollTop + gbList.clientHeight >= gbList.scrollHeight - 1;
          const deltaY = lastTouchY.current - e.touches[0].clientY;
          if (deltaY > 0 && !isAtBottom) return;
          if (deltaY < 0 && !isAtTop) return;
        }
      }

      e.preventDefault();
    };

    const onTouchEnd = (e) => {
      const deltaY = lastTouchY.current - e.changedTouches[0].clientY;
      if (Math.abs(deltaY) > 50) {
        handleSnap(deltaY > 0 ? 'down' : 'up');
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [currentIndex]);

  return (
    <div className="bg-wedding-bg">
      <Petals count={20} />
      <ProgressBar />

      {/* Scrollable area */}
      <div ref={containerRef} className="relative" style={{ height: `${sections.length * 200}dvh` }}>
        {sections.map((section, idx) => (
          <Section
            key={idx}
            index={idx}
            total={sections.length}
            scrollYProgress={scrollYProgress}
            activeIndex={currentIndex}
          >
            {section}
          </Section>
        ))}
      </div>

      {/* Footer is NOT sticky, it comes after the long scrollable div */}
      <footer className="min-h-dvh flex flex-col items-center justify-center bg-white relative z-[100] shadow-2xl">
        <Heart size={24} className="mx-auto text-wedding-accent mb-4 opacity-30" />
        <p className="text-sm text-gray-400 font-serif">
          © 2024. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;

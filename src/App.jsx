/* eslint-disable no-unused-vars */
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Main from './components/Main';
import Invitation from './components/Invitation';
import Map from './components/Map';
import Guestbook from './components/Guestbook';
import ProgressBar from './components/ProgressBar';
import Petals from './components/Petals';
import { Heart } from 'lucide-react';
import { weddingInfo } from './data/info';

const Section = ({ children, index, total, scrollYProgress, activeIndex }) => {
  const step = 1 / (total - 1);
  const start = index * step;
  const prevStart = (index - 1) * step;
  const nextStart = (index + 1) * step;

  // Symmetric & Linear Animations:
  // Section scales and fades in as it becomes active, and scales/fades out as it exits.
  const scale = useTransform(scrollYProgress,
    [prevStart, start, nextStart],
    [0.9, 1, 0.9]
  );

  const opacityTransform = useTransform(scrollYProgress,
    [prevStart, start, nextStart],
    [0, 1, 0]
  );

  // Explicitly force opacity based on active index to avoid hanging states
  const isActive = activeIndex === index;
  const opacity = useTransform(opacityTransform, (v) => {
    if (isActive) return 1;
    return v;
  });

  const blurValue = useTransform(scrollYProgress,
    [prevStart, start, nextStart],
    [10, 0, 10]
  );
  const filter = useTransform(blurValue, (v) => `blur(${v}px)`);

  const visibility = useTransform(opacityTransform, (v) => v > 0 ? 'visible' : 'hidden');

  const y = useTransform(scrollYProgress,
    [start, nextStart],
    [0, "-100vh"]
  );

  return (
    <motion.div
      style={{
        scale,
        opacity,
        filter,
        y,
        zIndex: isActive ? 50 : total - index,
        pointerEvents: isActive ? 'auto' : 'none',
        visibility
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
    <Map />,
    <Guestbook />
  ];

  const totalSnapPoints = sections.length; // 0 to 4 are sections, 5 is footer

  const handleSnap = useCallback((direction) => {
    if (isLocked.current) return;

    // Boundary check for Guestbook (index 3)
    if (currentIndex === 3) {
      const gbList = document.querySelector('.guestbook-list');
      if (gbList) {
        const isAtTop = gbList.scrollTop <= 0;
        const isAtBottom = gbList.scrollTop + gbList.clientHeight >= gbList.scrollHeight - 1;

        if (direction === 'down' && !isAtBottom) return; // Let internal scroll happen
        if (direction === 'up' && !isAtTop) return; // Let internal scroll happen
      }
    }

    let nextIndex = currentIndex;
    if (direction === 'down' && currentIndex < sections.length) {
      nextIndex = currentIndex + 1;
    } else if (direction === 'up' && currentIndex > 0) {
      nextIndex = currentIndex - 1;
    }

    if (nextIndex !== currentIndex) {
      isLocked.current = true;
      setCurrentIndex(nextIndex);

      // Calculate target: each section is 100dvh
      const vh = window.innerHeight;
      const targetY = nextIndex * vh;

      window.scrollTo({
        top: targetY,
        behavior: 'smooth'
      });

      // Unlock after transition time
      setTimeout(() => {
        isLocked.current = false;
      }, 800);
    }
  }, [currentIndex, sections.length]);

  useEffect(() => {
    // Dynamic Title
    document.title = `${weddingInfo.groom.name} ♥ ${weddingInfo.bride.name} 저희 결혼합니다`;

    // Attempt to update meta tags (note: some scrapers may not see this)
    const updateMeta = (name, content, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        if (property) el.setAttribute('property', name);
        else el.setAttribute('name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    const desc = `${weddingInfo.date}, ${weddingInfo.location}`;
    updateMeta('description', desc);
    updateMeta('og:title', document.title, true);
    updateMeta('og:description', desc, true);
    updateMeta('twitter:title', document.title);
    updateMeta('twitter:description', desc);

    const isInsideInteractive = (target) => {
      if (!target) return false;
      const interactiveTags = ['INPUT', 'TEXTAREA', 'BUTTON', 'A'];
      if (interactiveTags.includes(target.tagName)) return true;
      if (target.closest('form') || target.closest('.guestbook-list')) return true;
      return false;
    };

    const onWheel = (e) => {
      if (isInsideInteractive(e.target)) return;

      // Sensitivity threshold for wheel
      if (Math.abs(e.deltaY) < 10) return;

      // Don't prevent default if we're inside Guestbook and it needs to scroll
      if (currentIndex === 3) {
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
      if (isInsideInteractive(e.target)) return;

      if (isLocked.current) {
        e.preventDefault();
        return;
      }

      // Guestbook internal scroll check for touch
      if (currentIndex === 3) {
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
      if (isInsideInteractive(e.target)) return;

      const deltaY = lastTouchY.current - e.changedTouches[0].clientY;
      // Increased sensitivity (threshold 20 instead of 50)
      if (Math.abs(deltaY) > 20) {
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
  }, [currentIndex, handleSnap]);

  return (
    <div className="bg-wedding-bg">
      <Petals count={20} />
      <ProgressBar />

      {/* Scrollable area */}
      <div ref={containerRef} className="relative" style={{ height: `${sections.length * 100}dvh` }}>
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

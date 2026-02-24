import React, { useState, useEffect } from 'react';

const ProgressBar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const root = document.getElementById('root');
    if (!root) return;

    const handleScroll = () => {
      const totalHeight = root.scrollHeight - root.clientHeight;
      if (totalHeight === 0) return;

      const progress = (root.scrollTop / totalHeight) * 100;
      setScrollProgress(progress);
    };

    root.addEventListener('scroll', handleScroll);
    return () => root.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-100 max-w-[480px] mx-auto">
      <div
        className="h-full bg-wedding-accent transition-all duration-300 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
};

export default ProgressBar;

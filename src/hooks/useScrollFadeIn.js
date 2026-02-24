import { useRef, useEffect } from 'react';

const useScrollFadeIn = () => {
  const dom = useRef();

  useEffect(() => {
    let observer;
    const { current } = dom;

    if (current) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              current.classList.add('active');
            }
          });
        },
        { threshold: 0.1 }
      );
      observer.observe(current);
    }

    return () => observer && observer.disconnect();
  }, []);

  return {
    ref: dom,
    className: 'reveal',
  };
};

export default useScrollFadeIn;

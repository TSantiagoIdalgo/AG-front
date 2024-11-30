import { useEffect, useState } from 'react';

export const useScroll = () => {
  const initState = 0;
  const [scrollY, setScrollY] = useState(initState);

  const handleScroll = () => setScrollY(window.scrollY);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return { scrollY };
};
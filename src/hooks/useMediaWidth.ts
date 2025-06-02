import { useEffect, useState } from 'react';

export const useMediaWidth = (maxWidth?: number) => {
  const [isBelowWidth, handleIsBelowWidth] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${maxWidth ?? '768'}px)`);
      
    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        handleIsBelowWidth(true);
      } else {
        handleIsBelowWidth(false);
      }
    };
      
    mediaQuery.addEventListener('change', handleChange);
      
    // Verificación inicial
    if (mediaQuery.matches) {
      // Ya está en modo chico
    }
      
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [maxWidth]);
      
  return { isBelowWidth };
};
import { useSyncExternalStore } from 'react';

// Remplace useMediaQuery de MUI : true tant que la media query correspond
export default function useMediaQuery(query) {
  return useSyncExternalStore(
    listener => {
      const mql = window.matchMedia(query);
      mql.addEventListener('change', listener);
      return () => mql.removeEventListener('change', listener);
    },
    () => window.matchMedia(query).matches,
  );
}

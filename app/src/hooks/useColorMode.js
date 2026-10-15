import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'color-mode';

function readStoredMode() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === 'light' ? 'light' : 'dark';
  } catch {
    return 'dark';
  }
}

// Light/dark mode, applied as data-theme on <html> (see styles/global.css) and remembered per browser.
export default function useColorMode() {
  const [mode, setMode] = useState(readStoredMode);

  useEffect(() => {
    document.documentElement.dataset.theme = mode;
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      // Storage unavailable (private browsing): the choice just won't persist
    }
  }, [mode]);

  const toggleMode = useCallback(() => setMode(prev => (prev === 'dark' ? 'light' : 'dark')), []);

  return { mode, toggleMode };
}

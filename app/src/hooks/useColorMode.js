import { useCallback, useSyncExternalStore } from 'react';

const STORAGE_KEY = 'color-mode';

// Sombre par défaut ; clair seulement si le visiteur l'a choisi
function readStoredMode() {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'light' ? 'light' : 'dark';
  } catch {
    return 'dark';
  }
}

// État partagé : la Navbar (bouton) et les pages Astryx (<Theme mode>) lisent la même valeur
let mode = readStoredMode();
const listeners = new Set();
document.documentElement.dataset.theme = mode;

function setMode(next) {
  mode = next;
  document.documentElement.dataset.theme = mode;
  try {
    localStorage.setItem(STORAGE_KEY, mode);
  } catch {
    // Storage unavailable (private browsing): the choice just won't persist
  }
  listeners.forEach(listener => listener());
}

// Light/dark mode, applied as data-theme on <html> (see styles/global.css) and remembered per browser.
export default function useColorMode() {
  const current = useSyncExternalStore(
    listener => { listeners.add(listener); return () => listeners.delete(listener); },
    () => mode,
  );
  const toggleMode = useCallback(() => setMode(mode === 'dark' ? 'light' : 'dark'), []);
  return { mode: current, toggleMode };
}

import { useSyncExternalStore } from 'react';

// État global du mode inspection : partagé entre le bouton de la Navbar et l'overlay (Inspector).
let active = false;
const listeners = new Set();

export function setInspecting(value) {
  active = value;
  listeners.forEach(listener => listener());
}

export function useInspecting() {
  return useSyncExternalStore(
    listener => { listeners.add(listener); return () => listeners.delete(listener); },
    () => active,
  );
}

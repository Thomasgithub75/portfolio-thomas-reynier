/**
 * @component Intro
 * @usage Splash screen affiché à l'arrivée d'un visiteur sur le site.
 *
 * Séquence : le nom apparaît (flou → net), puis chaque phrase de `lines`
 * s'affiche l'une après l'autre en violet IA, puis l'écran s'efface en fondu.
 * Un clic n'importe où permet de passer l'intro.
 *
 * Cas d'usage :
 *   - Monté une seule fois dans App.jsx, au-dessus du routeur
 *   - Ne pas l'utiliser à l'intérieur d'une page : il couvre tout l'écran
 *
 * Props :
 *   name    — texte principal (blanc)
 *   lines   — phrases affichées sous le nom, en séquence
 *   once    — true : joué une seule fois par session de navigation
 *   onDone  — callback appelé quand l'intro a disparu
 *
 * Accessibilité : respecte prefers-reduced-motion (intro quasi instantanée),
 * aria-hidden car purement décoratif (le contenu est répété dans la page).
 */
import { useEffect, useRef, useState } from 'react';
import { tokens } from '../../theme/theme';
import './Intro.css';

const STORAGE_KEY = 'introSeen';
const NAME_DELAY = 800;   // apparition de la 1re phrase (ms)
const LINE_STEP = 1300;   // durée d'affichage de chaque phrase (ms)
const FADE_OUT = 650;     // durée du fondu de sortie (ms)
const DEFAULT_LINES = ['Systèmes, produits, IA.', 'L’IA au service des équipes design'];

function alreadySeen() {
  try { return sessionStorage.getItem(STORAGE_KEY) === '1'; } catch { return false; }
}

function prefersReducedMotion() {
  return typeof window !== 'undefined'
    && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
}

export default function Intro({
  name = 'Thomas Reynier',
  lines = DEFAULT_LINES,
  once = true,
  onDone,
}) {
  const [visible, setVisible] = useState(() => !(once && alreadySeen()));
  const [leaving, setLeaving] = useState(false);
  const [current, setCurrent] = useState(-1);
  const onDoneRef = useRef(onDone);
  const count = lines.length;

  useEffect(() => { onDoneRef.current = onDone; }, [onDone]);

  useEffect(() => {
    if (!visible) return undefined;
    if (once) { try { sessionStorage.setItem(STORAGE_KEY, '1'); } catch { /* stockage indisponible */ } }

    const reduced = prefersReducedMotion();
    const start = reduced ? 0 : NAME_DELAY;
    const step = reduced ? 0 : LINE_STEP;
    const timers = Array.from({ length: count }, (_, i) => setTimeout(() => setCurrent(i), start + i * step));
    timers.push(setTimeout(() => setLeaving(true), reduced ? 300 : start + count * step + 300));

    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = 'hidden';

    return () => {
      timers.forEach(clearTimeout);
      root.style.overflow = prevOverflow;
    };
  }, [visible, once, count]);

  useEffect(() => {
    if (!leaving) return undefined;
    document.documentElement.style.overflow = '';
    const t = setTimeout(() => {
      setVisible(false);
      onDoneRef.current?.();
    }, prefersReducedMotion() ? 0 : FADE_OUT);
    return () => clearTimeout(t);
  }, [leaving]);

  if (!visible) return null;

  return (
    <div
      className={`intro${leaving ? ' is-leaving' : ''}`}
      aria-hidden="true"
      onClick={() => setLeaving(true)}
      style={{ '--intro-violet-1': tokens.aiViolet, '--intro-violet-2': tokens.aiVioletLight }}
    >
      <div className="intro-inner">
        <p className="intro-name">{name}</p>
        <div className="intro-tagline">
          {lines.map((line, i) => (
            <span key={line} className={i === current ? 'is-on' : i < current ? 'is-off' : ''}>
              {line}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

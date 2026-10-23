/**
 * @component StreamingText
 * @usage Texte court révélé comme une réponse de LLM (sous-titre du hero).
 *
 * Deux variantes :
 *   "stream" — les segments apparaissent un par un avec un léger flou (streaming de tokens).
 *   "type"   — le texte est tapé lettre par lettre avec un curseur ; des « détours » (typos)
 *              permettent de taper un mot, l'effacer, puis reprendre.
 * Un statut « Génération… » s'affiche sous le texte pendant l'animation.
 *
 * Props :
 *   segments  — tableau de { text, muted? } ; muted = segment secondaire (séparateur « · »)
 *   variant   — "stream" (défaut) | "type"
 *   typos     — variante "type" : [{ at, text }] ; à la position `at` du texte final,
 *               tape `text`, marque une pause, l'efface, puis continue
 *   delay     — attente avant le début, en ms (défaut 600)
 *   interval  — "stream" : délai entre deux segments (défaut 220) · "type" : délai par lettre (défaut 55)
 *   status    — libellé affiché pendant l'animation (défaut « Génération… »)
 *   endCaret  — curseur qui clignote quelques fois à la fin, puis disparaît (défaut true)
 *   replayKey — change cette valeur pour rejouer l'animation (page Design System)
 *   style     — styles du conteneur (taille, couleur, marges)
 *
 * Accessibilité : le texte complet est exposé via aria-label ; l'animation est coupée si
 * l'utilisateur a demandé à réduire les animations. Si l'intro du site est en cours,
 * l'animation attend sa fin (événement « intro:done »).
 */
import { useEffect, useState } from 'react';
import './StreamingText.css';

function prefersReducedMotion() {
  return typeof window !== 'undefined'
    && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
}

// Builds the "type" timeline: each step is the visible state { n: chars of the final text, wrong: detour text }.
function buildTypeSteps(total, typos, perChar) {
  const steps = [];
  let t = 0;
  for (let i = 0; i <= total; i++) {
    const typo = typos.find(x => x.at === i);
    if (typo) {
      for (let k = 1; k <= typo.text.length; k++) { t += perChar; steps.push({ t, n: i, wrong: typo.text.slice(0, k) }); }
      t += 420;
      for (let k = typo.text.length - 1; k >= 0; k--) { t += 38; steps.push({ t, n: i, wrong: typo.text.slice(0, k) }); }
      t += 160;
    }
    if (i < total) { t += perChar; steps.push({ t, n: i + 1, wrong: '' }); }
  }
  return { steps, duration: t };
}

const NO_TYPOS = [];

export default function StreamingText({
  segments,
  variant = 'stream',
  typos = NO_TYPOS,
  delay = 600,
  interval,
  status = 'Génération…',
  endCaret = true,
  replayKey,
  style,
}) {
  const isType = variant === 'type';
  const label = segments.map(s => s.text).join('');
  const total = label.length;
  const reduced = prefersReducedMotion();

  const [shown, setShown] = useState(reduced ? segments.length : 0);                          // "stream"
  const [typed, setTyped] = useState(reduced ? { n: total, wrong: '' } : { n: 0, wrong: '' }); // "type"
  const [running, setRunning] = useState(!reduced);
  const [caret, setCaret] = useState(false); // end-of-animation blink

  useEffect(() => {
    if (prefersReducedMotion()) {
      setShown(segments.length); setTyped({ n: total, wrong: '' }); setRunning(false); setCaret(false);
      return undefined;
    }
    setShown(0); setTyped({ n: 0, wrong: '' }); setRunning(true); setCaret(false);

    const timers = [];
    const at = (ms, fn) => timers.push(setTimeout(fn, ms));
    const start = () => {
      let end;
      if (isType) {
        const { steps, duration } = buildTypeSteps(total, typos, interval ?? 55);
        steps.forEach(s => at(delay + s.t, () => setTyped({ n: s.n, wrong: s.wrong })));
        end = delay + duration;
      } else {
        const step = interval ?? 220;
        segments.forEach((_, i) => at(delay + i * step, () => setShown(i + 1)));
        end = delay + (segments.length - 1) * step;
      }
      at(end + 250, () => { setRunning(false); if (endCaret) setCaret(true); });
      if (endCaret) at(end + 250 + 1800, () => setCaret(false));
    };

    const introPlaying = document.documentElement.dataset.intro === 'playing';
    if (introPlaying) window.addEventListener('intro:done', start, { once: true });
    else start();

    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener('intro:done', start);
    };
  }, [segments, isType, typos, total, delay, interval, endCaret, replayKey]);

  // "type": cut each segment to the typed prefix, keeping its muted colour
  let typedContent = null;
  if (isType) {
    let left = typed.n;
    typedContent = segments.map((s, i) => {
      const part = s.text.slice(0, Math.max(0, left));
      left -= s.text.length;
      return part ? <span key={i} className={s.muted ? 'is-muted' : undefined}>{part}</span> : null;
    });
  }

  const caretClass = running && isType ? ' is-typing' : caret ? ' is-on' : '';

  return (
    <p className="streaming-text" data-ds={`StreamingText / ${variant}`} aria-label={label} style={style}>
      {isType ? (
        <span aria-hidden="true" className="streaming-text-typed">
          {typedContent}{typed.wrong}
        </span>
      ) : segments.map((s, i) => (
        <span
          key={i}
          aria-hidden="true"
          className={`streaming-text-seg${s.muted ? ' is-muted' : ''}${i < shown ? ' is-in' : ''}`}
        >
          {s.text}
        </span>
      ))}
      {endCaret && <span aria-hidden="true" className={`streaming-text-caret${caretClass}`} />}
      <span aria-hidden="true" className={`streaming-text-status${running ? ' is-on' : ''}`}>
        <span className="streaming-text-dot" />{status}
      </span>
    </p>
  );
}

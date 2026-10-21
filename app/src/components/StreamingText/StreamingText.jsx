/**
 * @component StreamingText
 * @usage Texte court révélé mot par mot, comme la réponse d'un LLM en streaming (sous-titre du hero).
 *
 * Les segments apparaissent un par un avec un léger flou, pendant qu'un statut « Génération… »
 * s'affiche sous le texte. L'espace final est réservé dès le départ : la mise en page ne bouge pas.
 *
 * Props :
 *   segments  — tableau de { text, muted? } ; muted = segment secondaire (séparateur « · »)
 *   delay     — attente avant le premier segment, en ms (défaut 600)
 *   interval  — délai entre deux segments, en ms (défaut 220)
 *   status    — libellé affiché pendant le streaming (défaut « Génération… »)
 *   replayKey — change cette valeur pour rejouer l'animation (page Design System)
 *   style     — styles du conteneur (taille, couleur, marges)
 *
 * Accessibilité : le texte complet est exposé via aria-label ; l'animation est coupée si
 * l'utilisateur a demandé à réduire les animations. Si l'intro du site est en cours,
 * le streaming attend sa fin (événement « intro:done »).
 */
import { useEffect, useState } from 'react';
import './StreamingText.css';

function prefersReducedMotion() {
  return typeof window !== 'undefined'
    && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
}

export default function StreamingText({
  segments,
  delay = 600,
  interval = 220,
  status = 'Génération…',
  replayKey,
  style,
}) {
  const reduced = prefersReducedMotion();
  const [shown, setShown] = useState(reduced ? segments.length : 0);
  const [streaming, setStreaming] = useState(!reduced);

  useEffect(() => {
    if (prefersReducedMotion()) { setShown(segments.length); setStreaming(false); return undefined; }
    setShown(0);
    setStreaming(true);

    const timers = [];
    const start = () => {
      segments.forEach((_, i) => {
        timers.push(setTimeout(() => setShown(i + 1), delay + i * interval));
      });
      timers.push(setTimeout(() => setStreaming(false), delay + segments.length * interval + 250));
    };

    const introPlaying = document.documentElement.dataset.intro === 'playing';
    if (introPlaying) window.addEventListener('intro:done', start, { once: true });
    else start();

    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener('intro:done', start);
    };
  }, [segments, delay, interval, replayKey]);

  const label = segments.map(s => s.text).join('');

  return (
    <p className="streaming-text" aria-label={label} style={style}>
      {segments.map((s, i) => (
        <span
          key={i}
          aria-hidden="true"
          className={`streaming-text-seg${s.muted ? ' is-muted' : ''}${i < shown ? ' is-in' : ''}`}
        >
          {s.text}
        </span>
      ))}
      <span aria-hidden="true" className={`streaming-text-status${streaming ? ' is-on' : ''}`}>
        <span className="streaming-text-dot" />{status}
      </span>
    </p>
  );
}

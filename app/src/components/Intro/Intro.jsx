/**
 * @component Intro
 * @usage Splash screen affiché à l'arrivée d'un visiteur sur le site.
 *
 * Séquence « prompt → réponse » :
 *   1. Le nom apparaît (flou → net)
 *   2. Un champ de chat apparaît et la question s'y tape, puis s'envoie
 *   3. « Réflexion… » avec un halo violet qui respire
 *   4. La réponse s'écrit mot par mot (streaming), suivie des tags générés
 *   5. Fondu de sortie vers le site
 * Un clic n'importe où permet de passer l'intro.
 *
 * Cas d'usage :
 *   - Monté une seule fois dans App.jsx, au-dessus du routeur
 *   - Ne pas l'utiliser à l'intérieur d'une page : il couvre tout l'écran
 *
 * Props :
 *   name      — texte principal (blanc)
 *   question  — question tapée dans le champ de chat
 *   answer    — réponse affichée en streaming (violet)
 *   tags      — pastilles affichées sous la réponse
 *   once      — true : joué une seule fois par session de navigation
 *   onDone    — callback appelé quand l'intro a disparu
 *
 * Accessibilité : respecte prefers-reduced-motion (état final affiché directement),
 * aria-hidden car purement décoratif (le contenu est repris dans la page).
 */
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import './Intro.css';

const STORAGE_KEY = 'introSeen';
const DEFAULT_TAGS = ['Systèmes', 'Produits', 'IA'];

const wait = (ms, signal) => new Promise((resolve, reject) => {
  const t = setTimeout(resolve, ms);
  signal.addEventListener('abort', () => { clearTimeout(t); reject(new Error('aborted')); }, { once: true });
});

function alreadySeen() {
  try { return sessionStorage.getItem(STORAGE_KEY) === '1'; } catch { return false; }
}

function prefersReducedMotion() {
  return typeof window !== 'undefined'
    && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
}

// Accent IA de l'intro (dégradé de la réponse, halo)
const AI_VIOLET = '#8B5CF6';
const AI_VIOLET_LIGHT = '#C084FC';

export default function Intro({
  name = 'Thomas Reynier',
  question = 'Que fait Thomas ?',
  answer = 'L’IA au service des équipes design',
  tags = DEFAULT_TAGS,
  once = true,
  onDone,
}) {
  const [visible, setVisible] = useState(() => !(once && alreadySeen()));
  const [leaving, setLeaving] = useState(false);
  const [prompt, setPrompt] = useState({ state: 'hidden', text: '' }); // hidden | on | sent | gone
  const [glow, setGlow] = useState(false);
  const [phase, setPhase] = useState('idle');                          // idle | thinking | answering
  const [words, setWords] = useState(0);
  const [caretSolid, setCaretSolid] = useState(true);
  const [tagCount, setTagCount] = useState(0);
  const onDoneRef = useRef(onDone);

  const answerWords = answer.match(/\S+\s*/g) ?? [];
  const wordCount = answerWords.length;
  const tagTotal = tags.length;

  useEffect(() => { onDoneRef.current = onDone; }, [onDone]);

  // Lets page animations (e.g. the hero StreamingText) wait for the intro: flag set before
  // any page effect runs, cleared with an 'intro:done' event once the overlay starts leaving.
  useLayoutEffect(() => {
    if (!visible) return;
    document.documentElement.dataset.intro = 'playing';
  }, [visible]);

  // Déroulé de la séquence
  useEffect(() => {
    if (!visible) return undefined;
    if (once) { try { sessionStorage.setItem(STORAGE_KEY, '1'); } catch { /* stockage indisponible */ } }

    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = 'hidden';

    const ctrl = new AbortController();
    const { signal } = ctrl;

    async function run() {
      if (prefersReducedMotion()) {
        setPhase('answering'); setWords(wordCount); setTagCount(tagTotal); setCaretSolid(false);
        await wait(1500, signal);
        setLeaving(true);
        return;
      }
      await wait(800, signal);
      setPrompt({ state: 'on', text: '' });
      await wait(350, signal);
      for (let i = 1; i <= question.length; i++) {
        setPrompt({ state: 'on', text: question.slice(0, i) });
        await wait(45, signal);
      }
      await wait(250, signal);
      setPrompt((p) => ({ ...p, state: 'sent' }));
      setGlow(true);
      await wait(350, signal);
      setPrompt((p) => ({ ...p, state: 'gone' }));
      await wait(300, signal);
      setPhase('thinking');
      await wait(700, signal);
      setPhase('answering');
      for (let i = 1; i <= wordCount; i++) {
        setWords(i);
        await wait(70 + Math.random() * 90, signal); // rythme irrégulier, comme un vrai modèle
      }
      setCaretSolid(false);
      for (let i = 1; i <= tagTotal; i++) {
        await wait(160, signal);
        setTagCount(i);
      }
      await wait(1300, signal);
      setLeaving(true);
    }
    run().catch(() => { /* séquence interrompue (clic ou démontage) */ });

    return () => {
      ctrl.abort();
      root.style.overflow = prevOverflow;
    };
  }, [visible, once, question, wordCount, tagTotal]);

  // Sortie
  useEffect(() => {
    if (!leaving) return undefined;
    document.documentElement.style.overflow = '';
    delete document.documentElement.dataset.intro;
    window.dispatchEvent(new Event('intro:done'));
    const t = setTimeout(() => {
      setVisible(false);
      onDoneRef.current?.();
    }, prefersReducedMotion() ? 0 : 650);
    return () => clearTimeout(t);
  }, [leaving]);

  if (!visible) return null;

  const promptClass = {
    hidden: '', on: ' is-on', sent: ' is-on is-sent', gone: ' is-on is-sent is-gone',
  }[prompt.state];

  return (
    <div
      className={`intro${leaving ? ' is-leaving' : ''}`}
      aria-hidden="true"
      onClick={() => setLeaving(true)}
      style={{ '--intro-violet-1': AI_VIOLET, '--intro-violet-2': AI_VIOLET_LIGHT }}
    >
      <div className={`intro-glow${glow ? ' is-on' : ''}`} />
      <div className="intro-inner">
        <p className="intro-name">{name}</p>

        <div className="intro-stage">
          <div className={`intro-prompt${promptClass}`}>
            <span className="intro-prompt-text">{prompt.text}</span>
            <span className="intro-send"><ArrowUpwardIcon /></span>
          </div>

          {phase !== 'idle' && (
            <div className="intro-answer">
              <div className="intro-line">
                <AutoAwesomeIcon className={`intro-spark${phase === 'thinking' ? ' is-thinking' : ''}`} />
                {phase === 'thinking' ? (
                  <span className="intro-thinking">Réflexion…</span>
                ) : (
                  <>
                    {answerWords.slice(0, words).map((w, i) => (
                      <span key={i} className="intro-tok">{w}</span>
                    ))}
                    <i className={`intro-caret${caretSolid ? ' is-solid' : ''}`} />
                  </>
                )}
              </div>
              <div className="intro-tags">
                {tags.slice(0, tagCount).map((t) => (
                  <span key={t} className="intro-tag">{t}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

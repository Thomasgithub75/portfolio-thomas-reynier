import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import PushPinOutlined from '@mui/icons-material/PushPinOutlined';
import { useInspecting, setInspecting } from '../../hooks/useInspector';
import { tokens as themeTokens } from '../../theme/theme';
import './Inspector.css';

// ── Mode inspection ───────────────────────────────────────────────────────────
// Survol d'un élément → nom du composant, dimensions, padding, typo et couleurs,
// avec le nom du token du design system (comme le Dev Mode de Figma).
// Les composants React portent un attribut data-ds ; les blocs de mise en page
// sont nommés via CLASS_NAMES.

const CLASS_NAMES = {
  'nav': 'Navbar',
  'nav-brand': 'Navbar / logo',
  'nav-link': 'Navbar / lien',
  'nav-mode-toggle': 'Button / mode',
  'btn-brand': 'Button / brand',
  'cta-btn-primary': 'Button / primary',
  'cta-btn-ghost': 'Button / ghost',
  'hero-stat': 'Stat',
  'hero-point': 'Value point',
  'hero-status-mobile': 'Status',
  'home-hero-image': 'Avatar',
  'section-label': 'Section label',
  'sec-label': 'Section label',
  'badge': 'Badge',
  'home-project-card': 'Project card',
  'project-card-case': 'Project card / case',
  'p-tag': 'Tag',
  'tag': 'Tag',
  'htag': 'Tag',
  'contact-link-item': 'Contact link',
  'footer': 'Footer',
  'footer-icon': 'Icon button',
  'divider': 'Divider',
  'quote': 'Quote',
  'step': 'Step',
  'mission-banner': 'Mission banner',
  'toc': 'Table of contents',
  'illustration-item': 'Illustration',
  'stat': 'Stat',
  'back-link': 'Link / retour',
  'case-header': 'Case header',
  'case-cta': 'CTA block',
};

const TAG_NAMES = {
  H1: 'Heading / H1', H2: 'Heading / H2', H3: 'Heading / H3', H4: 'Heading / H4',
  P: 'Text / paragraph', SPAN: 'Text', STRONG: 'Text / bold', LI: 'List item',
  IMG: 'Image', svg: 'Icon', A: 'Link', BUTTON: 'Button', INPUT: 'Input',
  TEXTAREA: 'Textarea', SECTION: 'Section', LABEL: 'Label',
};

// Quand plusieurs tokens partagent la même valeur, on choisit selon le rôle de la couleur
const ROLE_HINTS = {
  text: ['--color-on-accent', '--color-text-primary', '--color-text-secondary', '--color-text-accent',
    '--on-brand', '--on-accent', '--text', '--muted', '--ink', '--blue', 'fg', 'text'],
  fill: ['--color-background-surface', '--color-background-card', '--color-background-body', '--color-background-muted',
    '--color-accent', '--bg', '--surface', '--bg-soft', '--panel', 'background', 'bg', '--blue'],
  border: ['--color-border', '--color-border-emphasized', '--border', 'border', '--blue'],
};

const MAX_DEPTH = 3;
const UI = '[data-inspector-ui]';
const PANEL_WIDTH = 260;
const SAFE_TOP = 84;     // sous la Navbar flottante
const SAFE_BOTTOM = 70;  // au-dessus du bandeau d'aide

// ── Tokens : valeur calculée → nom ────────────────────────────────────────────
// Deux design systems cohabitent : les variables du site (:root, global.css) et
// celles d'Astryx, déclarées sous le conteneur <Theme> (data-astryx-theme).

const tokenCache = new Map();
let varNames = null;

// Toutes les variables CSS déclarées, triées par origine (site ou Astryx)
function collectVarNames() {
  if (varNames) return varNames;
  const site = new Set();
  const astryx = new Set();
  const walk = rules => {
    for (const rule of rules) {
      if (rule.cssRules) walk(rule.cssRules); // @layer, @media, @scope
      if (!rule.style) continue;
      const selector = rule.selectorText || '';
      const isSite = selector === ':root' || selector.startsWith(':root[');
      for (const prop of rule.style) if (prop.startsWith('--')) (isSite ? site : astryx).add(prop);
    }
  };
  for (const sheet of document.styleSheets) {
    try { walk(sheet.cssRules); } catch { /* feuilles externes (Google Fonts) */ }
  }
  varNames = { site: [...site], astryx: [...astryx] };
  return varNames;
}

function buildTokens(node) {
  const astryxRoot = node.closest('[data-astryx-theme]');
  const theme = document.documentElement.dataset.theme || 'light';
  const key = astryxRoot ? `astryx|${astryxRoot.dataset.astryxTheme}|${getComputedStyle(astryxRoot).colorScheme}` : `site|${theme}`;
  if (tokenCache.has(key)) return tokenCache.get(key);

  // La sonde est placée dans le bon contexte : var() et light-dark() s'y résolvent comme sur l'élément
  const context = astryxRoot || document.body;
  const probe = document.createElement('div');
  probe.style.display = 'none';
  context.appendChild(probe);
  const resolve = (prop, value) => {
    probe.style[prop] = '';
    probe.style[prop] = value;
    return probe.style[prop] ? getComputedStyle(probe)[prop] : null;
  };

  const contextStyle = getComputedStyle(context);
  const colors = new Map(); // rgb → [noms de tokens]
  const radii = new Map();
  const gradients = new Map();
  const addColor = (rgb, name) => colors.set(rgb, [...(colors.get(rgb) || []), name]);
  const names = collectVarNames();

  for (const name of astryxRoot ? names.astryx : names.site) {
    const raw = contextStyle.getPropertyValue(name).trim();
    if (!raw) continue;
    if (raw.includes('gradient')) { const g = resolve('backgroundImage', `var(${name})`); if (g) gradients.set(g.replace(/\s+/g, ''), name); continue; }
    if (name.includes('radius')) { const r = resolve('borderTopLeftRadius', `var(${name})`); if (r && !radii.has(r)) radii.set(r, name); continue; }
    if (!/^(#|rgb|hsl|oklch|color|light-dark|var\(|transparent|[a-z]+$)/i.test(raw)) continue;
    const rgb = resolve('color', `var(${name})`);
    if (rgb) addColor(rgb, name);
  }

  // Tokens MUI (theme.js) : utilisés par les composants React du site, en second choix
  if (!astryxRoot) {
    const addTheme = (obj, prefix) => {
      for (const [k, value] of Object.entries(obj)) {
        const name = `${prefix}${/^\d/.test(k) ? `[${k}]` : `.${k}`}`;
        if (typeof value === 'object') addTheme(value, name);
        else { const rgb = resolve('color', value); if (rgb) addColor(rgb, name); }
      }
    };
    addTheme(themeTokens, 'tokens');
  }

  probe.remove();
  const tokens = { source: astryxRoot ? 'Astryx' : 'Portfolio', colors, radii, gradients };
  tokenCache.set(key, tokens);
  return tokens;
}

// Token CSS d'abord (--x), puis celui dont le nom correspond le mieux au rôle
function tokenFor(names, role) {
  if (!names?.length) return null;
  const css = names.filter(n => n.startsWith('--'));
  const pool = css.length ? css : names;
  for (const hint of ROLE_HINTS[role]) {
    const match = pool.find(n => (hint.startsWith('--') ? n === hint : n.toLowerCase().includes(hint)));
    if (match) return match;
  }
  return pool[0];
}

// ── Lecture d'un élément ──────────────────────────────────────────────────────

function isTransparent(color) {
  return !color || color === 'transparent' || /rgba\(.*,\s*0\)$/.test(color);
}

// « astryx-toggle-button » → « ToggleButton »
function astryxName(node) {
  const cls = [...(node.classList || [])].filter(c => c.startsWith('astryx-')).pop();
  if (!cls) return null;
  const name = cls.slice(7).split('-').map(w => w[0].toUpperCase() + w.slice(1)).join('');
  const variant = node.dataset.variant || node.dataset.type;
  return variant ? `${name} / ${variant}` : name;
}

function nameFor(el) {
  let node = el;
  for (let depth = 0; node && node !== document.body && depth <= MAX_DEPTH; depth++) {
    if (node.dataset?.ds) return { node, name: node.dataset.ds };
    const astryx = astryxName(node);
    if (astryx) return { node, name: astryx };
    const cls = [...(node.classList || [])].find(c => CLASS_NAMES[c]);
    if (cls) return { node, name: CLASS_NAMES[cls] };
    node = node.parentElement;
  }
  return { node: el, name: TAG_NAMES[el.tagName] || el.tagName.toLowerCase() };
}

function px(value) {
  const n = parseFloat(value);
  return Number.isFinite(n) ? Math.round(n * 10) / 10 : 0;
}

function shorthand([t, r, b, l]) {
  if (t === r && r === b && b === l) return `${t}`;
  if (t === b && r === l) return `${t} · ${r}`;
  return `${t} · ${r} · ${b} · ${l}`;
}

function describe(leaf) {
  // Les morceaux d'un SVG remontent à l'icône entière
  const el = leaf.closest('svg') || leaf;
  const { node, name } = nameFor(el);
  const tk = buildTokens(node);
  const box = getComputedStyle(node);
  const text = getComputedStyle(el);
  const color = (value, role) => ({ value, token: tokenFor(tk.colors.get(value), role) });

  const rows = [];
  const hasText = [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim());
  if (hasText) {
    const family = text.fontFamily.split(',')[0].replace(/['"]/g, '');
    const size = px(text.fontSize);
    const lh = text.lineHeight === 'normal' ? 'auto' : px(text.lineHeight);
    rows.push({ label: 'Typo', text: `${family} · ${text.fontWeight} · ${size} / ${lh}` });
    rows.push({ label: 'Texte', swatch: color(text.color, 'text') });
  }

  const gradientToken = tk.gradients.get(box.backgroundImage.replace(/\s+/g, ''));
  // Un dégradé sans token sur une couleur de fond = calque d'état (survol) : on montre la couleur
  if (box.backgroundImage.includes('gradient') && (gradientToken || isTransparent(box.backgroundColor))) {
    rows.push({ label: 'Fond', text: gradientToken || 'Dégradé', gradient: box.backgroundImage });
  } else if (!isTransparent(box.backgroundColor)) {
    rows.push({ label: 'Fond', swatch: color(box.backgroundColor, 'fill') });
  }

  const borderWidth = px(box.borderTopWidth);
  if (borderWidth && box.borderTopStyle !== 'none' && !isTransparent(box.borderTopColor)) {
    rows.push({ label: 'Bordure', swatch: color(box.borderTopColor, 'border'), prefix: `${borderWidth}px` });
  }

  const radius = box.borderTopLeftRadius;
  if (px(radius)) {
    const token = tk.radii.get(radius) || (px(radius) > 999 ? (tk.source === 'Astryx' ? '--radius-full' : '--radius-pill') : null);
    rows.push({ label: 'Rayon', text: token ? `${token} · ${px(radius) > 999 ? 'pill' : px(radius)}` : `${px(radius)}` });
  }

  const padding = ['Top', 'Right', 'Bottom', 'Left'].map(s => px(box[`padding${s}`]));
  if (padding.some(Boolean)) rows.push({ label: 'Padding', text: shorthand(padding) });

  if ((box.display.includes('flex') || box.display.includes('grid')) && px(box.rowGap || box.gap)) {
    rows.push({ label: 'Gap', text: `${px(box.columnGap || box.gap)}` });
  }

  const rect = node.getBoundingClientRect();
  return { node, name, rect, padding, rows, source: tk.source };
}

// ── Composant ─────────────────────────────────────────────────────────────────

export default function Inspector() {
  const active = useInspecting();
  const [info, setInfo] = useState(null);
  const [pinned, setPinned] = useState(false);
  const pinnedRef = useRef(false);
  const lastLeaf = useRef(null);

  useEffect(() => {
    if (!active) return undefined;
    document.documentElement.classList.add('is-inspecting');
    let frame = 0;

    const inspect = leaf => {
      if (!leaf || leaf === document.documentElement || leaf === document.body || leaf.closest(UI)) return;
      lastLeaf.current = leaf;
      setInfo(describe(leaf));
    };
    const schedule = fn => { cancelAnimationFrame(frame); frame = requestAnimationFrame(fn); };

    const onMove = e => {
      if (pinnedRef.current) return;
      schedule(() => inspect(document.elementFromPoint(e.clientX, e.clientY)));
    };
    const onScroll = () => schedule(() => lastLeaf.current?.isConnected && setInfo(describe(lastLeaf.current)));
    const onClick = e => {
      if (e.target.closest(UI) || e.target.closest('[data-inspector-toggle]')) return;
      e.preventDefault();
      e.stopPropagation();
      pinnedRef.current = !pinnedRef.current;
      setPinned(pinnedRef.current);
      if (!pinnedRef.current) inspect(document.elementFromPoint(e.clientX, e.clientY));
    };
    const onKey = e => { if (e.key === 'Escape') setInspecting(false); };

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('click', onClick, true);
    document.addEventListener('keydown', onKey);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      cancelAnimationFrame(frame);
      document.documentElement.classList.remove('is-inspecting');
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('click', onClick, true);
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      pinnedRef.current = false;
      lastLeaf.current = null;
      setPinned(false);
      setInfo(null);
    };
  }, [active]);

  if (!active) return null;

  return createPortal(
    <div data-inspector-ui className="inspector" aria-live="polite">
      {info && <Overlay info={info} pinned={pinned} />}
      <div className="inspector-hint">
        <span className="inspector-hint-dot" />
        {pinned
          ? 'Élément épinglé · clic pour relâcher'
          : 'Mode inspection · survolez un élément · clic pour épingler'}
        <kbd>Échap</kbd>
      </div>
    </div>,
    document.body,
  );
}

// Place la fiche sous l'élément, sinon au-dessus, à droite, à gauche, sinon dans le coin
function placePanel(rect, height) {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const clampLeft = x => Math.min(Math.max(8, x), vw - PANEL_WIDTH - 8);
  const clampTop = y => Math.min(Math.max(SAFE_TOP, y), vh - SAFE_BOTTOM - height);

  const below = rect.bottom + 30; // laisse la place à l'étiquette de dimensions
  if (below + height <= vh - SAFE_BOTTOM) return { top: below, left: clampLeft(rect.left) };
  const above = rect.top - 10 - height;
  if (above >= SAFE_TOP) return { top: above, left: clampLeft(rect.left) };
  if (rect.right + 12 + PANEL_WIDTH <= vw - 8) return { top: clampTop(rect.top), left: rect.right + 12 };
  if (rect.left - 12 - PANEL_WIDTH >= 8) return { top: clampTop(rect.top), left: rect.left - 12 - PANEL_WIDTH };
  return { top: vh - SAFE_BOTTOM - height, left: vw - PANEL_WIDTH - 16 };
}

function Overlay({ info, pinned }) {
  const { rect, padding: [pt, pr, pb, pl], name, rows, source } = info;
  const panelRef = useRef(null);
  const strip = (style) => <div className="inspector-pad" style={style} />;

  // Positionné après rendu : la hauteur de la fiche dépend de ses lignes
  useLayoutEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    const { top, left } = placePanel(rect, panel.offsetHeight);
    panel.style.top = `${top}px`;
    panel.style.left = `${left}px`;
  });

  return (
    <>
      <div className="inspector-box" style={{ top: rect.top, left: rect.left, width: rect.width, height: rect.height }}>
        {pt > 0 && strip({ top: 0, left: 0, right: 0, height: pt })}
        {pb > 0 && strip({ bottom: 0, left: 0, right: 0, height: pb })}
        {pl > 0 && strip({ top: pt, bottom: pb, left: 0, width: pl })}
        {pr > 0 && strip({ top: pt, bottom: pb, right: 0, width: pr })}
        <span className="inspector-size">{Math.round(rect.width)} × {Math.round(rect.height)}</span>
      </div>
      <div ref={panelRef} className="inspector-panel" style={{ width: PANEL_WIDTH }}>
        <div className="inspector-panel-head">
          <span className="inspector-name">{name}</span>
          <span className="inspector-head-end">
            {pinned && <PushPinOutlined sx={{ fontSize: 14 }} />}
            <span className={`inspector-source inspector-source--${source.toLowerCase()}`}>{source}</span>
          </span>
        </div>
        {rows.map(row => (
          <div key={row.label} className="inspector-row">
            <span className="inspector-label">{row.label}</span>
            <span className="inspector-value">
              {row.prefix && <span>{row.prefix}</span>}
              {row.swatch && <>
                <span className="inspector-swatch" style={{ background: row.swatch.value }} />
                <code>{row.swatch.token || row.swatch.value}</code>
              </>}
              {row.gradient && <span className="inspector-swatch" style={{ background: row.gradient }} />}
              {row.text && <code>{row.text}</code>}
            </span>
          </div>
        ))}
        {!rows.length && <div className="inspector-row inspector-empty">Aucun style propre</div>}
      </div>
    </>
  );
}

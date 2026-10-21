/**
 * @component Button
 * @usage Action principale ou secondaire sur n'importe quelle page ou feature.
 *
 * Variantes :
 *   "primary"   — CTA principal (dégradé de marque) : générer, envoyer, contacter. Une seule par écran en règle générale.
 *   "secondary" — Action secondaire (tonal : fond teinté, texte accent) : option alternative, LinkedIn, annuler.
 *   "ghost"     — Action tertiaire (lien texte accent) : imprimer, régénérer, voir plus.
 *
 * Tailles : "md" (défaut) pour les CTA standards, "sm" pour les actions dans un toolbar ou une card dense.
 * Accepte startIcon / endIcon (MUI Icons uniquement).
 */
import { useState } from 'react';

// Reads CSS custom properties (see styles/global.css) so the button follows the
// active site theme (light, or the violet dark-mode test) instead of a fixed palette.
// Fallbacks keep the exact current light-mode look if a var is ever missing.
const VARIANTS = {
  // Primary — brand gradient (violet→blue in light, violet→magenta in dark) with a matching glow.
  primary: {
    base:     { background: 'var(--brand-gradient)', color: 'var(--on-brand, #fff)', border: '1px solid transparent', boxShadow: '0 6px 20px -6px var(--brand-glow)' },
    hover:    { background: 'var(--brand-gradient)', color: 'var(--on-brand, #fff)', border: '1px solid transparent', boxShadow: '0 10px 28px -6px var(--brand-glow)', filter: 'brightness(1.08)' },
    pressed:  { background: 'var(--brand-gradient)', color: 'var(--on-brand, #fff)', border: '1px solid transparent', boxShadow: '0 4px 12px -6px var(--brand-glow)', filter: 'brightness(.95)' },
    disabled: { background: 'var(--brand-gradient)', color: 'var(--on-brand, #fff)', border: '1px solid transparent', opacity: 0.45 },
  },
  // Secondary — tonal accent: tinted background, accent text.
  secondary: {
    base:     { background: 'var(--btn2-bg)',       color: 'var(--btn2-fg)', border: '1px solid var(--btn2-border)' },
    hover:    { background: 'var(--btn2-bg-hover)', color: 'var(--btn2-fg)', border: '1px solid var(--btn2-border)' },
    pressed:  { background: 'var(--btn2-bg-hover)', color: 'var(--btn2-fg)', border: '1px solid var(--btn2-border)', transform: 'translateY(1px)' },
    disabled: { background: 'var(--btn2-bg)',       color: 'var(--btn2-fg)', border: '1px solid var(--btn2-border)', opacity: 0.45 },
  },
  // Ghost (tertiary) — accent text link, underlined on hover.
  ghost: {
    base:     { background: 'transparent', color: 'var(--btn3-fg)', border: '1px solid transparent' },
    hover:    { background: 'transparent', color: 'var(--btn3-fg)', border: '1px solid transparent', textDecoration: 'underline', textUnderlineOffset: 4 },
    pressed:  { background: 'transparent', color: 'var(--btn3-fg)', border: '1px solid transparent', textDecoration: 'underline', textUnderlineOffset: 4 },
    disabled: { background: 'transparent', color: 'var(--btn3-fg)', border: '1px solid transparent', opacity: 0.45 },
  },
};

const SIZES = {
  md: { fontSize: 15, padding: '9px 20px', borderRadius: 'var(--radius-sm, 8px)', gap: 8 },
  sm: { fontSize: 13, padding: '6px 12px', borderRadius: 'var(--radius-sm, 8px)', gap: 6 },
};

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  startIcon,
  endIcon,
  disabled = false,
  onClick,
  href,
  sx = {},
}) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  const v = VARIANTS[variant] ?? VARIANTS.primary;
  const s = SIZES[size]    ?? SIZES.md;

  const stateStyles = disabled
    ? v.disabled
    : pressed  ? v.pressed
    : hovered  ? v.hover
    : v.base;

  const style = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: s.gap,
    fontSize: s.fontSize,
    fontFamily: "'Outfit', sans-serif",
    fontWeight: 600,
    lineHeight: 1,
    padding: s.padding,
    borderRadius: s.borderRadius,
    boxSizing: 'border-box',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'background-color 0.15s, color 0.15s, border-color 0.15s, box-shadow 0.15s, filter 0.15s, transform 0.15s',
    textDecoration: 'none',
    userSelect: 'none',
    outline: 'none',
    whiteSpace: 'nowrap',
    ...stateStyles,
    ...sx,
  };

  const events = {
    onMouseEnter: () => !disabled && setHovered(true),
    onMouseLeave: () => { setHovered(false); setPressed(false); },
    onMouseDown:  () => !disabled && setPressed(true),
    onMouseUp:    () => setPressed(false),
  };

  if (href && !disabled) {
    return (
      <a href={href} style={style} {...events}>
        {startIcon}{children}{endIcon}
      </a>
    );
  }

  return (
    <button type="button" style={style} disabled={disabled} onClick={onClick} {...events}>
      {startIcon}{children}{endIcon}
    </button>
  );
}

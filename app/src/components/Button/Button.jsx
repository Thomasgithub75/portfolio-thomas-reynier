/**
 * @component Button
 * @usage Action principale ou secondaire sur n'importe quelle page ou feature.
 *
 * Variantes :
 *   "primary"   — CTA principal : générer, envoyer, valider. Une seule par écran en règle générale.
 *   "secondary" — Action secondaire : annuler, revenir, option alternative.
 *   "ghost"     — Action tertiaire ou lien discret : télécharger, accéder, voir plus.
 *
 * Tailles : "md" (défaut) pour les CTA standards, "sm" pour les actions dans un toolbar ou une card dense.
 * Accepte startIcon / endIcon (MUI Icons uniquement).
 */
import { useState } from 'react';
import { tokens } from '../../theme/theme';

const VARIANTS = {
  primary: {
    base:     { background: tokens.primary[500], color: '#fff',            border: 'none' },
    hover:    { background: tokens.primary[600], color: '#fff',            border: 'none' },
    pressed:  { background: tokens.primary[700], color: '#fff',            border: 'none' },
    disabled: { background: tokens.primary[200], color: '#fff',            border: 'none' },
  },
  secondary: {
    base:     { background: tokens.gray[100],    color: tokens.gray[600],  border: 'none' },
    hover:    { background: tokens.gray[200],    color: tokens.gray[700],  border: 'none' },
    pressed:  { background: tokens.gray[300],    color: tokens.gray[800],  border: 'none' },
    disabled: { background: tokens.gray[50],     color: tokens.gray[300],  border: 'none' },
  },
  ghost: {
    base:     { background: 'transparent',       color: tokens.text,       border: `1.5px solid ${tokens.border}` },
    hover:    { background: tokens.bgSoft,       color: tokens.text,       border: `1.5px solid ${tokens.gray[300]}` },
    pressed:  { background: tokens.gray[100],    color: tokens.text,       border: `1.5px solid ${tokens.gray[300]}` },
    disabled: { background: 'transparent',       color: tokens.gray[300],  border: `1.5px solid ${tokens.border}` },
  },
};

const SIZES = {
  md: { fontSize: 15, padding: '9px 20px', borderRadius: 8, gap: 8 },
  sm: { fontSize: 13, padding: '6px 12px', borderRadius: 7, gap: 6 },
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
    transition: 'background-color 0.15s, color 0.15s, border-color 0.15s',
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

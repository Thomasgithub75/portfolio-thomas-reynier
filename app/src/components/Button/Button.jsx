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
import MuiButton from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { tokens } from '../../theme/theme';

// ── Primary ────────────────────────────────────────────────────────────────
const PrimaryButton = styled(MuiButton)(() => ({
  backgroundColor: tokens.primary[500],
  color: '#ffffff',
  boxShadow: 'none',
  '&&:hover': {
    backgroundColor: tokens.primary[600],
    boxShadow: 'none',
  },
  '&&:focus-visible': {
    backgroundColor: tokens.primary[600],
    outline: `2px solid ${tokens.primary[800]}`,
    outlineOffset: '2px',
    boxShadow: 'none',
  },
  '&&:active': {
    backgroundColor: tokens.primary[700],
    boxShadow: 'none',
  },
  '&.Mui-disabled': {
    backgroundColor: tokens.primary[200],
    color: '#ffffff',
  },
}));

// ── Secondary ──────────────────────────────────────────────────────────────
const SecondaryButton = styled(MuiButton)(() => ({
  backgroundColor: tokens.gray[100],
  color: tokens.gray[600],
  boxShadow: 'none',
  '&&:hover': {
    backgroundColor: tokens.gray[200],
    color: tokens.gray[700],
    boxShadow: 'none',
  },
  '&&:focus-visible': {
    backgroundColor: tokens.gray[200],
    color: tokens.gray[700],
    outline: `2px solid ${tokens.primary[500]}`,
    outlineOffset: '2px',
    boxShadow: 'none',
  },
  '&&:active': {
    backgroundColor: tokens.gray[300],
    color: tokens.gray[800],
    boxShadow: 'none',
  },
  '&.Mui-disabled': {
    backgroundColor: tokens.gray[50],
    color: tokens.gray[300],
  },
}));

// ── Ghost ──────────────────────────────────────────────────────────────────
const GhostButton = styled(MuiButton)(({ theme }) => ({
  color: theme.palette.text.primary,
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: 'transparent',
  boxShadow: 'none',
  '&&:hover': {
    borderColor: '#ccc',
    backgroundColor: theme.palette.background.paper,
    boxShadow: 'none',
  },
}));

/**
 * Button
 * variant : "primary" | "secondary" | "ghost"
 * size    : "sm" | "md" (défaut md)
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  startIcon,
  endIcon,
  disabled,
  onClick,
  href,
  sx: userSx = {},
}) {
  const muiSize = size === 'sm' ? 'small' : 'medium';
  const sizeSx = size === 'sm' ? { fontSize: '0.8125rem', padding: '6px 14px' } : {};
  const sx = { ...sizeSx, ...userSx };

  const commonProps = { size: muiSize, startIcon, endIcon, disabled, onClick, href, sx };

  if (variant === 'secondary') {
    return <SecondaryButton variant="contained" {...commonProps}>{children}</SecondaryButton>;
  }

  if (variant === 'ghost') {
    return <GhostButton {...commonProps}>{children}</GhostButton>;
  }

  return <PrimaryButton variant="contained" {...commonProps}>{children}</PrimaryButton>;
}

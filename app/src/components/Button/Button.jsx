import MuiButton from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { tokens } from '../../theme/theme';

// ── Primary ────────────────────────────────────────────────────────────────
const PrimaryButton = styled(MuiButton)(() => ({
  backgroundColor: tokens.primary[500],
  color: '#ffffff',
  boxShadow: 'none',
  '&:hover': {
    backgroundColor: tokens.primary[600],
    boxShadow: 'none',
  },
  '&:focus-visible': {
    backgroundColor: tokens.primary[600],
    outline: `2px solid ${tokens.primary[800]}`,
    outlineOffset: '2px',
    boxShadow: 'none',
  },
  '&:active': {
    backgroundColor: tokens.primary[700],
    boxShadow: 'none',
  },
  '&.Mui-disabled': {
    backgroundColor: tokens.primary[200],
    color: '#ffffff',
  },
}));

// ── Ghost ──────────────────────────────────────────────────────────────────
const GhostButton = styled(MuiButton)(({ theme }) => ({
  color: theme.palette.text.primary,
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: 'transparent',
  boxShadow: 'none',
  '&:hover': {
    borderColor: '#ccc',
    backgroundColor: theme.palette.background.paper,
    boxShadow: 'none',
  },
}));

/**
 * Button
 * variant : "primary" | "ghost"
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
}) {
  const muiSize = size === 'sm' ? 'small' : 'medium';
  const sx = size === 'sm' ? { fontSize: '0.8125rem', padding: '6px 14px' } : {};

  if (variant === 'ghost') {
    return (
      <GhostButton
        size={muiSize}
        startIcon={startIcon}
        endIcon={endIcon}
        disabled={disabled}
        onClick={onClick}
        href={href}
        sx={sx}
      >
        {children}
      </GhostButton>
    );
  }

  return (
    <PrimaryButton
      variant="contained"
      size={muiSize}
      startIcon={startIcon}
      endIcon={endIcon}
      disabled={disabled}
      onClick={onClick}
      href={href}
      sx={sx}
    >
      {children}
    </PrimaryButton>
  );
}

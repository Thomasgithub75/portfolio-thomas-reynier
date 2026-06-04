import MuiButton from '@mui/material/Button';
import { styled } from '@mui/material/styles';

// ── Variante Ghost (bordure, fond transparent) ─────────────────────────────
const GhostButton = styled(MuiButton)(({ theme }) => ({
  color: theme.palette.text.primary,
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: 'transparent',
  '&:hover': {
    borderColor: '#ccc',
    backgroundColor: theme.palette.background.paper,
  },
}));

/**
 * Button
 * variant: "primary" | "ghost"
 * size:    "sm" | "md" (défaut md)
 * startIcon, endIcon, disabled, onClick, href, children
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
    <MuiButton
      variant="contained"
      color="primary"
      size={muiSize}
      startIcon={startIcon}
      endIcon={endIcon}
      disabled={disabled}
      onClick={onClick}
      href={href}
      sx={{ '&:hover': { opacity: 0.88 }, ...sx }}
    >
      {children}
    </MuiButton>
  );
}

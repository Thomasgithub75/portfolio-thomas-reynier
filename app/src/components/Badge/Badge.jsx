import Box from '@mui/material/Box';
import { tokens } from '../../theme/theme';

// Palette par variant
const variantStyles = {
  default: {
    background: '#D1E9FF',
    color: '#1570EF',
  },
  case: {
    background: tokens.bgBlue,
    color: '#185FA5',
  },
  side: {
    background: tokens.tagPmBg,
    color: tokens.tagPmFg,
  },
  perso: {
    background: '#EAF3DE',
    color: '#3B6D11',
  },
};

/**
 * Badge — pill compact pour labelliser (rôle, type de projet, etc.)
 * variant: "default" | "case" | "side" | "perso"
 */
export default function Badge({ children, variant = 'default', sx = {} }) {
  const styles = variantStyles[variant] ?? variantStyles.default;

  return (
    <Box
      component="span"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '4px',
        px: '6px',
        py: '2px',
        borderRadius: '9999px',
        fontFamily: "'Outfit', sans-serif",
        fontSize: '12px',
        fontWeight: 500,
        lineHeight: 1.4,
        whiteSpace: 'nowrap',
        userSelect: 'none',
        cursor: 'default',
        ...styles,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

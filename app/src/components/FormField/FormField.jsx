import { useState } from 'react';
import Box from '@mui/material/Box';
import { tokens } from '../../theme/theme';

const styles = {
  enabled: {
    background: tokens.gray[100],
    border: '1.5px solid transparent',
  },
  hover: {
    background: tokens.gray[200],
    border: '1.5px solid transparent',
  },
  focus: {
    background: 'transparent',
    border: `1.5px solid ${tokens.primary[500]}`,
  },
};

const baseInput = {
  width: '100%',
  fontFamily: "'Outfit', sans-serif",
  fontSize: '13px',
  fontWeight: 400,
  color: tokens.gray[900],
  borderRadius: '8px',
  outline: 'none',
  transition: 'background 0.15s, border-color 0.15s',
  '&::placeholder': {
    color: tokens.gray[400],
    fontWeight: 300,
  },
};

/**
 * FormField — Input ou Textarea avec label
 * type     : "input" | "textarea"
 * label    : string (optionnel)
 * placeholder, value, onChange, rows (textarea uniquement)
 */
export default function FormField({
  type = 'input',
  label,
  placeholder,
  value,
  onChange,
  rows = 5,
  sx = {},
}) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  const currentStyle = focused
    ? styles.focus
    : hovered
    ? styles.hover
    : styles.enabled;

  const fieldSx = {
    ...baseInput,
    ...currentStyle,
    px: '12px',
    ...(type === 'input' ? { height: '38px', display: 'flex', alignItems: 'center' } : { py: '10px' }),
    ...sx,
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '100%' }}>
      {label && (
        <Box
          component="label"
          sx={{
            fontSize: '11px',
            fontWeight: 600,
            color: tokens.gray[500],
            letterSpacing: '.06em',
            textTransform: 'uppercase',
            fontFamily: "'Outfit', sans-serif",
          }}
        >
          {label}
        </Box>
      )}
      <Box
        component={type === 'textarea' ? 'textarea' : 'input'}
        rows={type === 'textarea' ? rows : undefined}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        sx={{
          ...fieldSx,
          ...(type === 'textarea' ? { resize: 'vertical', lineHeight: 1.6 } : {}),
        }}
      />
    </Box>
  );
}

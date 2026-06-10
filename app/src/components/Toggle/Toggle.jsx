import { useState } from 'react';
import Box from '@mui/material/Box';
import { tokens } from '../../theme/theme';

const trackColors = {
  on: {
    enabled: tokens.primary[600],
    hover:   tokens.primary[700],
    pressed: tokens.primary[800],
  },
  off: {
    enabled: tokens.gray[400],
    hover:   tokens.gray[500],
    pressed: tokens.gray[600],
  },
};

/**
 * Toggle — switch on/off
 * checked  : boolean (état contrôlé)
 * onChange : (newValue: boolean) => void
 * label    : string (optionnel)
 */
export default function Toggle({ checked = false, onChange, label }) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  const palette = checked ? trackColors.on : trackColors.off;
  const trackBg = pressed ? palette.pressed : hovered ? palette.hover : palette.enabled;

  const handleClick = () => onChange?.(!checked);

  return (
    <Box
      component="button"
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '9px',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
        fontFamily: "'Outfit', sans-serif",
        '&:focus-visible .toggle-track': {
          outline: `2px solid ${tokens.primary[500]}`,
          outlineOffset: '2px',
        },
      }}
    >
      {/* TRACK */}
      <Box
        className="toggle-track"
        sx={{
          width: '34px',
          height: '18px',
          borderRadius: '9px',
          backgroundColor: trackBg,
          position: 'relative',
          flexShrink: 0,
          transition: 'background-color 0.15s',
        }}
      >
        {/* DOT */}
        <Box
          sx={{
            width: '14px',
            height: '14px',
            borderRadius: '50%',
            backgroundColor: '#fff',
            position: 'absolute',
            top: '2px',
            left: checked ? '18px' : '2px',
            transition: 'left 0.18s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
          }}
        />
      </Box>

      {/* LABEL */}
      {label && (
        <Box
          component="span"
          sx={{
            fontSize: '13px',
            fontWeight: 500,
            color: tokens.gray[600],
            userSelect: 'none',
          }}
        >
          {label}
        </Box>
      )}
    </Box>
  );
}

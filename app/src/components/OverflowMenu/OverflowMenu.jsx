/**
 * @component OverflowMenu
 * @usage Bouton "3 points" qui regroupe les actions supplémentaires quand plus de 2 boutons
 * seraient affichés côte à côte. Règle DS : max 2 Button côte à côte — au-delà, utiliser OverflowMenu.
 *
 * Props :
 *   items  — tableau d'actions : [{ label, onClick, icon? }]
 *   size   — "md" (défaut) | "sm" — aligner avec les Button adjacents
 */
import { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { tokens } from '../../theme/theme';

const SIZES = {
  md: { padding: '9px 10px', borderRadius: 8, iconSize: 20 },
  sm: { padding: '6px 7px',  borderRadius: 7, iconSize: 17 },
};

export default function OverflowMenu({ items = [], size = 'md' }) {
  const [anchor, setAnchor] = useState(null);
  const open = Boolean(anchor);

  const s = SIZES[size] ?? SIZES.md;

  const handleOpen  = (e) => setAnchor(e.currentTarget);
  const handleClose = ()  => setAnchor(null);

  const handleClick = (onClick) => {
    handleClose();
    onClick?.();
  };

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: s.padding,
          borderRadius: s.borderRadius,
          background: open ? tokens.bgSoft : 'transparent',
          border: `1.5px solid ${open ? tokens.gray[300] : tokens.border}`,
          cursor: 'pointer',
          transition: 'background 0.15s, border-color 0.15s',
          outline: 'none',
          flexShrink: 0,
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = tokens.bgSoft;
          e.currentTarget.style.borderColor = tokens.gray[300];
        }}
        onMouseLeave={e => {
          if (!open) {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.borderColor = tokens.border;
          }
        }}
        aria-label="Plus d'actions"
        aria-haspopup="true"
        aria-expanded={open}
      >
        <MoreVertIcon style={{ fontSize: s.iconSize, color: tokens.text, display: 'block' }} />
      </button>

      <Menu
        anchorEl={anchor}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              mt: '6px',
              border: `1px solid ${tokens.border}`,
              borderRadius: '10px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
              minWidth: 180,
              overflow: 'hidden',
            },
          },
        }}
      >
        {items.map(({ label, onClick, icon }, i) => (
          <MenuItem
            key={i}
            onClick={() => handleClick(onClick)}
            sx={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '14px',
              fontWeight: 400,
              color: tokens.text,
              px: 2,
              py: 1.25,
              gap: 1.5,
              '&:hover': { background: tokens.bgSoft },
            }}
          >
            {icon && (
              <span style={{ display: 'flex', alignItems: 'center', color: tokens.muted, flexShrink: 0 }}>
                {icon}
              </span>
            )}
            {label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

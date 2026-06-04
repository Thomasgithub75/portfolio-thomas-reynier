import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Button from '../components/Button/Button';
import Badge from '../components/Badge/Badge';
import Tag from '../components/Tag/Tag';
import { tokens } from '../theme/theme';
import { useState } from 'react';

// Icônes Material Design utilisées dans le portfolio
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CheckIcon from '@mui/icons-material/Check';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import DownloadIcon from '@mui/icons-material/Download';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import StarIcon from '@mui/icons-material/Star';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import PaletteIcon from '@mui/icons-material/Palette';
import CodeIcon from '@mui/icons-material/Code';

// ── Helpers ───────────────────────────────────────────────────────────────────

function Section({ title, subtitle, children }) {
  return (
    <Box component="section" sx={{ mb: 7 }}>
      <Typography variant="caption" sx={{ color: tokens.blue, textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.08em', display: 'block', mb: 0.5 }}>
        Composant
      </Typography>
      <Typography variant="h3" sx={{ fontSize: '22px', fontWeight: 700, mb: subtitle ? 0.5 : 3, color: tokens.text }}>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="body2" sx={{ color: tokens.muted, mb: 3 }}>
          {subtitle}
        </Typography>
      )}
      {children}
    </Box>
  );
}

function Group({ label, children }) {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="caption" sx={{ display: 'block', mb: 1, color: tokens.muted, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
        {label}
      </Typography>
      <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap>
        {children}
      </Stack>
    </Box>
  );
}

function ColorSwatch({ name, value }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, minWidth: 80 }}>
      <Box sx={{ width: 64, height: 64, borderRadius: 2, background: value, border: `1px solid ${tokens.border}` }} />
      <Typography variant="caption" sx={{ color: tokens.text, fontWeight: 600, fontSize: 11 }}>{name}</Typography>
      <Typography variant="caption" sx={{ color: tokens.muted, fontSize: 10 }}>{value}</Typography>
    </Box>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function DesignSystem() {
  const [activeTag, setActiveTag] = useState(null);

  const toggle = (id) => setActiveTag(prev => prev === id ? null : id);

  return (
    <Box sx={{ maxWidth: 860, mx: 'auto', px: { xs: 2, md: 4 }, py: 8 }}>

      {/* Header */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="caption" sx={{ color: tokens.blue, textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.1em', display: 'block', mb: 1 }}>
          Thomas Reynier · Portfolio
        </Typography>
        <Typography variant="h1" sx={{ fontSize: 'clamp(28px, 4vw, 42px)', mb: 1.5, color: tokens.text }}>
          Design System
        </Typography>
        <Typography variant="body1" sx={{ color: tokens.muted, fontWeight: 300, maxWidth: 500 }}>
          Référentiel visuel de tous les composants utilisés dans le portfolio.
          Chaque composant est documenté avec ses variantes et ses états.
        </Typography>
      </Box>

      <Divider sx={{ mb: 7 }} />

      {/* ── COULEURS ─────────────────────────────────────── */}
      <Section title="Couleurs" subtitle="Tokens de couleur extraits du site.">
        <Group label="Primaires">
          <ColorSwatch name="blue" value={tokens.blue} />
          <ColorSwatch name="blueMid" value={tokens.blueMid} />
          <ColorSwatch name="blueDeep" value={tokens.blueDeep} />
          <ColorSwatch name="blueDarker" value={tokens.blueDarker} />
        </Group>
        <Group label="Surfaces">
          <ColorSwatch name="blueLight" value={tokens.blueLight} />
          <ColorSwatch name="bgBlue" value={tokens.bgBlue} />
          <ColorSwatch name="bgPanel" value={tokens.bgPanel} />
          <ColorSwatch name="bgSoft" value={tokens.bgSoft} />
        </Group>
        <Group label="Neutres">
          <ColorSwatch name="text" value={tokens.text} />
          <ColorSwatch name="muted" value={tokens.muted} />
          <ColorSwatch name="border" value={tokens.border} />
          <ColorSwatch name="borderSoft" value={tokens.borderSoft} />
        </Group>
        <Group label="Sémantiques">
          <ColorSwatch name="green" value={tokens.green} />
          <ColorSwatch name="amber" value={tokens.amber} />
        </Group>
      </Section>

      <Divider sx={{ mb: 7 }} />

      {/* ── TYPOGRAPHIE ───────────────────────────────────── */}
      <Section title="Typographie" subtitle="Outfit — 300 / 400 / 500 / 600 / 700">
        {[
          { label: 'H1 — 700', size: '42px', weight: 700 },
          { label: 'H2 — 600', size: '32px', weight: 600 },
          { label: 'H3 — 600', size: '22px', weight: 600 },
          { label: 'Body — 400', size: '16px', weight: 400 },
          { label: 'Small — 300', size: '14px', weight: 300 },
          { label: 'Caption — 500', size: '12px', weight: 500 },
        ].map(({ label, size, weight }) => (
          <Box key={label} sx={{ display: 'flex', alignItems: 'baseline', gap: 3, mb: 2 }}>
            <Typography variant="caption" sx={{ color: tokens.muted, minWidth: 120 }}>{label}</Typography>
            <Typography sx={{ fontFamily: "'Outfit', sans-serif", fontSize: size, fontWeight: weight, color: tokens.text, letterSpacing: '-0.01em' }}>
              Portfolio Thomas Reynier
            </Typography>
          </Box>
        ))}
      </Section>

      <Divider sx={{ mb: 7 }} />

      {/* ── BUTTON ────────────────────────────────────────── */}
      <Section title="Button" subtitle="Deux variantes : Primary (CTA) et Ghost (secondaire).">
        <Group label="Variantes">
          <Button variant="primary">Voir le projet</Button>
          <Button variant="ghost">Me contacter</Button>
        </Group>
        <Group label="Taille sm">
          <Button variant="primary" size="sm">Voir le projet</Button>
          <Button variant="ghost" size="sm">Me contacter</Button>
        </Group>
        <Group label="État disabled">
          <Button variant="primary" disabled>Voir le projet</Button>
          <Button variant="ghost" disabled>Me contacter</Button>
        </Group>
      </Section>

      <Divider sx={{ mb: 7 }} />

      {/* ── BADGE ─────────────────────────────────────────── */}
      <Section title="Badge" subtitle="Pill compact pour labelliser un rôle ou un type de projet.">
        <Group label="Variantes">
          <Badge variant="default">Étude de cas</Badge>
          <Badge variant="case">Étude de cas</Badge>
          <Badge variant="side">Projet perso</Badge>
          <Badge variant="perso">Side project</Badge>
        </Group>
      </Section>

      <Divider sx={{ mb: 7 }} />

      {/* ── TAG ───────────────────────────────────────────── */}
      <Section title="Tag" subtitle="Étiquettes interactives ou display pour catégoriser les compétences.">
        <Group label="Display — catégories métier">
          <Tag category="design">Product Design</Tag>
          <Tag category="dev">Dev</Tag>
          <Tag category="pm">Product</Tag>
        </Group>
        <Group label="Cliquables — état actif / inactif">
          <Tag category="primary" clickable isActive={activeTag === 'ux'} onClick={() => toggle('ux')}>UX Research</Tag>
          <Tag category="primary" clickable isActive={activeTag === 'ds'} onClick={() => toggle('ds')}>Design System</Tag>
          <Tag category="secondary" clickable isActive={activeTag === 'fig'} onClick={() => toggle('fig')}>Figma</Tag>
          <Tag category="secondary" clickable isActive={activeTag === 'nxt'} onClick={() => toggle('nxt')}>Next.js</Tag>
        </Group>
        <Group label="Langues">
          <Tag category="langNatif">FR — Natif</Tag>
          <Tag category="langPro">EN — Pro</Tag>
        </Group>
        <Group label="État dimmed (filtre actif sur un autre)">
          <Tag category="primary" isDimmed>UX Research</Tag>
          <Tag category="secondary" isDimmed>Figma</Tag>
          <Tag category="design">Design</Tag>
        </Group>
      </Section>

      <Divider sx={{ mb: 7 }} />

      {/* ── ICÔNES ────────────────────────────────────────── */}
      <Section title="Icônes" subtitle="Bibliothèque Material Design Icons (@mui/icons-material). Survole une icône pour voir son nom.">
        {[
          { label: 'Navigation & actions', icons: [
            { Icon: ArrowForwardIcon, name: 'ArrowForward' },
            { Icon: ArrowOutwardIcon, name: 'ArrowOutward' },
            { Icon: ChevronRightIcon, name: 'ChevronRight' },
            { Icon: OpenInNewIcon,    name: 'OpenInNew' },
            { Icon: CloseIcon,        name: 'Close' },
            { Icon: MenuIcon,         name: 'Menu' },
          ]},
          { label: 'Interactions', icons: [
            { Icon: AddIcon,    name: 'Add' },
            { Icon: RemoveIcon, name: 'Remove' },
            { Icon: CheckIcon,  name: 'Check' },
          ]},
          { label: 'Contact & liens', icons: [
            { Icon: LinkedInIcon, name: 'LinkedIn' },
            { Icon: EmailIcon,    name: 'Email' },
            { Icon: DownloadIcon, name: 'Download' },
          ]},
          { label: 'Métier & UI', icons: [
            { Icon: StarIcon,               name: 'Star' },
            { Icon: FiberManualRecordIcon,  name: 'FiberManualRecord (dot)' },
            { Icon: WorkIcon,               name: 'Work' },
            { Icon: SchoolIcon,             name: 'School' },
            { Icon: LightbulbIcon,          name: 'Lightbulb' },
            { Icon: PaletteIcon,            name: 'Palette' },
            { Icon: CodeIcon,               name: 'Code' },
          ]},
        ].map(({ label, icons }) => (
          <Group key={label} label={label}>
            {icons.map(({ Icon, name }) => (
              <Tooltip key={name} title={name} placement="top" arrow>
                <Box sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 0.75,
                  p: 1.5,
                  borderRadius: 2,
                  border: `1px solid ${tokens.border}`,
                  cursor: 'default',
                  minWidth: 64,
                  transition: 'border-color 0.15s, background 0.15s',
                  '&:hover': { borderColor: tokens.blue, background: tokens.blueLight },
                }}>
                  <Icon sx={{ fontSize: 22, color: tokens.text }} />
                  <Typography variant="caption" sx={{ fontSize: 9.5, color: tokens.muted, textAlign: 'center', lineHeight: 1.3 }}>
                    {name.replace(/([A-Z])/g, ' $1').trim()}
                  </Typography>
                </Box>
              </Tooltip>
            ))}
          </Group>
        ))}
      </Section>

      <Divider sx={{ mb: 4 }} />

      <Typography variant="caption" sx={{ color: tokens.muted, display: 'block', textAlign: 'center' }}>
        Design System · Thomas Reynier · Portfolio 2025
      </Typography>
    </Box>
  );
}

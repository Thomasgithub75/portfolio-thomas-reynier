import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Button from '../components/Button/Button';
import Badge from '../components/Badge/Badge';
import Tag from '../components/Tag/Tag';
import FormField from '../components/FormField/FormField';
import Toggle from '../components/Toggle/Toggle';
import TestimonialCard from '../components/TestimonialCard/TestimonialCard';
import { tokens } from '../theme/theme';
import { useState } from 'react';

// ── Auth ──────────────────────────────────────────────────────────────────────
const PASSWORD = import.meta.env.VITE_DS_PASSWORD || 'thomas2026';

function PasswordGate({ onUnlock }) {
  const [pwd, setPwd] = useState('');
  const [error, setError] = useState(false);

  const submit = () => {
    if (pwd === PASSWORD) { onUnlock(); }
    else { setError(true); setTimeout(() => setError(false), 2000); }
  };

  return (
    <div style={{
      minHeight: '100vh', background: tokens.bgSoft,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'Outfit, sans-serif',
    }}>
      <div style={{
        background: '#fff', border: `1px solid ${tokens.border}`,
        borderRadius: 14, padding: '40px 48px', width: 380,
        textAlign: 'center', boxShadow: '0 4px 24px rgba(0,0,0,.06)',
      }}>
        <div style={{ fontSize: 28, marginBottom: 16 }}>🎨</div>
        <div style={{ fontSize: 16, fontWeight: 700, color: tokens.text, marginBottom: 6 }}>Design System</div>
        <div style={{ fontSize: 13, color: tokens.muted, fontWeight: 300, marginBottom: 28 }}>
          Accès réservé à Thomas.
        </div>
        <input
          type="password"
          value={pwd}
          onChange={e => setPwd(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && submit()}
          placeholder="Mot de passe"
          autoFocus
          style={{
            width: '100%', padding: '11px 14px',
            border: `1px solid ${error ? '#EF4444' : tokens.border}`,
            borderRadius: 8, fontSize: 14, fontFamily: 'Outfit, sans-serif',
            marginBottom: 12, outline: 'none', textAlign: 'center',
            transition: 'border-color .15s',
          }}
        />
        {error && <div style={{ fontSize: 12, color: '#EF4444', marginBottom: 12 }}>Mot de passe incorrect</div>}
        <button onClick={submit} style={{
          width: '100%', padding: '11px 0',
          background: tokens.primary[500], color: '#fff',
          border: 'none', borderRadius: 8, fontSize: 14,
          fontWeight: 600, cursor: 'pointer', fontFamily: 'Outfit, sans-serif',
        }}>
          Accéder
        </button>
      </div>
    </div>
  );
}

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

function Section({ title, subtitle, children, label = 'Composant' }) {
  return (
    <Box component="section" sx={{ mb: 7 }}>
      <Typography variant="caption" sx={{ color: tokens.blue, textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.08em', display: 'block', mb: 0.5 }}>
        {label}
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
  const isLight = ['#EEF3FD','#D7E5FB','#FFFFFF','#F9FAFB','#F4F8FE','#E5E7EB','#E5E9F5'].includes(value);
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, minWidth: 72 }}>
      <Box sx={{ width: 64, height: 64, borderRadius: 2, background: value, border: isLight ? `1px solid ${tokens.border}` : 'none' }} />
      <Typography variant="caption" sx={{ color: tokens.text, fontWeight: 600, fontSize: 11 }}>{name}</Typography>
      <Typography variant="caption" sx={{ color: tokens.muted, fontSize: 10 }}>{value}</Typography>
    </Box>
  );
}

function ColorScale({ label, scale, semantic = {}, baseStep = null }) {
  const steps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="caption" sx={{ display: 'block', mb: 1.5, color: tokens.muted, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', fontSize: 11 }}>
        {label}
      </Typography>
      <Box sx={{ display: 'flex', gap: 0, borderRadius: '10px', overflow: 'hidden', border: `1px solid ${tokens.border}` }}>
        {steps.map((step) => {
          const hex = scale[step];
          const finalText = step <= 200 ? tokens.gray[600] : (step <= 400 ? '#fff' : '#fff');
          return (
            <Box key={step} sx={{ flex: 1, background: hex, pt: 8, pb: 1.5, px: 1, display: 'flex', flexDirection: 'column', gap: '2px', position: 'relative' }}>
              {step === baseStep && (
                <Box sx={{ position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)', fontSize: 9, fontWeight: 700, color: '#fff', background: 'rgba(255,255,255,0.25)', borderRadius: '4px', px: '5px', py: '1px', whiteSpace: 'nowrap' }}>
                  Base
                </Box>
              )}
              <Typography sx={{ fontSize: 11, fontWeight: 700, color: finalText, lineHeight: 1 }}>{step}</Typography>
              <Typography sx={{ fontSize: 9.5, color: finalText, opacity: 0.75, lineHeight: 1, fontFamily: 'monospace' }}>{hex}</Typography>
              {semantic[step] && (
                <Typography sx={{ fontSize: 9, color: finalText, opacity: 0.6, lineHeight: 1, mt: '2px' }}>{semantic[step]}</Typography>
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

function PrimaryScale() {
  const steps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
  const semantic = { 50: 'blueLight', 100: 'bgBlue', 200: 'blueBorder', 400: 'blueMid', 500: 'blue ★', 600: 'blueDeep', 700: 'blueDarker' };
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="caption" sx={{ display: 'block', mb: 1.5, color: tokens.muted, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', fontSize: 11 }}>
        Primary — scale complète
      </Typography>
      <Box sx={{ display: 'flex', gap: 0, borderRadius: '10px', overflow: 'hidden', border: `1px solid ${tokens.border}` }}>
        {steps.map((step) => {
          const hex = tokens.primary[step];
          const finalText = step <= 200 ? tokens.muted : (step <= 400 ? tokens.text : '#fff');
          return (
            <Box
              key={step}
              sx={{
                flex: 1,
                background: hex,
                pt: 8,
                pb: 1.5,
                px: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
                position: 'relative',
              }}
            >
              {step === 500 && (
                <Box sx={{
                  position: 'absolute',
                  top: 8,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  fontSize: 9,
                  fontWeight: 700,
                  color: '#fff',
                  background: 'rgba(255,255,255,0.25)',
                  borderRadius: '4px',
                  px: '5px',
                  py: '1px',
                  whiteSpace: 'nowrap',
                }}>
                  Base
                </Box>
              )}
              <Typography sx={{ fontSize: 11, fontWeight: 700, color: finalText, lineHeight: 1 }}>{step}</Typography>
              <Typography sx={{ fontSize: 9.5, color: finalText, opacity: 0.75, lineHeight: 1, fontFamily: 'monospace' }}>{hex}</Typography>
              {semantic[step] && (
                <Typography sx={{ fontSize: 9, color: finalText, opacity: 0.6, lineHeight: 1, mt: '2px' }}>
                  {semantic[step]}
                </Typography>
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

// ── Toggle demos ──────────────────────────────────────────────────────────────

function ToggleDemo() {
  const [on, setOn] = useState(false);
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
      <Toggle checked={on} onChange={setOn} />
      <Box sx={{ fontSize: '12px', color: tokens.muted }}>{on ? 'Selected' : 'Not selected'} — clique pour switcher</Box>
    </Box>
  );
}

function ToggleLabelDemo() {
  const [on, setOn] = useState(true);
  return <Toggle checked={on} onChange={setOn} label="Contexte complémentaire" />;
}

// ── DocBlock ──────────────────────────────────────────────────────────────────

function DocBlock({ props: propRows, usage, code }) {
  return (
    <Box sx={{
      mt: 3.5,
      border: `1px solid ${tokens.borderSoft}`,
      borderRadius: '10px',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <Box sx={{
        px: 2.5, py: 1.25,
        background: tokens.bgPanel,
        borderBottom: `1px solid ${tokens.borderSoft}`,
        display: 'flex', alignItems: 'center', gap: 1,
      }}>
        <Box sx={{ width: 6, height: 6, borderRadius: '50%', background: tokens.blue, flexShrink: 0 }} />
        <Typography sx={{ fontSize: 10, fontWeight: 700, color: tokens.muted, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: "'Outfit', sans-serif" }}>
          Documentation Claude
        </Typography>
      </Box>

      <Box sx={{ p: 2.5, background: '#fff', display: 'flex', flexDirection: 'column', gap: 3 }}>

        {/* Props Table */}
        {propRows && (
          <Box>
            <Typography sx={{ fontSize: 11, fontWeight: 700, color: tokens.text, textTransform: 'uppercase', letterSpacing: '0.06em', mb: 1.5, fontFamily: "'Outfit', sans-serif" }}>
              Props
            </Typography>
            <Box sx={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                <thead>
                  <tr style={{ background: tokens.bgSoft }}>
                    {['Prop', 'Type', 'Défaut', 'Description'].map(h => (
                      <th key={h} style={{
                        padding: '7px 12px',
                        textAlign: 'left',
                        fontWeight: 600,
                        color: tokens.muted,
                        fontSize: 11,
                        letterSpacing: '0.04em',
                        borderBottom: `1px solid ${tokens.border}`,
                        whiteSpace: 'nowrap',
                        fontFamily: "'Outfit', sans-serif",
                      }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {propRows.map(([name, type, def, desc], i) => (
                    <tr key={name} style={{ background: i % 2 === 0 ? '#fff' : tokens.bgSoft }}>
                      <td style={{ padding: '6px 12px', fontFamily: 'monospace', color: tokens.blue, fontSize: 12.5, borderBottom: `1px solid ${tokens.bgSoft}` }}>
                        {name}
                      </td>
                      <td style={{ padding: '6px 12px', fontFamily: 'monospace', color: '#7C3AED', fontSize: 11.5, borderBottom: `1px solid ${tokens.bgSoft}` }}>
                        {type}
                      </td>
                      <td style={{ padding: '6px 12px', fontFamily: 'monospace', color: tokens.amber, fontSize: 11.5, borderBottom: `1px solid ${tokens.bgSoft}` }}>
                        {def || '—'}
                      </td>
                      <td style={{ padding: '6px 12px', color: tokens.gray[700], fontSize: 12, lineHeight: 1.5, borderBottom: `1px solid ${tokens.bgSoft}`, fontFamily: "'Outfit', sans-serif" }}>
                        {desc}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>
          </Box>
        )}

        {/* Usage */}
        {usage && (
          <Box>
            <Typography sx={{ fontSize: 11, fontWeight: 700, color: tokens.text, textTransform: 'uppercase', letterSpacing: '0.06em', mb: 1, fontFamily: "'Outfit', sans-serif" }}>
              Règles d'usage
            </Typography>
            <ul style={{ paddingLeft: 20, margin: 0 }}>
              {usage.map((u, i) => (
                <li key={i} style={{ fontSize: 12.5, color: tokens.gray[700], lineHeight: 1.75, marginBottom: 2, fontFamily: "'Outfit', sans-serif" }}>
                  {u}
                </li>
              ))}
            </ul>
          </Box>
        )}

        {/* Code Snippet */}
        {code && (
          <Box>
            <Typography sx={{ fontSize: 11, fontWeight: 700, color: tokens.text, textTransform: 'uppercase', letterSpacing: '0.06em', mb: 1, fontFamily: "'Outfit', sans-serif" }}>
              Exemple JSX
            </Typography>
            <Box sx={{ background: tokens.gray[900], borderRadius: '8px', p: 2, overflow: 'auto' }}>
              <pre style={{ fontFamily: 'monospace', fontSize: 12, color: '#E5E7EB', margin: 0, lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
                {code}
              </pre>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function DesignSystem() {
  const [unlocked, setUnlocked] = useState(() => localStorage.getItem('ds_auth') === '1');

  if (!unlocked) return <PasswordGate onUnlock={() => { localStorage.setItem('ds_auth', '1'); setUnlocked(true); }} />;

  return <DesignSystemContent />;
}

function DesignSystemContent() {
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
          Chaque composant est documenté avec ses variantes, ses états et ses règles d'usage.
        </Typography>
      </Box>

      <Divider sx={{ mb: 7 }} />

      {/* ── COULEURS ─────────────────────────────────────── */}
      <Section title="Couleurs" subtitle="Palette Primary brand + tokens sémantiques + neutres." label="Fondations">

        <PrimaryScale />

        <ColorScale
          label="Gray — scale complète"
          scale={tokens.gray}
          baseStep={500}
          semantic={{ 500: 'muted ★', 900: 'text ★' }}
        />

        <Group label="Tokens sémantiques — Primary">
          <ColorSwatch name="blue (500)" value={tokens.blue} />
          <ColorSwatch name="blueMid (400)" value={tokens.blueMid} />
          <ColorSwatch name="blueDeep (600)" value={tokens.blueDeep} />
          <ColorSwatch name="blueDarker (700)" value={tokens.blueDarker} />
          <ColorSwatch name="blueLight (50)" value={tokens.blueLight} />
          <ColorSwatch name="bgBlue (100)" value={tokens.bgBlue} />
          <ColorSwatch name="blueBorder (200)" value={tokens.blueBorder} />
        </Group>

        <Group label="Tokens sémantiques — Gray">
          <ColorSwatch name="text (900)" value={tokens.gray[900]} />
          <ColorSwatch name="muted (500)" value={tokens.gray[500]} />
          <ColorSwatch name="gray 600" value={tokens.gray[600]} />
          <ColorSwatch name="gray 700" value={tokens.gray[700]} />
          <ColorSwatch name="gray 800" value={tokens.gray[800]} />
        </Group>

        <Group label="Surfaces & bordures">
          <ColorSwatch name="border" value={tokens.border} />
          <ColorSwatch name="bgSoft" value={tokens.bgSoft} />
          <ColorSwatch name="bgPanel" value={tokens.bgPanel} />
        </Group>

        <Group label="Sémantiques">
          <ColorSwatch name="green" value={tokens.green} />
          <ColorSwatch name="amber" value={tokens.amber} />
        </Group>

        <DocBlock
          usage={[
            'Importer les tokens : import { tokens } from \'../theme/theme\';',
            'Utiliser exclusivement les tokens pour toutes les couleurs — jamais de valeurs hexadécimales en dur sauf dans les composants du DS lui-même.',
            'Texte principal → tokens.text (#1A2540) · Texte secondaire → tokens.muted (#5B6A8A)',
            'Fond de page → tokens.bg (#fff) · Fond doux → tokens.bgSoft (#F9FAFB) · Fond panel → tokens.bgPanel (#F4F8FE)',
            'Séparateurs et bordures → tokens.border (#E5E7EB) · Bordures douces → tokens.borderSoft (#E5E9F5)',
            'Bleu brand → tokens.blue (primary[500]) · Hover → tokens.blueDeep (primary[600]) · Active → tokens.blueDarker (primary[700])',
            'Fond bleu clair (highlight, tag, badge) → tokens.bgBlue (primary[100]) · Très clair → tokens.blueLight (primary[50])',
            'Succès → tokens.green (#22C55E) · Avertissement → tokens.amber (#F59E0B)',
          ]}
          code={`import { tokens } from '../theme/theme';

// Dans un composant MUI (sx prop)
<Box sx={{
  background: tokens.bgSoft,
  border: \`1px solid \${tokens.border}\`,
  color: tokens.text,
}}>

// Dans un style inline
<div style={{ color: tokens.muted, fontFamily: "'Outfit', sans-serif" }}>

// Scale complète si besoin d'un pas précis
tokens.primary[600]   // blueDeep
tokens.gray[300]      // gris clair
tokens.primary[50]    // blueLight`}
        />
      </Section>

      <Divider sx={{ mb: 7 }} />

      {/* ── TYPOGRAPHIE ───────────────────────────────────── */}
      <Section title="Typographie" subtitle="Outfit — 300 / 400 / 500 / 600 / 700" label="Fondations">
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

        <DocBlock
          usage={[
            'Police unique : Outfit (Google Fonts, weights 300/400/500/600/700). Déjà chargée via theme.js, disponible partout.',
            'Toujours utiliser fontFamily: "\'Outfit\', sans-serif" dans les composants custom (pas hérité automatiquement hors MUI Typography).',
            'H1 → fontWeight 700, letterSpacing -0.03em · H2 → 600, -0.025em · H3 → 600, -0.02em',
            'Corps de texte → fontWeight 400, lineHeight 1.6 · Secondaire → fontWeight 300',
            'Labels de formulaire, captions → fontSize 11-12px, fontWeight 600, letterSpacing 0.06em, textTransform uppercase',
            'Ne jamais utiliser la prop variant="h1/h2..." de MUI Typography pour le style — contrôler fontSize et fontWeight directement via sx.',
          ]}
          code={`// Titre de page
<Typography sx={{
  fontSize: 'clamp(28px, 4vw, 42px)',
  fontWeight: 700,
  letterSpacing: '-0.03em',
  color: tokens.text,
}}>

// Surtitre (label de section en bleu)
<Typography variant="caption" sx={{
  color: tokens.blue,
  textTransform: 'uppercase',
  fontWeight: 700,
  letterSpacing: '0.1em',
  display: 'block',
  mb: 1,
}}>

// Corps secondaire (description, muted)
<Typography sx={{ color: tokens.muted, fontWeight: 300, lineHeight: 1.6 }}>

// Label de champ (uppercase small)
<Typography sx={{
  fontSize: '11px',
  fontWeight: 600,
  color: tokens.gray[500],
  letterSpacing: '.06em',
  textTransform: 'uppercase',
}}>`}
        />
      </Section>

      <Divider sx={{ mb: 7 }} />

      {/* ── BUTTON ────────────────────────────────────────── */}
      <Section title="Button" subtitle="3 variantes : Primary · Secondary · Ghost">
        <Group label="Variantes — taille md">
          <Button variant="primary">Voir le projet</Button>
          <Button variant="secondary">Me contacter</Button>
          <Button variant="ghost">En savoir plus</Button>
        </Group>
        <Group label="Taille sm">
          <Button variant="primary" size="sm">Voir le projet</Button>
          <Button variant="secondary" size="sm">Me contacter</Button>
          <Button variant="ghost" size="sm">En savoir plus</Button>
        </Group>
        <Group label="État disabled">
          <Button variant="primary" disabled>Voir le projet</Button>
          <Button variant="secondary" disabled>Me contacter</Button>
          <Button variant="ghost" disabled>En savoir plus</Button>
        </Group>

        <DocBlock
          props={[
            ['variant', "'primary' | 'secondary' | 'ghost'", "'primary'", 'Style visuel du bouton.'],
            ['size', "'md' | 'sm'", "'md'", 'md = CTA standard (padding 9/20px, fs 15px). sm = action dense (padding 6/12px, fs 13px).'],
            ['disabled', 'boolean', 'false', 'Désactive le bouton et applique le style désactivé.'],
            ['onClick', 'function', '—', 'Handler au clic. Non requis si href est fourni.'],
            ['href', 'string', '—', 'Si fourni, le bouton est rendu en balise <a>. Idéal pour les liens externes.'],
            ['startIcon', 'ReactNode', '—', 'Icône MUI avant le label. Ex : <ArrowForwardIcon sx={{ fontSize: 16 }} />'],
            ['endIcon', 'ReactNode', '—', 'Icône MUI après le label.'],
            ['sx', 'object', '{}', 'Overrides de style inline (merge avec les styles internes).'],
          ]}
          usage={[
            'primary → CTA principal de l\'écran (générer, envoyer, voir le projet). Une seule occurrence recommandée par écran.',
            'secondary → action alternative ou secondaire (annuler, retour, option). Fond gris clair.',
            'ghost → action discrète, tertiaire ou navigation (télécharger, accéder, voir plus). Fond transparent + bordure.',
            'Toujours accompagner d\'un label clair et actionnable ("Voir le projet", pas "Cliquez ici").',
            'Pour un lien externe : utiliser href — le composant se rend automatiquement en <a>.',
            'Icônes : utiliser exclusivement @mui/icons-material via startIcon/endIcon.',
            'Ne jamais utiliser le Button MUI natif — toujours importer depuis ../components/Button/Button.',
          ]}
          code={`import Button from '../components/Button/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

// CTA principal
<Button variant="primary" onClick={handleSubmit}>
  Générer ma lettre
</Button>

// Avec icône et lien externe
<Button variant="primary" href="https://..." endIcon={<OpenInNewIcon sx={{ fontSize: 15 }} />}>
  Voir le projet
</Button>

// Action secondaire taille sm
<Button variant="secondary" size="sm" onClick={handleCancel}>
  Annuler
</Button>

// Ghost discret
<Button variant="ghost" href="/cv" endIcon={<ArrowForwardIcon sx={{ fontSize: 15 }} />}>
  Télécharger le CV
</Button>`}
        />
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

        <DocBlock
          props={[
            ['variant', "'default' | 'case' | 'side' | 'perso'", "'default'", 'Style coloré du badge.'],
            ['children', 'ReactNode', '—', 'Texte ou contenu du badge.'],
            ['sx', 'object', '{}', 'Overrides de style.'],
          ]}
          usage={[
            'Composant non interactif (non cliquable, non filtrable) — pour info statique uniquement.',
            'default → bleu clair (#D7E5FB / blueDeep) : rôle générique, label neutre.',
            'case → bleu foncé (bgBlue / blueDeep) : type de mission, case study, contrat.',
            'side → orange clair (tagPmBg / tagPmFg) : projet side, projet perso, exploration.',
            'perso → vert clair (#EAF3DE / #3B6D11) : projet personnel, initiative propre.',
            'Utiliser Badge (et non Tag) quand l\'étiquette n\'est pas interactive — si besoin de filtre ou de clic, utiliser Tag.',
            'Typiquement placé en haut d\'une card de projet ou dans le header d\'une page Case Study.',
          ]}
          code={`import Badge from '../components/Badge/Badge';

// Sur une card de projet
<Badge variant="case">Étude de cas</Badge>
<Badge variant="side">Projet perso</Badge>

// Dans un header
<Box sx={{ display: 'flex', gap: 1 }}>
  <Badge variant="case">Product Design</Badge>
  <Badge variant="default">13 mois</Badge>
</Box>`}
        />
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

        <DocBlock
          props={[
            ['category', "'primary'|'secondary'|'design'|'dev'|'pm'|'langNatif'|'langPro'", "'secondary'", 'Palette de couleur du tag.'],
            ['clickable', 'boolean', 'false', 'Active le mode bouton avec hover, focus et état actif.'],
            ['isActive', 'boolean', 'false', 'État actif contrôlé depuis le parent (filtre sélectionné).'],
            ['isDimmed', 'boolean', 'false', 'Réduit l\'opacité à 0.3 (un autre filtre est actif).'],
            ['onClick', 'function', '—', 'Handler au clic. Requis si clickable=true.'],
            ['icon', 'ReactNode', '—', 'Icône optionnelle avant le label (fontSize 12).'],
            ['sx', 'object', '{}', 'Overrides de style.'],
          ]}
          usage={[
            'primary (bleu plein) → compétence forte, filtre sélectionné actif.',
            'secondary (bleu clair) → compétence standard, filtre neutre disponible.',
            'design (violet) → compétences Product Design / UX.',
            'dev (vert) → compétences techniques / développement.',
            'pm (orange) → compétences Produit / PM / stratégie.',
            'langNatif / langPro → affichage des langues dans un CV ou profil.',
            'Pour un groupe de filtres : gérer l\'état activeTag dans le parent, passer isActive et isDimmed en dérivé.',
            'Ne pas utiliser clickable sans onClick — le composant se comporte comme un bouton.',
          ]}
          code={`import Tag from '../components/Tag/Tag';
import { useState } from 'react';

// Display statique
<Tag category="design">Product Design</Tag>
<Tag category="dev">Claude Code</Tag>

// Groupe de filtres interactifs
const [active, setActive] = useState(null);
const toggle = (id) => setActive(prev => prev === id ? null : id);

{skills.map(skill => (
  <Tag
    key={skill.id}
    category="primary"
    clickable
    isActive={active === skill.id}
    isDimmed={active !== null && active !== skill.id}
    onClick={() => toggle(skill.id)}
  >
    {skill.label}
  </Tag>
))}

// Langues
<Tag category="langNatif">FR — Natif</Tag>
<Tag category="langPro">EN — Pro</Tag>`}
        />
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

        <DocBlock
          usage={[
            'Bibliothèque unique autorisée : @mui/icons-material. Aucune autre librairie d\'icônes.',
            'Import nommé depuis le package : import ArrowForwardIcon from \'@mui/icons-material/ArrowForward\';',
            'Taille par défaut dans un texte ou bouton : sx={{ fontSize: 15 }} ou sx={{ fontSize: 16 }}.',
            'Taille standalone (icône seule) : sx={{ fontSize: 20 }} à sx={{ fontSize: 24 }}.',
            'Couleur : utiliser sx={{ color: tokens.muted }} ou sx={{ color: tokens.text }} selon le contexte.',
            'Pour des icônes non listées ici : chercher sur fonts.google.com/icons et importer avec le même pattern.',
          ]}
          code={`import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

// Dans un Button (endIcon)
<Button variant="primary" endIcon={<ArrowForwardIcon sx={{ fontSize: 15 }} />}>
  Voir le projet
</Button>

// Standalone dans une Box
<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
  <EmailIcon sx={{ fontSize: 18, color: tokens.muted }} />
  <Typography>reynier.design@gmail.com</Typography>
</Box>

// Lien externe (ArrowOutward = convention du portfolio)
<Button variant="ghost" href="https://..." endIcon={<ArrowOutwardIcon sx={{ fontSize: 14 }} />}>
  LinkedIn
</Button>`}
        />
      </Section>

      <Divider sx={{ mb: 7 }} />

      {/* ── TESTIMONIAL CARD ──────────────────────────────── */}
      <Section title="TestimonialCard" subtitle="Featured (pleine largeur, 2 colonnes internes) + 2 cartes compactes côte à côte.">
        <Group label="Layout Option D — featured full width + 2 en dessous">
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
            <TestimonialCard
              featured
              companyLogo="/images/logo-pepyte.svg"
              stars={5}
              keyQuote="Une augmentation importante de la satisfaction des utilisateurs et de l'efficacité des processus de recrutement."
              quote="Thomas a grandement amélioré notre plateforme de recrutement. Il a su comprendre les besoins des utilisateurs. Il a également collaboré efficacement avec notre équipe de développement."
              name="Alexis Vaysse"
              role="Co-CEO & Co-Founder · Pepyte"
              avatar="/images/avatar-alexis.png"
              linkedinUrl="#"
            />
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              <TestimonialCard
                companyLogo="/images/logo-pepyte.svg"
                stars={5}
                keyQuote="Une capacité de travail impressionnante à une positivité contagieuse."
                quote="Thomas est un Product Designer motivé, combinant une capacité de travail impressionnante à une positivité contagieuse. Fortement recommandé !"
                name="Antoine Girard"
                role="Co-CEO & Co-Founder · Pepyte"
                avatar="/images/avatar-antoine.png"
                linkedinUrl="#"
              />
              <TestimonialCard
                companyLogo="/images/logo-weborama.svg"
                stars={5}
                keyQuote="Faire de l'IA un véritable allié stratégique."
                quote="Thomas a su faire de l'IA un véritable allié stratégique, l'intégrant avec maîtrise dans ses méthodes de conception pour créer des produits plus intelligents."
                name="Donia Ben Ghorbal"
                role="Lead Product Designer · Weborama"
                avatar="/images/avatar-donia.png"
                linkedinUrl="#"
              />
            </Box>
          </Box>
        </Group>

        <DocBlock
          props={[
            ['featured', 'boolean', 'false', 'Layout pleine largeur 2 colonnes (keyQuote gauche, quote droite). Sans featured = card compacte verticale.'],
            ['keyQuote', 'string', '—', 'Phrase courte mise en avant en gras. Accroche du témoignage (max ~12 mots).'],
            ['quote', 'string', '—', 'Citation complète affichée en italique, corps du témoignage.'],
            ['name', 'string', '—', 'Nom complet de l\'auteur.'],
            ['role', 'string', '—', 'Rôle et entreprise. Format : "Rôle · Entreprise".'],
            ['avatar', 'string', '—', 'Chemin image avatar. Ex : "/images/avatar-alexis.png".'],
            ['stars', 'number', '5', 'Nombre d\'étoiles (1–5).'],
            ['companyLogo', 'string', '—', 'Chemin logo entreprise (SVG recommandé). Ex : "/images/logo-pepyte.svg".'],
            ['linkedinUrl', 'string', '—', 'URL LinkedIn de l\'auteur. Si fourni, affiche un badge LinkedIn cliquable.'],
          ]}
          usage={[
            'Layout recommandé (Home) : 1 carte featured pleine largeur + 2 cartes compactes en grid 2 colonnes en dessous.',
            'featured=true → pleine largeur, padding 32px, grid interne 1fr/1fr. À utiliser seul ou en tête de section.',
            'featured=false → card compacte verticale, padding 24px. À utiliser dans une grille.',
            'Images : placer dans public/images/. Les avatars doivent être carrés (ratio 1:1), format WebP ou PNG.',
            'Logos entreprise : format SVG recommandé pour la netteté. Hauteur affichée : 20-24px.',
            'keyQuote doit être une accroche forte — pas la citation complète. La citation complète va dans quote.',
          ]}
          code={`import TestimonialCard from '../components/TestimonialCard/TestimonialCard';

// Layout recommandé : 1 featured + 2 compactes
<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
  <TestimonialCard
    featured
    companyLogo="/images/logo-pepyte.svg"
    stars={5}
    keyQuote="Phrase courte et percutante ici."
    quote="Citation complète plus longue ici..."
    name="Prénom Nom"
    role="Rôle · Entreprise"
    avatar="/images/avatar.png"
    linkedinUrl="https://linkedin.com/in/..."
  />
  <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
    <TestimonialCard
      companyLogo="/images/logo.svg"
      stars={5}
      keyQuote="Accroche courte."
      quote="Citation complète..."
      name="Prénom Nom"
      role="Rôle · Entreprise"
      avatar="/images/avatar.png"
      linkedinUrl="https://linkedin.com/in/..."
    />
    {/* 2ème carte compacte */}
  </Box>
</Box>`}
        />
      </Section>

      <Divider sx={{ mb: 4 }} />

      <Section title="Toggle" subtitle="Switch on/off — selected (brand 600→700→800) · not selected (gray 400→500→600).">
        <Group label="États">
          <ToggleDemo />
        </Group>
        <Group label="Avec label">
          <ToggleLabelDemo />
        </Group>

        <DocBlock
          props={[
            ['checked', 'boolean', 'false', 'État on/off contrôlé depuis le parent.'],
            ['onChange', 'function', '—', 'Callback appelé au clic. Reçoit le nouvel état boolean : (newValue) => void.'],
            ['label', 'string', '—', 'Texte affiché à droite du toggle. Optionnel.'],
          ]}
          usage={[
            'Composant contrôlé : gérer l\'état checked dans le parent avec useState.',
            'Utiliser pour des choix réversibles : afficher/masquer un champ, activer une option, switcher un mode.',
            'Ne pas utiliser pour des actions irréversibles (suppression, envoi) — utiliser Button à la place.',
            'Le label est optionnel mais recommandé pour la clarté de l\'interface.',
          ]}
          code={`import Toggle from '../components/Toggle/Toggle';
import { useState } from 'react';

// Toggle simple
const [showContext, setShowContext] = useState(false);

<Toggle
  checked={showContext}
  onChange={setShowContext}
  label="Ajouter un contexte"
/>

// Affichage conditionnel lié au toggle
{showContext && (
  <FormField
    type="textarea"
    label="Contexte"
    placeholder="Décris le contexte du poste..."
    rows={3}
  />
)}`}
        />
      </Section>

      <Divider sx={{ mb: 4 }} />

      <Section title="FormField" subtitle="Input et Textarea — enabled (gray100) · hover (gray200) · focus (fond transparent, bordure brand 500).">
        <Group label="Input">
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 360 }}>
            <FormField label="Entreprise" placeholder="Ex : Weborama" />
            <FormField label="Poste" placeholder="Ex : Product Designer IA" />
          </Box>
        </Group>
        <Group label="Textarea">
          <Box sx={{ maxWidth: 360 }}>
            <FormField
              type="textarea"
              label="Offre d'emploi"
              placeholder="Colle ici le texte complet de l'offre…"
              rows={4}
            />
          </Box>
        </Group>

        <DocBlock
          props={[
            ['type', "'input' | 'textarea'", "'input'", 'Type de champ. input = ligne unique, textarea = zone multi-lignes.'],
            ['label', 'string', '—', 'Label affiché au-dessus du champ (uppercase, 11px, fontWeight 600).'],
            ['placeholder', 'string', '—', 'Texte indicatif dans le champ vide.'],
            ['value', 'string', '—', 'Valeur contrôlée. Requis pour un composant contrôlé.'],
            ['onChange', 'function', '—', 'Handler de changement : (e) => setValue(e.target.value).'],
            ['rows', 'number', '5', 'Nombre de lignes visible pour le textarea.'],
            ['sx', 'object', '{}', 'Overrides de style sur le wrapper externe.'],
          ]}
          usage={[
            'Composant contrôlé : passer value + onChange pour lire et écrire la valeur depuis le parent.',
            'Toujours utiliser un label pour l\'accessibilité et la clarté — ne pas laisser le champ sans label.',
            'type="input" pour les champs courts (nom, email, entreprise, poste, URL).',
            'type="textarea" pour les contenus longs (offre d\'emploi, message, contexte, prompt).',
            'rows entre 3 et 6 selon la quantité de texte attendue. 4 est un bon défaut pour les textareas de formulaire.',
            'Les états visuels (hover, focus) sont gérés automatiquement en interne.',
          ]}
          code={`import FormField from '../components/FormField/FormField';
import { useState } from 'react';

const [company, setCompany] = useState('');
const [jobOffer, setJobOffer] = useState('');

// Input court
<FormField
  label="Entreprise"
  placeholder="Ex : Weborama"
  value={company}
  onChange={(e) => setCompany(e.target.value)}
/>

// Textarea long
<FormField
  type="textarea"
  label="Offre d'emploi"
  placeholder="Colle ici le texte complet de l'offre…"
  value={jobOffer}
  onChange={(e) => setJobOffer(e.target.value)}
  rows={5}
/>

// Disposition en colonne avec espacement
<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 480 }}>
  <FormField label="Prénom" placeholder="Thomas" value={...} onChange={...} />
  <FormField label="Email" placeholder="thomas@..." value={...} onChange={...} />
</Box>`}
        />
      </Section>

      <Divider sx={{ mb: 7 }} />

      {/* ── PATTERNS DE PAGES ─────────────────────────────── */}
      <Section title="Patterns de pages" subtitle="Structures récurrentes pour créer de nouvelles pages et sections." label="Architecture">

        {/* Pattern : Structure globale */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="caption" sx={{ display: 'block', mb: 1, color: tokens.muted, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Structure globale de l'app
          </Typography>
          <DocBlock
            usage={[
              'App.jsx gère le routing React Router. Chaque route pointe vers une page dans src/pages/.',
              'Toutes les pages (sauf /design-system et /lettre-motivation) sont wrappées dans <CaseLayout> ou directement avec <Navbar> + <Footer>.',
              'La Navbar est fixe en haut (position sticky, zIndex 100, fond blanc avec bordure bottom).',
              'Largeur de contenu max : maxWidth: 1100 (pages standard) ou 860 (Design System, pages de contenu dense).',
              'Padding horizontal responsive : px: { xs: 2, md: 4 } ou px: { xs: 3, sm: 5, md: 8 }.',
              'Padding vertical de page : py: 8 (64px) ou pt: 10, pb: 12.',
              'Espacement entre sections majeures : mb: 10 à mb: 14.',
            ]}
            code={`// App.jsx — structure de routing
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './layouts/Navbar';
import Footer from './layouts/Footer';

// Chaque page reçoit Navbar + Footer via son propre layout
// ou directement si elle est standalone

// Structure d'une page standard
export default function MaNouvellePage() {
  return (
    <>
      <Navbar />
      <Box component="main" sx={{ minHeight: '100vh' }}>
        {/* Contenu */}
      </Box>
      <Footer />
    </>
  );
}

// Conteneur de page standard
<Box sx={{
  maxWidth: 1100,
  mx: 'auto',
  px: { xs: 2, md: 4 },
  py: 8,
}}>

// Conteneur de page dense (contenu long / doc)
<Box sx={{
  maxWidth: 860,
  mx: 'auto',
  px: { xs: 2, md: 4 },
  py: 8,
}}>`}
          />
        </Box>

        {/* Pattern : Section avec header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="caption" sx={{ display: 'block', mb: 1, color: tokens.muted, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Pattern : Section avec header surtitre + titre + description
          </Typography>
          <DocBlock
            usage={[
              'Pattern récurrent pour toutes les sections de la Home et des pages Case Study.',
              'Structure : surtitre (caption bleu uppercase) + titre H2 + description muted (optionnel) + contenu.',
              'Espacement section : mb: 10 à mb: 14 entre les sections majeures.',
              'Le surtitre contextualise la section (ex : "Projets", "À propos", "Témoignages").',
            ]}
            code={`// Pattern de section avec header
<Box component="section" sx={{ mb: 12 }}>

  {/* Surtitre */}
  <Typography variant="caption" sx={{
    color: tokens.blue,
    textTransform: 'uppercase',
    fontWeight: 700,
    letterSpacing: '0.1em',
    display: 'block',
    mb: 1,
  }}>
    Projets
  </Typography>

  {/* Titre */}
  <Typography variant="h2" sx={{
    fontSize: 'clamp(24px, 3vw, 36px)',
    fontWeight: 700,
    letterSpacing: '-0.025em',
    color: tokens.text,
    mb: 1.5,
  }}>
    Études de cas
  </Typography>

  {/* Description (optionnel) */}
  <Typography sx={{
    color: tokens.muted,
    fontWeight: 300,
    maxWidth: 480,
    mb: 5,
    lineHeight: 1.6,
  }}>
    Trois projets qui illustrent ma démarche de bout en bout.
  </Typography>

  {/* Contenu */}
  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
    {/* Cards ici */}
  </Box>

</Box>`}
          />
        </Box>

        {/* Pattern : Card de projet */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="caption" sx={{ display: 'block', mb: 1, color: tokens.muted, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Pattern : Card de projet (Case Study card)
          </Typography>
          <DocBlock
            usage={[
              'Structure type d\'une card de projet sur la Home ou dans une grille.',
              'Image de cover en haut (ratio 16/9 ou 3/2), puis badge + titre + description + CTA.',
              'Fond blanc, border tokens.border, borderRadius 14px, overflow hidden.',
              'Hover : légère élévation (boxShadow) ou transition de bordure.',
              'Le CTA est un Button variant="ghost" ou un lien texte + ArrowForwardIcon.',
            ]}
            code={`// Card de projet
<Box
  component="article"
  sx={{
    background: '#fff',
    border: \`1px solid \${tokens.border}\`,
    borderRadius: '14px',
    overflow: 'hidden',
    transition: 'box-shadow 0.2s',
    '&:hover': { boxShadow: '0 8px 32px rgba(25,86,219,0.1)' },
  }}
>
  {/* Image cover */}
  <Box
    component="img"
    src="/images/cover-weborama.png"
    alt="Weborama"
    sx={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', display: 'block' }}
  />

  {/* Contenu */}
  <Box sx={{ p: 3 }}>
    <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
      <Badge variant="case">Étude de cas</Badge>
      <Badge variant="default">2025</Badge>
    </Box>

    <Typography sx={{ fontSize: '18px', fontWeight: 700, color: tokens.text, mb: 1, letterSpacing: '-0.01em' }}>
      Weborama
    </Typography>

    <Typography sx={{ color: tokens.muted, fontWeight: 300, fontSize: '14px', lineHeight: 1.6, mb: 3 }}>
      Design System pour 4 outils SaaS + Founding Designer IA.
    </Typography>

    <Button
      variant="ghost"
      size="sm"
      href="/case/weborama"
      endIcon={<ArrowForwardIcon sx={{ fontSize: 14 }} />}
    >
      Voir l'étude de cas
    </Button>
  </Box>
</Box>`}
          />
        </Box>

        {/* Pattern : Page Case Study */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="caption" sx={{ display: 'block', mb: 1, color: tokens.muted, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Pattern : Page Case Study (structure)
          </Typography>
          <DocBlock
            usage={[
              'Structure canonique d\'une page Case Study : Hero → Contexte → Process → Impact → CTA.',
              'Hero : Badge + Titre + Tagline + Meta (période, rôle, secteur) + Cover image.',
              'Sections de contenu : alternance texte + visuel ou texte seul selon la richesse du contenu.',
              'Les pages Case Study existantes sont dans src/pages/CaseWeborama.jsx, CaseNectar.jsx, CasePepyte.jsx.',
              'Layout wrappé dans CaseLayout (src/layouts/CaseLayout.jsx) — importer depuis là.',
            ]}
            code={`// Structure d'une page Case Study
import CaseLayout from '../layouts/CaseLayout';
import Badge from '../components/Badge/Badge';
import Button from '../components/Button/Button';
import { tokens } from '../theme/theme';

export default function CaseMonProjet() {
  return (
    <CaseLayout>
      <Box sx={{ maxWidth: 860, mx: 'auto', px: { xs: 2, md: 4 } }}>

        {/* ── Hero ── */}
        <Box sx={{ pt: 8, pb: 6 }}>
          <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
            <Badge variant="case">Étude de cas</Badge>
            <Badge variant="default">2025</Badge>
          </Box>
          <Typography sx={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, letterSpacing: '-0.03em', color: tokens.text, mb: 2 }}>
            Nom du projet
          </Typography>
          <Typography sx={{ color: tokens.muted, fontWeight: 300, maxWidth: 520, lineHeight: 1.7, mb: 4 }}>
            Tagline courte qui résume la mission et l'impact en 2 phrases.
          </Typography>
          {/* Meta : période, rôle, secteur */}
          <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            {[['Période', 'Jan 2025 – Présent'], ['Rôle', 'Product Designer IA'], ['Secteur', 'SaaS B2B']].map(([label, value]) => (
              <Box key={label}>
                <Typography sx={{ fontSize: 11, fontWeight: 700, color: tokens.muted, textTransform: 'uppercase', letterSpacing: '0.06em', mb: 0.5 }}>{label}</Typography>
                <Typography sx={{ fontSize: 14, fontWeight: 500, color: tokens.text }}>{value}</Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Cover image */}
        <Box component="img" src="/images/cover-projet.png" sx={{ width: '100%', borderRadius: '12px', mb: 8 }} />

        {/* ── Section contenu ── */}
        <Box component="section" sx={{ mb: 8 }}>
          <Typography sx={{ fontSize: 22, fontWeight: 700, color: tokens.text, mb: 2 }}>Contexte</Typography>
          <Typography sx={{ color: tokens.muted, fontWeight: 300, lineHeight: 1.75 }}>
            Description du contexte...
          </Typography>
        </Box>

      </Box>
    </CaseLayout>
  );
}`}
          />
        </Box>

        {/* Pattern : Formulaire séquentiel */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="caption" sx={{ display: 'block', mb: 1, color: tokens.muted, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Pattern : Formulaire séquentiel (ex : Lettre de motivation)
          </Typography>
          <DocBlock
            usage={[
              'Pattern utilisé dans LettreMotivation.jsx : champs empilés + toggle optionnel + CTA primaire.',
              'Disposition : colonne avec gap: 2 entre les champs, gap: 3 avant le CTA.',
              'Validation côté client : désactiver le Button si les champs requis sont vides.',
              'État de chargement : remplacer le label du bouton ou ajouter un indicateur visuel.',
              'Résultat généré : afficher dans une Box avec fond bgPanel, border, borderRadius 12px, p: 3.',
            ]}
            code={`import { useState } from 'react';
import FormField from '../components/FormField/FormField';
import Toggle from '../components/Toggle/Toggle';
import Button from '../components/Button/Button';

export default function MonFormulaire() {
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [jobOffer, setJobOffer] = useState('');
  const [showContext, setShowContext] = useState(false);
  const [context, setContext] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const isValid = company.trim() && role.trim() && jobOffer.trim();

  const handleGenerate = async () => {
    setLoading(true);
    // appel API ici
    setLoading(false);
  };

  return (
    <Box sx={{ maxWidth: 560, mx: 'auto', display: 'flex', flexDirection: 'column', gap: 2 }}>
      <FormField label="Entreprise" placeholder="Ex : Weborama" value={company} onChange={e => setCompany(e.target.value)} />
      <FormField label="Poste" placeholder="Ex : Product Designer IA" value={role} onChange={e => setRole(e.target.value)} />
      <FormField type="textarea" label="Offre d'emploi" placeholder="Colle l'offre ici…" value={jobOffer} onChange={e => setJobOffer(e.target.value)} rows={5} />

      <Toggle checked={showContext} onChange={setShowContext} label="Ajouter un contexte" />
      {showContext && (
        <FormField type="textarea" label="Contexte" placeholder="Décris le contexte…" value={context} onChange={e => setContext(e.target.value)} rows={3} />
      )}

      <Button variant="primary" onClick={handleGenerate} disabled={!isValid || loading}>
        {loading ? 'Génération en cours…' : 'Générer la lettre'}
      </Button>

      {result && (
        <Box sx={{ background: tokens.bgPanel, border: \`1px solid \${tokens.border}\`, borderRadius: '12px', p: 3, mt: 1 }}>
          <Typography sx={{ fontSize: 14, color: tokens.text, lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>
            {result}
          </Typography>
        </Box>
      )}
    </Box>
  );
}`}
          />
        </Box>

        {/* Pattern : Nouveau composant custom */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" sx={{ display: 'block', mb: 1, color: tokens.muted, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Pattern : Créer un nouveau composant
          </Typography>
          <DocBlock
            usage={[
              'Chaque composant réutilisable va dans src/components/NomDuComposant/NomDuComposant.jsx.',
              'Importer tokens depuis ../../theme/theme pour toutes les couleurs.',
              'Pas de TypeScript — JavaScript pur avec destructuration des props.',
              'Valeurs par défaut dans la signature de la fonction (defaultProps dépréciés).',
              'Après création, ajouter le composant dans la page DesignSystem.jsx (section dédiée + DocBlock).',
              'Règle icônes : utiliser exclusivement @mui/icons-material — jamais d\'autre librairie.',
            ]}
            code={`// src/components/MonComposant/MonComposant.jsx
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { tokens } from '../../theme/theme';

export default function MonComposant({
  label,
  variant = 'default',
  children,
  sx = {},
}) {
  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 1,
        px: 2,
        py: 1,
        borderRadius: '8px',
        background: tokens.bgPanel,
        border: \`1px solid \${tokens.border}\`,
        fontFamily: "'Outfit', sans-serif",
        ...sx,
      }}
    >
      {label && (
        <Typography sx={{ fontSize: 12, fontWeight: 600, color: tokens.muted }}>
          {label}
        </Typography>
      )}
      {children}
    </Box>
  );
}

// Utilisation
import MonComposant from '../components/MonComposant/MonComposant';
<MonComposant label="Statut">En cours</MonComposant>`}
          />
        </Box>

      </Section>

      <Divider sx={{ mb: 4 }} />

      <Typography variant="caption" sx={{ color: tokens.muted, display: 'block', textAlign: 'center' }}>
        Design System · Thomas Reynier · Portfolio 2025
      </Typography>
    </Box>
  );
}

import { useEffect, useState } from 'react';
import { Avatar } from '@astryxdesign/core/Avatar';
import { Badge } from '@astryxdesign/core/Badge';
import { Blockquote } from '@astryxdesign/core/Blockquote';
import { Button } from '@astryxdesign/core/Button';
import { Card } from '@astryxdesign/core/Card';
import { CodeBlock } from '@astryxdesign/core/CodeBlock';
import { Divider } from '@astryxdesign/core/Divider';
import { Grid } from '@astryxdesign/core/Grid';
import { Heading } from '@astryxdesign/core/Heading';
import { IconButton } from '@astryxdesign/core/IconButton';
import { Link } from '@astryxdesign/core/Link';
import { Switch } from '@astryxdesign/core/Switch';
import { Text } from '@astryxdesign/core/Text';
import { TextArea } from '@astryxdesign/core/TextArea';
import { TextInput } from '@astryxdesign/core/TextInput';
import { ToggleButton, ToggleButtonGroup } from '@astryxdesign/core/ToggleButton';
import { Tooltip } from '@astryxdesign/core/Tooltip';
import { VStack, HStack } from '@astryxdesign/core/Layout';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import RouteOutlinedIcon from '@mui/icons-material/RouteOutlined';
import LayersOutlinedIcon from '@mui/icons-material/LayersOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import AstryxPage from '../layouts/AstryxPage';
import AccessGate from '../components/AccessGate/AccessGate';
import ProjectCard from '../components/ProjectCard/ProjectCard';
import StreamingText from '../components/StreamingText/StreamingText';
import Intro from '../components/Intro/Intro';
import { PROJECTS } from '../data/home';
import './DesignSystem.css';

// Documentation du design system du site : Astryx (thème « portfolio », theme/astryxTheme.js)
// + les composants maison. Page privée.

const PASSWORD = import.meta.env.VITE_DS_PASSWORD || 'thomas2026';

export default function DesignSystem() {
  const [unlocked, setUnlocked] = useState(() => localStorage.getItem('ds_auth') === '1');
  if (!unlocked) {
    return (
      <AccessGate
        title="Design System"
        description="Accès réservé — entrez le mot de passe."
        placeholder="Mot de passe"
        errorMessage="Mot de passe incorrect"
        check={pwd => pwd === PASSWORD}
        onUnlock={() => { localStorage.setItem('ds_auth', '1'); setUnlocked(true); }}
      />
    );
  }
  return <DesignSystemContent />;
}

// ── Structure de la page ─────────────────────────────────────────────────────

function DocSection({ id, label = 'Composant', title, subtitle, children }) {
  return (
    <section id={id} className="ds-section">
      <VStack gap={4}>
        <VStack gap={1}>
          <p className="section-label">{label}</p>
          <Heading level={2} type="display-3">{title}</Heading>
          {subtitle && <Text color="secondary">{subtitle}</Text>}
        </VStack>
        {children}
      </VStack>
    </section>
  );
}

function Demo({ label, children }) {
  return (
    <VStack gap={2}>
      {label && <Text type="label" color="secondary">{label}</Text>}
      <HStack gap={2} wrap="wrap" vAlign="center">{children}</HStack>
    </VStack>
  );
}

function Usage({ items, code }) {
  return (
    <Card padding={5} variant="muted">
      <VStack gap={3}>
        <Text type="label" color="secondary">Règles d'usage</Text>
        <ul className="ds-usage">
          {items.map(item => <li key={item}><Text>{item}</Text></li>)}
        </ul>
        {code && <CodeBlock code={code} language="jsx" />}
      </VStack>
    </Card>
  );
}

// ── Tokens ───────────────────────────────────────────────────────────────────

const COLOR_GROUPS = [
  { label: 'Surfaces', tokens: ['--color-background-body', '--color-background-surface', '--color-background-muted', '--color-background-inverted'] },
  { label: 'Texte & icônes', tokens: ['--color-text-primary', '--color-text-secondary', '--color-text-accent', '--color-on-accent'] },
  { label: 'Accent & bordures', tokens: ['--color-accent', '--color-accent-muted', '--color-border', '--color-border-emphasized'] },
  { label: 'Catégories (badges)', tokens: ['--color-background-blue', '--color-background-purple', '--color-background-teal', '--color-background-orange'] },
];
const RADII = ['--radius-inner', '--radius-element', '--radius-container', '--radius-full'];

// Valeur résolue d'un token dans le thème courant (clair ou sombre)
function useTokenValues(names) {
  const [values, setValues] = useState({});
  useEffect(() => {
    const read = () => {
      const root = document.querySelector('.ax-page');
      if (!root) return;
      const probe = document.createElement('div');
      root.appendChild(probe);
      const next = {};
      for (const name of names) {
        probe.style.color = `var(${name})`;
        next[name] = name.startsWith('--radius') ? getComputedStyle(root).getPropertyValue(name).trim() : getComputedStyle(probe).color;
      }
      probe.remove();
      setValues(next);
    };
    read();
    const obs = new MutationObserver(read);
    obs.observe(document.documentElement, { attributes: true });
    return () => obs.disconnect();
  }, [names]);
  return values;
}

const ALL_COLOR_TOKENS = COLOR_GROUPS.flatMap(g => g.tokens);

function Colors() {
  const values = useTokenValues(ALL_COLOR_TOKENS);
  return (
    <DocSection id="couleurs" label="Fondations" title="Couleurs" subtitle="Tokens du thème « portfolio », aux couleurs du site. Chaque token a une valeur claire et une valeur sombre : bascule le mode pour les voir changer.">
      {COLOR_GROUPS.map(group => (
        <VStack key={group.label} gap={2}>
          <Text type="label" color="secondary">{group.label}</Text>
          <Grid columns={{ minWidth: 180, max: 4 }} gap={3}>
            {group.tokens.map(name => (
              <div key={name} className="ds-swatch">
                <span className="ds-swatch-color" style={{ background: `var(${name})` }} />
                <VStack gap={0} padding={3}>
                  <Text size="sm" weight="semibold" maxLines={1}>{name.replace('--color-', '')}</Text>
                  <Text type="code" size="xsm" color="secondary">{values[name] || '…'}</Text>
                </VStack>
              </div>
            ))}
          </Grid>
        </VStack>
      ))}
      <Usage
        items={[
          'Toujours passer par un token (var(--color-…)) : jamais de couleur en dur dans une page.',
          'Les valeurs se règlent dans theme/astryxTheme.js, en paires [clair, sombre].',
          'Le dégradé de marque (--brand-gradient) est réservé au bouton primary et au mot « IA » du titre.',
        ]}
      />
    </DocSection>
  );
}

function Typography() {
  return (
    <DocSection id="typographie" label="Fondations" title="Typographie" subtitle="Outfit pour tout le site ; Albert Sans uniquement dans l'Intro.">
      <Card padding={6}>
        <VStack gap={4}>
          <VStack gap={0.5}><Text type="supporting">Heading · display-1 — titre du hero</Text><Heading level={3} type="display-1">Product Designer</Heading></VStack>
          <VStack gap={0.5}><Text type="supporting">Heading · display-2 — titre d'étude de cas</Text><Heading level={3} type="display-2">Weborama</Heading></VStack>
          <VStack gap={0.5}><Text type="supporting">Heading · display-3 — titre de section</Text><Heading level={3} type="display-3">Mes derniers projets</Heading></VStack>
          <VStack gap={0.5}><Text type="supporting">Heading · level 3 — titre de carte</Text><Heading level={3}>Pepyte</Heading></VStack>
          <Divider />
          <VStack gap={0.5}><Text type="supporting">Text · large</Text><Text type="large">La recherche oriente mes décisions.</Text></VStack>
          <VStack gap={0.5}><Text type="supporting">Text · body</Text><Text>Audit de 974 composants et ateliers de co-construction.</Text></VStack>
          <VStack gap={0.5}><Text type="supporting">Text · label</Text><Text type="label">Compétences</Text></VStack>
          <VStack gap={0.5}><Text type="supporting">Text · supporting</Text><Text type="supporting">26 mois · Figma · Notion</Text></VStack>
          <VStack gap={0.5}><Text type="supporting">section-label (maison)</Text><p className="section-label">Études de cas</p></VStack>
        </VStack>
      </Card>
      <Usage
        items={[
          'Titres : Heading avec un level (structure du document) et un type display-1/2/3 pour la taille.',
          'Les tailles display sont celles du site, réglées dans theme/astryxTheme.js (components.heading).',
          'Texte : Text avec un type sémantique (body, large, label, supporting) plutôt que des tailles à la main.',
        ]}
      />
    </DocSection>
  );
}

function Radii() {
  const values = useTokenValues(RADII);
  return (
    <DocSection id="rayons" label="Fondations" title="Rayons">
      <HStack gap={4} wrap="wrap">
        {RADII.map(name => (
          <VStack key={name} gap={1}>
            <span className="ds-radius" style={{ borderRadius: `var(${name})` }} />
            <Text size="sm" weight="semibold">{name.replace('--radius-', '')}</Text>
            <Text type="code" size="xsm" color="secondary">{values[name] || '…'}</Text>
          </VStack>
        ))}
      </HStack>
      <Usage items={['element (8px) : boutons, champs, vignettes.', 'container (12px) : cartes.', 'full : badges, pastilles, avatars.']} />
    </DocSection>
  );
}

// ── Composants Astryx ────────────────────────────────────────────────────────

function Buttons() {
  return (
    <DocSection id="button" title="Button & IconButton" subtitle="Primary (dégradé de marque) · Secondary (tonal violet) · Ghost.">
      <Demo label="Variantes">
        <Button label="Voir mes projets" variant="primary" icon={<GridViewOutlinedIcon sx={{ fontSize: 16 }} />} />
        <Button label="LinkedIn" variant="secondary" icon={<LinkedInIcon sx={{ fontSize: 16 }} />} />
        <Button label="Exporter en PDF" variant="ghost" />
        <Button label="Désactivé" variant="primary" isDisabled />
        <Button label="Chargement" variant="primary" isLoading />
      </Demo>
      <Demo label="Tailles">
        <Button label="Petit" variant="primary" size="sm" />
        <Button label="Moyen" variant="primary" />
        <Button label="Grand" variant="primary" size="lg" />
      </Demo>
      <Demo label="IconButton">
        <IconButton label="Email" tooltip="Email" icon={<MailOutlinedIcon sx={{ fontSize: 18 }} />} variant="ghost" />
        <IconButton label="LinkedIn" tooltip="LinkedIn" icon={<LinkedInIcon sx={{ fontSize: 18 }} />} variant="ghost" />
        <IconButton label="Télécharger" tooltip="Télécharger mon CV" icon={<FileDownloadOutlinedIcon sx={{ fontSize: 18 }} />} variant="secondary" />
      </Demo>
      <Usage
        items={[
          'Un seul bouton primary par zone : l\'action principale.',
          'href transforme le bouton en lien (contact, LinkedIn) ; target="_blank" pour un site externe.',
          'IconButton pour une action sans texte : toujours un label (lu par les lecteurs d\'écran) et une infobulle.',
        ]}
        code={`import { Button } from '@astryxdesign/core/Button';

<Button label="Voir mes projets" variant="primary" size="lg"
  icon={<GridViewOutlinedIcon sx={{ fontSize: 16 }} />} onClick={…} />`}
      />
    </DocSection>
  );
}

function Badges() {
  return (
    <DocSection id="badge" title="Badge" subtitle="Rôles, tags projet, catégories d'outils. Toujours en lecture seule.">
      <Demo label="Tags projet (blue)">
        {['UX Research', 'Design System', 'Design IA'].map(t => <Badge key={t} label={t} variant="blue" />)}
      </Demo>
      <Demo label="Rôles">
        <Badge label="UX Research & Design" variant="purple" />
        <Badge label="Design System Lead" variant="teal" />
        <Badge label="Founding Designer IA" variant="orange" />
        <Badge label="En entretien" icon={<LockOutlinedIcon sx={{ fontSize: 12 }} />} />
      </Demo>
      <Demo label="Outils — Design · Dev · PM">
        <Badge label="Figma" variant="purple" />
        <Badge label="Claude Code" variant="teal" />
        <Badge label="Jira" variant="orange" />
      </Demo>
      <Usage items={['Un badge n\'est jamais cliquable : pour filtrer, utiliser ToggleButton.', 'Une à trois mots maximum.']} />
    </DocSection>
  );
}

function Selection() {
  const [skills, setSkills] = useState(['Design System']);
  const [ton, setTon] = useState('equilibre');
  const [on, setOn] = useState(true);
  return (
    <DocSection id="selection" title="ToggleButton & Switch" subtitle="Filtres de compétences (accueil), choix du ton (lettre), options on/off.">
      <Demo label="ToggleButton — sélection multiple">
        {['UX Research', 'Product Design', 'Design System'].map(s => (
          <ToggleButton key={s} label={s} size="sm" isPressed={skills.includes(s)} onPressedChange={() => setSkills(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])} />
        ))}
      </Demo>
      <Demo label="ToggleButtonGroup — choix unique">
        <ToggleButtonGroup label="Ton" value={ton} onChange={v => v && setTon(v)} size="sm">
          <ToggleButton value="equilibre" label="Équilibré" />
          <ToggleButton value="formel" label="Formel" />
          <ToggleButton value="concis" label="Concis" />
        </ToggleButtonGroup>
      </Demo>
      <Demo label="Switch">
        <Switch label="Contexte complémentaire" value={on} onChange={setOn} />
      </Demo>
      <Usage items={['Switch pour un choix réversible (afficher un champ, activer une option), jamais pour une action.']} />
    </DocSection>
  );
}

function Fields() {
  const [value, setValue] = useState('');
  const [text, setText] = useState('');
  return (
    <DocSection id="champs" title="TextInput & TextArea" subtitle="Formulaires du matching IA, de la lettre et des écrans d'accès.">
      <Grid columns={{ minWidth: 260, max: 2 }} gap={4}>
        <TextInput label="Entreprise" placeholder="Ex : Weborama" value={value} onChange={setValue} width="100%" />
        <TextInput label="Code d'accès" type="password" placeholder="Code d'accès" value="" onChange={() => {}} status={{ type: 'error', message: 'Code incorrect.' }} statusVariant="detached" width="100%" />
      </Grid>
      <TextArea label="Votre offre d'emploi" placeholder="Collez l'offre complète ici…" value={text} onChange={setText} rows={4} />
      <Usage items={['Toujours un label (masquable avec isLabelHidden) : il est lu par les lecteurs d\'écran.', 'Les erreurs passent par status, pas par un texte rouge à part.']} />
    </DocSection>
  );
}

function Content() {
  return (
    <DocSection id="contenu" title="Card, Avatar, Blockquote, Link, Divider" subtitle="Cartes projet et témoignages, liens, séparateurs.">
      <Grid columns={{ minWidth: 280, max: 2 }} gap={4}>
        <Card padding={6}>
          <VStack gap={3}>
            <Text color="accent">★★★★★</Text>
            <Blockquote>Thomas a su faire de l'IA un véritable allié stratégique.</Blockquote>
            <HStack gap={2} vAlign="center">
              <Avatar src="/images/avatar-donia.png" name="Donia Ben Ghorbal" size="md" tooltip={false} />
              <VStack gap={0}><Text weight="semibold">Donia Ben Ghorbal</Text><Text type="supporting">Lead Product Designer · Weborama</Text></VStack>
            </HStack>
          </VStack>
        </Card>
        <Card padding={6} variant="muted">
          <VStack gap={3}>
            <Link href="/" isStandalone><HStack gap={1} vAlign="center"><ArrowBackIcon sx={{ fontSize: 14 }} />Retour aux projets</HStack></Link>
            <Link href="https://www.linkedin.com/in/thomas-reynier-product-design/" isExternalLink isStandalone>LinkedIn</Link>
            <Divider />
            <Text type="supporting">Card variant « muted » : zones secondaires, carte verrouillée.</Text>
          </VStack>
        </Card>
      </Grid>
      <Usage items={['Card pour un élément autonome (un projet, un témoignage), pas pour découper une page.', 'Link isExternalLink pour un site externe : ouvre un nouvel onglet avec l\'icône.']} />
    </DocSection>
  );
}

// ── Composants maison ────────────────────────────────────────────────────────

const STREAMING_DEMO = [{ text: 'UX' }, { text: ' · ', muted: true }, { text: 'Design System' }, { text: ' · ', muted: true }, { text: 'IA' }];
const STREAMING_TYPOS = [{ at: 9, text: 'n' }, { at: 21, text: 'Product' }];

function HouseComponents() {
  const [replay, setReplay] = useState(0);
  const [intro, setIntro] = useState(false);
  return (
    <DocSection id="maison" label="Composants maison" title="Composants maison" subtitle="Ce qu'Astryx ne couvre pas : la signature visuelle du site.">
      <VStack gap={2}>
        <Text type="label" color="secondary">ProjectCard — carte d'étude de cas</Text>
        <Grid columns={{ minWidth: 260, max: 2 }} gap={4}><ProjectCard project={PROJECTS[1]} /></Grid>
        <Text type="supporting">Carte entière cliquable · survol : bordure accent, ombre, montée de 4px, zoom de l'illustration, flèche qui glisse.</Text>
      </VStack>
      <Divider />
      <VStack gap={2}>
        <Text type="label" color="secondary">StreamingText — sous-titre du hero</Text>
        <StreamingText variant="type" segments={STREAMING_DEMO} typos={STREAMING_TYPOS} replayKey={replay} style={{ fontSize: 20, fontWeight: 600, color: 'var(--color-text-accent)' }} />
        <HStack><Button label="Rejouer" variant="secondary" size="sm" onClick={() => setReplay(k => k + 1)} /></HStack>
      </VStack>
      <Divider />
      <VStack gap={2}>
        <Text type="label" color="secondary">Pastille « À l'écoute »</Text>
        <HStack><div className="ax-status-pill ds-pill"><span className="ax-status-dot" aria-hidden="true" />À l'écoute</div></HStack>
      </VStack>
      <Divider />
      <VStack gap={2}>
        <Text type="label" color="secondary">Intro — écran d'arrivée</Text>
        <HStack><Button label="Rejouer l'intro" variant="secondary" size="sm" icon={<AutoAwesomeOutlinedIcon sx={{ fontSize: 14 }} />} onClick={() => setIntro(true)} /></HStack>
        {intro && <Intro once={false} onDone={() => setIntro(false)} />}
      </VStack>
      <Divider />
      <VStack gap={2}>
        <Text type="label" color="secondary">Autres</Text>
        <ul className="ds-usage">
          <li><Text><b>Navbar</b> — barre en verre au défilement, menu mobile, bouton clair/sombre (layouts/Navbar.jsx).</Text></li>
          <li><Text><b>AccessGate</b> — écran de code des pages privées, en composants Astryx (components/AccessGate).</Text></li>
          <li><Text><b>Styles éditoriaux des études de cas</b> — sections, étapes, citations, illustrations (classes case-* de global.css).</Text></li>
        </ul>
      </VStack>
    </DocSection>
  );
}

const ICONS = [
  ['GridViewOutlined', GridViewOutlinedIcon], ['ArrowForward', ArrowForwardIcon], ['ArrowBack', ArrowBackIcon], ['OpenInNew', OpenInNewIcon],
  ['Close', CloseIcon], ['Check', CheckIcon], ['MailOutlined', MailOutlinedIcon], ['LinkedIn', LinkedInIcon],
  ['FileDownloadOutlined', FileDownloadOutlinedIcon], ['AutoAwesomeOutlined', AutoAwesomeOutlinedIcon], ['LockOutlined', LockOutlinedIcon],
  ['RouteOutlined', RouteOutlinedIcon], ['LayersOutlined', LayersOutlinedIcon], ['AccessTime', AccessTimeIcon],
  ['DarkModeOutlined', DarkModeOutlinedIcon], ['LightModeOutlined', LightModeOutlinedIcon],
];

function Icons() {
  return (
    <DocSection id="icones" label="Fondations" title="Icônes" subtitle="Material Design Icons (@mui/icons-material), seule bibliothèque autorisée. Survole une icône pour voir son nom.">
      <HStack gap={2} wrap="wrap">
        {ICONS.map(([name, Icon]) => (
          <Tooltip key={name} content={name}>
            <span className="ds-icon" tabIndex={0}><Icon sx={{ fontSize: 22 }} /></span>
          </Tooltip>
        ))}
      </HStack>
      <Usage
        items={['Import par icône (jamais l\'index du package) pour garder le site léger.', 'Taille via sx={{ fontSize }} ; la couleur suit le texte (currentColor).']}
        code={`import LinkedIn from '@mui/icons-material/LinkedIn';
<Button label="LinkedIn" variant="secondary" icon={<LinkedIn sx={{ fontSize: 16 }} />} />`}
      />
    </DocSection>
  );
}

function Patterns() {
  return (
    <DocSection id="patterns" label="Architecture" title="Patterns de pages">
      <ul className="ds-usage">
        <li><Text><b>AstryxPage</b> (layouts/AstryxPage.jsx) — gabarit de toutes les pages : Navbar, thème Astryx qui suit le mode clair/sombre, footer.</Text></li>
        <li><Text><b>CaseLayout + CaseHeader</b> (layouts/CaseLayout.jsx) — études de cas : en-tête commun, sommaire, retour en haut, appel à contact, autres projets.</Text></li>
        <li><Text><b>Contenu</b> — textes de l'accueil dans data/home.js ; CV et étude de cas Etam synchronisés depuis le dépôt « thomas » (app/content).</Text></li>
        <li><Text><b>Couches CSS</b> — styles/layers.css fixe l'ordre reset → astryx-base → astryx-theme.</Text></li>
        <li><Text><b>Mode clair/sombre</b> — hooks/useColorMode (sombre par défaut), attribut data-site-theme sur &lt;html&gt;.</Text></li>
      </ul>
      <CodeBlock
        language="jsx"
        code={`import AstryxPage from '../layouts/AstryxPage';

export default function NouvellePage() {
  return (
    <AstryxPage>
      <section className="ax-container ax-section">…</section>
    </AstryxPage>
  );
}`}
      />
    </DocSection>
  );
}

const NAV = [['couleurs', 'Couleurs'], ['typographie', 'Typographie'], ['rayons', 'Rayons'], ['icones', 'Icônes'], ['button', 'Button'], ['badge', 'Badge'], ['selection', 'Sélection'], ['champs', 'Champs'], ['contenu', 'Contenu'], ['maison', 'Maison'], ['patterns', 'Patterns']];

function DesignSystemContent() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <AstryxPage>
      <div className="ds-header">
        <div className="ax-container">
          <VStack gap={3}>
            <p className="section-label">Design System</p>
            <Heading level={1} type="display-2">Astryx · thème « portfolio »</Heading>
            <Text type="large" color="secondary">Les tokens et composants utilisés sur ce site, et les règles pour s'en servir.</Text>
            <HStack gap={1} wrap="wrap">
              {NAV.map(([id, label]) => (
                <Button key={id} label={label} variant="ghost" size="sm" onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })} />
              ))}
            </HStack>
          </VStack>
        </div>
      </div>
      <div className="ax-container ds-body">
        <Colors />
        <Typography />
        <Radii />
        <Icons />
        <Buttons />
        <Badges />
        <Selection />
        <Fields />
        <Content />
        <HouseComponents />
        <Patterns />
      </div>
    </AstryxPage>
  );
}

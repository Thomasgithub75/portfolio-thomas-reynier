import { useState } from 'react';
import { Theme } from '@astryxdesign/core/theme';
import { TopNav, TopNavHeading, TopNavItem } from '@astryxdesign/core/TopNav';
import { Button } from '@astryxdesign/core/Button';
import { IconButton } from '@astryxdesign/core/IconButton';
import { ToggleButton } from '@astryxdesign/core/ToggleButton';
import { Badge } from '@astryxdesign/core/Badge';
import { Card } from '@astryxdesign/core/Card';
import { Section } from '@astryxdesign/core/Section';
import { Grid } from '@astryxdesign/core/Grid';
import { Heading } from '@astryxdesign/core/Heading';
import { Text } from '@astryxdesign/core/Text';
import { Link } from '@astryxdesign/core/Link';
import { Avatar } from '@astryxdesign/core/Avatar';
import { StatusDot } from '@astryxdesign/core/StatusDot';
import { Blockquote } from '@astryxdesign/core/Blockquote';
import { Divider } from '@astryxdesign/core/Divider';
import { VStack, HStack } from '@astryxdesign/core/Layout';
import DarkModeOutlined from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlined from '@mui/icons-material/LightModeOutlined';
import AdsClickOutlined from '@mui/icons-material/AdsClickOutlined';
import RouteOutlined from '@mui/icons-material/RouteOutlined';
import LayersOutlined from '@mui/icons-material/LayersOutlined';
import AutoAwesomeOutlined from '@mui/icons-material/AutoAwesomeOutlined';
import LockOutlined from '@mui/icons-material/LockOutlined';
import ArrowForward from '@mui/icons-material/ArrowForward';
import MailOutlined from '@mui/icons-material/MailOutlined';
import LinkedIn from '@mui/icons-material/LinkedIn';
import FileDownloadOutlined from '@mui/icons-material/FileDownloadOutlined';
import useColorMode from '../hooks/useColorMode';
import { useInspecting, setInspecting } from '../hooks/useInspector';
import { portfolioTheme } from '../theme/astryxTheme';
import {
  HERO_POINTS, HERO_STATS, PROJECTS, LOCKED_PROJECT, MATCHING_STEPS,
  SKILL_PROJECTS, CORE_SKILLS, SEC_SKILLS, TOOLS, TESTIMONIALS, CONTACT,
} from '../data/home';
// Order matters: reset → component styles (theme tokens are injected by <Theme>)
import '@astryxdesign/core/reset.css';
import '@astryxdesign/core/astryx.css';
import './AstryxHome.css';

// Aperçu de la page d'accueil reconstruite avec le design system Astryx (thème « portfolio »).
// Même contenu que pages/Home.jsx, uniquement des composants et tokens Astryx.
// Visible en local et sur les aperçus Vercel, jamais sur thomas-reynier.fr (voir App.jsx).

const POINT_ICONS = [RouteOutlined, LayersOutlined, AutoAwesomeOutlined];
const TOOL_VARIANTS = { design: 'purple', dev: 'teal', pm: 'orange' };

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

export default function AstryxHome() {
  const { mode, toggleMode } = useColorMode();

  return (
    <Theme theme={portfolioTheme} mode={mode}>
      <div className="ax-page">
        <Nav mode={mode} onToggleMode={toggleMode} />
        <main>
          <Hero />
          <Projects />
          <Matching />
          <Expertises />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
      </div>
    </Theme>
  );
}

// ── Navigation ────────────────────────────────────────────────────────────────

function Nav({ mode, onToggleMode }) {
  const inspecting = useInspecting();
  const isDark = mode === 'dark';
  return (
    <div className="ax-nav">
      <TopNav
        label="Navigation principale"
        heading={<TopNavHeading heading="Thomas Reynier" headingHref="/apercu-astryx" logo={<span className="ax-logo">TR</span>} />}
        startContent={
          <div className="ax-nav-items">
            <TopNavItem label="Projets" href="#projets" onClick={e => { e.preventDefault(); scrollTo('projets'); }} />
            <TopNavItem label="Expertises" href="#competences" onClick={e => { e.preventDefault(); scrollTo('competences'); }} />
            <TopNavItem label="Témoignages" href="#recommandations" onClick={e => { e.preventDefault(); scrollTo('recommandations'); }} />
          </div>
        }
        endContent={
          <HStack gap={2} vAlign="center">
            <span className="ax-desktop-only" data-inspector-toggle>
              <ToggleButton
                label={inspecting ? 'Quitter' : 'Inspecter'}
                icon={<AdsClickOutlined fontSize="small" />}
                isPressed={inspecting}
                onPressedChange={setInspecting}
                tooltip="Voir les composants et tokens Astryx"
              >
                {inspecting ? 'Quitter' : 'Inspecter'}
              </ToggleButton>
            </span>
            <IconButton
              label={isDark ? 'Passer en mode clair' : 'Passer en mode sombre'}
              icon={isDark ? <LightModeOutlined fontSize="small" /> : <DarkModeOutlined fontSize="small" />}
              variant="ghost"
              onClick={onToggleMode}
            />
            <Button label="Contact" variant="primary" onClick={() => scrollTo('contact')} />
          </HStack>
        }
      />
    </div>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <div className="ax-hero-bg">
    <section id="hero" className="ax-container ax-hero">
      <VStack gap={5}>
        <HStack gap={2} vAlign="center">
          <StatusDot variant="success" label="Disponible" isPulsing />
          <Text type="label" color="secondary">Thomas Reynier · À l'écoute · Freelance & CDI</Text>
        </HStack>
        <VStack gap={2}>
          <Heading level={1} type="display-1">
            Product Designer <span className="ax-accent">IA</span>
          </Heading>
          <Text type="large" color="secondary">UX · Design System · IA</Text>
        </VStack>
        <Text as="p" color="secondary">
          La recherche oriente mes décisions, le Design System structure mes livrables, l'IA accélère la livraison.
        </Text>
        <VStack gap={2}>
          {HERO_POINTS.map((point, i) => {
            const PointIcon = POINT_ICONS[i];
            return (
              <HStack key={point.label} gap={2} vAlign="center">
                <span className="ax-point-icon"><PointIcon fontSize="small" /></span>
                <Text><Text weight="semibold">{point.label}</Text> <Text color="secondary">— {point.desc}</Text></Text>
              </HStack>
            );
          })}
        </VStack>
        <div className="ax-stats">
          {HERO_STATS.map(stat => (
            <VStack key={stat.label} gap={0.5}>
              <Text size="3xl" weight="bold" color="accent">{stat.num}</Text>
              <Text type="supporting">{stat.label}</Text>
            </VStack>
          ))}
        </div>
        <HStack gap={2} wrap="wrap">
          <Button label="Voir mes projets" variant="primary" size="lg" onClick={() => scrollTo('projets')} />
          <Button label="LinkedIn" variant="secondary" size="lg" href={CONTACT.linkedin} target="_blank" icon={<LinkedIn fontSize="small" />} />
        </HStack>
      </VStack>
      <div className="ax-hero-photo">
        <Avatar src="/images/profile-cutout.png" name="Thomas Reynier" size={300} tooltip={false} />
      </div>
    </section>
    </div>
  );
}

// ── Projets ───────────────────────────────────────────────────────────────────

function SectionTitle({ eyebrow, title, intro }) {
  return (
    <VStack gap={1}>
      <Text type="label" color="accent">{eyebrow}</Text>
      <Heading level={2} type="display-3">{title}</Heading>
      {intro && <Text color="secondary">{intro}</Text>}
    </VStack>
  );
}

function ProjectCard({ project, locked }) {
  return (
    <Card padding={0} variant={locked ? 'muted' : 'default'}>
      <div className="ax-thumb">
        {locked
          ? <VStack gap={1} hAlign="center"><LockOutlined /><Text type="label" color="secondary">Code requis</Text></VStack>
          : <img src={project.thumb} alt="" loading="lazy" />}
      </div>
      <VStack gap={3} padding={5}>
        <HStack gap={2} vAlign="center" hAlign="between">
          <HStack gap={2} vAlign="center">
            <img className="ax-logo-sm" src={project.logo} alt="" />
            <Badge label={project.role} variant={locked ? 'neutral' : project.roleVariant} />
          </HStack>
          <Text type="supporting">{locked ? project.date : project.duration}</Text>
        </HStack>
        <Heading level={3}>{project.name}</Heading>
        <Text color="secondary">{project.desc}</Text>
        <HStack gap={1} wrap="wrap">
          {project.tags.map(tag => <Badge key={tag} label={tag} variant="blue" />)}
        </HStack>
        <Link href={project.href} isStandalone>
          <HStack gap={1} vAlign="center">
            {locked ? 'Entrer le code' : 'Voir le projet'}
            <ArrowForward sx={{ fontSize: 16 }} />
          </HStack>
        </Link>
      </VStack>
    </Card>
  );
}

function Projects() {
  return (
    <section id="projets" className="ax-container ax-section">
      <VStack gap={6}>
        <SectionTitle eyebrow="Études de cas" title="Mes derniers projets" />
        <Grid columns={{ minWidth: 280, max: 3 }} gap={4}>
          {PROJECTS.map(p => <ProjectCard key={p.name} project={p} />)}
          <ProjectCard project={LOCKED_PROJECT} locked />
        </Grid>
      </VStack>
    </section>
  );
}

// ── Matching IA ───────────────────────────────────────────────────────────────

function Matching() {
  return (
    <Section variant="muted">
      <div id="fonctionnalite-ia" className="ax-container ax-section">
        <VStack gap={5}>
          <HStack gap={2} vAlign="center">
            <Badge label="Matching IA" variant="purple" icon={<AutoAwesomeOutlined sx={{ fontSize: 14 }} />} />
            <Text type="supporting">Exclusif</Text>
          </HStack>
          <Heading level={2} type="display-3">Testez notre compatibilité.</Heading>
          <VStack gap={3}>
            {MATCHING_STEPS.map((step, i) => (
              <HStack key={step} gap={3} vAlign="center">
                <span className="ax-step-num">{String(i + 1).padStart(2, '0')}</span>
                <Text>{step}</Text>
              </HStack>
            ))}
          </VStack>
          <HStack>
            <Button label="Tester le matching IA" variant="primary" href="/fonctionnalite-ia" icon={<AutoAwesomeOutlined fontSize="small" />} />
          </HStack>
        </VStack>
      </div>
    </Section>
  );
}

// ── Expertises ────────────────────────────────────────────────────────────────

function Expertises() {
  const [active, setActive] = useState([]);
  const toggle = skill => setActive(prev => (prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]));
  const seen = new Set();
  const projects = active.flatMap(s => SKILL_PROJECTS[s] || []).filter(p => !seen.has(p.name) && seen.add(p.name));

  return (
    <section id="competences" className="ax-container ax-section">
      <VStack gap={6}>
        <SectionTitle eyebrow="Expertise" title="Mes expertises" intro="Sélectionnez une compétence pour voir les projets associés." />
        <div className="ax-exp-grid">
          <VStack gap={5}>
            <VStack gap={2}>
              <Text type="label" color="secondary">Compétences</Text>
              <HStack gap={1} wrap="wrap">
                {[...CORE_SKILLS, ...SEC_SKILLS].map(skill => (
                  <ToggleButton
                    key={skill}
                    label={skill}
                    size="sm"
                    isPressed={active.includes(skill)}
                    onPressedChange={() => toggle(skill)}
                  >
                    {CORE_SKILLS.includes(skill) ? <Text weight="semibold">{skill}</Text> : skill}
                  </ToggleButton>
                ))}
              </HStack>
            </VStack>
            <VStack gap={2}>
              <Text type="label" color="secondary">Outils</Text>
              <HStack gap={1} wrap="wrap">
                {TOOLS.map(t => <Badge key={t.name} label={t.name} variant={TOOL_VARIANTS[t.cat]} />)}
              </HStack>
            </VStack>
            <VStack gap={2}>
              <Text type="label" color="secondary">Langues</Text>
              <HStack gap={1} wrap="wrap">
                <Badge label="Français — Natif" />
                <Badge label="Anglais — Professionnel" />
              </HStack>
            </VStack>
          </VStack>
          <Card padding={4} variant={active.length ? 'default' : 'transparent'}>
            {active.length === 0 ? (
              <Text type="supporting">Sélectionner une compétence pour voir les projets associés</Text>
            ) : (
              <VStack gap={3}>
                <VStack gap={0.5}>
                  <Text type="label" color="accent">Projets associés</Text>
                  <Heading level={3}>{active.length === 1 ? active[0] : `${active.length} compétences`}</Heading>
                </VStack>
                <Divider />
                {projects.map(p => (
                  <HStack key={p.name} gap={3} vAlign="center">
                    <img className="ax-logo-md" src={p.logo} alt="" />
                    <VStack gap={0}>
                      {p.locked
                        ? <Text weight="medium" color="secondary">{p.name}</Text>
                        : <Link href={p.url} isStandalone weight="medium">{p.name}</Link>}
                      <Text type="supporting" maxLines={1}>{p.desc}</Text>
                    </VStack>
                    {p.locked && <Badge label="En entretien" icon={<LockOutlined sx={{ fontSize: 12 }} />} />}
                  </HStack>
                ))}
                <Text type="supporting">{projects.length} projet{projects.length > 1 ? 's' : ''} trouvé{projects.length > 1 ? 's' : ''}</Text>
              </VStack>
            )}
          </Card>
        </div>
      </VStack>
    </section>
  );
}

// ── Témoignages ───────────────────────────────────────────────────────────────

function Testimonials() {
  return (
    <section id="recommandations" className="ax-container ax-section">
      <VStack gap={6}>
        <SectionTitle eyebrow="Références" title="Témoignages de mes collaborateurs" />
        <Grid columns={{ minWidth: 300, max: 2 }} gap={4}>
          {TESTIMONIALS.map(t => (
            <div key={t.name} className={t.featured ? 'ax-featured' : undefined}>
              <Card padding={6} height="100%">
                <VStack gap={4}>
                  <HStack hAlign="between" vAlign="center">
                    <Text color="accent" aria-label="5 étoiles">★★★★★</Text>
                    <img className="ax-logo-sm" src={t.logo} alt={t.company} />
                  </HStack>
                  <Heading level={3}>{t.keyquote}</Heading>
                  <Blockquote cite={`${t.name} · ${t.role}`}>{t.quote}</Blockquote>
                  <HStack gap={3} vAlign="center" hAlign="between">
                    <HStack gap={2} vAlign="center">
                      <Avatar src={t.avatar} name={t.name} size="md" />
                      <VStack gap={0}>
                        <Text weight="semibold">{t.name}</Text>
                        <Text type="supporting">{t.role}</Text>
                      </VStack>
                    </HStack>
                    <Link href={t.li} isExternalLink isStandalone>LinkedIn</Link>
                  </HStack>
                </VStack>
              </Card>
            </div>
          ))}
        </Grid>
      </VStack>
    </section>
  );
}

// ── Contact & footer ──────────────────────────────────────────────────────────

function Contact() {
  return (
    <Section variant="muted">
      <div id="contact" className="ax-container ax-section ax-contact">
        <VStack gap={4} hAlign="center">
          <SectionTitle eyebrow="Contact" title="Travaillons ensemble" />
          <Text color="secondary" justify="center">
            Disponible pour des missions freelance, des opportunités CDI ou des collaborations ponctuelles à Paris.
          </Text>
          <HStack gap={2} wrap="wrap" hAlign="center">
            <Button label={CONTACT.email} variant="primary" size="lg" href={CONTACT.mailto} target="_blank" icon={<MailOutlined fontSize="small" />} />
            <Button label="LinkedIn" variant="secondary" size="lg" href={CONTACT.linkedin} target="_blank" icon={<LinkedIn fontSize="small" />} />
          </HStack>
        </VStack>
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="ax-container ax-footer">
      <Divider />
      <HStack hAlign="between" vAlign="center" wrap="wrap" gap={2}>
        <Text type="supporting">© 2026 Thomas Reynier · Product Designer · Paris</Text>
        <HStack gap={1}>
          <IconButton label="Email" icon={<MailOutlined fontSize="small" />} variant="ghost" onClick={() => window.open(CONTACT.mailto, '_blank')} />
          <IconButton label="LinkedIn" icon={<LinkedIn fontSize="small" />} variant="ghost" onClick={() => window.open(CONTACT.linkedin, '_blank')} />
          <IconButton label="Télécharger mon CV (PDF)" tooltip="Télécharger mon CV (PDF)" icon={<FileDownloadOutlined fontSize="small" />} variant="ghost" onClick={() => window.open(CONTACT.cv, '_blank')} />
        </HStack>
      </HStack>
    </footer>
  );
}

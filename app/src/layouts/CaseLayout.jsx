import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link as RouterLink } from 'react-router-dom';
import { Button } from '@astryxdesign/core/Button';
import { IconButton } from '@astryxdesign/core/IconButton';
import { Badge } from '@astryxdesign/core/Badge';
import { Grid } from '@astryxdesign/core/Grid';
import { Heading } from '@astryxdesign/core/Heading';
import { Text } from '@astryxdesign/core/Text';
import { Link } from '@astryxdesign/core/Link';
import { VStack, HStack } from '@astryxdesign/core/Layout';
import ArrowBack from '@mui/icons-material/ArrowBack';
import AccessTime from '@mui/icons-material/AccessTime';
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp';
import MailOutlined from '@mui/icons-material/MailOutlined';
import LinkedIn from '@mui/icons-material/LinkedIn';
import useMediaQuery from '../hooks/useMediaQuery';
import AstryxPage from './AstryxPage';
import ProjectCard from '../components/ProjectCard/ProjectCard';
import { trackEvent } from '../utils/analytics';
import { CONTACT } from '../data/home';
import './CaseLayout.css';

// Gabarit des études de cas. Interface en Astryx (en-tête, tags, boutons, autres projets, footer) ;
// le corps de l'article (sections, étapes, citations, illustrations) garde ses styles éditoriaux de global.css.

// Lien Astryx vers une route interne (React Router)
function RouterAnchor({ href, ...props }) {
  return <RouterLink to={href} {...props} />;
}

function useBackToTop() {
  const [v, setV] = useState(false);
  useEffect(() => {
    const fn = () => setV(window.scrollY > 400);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return v;
}

function useToc(ids) {
  const [activeId, setActiveId] = useState('');
  const [tocVisible, setTocVisible] = useState(true);
  useEffect(() => {
    const els = ids.map(id => document.getElementById(id)).filter(Boolean);
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActiveId(e.target.id); });
    }, { rootMargin: '-15% 0px -70% 0px' });
    els.forEach(el => obs.observe(el));
    const next = document.querySelector('.next-section');
    let hideObs;
    if (next) {
      hideObs = new IntersectionObserver(entries => { entries.forEach(e => setTocVisible(!e.isIntersecting)); }, { threshold: 0.05 });
      hideObs.observe(next);
    }
    return () => { obs.disconnect(); if (hideObs) hideObs.disconnect(); };
  }, [ids]);
  return { activeId, tocVisible };
}

function useInView() {
  useEffect(() => {
    const els = document.querySelectorAll('.case-section, .mission-banner');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in-view'); obs.unobserve(e.target); } });
    }, { rootMargin: '-8% 0px -8% 0px', threshold: 0.05 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

function Lightbox({ src, onClose }) {
  useEffect(() => {
    const fn = e => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', fn);
    return () => document.removeEventListener('keydown', fn);
  }, [onClose]);
  return createPortal(
    <div className="lightbox-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="lightbox-frame" onClick={e => e.stopPropagation()}>
        <img src={src} alt=""/>
      </div>
      <button className="lightbox-close" onClick={onClose}>✕</button>
    </div>,
    document.body
  );
}

export function Img({ src, alt, noZoom }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <img src={src} alt={alt || ''} onClick={noZoom ? undefined : () => setOpen(true)} style={{cursor: noZoom ? 'default' : 'zoom-in', width:'100%', display:'block'}}/>
      {open && <Lightbox src={src} onClose={() => setOpen(false)}/>}
    </>
  );
}

export function IllustrationItem({ src, alt, caption, noZoom, bg }) {
  return (
    <figure className="illustration-item">
      <div className="illustration-item-inner" style={bg ? {backgroundColor: bg} : {}}>
        <Img src={src} alt={alt} noZoom={noZoom}/>
      </div>
      {caption && <figcaption className="illustration-caption">{caption}</figcaption>}
    </figure>
  );
}

export function Step({ icon, stepNum, title, body, isLast }) {
  return (
    <div className="step">
      <div className="step-icon-col">
        <div className="step-icon">{icon}</div>
        {!isLast && <div className="step-line"/>}
      </div>
      <div className="step-content" style={isLast ? { paddingBottom: 0 } : {}}>
        <p className="step-num">{stepNum}</p>
        <p className="step-title">{title}</p>
        <p className="step-body">{body}</p>
      </div>
    </div>
  );
}

export function MissionBanner({ label, title, desc }) {
  return (
    <div className="mission-banner">
      <p className="mission-banner-label">{label}</p>
      <p className="mission-banner-title">{title}</p>
      <p className="mission-banner-desc">{desc}</p>
    </div>
  );
}

export function Quote({ text, avatar, name, role }) {
  return (
    <div className="quote">
      <div className="quote-stars">{[0,1,2,3,4].map(i => <span key={i}>★</span>)}</div>
      <p className="quote-text">{text}</p>
      <div className="quote-author">
        <img className="quote-avatar" src={avatar} alt={name}/>
        <div>
          <p className="quote-author-name">{name}</p>
          <p className="quote-author-role">{role}</p>
        </div>
      </div>
    </div>
  );
}

// En-tête commun : retour, tags, logo + titre, méta, temps de lecture, intro, chiffres clés
export function CaseHeader({ tags, logo, title, meta, readingTime, intro, stats }) {
  return (
    <div className="case-header">
      <div className="container">
        <div className="ax-case-back">
          <Link as={RouterAnchor} href="/#projets" color="secondary" isStandalone>
            <HStack gap={1} vAlign="center"><ArrowBack sx={{ fontSize: 14 }} />Retour aux projets</HStack>
          </Link>
        </div>
        <HStack gap={1} wrap="wrap">
          {tags.map(t => <Badge key={t} label={t} variant="blue" />)}
        </HStack>
        <div className="case-title-row ax-case-title">
          <img className="case-logo" src={logo} alt="" />
          <Heading level={1} type="display-2">{title}</Heading>
        </div>
        <VStack gap={1}>
          <Text type="supporting" size="sm">{meta}</Text>
          <span className="ax-reading-time">
            <AccessTime sx={{ fontSize: 13 }} />
            <Text type="supporting">Lecture · {readingTime}</Text>
          </span>
        </VStack>
        <p className="case-intro">{intro}</p>
        <div className="stats-row">
          {stats.map(([val, label]) => (
            <div key={label} className="stat">
              <span className="ax-stat-val"><Text type="inherit" color="accent">{val}</Text></span>
              <Text type="supporting" display="block">{label}</Text>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function CaseCta() {
  return (
    <div className="ax-case-cta">
      <VStack gap={3} hAlign="center">
        <p className="section-label">Vous avez aimé ce projet ?</p>
        <Heading level={2} type="display-3">Travaillons ensemble</Heading>
        <Text color="secondary" justify="center">
          Disponible pour des missions freelance, des opportunités CDI<br />ou des collaborations ponctuelles à Paris.
        </Text>
        <HStack gap={2} wrap="wrap" hAlign="center">
          <Button label="Me contacter" variant="primary" size="lg" href={CONTACT.mailto} target="_blank" icon={<MailOutlined sx={{ fontSize: 16 }} />} onClick={() => trackEvent.contactClick('case_cta')} />
          <Button label="Mon profil LinkedIn" variant="secondary" size="lg" href={CONTACT.linkedin} target="_blank" icon={<LinkedIn sx={{ fontSize: 16 }} />} onClick={() => trackEvent.linkedinClick('case_cta')} />
        </HStack>
      </VStack>
    </div>
  );
}

// Couleur du badge de rôle selon le projet
const ROLE_VARIANTS = { pepyte: 'purple', weborama: 'teal', nectar: 'orange', portfolio: 'blue' };

export function OtherProjects({ projects }) {
  return (
    <div className="next-section" id="autres-projets">
      <div className="container">
        <VStack gap={5}>
          <p className="section-label">Autres projets</p>
          <Grid columns={{ minWidth: 280, max: 2 }} gap={4}>
            {projects.map(p => {
              const key = Object.keys(ROLE_VARIANTS).find(k => p.href.includes(k));
              return <ProjectCard key={p.name} project={{ ...p, roleVariant: ROLE_VARIANTS[key] || 'blue' }} />;
            })}
          </Grid>
        </VStack>
      </div>
    </div>
  );
}

export default function CaseLayout({ tocItems, children }) {
  const bttVisible = useBackToTop();
  const { activeId, tocVisible } = useToc(tocItems.filter(i => i.id).map(i => i.id));
  const showToc = !useMediaQuery('(max-width:1200px)');
  useInView();

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <AstryxPage>
      {/* TOC — not rendered at all below 1200px: a fixed-position element placed off-screen
          (left: calc(50% + 500px)) triggers a horizontal rubber-band scroll bug in iOS Safari
          even when hidden via CSS display:none */}
      {showToc && (
        <aside className="toc" style={{ opacity: tocVisible ? 1 : 0, pointerEvents: tocVisible ? 'auto' : 'none' }}>
          <p className="toc-title">Sommaire</p>
          {tocItems.map((item, i) =>
            item.mission
              ? <span key={i} className="toc-mission">{item.mission}</span>
              : <a key={item.id} className={`toc-link${activeId === item.id ? ' active' : ''}`} href={`#${item.id}`} onClick={e => { e.preventDefault(); document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' }); }}>{item.label}</a>
          )}
        </aside>
      )}
      {children}
      <div className={`ax-back-to-top${bttVisible ? ' is-visible' : ''}`}>
        <IconButton label="Retour en haut" icon={<KeyboardArrowUp sx={{ fontSize: 18 }} />} elevation="med" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
      </div>
    </AstryxPage>
  );
}

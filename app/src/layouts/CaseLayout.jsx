import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { trackEvent } from '../utils/analytics';

function useScrollProgress() {
  const [w, setW] = useState(0);
  useEffect(() => {
    const fn = () => { const t = document.documentElement.scrollHeight - window.innerHeight; setW(t > 0 ? (window.scrollY / t) * 100 : 0); };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return w;
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

export function CaseCta() {
  return (
    <div className="case-cta">
      <div className="container">
        <p className="cta-eyebrow">Vous avez aimé ce projet ?</p>
        <h2>Travaillons ensemble</h2>
        <p className="cta-sub">Disponible pour des missions freelance, des opportunités CDI<br/>ou des collaborations ponctuelles à Paris.</p>
        <div className="cta-buttons">
          <a href="https://mail.google.com/mail/?view=cm&to=reynier.design@gmail.com" target="_blank" rel="noopener" className="cta-btn cta-btn-primary" onClick={() => trackEvent.contactClick('case_cta')}>
            <svg viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>
            Me contacter
          </a>
          <a href="https://www.linkedin.com/in/thomas-reynier-product-design/" target="_blank" rel="noopener" className="cta-btn cta-btn-ghost" onClick={() => trackEvent.linkedinClick('case_cta')}>
            <svg viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
            Mon profil LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}

export function OtherProjects({ projects }) {
  return (
    <div className="next-section" id="autres-projets">
      <div className="container">
        <p className="section-label">Autres projets</p>
        <div className="projects-grid-2">
          {projects.map(p => (
            <Link key={p.name} to={p.href} className="project-card-case">
              <div className="project-thumb"><img src={p.thumb} alt={p.name}/></div>
              <div className="project-body">
                <div className="project-header">
                  <div className="project-header-left">
                    <img className="project-logo-sm" src={p.logo} alt={p.name}/>
                    <span className={`project-role-badge ${p.roleClass}`}>{p.role}</span>
                  </div>
                  <span className="project-dur">{p.duration}</span>
                </div>
                <p className="project-name-sm">{p.name}</p>
                <p className="project-desc-sm">{p.desc}</p>
                <div className="project-tags-row">
                  {p.tags.map(t => <span key={t} className="p-tag">{t}</span>)}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CaseLayout({ title, tocItems, tocMissions, children }) {
  const progress = useScrollProgress();
  const bttVisible = useBackToTop();
  const { activeId, tocVisible } = useToc(tocItems.filter(i => i.id).map(i => i.id));
  useInView();

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <div className="reading-progress" style={{ width: `${progress}%` }}/>
      <Navbar/>
      {/* TOC */}
      <aside className="toc" style={{ opacity: tocVisible ? 1 : 0, pointerEvents: tocVisible ? 'auto' : 'none' }}>
        <p className="toc-title">Sommaire</p>
        {tocItems.map((item, i) =>
          item.mission
            ? <span key={i} className="toc-mission">{item.mission}</span>
            : <a key={item.id} className={`toc-link${activeId === item.id ? ' active' : ''}`} href={`#${item.id}`} onClick={e => { e.preventDefault(); document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' }); }}>{item.label}</a>
        )}
      </aside>
      {children}
      <button className={`back-to-top${bttVisible ? ' visible' : ''}`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Retour en haut">
        <svg viewBox="0 0 24 24"><polyline points="18 15 12 9 6 15"/></svg>
      </button>
      <Footer/>
    </>
  );
}

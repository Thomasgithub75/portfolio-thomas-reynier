import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../layouts/Navbar';
import Footer from '../layouts/Footer';
import { trackEvent } from '../utils/analytics';

const SKILL_PROJS = {
  'UX Research': [
    { logo:'/images/logo-pepyte.svg', bg:'#F5F3FF', name:'Pepyte', desc:'12 entretiens · JTBD · synthèse IA', type:'Case study', url:'/case/pepyte' },
    { logo:'/images/logo-weborama.svg', bg:'#EFF8FF', name:'Weborama', desc:'Audit UX · tests · heatmaps', type:'Case study', url:'/case/weborama' },
    { logo:'/images/logo-nectar.svg', bg:'#FFFBEB', name:'Nectar', desc:'Discovery · interviews sales & PM', type:'Side project', url:'/case/nectar' }
  ],
  'Product Design': [
    { logo:'/images/logo-pepyte.svg', bg:'#F5F3FF', name:'Pepyte', desc:'Refonte onboarding · mobile first', type:'Case study', url:'/case/pepyte' },
    { logo:'/images/logo-weborama.svg', bg:'#EFF8FF', name:'Weborama', desc:'Nouveau SaaS AdTech de 0', type:'Case study', url:'/case/weborama' },
    { logo:'/images/logo-nectar.svg', bg:'#FFFBEB', name:'Nectar', desc:'App mobile B2B · design to code', type:'Side project', url:'/case/nectar' }
  ],
  'Design System': [
    { logo:'/images/logo-weborama.svg', bg:'#EFF8FF', name:'Weborama', desc:'DS from scratch · tokens · Storybook', type:'Case study', url:'/case/weborama' },
    { logo:'/images/logo-pepyte.svg', bg:'#F5F3FF', name:'Pepyte', desc:'Audit & gouvernance DS existant', type:'Case study', url:'/case/pepyte' }
  ],
  'Prototypage haute fidélité': [
    { logo:'/images/logo-pepyte.svg', bg:'#F5F3FF', name:'Pepyte', desc:'Prototypes testables · Figma avancé', type:'Case study', url:'/case/pepyte' },
    { logo:'/images/logo-nectar.svg', bg:'#FFFBEB', name:'Nectar', desc:'Prototype interactif mobile', type:'Side project', url:'/case/nectar' }
  ],
  'Atomic Design': [
    { logo:'/images/logo-weborama.svg', bg:'#EFF8FF', name:'Weborama', desc:'Architecture composants · Atomic', type:'Case study', url:'/case/weborama' }
  ],
  'Design to Code': [
    { logo:'/images/logo-nectar.svg', bg:'#FFFBEB', name:'Nectar', desc:'Next.js · Tailwind · Supabase · Vercel', type:'Side project', url:'/case/nectar' },
    { initials:'PF', color:'#1A56DB', name:'Portfolio', desc:'React · MUI · Design System', type:'Personnel', url:'/' }
  ],
  'IA générative': [
    { logo:'/images/logo-nectar.svg', bg:'#FFFBEB', name:'Nectar', desc:'Claude Code · MCP · Figma Make', type:'Side project', url:'/case/nectar' },
    { logo:'/images/logo-pepyte.svg', bg:'#F5F3FF', name:'Pepyte', desc:'Synthèse entretiens · research IA', type:'Case study', url:'/case/pepyte' }
  ],
  'Entretiens utilisateurs': [
    { logo:'/images/logo-pepyte.svg', bg:'#F5F3FF', name:'Pepyte', desc:'12 entretiens · JTBD · pain points', type:'Case study', url:'/case/pepyte' },
    { logo:'/images/logo-weborama.svg', bg:'#EFF8FF', name:'Weborama', desc:'Entretiens équipes produit & sales', type:'Case study', url:'/case/weborama' },
    { logo:'/images/logo-nectar.svg', bg:'#FFFBEB', name:'Nectar', desc:'Discovery · interviews commerciaux & PM', type:'Side project', url:'/case/nectar' }
  ],
  'Audit UX': [
    { logo:'/images/logo-weborama.svg', bg:'#EFF8FF', name:'Weborama', desc:'Audit UX · heatmaps · tests utilisateurs', type:'Case study', url:'/case/weborama' },
    { logo:'/images/logo-pepyte.svg', bg:'#F5F3FF', name:'Pepyte', desc:'Audit interface existante · quick wins', type:'Case study', url:'/case/pepyte' }
  ],
  'Tests utilisateurs': [
    { logo:'/images/logo-pepyte.svg', bg:'#F5F3FF', name:'Pepyte', desc:'Tests modérés · validation hypothèses', type:'Case study', url:'/case/pepyte' },
    { logo:'/images/logo-weborama.svg', bg:'#EFF8FF', name:'Weborama', desc:'Tests prototypes · itérations UX', type:'Case study', url:'/case/weborama' }
  ],
  'User flows & zoning': [
    { logo:'/images/logo-nectar.svg', bg:'#FFFBEB', name:'Nectar', desc:'Flow saisie → validation · 15 edge cases', type:'Side project', url:'/case/nectar' },
    { logo:'/images/logo-pepyte.svg', bg:'#F5F3FF', name:'Pepyte', desc:'Parcours onboarding complet · zoning', type:'Case study', url:'/case/pepyte' }
  ]
};

const BADGE_CLASS = { 'Case study': 'badge-case', 'Side project': 'badge-side', 'Personnel': 'badge-perso' };

const CORE_SKILLS = ['UX Research','Product Design','Design System'];
const SEC_SKILLS = ['Prototypage haute fidélité','Atomic Design','Design to Code','IA générative','Entretiens utilisateurs','Audit UX','Tests utilisateurs','User flows & zoning'];

const TOOLS = [
  { name:'Figma', cat:'design' }, { name:'Figma Make', cat:'design' }, { name:'Lovable', cat:'design' },
  { name:'Zeroheight', cat:'design' }, { name:'Supernova', cat:'design' }, { name:'Storybook', cat:'design' },
  { name:'Mobbin', cat:'design' }, { name:'Replit', cat:'dev' }, { name:'VSCode', cat:'dev' },
  { name:'Supabase', cat:'dev' }, { name:'Vercel', cat:'dev' }, { name:'Jira', cat:'pm' }, { name:'Notion', cat:'pm' }
];

const TOOL_STYLE = {
  design: { background:'#EEEDFE', color:'#534AB7' },
  dev:    { background:'#E1F5EE', color:'#0F6E56' },
  pm:     { background:'#FAEEDA', color:'#854F0B' },
};

function getUniqueProjects(skills) {
  const seen = new Set();
  return skills.flatMap(s => SKILL_PROJS[s] || []).filter(p => {
    if (seen.has(p.name)) return false;
    seen.add(p.name); return true;
  });
}

function useScrollProgress() {
  const [w, setW] = useState(0);
  const fn = useCallback(() => {
    const t = document.documentElement.scrollHeight - window.innerHeight;
    setW(t > 0 ? (window.scrollY / t) * 100 : 0);
  }, []);
  useEffect(() => {
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, [fn]);
  return w;
}

export default function Home() {
  const [activeSkills, setActiveSkills] = useState([]);
  const [panelOpen, setPanelOpen] = useState(false);
  const scrollProgress = useScrollProgress();

  useEffect(() => {
    window.scrollTo(0, 0);
    // Scroll to anchor if URL has hash
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, []);

  function toggleSkill(skill) {
    setActiveSkills(prev => {
      const next = prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill];
      setPanelOpen(next.length > 0);
      return next;
    });
  }

  function closePanel() {
    setActiveSkills([]);
    setPanelOpen(false);
  }

  const panelProjects = getUniqueProjects(activeSkills);
  const panelLabel = activeSkills.length === 1 ? activeSkills[0] : activeSkills.length + ' compétences';

  return (
    <>
      <Navbar />
      <div className="home-reading-progress" style={{width:`${scrollProgress}%`}}/>

      {/* HERO */}
      <section id="hero" style={{paddingTop:140,paddingBottom:80,background:'linear-gradient(145deg,var(--p50) 0%,#fff 55%)'}}>
        <div className="container">
          <div className="home-hero-grid">
            <div>
              <p style={{display:'flex',alignItems:'center',gap:10,fontSize:12,fontWeight:600,letterSpacing:'0.1em',textTransform:'uppercase',color:'var(--text)',marginBottom:20}}>
                <span style={{width:28,height:2,background:'var(--blue)',borderRadius:2,flexShrink:0,display:'inline-block'}}/>
                PRODUCT DESIGNER
              </p>
              <h1 style={{fontSize:'clamp(22px,5.8vw,52px)',fontWeight:700,color:'var(--blue)',lineHeight:1.08,letterSpacing:'-0.03em',marginBottom:20,whiteSpace:'nowrap'}}>
                UX <span style={{color:'var(--text)'}}>·</span> Design System <span style={{color:'var(--text)'}}>·</span> IA
              </h1>
              <p style={{fontSize:17,color:'var(--muted)',lineHeight:1.7,maxWidth:580,marginBottom:16,fontWeight:300}}>
                La recherche oriente mes décisions, le Design System structure mes livrables, l'IA accélère la livraison.
              </p>
              <div style={{display:'flex',flexDirection:'column',gap:12,marginBottom:28}}>
                {[
                  { icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 000-7h-11a3.5 3.5 0 010-7H15"/><circle cx="18" cy="5" r="3"/></svg>, label:'Parcours & interfaces', desc:'de la recherche utilisateur à la livraison' },
                  { icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M11.99 18.54l-7.37-5.73L3 14.07l9 7 9-7-1.63-1.27-7.38 5.74zm.01-2.7l7.36-5.73L21 8.93l-9-7-9 7 1.63 1.18 7.37 5.73z"/></svg>, label:'Design Systems', desc:'création et gouvernance de systèmes' },
                  { icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9.937 15.5A2 2 0 008.5 14.063l-6.135-1.582a.5.5 0 010-.962L8.5 9.936A2 2 0 009.937 8.5l1.582-6.135a.5.5 0 01.963 0L14.063 8.5A2 2 0 0015.5 9.937l6.135 1.581a.5.5 0 010 .964L15.5 14.063a2 2 0 00-1.437 1.437l-1.582 6.135a.5.5 0 01-.963 0z"/><path d="M20 3v4M22 5h-4M4 17v2M5 18H3"/></svg>, label:'Intelligence artificielle', desc:'de la discovery à la livraison' }
                ].map(card => (
                  <div key={card.label} style={{display:'flex',alignItems:'flex-start',gap:12}}>
                    <div style={{width:40,height:40,minWidth:40,background:'var(--blue-light)',borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',color:'var(--blue)'}}>{card.icon}</div>
                    <p style={{fontSize:14,color:'var(--muted)',lineHeight:1.55,paddingTop:10}}><strong style={{color:'var(--text)',fontWeight:500}}>{card.label}</strong> — {card.desc}</p>
                  </div>
                ))}
              </div>
              <div style={{display:'flex',alignItems:'stretch',marginBottom:32}}>
                {[['5','ans d\'expérience'],['+10','produit SaaS'],['+100','features']].map(([num,lbl],i) => (
                  <div key={lbl} style={{paddingTop:4,paddingBottom:4,paddingRight:24,paddingLeft:i===0?0:24,borderRight:i<2?'1px solid var(--g200)':'none'}}>
                    <span style={{display:'block',fontSize:26,fontWeight:600,color:'var(--blue)',letterSpacing:'-0.03em',lineHeight:1.1}}>{num}</span>
                    <span style={{display:'block',fontSize:12,color:'var(--muted)',fontWeight:400,marginTop:4}}>{lbl}</span>
                  </div>
                ))}
              </div>
              <div style={{display:'flex',gap:12,alignItems:'center'}}>
                <button onClick={() => { const el=document.getElementById('projets'); if(el) el.scrollIntoView({behavior:'smooth'}); }} style={{display:'inline-flex',alignItems:'center',gap:8,background:'var(--p500)',color:'#fff',padding:'11px 22px',borderRadius:7,fontSize:15,fontWeight:500,border:'none',cursor:'pointer',fontFamily:'inherit'}}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
                  Voir mes projets
                </button>
                <a href="https://www.linkedin.com/in/thomas-reynier-product-design/" target="_blank" rel="noopener" onClick={() => trackEvent.linkedinClick('hero')} style={{display:'inline-flex',alignItems:'center',gap:8,background:'var(--g100)',color:'var(--g600)',padding:'11px 22px',borderRadius:7,fontSize:15,fontWeight:500,textDecoration:'none'}}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                  LinkedIn
                </a>
              </div>
            </div>
            <div className="home-hero-image">
              <div style={{width:'100%',aspectRatio:'1/1',borderRadius:'50%',overflow:'hidden',boxShadow:'0 0 0 4px #fff,0 0 0 6px rgba(26,86,219,0.2),0 10px 40px rgba(26,86,219,0.12)'}}>
                <img src="/images/profile.png" alt="Thomas Reynier" style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'center top'}}/>
              </div>
              <div style={{position:'absolute',bottom:24,right:-4,background:'#fff',border:'1px solid var(--border)',borderRadius:20,padding:'6px 14px',display:'flex',alignItems:'center',gap:7,fontSize:13,fontWeight:500,color:'var(--text)',boxShadow:'0 2px 12px rgba(0,0,0,0.08)',whiteSpace:'nowrap'}}>
                <span style={{position:'relative',width:10,height:10,flexShrink:0,display:'inline-flex',alignItems:'center',justifyContent:'center'}}>
                  <span style={{position:'absolute',inset:0,background:'#22C55E',borderRadius:'50%',animation:'dotPulse 2s ease-out infinite'}}/>
                  <span style={{position:'absolute',width:8,height:8,background:'#22C55E',borderRadius:'50%',zIndex:1}}/>
                </span>
                À l'écoute
              </div>
            </div>
          </div>
        </div>
        <style>{`@keyframes dotPulse{0%{transform:scale(1);opacity:.6}50%{transform:scale(2.4);opacity:0}100%{transform:scale(1);opacity:0}}`}</style>
      </section>

      <hr className="divider"/>

      {/* EXPERTISES */}
      <section id="competences">
        <div className="container">
          <p className="section-label">Expertise</p>
          <h2>Mes expertises</h2>
          <p style={{fontSize:14,color:'var(--muted)',fontWeight:300,marginBottom:32,marginTop:-24}}>Sélectionnez une compétence pour voir les projets associés.</p>
          <div className="home-exp-grid">
            <div>
              {/* COMPÉTENCES */}
              <div className="home-exp-row" style={{padding:'24px 0',borderBottom:'0.5px solid #E5E9F5'}}>
                <div style={{display:'flex',flexDirection:'column',gap:10,paddingTop:4}}>
                  <span style={{fontSize:12,fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase',color:'var(--text)'}}>Compétences</span>
                  <div style={{display:'flex',flexDirection:'column',gap:5}}>
                    {[{bg:'#1A56DB',label:'Core'},{bg:'#E8EFFD',label:'Secondaire'}].map(s=>(
                      <div key={s.label} style={{display:'flex',alignItems:'center',gap:6,fontSize:11,color:'var(--muted)'}}>
                        <span style={{width:12,height:12,borderRadius:3,flexShrink:0,background:s.bg,display:'inline-block'}}/>
                        {s.label}
                      </div>
                    ))}
                  </div>
                  <div style={{display:'inline-flex',alignItems:'center',gap:4,fontSize:11,background:'#E8EFFD',color:'#1A56DB',borderRadius:6,padding:'3px 7px',marginTop:2,width:'fit-content'}}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12V6.5a1.5 1.5 0 013 0V12"/><path d="M12 12a1.5 1.5 0 013 0v1.5a1.5 1.5 0 013 0V17a5 5 0 01-5 5H9a5 5 0 01-5-5v-1a1.5 1.5 0 013 0"/></svg>
                    Cliquable
                  </div>
                </div>
                <div style={{display:'flex',flexWrap:'wrap',gap:8,alignItems:'flex-start'}}>
                  {CORE_SKILLS.map(skill => (
                    <SkillTag key={skill} skill={skill} active={activeSkills.includes(skill)} isCore onToggle={toggleSkill}/>
                  ))}
                  {SEC_SKILLS.map(skill => (
                    <SkillTag key={skill} skill={skill} active={activeSkills.includes(skill)} isCore={false} onToggle={toggleSkill}/>
                  ))}
                </div>
              </div>

              {/* OUTILS */}
              <div className="home-exp-row" style={{padding:'24px 0',borderBottom:'0.5px solid #E5E9F5'}}>
                <div style={{display:'flex',flexDirection:'column',gap:10,paddingTop:4}}>
                  <span style={{fontSize:12,fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase',color:'var(--text)'}}>Outils</span>
                  <div style={{display:'flex',flexDirection:'column',gap:5}}>
                    {[{bg:'#EEEDFE',border:'#AFA9EC',label:'Design'},{bg:'#E1F5EE',border:'#5DCAA5',label:'Dev'},{bg:'#FAEEDA',border:'#EF9F27',label:'PM'}].map(s=>(
                      <div key={s.label} style={{display:'flex',alignItems:'center',gap:6,fontSize:11,color:'var(--muted)'}}>
                        <span style={{width:12,height:12,borderRadius:3,flexShrink:0,background:s.bg,border:`0.5px solid ${s.border}`,display:'inline-block'}}/>
                        {s.label}
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{display:'flex',flexWrap:'wrap',gap:8,alignItems:'flex-start'}}>
                  {TOOLS.map(t => (
                    <span key={t.name} className="badge" style={TOOL_STYLE[t.cat]}>{t.name}</span>
                  ))}
                </div>
              </div>

              {/* LANGUES */}
              <div className="home-exp-row" style={{padding:'24px 0'}}>
                <span style={{fontSize:12,fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase',color:'var(--text)',paddingTop:4}}>Langues</span>
                <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
                  <span className="badge" style={{background:'#1A56DB',color:'#fff',fontWeight:500}}>Français — Natif</span>
                  <span className="badge" style={{background:'#E8EFFD',color:'#185FA5'}}>Anglais — Professionnel</span>
                </div>
              </div>
            </div>

            {/* PANEL */}
            <div style={{position:'sticky',top:16}}>
              {!panelOpen && (
                <div style={{border:'0.5px dashed #B5D4F4',borderRadius:12,padding:'28px 20px',display:'flex',flexDirection:'column',alignItems:'center',gap:10,textAlign:'center'}}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#B5D4F4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"/></svg>
                  <p style={{fontSize:12,color:'var(--muted)',lineHeight:1.5,maxWidth:190}}>Sélectionner une compétence pour voir les projets associés</p>
                </div>
              )}
              {panelOpen && (
                <div style={{border:'0.5px solid #B5D4F4',borderRadius:12,overflow:'hidden'}}>
                  <div style={{padding:'14px 16px 12px',borderBottom:'0.5px solid #E5E9F5',position:'relative'}}>
                    <span style={{fontSize:10,fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase',color:'#1A56DB',display:'block',marginBottom:4}}>Projets associés</span>
                    <p style={{fontSize:14,fontWeight:700,color:'var(--text)',lineHeight:1.3,paddingRight:32}}>{panelLabel}</p>
                    <button onClick={closePanel} style={{position:'absolute',top:12,right:12,width:24,height:24,borderRadius:6,background:'#E8EFFD',border:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',color:'#1A56DB',fontSize:16,fontFamily:'inherit'}}>×</button>
                  </div>
                  <div>
                    {panelProjects.map(p => (
                      <Link key={p.name} to={p.url} style={{display:'flex',alignItems:'flex-start',gap:10,padding:'10px 16px',textDecoration:'none',color:'inherit',borderBottom:'0.5px solid #E5E9F5',transition:'background 0.15s',position:'relative'}} onMouseEnter={e=>e.currentTarget.style.background='#F4F8FE'} onMouseLeave={e=>e.currentTarget.style.background=''}>
                        <div style={{width:34,height:34,borderRadius:7,flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:700,color:'#fff',overflow:'hidden',background:p.logo?p.bg:p.color}}>
                          {p.logo ? <img src={p.logo} alt={p.name} style={{width:'100%',height:'100%',objectFit:'contain',padding:5}}/> : p.initials}
                        </div>
                        <div style={{flex:1,minWidth:0,paddingRight:20}}>
                          <div style={{fontSize:13,fontWeight:500,color:'var(--text)',lineHeight:1.2,marginBottom:2}}>{p.name}</div>
                          <div style={{fontSize:11,color:'var(--muted)',lineHeight:1.4,marginBottom:4,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{p.desc}</div>
                          <span style={{fontSize:10,padding:'2px 7px',borderRadius:5,fontWeight:500,display:'inline-block',background:p.type==='Case study'?'#E8EFFD':p.type==='Side project'?'#FAEEDA':'#EAF3DE',color:p.type==='Case study'?'#185FA5':p.type==='Side project'?'#854F0B':'#3B6D11'}}>{p.type}</span>
                        </div>
                        <span style={{position:'absolute',right:14,top:'50%',transform:'translateY(-50%)',color:'#1A56DB',display:'flex',alignItems:'center'}}>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                        </span>
                      </Link>
                    ))}
                  </div>
                  <div style={{background:'#F4F8FE',borderTop:'0.5px solid #B5D4F4',padding:'9px 16px',display:'flex',alignItems:'center',gap:5,fontSize:11,color:'#185FA5'}}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg>
                    {panelProjects.length} projet{panelProjects.length>1?'s':''} trouvé{panelProjects.length>1?'s':''}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <hr className="divider"/>

      {/* PROJETS */}
      <section id="projets">
        <div className="container">
          <p className="section-label">Études de cas</p>
          <h2>Mes derniers projets</h2>
          <div className="home-projects-grid">
            {[
              { href:'/case/pepyte', thumb:'/images/thumb-pepyte.jpg', logo:'/images/logo-pepyte.svg', role:'UX Research & Design', roleClass:'project-role-pepyte', duration:'26 mois', name:'Pepyte', desc:"Audit de 62 champs, 10 entretiens recruteurs et conception de la fonctionnalité de matching — de la recherche à l'interface.", tags:['UX Research','Entretiens','User Flows','Figma'] },
              { href:'/case/weborama', thumb:'/images/thumb-weborama.jpg', logo:'/images/logo-weborama.svg', role:'Design System Lead', roleClass:'project-role-weborama', duration:'16 mois', name:'Weborama', desc:"Audit de 974 composants, ateliers de co-construction et création d'un Design System de zéro — 80% de composants en moins.", tags:['Design System','Atomic Design','Figma Make','Zeroheight'] },
              { href:'/case/nectar', thumb:'/images/thumb-nectar.jpg', logo:'/images/logo-nectar.svg', role:'Founding Designer', roleClass:'project-role-nectar', duration:'En cours', name:'Nectar', desc:"MVP B2B mobile-first piloté par IA — de la recherche utilisateur aux 8 écrans livrés, avec un process documenté et réplicable.", tags:['Figma Make','Claude MCP','Design System','UX Research'] },
            ].map(p => (
              <Link key={p.name} to={p.href} className="home-project-card" style={{background:'var(--bg)',display:'flex',flexDirection:'column',borderRadius:10,border:'1px solid var(--border)',overflow:'hidden',textDecoration:'none',color:'inherit',transition:'border-color 0.2s,box-shadow 0.2s,transform 0.2s'}} onClick={() => trackEvent.caseStudyOpen(p.name)} onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--blue)';e.currentTarget.style.boxShadow='0 8px 32px rgba(26,86,219,0.12)';e.currentTarget.style.transform='translateY(-4px)'}} onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.boxShadow='';e.currentTarget.style.transform=''}}>
                <div style={{width:'100%',height:200,background:'var(--bg-soft)',borderBottom:'1px solid var(--border)',overflow:'hidden',flexShrink:0}}>
                  <img src={p.thumb} alt={p.name} style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'center',display:'block'}}/>
                </div>
                <div style={{padding:20,display:'flex',flexDirection:'column',gap:10,flex:1}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:8}}>
                    <div style={{display:'flex',alignItems:'center',gap:8,flex:1,minWidth:0}}>
                      <img src={p.logo} alt={p.name} style={{width:22,height:22,borderRadius:5,objectFit:'contain',flexShrink:0}}/>
                      <span style={{fontSize:11,fontWeight:600,padding:'3px 10px',borderRadius:20,whiteSpace:'nowrap',...ROLE_STYLES[p.roleClass]}}>{p.role}</span>
                    </div>
                    <span style={{fontSize:12,color:'var(--muted)',fontWeight:400,whiteSpace:'nowrap',flexShrink:0}}>{p.duration}</span>
                  </div>
                  <p style={{fontSize:18,fontWeight:600,color:'var(--text)',letterSpacing:'-0.025em',lineHeight:1.2}}>{p.name}</p>
                  <p style={{fontSize:13,color:'var(--muted)',lineHeight:1.6,fontWeight:300}}>{p.desc}</p>
                  <div style={{display:'flex',flexWrap:'wrap',gap:6,marginTop:4}}>
                    {p.tags.map(t => <span key={t} className="badge" style={{background:'var(--blue-light)',color:'var(--blue)'}}>{t}</span>)}
                  </div>
                </div>
                <div style={{padding:'0 16px 16px'}}>
                  <span style={{display:'flex',width:'100%',borderRadius:8,fontSize:14,padding:'10px 16px',justifyContent:'center',background:'var(--g100)',color:'var(--g600)',fontWeight:500,alignItems:'center',gap:8}}>
                    Voir le projet <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <hr className="divider"/>

      {/* RECOMMANDATIONS */}
      <section id="recommandations">
        <div className="container">
          <p className="section-label">Références</p>
          <h2>Témoignages de mes collaborateurs</h2>
          <div style={{display:'flex',flexDirection:'column',gap:16}}>
            {/* Featured */}
            <div style={{background:'#fff',border:'1px solid var(--border)',borderRadius:14,padding:32}}>
              <div className="home-rec-featured-grid">
                <div style={{display:'flex',flexDirection:'column',gap:14}}>
                  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:8}}>
                    <div style={{display:'flex',gap:2}}>{[0,1,2,3,4].map(i=><span key={i} style={{color:'#F59E0B',fontSize:15}}>★</span>)}</div>
                    <img src="/images/logo-pepyte.svg" alt="Pepyte" style={{height:22,width:'auto',objectFit:'contain',opacity:.85,flexShrink:0}}/>
                  </div>
                  <p style={{fontSize:17,fontWeight:700,color:'var(--text)',lineHeight:1.45,letterSpacing:'-.015em'}}>« Une augmentation importante de la satisfaction des utilisateurs et de l'efficacité des processus de recrutement. »</p>
                  <hr style={{border:'none',borderTop:'1px solid var(--border)'}}/>
                  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:8}}>
                    <div style={{display:'flex',alignItems:'center',gap:10}}>
                      <img src="/images/avatar-alexis.png" alt="Alexis Vaysse" style={{width:44,height:44,borderRadius:'50%',objectFit:'cover',flexShrink:0,border:'2px solid var(--border)'}}/>
                      <div>
                        <p style={{fontSize:14,fontWeight:600,color:'var(--text)',lineHeight:1.2}}>Alexis Vaysse</p>
                        <p style={{fontSize:11,color:'var(--muted)',fontWeight:300,marginTop:2}}>Co-CEO & Co-Founder · Pepyte</p>
                      </div>
                    </div>
                    <a href="https://fr.linkedin.com/in/alexis-vaysse" target="_blank" rel="noopener" style={{display:'inline-flex',alignItems:'center',gap:5,fontSize:11,fontWeight:600,color:'#0A66C2',background:'#EBF3FB',border:'1px solid #C0DCF5',borderRadius:20,padding:'5px 10px',textDecoration:'none',whiteSpace:'nowrap',flexShrink:0}}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="#0A66C2"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                      LinkedIn
                    </a>
                  </div>
                </div>
                <div className="home-rec-right">
                  <p style={{fontSize:14,color:'var(--muted)',lineHeight:1.75,fontWeight:300,fontStyle:'italic'}}>Thomas a grandement amélioré notre plateforme de recrutement. Il a su comprendre les besoins des utilisateurs. Il a également collaboré efficacement avec notre équipe de développement. Nous avons obtenu une augmentation importante de la satisfaction des utilisateurs clients et de l'efficacité des processus de recrutement.</p>
                </div>
              </div>
            </div>
            {/* Compact row */}
            <div className="home-rec-row">
              {[
                { logo:'/images/logo-pepyte.svg', logoAlt:'Pepyte', keyquote:'« Une capacité de travail impressionnante à une positivité contagieuse. »', quote:"Thomas est un Product Designer motivé, combinant une capacité de travail impressionnante à une positivité contagieuse. Son dévouement et son optimisme inspirent toute l'équipe. Fortement recommandé !", avatar:'/images/avatar-antoine.png', name:'Antoine Girard', role:'Co-CEO & Co-Founder · Pepyte', li:'https://www.linkedin.com/in/antoine-girard-202561143/' },
                { logo:'/images/logo-weborama.svg', logoAlt:'Weborama', keyquote:'« Faire de l\'IA un véritable allié stratégique. »', quote:"Thomas a su faire de l'IA un véritable allié stratégique, l'intégrant avec maîtrise dans ses méthodes de conception pour créer des produits plus intelligents et optimiser les parcours utilisateurs.", avatar:'/images/avatar-donia.png', name:'Donia Ben Ghorbal', role:'Lead Product Designer · Weborama', li:'https://www.linkedin.com/in/donia-benghorbal-750ba1143/' },
              ].map(r => (
                <div key={r.name} style={{background:'#fff',border:'1px solid var(--border)',borderRadius:14,padding:24,display:'flex',flexDirection:'column',gap:14}}>
                  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:8}}>
                    <div style={{display:'flex',gap:2}}>{[0,1,2,3,4].map(i=><span key={i} style={{color:'#F59E0B',fontSize:14}}>★</span>)}</div>
                    <img src={r.logo} alt={r.logoAlt} style={{height:20,width:'auto',objectFit:'contain',opacity:.85,flexShrink:0}}/>
                  </div>
                  <p style={{fontSize:15,fontWeight:700,color:'var(--text)',lineHeight:1.45,letterSpacing:'-.015em'}}>{r.keyquote}</p>
                  <p style={{fontSize:13,color:'var(--muted)',lineHeight:1.75,fontWeight:300,fontStyle:'italic'}}>{r.quote}</p>
                  <hr style={{border:'none',borderTop:'1px solid var(--border)'}}/>
                  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:8}}>
                    <div style={{display:'flex',alignItems:'center',gap:10}}>
                      <img src={r.avatar} alt={r.name} style={{width:38,height:38,borderRadius:'50%',objectFit:'cover',flexShrink:0,border:'2px solid var(--border)'}}/>
                      <div>
                        <p style={{fontSize:14,fontWeight:600,color:'var(--text)',lineHeight:1.2}}>{r.name}</p>
                        <p style={{fontSize:11,color:'var(--muted)',fontWeight:300,marginTop:2}}>{r.role}</p>
                      </div>
                    </div>
                    <a href={r.li} target="_blank" rel="noopener" style={{display:'inline-flex',alignItems:'center',gap:5,fontSize:11,fontWeight:600,color:'#0A66C2',background:'#EBF3FB',border:'1px solid #C0DCF5',borderRadius:20,padding:'5px 10px',textDecoration:'none',whiteSpace:'nowrap',flexShrink:0}}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="#0A66C2"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                      LinkedIn
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <hr className="divider"/>

      {/* CONTACT */}
      <section id="contact" style={{background:'var(--p50)',borderTop:'1px solid var(--p100)',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',top:-60,right:-60,width:280,height:280,background:'radial-gradient(circle,var(--p100) 0%,transparent 70%)',pointerEvents:'none'}}/>
        <div className="container">
          <div style={{maxWidth:480}}>
            <p className="section-label">Contact</p>
            <h2>Travaillons ensemble</h2>
            <p style={{color:'var(--muted)',fontSize:16,marginBottom:32,fontWeight:300}}>Disponible pour des missions freelance, des opportunités CDI ou des collaborations ponctuelles à Paris.</p>
            <div style={{display:'flex',flexDirection:'column',gap:12}}>
              <a href="https://mail.google.com/mail/?view=cm&to=reynier.design@gmail.com" target="_blank" rel="noopener" className="contact-link-item" onClick={() => trackEvent.contactClick('contact_section')}>
                <svg viewBox="0 0 24 24" style={{width:18,height:18,stroke:'currentColor',fill:'none',strokeWidth:1.8,flexShrink:0}}><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>
                <span style={{flex:1}}>reynier.design@gmail.com</span>
                <small style={{fontSize:12,color:'var(--muted)'}}>Email</small>
              </a>
              <a href="https://www.linkedin.com/in/thomas-reynier-product-design/" target="_blank" rel="noopener" className="contact-link-item" onClick={() => trackEvent.linkedinClick('contact_section')}>
                <svg viewBox="0 0 24 24" style={{width:18,height:18,stroke:'currentColor',fill:'none',strokeWidth:1.8,flexShrink:0}}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
                <span style={{flex:1}}>LinkedIn</span>
                <small style={{fontSize:12,color:'var(--muted)'}}>Réseau professionnel</small>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

const ROLE_STYLES = {
  'project-role-pepyte': { background:'#F0EDFE', color:'#6B45D6', border:'1px solid #D6CCFC' },
  'project-role-weborama': { background:'#E3F7EE', color:'#0E7A56', border:'1px solid #A7E3CA' },
  'project-role-nectar': { background:'#FEF3E2', color:'#A05C0A', border:'1px solid #F9D5A0' },
};

function SkillTag({ skill, active, isCore, onToggle }) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  const base = { fontFamily:'inherit', fontSize:13, fontWeight:500, padding:'3px 8px', borderRadius:6, cursor:'pointer', lineHeight:1.4, whiteSpace:'nowrap', display:'inline-flex', alignItems:'center', gap:6, transition:'background 0.15s,color 0.15s,transform 0.1s', border:'1.5px solid', transform: pressed ? 'scale(0.97)' : 'scale(1)' };

  const coreStyle = active
    ? { ...base, background: pressed ? '#0C447C' : hovered ? '#185FA5' : '#175CD3', color:'#fff', borderColor:'#1570EF' }
    : { ...base, background: pressed ? '#0C447C' : hovered ? '#185FA5' : '#1A56DB', color:'#fff', borderColor:'#1A56DB' };

  const secStyle = active
    ? { ...base, background: pressed ? '#85B7EB' : hovered ? '#B5D4F4' : '#B2DDFF', color: pressed ? '#0C447C' : '#175CD3', borderColor:'#1570EF' }
    : { ...base, background: pressed ? '#85B7EB' : hovered ? '#B5D4F4' : '#E8EFFD', color: pressed || hovered ? '#0C447C' : '#185FA5', borderColor:'#B5D4F4' };

  return (
    <button
      style={isCore ? coreStyle : secStyle}
      onClick={() => onToggle(skill)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
    >
      <span style={{fontSize:10,width:10,height:10,display:'inline-flex',alignItems:'center',justifyContent:'center'}}>
        {active
          ? <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M1 1l10 10M11 1L1 11"/></svg>
          : <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 1v10M1 6h10"/></svg>
        }
      </span>
      {skill}
    </button>
  );
}

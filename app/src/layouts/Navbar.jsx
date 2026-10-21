import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import DarkModeOutlined from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlined from '@mui/icons-material/LightModeOutlined';
import useColorMode from '../hooks/useColorMode';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const { mode, toggleMode } = useColorMode();
  const isDark = mode === 'dark';
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  // Floating pill navbar once the page scrolls past the top (respond.io-style),
  // plus the reading-progress fill that lives inside it so it follows the same rounded corners.
  // Updates are batched to one per animation frame — raw scroll events fire far more often
  // than the UI needs, and re-rendering on every one of them is what made this feel janky.
  useEffect(() => {
    let ticking = false;
    function update() {
      setScrolled(window.scrollY > 8);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
      ticking = false;
    }
    function onScroll() {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    }
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function close() { setOpen(false); }
  function toggle() { setOpen(prev => !prev); }

  function handleAnchor(anchor) {
    close();
    if (isHome) {
      const el = document.getElementById(anchor);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/#' + anchor);
    }
  }

  return (
    <>
      <nav className={`nav${scrolled && !open ? ' nav-scrolled' : ''}${open ? ' nav-open' : ''}`}>
        <div className="nav-inner">
          <Link className="nav-brand" to="/" onClick={close}>
            <div className="nav-logo-placeholder">TR</div>
            <span className="nav-logo-text">Thomas Reynier</span>
          </Link>
          <ul className="nav-links">
            <li><button className="nav-link" style={{background:'none',border:'none',cursor:'pointer',fontFamily:'inherit'}} onClick={() => handleAnchor('hero')}>Accueil</button></li>
            <li><button className="nav-link" style={{background:'none',border:'none',cursor:'pointer',fontFamily:'inherit'}} onClick={() => handleAnchor('competences')}>Expertises</button></li>
            <li><button className="nav-link" style={{background:'none',border:'none',cursor:'pointer',fontFamily:'inherit'}} onClick={() => handleAnchor('projets')}>Projets</button></li>
            <li><button className="nav-cta" style={{background:'var(--blue)',border:'none',cursor:'pointer',fontFamily:'inherit'}} onClick={() => handleAnchor('contact')}>Contact</button></li>
          </ul>
          <button
            className="nav-mode-toggle"
            aria-label={isDark ? 'Passer en mode clair' : 'Passer en mode sombre'}
            aria-pressed={isDark}
            onClick={toggleMode}
          >
            {isDark ? <LightModeOutlined fontSize="small" /> : <DarkModeOutlined fontSize="small" />}
          </button>
          <button className={`burger${open ? ' active' : ''}`} aria-label="Menu" onClick={toggle}>
            <span/><span/><span/>
          </button>
        </div>
        <div className="nav-progress" style={{width:`${progress}%`}}/>
      </nav>

      {open && createPortal(
        <div className="mob-overlay">
          <ul className="mob-menu">
            <li><button onClick={() => handleAnchor('hero')}>Accueil</button></li>
            <li><button onClick={() => handleAnchor('competences')}>Expertises</button></li>
            <li><button onClick={() => handleAnchor('projets')}>Projets</button></li>
            <li style={{borderBottom:'none',padding:'20px 2rem 24px'}}>
              <button onClick={() => handleAnchor('contact')} style={{display:'block',width:'100%',textAlign:'center',background:'var(--blue)',color:'var(--on-accent)',fontWeight:600,padding:'16px',borderRadius:10,fontSize:16,border:'none',cursor:'pointer',fontFamily:"'Outfit',sans-serif"}}>Contact</button>
            </li>
          </ul>
          <div className="mob-footer-inner">
            <span className="mob-footer-email">reynier.design@gmail.com</span>
            <div className="mob-footer-icons">
              <a href="https://mail.google.com/mail/?view=cm&to=reynier.design@gmail.com" target="_blank" rel="noopener" className="mob-footer-icon">
                <svg viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>
              </a>
              <a href="https://www.linkedin.com/in/thomas-reynier-product-design/" target="_blank" rel="noopener" className="mob-footer-icon">
                <svg viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

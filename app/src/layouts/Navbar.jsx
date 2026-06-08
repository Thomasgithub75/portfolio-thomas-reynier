import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

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
      <nav className="nav">
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
          <button className={`burger${open ? ' active' : ''}`} aria-label="Menu" onClick={toggle}>
            <span/><span/><span/>
          </button>
        </div>
      </nav>

      {open && createPortal(
        <div className="mob-overlay">
          <ul className="mob-menu">
            <li><button onClick={() => handleAnchor('hero')}>Accueil</button></li>
            <li><button onClick={() => handleAnchor('competences')}>Expertises</button></li>
            <li><button onClick={() => handleAnchor('projets')}>Projets</button></li>
            <li style={{borderBottom:'none',padding:'20px 2rem 24px'}}>
              <button onClick={() => handleAnchor('contact')} style={{display:'block',width:'100%',textAlign:'center',background:'var(--blue)',color:'#fff',fontWeight:600,padding:'16px',borderRadius:10,fontSize:16,border:'none',cursor:'pointer',fontFamily:"'Outfit',sans-serif"}}>Contact</button>
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

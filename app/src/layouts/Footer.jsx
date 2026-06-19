import Tooltip from '@mui/material/Tooltip';
import { trackEvent } from '../utils/analytics';

export default function Footer() {
  return (
    <footer className="footer">
      <p>© 2026 Thomas Reynier · Product Designer · Paris</p>
      <div className="footer-icons">
        <Tooltip title="reynier.design@gmail.com" placement="top" arrow>
          <a href="https://mail.google.com/mail/?view=cm&to=reynier.design@gmail.com" target="_blank" rel="noopener" className="footer-icon" onClick={() => trackEvent.contactClick('footer')}>
            <svg viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>
          </a>
        </Tooltip>
        <Tooltip title="Voir mon profil LinkedIn" placement="top" arrow>
          <a href="https://www.linkedin.com/in/thomas-reynier-product-design/" target="_blank" rel="noopener" className="footer-icon" onClick={() => trackEvent.linkedinClick('footer')}>
            <svg viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
        </Tooltip>
        <Tooltip title="Télécharger mon CV (PDF)" placement="top" arrow>
          <a href="https://drive.google.com/uc?export=download&id=1Dm3rEo0oz8CxeUwx-cpPdG2FeY-uRfKo" target="_blank" rel="noopener" className="footer-icon" onClick={() => trackEvent.cvDownload()}>
            <svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          </a>
        </Tooltip>
      </div>
    </footer>
  );
}

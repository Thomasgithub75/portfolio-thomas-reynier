import { Theme } from '@astryxdesign/core/theme';
import Navbar from './Navbar';
import Footer from './Footer';
import useColorMode from '../hooks/useColorMode';
import { portfolioTheme } from '../theme/astryxTheme';
// Styles des composants Astryx (cloisonnés dans leurs propres classes). Le reset Astryx n'est pas
// chargé : le site a déjà le sien (ordre des couches : styles/layers.css).
import '@astryxdesign/core/astryx.css';
import './AstryxPage.css';

// Gabarit commun des pages : Navbar maison, thème Astryx « portfolio » suivant le mode clair/sombre, footer
export default function AstryxPage({ children, footer = true }) {
  const { mode } = useColorMode();
  return (
    <>
      <Navbar />
      <Theme theme={portfolioTheme} mode={mode}>
        <div className="ax-page">
          {children}
          {footer && <Footer />}
        </div>
      </Theme>
    </>
  );
}

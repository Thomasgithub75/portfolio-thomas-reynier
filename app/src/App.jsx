import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Home from './pages/Home';
import CaseWeborama from './pages/CaseWeborama';
import CasePepyte from './pages/CasePepyte';
import CaseNectar from './pages/CaseNectar';
import CasePortfolio from './pages/CasePortfolio';
import CasePepyteSignature from './pages/CasePepyteSignature';
import JobMatcher from './pages/JobMatcher';
import LettreMotivation from './pages/LettreMotivation';
import DesignSystem from './pages/DesignSystem';
import Intro from './components/Intro/Intro';
import './styles/global.css';

// Astryx playground — lazy loaded so its styles never reach the existing MUI pages
const AstryxSandbox = lazy(() => import('./pages/AstryxSandbox'));

export default function App() {
  return (
    <BrowserRouter>
      <Intro />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/case/weborama" element={<CaseWeborama />} />
        <Route path="/case/pepyte" element={<CasePepyte />} />
        <Route path="/case/pepyte-signature" element={<CasePepyteSignature />} />
        <Route path="/fonctionnalite-ia" element={<JobMatcher />} />
        {/* Portfolio case study — local only */}
        <Route path="/case/portfolio" element={<Navigate to="/" replace />} />
        <Route path="/wip/portfolio" element={import.meta.env.DEV ? <CasePortfolio /> : <Navigate to="/" replace />} />
        {/* Nectar case study — archived, local only, kept for reference */}
        <Route path="/case/nectar" element={<Navigate to="/" replace />} />
        <Route path="/wip/nectar" element={import.meta.env.DEV ? <CaseNectar /> : <Navigate to="/" replace />} />
        <Route path="/lettre-motivation" element={<LettreMotivation />} />
        <Route path="/design-system" element={<DesignSystem />} />
        {/* Astryx design system playground — local only */}
        <Route path="/wip/astryx" element={import.meta.env.DEV ? <Suspense fallback={null}><AstryxSandbox /></Suspense> : <Navigate to="/" replace />} />
      </Routes>
      <Analytics />
      <SpeedInsights />
    </BrowserRouter>
  );
}

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Home from './pages/Home';
import CaseWeborama from './pages/CaseWeborama';
import CasePepyte from './pages/CasePepyte';
import CaseNectar from './pages/CaseNectar';
import CasePortfolio from './pages/CasePortfolio';
import CasePepyteSignature from './pages/CasePepyteSignature';
import LettreMotivation from './pages/LettreMotivation';
import DesignSystem from './pages/DesignSystem';
import './styles/global.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/case/weborama" element={<CaseWeborama />} />
        <Route path="/case/pepyte" element={<CasePepyte />} />
        <Route path="/case/nectar" element={<CaseNectar />} />
        <Route path="/case/pepyte-signature" element={<CasePepyteSignature />} />
        {/* Portfolio case study — local only */}
        <Route path="/case/portfolio" element={<Navigate to="/" replace />} />
        <Route path="/wip/portfolio" element={import.meta.env.DEV ? <CasePortfolio /> : <Navigate to="/" replace />} />
        <Route path="/lettre-motivation" element={<LettreMotivation />} />
        <Route path="/design-system" element={<DesignSystem />} />
      </Routes>
      <Analytics />
      <SpeedInsights />
    </BrowserRouter>
  );
}

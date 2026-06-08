import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Home from './pages/Home';
import CaseWeborama from './pages/CaseWeborama';
import CasePepyte from './pages/CasePepyte';
import CaseNectar from './pages/CaseNectar';
import './styles/global.css';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/case/weborama" element={<CaseWeborama />} />
          <Route path="/case/pepyte" element={<CasePepyte />} />
          <Route path="/case/nectar" element={<CaseNectar />} />
        </Routes>
      </BrowserRouter>
      <Analytics />
      <SpeedInsights />
    </>
  );
}

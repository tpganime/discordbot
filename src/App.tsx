import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Nav } from './components/Nav';
import { ScrollToTop } from './components/ScrollToTop';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { AIConsole } from './components/AIConsole';
import { NukeGuard } from './components/NukeGuard';
import { Footer } from './components/Footer';
import { CommandsPage } from './pages/CommandsPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { UpdatesPage } from './pages/UpdatesPage';
import { StatusPage } from './pages/StatusPage';
import { CustomCursor } from './components/CustomCursor';

const HomePage = () => (
  <main>
    <Hero />
    <Features />
    <AIConsole />
    <NukeGuard />
  </main>
);

const App = () => {
  React.useEffect(() => {
    // Only register mouse movements on desktop with fine pointers
    if (!window.matchMedia('(pointer: fine)').matches) return;

    let rafId: number | null = null;
    const handleMouseMove = (e: MouseEvent) => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        document.documentElement.style.setProperty('--mouse-x', `${x}%`);
        document.documentElement.style.setProperty('--mouse-y', `${y}%`);
        rafId = null;
      });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-black text-white selection:bg-blue-600 selection:text-white relative">
        {/* Global Background (Lightweight on mobile) */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-[#020617]" />
          
          {/* Reactive Mouse Glow (Desktop Only) */}
          <div 
            className="absolute inset-0 opacity-40 transition-opacity duration-1000 hidden md:block"
            style={{
              background: `radial-gradient(circle 800px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(30, 58, 138, 0.25), transparent 80%)`
            }}
          />

          {/* Optimized Ambient Glows */}
          <div 
            className="absolute -top-[10%] -left-[5%] w-[50%] h-[50%] rounded-full bg-blue-900/15 blur-[60px] md:blur-[140px] pointer-events-none"
          />
          <div 
            className="absolute -bottom-[10%] -right-[5%] w-[50%] h-[50%] rounded-full bg-blue-800/10 blur-[60px] md:blur-[140px] opacity-40 pointer-events-none"
          />
        </div>

        <div className="relative z-10">
          <CustomCursor />
          <Nav />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/commands" element={<CommandsPage />} />
            <Route path="/updates" element={<UpdatesPage />} />
            <Route path="/status" element={<StatusPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </Router>
  );
};

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Nav } from './components/Nav';
import { ScrollToTop } from './components/ScrollToTop';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { InsiderProgram } from './components/InsiderProgram';
import { AIConsole } from './components/AIConsole';
import { NukeGuard } from './components/NukeGuard';
import { Footer } from './components/Footer';
import { CommandsPage } from './pages/CommandsPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { UpdatesPage } from './pages/UpdatesPage';
import { StatusPage } from './pages/StatusPage';
import { CustomCursor } from './components/CustomCursor';
import { DISCORD_INVITE_URL } from './constants';

const HomePage = () => (
  <main>
    <Hero />
    <Features />
    <InsiderProgram />
    <AIConsole />
    <NukeGuard />
  </main>
);

const KaitoRedirect = () => {
  React.useEffect(() => {
    // Attempt tracking referral beacon then redirect to bot invite
    fetch('https://panel.fusionhub.in/api/track/kaito?type=click', { mode: 'no-cors' }).finally(() => {
      window.location.href = 'https://panel.fusionhub.in/kaito';
    });
    // Fallback if panel server is unreachable within 1.5s
    const timer = setTimeout(() => {
      window.location.href = DISCORD_INVITE_URL;
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-6">
      <div className="text-center space-y-4">
        <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <h2 className="text-xl font-bold">Redirecting to Fusion Bot Invite...</h2>
        <p className="text-sm text-white/50">Taking you to Discord authorization.</p>
      </div>
    </div>
  );
};

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
            <Route path="/insider" element={<main className="pt-20"><InsiderProgram /></main>} />
            <Route path="/commands" element={<CommandsPage />} />
            <Route path="/updates" element={<UpdatesPage />} />
            <Route path="/status" element={<StatusPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/kaito" element={<KaitoRedirect />} />
            <Route path="/invite/kaito" element={<KaitoRedirect />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </Router>
  );
};

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Nav } from './components/Nav';
import { ScrollToTop } from './components/ScrollToTop';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { AIConsole } from './components/AIConsole';
import { NukeGuard } from './components/NukeGuard';
import { Commands } from './components/Commands';
import { Footer } from './components/Footer';
import { Section } from './components/ui/Section';
import { Container } from './components/ui/Container';
import { Typography } from './components/ui/Typography';
import { Button } from './components/ui/Button';
import { Flex } from './components/ui/Flex';
import { DISCORD_INVITE_URL } from './constants';
import { CommandsPage } from './pages/CommandsPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { UpdatesPage } from './pages/UpdatesPage';
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
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      document.documentElement.style.setProperty('--mouse-x', `${x}%`);
      document.documentElement.style.setProperty('--mouse-y', `${y}%`);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-black text-white selection:bg-blue-600 selection:text-white relative">
        {/* Global Background */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-[#020617]" />
          
          {/* Reactive Mouse Glow */}
          <div 
            className="absolute inset-0 opacity-40 transition-opacity duration-1000"
            style={{
              background: `radial-gradient(circle 800px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(30, 58, 138, 0.25), transparent 80%)`
            }}
          />

          <div 
            className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-blue-900/15 blur-[140px] animate-pulse"
            style={{ animationDuration: '10s' }}
          />
          <div 
            className="absolute -bottom-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-blue-800/10 blur-[140px] animate-pulse opacity-50"
            style={{ animationDuration: '15s' }}
          />

          {/* Texture Overlay */}
          <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
        </div>

        <div className="relative z-10">
          <CustomCursor />
          <Nav />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/commands" element={<CommandsPage />} />
            <Route path="/updates" element={<UpdatesPage />} />
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

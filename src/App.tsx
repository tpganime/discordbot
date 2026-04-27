import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Nav } from './components/Nav';
import { ScrollToTop } from './components/ScrollToTop';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
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
import { CustomCursor } from './components/CustomCursor';

const HomePage = () => (
  <main>
    <Hero />
    <Features />
    <NukeGuard />
  </main>
);

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-black text-white selection:bg-blue-600 selection:text-white relative">
        {/* Global Background */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
            style={{ backgroundImage: 'url("https://i.ibb.co/Cp5Jms2H/IMG-20260323-031453.png")' }}
          />
          <div className="absolute inset-0 bg-black/80 backdrop-blur-[1px]" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
        </div>

        <div className="relative z-10">
          <CustomCursor />
          <Nav />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/commands" element={<CommandsPage />} />
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


import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Stats from './components/Stats';
import Footer from './components/Footer';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import CommandsPage from './pages/CommandsPage';
import DashboardPage from './pages/DashboardPage';
import { motion } from 'framer-motion';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const LandingPage: React.FC<{ servers: number }> = ({ servers }) => {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      <Stats servers={servers} />
      <div className="relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <Features />
      </div>
    </motion.main>
  );
};

const App: React.FC = () => {
  const [serverCount] = useState(4);

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen relative selection:bg-indigo-500/30 overflow-x-hidden">
        <Navbar />
        
        <Routes>
          <Route path="/" element={<LandingPage servers={serverCount} />} />
          <Route path="/commands" element={<CommandsPage />} />
          <Route path="/panel" element={<DashboardPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
};

export default App;

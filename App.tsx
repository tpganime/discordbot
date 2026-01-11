import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import Features from './components/Features.tsx';
import Stats from './components/Stats.tsx';
import Footer from './components/Footer.tsx';
import InteractiveAI from './components/InteractiveAI.tsx';
import PrivacyPage from './pages/PrivacyPage.tsx';
import TermsPage from './pages/TermsPage.tsx';
import CommandsPage from './pages/CommandsPage.tsx';
import { DISCORD_LOGIN_URL } from './constants.tsx';
import { motion, AnimatePresence } from 'framer-motion';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

interface User {
  username: string;
  avatar: string;
  discriminator: string;
}

const LandingPage: React.FC<{ servers: number, users: number, user: User | null }> = ({ servers, users, user }) => {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Hero onAdd={() => {}} onLogin={() => {}} user={user} />
      <Stats servers={servers} users={users} />
      <div className="relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <InteractiveAI />
        <Features />
      </div>
    </motion.main>
  );
};

const App: React.FC = () => {
  const [serverCount, setServerCount] = useState(1284);
  const [userCount, setUserCount] = useState(42069);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthorizing, setIsAuthorizing] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    if (code) {
      setIsAuthorizing(true);
      window.history.replaceState({}, document.title, window.location.pathname);
      
      setTimeout(() => {
        setUser({
          username: "Discord User",
          discriminator: "0000",
          avatar: "https://cdn.discordapp.com/embed/avatars/0.png"
        });
        setIsAuthorizing(false);
      }, 1500);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setServerCount(prev => prev + Math.floor(Math.random() * 2));
      setUserCount(prev => prev + Math.floor(Math.random() * 5));
    }, 10000); 
    return () => clearInterval(interval);
  }, []);

  const handleLogin = () => {
    window.location.href = DISCORD_LOGIN_URL;
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen relative selection:bg-indigo-500/30 overflow-x-hidden">
        <AnimatePresence>
          {isAuthorizing && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[1000] bg-[#050505] flex flex-col items-center justify-center"
            >
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-2 border-indigo-500/20 border-t-indigo-500 rounded-full mb-8 shadow-[0_0_15px_rgba(99,102,241,0.3)]"
              ></motion.div>
              <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-indigo-400">Authenticating Pulse</h2>
            </motion.div>
          )}
        </AnimatePresence>

        <Navbar onAdd={() => {}} onLogin={handleLogin} onLogout={handleLogout} user={user} />
        
        <Routes>
          <Route path="/" element={<LandingPage servers={serverCount} users={userCount} user={user} />} />
          <Route path="/commands" element={<CommandsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
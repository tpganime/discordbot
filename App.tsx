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
      
      // Simulate faster authorization (500ms instead of 1500ms)
      setTimeout(() => {
        setUser({
          username: "Master Operator",
          discriminator: "0001",
          // The image from the prompt: high-fidelity glowing orb aesthetic
          avatar: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000&auto=format&fit=crop" 
        });
        setIsAuthorizing(false);
      }, 500);
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
              <div className="relative">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="w-20 h-20 border-b-2 border-indigo-500 rounded-full shadow-[0_0_30px_rgba(99,102,241,0.4)]"
                ></motion.div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-4 h-4 bg-indigo-500 rounded-full animate-pulse shadow-[0_0_20px_rgba(99,102,241,1)]"></div>
                </div>
              </div>
              <h2 className="text-[10px] font-black uppercase tracking-[0.8em] text-indigo-400 mt-12 animate-pulse">Syncing Core</h2>
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
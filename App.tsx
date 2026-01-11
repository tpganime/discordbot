
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Stats from './components/Stats';
import Footer from './components/Footer';
import InteractiveAI from './components/InteractiveAI';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import CommandsPage from './pages/CommandsPage';
import { DISCORD_LOGIN_URL } from './constants';
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

const LandingPage: React.FC<{ onAdd: () => void, onLogin: () => void, servers: number, users: number, user: User | null }> = ({ onAdd, onLogin, servers, users, user }) => {
  return (
    <main>
      <Hero onAdd={onAdd} onLogin={onLogin} user={user} />
      <Stats servers={servers} users={users} />
      <InteractiveAI />
      <Features />
    </main>
  );
};

const App: React.FC = () => {
  const [serverCount, setServerCount] = useState(5);
  const [userCount, setUserCount] = useState(5);
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
      }, 2000);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.85) setServerCount(prev => prev + 1);
      if (Math.random() > 0.6) setUserCount(prev => prev + Math.floor(Math.random() * 2) + 1);
    }, 15000); 
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
              className="fixed inset-0 z-[1000] bg-black flex flex-col items-center justify-center"
            >
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-2 border-indigo-500/20 border-t-indigo-500 rounded-full mb-8"
              ></motion.div>
              <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-white">Connecting to Discord</h2>
            </motion.div>
          )}
        </AnimatePresence>

        <Navbar onAdd={() => {}} onLogin={handleLogin} onLogout={handleLogout} user={user} />
        
        <Routes>
          <Route path="/" element={<LandingPage onAdd={() => {}} onLogin={handleLogin} servers={serverCount} users={userCount} user={user} />} />
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

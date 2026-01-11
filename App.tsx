
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Stats from './components/Stats';
import InteractiveAI from './components/InteractiveAI';
import Footer from './components/Footer';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
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
      <Features />
      <InteractiveAI />
    </main>
  );
};

const App: React.FC = () => {
  const [serverCount, setServerCount] = useState(5);
  const [userCount, setUserCount] = useState(5);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthorizing, setIsAuthorizing] = useState(false);

  // Simulate realistic growth starting from low numbers
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.85) setServerCount(prev => prev + 1);
      if (Math.random() > 0.6) setUserCount(prev => prev + Math.floor(Math.random() * 2) + 1);
    }, 12000); 
    return () => clearInterval(interval);
  }, []);

  const handleAddBot = () => {
    // Analytics or local feedback
  };

  const handleLogin = () => {
    setIsAuthorizing(true);
    // Simulate real Discord OAuth sequence
    setTimeout(() => {
      setUser({
        username: "Member",
        discriminator: "0001",
        avatar: "https://cdn.discordapp.com/embed/avatars/2.png"
      });
      setIsAuthorizing(false);
    }, 1800);
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
              className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-3xl flex flex-col items-center justify-center"
            >
              <motion.div 
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-16 h-16 border-2 border-indigo-500/20 border-t-indigo-500 rounded-full mb-8 shadow-[0_0_30px_rgba(99,102,241,0.3)]"
              ></motion.div>
              <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-white animate-pulse">Discord Authorization</h2>
              <p className="text-gray-500 text-[9px] mt-4 uppercase tracking-[0.2em]">Syncing session data...</p>
            </motion.div>
          )}
        </AnimatePresence>

        <Navbar onAdd={handleAddBot} onLogin={handleLogin} onLogout={handleLogout} user={user} />
        
        <Routes>
          <Route path="/" element={<LandingPage onAdd={handleAddBot} onLogin={handleLogin} servers={serverCount} users={userCount} user={user} />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
};

export default App;

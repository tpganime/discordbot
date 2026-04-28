import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Menu, X, Bot, Github, Twitter, LayoutDashboard } from 'lucide-react';
import { Button } from './ui/Button';
import { Container } from './ui/Container';
import { Flex } from './ui/Flex';
import { Typography } from './ui/Typography';
import { APP_NAME, DISCORD_INVITE_URL, LOGO_URL, DASHBOARD_URL, GITHUB_URL } from '../constants';

export const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const { scrollY } = useScroll();
  
  const navBg = useTransform(
    scrollY,
    [0, 100],
    ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.8)']
  );

  const navBlur = useTransform(
    scrollY,
    [0, 100],
    ['blur(0px)', 'blur(20px)']
  );

  const navBorder = useTransform(
    scrollY,
    [0, 100],
    ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.05)']
  );

  return (
    <motion.nav
      style={{ backgroundColor: navBg, backdropFilter: navBlur, borderColor: navBorder }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-2rem)] max-w-7xl rounded-[32px] border transition-all duration-300"
    >
      <Container size="xl">
        <Flex justify="between" className="h-20 px-2 lg:px-6">
          <Flex gap={4}>
            <Link to="/" className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/10 shadow-lg shadow-blue-600/20">
                <img src={LOGO_URL} alt="Logo" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <span className="font-display text-xl font-black tracking-tighter hidden sm:block">{APP_NAME}</span>
            </Link>
          </Flex>

          <Flex gap={8} className="hidden lg:flex">
            <a href="/#features" className="text-sm font-bold text-white/40 hover:text-white transition-colors">Features</a>
            <Link to="/commands" className="text-sm font-bold text-white/40 hover:text-white transition-colors">Commands</Link>
            <Link to="/updates" className="text-sm font-bold text-white/40 hover:text-white transition-colors">Updates</Link>
          </Flex>

          <Flex gap={4} className="hidden lg:flex">
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-white/5 border-white/5 hover:bg-white/10"
              onClick={() => window.location.href = DASHBOARD_URL}
            >
              <LayoutDashboard className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
            <Button variant="primary" size="sm" className="shadow-lg shadow-blue-600/20" onClick={() => window.open(DISCORD_INVITE_URL)}>
              Add to Discord
            </Button>
          </Flex>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden w-12 h-12 rounded-2xl glass flex items-center justify-center"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </Flex>
      </Container>

      {/* Mobile Menu */}
      <motion.div
        initial={{ y: -20, opacity: 0, scale: 0.95 }}
        animate={{ 
          y: isOpen ? 12 : -20,
          opacity: isOpen ? 1 : 0,
          scale: isOpen ? 1 : 0.95
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={`lg:hidden absolute top-full left-0 right-0 z-[90] bg-[#020617]/95 backdrop-blur-3xl border border-white/10 rounded-[32px] overflow-hidden shadow-2xl shadow-blue-500/10 ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
      >
        <Container className="py-10">
          <Flex direction="col" gap={6} align="start">
            <a href="/#features" onClick={() => setIsOpen(false)} className="text-2xl font-display font-bold text-white/40 hover:text-white transition-colors">Features</a>
            <Link to="/commands" onClick={() => setIsOpen(false)} className="text-2xl font-display font-bold text-white/40 hover:text-white transition-colors">Commands</Link>
            <Link to="/updates" onClick={() => setIsOpen(false)} className="text-2xl font-display font-bold text-white/40 hover:text-white transition-colors">Updates</Link>
            <button 
              onClick={() => {
                setIsOpen(false);
                window.location.href = DASHBOARD_URL;
              }} 
              className="text-2xl font-display font-bold text-white/40 hover:text-white transition-colors flex items-center"
            >
              <LayoutDashboard className="w-6 h-6 mr-3" />
              Dashboard
            </button>
            <div className="w-full h-px bg-white/5 my-2" />
            <Button variant="primary" className="w-full py-6 text-lg" onClick={() => window.open(DISCORD_INVITE_URL)}>
              Add to Discord
            </Button>
          </Flex>
        </Container>
      </motion.div>

      {/* Coming Soon Popup */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showComingSoon ? 1 : 0 }}
        className={`fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 ${showComingSoon ? 'pointer-events-auto' : 'pointer-events-none'}`}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: showComingSoon ? 1 : 0.9, y: showComingSoon ? 0 : 20 }}
          className="glass p-12 rounded-[40px] border border-white/10 text-center max-w-sm w-full"
        >
          <div className="w-20 h-20 rounded-3xl bg-blue-600/20 flex items-center justify-center mx-auto mb-8">
            <Bot className="w-10 h-10 text-blue-600" />
          </div>
          <Typography variant="h3" weight="black" className="mb-4">Coming Soon</Typography>
          <Typography variant="p" className="text-white/60 mb-8">
            This module is currently under development. Stay tuned for updates!
          </Typography>
          <Button variant="primary" className="w-full" onClick={() => setShowComingSoon(false)}>
            Got it
          </Button>
        </motion.div>
      </motion.div>
    </motion.nav>
  );
};

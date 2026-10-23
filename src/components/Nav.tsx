import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Menu, X, Bot, LayoutDashboard, Sparkles, ChevronRight } from 'lucide-react';
import { Button } from './ui/Button';
import { Container } from './ui/Container';
import { Flex } from './ui/Flex';
import { Typography } from './ui/Typography';
import { APP_NAME, DISCORD_INVITE_URL, LOGO_URL, DASHBOARD_URL } from '../constants';

export const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [isBotOnline, setIsBotOnline] = useState(true);
  const { scrollY } = useScroll();

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const res = await fetch('/api/stats', { signal: AbortSignal.timeout(2500) });
        if (res.ok) {
          const data = await res.json();
          setIsBotOnline(data.online !== false && data.status?.toLowerCase() !== 'offline');
        } else {
          setIsBotOnline(false);
        }
      } catch (e) {
        setIsBotOnline(false);
      }
    };
    checkStatus();
    const interval = setInterval(checkStatus, 10000);
    return () => clearInterval(interval);
  }, []);
  
  const navBg = useTransform(
    scrollY,
    [0, 80],
    ['rgba(16, 16, 20, 0.45)', 'rgba(10, 10, 14, 0.82)']
  );

  const navBlur = useTransform(
    scrollY,
    [0, 80],
    ['blur(18px)', 'blur(30px)']
  );

  const navBorder = useTransform(
    scrollY,
    [0, 80],
    ['rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 0.14)']
  );

  return (
    <motion.nav
      style={{ backgroundColor: navBg, backdropFilter: navBlur, borderColor: navBorder }}
      className="fixed top-5 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-2rem)] max-w-6xl rounded-full border shadow-[0_12px_40px_-10px_rgba(0,0,0,0.7)] transition-all duration-300"
    >
      <Container size="xl">
        <Flex justify="between" className="h-[54px] px-3 sm:px-5">
          <Flex gap={3}>
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-8 h-8 rounded-xl overflow-hidden border border-white/15 shadow-sm group-hover:scale-105 transition-transform duration-200">
                <img src={LOGO_URL} alt="Fusion Bot" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <span className="font-display text-[17px] font-bold tracking-[-0.02em] text-white">{APP_NAME}</span>
            </Link>
          </Flex>

          <Flex gap={6} className="hidden md:flex items-center">
            <a href="/#features" className="text-[13.5px] font-medium text-white/60 hover:text-white transition-colors duration-200">Features</a>
            <Link to="/insider" className="text-[13.5px] font-medium text-cyan-400 hover:text-cyan-300 transition-colors duration-200 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              Insider
            </Link>
            <Link to="/commands" className="text-[13.5px] font-medium text-white/60 hover:text-white transition-colors duration-200">Commands</Link>
            <Link to="/updates" className="text-[13.5px] font-medium text-white/60 hover:text-white transition-colors duration-200">Updates</Link>
            <Link to="/status" className="text-[13.5px] font-medium text-white/60 hover:text-white transition-colors duration-200 flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${isBotOnline ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]' : 'bg-rose-500'}`}></span>
              <span>Status</span>
            </Link>
          </Flex>

          <Flex gap={2.5} className="hidden md:flex items-center">
            <Button 
              variant="secondary" 
              size="sm" 
              className="text-xs h-9 px-4 font-semibold"
              onClick={() => window.location.href = DASHBOARD_URL}
            >
              <LayoutDashboard className="w-3.5 h-3.5 mr-1.5" />
              Dashboard
            </Button>
            <Button 
              variant="primary" 
              size="sm" 
              className="text-xs h-9 px-4.5 font-semibold" 
              onClick={() => window.open(DISCORD_INVITE_URL)}
            >
              Add to Discord
            </Button>
          </Flex>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-9 h-9 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white/80 hover:text-white transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </Flex>
      </Container>

      {/* Mobile Drawer */}
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ 
          y: isOpen ? 8 : -10,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className={`md:hidden absolute top-full left-0 right-0 z-[90] bg-[#121216]/95 backdrop-blur-3xl border border-white/10 rounded-3xl p-5 shadow-2xl ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
      >
        <Flex direction="col" gap={4} align="stretch">
          <a href="/#features" onClick={() => setIsOpen(false)} className="text-base font-semibold text-white/70 hover:text-white py-1">Features</a>
          <Link to="/insider" onClick={() => setIsOpen(false)} className="text-base font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-2 py-1">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            Insider Program
          </Link>
          <Link to="/commands" onClick={() => setIsOpen(false)} className="text-base font-semibold text-white/70 hover:text-white py-1">Commands</Link>
          <Link to="/updates" onClick={() => setIsOpen(false)} className="text-base font-semibold text-white/70 hover:text-white py-1">Updates</Link>
          <Link to="/status" onClick={() => setIsOpen(false)} className="text-base font-semibold text-white/70 hover:text-white flex items-center gap-2 py-1">
            <span className={`w-2 h-2 rounded-full ${isBotOnline ? 'bg-emerald-400' : 'bg-rose-500'}`}></span>
            Status
          </Link>
          <div className="w-full h-px bg-white/10 my-1" />
          <Button variant="secondary" className="w-full h-11 text-sm justify-center" onClick={() => { setIsOpen(false); window.location.href = DASHBOARD_URL; }}>
            <LayoutDashboard className="w-4 h-4 mr-2" />
            Open Dashboard
          </Button>
          <Button variant="primary" className="w-full h-11 text-sm justify-center" onClick={() => { setIsOpen(false); window.open(DISCORD_INVITE_URL); }}>
            Add to Discord
          </Button>
        </Flex>
      </motion.div>
    </motion.nav>
  );
};

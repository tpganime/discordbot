import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Menu, X, Disc, Github, Twitter } from 'lucide-react';
import { Button } from './ui/Button';
import { Container } from './ui/Container';
import { Flex } from './ui/Flex';
import { APP_NAME, DISCORD_INVITE_URL } from '../constants';

export const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
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
      className="fixed top-0 left-0 right-0 z-[100] border-b transition-all duration-300"
    >
      <Container size="xl">
        <Flex justify="between" className="h-24">
          <Flex gap={4}>
            <div className="w-12 h-12 rounded-2xl bg-orange-600 flex items-center justify-center shadow-lg shadow-orange-600/20">
              <Disc className="w-6 h-6 text-white animate-spin-slow" />
            </div>
            <span className="font-display text-2xl font-black tracking-tighter">{APP_NAME}</span>
          </Flex>

          <Flex gap={8} className="hidden lg:flex">
            {['Features', 'Commands', 'Premium', 'Support'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-bold text-white/40 hover:text-white transition-colors"
              >
                {item}
              </a>
            ))}
          </Flex>

          <Flex gap={4} className="hidden lg:flex">
            <Button variant="ghost" size="sm" className="hidden xl:flex">
              <Github className="w-4 h-4 mr-2" />
              GitHub
            </Button>
            <Button variant="primary" size="sm" onClick={() => window.open(DISCORD_INVITE_URL)}>
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
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        className="lg:hidden overflow-hidden bg-black/90 backdrop-blur-2xl border-b border-white/5"
      >
        <Container className="py-10">
          <Flex direction="col" gap={6} align="start">
            {['Features', 'Commands', 'Premium', 'Support'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setIsOpen(false)}
                className="text-2xl font-display font-bold text-white/40 hover:text-white transition-colors"
              >
                {item}
              </a>
            ))}
            <div className="w-full h-px bg-white/5 my-4" />
            <Button variant="primary" className="w-full" onClick={() => window.open(DISCORD_INVITE_URL)}>
              Add to Discord
            </Button>
          </Flex>
        </Container>
      </motion.div>
    </motion.nav>
  );
};

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Disc, Github, Twitter, Youtube, MessageSquare, Globe, Mail, MapPin, Phone, ExternalLink } from 'lucide-react';
import { Button } from './ui/Button';
import { Container } from './ui/Container';
import { Flex } from './ui/Flex';
import { Section } from './ui/Section';
import { Typography } from './ui/Typography';
import { APP_NAME, SUPPORT_SERVER_URL, COMMUNITY_URL, YOUTUBE_URL, SUPPORT_EMAIL, DASHBOARD_URL, GITHUB_URL } from '../constants';

export const Footer = () => {
  const [showComingSoon, setShowComingSoon] = useState(false);

  return (
    <footer className="relative bg-black border-t border-white/5 pt-32 pb-16 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/5 blur-[120px] rounded-full" />
      </div>

      <Container size="xl" className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="space-y-8">
            <Flex gap={4}>
              <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20">
                <Disc className="w-6 h-6 text-white animate-spin-slow" />
              </div>
              <span className="font-display text-2xl font-black tracking-tighter">{APP_NAME}</span>
            </Flex>
            <Typography variant="p" className="max-w-xs">
              The most advanced Discord bot for moderation, utility, and AI integration.
            </Typography>
            <Flex gap={4}>
              <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300">
                <Github className="w-5 h-5" />
              </a>
              <button onClick={() => setShowComingSoon(true)} className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300 group relative">
                <Twitter className="w-5 h-5" />
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black border border-white/10 px-2 py-1 rounded text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">Coming Soon</span>
              </button>
              <a href={YOUTUBE_URL} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300">
                <Youtube className="w-5 h-5" />
              </a>
              <a href={COMMUNITY_URL} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300">
                <MessageSquare className="w-5 h-5" />
              </a>
            </Flex>
          </div>

          <div>
            <Typography variant="h4" weight="bold" className="mb-8">Product</Typography>
            <ul className="space-y-4">
              <li><a href="/#features" className="text-white/40 hover:text-white transition-colors">Features</a></li>
              <li><Link to="/commands" className="text-white/40 hover:text-white transition-colors">Commands</Link></li>
              <li><button onClick={() => window.location.href = DASHBOARD_URL} className="text-white/40 hover:text-white transition-colors">Dashboard</button></li>
              <li><button onClick={() => setShowComingSoon(true)} className="text-white/40 hover:text-white transition-colors">Status</button></li>
            </ul>
          </div>

          <div>
            <Typography variant="h4" weight="bold" className="mb-8">Resources</Typography>
            <ul className="space-y-4">
              {[
                { name: 'Support Server', url: SUPPORT_SERVER_URL },
                { name: 'Community', url: COMMUNITY_URL }
              ].map((item) => (
                <li key={item.name}>
                  <a href={item.url} target="_blank" rel="noreferrer" className="text-white/40 hover:text-white transition-colors flex items-center gap-2">
                    {item.name} <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <Typography variant="h4" weight="bold" className="mb-8">Contact</Typography>
            <ul className="space-y-6">
              <li className="flex items-center gap-4 group cursor-pointer">
                <div className="w-10 h-10 rounded-xl glass flex items-center justify-center group-hover:bg-blue-600/20 transition-colors">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-white/40 group-hover:text-white transition-colors">{SUPPORT_EMAIL}</span>
              </li>
              <li className="flex items-center gap-4 group cursor-pointer">
                <div className="w-10 h-10 rounded-xl glass flex items-center justify-center group-hover:bg-blue-600/20 transition-colors">
                  <Globe className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-white/40 group-hover:text-white transition-colors">fusionhub.in</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-16 border-t border-white/5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <Typography variant="small">
              © 2026 {APP_NAME}. All rights reserved.
            </Typography>
            <Flex gap={8} className="w-auto">
              <Link to="/privacy" className="text-xs font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors">Privacy</Link>
              <Link to="/terms" className="text-xs font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors">Terms</Link>
            </Flex>
          </div>
        </div>

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
              <Disc className="w-10 h-10 text-blue-600 animate-spin-slow" />
            </div>
            <Typography variant="h3" weight="black" className="mb-4">Coming Soon</Typography>
            <Typography variant="p" className="text-white/60 mb-8">
              This feature is currently under development. Stay tuned for updates!
            </Typography>
            <Button variant="primary" className="w-full" onClick={() => setShowComingSoon(false)}>
              Got it
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </footer>
  );
};

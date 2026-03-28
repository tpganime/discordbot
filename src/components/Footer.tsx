import React from 'react';
import { motion } from 'motion/react';
import { Disc, Github, Twitter, Youtube, MessageSquare, Globe, Mail, MapPin, Phone } from 'lucide-react';
import { Container } from './ui/Container';
import { Flex } from './ui/Flex';
import { Section } from './ui/Section';
import { Typography } from './ui/Typography';
import { APP_NAME } from '../constants';

export const Footer = () => {
  return (
    <footer className="relative bg-black border-t border-white/5 pt-32 pb-16 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-orange-600/5 blur-[120px] rounded-full" />
      </div>

      <Container size="xl" className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="space-y-8">
            <Flex gap={4}>
              <div className="w-12 h-12 rounded-2xl bg-orange-600 flex items-center justify-center shadow-lg shadow-orange-600/20">
                <Disc className="w-6 h-6 text-white animate-spin-slow" />
              </div>
              <span className="font-display text-2xl font-black tracking-tighter">{APP_NAME}</span>
            </Flex>
            <Typography variant="p" className="max-w-xs">
              The most advanced Discord bot for music, moderation, and AI integration. Trusted by millions.
            </Typography>
            <Flex gap={4}>
              {[Github, Twitter, Youtube, MessageSquare].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:bg-orange-600 hover:text-white transition-all duration-300"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </Flex>
          </div>

          <div>
            <Typography variant="h4" weight="bold" className="mb-8">Product</Typography>
            <ul className="space-y-4">
              {['Features', 'Commands', 'Premium', 'Dashboard', 'Status'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-white/40 hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <Typography variant="h4" weight="bold" className="mb-8">Resources</Typography>
            <ul className="space-y-4">
              {['Documentation', 'Support Server', 'API Reference', 'Community', 'Blog'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-white/40 hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <Typography variant="h4" weight="bold" className="mb-8">Contact</Typography>
            <ul className="space-y-6">
              <li className="flex items-center gap-4 group cursor-pointer">
                <div className="w-10 h-10 rounded-xl glass flex items-center justify-center group-hover:bg-orange-600/20 transition-colors">
                  <Mail className="w-5 h-5 text-orange-600" />
                </div>
                <span className="text-white/40 group-hover:text-white transition-colors">support@fusionbot.com</span>
              </li>
              <li className="flex items-center gap-4 group cursor-pointer">
                <div className="w-10 h-10 rounded-xl glass flex items-center justify-center group-hover:bg-orange-600/20 transition-colors">
                  <Globe className="w-5 h-5 text-orange-600" />
                </div>
                <span className="text-white/40 group-hover:text-white transition-colors">fusionbot.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
          <Typography variant="small">
            © 2026 {APP_NAME}. All rights reserved.
          </Typography>
          <Flex gap={8} className="w-auto">
            <a href="#" className="text-xs font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors">Terms of Service</a>
          </Flex>
        </div>
      </Container>
    </footer>
  );
};

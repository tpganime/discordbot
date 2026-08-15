import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Bot, 
  Github, 
  Twitter, 
  Youtube, 
  MessageSquare, 
  Globe, 
  Mail, 
  ExternalLink, 
  ShieldCheck, 
  FileText, 
  Lock, 
  HelpCircle, 
  Activity,
  Star
} from 'lucide-react';
import { Container } from './ui/Container';
import { Flex } from './ui/Flex';
import { Typography } from './ui/Typography';
import { 
  APP_NAME, 
  SUPPORT_SERVER_URL, 
  COMMUNITY_URL, 
  YOUTUBE_URL, 
  SUPPORT_EMAIL, 
  DASHBOARD_URL, 
  GITHUB_URL,
  TOPGG_URL,
  TOPGG_VOTE_URL
} from '../constants';

export const Footer = () => {
  return (
    <footer className="relative bg-black border-t border-white/5 pt-20 pb-16 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/5 blur-[120px] rounded-full" />
      </div>

      <Container size="xl" className="relative z-10">
        {/* Top.gg Vote & Review Callout Banner */}
        <div className="mb-16 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#ff3366]/15 via-purple-600/10 to-blue-600/15 border border-[#ff3366]/30 backdrop-blur-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden group">
          <div className="flex items-center gap-4 text-center md:text-left flex-col md:flex-row">
            <div className="w-14 h-14 rounded-2xl bg-[#ff3366]/20 border border-[#ff3366]/40 flex items-center justify-center text-[#ff3366] text-2xl shadow-lg shrink-0 group-hover:scale-110 transition-transform">
              ⭐
            </div>
            <div>
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#ff3366] bg-[#ff3366]/20 px-2.5 py-0.5 rounded-full border border-[#ff3366]/30 font-mono">
                  TOP.GG OFFICIAL LISTING
                </span>
                <span className="text-xs text-white/50">• Vote every 12 hours</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-white mt-1.5">
                Vote and Review us on Top.gg
              </h3>
              <p className="text-xs sm:text-sm text-white/70 mt-1 max-w-xl leading-relaxed">
                Support Fusion Bot on Top.gg! Leave a review, vote to unlock special bot perks, and help more Discord server owners discover automated backups and anti-nuke tools.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0 flex-wrap justify-center">
            <a
              href={TOPGG_URL}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3.5 rounded-2xl bg-[#ff3366] hover:bg-[#ff1f58] text-white font-bold text-sm transition-all duration-300 flex items-center gap-2 shadow-lg shadow-[#ff3366]/30 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>⭐ Vote &amp; Review on Top.gg</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="space-y-6">
            <Flex gap={4}>
              <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <span className="font-display text-2xl font-black tracking-tight">{APP_NAME}</span>
            </Flex>
            <Typography variant="p" className="max-w-xs text-sm text-white/60 leading-relaxed">
              The premier all-rounder Discord bot for automated Google Drive backups, anti-nuke security, ticketing, and AI integration.
            </Typography>
            <Flex gap={4}>
              <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-xl glass flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">
                <Github className="w-4 h-4" />
              </a>
              <a href={YOUTUBE_URL} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-xl glass flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">
                <Youtube className="w-4 h-4" />
              </a>
              <a href={COMMUNITY_URL} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-xl glass flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">
                <MessageSquare className="w-4 h-4" />
              </a>
              <a href={TOPGG_URL} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-xl glass flex items-center justify-center hover:bg-[#ff3366] hover:text-white transition-all" title="Vote on Top.gg">
                <Star className="w-4 h-4 text-yellow-400" />
              </a>
            </Flex>
          </div>

          <div>
            <Typography variant="h4" weight="bold" className="mb-6 text-sm uppercase tracking-wider text-white">Product</Typography>
            <ul className="space-y-3 text-sm">
              <li><a href="/#features" className="text-white/50 hover:text-white transition-colors">Features</a></li>
              <li><Link to="/commands" className="text-white/50 hover:text-white transition-colors">Commands</Link></li>
              <li><Link to="/status" className="text-white/50 hover:text-white transition-colors flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-400"></span> Bot Shard Status</Link></li>
              <li><a href={TOPGG_URL} target="_blank" rel="noreferrer" className="text-[#ff3366] hover:text-[#ff668f] transition-colors flex items-center gap-1.5 font-semibold"><span>⭐</span> Vote on Top.gg <ExternalLink className="w-3 h-3" /></a></li>
              <li><Link to="/updates" className="text-white/50 hover:text-white transition-colors">Updates &amp; Changelog</Link></li>
              <li><a href={DASHBOARD_URL} className="text-white/50 hover:text-white transition-colors flex items-center gap-1.5">Web Dashboard <ExternalLink className="w-3 h-3" /></a></li>
            </ul>
          </div>

          <div>
            <Typography variant="h4" weight="bold" className="mb-6 text-sm uppercase tracking-wider text-white">Legal &amp; Support</Typography>
            <ul className="space-y-3 text-sm">
              <li><Link to="/status" className="text-white/50 hover:text-white transition-colors flex items-center gap-1.5"><Activity className="w-3.5 h-3.5 text-emerald-400" /> Real-Time Status</Link></li>
              <li><Link to="/terms" className="text-white/50 hover:text-white transition-colors flex items-center gap-1.5"><FileText className="w-3.5 h-3.5 text-blue-400" /> Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-white/50 hover:text-white transition-colors flex items-center gap-1.5"><Lock className="w-3.5 h-3.5 text-blue-400" /> Privacy Policy</Link></li>
              <li><a href={SUPPORT_SERVER_URL} target="_blank" rel="noreferrer" className="text-white/50 hover:text-white transition-colors flex items-center gap-1.5"><HelpCircle className="w-3.5 h-3.5 text-blue-400" /> Discord Support <ExternalLink className="w-3 h-3" /></a></li>
              <li><a href={TOPGG_URL} target="_blank" rel="noreferrer" className="text-white/50 hover:text-white transition-colors flex items-center gap-1.5"><Star className="w-3.5 h-3.5 text-yellow-400" /> Review on Top.gg <ExternalLink className="w-3 h-3" /></a></li>
            </ul>
          </div>

          <div>
            <Typography variant="h4" weight="bold" className="mb-6 text-sm uppercase tracking-wider text-white">Official Contact</Typography>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3 group">
                <div className="w-9 h-9 rounded-xl glass flex items-center justify-center text-blue-400">
                  <Mail className="w-4 h-4" />
                </div>
                <a href={`mailto:${SUPPORT_EMAIL}`} className="text-white/60 hover:text-white transition-colors">{SUPPORT_EMAIL}</a>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="w-9 h-9 rounded-xl glass flex items-center justify-center text-blue-400">
                  <Globe className="w-4 h-4" />
                </div>
                <span className="text-white/60">bot.fusionhub.in</span>
              </li>
              <li className="pt-2 text-xs text-white/40">
                Legal Representative: <strong className="text-white/80">CHAUDHARY TANMAY</strong>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-xs text-white/50 text-center md:text-left">
            <p className="font-semibold text-white/80">© 2026 FUSIONBOT(FUSIONHUB). All rights reserved.</p>
            <p className="mt-1 text-[11px] text-white/40">Owned &amp; Operated by <strong className="text-white/70">CHAUDHARY TANMAY</strong> (FUSIONHUB TEAM).</p>
          </div>
          <Flex gap={6} className="w-auto text-xs font-bold uppercase tracking-wider text-white/40">
            <a href={TOPGG_URL} target="_blank" rel="noreferrer" className="text-[#ff3366] hover:text-[#ff668f] transition-colors">Top.gg</a>
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link to="/updates" className="hover:text-white transition-colors">Changelog</Link>
          </Flex>
        </div>
      </Container>
    </footer>
  );
};

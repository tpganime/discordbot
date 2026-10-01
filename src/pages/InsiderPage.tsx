import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Shield, 
  Zap, 
  Users, 
  CheckCircle2, 
  ExternalLink, 
  MessageSquare,
  Server,
  Star,
  ArrowRight
} from 'lucide-react';
import { Container } from '../components/ui/Container';
import { Typography } from '../components/ui/Typography';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { SUPPORT_SERVER_URL, DISCORD_INVITE_URL } from '../constants';

export const InsiderPage = () => {
  const [memberCount, setMemberCount] = useState<number>(73);
  const [onlineCount, setOnlineCount] = useState<number>(20);

  useEffect(() => {
    // Attempt live fetch from Discord invite API
    const fetchCounts = async () => {
      try {
        const res = await fetch('https://discord.com/api/v9/invites/BYGpaPbVS?with_counts=true', {
          signal: AbortSignal.timeout(4000)
        });
        if (res.ok) {
          const data = await res.json();
          if (data.approximate_member_count) setMemberCount(data.approximate_member_count);
          if (data.approximate_presence_count) setOnlineCount(data.approximate_presence_count);
        }
      } catch (_) {}
    };
    fetchCounts();
  }, []);

  return (
    <div className="min-h-screen pt-28 pb-24 relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-gradient-to-r from-blue-600/15 via-cyan-500/15 to-indigo-600/15 blur-[150px] pointer-events-none" />

      <Container className="relative z-10">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-4"
          >
            <Badge variant="outline" className="px-4 py-1.5 rounded-full border-cyan-500/30 bg-cyan-500/10 text-cyan-300 font-semibold tracking-wide text-xs uppercase flex items-center gap-1.5 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              INSIDER PROGRAM
            </Badge>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Typography variant="h1" className="text-4xl sm:text-6xl font-black tracking-tight text-white mb-4">
              Featured Partner <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">Communities</span>
            </Typography>
            <Typography variant="body" className="text-base sm:text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
              Discover official partner servers and verified flagship communities actively protected and powered 24/7 by Fusion Bot.
            </Typography>
          </motion.div>
        </div>

        {/* Featured Community Card Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center max-w-5xl mx-auto mb-20">
          {/* Left Column: Community Details & Badges */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-6 space-y-6 text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono font-semibold">
              <Shield className="w-3.5 h-3.5" />
              OFFICIAL VERIFIED PARTNER
            </div>

            <Typography variant="h2" className="text-2xl sm:text-4xl font-black text-white leading-tight">
              DARK_BROTHER'S Family Community
            </Typography>

            <Typography variant="body" className="text-white/60 leading-relaxed text-sm sm:text-base">
              A premier international server community fostering mutual respect, loyalty, and collective growth. Fully secured by Fusion Bot's Nuke Guard snapshot engine and automated dual cloud recovery.
            </Typography>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0 text-cyan-400">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Nuke Guard Active</div>
                  <div className="text-[11px] text-white/50">Google Drive Snapshots</div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0 text-blue-400">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">SUNDAY 5.1 AI</div>
                  <div className="text-[11px] text-white/50">Conversational Engine</div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 text-emerald-400">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Active Community</div>
                  <div className="text-[11px] text-white/50">Growing Network</div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center flex-shrink-0 text-purple-400">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Verified Tier</div>
                  <div className="text-[11px] text-white/50">Partner Program</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Server Invite Card (Matches Screenshot 3) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-6 flex justify-center"
          >
            <div className="w-full max-w-[360px] bg-[#1e1f22] rounded-[18px] overflow-hidden border border-[#2b2d31] shadow-2xl shadow-black/80 transition-all duration-300 hover:border-[#3b3e45] hover:shadow-cyan-500/10">
              {/* Header Banner */}
              <div className="h-[110px] w-full relative bg-gradient-to-b from-[#0088ff] to-[#00c8ff] overflow-hidden">
                <img 
                  src="https://cdn.discordapp.com/banners/1457383827625476160/0b17ef5ce267feb41a5b7109a00dbf85.png?size=512" 
                  alt="DARK_BROTHER'S Banner" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>

              {/* Avatar Overlap Area */}
              <div className="-mt-10 ml-4 mb-2 flex items-end">
                <div className="w-[84px] h-[84px] rounded-[24px] bg-[#1e1f22] p-1 shadow-lg relative flex-shrink-0">
                  <img
                    src="https://cdn.discordapp.com/icons/1457383827625476160/daa345e459a98df29d15da38d682b83d.png?size=256"
                    alt="DARK_BROTHER'S Icon"
                    className="w-full h-full rounded-[20px] object-cover bg-black"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://cdn.discordapp.com/embed/avatars/0.png';
                    }}
                  />
                </div>
              </div>

              {/* Server Information */}
              <div className="px-4 pb-4 space-y-2">
                {/* Title & Verified Badge */}
                <div className="flex items-center gap-1.5 pt-1">
                  <span className="font-bold text-white text-[19px] tracking-tight">DARK_BROTHER'S</span>
                  {/* Discord Partner / Verified Guild Badge */}
                  <svg 
                    className="w-5 h-5 text-white flex-shrink-0 fill-current" 
                    viewBox="0 0 16 16"
                    title="Verified Community"
                  >
                    <path d="M14.92 6.64a2.25 2.25 0 0 0-.82-2 2.25 2.25 0 0 0-2-1.29 2.25 2.25 0 0 0-2-.82 2.25 2.25 0 0 0-2 .82 2.25 2.25 0 0 0-2 1.29 2.25 2.25 0 0 0-.82 2 2.25 2.25 0 0 0 .82 2 2.25 2.25 0 0 0 2 1.29 2.25 2.25 0 0 0 2 .82 2.25 2.25 0 0 0 2-.82 2.25 2.25 0 0 0 2-1.29 2.25 2.25 0 0 0 .82-2zM8 4.25l3.5 2.8v4.2H9.25V8.75h-2.5v2.5H4.5v-4.2L8 4.25z"/>
                  </svg>
                </div>

                {/* Live Online & Member Counts */}
                <div className="flex items-center gap-4 text-xs font-semibold text-[#949ba4]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#23a55a]"></span>
                    <span>{onlineCount} Online</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#80848e]"></span>
                    <span>{memberCount} Members</span>
                  </div>
                </div>

                {/* Established Subtitle */}
                <div className="text-xs text-[#949ba4] font-medium">
                  Est. Jan 2026
                </div>

                {/* Description */}
                <p className="text-xs text-[#dbdee1] leading-relaxed pt-1 pb-2">
                  💎 Official Dark Brother's family server community [EN | 02/06] 👑 🖤 stay loyal be respectful towards everyone grow together
                </p>

                {/* Green Join Now Action Button */}
                <a
                  href="https://discord.gg/BYGpaPbVS"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-2.5 px-4 rounded-[8px] bg-[#23a55a] hover:bg-[#1f8b4c] active:bg-[#1a7941] text-white font-semibold text-center text-sm transition-all duration-150 shadow-sm"
                >
                  Join Now
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Partner Program Perks Grid */}
        <div className="mt-20 border-t border-white/5 pt-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Typography variant="h2" className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Why Join the Fusion Insider Program?
            </Typography>
            <Typography variant="body" className="text-sm sm:text-base text-white/50">
              Verified partner servers unlock dedicated resources, enterprise security, and direct integration support.
            </Typography>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Disaster Recovery Guarantee</h3>
              <p className="text-sm text-white/50 leading-relaxed">
                Automated hourly snapshot backups to Google Drive and Fusion Cloud ensuring your server can be restored in 1 click after any disaster.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-blue-500/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">High-Performance Sharding</h3>
              <p className="text-sm text-white/50 leading-relaxed">
                Dedicated bot clusters ensuring sub-25ms response latency for instant command execution, automod moderation, and ticketing.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-purple-500/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4">
                <Star className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Featured Showcase & Growth</h3>
              <p className="text-sm text-white/50 leading-relaxed">
                Direct placement in the official Fusion Bot directory, main website partner showcase, and Discord verification badges.
              </p>
            </div>
          </div>
        </div>

        {/* Application CTA */}
        <div className="mt-16 max-w-3xl mx-auto p-8 rounded-3xl bg-gradient-to-r from-blue-900/20 via-cyan-900/20 to-indigo-900/20 border border-white/10 text-center space-y-4">
          <h3 className="text-2xl font-black text-white">Want to feature your server in the Insider Program?</h3>
          <p className="text-sm text-white/60 max-w-xl mx-auto leading-relaxed">
            Active communities with healthy engagement can apply for official partner status and enterprise protection.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Button variant="primary" size="md" onClick={() => window.open(SUPPORT_SERVER_URL)}>
              Apply on Support Server
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button variant="outline" size="md" onClick={() => window.open(DISCORD_INVITE_URL)}>
              Add Bot to Your Server
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

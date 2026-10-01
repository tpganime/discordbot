import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Sparkles, ExternalLink, Users, Zap, CheckCircle2 } from 'lucide-react';
import { Container } from './ui/Container';
import { Section } from './ui/Section';
import { Typography } from './ui/Typography';
import { Badge } from './ui/Badge';

export const InsiderProgram = () => {
  const [memberCount, setMemberCount] = useState<number>(73);
  const [onlineCount, setOnlineCount] = useState<number>(20);

  useEffect(() => {
    // Attempt live fetch from Discord invite API with resilient fallback
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
      } catch (_) {
        // Fallback already default
      }
    };
    fetchCounts();
  }, []);

  return (
    <Section id="insider-program" className="relative py-24 sm:py-32 overflow-hidden border-t border-white/5">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-r from-blue-600/10 via-cyan-500/10 to-indigo-600/10 blur-[140px] pointer-events-none" />

      <Container className="relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
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
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Typography variant="h2" className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
              Featured Partner <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">Communities</span>
            </Typography>
            <Typography variant="body" className="text-base sm:text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
              Explore flagship Discord servers and verified family communities protected and powered 24/7 by Fusion Bot enterprise intelligence.
            </Typography>
          </motion.div>
        </div>

        {/* Card Showcase Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
          {/* Left Column: Insider Highlights */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6 text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono font-semibold">
              <Shield className="w-3.5 h-3.5" />
              OFFICIAL VERIFIED PARTNER
            </div>

            <Typography variant="h3" className="text-2xl sm:text-3xl font-black text-white leading-tight">
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
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
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
                    // Fallback to vibrant blue gradient if banner fails
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
      </Container>
    </Section>
  );
};

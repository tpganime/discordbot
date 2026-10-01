import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Shield, 
  Zap, 
  Users, 
  CheckCircle2, 
  ExternalLink, 
  Star,
  ArrowRight,
  Flame
} from 'lucide-react';
import { Container } from '../components/ui/Container';
import { Typography } from '../components/ui/Typography';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { SUPPORT_SERVER_URL, DISCORD_INVITE_URL } from '../constants';

interface PartnerServer {
  id: string;
  inviteCode: string;
  inviteUrl: string;
  name: string;
  displayName: string;
  description: string;
  icon: string;
  banner?: string;
  est: string;
  defaultMembers: number;
  defaultOnline: number;
  accentColor: string;
  bannerGradient: string;
  featuredTop?: boolean;
}

const PARTNER_SERVERS: PartnerServer[] = [
  {
    id: '1499581222916198480',
    inviteCode: 'ZqwwxuVrYG',
    inviteUrl: 'https://discord.gg/ZqwwxuVrYG',
    name: '𝕋ℍ𝔼 𝔽𝕆ℝ𝔼𝕊𝕋 𝔻𝔼ℙ𝔸ℝ𝕋𝕄𝔼ℕ𝕋',
    displayName: 'The Forest Department',
    description: '🌲 Official Forest Department flagship community. An international family fostering camaraderie, mutual growth, and collective empowerment. Secured 24/7 by Fusion Bot Nuke Guard.',
    icon: 'https://cdn.discordapp.com/icons/1499581222916198480/a1910251fb5aa7eac3e9ece6167c8664.png?size=256',
    est: 'Est. Feb 2026',
    defaultMembers: 53,
    defaultOnline: 10,
    accentColor: '#10b981',
    bannerGradient: 'from-[#059669] via-[#10b981] to-[#14b8a6]',
    featuredTop: true
  },
  {
    id: '1457383827625476160',
    inviteCode: 'BYGpaPbVS',
    inviteUrl: 'https://discord.gg/BYGpaPbVS',
    name: "DARK_BROTHER'S",
    displayName: "Dark Brother's Family",
    description: "💎 Official Dark Brother's family server community [EN | 02/06] 👑 🖤 stay loyal be respectful towards everyone grow together. Powered & guarded by Fusion Bot.",
    icon: 'https://cdn.discordapp.com/icons/1457383827625476160/daa345e459a98df29d15da38d682b83d.png?size=256',
    banner: 'https://cdn.discordapp.com/banners/1457383827625476160/0b17ef5ce267feb41a5b7109a00dbf85.png?size=512',
    est: 'Est. Jan 2026',
    defaultMembers: 73,
    defaultOnline: 20,
    accentColor: '#3b82f6',
    bannerGradient: 'from-[#0088ff] to-[#00c8ff]'
  },
  {
    id: '1543138843765637250',
    inviteCode: 'TXtg8Cmsq5',
    inviteUrl: 'https://qlynk.me/dc',
    name: "𝑫𝒆𝒆𝒑'𝒔 𝑨𝒓𝒎𝒚",
    displayName: "Deep's Army (QLYNK)",
    description: "⚔️ Official Deep's Army gaming, streaming & creator powerhouse. Connected with high-performance sharding and enterprise antinuke security.",
    icon: 'https://cdn.discordapp.com/icons/1543138843765637250/a_3080b51dcc44a7420d47a3e5846aa608.png?size=256',
    banner: 'https://cdn.discordapp.com/splashes/1543138843765637250/3e347f2367c34d826b63078b89f52170.png?size=512',
    est: 'Est. Feb 2026',
    defaultMembers: 64,
    defaultOnline: 35,
    accentColor: '#8b5cf6',
    bannerGradient: 'from-[#7c3aed] to-[#a855f7]'
  },
  {
    id: '1554751397009039480',
    inviteCode: '8a77xMv2qG',
    inviteUrl: 'https://discord.gg/8a77xMv2qG',
    name: 'CRIMSON ROSEWOOD',
    displayName: 'Crimson Rosewood',
    description: '🌹 Crimson Rosewood official server sanctuary and lounge. An exclusive environment for relaxation, creative exchange, and active community events.',
    icon: 'https://cdn.discordapp.com/icons/1554751397009039480/2be6ee9ebb5919ab07c16069463b5ebc.png?size=256',
    est: 'Est. Mar 2026',
    defaultMembers: 8,
    defaultOnline: 6,
    accentColor: '#f43f5e',
    bannerGradient: 'from-[#e11d48] to-[#f43f5e]'
  }
];

export const InsiderPage = () => {
  const [counts, setCounts] = useState<Record<string, { members: number; online: number }>>({});

  useEffect(() => {
    // Attempt live fetch from Discord invite APIs for each partner
    PARTNER_SERVERS.forEach(server => {
      fetch(`https://discord.com/api/v9/invites/${server.inviteCode}?with_counts=true`, {
        signal: AbortSignal.timeout(4000)
      })
        .then(res => (res.ok ? res.json() : null))
        .then(data => {
          if (data) {
            setCounts(prev => ({
              ...prev,
              [server.id]: {
                members: data.approximate_member_count || server.defaultMembers,
                online: data.approximate_presence_count || server.defaultOnline
              }
            }));
          }
        })
        .catch(() => {});
    });
  }, []);

  const topPartner = PARTNER_SERVERS[0];
  const topCounts = counts[topPartner.id] || {
    members: topPartner.defaultMembers,
    online: topPartner.defaultOnline
  };

  return (
    <div className="min-h-screen pt-28 pb-24 relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-gradient-to-r from-emerald-600/15 via-cyan-500/15 to-indigo-600/15 blur-[150px] pointer-events-none" />

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
              Featured Partner <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400">Communities</span>
            </Typography>
            <Typography variant="body" className="text-base sm:text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
              Discover official partner servers and verified flagship communities actively protected and powered 24/7 by Fusion Bot.
            </Typography>
          </motion.div>
        </div>

        {/* Featured Showcase #1 On Top: THE FOREST DEPARTMENT (FD) */}
        <div className="relative p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-emerald-500/30 shadow-[0_0_50px_rgba(16,185,129,0.1)] mb-20">
          <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5" />
            Top Featured Flagship
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Community Details & Badges */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6 space-y-6 text-left"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-semibold">
                <Shield className="w-3.5 h-3.5" />
                OFFICIAL VERIFIED PARTNER
              </div>

              <Typography variant="h2" className="text-2xl sm:text-4xl font-black text-white leading-tight">
                {topPartner.name}
              </Typography>

              <Typography variant="body" className="text-white/60 leading-relaxed text-sm sm:text-base">
                {topPartner.description}
              </Typography>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 text-emerald-400">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Nuke Guard Active</div>
                    <div className="text-[11px] text-white/50">Google Drive Snapshots</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0 text-cyan-400">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">SUNDAY 5.1 AI</div>
                    <div className="text-[11px] text-white/50">Conversational Engine</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0 text-blue-400">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Active Community</div>
                    <div className="text-[11px] text-white/50">International Members</div>
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

            {/* Right Column: Server Invite Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6 flex justify-center"
            >
              <div className="w-full max-w-[360px] bg-[#1e1f22] rounded-[18px] overflow-hidden border border-[#2b2d31] shadow-2xl shadow-black/80 transition-all duration-300 hover:border-emerald-500/40 hover:shadow-emerald-500/10">
                {/* Header Banner */}
                <div className={`h-[110px] w-full relative bg-gradient-to-r ${topPartner.bannerGradient} overflow-hidden`} />

                {/* Avatar Overlap Area */}
                <div className="-mt-10 ml-4 mb-2 flex items-end">
                  <div className="w-[84px] h-[84px] rounded-[24px] bg-[#1e1f22] p-1 shadow-lg relative flex-shrink-0">
                    <img
                      src={topPartner.icon}
                      alt={topPartner.name}
                      className="w-full h-full rounded-[20px] object-cover bg-black"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://cdn.discordapp.com/embed/avatars/0.png';
                      }}
                    />
                  </div>
                </div>

                {/* Server Information */}
                <div className="px-4 pb-4 space-y-2">
                  <div className="flex items-center gap-1.5 pt-1">
                    <span className="font-bold text-white text-[19px] tracking-tight">{topPartner.name}</span>
                    <svg className="w-5 h-5 text-emerald-400 flex-shrink-0 fill-current" viewBox="0 0 16 16" title="Verified Community">
                      <path d="M14.92 6.64a2.25 2.25 0 0 0-.82-2 2.25 2.25 0 0 0-2-1.29 2.25 2.25 0 0 0-2-.82 2.25 2.25 0 0 0-2 .82 2.25 2.25 0 0 0-2 1.29 2.25 2.25 0 0 0-.82 2 2.25 2.25 0 0 0 .82 2 2.25 2.25 0 0 0 2 1.29 2.25 2.25 0 0 0 2 .82 2.25 2.25 0 0 0 2-.82 2.25 2.25 0 0 0 2-1.29 2.25 2.25 0 0 0 .82-2zM8 4.25l3.5 2.8v4.2H9.25V8.75h-2.5v2.5H4.5v-4.2L8 4.25z"/>
                    </svg>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-semibold text-[#949ba4]">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#23a55a]"></span>
                      <span>{topCounts.online} Online</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#80848e]"></span>
                      <span>{topCounts.members} Members</span>
                    </div>
                  </div>

                  <div className="text-xs text-[#949ba4] font-medium">
                    {topPartner.est}
                  </div>

                  <p className="text-xs text-[#dbdee1] leading-relaxed pt-1 pb-2">
                    {topPartner.description}
                  </p>

                  <a
                    href={topPartner.inviteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-2.5 px-4 rounded-[8px] bg-[#23a55a] hover:bg-[#1f8b4c] active:bg-[#1a7941] text-white font-semibold text-center text-sm transition-all duration-150 shadow-sm flex items-center justify-center gap-2"
                  >
                    <span>Join Server</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* All Verified Partner Communities Section */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <Typography variant="h2" className="text-2xl sm:text-3xl font-black text-white mb-2">
              Official Partner Network
            </Typography>
            <Typography variant="body" className="text-sm sm:text-base text-white/50">
              Explore all verified servers actively using Fusion Bot's enterprise suite.
            </Typography>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {PARTNER_SERVERS.slice(1).map((server, idx) => {
              const sCounts = counts[server.id] || {
                members: server.defaultMembers,
                online: server.defaultOnline
              };

              return (
                <motion.div
                  key={server.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * idx }}
                  className="bg-[#1e1f22] rounded-[18px] overflow-hidden border border-[#2b2d31] shadow-xl shadow-black/60 flex flex-col justify-between hover:border-[#3b3e45] transition-all"
                >
                  <div>
                    {/* Header Banner */}
                    <div className={`h-[95px] w-full relative bg-gradient-to-r ${server.bannerGradient} overflow-hidden`}>
                      {server.banner && (
                        <img
                          src={server.banner}
                          alt={server.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                      )}
                    </div>

                    {/* Avatar Overlap */}
                    <div className="-mt-8 ml-4 mb-2 flex items-end">
                      <div className="w-[68px] h-[68px] rounded-[20px] bg-[#1e1f22] p-1 shadow-lg relative flex-shrink-0">
                        <img
                          src={server.icon}
                          alt={server.name}
                          className="w-full h-full rounded-[16px] object-cover bg-black"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://cdn.discordapp.com/embed/avatars/0.png';
                          }}
                        />
                      </div>
                    </div>

                    {/* Information */}
                    <div className="px-4 pb-2 space-y-2">
                      <div className="flex items-center gap-1.5 pt-1">
                        <span className="font-bold text-white text-[17px] tracking-tight truncate">{server.name}</span>
                        <svg className="w-4 h-4 text-cyan-400 flex-shrink-0 fill-current" viewBox="0 0 16 16" title="Verified Community">
                          <path d="M14.92 6.64a2.25 2.25 0 0 0-.82-2 2.25 2.25 0 0 0-2-1.29 2.25 2.25 0 0 0-2-.82 2.25 2.25 0 0 0-2 1.29 2.25 2.25 0 0 0-.82 2 2.25 2.25 0 0 0 .82 2 2.25 2.25 0 0 0 2 1.29 2.25 2.25 0 0 0 2 .82 2.25 2.25 0 0 0 2-.82 2.25 2.25 0 0 0 2-1.29 2.25 2.25 0 0 0 .82-2zM8 4.25l3.5 2.8v4.2H9.25V8.75h-2.5v2.5H4.5v-4.2L8 4.25z"/>
                        </svg>
                      </div>

                      <div className="flex items-center gap-3 text-xs font-semibold text-[#949ba4]">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-[#23a55a]"></span>
                          <span>{sCounts.online} Online</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-[#80848e]"></span>
                          <span>{sCounts.members} Members</span>
                        </div>
                      </div>

                      <div className="text-[11px] text-[#949ba4] font-medium">
                        {server.est}
                      </div>

                      <p className="text-xs text-[#dbdee1] leading-relaxed line-clamp-3 pt-1">
                        {server.description}
                      </p>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="p-4 pt-2">
                    <a
                      href={server.inviteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full py-2 px-3 rounded-[8px] bg-[#23a55a] hover:bg-[#1f8b4c] active:bg-[#1a7941] text-white font-semibold text-center text-xs transition-all duration-150 shadow-sm flex items-center justify-center gap-1.5"
                    >
                      <span>Join Community</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Partner Program Perks Grid */}
        <div className="mt-16 border-t border-white/5 pt-16">
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

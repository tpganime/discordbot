import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Rocket, Zap, Shield, Sparkles, LayoutDashboard, Gift, Bot, Star, Cloud, Clock, Mic, ArrowLeft, Brain, Terminal, Server, Hash, Volume2, ShieldCheck, Check, ArrowRight } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { Typography } from '../components/ui/Typography';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Flex } from '../components/ui/Flex';

const updates = [
  {
    version: 'v4.0.0',
    date: 'October 29, 2026 at 07:15 AM UTC',
    title: 'Model Context Protocol (MCP) AI Connect, Visual Embed Studio & Automation Suite',
    description: 'A major milestone and AI automation release introducing direct AI assistant integration via Model Context Protocol (MCP) for Claude Desktop and Cursor, an interactive Live Embed Studio with integer color coercion, interval-based Auto Purge message cleanup, dynamic Voice-Role Links, customizable Levels & XP progression starting at ₹79, and a human-friendly custom error engine.',
    type: 'Major',
    icon: Brain,
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/10',
    changes: [
      'Model Context Protocol (MCP) AI Connect: Connect Claude Desktop, Cursor, Gemini, and custom AI agents directly to your server settings. Securely automate welcome setups, moderation rules, and bot branding with isolated per-server cryptographic tokens (fmc_live_...) and zero cross-server data leakage.',
      'Visual Embed Studio: Live WYSIWYG Discord preview with integer color coercion (resolving Discord form body type errors), rich markdown parsing, dynamic multi-column inline field grid, 6 preset templates (Rules, Announcements, Giveaway, FAQ), message ID edit mode, and instant JSON export/import.',
      'Auto Purge Engine: Scheduled automatic message cleanup across up to 15 configured channels with recurrence intervals from 1 hour to 14 days and specialized filters for bots, human messages, links, attachments, and pinned message protection.',
      'Voice-Role Links: Automatic temporary role assignment when members join specific voice or stage channels, with instant role removal upon disconnect.',
      'Levels & XP System Starting at ₹79: Configurable experience progression curves, multi-tier role rewards for milestone levels, customizable level-up announcements, and leaderboard web views included in both Starter (₹79/mo) and Pro (₹149/mo) plans.',
      'Platform Stability & Custom Error Engine: 100% human-friendly error messages replacing technical Discord API exceptions, zero-layout-shift SSR styling, and canonical XML sitemaps.'
    ]
  },
  {
    version: 'v3.8.0',
    date: 'October 3, 2026 at 12:00 AM UTC',
    title: 'Studio Voice Recording Engine & VIP Partner Communities',
    description: 'A major feature and infrastructure update introducing multi-track voice recording, private DM delivery for secure downloads, studio audio export engine, and official Insider Program partner integrations.',
    type: 'Major',
    icon: Mic,
    color: 'text-rose-500',
    bg: 'bg-rose-500/10',
    changes: [
      'Multi-Track Studio Voice Recording (/join & /stop): Record up to 2 hours of 48,000 Hz 16-bit uncompressed stereo audio with per-speaker audio isolation.',
      'Private DM Delivery: Download links and spoiler deletion keys are delivered strictly via private Discord DM, keeping server channels clean and private.',
      'Encrypted Cloud Audio Storage: Live audio streams are saved directly into AES-256-GCM encrypted cloud storage with automatic 48-hour secure lifecycle purge.',
      'Studio-Quality Audio Exports: Download individual user tracks or mixed master recordings in 320 kbps MP3, 320 kbps AAC, Q10 Vorbis (~500 kbps), Compression Level 8 FLAC, and uncompressed 16-bit WAV.',
      'Web Recording Download Portal: Dedicated web player (panel.fusionhub.in/rec/:id) with live countdown timers, per-speaker duration metrics, and secure DM key deletion.',
      'Official Insider Program Partnerships: Dedicated partner communities for DARK_BROTHER\'S (KAITO), Forest Department (FD), Crimson Rosewood (ROSEWOOD), and Deep\'s Army (QLYNK) with 2-Month Free Pro server trials.'
    ]
  },
  {
    version: 'v3.5.0',
    date: 'September 15, 2026 at 12:00 AM UTC',
    title: 'User Apps & DMs, Anime GIF Engine & Minigames Suite',
    description: 'A major feature and utility release introducing Discord User App integration for DM command execution, dynamic random anime GIFs for social interactions, a high-resolution Avatar & Banner suite, and real-time multiplayer minigames.',
    type: 'Major',
    icon: Sparkles,
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
    changes: [
      'Discord User App & Direct Message (DM) Slash support: Run commands directly in DMs without requiring a mutual server.',
      'Dynamic Anime GIF Engine: Random anime GIFs for 20+ social reaction actions (hug, kiss, pat, slap, blush, dance, cuddle, etc.).',
      'High-Resolution Avatar & Banner Suite: Multi-format download shortcuts (PNG, JPG, WEBP) up to 4096px with server-avatar and user-banner support.',
      'Interactive Minigames Suite: Real-time multiplayer Tic-Tac-Toe, 21 Blackjack with dealer AI, Rock-Paper-Scissors, and interactive Calculator.',
      'Smart Mention Filtering & Reply Protection: Prevents unintentional command executions when quoting or replying to bot messages.',
      'Zero-Duplicate Command Registry: Optimized command registration and fast-sync architecture with sub-50ms execution latency.'
    ]
  },
  {
    version: 'v3.2.0',
    date: 'August 15, 2026 at 04:30 AM UTC',
    title: 'Command Center & Liquid Glass Dashboard Overhaul',
    description: 'A major milestone release introducing an interactive Discord Command Center, a redesigned Liquid Glass web panel, and seamless Google Drive cloud protection.',
    type: 'Major',
    icon: Rocket,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
    changes: [
      'Interactive /help Command Center with categorized select menu and direct link buttons.',
      'Completely redesigned Web Dashboard with Liquid Glass dark aesthetic and fluid mobile layouts.',
      'Google Drive Disaster Recovery integration (/nukebackup & /nukerestore) for instant channel and role restoration.',
      'Enhanced Interactive Ticket System with category dropdowns and automatic transcript logging.',
      'Automated Auto-Mod protection with anti-spam rate limiting, attachment filtering, and banned words detection.',
      'Updated transparent Terms of Service and Privacy Policy across both dashboard and main website.'
    ]
  },
  {
    version: 'v3.0.0',
    date: 'July 28, 2026 at 06:15 PM UTC',
    title: 'Interactive Giveaways & AI Creative Engine',
    description: 'Empowering communities with fully interactive giveaway workflows and state-of-the-art AI creative media tools.',
    type: 'Feature',
    icon: Gift,
    color: 'text-pink-500',
    bg: 'bg-pink-500/10',
    changes: [
      'Interactive giveaway creation (/giveaway) and live manager (/gmanage) with Edit, End, and Reroll buttons.',
      'High-resolution /imagine generative art, custom server emojis, anime renders, and sticker generation.',
      'Multi-role reaction assignment system configured straight from the web dashboard.',
      'Dynamic welcome and leave banners with customizable background themes and member avatar rendering.'
    ]
  },
  {
    version: 'v2.8.0',
    date: 'June 18, 2026 at 11:45 AM UTC',
    title: 'Nuke Guard & Invite Tracking',
    description: 'Reinforcing community security with automated structural snapshots and granular invite analytics.',
    type: 'Security',
    icon: Shield,
    color: 'text-amber-500',
    bg: 'bg-amber-500/10',
    changes: [
      'Automated server structure snapshots preserving channel permissions, categories, and role hierarchies.',
      'Advanced Invite Tracker (/invites info) with join order sequencing and comprehensive inviter logs.',
      'Strict role hierarchy validation preventing unauthorized moderation actions against higher roles.'
    ]
  },
  {
    version: 'v2.5.0',
    date: 'May 12, 2026 at 02:20 PM UTC',
    title: 'Core Engine & Performance Optimization',
    description: 'Fundamental infrastructure upgrade to provide lightning-fast command response and 99.9% uptime.',
    type: 'Performance',
    icon: Zap,
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
    changes: [
      'Migrated to Discord.js v14 gateway architecture with sub-50ms execution latency.',
      'Zero-delay slash command synchronization and global guild caching.',
      'Enhanced high-load concurrency processing across all connected Discord servers.'
    ]
  }
];

export const UpdatesPage = () => {
  const navigate = useNavigate();
  const [isMobile] = React.useState(() => (typeof window !== 'undefined' ? window.innerWidth < 1024 : false));

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <main className="pt-32 pb-24">
      <Section spacing="xl">
        <Container size="xl">
          <button
            type="button"
            onClick={handleBack}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs font-semibold text-white/60 hover:text-white hover:bg-white/10 active:scale-[0.98] mb-12 transition-all group cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            Back
          </button>
          <div className="text-center mb-20">
            <motion.div
              initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="primary" className="mb-6 rounded-full px-4 py-1 text-xs tracking-wide font-semibold">
                <Sparkles className="w-3.5 h-3.5 mr-2" />
                Release History & Changelog
              </Badge>
              <Typography variant="h1" weight="bold" className="mb-6 tracking-[-0.035em]">
                System <span className="text-blue-500">Updates</span>
              </Typography>
              <Typography variant="lead" className="max-w-2xl mx-auto text-white/60 text-base sm:text-lg tracking-[-0.012em]">
                Explore the latest features, security enhancements, and performance upgrades released for Fusion Bot.
              </Typography>
            </motion.div>
          </div>

          <div className="max-w-4xl mx-auto space-y-12">
            {updates.map((update, i) => (
              <motion.div
                key={update.version}
                initial={isMobile ? { opacity: 1, x: 0 } : { opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={isMobile ? undefined : { opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: isMobile ? 0 : i * 0.08 }}
              >
                <Card className="p-8 md:p-10 border border-white/10 rounded-[32px] bg-white/[0.03] backdrop-blur-3xl relative overflow-hidden group shadow-2xl">
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
                    <update.icon className={`w-32 h-32 ${update.color}`} />
                  </div>
                  
                  <Flex gap={4} className="mb-8">
                    <div className={`w-14 h-14 rounded-[20px] ${update.bg} border border-white/10 flex items-center justify-center shrink-0 shadow-md`}>
                      <update.icon className={`w-7 h-7 ${update.color}`} />
                    </div>
                    <div>
                      <Flex gap={4} align="center" className="mb-1 flex-wrap">
                        <Typography variant="h3" weight="bold" className="tracking-tight">{update.title}</Typography>
                        <Badge variant="outline" className="rounded-full px-3 py-0.5 text-[11px] border-white/15 text-white/70">{update.type}</Badge>
                      </Flex>
                      <Typography variant="small" className="text-white/40 flex items-center gap-1.5 mt-1 tracking-tight">
                        <Clock className="w-3.5 h-3.5 text-blue-400" />
                        {update.version} • {update.date}
                      </Typography>
                    </div>
                  </Flex>

                  <Typography variant="p" className="text-white/70 mb-8 max-w-2xl leading-relaxed text-sm tracking-tight">
                    {update.description}
                  </Typography>

                  <div className="space-y-4">
                    <Typography variant="small" weight="bold" className="text-blue-400 uppercase tracking-widest text-[11px]">
                      Key Highlights & Changelog
                    </Typography>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      {update.changes.map((change, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-white/60 leading-relaxed tracking-tight">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-sm mt-2 shrink-0" />
                          {change}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {update.version === 'v4.0.0' && (
                    <div className="mt-10 pt-8 border-t border-white/10 space-y-6">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <Typography variant="small" weight="bold" className="text-indigo-400 uppercase tracking-widest text-[11px] flex items-center gap-2">
                          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                          Feature Screenshots &amp; Visual Previews
                        </Typography>
                        <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full flex items-center gap-1.5">
                          <ShieldCheck className="w-3 h-3 text-emerald-400" />
                          Simulated Preview • ✦ Example Community
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* 1. MCP AI Connect Mockup */}
                        <div className="rounded-2xl bg-[#090d14] border border-white/10 overflow-hidden shadow-xl md:col-span-2">
                          <div className="bg-[#0f1420] px-4 py-2.5 border-b border-white/5 flex items-center justify-between text-xs text-white/50">
                            <div className="flex items-center gap-2">
                              <div className="flex gap-1.5">
                                <span className="w-2.5 h-2.5 rounded-full bg-red-500/70 inline-block" />
                                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70 inline-block" />
                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70 inline-block" />
                              </div>
                              <span className="font-mono text-[11px] text-white font-bold ml-2 flex items-center gap-1.5">
                                <Server className="w-3 h-3 text-indigo-400" /> ✦ Example Community
                              </span>
                            </div>
                            <span className="font-mono text-[10px] bg-white/5 px-2 py-0.5 rounded text-neutral-400">
                              panel.fusionhub.in/dashboard/example-community/mcp
                            </span>
                          </div>
                          <div className="p-5 text-xs grid grid-cols-1 lg:grid-cols-12 gap-5">
                            <div className="lg:col-span-6 bg-white/[0.02] border border-white/5 rounded-xl p-4 flex flex-col justify-between">
                              <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                  <span className="font-bold text-white flex items-center gap-1.5">
                                    <Brain className="w-3.5 h-3.5 text-indigo-400" /> MCP AI Gateway
                                  </span>
                                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded">Active &amp; Isolated</span>
                                </div>
                                <div className="space-y-2 font-mono text-[11px]">
                                  <div>
                                    <span className="text-white/40 text-[10px] block mb-1">TARGET COMMUNITY</span>
                                    <div className="bg-black/40 p-2 rounded border border-white/5 text-white">✦ Example Community (ID: 100000000000000001)</div>
                                  </div>
                                  <div>
                                    <span className="text-white/40 text-[10px] block mb-1">MCP ENDPOINT URL</span>
                                    <div className="bg-black/40 p-2 rounded border border-white/5 text-indigo-300 truncate">https://panel.fusionhub.in/api/mcp/guild/100000000000000001</div>
                                  </div>
                                  <div>
                                    <span className="text-white/40 text-[10px] block mb-1">SCOPED API TOKEN</span>
                                    <div className="bg-black/40 p-2 rounded border border-white/5 text-emerald-400 font-bold flex justify-between">
                                      <span>fmc_live_•••••••••••••••••••••••••demo</span>
                                      <span className="text-white/40 text-[10px]">Example Token</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="mt-3 pt-2 text-[10.5px] text-white/50 border-t border-white/5 flex justify-between">
                                <span>Tenant Isolation: <strong className="text-emerald-400">Strict (0 Leaks)</strong></span>
                                <span>Cursor &amp; Claude: <strong className="text-indigo-400">Ready</strong></span>
                              </div>
                            </div>
                            <div className="lg:col-span-6 bg-black/40 border border-white/5 rounded-xl p-4 flex flex-col justify-between space-y-3">
                              <div className="text-[11px] font-mono text-white/40 border-b border-white/5 pb-2 flex justify-between">
                                <span>AI Assistant Prompt Execution</span>
                                <span className="text-indigo-400">Model Context Protocol</span>
                              </div>
                              <div className="space-y-2 text-[11.5px] leading-relaxed">
                                <div className="bg-indigo-600/15 border border-indigo-500/20 p-2.5 rounded-lg text-white/90">
                                  "Hey Claude, set up our welcome card in #welcome and ensure anti-nuke is active on <strong>Example Community</strong>."
                                </div>
                                <div className="bg-white/5 border border-white/10 p-2.5 rounded-lg text-white/80 space-y-1">
                                  <div className="text-emerald-400 font-bold flex items-center gap-1.5 text-[11px]">
                                    <Check className="w-3 h-3 text-emerald-400" /> Fusion MCP Executed:
                                  </div>
                                  <p>• Configured welcome greeting &rarr; Target: <code className="text-indigo-300">#welcome</code></p>
                                  <p>• Verified Anti-Nuke Shield &rarr; <span className="text-emerald-400 font-bold">Active (0 rogue actions)</span></p>
                                  <span className="text-[10px] text-white/40 block mt-1">Configured strictly within Example Community tenant boundary.</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* 2. Visual Embed Studio Mockup */}
                        <div className="rounded-2xl bg-[#090d14] border border-white/10 overflow-hidden shadow-xl">
                          <div className="bg-[#0f1420] px-3.5 py-2 border-b border-white/5 flex items-center justify-between text-xs text-white/50">
                            <span className="font-mono text-[11px] text-white flex items-center gap-1.5">
                              <Sparkles className="w-3 h-3 text-indigo-400" /> Embed Studio — ✦ Example Community
                            </span>
                            <span className="text-[10px] text-emerald-400 font-mono">Target: #announcements</span>
                          </div>
                          <div className="p-4 text-xs">
                            <div className="bg-[#1e1f22] p-3 rounded-xl border border-white/5">
                              <div className="flex items-center gap-2 mb-2">
                                <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-white text-[10px] font-bold">F</div>
                                <span className="font-bold text-white text-xs">FUSION | BOT</span>
                                <span className="bg-[#5865f2] text-white text-[9px] px-1 py-0.2 rounded font-bold">BOT</span>
                                <span className="text-white/40 text-[10px] ml-auto">Today at 12:00 PM</span>
                              </div>
                              <div className="border-l-4 border-indigo-500 bg-[#2b2d31] p-3 rounded-r-lg space-y-1.5">
                                <div className="font-bold text-white text-[13px]">✨ Welcome to Example Community!</div>
                                <p className="text-white/70 text-[11.5px] leading-relaxed">
                                  Stay up to date with community announcements, events, and discussions. Grab roles in <code className="text-indigo-300">#roles</code>!
                                </p>
                                <div className="grid grid-cols-2 gap-2 pt-1 border-t border-white/5 text-[11px]">
                                  <div><strong className="text-white block">📋 Server Rules:</strong><span className="text-white/50">Be respectful &amp; friendly</span></div>
                                  <div><strong className="text-white block">🎁 Giveaways:</strong><span className="text-white/50">Weekly community events</span></div>
                                </div>
                                <div className="text-[10px] text-white/40 pt-1">✦ Example Community • Safe &amp; Verified</div>
                              </div>
                            </div>
                            <div className="mt-2.5 flex justify-between text-[11px] text-emerald-400 font-bold">
                              <span>✓ Embed dispatched without errors</span>
                              <span className="text-white/40 font-mono text-[10px]">Color: #6366F1</span>
                            </div>
                          </div>
                        </div>

                        {/* 3. Auto Purge Engine Mockup */}
                        <div className="rounded-2xl bg-[#090d14] border border-white/10 overflow-hidden shadow-xl">
                          <div className="bg-[#0f1420] px-3.5 py-2 border-b border-white/5 flex items-center justify-between text-xs text-white/50">
                            <span className="font-mono text-[11px] text-white flex items-center gap-1.5">
                              <Zap className="w-3 h-3 text-amber-400" /> Auto Purge — ✦ Example Community
                            </span>
                            <span className="text-[10px] text-emerald-400 font-bold">● Running Automatically</span>
                          </div>
                          <div className="p-4 text-xs space-y-2.5">
                            <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3 flex justify-between items-center">
                              <div>
                                <div className="font-bold text-white flex items-center gap-1.5">
                                  <Hash className="w-3.5 h-3.5 text-amber-400" /> #bot-commands
                                </div>
                                <div className="text-[11px] text-white/50 mt-0.5">Interval: <strong>Every 24 Hours</strong> • Target: Bot &amp; Spam</div>
                              </div>
                              <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-bold text-[10px]">Pins Protected 📌</span>
                            </div>
                            <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3 flex justify-between items-center">
                              <div>
                                <div className="font-bold text-white flex items-center gap-1.5">
                                  <Hash className="w-3.5 h-3.5 text-amber-400" /> #media-uploads
                                </div>
                                <div className="text-[11px] text-white/50 mt-0.5">Interval: <strong>Every 7 Days</strong> • Target: Old attachments</div>
                              </div>
                              <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-bold text-[10px]">Pins Protected 📌</span>
                            </div>
                            <div className="text-[10px] text-white/40 pt-1 flex justify-between">
                              <span>Total cleaned: <strong className="text-white">1,420 messages</strong></span>
                              <span className="text-indigo-400">✦ Example Community Engine</span>
                            </div>
                          </div>
                        </div>

                        {/* 4. Voice-Role Links Mockup */}
                        <div className="rounded-2xl bg-[#090d14] border border-white/10 overflow-hidden shadow-xl">
                          <div className="bg-[#0f1420] px-3.5 py-2 border-b border-white/5 flex items-center justify-between text-xs text-white/50">
                            <span className="font-mono text-[11px] text-white flex items-center gap-1.5">
                              <Volume2 className="w-3 h-3 text-emerald-400" /> Voice-Role Links — ✦ Example Community
                            </span>
                            <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">● Active &amp; Synced</span>
                          </div>
                          <div className="p-4 text-xs space-y-2.5">
                            <div className="bg-gradient-to-r from-emerald-500/10 to-transparent border border-emerald-500/20 rounded-xl p-3 flex justify-between items-center">
                              <div>
                                <div className="font-bold text-white flex items-center gap-2">
                                  <span>🔊 General Voice (Lounge)</span>
                                  <ArrowRight className="w-3 h-3 text-white/40" />
                                  <span className="text-emerald-400 font-mono">@Active Voice</span>
                                </div>
                                <div className="text-[11px] text-white/50 mt-0.5">Auto-assigned on join • Removed on disconnect</div>
                              </div>
                              <span className="text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded font-mono text-[10px] font-bold">SYNCED</span>
                            </div>
                            <div className="bg-gradient-to-r from-indigo-500/10 to-transparent border border-indigo-500/20 rounded-xl p-3 flex justify-between items-center">
                              <div>
                                <div className="font-bold text-white flex items-center gap-2">
                                  <span>🎙️ Stage Talks &amp; Events</span>
                                  <ArrowRight className="w-3 h-3 text-white/40" />
                                  <span className="text-indigo-400 font-mono">@Stage Audience</span>
                                </div>
                                <div className="text-[11px] text-white/50 mt-0.5">Temporary access role during community events</div>
                              </div>
                              <span className="text-indigo-400 bg-indigo-500/20 px-2 py-0.5 rounded font-mono text-[10px] font-bold">SYNCED</span>
                            </div>
                          </div>
                        </div>

                        {/* 5. Levels & XP Progression Mockup */}
                        <div className="rounded-2xl bg-[#090d14] border border-white/10 overflow-hidden shadow-xl">
                          <div className="bg-[#0f1420] px-3.5 py-2 border-b border-white/5 flex items-center justify-between text-xs text-white/50">
                            <span className="font-mono text-[11px] text-white flex items-center gap-1.5">
                              <Rocket className="w-3 h-3 text-cyan-400" /> Levels &amp; XP — ✦ Example Community
                            </span>
                            <span className="text-[10px] text-cyan-400 font-bold">From ₹79 Starter</span>
                          </div>
                          <div className="p-4 text-xs space-y-2.5">
                            <div className="flex justify-between items-center bg-white/[0.02] border border-white/5 rounded-xl p-2.5">
                              <span className="text-white/60 font-bold">Role Milestones:</span>
                              <div className="flex gap-2 font-mono text-[10.5px]">
                                <span className="bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/30">Lv. 5 ➔ @Regular</span>
                                <span className="bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded border border-purple-500/30">Lv. 15 ➔ @Veteran</span>
                              </div>
                            </div>
                            <div className="space-y-1.5 bg-black/40 rounded-xl p-2.5 border border-white/5 text-[11px]">
                              <div className="flex justify-between text-white/80">
                                <span><strong className="text-yellow-400">#1</strong> Alex (Example Member)</span>
                                <span className="font-mono text-cyan-400 font-bold">Level 24 • 4,820 XP</span>
                              </div>
                              <div className="flex justify-between text-white/80">
                                <span><strong className="text-slate-300">#2</strong> Sarah (Example Member)</span>
                                <span className="font-mono text-cyan-400 font-bold">Level 21 • 3,950 XP</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
};

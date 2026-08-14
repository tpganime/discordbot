import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Zap, Shield, Sparkles, LayoutDashboard, Gift, Bot, Star, Cloud, Clock } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { Typography } from '../components/ui/Typography';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Flex } from '../components/ui/Flex';

const updates = [
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
  return (
    <main className="pt-32 pb-24">
      <Section spacing="xl">
        <Container size="xl">
          <div className="text-center mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge variant="primary" className="mb-8">
                <Sparkles className="w-3 h-3 mr-2" />
                Release History & Changelog
              </Badge>
              <Typography variant="h1" weight="black" className="mb-8">
                System <span className="text-blue-600">Updates</span>
              </Typography>
              <Typography variant="lead" className="max-w-2xl mx-auto">
                Explore the latest features, security enhancements, and performance upgrades released for Fusion Bot.
              </Typography>
            </motion.div>
          </div>

          <div className="max-w-4xl mx-auto space-y-12">
            {updates.map((update, i) => (
              <motion.div
                key={update.version}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
              >
                <Card className="liquid-glass p-8 md:p-10 border border-white/10 rounded-[32px] relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
                    <update.icon className={`w-32 h-32 ${update.color}`} />
                  </div>
                  
                  <Flex gap={4} className="mb-8">
                    <div className={`w-14 h-14 rounded-2xl ${update.bg} flex items-center justify-center shrink-0`}>
                      <update.icon className={`w-7 h-7 ${update.color}`} />
                    </div>
                    <div>
                      <Flex gap={4} align="center" className="mb-1 flex-wrap">
                        <Typography variant="h3" weight="bold">{update.title}</Typography>
                        <Badge variant="outline">{update.type}</Badge>
                      </Flex>
                      <Typography variant="small" className="text-white/40 flex items-center gap-1.5 mt-1">
                        <Clock className="w-3.5 h-3.5 text-blue-400" />
                        {update.version} • {update.date}
                      </Typography>
                    </div>
                  </Flex>

                  <Typography variant="p" className="text-white/70 mb-8 max-w-2xl leading-relaxed text-sm">
                    {update.description}
                  </Typography>

                  <div className="space-y-4">
                    <Typography variant="small" weight="bold" className="text-blue-400 uppercase tracking-widest text-xs">
                      Key Highlights & Changelog
                    </Typography>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {update.changes.map((change, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-white/60 leading-relaxed">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                          {change}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
};

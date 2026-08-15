import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, Zap, Settings, ArrowLeft,
  Layout, ShieldAlert, Sparkles, Gift, Ticket, Cpu, Search as SearchIcon
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { Typography } from '../components/ui/Typography';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Flex } from '../components/ui/Flex';

export const commandCategories = [
  {
    name: 'Moderation & Automod',
    icon: Shield,
    color: 'text-red-400',
    bg: 'bg-red-500/10',
    commands: [
      { name: '/ban', usage: '@user [reason]', description: 'Ban a member permanently from the server.' },
      { name: '/kick', usage: '@user [reason]', description: 'Kick a member from the server.' },
      { name: '/timeout', usage: '@user <duration>', description: 'Timeout a user (e.g. 10s, 5m, 2h, 1d).' },
      { name: '/purge', usage: '<1-100>', description: 'Delete a specific number of messages in the channel.' },
      { name: '/purgeall', usage: '', description: 'Mass delete up to 1000 messages (Admin only).' },
      { name: '/rolecreate', usage: '<name> [color]', description: 'Create a new role with optional hex color.' },
      { name: '/automod', usage: '', description: 'Activate or toggle server-wide auto-moderation filters (Anti-spam, links, spam detection).' },
      { name: '/setuplogs', usage: '', description: 'Automatically create all 8 private staff & audit channels (#mod-logs, #member-logs, #voice-log, #message-log, #join-leave-logs, #server-logs, #moderator-chat, #fusion-invite-tracker).' },
    ]
  },
  {
    name: 'Nuke Guard & Backups',
    icon: ShieldAlert,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    commands: [
      { name: '/nukebackup', usage: '', description: 'Save a complete snapshot of all channels, categories, and roles to Google Drive.' },
      { name: '/nukerestore', usage: '', description: 'Restore entire server hierarchy after a raid or nuke attack (Owner only).' },
      { name: '/driveauth', usage: '', description: 'Authorize Google Drive via OAuth2 for automated cloud backups.' },
    ]
  },
  {
    name: 'AI & Creative Media',
    icon: Cpu,
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    commands: [
      { name: '@mention', usage: '<message>', description: 'Chat naturally with SUNDAY 5.1 AI in English, Hindi, or Hinglish with live web search.' },
      { name: '/imagine', usage: '<prompt> [style] [size]', description: 'Generate AI art, custom server emojis, stickers, vector logos, anime, and 3D renders.' },
      { name: '/meme', usage: '', description: 'Fetch a fresh, high-rated meme from Reddit.' },
      { name: '/ai', usage: '<on / off>', description: 'Toggle AI auto-chat in the current channel without needing mentions.' },
      { name: '/enableai', usage: '', description: 'Enable the AI engine server-wide (Admin only).' },
      { name: '/disableai', usage: '', description: 'Disable the AI engine server-wide (Admin only).' },
      { name: '/aiblock', usage: '<on / off>', description: 'Block AI from responding in a specific channel.' },
    ]
  },
  {
    name: 'Server & Support Tickets',
    icon: Ticket,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    commands: [
      { name: '/ticketsetup', usage: '', description: 'Deploy an interactive dropdown support ticket intake panel with question routing.' },
      { name: '/serverinfo', usage: '', description: 'Display full server stats, member counts, owner, boost level, and security status.' },
      { name: '/invites info', usage: '[@user]', description: 'View detailed inviter history, invite codes, and join order sequencing.' },
      { name: '/disablelink', usage: '', description: 'Block external invite links in a channel (Admin only).' },
      { name: '/enablelink', usage: '', description: 'Allow external invite links in a channel (Admin only).' },
      { name: '/suggestion', usage: '', description: 'Submit a feature suggestion or bug report directly to the developers.' },
    ]
  },
  {
    name: 'Giveaways & Community',
    icon: Gift,
    color: 'text-pink-400',
    bg: 'bg-pink-500/10',
    commands: [
      { name: '/giveaway', usage: '', description: 'Open the giveaway creation menu to configure custom timers and prizes.' },
      { name: '/gmanage', usage: '', description: 'Manage active giveaways: Edit prize/time, End early, or Reroll winners.' },
      { name: '/reactrole', usage: '', description: 'Deploy multi-role reaction picker widgets for member self-assignment.' },
    ]
  },
  {
    name: 'General & Utility',
    icon: Zap,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    commands: [
      { name: '/help', usage: '', description: 'Open the interactive Command Center with category selector and quick link buttons.' },
      { name: '/ping', usage: '', description: 'Check Discord WebSocket gateway latency, shard status, and API ping.' },
      { name: '/avatar', usage: '[@user]', description: 'View and download full-resolution user profile avatars.' },
      { name: '/dashboard', usage: '', description: 'Get a direct link to the web dashboard at panel.fusionhub.in.' },
      { name: '/support', usage: '', description: 'Join our official support server for 24/7 developer assistance.' },
    ]
  }
];

export const CommandsPage = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [isMobile, setIsMobile] = useState(() => (typeof window !== 'undefined' ? window.innerWidth < 1024 : false));

  const filteredCategories = useMemo(() => {
    return commandCategories.map(cat => ({
      ...cat,
      commands: cat.commands.filter(cmd => 
        cmd.name.toLowerCase().includes(search.toLowerCase()) ||
        cmd.description.toLowerCase().includes(search.toLowerCase())
      )
    })).filter(cat => 
      (activeCategory === 'All' || cat.name === activeCategory) && 
      cat.commands.length > 0
    );
  }, [search, activeCategory]);

  return (
    <main className="pt-32 pb-24">
      <Section spacing="xl">
        <Container size="xl">
          <Link to="/" className="inline-flex items-center gap-2 text-white/40 hover:text-white mb-12 transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          
          <div className="text-center mb-16">
            <motion.div
              initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="primary" className="mb-6">
                <Zap className="w-3 h-3 mr-2" />
                Discord Command Suite
              </Badge>
              <Typography variant="h1" weight="black" className="mb-6">
                Official <span className="text-blue-500">Commands</span>
              </Typography>
              <Typography variant="lead" className="max-w-2xl mx-auto text-white/60">
                Explore the complete slash command catalog available in Fusion Bot.
              </Typography>
            </motion.div>
          </div>

          {/* Search and Filters */}
          <div className="max-w-3xl mx-auto mb-16 space-y-6">
            <div className="relative">
              <SearchIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input 
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search commands by name or keyword (e.g. ban, backup, ticket, ai)..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500/50 transition-colors backdrop-blur-md"
              />
            </div>

            <motion.div
              initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Flex gap={2} className="flex-wrap justify-center">
                {['All', 'Moderation & Automod', 'Nuke Guard & Backups', 'AI & Creative Media', 'Server & Support Tickets', 'Roles & Verification', 'Utility & Info'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 ${
                      activeCategory === cat 
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25' 
                        : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </Flex>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 gap-14">
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category, i) => (
                <motion.div
                  key={category.name}
                  initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  whileInView={isMobile ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: isMobile ? 0 : i * 0.08, duration: 0.5 }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-11 h-11 rounded-2xl ${category.bg} flex items-center justify-center shrink-0`}>
                      <category.icon className={`w-5 h-5 ${category.color}`} />
                    </div>
                    <div>
                      <Typography variant="h3" weight="bold" className="text-xl text-white">{category.name}</Typography>
                      <Typography variant="small" className="text-white/40 text-xs">
                        {category.commands.length} Commands Available
                      </Typography>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {category.commands.map((cmd) => (
                      <Card 
                        key={cmd.name} 
                        className="glass p-6 border-white/5 hover:border-blue-500/30 transition-all duration-300 group rounded-2xl"
                      >
                        <Flex justify="between" align="start" className="mb-3">
                          <Typography variant="h4" weight="bold" className="text-blue-400 font-mono text-base">
                            {cmd.name}
                          </Typography>
                          <Badge variant="outline" className="text-[10px] text-white/40 border-white/10">
                            Slash
                          </Badge>
                        </Flex>
                        
                        {cmd.usage && (
                          <div className="mb-3 font-mono text-xs bg-black/40 px-3 py-1.5 rounded-lg border border-white/5 text-white/50">
                            <span className="text-blue-400/80">Usage:</span> {cmd.name} {cmd.usage}
                          </div>
                        )}
                        
                        <Typography variant="p" className="text-white/70 text-xs leading-relaxed">
                          {cmd.description}
                        </Typography>
                      </Card>
                    ))}
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-20">
                <Typography variant="h3" className="text-white/30 text-lg">No commands found matching "{search}"</Typography>
              </div>
            )}
          </div>
        </Container>
      </Section>
    </main>
  );
};

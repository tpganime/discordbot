import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, Zap, Settings, ArrowLeft,
  Layout, ShieldAlert, Sparkles, Gift, Ticket, Cpu, Search as SearchIcon,
  Sliders, User, Coins, MessageSquare, Volume2, Lock, Tag
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
    name: 'Moderation & Lockdown',
    icon: Shield,
    color: 'text-red-400',
    bg: 'bg-red-500/10',
    commands: [
      { name: '/lockdown', usage: '[channel] [optional time]', description: 'Locks a channel to prevent regular members from chatting.' },
      { name: '/unlock', usage: '[channel]', description: 'Unlocks a previously locked channel.' },
      { name: '/slowmode', usage: '<time> [channel]', description: 'Sets channel slowmode interval (e.g. 10s, 5m, 1h, off).' },
      { name: '/purge', usage: '[amount] [filter: user/links/attachments/bot/all]', description: 'Bulk deletes messages with advanced multi-filter matching.' },
      { name: '/purgeall', usage: '', description: 'Mass delete up to 1000 messages (Admin only).' },
      { name: '/ban', usage: '<@user> [optional reason]', description: 'Ban a member permanently with optional audit reason.' },
      { name: '/kick', usage: '<@user> [optional reason]', description: 'Kick a member from the server with optional audit reason.' },
      { name: '/timeout', usage: '<@user> <duration> [optional reason]', description: 'Timeout a user (10s, 5m, 2h, 1d) with optional audit reason.' },
      { name: '/rolecreate', usage: '<name> [color] [emoji] [hoist]', description: 'Create a new role with custom hex color, emoji icon, and hoist status.' },
      { name: '/giverole', usage: '<@user> <@role>', description: 'Assign or give a role to a member.' },
      { name: '/automod', usage: '', description: 'Activate or toggle server-wide auto-moderation filters (Anti-spam, attachments, mentions).' },
      { name: '/setuplogs', usage: '', description: 'Automatically create 8 private staff audit channels.' },
    ]
  },
  {
    name: 'Channel & Command Controls',
    icon: Sliders,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    commands: [
      { name: '/ignore', usage: '<channel> [optional command]', description: 'Ignores all bot commands or a specific command in specified channel.' },
      { name: '/unignore', usage: '<channel>', description: 'Re-enables bot commands in a previously ignored channel.' },
      { name: '/disable', usage: '<command>', description: 'Globally disables a command in the entire server.' },
      { name: '/enable', usage: '<command>', description: 'Re-enables a disabled command in the server.' },
      { name: '/modonly', usage: '<command>', description: 'Restricts a command to staff (Mods/Admins) only.' },
      { name: '/unmodonly', usage: '<command>', description: 'Removes mod-only restriction, making command public.' },
    ]
  },
  {
    name: 'Nuke Guard & Cloud Backups',
    icon: ShieldAlert,
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
    commands: [
      { name: '/nukebackup', usage: '', description: 'Save a complete snapshot of all channels, categories, and roles to Google Drive (3 free uses, then daily Top.gg vote).' },
      { name: '/autobackup', usage: '<on / off>', description: 'Enable or disable automated 24-hour cloud backups to Google Drive (Top.gg daily vote required on enable).' },
      { name: '/nukerestore', usage: '', description: 'Restore entire server hierarchy after a raid or nuke attack (Server Owner only).' },
      { name: '/driveauth', usage: '', description: 'Authorize Google Drive via OAuth2 for automated cloud backups.' },
    ]
  },
  {
    name: 'AI & Creative Media',
    icon: Cpu,
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    commands: [
      { name: '@Fusion Bot / @mention', usage: '<message>', description: 'Chat naturally with SUNDAY 5.1 AI in English, Hindi, or Hinglish with live web search.' },
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
    name: 'Community, Fun & Utility',
    icon: Sparkles,
    color: 'text-pink-400',
    bg: 'bg-pink-500/10',
    commands: [
      { name: '/poll', usage: '<question> [options...]', description: 'Creates an interactive reaction & button poll with modal popup to add choices.' },
      { name: '/userinfo', usage: '[@user]', description: 'Displays account details, avatar, join date, creation date, and roles.' },
      { name: '/banner', usage: '[@user]', description: 'Fetches and displays a user profile banner in full HD.' },
      { name: '/remindme', usage: '<time> <reminder>', description: 'Sets a direct-message reminder (e.g. 10m, 1h, 2d).' },
      { name: '/flip', usage: '', description: 'Flips a coin with animated Heads or Tails result.' },
      { name: '/giveaway', usage: '', description: 'Open the giveaway creation menu to configure custom timers and prizes.' },
      { name: '/gmanage', usage: '', description: 'Manage active giveaways: Edit prize/time, End early, or Reroll winners.' },
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
  const [isMobile] = useState(() => (typeof window !== 'undefined' ? window.innerWidth < 1024 : false));

  const filteredCategories = useMemo(() => {
    return commandCategories.map(cat => ({
      ...cat,
      commands: cat.commands.filter(cmd => 
        cmd.name.toLowerCase().includes(search.toLowerCase()) ||
        cmd.description.toLowerCase().includes(search.toLowerCase()) ||
        cmd.usage.toLowerCase().includes(search.toLowerCase())
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
              <div className="flex justify-center mb-4">
                <Badge variant="primary" className="font-mono font-bold text-xs py-1.5 px-4">
                  <Zap className="w-3.5 h-3.5 mr-2" />
                  Prefixes: / ! @Fusion Bot
                </Badge>
              </div>
              <Typography variant="h1" weight="black" className="mb-6">
                Official <span className="text-blue-500">Commands</span> Catalog
              </Typography>
              <Typography variant="lead" className="max-w-2xl mx-auto text-white/60">
                Explore the complete 52+ multi-prefix command suite available in Fusion Bot.
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
                placeholder="Search commands by name or keyword (e.g. lockdown, slowmode, purge, poll, ban)..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500/50 transition-colors backdrop-blur-md"
              />
            </div>

            <motion.div
              initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Flex gap={2} className="flex-wrap justify-center">
                {['All', 'Moderation & Lockdown', 'Channel & Command Controls', 'Nuke Guard & Backups', 'AI & Creative Media', 'Server & Support Tickets', 'Community, Fun & Utility'].map((cat) => (
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
            {filteredCategories.map((category, i) => (
              <motion.div 
                key={category.name}
                initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: isMobile ? 0 : i * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-2.5 rounded-xl ${category.bg}`}>
                    <category.icon className={`w-5 h-5 ${category.color}`} />
                  </div>
                  <Typography variant="h3" weight="bold" className="text-white text-xl">
                    {category.name}
                  </Typography>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.commands.map((cmd) => (
                    <Card key={cmd.name} className="glass p-6 border-white/5 hover:border-blue-500/30 transition-all group flex flex-col justify-between rounded-2xl">
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <Typography variant="h4" weight="bold" className="text-blue-400 font-mono text-base group-hover:text-blue-300 transition-colors">
                            {cmd.name}
                          </Typography>
                          {cmd.usage && (
                            <Badge variant="outline" className="text-[10px] font-mono border-white/10 text-white/40">
                              {cmd.usage}
                            </Badge>
                          )}
                        </div>
                        <Typography variant="small" className="text-white/60 text-xs leading-relaxed">
                          {cmd.description}
                        </Typography>
                      </div>
                    </Card>
                  ))}
                </div>
              </motion.div>
            ))}

            {filteredCategories.length === 0 && (
              <div className="text-center py-20">
                <Typography variant="lead" className="text-white/40">
                  No commands found matching "{search}"
                </Typography>
              </div>
            )}
          </div>
        </Container>
      </Section>
    </main>
  );
};

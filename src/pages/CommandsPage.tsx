import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, Zap, Settings, ArrowLeft,
  Layout, ShieldAlert, Sparkles, Gift, Ticket, Cpu, Search as SearchIcon,
  Lock, Bot
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
    name: 'Moderation & Staff Tools',
    icon: Shield,
    color: 'text-red-400',
    bg: 'bg-red-500/10',
    badge: '15 Commands',
    commands: [
      { name: '/ban', usage: '@user [reason]', description: 'Ban a member permanently from the server with audit logging.' },
      { name: '/kick', usage: '@user [reason]', description: 'Kick a member from the server with optional reason.' },
      { name: '/timeout', usage: '@user <duration> [reason]', description: 'Timeout a user for a set duration (e.g. 10s, 10m, 1h, 1d).' },
      { name: '/untimeout', usage: '@user [reason]', description: 'Remove an active timeout from a server member.' },
      { name: '/warn', usage: '@user [reason]', description: 'Issue a formal recorded warning to a member.' },
      { name: '/warnings', usage: '@user', description: 'View all recorded disciplinary warnings for a member.' },
      { name: '/clearwarns', usage: '@user', description: 'Clear all recorded warnings for a server member.' },
      { name: '/unban', usage: '<user_id> [reason]', description: 'Unban a user from the server using their Discord ID.' },
      { name: '/unbanall', usage: '', description: 'Mass unban all banned members from the server (Admin only).' },
      { name: '/lockdown', usage: '[channel] [time]', description: 'Lock a channel to prevent regular members from chatting.' },
      { name: '/unlock', usage: '[channel]', description: 'Unlock a previously locked channel.' },
      { name: '/slowmode', usage: '<time> [channel]', description: 'Set channel slowmode cooldown interval (e.g. 5s, 10m, 0 to disable).' },
      { name: '/purge', usage: '[amount] [filter] [@user] [query]', description: 'Purge up to 100 messages with filters (bots, embeds, files, images, links, user, contains).' },
      { name: '/purgeall', usage: '', description: 'Mass purge up to 1,000 messages in the channel (Admin only).' },
      { name: '/snipe', usage: '', description: 'View the most recently deleted message in the channel with attachments and timestamps.' },
    ]
  },
  {
    name: 'Roles & Server Setup',
    icon: Settings,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    badge: '4 Commands',
    commands: [
      { name: '/rolecreate', usage: '<name> [color] [emoji] [hoist]', description: 'Create a new role with hex color, emoji icon, and hoist member list display.' },
      { name: '/giverole', usage: '@user @role', description: 'Assign or toggle a role for a member (protected by role hierarchy).' },
      { name: '/role', usage: '<create|delete|rename|all|humans|bots>', description: 'Bulk role operations and automated mass role assignment.' },
      { name: '/setup', usage: '', description: 'Configure custom role slots (VIP, Friend, Girl, Staff, Guest) and server shortcuts.' },
    ]
  },
  {
    name: 'Security & Cloud Backups',
    icon: ShieldAlert,
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
    badge: '6 Commands',
    commands: [
      { name: '/antinuke', usage: '<enable | disable | settings>', description: 'Antinuke protection shield against malicious bots, channel wiping, and mass kicks.' },
      { name: '/automod', usage: '', description: 'Activate or toggle server-wide automod protections (Anti-spam, rate limits, banned words).' },
      { name: '/nukebackup', usage: '', description: 'Save a complete encrypted snapshot of all channels, categories, and roles to Google Drive.' },
      { name: '/nukerestore', usage: '', description: 'Restore entire server structure from Google Drive backup in seconds (Owner only).' },
      { name: '/autobackup', usage: '<on / off>', description: 'Enable 24-hour automated background cloud backups to Google Drive.' },
      { name: '/driveauth', usage: '', description: 'Authorize Google Drive via OAuth2 for automated cloud backups.' },
    ]
  },
  {
    name: 'AI & Creative Media',
    icon: Cpu,
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    badge: '7 Commands',
    commands: [
      { name: '@mention', usage: '<message>', description: 'Chat naturally with SUNDAY 5.1 AI in English, Hindi, or Hinglish with live web search.' },
      { name: '/imagine', usage: '<prompt> [style] [size]', description: 'Generate AI art, custom server emojis, stickers, vector logos, and 3D renders.' },
      { name: '/ai', usage: '<on / off>', description: 'Toggle AI auto-reply in the current channel without needing mentions.' },
      { name: '/aiblock', usage: '<on / off>', description: 'Fully block AI from responding in a specific channel even if mentioned.' },
      { name: '/enableai', usage: '', description: 'Globally enable AI engine server-wide (Admin only).' },
      { name: '/disableai', usage: '', description: 'Globally disable AI engine server-wide (Admin only).' },
      { name: '/meme', usage: '', description: 'Fetch fresh, high-rated memes from Reddit.' },
    ]
  },
  {
    name: 'Command & Channel Control',
    icon: Layout,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    badge: '6 Commands',
    commands: [
      { name: '/ignore', usage: '<channel> [command]', description: 'Silence bot commands in a specified channel.' },
      { name: '/unignore', usage: '<channel>', description: 'Re-enable bot commands in an ignored channel.' },
      { name: '/disable', usage: '<command>', description: 'Globally disable a specific command across the server.' },
      { name: '/enable', usage: '<command>', description: 'Re-enable a previously disabled command server-wide.' },
      { name: '/modonly', usage: '<command>', description: 'Restrict a command to moderators and staff members only.' },
      { name: '/unmodonly', usage: '<command>', description: 'Remove staff-only restriction to make command available to everyone.' },
    ]
  },
  {
    name: 'Server Management & Tickets',
    icon: Ticket,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    badge: '8 Commands',
    commands: [
      { name: '/ticketsetup', usage: '', description: 'Deploy an interactive support ticket panel with category selection and automatic transcripts.' },
      { name: '/setuplogs', usage: '', description: 'Automatically create all 8 private staff & audit channels (#mod-logs, #member-logs, etc.).' },
      { name: '/serverinfo', usage: '', description: 'Display complete server statistics, owner, boost level, channels, and security tier.' },
      { name: '/servericon', usage: '', description: 'Fetch high-resolution server icon in PNG, JPG, and WEBP formats.' },
      { name: '/invites', usage: '<info / leaderboard> [@user]', description: 'Track member invite history, real vs fake joins, and invite leaderboard ranks.' },
      { name: '/disablelink', usage: '', description: 'Block external invite links in a channel to prevent advertising (Admin only).' },
      { name: '/enablelink', usage: '', description: 'Allow external invite links in a channel (Admin only).' },
      { name: '/clearcopy', usage: '', description: 'Clean and remove stale duplicate slash commands in this server (Admin only).' },
    ]
  },
  {
    name: 'Giveaways & Community',
    icon: Gift,
    color: 'text-pink-400',
    bg: 'bg-pink-500/10',
    badge: '3 Commands',
    commands: [
      { name: '/giveaway', usage: '', description: 'Interactive giveaway creator with custom timers, winner count, and prizes.' },
      { name: '/gmanage', usage: '', description: 'Manage active giveaways: edit prize/time, end early, or reroll winners.' },
      { name: '/poll', usage: '', description: 'Open an interactive popup modal to create multi-choice reaction polls.' },
    ]
  },
  {
    name: 'Interactive Minigames & Fun',
    icon: Sparkles,
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10',
    badge: '11 Commands',
    commands: [
      { name: '/tictactoe', usage: '@opponent', description: 'Play real-time multiplayer Tic-Tac-Toe with clickable button grid.' },
      { name: '/blackjack', usage: '[bet]', description: 'Play classic 21 Blackjack against the dealer AI with hit/stand controls.' },
      { name: '/rps', usage: '[choice]', description: 'Play Rock-Paper-Scissors against the bot.' },
      { name: '/slots', usage: '[bet]', description: 'Spin the virtual casino slot machine with payout multipliers.' },
      { name: '/flip', usage: '', description: 'Flip a coin with real-time animated Heads or Tails outcome.' },
      { name: '/8ball', usage: '<question>', description: 'Consult the mystic 8-ball for answers to any question.' },
      { name: '/ship', usage: '@user1 [user2]', description: 'Calculate match compatibility percentage with custom canvas heart meter.' },
      { name: '/rate', usage: '<category> [@user]', description: 'Fun ratings on scales: Simp, Hot, Toxic, Cute, IQ, etc.' },
      { name: '/roast', usage: '[@user]', description: 'Deliver savage and hilarious AI-powered roasts.' },
      { name: '/truth', usage: '', description: 'Receive a provocative truth question for party games.' },
      { name: '/dare', usage: '', description: 'Receive an entertaining dare challenge for party games.' },
    ]
  },
  {
    name: 'Utilities & Extended Tools',
    icon: Zap,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    badge: '13 Commands',
    commands: [
      { name: '/help', usage: '', description: 'Open the interactive Command Center with category selector and quick link buttons.' },
      { name: '/ping', usage: '', description: 'Check Discord WebSocket gateway latency, shard status, and API ping.' },
      { name: '/userinfo', usage: '[@user]', description: 'Comprehensive member details: join date, account age, badges, permissions, and roles.' },
      { name: '/avatar', usage: '[@user]', description: 'View and download full-resolution avatars up to 4096px (PNG, JPG, WEBP).' },
      { name: '/banner', usage: '[@user]', description: 'View and download full-resolution user profile or server banner.' },
      { name: '/remindme', usage: '<time> <reminder>', description: 'Set a reliable DM reminder with natural time parsing (e.g. 10m, 2h, 1d).' },
      { name: '/weather', usage: '<city>', description: 'Live global weather forecast with temperature, humidity, and condition.' },
      { name: '/translate', usage: '<text> [target_language]', description: 'Translate messages across 50+ languages with auto-detection.' },
      { name: '/calculator', usage: '', description: 'Interactive visual calculator with clickable keypad buttons.' },
      { name: '/steal', usage: '<emoji>', description: 'Steal custom emojis or stickers from other servers and add them to yours.' },
      { name: '/iplookup', usage: '<ip_or_domain>', description: 'Inspect IP geolocation, ISP, timezone, and ASN data.' },
      { name: '/minecraft', usage: '<server_ip>', description: 'Check Minecraft server status, online players, version, and MOTD.' },
      { name: '/afk', usage: '[reason]', description: 'Set your AFK status; notifies members who mention you while away.' },
    ]
  },
  {
    name: 'Encryption & Ciphers',
    icon: Lock,
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/10',
    badge: '3 Commands',
    commands: [
      { name: '/encode', usage: '<algorithm> <text>', description: 'Encode text into Base64, Hex, Binary, Morse code, or ROT13.' },
      { name: '/decode', usage: '<algorithm> <text>', description: 'Decode Base64, Hex, Binary, Morse code, or ROT13 text.' },
      { name: '/password', usage: '[length] [include_symbols]', description: 'Generate cryptographically secure passwords with custom lengths.' },
    ]
  },
  {
    name: 'Voice & Core System',
    icon: Bot,
    color: 'text-violet-400',
    bg: 'bg-violet-500/10',
    badge: '5 Commands',
    commands: [
      { name: '/voice', usage: '', description: 'Manage text-to-speech engine, voice models, and natural TTS playback.' },
      { name: '/dashboard', usage: '', description: 'Direct link to the web management dashboard at panel.fusionhub.in.' },
      { name: '/support', usage: '', description: 'Join our official support server for 24/7 developer assistance.' },
      { name: '/suggestion', usage: '<suggestion>', description: 'Submit a feature suggestion or bug report directly to the developers.' },
      { name: '/admin', usage: '', description: 'Quick access link to bot administration controls.' },
    ]
  },
  {
    name: 'Anime Social Actions',
    icon: Sparkles,
    color: 'text-pink-400',
    bg: 'bg-pink-500/10',
    badge: 'Text / Mention Prefix',
    commands: [
      { name: '?hug / @mention hug', usage: '@user', description: 'Embrace someone with a wholesome dynamic anime GIF.' },
      { name: '?kiss / @mention kiss', usage: '@user', description: 'Send a romantic anime kiss GIF to someone.' },
      { name: '?slap / @mention slap', usage: '@user', description: 'Playfully slap someone with an energetic anime GIF.' },
      { name: '?pat / @mention pat', usage: '@user', description: 'Gently headpat someone with an adorable anime GIF.' },
      { name: '?cuddle / @mention cuddle', usage: '@user', description: 'Snuggle up and cuddle someone with a sweet anime GIF.' },
      { name: '?dance / @mention dance', usage: '', description: 'Bust out happy dance moves with a lively anime GIF.' },
      { name: '?blush / @mention blush', usage: '', description: 'Show your embarrassment with a cute blushing anime GIF.' },
      { name: '?cry / @mention cry', usage: '', description: 'Express sadness or emotional tears with an anime GIF.' },
      { name: '?bonk / @mention bonk', usage: '@user', description: 'Send someone to horny jail with a classic anime bonk GIF.' },
      { name: '?yeet / @mention yeet', usage: '@user', description: 'Yeet someone into orbit with a comedic anime GIF.' },
      { name: '?highfive / @mention highfive', usage: '@user', description: 'Celebrate team victories with an epic high-five GIF.' },
      { name: '?pout / @mention pout', usage: '', description: 'Pout cutely when you do not get your way.' },
    ]
  }
];

export const CommandsPage = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const totalCommandsCount = useMemo(() => {
    return commandCategories.reduce((acc, cat) => acc + cat.commands.length, 0);
  }, []);

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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="primary" className="mb-6">
                <Zap className="w-3 h-3 mr-2" />
                {totalCommandsCount}+ Commands Available
              </Badge>
              <Typography variant="h1" weight="black" className="mb-6">
                Official <span className="text-blue-500">Commands</span> Catalog
              </Typography>
              <Typography variant="lead" className="max-w-2xl mx-auto text-white/60">
                Explore the complete suite of 80 official slash commands and interactive anime social actions.
              </Typography>
            </motion.div>

            {/* Search Bar */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mt-10 max-w-xl mx-auto relative"
            >
              <div className="glass rounded-2xl p-1.5 flex items-center border border-white/10 group focus-within:border-blue-500/50 transition-all">
                <div className="pl-4">
                  <SearchIcon className="w-5 h-5 text-white/40 group-focus-within:text-blue-400 transition-colors" />
                </div>
                <input 
                  type="text" 
                  placeholder="Search commands or keywords (e.g. purge, ban, tictactoe, nuke, imagine)..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-transparent border-none focus:ring-0 py-2.5 px-4 text-white placeholder:text-white/20 text-sm"
                />
              </div>

              {/* Category Filter */}
              <Flex gap={2} justify="center" className="mt-6 flex-wrap">
                {['All', ...commandCategories.map(c => c.name)].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
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
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-11 h-11 rounded-2xl ${category.bg} flex items-center justify-center shrink-0`}>
                      <category.icon className={`w-5 h-5 ${category.color}`} />
                    </div>
                    <div>
                      <Typography variant="h3" weight="bold" className="text-xl text-white">{category.name}</Typography>
                      <Typography variant="small" className="text-white/40 text-xs">
                        {category.commands.length} Commands Available • {category.badge || 'Slash Command'}
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
                            {cmd.name.startsWith('/') ? 'Slash' : 'Action'}
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

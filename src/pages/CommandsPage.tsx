import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, List, 
  Shield, Zap, Settings, Info, 
  ChevronRight, Search as SearchIcon, ArrowLeft, Coins, 
  Layout, ShieldAlert, Brain
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { Typography } from '../components/ui/Typography';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Flex } from '../components/ui/Flex';

const commandCategories = [
  {
    name: 'Economy & Games',
    icon: Coins,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
    commands: [
      { name: '/lb', usage: '', description: 'View the global economy leaderboard.' },
      { name: '/daily', usage: '', description: 'Claim your daily reward coins.' },
      { name: '/pray', usage: '', description: 'Pray to gain extra coins or luck.' },
      { name: '/profile', usage: '[user]', description: 'View yours or another user\'s profile.' },
      { name: '/cash', usage: '[user]', description: 'Check your current balance.' },
      { name: '/cf', usage: '<amount>', description: 'Flip a coin to double your bet.' },
      { name: '/slots', usage: '<amount>', description: 'Test your luck on the slot machine.' },
      { name: '/hunt', usage: '', description: 'Go hunting for rare items and coins.' },
      { name: '/give', usage: '<user> <amount>', description: 'Transfer coins to another user.' },
      { name: '/ttt', usage: '<user>', description: 'Play Tic-Tac-Toe with a friend.' },
    ]
  },
  {
    name: 'Moderation & Roles',
    icon: Shield,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
    commands: [
      { name: '/clear', usage: '<amount>', description: 'Delete a specific number of messages.' },
      { name: '/clearall', usage: '', description: 'Clear all messages in the channel.' },
      { name: '/ban', usage: '<user> [reason]', description: 'Ban a user from the server.' },
      { name: '/kick', usage: '<user> [reason]', description: 'Kick a user from the server.' },
      { name: '/timeout', usage: '<user> <duration>', description: 'Timeout a user for a specific duration.' },
      { name: '/rolecreate', usage: '<name> [color]', description: 'Create a new role in the server.' },
      { name: '/rolegive', usage: '<user> <role>', description: 'Assign a role to a user.' },
      { name: '/disable', usage: '<command>', description: 'Disable a specific command.' },
      { name: '/enable', usage: '<command>', description: 'Enable a previously disabled command.' },
    ]
  },
  {
    name: 'Utility',
    icon: Settings,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
    commands: [
      { name: '/avatar', usage: '[user]', description: 'View yours or another user\'s avatar.' },
    ]
  },
  {
    name: 'Server Config',
    icon: Layout,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
    commands: [
      { name: '/webpanel', usage: '', description: 'Get the link to your server\'s web dashboard.' },
      { name: '/resetbot', usage: '', description: 'Reset bot settings for your server.' },
      { name: '/ticketsetup', usage: '', description: 'Configure the ticket support system.' },
      { name: '/giveaway', usage: '', description: 'Start a new giveaway.' },
      { name: '/gmanage', usage: '', description: 'Manage active giveaways.' },
    ]
  },
  {
    name: 'Nuke Guard',
    icon: ShieldAlert,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
    commands: [
      { name: '/nukebackup', usage: '', description: 'Create a backup of your server structure.' },
      { name: '/nukerestore', usage: '', description: 'Restore your server from a backup.' },
      { name: '/driveauth', usage: '', description: 'Authorize Google Drive for secure backups.' },
    ]
  },
  {
    name: 'AI Features',
    icon: Brain,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
    commands: [
      { name: '@Mention', usage: '<message>', description: 'Mention the bot to chat with our advanced AI.' },
      { name: '/imagine', usage: '<prompt>', description: 'Generate high-quality AI images from text.' },
    ]
  }
];

export const CommandsPage = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

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
          
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="primary" className="mb-6">
                <Zap className="w-3 h-3 mr-2" />
                Fusion Bot
              </Badge>
              <Typography variant="h1" weight="black" className="mb-6">
                Command <span className="text-blue-600">List</span>
              </Typography>
              <Typography variant="lead" className="max-w-2xl mx-auto">
                Everything you need to know about Fusion's capabilities. 
                Use these slash commands to control your experience.
              </Typography>
            </motion.div>

            {/* Search Bar */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mt-12 max-w-xl mx-auto relative"
            >
              <div className="glass rounded-2xl p-1 flex items-center border border-white/10 group focus-within:border-blue-600/50 transition-all">
                <div className="pl-4">
                  <SearchIcon className="w-5 h-5 text-white/40 group-focus-within:text-blue-600 transition-colors" />
                </div>
                <input 
                  type="text" 
                  placeholder="Search for a command..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-transparent border-none focus:ring-0 py-3 px-4 text-white placeholder:text-white/20"
                />
              </div>

              {/* Category Filter */}
              <Flex gap={2} justify="center" className="mt-8 flex-wrap">
                {['All', ...commandCategories.map(c => c.name)].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      activeCategory === cat 
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                        : 'bg-white/5 text-white/40 hover:bg-white/10'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </Flex>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 gap-16">
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category, i) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.8 }}
                >
                  <div className="flex items-center gap-4 mb-8">
                    <div className={`w-12 h-12 rounded-2xl ${category.bg} flex items-center justify-center`}>
                      <category.icon className={`w-6 h-6 ${category.color}`} />
                    </div>
                    <div>
                      <Typography variant="h3" weight="bold">{category.name}</Typography>
                      <Typography variant="small" className="text-white/40">
                        {category.commands.length} Commands Found
                      </Typography>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.commands.map((cmd) => (
                      <Card 
                        key={cmd.name} 
                        className="glass p-8 border-white/5 hover:border-blue-600/30 transition-all duration-500 group"
                      >
                        <Flex justify="between" align="start" className="mb-4">
                          <Typography variant="h4" weight="black" className="text-blue-600">
                            {cmd.name}
                          </Typography>
                          <Badge variant="outline" className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">
                            Slash
                          </Badge>
                        </Flex>
                        
                        {cmd.usage && (
                          <div className="mb-4 font-mono text-xs bg-black/40 p-2 rounded-lg border border-white/5 text-white/40">
                            <span className="text-blue-600/60">Usage:</span> {cmd.name} {cmd.usage}
                          </div>
                        )}
                        
                        <Typography variant="p" className="text-white/60 text-sm leading-relaxed">
                          {cmd.description}
                        </Typography>
                      </Card>
                    ))}
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-20">
                <Typography variant="h3" className="text-white/20">No commands found matching "{search}"</Typography>
              </div>
            )}
          </div>
        </Container>
      </Section>
    </main>
  );
};

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Lock, Cpu, Ticket, Gift, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Container } from './ui/Container';
import { Section } from './ui/Section';
import { Typography } from './ui/Typography';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';

const featuredCategories = [
  {
    name: 'Moderation & Lockdown',
    icon: Shield,
    color: 'text-red-400',
    bg: 'bg-red-500/10',
    commands: [
      { name: '/lockdown [channel] [time]', description: 'Locks a channel to prevent regular members from chatting.' },
      { name: '/unlock [channel]', description: 'Unlocks a previously locked channel.' },
      { name: '/purge user/links/attachments', description: 'Advanced multi-filter purge to clear unwanted messages.' },
    ]
  },
  {
    name: 'Nuke Guard & Cloud Backups',
    icon: Lock,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    commands: [
      { name: '/nukebackup', description: 'Snapshot all channels and roles directly to Google Drive.' },
      { name: '/nukerestore', description: 'One-click full server restoration in case of emergency.' },
      { name: '/driveauth', description: 'Link your Google Drive via secure OAuth2 tokens.' },
    ]
  },
  {
    name: 'AI Intelligence & Media',
    icon: Cpu,
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    commands: [
      { name: '@Fusion Bot / @mention', description: 'Conversational AI chat in English, Hindi, and Hinglish.' },
      { name: '/imagine <prompt>', description: 'Generate high-resolution artwork, custom emojis, and stickers.' },
      { name: '/poll <question>', description: 'Create reaction & button polls with modal option creator.' },
    ]
  }
];

export const Commands = () => {
  const [isMobile] = React.useState(() => (typeof window !== 'undefined' ? window.innerWidth < 1024 : false));

  return (
    <Section spacing="xl" id="commands" className="pt-12 pb-32">
      <Container size="xl">
        <div className="text-center mb-20">
          <Badge variant="primary" className="mb-6 font-mono font-bold">
            <Zap className="w-3 h-3 mr-2" />
            Prefixes: / ! @Fusion Bot
          </Badge>
          <Typography variant="h2" weight="black" className="mb-6">
            Powerful <span className="text-blue-500">Commands</span> Built for Scale
          </Typography>
          <Typography variant="lead" className="max-w-2xl mx-auto text-white/60">
            Automate moderation, manage channel permissions, run interactive polls, and restore server structures with multi-prefix commands.
          </Typography>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {featuredCategories.map((category, i) => (
            <motion.div
              key={i}
              initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={isMobile ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: isMobile ? 0 : i * 0.1, duration: 0.5 }}
            >
              <div className="mb-6 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${category.bg} flex items-center justify-center`}>
                  <category.icon className={`w-5 h-5 ${category.color}`} />
                </div>
                <Typography variant="h4" weight="bold" className="text-white text-base">{category.name}</Typography>
              </div>
              
              <div className="space-y-4">
                {category.commands.map((cmd, j) => (
                  <Card key={j} className="glass p-5 border-white/5 hover:border-blue-500/30 transition-all rounded-2xl">
                    <Typography variant="h4" weight="bold" className="text-blue-400 mb-1 font-mono text-sm">
                      {cmd.name}
                    </Typography>
                    <Typography variant="small" className="text-white/60 text-xs leading-relaxed">
                      {cmd.description}
                    </Typography>
                  </Card>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/commands">
            <Button size="lg" variant="outline" className="group">
              Explore All 52+ Commands
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </Container>
    </Section>
  );
};

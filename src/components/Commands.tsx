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
    name: 'Moderation & Automod',
    icon: Shield,
    color: 'text-red-400',
    bg: 'bg-red-500/10',
    commands: [
      { name: '/ban', description: 'Permanently ban malicious members from your server.' },
      { name: '/timeout', description: 'Instantly timeout users for customizable durations.' },
      { name: '/automod', description: 'Activate automated rate-limiting and anti-spam protection.' },
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
      { name: '@mention', description: 'Conversational AI chat in English, Hindi, and Hinglish.' },
      { name: '/imagine', description: 'Generate high-resolution artwork, custom emojis, and stickers.' },
      { name: '/ai on / off', description: 'Toggle auto AI conversation in specific channels.' },
    ]
  }
];

export const Commands = () => {
  const [isMobile] = React.useState(() => (typeof window !== 'undefined' ? window.innerWidth < 1024 : false));

  return (
    <Section spacing="xl" id="commands" className="pt-12 pb-32">
      <Container size="xl">
        <div className="text-center mb-20">
          <Badge variant="primary" className="mb-6">
            <Zap className="w-3 h-3 mr-2" />
            41+ Slash Commands
          </Badge>
          <Typography variant="h2" weight="black" className="mb-6">
            Powerful <span className="text-blue-500">Commands</span> Built for Scale
          </Typography>
          <Typography variant="lead" className="max-w-2xl mx-auto text-white/60">
            Automate moderation, run interactive giveaways, and restore server structures with simple slash commands.
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
            <Button variant="outline" size="lg" className="border-white/10 hover:border-blue-500/40">
              View All 41+ Commands
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </Container>
    </Section>
  );
};

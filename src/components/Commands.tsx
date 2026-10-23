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
    name: 'Moderation & Security',
    icon: Shield,
    color: 'text-[#FF453A]',
    bg: 'bg-[#FF453A]/12 border-[#FF453A]/25',
    commands: [
      { name: '/purge', description: 'Granular message purges with filters for bots, links, embeds, and users.' },
      { name: '/timeout & /ban', description: 'Instantly timeout or ban malicious members with audit logging.' },
      { name: '/automod & /antinuke', description: 'Comprehensive automated anti-spam and server raid defenses.' },
    ]
  },
  {
    name: 'Nuke Guard & Cloud Backups',
    icon: Lock,
    color: 'text-[#FF9F0A]',
    bg: 'bg-[#FF9F0A]/12 border-[#FF9F0A]/25',
    commands: [
      { name: '/nukebackup', description: 'Snapshot all channels and roles directly to Google Drive.' },
      { name: '/nukerestore', description: 'One-click full server restoration in case of emergency.' },
      { name: '/autobackup', description: '24-hour automated background cloud backups.' },
    ]
  },
  {
    name: 'AI Intelligence & Media',
    icon: Cpu,
    color: 'text-[#BF5AF2]',
    bg: 'bg-[#BF5AF2]/12 border-[#BF5AF2]/25',
    commands: [
      { name: '@mention AI', description: 'Conversational AI chat in English, Hindi, and Hinglish with web search.' },
      { name: '/imagine', description: 'Generate high-resolution artwork, custom server emojis, and stickers.' },
      { name: '/minigames suite', description: 'Interactive multiplayer Tic-Tac-Toe, 21 Blackjack, and ciphers.' },
    ]
  }
];

export const Commands = () => {
  return (
    <Section spacing="xl" id="commands" className="pt-12 pb-32">
      <Container size="xl">
        <div className="text-center mb-16">
          <Badge variant="primary" className="mb-4 px-3.5 py-1 rounded-full border border-blue-500/25 bg-blue-500/10 text-[#0A84FF] text-xs font-semibold tracking-wide">
            <Zap className="w-3.5 h-3.5 mr-1.5 text-[#0A84FF]" />
            80+ Slash Commands
          </Badge>
          <Typography variant="h2" weight="black" className="mb-5 text-3xl sm:text-5xl font-display tracking-[-0.03em] text-white">
            Powerful <span className="bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">Commands</span> Built for Scale
          </Typography>
          <Typography variant="lead" className="max-w-2xl mx-auto text-white/65 text-base sm:text-lg">
            Automate moderation, run interactive minigames, and restore server structures with simple slash commands.
          </Typography>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {featuredCategories.map((category, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="mb-5 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${category.bg} border flex items-center justify-center shadow-sm`}>
                  <category.icon className={`w-5 h-5 ${category.color}`} />
                </div>
                <Typography variant="h4" weight="bold" className="text-white text-base tracking-tight">{category.name}</Typography>
              </div>

              <div className="space-y-3.5">
                {category.commands.map((cmd, j) => (
                  <div key={j} className="p-4.5 rounded-[20px] bg-[#141418]/65 border border-white/8 hover:border-white/20 transition-all duration-200 backdrop-blur-xl shadow-sm">
                    <Typography variant="h4" weight="bold" className="text-[#0A84FF] mb-1 font-mono text-[13.5px] tracking-tight">
                      {cmd.name}
                    </Typography>
                    <Typography variant="caption" className="text-white/65 text-xs leading-relaxed">
                      {cmd.description}
                    </Typography>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/commands">
            <Button variant="secondary" size="lg" className="border-white/15 px-8 font-semibold">
              View All 80+ Commands
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </Container>
    </Section>
  );
};

import React from 'react';
import { motion } from 'framer-motion';
import { Play, SkipForward, SkipBack, Repeat, Volume2, Search, List, Shield, Zap, Settings, Info, HelpCircle } from 'lucide-react';
import { Container } from './ui/Container';
import { Section } from './ui/Section';
import { Typography } from './ui/Typography';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { Flex } from './ui/Flex';

const commandCategories = [
  {
    name: 'Music',
    icon: Play,
    commands: [
      { name: '/play', description: 'Play any song or playlist from supported platforms.' },
      { name: '/skip', description: 'Skip the current song playing.' },
      { name: '/queue', description: 'View the current music queue.' },
      { name: '/volume', description: 'Adjust the bot volume (0-100).' },
    ]
  },
  {
    name: 'Moderation',
    icon: Shield,
    commands: [
      { name: '/ban', description: 'Ban a user from the server.' },
      { name: '/kick', description: 'Kick a user from the server.' },
      { name: '/mute', description: 'Mute a user for a specific duration.' },
      { name: '/purge', description: 'Delete a large number of messages.' },
    ]
  },
  {
    name: 'General',
    icon: Zap,
    commands: [
      { name: '/help', description: 'Get a list of all available commands.' },
      { name: '/ping', description: 'Check the bot latency.' },
      { name: '/info', description: 'Get information about the bot.' },
      { name: '/stats', description: 'View server and bot statistics.' },
    ]
  }
];

export const Commands = () => {
  return (
    <Section spacing="xl" id="commands">
      <Container size="xl">
        <div className="text-center mb-24">
          <Badge variant="primary" className="mb-8">
            <Zap className="w-3 h-3 mr-2" />
            Slash Commands
          </Badge>
          <Typography variant="h2" weight="black" className="mb-8">
            Powerful <span className="text-blue-600">Commands</span> At Your Fingertips
          </Typography>
          <Typography variant="lead" className="max-w-3xl mx-auto">
            Fusion comes packed with 39 commands to help you manage and entertain your community.
          </Typography>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {commandCategories.map((category, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
            >
              <div className="mb-8 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center">
                  <category.icon className="w-5 h-5 text-blue-600" />
                </div>
                <Typography variant="h4" weight="bold">{category.name}</Typography>
              </div>
              
              <div className="space-y-4">
                {category.commands.map((cmd, j) => (
                  <Card key={j} className="p-6 border-white/5 hover:border-blue-600/30 transition-colors duration-300">
                    <Typography variant="h4" weight="bold" className="text-blue-600 mb-2">
                      {cmd.name}
                    </Typography>
                    <Typography variant="small" className="text-white/60">
                      {cmd.description}
                    </Typography>
                  </Card>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
};

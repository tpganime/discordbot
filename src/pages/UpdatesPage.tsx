import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Zap, Shield, Sparkles, MessageSquare, Bot, Bug, Star } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { Typography } from '../components/ui/Typography';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Flex } from '../components/ui/Flex';

const updates = [
  {
    version: 'v2.1.0',
    date: 'April 2026',
    title: 'The "Fusion" Update',
    description: 'We\'ve completely overhauled the core engine to provide a more stable and faster experience.',
    type: 'Major',
    icon: Rocket,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
    changes: [
      'New AI-powered moderation engine with 99.9% accuracy.',
      'Global command latency reduced by 40%.',
      'Enhanced Nuke Guard protection for enterprise servers.',
      'New web dashboard with real-time analytics.',
    ]
  },
  {
    version: 'v2.0.5',
    date: 'March 2026',
    title: 'Security Patch & Stability',
    description: 'Focusing on what matters most: keeping your server safe and online.',
    type: 'Security',
    icon: Shield,
    color: 'text-red-500',
    bg: 'bg-red-500/10',
    changes: [
      'Fixed a vulnerability in the auto-role system.',
      'Improved bot response time during high-load periods.',
      'Added more granular permissions for moderation commands.',
    ]
  },
  {
    version: 'v2.0.0',
    date: 'February 2026',
    title: 'FUSION HUB Reboot',
    description: 'A fresh start with a brand new brand and a more powerful mission.',
    type: 'Release',
    icon: Star,
    color: 'text-yellow-500',
    bg: 'bg-yellow-500/10',
    changes: [
      'Rebranded from FUSION BOT to FUSION HUB.',
      'Complete UI redesign of the landing page and dashboard.',
      'Introduced Smart AI command handling.',
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
                Latest News
              </Badge>
              <Typography variant="h1" weight="black" className="mb-8">
                System <span className="text-blue-600">Updates</span>
              </Typography>
              <Typography variant="lead" className="max-w-2xl mx-auto">
                Stay up to date with the latest features, security patches, and improvements to FUSION HUB.
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
                <Card className="glass p-10 border-white/5 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                    <update.icon className={`w-32 h-32 ${update.color}`} />
                  </div>
                  
                  <Flex gap={4} className="mb-8">
                    <div className={`w-14 h-14 rounded-2xl ${update.bg} flex items-center justify-center`}>
                      <update.icon className={`w-7 h-7 ${update.color}`} />
                    </div>
                    <div>
                      <Flex gap={4} align="center" className="mb-1">
                        <Typography variant="h3" weight="bold">{update.title}</Typography>
                        <Badge variant="outline">{update.type}</Badge>
                      </Flex>
                      <Typography variant="small" className="text-white/40">
                        {update.version} • Released {update.date}
                      </Typography>
                    </div>
                  </Flex>

                  <Typography variant="p" className="text-white/60 mb-8 max-w-2xl leading-relaxed">
                    {update.description}
                  </Typography>

                  <div className="space-y-4">
                    <Typography variant="small" weight="bold" className="text-blue-600 uppercase tracking-widest">
                      Key Changes
                    </Typography>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {update.changes.map((change, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-white/40">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
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

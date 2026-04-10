import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Music, Shield, Zap, Sparkles, Star, Users, MessageSquare, Headphones, Volume2, Mic2, Radio, Settings, Lock, Globe, Cpu, Layout, BarChart3, Layers } from 'lucide-react';
import { Container } from './ui/Container';
import { Section } from './ui/Section';
import { Typography } from './ui/Typography';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';

const features = [
  {
    title: 'High-Fidelity Audio',
    description: 'Experience crystal-clear music with our advanced audio engine and 24-bit support.',
    icon: Headphones,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
  },
  {
    title: 'Smart Moderation',
    description: 'Keep your server safe with advanced auto-moderation and intelligent logging.',
    icon: Shield,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
  },
  {
    title: 'Lightning Fast',
    description: 'Zero latency commands and instant music playback across all global regions.',
    icon: Zap,
    color: 'text-yellow-500',
    bg: 'bg-yellow-500/10',
  },
  {
    title: 'AI Integration',
    description: 'Advanced AI for intelligent conversations and smart command handling.',
    icon: Cpu,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
  },
  {
    title: 'Custom Dashboard',
    description: 'Manage your bot settings, commands, and music queues from a beautiful web interface.',
    icon: Layout,
    color: 'text-green-500',
    bg: 'bg-green-500/10',
  },
];

export const Features = () => {
  return (
    <Section spacing="xl" id="features" className="bg-black/50">
      <Container size="xl">
        <div className="text-center mb-32">
          <Badge variant="secondary" className="mb-8">
            <Star className="w-3 h-3 mr-2" />
            Powerful Features
          </Badge>
          <Typography variant="h2" weight="black" className="mb-8">
            Everything You Need <br /> To <span className="text-blue-600">Scale</span> Your Server
          </Typography>
          <Typography variant="lead" className="max-w-3xl mx-auto">
            We've built the most comprehensive Discord bot with features that matter to you and your community.
          </Typography>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
            >
              <Card className="h-full hover:bg-white/[0.05] group cursor-pointer">
                <div className={`w-16 h-16 rounded-2xl ${feature.bg} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                </div>
                <Typography variant="h4" weight="bold" className="mb-4 group-hover:text-blue-600 transition-colors duration-300">
                  {feature.title}
                </Typography>
                <Typography variant="p">
                  {feature.description}
                </Typography>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
};

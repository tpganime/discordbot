import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Play, Disc, Music, Shield, Zap, Sparkles, Star, Users, MessageSquare } from 'lucide-react';
import { Button } from './ui/Button';
import { Container } from './ui/Container';
import { Flex } from './ui/Flex';
import { Section } from './ui/Section';
import { Typography } from './ui/Typography';
import { Badge } from './ui/Badge';
import { DISCORD_INVITE_URL, SUPPORT_SERVER_URL } from '../constants';

export const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const rotate = useTransform(scrollY, [0, 1000], [0, 360]);

  return (
    <Section spacing="xl" className="min-h-screen flex items-center justify-center pt-32 pb-48">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          style={{ y: y1, rotate }}
          className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-orange-600/20 blur-[120px] rounded-full"
        />
        <motion.div
          style={{ y: y2, rotate: -rotate }}
          className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-600/10 blur-[100px] rounded-full"
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      </div>

      <Container size="xl" className="relative z-10">
        <Flex direction="col" gap={12} className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <Badge variant="primary" className="mb-8">
              <Sparkles className="w-3 h-3 mr-2" />
              The Future of Discord Music
            </Badge>
            <Typography variant="h1" weight="black" className="mb-8 max-w-5xl mx-auto">
              Elevate Your <span className="text-orange-600">Discord</span> Experience
            </Typography>
            <Typography variant="lead" className="max-w-3xl mx-auto mb-12">
              High-fidelity music, powerful moderation, and seamless AI integration. All in one bot.
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <Flex gap={6} justify="center" className="flex-col sm:flex-row">
              <Button size="lg" onClick={() => window.open(DISCORD_INVITE_URL)}>
                Add to Discord
                <Play className="w-5 h-5 ml-2 fill-current" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => window.open(SUPPORT_SERVER_URL)}>
                Support Server
              </Button>
            </Flex>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-24 w-full max-w-4xl mx-auto"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 p-10 glass rounded-[40px] border border-white/5">
              {[
                { label: 'Servers', value: '50K+', icon: Shield },
                { label: 'Users', value: '2M+', icon: Users },
                { label: 'Commands', value: '150+', icon: Zap },
                { label: 'Uptime', value: '99.9%', icon: Star },
              ].map((stat, i) => (
                <div key={i} className="text-center group">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-600/20 transition-colors duration-300">
                    <stat.icon className="w-6 h-6 text-orange-600" />
                  </div>
                  <Typography variant="h4" weight="bold" className="mb-1">{stat.value}</Typography>
                  <Typography variant="small">{stat.label}</Typography>
                </div>
              ))}
            </div>
          </motion.div>
        </Flex>
      </Container>
    </Section>
  );
};

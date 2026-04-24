import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Play, Disc, Music, Shield, Zap, Sparkles, Star, Users, MessageSquare, LayoutDashboard } from 'lucide-react';
import { Button } from './ui/Button';
import { Container } from './ui/Container';
import { Flex } from './ui/Flex';
import { Section } from './ui/Section';
import { Typography } from './ui/Typography';
import { Badge } from './ui/Badge';
import { DISCORD_INVITE_URL, SUPPORT_SERVER_URL, DASHBOARD_URL } from '../constants';

export const Hero = () => {
  const [isMobile, setIsMobile] = React.useState(false);
  const [showComingSoon, setShowComingSoon] = React.useState(false);
  const [stats, setStats] = React.useState({ servers: 11, users: 40 });

  React.useEffect(() => {
    const fetchStats = async () => {
      try {
        console.log('Fetching live stats...');
        const res = await fetch('/api/stats');
        if (res.ok) {
          const data = await res.json();
          console.log('Live stats received:', data);
          setStats(data);
        } else {
          console.error('Failed to fetch stats:', res.status, res.statusText);
        }
      } catch (err) {
        console.error('Failed to fetch stats:', err);
      }
    };
    fetchStats();
    const interval = setInterval(fetchStats, 60000); // Polling every minute
    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const rotate = useTransform(scrollY, [0, 1000], [0, 360]);

  return (
    <Section spacing="xl" className="min-h-screen flex items-center justify-center pt-32 pb-48">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          style={{ y: !isMobile ? y1 : 0, rotate: !isMobile ? rotate : 0 }}
          className="absolute top-[-10%] right-[-5%] w-[300px] h-[300px] lg:w-[600px] lg:h-[600px] bg-blue-600/20 blur-[80px] lg:blur-[120px] rounded-full"
        />
        <motion.div
          style={{ y: !isMobile ? y2 : 0, rotate: !isMobile ? -rotate : 0 }}
          className="absolute bottom-[-10%] left-[-5%] w-[250px] h-[250px] lg:w-[500px] lg:h-[500px] bg-blue-600/10 blur-[60px] lg:blur-[100px] rounded-full"
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 lg:opacity-20 mix-blend-overlay" />
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
              Elevate Your <span className="text-blue-600">Discord</span> Experience
            </Typography>
            <Typography variant="lead" className="max-w-3xl mx-auto mb-12">
              best auto moderation, powerful moderation, and seamless AI integration. All in one bot.
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
              <Button size="lg" variant="outline" onClick={() => window.location.href = DASHBOARD_URL}>
                Dashboard
                <LayoutDashboard className="w-5 h-5 ml-2" />
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
                { label: 'Servers', value: stats.servers.toString(), icon: Shield },
                { label: 'Users', value: stats.users.toString(), icon: Users },
                { label: 'Commands', value: '41', icon: Zap },
                { label: 'Uptime', value: '99.9%', icon: Star },
              ].map((stat, i) => (
                <div key={i} className="text-center group">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600/20 transition-colors duration-300">
                    <stat.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <Typography variant="h4" weight="bold" className="mb-1">{stat.value}</Typography>
                  <Typography variant="small">{stat.label}</Typography>
                </div>
              ))}
            </div>
          </motion.div>
        </Flex>
      </Container>

      {/* Coming Soon Popup */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showComingSoon ? 1 : 0 }}
        className={`fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 ${showComingSoon ? 'pointer-events-auto' : 'pointer-events-none'}`}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: showComingSoon ? 1 : 0.9, y: showComingSoon ? 0 : 20 }}
          className="glass p-12 rounded-[40px] border border-white/10 text-center max-w-sm w-full"
        >
          <div className="w-20 h-20 rounded-3xl bg-blue-600/20 flex items-center justify-center mx-auto mb-8">
            <Disc className="w-10 h-10 text-blue-600 animate-spin-slow" />
          </div>
          <Typography variant="h3" weight="black" className="mb-4">Coming Soon</Typography>
          <Typography variant="p" className="text-white/60 mb-8">
            This feature is currently under development. Stay tuned for updates!
          </Typography>
          <Button variant="primary" className="w-full" onClick={() => setShowComingSoon(false)}>
            Got it
          </Button>
        </motion.div>
      </motion.div>
    </Section>
  );
};

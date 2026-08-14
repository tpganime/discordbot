import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Shield, Zap, Sparkles, Star, Users, LayoutDashboard, Bot, Activity, Wifi } from 'lucide-react';
import { Button } from './ui/Button';
import { Container } from './ui/Container';
import { Flex } from './ui/Flex';
import { Section } from './ui/Section';
import { Typography } from './ui/Typography';
import { Badge } from './ui/Badge';
import { DISCORD_INVITE_URL, DASHBOARD_URL } from '../constants';

export const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [stats, setStats] = useState({
    online: true,
    ping: 24,
    servers: 17,
    users: 642,
    commands: 41,
    uptime: '99.9%',
    loading: false
  });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Fetch real-time live bot stats from dashboard API
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('https://panel.fusionhub.in/api/stats', {
          headers: { 'Accept': 'application/json' }
        });
        if (res.ok) {
          const data = await res.json();
          setStats({
            online: data.online !== false,
            ping: data.ping || 24,
            servers: data.servers || 17,
            users: data.users || 642,
            commands: data.commands || 41,
            uptime: data.uptime || '99.9%',
            loading: false
          });
        }
      } catch (err) {
        // Fallback to default stats if API temporarily unreachable
      }
    };

    fetchStats();
    const timer = setInterval(fetchStats, 15000);
    return () => clearInterval(timer);
  }, []);

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const rotate = useTransform(scrollY, [0, 1000], [0, 360]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    containerRef.current.style.setProperty('--tilt-x', `${(y - 0.5) * 10}deg`);
    containerRef.current.style.setProperty('--tilt-y', `${(x - 0.5) * -10}deg`);
  };

  const resetTilt = () => {
    if (!containerRef.current) return;
    containerRef.current.style.setProperty('--tilt-x', '0deg');
    containerRef.current.style.setProperty('--tilt-y', '0deg');
  };

  return (
    <Section spacing="xl" className="min-h-screen flex items-center justify-center pt-32 pb-36 relative overflow-hidden">
      {/* Background Parallax Glow Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          style={{ y: !isMobile ? y1 : 0, rotate: !isMobile ? rotate : 0 }}
          className="absolute top-[-10%] right-[-5%] w-[300px] h-[300px] lg:w-[600px] lg:h-[600px] bg-blue-600/20 blur-[80px] lg:blur-[120px] rounded-full"
        />
        <motion.div
          style={{ y: !isMobile ? y2 : 0, rotate: !isMobile ? -rotate : 0 }}
          className="absolute bottom-[-10%] left-[-5%] w-[250px] h-[250px] lg:w-[500px] lg:h-[500px] bg-blue-600/10 blur-[60px] lg:blur-[100px] rounded-full"
        />
      </div>

      <Container size="xl" className="relative z-10" ref={containerRef} onMouseMove={handleMouseMove} onMouseLeave={resetTilt}>
        <Flex direction="col" gap={10} className="text-center" style={{ transform: 'perspective(1000px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg))', transition: 'transform 0.1s ease-out' }}>
          
          <motion.div
            initial={!isMobile ? { opacity: 0, y: 20 } : { opacity: 1 }}
            animate={!isMobile ? { opacity: 1, y: 0 } : { opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* Live Status Pill */}
            <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-8 backdrop-blur-md shadow-lg shadow-blue-600/5">
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${stats.online ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]' : 'bg-rose-500 shadow-[0_0_8px_#f43f5e]'} animate-pulse`} />
                <span className="text-xs font-bold uppercase tracking-wider text-white">
                  {stats.online ? 'SYSTEM ONLINE' : 'SYSTEM OFFLINE'}
                </span>
              </div>
              <span className="text-white/20">•</span>
              <div className="flex items-center gap-1.5 text-xs font-mono text-blue-400">
                <Wifi className="w-3.5 h-3.5" />
                <span>{stats.ping}ms Ping</span>
              </div>
            </div>

            <Typography variant="h1" weight="black" className="mb-6 max-w-5xl mx-auto">
              Elevate Your <span className="text-blue-500">Discord</span> Experience
            </Typography>
            <Typography variant="lead" className="max-w-2xl mx-auto mb-10 text-white/70">
              Enterprise auto-moderation, automated Google Drive backups, interactive tickets, and next-gen AI conversation.
            </Typography>
          </motion.div>

          <motion.div
            initial={!isMobile ? { opacity: 0, scale: 0.9 } : { opacity: 1 }}
            animate={!isMobile ? { opacity: 1, scale: 1 } : { opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <Flex gap={5} justify="center" className="flex-col sm:flex-row">
              <Button size="lg" onClick={() => window.open(DISCORD_INVITE_URL)}>
                Add to Discord
                <Zap className="w-5 h-5 ml-2 fill-current" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => window.location.href = DASHBOARD_URL}>
                Dashboard
                <LayoutDashboard className="w-5 h-5 ml-2" />
              </Button>
            </Flex>
          </motion.div>

          {/* Real-time Live Stats */}
          <motion.div
            initial={!isMobile ? { opacity: 0, y: 40, perspective: 1000 } : { opacity: 1, y: 0 }}
            animate={!isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-16 w-full max-w-4xl mx-auto group"
            style={!isMobile ? { transformStyle: 'preserve-3d' } : undefined}
          >
            <div 
              className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 md:p-10 liquid-glass rounded-[40px] border border-white/10 shadow-[0_20px_50px_-20px_rgba(0,0,0,1),0_0_0_1px_rgba(255,255,255,0.05)] transition-all duration-700 hover:shadow-[0_40px_100px_-20px_rgba(37,99,235,0.25)] hover:-translate-y-1"
              style={!isMobile ? { transform: 'rotateX(8deg)', transformStyle: 'preserve-3d' } : undefined}
            >
              {[
                { label: 'SERVERS', value: stats.servers.toLocaleString(), icon: Shield, color: 'text-blue-400' },
                { label: 'USERS', value: stats.users.toLocaleString(), icon: Users, color: 'text-indigo-400' },
                { label: 'COMMANDS', value: stats.commands.toString(), icon: Zap, color: 'text-amber-400' },
                { label: 'UPTIME', value: stats.uptime, icon: Star, color: 'text-emerald-400' },
              ].map((stat, i) => (
                <div 
                  key={i} 
                  className="text-center group/item"
                  style={!isMobile ? { transform: 'translateZ(25px)' } : undefined}
                >
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center mx-auto mb-3 group-hover/item:bg-blue-600/20 group-hover/item:scale-110 transition-all duration-300">
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <Typography variant="h3" weight="black" className="mb-1 text-2xl md:text-3xl text-white font-display tracking-tight">
                    {stat.value}
                  </Typography>
                  <Typography variant="small" className="text-white/40 font-bold uppercase tracking-widest text-[11px] group-hover/item:text-white/80 transition-colors">
                    {stat.label}
                  </Typography>
                </div>
              ))}
            </div>
          </motion.div>
        </Flex>
      </Container>
    </Section>
  );
};

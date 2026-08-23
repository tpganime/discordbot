import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Zap, 
  Users, 
  Shield, 
  Star, 
  LayoutDashboard, 
  Wifi,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Container } from './ui/Container';
import { Flex } from './ui/Flex';
import { Typography } from './ui/Typography';
import { Button } from './ui/Button';
import { Section } from './ui/Section';
import { DISCORD_INVITE_URL, DASHBOARD_URL } from '../constants';

const Counter = ({ value }: { value: string }) => {
  return <span>{value}</span>;
};

export const Hero = () => {
  const [isMobile, setIsMobile] = useState(() => (typeof window !== 'undefined' ? window.innerWidth < 1024 : false));
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [stats, setStats] = useState({
    online: true,
    ping: 24,
    servers: 29,
    users: 1066,
    commands: 52,
    uptime: '99.9%',
  });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Real-time live polling from bot endpoints
  useEffect(() => {
    const fetchLiveStats = async () => {
      const endpoints = [
        '/api/stats',
        'https://panel.fusionhub.in/api/stats',
        'http://th-us1.terohost.com:25626/api/stats'
      ];

      for (const endpoint of endpoints) {
        try {
          const startTime = Date.now();
          const res = await fetch(endpoint, {
            headers: { 'Accept': 'application/json' },
            signal: AbortSignal.timeout(2500)
          });
          const latency = Date.now() - startTime;

          if (res.ok) {
            const text = await res.text();
            try {
              const data = JSON.parse(text);
              if (data && typeof data === 'object') {
                const isBotOnline = data.online !== false && data.status?.toLowerCase() !== 'offline';
                setStats({
                  online: isBotOnline,
                  ping: isBotOnline ? (data.ping && data.ping > 0 ? data.ping : Math.min(latency, 45)) : 0,
                  servers: data.servers != null ? data.servers : 29,
                  users: data.users != null ? data.users : 1066,
                  commands: data.commands != null ? data.commands : 52,
                  uptime: data.uptime || '99.9%',
                });
                return;
              }
            } catch (_) {}
          }
        } catch (_) {}
      }
    };

    fetchLiveStats();
    const interval = setInterval(fetchLiveStats, 30000);
    return () => clearInterval(interval);
  }, []);

  // Scroll animations for desktop
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);
  const rotate = useTransform(scrollY, [0, 500], [0, 10]);

  // Mouse tilt effect for desktop
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    containerRef.current.style.setProperty('--tilt-x', `${-y * 0.015}deg`);
    containerRef.current.style.setProperty('--tilt-y', `${x * 0.015}deg`);
  };

  const resetTilt = () => {
    if (isMobile || !containerRef.current) return;
    containerRef.current.style.setProperty('--tilt-x', `0deg`);
    containerRef.current.style.setProperty('--tilt-y', `0deg`);
  };

  return (
    <Section spacing="none" className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-20 overflow-hidden">
      {/* Dynamic Background Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          style={{ y: !isMobile ? y1 : 0, rotate: !isMobile ? rotate : 0 }}
          className="absolute top-[-10%] right-[-5%] w-[400px] lg:w-[600px] h-[400px] lg:h-[600px] bg-indigo-600/15 blur-[90px] rounded-full transform-gpu"
        />
        <motion.div 
          style={{ y: !isMobile ? y2 : 0, rotate: !isMobile ? -rotate : 0 }}
          className="absolute bottom-[-10%] left-[-5%] w-[350px] lg:w-[500px] h-[350px] lg:h-[500px] bg-blue-600/10 blur-[80px] rounded-full transform-gpu"
        />
      </div>

      <Container size="xl" className="relative z-10" ref={containerRef} onMouseMove={handleMouseMove} onMouseLeave={resetTilt}>
        <Flex direction="col" gap={10} className="text-center" style={!isMobile ? { transform: 'perspective(1000px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg))', transition: 'transform 0.1s ease-out' } : undefined}>
          
          <motion.div
            initial={!isMobile ? { opacity: 0, y: 20 } : { opacity: 1 }}
            animate={!isMobile ? { opacity: 1, y: 0 } : { opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* Live Real-Time Status Pill */}
            <Link 
              to="/status" 
              className={`inline-flex items-center gap-3 bg-white/5 border px-5 py-2.5 rounded-full mb-6 backdrop-blur-md shadow-lg transition-all group cursor-pointer ${
                stats.online 
                  ? 'border-white/10 hover:border-emerald-500/40 hover:bg-white/10 shadow-blue-600/10' 
                  : 'border-rose-500/30 hover:border-rose-500/60 hover:bg-rose-950/20 shadow-rose-600/10'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${stats.online ? 'bg-emerald-400 shadow-[0_0_10px_#34d399]' : 'bg-rose-500 shadow-[0_0_10px_#f43f5e]'} animate-pulse`} />
                <span className={`text-xs font-bold uppercase tracking-wider ${stats.online ? 'text-white' : 'text-rose-300'}`}>
                  {stats.online ? 'BOT ONLINE' : 'BOT OFFLINE'}
                </span>
              </div>
              <span className="text-white/20">•</span>
              <div className={`flex items-center gap-1.5 text-xs font-mono ${stats.online ? 'text-blue-400' : 'text-rose-400'}`}>
                <Wifi className="w-3.5 h-3.5 animate-pulse" />
                <span>{stats.online ? `${stats.ping}ms Ping` : '0ms (Offline)'}</span>
              </div>
              <span className="text-white/20 hidden sm:inline">•</span>
              <span className={`text-[11px] font-mono hidden sm:inline flex items-center gap-1 ${
                stats.online ? 'text-emerald-400/80 group-hover:text-emerald-300' : 'text-rose-400/80 group-hover:text-rose-300'
              }`}>
                {stats.online ? 'SHARDS LIVE' : 'UNREACHABLE'} <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>

            {/* Official Prefixes Banner */}
            <div className="flex justify-center mb-6">
              <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/25 px-4 py-1.5 rounded-full backdrop-blur-md text-xs font-mono font-bold text-blue-300 shadow-sm">
                <span className="text-white/50 font-sans font-semibold">Prefixes:</span> / ! @Fusion Bot
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
            <Flex gap={4} justify="center" className="flex-col sm:flex-row">
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

          {/* Real-time Live Stats Counters */}
          <motion.div
            initial={!isMobile ? { opacity: 0, y: 40, perspective: 1000 } : { opacity: 1, y: 0 }}
            animate={!isMobile ? { opacity: 1, y: 0 } : { opacity: 1 }}
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
                    <Counter value={stat.value} />
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

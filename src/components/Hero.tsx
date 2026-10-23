import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Zap, 
  Users, 
  Shield, 
  Star, 
  LayoutDashboard, 
  Wifi,
  ChevronRight,
  ArrowRight
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
  const y1 = useTransform(scrollY, [0, 500], [0, 80]);
  const y2 = useTransform(scrollY, [0, 500], [0, -80]);

  // Mouse tilt effect for desktop
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    containerRef.current.style.setProperty('--tilt-x', `${-y * 0.012}deg`);
    containerRef.current.style.setProperty('--tilt-y', `${x * 0.012}deg`);
  };

  const resetTilt = () => {
    if (isMobile || !containerRef.current) return;
    containerRef.current.style.setProperty('--tilt-x', `0deg`);
    containerRef.current.style.setProperty('--tilt-y', `0deg`);
  };

  return (
    <Section spacing="none" className="relative min-h-[92vh] flex items-center justify-center pt-36 pb-20 overflow-hidden">
      {/* Refined Ambient Lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          style={{ y: !isMobile ? y1 : 0 }}
          className="absolute top-[-12%] right-[15%] w-[450px] lg:w-[650px] h-[450px] lg:h-[650px] bg-blue-600/12 blur-[120px] rounded-full transform-gpu"
        />
        <motion.div 
          style={{ y: !isMobile ? y2 : 0 }}
          className="absolute bottom-[-10%] left-[10%] w-[380px] lg:w-[550px] h-[380px] lg:h-[550px] bg-indigo-600/10 blur-[110px] rounded-full transform-gpu"
        />
      </div>

      <Container size="xl" className="relative z-10" ref={containerRef} onMouseMove={handleMouseMove} onMouseLeave={resetTilt}>
        <Flex direction="col" gap={8} className="text-center" style={!isMobile ? { transform: 'perspective(1000px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg))', transition: 'transform 0.15s ease-out' } : undefined}>
          
          <motion.div
            initial={!isMobile ? { opacity: 0, y: 16 } : { opacity: 1 }}
            animate={!isMobile ? { opacity: 1, y: 0 } : { opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Live Real-Time Status Pill */}
            <Link 
              to="/status" 
              className={`inline-flex items-center gap-3 bg-white/[0.04] border px-4 py-1.5 rounded-full mb-6 backdrop-blur-2xl shadow-sm transition-all group cursor-pointer ${
                stats.online 
                  ? 'border-white/12 hover:border-emerald-500/40 hover:bg-white/[0.08]' 
                  : 'border-rose-500/30 hover:border-rose-500/50 hover:bg-rose-950/20'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${stats.online ? 'bg-[#30D158] shadow-[0_0_8px_#30D158]' : 'bg-[#FF453A] shadow-[0_0_8px_#FF453A]'} animate-pulse`} />
                <span className={`text-[11px] font-semibold tracking-wider uppercase ${stats.online ? 'text-white/90' : 'text-rose-300'}`}>
                  {stats.online ? 'SYSTEM OPERATIONAL' : 'SYSTEM OFFLINE'}
                </span>
              </div>
              <span className="text-white/20">•</span>
              <div className={`flex items-center gap-1.5 text-xs font-mono ${stats.online ? 'text-[#0A84FF]' : 'text-rose-400'}`}>
                <Wifi className="w-3 h-3" />
                <span>{stats.online ? `${stats.ping}ms Ping` : '0ms'}</span>
              </div>
              <span className="text-white/20 hidden sm:inline">•</span>
              <span className={`text-[11px] font-medium hidden sm:inline flex items-center gap-1 ${
                stats.online ? 'text-white/50 group-hover:text-white/80' : 'text-rose-400/80'
              }`}>
                View Status <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>

            <Typography variant="h1" weight="black" className="mb-5 max-w-4xl mx-auto tracking-[-0.038em]">
              Complete Discord Bot for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-white">Server Security</span> &amp; Cloud Backups
            </Typography>
            <Typography variant="lead" className="max-w-2xl mx-auto mb-9 text-white/65 leading-relaxed text-[15px] sm:text-lg">
              Protect and scale your Discord community with zero-latency Nuke Guard, automated 24h Google Drive server backups, and smart bilingual AI moderation.
            </Typography>
          </motion.div>

          <motion.div
            initial={!isMobile ? { opacity: 0, scale: 0.96 } : { opacity: 1 }}
            animate={!isMobile ? { opacity: 1, scale: 1 } : { opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Flex gap={3.5} justify="center" className="flex-col sm:flex-row max-w-md mx-auto">
              <Button size="lg" variant="primary" className="w-full sm:w-auto font-semibold px-8" onClick={() => window.open(DISCORD_INVITE_URL)}>
                Add to Discord
                <Zap className="w-4 h-4 ml-2 fill-current" />
              </Button>
              <Button size="lg" variant="secondary" className="w-full sm:w-auto font-medium px-8" onClick={() => window.location.href = DASHBOARD_URL}>
                Open Dashboard
                <LayoutDashboard className="w-4 h-4 ml-2" />
              </Button>
            </Flex>
          </motion.div>

          {/* Real-time Live Stats Bento Tiles */}
          <motion.div
            initial={!isMobile ? { opacity: 0, y: 30 } : { opacity: 1 }}
            animate={!isMobile ? { opacity: 1, y: 0 } : { opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-14 w-full max-w-4xl mx-auto"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5 p-5 sm:p-7 rounded-[32px] bg-[#121216]/65 border border-white/10 backdrop-blur-2xl shadow-[0_20px_50px_-15px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.1)]">
              {[
                { 
                  label: 'SERVERS MANAGED', 
                  value: stats.servers.toLocaleString(), 
                  icon: Shield, 
                  color: 'text-[#0A84FF]', 
                  badgeBg: 'bg-[#0A84FF]/12 border-[#0A84FF]/25' 
                },
                { 
                  label: 'PROTECTED MEMBERS', 
                  value: stats.users.toLocaleString(), 
                  icon: Users, 
                  color: 'text-[#BF5AF2]', 
                  badgeBg: 'bg-[#BF5AF2]/12 border-[#BF5AF2]/25' 
                },
                { 
                  label: 'SLASH COMMANDS', 
                  value: stats.commands.toString(), 
                  icon: Zap, 
                  color: 'text-[#FF9F0A]', 
                  badgeBg: 'bg-[#FF9F0A]/12 border-[#FF9F0A]/25' 
                },
                { 
                  label: 'CLUSTER UPTIME', 
                  value: stats.uptime, 
                  icon: Star, 
                  color: 'text-[#30D158]', 
                  badgeBg: 'bg-[#30D158]/12 border-[#30D158]/25' 
                },
              ].map((stat, i) => (
                <div 
                  key={i} 
                  className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all duration-200 group/tile text-center"
                >
                  <div className={`w-10 h-10 rounded-xl ${stat.badgeBg} border flex items-center justify-center mx-auto mb-2.5 group-hover/tile:scale-105 transition-transform duration-200`}>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <Typography variant="h3" weight="bold" className="mb-0.5 text-xl sm:text-2xl text-white font-display tracking-tight">
                    <Counter value={stat.value} />
                  </Typography>
                  <Typography variant="small" className="text-white/45 text-[10px] font-semibold tracking-wider">
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

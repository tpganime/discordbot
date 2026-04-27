import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import { Music, Shield, Zap, Sparkles, Star, Users, MessageSquare, Headphones, Volume2, Mic2, Radio, Settings, Lock, Globe, Cpu, Layout, BarChart3, Layers } from 'lucide-react';
import { Container } from './ui/Container';
import { Section } from './ui/Section';
import { Typography } from './ui/Typography';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';

const TiltCard = ({ children, index }: { children: React.ReactNode; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 150 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXRelative = e.clientX - rect.left;
    const mouseYRelative = e.clientY - rect.top;

    const xPct = mouseXRelative / width - 0.5;
    const yPct = mouseYRelative / height - 0.5;

    x.set(xPct);
    y.set(yPct);

    mouseX.set(mouseXRelative);
    mouseY.set(mouseYRelative);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const glowBackground = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(37, 99, 235, 0.15), transparent 80%)`;
  const tiltShadow = useMotionTemplate`0 ${useSpring(useTransform(y, [-0.5, 0.5], [10, 40]), springConfig)}px ${useSpring(useTransform(y, [-0.5, 0.5], [20, 80]), springConfig)}px -20px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.05)`;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={!isMobile ? handleMouseMove : undefined}
      onMouseLeave={!isMobile ? handleMouseLeave : undefined}
      style={{
        perspective: !isMobile ? 1200 : undefined,
      }}
      initial={!isMobile ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.1,
        ease: [0.21, 0.47, 0.32, 0.98]
      }}
      className="relative h-full group"
    >
      <motion.div
        style={{
          rotateX: !isMobile ? rotateX : 0,
          rotateY: !isMobile ? rotateY : 0,
          transformStyle: 'preserve-3d',
          boxShadow: !isMobile ? tiltShadow : undefined,
        }}
        className="h-full rounded-[32px] transition-all duration-500"
      >
        <Card className="h-full relative overflow-hidden bg-white/[0.02] border-none rounded-[32px] hover:bg-white/[0.05] transition-colors duration-500">
          {!isMobile && (
            <motion.div 
              className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ background: glowBackground }}
            />
          )}
          <div style={{ transform: !isMobile ? 'translateZ(60px)' : 'none', transformStyle: 'preserve-3d' }} className="relative z-10 p-1">
            {children}
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

const features = [
  {
    title: 'Advanced Protection',
    description: 'Enterprise-grade Nuke Guard and RAID protection to keep your server secure at all times.',
    icon: Lock,
    color: 'text-red-500',
    bg: 'bg-red-500/10',
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
    description: 'Zero latency commands and instant responses across all global regions.',
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
    description: 'Manage your bot settings, commands, and server configurations from a beautiful web interface.',
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
            <TiltCard key={i} index={i}>
              <div className={`w-16 h-16 rounded-2xl ${feature.bg} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                <feature.icon className={`w-8 h-8 ${feature.color}`} />
              </div>
              <Typography variant="h4" weight="bold" className="mb-4 group-hover:text-blue-600 transition-colors duration-300">
                {feature.title}
              </Typography>
              <Typography variant="p" className="text-white/60">
                {feature.description}
              </Typography>
            </TiltCard>
          ))}
        </div>
      </Container>
    </Section>
  );
};

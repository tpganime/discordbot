import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Shield, Zap, Sparkles, Star, Users, MessageSquare, Lock, Cpu, Layout, Gift, Ticket, Bell } from 'lucide-react';
import { Container } from './ui/Container';
import { Section } from './ui/Section';
import { Typography } from './ui/Typography';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';

const TiltCard = ({ children, index }: { children: React.ReactNode; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 150 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isMobile) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: isMobile ? undefined : 1200,
      }}
      initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      whileInView={isMobile ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.6, 
        delay: isMobile ? 0 : index * 0.08,
        ease: [0.21, 0.47, 0.32, 0.98]
      }}
      className="relative h-full group transform-gpu"
    >
      <motion.div
        style={{
          rotateX: isMobile ? 0 : rotateX,
          rotateY: isMobile ? 0 : rotateY,
          transformStyle: isMobile ? undefined : 'preserve-3d',
        }}
        className="h-full rounded-[32px] transition-transform duration-300"
      >
        <Card className="h-full relative overflow-hidden liquid-glass border border-white/10 rounded-[32px] p-6 sm:p-8 bg-white/[0.02] hover:bg-white/[0.05] hover:border-blue-500/30">
          <div className="relative z-10">
            {children}
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

const features = [
  {
    title: 'Nuke Guard & Cloud Backups',
    description: 'Enterprise-grade disaster recovery with Google Drive OAuth2 integration for instant one-click channel and role restore.',
    icon: Lock,
    color: 'text-amber-400',
    bg: 'bg-amber-400/10',
  },
  {
    title: 'Smart Moderation & Automod',
    description: 'Real-time anti-spam rate limiting, attachment spam detection, banned word filters, and private mod logging.',
    icon: Shield,
    color: 'text-red-400',
    bg: 'bg-red-400/10',
  },
  {
    title: 'AI Intelligence & /imagine Art',
    description: 'Natural AI conversation engine, custom emoji generation, high-res generative art, and vision media analysis.',
    icon: Cpu,
    color: 'text-purple-400',
    bg: 'bg-purple-400/10',
  },
  {
    title: 'Interactive Support Tickets',
    description: 'Deploy beautiful dropdown ticket panels with category routing, intake questions, and automated transcript archives.',
    icon: Ticket,
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
  },
  {
    title: 'Giveaways & React Roles',
    description: 'Host interactive giveaways with edit/reroll tools and deploy emoji self-assignable role menus effortlessly.',
    icon: Gift,
    color: 'text-pink-400',
    bg: 'bg-pink-400/10',
  },
  {
    title: 'Liquid Glass Web Dashboard',
    description: 'Control every server plugin, configure custom prefixes, toggle modules, and preview welcome cards in real time.',
    icon: Layout,
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10',
  },
];

export const Features = () => {
  return (
    <Section spacing="xl" id="features" className="bg-transparent pt-12 pb-32">
      <Container size="xl">
        <div className="text-center mb-24">
          <Badge variant="secondary" className="mb-6">
            <Star className="w-3 h-3 mr-2 text-blue-400" />
            Core Capabilities
          </Badge>
          <Typography variant="h2" weight="black" className="mb-6">
            Everything You Need <br /> To <span className="text-blue-500">Supercharge</span> Your Server
          </Typography>
          <Typography variant="lead" className="max-w-2xl mx-auto text-white/60">
            From automated Google Drive backups to next-gen AI conversation and anti-spam moderation.
          </Typography>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <TiltCard key={i} index={i}>
              <div className={`w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className={`w-7 h-7 ${feature.color}`} />
              </div>
              <Typography variant="h4" weight="bold" className="mb-3 text-white group-hover:text-blue-400 transition-colors">
                {feature.title}
              </Typography>
              <Typography variant="p" className="text-white/60 text-sm leading-relaxed">
                {feature.description}
              </Typography>
            </TiltCard>
          ))}
        </div>
      </Container>
    </Section>
  );
};

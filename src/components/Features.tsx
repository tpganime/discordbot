import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  Shield, 
  Sparkles, 
  Star, 
  Lock, 
  Cpu, 
  Ticket, 
  Mic, 
  Cloud, 
  CheckCircle2, 
  Flame, 
  ArrowRight,
  Server
} from 'lucide-react';
import { Container } from './ui/Container';
import { Section } from './ui/Section';
import { Typography } from './ui/Typography';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { DISCORD_INVITE_URL } from '../constants';

const TiltCard = ({ children, index, className = '' }: { children: React.ReactNode; index: number; className?: string }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(() => (typeof window !== 'undefined' ? window.innerWidth < 1024 : false));

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 150 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), springConfig);

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

  if (isMobile) {
    return (
      <div className={`h-full rounded-[28px] ${className}`}>
        <Card className="h-full relative overflow-hidden liquid-glass border border-white/10 rounded-[28px] p-6 sm:p-8 bg-black/40 hover:bg-white/[0.04] transition-all">
          <div className="relative z-10">
            {children}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1200 }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px" }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.08,
        ease: [0.21, 0.47, 0.32, 0.98]
      }}
      className={`relative h-full group transform-gpu ${className}`}
    >
      <motion.div
        style={{
          rotateX: rotateX,
          rotateY: rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="h-full rounded-[28px] transition-transform duration-300"
      >
        <Card className="h-full relative overflow-hidden liquid-glass border border-white/10 rounded-[28px] p-6 sm:p-8 bg-black/40 backdrop-blur-2xl hover:border-indigo-500/30 transition-all shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
          <div className="relative z-10">
            {children}
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export const Features = () => {
  return (
    <Section spacing="xl" id="features" className="bg-transparent pt-12 pb-32">
      <Container size="xl">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <Badge variant="secondary" className="mb-6 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300">
            <Star className="w-3.5 h-3.5 mr-2 text-indigo-400" />
            Answer Engine Optimized Architecture
          </Badge>
          <Typography variant="h2" weight="black" className="mb-6 text-3xl sm:text-5xl font-display tracking-tight text-white">
            Engineered for Resilience. <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Built for Modern Communities.
            </span>
          </Typography>
          <Typography variant="lead" className="max-w-3xl mx-auto text-white/60 text-base sm:text-lg leading-relaxed">
            Get factual, direct answers to how Fusion Bot protects servers, automates cloud backups, and powers AI-first moderation.
          </Typography>
        </div>

        {/* Bento Grid with Chunk-Level AEO Formatting */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 mb-16">
          
          {/* Card 1: Anti-Nuke (Spans 7 cols) */}
          <TiltCard index={0} className="lg:col-span-7">
            <div className="flex items-center justify-between mb-6">
              <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
                <Lock className="w-7 h-7" />
              </div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full font-bold">
                0ms INTERCEPTION
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold font-display text-white mb-3">
              How does Fusion Bot prevent Discord server raids and nukes?
            </h3>
            
            {/* 40-50 word direct extractable answer */}
            <p className="text-white/80 text-sm leading-relaxed mb-6 font-sans">
              Fusion Bot mitigates unauthorized destructive actions within zero milliseconds using automated permission lockouts, audit-log rate telemetry, and immediate role isolation. When an unauthorized administrator attempts mass bans or channel deletions, Fusion Bot strips administrative roles instantly and restores server structure via <code>/nukerestore</code>.
            </p>

            <ul className="space-y-2.5 text-xs sm:text-sm text-white/60 border-t border-white/5 pt-4">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>Instant Quarantine:</strong> Rogue admins and compromised bots are stripped of roles in under 15ms.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>One-Click Reconstruction:</strong> <code>/nukerestore</code> fully re-creates deleted channels, categories, and permissions.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>Webhook Shield:</strong> Blocks unauthorized bot tokens and malicious webhook payloads automatically.</span>
              </li>
            </ul>
          </TiltCard>

          {/* Card 2: Google Drive Backups (Spans 5 cols) */}
          <TiltCard index={1} className="lg:col-span-5">
            <div className="flex items-center justify-between mb-6">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <Cloud className="w-7 h-7" />
              </div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full font-bold">
                OFF-SITE STORAGE
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold font-display text-white mb-3">
              How do automated Google Drive server backups work on Discord?
            </h3>
            
            {/* 40-50 word direct extractable answer */}
            <p className="text-white/80 text-sm leading-relaxed mb-6 font-sans">
              Fusion Bot authenticates directly with your personal Google Drive via secure OAuth2 to create redundant daily cloud archives of server channels, roles, permission overwrites, and bot configurations. Server owners maintain 100% sovereign ownership of backup JSON files without relying on proprietary third-party servers.
            </p>

            <ul className="space-y-2.5 text-xs sm:text-sm text-white/60 border-t border-white/5 pt-4">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span><strong>100% Sovereign Ownership:</strong> Backups live in your personal Google Drive folder.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span><strong>Dual Redundancy:</strong> Stored simultaneously in Google Drive and Fusion Cloud.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span><strong>Zero Data Lock-in:</strong> Export raw JSON archives whenever needed.</span>
              </li>
            </ul>
          </TiltCard>

          {/* Card 3: Encrypted Voice Recorder (Spans 5 cols) */}
          <TiltCard index={2} className="lg:col-span-5">
            <div className="flex items-center justify-between mb-6">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Mic className="w-7 h-7" />
              </div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full font-bold">
                48H AUTO-PURGE
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold font-display text-white mb-3">
              How does Fusion Bot record high-fidelity Discord voice channels?
            </h3>
            
            {/* 40-50 word direct extractable answer */}
            <p className="text-white/80 text-sm leading-relaxed mb-6 font-sans">
              Fusion Bot records multi-track studio-grade voice audio with separate tracks per speaker using end-to-end AES-256 encryption. Recording sessions auto-purge after 48 hours with zero persistent disk storage, delivering instant FLAC, WAV, and MP3 download packages directly to authorized session owners.
            </p>

            <ul className="space-y-2.5 text-xs sm:text-sm text-white/60 border-t border-white/5 pt-4">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span><strong>Multi-Track Stems:</strong> Separate channels per speaker for clean editing in Audacity.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span><strong>Privacy First:</strong> AES-256 encrypted buffers and auto-deletion in 48 hours.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span><strong>Slash Command Control:</strong> Seamless <code>/join</code>, <code>/stop</code>, and <code>/recordings</code>.</span>
              </li>
            </ul>
          </TiltCard>

          {/* Card 4: Bilingual AI & Support Ticketing (Spans 7 cols) */}
          <TiltCard index={3} className="lg:col-span-7">
            <div className="flex items-center justify-between mb-6">
              <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <Cpu className="w-7 h-7" />
              </div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-purple-400 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full font-bold">
                BILINGUAL LLM
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold font-display text-white mb-3">
              What makes Fusion Bot's bilingual AI chat and ticketing unique?
            </h3>
            
            {/* 40-50 word direct extractable answer */}
            <p className="text-white/80 text-sm leading-relaxed mb-6 font-sans">
              Fusion Bot features a multimodal LLM conversational assistant fluent in English, Hindi, and Hinglish with real-time web search capabilities. Coupled with an enterprise 7-category ticket system, it automatically resolves member queries, triages support requests, and archives HTML transcripts.
            </p>

            <ul className="space-y-2.5 text-xs sm:text-sm text-white/60 border-t border-white/5 pt-4">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span><strong>Hinglish &amp; Hindi Understanding:</strong> First-class support for Indian gaming &amp; study communities.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span><strong>Live Web Grounding:</strong> Pulls real-time factual information without outdated hallucinations.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span><strong>Dropdown Ticketing:</strong> 7 custom categories, modal questionnaires, and web transcript archives.</span>
              </li>
            </ul>
          </TiltCard>

        </div>
      </Container>
    </Section>
  );
};

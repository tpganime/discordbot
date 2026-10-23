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

  const springConfig = { damping: 25, stiffness: 180 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), springConfig);

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
        <Card className="h-full relative overflow-hidden bento-card p-6 sm:p-8 bg-[#141418]/70 border border-white/10">
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
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ 
        duration: 0.55, 
        delay: index * 0.07,
        ease: [0.16, 1, 0.3, 1]
      }}
      className={`relative h-full group transform-gpu ${className}`}
    >
      <motion.div
        style={{
          rotateX: rotateX,
          rotateY: rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="h-full rounded-[28px] transition-transform duration-200"
      >
        <Card className="h-full relative overflow-hidden bento-card p-7 sm:p-9 bg-[#141418]/70 backdrop-blur-2xl border border-white/10 shadow-[0_24px_60px_-16px_rgba(0,0,0,0.7)] group-hover:border-white/20">
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
    <Section spacing="xl" id="features" className="bg-transparent pt-12 pb-28">
      <Container size="xl">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <Badge variant="secondary" className="mb-4 px-3.5 py-1 rounded-full border border-blue-500/25 bg-blue-500/10 text-[#0A84FF] text-xs font-semibold tracking-wide">
            <Star className="w-3.5 h-3.5 mr-1.5 text-[#0A84FF]" />
            Core Capabilities &amp; Architecture
          </Badge>
          <Typography variant="h2" weight="black" className="mb-5 text-3xl sm:text-5xl font-display tracking-[-0.03em] text-white">
            Engineered for Resilience. <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-white bg-clip-text text-transparent">
              Built for Modern Communities.
            </span>
          </Typography>
          <Typography variant="lead" className="max-w-2xl mx-auto text-white/65 text-base sm:text-lg leading-relaxed">
            Direct, factual insights into how Fusion Bot protects servers, automates Google Drive backups, and powers AI moderation.
          </Typography>
        </div>

        {/* Bento Grid with Chunk-Level AEO Formatting */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 mb-16">
          
          {/* Card 1: Anti-Nuke (Spans 7 cols) */}
          <TiltCard index={0} className="lg:col-span-7">
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#FF453A]/12 border border-[#FF453A]/25 flex items-center justify-center text-[#FF453A] shadow-sm">
                <Lock className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#30D158] bg-[#30D158]/10 border border-[#30D158]/25 px-3 py-1 rounded-full font-semibold">
                0ms INTERCEPTION
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold font-display text-white mb-3 tracking-[-0.02em]">
              How does Fusion Bot prevent Discord server raids and nukes?
            </h3>
            
            {/* 40-50 word direct extractable answer */}
            <p className="text-white/75 text-[14.5px] leading-relaxed mb-6 font-sans">
              Fusion Bot mitigates unauthorized destructive actions within zero milliseconds using automated permission lockouts, audit-log rate telemetry, and immediate role isolation. When an unauthorized administrator attempts mass bans or channel deletions, Fusion Bot strips administrative roles instantly and restores server structure via <code>/nukerestore</code>.
            </p>

            <ul className="space-y-2.5 text-xs sm:text-sm text-white/65 border-t border-white/8 pt-4">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#30D158] shrink-0" />
                <span><strong>Instant Quarantine:</strong> Rogue admins and compromised bots are stripped of roles in under 15ms.</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#30D158] shrink-0" />
                <span><strong>One-Click Reconstruction:</strong> <code>/nukerestore</code> fully re-creates deleted channels, categories, and permissions.</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#30D158] shrink-0" />
                <span><strong>Webhook Shield:</strong> Blocks unauthorized bot tokens and malicious webhook payloads automatically.</span>
              </li>
            </ul>
          </TiltCard>

          {/* Card 2: Google Drive Backups (Spans 5 cols) */}
          <TiltCard index={1} className="lg:col-span-5">
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#0A84FF]/12 border border-[#0A84FF]/25 flex items-center justify-center text-[#0A84FF] shadow-sm">
                <Cloud className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#0A84FF] bg-[#0A84FF]/10 border border-[#0A84FF]/25 px-3 py-1 rounded-full font-semibold">
                OFF-SITE STORAGE
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold font-display text-white mb-3 tracking-[-0.02em]">
              How do automated Google Drive server backups work on Discord?
            </h3>
            
            {/* 40-50 word direct extractable answer */}
            <p className="text-white/75 text-[14.5px] leading-relaxed mb-6 font-sans">
              Fusion Bot authenticates directly with your personal Google Drive via secure OAuth2 to create redundant daily cloud archives of server channels, roles, permission overwrites, and bot configurations. Server owners maintain 100% sovereign ownership of backup JSON files without relying on proprietary third-party servers.
            </p>

            <ul className="space-y-2.5 text-xs sm:text-sm text-white/65 border-t border-white/8 pt-4">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#0A84FF] shrink-0" />
                <span><strong>100% Sovereign Ownership:</strong> Backups live in your personal Google Drive folder.</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#0A84FF] shrink-0" />
                <span><strong>Dual Redundancy:</strong> Stored simultaneously in Google Drive and Fusion Cloud.</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#0A84FF] shrink-0" />
                <span><strong>Zero Data Lock-in:</strong> Export raw JSON archives whenever needed.</span>
              </li>
            </ul>
          </TiltCard>

          {/* Card 3: Encrypted Voice Recorder (Spans 5 cols) */}
          <TiltCard index={2} className="lg:col-span-5">
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#FF9F0A]/12 border border-[#FF9F0A]/25 flex items-center justify-center text-[#FF9F0A] shadow-sm">
                <Mic className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#FF9F0A] bg-[#FF9F0A]/10 border border-[#FF9F0A]/25 px-3 py-1 rounded-full font-semibold">
                48H AUTO-PURGE
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold font-display text-white mb-3 tracking-[-0.02em]">
              How does Fusion Bot record high-fidelity Discord voice channels?
            </h3>
            
            {/* 40-50 word direct extractable answer */}
            <p className="text-white/75 text-[14.5px] leading-relaxed mb-6 font-sans">
              Fusion Bot records multi-track studio-grade voice audio with separate tracks per speaker using end-to-end AES-256 encryption. Recording sessions auto-purge after 48 hours with zero persistent disk storage, delivering instant FLAC, WAV, and MP3 download packages directly to authorized session owners.
            </p>

            <ul className="space-y-2.5 text-xs sm:text-sm text-white/65 border-t border-white/8 pt-4">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#FF9F0A] shrink-0" />
                <span><strong>Multi-Track Stems:</strong> Separate channels per speaker for clean editing in Audacity.</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#FF9F0A] shrink-0" />
                <span><strong>Privacy First:</strong> AES-256 encrypted buffers and auto-deletion in 48 hours.</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#FF9F0A] shrink-0" />
                <span><strong>Slash Command Control:</strong> Seamless <code>/join</code>, <code>/stop</code>, and <code>/recordings</code>.</span>
              </li>
            </ul>
          </TiltCard>

          {/* Card 4: Bilingual AI & Support Ticketing (Spans 7 cols) */}
          <TiltCard index={3} className="lg:col-span-7">
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#BF5AF2]/12 border border-[#BF5AF2]/25 flex items-center justify-center text-[#BF5AF2] shadow-sm">
                <Cpu className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#BF5AF2] bg-[#BF5AF2]/10 border border-[#BF5AF2]/25 px-3 py-1 rounded-full font-semibold">
                BILINGUAL LLM
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold font-display text-white mb-3 tracking-[-0.02em]">
              What makes Fusion Bot's bilingual AI chat and ticketing unique?
            </h3>
            
            {/* 40-50 word direct extractable answer */}
            <p className="text-white/75 text-[14.5px] leading-relaxed mb-6 font-sans">
              Fusion Bot features a multimodal LLM conversational assistant fluent in English, Hindi, and Hinglish with real-time web search capabilities. Coupled with an enterprise 7-category ticket system, it automatically resolves member queries, triages support requests, and archives HTML transcripts.
            </p>

            <ul className="space-y-2.5 text-xs sm:text-sm text-white/65 border-t border-white/8 pt-4">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#BF5AF2] shrink-0" />
                <span><strong>Hinglish &amp; Hindi Understanding:</strong> First-class support for Indian gaming &amp; study communities.</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#BF5AF2] shrink-0" />
                <span><strong>Live Web Grounding:</strong> Pulls real-time factual information without outdated hallucinations.</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#BF5AF2] shrink-0" />
                <span><strong>Dropdown Ticketing:</strong> 7 custom categories, modal questionnaires, and web transcript archives.</span>
              </li>
            </ul>
          </TiltCard>

        </div>
      </Container>
    </Section>
  );
};

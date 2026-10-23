import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Lock, Database, RefreshCw, Zap, ShieldCheck } from 'lucide-react';
import { Container } from './ui/Container';
import { Section } from './ui/Section';
import { Typography } from './ui/Typography';
import { Badge } from './ui/Badge';

const features = [
  {
    title: 'Instant Backup',
    description: 'Automatically back up your server structure, roles, and permissions to our secure cloud.',
    icon: Database,
    color: 'text-[#0A84FF]',
    bg: 'bg-[#0A84FF]/12 border-[#0A84FF]/25',
  },
  {
    title: 'One-Click Restore',
    description: 'Restore your entire server to a previous state in seconds if a nuke attempt occurs.',
    icon: RefreshCw,
    color: 'text-[#30D158]',
    bg: 'bg-[#30D158]/12 border-[#30D158]/25',
  },
  {
    title: 'Drive Integration',
    description: 'Securely authorize your own Google Drive for an extra layer of backup redundancy.',
    icon: Lock,
    color: 'text-[#BF5AF2]',
    bg: 'bg-[#BF5AF2]/12 border-[#BF5AF2]/25',
  }
];

export const NukeGuard = () => {
  const [isMobile, setIsMobile] = React.useState(() => (typeof window !== 'undefined' ? window.innerWidth < 1024 : false));

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <Section spacing="xl" className="relative overflow-hidden py-24">
      {/* Background Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-blue-600/8 blur-[120px] rounded-full pointer-events-none hidden md:block" />
      
      <Container size="xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={isMobile ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
            whileInView={isMobile ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <Badge variant="primary" className="mb-5 px-3.5 py-1 rounded-full border border-blue-500/25 bg-blue-500/10 text-[#0A84FF] text-xs font-semibold tracking-wide">
              <ShieldAlert className="w-3.5 h-3.5 mr-1.5 text-[#0A84FF]" />
              Automated Defense Architecture
            </Badge>
            <Typography variant="h2" weight="black" className="mb-6 text-3xl sm:text-5xl font-display tracking-[-0.03em] text-white">
              Enterprise <span className="bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">Nuke Guard</span> Shield
            </Typography>
            <Typography variant="lead" className="mb-10 text-white/65 text-base sm:text-lg leading-relaxed">
              Never worry about rogue administrators or compromised tokens again. Fusion's Nuke Guard provides automated zero-latency role stripping and instant one-click disaster reconstruction.
            </Typography>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, i) => (
                <div key={i} className="p-5 rounded-[22px] bg-[#121216]/65 border border-white/8 backdrop-blur-xl">
                  <div className={`w-10 h-10 rounded-xl ${feature.bg} border flex items-center justify-center mb-3 shadow-sm`}>
                    <feature.icon className={`w-5 h-5 ${feature.color}`} />
                  </div>
                  <Typography variant="h4" weight="bold" className="text-white text-[15px] mb-1 tracking-tight">{feature.title}</Typography>
                  <Typography variant="caption" className="text-white/60 text-xs leading-relaxed">
                    {feature.description}
                  </Typography>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={isMobile ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            whileInView={isMobile ? undefined : { opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="p-8 sm:p-9 rounded-[32px] bg-[#141418]/75 border border-white/10 backdrop-blur-2xl shadow-[0_24px_60px_-16px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.1)] relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-[#0A84FF]/12 border border-[#0A84FF]/25 flex items-center justify-center shadow-sm">
                    <ShieldAlert className="w-5 h-5 text-[#0A84FF]" />
                  </div>
                  <div>
                    <Typography variant="h4" weight="bold" className="text-white text-base tracking-tight">Nuke Guard</Typography>
                    <Typography variant="small" className="text-[#30D158] font-bold text-[10px] tracking-wider">ACTIVE &amp; MONITORING</Typography>
                  </div>
                </div>
                <Zap className="w-5 h-5 text-[#0A84FF] animate-pulse" />
              </div>

              <div className="space-y-4">
                {[
                  { label: 'Cloud Server Backup', status: 'Secured & Synchronized' },
                  { label: 'Automated 24h Backup', status: 'Active (Daily at 00:00 UTC)' },
                  { label: 'Role & Audit Interceptor', status: 'Zero-Latency Quarantine' },
                ].map((item, i) => (
                  <div key={i} className="p-4 rounded-[18px] bg-white/[0.03] border border-white/6 flex items-center justify-between">
                    <div>
                      <Typography variant="small" weight="bold" className="text-white text-xs tracking-tight normal-case">{item.label}</Typography>
                    </div>
                    <span className="text-[11px] font-semibold text-[#30D158] bg-[#30D158]/10 border border-[#30D158]/25 px-2.5 py-0.5 rounded-full">
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/8">
                <div className="flex items-center justify-between mb-3">
                  <Typography variant="small" className="text-white/50 text-xs">Protection Coverage</Typography>
                  <Typography variant="small" className="text-[#0A84FF] font-bold text-xs">100% MAXIMUM</Typography>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full bg-gradient-to-r from-[#0A84FF] to-[#30D158]" 
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
};

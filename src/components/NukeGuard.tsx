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
  },
  {
    title: 'One-Click Restore',
    description: 'Restore your entire server to a previous state in seconds if a nuke attempt occurs.',
    icon: RefreshCw,
  },
  {
    title: 'Drive Integration',
    description: 'Securely authorize your own Google Drive for an extra layer of backup redundancy.',
    icon: Lock,
  },
  {
    title: 'Real-time Protection',
    description: 'Our system detects and blocks suspicious administrative actions before they cause damage.',
    icon: ShieldCheck,
  }
];

export const NukeGuard = () => {
  return (
    <Section spacing="xl" className="relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
      
      <Container size="xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Badge variant="primary" className="mb-8">
              <ShieldAlert className="w-3 h-3 mr-2" />
              Advanced Security
            </Badge>
            <Typography variant="h2" weight="black" className="mb-8">
              Ultimate <span className="text-blue-600">Nuke Guard</span> Protection
            </Typography>
            <Typography variant="lead" className="mb-12 text-white/60">
              Never worry about server raids or rogue administrators again. Fusion's Nuke Guard provides 
              enterprise-grade protection and recovery tools for your community.
            </Typography>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {features.map((feature, i) => (
                <div key={i} className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <Typography variant="h4" weight="bold">{feature.title}</Typography>
                  <Typography variant="p" className="text-sm text-white/40 leading-relaxed">
                    {feature.description}
                  </Typography>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="glass p-8 rounded-[40px] border-white/10 relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center">
                    <ShieldAlert className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <Typography variant="h4" weight="bold">Nuke Guard</Typography>
                    <Typography variant="small" className="text-green-500 font-bold">ACTIVE & PROTECTED</Typography>
                  </div>
                </div>
                <Zap className="w-6 h-6 text-blue-600 animate-pulse" />
              </div>

              <div className="space-y-6">
                {[
                  { label: 'Server Backup', status: 'Completed', time: '2 mins ago' },
                  { label: 'Rogue Detection', status: 'Monitoring', time: 'Real-time' },
                  { label: 'Role Protection', status: 'Enabled', time: 'Permanent' },
                ].map((item, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
                    <div>
                      <Typography variant="small" weight="bold">{item.label}</Typography>
                      <Typography variant="p" className="text-[10px] text-white/40">{item.time}</Typography>
                    </div>
                    <Badge variant="secondary" className="text-[10px]">{item.status}</Badge>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-white/5">
                <div className="flex items-center justify-between mb-4">
                  <Typography variant="small" className="text-white/40">Protection Level</Typography>
                  <Typography variant="small" className="text-blue-600 font-bold">MAXIMUM</Typography>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className="h-full bg-blue-600" 
                  />
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-600/20 blur-3xl rounded-full" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-600/20 blur-3xl rounded-full" />
          </motion.div>
        </div>
      </Container>
    </Section>
  );
};

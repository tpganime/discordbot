import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Zap, ShieldCheck, TrendingUp, UserPlus, 
  MessageSquare, PlusCircle, Bug, Layout, Megaphone
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { Typography } from '../components/ui/Typography';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

const updates = [
  {
    title: 'Advanced Anti-Spam Protection',
    description: 'Detects spam, repeated messages, and suspicious activity. Automatically takes action to prevent disruptions and reduces the need for manual moderation.',
    icon: ShieldCheck,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10'
  },
  {
    title: 'New Leveling System',
    description: 'Users earn XP through server activity. Encourages consistent interaction and builds a more active and competitive community.',
    icon: TrendingUp,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10'
  },
  {
    title: 'Auto Role Assignment',
    description: 'Automatically assigns roles to new members. Saves time for admins and moderators and ensures instant and accurate role distribution.',
    icon: UserPlus,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10'
  },
  {
    title: 'Suggestion & Bug Report System',
    description: 'Use the /suggestion command to submit ideas or report issues. Enables direct user feedback and helps improve future updates.',
    icon: MessageSquare,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10'
  },
  {
    title: 'New Features Added',
    description: 'Added multiple new features across the bot. Improved usability and functionality with continuous upgrades for better experience.',
    icon: PlusCircle,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10'
  },
  {
    title: 'Bug Fixes & Performance Improvements',
    description: 'Fixed known bugs and glitches. Improved response time and command handling while optimizing backend performance.',
    icon: Bug,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10'
  },
  {
    title: 'Dashboard Redesign',
    description: 'Cleaner and modern interface with improved navigation and accessibility. Easier access to all features and settings.',
    icon: Layout,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10'
  }
];

export const UpdatesPage = () => {
  return (
    <main className="pt-32 pb-24">
      <Section spacing="xl">
        <Container size="xl">
          <Link to="/" className="inline-flex items-center gap-2 text-white/40 hover:text-white mb-12 transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="primary" className="mb-6 uppercase tracking-widest">
                <Megaphone className="w-3 h-3 mr-2" />
                Latest Release
              </Badge>
              <Typography variant="h1" weight="black" className="mb-6">
                Fusion Bot — Official <br className="hidden sm:block" /> <span className="text-blue-600">Update Release</span>
              </Typography>
              <Typography variant="lead" className="max-w-3xl mx-auto text-white/60">
                This update introduces major improvements focused on security, automation, engagement, 
                and overall user experience. Alongside core system upgrades, several new features 
                have been added to make the bot more powerful and efficient for all servers.
              </Typography>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {updates.map((update, i) => (
              <motion.div
                key={update.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Card className="glass h-full p-8 border-white/5 hover:border-blue-600/30 transition-all duration-500 group flex flex-col justify-between">
                  <div>
                    <div className={`w-12 h-12 rounded-2xl ${update.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      <update.icon className={`w-6 h-6 ${update.color}`} />
                    </div>
                    <Typography variant="h4" weight="black" className="mb-4">
                      {update.title}
                    </Typography>
                    <Typography variant="p" className="text-white/40 text-sm leading-relaxed">
                      {update.description}
                    </Typography>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-20 p-12 glass rounded-[40px] border border-blue-600/20 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-blue-600/5 blur-3xl rounded-full" />
            <Typography variant="p" className="text-blue-400 font-bold uppercase tracking-[0.2em] mb-4 relative z-10">
              Evolution in Progress
            </Typography>
            <Typography variant="lead" className="text-white/60 relative z-10">
              This update enhances Fusion Bot’s performance, security, and overall experience. 
              More powerful features are coming soon.
            </Typography>
          </motion.div>
        </Container>
      </Section>
    </main>
  );
};

export default UpdatesPage;

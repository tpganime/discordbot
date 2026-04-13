import React from 'react';
import { motion } from 'framer-motion';
import { Shield, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { Typography } from '../components/ui/Typography';

export const PrivacyPage = () => {
  return (
    <main className="pt-32 pb-24">
      <Section spacing="xl">
        <Container size="md">
          <Link to="/" className="inline-flex items-center gap-2 text-white/40 hover:text-white mb-12 transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-16 h-16 rounded-2xl bg-blue-600/20 flex items-center justify-center mb-8">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <Typography variant="h1" weight="black" className="mb-8">
              Privacy <span className="text-blue-600">Policy</span>
            </Typography>
            
            <div className="glass p-8 md:p-12 rounded-[32px] border-white/5 space-y-8">
              <section>
                <Typography variant="h4" weight="bold" className="mb-4 text-blue-500">Data Access</Typography>
                <Typography variant="p" className="text-white/60 leading-relaxed">
                  We access user Google Drive to store their server data only for nuke protection. 
                  All process are end to end encrypted no one can access in between accept bot.
                </Typography>
              </section>

              <section>
                <Typography variant="h4" weight="bold" className="mb-4 text-blue-500">Data Security</Typography>
                <Typography variant="p" className="text-white/60 leading-relaxed">
                  We prioritize server security and user privacy above all else. All data stored 
                  is encrypted and used strictly for the functionality of the bot's protection features.
                </Typography>
              </section>

              <section>
                <Typography variant="h4" weight="bold" className="mb-4 text-blue-500">Third-Party Services</Typography>
                <Typography variant="p" className="text-white/60 leading-relaxed">
                  Fusion Bot interacts with Discord's API and Google Drive API. We do not share 
                  your information with any other third-party services.
                </Typography>
              </section>
            </div>
          </motion.div>
        </Container>
      </Section>
    </main>
  );
};

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { Typography } from '../components/ui/Typography';
import { Nav } from '../components/Nav';
import { Footer } from '../components/Footer';

export const TermsPage = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Nav />
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
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
              <Typography variant="h1" weight="black" className="mb-8">
                Terms of <span className="text-blue-600">Use</span>
              </Typography>
              
              <div className="glass p-8 md:p-12 rounded-[32px] border-white/5 space-y-8">
                <section>
                  <Typography variant="h4" weight="bold" className="mb-4 text-blue-500">Agreement</Typography>
                  <Typography variant="p" className="text-white/60 leading-relaxed">
                    By using Fusion, you agree to our terms of service. We prioritize server security 
                    and user privacy above all else.
                  </Typography>
                </section>

                <section>
                  <Typography variant="h4" weight="bold" className="mb-4 text-blue-500">Usage Restrictions</Typography>
                  <Typography variant="p" className="text-white/60 leading-relaxed">
                    Users are prohibited from using Fusion Bot for any illegal activities or 
                    violating Discord's Terms of Service. Any abuse of the bot's features 
                    may lead to a permanent ban from using our services.
                  </Typography>
                </section>

                <section>
                  <Typography variant="h4" weight="bold" className="mb-4 text-blue-500">Liability</Typography>
                  <Typography variant="p" className="text-white/60 leading-relaxed">
                    While we strive for 100% uptime and security, Fusion Bot is provided "as is". 
                    We are not responsible for any data loss or server issues resulting from 
                    misconfiguration by server administrators.
                  </Typography>
                </section>
              </div>
            </motion.div>
          </Container>
        </Section>
      </main>
      <Footer />
    </div>
  );
};

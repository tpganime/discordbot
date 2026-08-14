import React from 'react';
import { motion } from 'framer-motion';
import { Shield, ArrowLeft, Database, ShieldAlert, Cpu, Key, Trash2, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { Typography } from '../components/ui/Typography';
import { SUPPORT_EMAIL, SUPPORT_SERVER_URL, DASHBOARD_URL } from '../constants';

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
            <Typography variant="h1" weight="black" className="mb-3">
              Privacy <span className="text-blue-600">Policy</span>
            </Typography>
            <Typography variant="small" className="text-white/40 mb-10 block">
              Effective & Last Updated: August 2026
            </Typography>
            
            <div className="glass p-8 md:p-12 rounded-[32px] border-white/5 space-y-8">
              <section className="space-y-3">
                <Typography variant="h4" weight="bold" className="text-blue-500 flex items-center gap-2">
                  <Shield className="w-5 h-5" /> 1. Introduction & Legal Entity
                </Typography>
                <Typography variant="p" className="text-white/70 leading-relaxed text-sm">
                  <strong>CHAUDHARY TANMAY</strong>, operating as <strong>FUSIONHUB TEAM</strong>, owns and operates <strong>Fusion Bot</strong> and the web dashboard at <a href={DASHBOARD_URL} className="text-blue-400 hover:underline">panel.fusionhub.in</a>. We are committed to safeguarding your privacy and ensuring transparent data processing practices.
                </Typography>
              </section>

              <section className="space-y-3">
                <Typography variant="h4" weight="bold" className="text-blue-500 flex items-center gap-2">
                  <Database className="w-5 h-5" /> 2. Information We Collect
                </Typography>
                <ul className="list-disc list-inside space-y-2 text-white/70 text-sm">
                  <li><strong>Discord Identifiers:</strong> User IDs, Guild (Server) IDs, Channel IDs, and Role IDs required for command routing.</li>
                  <li><strong>Server Configuration:</strong> Custom prefixes, welcome/leave channels, ticket panel options, reaction roles, and automod word lists.</li>
                  <li><strong>OAuth2 Tokens:</strong> Encrypted tokens for Web Dashboard sessions and Google Drive server backup authentication.</li>
                  <li><strong>Snapshot Structure Metadata:</strong> Channel hierarchy and role positions when server owners execute <code>/nukebackup</code>.</li>
                </ul>
              </section>

              <section className="space-y-3">
                <Typography variant="h4" weight="bold" className="text-red-400 flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5" /> 3. Information We DO NOT Collect
                </Typography>
                <ul className="list-disc list-inside space-y-2 text-white/70 text-sm">
                  <li>We do <strong>NOT</strong> collect or store private direct messages (DMs) between users.</li>
                  <li>We do <strong>NOT</strong> collect financial details, credit card numbers, or physical home addresses.</li>
                  <li>We do <strong>NOT</strong> sell, rent, or trade your Discord data to third-party data brokers or advertisers.</li>
                </ul>
              </section>

              <section className="space-y-3">
                <Typography variant="h4" weight="bold" className="text-blue-500 flex items-center gap-2">
                  <Cpu className="w-5 h-5" /> 4. How Data Is Used
                </Typography>
                <Typography variant="p" className="text-white/70 leading-relaxed text-sm">
                  Collected data is strictly used to execute requested bot commands, sync server settings configured on the web dashboard in real time, filter spam and harmful attachments via automod, and restore channel backups upon owner request.
                </Typography>
              </section>

              <section className="space-y-3">
                <Typography variant="h4" weight="bold" className="text-blue-500 flex items-center gap-2">
                  <Key className="w-5 h-5" /> 5. Data Storage & Security
                </Typography>
                <Typography variant="p" className="text-white/70 leading-relaxed text-sm">
                  All configuration data and database records are hosted on secure servers with encrypted connections (HTTPS/TLS) and restricted developer access.
                </Typography>
              </section>

              <section className="space-y-3">
                <Typography variant="h4" weight="bold" className="text-blue-500 flex items-center gap-2">
                  <Trash2 className="w-5 h-5" /> 6. Data Retention & Deletion Rights
                </Typography>
                <Typography variant="p" className="text-white/70 leading-relaxed text-sm">
                  Server administrators have the right to request the complete deletion of their stored guild settings at any time by emailing <strong>{SUPPORT_EMAIL}</strong>. Upon request or bot removal, all associated guild data will be permanently purged within 30 business days.
                </Typography>
              </section>

              <section className="space-y-3 pt-4 border-t border-white/5">
                <Typography variant="h4" weight="bold" className="text-blue-500 flex items-center gap-2">
                  <Mail className="w-5 h-5" /> 7. Data Controller Contact
                </Typography>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <p className="text-xs text-white/80"><strong>Data Controller:</strong> CHAUDHARY TANMAY</p>
                  <p className="text-xs text-white/80"><strong>Official Privacy & Support Email:</strong> <a href={`mailto:${SUPPORT_EMAIL}`} className="text-blue-400 hover:underline">{SUPPORT_EMAIL}</a></p>
                  <p className="text-xs text-white/80"><strong>Discord Support Community:</strong> <a href={SUPPORT_SERVER_URL} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">{SUPPORT_SERVER_URL}</a></p>
                </div>
              </section>
            </div>
          </motion.div>
        </Container>
      </Section>
    </main>
  );
};

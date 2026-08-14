import React from 'react';
import { motion } from 'framer-motion';
import { FileText, ArrowLeft, Shield, CheckCircle, Users, Cloud, Sparkles, Ban, AlertTriangle, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { Typography } from '../components/ui/Typography';
import { SUPPORT_EMAIL, SUPPORT_SERVER_URL, DASHBOARD_URL } from '../constants';

export const TermsPage = () => {
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
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
            <Typography variant="h1" weight="black" className="mb-3">
              Terms of <span className="text-blue-600">Service</span>
            </Typography>
            <Typography variant="small" className="text-white/40 mb-10 block">
              Effective & Last Updated: August 2026
            </Typography>
            
            <div className="glass p-8 md:p-12 rounded-[32px] border-white/5 space-y-8">
              <section className="space-y-3">
                <Typography variant="h4" weight="bold" className="text-blue-500 flex items-center gap-2">
                  <Shield className="w-5 h-5" /> 1. Acceptance of Terms
                </Typography>
                <Typography variant="p" className="text-white/70 leading-relaxed text-sm">
                  By inviting <strong>Fusion Bot</strong> to your Discord server, accessing our web dashboard at <a href={DASHBOARD_URL} className="text-blue-400 hover:underline">panel.fusionhub.in</a>, or using any service provided by <strong>CHAUDHARY TANMAY</strong> / <strong>FUSIONHUB TEAM</strong>, you confirm that you have read, understood, and agreed to be legally bound by these Terms of Service and Discord's Terms of Service and Community Guidelines.
                </Typography>
              </section>

              <section className="space-y-3">
                <Typography variant="h4" weight="bold" className="text-blue-500 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" /> 2. License & Service Access
                </Typography>
                <Typography variant="p" className="text-white/70 leading-relaxed text-sm">
                  <strong>CHAUDHARY TANMAY (FUSIONHUB TEAM)</strong> grants you a revocable, non-exclusive, non-transferable, limited license to use Fusion Bot and its web dashboard strictly in accordance with these Terms. We reserve the right to modify, update, or discontinue features or commands at any time.
                </Typography>
              </section>

              <section className="space-y-3">
                <Typography variant="h4" weight="bold" className="text-blue-500 flex items-center gap-2">
                  <Users className="w-5 h-5" /> 3. Administrator Responsibilities
                </Typography>
                <Typography variant="p" className="text-white/70 leading-relaxed text-sm">
                  Server administrators configuring Fusion Bot are responsible for ensuring server rules and automated moderation policies comply with applicable laws and Discord policies. Administrators are solely responsible for executing destructive actions (e.g. bans, kicks, automated rollbacks, or nuke restores).
                </Typography>
              </section>

              <section className="space-y-3">
                <Typography variant="h4" weight="bold" className="text-blue-500 flex items-center gap-2">
                  <Cloud className="w-5 h-5" /> 4. Google Drive Cloud Backups & Nuke Guard
                </Typography>
                <Typography variant="p" className="text-white/70 leading-relaxed text-sm">
                  Fusion Bot provides disaster recovery features (including <code>/nukebackup</code> and <code>/nukerestore</code>) that snapshot server structure hierarchies (channel names, categories, roles, permissions) to Google Drive via user-authorized OAuth2 authentication. Backups are stored in user-controlled storage and are never monetized or shared.
                </Typography>
              </section>

              <section className="space-y-3">
                <Typography variant="h4" weight="bold" className="text-blue-500 flex items-center gap-2">
                  <Sparkles className="w-5 h-5" /> 5. AI Conversation & Creative Media
                </Typography>
                <Typography variant="p" className="text-white/70 leading-relaxed text-sm">
                  Fusion Bot includes AI conversation and generative media tools (<code>/imagine</code>). Users agree not to submit illegal, abusive, harmful, or sexually explicit prompts. AI responses are generated automatically and provided on an "as is" basis without warranties of factual accuracy.
                </Typography>
              </section>

              <section className="space-y-3">
                <Typography variant="h4" weight="bold" className="text-blue-500 flex items-center gap-2">
                  <Ban className="w-5 h-5" /> 6. Prohibited Activities
                </Typography>
                <Typography variant="p" className="text-white/70 leading-relaxed text-sm">
                  You agree not to reverse-engineer, exploit rate limits, attempt denial-of-service attacks, facilitate server raids or harassment, or bypass security permissions through bot vulnerabilities. Violation may result in permanent blacklisting from all Fusion Bot services.
                </Typography>
              </section>

              <section className="space-y-3">
                <Typography variant="h4" weight="bold" className="text-blue-500 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" /> 7. Limitation of Liability
                </Typography>
                <Typography variant="p" className="text-white/70 leading-relaxed text-sm">
                  Fusion Bot and the Dashboard are provided on an <strong>"AS IS"</strong> and <strong>"AS AVAILABLE"</strong> basis. Under no circumstances shall <strong>CHAUDHARY TANMAY</strong>, FUSIONHUB TEAM, or its developers be held liable for any damages resulting from server downtime, data loss, misconfiguration, or Discord API outages.
                </Typography>
              </section>

              <section className="space-y-3 pt-4 border-t border-white/5">
                <Typography variant="h4" weight="bold" className="text-blue-500 flex items-center gap-2">
                  <Mail className="w-5 h-5" /> 8. Legal Representative & Support Contact
                </Typography>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <p className="text-xs text-white/80"><strong>Owner & Legal Entity:</strong> CHAUDHARY TANMAY</p>
                  <p className="text-xs text-white/80"><strong>Official Support Email:</strong> <a href={`mailto:${SUPPORT_EMAIL}`} className="text-blue-400 hover:underline">{SUPPORT_EMAIL}</a></p>
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

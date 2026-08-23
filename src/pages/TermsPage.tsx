import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  FileText, 
  Scale, 
  AlertTriangle, 
  Ban, 
  Users, 
  Cloud, 
  Sparkles, 
  Mail, 
  ArrowLeft,
  CreditCard
} from 'lucide-react';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { Typography } from '../components/ui/Typography';
import { 
  APP_NAME, 
  SUPPORT_EMAIL, 
  SUPPORT_SERVER_URL, 
  LEGAL_ENTITY_NAME, 
  BUSINESS_NAME, 
  OPERATIONAL_ADDRESS 
} from '../constants';

export const TermsPage = () => {
  return (
    <main className="pt-24 pb-20">
      <Section className="py-12">
        <Container size="md">
          {/* Back button */}
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white mb-8 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-12"
          >
            {/* Header */}
            <div className="space-y-4 border-b border-white/10 pb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono">
                <FileText className="w-3.5 h-3.5" />
                <span>LEGAL COMPLIANCE</span>
              </div>
              <Typography variant="h1" weight="black" className="text-3xl sm:text-4xl">
                Terms of Service
              </Typography>
              <p className="text-sm text-white/50">
                Effective &amp; Last Updated: August 15, 2026 • Official Merchant: <strong>{LEGAL_ENTITY_NAME}</strong>
              </p>
            </div>

            {/* Document Content */}
            <div className="space-y-8 text-sm text-white/80 leading-relaxed">
              
              <section className="space-y-3">
                <Typography variant="h4" weight="bold" className="text-blue-400 flex items-center gap-2 text-lg">
                  <Scale className="w-5 h-5" /> 1. Acceptance of Terms
                </Typography>
                <Typography variant="p" className="text-white/70">
                  By inviting <strong>{APP_NAME}</strong> to your Discord server, accessing our Web Dashboard (<code>panel.fusionhub.in</code>), or utilizing our services, you confirm that you have read, understood, and agreed to be legally bound by these Terms of Service. If you do not agree to these Terms, you must remove the Bot from your server and discontinue use of the Dashboard.
                </Typography>
              </section>

              <section className="space-y-3">
                <Typography variant="h4" weight="bold" className="text-blue-400 flex items-center gap-2 text-lg">
                  <ShieldCheck className="w-5 h-5" /> 2. License &amp; Service Provision
                </Typography>
                <Typography variant="p" className="text-white/70">
                  <strong>{LEGAL_ENTITY_NAME}</strong> (trading as <strong>{BUSINESS_NAME}</strong>) grants you a revocable, non-exclusive, non-transferable license to access and configure {APP_NAME} in compliance with Discord's Terms of Service and Developer Terms.
                </Typography>
              </section>

              <section className="space-y-3">
                <Typography variant="h4" weight="bold" className="text-blue-400 flex items-center gap-2 text-lg">
                  <CreditCard className="w-5 h-5" /> 3. Payment Processing &amp; No-Refund Policy
                </Typography>
                <Typography variant="p" className="text-white/70">
                  All subscription and digital licensing transactions are processed through <strong>Cashfree Payments India</strong>. Due to the digital nature of SaaS features and immediate electronic provisioning upon order completion, <strong>we do not provide refunds once a purchase has been completed</strong>. Users may cancel upcoming renewals at any time via the Web Dashboard before the start of the next billing cycle.
                </Typography>
              </section>

              <section className="space-y-3">
                <Typography variant="h4" weight="bold" className="text-blue-400 flex items-center gap-2 text-lg">
                  <Users className="w-5 h-5" /> 4. Administrator Responsibilities
                </Typography>
                <Typography variant="p" className="text-white/70">
                  Server administrators configuring Fusion Bot are responsible for ensuring server rules and automated moderation policies comply with applicable laws and Discord policies. Administrators are solely responsible for executing destructive actions (e.g. bans, kicks, automated rollbacks, or nuke restores).
                </Typography>
              </section>

              <section className="space-y-3">
                <Typography variant="h4" weight="bold" className="text-blue-400 flex items-center gap-2 text-lg">
                  <Cloud className="w-5 h-5" /> 5. Google Drive Cloud Backups &amp; Nuke Guard
                </Typography>
                <Typography variant="p" className="text-white/70">
                  Fusion Bot provides disaster recovery features (including <code>/nukebackup</code> and <code>/nukerestore</code>) that snapshot server structure hierarchies (channel names, categories, roles, permissions) to Google Drive via user-authorized OAuth2 authentication. Backups are stored in user-controlled storage and are never monetized or shared.
                </Typography>
              </section>

              <section className="space-y-3">
                <Typography variant="h4" weight="bold" className="text-blue-400 flex items-center gap-2 text-lg">
                  <Sparkles className="w-5 h-5" /> 6. AI Conversation &amp; Creative Media
                </Typography>
                <Typography variant="p" className="text-white/70">
                  Fusion Bot includes AI conversation and generative media tools (<code>/imagine</code>). Users agree not to submit illegal, abusive, harmful, or sexually explicit prompts. AI responses are generated automatically and provided on an "as is" basis without warranties of factual accuracy.
                </Typography>
              </section>

              <section className="space-y-3">
                <Typography variant="h4" weight="bold" className="text-blue-400 flex items-center gap-2 text-lg">
                  <Ban className="w-5 h-5" /> 7. Prohibited Activities
                </Typography>
                <Typography variant="p" className="text-white/70">
                  You agree not to reverse-engineer, exploit rate limits, attempt denial-of-service attacks, facilitate server raids or harassment, or bypass security permissions through bot vulnerabilities. Violation will result in immediate termination of service and permanent blacklisting without refund.
                </Typography>
              </section>

              <section className="space-y-3">
                <Typography variant="h4" weight="bold" className="text-blue-400 flex items-center gap-2 text-lg">
                  <Scale className="w-5 h-5" /> 8. Governing Law &amp; Jurisdiction
                </Typography>
                <Typography variant="p" className="text-white/70">
                  These Terms of Service shall be governed by and construed in accordance with the laws of <strong>India</strong>. Any legal disputes or claims arising out of these Terms or use of the services shall be subject to the exclusive jurisdiction of the courts located in Delhi NCR, India.
                </Typography>
              </section>

              <section className="space-y-3">
                <Typography variant="h4" weight="bold" className="text-blue-400 flex items-center gap-2 text-lg">
                  <AlertTriangle className="w-5 h-5" /> 9. Limitation of Liability
                </Typography>
                <Typography variant="p" className="text-white/70">
                  Fusion Bot and the Dashboard are provided on an <strong>"AS IS"</strong> and <strong>"AS AVAILABLE"</strong> basis. Under no circumstances shall <strong>{LEGAL_ENTITY_NAME}</strong>, FUSIONHUB TEAM, or its developers be held liable for any indirect or consequential damages resulting from server downtime, data loss, misconfiguration, or Discord API outages.
                </Typography>
              </section>

              <section className="space-y-3 pt-6 border-t border-white/10">
                <Typography variant="h4" weight="bold" className="text-blue-400 flex items-center gap-2 text-lg">
                  <Mail className="w-5 h-5" /> 10. Legal Representative &amp; Support Contact
                </Typography>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs">
                  <p className="text-white/80"><strong>Merchant Legal Entity:</strong> {LEGAL_ENTITY_NAME} ({BUSINESS_NAME})</p>
                  <p className="text-white/80"><strong>Operational Address:</strong> {OPERATIONAL_ADDRESS}</p>
                  <p className="text-white/80"><strong>Official Support Email:</strong> <a href={`mailto:${SUPPORT_EMAIL}`} className="text-blue-400 hover:underline">{SUPPORT_EMAIL}</a></p>
                  <p className="text-white/80"><strong>Discord Support Community:</strong> <a href={SUPPORT_SERVER_URL} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">{SUPPORT_SERVER_URL}</a></p>
                </div>
              </section>

              <div className="pt-4 flex items-center justify-center gap-4 flex-wrap text-xs text-white/40 border-t border-white/5">
                <Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link>
                <span>•</span>
                <Link to="/terms" className="hover:text-white transition">Terms of Service</Link>
                <span>•</span>
                <a href={`mailto:${SUPPORT_EMAIL}`} className="hover:text-white transition">Support</a>
              </div>

            </div>
          </motion.div>
        </Container>
      </Section>
    </main>
  );
};

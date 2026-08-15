import React from 'react';
import { motion } from 'framer-motion';
import { Lock, ArrowLeft, Shield, Eye, Database, Server, UserCheck, Trash2, Mail, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { Typography } from '../components/ui/Typography';
import { 
  SUPPORT_EMAIL, SUPPORT_SERVER_URL, DASHBOARD_URL, 
  LEGAL_ENTITY_NAME, BUSINESS_NAME, OPERATIONAL_ADDRESS 
} from '../constants';

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
            <div className="w-16 h-16 rounded-2xl bg-blue-600/20 flex items-center justify-center mb-8 border border-blue-500/30">
              <Lock className="w-8 h-8 text-blue-400" />
            </div>
            <Typography variant="h1" weight="black" className="mb-3 text-3xl sm:text-5xl">
              Privacy <span className="text-blue-500">Policy</span>
            </Typography>
            <Typography variant="small" className="text-white/40 mb-10 block">
              Effective &amp; Last Updated: August 2026 • Compliant with Indian DPDP Act &amp; Cashfree Merchant Guidelines
            </Typography>
            
            <div className="glass p-8 md:p-12 rounded-[32px] border-white/5 space-y-8 text-white/80 text-sm leading-relaxed">
              
              <section className="space-y-3">
                <Typography variant="h4" weight="bold" className="text-blue-400 flex items-center gap-2 text-lg">
                  <Shield className="w-5 h-5" /> 1. Commitment to Privacy &amp; Data Protection
                </Typography>
                <Typography variant="p" className="text-white/70">
                  <strong>{LEGAL_ENTITY_NAME}</strong> (operating as <strong>{BUSINESS_NAME}</strong>) values your privacy. This Privacy Policy outlines how we collect, handle, store, and safeguard your personal data when you interact with <strong>Fusion Bot</strong>, our web management dashboard at <a href={DASHBOARD_URL} className="text-blue-400 hover:underline">panel.fusionhub.in</a>, and our website at <a href="https://bot.fusionhub.in" className="text-blue-400 hover:underline">bot.fusionhub.in</a>.
                </Typography>
              </section>

              <section className="space-y-3">
                <Typography variant="h4" weight="bold" className="text-blue-400 flex items-center gap-2 text-lg">
                  <Database className="w-5 h-5" /> 2. Information We Collect
                </Typography>
                <div className="space-y-2 text-white/70">
                  <p>• <strong>Discord Account Data:</strong> Discord User ID, username, discriminator, and avatar when you authenticate via Discord OAuth2 to access the web panel.</p>
                  <p>• <strong>Server &amp; Channel Metadata:</strong> Discord Guild ID, channel IDs, role IDs, custom bot settings, welcome messages, and ticket configs necessary for bot features.</p>
                  <p>• <strong>Google Drive OAuth Tokens:</strong> Encrypted authorization tokens used exclusively to perform user-requested disaster recovery backups (<code>/nukebackup</code>). We never access, read, or monetize other files in your Google Drive.</p>
                  <p>• <strong>Transactional Data:</strong> Order IDs, billing email, amount, payment timestamp, and transaction status provided by Cashfree Payments upon subscription purchase.</p>
                </div>
              </section>

              <section className="space-y-3">
                <Typography variant="h4" weight="bold" className="text-blue-400 flex items-center gap-2 text-lg">
                  <CreditCard className="w-5 h-5" /> 3. Payment Processing &amp; Cashfree Payments
                </Typography>
                <div className="p-4 rounded-2xl bg-blue-950/30 border border-blue-500/20 space-y-2">
                  <p className="text-white/90 font-semibold">🔒 PCI-DSS Compliant Secure Payment Gateway</p>
                  <p className="text-xs text-white/70 leading-relaxed">
                    All payment processing is handled exclusively by <strong>Cashfree Payments India</strong>. FusionHub <strong>NEVER collects, stores, or processes</strong> sensitive financial data such as credit/debit card numbers, CVVs, bank account passwords, or UPI PINs. All financial exchanges take place on Cashfree's PCI-DSS compliant secure servers with 128-bit bank-grade SSL encryption.
                  </p>
                </div>
              </section>

              <section className="space-y-3">
                <Typography variant="h4" weight="bold" className="text-blue-400 flex items-center gap-2 text-lg">
                  <Server className="w-5 h-5" /> 4. How We Use Your Information
                </Typography>
                <div className="space-y-2 text-white/70">
                  <p>We use the collected information strictly to:</p>
                  <ul className="list-disc list-inside space-y-1 pl-2 text-white/60">
                    <li>Deliver bot features (AutoMod, Reaction Roles, Welcome Cards, Ticket Systems).</li>
                    <li>Provision and authenticate premium subscription licenses across Discord shards.</li>
                    <li>Generate automated Google Drive server disaster snapshots upon admin execution.</li>
                    <li>Provide customer support, billing resolution, and notify users of critical security updates.</li>
                  </ul>
                </div>
              </section>

              <section className="space-y-3">
                <Typography variant="h4" weight="bold" className="text-blue-400 flex items-center gap-2 text-lg">
                  <Eye className="w-5 h-5" /> 5. Data Sharing &amp; Third Parties
                </Typography>
                <Typography variant="p" className="text-white/70">
                  We <strong>do not sell, rent, trade, or monetize</strong> your personal data to third parties. Data is shared only with essential infrastructure partners:
                </Typography>
                <ul className="list-disc list-inside space-y-1 pl-2 text-white/60 text-xs">
                  <li><strong>Discord API:</strong> For gateway websocket communication and command routing.</li>
                  <li><strong>Cashfree Payments:</strong> For payment gateway processing and invoice generation.</li>
                  <li><strong>Google Drive API:</strong> For user-directed automated server snapshots.</li>
                </ul>
              </section>

              <section className="space-y-3">
                <Typography variant="h4" weight="bold" className="text-blue-400 flex items-center gap-2 text-lg">
                  <Trash2 className="w-5 h-5" /> 6. Data Retention &amp; User Deletion Rights
                </Typography>
                <Typography variant="p" className="text-white/70">
                  Under the Indian Digital Personal Data Protection Act (DPDP Act) and international data privacy regulations, you have the absolute right to request deletion of your server configs and account records at any time. Simply email <a href={`mailto:${SUPPORT_EMAIL}`} className="text-blue-400 hover:underline">{SUPPORT_EMAIL}</a> with your Discord Server ID. All server configurations will be permanently purged within 48 hours.
                </Typography>
              </section>

              <section className="space-y-3 pt-6 border-t border-white/10">
                <Typography variant="h4" weight="bold" className="text-blue-400 flex items-center gap-2 text-lg">
                  <Mail className="w-5 h-5" /> 7. Grievance Officer &amp; Privacy Contact
                </Typography>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs">
                  <p className="text-white/80"><strong>Data Protection &amp; Grievance Officer:</strong> {LEGAL_ENTITY_NAME}</p>
                  <p className="text-white/80"><strong>Official Business:</strong> {BUSINESS_NAME}</p>
                  <p className="text-white/80"><strong>Operational Address:</strong> {OPERATIONAL_ADDRESS}</p>
                  <p className="text-white/80"><strong>Privacy &amp; Data Inquiries:</strong> <a href={`mailto:${SUPPORT_EMAIL}`} className="text-blue-400 hover:underline">{SUPPORT_EMAIL}</a></p>
                </div>
              </section>

              <div className="pt-4 flex items-center justify-center gap-4 flex-wrap text-xs text-white/40 border-t border-white/5">
                <Link to="/terms" className="hover:text-white transition">Terms of Service</Link>
                <span>•</span>
                <Link to="/refund-policy" className="hover:text-white transition">Refund Policy</Link>
                <span>•</span>
                <Link to="/shipping-policy" className="hover:text-white transition">Delivery Policy</Link>
                <span>•</span>
                <Link to="/contact" className="hover:text-white transition">Contact Us</Link>
              </div>

            </div>
          </motion.div>
        </Container>
      </Section>
    </main>
  );
};

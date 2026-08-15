import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, ArrowLeft, Shield, Clock, CheckCircle2, AlertCircle, CreditCard, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { Typography } from '../components/ui/Typography';
import { SUPPORT_EMAIL, SUPPORT_SERVER_URL, LEGAL_ENTITY_NAME, BUSINESS_NAME, DASHBOARD_URL } from '../constants';

export const RefundPolicyPage = () => {
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
              <RefreshCw className="w-8 h-8 text-blue-400" />
            </div>
            <Typography variant="h1" weight="black" className="mb-3 text-3xl sm:text-5xl">
              Refund & <span className="text-blue-500">Cancellation Policy</span>
            </Typography>
            <Typography variant="small" className="text-white/40 mb-10 block">
              Effective & Last Updated: August 2026 • Compliant with Cashfree Payments & RBI Guidelines
            </Typography>
            
            <div className="glass p-8 md:p-12 rounded-[32px] border-white/5 space-y-8 text-white/80 text-sm leading-relaxed">
              
              {/* Overview */}
              <section className="space-y-3">
                <Typography variant="h4" weight="bold" className="text-blue-400 flex items-center gap-2 text-lg">
                  <Shield className="w-5 h-5" /> 1. Overview & Service Scope
                </Typography>
                <Typography variant="p" className="text-white/70">
                  This Refund and Cancellation Policy applies to all digital subscription purchases, licenses, and premium tier services provided by <strong>{LEGAL_ENTITY_NAME}</strong> (trading as <strong>{BUSINESS_NAME}</strong>) on <a href="https://bot.fusionhub.in" className="text-blue-400 hover:underline">bot.fusionhub.in</a> and <a href={DASHBOARD_URL} className="text-blue-400 hover:underline">panel.fusionhub.in</a>. All digital payments and settlements are facilitated securely through our authorized payment aggregator, <strong>Cashfree Payments India</strong>.
                </Typography>
              </section>

              {/* Cancellation Policy */}
              <section className="space-y-3">
                <Typography variant="h4" weight="bold" className="text-blue-400 flex items-center gap-2 text-lg">
                  <Clock className="w-5 h-5" /> 2. Subscription Cancellation Policy
                </Typography>
                <div className="space-y-2 text-white/70">
                  <p>• <strong>Cancel Anytime:</strong> Users may cancel their recurring monthly or annual premium subscription at any time with zero cancellation penalties.</p>
                  <p>• <strong>How to Cancel:</strong> You can cancel directly from the Web Dashboard (<a href={DASHBOARD_URL} className="text-blue-400 hover:underline">panel.fusionhub.in</a>) under Account Settings &gt; Manage Subscription, or by submitting an email to <a href={`mailto:${SUPPORT_EMAIL}`} className="text-blue-400 hover:underline">{SUPPORT_EMAIL}</a>.</p>
                  <p>• <strong>Active Period:</strong> Upon cancellation, your premium perks (Google Drive backups, unlimited AI generation, priority shards) will remain active until the end of your current paid billing period, after which no further charges will be applied.</p>
                </div>
              </section>

              {/* 7-Day Money Back Guarantee */}
              <section className="space-y-3">
                <Typography variant="h4" weight="bold" className="text-blue-400 flex items-center gap-2 text-lg">
                  <CheckCircle2 className="w-5 h-5" /> 3. 7-Day Money-Back Refund Guarantee
                </Typography>
                <Typography variant="p" className="text-white/70">
                  We strive to provide outstanding Discord bot hosting and management utilities. If you are not completely satisfied with our service, you are eligible for a <strong>100% full refund</strong> if requested within <strong>7 calendar days</strong> from the initial purchase date.
                </Typography>
              </section>

              {/* Refund Eligibility Criteria */}
              <section className="space-y-3">
                <Typography variant="h4" weight="bold" className="text-blue-400 flex items-center gap-2 text-lg">
                  <AlertCircle className="w-5 h-5" /> 4. Eligible Refund Conditions
                </Typography>
                <div className="space-y-2 text-white/70">
                  <p>You qualify for a prompt refund under any of the following circumstances:</p>
                  <ul className="list-disc list-inside space-y-1 pl-2 text-white/60">
                    <li><strong>Technical Non-Delivery:</strong> The digital premium perks failed to activate on your Discord server within 1 hour of payment confirmation and our support team was unable to resolve it.</li>
                    <li><strong>Duplicate Billing:</strong> You were charged more than once for the same subscription period due to a gateway or connectivity error.</li>
                    <li><strong>Unresolved Outages:</strong> Continuous service downtime exceeding 24 consecutive hours during your billing cycle.</li>
                    <li><strong>Accidental Renewal:</strong> Requests made within 48 hours of an automatic renewal charge without utilizing premium features during that renewal period.</li>
                  </ul>
                </div>
              </section>

              {/* Refund Processing Timeline & Method */}
              <section className="space-y-3">
                <Typography variant="h4" weight="bold" className="text-blue-400 flex items-center gap-2 text-lg">
                  <CreditCard className="w-5 h-5" /> 5. Refund Processing Timeline & Payment Mode
                </Typography>
                <div className="p-4 rounded-2xl bg-blue-950/30 border border-blue-500/20 space-y-2">
                  <p className="text-white/90 font-semibold">⚡ Processing Timeline: 5 to 7 Business Working Days</p>
                  <p className="text-xs text-white/70 leading-relaxed">
                    Once approved by our billing team, all refunds are initiated via <strong>Cashfree Payments</strong> and credited directly back to the <strong>original source of payment</strong> (UPI ID, Debit/Credit Card, Net Banking, or Wallet) used during checkout. Depending on your issuing bank, funds will reflect in your account within <strong>5–7 business working days</strong>.
                  </p>
                </div>
              </section>

              {/* How to Request a Refund */}
              <section className="space-y-3">
                <Typography variant="h4" weight="bold" className="text-blue-400 flex items-center gap-2 text-lg">
                  <Mail className="w-5 h-5" /> 6. How to Request a Refund
                </Typography>
                <Typography variant="p" className="text-white/70">
                  To request a refund or raise a billing dispute, send an email to <a href={`mailto:${SUPPORT_EMAIL}`} className="text-blue-400 hover:underline font-bold">{SUPPORT_EMAIL}</a> with:
                </Typography>
                <div className="bg-white/5 p-4 rounded-xl font-mono text-xs space-y-1 text-white/70 border border-white/10">
                  <p>1. Cashfree Order / Transaction ID</p>
                  <p>2. Discord User ID &amp; Discord Server ID</p>
                  <p>3. Registered Email Address</p>
                  <p>4. Brief reason for the refund request</p>
                </div>
                <p className="text-xs text-white/50">Our support desk responds to all refund requests within 24 business hours.</p>
              </section>

              {/* Legal Representative */}
              <section className="pt-6 border-t border-white/10 space-y-2 text-xs text-white/50">
                <p><strong>Merchant Legal Entity:</strong> {LEGAL_ENTITY_NAME} ({BUSINESS_NAME})</p>
                <p><strong>Support Email:</strong> <a href={`mailto:${SUPPORT_EMAIL}`} className="text-blue-400 hover:underline">{SUPPORT_EMAIL}</a> • <strong>Discord Support:</strong> <a href={SUPPORT_SERVER_URL} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">{SUPPORT_SERVER_URL}</a></p>
              </section>

            </div>
          </motion.div>
        </Container>
      </Section>
    </main>
  );
};

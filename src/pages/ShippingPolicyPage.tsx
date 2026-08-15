import React from 'react';
import { motion } from 'framer-motion';
import { Truck, ArrowLeft, Shield, Zap, CheckCircle2, Server, HelpCircle, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { Typography } from '../components/ui/Typography';
import { SUPPORT_EMAIL, SUPPORT_SERVER_URL, LEGAL_ENTITY_NAME, BUSINESS_NAME, DASHBOARD_URL } from '../constants';

export const ShippingPolicyPage = () => {
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
              <Zap className="w-8 h-8 text-blue-400" />
            </div>
            <Typography variant="h1" weight="black" className="mb-3 text-3xl sm:text-5xl">
              Digital Delivery & <span className="text-blue-500">Shipping Policy</span>
            </Typography>
            <Typography variant="small" className="text-white/40 mb-10 block">
              Effective & Last Updated: August 2026 • Compliant with Cashfree Payments Digital Goods Standards
            </Typography>
            
            <div className="glass p-8 md:p-12 rounded-[32px] border-white/5 space-y-8 text-white/80 text-sm leading-relaxed">
              
              {/* Nature of Products */}
              <section className="space-y-3">
                <Typography variant="h4" weight="bold" className="text-blue-400 flex items-center gap-2 text-lg">
                  <Shield className="w-5 h-5" /> 1. Nature of Services (100% Digital SaaS)
                </Typography>
                <Typography variant="p" className="text-white/70">
                  <strong>{LEGAL_ENTITY_NAME}</strong> (operating as <strong>{BUSINESS_NAME}</strong>) provides software-as-a-service (SaaS) products, including Discord bot hosting, web dashboard management tools, cloud Google Drive backup integrations, and AI generation features. <strong>We do not sell or ship physical products.</strong> All deliveries and fulfillment are executed purely through electronic and digital channels.
                </Typography>
              </section>

              {/* Delivery Timeline */}
              <section className="space-y-3">
                <Typography variant="h4" weight="bold" className="text-blue-400 flex items-center gap-2 text-lg">
                  <Zap className="w-5 h-5" /> 2. Delivery Timeline (Instant Digital Activation)
                </Typography>
                <div className="p-4 rounded-2xl bg-blue-950/30 border border-blue-500/20 space-y-2">
                  <p className="text-white/90 font-semibold">⚡ Activation Time: Instant (Within 0 to 5 Minutes)</p>
                  <p className="text-xs text-white/70 leading-relaxed">
                    Upon successful transaction confirmation via <strong>Cashfree Payments</strong>, your premium license and features are provisioned and activated automatically to your designated Discord User ID and Discord Guild ID within <strong>0 to 5 minutes</strong> via automated webhooks.
                  </p>
                </div>
              </section>

              {/* Fulfillment Process */}
              <section className="space-y-3">
                <Typography variant="h4" weight="bold" className="text-blue-400 flex items-center gap-2 text-lg">
                  <Server className="w-5 h-5" /> 3. How to Access Your Digital Purchase
                </Typography>
                <div className="space-y-2 text-white/70">
                  <p>Once payment is completed:</p>
                  <ul className="list-disc list-inside space-y-1.5 pl-2 text-white/60">
                    <li>A digital invoice and confirmation receipt will be emailed immediately to your registered billing email address by Cashfree Payments and FusionHub.</li>
                    <li>Premium permissions on the Discord Bot (such as unlimited AI, Google Drive automated snapshots, and custom logs) will become instantly usable in your Discord server.</li>
                    <li>Your Web Dashboard account at <a href={DASHBOARD_URL} className="text-blue-400 hover:underline">panel.fusionhub.in</a> will reflect your active Pro/Enterprise license tier.</li>
                  </ul>
                </div>
              </section>

              {/* Shipping Charges */}
              <section className="space-y-3">
                <Typography variant="h4" weight="bold" className="text-blue-400 flex items-center gap-2 text-lg">
                  <CheckCircle2 className="w-5 h-5" /> 4. Shipping / Delivery Charges
                </Typography>
                <Typography variant="p" className="text-white/70">
                  Since all services are delivered electronically across the internet, there are <strong>zero shipping fees, zero handling fees, and zero courier charges</strong> associated with any purchase on our platform.
                </Typography>
              </section>

              {/* Delivery Delays & Support */}
              <section className="space-y-3">
                <Typography variant="h4" weight="bold" className="text-blue-400 flex items-center gap-2 text-lg">
                  <HelpCircle className="w-5 h-5" /> 5. Resolution for Delivery Delays or Technical Issues
                </Typography>
                <Typography variant="p" className="text-white/70">
                  In rare cases of internet gateway delays or Discord API latency exceeding 15 minutes, our 24/7 automated reconciliation system will retry activation. If your premium tier has not activated after 30 minutes, please contact our support desk immediately:
                </Typography>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1 text-xs text-white/70">
                  <p>• <strong>Support Email:</strong> <a href={`mailto:${SUPPORT_EMAIL}`} className="text-blue-400 hover:underline">{SUPPORT_EMAIL}</a></p>
                  <p>• <strong>Discord Live Desk:</strong> <a href={SUPPORT_SERVER_URL} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">{SUPPORT_SERVER_URL}</a></p>
                  <p>• <strong>Turnaround Time:</strong> Support tickets are acknowledged within 2 hours and resolved within 24 hours.</p>
                </div>
              </section>

              {/* Legal Info */}
              <section className="pt-6 border-t border-white/10 space-y-2 text-xs text-white/50">
                <p><strong>Merchant Legal Entity:</strong> {LEGAL_ENTITY_NAME} ({BUSINESS_NAME})</p>
                <p><strong>Operational Address:</strong> Delhi NCR, India • <strong>Contact:</strong> <a href={`mailto:${SUPPORT_EMAIL}`} className="text-blue-400 hover:underline">{SUPPORT_EMAIL}</a></p>
              </section>

            </div>
          </motion.div>
        </Container>
      </Section>
    </main>
  );
};

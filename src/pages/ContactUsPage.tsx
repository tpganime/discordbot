import React from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, MessageSquare, Clock, MapPin, Shield, CheckCircle2, UserCheck, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { Typography } from '../components/ui/Typography';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { 
  SUPPORT_EMAIL, SUPPORT_SERVER_URL, COMMUNITY_URL, 
  LEGAL_ENTITY_NAME, BUSINESS_NAME, OPERATIONAL_ADDRESS, SUPPORT_HOURS, DASHBOARD_URL 
} from '../constants';

export const ContactUsPage = () => {
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
              <Mail className="w-8 h-8 text-blue-400" />
            </div>
            <Typography variant="h1" weight="black" className="mb-3 text-3xl sm:text-5xl">
              Contact Us &amp; <span className="text-blue-500">Support Desk</span>
            </Typography>
            <Typography variant="small" className="text-white/40 mb-10 block">
              Official Merchant Support &amp; Grievance Redressal • Cashfree Verified Merchant
            </Typography>
            
            <div className="glass p-8 md:p-12 rounded-[32px] border-white/5 space-y-8 text-white/80 text-sm leading-relaxed">
              
              {/* Introduction */}
              <section className="space-y-3">
                <Typography variant="h4" weight="bold" className="text-blue-400 flex items-center gap-2 text-lg">
                  <Shield className="w-5 h-5" /> Customer Support &amp; Legal Entity Information
                </Typography>
                <Typography variant="p" className="text-white/70">
                  Have questions regarding Fusion Bot, web dashboard management, Google Drive disaster backups, or billing transactions processed via Cashfree Payments? We are here to assist you 24/7.
                </Typography>
              </section>

              {/* Contact Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card className="p-6 bg-white/[0.03] border-white/10 rounded-2xl space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-white text-base">Official Support Email</h4>
                  <p className="text-xs text-white/60">For billing inquiries, refund requests, and technical tickets:</p>
                  <a href={`mailto:${SUPPORT_EMAIL}`} className="text-blue-400 font-semibold hover:underline block text-sm">
                    {SUPPORT_EMAIL}
                  </a>
                </Card>

                <Card className="p-6 bg-white/[0.03] border-white/10 rounded-2xl space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-600/20 flex items-center justify-center text-indigo-400">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-white text-base">Live Discord Support</h4>
                  <p className="text-xs text-white/60">Real-time live developer and moderator assistance:</p>
                  <a href={SUPPORT_SERVER_URL} target="_blank" rel="noreferrer" className="text-blue-400 font-semibold hover:underline flex items-center gap-1 text-sm">
                    Join Support Guild <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </Card>
              </div>

              {/* Legal Entity & Operational Details */}
              <section className="space-y-4 pt-4 border-t border-white/10">
                <Typography variant="h4" weight="bold" className="text-white text-base flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-blue-400" /> Merchant Legal Details
                </Typography>
                
                <div className="bg-white/[0.02] border border-white/10 p-5 rounded-2xl space-y-3 text-xs">
                  <div className="flex flex-col sm:flex-row sm:justify-between py-1 border-b border-white/5 gap-1">
                    <span className="text-white/40 font-medium">Merchant / Legal Entity Name:</span>
                    <span className="text-white font-bold">{LEGAL_ENTITY_NAME}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between py-1 border-b border-white/5 gap-1">
                    <span className="text-white/40 font-medium">Trade &amp; Brand Name:</span>
                    <span className="text-white font-bold">{BUSINESS_NAME}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between py-1 border-b border-white/5 gap-1">
                    <span className="text-white/40 font-medium">Operating / Registered Address:</span>
                    <span className="text-white font-medium">{OPERATIONAL_ADDRESS}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between py-1 border-b border-white/5 gap-1">
                    <span className="text-white/40 font-medium">Operating &amp; Support Hours:</span>
                    <span className="text-white font-medium">{SUPPORT_HOURS}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between py-1 gap-1">
                    <span className="text-white/40 font-medium">Payment Aggregator:</span>
                    <span className="text-emerald-400 font-bold">Cashfree Payments India</span>
                  </div>
                </div>
              </section>

              {/* Grievance Redressal Policy */}
              <section className="space-y-3 pt-4 border-t border-white/10">
                <Typography variant="h4" weight="bold" className="text-blue-400 flex items-center gap-2 text-base">
                  <Clock className="w-5 h-5" /> Grievance Redressal &amp; Turnaround Times
                </Typography>
                <div className="space-y-2 text-white/70 text-xs leading-relaxed">
                  <p>In accordance with Information Technology Rules and payment aggregator guidelines:</p>
                  <ul className="list-disc list-inside space-y-1 pl-2 text-white/60">
                    <li><strong>Acknowledgment:</strong> All user inquiries and grievance emails sent to <a href={`mailto:${SUPPORT_EMAIL}`} className="text-blue-400 hover:underline">{SUPPORT_EMAIL}</a> are acknowledged within <strong>24 business hours</strong>.</li>
                    <li><strong>Resolution Timeline:</strong> Grievances, technical defects, or payment queries are resolved within a maximum of <strong>48 to 72 business hours</strong>.</li>
                    <li><strong>Designated Grievance Officer:</strong> CHAUDHARY TANMAY (<a href={`mailto:${SUPPORT_EMAIL}`} className="text-blue-400 hover:underline">{SUPPORT_EMAIL}</a>).</li>
                  </ul>
                </div>
              </section>

              {/* Quick Legal Links */}
              <div className="pt-6 border-t border-white/10 flex items-center justify-center gap-4 flex-wrap text-xs text-white/40">
                <Link to="/terms" className="hover:text-white transition">Terms of Service</Link>
                <span>•</span>
                <Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link>
                <span>•</span>
                <Link to="/refund-policy" className="hover:text-white transition">Refund &amp; Cancellation Policy</Link>
                <span>•</span>
                <Link to="/shipping-policy" className="hover:text-white transition">Digital Delivery Policy</Link>
                <span>•</span>
                <Link to="/premium" className="hover:text-white transition">Premium Plans</Link>
              </div>

            </div>
          </motion.div>
        </Container>
      </Section>
    </main>
  );
};

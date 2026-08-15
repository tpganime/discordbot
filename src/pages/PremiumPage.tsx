import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, Check, Zap, Shield, Crown, ArrowLeft, Clock, 
  CreditCard, RefreshCw, HelpCircle, Lock, Server, Cpu, 
  Flame, Gift, BellRing, ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { Typography } from '../components/ui/Typography';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Flex } from '../components/ui/Flex';
import { DISCORD_INVITE_URL, SUPPORT_SERVER_URL, DASHBOARD_URL } from '../constants';

export const PremiumPage = () => {
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);
  const [isMobile] = useState(() => (typeof window !== 'undefined' ? window.innerWidth < 1024 : false));

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!waitlistEmail.trim()) return;
    setWaitlistSubmitted(true);
  };

  const plans = [
    {
      name: 'Free Community',
      badge: 'Current Plan',
      badgeColor: 'bg-white/10 text-white/70 border-white/10',
      description: 'Essential multi-purpose bot features for growing Discord servers.',
      price: {
        monthly: { INR: '₹0', USD: '$0' },
        yearly: { INR: '₹0', USD: '$0' }
      },
      period: 'Forever Free',
      features: [
        '41+ Core Slash Commands',
        'Automated Auto-Mod & Anti-Spam rate limiting',
        '10 Daily AI Chat messages with SUNDAY 5.1',
        'Standard Welcome & Goodbye cards',
        'Interactive Dropdown Ticket panels',
        'Liquid Glass Web Dashboard access',
        'Community Discord Support'
      ],
      ctaText: 'Add to Server (Free)',
      ctaVariant: 'outline' as const,
      ctaAction: () => window.open(DISCORD_INVITE_URL, '_blank'),
      highlighted: false,
      comingSoon: false,
    },
    {
      name: 'Fusion Pro',
      badge: 'COMING SOON • MOST POPULAR',
      badgeColor: 'bg-blue-600 text-white border-blue-400/40 shadow-lg shadow-blue-600/30',
      description: 'Unleash full cloud backups, unlimited AI generation, and priority shard routing.',
      price: {
        monthly: { INR: '₹199', USD: '$2.99' },
        yearly: { INR: '₹1,999', USD: '$29.99' }
      },
      period: billingCycle === 'monthly' ? '/ month' : '/ year (2 Months Free)',
      features: [
        'Everything in Free Plan',
        'Automated Google Drive Cloud Backups (Hourly / Daily snapshots)',
        'One-Click Nuke Restore & Disaster Recovery',
        'Unlimited AI Chat & /imagine Generative Art',
        'Priority Gateway Shard Execution (<15ms latency)',
        'Custom Role Reward tiers & reaction roles',
        'Private Mod Audit Logs with Executor attribution',
        'Direct 24/7 Priority Staff Support'
      ],
      ctaText: 'Join Pro Waitlist',
      ctaVariant: 'primary' as const,
      ctaAction: () => {
        const el = document.getElementById('waitlist-section');
        el?.scrollIntoView({ behavior: 'smooth' });
      },
      highlighted: true,
      comingSoon: true,
    },
    {
      name: 'Enterprise Hub',
      badge: 'COMING SOON • POWER NETWORKS',
      badgeColor: 'bg-purple-600/20 text-purple-300 border-purple-500/30',
      description: 'Maximum resilience and multi-guild management for large gaming communities.',
      price: {
        monthly: { INR: '₹499', USD: '$6.99' },
        yearly: { INR: '₹4,999', USD: '$69.99' }
      },
      period: billingCycle === 'monthly' ? '/ month' : '/ year (2 Months Free)',
      features: [
        'Everything in Fusion Pro',
        'Multi-Guild License (Up to 5 Discord Servers)',
        'Unlimited Backup Retention History',
        'White-Label Bot Branding (Custom Bot Avatar & Bio)',
        'Dedicated Shard Capacity with 99.99% SLA guarantee',
        'Custom Bot Feature Requests & Priority Implementation',
        'Dedicated Account Manager on Discord'
      ],
      ctaText: 'Join Enterprise Waitlist',
      ctaVariant: 'outline' as const,
      ctaAction: () => {
        const el = document.getElementById('waitlist-section');
        el?.scrollIntoView({ behavior: 'smooth' });
      },
      highlighted: false,
      comingSoon: true,
    },
  ];

  return (
    <main className="pt-32 pb-24">
      <Section spacing="xl">
        <Container size="xl">
          <Link to="/" className="inline-flex items-center gap-2 text-white/40 hover:text-white mb-12 transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          {/* Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-500/30 text-blue-400 text-xs font-bold mb-6 tracking-wide uppercase">
                <Crown className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span>Premium Subscriptions • Coming Soon</span>
              </div>
              <Typography variant="h1" weight="black" className="mb-6 text-4xl sm:text-6xl tracking-tight">
                Power Up Your Discord with <span className="text-blue-500">Premium</span>
              </Typography>
              <Typography variant="lead" className="max-w-3xl mx-auto text-white/60 text-base sm:text-lg leading-relaxed">
                Supercharge your community with automated Google Drive backups, unlimited AI image generation, private mod logs, and priority gateway speed.
              </Typography>
            </motion.div>

            {/* Currency & Billing Toggles */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              {/* Currency Selector */}
              <div className="p-1 rounded-xl bg-white/5 border border-white/10 flex items-center gap-1">
                <button
                  onClick={() => setCurrency('INR')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    currency === 'INR' ? 'bg-blue-600 text-white shadow-lg' : 'text-white/40 hover:text-white'
                  }`}
                >
                  🇮🇳 INR (₹)
                </button>
                <button
                  onClick={() => setCurrency('USD')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    currency === 'USD' ? 'bg-blue-600 text-white shadow-lg' : 'text-white/40 hover:text-white'
                  }`}
                >
                  🌐 USD ($)
                </button>
              </div>

              {/* Billing Cycle Selector */}
              <div className="p-1 rounded-xl bg-white/5 border border-white/10 flex items-center gap-1">
                <button
                  onClick={() => setBillingCycle('monthly')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    billingCycle === 'monthly' ? 'bg-blue-600 text-white shadow-lg' : 'text-white/40 hover:text-white'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingCycle('yearly')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    billingCycle === 'yearly' ? 'bg-blue-600 text-white shadow-lg' : 'text-white/40 hover:text-white'
                  }`}
                >
                  Yearly
                  <span className="bg-emerald-500/20 text-emerald-300 text-[10px] px-1.5 py-0.5 rounded-full border border-emerald-500/30">
                    Save 17%
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: isMobile ? 0 : i * 0.1 }}
                className="relative h-full"
              >
                <Card 
                  className={`h-full flex flex-col justify-between p-8 md:p-10 rounded-[32px] border transition-all duration-300 relative overflow-hidden ${
                    plan.highlighted 
                      ? 'liquid-glass border-blue-500/50 shadow-[0_20px_60px_-15px_rgba(37,99,235,0.35)] bg-blue-950/20' 
                      : 'glass border-white/10 hover:border-white/20'
                  }`}
                >
                  {plan.highlighted && (
                    <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-500" />
                  )}

                  <div>
                    {/* Badge */}
                    <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
                      <span className={`text-[11px] font-extrabold uppercase tracking-wider px-3.5 py-1.5 rounded-full border ${plan.badgeColor}`}>
                        {plan.badge}
                      </span>
                      {plan.comingSoon && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20">
                          <Clock className="w-3 h-3" /> Coming Soon
                        </span>
                      )}
                    </div>

                    {/* Plan Name */}
                    <Typography variant="h3" weight="black" className="text-2xl text-white mb-2 font-display">
                      {plan.name}
                    </Typography>
                    <Typography variant="p" className="text-white/60 text-xs leading-relaxed mb-6">
                      {plan.description}
                    </Typography>

                    {/* Price */}
                    <div className="mb-8 p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl sm:text-5xl font-black text-white font-display tracking-tight">
                          {plan.price[billingCycle][currency]}
                        </span>
                        <span className="text-xs text-white/50 font-medium">
                          {plan.period}
                        </span>
                      </div>
                      <p className="text-[11px] text-white/40 mt-1">
                        {plan.comingSoon ? 'Pre-launch estimate • Inclusive of all taxes' : 'Free forever for unlimited members'}
                      </p>
                    </div>

                    {/* Feature List */}
                    <div className="space-y-3.5 mb-8">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-white/40">Included Capabilities:</p>
                      {plan.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-3 text-xs text-white/80">
                          <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                            plan.highlighted ? 'bg-blue-500 text-white' : 'bg-white/10 text-blue-400'
                          }`}>
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div>
                    <Button 
                      variant={plan.ctaVariant} 
                      size="lg" 
                      className={`w-full justify-center ${
                        plan.highlighted ? 'shadow-lg shadow-blue-600/30' : ''
                      }`}
                      onClick={plan.ctaAction}
                    >
                      {plan.ctaText}
                      <ChevronRight className="w-4 h-4 ml-1.5" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Cashfree Payment & Security Compliance Banner */}
          <div className="mb-20 glass p-8 rounded-[32px] border-white/10 bg-gradient-to-r from-blue-950/30 via-black/40 to-indigo-950/30">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center md:text-left items-center">
              <div className="flex items-center gap-4 col-span-1 md:col-span-2">
                <div className="w-14 h-14 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center shrink-0">
                  <CreditCard className="w-7 h-7 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white mb-1">Official Payment Gateway: Cashfree Payments</h4>
                  <p className="text-xs text-white/60 leading-relaxed">
                    All upcoming premium purchases will be processed via <strong>Cashfree Payments India</strong> with 128-bit bank grade encryption, UPI, Cards, Net Banking, and Wallets.
                  </p>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 justify-center md:justify-start text-xs font-bold text-emerald-400">
                  <Zap className="w-4 h-4" /> Instant Digital Delivery
                </div>
                <p className="text-[11px] text-white/50">Activated to your Discord Guild ID in 0–5 minutes automatically upon webhook validation.</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 justify-center md:justify-start text-xs font-bold text-blue-400">
                  <RefreshCw className="w-4 h-4" /> 7-Day Money-Back Guarantee
                </div>
                <p className="text-[11px] text-white/50">Full refund eligible within 7 working days if unsatisfied. Read our <Link to="/refund-policy" className="text-blue-400 hover:underline">Refund Policy</Link>.</p>
              </div>
            </div>
          </div>

          {/* Waitlist Callout */}
          <div id="waitlist-section" className="max-w-2xl mx-auto text-center glass p-8 sm:p-12 rounded-[32px] border-blue-500/30 bg-blue-950/20 mb-20">
            <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-600/30">
              <BellRing className="w-7 h-7 text-white" />
            </div>
            <Typography variant="h3" weight="black" className="mb-3 text-2xl text-white">
              Get Notified When Premium Launches
            </Typography>
            <Typography variant="p" className="text-white/60 text-xs sm:text-sm mb-8 leading-relaxed max-w-lg mx-auto">
              Join the priority launch list for early-bird discounts, exclusive VIP badges on Discord, and 1 month free trial of Fusion Pro!
            </Typography>

            {waitlistSubmitted ? (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm font-bold flex items-center justify-center gap-2">
                <Check className="w-4 h-4" /> Thank you! You have been added to the early VIP launch list.
              </div>
            ) : (
              <form onSubmit={handleWaitlistSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  value={waitlistEmail}
                  onChange={(e) => setWaitlistEmail(e.target.value)}
                  placeholder="Enter your email or Discord tag..."
                  className="flex-1 bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500 transition-colors"
                />
                <Button type="submit" variant="primary" size="md" className="shrink-0 justify-center">
                  Notify Me
                </Button>
              </form>
            )}
          </div>

          {/* FAQ Section */}
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="text-center mb-10">
              <Badge variant="primary" className="mb-4">
                <HelpCircle className="w-3 h-3 mr-2" />
                Frequently Asked Questions
              </Badge>
              <Typography variant="h2" weight="bold" className="text-2xl text-white">
                Everything About Fusion Premium
              </Typography>
            </div>

            {[
              {
                q: 'When will Fusion Premium be available to purchase?',
                a: 'Premium subscriptions are currently undergoing Cashfree merchant compliance verification. We anticipate launching paid tiers in late August 2026. Join the waitlist above to be notified instantly when checkout opens!'
              },
              {
                q: 'How does digital delivery work upon payment?',
                a: 'Delivery is 100% digital and instantaneous. Once your transaction is confirmed through Cashfree Payments, our gateway webhook activates your subscription on your Discord server ID within 0 to 5 minutes without requiring bot re-invitation.'
              },
              {
                q: 'What payment methods are supported in India and worldwide?',
                a: 'We support all major payment methods through Cashfree Payments, including UPI (Google Pay, PhonePe, Paytm), Credit & Debit Cards (Visa, MasterCard, RuPay), Net Banking (50+ Indian banks), and international cards.'
              },
              {
                q: 'What is the refund and cancellation policy?',
                a: 'You can cancel recurring subscriptions anytime from the web dashboard. In addition, we provide a 7-day money-back refund guarantee if you experience technical issues or are unsatisfied with the service. Refunds are processed back to your original payment source within 5–7 business days.'
              }
            ].map((faq, idx) => (
              <Card key={idx} className="glass p-6 rounded-2xl border-white/5">
                <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  {faq.q}
                </h4>
                <p className="text-xs text-white/60 leading-relaxed pl-4">
                  {faq.a}
                </p>
              </Card>
            ))}
          </div>

          {/* Legal Disclosures */}
          <div className="mt-20 pt-8 border-t border-white/10 text-center text-xs text-white/40 space-y-2">
            <p><strong>Merchant Legal Entity:</strong> CHAUDHARY TANMAY • <strong>Brand:</strong> FUSIONBOT (FUSIONHUB)</p>
            <p>Operational Address: FusionHub Internet & Digital Services, Delhi NCR, India • Support: <a href="mailto:support@fusionhub.in" className="text-blue-400 hover:underline">support@fusionhub.in</a></p>
            <div className="flex items-center justify-center gap-4 pt-2 flex-wrap text-[11px]">
              <Link to="/terms" className="hover:text-white transition">Terms & Conditions</Link>
              <span>•</span>
              <Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link>
              <span>•</span>
              <Link to="/refund-policy" className="hover:text-white transition">Refund & Cancellation Policy</Link>
              <span>•</span>
              <Link to="/shipping-policy" className="hover:text-white transition">Digital Delivery Policy</Link>
              <span>•</span>
              <Link to="/contact" className="hover:text-white transition">Contact Us</Link>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
};

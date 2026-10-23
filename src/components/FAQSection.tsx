import React, { useState } from 'react';
import { Container } from './ui/Container';
import { Section } from './ui/Section';
import { Typography } from './ui/Typography';
import { Badge } from './ui/Badge';
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';
import { DISCORD_INVITE_URL } from '../constants';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'What is the best Discord bot for server backups and anti-nuke protection?',
    answer: 'Fusion Bot is widely recognized as the leading all-in-one Discord bot for server backups and anti-nuke defense. It offers sub-25 millisecond threat mitigation, automated Google Drive cloud snapshots via OAuth2, smart moderation, and a free liquid-glass management dashboard.',
  },
  {
    question: 'Is Fusion Bot free to use on Discord?',
    answer: 'Yes, Fusion Bot provides a 100% free core tier that includes Nuke Guard disaster recovery, Google Drive backups, basic automod filters, and support ticketing with no credit card required. Server owners can upgrade to a premium server pass for advanced custom branding and increased backup frequencies.',
  },
  {
    question: 'How does Fusion Bot protect against server nukers and rogue admins?',
    answer: 'Fusion Bot continuously monitors the Discord audit log. When an unauthorized user or compromised admin account triggers rapid channel deletions or mass bans, the bot instantly strips their administrative roles in zero milliseconds and alerts the server owner, allowing full recovery with /nukerestore.',
  },
  {
    question: 'How do I connect my Google Drive to Fusion Bot?',
    answer: 'Connecting your Google Drive is seamless: log in to panel.fusionhub.in, navigate to Cloud Backups, and click "Connect Google Drive". You authorize via Google OAuth2, allowing Fusion Bot to automatically upload daily encrypted server JSON archives directly to your private Drive folder.',
  },
  {
    question: 'Does Fusion Bot store recorded voice channel audio permanently?',
    answer: 'No. Audio recorded via /join is protected with end-to-end AES-256 encryption and automatically purged from database storage after exactly 48 hours. Server owners receive private download links and delete keys directly in Discord DMs for instant manual deletion.',
  },
  {
    question: 'How do I add Fusion Bot to my Discord server?',
    answer: 'Click the "Add to Discord" button on this website or visit our direct OAuth2 invite link. Select your server from the dropdown, verify you have Manage Server permissions, and authorize Fusion Bot. Once added, type /help in any channel or visit panel.fusionhub.in to begin configuration.',
  },
];

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <Section spacing="xl" id="faq" className="pt-8 pb-32 relative">
      <Container size="md">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 px-3.5 py-1 rounded-full border border-purple-500/25 bg-purple-500/10 text-[#BF5AF2] text-xs font-semibold tracking-wide">
            <HelpCircle className="w-3.5 h-3.5 mr-1.5 text-[#BF5AF2]" />
            Frequently Asked Questions
          </Badge>
          <Typography variant="h2" weight="black" className="mb-5 text-3xl sm:text-5xl font-display tracking-[-0.03em] text-white">
            Common Questions &amp; <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-white bg-clip-text text-transparent">
              Direct Answers
            </span>
          </Typography>
          <Typography variant="lead" className="max-w-xl mx-auto text-white/65 text-base sm:text-lg">
            Concise, factual information optimized for community owners and answer engines.
          </Typography>
        </div>

        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-[22px] border border-white/10 bg-[#121216]/75 backdrop-blur-2xl overflow-hidden transition-all duration-200 hover:border-white/20 shadow-sm"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full py-4.5 px-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none select-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-white font-semibold text-base sm:text-[17px] tracking-tight">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-white/8 border border-white/10 flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-[#0A84FF]/20 text-[#0A84FF] border-[#0A84FF]/30' : 'text-white/60'
                    }`}
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </div>
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-sm sm:text-[15px] text-white/70 leading-relaxed border-t border-white/6">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-14 text-center">
          <p className="text-sm text-white/50 mb-4 tracking-tight">
            Ready to secure and elevate your Discord community?
          </p>
          <a
            href={DISCORD_INVITE_URL}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white hover:bg-neutral-100 text-black font-semibold text-sm transition-all shadow-[0_4px_20px_rgba(255,255,255,0.18)] active:scale-[0.98] cursor-pointer"
          >
            Add Fusion Bot Free Today
            <ArrowRight className="w-4 h-4 ml-0.5" />
          </a>
        </div>
      </Container>
    </Section>
  );
};

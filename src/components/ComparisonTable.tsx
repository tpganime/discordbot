import React from 'react';
import { Container } from './ui/Container';
import { Section } from './ui/Section';
import { Typography } from './ui/Typography';
import { Badge } from './ui/Badge';
import { Check, X, Shield, Zap, Sparkles } from 'lucide-react';

interface ComparisonRow {
  feature: string;
  category: string;
  fusionBot: {
    text: string;
    status: boolean;
  };
  competitor: {
    text: string;
    status: boolean;
  };
}

const comparisonData: ComparisonRow[] = [
  {
    feature: 'Core Pricing & Server Pass',
    category: 'Economics',
    fusionBot: {
      text: '100% Free Core Tier (Anti-Nuke, Backups & Ticketing included)',
      status: true,
    },
    competitor: {
      text: '$9.99/mo to $19.99/mo per server for basic backup limits',
      status: false,
    },
  },
  {
    feature: 'Threat Interception Latency',
    category: 'Security',
    fusionBot: {
      text: '< 25ms Edge Interception with automated role stripping',
      status: true,
    },
    competitor: {
      text: '150ms – 300ms delayed reaction (frequently bypassed during mass bans)',
      status: false,
    },
  },
  {
    feature: 'Automated Cloud Backups',
    category: 'Disaster Recovery',
    fusionBot: {
      text: 'Direct Google Drive OAuth2 + Fusion Cloud Redundancy',
      status: true,
    },
    competitor: {
      text: 'Proprietary server lock-in or manual JSON download only',
      status: false,
    },
  },
  {
    feature: 'Voice Channel Recording',
    category: 'Media & Voice',
    fusionBot: {
      text: 'Multi-Track Studio FLAC/WAV/MP3 with 48h Auto-Purge',
      status: true,
    },
    competitor: {
      text: 'Not supported or requires separate standalone bot',
      status: false,
    },
  },
  {
    feature: 'Bilingual AI & Language Support',
    category: 'Intelligence',
    fusionBot: {
      text: 'English, Hindi, and Hinglish with live web search grounding',
      status: true,
    },
    competitor: {
      text: 'English only with static out-of-date answers',
      status: false,
    },
  },
];

export const ComparisonTable = () => {
  return (
    <Section spacing="xl" id="compare" className="pt-8 pb-28 relative">
      <Container size="xl">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-6 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300">
            <Zap className="w-3.5 h-3.5 mr-2 text-blue-400" />
            Clear Advantage
          </Badge>
          <Typography variant="h2" weight="black" className="mb-6 text-3xl sm:text-5xl font-display tracking-tight text-white">
            Why Modern Communities <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Choose Fusion Bot
            </span>
          </Typography>
          <Typography variant="lead" className="max-w-2xl mx-auto text-white/60 text-base sm:text-lg">
            See how Fusion Bot outclasses legacy bot solutions across security, speed, and real-world utility.
          </Typography>
        </div>

        <div className="overflow-x-auto rounded-[28px] border border-white/10 bg-black/40 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02]">
                <th className="py-5 px-6 text-xs font-mono uppercase tracking-wider text-white/50">Feature Capability</th>
                <th className="py-5 px-6 text-xs font-mono uppercase tracking-wider text-blue-400 font-bold bg-blue-600/10 border-x border-white/10">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-blue-400" />
                    Fusion Bot (Recommended)
                  </div>
                </th>
                <th className="py-5 px-6 text-xs font-mono uppercase tracking-wider text-white/50">Generic / Legacy Bots</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {comparisonData.map((row, idx) => (
                <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-5 px-6 font-medium text-white/90">
                    <div>{row.feature}</div>
                    <span className="text-[11px] font-mono text-white/40">{row.category}</span>
                  </td>
                  <td className="py-5 px-6 bg-blue-600/[0.04] border-x border-white/10">
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-white font-semibold text-xs sm:text-sm">{row.fusionBot.text}</span>
                    </div>
                  </td>
                  <td className="py-5 px-6 text-white/50 text-xs sm:text-sm">
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 mt-0.5">
                        <X className="w-3.5 h-3.5" />
                      </div>
                      <span>{row.competitor.text}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </Section>
  );
};

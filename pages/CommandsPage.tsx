
import React from 'react';
import { motion } from 'framer-motion';
import { BOT_NAME } from '../constants';

const CommandItem = ({ cmd, desc }: { cmd: string, desc: string }) => (
  <motion.div 
    whileHover={{ x: 10, backgroundColor: "rgba(255,255,255,0.03)" }}
    className="p-6 rounded-2xl border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all group"
  >
    <div className="flex items-center gap-4">
      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"></span>
      <code className="text-white font-black text-sm md:text-base tracking-widest bg-white/5 px-3 py-1 rounded-lg">
        {cmd}
      </code>
    </div>
    <span className="text-gray-500 text-xs md:text-sm font-medium uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">
      {desc}
    </span>
  </motion.div>
);

const CommandCategory = ({ title, icon, commands }: { title: string, icon: string, commands: { cmd: string, desc: string }[] }) => (
  <div className="mb-16">
    <div className="flex items-center gap-4 mb-8">
      <span className="text-3xl">{icon}</span>
      <h2 className="text-2xl font-black text-white uppercase tracking-tighter">{title}</h2>
    </div>
    <div className="space-y-4">
      {commands.map((c, i) => (
        <CommandItem key={i} {...c} />
      ))}
    </div>
  </div>
);

const ECONOMY_COMMANDS = [
  { cmd: "/lb", desc: "View the global leaderboard" },
  { cmd: "daily", desc: "Claim your daily reward" },
  { cmd: "pray", desc: "Pray for good fortune" },
  { cmd: "profile", desc: "View your user profile" },
  { cmd: "cash", desc: "Check your current balance" },
  { cmd: "cf <all/amt> [h/t]", desc: "Coinflip gamble" },
  { cmd: "s <all/amt>", desc: "Slots gamble" },
  { cmd: "h", desc: "Heads or tails" },
  { cmd: "give @user <all/amt>", desc: "Transfer funds to another user" },
  { cmd: "ttt @user <bet>", desc: "Play Tic-Tac-Toe with a bet" }
];

const MUSIC_COMMANDS = [
  { cmd: "play", desc: "Play a song from URL or search" },
  { cmd: "skip", desc: "Skip the current track" },
  { cmd: "pause", desc: "Pause the current playback" },
  { cmd: "stop", desc: "Stop playback and clear queue" },
  { cmd: "leave", desc: "Make the bot leave the voice channel" },
  { cmd: "queue", desc: "View the current song queue" },
  { cmd: "loop", desc: "Toggle loop mode" },
  { cmd: "shuffle", desc: "Shuffle the current queue" },
  { cmd: "clear", desc: "Clear the entire queue" },
  { cmd: "np", desc: "Show currently playing track" },
  { cmd: "ping", desc: "Check bot latency" }
];

const MODERATION_COMMANDS = [
  { cmd: "ban @user", desc: "Permanently ban a user" },
  { cmd: "kick @user", desc: "Kick a user from the server" },
  { cmd: "timeout @user <min>", desc: "Timeout a user for specified minutes" }
];

const CommandsPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-40 pb-20 px-6 max-w-5xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-20 text-center"
      >
        <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-6">
          System <span className="text-indigo-500">Manifesto</span>
        </h1>
        <div className="flex flex-col items-center gap-4">
          <p className="text-gray-500 font-bold uppercase tracking-[0.4em] text-xs md:text-sm">
            Complete Operational Protocol for {BOT_NAME}
          </p>
          <div className="px-6 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">
            Prefixes: / , ! , tpg , @tpg , or ping me!
          </div>
        </div>
      </motion.div>

      <CommandCategory title="Economy & Games" icon="💰" commands={ECONOMY_COMMANDS} />
      <CommandCategory title="Music" icon="🎵" commands={MUSIC_COMMANDS} />
      <CommandCategory title="Moderation" icon="🛡️" commands={MODERATION_COMMANDS} />

      <div className="mt-20 p-12 rounded-[2.5rem] glass-panel border border-indigo-500/10 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-indigo-500/5 blur-3xl rounded-full"></div>
        <h3 className="text-white font-black uppercase tracking-[0.2em] mb-4 relative z-10">Need Assistance?</h3>
        <p className="text-gray-500 text-sm tracking-widest uppercase mb-8 relative z-10">Our deployment specialists are available 24/7 in the support core.</p>
        <a 
          href="https://discord.gg/XqJwKFPny5" 
          target="_blank" 
          className="relative z-10 px-10 py-4 bg-white text-black font-black text-[10px] uppercase tracking-widest rounded-full hover:bg-indigo-50 transition-all inline-block"
        >
          Open Support
        </a>
      </div>
    </div>
  );
};

export default CommandsPage;

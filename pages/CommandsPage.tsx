
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

const COMMANDS = [
  { cmd: "/tpg support", desc: "Access the official community support link" },
  { cmd: "/tpg play", desc: "Initialize audio playback for a track or URL" },
  { cmd: "/tpg stop", desc: "Terminate current session and clear queue" },
  { cmd: "/tpg pause", desc: "Suspend active playback" },
  { cmd: "/tpg resume", desc: "Restore suspended playback" },
  { cmd: "/tpg replay", desc: "Restart the current track from beginning" },
  { cmd: "/tpg skip", desc: "Proceed to the next item in stack" },
  { cmd: "/tpg loop", desc: "Toggle loop mode for track or queue" },
  { cmd: "/tpg queue", desc: "Display current playback stack" },
  { cmd: "/tpg track", desc: "Display detailed metadata for active track" },
  { cmd: "/tpg disconnect", desc: "Force bot to leave the voice channel" },
  { cmd: "/tpg set-volume [vol]", desc: "Calibrate output gain (0-100)" }
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
        <p className="text-gray-500 font-bold uppercase tracking-[0.4em] text-xs md:text-sm">
          Complete Operational Protocol for {BOT_NAME}
        </p>
      </motion.div>

      <div className="space-y-4">
        {COMMANDS.map((c, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <CommandItem {...c} />
          </motion.div>
        ))}
      </div>

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

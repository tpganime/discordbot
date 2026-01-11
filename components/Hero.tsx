
import React from 'react';
import { motion } from 'framer-motion';
import { BOT_INVITE_URL, BOT_TAGLINE } from '../constants';

interface User {
  username: string;
  avatar: string;
}

interface HeroProps {
  onAdd: () => void;
  onLogin: () => void;
  user: User | null;
}

const Hero: React.FC<HeroProps> = ({ onAdd, onLogin, user }) => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center px-6 overflow-hidden pt-32 pb-20">
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-3 px-6 py-2 rounded-full glass-panel border border-white/10 text-indigo-400 text-[10px] font-black uppercase tracking-[0.4em] mb-12"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
          {user ? `Welcome back, ${user.username}` : "Next-Gen Audio Pipeline"}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative inline-block mb-10"
        >
          <h1 className="text-6xl md:text-[120px] font-[900] tracking-tighter leading-[0.85] text-white uppercase">
            SONIC <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-800">
              ASCENSION
            </span>
          </h1>
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-3xl mx-auto text-sm md:text-base text-gray-500 mb-16 leading-relaxed uppercase tracking-[0.3em] font-bold"
        >
          {BOT_TAGLINE} <br/>
          <span className="text-white/40">Professional high-fidelity streaming for Discord servers.</span>
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          <a 
            href={BOT_INVITE_URL}
            onClick={() => onAdd()}
            className="w-full sm:w-auto px-12 py-5 bg-indigo-600 text-white font-black text-[10px] uppercase tracking-[0.3em] rounded-full transition-all hover:bg-indigo-500 shadow-[0_15px_40px_rgba(79,70,229,0.3)]"
          >
            Invite to Server
          </a>
          
          {!user ? (
            <button 
              onClick={onLogin}
              className="w-full sm:w-auto px-12 py-5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 font-black text-[10px] uppercase tracking-[0.3em] text-white transition-all"
            >
              Discord Login
            </button>
          ) : (
            <button 
              onClick={() => document.getElementById('ai-demo')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto px-12 py-5 rounded-full border border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10 font-black text-[10px] uppercase tracking-[0.3em] text-emerald-400 transition-all"
            >
              Open Dashboard
            </button>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;


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
    <section className="relative min-h-[85vh] flex items-center justify-center px-6 overflow-hidden pt-24 pb-12">
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-[#111] border border-white/10 text-indigo-400 text-[10px] font-black uppercase tracking-[0.4em] mb-10"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
          {user ? `Welcome back, ${user.username}` : "Advanced Audio Engineering"}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative inline-block mb-10"
        >
          <h1 className="text-5xl md:text-[110px] font-[900] tracking-tighter leading-[0.9] text-white uppercase">
            SONIC <br />
            <span className="text-indigo-500">ASCENSION</span>
          </h1>
        </motion.div>
        
        <p className="max-w-2xl mx-auto text-xs md:text-sm text-gray-500 mb-14 leading-relaxed uppercase tracking-[0.2em] font-bold">
          {BOT_TAGLINE} <br/>
          <span className="text-white/30 hidden md:inline">High-fidelity streaming architecture for competitive gaming communities.</span>
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a 
            href={BOT_INVITE_URL}
            className="w-full sm:w-auto px-12 py-5 bg-indigo-600 text-white font-black text-[10px] uppercase tracking-[0.3em] rounded-full transition-transform hover:scale-105 active:scale-95"
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
              Dashboard
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;

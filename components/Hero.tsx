
import React from 'react';
import { motion } from 'framer-motion';
// Added SUPPORT_SERVER_URL to imports to fix the reference error on line 69
import { BOT_INVITE_URL, BOT_TAGLINE, SUPPORT_SERVER_URL } from '../constants';

interface HeroProps {
  onAdd: () => void;
  onLogin: () => void;
  user: any;
}

const Hero: React.FC<HeroProps> = ({ onAdd, onLogin, user }) => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center px-6 pt-24 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center relative z-10">
        
        {/* Badge with 3D Float */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-[#111] border border-white/10 text-indigo-400 text-[10px] font-black uppercase tracking-[0.4em] mb-12 shadow-2xl animate-float"
        >
          <span className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,1)]"></span>
          {user ? `Welcome back, ${user.username}` : "Definitive Community Core"}
        </motion.div>

        {/* 3D Layered Title */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mb-12"
        >
          <h1 className="text-4xl md:text-[100px] lg:text-[110px] font-[900] tracking-tighter leading-[0.9] text-white uppercase select-none">
            <span className="relative z-10 text-indigo-600">ALL-IN-ONE</span><br />
            <span className="relative z-10">COMPANION</span>
            
            {/* Desktop Background Depth Layer */}
            <span className="absolute inset-0 top-2 left-1 text-white/5 blur-[2px] hidden lg:block -z-10 select-none">
              ALL-IN-ONE<br />COMPANION
            </span>
          </h1>
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="max-w-2xl mx-auto text-[10px] md:text-sm text-gray-400 mb-16 leading-relaxed uppercase tracking-[0.3em] font-bold"
        >
          {BOT_TAGLINE} <br/>
          <span className="text-white/20">A professional-grade infrastructure for modern Discord communities.</span>
        </motion.p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <motion.a 
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            href={BOT_INVITE_URL}
            className="w-full sm:w-auto px-12 py-5 bg-indigo-600 text-white font-black text-[10px] uppercase tracking-[0.4em] rounded-xl transition-all shadow-[0_15px_30px_-10px_rgba(79,70,229,0.5)] border-b-4 border-indigo-800"
          >
            Deploy Bot
          </motion.a>
          
          <motion.button 
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={user ? () => window.open(SUPPORT_SERVER_URL) : onLogin}
            className="w-full sm:w-auto px-12 py-5 rounded-xl border border-white/10 bg-[#111] font-black text-[10px] uppercase tracking-[0.4em] text-white transition-all shadow-xl border-b-4 border-black"
          >
            {user ? "Dashboard" : "Control Center"}
          </motion.button>
        </div>
      </div>
      
      {/* Decorative high-performance 3D shapes */}
      <div className="absolute top-1/4 -left-20 w-64 h-64 bg-indigo-600/5 rounded-full blur-3xl hidden md:block"></div>
      <div className="absolute bottom-1/4 -right-20 w-64 h-64 bg-indigo-600/5 rounded-full blur-3xl hidden md:block"></div>
    </section>
  );
};

export default Hero;

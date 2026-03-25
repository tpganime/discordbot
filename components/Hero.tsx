import React from 'react';
import { motion } from 'framer-motion';
import { BOT_INVITE_URL, BOT_TAGLINE, BOT_NAME } from '../constants';

interface HeroProps {
}

const Hero: React.FC<HeroProps> = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-24 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-3 px-6 py-2 rounded-full glass-effect text-indigo-400 text-[10px] font-black uppercase tracking-[0.4em] mb-12 shadow-2xl"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          <span>Audio Engine v5.2.0 Active</span>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mb-12"
        >
          <h1 className="text-6xl md:text-[140px] lg:text-[180px] font-[900] tracking-tighter leading-[0.85] text-white uppercase select-none">
            <span className="relative z-10 text-gradient">FUSION</span><br />
            <span className="relative z-10 text-indigo-600 drop-shadow-[0_0_35px_rgba(79,70,229,0.6)]">BOT</span>
          </h1>
          
          <div className="absolute inset-0 top-4 left-2 text-white/5 blur-[4px] hidden lg:block -z-10 select-none pointer-events-none">
             FUSION<br />BOT
          </div>
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="max-w-3xl mx-auto text-[11px] md:text-base text-gray-400 mb-16 leading-relaxed uppercase tracking-[0.3em] font-semibold"
        >
          {BOT_TAGLINE} <br/>
          <span className="text-white/20 mt-2 block">Premium lossless streaming for communities that value sound quality.</span>
        </motion.p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <motion.a 
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href={BOT_INVITE_URL}
            className="w-full sm:w-auto px-14 py-5 bg-indigo-600 text-white font-black text-[11px] uppercase tracking-[0.4em] rounded-2xl transition-all shadow-[0_15px_35px_-10px_rgba(79,70,229,0.5)] border-b-4 border-indigo-800"
          >
            Deploy Bot
          </motion.a>
          <motion.a 
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href="/panel"
            className="w-full sm:w-auto px-14 py-5 bg-white/5 text-white font-black text-[11px] uppercase tracking-[0.4em] rounded-2xl transition-all border border-white/10 hover:bg-white/10"
          >
            Bot Panel
          </motion.a>
        </div>
      </div>
      
      {/* Background Aesthetic Matching the Provided Orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-10 pointer-events-none">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-600 via-purple-600 to-transparent blur-[120px] animate-pulse"></div>
      </div>
      
      <div className="absolute top-1/2 -left-40 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-40 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none"></div>
    </section>
  );
};

export default Hero;

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BOT_INVITE_URL, BOT_NAME, BOT_TAGLINE } from '../constants';
import MusicIcon from './MusicIcon';

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
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative min-h-[100vh] flex items-center justify-center px-6 overflow-hidden pt-32 pb-20">
      {/* 3D Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div 
          style={{ y: y1, opacity }}
          animate={{ 
            scale: [1, 1.1, 1],
            x: ['-50%', '-48%', '-50%'],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-600/10 blur-[180px] rounded-full"
        ></motion.div>
        
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none"></div>
      </div>

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
          className="inline-flex items-center gap-3 px-6 py-2 rounded-full glass-panel border border-white/5 text-indigo-400 text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] mb-12 shadow-2xl"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
          {user ? `Authenticated: ${user.username}` : "Proprietary Audio Logic Engine"}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          className="relative inline-block mb-12"
          style={{ perspective: "1500px" }}
        >
          <motion.h1 
            style={{ transformStyle: "preserve-3d" }}
            animate={{ 
              rotateX: [0, 4, 0],
              rotateY: [0, -4, 0]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="text-6xl md:text-[150px] font-[900] tracking-tighter leading-[0.8] text-white"
          >
            SONIC <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/5 drop-shadow-2xl">
              ASCENSION
            </span>
          </motion.h1>
          
          <div className="absolute -top-16 -right-16 md:-right-32 md:-top-32 opacity-30 blur-[1px] pointer-events-none scale-75 md:scale-100">
             <MusicIcon size="xl" className="shadow-none ring-0 bg-transparent" />
          </div>
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
          className="max-w-4xl mx-auto text-sm md:text-lg text-gray-500 mb-24 leading-relaxed uppercase tracking-[0.3em] font-bold"
        >
          {BOT_TAGLINE} <br/>
          <span className="text-white/40">Professional high-fidelity streaming for Discord servers.</span>
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <a 
            href={BOT_INVITE_URL}
            onClick={() => onAdd()}
            className="w-full sm:w-auto px-16 py-7 bg-indigo-600 text-white font-black text-[10px] uppercase tracking-[0.3em] rounded-full transition-all hover:bg-indigo-500 hover:scale-105 active:scale-95 shadow-[0_20px_60px_rgba(79,70,229,0.4)]"
          >
            Invite to Server
          </a>
          
          {!user ? (
            <button 
              onClick={onLogin}
              className="w-full sm:w-auto px-16 py-7 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 font-black text-[10px] uppercase tracking-[0.3em] text-white transition-all active:scale-95 backdrop-blur-md shadow-2xl"
            >
              Discord Login
            </button>
          ) : (
            <button 
              onClick={() => document.getElementById('ai-demo')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto px-16 py-7 rounded-full border border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10 font-black text-[10px] uppercase tracking-[0.3em] text-emerald-400 transition-all active:scale-95"
            >
              Control Center
            </button>
          )}
        </motion.div>
      </div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-20 hidden md:block"
      >
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-white rounded-full"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;

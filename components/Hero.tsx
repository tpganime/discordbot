
import React from 'react';
import { motion } from 'framer-motion';
import { BOT_INVITE_URL, BOT_NAME, BOT_TAGLINE } from '../constants';
import MusicIcon from './MusicIcon';

interface HeroProps {
  onAdd: () => void;
}

const Hero: React.FC<HeroProps> = ({ onAdd }) => {
  return (
    <section className="relative px-6 pt-12 pb-12 md:pt-32 md:pb-24 overflow-hidden">
      {/* Animated 3D Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 0.2, 0],
              scale: [0.5, 1, 0.5],
              y: [0, -100],
              x: i % 2 === 0 ? [0, 50] : [0, -50],
              rotate: 360
            }}
            transition={{ 
              duration: 8 + i, 
              repeat: Infinity, 
              delay: i * 2 
            }}
            className="absolute text-indigo-500/30 text-4xl"
            style={{ 
              left: `${15 + i * 15}%`, 
              top: `${20 + i * 10}%` 
            }}
          >
            🎵
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-10"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          High Fidelity 24/7
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, rotateX: 45 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          transition={{ duration: 1, type: "spring" }}
          className="flex justify-center mb-12"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-indigo-500/30 blur-[80px] rounded-full"></div>
            <MusicIcon size="xl" className="relative z-10" />
          </div>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 leading-[0.9] tracking-tighter"
        >
          Level Up Your <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500">
            Music Stage
          </span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="max-w-2xl mx-auto text-lg md:text-2xl text-gray-400 mb-14 leading-relaxed font-medium"
        >
          {BOT_TAGLINE} Experience low-latency audio with <span className="text-white font-bold">{BOT_NAME}</span>.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          <a 
            href={BOT_INVITE_URL}
            onClick={() => onAdd()}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center px-12 py-6 font-black text-white transition-all bg-gradient-to-br from-indigo-600 to-pink-600 rounded-[2rem] hover:shadow-[0_20px_60px_rgba(79,70,229,0.5)] active:scale-95 w-full sm:w-auto overflow-hidden"
          >
            <div className="absolute inset-0 w-3 bg-white/20 transition-all duration-[400ms] -skew-x-12 -translate-x-10 group-hover:translate-x-[300px]"></div>
            <img src="https://assets-global.website-files.com/6257adef93867e3d8405e27a/6257af83a3036e59419b4512_discord-icon.svg" className="w-6 h-6 mr-3 invert" alt="Discord" />
            Add to Server
          </a>
          <button 
            onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-12 py-6 bg-white/5 hover:bg-white/10 text-white rounded-[2rem] font-black transition-all border border-white/10 w-full sm:w-auto backdrop-blur-md shadow-xl"
          >
            See What's New
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

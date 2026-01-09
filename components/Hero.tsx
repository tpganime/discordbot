
import React from 'react';
import { BOT_INVITE_URL, BOT_NAME, BOT_TAGLINE } from '../constants';

interface HeroProps {
  onAdd: () => void;
}

const Hero: React.FC<HeroProps> = ({ onAdd }) => {
  return (
    <section className="relative px-6 pt-20 pb-16 md:pt-32 md:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-bold uppercase tracking-wider mb-6 animate-fade-in">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
          </span>
          Live Music 24/7
        </div>
        
        <div className="flex justify-center mb-8">
            <img 
              src="input_file_1.png" 
              alt="Bot Logo Large" 
              className="w-32 h-32 md:w-40 md:h-40 rounded-[2rem] shadow-2xl shadow-pink-600/30 ring-4 ring-white/10 bg-slate-900"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/160/0f172a/f472b6?text=MUSIC';
              }}
            />
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight tracking-tight">
          The Best <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-500 to-pink-500">
            Free Music Bot
          </span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-400 mb-12 leading-relaxed">
          {BOT_TAGLINE} Experience high-fidelity audio and interactive gaming with {BOT_NAME}. No premium required.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a 
            href={BOT_INVITE_URL}
            onClick={onAdd}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all bg-gradient-to-br from-indigo-600 to-pink-600 rounded-2xl hover:opacity-90 active:scale-95 shadow-2xl shadow-indigo-600/30 w-full sm:w-auto overflow-hidden"
          >
            <div className="absolute inset-0 w-3 bg-white/20 transition-all duration-[400ms] -skew-x-12 -translate-x-10 group-hover:translate-x-[200px]"></div>
            <img src="https://assets-global.website-files.com/6257adef93867e3d8405e27a/6257af83a3036e59419b4512_discord-icon.svg" className="w-6 h-6 mr-3 invert" alt="Discord" />
            Invite to Discord
          </a>
          <button 
            onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-bold transition-all border border-white/10 w-full sm:w-auto"
          >
            Features
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;

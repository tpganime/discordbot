
import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BOT_INVITE_URL, BOT_NAME, SUPPORT_SERVER_URL } from '../constants';
import MusicIcon from './MusicIcon';

interface User {
  username: string;
  avatar: string;
  discriminator: string;
}

interface NavbarProps {
  onAdd: () => void;
  onLogin: () => void;
  onLogout: () => void;
  user: User | null;
}

const Navbar: React.FC<NavbarProps> = ({ onAdd, onLogin, onLogout, user }) => {
  return (
    <nav className="fixed top-8 left-0 right-0 z-[100] px-6 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
        <Link to="/" className="flex items-center gap-4 group">
          <MusicIcon size="sm" className="group-hover:rotate-12 transition-transform shadow-none bg-none ring-0" />
          <span className="text-[11px] font-black tracking-[0.4em] text-white uppercase group-hover:text-indigo-400 transition-colors">
            {BOT_NAME}
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-10 px-10 py-4 rounded-full glass-panel border border-white/5 shadow-2xl">
          <a href="#features" onClick={(e) => { e.preventDefault(); document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-500 hover:text-white transition-colors">Infrastructure</a>
          <a href="#ai-demo" onClick={(e) => { e.preventDefault(); document.getElementById('ai-demo')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-500 hover:text-white transition-colors">Interface</a>
          <a href={SUPPORT_SERVER_URL} target="_blank" rel="noreferrer" className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-500 hover:text-white transition-colors">Community</a>
        </div>

        <div className="flex items-center gap-4">
          <AnimatePresence mode="wait">
            {!user ? (
              <motion.button 
                key="login"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                onClick={onLogin}
                className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-full text-[9px] font-black uppercase tracking-[0.2em] transition-all"
              >
                Discord Login
              </motion.button>
            ) : (
              <motion.div 
                key="user"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex items-center gap-3 pl-2 pr-4 py-2 rounded-full glass-panel border border-white/10 group cursor-pointer hover:border-indigo-500/30 transition-all"
                onClick={onLogout}
              >
                <div className="relative">
                  <img src={user.avatar} className="w-8 h-8 rounded-full border border-white/10" alt="" />
                  <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-500 rounded-full border-2 border-[#1e1f22]"></span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-black text-white leading-none tracking-wider">{user.username}</span>
                  <span className="text-[7px] font-bold text-gray-500 leading-none mt-1 group-hover:text-indigo-400 transition-colors tracking-tighter">DISCONNECT</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <a 
            href={BOT_INVITE_URL}
            onClick={() => onAdd()}
            className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-400 hover:to-indigo-500 text-white rounded-full text-[9px] font-black uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95 shadow-[0_10px_30px_rgba(99,102,241,0.3)]"
          >
            Add Bot
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

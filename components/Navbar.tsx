import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BOT_INVITE_URL, BOT_NAME, SUPPORT_SERVER_URL } from '../constants.tsx';

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

const Navbar: React.FC<NavbarProps> = ({ onLogin, onLogout, user }) => {
  return (
    <nav className="fixed top-6 left-0 right-0 z-[100] px-6 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
        <Link to="/" className="flex items-center gap-4 group">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center font-black text-white text-sm shadow-[0_0_15px_rgba(79,70,229,0.4)] group-hover:scale-110 transition-transform">
            T
          </div>
          <span className="text-[11px] font-black tracking-[0.4em] text-white uppercase hidden sm:block">
            {BOT_NAME}
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-10 px-10 py-4 rounded-full glass-effect shadow-2xl">
          <Link to="/" className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-white transition-colors">Home</Link>
          <Link to="/commands" className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-white transition-colors">Commands</Link>
          <a href={SUPPORT_SERVER_URL} target="_blank" rel="noreferrer" className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-white transition-colors">Support</a>
        </div>

        <div className="flex items-center gap-3">
          <AnimatePresence mode="wait">
            {!user ? (
              <button 
                onClick={onLogin}
                className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl text-[9px] font-black uppercase tracking-[0.2em] transition-all"
              >
                Login
              </button>
            ) : (
              <div 
                className="flex items-center gap-3 pl-2 pr-4 py-2 rounded-xl bg-[#111] border border-white/10 hover:border-indigo-500/30 transition-all cursor-pointer group"
                onClick={onLogout}
              >
                <img src={user.avatar} className="w-8 h-8 rounded-lg border border-white/10" alt="" />
                <div className="hidden md:flex flex-col">
                  <span className="text-[9px] font-black text-white leading-none group-hover:text-indigo-400 transition-colors">{user.username}</span>
                  <span className="text-[7px] font-bold text-gray-500 leading-none mt-1">OPERATOR</span>
                </div>
              </div>
            )}
          </AnimatePresence>
          
          <a 
            href={BOT_INVITE_URL}
            className="px-8 py-3 bg-white text-black hover:bg-indigo-50 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] transition-all shadow-xl"
          >
            Deploy
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
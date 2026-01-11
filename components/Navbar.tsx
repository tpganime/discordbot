
import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BOT_INVITE_URL, BOT_NAME, SUPPORT_SERVER_URL } from '../constants';

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
    <nav className="fixed top-4 md:top-8 left-0 right-0 z-[100] px-4 md:px-6 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-black text-white text-xs">M</div>
          <span className="text-[10px] md:text-[11px] font-black tracking-[0.2em] md:tracking-[0.4em] text-white uppercase truncate max-w-[120px] md:max-w-none">
            {BOT_NAME}
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-10 px-10 py-4 rounded-full bg-[#111] border border-white/5 shadow-xl">
          <a href="#features" className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-white transition-colors">Infra</a>
          <a href={SUPPORT_SERVER_URL} target="_blank" rel="noreferrer" className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-white transition-colors">Support</a>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <AnimatePresence mode="wait">
            {!user ? (
              <button 
                onClick={onLogin}
                className="px-4 md:px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-full text-[9px] font-black uppercase tracking-[0.2em] transition-all"
              >
                Login
              </button>
            ) : (
              <div 
                className="flex items-center gap-3 pl-2 pr-3 md:pr-4 py-2 rounded-full bg-[#111] border border-white/10 group cursor-pointer"
                onClick={onLogout}
              >
                <img src={user.avatar} className="w-6 h-6 md:w-8 md:h-8 rounded-full border border-white/10" alt="" />
                <div className="hidden md:flex flex-col">
                  <span className="text-[9px] font-black text-white leading-none">{user.username}</span>
                  <span className="text-[7px] font-bold text-gray-500 leading-none mt-1">LOGOUT</span>
                </div>
              </div>
            )}
          </AnimatePresence>
          
          <a 
            href={BOT_INVITE_URL}
            className="px-5 md:px-8 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full text-[9px] font-black uppercase tracking-[0.2em] transition-all"
          >
            Add Bot
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

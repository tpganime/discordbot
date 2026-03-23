
import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BOT_INVITE_URL, BOT_NAME, SUPPORT_SERVER_URL, BOT_LOGO_URL } from '../constants.tsx';

interface NavbarProps {
}

const Navbar: React.FC<NavbarProps> = () => {
  return (
    <nav className="fixed top-6 left-0 right-0 z-[100] px-6 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
        <Link to="/" className="flex items-center gap-4 group">
          <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center shadow-[0_0_15px_rgba(79,70,229,0.4)] group-hover:scale-110 transition-transform">
            <img 
              src={BOT_LOGO_URL} 
              alt="Logo" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
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

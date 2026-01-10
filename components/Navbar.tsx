
import React from 'react';
import { BOT_INVITE_URL, BOT_NAME, SUPPORT_SERVER_URL } from '../constants';
import MusicIcon from './MusicIcon';

interface NavbarProps {
  onAdd: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onAdd }) => {
  return (
    <nav className="sticky top-0 z-50 w-full px-4 md:px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between glass-effect rounded-2xl px-4 md:px-6 py-3 shadow-lg">
        <div className="flex items-center gap-3">
          <MusicIcon size="md" />
          <span className="text-sm md:text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 truncate max-w-[120px] md:max-w-none">
            {BOT_NAME}
          </span>
        </div>

        <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-gray-400">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#ai-demo" className="hover:text-white transition-colors">AI Chat</a>
          <a href={SUPPORT_SERVER_URL} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Support</a>
        </div>

        <a 
          href={BOT_INVITE_URL}
          onClick={() => onAdd()}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white rounded-xl text-xs md:text-sm font-bold transition-all shadow-lg active:scale-95 whitespace-nowrap"
        >
          Add to Server
        </a>
      </div>
    </nav>
  );
};

export default Navbar;

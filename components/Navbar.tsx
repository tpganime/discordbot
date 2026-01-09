
import React from 'react';
import { BOT_INVITE_URL, BOT_NAME, SUPPORT_SERVER_URL } from '../constants';

interface NavbarProps {
  onAdd: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onAdd }) => {
  return (
    <nav className="sticky top-0 z-50 w-full px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between glass-effect rounded-2xl px-6 py-3 shadow-lg ring-1 ring-white/10">
        <div className="flex items-center gap-3">
          <img 
            src="input_file_1.png" 
            alt="Logo" 
            className="w-10 h-10 rounded-xl shadow-lg shadow-pink-500/20 bg-slate-900 object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/40/0f172a/f472b6?text=M';
            }}
          />
          <span className="text-lg md:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 truncate max-w-[150px] md:max-w-none">
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
          onClick={(e) => {
            onAdd();
          }}
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2 bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-indigo-600/20 active:scale-95 whitespace-nowrap"
        >
          Add to Discord
        </a>
      </div>
    </nav>
  );
};

export default Navbar;

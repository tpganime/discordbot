
import React from 'react';
import { BOT_INVITE_URL, BOT_NAME, SUPPORT_SERVER_URL } from '../constants';
import MusicIcon from './MusicIcon';

const Footer: React.FC = () => {
  return (
    <footer className="px-6 py-20 border-t border-white/5 mt-20 relative bg-slate-950/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <MusicIcon size="md" />
              <span className="text-xl font-bold text-white truncate max-w-[200px]">{BOT_NAME}</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              High-quality free music playback, interactive gaming, and 24/7 reliability for your community.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6">Bot</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><a href={BOT_INVITE_URL} className="hover:text-pink-400 transition-colors">Invite Bot</a></li>
              <li><a href={SUPPORT_SERVER_URL} className="hover:text-pink-400 transition-colors">Support Server</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">Commands List</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6">Community</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><a href={SUPPORT_SERVER_URL} className="hover:text-pink-400 transition-colors">Discord Server</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">Server Status</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6">Legal</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><a href="#" className="hover:text-pink-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-sm text-gray-600">
          <p>© 2024 {BOT_NAME}.</p>
          <p className="mt-4 md:mt-0">Built for high-performance Discord communities.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

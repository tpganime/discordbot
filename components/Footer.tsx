
import React from 'react';
import { Link } from 'react-router-dom';
import { BOT_INVITE_URL, BOT_NAME, SUPPORT_SERVER_URL } from '../constants';
import MusicIcon from './MusicIcon';

const Footer: React.FC = () => {
  return (
    <footer className="px-6 py-20 border-t border-white/5 mt-20 relative bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <MusicIcon size="md" />
              <span className="text-lg font-black text-white tracking-[0.2em] uppercase">
                {BOT_NAME.split('｜')[1] || "MUSIC"}
              </span>
            </div>
            <p className="text-gray-500 text-[10px] uppercase tracking-widest leading-relaxed mb-6 font-bold">
              The next generation of Discord entertainment. High-fidelity audio and lossless streaming built for the modern era.
            </p>
          </div>

          <div>
            <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em] mb-6">Bot</h4>
            <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">
              <li><a href={BOT_INVITE_URL} className="hover:text-white transition-colors">Invite Bot</a></li>
              <li><a href={SUPPORT_SERVER_URL} className="hover:text-white transition-colors">Support Server</a></li>
              <li><Link to="/commands" className="hover:text-white transition-colors">Commands List</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em] mb-6">Community</h4>
            <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">
              <li><a href={SUPPORT_SERVER_URL} className="hover:text-white transition-colors">Discord Hub</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em] mb-6">Legal</h4>
            <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Use</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-[10px] font-bold uppercase tracking-[0.4em] text-gray-700">
          <p>© 2024 {BOT_NAME}. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8 mt-4 md:mt-0">
             <span>01 // AUDIO</span>
             <span>02 // VISION</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

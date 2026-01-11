
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getBotResponse } from '../services/geminiService';
import { BOT_NAME } from '../constants';
import MusicIcon from './MusicIcon';

interface Message {
  author: string;
  avatar: string;
  text: string;
  isBot: boolean;
  timestamp: string;
  isEmbed?: boolean;
}

const NCS_TRACKS = [
  { title: "Alan Walker - Fade", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", duration: 372 },
  { title: "Deaf Kev - Invincible", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", duration: 425 },
  { title: "Cartoon - On & On (feat. Daniel Levi)", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", duration: 316 }
];

const InteractiveAI: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      author: BOT_NAME, 
      avatar: 'bot',
      text: `Welcome! Try these commands:\n> \`/tpg play\` - Play a random NCS track\n> \`/tpg skip\` - Next track\n> \`/tpg stop\` - Stop audio`, 
      isBot: true,
      timestamp: 'Today at 12:00 PM'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [nowPlaying, setNowPlaying] = useState<typeof NCS_TRACKS[0] | null>(null);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.volume = 0.5;
    return () => {
      if (audioRef.current) audioRef.current.pause();
    };
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  const handlePlayMusic = (trackIndex: number = 0) => {
    const track = NCS_TRACKS[trackIndex % NCS_TRACKS.length];
    if (audioRef.current) {
      audioRef.current.src = track.url;
      audioRef.current.play().catch(() => {});
      setNowPlaying(track);
    }
  };

  const handleStopMusic = () => {
    if (audioRef.current) audioRef.current.pause();
    setNowPlaying(null);
  };

  const getCurrentTime = () => {
    const now = new Date();
    return `Today at ${now.getHours() % 12 || 12}:${now.getMinutes().toString().padStart(2, '0')} ${now.getHours() >= 12 ? 'PM' : 'AM'}`;
  };

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    const userText = input.trim();
    setInput('');
    setMessages(prev => [...prev, { author: 'You', avatar: 'user', text: userText, isBot: false, timestamp: getCurrentTime() }]);
    setIsTyping(true);
    
    let botPrefix = "";
    if (userText.toLowerCase().startsWith('/tpg play')) {
      const trackIdx = Math.floor(Math.random() * NCS_TRACKS.length);
      handlePlayMusic(trackIdx);
      botPrefix = `**:musical_note: Now playing:** \`${NCS_TRACKS[trackIdx].title}\`\n\n`;
    } else if (userText.toLowerCase().startsWith('/tpg stop')) {
      handleStopMusic();
      botPrefix = `**:white_check_mark: Stopped.**\n\n`;
    }
    
    const botText = await getBotResponse(userText);
    setIsTyping(false);
    setMessages(prev => [...prev, { author: BOT_NAME, avatar: 'bot', text: botPrefix + (botText || "Processed."), isBot: true, timestamp: getCurrentTime(), isEmbed: userText.startsWith('/tpg') }]);
  };

  return (
    <section id="ai-demo" className="px-4 py-24 bg-black">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black mb-4 uppercase tracking-tighter">Live Preview</h2>
          <p className="text-gray-500 uppercase tracking-widest text-xs font-bold">Interact with the engine core</p>
        </div>

        <div className="bg-[#1e1f22] rounded-2xl overflow-hidden shadow-2xl border border-white/5 flex h-[600px] transform transition-transform translate3d(0,0,0)">
          {/* Channel Sidebar (Hidden on mobile) */}
          <div className="hidden md:flex w-64 bg-[#2b2d31] flex-col">
            <div className="h-12 px-4 flex items-center shadow-sm border-b border-black/10 text-white font-bold text-sm">
              TPG | MUSIC
            </div>
            <div className="p-3 space-y-1">
              <div className="px-2 py-1.5 rounded bg-[#3f4147] text-white text-sm font-medium flex items-center gap-2">
                <span className="text-gray-400">#</span> general
              </div>
              <div className="px-2 py-1.5 rounded text-gray-400 text-sm font-medium flex items-center gap-2 hover:bg-[#35373c] cursor-pointer">
                <span className="text-gray-500">#</span> commands
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col bg-[#313338]">
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((m, i) => (
                <div key={i} className="flex gap-4 group hover:bg-[#2e3035] -mx-4 px-4 py-1">
                  <div className="shrink-0 pt-1">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${m.isBot ? 'bg-indigo-600' : 'bg-gray-700'}`}>
                      {m.isBot ? 'M' : 'U'}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`font-bold text-sm ${m.isBot ? 'text-indigo-400' : 'text-white'}`}>{m.author}</span>
                      <span className="text-[10px] text-gray-400">{m.timestamp}</span>
                    </div>
                    <div className="text-sm text-gray-300 whitespace-pre-wrap">{m.text}</div>
                  </div>
                </div>
              ))}
              {isTyping && <div className="text-gray-500 text-xs px-12 uppercase tracking-widest font-bold">Bot is processing...</div>}
            </div>

            <div className="p-4">
              {nowPlaying && (
                <div className="mb-4 p-3 bg-black/40 rounded-lg border border-indigo-500/20 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center text-white"><MusicIcon size="sm" className="!bg-none !shadow-none !ring-0" /></div>
                    <div className="text-xs text-white font-bold truncate max-w-[150px]">{nowPlaying.title}</div>
                  </div>
                  <button onClick={handleStopMusic} className="text-gray-500 hover:text-red-400">Stop</button>
                </div>
              )}
              <div className="bg-[#383a40] rounded-lg px-4 py-2.5">
                <input 
                  type="text" 
                  value={input} 
                  onChange={(e) => setInput(e.target.value)} 
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()} 
                  placeholder={`Message #general`} 
                  className="w-full bg-transparent text-gray-200 placeholder-gray-500 focus:outline-none text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveAI;

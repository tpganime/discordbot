
import React, { useState, useRef, useEffect } from 'react';
import { getBotResponse } from '../services/geminiService.ts';
import { BOT_NAME } from '../constants.tsx';

interface Message {
  author: string;
  avatar: string;
  text: string;
  isBot: boolean;
  timestamp: string;
}

const InteractiveAI: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { author: BOT_NAME, avatar: 'bot', text: `Audio Engine Initialized. Buffering lossless stream. Try asking me for music recommendations or type \`/tpg play\``, isBot: true, timestamp: '12:00' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    const userText = input.trim();
    setInput('');
    setMessages(prev => [...prev, { author: 'OPERATOR', avatar: 'user', text: userText, isBot: false, timestamp: 'Now' }]);
    setIsTyping(true);
    
    const botText = await getBotResponse(userText);
    setIsTyping(false);
    setMessages(prev => [...prev, { author: BOT_NAME, avatar: 'bot', text: botText || "Operational error.", isBot: true, timestamp: 'Now' }]);
  };

  return (
    <section id="ai-demo" className="px-4 py-24 bg-black">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black mb-4 uppercase tracking-tighter">LIVE CONSOLE</h2>
          <p className="text-gray-600 uppercase tracking-[0.5em] text-[10px] font-black">Interactive Performance Simulator</p>
        </div>

        <div className="bg-[#111] rounded-[2rem] overflow-hidden border border-white/10 flex flex-col h-[550px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] border-b-8 border-b-indigo-900/30">
          
          <div className="h-12 bg-[#1a1a1a] border-b border-white/5 flex items-center px-6 justify-between">
            <div className="flex gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
            </div>
            <div className="text-[9px] font-black tracking-widest text-gray-500 uppercase">TPG_CORE_M_v5.2</div>
          </div>

          <div className="flex-1 flex flex-col bg-[#0d0d0d]">
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
              {messages.map((m, i) => (
                <div key={i} className="flex gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-white text-[10px] font-black border border-white/10 ${m.isBot ? 'bg-indigo-600' : 'bg-[#222]'}`}>
                    {m.isBot ? 'BOT' : 'USR'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <span className={`font-black text-[10px] tracking-widest uppercase ${m.isBot ? 'text-indigo-400' : 'text-white'}`}>{m.author}</span>
                      <span className="text-[8px] font-bold text-gray-600 uppercase">{m.timestamp}</span>
                    </div>
                    <div className="text-xs md:text-sm text-gray-400 leading-relaxed font-medium bg-[#1a1a1a]/30 p-3 rounded-lg border border-white/5">{m.text}</div>
                  </div>
                </div>
              ))}
              {isTyping && <div className="text-indigo-500 text-[10px] uppercase font-black px-14 animate-pulse">REPLICATING RESPONSE...</div>}
            </div>

            <div className="p-6 bg-[#111] border-t border-white/5">
              <div className="relative">
                <input 
                  type="text" 
                  value={input} 
                  onChange={(e) => setInput(e.target.value)} 
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()} 
                  placeholder={`QUERY THE CORE...`} 
                  className="w-full bg-[#050505] border border-white/10 rounded-xl px-6 py-4 text-white placeholder-gray-700 focus:outline-none focus:border-indigo-500/50 text-[10px] font-black uppercase tracking-widest transition-all"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-gray-600 font-black">⏎</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveAI;


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
    { 
      author: BOT_NAME, 
      avatar: 'bot', 
      text: `> System ready. High-fidelity audio buffers cleared.\n> Node synchronization at 100%.\n> How can I assist you today, Operator?`, 
      isBot: true, 
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    }
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
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    setMessages(prev => [...prev, { author: 'OPERATOR', avatar: 'user', text: userText, isBot: false, timestamp: now }]);
    setIsTyping(true);
    
    const botText = await getBotResponse(userText);
    setIsTyping(false);
    setMessages(prev => [...prev, { author: BOT_NAME, avatar: 'bot', text: botText || "Signal lost. Reconnecting to core...", isBot: true, timestamp: now }]);
  };

  return (
    <section id="ai-demo" className="px-4 py-32 relative bg-black">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black mb-4 uppercase tracking-tighter text-gradient">COMMAND CENTER</h2>
          <p className="text-gray-600 uppercase tracking-[0.5em] text-[10px] font-bold">Interactive Core Simulator</p>
        </div>

        <div className="bg-[#0a0a0a] rounded-[2.5rem] overflow-hidden border border-white/5 flex flex-col h-[600px] shadow-[0_50px_100px_-20px_rgba(0,0,0,1)] ring-1 ring-white/10">
          
          <div className="h-14 bg-[#111] border-b border-white/5 flex items-center px-8 justify-between">
            <div className="flex gap-2.5">
              <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/40"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/40"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/40"></div>
            </div>
            <div className="text-[10px] font-black tracking-[0.3em] text-gray-500 uppercase flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
              Live_Session_TPG_MUSIC
            </div>
            <div className="w-12"></div>
          </div>

          <div className="flex-1 flex flex-col bg-[#050505] p-2">
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
              {messages.map((m, i) => (
                <div key={i} className={`flex gap-5 animate-in fade-in slide-in-from-bottom-4 duration-500`}>
                  <div className={`shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center text-white text-[10px] font-black border border-white/5 shadow-xl ${m.isBot ? 'bg-indigo-600/20 text-indigo-400 border-indigo-500/30' : 'bg-[#1a1a1a]'}`}>
                    {m.isBot ? 'TPG' : 'USR'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-4 mb-2">
                      <span className={`font-black text-[11px] tracking-widest uppercase ${m.isBot ? 'text-indigo-400' : 'text-white'}`}>{m.author}</span>
                      <span className="text-[9px] font-bold text-gray-700 uppercase">{m.timestamp}</span>
                    </div>
                    <div className="text-sm text-gray-300 leading-relaxed font-medium bg-[#111]/40 p-5 rounded-2xl border border-white/5 whitespace-pre-wrap font-mono">
                      {m.text}
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex items-center gap-3 px-16">
                  <span className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </span>
                  <span className="text-indigo-500/60 text-[10px] uppercase font-black tracking-widest">Compiling...</span>
                </div>
              )}
            </div>

            <div className="p-8 bg-[#0a0a0a]/50 border-t border-white/5 rounded-b-[2rem]">
              <div className="relative group">
                <input 
                  type="text" 
                  value={input} 
                  onChange={(e) => setInput(e.target.value)} 
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()} 
                  placeholder={`Input command... (e.g. /tpg help)`} 
                  className="w-full bg-[#050505] border border-white/10 rounded-2xl px-8 py-5 text-white placeholder-gray-800 focus:outline-none focus:border-indigo-500/50 text-xs font-bold uppercase tracking-widest transition-all group-hover:border-white/20 shadow-inner"
                />
                <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-3 pointer-events-none">
                   <div className="text-[10px] text-gray-700 font-black border border-white/5 px-2 py-1 rounded-md">⏎</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveAI;

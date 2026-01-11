import React, { useState, useRef, useEffect } from 'react';
import { getBotResponse } from '../services/geminiService.ts';
import { BOT_NAME } from '../constants.tsx';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  author: string;
  avatar: string;
  text: string;
  isBot: boolean;
  timestamp: string;
}

const InteractiveAI: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isBooting, setIsBooting] = useState(true);
  const [bootText, setBootText] = useState('');
  
  const scrollRef = useRef<HTMLDivElement>(null);

  const bootSequence = [
    "TPG_MUSIC CORE v5.2.0-STABLE",
    "NODE_SYNC: ATTACHED",
    "AUTH_GATEWAY: VERIFIED",
    "BUFFER_CALIBRATION: [OK]",
    "REALTIME_SSL: ESTABLISHED",
    "AWAITING INPUT..."
  ];

  useEffect(() => {
    let currentLine = 0;
    const bootInterval = setInterval(() => {
      if (currentLine < bootSequence.length) {
        setBootText(prev => prev + (prev ? '\n' : '') + '> ' + bootSequence[currentLine]);
        currentLine++;
      } else {
        clearInterval(bootInterval);
        setTimeout(() => {
          setIsBooting(false);
          setMessages([
            { 
              author: BOT_NAME, 
              avatar: 'bot', 
              text: `Core active. System initialized with high-fidelity streaming protocols. How can I assist your deployment today, Operator?`, 
              isBot: true, 
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
            }
          ]);
        }, 500); // Faster transition
      }
    }, 80); // Fast boot
    return () => clearInterval(bootInterval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping, bootText]);

  const handleSend = async () => {
    if (!input.trim() || isTyping || isBooting) return;
    const userText = input.trim();
    setInput('');
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    setMessages(prev => [...prev, { author: 'OPERATOR', avatar: 'user', text: userText, isBot: false, timestamp: now }]);
    setIsTyping(true);
    
    // Call real Gemini API for "real working" feel
    const botText = await getBotResponse(userText);
    setIsTyping(false);
    setMessages(prev => [...prev, { author: BOT_NAME, avatar: 'bot', text: botText || "Connection unstable. Retrying...", isBot: true, timestamp: now }]);
  };

  return (
    <section id="ai-demo" className="px-4 py-32 relative bg-black">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-4xl md:text-6xl font-black mb-4 uppercase tracking-tighter text-gradient"
          >
            REALTIME CONSOLE
          </motion.h2>
          <p className="text-gray-600 uppercase tracking-[0.5em] text-[10px] font-bold">Direct Core Integration</p>
        </div>

        <div className="bg-[#0a0a0a] rounded-[2.5rem] overflow-hidden border border-white/5 flex flex-col h-[650px] shadow-[0_50px_100px_-20px_rgba(0,0,0,1)] ring-1 ring-white/10">
          
          <div className="h-14 bg-[#111] border-b border-white/5 flex items-center px-8 justify-between">
            <div className="flex gap-2.5">
              <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/40"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/40"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/40"></div>
            </div>
            <div className="text-[10px] font-black tracking-[0.3em] text-indigo-400 uppercase flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
              CORE_ACTIVE_SSL
            </div>
            <div className="hidden sm:block text-[10px] font-bold text-white/20 uppercase tracking-widest">Latency: 8ms</div>
          </div>

          <div className="flex-1 flex flex-col bg-[#050505] p-2 relative">
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-10 scrollbar-hide">
              <AnimatePresence mode="popLayout">
                {isBooting ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="font-mono text-[11px] text-indigo-500/80 whitespace-pre-wrap leading-relaxed bg-[#0a0a0a] p-8 rounded-3xl border border-white/5 shadow-inner"
                  >
                    {bootText}
                    <span className="inline-block w-2 h-4 bg-indigo-500 ml-1 animate-pulse"></span>
                  </motion.div>
                ) : (
                  messages.map((m, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-6 group"
                    >
                      <div className={`shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center overflow-hidden border border-white/5 shadow-2xl transition-all ${m.isBot ? 'bg-indigo-600 text-white' : 'bg-[#111]'}`}>
                        {m.isBot ? (
                          <span className="text-[10px] font-black">TPG</span>
                        ) : (
                          <img src="https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover" alt="" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-4 mb-2">
                          <span className={`font-black text-[12px] tracking-widest uppercase ${m.isBot ? 'text-indigo-400' : 'text-white'}`}>{m.author}</span>
                          <span className="text-[9px] font-bold text-gray-700 uppercase">{m.timestamp}</span>
                        </div>
                        <div className={`text-sm leading-relaxed font-medium p-6 rounded-3xl border transition-all ${m.isBot ? 'bg-indigo-600/5 border-indigo-500/10 text-gray-300' : 'bg-[#111]/40 border-white/5 text-gray-400'} whitespace-pre-wrap font-mono shadow-sm group-hover:border-indigo-500/20`}>
                          {m.text}
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
                {isTyping && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-4 px-16"
                  >
                    <span className="flex gap-2">
                      <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></span>
                      <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.1s]"></span>
                      <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    </span>
                    <span className="text-indigo-500/60 text-[10px] uppercase font-black tracking-[0.3em]">Processing Core Data...</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="p-8 bg-[#0a0a0a]/50 border-t border-white/5 rounded-b-[2rem]">
              <div className="relative group">
                <input 
                  type="text" 
                  value={input} 
                  onChange={(e) => setInput(e.target.value)} 
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()} 
                  disabled={isBooting}
                  placeholder={isBooting ? "SYNCING..." : "ENTER COMMAND... (e.g. /tpg play phonk)"} 
                  className="w-full bg-[#050505] border border-white/10 rounded-2xl px-8 py-5 text-white placeholder-gray-800 focus:outline-none focus:border-indigo-500/50 text-xs font-bold uppercase tracking-[0.3em] transition-all group-hover:border-white/20 shadow-inner disabled:opacity-50"
                />
                <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-3 pointer-events-none">
                   <div className="text-[10px] text-gray-700 font-black border border-white/5 px-3 py-1.5 rounded-lg bg-black/40">SEND ⏎</div>
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
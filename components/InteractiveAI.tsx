
import React, { useState, useRef, useEffect } from 'react';
import { getBotResponse } from '../services/geminiService';
import { BOT_NAME } from '../constants';

interface Message {
  author: string;
  avatar: string;
  text: string;
  isBot: boolean;
  timestamp: string;
}

const InteractiveAI: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { author: BOT_NAME, avatar: 'bot', text: `Try \`/tpg play\` to start the music engine.`, isBot: true, timestamp: '12:00 PM' }
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
    setMessages(prev => [...prev, { author: 'User', avatar: 'user', text: userText, isBot: false, timestamp: 'Now' }]);
    setIsTyping(true);
    
    const botText = await getBotResponse(userText);
    setIsTyping(false);
    setMessages(prev => [...prev, { author: BOT_NAME, avatar: 'bot', text: botText || "Processed.", isBot: true, timestamp: 'Now' }]);
  };

  return (
    <section id="ai-demo" className="px-4 py-20 bg-black">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black mb-2 uppercase tracking-tighter">Live Preview</h2>
          <p className="text-gray-500 uppercase tracking-widest text-[10px] font-bold">Low Latency Command Processing</p>
        </div>

        <div className="bg-[#1e1f22] rounded-2xl overflow-hidden border border-white/5 flex h-[500px]">
          <div className="hidden md:flex w-56 bg-[#2b2d31] flex-col p-4">
            <div className="text-white font-bold text-xs uppercase tracking-widest mb-4 opacity-50">Channels</div>
            <div className="px-3 py-2 rounded bg-[#3f4147] text-white text-sm font-medium"># general</div>
          </div>

          <div className="flex-1 flex flex-col bg-[#313338]">
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((m, i) => (
                <div key={i} className="flex gap-3">
                  <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-[10px] font-bold ${m.isBot ? 'bg-indigo-600' : 'bg-gray-700'}`}>
                    {m.isBot ? 'B' : 'U'}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`font-bold text-xs ${m.isBot ? 'text-indigo-400' : 'text-white'}`}>{m.author}</span>
                      <span className="text-[9px] text-gray-500">{m.timestamp}</span>
                    </div>
                    <div className="text-xs text-gray-300 leading-relaxed">{m.text}</div>
                  </div>
                </div>
              ))}
              {isTyping && <div className="text-gray-500 text-[10px] uppercase font-bold px-11">Processing...</div>}
            </div>

            <div className="p-4">
              <input 
                type="text" 
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
                onKeyDown={(e) => e.key === 'Enter' && handleSend()} 
                placeholder={`Message #general`} 
                className="w-full bg-[#383a40] rounded-lg px-4 py-2.5 text-gray-200 placeholder-gray-500 focus:outline-none text-xs"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveAI;


import React, { useState, useRef, useEffect } from 'react';
import { getBotResponse } from '../services/geminiService';
import { BOT_NAME } from '../constants';

interface Message {
  text: string;
  isBot: boolean;
}

const InteractiveAI: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { text: `Hey there! I'm the upcoming AI module for ${BOT_NAME}. How can I help you?`, isBot: true }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userText = input.trim();
    setInput('');
    setMessages(prev => [...prev, { text: userText, isBot: false }]);
    
    setIsTyping(true);
    const botText = await getBotResponse(userText);
    setIsTyping(false);
    
    setMessages(prev => [...prev, { text: botText, isBot: true }]);
  };

  return (
    <section id="ai-demo" className="px-6 py-24 relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block px-3 py-1 rounded-full bg-pink-500/20 border border-pink-500/30 text-pink-400 text-[10px] font-bold uppercase tracking-wider mb-4">
            Feature Preview
          </div>
          <h2 className="text-3xl md:text-5xl font-black mb-4">Interactive Assistant</h2>
          <p className="text-gray-400 text-lg">Test our upcoming intelligent personality.</p>
        </div>

        <div className="relative group">
          <div className="glass-effect rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col h-[500px]">
            {/* Header */}
            <div className="bg-white/5 px-6 py-4 flex items-center justify-between border-b border-white/5">
              <div className="flex items-center gap-3">
                <img 
                  src="input_file_1.png" 
                  alt="Chat Icon" 
                  className="w-10 h-10 rounded-full ring-2 ring-pink-500/50"
                />
                <div>
                  <div className="font-bold text-white leading-tight">{BOT_NAME} AI</div>
                  <div className="text-xs text-pink-400 flex items-center gap-1">
                    Coming Soon
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                 <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                 <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                 <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
              </div>
            </div>

            {/* Chat Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-hide"
            >
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.isBot ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                    m.isBot 
                      ? 'bg-slate-800/80 text-gray-200 rounded-bl-none border border-white/5' 
                      : 'bg-gradient-to-r from-indigo-600 to-pink-600 text-white rounded-br-none shadow-lg'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-slate-800 text-gray-400 rounded-2xl rounded-bl-none px-4 py-2 text-sm border border-white/5 flex gap-1">
                    <span className="animate-bounce">.</span>
                    <span className="animate-bounce delay-100">.</span>
                    <span className="animate-bounce delay-200">.</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white/5 border-t border-white/5 flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Talk to the preview..."
                className="flex-1 bg-slate-900/50 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/50 transition-all text-white placeholder-gray-500"
              />
              <button 
                onClick={handleSend}
                disabled={isTyping}
                className="bg-pink-600 hover:bg-pink-500 disabled:opacity-50 text-white w-10 h-10 rounded-xl flex items-center justify-center transition-all shadow-lg shadow-pink-600/20 active:scale-90"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveAI;

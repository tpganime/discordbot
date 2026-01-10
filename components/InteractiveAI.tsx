
import React, { useState, useRef, useEffect } from 'react';
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

const InteractiveAI: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      author: BOT_NAME, 
      avatar: 'bot',
      text: `Welcome to the **${BOT_NAME}** preview! Try typing \`/play\` followed by a song name to see me in action! :sparkles:`, 
      isBot: true,
      timestamp: 'Today at 12:00 PM'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [nowPlaying, setNowPlaying] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const getCurrentTime = () => {
    const now = new Date();
    return `Today at ${now.getHours() % 12 || 12}:${now.getMinutes().toString().padStart(2, '0')} ${now.getHours() >= 12 ? 'PM' : 'AM'}`;
  };

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userText = input.trim();
    setInput('');
    
    // Add User Message
    setMessages(prev => [...prev, { 
      author: 'You', 
      avatar: 'user',
      text: userText, 
      isBot: false,
      timestamp: getCurrentTime()
    }]);
    
    setIsTyping(true);

    // Mock immediate command feedback for Music
    if (userText.toLowerCase().startsWith('/play')) {
      const song = userText.substring(6) || 'a random Lo-Fi track';
      setNowPlaying(song);
    } else if (userText.toLowerCase().startsWith('/stop')) {
      setNowPlaying(null);
    }

    const botText = await getBotResponse(userText);
    setIsTyping(false);
    
    setMessages(prev => [...prev, { 
      author: BOT_NAME, 
      avatar: 'bot',
      text: botText || "No response.", 
      isBot: true,
      timestamp: getCurrentTime(),
      isEmbed: userText.startsWith('/')
    }]);
  };

  return (
    <section id="ai-demo" className="px-4 md:px-6 py-24 relative overflow-hidden bg-[#020617]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 text-[10px] font-bold uppercase tracking-wider mb-4">
            Interactive Demo
          </div>
          <h2 className="text-3xl md:text-5xl font-black mb-4">Try {BOT_NAME} Now</h2>
          <p className="text-gray-400 text-lg">Experience our music commands in this Discord simulator.</p>
        </div>

        {/* Discord Simulation Wrapper */}
        <div className="relative group max-w-5xl mx-auto">
          <div className="flex h-[600px] bg-[#313338] rounded-2xl overflow-hidden shadow-2xl border border-white/5 ring-1 ring-black/50">
            
            {/* Server Sidebar */}
            <div className="hidden sm:flex flex-col w-[72px] bg-[#1e1f22] items-center py-3 gap-2 border-r border-black/20">
              <div className="w-12 h-12 rounded-[50%] hover:rounded-[15px] transition-all duration-200 bg-[#313338] flex items-center justify-center group/icon cursor-pointer">
                <MusicIcon size="sm" className="!bg-transparent !shadow-none !ring-0 !w-8 !h-8" />
              </div>
              <div className="w-8 h-[2px] bg-[#35363c] rounded-full mx-auto my-1"></div>
              <div className="w-12 h-12 rounded-[15px] bg-[#5865f2] flex items-center justify-center cursor-default">
                <span className="text-white font-bold">TPG</span>
              </div>
            </div>

            {/* Channel Sidebar */}
            <div className="hidden md:flex flex-col w-60 bg-[#2b2d31]">
               <div className="h-12 px-4 flex items-center shadow-sm border-b border-black/10 font-bold text-white">
                 ─・𒀛TPG ｜MUSIC
               </div>
               <div className="p-3 space-y-4">
                 <div className="space-y-1">
                   <div className="text-[11px] font-bold text-gray-400 uppercase px-2 mb-1">Text Channels</div>
                   <div className="flex items-center gap-2 px-2 py-1 rounded bg-[#3f4147] text-white cursor-pointer group">
                     <span className="text-gray-400 group-hover:text-white transition-colors">#</span>
                     <span className="text-sm font-medium">general</span>
                   </div>
                   <div className="flex items-center gap-2 px-2 py-1 rounded hover:bg-[#35373c] text-gray-400 cursor-pointer group">
                     <span className="text-gray-400 group-hover:text-white transition-colors">#</span>
                     <span className="text-sm font-medium">music-bot</span>
                   </div>
                 </div>
                 <div className="space-y-1">
                   <div className="text-[11px] font-bold text-gray-400 uppercase px-2 mb-1">Voice Channels</div>
                   <div className="flex items-center gap-2 px-2 py-1 rounded hover:bg-[#35373c] text-gray-400 cursor-pointer group">
                     <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
                     <span className="text-sm font-medium">Music Room</span>
                   </div>
                 </div>
               </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col min-w-0 bg-[#313338]">
              {/* Header */}
              <div className="h-12 px-4 flex items-center shadow-sm border-b border-black/10 shrink-0">
                <span className="text-gray-400 font-bold mr-2">#</span>
                <span className="text-white font-bold text-sm">general</span>
              </div>

              {/* Messages Container */}
              <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-gray-700">
                {messages.map((m, i) => (
                  <div key={i} className="flex gap-4 group hover:bg-[#2e3035] -mx-4 px-4 py-1 transition-colors">
                    <div className="shrink-0 pt-0.5">
                      {m.avatar === 'bot' ? (
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-indigo-600 to-pink-600 flex items-center justify-center ring-1 ring-white/10">
                           <MusicIcon size="sm" className="!bg-transparent !shadow-none !ring-0 !w-6 !h-6" />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-[#5865f2] flex items-center justify-center text-white font-bold">
                           U
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className={`font-bold hover:underline cursor-pointer ${m.isBot ? 'text-pink-400' : 'text-white'}`}>
                          {m.author}
                        </span>
                        {m.isBot && (
                          <span className="bg-[#5865f2] text-white text-[10px] font-bold px-1 rounded-[3px] h-3.5 flex items-center mt-0.5">
                            BOT
                          </span>
                        )}
                        <span className="text-[10px] text-gray-400 font-medium">{m.timestamp}</span>
                      </div>
                      
                      {m.isEmbed ? (
                        <div className="mt-2 pl-3 border-l-4 border-indigo-500 bg-[#2b2d31] rounded-r-md p-4 max-w-lg shadow-md animate-fade-in">
                          <div className="text-sm text-gray-200 whitespace-pre-wrap leading-relaxed">
                            {m.text}
                          </div>
                        </div>
                      ) : (
                        <div className="text-sm text-[#dbdee1] whitespace-pre-wrap leading-relaxed">
                          {m.text}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex gap-4 -mx-4 px-4 py-1">
                    <div className="w-10 h-10 shrink-0"></div>
                    <div className="flex items-center gap-1.5 h-10">
                      <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce delay-75"></div>
                      <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce delay-150"></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Now Playing Bar (Mock) */}
              {nowPlaying && (
                <div className="mx-4 mb-2 p-2 bg-[#2b2d31] rounded-lg flex items-center gap-3 border border-white/5 animate-slide-up">
                  <div className="w-10 h-10 bg-indigo-600 rounded flex items-center justify-center shrink-0">
                    <MusicIcon size="sm" className="!bg-transparent !shadow-none !ring-0 !w-6 !h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest leading-none mb-1">Now Playing</div>
                    <div className="text-xs text-white font-medium truncate">{nowPlaying}</div>
                  </div>
                  <div className="flex gap-2 mr-2">
                    <button className="text-gray-400 hover:text-white"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg></button>
                    <button onClick={() => setNowPlaying(null)} className="text-gray-400 hover:text-red-400"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg></button>
                  </div>
                </div>
              )}

              {/* Input Wrapper */}
              <div className="px-4 pb-6 pt-2 shrink-0">
                <div className="bg-[#383a40] rounded-lg flex items-center px-4 py-2.5 gap-3 shadow-inner">
                  <button className="text-gray-400 hover:text-white transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg>
                  </button>
                  <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder={`Message #general (Try /play or /help)`}
                    className="flex-1 bg-transparent text-[#dbdee1] placeholder-gray-500 focus:outline-none text-[15px]"
                  />
                  <div className="flex gap-3 text-gray-400">
                    <button className="hover:text-white"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 2H2v20l4-4h16V2zm-9 11h-2v-2h2v2zm0-4h-2V5h2v4z"/></svg></button>
                    <button className="hover:text-white"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg></button>
                  </div>
                </div>
              </div>
            </div>

            {/* Members Sidebar */}
            <div className="hidden lg:flex flex-col w-60 bg-[#2b2d31] p-3 overflow-y-auto">
              <div className="text-[11px] font-bold text-gray-400 uppercase px-2 mb-2">Online — 1</div>
              <div className="flex items-center gap-3 px-2 py-1.5 rounded hover:bg-[#35373c] cursor-pointer group">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-600 to-pink-600 flex items-center justify-center">
                    <MusicIcon size="sm" className="!bg-transparent !shadow-none !ring-0 !w-5 !h-5" />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#23a55a] rounded-full border-[3px] border-[#2b2d31]"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-white truncate leading-tight">{BOT_NAME}</div>
                  <div className="text-[10px] text-gray-400 truncate">Listening to music...</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .animate-fade-in { animation: fadeIn 0.3s ease-out forwards; }
        .animate-slide-up { animation: slideUp 0.3s ease-out forwards; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .scrollbar-thin::-webkit-scrollbar { width: 6px; }
        .scrollbar-thin::-webkit-scrollbar-track { background: transparent; }
        .scrollbar-thin::-webkit-scrollbar-thumb { background: #1e1f22; border-radius: 10px; }
      `}</style>
    </section>
  );
};

export default InteractiveAI;

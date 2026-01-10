
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

// Expanded library of 50 NCS-style tracks (Using high-quality placeholders for demo stability)
const NCS_TRACKS = [
  { title: "Alan Walker - Fade", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", duration: 372 },
  { title: "Deaf Kev - Invincible", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", duration: 425 },
  { title: "Cartoon - On & On (feat. Daniel Levi)", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", duration: 316 },
  { title: "Janji - Heroes Tonight (feat. Johnning)", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", duration: 288 },
  { title: "Warriyo - Mortals (feat. Laura Brehm)", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", duration: 310 },
  { title: "Disfigure - Blank", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", duration: 295 },
  { title: "Electro-Light - Symbolism", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", duration: 340 },
  { title: "Different Heaven & EH!DE - My Heart", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", duration: 325 },
  { title: "Tobu - Hope", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3", duration: 312 },
  { title: "Sub Urban - Cradles", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3", duration: 350 },
  { title: "Julius Dreisig & Zeus X Crona - Invisible", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", duration: 240 },
  { title: "Diamond Eyes - Everything", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", duration: 265 },
  { title: "Lost Sky - Fearless", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", duration: 212 },
  { title: "Unknown Brain - Superhero", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", duration: 310 },
  { title: "Jarico - Landscape", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", duration: 255 },
  { title: "Aero Chord - Surface", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", duration: 280 },
  { title: "Razihel - Love U", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", duration: 245 },
  { title: "Egzod - Rise Up", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", duration: 300 },
  { title: "Unknown Brain - Perseus", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3", duration: 285 },
  { title: "Diviners - Savannah", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3", duration: 320 },
  { title: "Syn Cole - Feel Good", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", duration: 240 },
  { title: "Jim Yosef - Link", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", duration: 250 },
  { title: "Laszlo - Fall To Light", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", duration: 270 },
  { title: "Culture Code - Make Me Move", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", duration: 235 },
  { title: "NIVIRO - The Ghost", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", duration: 305 },
  { title: "Vicetone - Nevada", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", duration: 288 },
  { title: "Krewella - Adventure Time", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", duration: 255 },
  { title: "RetroVision - Puzzle", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", duration: 242 },
  { title: "Tungevaag - Bad Boy", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3", duration: 315 },
  { title: "Axel Johansson - Next To Me", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3", duration: 290 },
  { title: "Valiant - Beyond", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", duration: 230 },
  { title: "Mendum - Stay With Me", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", duration: 245 },
  { title: "Spektrem - Shine", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", duration: 310 },
  { title: "Halcyon - Runaway", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", duration: 275 },
  { title: "Robin Hustin x TobiMorrow - Light It Up", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", duration: 320 },
  { title: "DEAF KEV - Safe & Sound", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", duration: 260 },
  { title: "Unknown Brain - Why Do I?", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", duration: 285 },
  { title: "Anikdote - Turn It Up", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", duration: 300 },
  { title: "Lost Sky - Dreams", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3", duration: 250 },
  { title: "Cartoon - Why We Lose", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3", duration: 270 },
  { title: "Au5 - Closer", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", duration: 310 },
  { title: "Glude - Identity", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", duration: 245 },
  { title: "Clarx - Shakedown", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", duration: 290 },
  { title: "Jo Cohen & Sex Whales - We Are", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", duration: 260 },
  { title: "Killercats - Tell Me", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", duration: 280 },
  { title: "Prismo - Stronger", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", duration: 305 },
  { title: "WRLD - Triumph", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", duration: 255 },
  { title: "Waysons - Daydream", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", duration: 275 },
  { title: "Inukshuk - A World Away", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3", duration: 290 },
  { title: "ElementD - Giving In", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3", duration: 315 }
];

const InteractiveAI: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      author: BOT_NAME, 
      avatar: 'bot',
      text: `Welcome to the **${BOT_NAME}** preview! I'm ready to play 50+ of the best NCS gaming tracks. :rocket: \n\nTry these commands:\n> \`/tpg play\` - Play a random NCS track\n> \`/tpg skip\` - Skip to the next banger\n> \`/tpg stop\` - Stop the music and leave`, 
      isBot: true,
      timestamp: 'Today at 12:00 PM'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [nowPlaying, setNowPlaying] = useState<typeof NCS_TRACKS[0] | null>(null);
  const [playbackTime, setPlaybackTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressInterval = useRef<number | null>(null);

  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.volume = 0.5;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (progressInterval.current) clearInterval(progressInterval.current);
    };
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const startProgressTracking = () => {
    if (progressInterval.current) clearInterval(progressInterval.current);
    progressInterval.current = window.setInterval(() => {
      if (audioRef.current && !audioRef.current.paused) {
        setPlaybackTime(audioRef.current.currentTime);
      }
    }, 1000);
  };

  const handlePlayMusic = (trackIndex: number = 0) => {
    const track = NCS_TRACKS[trackIndex];
    if (audioRef.current) {
      audioRef.current.src = track.url;
      audioRef.current.play().catch(e => {
        console.warn("Autoplay blocked, user interaction required first.", e);
      });
      setNowPlaying(track);
      setPlaybackTime(0);
      setIsPaused(false);
      startProgressTracking();
    }
  };

  const handleStopMusic = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setNowPlaying(null);
    setPlaybackTime(0);
    if (progressInterval.current) clearInterval(progressInterval.current);
  };

  const togglePause = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
        setIsPaused(false);
      } else {
        audioRef.current.pause();
        setIsPaused(true);
      }
    }
  };

  const getCurrentTime = () => {
    const now = new Date();
    return `Today at ${now.getHours() % 12 || 12}:${now.getMinutes().toString().padStart(2, '0')} ${now.getHours() >= 12 ? 'PM' : 'AM'}`;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userText = input.trim();
    setInput('');
    
    setMessages(prev => [...prev, { 
      author: 'You', 
      avatar: 'user',
      text: userText, 
      isBot: false,
      timestamp: getCurrentTime()
    }]);
    
    setIsTyping(true);

    // Command Logic with /tpg prefix
    const lowerText = userText.toLowerCase();
    let botPrefix = "";

    if (lowerText.startsWith('/tpg play')) {
      const trackIdx = Math.floor(Math.random() * NCS_TRACKS.length);
      handlePlayMusic(trackIdx);
      botPrefix = `**:musical_note: Now playing:** \`${NCS_TRACKS[trackIdx].title}\` [NCS Release] :fire:\n\n`;
    } else if (lowerText.startsWith('/tpg stop') || lowerText.startsWith('/tpg leave')) {
      handleStopMusic();
      botPrefix = `**:white_check_mark: Music stopped.** The stage is quiet now. \n\n`;
    } else if (lowerText.startsWith('/tpg skip')) {
       const trackIdx = Math.floor(Math.random() * NCS_TRACKS.length);
       handlePlayMusic(trackIdx);
       botPrefix = `**:track_next: Skipped!** Next NCS hit: \`${NCS_TRACKS[trackIdx].title}\` \n\n`;
    }

    const botText = await getBotResponse(userText);
    setIsTyping(false);
    
    setMessages(prev => [...prev, { 
      author: BOT_NAME, 
      avatar: 'bot',
      text: botPrefix + (botText || "Processed command."), 
      isBot: true,
      timestamp: getCurrentTime(),
      isEmbed: userText.startsWith('/tpg')
    }]);
  };

  return (
    <section id="ai-demo" className="px-4 md:px-6 py-24 relative overflow-hidden bg-[#020617]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 text-[10px] font-bold uppercase tracking-wider mb-4">
            Bot Preview
          </div>
          <h2 className="text-3xl md:text-5xl font-black mb-4">Live Preview</h2>
          <p className="text-gray-400 text-lg">Use the <code className="text-pink-400">/tpg</code> prefix to control the bot below. Featuring 50+ NCS tracks.</p>
        </div>

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
                 </div>
                 <div className="space-y-1">
                   <div className="text-[11px] font-bold text-gray-400 uppercase px-2 mb-1">Voice Channels</div>
                   <div className="flex items-center gap-2 px-2 py-1 rounded hover:bg-[#35373c] text-green-400 cursor-pointer group">
                     <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
                     <span className="text-sm font-medium">Music Stage</span>
                     {nowPlaying && <div className="ml-auto w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>}
                   </div>
                 </div>
               </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col min-w-0 bg-[#313338]">
              <div className="h-12 px-4 flex items-center shadow-sm border-b border-black/10 shrink-0">
                <span className="text-gray-400 font-bold mr-2">#</span>
                <span className="text-white font-bold text-sm">general</span>
              </div>

              <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-gray-700">
                {messages.map((m, i) => (
                  <div key={i} className="flex gap-4 group hover:bg-[#2e3035] -mx-4 px-4 py-1 transition-colors">
                    <div className="shrink-0 pt-0.5">
                      {m.avatar === 'bot' ? (
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-indigo-600 to-pink-600 flex items-center justify-center ring-1 ring-white/10">
                           <MusicIcon size="sm" className="!bg-transparent !shadow-none !ring-0 !w-6 !h-6" />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-[#5865f2] flex items-center justify-center text-white font-bold">U</div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className={`font-bold hover:underline cursor-pointer ${m.isBot ? 'text-pink-400' : 'text-white'}`}>
                          {m.author}
                        </span>
                        {m.isBot && <span className="bg-[#5865f2] text-white text-[10px] font-bold px-1 rounded-[3px] h-3.5 flex items-center mt-0.5">BOT</span>}
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

              {/* Now Playing Bar */}
              {nowPlaying && (
                <div className="mx-4 mb-2 p-3 bg-[#232428] rounded-lg flex flex-col gap-2 border border-white/5 animate-slide-up shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-600 rounded flex items-center justify-center shrink-0 shadow-lg animate-pulse">
                      <MusicIcon size="sm" className="!bg-transparent !shadow-none !ring-0 !w-6 !h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <div className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest leading-none">NCS Stream</div>
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                      </div>
                      <div className="text-xs text-white font-bold truncate mt-1">{nowPlaying.title}</div>
                    </div>
                    <div className="flex gap-3 mr-2">
                      <button onClick={togglePause} className="text-gray-400 hover:text-white transition-colors">
                        {isPaused ? (
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                        ) : (
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                        )}
                      </button>
                      <button onClick={handleStopMusic} className="text-gray-400 hover:text-red-400 transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
                      </button>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-indigo-500 transition-all duration-1000" 
                        style={{ width: `${(playbackTime / nowPlaying.duration) * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-[9px] text-gray-500 font-bold font-mono">
                      <span>{formatTime(playbackTime)}</span>
                      <span>{formatTime(nowPlaying.duration)}</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="px-4 pb-6 pt-2 shrink-0">
                <div className="bg-[#383a40] rounded-lg flex items-center px-4 py-2.5 gap-3 shadow-inner">
                  <button className="text-gray-400 hover:text-white transition-colors"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg></button>
                  <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder={`Message #general (Try /tpg play)`}
                    className="flex-1 bg-transparent text-[#dbdee1] placeholder-gray-500 focus:outline-none text-[15px]"
                  />
                  <div className="flex gap-3 text-gray-400">
                    <button className="hover:text-white"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 2H2v20l4-4h16V2zm-9 11h-2v-2h2v2zm0-4h-2V5h2v4z"/></svg></button>
                    <button className="hover:text-white"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg></button>
                  </div>
                </div>
              </div>
            </div>

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
                  <div className="text-[10px] text-gray-400 truncate">{nowPlaying ? 'Playing NCS hits...' : 'Idle'}</div>
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

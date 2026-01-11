import React, { useState, useRef, useEffect } from 'react';
import { getBotResponse } from '../services/geminiService.ts';
import { BOT_NAME, SUPPORT_SERVER_URL } from '../constants.tsx';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  author: string;
  avatar: string;
  text: string;
  isBot: boolean;
  timestamp: string;
}

interface Track {
  title: string;
  artist: string;
  url: string;
}

const NCS_SONGS: Track[] = [
  { title: "Fade", artist: "Alan Walker", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
  { title: "Spectre", artist: "Alan Walker", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
  { title: "Force", artist: "Alan Walker", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
  { title: "High", artist: "JPB", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" },
  { title: "Sky High", artist: "Elektronomia", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3" },
  { title: "Cloud 9", artist: "Itro & Tobu", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3" }
];

interface InteractiveAIProps {
  user?: any;
}

const InteractiveAI: React.FC<InteractiveAIProps> = ({ user }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isBooting, setIsBooting] = useState(true);
  const [bootText, setBootText] = useState('');
  const [nowPlaying, setNowPlaying] = useState<Track | null>(null);
  const [isLooping, setIsLooping] = useState(false);
  const [volume, setVolume] = useState(50);
  const [isPaused, setIsPaused] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const bootSequence = [
    "TPG_MUSIC CORE v5.2.0-STABLE",
    "AUDIO_ENGINE: INITIALIZING NCS_PROTOCOLS",
    "NODE_SYNC: ATTACHED (8ms)",
    "AUTH_GATEWAY: VERIFIED",
    "BUFFER_CALIBRATION: [OK]",
    "REALTIME_SSL: ESTABLISHED",
    "SYSTEM READY."
  ];

  useEffect(() => {
    const audio = new Audio();
    audio.volume = volume / 100;
    audioRef.current = audio;
    
    let currentLine = 0;
    const bootInterval = setInterval(() => {
      if (currentLine < bootSequence.length) {
        setBootText(prev => prev + (prev ? '\n' : '') + '> ' + bootSequence[currentLine]);
        currentLine++;
      } else {
        clearInterval(bootInterval);
        setTimeout(() => {
          setIsBooting(false);
          addBotMessage(`Core active. System initialized. I am ready to play NCS high-fidelity tracks. Try \`/tpg play\` to start the engine.`);
        }, 500);
      }
    }, 80);

    return () => {
      clearInterval(bootInterval);
      audio.pause();
      audio.src = "";
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = isLooping;
    }
  }, [isLooping]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping, bootText]);

  const addBotMessage = (text: string) => {
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages(prev => [...prev, { author: BOT_NAME, avatar: 'bot', text, isBot: true, timestamp: now }]);
  };

  const processCommand = (cmd: string): boolean => {
    const lower = cmd.toLowerCase().trim();
    const parts = lower.split(' ');
    const trigger = parts[0];
    const sub = parts[1];
    const args = parts.slice(2);

    // Support both /tpg [cmd] and /[cmd] styles
    const commandName = trigger === '/tpg' ? sub : trigger.replace('/', '');

    if (commandName === 'support') {
      addBotMessage(`💠 **SUPPORT SYSTEM**\nDirect Node: ${SUPPORT_SERVER_URL}\nDeployment specialists are standing by to calibrate your server.`);
      return true;
    }

    if (commandName === 'play') {
      const search = trigger === '/tpg' ? parts.slice(2).join(' ') : parts.slice(1).join(' ');
      let track = NCS_SONGS.find(s => s.title.toLowerCase().includes(search) || s.artist.toLowerCase().includes(search));
      if (!track) track = NCS_SONGS[Math.floor(Math.random() * NCS_SONGS.length)];
      
      setNowPlaying(track);
      setIsPaused(false);
      if (audioRef.current) {
        audioRef.current.src = track.url;
        audioRef.current.play().catch(e => {
          console.error("Playback failed:", e);
          addBotMessage(`❌ **AUDIO ERROR**\nCould not fetch audio packets. Try another track.`);
        });
      }
      addBotMessage(`💠 **STREAMING INITIALIZED**\n\`\`\`yaml\nTRACK: ${track.title}\nARTIST: ${track.artist}\nSTATUS: PLAYING\nQUALITY: LOSSLESS (1411kbps)\n\`\`\`\n🔊 *Now playing high-fidelity NCS audio.*`);
      return true;
    }

    if (commandName === 'stop') {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setNowPlaying(null);
      setIsPaused(false);
      addBotMessage(`⏹️ **SESSION TERMINATED**\nPlayback stack cleared. Node returned to idle state.`);
      return true;
    }

    if (commandName === 'pause') {
      if (audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause();
        setIsPaused(true);
        addBotMessage(`⏸️ **STREAM SUSPENDED**\nAudio buffer preserved. Use \`/tpg resume\` to restore.`);
      } else {
        addBotMessage(`⚠️ **IDLE**\nNo active stream to suspend.`);
      }
      return true;
    }

    if (commandName === 'resume') {
      if (audioRef.current && isPaused) {
        audioRef.current.play();
        setIsPaused(false);
        addBotMessage(`▶️ **STREAM RESTORED**\nSynchronizing audio packets with core nodes...`);
      } else {
        addBotMessage(`⚠️ **ACTIVE**\nCore engine is already distributing audio or node is empty.`);
      }
      return true;
    }

    if (commandName === 'loop') {
      setIsLooping(!isLooping);
      addBotMessage(`🔄 **LOOP MODE: ${!isLooping ? 'ENABLED' : 'DISABLED'}**\nTrack repetition protocols updated.`);
      return true;
    }

    if (commandName === 'queue') {
      const list = NCS_SONGS.map((s, i) => `${i + 1}. ${s.title} - ${s.artist}`).join('\n');
      addBotMessage(`📜 **CORE STACK**\n\`\`\`\n${list}\n\`\`\``);
      return true;
    }

    if (commandName === 'disconnect') {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
      setNowPlaying(null);
      addBotMessage(`🔌 **NODE DECOUPLED**\nVoice channel connection closed. All buffers purged.`);
      return true;
    }

    if (commandName === 'replay') {
      if (audioRef.current && nowPlaying) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
        addBotMessage(`⏪ **REPLAYING**\nTrack restarted from packet zero.`);
      } else {
        addBotMessage(`❌ **NO DATA**\nInitialize a stream first using \`/tpg play\`.`);
      }
      return true;
    }

    if (commandName === 'skip') {
      const next = NCS_SONGS[Math.floor(Math.random() * NCS_SONGS.length)];
      setNowPlaying(next);
      if (audioRef.current) {
        audioRef.current.src = next.url;
        audioRef.current.play();
      }
      addBotMessage(`⏭️ **TRACK SKIPPED**\nNow syncing: **${next.title}** by **${next.artist}**`);
      return true;
    }

    if (commandName === 'track') {
      if (!nowPlaying) {
        addBotMessage(`❌ **NO TRACK ACTIVE**`);
      } else {
        addBotMessage(`🎵 **TRACK METADATA**\nTitle: ${nowPlaying.title}\nArtist: ${nowPlaying.artist}\nCodec: PCM/Lossless\nBitrate: 1411kbps`);
      }
      return true;
    }

    if (commandName === 'set-volume' || commandName === 'volume') {
      const volStr = trigger === '/tpg' ? parts[2] : parts[1];
      const vol = parseInt(volStr);
      if (!isNaN(vol) && vol >= 0 && vol <= 100) {
        setVolume(vol);
        addBotMessage(`🔊 **VOLUME CALIBRATED: ${vol}%**\nOutput gain adjusted globally.`);
      } else {
        addBotMessage(`❌ **INVALID VALUE**\nUsage: /tpg set-volume [0-100]`);
      }
      return true;
    }

    return false;
  };

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isTyping || isBooting) return;
    
    const userText = input.trim();
    setInput('');
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Always use user's discord profile pic if available
    const userAvatar = user?.avatar || "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=1000&auto=format&fit=crop";
    
    setMessages(prev => [...prev, { 
      author: user?.username || 'OPERATOR', 
      avatar: userAvatar, 
      text: userText, 
      isBot: false, 
      timestamp: now 
    }]);
    
    setIsTyping(true);

    const wasCommand = processCommand(userText);
    if (wasCommand) {
      setIsTyping(false);
      return;
    }
    
    const botText = await getBotResponse(userText);
    setIsTyping(false);
    addBotMessage(botText || "Connection unstable. Packet loss detected.");
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

        <div className="bg-[#0a0a0a] rounded-[2.5rem] overflow-hidden border border-white/5 flex flex-col h-[650px] shadow-[0_50px_100px_-20px_rgba(0,0,0,1)] ring-1 ring-white/10 relative">
          
          <div className="h-14 bg-[#111] border-b border-white/5 flex items-center px-8 justify-between z-30">
            <div className="flex gap-2.5">
              <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/40"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/40"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/40"></div>
            </div>
            <div className="text-[10px] font-black tracking-[0.3em] text-indigo-400 uppercase flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
              CORE_ACTIVE_SSL
            </div>
            <div className="hidden sm:flex items-center gap-5 text-[10px] font-bold text-white/20 uppercase tracking-widest">
              {nowPlaying && (
                <div className="flex items-center gap-3">
                   <div className="flex gap-1 h-3 items-end">
                      <motion.div animate={{ height: isPaused ? 4 : [4, 12, 6, 12, 4] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-1 bg-indigo-500"></motion.div>
                      <motion.div animate={{ height: isPaused ? 4 : [8, 4, 10, 4, 8] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1 bg-indigo-500"></motion.div>
                      <motion.div animate={{ height: isPaused ? 4 : [12, 8, 4, 8, 12] }} transition={{ repeat: Infinity, duration: 0.7 }} className="w-1 bg-indigo-500"></motion.div>
                   </div>
                   <span className="text-indigo-400/80">{isPaused ? 'PAUSED' : 'PLAYING'}: {nowPlaying.title}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <span>VOL: {volume}%</span>
                {isLooping && <span className="text-indigo-500">LOOP</span>}
              </div>
            </div>
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
                          <img src={m.avatar} className="w-full h-full object-cover" alt="User Profile" />
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
                    <span className="text-indigo-500/60 text-[10px] uppercase font-black tracking-[0.3em]">Core Processing...</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <form onSubmit={handleSend} className="p-8 bg-[#0a0a0a]/50 border-t border-white/5 rounded-b-[2rem] z-20">
              <div className="relative group">
                <input 
                  type="text" 
                  value={input} 
                  onChange={(e) => setInput(e.target.value)} 
                  disabled={isBooting}
                  placeholder={isBooting ? "SYNCING..." : "ENTER COMMAND... (e.g. /tpg play spectre)"} 
                  className="w-full bg-[#050505] border border-white/10 rounded-2xl pl-8 pr-32 py-5 text-white placeholder-gray-800 focus:outline-none focus:border-indigo-500/50 text-xs font-bold uppercase tracking-[0.3em] transition-all group-hover:border-white/20 shadow-inner disabled:opacity-50"
                />
                <button 
                  type="submit"
                  disabled={isBooting || !input.trim()}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-30 flex items-center"
                >
                   <div className="text-[10px] text-indigo-400 font-black border border-indigo-500/30 px-5 py-2 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 transition-all active:scale-95 disabled:opacity-30 disabled:pointer-events-none">
                     SEND ⏎
                   </div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveAI;
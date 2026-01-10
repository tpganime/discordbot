
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
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
  { title: "Cartoon - On & On (feat. Daniel Levi)", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", duration: 316 },
  { title: "Janji - Heroes Tonight (feat. Johnning)", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", duration: 288 },
  { title: "Warriyo - Mortals (feat. Laura Brehm)", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", duration: 310 },
  { title: "Disfigure - Blank", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", duration: 295 },
  { title: "Electro-Light - Symbolism", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", duration: 340 },
  { title: "Different Heaven & EH!DE - My Heart", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", duration: 325 },
  { title: "Tobu - Hope", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3", duration: 312 },
  { title: "Sub Urban - Cradles", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3", duration: 350 }
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

  // 3D Motion Values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.volume = 0.5;
    return () => {
      if (audioRef.current) audioRef.current.pause();
      if (progressInterval.current) clearInterval(progressInterval.current);
    };
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  const startProgressTracking = () => {
    if (progressInterval.current) clearInterval(progressInterval.current);
    progressInterval.current = window.setInterval(() => {
      if (audioRef.current && !audioRef.current.paused) setPlaybackTime(audioRef.current.currentTime);
    }, 1000);
  };

  const handlePlayMusic = (trackIndex: number = 0) => {
    const track = NCS_TRACKS[trackIndex % NCS_TRACKS.length];
    if (audioRef.current) {
      audioRef.current.src = track.url;
      audioRef.current.play().catch(() => {});
      setNowPlaying(track);
      setPlaybackTime(0);
      setIsPaused(false);
      startProgressTracking();
    }
  };

  const handleStopMusic = () => {
    if (audioRef.current) audioRef.current.pause();
    setNowPlaying(null);
    setPlaybackTime(0);
    if (progressInterval.current) clearInterval(progressInterval.current);
  };

  const togglePause = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) { audioRef.current.play(); setIsPaused(false); }
      else { audioRef.current.pause(); setIsPaused(true); }
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
    setMessages(prev => [...prev, { author: 'You', avatar: 'user', text: userText, isBot: false, timestamp: getCurrentTime() }]);
    setIsTyping(true);
    const lowerText = userText.toLowerCase();
    let botPrefix = "";
    if (lowerText.startsWith('/tpg play')) {
      const trackIdx = Math.floor(Math.random() * NCS_TRACKS.length);
      handlePlayMusic(trackIdx);
      botPrefix = `**:musical_note: Now playing:** \`${NCS_TRACKS[trackIdx].title}\` [NCS Release] :fire:\n\n`;
    } else if (lowerText.startsWith('/tpg stop')) {
      handleStopMusic();
      botPrefix = `**:white_check_mark: Music stopped.** The stage is quiet now. \n\n`;
    } else if (lowerText.startsWith('/tpg skip')) {
       const trackIdx = Math.floor(Math.random() * NCS_TRACKS.length);
       handlePlayMusic(trackIdx);
       botPrefix = `**:track_next: Skipped!** Next NCS hit: \`${NCS_TRACKS[trackIdx].title}\` \n\n`;
    }
    const botText = await getBotResponse(userText);
    setIsTyping(false);
    setMessages(prev => [...prev, { author: BOT_NAME, avatar: 'bot', text: botPrefix + (botText || "Processed command."), isBot: true, timestamp: getCurrentTime(), isEmbed: userText.startsWith('/tpg') }]);
  };

  return (
    <section id="ai-demo" className="px-4 md:px-6 py-24 relative overflow-hidden bg-[#020617]">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <div className="inline-block px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 text-[10px] font-bold uppercase tracking-wider mb-4">Bot Preview</div>
          <h2 className="text-3xl md:text-5xl font-black mb-4">Live Preview</h2>
          <p className="text-gray-400 text-lg">Hover to tilt. Use <code className="text-pink-400">/tpg</code> to control the music stage.</p>
        </motion.div>

        <motion.div 
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
          className="relative group max-w-5xl mx-auto tilt-container"
        >
          <div className="flex h-[600px] bg-[#313338] rounded-2xl overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.8)] border border-white/5 ring-1 ring-black/50 preserve-3d">
            {/* Sidebar & Chat Area as defined in original structure */}
            <div className="hidden sm:flex flex-col w-[72px] bg-[#1e1f22] items-center py-3 gap-2 border-r border-black/20">
              <div className="w-12 h-12 rounded-[50%] hover:rounded-[15px] transition-all duration-200 bg-[#313338] flex items-center justify-center cursor-pointer">
                <MusicIcon size="sm" className="!bg-transparent !shadow-none !ring-0" />
              </div>
              <div className="w-8 h-[2px] bg-[#35363c] rounded-full mx-auto my-1"></div>
              <div className="w-12 h-12 rounded-[15px] bg-[#5865f2] flex items-center justify-center"><span className="text-white font-bold">TPG</span></div>
            </div>

            <div className="flex-1 flex flex-col min-w-0 bg-[#313338] preserve-3d">
              <div className="h-12 px-4 flex items-center shadow-sm border-b border-black/10 shrink-0">
                <span className="text-gray-400 font-bold mr-2">#</span><span className="text-white font-bold text-sm">general</span>
              </div>

              <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-gray-700">
                <AnimatePresence mode="popLayout">
                  {messages.map((m, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex gap-4 group hover:bg-[#2e3035] -mx-4 px-4 py-1 transition-colors">
                      <div className="shrink-0 pt-0.5">
                        {m.avatar === 'bot' ? (
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-pink-600 flex items-center justify-center ring-1 ring-white/10 shadow-lg"><MusicIcon size="sm" className="!bg-transparent !shadow-none !ring-0" /></div>
                        ) : ( <div className="w-10 h-10 rounded-full bg-[#5865f2] flex items-center justify-center text-white font-bold shadow-lg">U</div> )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className={`font-bold hover:underline cursor-pointer ${m.isBot ? 'text-pink-400' : 'text-white'}`}>{m.author}</span>
                          {m.isBot && <span className="bg-[#5865f2] text-white text-[10px] font-bold px-1 rounded-[3px] h-3.5 flex items-center mt-0.5">BOT</span>}
                          <span className="text-[10px] text-gray-400 font-medium">{m.timestamp}</span>
                        </div>
                        {m.isEmbed ? (
                          <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="mt-2 pl-3 border-l-4 border-indigo-500 bg-[#2b2d31] rounded-r-md p-4 max-w-lg shadow-xl" style={{ transform: 'translateZ(20px)' }}>
                            <div className="text-sm text-gray-200 whitespace-pre-wrap leading-relaxed">{m.text}</div>
                          </motion.div>
                        ) : ( <div className="text-sm text-[#dbdee1] whitespace-pre-wrap leading-relaxed">{m.text}</div> )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {isTyping && ( <div className="flex gap-4 -mx-4 px-4 py-1"><div className="w-10 h-10 shrink-0"></div><div className="flex items-center gap-1.5 h-10"><div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"></div><div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce delay-75"></div><div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce delay-150"></div></div></div> )}
              </div>

              {nowPlaying && (
                <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mx-4 mb-2 p-3 bg-[#232428] rounded-lg flex flex-col gap-2 border border-white/5 shadow-2xl preserve-3d" style={{ transform: 'translateZ(40px)' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-600 rounded flex items-center justify-center shrink-0 shadow-lg relative overflow-hidden"><MusicIcon size="sm" className="!bg-transparent !shadow-none !ring-0" /></div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2"><div className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest leading-none">NCS Stream</div>{!isPaused && <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>}</div>
                      <div className="text-xs text-white font-bold truncate mt-1">{nowPlaying.title}</div>
                    </div>
                    <div className="flex gap-3 mr-2">
                      <button onClick={togglePause} className="text-gray-400 hover:text-white transition-colors">{isPaused ? <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg> : <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>}</button>
                      <button onClick={handleStopMusic} className="text-gray-400 hover:text-red-400 transition-colors"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg></button>
                    </div>
                  </div>
                  <div className="h-1 bg-white/10 rounded-full overflow-hidden"><motion.div className="h-full bg-indigo-500" style={{ width: `${(playbackTime / nowPlaying.duration) * 100}%` }}></motion.div></div>
                </motion.div>
              )}

              <div className="px-4 pb-6 pt-2 shrink-0 preserve-3d" style={{ transform: 'translateZ(10px)' }}>
                <div className="bg-[#383a40] rounded-lg flex items-center px-4 py-2.5 gap-3 shadow-inner">
                  <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder={`Message #general (Try /tpg play)`} className="flex-1 bg-transparent text-[#dbdee1] placeholder-gray-500 focus:outline-none text-[15px]"/>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InteractiveAI;

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Bot, User, Send, Sparkles, Terminal, Cpu, Clock, AlertCircle } from 'lucide-react';
import { Container } from './ui/Container';
import { Section } from './ui/Section';
import { Typography } from './ui/Typography';
import { Badge } from './ui/Badge';
import { Flex } from './ui/Flex';

const DAILY_MAX_MESSAGES = 10;

const Typewriter = ({ text, delay = 20, onComplete }: { text: string; delay?: number; onComplete?: () => void }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [index, text, delay, onComplete]);

  return <span>{displayedText}</span>;
};

export const AIConsole = () => {
  const [history, setHistory] = useState([
    { 
      role: 'bot', 
      content: "Hello! I'm FUSION BOT powered by SUNDAY 5.1. How can I assist with your Discord server management today?" 
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [remainingMessages, setRemainingMessages] = useState(DAILY_MAX_MESSAGES);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Load and calculate daily limit
  const refreshLimit = () => {
    const today = new Date().toISOString().slice(0, 10);
    const key = `fusion_ai_limit_${today}`;
    const used = parseInt(localStorage.getItem(key) || '0', 10);
    setRemainingMessages(Math.max(0, DAILY_MAX_MESSAGES - used));
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    refreshLimit();
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, isTyping]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    const today = new Date().toISOString().slice(0, 10);
    const key = `fusion_ai_limit_${today}`;
    const currentUsed = parseInt(localStorage.getItem(key) || '0', 10);

    if (currentUsed >= DAILY_MAX_MESSAGES) {
      setHistory((prev) => [
        ...prev,
        { role: 'bot', content: '⚠️ Daily testing limit reached (10/10 messages used today). The quota will reset at midnight UTC. You can continue chatting directly with Fusion Bot in Discord!' }
      ]);
      return;
    }

    const userMessage = { role: 'user', content: inputValue };
    setHistory((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Increment usage
    const newUsed = currentUsed + 1;
    localStorage.setItem(key, newUsed.toString());
    setRemainingMessages(Math.max(0, DAILY_MAX_MESSAGES - newUsed));

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: [...history, userMessage].map(m => ({
            role: m.role === 'bot' ? 'assistant' : 'user',
            content: m.content
          }))
        }),
      });

      const data = await response.json();
      
      if (response.ok && data.content) {
        setHistory((prev) => [...prev, { role: 'bot', content: data.content }]);
      } else {
        const detail = data.details || data.error || 'Server error';
        throw new Error(detail);
      }
    } catch (error: any) {
      console.error('Chat error:', error);
      // Helpful fallback response
      let errorResponse = "I am FUSION BOT. My AI intelligence is active and ready to assist you on your server. Use /help in your Discord server to explore all my commands!";
      if (error?.message && !error.message.includes('Unexpected token')) {
        errorResponse = `Notice: ${error.message}`;
      }
      setHistory((prev) => [...prev, { role: 'bot', content: errorResponse }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <Section spacing="xl" className="overflow-hidden pt-12 pb-32">
      <Container size="xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={!isMobile ? { opacity: 0, x: -30 } : { opacity: 1 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Badge variant="secondary" className="mb-6">
              <Cpu className="w-3 h-3 mr-2 text-blue-400" />
              SUNDAY 5.1 Engine
            </Badge>
            <Typography variant="h2" weight="black" className="mb-6">
              Interactive <span className="text-blue-500">AI Console</span>
            </Typography>
            <Typography variant="lead" className="mb-8 text-white/60">
              Test Fusion's natural conversational AI live in your browser. Powered by high-speed neural language models.
            </Typography>

            <div className="space-y-4 mb-8">
              {[
                { title: 'Server Automation & Setup', desc: 'Ask how to configure Google Drive backups, tickets, or anti-spam.' },
                { title: 'Instant Moderation Answers', desc: 'Get guidance on roles, permissions, and audit logs.' },
                { title: 'Natural Language Processing', desc: 'Context-aware responses tailored for your Discord community.' }
              ].map((item, i) => (
                <Flex key={i} gap={4} align="start">
                  <div className="w-6 h-6 rounded-full bg-blue-600/20 flex items-center justify-center shrink-0 mt-1">
                    <Sparkles className="w-3 h-3 text-blue-400" />
                  </div>
                  <div>
                    <Typography variant="h4" weight="bold" className="mb-0.5 text-sm text-white">{item.title}</Typography>
                    <Typography variant="p" className="text-xs text-white/40">{item.desc}</Typography>
                  </div>
                </Flex>
              ))}
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/60">
              <Clock className="w-3.5 h-3.5 text-blue-400" />
              <span>Daily Test Quota: <strong className="text-white">{remainingMessages}/{DAILY_MAX_MESSAGES} messages</strong> remaining today</span>
            </div>
          </motion.div>

          <motion.div
            initial={!isMobile ? { opacity: 0, scale: 0.95 } : { opacity: 1 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Liquid Glass Console */}
            <div className="liquid-glass rounded-[36px] p-1 border border-white/10 shadow-2xl">
              <div className="bg-[#030712]/90 rounded-[34px] p-6 md:p-8 h-[480px] flex flex-col">
                {/* Console Header */}
                <Flex justify="between" className="mb-6 pb-4 border-b border-white/5">
                  <Flex gap={4}>
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-rose-500/60" />
                      <div className="w-3 h-3 rounded-full bg-amber-500/60" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
                    </div>
                    <Typography variant="small" weight="bold" className="text-white/40 ml-2 font-mono text-xs">fusion-console.sh • SUNDAY 5.1</Typography>
                  </Flex>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                      {remainingMessages} left
                    </span>
                    <Terminal className="w-4 h-4 text-white/30" />
                  </div>
                </Flex>

                {/* Messages Area */}
                <div 
                  ref={scrollRef}
                  className="flex-1 overflow-y-auto space-y-4 pr-3 custom-scrollbar"
                >
                  {history.map((msg, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <Flex gap={4} align="start" className={msg.role === 'user' ? 'justify-end' : ''}>
                        {msg.role === 'bot' && (
                          <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-blue-600/30">
                            <Bot className="w-3.5 h-3.5" />
                          </div>
                        )}
                        <div className={`flex-1 max-w-[85%] rounded-2xl p-3.5 border border-white/5 ${
                          msg.role === 'bot' ? 'bg-white/5 rounded-tl-none' : 'bg-blue-600/20 rounded-tr-none border-blue-500/30'
                        }`}>
                          <Typography variant="p" className="text-xs leading-relaxed font-mono text-white/90">
                            {idx === history.length - 1 && msg.role === 'bot' ? (
                              <Typewriter text={msg.content} />
                            ) : (
                              msg.content
                            )}
                          </Typography>
                        </div>
                        {msg.role === 'user' && (
                          <div className="w-7 h-7 rounded-lg bg-white/10 text-white/60 flex items-center justify-center shrink-0">
                            <User className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </Flex>
                    </motion.div>
                  ))}
                  {isTyping && (
                    <Flex gap={4} align="start">
                      <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0">
                        <Bot className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex gap-1 p-3 rounded-2xl bg-white/5 border border-white/5">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </Flex>
                  )}
                </div>

                {/* Console Input Area */}
                <form onSubmit={handleSendMessage} className="mt-4 pt-4 border-t border-white/5">
                  <div className="bg-white/5 rounded-xl px-4 py-2.5 flex items-center gap-3 border border-white/5 focus-within:border-blue-500/40 transition-all">
                    <Typography variant="small" className="text-blue-400 font-mono font-bold text-xs">$</Typography>
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder={remainingMessages <= 0 ? "Daily limit reached (10/10)" : isTyping ? "Fusion is thinking..." : "Enter message or question..."}
                      disabled={isTyping || remainingMessages <= 0}
                      className="flex-1 bg-transparent border-none outline-none text-xs font-mono text-white placeholder:text-white/20 disabled:opacity-40"
                    />
                    <button 
                      type="submit" 
                      disabled={!inputValue.trim() || isTyping || remainingMessages <= 0}
                      className="p-1 hover:text-blue-400 transition-colors disabled:opacity-0 text-white/50"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
};

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, User, Send, Sparkles, Terminal, Cpu } from 'lucide-react';
import { Container } from './ui/Container';
import { Section } from './ui/Section';
import { Typography } from './ui/Typography';
import { Badge } from './ui/Badge';
import { Flex } from './ui/Flex';

const Typewriter = ({ text, delay = 30, onComplete }: { text: string; delay?: number; onComplete?: () => void }) => {
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
      content: "Hello! I'm FUSION BOT. I'm an advanced AI assistant designed to help you manage and protect your server. How can I assist you today?" 
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
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

    const userMessage = { role: 'user', content: inputValue };
    setHistory((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

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
        // Detailed error message from server
        const detail = data.details || data.error || 'Unknown error';
        throw new Error(detail);
      }
    } catch (error: any) {
      console.error('Chat error:', error);
      let errorMessage = "I'm having trouble connecting to the AI brain right now.";
      
      if (error.message.includes('GROQ_API_KEY')) {
        errorMessage = "The AI service is missing its API key. If you are on Vercel, please add GROQ_API_KEY to your environment variables.";
      } else if (error.message.includes('Unexpected token')) {
        errorMessage = "Server returned an invalid response. This might happen if the /api/chat route is not correctly configured on Vercel.";
      } else {
        errorMessage = `Error: ${error.message}. Please try again in a few seconds.`;
      }
      
      setHistory((prev) => [...prev, { role: 'bot', content: errorMessage }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <Section spacing="xl" className="overflow-hidden">
      <Container size="xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={!isMobile ? { opacity: 0, x: -30 } : { opacity: 1 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Badge variant="secondary" className="mb-8">
              <Cpu className="w-3 h-3 mr-2 text-blue-500" />
              Next-Gen Intelligence
            </Badge>
            <Typography variant="h2" weight="black" className="mb-8">
              Interactive <span className="text-blue-600">AI Console</span>
            </Typography>
            <Typography variant="lead" className="mb-12 text-white/60">
              Experience the power of Fusion's AI directly from this console. Our bot uses advanced language models 
              to provide human-like interactions and intelligent server management.
            </Typography>

            <div className="space-y-6">
              {[
                { title: 'Natural Language', desc: 'Chat naturally with your server assistant.' },
                { title: 'Context Aware', desc: 'Remembers conversation history for better responses.' },
                { title: 'Smart Commands', desc: 'Predicts user intent to execute complex tasks.' }
              ].map((item, i) => (
                <Flex key={i} gap={4} align="start">
                  <div className="w-6 h-6 rounded-full bg-blue-600/20 flex items-center justify-center shrink-0 mt-1">
                    <Sparkles className="w-3 h-3 text-blue-600" />
                  </div>
                  <div>
                    <Typography variant="h4" weight="bold" className="mb-1 text-base">{item.title}</Typography>
                    <Typography variant="p" className="text-sm text-white/40">{item.desc}</Typography>
                  </div>
                </Flex>
              ))}
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
            <div className="liquid-glass rounded-[40px] p-1 border border-white/10 shadow-2xl lg:liquid-glass-glow">
              <div className="bg-black/60 rounded-[38px] p-8 h-[500px] flex flex-col">
                {/* Console Header */}
                <Flex justify="between" className="mb-8 pb-4 border-b border-white/5">
                  <Flex gap={4}>
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/50" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                      <div className="w-3 h-3 rounded-full bg-green-500/50" />
                    </div>
                    <Typography variant="small" weight="bold" className="text-white/20 ml-2 font-mono">fusion-console.sh</Typography>
                  </Flex>
                  <Terminal className="w-4 h-4 text-white/20" />
                </Flex>

                {/* Messages Area */}
                <div 
                  ref={scrollRef}
                  className="flex-1 overflow-y-auto space-y-6 pr-4 custom-scrollbar"
                >
                  {history.map((msg, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Flex gap={4} align="start" className={msg.role === 'user' ? 'justify-end' : ''}>
                        {msg.role === 'bot' && (
                          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-blue-600/30">
                            <Bot className="w-4 h-4" />
                          </div>
                        )}
                        <div className={`flex-1 max-w-[85%] rounded-2xl p-4 border border-white/5 ${
                          msg.role === 'bot' ? 'bg-white/5 rounded-tl-none' : 'bg-blue-600/10 rounded-tr-none border-blue-600/20'
                        }`}>
                          <Typography variant="p" className="text-sm leading-relaxed font-mono">
                            {idx === history.length - 1 && msg.role === 'bot' ? (
                              <Typewriter text={msg.content} />
                            ) : (
                              msg.content
                            )}
                          </Typography>
                        </div>
                        {msg.role === 'user' && (
                          <div className="w-8 h-8 rounded-lg bg-white/10 text-white/40 flex items-center justify-center shrink-0">
                            <User className="w-4 h-4" />
                          </div>
                        )}
                      </Flex>
                    </motion.div>
                  ))}
                  {isTyping && history[history.length-1].role === 'user' && (
                     <Flex gap={4} align="start">
                        <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0">
                          <Bot className="w-4 h-4" />
                        </div>
                        <div className="flex gap-1.5 p-4 rounded-2xl bg-white/5 border border-white/5">
                          <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '0ms' }} />
                          <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '150ms' }} />
                          <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                     </Flex>
                  )}
                </div>

                {/* Console Input Area */}
                <form onSubmit={handleSendMessage} className="mt-8 pt-6 border-t border-white/5">
                  <div className="bg-white/5 rounded-xl px-4 py-3 flex items-center gap-3 border border-white/5 group focus-within:border-blue-600/30 transition-all">
                    <Typography variant="small" className="text-blue-600/50 font-mono font-bold">$</Typography>
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder={isTyping ? "Fusion is thinking..." : "Enter command or chat..."}
                      disabled={isTyping}
                      className="flex-1 bg-transparent border-none outline-none text-sm font-mono text-white placeholder:text-white/10 disabled:opacity-50"
                    />
                    <button 
                      type="submit" 
                      disabled={!inputValue.trim() || isTyping}
                      className="p-1 hover:text-blue-500 transition-colors disabled:opacity-0"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Glowing Accent */}
            <div className="absolute -z-10 inset-0 blur-[100px] opacity-20 pointer-events-none">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600 rounded-full" />
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
};

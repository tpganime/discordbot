
import React from 'react';
import { motion } from 'framer-motion';

const FEATURE_LIST = [
  {
    title: "Crystal Clear Audio",
    description: "Lossless music streaming from all major platforms. The sound of premium, totally free.",
    icon: "🔊",
    color: "from-blue-500 to-indigo-600"
  },
  {
    title: "Live Gaming Hub",
    description: "Interactive trivia, casino, and arcade games to spice up your community chats.",
    icon: "🎲",
    color: "from-purple-500 to-pink-600"
  },
  {
    title: "Always Online",
    description: "Ultra-fast hosting on dedicated servers ensures 99.9% uptime for your members.",
    icon: "🔋",
    color: "from-emerald-500 to-teal-600"
  },
  {
    title: "Smart AI Companion",
    description: "Gemini-powered bot that talks back, answers help queries, and generates fun content.",
    icon: "🤖",
    color: "from-indigo-500 to-violet-600"
  }
];

const Features: React.FC = () => {
  return (
    <section id="features" className="px-6 py-32 bg-[#020617] relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black mb-6 tracking-tighter"
          >
            Powerful Plugins
          </motion.h2>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto font-medium">Built to transform your server into a high-octane entertainment hub.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {FEATURE_LIST.map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.02, 
                rotateX: idx % 2 === 0 ? 2 : -2, 
                rotateY: idx < 2 ? -2 : 2 
              }}
              className="group p-10 rounded-[3rem] glass-effect relative overflow-hidden tilt-container cursor-default transition-shadow hover:shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className={`w-20 h-20 rounded-[1.5rem] bg-gradient-to-br ${feature.color} flex items-center justify-center text-4xl mb-8 shadow-2xl relative`}>
                <span className="relative z-10">{feature.icon}</span>
                <div className="absolute inset-0 bg-white/20 rounded-[1.5rem] blur-[5px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <h3 className="text-2xl font-black mb-4 group-hover:text-indigo-400 transition-colors" style={{ transform: 'translateZ(30px)' }}>
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed text-lg" style={{ transform: 'translateZ(20px)' }}>
                {feature.description}
              </p>
              
              {/* Decorative Corner Glow */}
              <div className={`absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-br ${feature.color} opacity-10 blur-[50px] group-hover:opacity-30 transition-opacity`}></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

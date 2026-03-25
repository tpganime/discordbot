
import React from 'react';
import { motion } from 'framer-motion';

const FeatureCard = ({ title, description, icon }: { title: string, description: string, icon: string }) => {
  return (
    <div className="card-3d relative h-[300px] w-full rounded-3xl p-8 flex flex-col justify-end group overflow-hidden">
      {/* Floating Icon Background */}
      <div className="absolute top-8 right-8 text-5xl opacity-10 group-hover:opacity-40 transition-all transform group-hover:-translate-y-2 group-hover:scale-110">
        {icon}
      </div>
      
      <div className="relative z-10">
        <div className="w-10 h-1 rounded-full mb-6 bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
        <h3 className="text-2xl font-black mb-3 text-white tracking-tighter uppercase leading-none">{title}</h3>
        <p className="text-gray-500 text-[9px] leading-relaxed max-w-[200px] font-bold uppercase tracking-[0.15em]">{description}</p>
      </div>
    </div>
  );
};

const FEATURES = [
  {
    title: "Economy & Games",
    description: "Engage your community with a full-featured economy system and interactive games.",
    icon: "💰"
  },
  {
    title: "High-Fidelity Music",
    description: "Crystal clear audio streaming with zero latency and advanced playback controls.",
    icon: "🎵"
  },
  {
    title: "Advanced Moderation",
    description: "Keep your server secure with powerful moderation tools and automated filters.",
    icon: "🛡️"
  }
];

const Features: React.FC = () => {
  return (
    <section id="features" className="px-6 py-32 bg-[#050505]">
      <div className="max-w-6xl mx-auto">
        <div className="mb-20 text-center md:text-left">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 text-white uppercase leading-none">
            TOTAL <br /> <span className="text-indigo-600">COMMAND.</span>
          </h2>
          <p className="text-gray-600 text-[9px] font-black uppercase tracking-[0.5em]">System Protocols Active.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {FEATURES.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
            >
              <FeatureCard {...f} />
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center p-12 glass-panel rounded-[3rem] border border-white/5"
        >
          <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-6">
            READY TO <span className="text-indigo-500">CONTROL?</span>
          </h3>
          <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.4em] mb-10">
            Access the full power of Fusion Bot via the secure panel.
          </p>
          <a 
            href="/panel"
            className="inline-block px-12 py-5 bg-white text-black font-black text-[11px] uppercase tracking-[0.4em] rounded-2xl transition-all hover:scale-105 shadow-2xl"
          >
            Open Bot Panel
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;

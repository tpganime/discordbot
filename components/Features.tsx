
import React from 'react';
import { motion } from 'framer-motion';

const FeatureCard = ({ title, description, icon }: { title: string, description: string, icon: string }) => {
  return (
    <div className="relative h-[380px] w-full rounded-[2.5rem] bg-[#111] border border-white/5 p-10 flex flex-col justify-end group transition-colors hover:border-indigo-500/30">
      <div className="absolute top-10 right-10 text-6xl opacity-20 group-hover:opacity-100 transition-opacity">
        {icon}
      </div>
      
      <div className="relative z-10">
        <div className="w-12 h-1 rounded-full mb-8 bg-indigo-500"></div>
        <h3 className="text-3xl font-black mb-4 text-white tracking-tighter uppercase leading-none">{title}</h3>
        <p className="text-gray-500 text-[11px] leading-relaxed max-w-[260px] font-bold uppercase tracking-[0.1em]">{description}</p>
      </div>
    </div>
  );
};

const FEATURES = [
  {
    title: "Lossless Audio",
    description: "Pure studio-grade playback with zero bitstream degradation for the ultimate session.",
    icon: "🔊"
  },
  {
    title: "Global Uptime",
    description: "Multi-region edge hosting ensures stability regardless of your server location.",
    icon: "⚡"
  }
];

const Features: React.FC = () => {
  return (
    <section id="features" className="px-6 py-32 bg-[#080808]">
      <div className="max-w-6xl mx-auto">
        <div className="mb-20">
          <h2 className="text-4xl md:text-7xl font-black tracking-tighter mb-6 text-white uppercase leading-none">
            CRAFTED FOR <br /> <span className="text-indigo-600">RELIABILITY.</span>
          </h2>
          <p className="text-gray-600 text-[10px] font-black uppercase tracking-[0.4em]">Optimized Performance Matrix.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {FEATURES.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <FeatureCard {...f} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

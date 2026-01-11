
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
    title: "Lossless Audio",
    description: "Multi-point distribution engine for ultra-fidelity voice sessions.",
    icon: "🔊"
  },
  {
    title: "Role Reactor",
    description: "Event-based automated role management and member lifecycle.",
    icon: "🎭"
  },
  {
    title: "Shield Mod",
    description: "Enterprise grade anti-raid and behavioral filter settings.",
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
      </div>
    </section>
  );
};

export default Features;

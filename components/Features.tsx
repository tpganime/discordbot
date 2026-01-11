
import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const FeatureCard = ({ title, description, icon, color }: { title: string, description: string, icon: string, color: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 400, damping: 40 });
  const mouseYSpring = useSpring(y, { stiffness: 400, damping: 40 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["20deg", "-20deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-20deg", "20deg"]);
  const translateZ = useTransform(mouseXSpring, [-0.5, 0.5], ["50px", "50px"]);

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

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-[500px] w-full rounded-[3rem] glass-panel border border-white/5 p-14 flex flex-col justify-end group cursor-default overflow-hidden transition-shadow hover:shadow-[0_40px_100px_rgba(0,0,0,0.5)]"
    >
      <div 
        className="absolute top-14 right-14 text-8xl transition-all duration-1000 group-hover:scale-125 group-hover:rotate-[15deg] opacity-20 group-hover:opacity-100 blur-[2px] group-hover:blur-0"
        style={{ transform: "translateZ(100px)" }}
      >
        {icon}
      </div>
      
      <div 
        className="relative z-10"
        style={{ transform: "translateZ(60px)" }}
      >
        <div className={`w-16 h-1.5 rounded-full mb-10 bg-gradient-to-r ${color} shadow-[0_0_30px_rgba(255,255,255,0.2)]`}></div>
        <h3 className="text-4xl font-black mb-6 text-white tracking-tighter uppercase leading-none">{title}</h3>
        <p className="text-gray-500 text-sm md:text-base leading-loose max-w-[320px] font-bold uppercase tracking-[0.2em]">{description}</p>
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
    </motion.div>
  );
};

const FEATURES = [
  {
    title: "Lossless Audio",
    description: "Pure studio-grade playback with zero bitstream degradation for the ultimate session.",
    icon: "🔊",
    color: "from-indigo-600 to-indigo-400"
  },
  {
    title: "Global Uptime",
    description: "Multi-region edge hosting ensures stability regardless of your server location.",
    icon: "⚡",
    color: "from-emerald-500 to-emerald-300"
  }
];

const Features: React.FC = () => {
  return (
    <section id="features" className="px-6 py-56 bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end gap-16 mb-40">
          <div className="max-w-3xl">
            <h2 className="text-6xl md:text-[110px] font-black tracking-tighter mb-10 text-white uppercase leading-[0.85]">
              CRAFTED FOR <br /> <span className="text-indigo-600">INTENSITY.</span>
            </h2>
            <div className="flex items-center gap-6">
              <span className="h-0.5 w-12 bg-white/20"></span>
              <p className="text-gray-600 text-lg md:text-xl font-black uppercase tracking-[0.4em]">Military Grade Reliability.</p>
            </div>
          </div>
          <div className="flex flex-col gap-4 items-end">
             <div className="h-0.5 bg-white/5 w-48"></div>
             <p className="text-[10px] font-black text-gray-800 uppercase tracking-[0.5em] text-right">
               SYSTEM // SPEC_01 <br/> CORE KERNEL
             </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:max-w-6xl lg:mx-auto">
          {FEATURES.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
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

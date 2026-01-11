
import React, { useEffect, useState } from 'react';
import { motion, animate } from 'framer-motion';

interface StatsProps {
  servers: number;
  users: number;
}

const CountUp: React.FC<{ value: number }> = ({ value }) => {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const controls = animate(display, value, {
      duration: 3,
      onUpdate: (latest) => setDisplay(Math.floor(latest))
    });
    return () => controls.stop();
  }, [value]);

  return <>{display}</>;
};

const Stats: React.FC<StatsProps> = ({ servers, users }) => {
  return (
    <section className="px-6 py-32 bg-[#020202]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { label: "Network Capacity", value: servers, icon: "SRV", color: "from-indigo-500 to-indigo-700" },
            { label: "Concurrent Sessions", value: users, icon: "USR", color: "from-white to-gray-600" },
            { label: "Architecture Uptime", value: "99.99", icon: "UPT", color: "from-emerald-400 to-teal-600", suffix: "%" },
            { label: "Audio Latency", value: "12", icon: "LAT", color: "from-rose-500 to-orange-600", suffix: "ms" }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 1, ease: [0.23, 1, 0.32, 1] }}
              whileHover={{ y: -15, rotateX: -8, rotateY: 8 }}
              className="glass-panel rounded-[2.5rem] p-12 border border-white/5 relative overflow-hidden group transition-all"
              style={{ transformStyle: 'preserve-3d', perspective: '1200px' }}
            >
              <div className="absolute top-0 right-0 p-6 font-mono text-[8px] text-indigo-500/20 tracking-[0.5em] font-black uppercase group-hover:text-indigo-500/40 transition-colors">
                NODE_0{i + 1}
              </div>
              
              <div 
                className={`text-6xl font-black mb-8 bg-clip-text text-transparent bg-gradient-to-br ${stat.color} tracking-tighter`}
                style={{ transform: 'translateZ(60px)' }}
              >
                {typeof stat.value === 'number' ? <CountUp value={stat.value} /> : stat.value}
                {stat.suffix && <span className="text-2xl ml-1 opacity-50">{stat.suffix}</span>}
              </div>
              
              <div 
                className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] flex items-center gap-4"
                style={{ transform: 'translateZ(30px)' }}
              >
                <motion.span 
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.8)]"
                ></motion.span>
                {stat.label}
              </div>

              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[2.5rem]"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;

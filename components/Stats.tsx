
import React, { useEffect, useState } from 'react';
import { motion, useSpring, useTransform, animate } from 'framer-motion';

interface StatsProps {
  servers: number;
  users: number;
}

const CountUp: React.FC<{ value: number }> = ({ value }) => {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const controls = animate(display, value, {
      duration: 1.5,
      onUpdate: (latest) => setDisplay(Math.floor(latest))
    });
    return () => controls.stop();
  }, [value]);

  return <>{display}</>;
};

const Stats: React.FC<StatsProps> = ({ servers, users }) => {
  return (
    <section className="px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Live Servers", value: servers, icon: "🏢", color: "text-pink-400" },
            { label: "Live Users", value: users, icon: "👥", color: "text-indigo-400" },
            { label: "Uptime", value: "99.9%", icon: "🔋", color: "text-emerald-400" },
            { label: "Reliability", value: "24/7", icon: "💎", color: "text-amber-400" }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5, translateZ: 20 }}
              className="glass-effect rounded-[2.5rem] p-10 border border-white/5 text-center relative overflow-hidden group"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className={`text-5xl font-black mb-4 ${stat.color} drop-shadow-2xl`}>
                {typeof stat.value === 'number' ? <CountUp value={stat.value} /> : stat.value}
              </div>
              
              <div className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] flex items-center justify-center gap-2">
                {stat.label === 'Live Servers' || stat.label === 'Live Users' ? (
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                ) : null}
                {stat.label}
              </div>
              
              <div className="absolute -bottom-4 -left-4 text-6xl opacity-5 group-hover:opacity-10 transition-opacity grayscale pointer-events-none">
                {stat.icon}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;

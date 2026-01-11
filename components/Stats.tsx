
import React from 'react';
import { motion } from 'framer-motion';

interface StatsProps {
  servers: number;
  users: number;
}

const Stats: React.FC<StatsProps> = ({ servers, users }) => {
  return (
    <section className="px-6 py-20 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "Nodes Connected", value: servers, color: "text-indigo-500" },
            { label: "Active Identities", value: users, color: "text-white" },
            { label: "Uptime Sync", value: "99.9%", color: "text-indigo-400" },
            { label: "Core Latency", value: "8ms", color: "text-indigo-200" }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#0d0d0d] rounded-2xl p-8 border border-white/5 shadow-2xl border-b-2 border-b-white/5"
            >
              <div className={`text-2xl md:text-4xl font-black mb-2 ${stat.color} tracking-tighter`}>
                {stat.value}
              </div>
              <div className="text-[8px] font-black text-gray-500 uppercase tracking-[0.3em]">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;

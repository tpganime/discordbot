
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
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {[
            { label: "Servers", value: servers, color: "text-indigo-500" },
            { label: "Users", value: users, color: "text-white" },
            { label: "Uptime", value: "99.99%", color: "text-emerald-500" },
            { label: "Latency", value: "12ms", color: "text-rose-500" }
          ].map((stat, i) => (
            <div 
              key={i}
              className="bg-[#111] rounded-3xl p-6 md:p-10 border border-white/5"
            >
              <div className={`text-2xl md:text-5xl font-black mb-4 ${stat.color} tracking-tighter`}>
                {stat.value}
              </div>
              <div className="text-[8px] md:text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;

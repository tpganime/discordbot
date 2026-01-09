
import React, { useEffect, useState } from 'react';

interface StatsProps {
  servers: number;
  users: number;
}

const Stats: React.FC<StatsProps> = ({ servers, users }) => {
  const [pulseS, setPulseS] = useState(false);
  const [pulseU, setPulseU] = useState(false);

  useEffect(() => {
    setPulseS(true);
    const t = setTimeout(() => setPulseS(false), 500);
    return () => clearTimeout(t);
  }, [servers]);

  useEffect(() => {
    setPulseU(true);
    const t = setTimeout(() => setPulseU(false), 500);
    return () => clearTimeout(t);
  }, [users]);

  return (
    <section className="px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 glass-effect rounded-3xl p-10 border border-white/5">
          <div className="text-center relative">
            <div className={`text-4xl font-black text-white mb-2 transition-all duration-300 ${pulseS ? 'scale-125 text-pink-400' : 'scale-100'}`}>
              {servers}
            </div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center justify-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              Live Servers
            </div>
          </div>
          <div className="text-center relative">
            <div className={`text-4xl font-black text-white mb-2 transition-all duration-300 ${pulseU ? 'scale-125 text-indigo-400' : 'scale-100'}`}>
              {users}
            </div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center justify-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              Live Users
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black text-white mb-2">99.9%</div>
            <div className="text-sm font-bold text-gray-500 uppercase tracking-widest">Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black text-white mb-2">24/7</div>
            <div className="text-sm font-bold text-gray-500 uppercase tracking-widest">Reliability</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;

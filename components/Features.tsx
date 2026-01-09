
import React from 'react';

const FEATURE_LIST = [
  {
    title: "Free Music Playback",
    description: "High-quality music streaming from YouTube, Spotify, and more. No premium needed, ever.",
    icon: "🎵",
    color: "from-blue-500 to-cyan-500",
    comingSoon: false
  },
  {
    title: "Discord Games",
    description: "Keep your members engaged with fun interactive games directly in your text channels.",
    icon: "🎮",
    color: "from-purple-500 to-pink-500",
    comingSoon: false
  },
  {
    title: "24/7 Reliability",
    description: "Professional hosting ensures your music never stops. High uptime guaranteed.",
    icon: "⚡",
    color: "from-amber-500 to-yellow-500",
    comingSoon: false
  },
  {
    title: "AI Chat Assistant",
    description: "Smart AI conversations powered by Gemini. Ask questions, get help, or just chat.",
    icon: "✨",
    color: "from-indigo-500 to-purple-500",
    comingSoon: true
  }
];

const Features: React.FC = () => {
  return (
    <section id="features" className="px-6 py-24 bg-slate-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black mb-4">Core Features</h2>
          <p className="text-gray-400 text-lg">Powerful entertainment systems for your community.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {FEATURE_LIST.map((feature, idx) => (
            <div 
              key={idx} 
              className="group p-8 rounded-3xl glass-effect hover:ring-2 hover:ring-indigo-500/50 transition-all duration-300 relative overflow-hidden"
            >
              {feature.comingSoon && (
                <div className="absolute top-4 right-4 bg-indigo-600/20 text-indigo-400 text-[10px] font-black uppercase tracking-tighter px-2 py-0.5 rounded-full border border-indigo-500/30">
                  Coming Soon
                </div>
              )}
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-3xl mb-6 shadow-lg`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-indigo-400 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

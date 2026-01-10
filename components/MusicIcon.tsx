
import React from 'react';

interface MusicIconProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const MusicIcon: React.FC<MusicIconProps> = ({ className = "", size = 'md' }) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-20 h-20",
    xl: "w-32 h-32 md:w-40 md:h-40"
  };

  return (
    <div className={`relative flex items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-pink-600 shadow-lg shadow-pink-500/20 ring-1 ring-white/20 ${sizeClasses[size]} ${className}`}>
      <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className="w-3/5 h-3/5 text-white filter drop-shadow-md"
      >
        <path 
          d="M9 18V5L21 3V16" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        <circle 
          cx="6" 
          cy="18" 
          r="3" 
          stroke="currentColor" 
          strokeWidth="2"
        />
        <circle 
          cx="18" 
          cy="16" 
          r="3" 
          stroke="currentColor" 
          strokeWidth="2"
        />
      </svg>
      {/* Decorative glow */}
      <div className="absolute inset-0 bg-white/10 rounded-2xl pointer-events-none"></div>
    </div>
  );
};

export default MusicIcon;

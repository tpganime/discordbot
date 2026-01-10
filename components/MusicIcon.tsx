
import React from 'react';
import { motion } from 'framer-motion';

interface MusicIconProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const MusicIcon: React.FC<MusicIconProps> = ({ className = "", size = 'md' }) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-20 h-20",
    xl: "w-32 h-32 md:w-48 md:h-48"
  };

  return (
    <motion.div 
      whileHover={{ scale: 1.05, rotateY: 10, rotateX: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      className={`relative flex items-center justify-center rounded-[2rem] bg-gradient-to-br from-indigo-500 via-indigo-600 to-pink-600 shadow-[0_20px_50px_rgba(79,70,229,0.3)] ring-1 ring-white/20 tilt-container group ${sizeClasses[size]} ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* 3D Depth Layers */}
      <div className="absolute inset-0 bg-indigo-900/50 rounded-[2rem] translate-z-[-10px]"></div>
      
      <motion.svg 
        animate={{ 
          y: [0, -5, 0],
          rotate: [0, 2, 0]
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className="w-3/5 h-3/5 text-white filter drop-shadow-[0_5px_15px_rgba(0,0,0,0.4)]"
        style={{ transform: 'translateZ(20px)' }}
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
      </motion.svg>

      {/* Glossy Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent rounded-[2rem] pointer-events-none opacity-50"></div>
      
      {/* Floating Sparkles */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute top-4 right-4 w-2 h-2 bg-white rounded-full blur-[2px]"
      />
    </motion.div>
  );
};

export default MusicIcon;

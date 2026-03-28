
import React from 'react';

import { BOT_LOGO_URL } from '../constants.tsx';

interface MusicIconProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const MusicIcon: React.FC<MusicIconProps> = ({ className = "", size = 'md' }) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-20 h-20",
    xl: "w-32 h-32"
  };

  return (
    <div className={`rounded-xl overflow-hidden flex items-center justify-center ${sizeClasses[size]} ${className}`}>
      <img 
        src={BOT_LOGO_URL} 
        alt="Bot Logo" 
        className="w-full h-full object-cover"
        referrerPolicy="no-referrer"
      />
    </div>
  );
};

export default MusicIcon;

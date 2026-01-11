
import React from 'react';

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
    <div className={`rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black ${sizeClasses[size]} ${className}`}>
      M
    </div>
  );
};

export default MusicIcon;

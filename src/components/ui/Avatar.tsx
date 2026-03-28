import React from 'react';
import { cn } from '../../lib/utils';

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
}

export const Avatar = ({ src, alt, fallback, size = 'md', className, children, ...props }: AvatarProps) => {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-20 h-20 text-xl',
  };

  return (
    <div
      className={cn(
        'relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center font-bold text-white/40',
        sizes[size],
        className
      )}
      {...props}
    >
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
      ) : (
        <span>{fallback || 'U'}</span>
      )}
    </div>
  );
};

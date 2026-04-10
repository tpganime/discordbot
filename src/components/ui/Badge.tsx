import React from 'react';
import { cn } from '../../lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  children?: React.ReactNode;
}

export const Badge = ({ className, variant = 'primary', children, ...props }: BadgeProps) => {
  const variants = {
    primary: 'bg-blue-500/10 border-blue-500/20 text-blue-500',
    secondary: 'bg-white/5 border-white/10 text-white/60',
    outline: 'bg-transparent border border-white/10 text-white/40',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-widest',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

import React from 'react';
import { cn } from '../../lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'glass' | 'outline' | 'bento';
  children?: React.ReactNode;
}

export const Card = ({ className, variant = 'glass', children, ...props }: CardProps) => {
  const variants = {
    glass: 'bg-[#141418]/60 backdrop-blur-2xl border-white/10 shadow-[0_12px_36px_-10px_rgba(0,0,0,0.6)]',
    outline: 'bg-transparent border border-white/15',
    bento: 'bg-[#16161a]/65 backdrop-blur-2xl border-white/10 shadow-[0_20px_48px_-12px_rgba(0,0,0,0.7)] hover:border-white/20',
  };

  return (
    <div
      className={cn(
        'rounded-[28px] border p-7 sm:p-8 transition-all duration-300 ease-out',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

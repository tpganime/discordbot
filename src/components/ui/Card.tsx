import React from 'react';
import { cn } from '../../lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'glass' | 'outline';
  children?: React.ReactNode;
}

export const Card = ({ className, variant = 'glass', children, ...props }: CardProps) => {
  const variants = {
    glass: 'bg-white/[0.03] backdrop-blur-xl border-white/5',
    outline: 'bg-transparent border border-white/10',
  };

  return (
    <div
      className={cn(
        'rounded-[32px] border p-8 transition-all duration-300',
        variants[variant],
        className
      )}
      {...props}
    />
  );
};

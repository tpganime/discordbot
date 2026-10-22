import React from 'react';
import { cn } from '../../lib/utils';

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'small' | 'lead';
  weight?: 'normal' | 'medium' | 'bold' | 'black';
  align?: 'left' | 'center' | 'right';
  children?: React.ReactNode;
}

export const Typography = ({ variant = 'p', weight = 'normal', align = 'left', className, children, ...props }: TypographyProps) => {
  const variants = {
    h1: 'font-display text-3xl sm:text-4xl md:text-5xl lg:text-5xl tracking-tight leading-tight',
    h2: 'font-display text-2xl sm:text-3xl md:text-4xl tracking-tight leading-snug',
    h3: 'font-display text-xl sm:text-2xl md:text-3xl tracking-tight leading-snug',
    h4: 'font-display text-lg sm:text-xl md:text-2xl tracking-tight leading-snug',
    p: 'text-sm md:text-base leading-relaxed text-white/60',
    small: 'text-xs font-bold uppercase tracking-widest text-white/40',
    lead: 'text-base md:text-lg leading-relaxed text-white/80',
  };

  const weights = {
    normal: 'font-normal',
    medium: 'font-medium',
    bold: 'font-bold',
    black: 'font-black',
  };

  const alignments = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  const Component = variant === 'lead' || variant === 'small' ? 'p' : variant;

  return (
    <Component
      className={cn(
        variants[variant],
        weights[weight],
        alignments[align],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

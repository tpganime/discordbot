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
    h1: 'font-display text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[0.9]',
    h2: 'font-display text-4xl md:text-6xl tracking-tight leading-[1]',
    h3: 'font-display text-3xl md:text-5xl tracking-tight leading-[1.1]',
    h4: 'font-display text-2xl md:text-4xl tracking-tight leading-[1.2]',
    p: 'text-base md:text-lg leading-relaxed text-white/60',
    small: 'text-xs md:text-sm font-bold uppercase tracking-widest text-white/40',
    lead: 'text-xl md:text-2xl leading-relaxed text-white/80',
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
    />
  );
};

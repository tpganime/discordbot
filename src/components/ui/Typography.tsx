import React from 'react';
import { cn } from '../../lib/utils';

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'small' | 'lead' | 'caption';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold' | 'black';
  align?: 'left' | 'center' | 'right';
  children?: React.ReactNode;
}

export const Typography = ({ variant = 'p', weight = 'normal', align = 'left', className, children, ...props }: TypographyProps) => {
  const variants = {
    // Precise Optical Scale matching native typography hierarchy
    h1: 'font-display text-4xl sm:text-5xl md:text-6xl tracking-[-0.035em] leading-[1.08] text-white',
    h2: 'font-display text-2xl sm:text-3xl md:text-4xl tracking-[-0.028em] leading-[1.18] text-white',
    h3: 'font-display text-xl sm:text-2xl tracking-[-0.022em] leading-snug text-white',
    h4: 'font-display text-lg sm:text-xl tracking-[-0.018em] leading-snug text-white',
    p: 'text-[15px] sm:text-base leading-relaxed text-white/65 tracking-[-0.01em]',
    lead: 'text-base sm:text-lg leading-relaxed text-white/80 tracking-[-0.012em]',
    small: 'text-xs font-semibold uppercase tracking-[0.06em] text-white/50',
    caption: 'text-xs leading-normal text-white/45 tracking-tight',
  };

  const weights = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
    black: 'font-extrabold',
  };

  const alignments = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  const Component = variant === 'lead' || variant === 'small' || variant === 'caption' ? 'p' : variant;

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

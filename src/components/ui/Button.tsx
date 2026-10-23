import React from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'blue';
  size?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const variants = {
      primary: 'bg-white text-black hover:bg-neutral-100 shadow-[0_4px_20px_rgba(255,255,255,0.18)] hover:shadow-[0_6px_25px_rgba(255,255,255,0.28)] border border-white/80',
      blue: 'bg-[#0A84FF] text-white hover:bg-[#0071E3] shadow-[0_4px_20px_rgba(10,132,255,0.35)] hover:shadow-[0_6px_25px_rgba(10,132,255,0.45)] border border-[#0A84FF]/50',
      secondary: 'bg-white/10 hover:bg-white/15 border border-white/15 text-white backdrop-blur-xl shadow-sm hover:border-white/25',
      outline: 'bg-transparent border border-white/20 text-white hover:bg-white/10 hover:border-white/30 backdrop-blur-md',
      ghost: 'bg-transparent text-white/70 hover:text-white hover:bg-white/8',
    };

    const sizes = {
      sm: 'px-4 py-2 text-xs min-h-[36px]',
      md: 'px-6 py-2.5 text-sm min-h-[44px]',
      lg: 'px-8 py-3.5 text-base min-h-[48px]',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-full font-semibold tracking-[-0.01em] transition-all duration-200 cubic-bezier(0.16,1,0.3,1) disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] select-none cursor-pointer',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

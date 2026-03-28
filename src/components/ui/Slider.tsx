import React from 'react';
import { cn } from '../../lib/utils';

interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Slider = ({ value, min = 0, max = 100, step = 1, onChange, className, ...props }: SliderProps) => {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={cn('relative w-full h-1.5 bg-white/5 rounded-full overflow-hidden', className)}>
      <div
        className="absolute top-0 left-0 h-full bg-orange-600 transition-all duration-300"
        style={{ width: `${percentage}%` }}
      />
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
        {...props}
      />
    </div>
  );
};

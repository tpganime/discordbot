import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

export const Switch = ({ checked, onChange, className }: SwitchProps) => {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={cn(
        'w-12 h-6 rounded-full p-1 transition-colors duration-300',
        checked ? 'bg-orange-600' : 'bg-white/10',
        className
      )}
    >
      <motion.div
        animate={{ x: checked ? 24 : 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className="w-4 h-4 bg-white rounded-full shadow-sm"
      />
    </button>
  );
};

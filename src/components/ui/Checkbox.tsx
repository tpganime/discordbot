import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check } from 'lucide-react';
import { cn } from '../../lib/utils';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  className?: string;
}

export const Checkbox = ({ checked, onChange, label, className }: CheckboxProps) => {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={cn('flex items-center gap-4 group cursor-pointer', className)}
    >
      <div
        className={cn(
          'w-6 h-6 rounded-lg border flex items-center justify-center transition-all duration-300',
          checked ? 'bg-orange-600 border-orange-600' : 'bg-white/5 border-white/10 group-hover:border-white/20'
        )}
      >
        <AnimatePresence>
          {checked && (
            <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}>
              <Check className="w-4 h-4 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {label && <span className="text-sm font-bold text-white/60 group-hover:text-white transition-colors">{label}</span>}
    </button>
  );
};

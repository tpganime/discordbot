import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

interface TabsProps {
  tabs: string[];
  activeTab: string;
  onChange: (tab: string) => void;
  className?: string;
}

export const Tabs = ({ tabs, activeTab, onChange, className }: TabsProps) => {
  return (
    <div className={cn('flex items-center gap-2 p-1 bg-white/[0.03] border border-white/5 rounded-2xl', className)}>
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={cn(
            'relative px-6 py-2 text-sm font-bold transition-all duration-300',
            activeTab === tab ? 'text-white' : 'text-white/40 hover:text-white/60'
          )}
        >
          {activeTab === tab && (
            <motion.div
              layoutId="active-tab"
              className="absolute inset-0 bg-white/5 rounded-xl border border-white/10"
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative z-10">{tab}</span>
        </button>
      ))}
    </div>
  );
};

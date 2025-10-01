import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export function GlassCard({ children, className = '', hoverEffect = true }: GlassCardProps) {
  return (
    <motion.div
      className={`glass-card ${hoverEffect ? 'hover:glass-card-hover' : ''} ${className}`}
      whileHover={hoverEffect ? { y: -5 } : {}}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
    >
      {children}
    </motion.div>
  );
}

export function GlassCardContent({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`p-6 ${className}`}>
      {children}
    </div>
  );
}

export function GlassCardTitle({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <h3 className={`text-xl font-semibold mb-3 text-white ${className}`}>
      {children}
    </h3>
  );
}

export function GlassCardDescription({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <p className={`text-gray-300 text-sm ${className}`}>
      {children}
    </p>
  );
}

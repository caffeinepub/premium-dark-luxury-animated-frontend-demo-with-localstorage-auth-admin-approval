import { ReactNode } from 'react';
import { cn } from '../lib/utils';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function GlassCard({ children, className, hover = false }: GlassCardProps) {
  return (
    <div
      className={cn(
        'glass-panel rounded-2xl border border-white/10 p-6 backdrop-blur-xl transition-all duration-500',
        hover && 'cursor-pointer hover:-translate-y-2 hover:scale-[1.02] hover:border-neon-blue hover:shadow-neon',
        className
      )}
    >
      {children}
    </div>
  );
}

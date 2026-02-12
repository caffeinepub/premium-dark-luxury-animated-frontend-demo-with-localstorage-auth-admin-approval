import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '../lib/utils';

interface PremiumCardProps {
  title: string;
  icon: LucideIcon;
  className?: string;
  children?: ReactNode;
}

export default function PremiumCard({ title, icon: Icon, className, children }: PremiumCardProps) {
  return (
    <div
      className={cn(
        'glass-panel group cursor-pointer rounded-2xl border border-white/10 p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] hover:border-neon-blue hover:shadow-neon',
        className
      )}
    >
      <div className="flex items-center gap-4">
        <div className="rounded-xl bg-neon-blue/20 p-3 transition-all duration-500 group-hover:bg-neon-blue/30 group-hover:shadow-neon-sm">
          <Icon className="h-6 w-6 text-neon-blue" />
        </div>
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </div>
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}

import { Badge } from './ui/badge';
import { cn } from '../lib/utils';

interface StatusBadgeProps {
  status: 'pending' | 'approved' | 'rejected';
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const variants = {
    pending: {
      className: 'bg-neon-blue/20 text-neon-blue border-neon-blue/50 shadow-neon-sm animate-pulse',
      label: 'Awaiting Approval',
    },
    approved: {
      className: 'bg-green-500/20 text-green-400 border-green-500/50',
      label: 'Active',
    },
    rejected: {
      className: 'bg-red-500/20 text-red-400 border-red-500/50',
      label: 'Rejected',
    },
  };

  const config = variants[status];

  return (
    <Badge className={cn('border', config.className)}>{config.label}</Badge>
  );
}

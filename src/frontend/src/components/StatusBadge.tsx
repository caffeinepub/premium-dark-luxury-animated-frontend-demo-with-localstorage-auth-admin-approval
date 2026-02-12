interface StatusBadgeProps {
  approved: boolean;
}

export default function StatusBadge({ approved }: StatusBadgeProps) {
  if (approved) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-green-500/20 px-3 py-1 text-xs font-medium text-green-400 border border-green-500/30">
        <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
        Approved
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-neon-blue/20 px-3 py-1 text-xs font-medium text-neon-blue border border-neon-blue/30 animate-pulse-glow">
      <span className="h-1.5 w-1.5 rounded-full bg-neon-blue animate-pulse" />
      Waiting for approval
    </span>
  );
}

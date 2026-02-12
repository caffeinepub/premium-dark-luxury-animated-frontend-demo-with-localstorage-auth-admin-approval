import { ReactNode } from 'react';

interface AnimatedRouteWrapperProps {
  children: ReactNode;
}

export default function AnimatedRouteWrapper({ children }: AnimatedRouteWrapperProps) {
  return (
    <div className="animate-fade-in w-full">
      {children}
    </div>
  );
}

import { ReactNode, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useAuthzState } from '../../hooks/useAuthzState';

interface AdminRouteProps {
  children: ReactNode;
}

export default function AdminRoute({ children }: AdminRouteProps) {
  const navigate = useNavigate();
  const { isAdmin } = useAuthzState();

  useEffect(() => {
    if (!isAdmin) {
      navigate({ to: '/' });
    }
  }, [isAdmin, navigate]);

  if (!isAdmin) {
    return null;
  }

  return <>{children}</>;
}

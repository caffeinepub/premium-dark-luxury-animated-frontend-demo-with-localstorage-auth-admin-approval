import { ReactNode, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { getSession } from '../../utils/storage';

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const session = getSession();

  useEffect(() => {
    if (!session) {
      navigate({ to: '/login' });
    }
  }, [session, navigate]);

  if (!session) {
    return null;
  }

  return <>{children}</>;
}

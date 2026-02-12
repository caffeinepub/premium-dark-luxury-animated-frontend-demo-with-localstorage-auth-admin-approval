import { ReactNode, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { getSession } from '../../utils/storage';

interface AdminRouteProps {
  children: ReactNode;
}

export default function AdminRoute({ children }: AdminRouteProps) {
  const navigate = useNavigate();
  const session = getSession();

  useEffect(() => {
    if (session && session.role !== 'admin') {
      navigate({ to: '/' });
    }
  }, [session, navigate]);

  if (!session || session.role !== 'admin') {
    return null;
  }

  return <>{children}</>;
}

import { ReactNode, useEffect } from 'react';
import { useNavigate, useRouterState } from '@tanstack/react-router';
import { getSession } from '../../utils/storage';
import { recordPageVisit } from '../../utils/analytics';
import { buildLoginNavigation } from '../../utils/returnTo';

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const session = getSession();
  const routerState = useRouterState();

  useEffect(() => {
    if (!session) {
      const { to, search } = buildLoginNavigation(
        routerState.location.pathname,
        routerState.location.search as Record<string, unknown>
      );
      navigate({ to, search });
    } else {
      // Record page visit for authenticated users
      const path = routerState.location.pathname;
      if (path === '/') {
        recordPageVisit('home');
      } else if (path === '/videos') {
        recordPageVisit('videos');
      } else if (path === '/portfolio') {
        recordPageVisit('portfolio');
      } else if (path === '/admin') {
        recordPageVisit('admin');
      }
    }
  }, [session, navigate, routerState.location.pathname, routerState.location.search]);

  if (!session) {
    return null;
  }

  return <>{children}</>;
}

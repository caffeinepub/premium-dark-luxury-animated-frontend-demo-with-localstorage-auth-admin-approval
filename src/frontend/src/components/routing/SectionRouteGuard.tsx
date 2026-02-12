import { ReactNode, useEffect } from 'react';
import { useNavigate, useRouterState } from '@tanstack/react-router';
import { useSession } from '../../hooks/useSession';
import { buildLoginNavigation } from '../../utils/returnTo';

interface SectionRouteGuardProps {
  children: ReactNode;
  pageId: string;
}

export default function SectionRouteGuard({ children, pageId }: SectionRouteGuardProps) {
  const navigate = useNavigate();
  const { session, isLoading } = useSession();
  const routerState = useRouterState();

  useEffect(() => {
    if (isLoading) return;

    if (!session) {
      const { to, search } = buildLoginNavigation(
        routerState.location.pathname,
        routerState.location.search as Record<string, unknown>
      );
      navigate({ to, search });
      return;
    }

    // Admin bypasses all page checks
    if (session.role === 'admin') {
      return;
    }

    // Check if user has access to this page
    if (!session.allowedPages.includes(pageId)) {
      navigate({ 
        to: '/',
        search: { 
          accessDenied: 'true', 
          reason: `You do not have permission to access this page.`
        }
      });
    }
  }, [session, isLoading, pageId, navigate, routerState.location.pathname, routerState.location.search]);

  // Show nothing while loading
  if (isLoading) {
    return null;
  }

  // Admin always has access
  if (session?.role === 'admin') {
    return <>{children}</>;
  }

  // Check access for regular users
  if (session && session.allowedPages.includes(pageId)) {
    return <>{children}</>;
  }

  return null;
}

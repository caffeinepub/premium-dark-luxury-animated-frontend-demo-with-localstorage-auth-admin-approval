import { ReactNode, useEffect } from 'react';
import { useNavigate, useRouterState } from '@tanstack/react-router';
import { useAuthzState } from '../../hooks/useAuthzState';
import { buildLoginNavigation } from '../../utils/returnTo';

interface SectionRouteGuardProps {
  children: ReactNode;
  pageId: string;
}

export default function SectionRouteGuard({ children, pageId }: SectionRouteGuardProps) {
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin, hasPageAccess } = useAuthzState();
  const routerState = useRouterState();

  useEffect(() => {
    if (!isAuthenticated) {
      const { to, search } = buildLoginNavigation(
        routerState.location.pathname,
        routerState.location.search as Record<string, unknown>
      );
      navigate({ to, search });
      return;
    }

    // Admin bypasses all page checks
    if (isAdmin) {
      return;
    }

    // Check if user has access to this page
    if (!hasPageAccess(pageId)) {
      navigate({
        to: '/',
        search: {
          accessDenied: 'true',
          reason: `You do not have permission to access this page.`,
        },
      });
    }
  }, [isAuthenticated, isAdmin, hasPageAccess, pageId, navigate, routerState.location.pathname, routerState.location.search]);

  // Admin always has access
  if (isAdmin) {
    return <>{children}</>;
  }

  // Check access for regular users
  if (isAuthenticated && hasPageAccess(pageId)) {
    return <>{children}</>;
  }

  return null;
}

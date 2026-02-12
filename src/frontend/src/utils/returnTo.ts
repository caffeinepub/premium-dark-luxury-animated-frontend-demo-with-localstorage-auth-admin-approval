/**
 * Utilities for preserving and restoring the originally requested destination
 * when redirecting unauthenticated users to the login page.
 */

const RETURN_TO_KEY = 'returnTo';

/**
 * Build a return-to value from the current location (pathname + search).
 */
export function buildReturnTo(pathname: string, search: Record<string, unknown>): string {
  const searchParams = new URLSearchParams();
  Object.entries(search).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.set(key, String(value));
    }
  });
  const queryString = searchParams.toString();
  return queryString ? `${pathname}?${queryString}` : pathname;
}

/**
 * Save the return-to destination in sessionStorage.
 */
export function saveReturnTo(destination: string): void {
  if (destination && destination !== '/login' && destination !== '/register') {
    sessionStorage.setItem(RETURN_TO_KEY, destination);
  }
}

/**
 * Read the return-to destination from sessionStorage or search params.
 */
export function getReturnTo(searchParams?: Record<string, unknown>): string | null {
  // First check search params
  if (searchParams?.returnTo && typeof searchParams.returnTo === 'string') {
    return searchParams.returnTo;
  }
  // Fallback to sessionStorage
  return sessionStorage.getItem(RETURN_TO_KEY);
}

/**
 * Clear the return-to destination from sessionStorage.
 */
export function clearReturnTo(): void {
  sessionStorage.removeItem(RETURN_TO_KEY);
}

/**
 * Build login navigation with preserved return-to destination.
 */
export function buildLoginNavigation(currentPath: string, currentSearch: Record<string, unknown>): {
  to: string;
  search: Record<string, unknown>;
} {
  // Don't preserve if already on login or register
  if (currentPath === '/login' || currentPath === '/register') {
    return { to: '/login', search: {} };
  }

  const returnTo = buildReturnTo(currentPath, currentSearch);
  saveReturnTo(returnTo);
  
  return {
    to: '/login',
    search: { returnTo },
  };
}

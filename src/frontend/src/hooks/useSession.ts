import { useAuthzState } from './useAuthzState';

// Compatibility wrapper for existing code that uses useSession
// Now delegates to the new in-memory authz state instead of localStorage
export function useSession() {
  const { authzState, isAuthenticated } = useAuthzState();

  // Map authzState to legacy session format for backward compatibility
  const session = isAuthenticated
    ? {
        email: authzState.email || '',
        name: authzState.name || '',
        role: authzState.role || 'user',
        allowedPages: authzState.allowedPages,
      }
    : null;

  return {
    session,
    isLoading: false, // No longer async loading from localStorage
  };
}

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface AuthzState {
  role: 'admin' | 'user' | null;
  approved: boolean;
  allowedPages: string[];
  email: string | null;
  name: string | null;
}

interface AuthzContextValue {
  authzState: AuthzState;
  setAuthzState: (state: AuthzState) => void;
  clearAuthzState: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  hasPageAccess: (pageId: string) => boolean;
}

const AuthzContext = createContext<AuthzContextValue | undefined>(undefined);

const initialAuthzState: AuthzState = {
  role: null,
  approved: false,
  allowedPages: [],
  email: null,
  name: null,
};

export function AuthzProvider({ children }: { children: ReactNode }) {
  const [authzState, setAuthzStateInternal] = useState<AuthzState>(initialAuthzState);

  const setAuthzState = useCallback((state: AuthzState) => {
    setAuthzStateInternal(state);
  }, []);

  const clearAuthzState = useCallback(() => {
    setAuthzStateInternal(initialAuthzState);
  }, []);

  const isAuthenticated = authzState.role !== null;
  const isAdmin = authzState.role === 'admin';

  const hasPageAccess = useCallback(
    (pageId: string) => {
      if (authzState.role === 'admin') return true;
      return authzState.allowedPages.includes(pageId);
    },
    [authzState.role, authzState.allowedPages]
  );

  const value: AuthzContextValue = {
    authzState,
    setAuthzState,
    clearAuthzState,
    isAuthenticated,
    isAdmin,
    hasPageAccess,
  };

  return <AuthzContext.Provider value={value}>{children}</AuthzContext.Provider>;
}

export function useAuthzState() {
  const context = useContext(AuthzContext);
  if (context === undefined) {
    throw new Error('useAuthzState must be used within an AuthzProvider');
  }
  return context;
}

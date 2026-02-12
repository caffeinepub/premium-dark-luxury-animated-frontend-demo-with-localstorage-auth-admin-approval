import { useState, useEffect } from 'react';
import { getSession, subscribeToSessionChanges, getUser, setSession, type Session } from '../utils/storage';

export function useSession() {
  const [session, setSessionState] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initial load: refresh permissions from storage
    const currentSession = getSession();
    
    if (currentSession) {
      const user = getUser(currentSession.email);
      
      if (user) {
        // Check if user is still approved
        if (!user.approved && user.role !== 'admin') {
          // User no longer approved, clear session
          setSessionState(null);
          setIsLoading(false);
          return;
        }
        
        // Refresh session with latest permissions
        const refreshedSession: Session = {
          email: user.email,
          name: user.name,
          role: user.role,
          allowedPages: user.allowedPages,
        };
        
        // Update session in storage if permissions changed
        if (JSON.stringify(currentSession.allowedPages) !== JSON.stringify(user.allowedPages)) {
          setSession(refreshedSession);
        }
        
        setSessionState(refreshedSession);
      } else {
        setSessionState(null);
      }
    } else {
      setSessionState(null);
    }
    
    setIsLoading(false);

    // Subscribe to session changes
    const unsubscribe = subscribeToSessionChanges((newSession) => {
      setSessionState(newSession);
    });

    return unsubscribe;
  }, []);

  return { session, isLoading };
}

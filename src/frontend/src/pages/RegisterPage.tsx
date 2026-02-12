import { useEffect } from 'react';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { getReturnTo } from '../utils/returnTo';

export default function RegisterPage() {
  const navigate = useNavigate();
  const search = useSearch({ strict: false }) as Record<string, unknown>;

  useEffect(() => {
    // Preserve any existing return-to destination when redirecting to login
    const returnTo = getReturnTo(search);
    const loginSearch: Record<string, string> = { register: 'true' };
    
    if (returnTo) {
      loginSearch.returnTo = returnTo;
    }
    
    navigate({ to: '/login', search: loginSearch });
  }, [navigate, search]);

  return null;
}

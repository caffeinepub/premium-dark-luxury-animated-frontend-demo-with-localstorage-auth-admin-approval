import { ReactNode } from 'react';
import { useRouter } from '@tanstack/react-router';
import { useSession } from '../../hooks/useSession';
import Navbar from '../nav/Navbar';
import ThemeDiagnosticsBanner from '../diagnostics/ThemeDiagnosticsBanner';

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const { session, isLoading } = useSession();
  const router = useRouter();
  const currentPath = router.state.location.pathname;
  
  // Hide navbar on public routes
  const isPublicRoute = currentPath === '/login' || currentPath === '/register';
  const showNavbar = session && !isPublicRoute && !isLoading;

  return (
    <div className="min-h-screen bg-[#0A1F44] overflow-x-hidden" style={{ backgroundColor: '#0A1F44' }}>
      <ThemeDiagnosticsBanner />
      {showNavbar && <Navbar />}
      <main className="w-full">{children}</main>
    </div>
  );
}

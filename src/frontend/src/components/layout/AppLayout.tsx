import { ReactNode } from 'react';
import { getSession } from '../../utils/storage';
import Navbar from '../nav/Navbar';

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const session = getSession();

  return (
    <div className="min-h-screen bg-luxury-dark">
      {session && <Navbar />}
      <main className="w-full">{children}</main>
    </div>
  );
}

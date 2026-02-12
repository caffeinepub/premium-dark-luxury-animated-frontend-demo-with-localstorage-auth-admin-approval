import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Home, Video, Briefcase, Shield, LogOut, ChevronDown } from 'lucide-react';
import { getSession } from '../../utils/storage';
import { logout } from '../../utils/auth';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

export default function Navbar() {
  const navigate = useNavigate();
  const session = getSession();
  const [isTelusOpen, setIsTelusOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate({ to: '/login' });
  };

  if (!session) return null;

  return (
    <nav className="sticky top-0 z-50 w-full animate-slide-down border-b border-white/10 bg-luxury-dark/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <div className="text-xl font-bold text-neon-blue transition-transform duration-300 hover:scale-105">
            Premium App
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              className="glass-button text-white hover:text-neon-blue"
              onClick={() => navigate({ to: '/' })}
            >
              <Home className="mr-2 h-4 w-4" />
              Home
            </Button>

            <DropdownMenu open={isTelusOpen} onOpenChange={setIsTelusOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="glass-button text-white hover:text-neon-blue">
                  Telus
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="glass-panel border-white/10">
                <DropdownMenuItem
                  onClick={() => {
                    navigate({ to: '/videos' });
                    setIsTelusOpen(false);
                  }}
                  className="cursor-pointer text-white hover:bg-white/10 hover:text-neon-blue"
                >
                  <Video className="mr-2 h-4 w-4" />
                  Videos
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    navigate({ to: '/portfolio' });
                    setIsTelusOpen(false);
                  }}
                  className="cursor-pointer text-white hover:bg-white/10 hover:text-neon-blue"
                >
                  <Briefcase className="mr-2 h-4 w-4" />
                  Portfolio
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {session.role === 'admin' && (
              <Button
                variant="ghost"
                className="glass-button text-white hover:text-neon-blue"
                onClick={() => navigate({ to: '/admin' })}
              >
                <Shield className="mr-2 h-4 w-4" />
                Admin
              </Button>
            )}
          </div>
        </div>

        <Button
          variant="ghost"
          className="glass-button text-white hover:text-destructive"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </nav>
  );
}

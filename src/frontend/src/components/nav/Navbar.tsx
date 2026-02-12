import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Home, Video, Briefcase, Shield, LogOut, ChevronDown, FileText, Film, Menu, X, Globe, Layers } from 'lucide-react';
import { useAuthzState } from '../../hooks/useAuthzState';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

export default function Navbar() {
  const navigate = useNavigate();
  const { authzState, clearAuthzState, isAdmin, hasPageAccess } = useAuthzState();
  const [isTelusOpen, setIsTelusOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    clearAuthzState();
    setIsMobileMenuOpen(false);
    navigate({ to: '/login' });
  };

  const handleNavigation = (path: string) => {
    navigate({ to: path });
    setIsMobileMenuOpen(false);
    setIsTelusOpen(false);
  };

  if (!authzState.role) return null;

  // Check access for each page
  const homeAccess = hasPageAccess('home');
  const videosAccess = hasPageAccess('videos');
  const portfolioAccess = hasPageAccess('portfolio');
  const myVideosAccess = hasPageAccess('myVideos');
  const myFilesAccess = hasPageAccess('myFiles');
  const intelusAccess = hasPageAccess('intelus');
  const liveAccess = hasPageAccess('live');

  return (
    <nav className="sticky top-0 z-50 w-full animate-slide-down border-b border-white/10 bg-luxury-dark/90 backdrop-blur-xl shadow-lg">
      <div className="w-full px-4 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <div className="nav-logo flex-shrink-0 cursor-default text-lg sm:text-xl font-bold text-neon-blue">
            Premium App
          </div>

          {/* Desktop Navigation - Horizontal */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2 flex-1 justify-center min-w-0">
            {homeAccess && (
              <Button
                variant="ghost"
                size="sm"
                className="nav-item relative text-white hover:text-neon-blue hover:bg-transparent whitespace-nowrap text-xs xl:text-sm px-2 xl:px-3"
                onClick={() => handleNavigation('/')}
              >
                <Home className="mr-1 h-4 w-4 flex-shrink-0" />
                <span className="hidden xl:inline">Home</span>
              </Button>
            )}

            <DropdownMenu open={isTelusOpen} onOpenChange={setIsTelusOpen}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="nav-item relative text-white hover:text-neon-blue hover:bg-transparent whitespace-nowrap text-xs xl:text-sm px-2 xl:px-3"
                >
                  Telus
                  <ChevronDown
                    className={`ml-1 h-4 w-4 flex-shrink-0 transition-transform duration-500 ${isTelusOpen ? 'rotate-180' : ''}`}
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className={`glass-panel border-white/20 bg-luxury-dark/95 backdrop-blur-xl z-[60] ${isTelusOpen ? 'animate-dropdown-open' : ''}`}
                align="center"
              >
                {videosAccess && (
                  <DropdownMenuItem
                    onClick={() => handleNavigation('/videos')}
                    className="dropdown-item cursor-pointer text-white hover:bg-white/10 hover:text-neon-blue focus:bg-white/10 focus:text-neon-blue"
                  >
                    <Video className="mr-2 h-4 w-4" />
                    Videos
                  </DropdownMenuItem>
                )}
                {portfolioAccess && (
                  <DropdownMenuItem
                    onClick={() => handleNavigation('/portfolio')}
                    className="dropdown-item cursor-pointer text-white hover:bg-white/10 hover:text-neon-blue focus:bg-white/10 focus:text-neon-blue"
                  >
                    <Briefcase className="mr-2 h-4 w-4" />
                    Portfolio
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {intelusAccess && (
              <Button
                variant="ghost"
                size="sm"
                className="nav-item relative text-white hover:text-neon-blue hover:bg-transparent whitespace-nowrap text-xs xl:text-sm px-2 xl:px-3"
                onClick={() => handleNavigation('/intelus')}
              >
                <Layers className="mr-1 h-4 w-4 flex-shrink-0" />
                <span className="hidden xl:inline">Intelus</span>
              </Button>
            )}

            {liveAccess && (
              <Button
                variant="ghost"
                size="sm"
                className="nav-item relative text-white hover:text-neon-blue hover:bg-transparent whitespace-nowrap text-xs xl:text-sm px-2 xl:px-3"
                onClick={() => handleNavigation('/live')}
              >
                <Globe className="mr-1 h-4 w-4 flex-shrink-0" />
                <span className="hidden xl:inline">Live</span>
              </Button>
            )}

            {myVideosAccess && (
              <Button
                variant="ghost"
                size="sm"
                className="nav-item relative text-white hover:text-neon-blue hover:bg-transparent whitespace-nowrap text-xs xl:text-sm px-2 xl:px-3"
                onClick={() => handleNavigation('/my-videos')}
              >
                <Film className="mr-1 h-4 w-4 flex-shrink-0" />
                <span className="hidden xl:inline">My Videos</span>
              </Button>
            )}

            {myFilesAccess && (
              <Button
                variant="ghost"
                size="sm"
                className="nav-item relative text-white hover:text-neon-blue hover:bg-transparent whitespace-nowrap text-xs xl:text-sm px-2 xl:px-3"
                onClick={() => handleNavigation('/my-files')}
              >
                <FileText className="mr-1 h-4 w-4 flex-shrink-0" />
                <span className="hidden xl:inline">My Files</span>
              </Button>
            )}

            {isAdmin && (
              <Button
                variant="ghost"
                size="sm"
                className="nav-item relative text-white hover:text-neon-blue hover:bg-transparent whitespace-nowrap text-xs xl:text-sm px-2 xl:px-3"
                onClick={() => handleNavigation('/admin')}
              >
                <Shield className="mr-1 h-4 w-4 flex-shrink-0" />
                <span className="hidden xl:inline">Admin</span>
              </Button>
            )}
          </div>

          {/* Desktop Logout */}
          <div className="hidden lg:flex items-center flex-shrink-0">
            <Button
              variant="ghost"
              size="sm"
              className="nav-item relative text-white hover:text-red-400 hover:bg-transparent whitespace-nowrap text-xs xl:text-sm px-2 xl:px-3"
              onClick={handleLogout}
            >
              <LogOut className="mr-1 h-4 w-4 flex-shrink-0" />
              <span className="hidden xl:inline">Logout</span>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex-shrink-0">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:text-neon-blue"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-white/10 py-4 space-y-2 animate-fade-in">
            {homeAccess && (
              <Button
                variant="ghost"
                className="w-full justify-start text-white hover:text-neon-blue hover:bg-white/5"
                onClick={() => handleNavigation('/')}
              >
                <Home className="mr-2 h-4 w-4" />
                Home
              </Button>
            )}

            {videosAccess && (
              <Button
                variant="ghost"
                className="w-full justify-start text-white hover:text-neon-blue hover:bg-white/5"
                onClick={() => handleNavigation('/videos')}
              >
                <Video className="mr-2 h-4 w-4" />
                Videos
              </Button>
            )}

            {portfolioAccess && (
              <Button
                variant="ghost"
                className="w-full justify-start text-white hover:text-neon-blue hover:bg-white/5"
                onClick={() => handleNavigation('/portfolio')}
              >
                <Briefcase className="mr-2 h-4 w-4" />
                Portfolio
              </Button>
            )}

            {intelusAccess && (
              <Button
                variant="ghost"
                className="w-full justify-start text-white hover:text-neon-blue hover:bg-white/5"
                onClick={() => handleNavigation('/intelus')}
              >
                <Layers className="mr-2 h-4 w-4" />
                Intelus
              </Button>
            )}

            {liveAccess && (
              <Button
                variant="ghost"
                className="w-full justify-start text-white hover:text-neon-blue hover:bg-white/5"
                onClick={() => handleNavigation('/live')}
              >
                <Globe className="mr-2 h-4 w-4" />
                Live
              </Button>
            )}

            {myVideosAccess && (
              <Button
                variant="ghost"
                className="w-full justify-start text-white hover:text-neon-blue hover:bg-white/5"
                onClick={() => handleNavigation('/my-videos')}
              >
                <Film className="mr-2 h-4 w-4" />
                My Videos
              </Button>
            )}

            {myFilesAccess && (
              <Button
                variant="ghost"
                className="w-full justify-start text-white hover:text-neon-blue hover:bg-white/5"
                onClick={() => handleNavigation('/my-files')}
              >
                <FileText className="mr-2 h-4 w-4" />
                My Files
              </Button>
            )}

            {isAdmin && (
              <Button
                variant="ghost"
                className="w-full justify-start text-white hover:text-neon-blue hover:bg-white/5"
                onClick={() => handleNavigation('/admin')}
              >
                <Shield className="mr-2 h-4 w-4" />
                Admin
              </Button>
            )}

            <div className="pt-2 border-t border-white/10">
              <Button
                variant="ghost"
                className="w-full justify-start text-white hover:text-red-400 hover:bg-white/5"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Home, Video, Briefcase, Shield, LogOut, ChevronDown, FileText, Film, Menu, X, Globe, Layers } from 'lucide-react';
import { useSession } from '../../hooks/useSession';
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
  const { session } = useSession();
  const [isTelusOpen, setIsTelusOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
    navigate({ to: '/login' });
  };

  const handleNavigation = (path: string) => {
    navigate({ to: path });
    setIsMobileMenuOpen(false);
    setIsTelusOpen(false);
  };

  if (!session) return null;

  const isAdmin = session.role === 'admin';
  const allowedPages = session.allowedPages;

  // Check access for each page
  const hasAccess = (pageId: string) => isAdmin || allowedPages.includes(pageId);

  const homeAccess = hasAccess('home');
  const videosAccess = hasAccess('videos');
  const portfolioAccess = hasAccess('portfolio');
  const myVideosAccess = hasAccess('myVideos');
  const myFilesAccess = hasAccess('myFiles');
  const intelusAccess = hasAccess('intelus');
  const liveAccess = hasAccess('live');

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
          <div className="flex lg:hidden items-center flex-shrink-0">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:text-neon-blue hover:bg-transparent"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Vertical Stack */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-white/10 bg-luxury-dark/95 backdrop-blur-xl animate-dropdown-open max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="flex flex-col gap-1 px-4 py-2">
            {homeAccess && (
              <Button
                variant="ghost"
                className="nav-item justify-start text-white hover:text-neon-blue hover:bg-white/5 w-full"
                onClick={() => handleNavigation('/')}
              >
                <Home className="mr-2 h-4 w-4 flex-shrink-0" />
                Home
              </Button>
            )}

            {videosAccess && (
              <Button
                variant="ghost"
                className="nav-item justify-start text-white hover:text-neon-blue hover:bg-white/5 w-full"
                onClick={() => handleNavigation('/videos')}
              >
                <Video className="mr-2 h-4 w-4 flex-shrink-0" />
                Videos
              </Button>
            )}

            {portfolioAccess && (
              <Button
                variant="ghost"
                className="nav-item justify-start text-white hover:text-neon-blue hover:bg-white/5 w-full"
                onClick={() => handleNavigation('/portfolio')}
              >
                <Briefcase className="mr-2 h-4 w-4 flex-shrink-0" />
                Portfolio
              </Button>
            )}

            {intelusAccess && (
              <Button
                variant="ghost"
                className="nav-item justify-start text-white hover:text-neon-blue hover:bg-white/5 w-full"
                onClick={() => handleNavigation('/intelus')}
              >
                <Layers className="mr-2 h-4 w-4 flex-shrink-0" />
                Intelus
              </Button>
            )}

            {liveAccess && (
              <Button
                variant="ghost"
                className="nav-item justify-start text-white hover:text-neon-blue hover:bg-white/5 w-full"
                onClick={() => handleNavigation('/live')}
              >
                <Globe className="mr-2 h-4 w-4 flex-shrink-0" />
                Live
              </Button>
            )}

            {myVideosAccess && (
              <Button
                variant="ghost"
                className="nav-item justify-start text-white hover:text-neon-blue hover:bg-white/5 w-full"
                onClick={() => handleNavigation('/my-videos')}
              >
                <Film className="mr-2 h-4 w-4 flex-shrink-0" />
                My Videos
              </Button>
            )}

            {myFilesAccess && (
              <Button
                variant="ghost"
                className="nav-item justify-start text-white hover:text-neon-blue hover:bg-white/5 w-full"
                onClick={() => handleNavigation('/my-files')}
              >
                <FileText className="mr-2 h-4 w-4 flex-shrink-0" />
                My Files
              </Button>
            )}

            {isAdmin && (
              <Button
                variant="ghost"
                className="nav-item justify-start text-white hover:text-neon-blue hover:bg-white/5 w-full"
                onClick={() => handleNavigation('/admin')}
              >
                <Shield className="mr-2 h-4 w-4 flex-shrink-0" />
                Admin
              </Button>
            )}

            <div className="border-t border-white/10 my-1" />

            <Button
              variant="ghost"
              className="nav-item justify-start text-white hover:text-red-400 hover:bg-white/5 w-full"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4 flex-shrink-0" />
              Logout
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}

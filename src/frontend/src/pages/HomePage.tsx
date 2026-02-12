import { FileText, Video, StickyNote, Layers, Globe } from 'lucide-react';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { useSession } from '../hooks/useSession';
import PremiumCard from '../components/PremiumCard';
import AnimatedRouteWrapper from '../components/motion/AnimatedRouteWrapper';
import { Alert, AlertDescription } from '../components/ui/alert';
import { AlertCircle } from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();
  const { session } = useSession();
  const search = useSearch({ strict: false }) as { accessDenied?: string; reason?: string };

  if (!session) return null;

  const isAdmin = session.role === 'admin';
  const allowedPages = session.allowedPages;

  const hasAccess = (pageId: string) => isAdmin || allowedPages.includes(pageId);

  return (
    <AnimatedRouteWrapper>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="mb-8 md:mb-12 animate-fade-in-down text-center">
          <h1 className="mb-4 text-4xl md:text-5xl font-bold text-white">
            Welcome back, <span className="text-neon-blue">{session.name}</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400">{session.email}</p>
        </div>

        {search.accessDenied === 'true' && search.reason && (
          <div className="mb-8 animate-fade-in-down">
            <Alert variant="destructive" className="border-red-500/50 bg-red-500/10">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{search.reason}</AlertDescription>
            </Alert>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {hasAccess('intelus') && (
            <PremiumCard
              icon={Layers}
              title="Intelus"
              description="View content library"
              onClick={() => navigate({ to: '/intelus' })}
              className="animate-fade-in-up"
            />
          )}
          {hasAccess('live') && (
            <PremiumCard
              icon={Globe}
              title="Live"
              description="Explore live content"
              onClick={() => navigate({ to: '/live' })}
              className="animate-fade-in-up animation-delay-100"
            />
          )}
          {hasAccess('myFiles') && (
            <PremiumCard
              icon={FileText}
              title="My Files"
              description="Access your documents"
              onClick={() => navigate({ to: '/my-files' })}
              className="animate-fade-in-up animation-delay-200"
            />
          )}
          {hasAccess('myVideos') && (
            <PremiumCard
              icon={Video}
              title="My Videos"
              description="Watch your videos"
              onClick={() => navigate({ to: '/my-videos' })}
              className="animate-fade-in-up animation-delay-300"
            />
          )}
          <PremiumCard
            icon={StickyNote}
            title="Notes"
            description="Manage your notes"
            onClick={() => {}}
            className="animate-fade-in-up animation-delay-300"
          />
        </div>
      </div>
    </AnimatedRouteWrapper>
  );
}

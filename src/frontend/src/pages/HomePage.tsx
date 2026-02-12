import { FileText, Video, StickyNote } from 'lucide-react';
import { getSession } from '../utils/storage';
import PremiumCard from '../components/PremiumCard';
import AnimatedRouteWrapper from '../components/motion/AnimatedRouteWrapper';

export default function HomePage() {
  const session = getSession();

  if (!session) return null;

  return (
    <AnimatedRouteWrapper>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12 animate-fade-in-down text-center">
          <h1 className="mb-4 text-5xl font-bold text-white">
            Welcome, <span className="text-neon-blue">{session.name}</span>
          </h1>
          <p className="text-xl text-gray-400">{session.email}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="animate-stagger-1">
            <PremiumCard title="My Files" icon={FileText}>
              <p className="text-gray-400">Access and manage your files</p>
            </PremiumCard>
          </div>

          <div className="animate-stagger-2">
            <PremiumCard title="My Videos" icon={Video}>
              <p className="text-gray-400">View your video collection</p>
            </PremiumCard>
          </div>

          <div className="animate-stagger-3">
            <PremiumCard title="Notes" icon={StickyNote}>
              <p className="text-gray-400">Create and organize notes</p>
            </PremiumCard>
          </div>
        </div>
      </div>
    </AnimatedRouteWrapper>
  );
}

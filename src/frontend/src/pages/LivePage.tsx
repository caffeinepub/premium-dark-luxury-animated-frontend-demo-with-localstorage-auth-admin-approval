import { Globe, AlertCircle } from 'lucide-react';
import { useGetContentItems } from '../hooks/useQueries';
import AnimatedRouteWrapper from '../components/motion/AnimatedRouteWrapper';
import LiveEmbedPreview from '../components/content/LiveEmbedPreview';

export default function LivePage() {
  const { data: items = [], isLoading } = useGetContentItems();

  const liveItems = items.filter((item) => item.contentType.__kind__ === 'liveEmbed');

  if (isLoading) {
    return (
      <AnimatedRouteWrapper>
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="text-center text-gray-400">Loading live content...</div>
        </div>
      </AnimatedRouteWrapper>
    );
  }

  return (
    <AnimatedRouteWrapper>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="mb-8 md:mb-12 animate-fade-in-down text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-neon-blue/20 shadow-neon">
            <Globe className="h-8 w-8 text-neon-blue" />
          </div>
          <h1 className="mb-4 text-4xl md:text-5xl font-bold text-white">
            <span className="text-neon-blue">Live</span> Section
          </h1>
          <p className="text-lg md:text-xl text-gray-400">Embedded live content</p>
        </div>

        {liveItems.length === 0 ? (
          <div className="glass-panel rounded-3xl border border-white/10 p-12 backdrop-blur-xl text-center animate-fade-in-up">
            <Globe className="mx-auto h-16 w-16 text-gray-500 mb-4" />
            <p className="text-xl text-gray-400">No live content available yet</p>
            <p className="text-sm text-gray-500 mt-2">Live embeds added by admin will appear here</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8">
            {liveItems.map((item, index) => (
              <div
                key={item.id.toString()}
                className="glass-panel rounded-2xl border border-white/10 p-6 backdrop-blur-xl animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <h3 className="text-2xl font-semibold text-white mb-2">{item.title}</h3>
                {item.description && (
                  <p className="text-gray-400 mb-4">{item.description}</p>
                )}
                {item.contentType.__kind__ === 'liveEmbed' && (
                  <LiveEmbedPreview url={item.contentType.liveEmbed} title={item.title} />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </AnimatedRouteWrapper>
  );
}

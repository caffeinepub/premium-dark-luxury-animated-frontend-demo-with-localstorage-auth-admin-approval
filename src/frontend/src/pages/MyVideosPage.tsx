import { Video, Play, AlertCircle } from 'lucide-react';
import { useGetContentItems } from '../hooks/useQueries';
import AnimatedRouteWrapper from '../components/motion/AnimatedRouteWrapper';
import DriveVideoEmbed from '../components/content/DriveVideoEmbed';
import { Alert, AlertDescription } from '../components/ui/alert';

export default function MyVideosPage() {
  const { data: items = [], isLoading } = useGetContentItems();

  const videoItems = items.filter(
    (item) =>
      item.contentType.__kind__ === 'videoLink' || item.contentType.__kind__ === 'videoFile'
  );

  if (isLoading) {
    return (
      <AnimatedRouteWrapper>
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="text-center text-gray-400">Loading videos...</div>
        </div>
      </AnimatedRouteWrapper>
    );
  }

  return (
    <AnimatedRouteWrapper>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="mb-8 md:mb-12 animate-fade-in-down text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-neon-blue/20 shadow-neon">
            <Video className="h-8 w-8 text-neon-blue" />
          </div>
          <h1 className="mb-4 text-4xl md:text-5xl font-bold text-white">
            My <span className="text-neon-blue">Videos</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400">Your video library</p>
        </div>

        {videoItems.length === 0 ? (
          <div className="glass-panel rounded-3xl border border-white/10 p-12 backdrop-blur-xl text-center animate-fade-in-up">
            <Video className="mx-auto h-16 w-16 text-gray-500 mb-4" />
            <p className="text-xl text-gray-400">No videos available yet</p>
            <p className="text-sm text-gray-500 mt-2">Videos added by admin will appear here</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videoItems.map((item, index) => (
              <div
                key={item.id.toString()}
                className="glass-panel rounded-2xl border border-white/10 p-6 backdrop-blur-xl animate-fade-in-up hover:border-neon-blue/50 transition-all duration-500"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {item.contentType.__kind__ === 'videoLink' ? (
                  <DriveVideoEmbed
                    url={item.contentType.videoLink}
                    title={item.title}
                    className="mb-4"
                  />
                ) : item.contentType.__kind__ === 'videoFile' ? (
                  <div className="aspect-video bg-luxury-dark/50 rounded-xl mb-4 overflow-hidden">
                    <video
                      src={item.contentType.videoFile.getDirectURL()}
                      controls
                      className="w-full h-full object-cover"
                      preload="metadata"
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                ) : null}

                <h3 className="text-lg font-semibold text-white mb-2 truncate">{item.title}</h3>
                {item.description && (
                  <p className="text-sm text-gray-400 mb-2 line-clamp-2">{item.description}</p>
                )}
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <Play className="h-4 w-4" />
                    Video
                  </span>
                  <span className="text-xs">
                    {new Date(Number(item.createdAt)).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AnimatedRouteWrapper>
  );
}

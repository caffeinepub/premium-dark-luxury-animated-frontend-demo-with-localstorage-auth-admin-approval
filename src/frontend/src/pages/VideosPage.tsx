import GlassCard from '../components/GlassCard';
import AnimatedRouteWrapper from '../components/motion/AnimatedRouteWrapper';

const videos = [
  { id: 'dQw4w9WgXcQ', title: 'Video 1' },
  { id: 'jNQXAC9IVRw', title: 'Video 2' },
  { id: 'L_jWHffIx5E', title: 'Video 3' },
];

export default function VideosPage() {
  return (
    <AnimatedRouteWrapper>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12 animate-fade-in-down text-center">
          <h1 className="mb-4 text-5xl font-bold text-white">
            Telus <span className="text-neon-blue">Videos</span>
          </h1>
          <p className="text-xl text-gray-400">Explore our video collection</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {videos.map((video, index) => (
            <div key={video.id} className={`animate-stagger-${index + 1}`}>
              <GlassCard className="overflow-hidden p-0">
                <div className="aspect-video w-full">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white">{video.title}</h3>
                </div>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>
    </AnimatedRouteWrapper>
  );
}

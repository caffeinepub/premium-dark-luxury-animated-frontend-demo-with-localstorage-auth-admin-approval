import { Film, FileText, AlertCircle } from 'lucide-react';
import { useGetContentItems } from '../hooks/useQueries';
import AnimatedRouteWrapper from '../components/motion/AnimatedRouteWrapper';
import DriveVideoEmbed from '../components/content/DriveVideoEmbed';

export default function IntelusPage() {
  const { data: items = [], isLoading } = useGetContentItems();

  const videoItems = items.filter(
    (item) =>
      item.contentType.__kind__ === 'videoLink' || item.contentType.__kind__ === 'videoFile'
  );
  const documentItems = items.filter((item) => item.contentType.__kind__ === 'document');

  if (isLoading) {
    return (
      <AnimatedRouteWrapper>
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="text-center text-gray-400">Loading content...</div>
        </div>
      </AnimatedRouteWrapper>
    );
  }

  return (
    <AnimatedRouteWrapper>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="mb-8 md:mb-12 animate-fade-in-down text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-neon-blue/20 shadow-neon">
            <Film className="h-8 w-8 text-neon-blue" />
          </div>
          <h1 className="mb-4 text-4xl md:text-5xl font-bold text-white">
            <span className="text-neon-blue">Intelus</span> Content
          </h1>
          <p className="text-lg md:text-xl text-gray-400">Videos and documents</p>
        </div>

        {/* Videos Section */}
        {videoItems.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-6">Videos</h2>
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
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  {item.description && (
                    <p className="text-sm text-gray-400 mb-2">{item.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Documents Section */}
        {documentItems.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-6">Documents</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {documentItems.map((item, index) => (
                <div
                  key={item.id.toString()}
                  className="glass-panel rounded-2xl border border-white/10 p-6 backdrop-blur-xl animate-fade-in-up hover:border-neon-blue/50 transition-all duration-500"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neon-blue/20 flex-shrink-0">
                      <FileText className="h-6 w-6 text-neon-blue" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-white mb-1">{item.title}</h3>
                      {item.description && (
                        <p className="text-sm text-gray-400">{item.description}</p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      if (item.contentType.__kind__ === 'document') {
                        window.open(item.contentType.document.getDirectURL(), '_blank');
                      }
                    }}
                    className="w-full px-4 py-2 bg-neon-blue/20 text-neon-blue rounded-lg hover:bg-neon-blue/30 transition-all duration-500"
                  >
                    Open Document
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {videoItems.length === 0 && documentItems.length === 0 && (
          <div className="glass-panel rounded-3xl border border-white/10 p-12 backdrop-blur-xl text-center animate-fade-in-up">
            <AlertCircle className="mx-auto h-16 w-16 text-gray-500 mb-4" />
            <p className="text-xl text-gray-400">No content available yet</p>
            <p className="text-sm text-gray-500 mt-2">Content added by admin will appear here</p>
          </div>
        )}
      </div>
    </AnimatedRouteWrapper>
  );
}

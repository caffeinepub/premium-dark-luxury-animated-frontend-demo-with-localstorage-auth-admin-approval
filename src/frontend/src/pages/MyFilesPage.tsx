import { FileText, Download, AlertCircle } from 'lucide-react';
import { useGetContentItems } from '../hooks/useQueries';
import AnimatedRouteWrapper from '../components/motion/AnimatedRouteWrapper';
import { Button } from '../components/ui/button';

export default function MyFilesPage() {
  const { data: items = [], isLoading } = useGetContentItems();

  const documentItems = items.filter((item) => item.contentType.__kind__ === 'document');

  const handleOpenFile = (url: string) => {
    window.open(url, '_blank');
  };

  if (isLoading) {
    return (
      <AnimatedRouteWrapper>
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="text-center text-gray-400">Loading documents...</div>
        </div>
      </AnimatedRouteWrapper>
    );
  }

  return (
    <AnimatedRouteWrapper>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="mb-8 md:mb-12 animate-fade-in-down text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-neon-blue/20 shadow-neon">
            <FileText className="h-8 w-8 text-neon-blue" />
          </div>
          <h1 className="mb-4 text-4xl md:text-5xl font-bold text-white">
            My <span className="text-neon-blue">Files</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400">Your document library</p>
        </div>

        {documentItems.length === 0 ? (
          <div className="glass-panel rounded-3xl border border-white/10 p-12 backdrop-blur-xl text-center animate-fade-in-up">
            <FileText className="mx-auto h-16 w-16 text-gray-500 mb-4" />
            <p className="text-xl text-gray-400">No documents available yet</p>
            <p className="text-sm text-gray-500 mt-2">Documents added by admin will appear here</p>
          </div>
        ) : (
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
                    <h3 className="text-lg font-semibold text-white mb-1 truncate">{item.title}</h3>
                    {item.description && (
                      <p className="text-sm text-gray-400 line-clamp-2">{item.description}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>Added:</span>
                    <span>{new Date(Number(item.createdAt)).toLocaleDateString()}</span>
                  </div>
                </div>

                <Button
                  onClick={() => {
                    if (item.contentType.__kind__ === 'document') {
                      handleOpenFile(item.contentType.document.getDirectURL());
                    }
                  }}
                  className="w-full bg-neon-blue/20 text-neon-blue hover:bg-neon-blue/30 transition-all duration-500"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Open File
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </AnimatedRouteWrapper>
  );
}

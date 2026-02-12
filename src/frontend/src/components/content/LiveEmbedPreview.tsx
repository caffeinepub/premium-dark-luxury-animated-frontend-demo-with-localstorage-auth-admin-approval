import { useState } from 'react';
import { AlertCircle, ExternalLink } from 'lucide-react';
import { Button } from '../ui/button';

interface LiveEmbedPreviewProps {
  url: string;
  title: string;
  className?: string;
}

export default function LiveEmbedPreview({ url, title, className = '' }: LiveEmbedPreviewProps) {
  const [embedError, setEmbedError] = useState(false);

  const handleIframeError = () => {
    setEmbedError(true);
  };

  if (embedError) {
    return (
      <div className={`flex flex-col items-center justify-center p-8 bg-luxury-dark/50 rounded-xl border border-white/10 ${className}`}>
        <AlertCircle className="h-12 w-12 text-gray-500 mb-4" />
        <p className="text-gray-400 text-center mb-2">This site cannot be embedded</p>
        <p className="text-sm text-gray-500 text-center mb-4">
          The website's security settings prevent it from being displayed in an iframe.
        </p>
        <Button
          onClick={() => window.open(url, '_blank')}
          variant="outline"
          className="border-neon-blue/50 text-neon-blue hover:bg-neon-blue/10"
        >
          <ExternalLink className="mr-2 h-4 w-4" />
          Open in New Tab
        </Button>
      </div>
    );
  }

  return (
    <div className={`relative w-full ${className}`}>
      <div className="aspect-video w-full rounded-xl overflow-hidden bg-luxury-dark/50 border border-white/10">
        <iframe
          src={url}
          title={title}
          className="w-full h-full"
          onError={handleIframeError}
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        />
      </div>
      <div className="mt-2 flex justify-end">
        <Button
          onClick={() => window.open(url, '_blank')}
          variant="ghost"
          size="sm"
          className="text-gray-400 hover:text-neon-blue"
        >
          <ExternalLink className="mr-2 h-4 w-4" />
          Open in New Tab
        </Button>
      </div>
    </div>
  );
}

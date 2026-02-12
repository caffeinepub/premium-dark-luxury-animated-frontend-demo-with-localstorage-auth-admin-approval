import { AlertCircle, ExternalLink } from 'lucide-react';
import { convertDriveUrlToEmbed } from '../../utils/googleDriveEmbed';
import { Button } from '../ui/button';

interface DriveVideoEmbedProps {
  url: string;
  title: string;
  className?: string;
}

export default function DriveVideoEmbed({ url, title, className = '' }: DriveVideoEmbedProps) {
  const embedResult = convertDriveUrlToEmbed(url);

  if (!embedResult.embeddable) {
    return (
      <div className={`flex flex-col items-center justify-center p-8 bg-luxury-dark/50 rounded-xl border border-white/10 ${className}`}>
        <AlertCircle className="h-12 w-12 text-gray-500 mb-4" />
        <p className="text-gray-400 text-center mb-2">Unable to embed this video</p>
        <p className="text-sm text-gray-500 text-center mb-4">{embedResult.error}</p>
        <Button
          onClick={() => window.open(url, '_blank')}
          variant="outline"
          className="border-neon-blue/50 text-neon-blue hover:bg-neon-blue/10"
        >
          <ExternalLink className="mr-2 h-4 w-4" />
          Open in Google Drive
        </Button>
      </div>
    );
  }

  return (
    <div className={`relative w-full ${className}`}>
      <div className="aspect-video w-full rounded-xl overflow-hidden bg-luxury-dark/50">
        <iframe
          src={embedResult.embedUrl}
          title={title}
          className="w-full h-full"
          allow="autoplay"
          allowFullScreen
        />
      </div>
    </div>
  );
}

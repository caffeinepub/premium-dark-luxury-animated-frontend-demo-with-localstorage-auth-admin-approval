export interface DriveEmbedResult {
  embeddable: boolean;
  embedUrl?: string;
  error?: string;
}

export function convertDriveUrlToEmbed(url: string): DriveEmbedResult {
  try {
    // Match various Google Drive URL formats
    const patterns = [
      /drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/,
      /drive\.google\.com\/open\?id=([a-zA-Z0-9_-]+)/,
      /docs\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        const fileId = match[1];
        return {
          embeddable: true,
          embedUrl: `https://drive.google.com/file/d/${fileId}/preview`,
        };
      }
    }

    return {
      embeddable: false,
      error: 'Unable to extract Google Drive file ID from the provided URL.',
    };
  } catch (error) {
    return {
      embeddable: false,
      error: 'Invalid URL format.',
    };
  }
}

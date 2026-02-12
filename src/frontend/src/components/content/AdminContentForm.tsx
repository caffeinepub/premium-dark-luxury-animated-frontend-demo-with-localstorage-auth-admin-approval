import { useState, useRef } from 'react';
import { Upload, Link as LinkIcon, Globe, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Alert, AlertDescription } from '../ui/alert';
import { validateVideoFile, validateDocumentFile } from '../../utils/fileValidation';
import { useAddContent } from '../../hooks/useQueries';
import { ExternalBlob } from '../../backend';
import type { ContentType } from '../../backend';

export default function AdminContentForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [driveLink, setDriveLink] = useState('');
  const [liveEmbedUrl, setLiveEmbedUrl] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const videoInputRef = useRef<HTMLInputElement>(null);
  const documentInputRef = useRef<HTMLInputElement>(null);

  const addContentMutation = useAddContent();

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setDriveLink('');
    setLiveEmbedUrl('');
    setUploadProgress(0);
    setError('');
    if (videoInputRef.current) videoInputRef.current.value = '';
    if (documentInputRef.current) documentInputRef.current.value = '';
  };

  const handleDriveLinkSubmit = async () => {
    if (!title.trim() || !driveLink.trim()) {
      setError('Please provide both title and Google Drive link.');
      return;
    }

    setError('');
    setIsUploading(true);

    try {
      const contentType: ContentType = {
        __kind__: 'videoLink',
        videoLink: driveLink.trim(),
      };

      await addContentMutation.mutateAsync({
        title: title.trim(),
        description: description.trim(),
        contentType,
        isEnabled: true,
      });

      resetForm();
    } catch (err: any) {
      setError(err.message || 'Failed to add Google Drive link.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validation = validateVideoFile(file);
    if (!validation.valid) {
      setError(validation.error || 'Invalid video file.');
      return;
    }

    if (!title.trim()) {
      setError('Please provide a title for the video.');
      return;
    }

    setError('');
    setIsUploading(true);
    setUploadProgress(0);

    try {
      const fileBytes = new Uint8Array(await file.arrayBuffer());
      const blob = ExternalBlob.fromBytes(fileBytes).withUploadProgress((percentage) => {
        setUploadProgress(percentage);
      });

      const contentType: ContentType = {
        __kind__: 'videoFile',
        videoFile: blob,
      };

      await addContentMutation.mutateAsync({
        title: title.trim(),
        description: description.trim(),
        contentType,
        isEnabled: true,
      });

      resetForm();
    } catch (err: any) {
      setError(err.message || 'Failed to upload video.');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleDocumentUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validation = validateDocumentFile(file);
    if (!validation.valid) {
      setError(validation.error || 'Invalid document file.');
      return;
    }

    if (!title.trim()) {
      setError('Please provide a title for the document.');
      return;
    }

    setError('');
    setIsUploading(true);
    setUploadProgress(0);

    try {
      const fileBytes = new Uint8Array(await file.arrayBuffer());
      const blob = ExternalBlob.fromBytes(fileBytes).withUploadProgress((percentage) => {
        setUploadProgress(percentage);
      });

      const contentType: ContentType = {
        __kind__: 'document',
        document: blob,
      };

      await addContentMutation.mutateAsync({
        title: title.trim(),
        description: description.trim(),
        contentType,
        isEnabled: true,
      });

      resetForm();
    } catch (err: any) {
      setError(err.message || 'Failed to upload document.');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleLiveEmbedSubmit = async () => {
    if (!title.trim() || !liveEmbedUrl.trim()) {
      setError('Please provide both title and embed URL.');
      return;
    }

    setError('');
    setIsUploading(true);

    try {
      const contentType: ContentType = {
        __kind__: 'liveEmbed',
        liveEmbed: liveEmbedUrl.trim(),
      };

      await addContentMutation.mutateAsync({
        title: title.trim(),
        description: description.trim(),
        contentType,
        isEnabled: true,
      });

      resetForm();
    } catch (err: any) {
      setError(err.message || 'Failed to add live embed.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="glass-panel rounded-2xl border border-white/10 p-6 backdrop-blur-xl">
      <h3 className="text-xl font-semibold text-white mb-4">Add New Content</h3>

      {error && (
        <Alert variant="destructive" className="mb-4 border-red-500/50 bg-red-500/10">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-4 mb-6">
        <div>
          <Label htmlFor="title" className="text-white">Title *</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter content title"
            className="glass-input mt-1"
            disabled={isUploading}
          />
        </div>
        <div>
          <Label htmlFor="description" className="text-white">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter content description (optional)"
            className="glass-input mt-1 min-h-[80px]"
            disabled={isUploading}
          />
        </div>
      </div>

      <Tabs defaultValue="drive" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-luxury-dark/50">
          <TabsTrigger value="drive" disabled={isUploading}>Drive Link</TabsTrigger>
          <TabsTrigger value="video" disabled={isUploading}>Upload Video</TabsTrigger>
          <TabsTrigger value="document" disabled={isUploading}>Upload Doc</TabsTrigger>
          <TabsTrigger value="live" disabled={isUploading}>Live Embed</TabsTrigger>
        </TabsList>

        <TabsContent value="drive" className="space-y-4 mt-4">
          <div>
            <Label htmlFor="driveLink" className="text-white">Google Drive Video Link</Label>
            <Input
              id="driveLink"
              value={driveLink}
              onChange={(e) => setDriveLink(e.target.value)}
              placeholder="https://drive.google.com/file/d/..."
              className="glass-input mt-1"
              disabled={isUploading}
            />
          </div>
          <Button
            onClick={handleDriveLinkSubmit}
            disabled={isUploading || !title.trim() || !driveLink.trim()}
            className="w-full bg-neon-blue/20 text-neon-blue hover:bg-neon-blue/30"
          >
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding...
              </>
            ) : (
              <>
                <LinkIcon className="mr-2 h-4 w-4" />
                Add Drive Link
              </>
            )}
          </Button>
        </TabsContent>

        <TabsContent value="video" className="space-y-4 mt-4">
          <div>
            <Label htmlFor="videoFile" className="text-white">Video File (Max 50 MB)</Label>
            <Input
              id="videoFile"
              ref={videoInputRef}
              type="file"
              accept="video/mp4,video/webm,video/ogg,video/quicktime"
              onChange={handleVideoUpload}
              className="glass-input mt-1"
              disabled={isUploading}
            />
          </div>
          {isUploading && uploadProgress > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-400">
                <span>Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full bg-luxury-dark/50 rounded-full h-2">
                <div
                  className="bg-neon-blue h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="document" className="space-y-4 mt-4">
          <div>
            <Label htmlFor="documentFile" className="text-white">Document File (Max 10 MB)</Label>
            <Input
              id="documentFile"
              ref={documentInputRef}
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleDocumentUpload}
              className="glass-input mt-1"
              disabled={isUploading}
            />
          </div>
          {isUploading && uploadProgress > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-400">
                <span>Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full bg-luxury-dark/50 rounded-full h-2">
                <div
                  className="bg-neon-blue h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="live" className="space-y-4 mt-4">
          <div>
            <Label htmlFor="liveEmbedUrl" className="text-white">External Website URL</Label>
            <Input
              id="liveEmbedUrl"
              value={liveEmbedUrl}
              onChange={(e) => setLiveEmbedUrl(e.target.value)}
              placeholder="https://example.com"
              className="glass-input mt-1"
              disabled={isUploading}
            />
          </div>
          <Button
            onClick={handleLiveEmbedSubmit}
            disabled={isUploading || !title.trim() || !liveEmbedUrl.trim()}
            className="w-full bg-neon-blue/20 text-neon-blue hover:bg-neon-blue/30"
          >
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding...
              </>
            ) : (
              <>
                <Globe className="mr-2 h-4 w-4" />
                Add Live Embed
              </>
            )}
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  );
}

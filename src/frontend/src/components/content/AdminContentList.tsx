import { Film, FileText, Link as LinkIcon, Globe, Trash2, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import { formatFileSize } from '../../utils/fileValidation';
import { useSetContentStatus, useDeleteContent } from '../../hooks/useQueries';
import type { ContentItem } from '../../backend';
import { useState } from 'react';

interface AdminContentListProps {
  items: ContentItem[];
}

export default function AdminContentList({ items }: AdminContentListProps) {
  const setStatusMutation = useSetContentStatus();
  const deleteMutation = useDeleteContent();
  const [deleteConfirmations, setDeleteConfirmations] = useState<Record<string, boolean>>({});

  const handleToggleStatus = async (id: bigint, currentStatus: boolean) => {
    try {
      await setStatusMutation.mutateAsync({ contentId: id, enabled: !currentStatus });
    } catch (error) {
      console.error('Failed to toggle status:', error);
    }
  };

  const handleDelete = async (id: bigint) => {
    const idStr = id.toString();
    if (!deleteConfirmations[idStr]) {
      setDeleteConfirmations((prev) => ({ ...prev, [idStr]: true }));
      setTimeout(() => {
        setDeleteConfirmations((prev) => {
          const next = { ...prev };
          delete next[idStr];
          return next;
        });
      }, 3000);
      return;
    }

    try {
      await deleteMutation.mutateAsync(id);
      setDeleteConfirmations((prev) => {
        const next = { ...prev };
        delete next[idStr];
        return next;
      });
    } catch (error) {
      console.error('Failed to delete content:', error);
    }
  };

  const getContentTypeInfo = (item: ContentItem) => {
    switch (item.contentType.__kind__) {
      case 'videoLink':
        return { icon: LinkIcon, label: 'Drive Video', color: 'text-blue-400' };
      case 'videoFile':
        return { icon: Film, label: 'Uploaded Video', color: 'text-purple-400' };
      case 'document':
        return { icon: FileText, label: 'Document', color: 'text-green-400' };
      case 'liveEmbed':
        return { icon: Globe, label: 'Live Embed', color: 'text-orange-400' };
      default:
        return { icon: FileText, label: 'Unknown', color: 'text-gray-400' };
    }
  };

  if (items.length === 0) {
    return (
      <div className="glass-panel rounded-2xl border border-white/10 p-12 backdrop-blur-xl text-center">
        <FileText className="mx-auto h-16 w-16 text-gray-500 mb-4" />
        <p className="text-xl text-gray-400">No content items yet</p>
        <p className="text-sm text-gray-500 mt-2">Add content using the form above</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Desktop Table View */}
      <div className="hidden lg:block glass-panel rounded-2xl border border-white/10 backdrop-blur-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-luxury-dark/50 border-b border-white/10">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Title</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Type</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Size</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Created</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Enabled</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {items.map((item) => {
                const typeInfo = getContentTypeInfo(item);
                const TypeIcon = typeInfo.icon;
                const idStr = item.id.toString();
                const isDeleting = deleteMutation.isPending;
                const isConfirmingDelete = deleteConfirmations[idStr];

                let sizeDisplay = '-';
                if (item.contentType.__kind__ === 'videoFile') {
                  // Size would need to be stored separately or calculated
                  sizeDisplay = 'Video';
                } else if (item.contentType.__kind__ === 'document') {
                  sizeDisplay = 'Doc';
                }

                return (
                  <tr key={idStr} className="hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3 text-white">{item.title}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <TypeIcon className={`h-4 w-4 ${typeInfo.color}`} />
                        <span className="text-sm text-gray-400">{typeInfo.label}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-400">{sizeDisplay}</td>
                    <td className="px-4 py-3 text-sm text-gray-400">
                      {new Date(Number(item.createdAt)).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      {item.status.deleted ? (
                        <span className="text-xs px-2 py-1 rounded-full bg-red-500/20 text-red-400">
                          Deleted
                        </span>
                      ) : item.status.enabled ? (
                        <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400">
                          Enabled
                        </span>
                      ) : (
                        <span className="text-xs px-2 py-1 rounded-full bg-gray-500/20 text-gray-400">
                          Disabled
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <Switch
                        checked={item.status.enabled}
                        onCheckedChange={() => handleToggleStatus(item.id, item.status.enabled)}
                        disabled={setStatusMutation.isPending || item.status.deleted}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(item.id)}
                        disabled={isDeleting || item.status.deleted}
                        className={`${
                          isConfirmingDelete
                            ? 'text-red-400 hover:text-red-300'
                            : 'text-gray-400 hover:text-red-400'
                        }`}
                      >
                        {isDeleting ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <>
                            <Trash2 className="h-4 w-4 mr-1" />
                            {isConfirmingDelete ? 'Confirm?' : 'Delete'}
                          </>
                        )}
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {items.map((item) => {
          const typeInfo = getContentTypeInfo(item);
          const TypeIcon = typeInfo.icon;
          const idStr = item.id.toString();
          const isDeleting = deleteMutation.isPending;
          const isConfirmingDelete = deleteConfirmations[idStr];

          return (
            <div
              key={idStr}
              className="glass-panel rounded-2xl border border-white/10 p-4 backdrop-blur-xl"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <TypeIcon className={`h-5 w-5 ${typeInfo.color} flex-shrink-0`} />
                  <div className="min-w-0 flex-1">
                    <h4 className="text-white font-semibold truncate">{item.title}</h4>
                    <p className="text-xs text-gray-400">{typeInfo.label}</p>
                  </div>
                </div>
                {item.status.deleted ? (
                  <span className="text-xs px-2 py-1 rounded-full bg-red-500/20 text-red-400 flex-shrink-0">
                    Deleted
                  </span>
                ) : item.status.enabled ? (
                  <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400 flex-shrink-0">
                    Enabled
                  </span>
                ) : (
                  <span className="text-xs px-2 py-1 rounded-full bg-gray-500/20 text-gray-400 flex-shrink-0">
                    Disabled
                  </span>
                )}
              </div>

              <div className="text-xs text-gray-400 mb-3">
                Created: {new Date(Number(item.createdAt)).toLocaleDateString()}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400">Enabled:</span>
                  <Switch
                    checked={item.status.enabled}
                    onCheckedChange={() => handleToggleStatus(item.id, item.status.enabled)}
                    disabled={setStatusMutation.isPending || item.status.deleted}
                  />
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(item.id)}
                  disabled={isDeleting || item.status.deleted}
                  className={`${
                    isConfirmingDelete
                      ? 'text-red-400 hover:text-red-300'
                      : 'text-gray-400 hover:text-red-400'
                  }`}
                >
                  {isDeleting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <Trash2 className="h-4 w-4 mr-1" />
                      {isConfirmingDelete ? 'Confirm?' : 'Delete'}
                    </>
                  )}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

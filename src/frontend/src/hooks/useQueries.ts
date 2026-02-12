import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { ContentItem, ContentType } from '../backend';

export function useGetContentItems() {
  const { actor, isFetching } = useActor();

  return useQuery<ContentItem[]>({
    queryKey: ['contentItems'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getContentItems();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAdminGetAllContent() {
  const { actor, isFetching } = useActor();

  return useQuery<ContentItem[]>({
    queryKey: ['adminContentItems'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.adminGetAllContent();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddContent() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      title,
      description,
      contentType,
      isEnabled,
    }: {
      title: string;
      description: string;
      contentType: ContentType;
      isEnabled: boolean;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addContent(title, description, contentType, isEnabled);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contentItems'] });
      queryClient.invalidateQueries({ queryKey: ['adminContentItems'] });
    },
  });
}

export function useSetContentStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ contentId, enabled }: { contentId: bigint; enabled: boolean }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.setContentStatus(contentId, enabled);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contentItems'] });
      queryClient.invalidateQueries({ queryKey: ['adminContentItems'] });
    },
  });
}

export function useDeleteContent() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (contentId: bigint) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deleteContent(contentId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contentItems'] });
      queryClient.invalidateQueries({ queryKey: ['adminContentItems'] });
    },
  });
}

export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['isAdmin'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

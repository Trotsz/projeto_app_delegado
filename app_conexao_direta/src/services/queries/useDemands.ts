import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Platform } from 'react-native';
import api from '../api';

interface Demand {
  id: number;
  title: string;
  description?: string | null;
  category?: string | null;
  imageUrl?: string | null;
  status: 'PENDING' | 'ONGOING' | 'SOLVED';
  approved: boolean;
  authorId: string;
  author: { id: string; name: string; email: string };
}

interface CreateDemandData {
  title: string;
  description?: string;
  category?: string;
  image?: { uri: string; type: string; name: string } | null;
}

export function useDemands(category?: string, authorId?: string) {
  return useQuery<Demand[]>({
    queryKey: ['demands', category, authorId],
    queryFn: async () => {
      const params: Record<string, string> = {};
      if (category && category !== 'all') params.category = category;
      if (authorId) params.authorId = authorId;
      const { data } = await api.get('/demand', {
        params: Object.keys(params).length ? params : undefined,
      });
      return data;
    },
  });
}

export function useCreateDemand() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (demand: CreateDemandData) => {
      const formData = new FormData();
      formData.append('title', demand.title);
      if (demand.description) formData.append('description', demand.description);
      if (demand.category) formData.append('category', demand.category);
      if (demand.image) {
        if (Platform.OS === 'web') {
          const response = await fetch(demand.image.uri);
          const blob = await response.blob();
          formData.append('image', blob, demand.image.name);
        } else {
          formData.append('image', demand.image as unknown as Blob);
        }
      }
      const { data } = await api.post('/demand/create', formData);
      return data as Demand;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['demands'] });
    },
  });
}

export function useDemandById(id: number) {
  return useQuery<Demand>({
    queryKey: ['demands', id],
    queryFn: async () => {
      const { data } = await api.get(`/demand/${id}`);
      return data;
    },
    enabled: !!id,
  });
}

export function useDeleteDemand() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/demand/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['demands'] });
    },
  });
}

export function useCompleteDemand() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await api.patch(`/demand/${id}/complete`);
      return data as Demand;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['demands'] });
    },
  });
}

export function useApproveDemand() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await api.patch(`/demand/${id}/approve`);
      return data as Demand;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['demands'] });
    },
  });
}

export function useDisapproveDemand() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/demand/${id}/disapprove`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['demands'] });
    },
  });
}

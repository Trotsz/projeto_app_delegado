import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api';

interface Demand {
  id: number;
  title: string;
  description?: string | null;
  category?: string | null;
  status: 'SOLVED' | 'ONGOING';
  approved: boolean;
  authorId: string;
  author: { id: string; name: string; email: string };
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
    mutationFn: async (demand: { title: string; description?: string; category?: string }) => {
      const { data } = await api.post('/demand/create', demand);
      return data as Demand;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['demands'] });
    },
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

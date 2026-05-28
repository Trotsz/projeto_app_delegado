import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api';

interface Demand {
  id: number;
  title: string;
  description?: string | null;
  status: 'SOLVED' | 'ONGOING';
  approved: boolean;
  authorId: string;
  author: { id: string; name: string; email: string };
}

export function useDemands() {
  return useQuery<Demand[]>({
    queryKey: ['demands'],
    queryFn: async () => {
      const { data } = await api.get('/demand');
      return data;
    },
  });
}

export function useCreateDemand() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (demand: { title: string; description?: string }) => {
      const { data } = await api.post('/demand/create', demand);
      return data as Demand;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['demands'] });
    },
  });
}

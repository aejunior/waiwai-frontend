import { useQuery } from '@tanstack/react-query';
import AxiosClient from '@/services/AxiosClient';

interface Word {
  id: number;
  word: string;
  phonemic: string;
  created_at: string;
  updated_at: string;
  categories: {
    id: number;
    category: string;
    description: string;
  }[];
  meanings: {
    id: number;
    meaning_pt: string;
    meaning_ww: string;
    comment_pt: string;
    comment_ww: string;
    created_at: string;
    updated_at: string;
    word_id: number;
    reference_id: number;
    user_id: number;
  }[];
  user_id: number;
}

export const useGetWords = (page: number, pageSize: number) => {
  const axios = AxiosClient();

  return useQuery({
    queryKey: ['words', page, pageSize],
    queryFn: () =>
      axios
        .get(`/words`, {
          params: { page, page_size: pageSize },
          headers: { accept: 'application/json' },
        })
        .then((res) => res.data as Word[]),
  });
};

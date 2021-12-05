import { client } from '@/utils/microcms-client';
import { Content } from '@/types/content';

type Articles = {
  contents: Content[];
  totalCount: number;
  offset: number;
  limit: number;
};

/**
 * 記事一覧を表示するために必要な情報を取得
 */
export const fetchArticlesPage = async (offset: number, limit: number) => {
  const data = await client.get<Articles>({
    endpoint: 'blogs',
    queries: {
      offset,
      limit,
    },
  });

  return data;
};

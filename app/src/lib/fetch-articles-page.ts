import { client } from '@/utils/microcms-client';
import { config } from '@/config/app';
import { Content } from '@/types/content';

type Articles = {
  contents: Content[];
  totalCount: number;
  offset: number;
  limit: number;
};

/**
 * 記事一覧を表示するために必要な情報を取得
 * @param offset 何件目から取得するかの指定
 * @param limit 取得件数
 * @param filters? 取得条件の指定
 */
export const fetchArticlesPage = async (offset: number, limit: number, filters?: string) => {
  const { endpoint } = config.siteInfo;

  const data = await client.get<Articles>({
    endpoint: endpoint.blogs,
    queries: {
      offset,
      limit,
      filters,
    },
  });

  return data;
};

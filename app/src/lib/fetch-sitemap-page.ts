import { client } from '@/utils/microcms-client';
import { config } from '@/config/app';
import { Sitemap } from '@/types/sitemap';

type SitemapData = {
  contents: Sitemap[];
  totalcount: number;
  offset: number;
  limit: number;
};

/**
 * サイトマップを生成するために必要な情報を取得
 */
export const fetchSitemapPage = async () => {
  const { endpoint } = config.siteInfo;

  const data = await client.get<SitemapData>({
    endpoint: endpoint.category,
    queries: {
      fields: 'id,name,posts.id,posts.createdAt,posts.title',
      limit: 9999,
    },
  });

  const contents: Sitemap[] = data.contents;

  return contents;
};

import { config } from '@/config/app';
import { Sitemap } from '@/types/sitemap';
import { client } from '@/utils/microcms-client';

type Posts = {
  contents: Sitemap[];
};

const { endpoint } = config.siteInfo;

/**
 * HTMLサイトマップを生成するために必要な情報を取得
 */
export const htmlSitemap = async () => {
  const data = await client.get<Posts>({
    endpoint: endpoint.category,
    queries: {
      fields: 'id,name,posts.id,posts.title',
      limit: 9999,
    },
  });

  const { contents } = data;

  return contents;
};

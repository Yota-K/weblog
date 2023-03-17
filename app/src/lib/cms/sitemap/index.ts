import { config } from '@/config/app';
import { client } from '@/utils/microcms-client';
import { Sitemap } from './type';

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
      fields: 'id,name,posts.id,posts.createdAt,posts.title',
      limit: 9999,
    },
  });

  const { contents } = data;

  return contents;
};

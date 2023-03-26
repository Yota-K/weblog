import { config } from '@/config/app';
import { client } from '@/lib/cms/client';
import { Data } from './type';

const { endpoint } = config.siteInfo;

/**
 * HTMLサイトマップを生成するために必要な情報を取得
 */
export const htmlSitemap = async () => {
  const data = await client.get<Data>({
    endpoint: endpoint.category,
    queries: {
      fields: 'id,name,posts.id,posts.createdAt,posts.title',
      limit: 9999,
    },
  });

  const { contents } = data;

  return contents;
};

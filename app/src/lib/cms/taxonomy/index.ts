import { client } from '@/utils/microcms-client';
import { Contents } from './type';

type EndpointType = 'category' | 'tags';

/**
 * カテゴリーページ・タグページを表示するために必要な情報を取得
 * @param endpoint APIのエンドポイント
 * @param fields コンテンツの中で取得する要素を指定
 */
export const getTaxonomies = async (endpoint: EndpointType, fields: string) => {
  const data = await client.get<Contents>({
    endpoint,
    queries: {
      fields,
      depth: 1,
      limit: 9999,
    },
  });

  return data;
};

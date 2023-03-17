import { config } from '@/config/app';
import { client } from '@/utils/microcms-client';
import { Common } from '@/types/common';
import { Content } from './type';

type Paths = {
  contents: Pick<Content, 'id'>[];
} & Common;
type Posts = {
  contents: Content[];
} & Common;

const { endpoint } = config.siteInfo;

/**
 * 特定の投稿を取得
 */
const findPost = () => {
  /**
   * 記事ページを生成するために必要なパスの配列を生成
   */
  const paths = async () => {
    const data = await client.get<Paths>({
      endpoint: endpoint.blogs,
      queries: {
        fields: 'id',
        limit: 9999,
      },
    });

    return data;
  };

  /**
   * 記事ページを生成するために必要なデータを取得
   * @param contentId 記事ページのスラッグ
   */
  const post = async (contentId: string) => {
    const data = await client.get<Content>({
      endpoint: endpoint.blogs,
      contentId,
    });

    return data;
  };

  return {
    paths,
    post,
  };
};

/**
 * 記事一覧を表示するために必要な情報を取得
 * @param offset 何件目から取得するかの指定
 * @param limit 取得件数
 * @param filters? 取得条件の指定
 */
const getPosts = async (offset: number, limit: number, filters?: string) => {
  const data = await client.get<Posts>({
    endpoint: endpoint.blogs,
    queries: {
      offset,
      limit,
      filters,
    },
  });

  return data;
};

export { findPost, getPosts };

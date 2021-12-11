import { client } from '@/utils/microcms-client';
import { config } from '@/config/app';
import { Content } from '@/types/content';

type BlogPaths = {
  contents: Pick<Content, 'id'>[];
  totalCount: number;
  offset: number;
  limit: number;
};

export const fetchBlogPage = () => {
  const { endpoint } = config.siteInfo;

  /**
   * 記事ページを生成するために必要なパスの配列を生成
   */
  const blogPathsData = async () => {
    const data = await client.get<BlogPaths>({
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
  const blogData = async (contentId: string) => {
    const data = await client.get<Content>({
      endpoint: endpoint.blogs,
      contentId,
    });

    return data;
  };

  /**
   * 下書き中の投稿データを取得
   * @param contentId 記事ページのスラッグ
   * @param draftKey draftKey
   */
  const draftBlogData = async (contentId: string, draftKey: string) => {
    const data = await client.get<Content>({
      endpoint: endpoint.blogs,
      contentId,
      queries: {
        draftKey,
      },
    });

    return data;
  };

  return {
    blogPathsData,
    blogData,
    draftBlogData,
  };
};

import { client } from '@/utils/microcms-client';
import { Content } from '@/types/content';

type BlogPaths = {
  contents: Pick<Content, 'id'>[];
  totalcount: number;
  offset: number;
  limit: number;
};

export const fetchBlogPage = () => {
  /**
   * 記事ページを生成するために必要なパスの配列を生成
   */
  const blogPaths = async () => {
    const data = await client.get<BlogPaths>({
      endpoint: 'blogs',
      queries: { limit: 9999, fields: 'id' },
    });

    const paths = data.contents.map((post) => `/blogs/${post.id}`);

    return paths;
  };

  /**
   * 記事ページを生成するために必要なデータを取得
   * @param contentId 記事ページのスラッグ
   */
  const blogData = async (contentId: string) => {
    const data = await client.get<Content>({
      endpoint: 'blogs',
      contentId,
    });

    return data;
  };

  return {
    blogPaths,
    blogData,
  };
};

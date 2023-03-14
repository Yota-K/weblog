import { GetServerSideProps } from 'next';
import { fetchBlogPage } from '@/lib/fetch-blog-page';
import { parseHtml } from '@/utils/parse-html';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id, draftKey } = context.query;

  // 編集中の記事URLとdraftKeyが設定されていない場合を考慮
  if (id === undefined || draftKey === undefined) {
    return {
      notFound: true,
    };
  }

  const { draftBlogData } = fetchBlogPage();
  const blog = await draftBlogData(id as string, draftKey as string);

  const { toc, body } = parseHtml(blog);

  return {
    props: {
      blog,
      toc,
      body,
      draftKey,
    },
  };
};

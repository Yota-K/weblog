import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { findDraftPost } from '@/lib/cms/blog/index';
import { parseHtml } from '@/utils/parse-html';

export type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const { id, draftKey } = context.query;

  // 編集中の記事URLとdraftKeyが設定されていない場合を考慮
  if (id === undefined || draftKey === undefined) {
    return {
      notFound: true,
    };
  }

  if (typeof draftKey !== 'string') throw new Error('Wrong type of draftKey');

  const blog = await findDraftPost(id as string, draftKey as string);
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

import { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { findPost } from '@/lib/cms/blog/index';
import { parseHtml } from '@/utils/parse-html';

export type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticPaths: GetStaticPaths = async () => {
  const { paths } = findPost();
  const data = await paths();

  return { paths: data.contents.map((post) => `/blogs/${post.id}`), fallback: false };
};

export const getStaticProps = async (context: GetStaticPropsContext<{ id: string }>) => {
  const id = context.params?.id;

  if (!id) throw Error('undefined id');

  const { post } = findPost();
  const data = await post(id);
  const { toc, body } = parseHtml(data);

  return {
    props: {
      blog: data,
      toc,
      body,
    },
  };
};

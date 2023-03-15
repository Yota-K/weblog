import { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { fetchBlogPage } from '@/lib/fetch-blog-page';
import { parseHtml } from '@/utils/parse-html';

export type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticPaths: GetStaticPaths = async () => {
  const { blogPathsData } = fetchBlogPage();
  const data = await blogPathsData();

  const paths = data.contents.map((post) => `/blogs/${post.id}`);

  return { paths, fallback: false };
};

export const getStaticProps = async (context: GetStaticPropsContext<{ id: string }>) => {
  const id = context.params?.id;

  if (!id) throw Error('undefined id');

  const { blogData } = fetchBlogPage();
  const blog = await blogData(id);
  const { toc, body } = parseHtml(blog);

  return {
    props: {
      blog,
      toc,
      body,
    },
  };
};

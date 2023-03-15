import { GetStaticPaths, GetStaticProps } from 'next';
import { fetchBlogPage } from '@/lib/fetch-blog-page';
import { parseHtml } from '@/utils/parse-html';

export const getStaticPaths: GetStaticPaths = async () => {
  const { blogPathsData } = fetchBlogPage();
  const data = await blogPathsData();

  const paths = data.contents.map((post) => `/blogs/${post.id}`);

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context?.params?.id as string;

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

import { InferGetStaticPropsType } from 'next';
import { htmlSitemap } from '@/lib/cms//sitemap/index';

export type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticProps = async () => {
  const data = await htmlSitemap();

  data.map((blog) => {
    blog.posts.sort((a, b) => {
      return a.createdAt < b.createdAt ? 1 : -1;
    });
  });

  return {
    props: {
      contents: data,
    },
  };
};

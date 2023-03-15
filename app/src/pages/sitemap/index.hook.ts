import { InferGetStaticPropsType } from 'next';
import { fetchSitemapPage } from '@/lib/fetch-sitemap-page';

export type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticProps = async () => {
  const contents = await fetchSitemapPage();

  contents.map((blog) => {
    blog.posts.sort((a, b) => {
      return a.createdAt < b.createdAt ? 1 : -1;
    });
  });

  return {
    props: {
      contents,
    },
  };
};

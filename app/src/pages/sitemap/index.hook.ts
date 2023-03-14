import { GetStaticProps } from 'next';
import { fetchSitemapPage } from '@/lib/fetch-sitemap-page';

export const getStaticProps: GetStaticProps = async () => {
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

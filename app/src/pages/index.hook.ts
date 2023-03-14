import { GetStaticProps } from 'next';
import { config } from '@/config/app';
import { fetchArticlesPage } from '@/lib/fetch-articles-page';

export const getStaticProps: GetStaticProps = async () => {
  const data = await fetchArticlesPage(0, config.paginateNum);
  const { contents, totalCount } = data;

  return {
    props: {
      contents,
      totalCount,
    },
  };
};

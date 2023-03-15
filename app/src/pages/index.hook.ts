import { InferGetStaticPropsType } from 'next';
import { config } from '@/config/app';
import { fetchArticlesPage } from '@/lib/fetch-articles-page';

export type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticProps = async () => {
  const data = await fetchArticlesPage(0, config.paginateNum);
  const { contents, totalCount } = data;

  return {
    props: {
      contents,
      totalCount,
    },
  };
};

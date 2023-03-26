import { InferGetStaticPropsType } from 'next';
import { config } from '@/config/app';
import { getPosts } from '@/lib/cms/blog/index';

export type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticProps = async () => {
  const data = await getPosts(0, config.paginateNum);
  const { contents, totalCount } = data;

  return {
    props: {
      contents,
      totalCount,
    },
  };
};

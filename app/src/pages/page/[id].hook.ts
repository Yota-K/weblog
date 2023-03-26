import { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { config } from '@/config/app';
import { findPost, getPosts } from '@/lib/cms/blog/index';

const { paginateNum } = config;

export type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticPaths: GetStaticPaths = async () => {
  const { paths } = findPost();
  const data = await paths();

  let totalCount = data.totalCount;
  totalCount = Math.ceil(totalCount / paginateNum);

  const paginate = (totalCount: number) => {
    return [...new Array(totalCount).keys()].map((i) => ++i);
  };

  const paginatePaths = paginate(totalCount).map((pageNum) => `/page/${pageNum}`);

  return { paths: paginatePaths, fallback: false };
};

export const getStaticProps = async (context: GetStaticPropsContext<{ id: string }>) => {
  const id = context.params?.id;

  if (!id) throw Error('undefined id');

  const offset = parseInt(id) * paginateNum - paginateNum;
  const data = await getPosts(offset, paginateNum);
  const { contents, totalCount } = data;

  return {
    props: {
      contents,
      totalCount,
    },
  };
};

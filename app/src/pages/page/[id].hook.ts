import { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { config } from '@/config/app';
import { fetchArticlesPage } from '@/lib/fetch-articles-page';
import { fetchBlogPage } from '@/lib/fetch-blog-page';

const { paginateNum } = config;

export type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticPaths: GetStaticPaths = async () => {
  const { blogPathsData } = fetchBlogPage();
  const data = await blogPathsData();

  let totalCount = data.totalCount;
  totalCount = Math.ceil(totalCount / paginateNum);

  const paginate = (totalCount: number) => {
    return [...new Array(totalCount).keys()].map((i) => ++i);
  };

  const paths = paginate(totalCount).map((pageNum) => `/page/${pageNum}`);

  return { paths, fallback: false };
};

export const getStaticProps = async (context: GetStaticPropsContext<{ id: string }>) => {
  const id = context.params?.id;

  if (!id) throw Error('undefined id');

  const offset = parseInt(id) * paginateNum - paginateNum;
  const data = await fetchArticlesPage(offset, paginateNum);
  const { contents, totalCount } = data;

  return {
    props: {
      contents,
      totalCount,
    },
  };
};

import { GetStaticPaths, GetStaticProps } from 'next';
import { config } from '@/config/app';
import { fetchArticlesPage } from '@/lib/fetch-articles-page';
import { fetchBlogPage } from '@/lib/fetch-blog-page';

const { paginateNum } = config;

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

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context?.params?.id as string;
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

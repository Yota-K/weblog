import { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { config } from '@/config/app';
import { getPosts } from '@/lib/cms/blog/index';
import { getTaxonomies } from '@/lib/cms/taxonomy/index';
import { generateBuildPaginatePath } from '@/lib/cms/generateBuildPaginatePath';

export type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await getTaxonomies('category', 'id,posts.id');
  const results = generateBuildPaginatePath(data.contents);

  const paths = results.map((path) => ({
    params: {
      slug: path.params.slug,
      id: path.params.id.toString(),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (
  context: GetStaticPropsContext<{
    slug: string;
    id?: string;
  }>
) => {
  const slug = context.params?.slug;
  // ページネーションの1ページ目の時は、/back-endのようにページネーションの数字を省いた状態でアクセスできる
  // 上記のような場合だとundefinedになるので、1をセットして、undefinedを回避する
  const id = context.params?.id || '1';

  const { paginateNum } = config;
  const offset = parseInt(id) * paginateNum - paginateNum;

  const data = await getPosts(offset, paginateNum, `category_field[equals]${slug}`);

  const { contents, totalCount } = data;
  const categoryName = contents[0].category_field.name;
  const categorySlug = contents[0].category_field.id;

  return {
    props: {
      contents,
      categoryName,
      categorySlug,
      totalCount,
    },
  };
};

import { GetStaticPaths, GetStaticProps } from 'next';
import { config } from '@/config/app';
import { fetchArticlesPage } from '@/lib/fetch-articles-page';
import { fetchTaxonomyPage } from '@/lib/fetch-taxonomy-page';
import { TaxonomyIdsAndRelatedPosts } from '@/types/taxonomy';
import { generateBuildPaginatePath } from '@/utils/generate-build-paginate-path';

// TODO: あとでリファクタする。
// ページネーション周りの挙動が怪しい。
// タグページとかも同じ現象起きてる
export const getStaticPaths: GetStaticPaths = async () => {
  const data = await fetchTaxonomyPage<TaxonomyIdsAndRelatedPosts>('category', 'id,posts.id');
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

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context?.params?.slug;
  const id = context?.params?.id as string;

  const { paginateNum } = config;
  // /back-endみたいな感じでアクセスすると、offsetがNaNになってしまう
  const offset = parseInt(id) * paginateNum - paginateNum;

  const data = await fetchArticlesPage(offset, paginateNum, `category_field[equals]${slug}`);

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

import { GetStaticPaths, GetStaticProps } from 'next';
import { config } from '@/config/app';
import { fetchArticlesPage } from '@/lib/fetch-articles-page';
import { fetchTaxonomyPage } from '@/lib/fetch-taxonomy-page';
import { TaxonomyIdsAndRelatedPosts } from '@/types/taxonomy';
import { generateBuildPaginatePath } from '@/utils/generate-build-paginate-path';

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await fetchTaxonomyPage<TaxonomyIdsAndRelatedPosts>('tags', 'id,posts.id');
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
  const offset = parseInt(id) * paginateNum - paginateNum;

  const data = await fetchArticlesPage(offset, paginateNum, `tag_field[contains]${slug}`);
  const { contents, totalCount } = data;

  // ページに一致するタグを探す
  const findTag = contents[0].tag_field.find((tag) => tag.id === slug);
  const tagName = findTag?.name;
  const tagSlug = findTag?.id;

  return {
    props: {
      contents,
      tagName,
      tagSlug,
      totalCount,
    },
  };
};

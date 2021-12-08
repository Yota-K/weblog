import { client } from '@/utils/microcms-client';

type TaxonomyType = 'category' | 'tags';

// * category
//   * index.tsx /category?fields=id&limit=9999
//   * [id].tsx /category?depth=1&fields=id,posts.id&limit=9999
// * tags
//   * index.tsx /tags?fields=id&limit=9999
//   * [id].tsx /tags?depth=1&fields=id,posts.id&limit=9999

export const fetchTaxonomiesData = async <T>(endpoint: TaxonomyType, fields: string) => {
  const data = await client.get<T>({
    endpoint,
    queries: {
      fields,
      depth: 1,
      limit: 9999,
    },
  });

  return data;
};

// const { taxonomyData } = fetchTaxonomiesPage();
//
// const hoge = async () => {
//   const hogee = await taxonomyData<{id: string}>('category', 'id');
// }

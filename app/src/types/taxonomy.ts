// カテゴリーページとタグページのビルドを行う際に使用する型定義
export type BuildTaxonomyPaginateList = {
  id: string;
  posts: {
    id: string;
  }[];
};

export type TaxonomyIdsAndRelatedPosts = {
  contents: BuildTaxonomyPaginateList[];
  totalCount: number;
  offset: number;
  limit: number;
};

// カテゴリーとタグの型定義
export type Taxonomy = BuildTaxonomyPaginateList & {
  createdAt: string;
  updatedAt: string;
  name: string;
};

// クライアントサイドでのデータフェッチに使用
export type CategoriesAndTags = {
  categories: Taxonomy[];
  tags: Taxonomy[];
};

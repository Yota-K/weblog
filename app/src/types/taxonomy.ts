// カテゴリーページとタグページのビルドを行う際に使用する型定義
export type BuildTaxonomyPaginateList = {
  id: string;
  posts: {
    id: string;
  }[];
};

// カテゴリーとタグの型定義
export type Taxonomy = BuildTaxonomyPaginateList & {
  createdAt: string;
  updatedAt: string;
  name: string;
};

export type CategoriesAndTags = {
  categories: Taxonomy[];
  tags: Taxonomy[];
};

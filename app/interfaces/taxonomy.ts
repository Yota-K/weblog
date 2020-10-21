// カテゴリーページとタグページのビルドを行う際に使用する型定義
export interface BuildTaxonomyPaginateList {
  id: string;
  posts: {
    id: string;
  }[];
}

// カテゴリーとタグの型定義
export interface Taxonomy extends BuildTaxonomyPaginateList {
  createdAt: string;
  updatedAt: string;
  name: string;
}

export interface CategoriesAndTags {
  categories: Taxonomy[];
  tags: Taxonomy[];
}

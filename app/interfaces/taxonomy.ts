// カテゴリーとタグの型定義
export interface Taxonomy {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  posts: {
    id: string;
  }[];
}

export interface CategoriesAndTags {
  categories: Taxonomy[];
  tags: Taxonomy[];
}

// カテゴリーページとタグページのビルドを行う際に使用する型定義
// MEMO: カテゴリーとタグの型定義とほぼ一緒
// ?をつけて必須プロパティじゃなくすることもできるけど、、、
// ありなのか。。。
export interface BuildTaxonomyPaginateList {
  id: string;
  posts: {
    id: string;
  }[];
}

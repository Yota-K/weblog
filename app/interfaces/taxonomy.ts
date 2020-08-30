// タグページ
export interface TagJson {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  posts: {
    id: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    thumbnail: {
      url: string;
    };
    body: string;
    description: string;
    tag_field: {
      id: string;
      createdAt: string;
      updatedAt: string;
      name: string;
      posts: {
        id: string;
      }[];
    }[];
    category_field: {
      id: string;
      createdAt: string;
      updatedAt: string;
      name: string;
      posts: {
        id: string;
      }[];
    };
  }[];
}

// カテゴリーページ
export type CategoryJson = TagJson;

// カテゴリーとタグ一覧
export interface TaxonomyJson {
  id: string;
  createdAt: string;
  updatedAt: string;
  tags: {
    id: string;
    createdAt: string;
    updatedAt: string;
    name: string;
    posts: {
      id: string;
    }[];
  }[];
  categories: {
    id: string;
    createdAt: string;
    updatedAt: string;
    name: string;
    posts: {
      id: string;
    }[];
  }[];
}

// カテゴリーとタグ、個別のコンポーネントで使用する型定義
export interface TaxonomyList {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  posts: {
    id: string;
  }[];
}

export interface Taxonomy {
  tags: TaxonomyList[];
  categories: TaxonomyList[];
}

// カテゴリーページとタグページのビルドを行う際に使用する型定義
export interface TaxonomyAry {
  id: string;
  posts: {
    id: string;
  }[];
}

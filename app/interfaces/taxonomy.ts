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
        },
        body: string;
        description: string;
        tag_field: {
            fieldId: string;
            tags: {
                id: string;
                createdAt: string;
                updatedAt: string;
                name: string;
                posts: {
                    id: string;
                }[];
            }[];
        }[];
    }[];
}

// カテゴリーページ
export interface CategoryJson extends TagJson {};

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
        posts: {
            id: string;
        }[];
    }[];
}

// 個別のコンポーネントで使用する型定義
export interface TaxonomyList {
    id: string;
    createdAt: string;
    updatedAt: string;
    name: string;
    posts: {
        id: string;
    }[];
}

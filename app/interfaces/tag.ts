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

// タグ一覧
export interface Tags {
    id: string;
    createdAt: string;
    updatedAt: string;
    name: string;
    posts: {
        id: string;
    }[];
}

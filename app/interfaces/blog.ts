export interface BlogJson {
    blogs: Content;
    totalCount: number;
}

export interface Content {
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
}

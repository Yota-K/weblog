export interface BlogJson {
    id: string;
    createdAt: string;
    updatedAt: string;
    title: string;
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
}

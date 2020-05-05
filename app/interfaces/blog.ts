export interface BlogJson {
    id: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    body: string;
    description: string;
    tags: {
        id: string;
        createdAt: string;
        updatedAt: string;
        name: string;
    }[];
}

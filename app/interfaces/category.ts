import { TagJson } from './tag';

export interface CategoryJson extends TagJson {};

export interface Categories {
    id: string;
    createdAt: string;
    updatedAt: string;
    posts: {
        id: string;
    }[];
}

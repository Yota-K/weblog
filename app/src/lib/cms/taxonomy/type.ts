import { Common } from '@/types/common';

export type Data = {
  contents: {
    id: string;
    name: string;
    posts: {
      id: string;
    }[];
  }[];
} & Common;

export type SidebarTaxonomies = {
  categories: Data['contents'];
  tags: Data['contents'];
};

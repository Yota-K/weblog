import { Common } from '@/types/common';

export type Sitemap = {
  id: string;
  name: string;
  posts: {
    id: string;
    title: string;
  }[];
} & Common;

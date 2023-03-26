import { Common } from '@/types/common';

export type Data = {
  contents: {
    id: string;
    name: string;
    posts: {
      id: string;
      title: string;
      createdAt: string;
    }[];
  }[];
} & Common;

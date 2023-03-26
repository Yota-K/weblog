import { Common } from '@/types/common';

export type Posts = {
  contents: {
    id: string;
    posts: {
      id: string;
    }[];
  }[];
} & Common;

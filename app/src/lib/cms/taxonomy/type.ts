import { Common } from '@/types/common';

export type Data = {
  contents: {
    id: string;
    posts: {
      id: string;
    }[];
  }[];
} & Common;

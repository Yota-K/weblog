import { Common, BaseCmsResponse } from '@/types/common';

type TaxonomyField = {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  posts: {
    id: string;
  }[];
};

type Content = BaseCmsResponse<{
  title: string;
  thumbnail: {
    url: string;
    height: number;
    width: number;
  };
  body: string;
  description: string;
  category_field: TaxonomyField;
  tag_field: TaxonomyField[];
}>;

type Paths = {
  contents: Pick<Content, 'id'>[];
} & Common;

type Posts = {
  contents: Content[];
} & Common;

export type Data = {
  paths: Paths;
  posts: Posts;
  content: Content;
};

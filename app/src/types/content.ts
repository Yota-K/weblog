export type TaxonomyField = {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  posts: {
    id: string;
  }[];
};

export type Content = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  revisedAt: string;
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
};

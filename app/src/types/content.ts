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
  category_field: {
    id: string;
    createdAt: string;
    updatedAt: string;
    name: string;
    posts: {
      id: string;
    }[];
  };
  tag_field: {
    id: string;
    createdAt: string;
    updatedAt: string;
    name: string;
    posts: {
      id: string;
    }[];
  }[];
};

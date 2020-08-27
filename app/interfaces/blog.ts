export interface BlogJson {
  blogs: Content;
  totalCount: number;
}

export interface Content {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  thumbnail: {
    url: string;
  };
  category: string;
  tags: string;
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
}

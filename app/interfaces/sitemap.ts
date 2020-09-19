export interface SitemapJson {
  id: string;
  name: string;
  posts: {
    id: string;
    createdAt: string;
    title: string;
  }[];
}

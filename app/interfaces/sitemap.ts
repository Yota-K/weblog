export interface Sitemap {
  id: string;
  name: string;
  posts: {
    id: string;
    createdAt: string;
    title: string;
  }[];
}

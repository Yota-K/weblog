export type Common = {
  totalCount: number;
  offset: number;
  limit: number;
};

export type BaseCmsResponse<T> = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
} & Common &
  T;

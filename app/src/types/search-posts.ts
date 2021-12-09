import { TaxonomyField, Content } from '@/types/content';

type PostIdAndTitle = Pick<Content, 'id' | 'title'>;
type TagName = Pick<TaxonomyField, 'name'>;

export type SearchJson = PostIdAndTitle & {
  tag_field: TagName[];
};

import { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';
import Layout from '@/components/Layout';
import Paginate from '@/components/Paginate';
import PostThumbnail from '@/components/PostThumbnail';
import Seo from '@/components/Seo';
import { config } from '@/config/app';
import { BlogCard, PostInfo } from '@/share/BlogCard';
import { CategoryLabel } from '@/share/CategoryLabel';
import { H3 } from '@/share/Heading';
import { TagArea } from '@/share/TagArea';
import { TagLabel } from '@/share/TagLabel';
import { TimeStamp } from '@/share/TimeStamp';
import { dateFormat } from '@/utils/date-format';
import { Props, getStaticPaths, getStaticProps } from './[id].hook';

const Page: NextPage<Props> = ({ contents, totalCount }) => {
  const { siteTitle } = config.siteInfo;

  const paginateType = 'page';

  return (
    <Layout>
      <Seo title={siteTitle} />
      {contents.map((content) => (
        <BlogCard key={content.id}>
          <PostThumbnail thumbnailUrl={content.thumbnail.url} width="308" height="173" />
          <PostInfo>
            <TimeStamp>
              <time itemProp="dateCreated" dateTime={`${dateFormat(content.createdAt)}`}>
                {dateFormat(content.createdAt)}
              </time>
            </TimeStamp>
            <H3>
              <Link href="/blogs/[id]" as={`/blogs/${content.id}`}>
                {content.title}
              </Link>
            </H3>
            <CategoryLabel>
              カテゴリー：
              <Link href="/category/[id]" as={`/category/${content.category_field.id}`}>
                {content.category_field.name}
              </Link>
            </CategoryLabel>
            <TagArea>
              {content.tag_field.map((tag) => (
                <TagLabel key={tag.id}>
                  <Link href="/tags/[id]" as={`/tags/${tag.id}`}>
                    {tag.name}
                  </Link>
                </TagLabel>
              ))}
            </TagArea>
          </PostInfo>
        </BlogCard>
      ))}
      <Paginate paginateType={paginateType} totalCount={totalCount} />
    </Layout>
  );
};

export default Page;

export { getStaticPaths, getStaticProps };

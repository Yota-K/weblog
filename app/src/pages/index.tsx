import { NextPage, GetStaticProps } from 'next';
import Link from 'next/link';
import React from 'react';

import { config } from '@/config/app';

import { Content } from '@/types/content';

import { dateFormat } from '@/utils/date-format';
import { getApiKey } from '@/utils/get-api-key';

import { BlogCard, PostInfo } from '@/share/BlogCard';
import { CategoryLabel } from '@/share/CategoryLabel';
import { H3 } from '@/share/Heading';
import { TagArea } from '@/share/TagArea';
import { TagLabel } from '@/share/TagLabel';
import { TimeStamp } from '@/share/TimeStamp';

import Seo from '@/components/Seo';
import Layout from '@/components/Layout';
import Paginate from '@/components/Paginate';
import PostThumbnail from '@/components/PostThumbnail';

type Props = {
  contents: Content[];
  totalCount: number;
}

const paginateNum = config.paginateNum;

const Home: NextPage<Props> = ({ contents, totalCount }) => {
  const { siteTitle } = config.siteInfo;

  const paginateType = 'page';

  return (
    <Layout>
      <Seo title={siteTitle} />
      <div id="blog-list">
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
                  <a>{content.title}</a>
                </Link>
              </H3>
              <CategoryLabel>
                カテゴリー：
                <Link href="/category/[id]" as={`/category/${content.category_field.id}`}>
                  <a>{content.category_field.name}</a>
                </Link>
              </CategoryLabel>
              <TagArea>
                {content.tag_field.map((tag) => (
                  <TagLabel key={tag.id}>
                    <Link href="/tags/[id]" as={`/tags/${tag.id}`}>
                      <a>{tag.name}</a>
                    </Link>
                  </TagLabel>
                ))}
              </TagArea>
            </PostInfo>
          </BlogCard>
        ))}
        <Paginate paginateType={paginateType} totalCount={totalCount} />
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const key = getApiKey();

  const res = await fetch(`${process.env.ENDPOINT}/blogs?offset=0&limit=${paginateNum}`, key);
  const data = await res.json();

  const contents = data.contents;
  const totalCount = data.totalCount;

  return {
    props: {
      contents,
      totalCount,
    },
  };
};

export default Home;

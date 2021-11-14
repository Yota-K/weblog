import { NextPage, GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import React from 'react';

import { config } from '@/config/app';

import { Content } from '@/interfaces/content';

import { dateFormat } from '@/utils/date-format';
import { getApiKey } from '@/utils/get-api-key';

import { BlogCard, PostInfo } from '@/share/BlogCard';
import { CategoryLabel } from '@/share/CategoryLabel';
import { H3 } from '@/share/Heading';
import { TagArea } from '@/share/TagArea';
import { TagLabel } from '@/share/TagLabel';
import { TimeStamp } from '@/share/TimeStamp';

import Layout from '@/components/Layout';
import Paginate from '@/components/Paginate';
import PostThumbnail from '@/components/PostThumbnail';
import Seo from '@/components/Seo';

interface Props {
  contents: Content[];
  totalCount: number;
}

const paginateNum = config.paginateNum;

const Page: NextPage<Props> = ({ contents, totalCount }) => {
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

export const getStaticPaths: GetStaticPaths = async () => {
  const key = getApiKey();

  const res = await fetch(`${process.env.ENDPOINT}/blogs?fields=id&limit=9999`, key);
  const data = await res.json();

  let totalCount: number = data.totalCount;
  totalCount = Math.ceil(totalCount / paginateNum);

  const paginate = (totalCount: number) => {
    return [...new Array(totalCount).keys()].map((i) => ++i);
  };

  const paths = paginate(totalCount).map((pageNum) => `/page/${pageNum}`);

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const key = getApiKey();

  const id = context?.params?.id as string;
  const offset = parseInt(id) * paginateNum - paginateNum;

  const res = await fetch(`${process.env.ENDPOINT}/blogs?offset=${offset}&limit=${paginateNum}`, key);
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

export default Page;

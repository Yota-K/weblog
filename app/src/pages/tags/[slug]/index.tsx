import { NextComponentType, NextPageContext, GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import React from 'react';

import { config } from '@/config/app';

import { Content } from '@/interfaces/content';
import { PageSlug } from '@/interfaces/page-slug';
import { RecordType } from '@/interfaces/record-type';

import { dateFormat } from '@/utils/date-format';
import { getApiKey } from '@/utils/get-api-key';

import { BlogCard, PostInfo } from '@/share/BlogCard';
import { CategoryLabel } from '@/share/CategoryLabel';
import { H2, H3 } from '@/share/Heading';
import { TagArea } from '@/share/TagArea';
import { TagLabel } from '@/share/TagLabel';
import { TimeStamp } from '@/share/TimeStamp';

import Breadcrumb from '@/components/Breadcrumb';
import Layout from '@/components/Layout';
import Paginate from '@/components/Paginate';
import PostThumbnail from '@/components/PostThumbnail';
import Seo from '@/components/Seo';

interface Props {
  contents: Content[];
  tagName: string;
  tagSlug: string;
  totalCount: number;
}

const paginateNum = config.paginateNum;

const TagPage: NextComponentType<NextPageContext, RecordType, Props> = ({ contents, tagName, tagSlug, totalCount }) => {
  const { siteTitle } = config.siteInfo;

  const paginateType = `tags/${tagSlug}`;

  return (
    <Layout>
      <Seo title={`${tagName}｜${siteTitle}`} />
      <div id="categories">
        <Breadcrumb pageTitle={tagName} />
        <H2>タグ：{tagName}</H2>
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

  const res = await fetch(`${process.env.ENDPOINT}/tags?fields=id&limit=9999`, key);
  const data = await res.json();

  const slugAry: PageSlug[] = data.contents;
  const paths = slugAry.map((post) => `/tags/${post.id}`);

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const key = getApiKey();

  const slug = context?.params?.slug;

  const params = `?filters=tag_field[contains]${slug}&limit=${paginateNum}`;
  const res = await fetch(`${process.env.ENDPOINT}/blogs${params}`, key);
  const data = await res.json();

  const contents: Content[] = data.contents;

  // ページに一致するタグを探す
  const findTag = contents[0].tag_field.find((tag) => tag.id === slug);

  const tagName = findTag?.name;
  const tagSlug = findTag?.id;
  const totalCount = data.totalCount;

  return {
    props: {
      contents,
      tagName,
      tagSlug,
      totalCount,
    },
  };
};

export default TagPage;

import React from 'react';
import { NextComponentType, NextPageContext, GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { RecordType } from '../../../../interfaces/record-type';
import { Content } from '../../../../interfaces/blog';
import { PageSlug } from '../../../../interfaces/page-slug';
import Head from '../../../components/Head';
import Layout from '../../../components/Layout';
import Breadcrumb from '../../../components/Breadcrumb';
import Paginate from '../../../components/Paginate';
import { dateFormat } from '../../../../scripts/date-format';
import { getRequestHeader } from '../../../../scripts/get-request-header';

import { H2, H3 } from '../../../../share/Heading';
import { BlogCard, PostThumbnail, PostInfo } from '../../../../share/BlogCard';
import { CategoryLabel } from '../../../../share/CategoryLabel';
import { TagArea } from '../../../../share/TagArea';
import { TagLabel } from '../../../../share/TagLabel';
import { TimeStamp } from '../../../../share/TimeStamp';

interface Props {
  tags: Content[];
  tagName: string;
  tagSlug: string;
  totalCount: number;
}

const Tags: NextComponentType<NextPageContext, RecordType, Props> = ({ tags, tagName, tagSlug, totalCount }) => {
  const paginateType = `tags/${tagSlug}`;

  return (
    <Layout>
      <Head title={`${tagName}｜カルキチのブログ`} />
      <div id="categories">
        <Breadcrumb tagPageTitle={tagName} />
        <H2>タグ：{tagName}</H2>
        {tags.map((blog) => (
          <BlogCard key={blog.id}>
            <PostThumbnail>
              <LazyLoadImage src={`${blog.thumbnail.url}`} alt="thumbnail" effect="blur" />
            </PostThumbnail>
            <PostInfo>
              <TimeStamp>{dateFormat(blog.createdAt)}</TimeStamp>
              <H3>
                <Link href="/blogs/[id]" as={`/blogs/${blog.id}`}>
                  <a>{blog.title}</a>
                </Link>
              </H3>
              <CategoryLabel>
                カテゴリー：
                <Link href="/category/[id]" as={`/category/${blog.category_field.id}`}>
                  <a>{blog.category_field.name}</a>
                </Link>
              </CategoryLabel>
              <TagArea>
                {blog.tag_field.map((tag: any) => (
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
        <Paginate paginateType={paginateType} offsetNum={offsetNum} totalCount={totalCount} />
      </div>
    </Layout>
  );
};

const header = getRequestHeader();
const offsetNum = 5;

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${process.env.ENDPOINT}/tags?fields=id&limit=9999`, header);
  const data = await res.json();

  const slugAry: PageSlug[] = data.contents;
  const paths = slugAry.map((post) => `/tags/${post.id}`);

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context?.params?.slug;

  const params = `filters=tags[contains]${slug}&limit=${offsetNum}`;
  const res = await fetch(`${process.env.ENDPOINT}/blogs?${params}`, header);
  const data = await res.json();

  const contents = data.contents;

  // ページに一致するタグを探す
  const findTag = contents[0].tag_field.find((tag: any) => tag.id === slug);

  const tagName = findTag.name;
  const tagSlug = findTag.id;
  const totalCount = data.totalCount;

  return {
    props: {
      tags: contents,
      tagName: tagName,
      tagSlug: tagSlug,
      totalCount: totalCount,
    },
  };
};

export default Tags;
import React from 'react';
import { NextComponentType, NextPageContext, GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { paginateNum } from '../../../config/paginate-num';

import { RecordType } from '../../../interfaces/record-type';
import { Content } from '../../../interfaces/blog';

import { dateFormat } from '../../../scripts/date-format';
import { getRequestHeader } from '../../../scripts/get-request-header';
import { paginateAry } from '../../../scripts/generate-paginate-ary';

import Head from '../../components/Head';
import Layout from '../../components/Layout';
import Paginate from '../../components/Paginate';

import { H3 } from '../../../share/Heading';
import { BlogCard, PostThumbnail, PostInfo } from '../../../share/BlogCard';
import { CategoryLabel } from '../../../share/CategoryLabel';
import { TagArea } from '../../../share/TagArea';
import { TagLabel } from '../../../share/TagLabel';
import { TimeStamp } from '../../../share/TimeStamp';

interface Props {
  blogs: Content[];
  offsetNum: number;
  totalCount: number;
}

const offsetNum = paginateNum['count'];

const Page: NextComponentType<NextPageContext, RecordType, Props> = ({ blogs, offsetNum, totalCount }) => {
  const siteTitle = 'カルキチのブログ';
  const paginateType = 'page';

  return (
    <Layout>
      <Head title={siteTitle} />
      <div id="blog-list">
        {blogs.map((blog) => (
          <BlogCard key={blog.id}>
            <PostThumbnail>
              <LazyLoadImage src={blog.thumbnail.url} alt="thumbnail" effect="blur" />
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
                {blog.tag_field.map((tag) => (
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

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${process.env.ENDPOINT}/blogs?fields=id&limit=9999`, header);
  const data = await res.json();

  let totalCount = data.totalCount;
  totalCount = Math.floor(totalCount / offsetNum) + 1;

  const paginate: number[] = paginateAry(totalCount);
  const paths = paginate.map((pageNum) => `/page/${pageNum}`);

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  let id: any = context?.params?.id;
  id = id * offsetNum - offsetNum;

  const res = await fetch(`${process.env.ENDPOINT}/blogs?offset=${id}&limit=5`, header);
  const data = await res.json();
  const blogs = data.contents;
  const totalCount = data.totalCount;

  return {
    props: {
      blogs: blogs,
      offsetNum: offsetNum,
      totalCount: totalCount,
    },
  };
};

export default Page;

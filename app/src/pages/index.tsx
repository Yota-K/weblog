import { NextComponentType, NextPageContext, GetStaticProps } from 'next';
import Link from 'next/link';
import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { config } from '../../config/app';

import { Content } from '../../interfaces/content';
import { RecordType } from '../../interfaces/record-type';

import { dateFormat } from '../../scripts/date-format';
import { getRequestHeader } from '../../scripts/get-request-header';

import { BlogCard, PostThumbnail, PostInfo } from '../../share/BlogCard';
import { CategoryLabel } from '../../share/CategoryLabel';
import { H3 } from '../../share/Heading';
import { TagArea } from '../../share/TagArea';
import { TagLabel } from '../../share/TagLabel';
import { TimeStamp } from '../../share/TimeStamp';

import Head from '../components/Head';
import Layout from '../components/Layout';
import Paginate from '../components/Paginate';

interface Props {
  blogs: Content[];
  totalCount: number;
}

const paginateNum = config.paginateNum;

const Home: NextComponentType<NextPageContext, RecordType, Props> = ({ blogs, totalCount }) => {
  const { siteTitle } = config.siteInfo;

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
              <TimeStamp>
                <time itemProp="dateCreated" dateTime={`${dateFormat(blog.createdAt)}`}>
                  {dateFormat(blog.createdAt)}
                </time>
              </TimeStamp>
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
        <Paginate paginateType={paginateType} totalCount={totalCount} />
      </div>
    </Layout>
  );
};

const header = getRequestHeader();

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(`${process.env.ENDPOINT}/blogs?offset=0&limit=${paginateNum}`, header);
  const data = await res.json();

  return {
    props: {
      blogs: data.contents,
      totalCount: data.totalCount,
    },
  };
};

export default Home;
